import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import gsap from "gsap";
import AuroraBackground from "../ui/AuroraBackground";
import type { PanelName } from "../../data/projects";
import { PROJECTS } from "../../data/projects";
import common from "../../styles/common.module.scss";
import styles from "./WorksPanel.module.scss";

export interface WorksPanelHandle {
  el: HTMLElement | null;
  resetScroll: () => void;
}

interface WorksPanelProps {
  onGo: (target: PanelName) => void;
  reduced: boolean;
  isActive: boolean;
  animating: React.RefObject<boolean>;
}

const WorksPanel = forwardRef<WorksPanelHandle, WorksPanelProps>(
  ({ onGo, reduced, isActive, animating }, ref) => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement[]>([]);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const imgsRef = useRef<HTMLDivElement[]>([]);
    const videosRef = useRef<HTMLVideoElement[]>([]);
    const rafRef = useRef<number>(0);

    const targetY = useRef(0);
    const smoothY = useRef(0);
    const maxScroll = useRef(0);
    const activeIdx = useRef(0);
    /* 리사이즈 때 한 번만 측정한 아이템 위치 — RAF 루프에서 DOM 읽기(gBCR) 제거용 */
    const itemMetrics = useRef<{ top: number; height: number }[]>([]);
    const lastAppliedY = useRef(-1);
    const inCTARef = useRef(false);
    const isActiveRef = useRef(isActive);
    isActiveRef.current = isActive;

    /* isActive가 false로 바뀌는 즉시 스크롤 값 강제 리셋 */
    useEffect(() => {
      if (!isActive) {
        targetY.current = 0;
        smoothY.current = 0;
        const track = trackRef.current;
        if (track) track.style.transform = "translate3d(0, 0, 0)";
      }
    }, [isActive]);

    /* 비활성/모션 감소 시 전체 일시정지 — 활성 시 재생은 RAF 루프가 화면에 보이는 것만 처리 */
    useEffect(() => {
      if (isActive && !reduced) {
        lastAppliedY.current = -1; // 다음 프레임에 보이는 비디오만 재생되도록 강제 갱신
        return;
      }
      videosRef.current.forEach((v) => v?.pause());
    }, [isActive, reduced]);

    const measure = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;
      maxScroll.current = Math.max(0, track.scrollHeight - innerHeight);
      /* 아이템 위치를 미리 계산해 두면 루프에서 gBCR 없이 center를 산출할 수 있음 */
      itemMetrics.current = itemsRef.current.map((item) =>
        item
          ? { top: item.offsetTop, height: item.offsetHeight }
          : { top: 0, height: 0 }
      );
      lastAppliedY.current = -1;
    }, []);

    const resetScroll = useCallback(() => {
      targetY.current = 0;
      smoothY.current = 0;
      lastAppliedY.current = -1;
      inCTARef.current = false;
      const track = trackRef.current;
      if (track) track.style.transform = "translate3d(0, 0, 0)";
      activeIdx.current = 0;
      updateCaption(0, true);
      progressRef.current.forEach((s, k) =>
        s?.classList.toggle(styles.on, k === 0)
      );
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        get el() {
          return sectionRef.current;
        },
        resetScroll,
      }),
      [resetScroll]
    );

    function updateCaption(i: number, instant = false) {
      const caption = captionRef.current;
      if (!caption) return;
      const p = PROJECTS[i];
      if (instant) {
        caption.querySelector<HTMLElement>(`.${styles.wcIdx}`)!.textContent =
          p.idx;
        caption.querySelector<HTMLElement>("h2")!.textContent = p.title;
        caption.querySelector<HTMLElement>("p")!.textContent = p.desc;
        caption.querySelector<HTMLElement>(`.${styles.wcTags}`)!.innerHTML =
          p.tags
            .map((t) => `<span class="${styles.ptag}">${t}</span>`)
            .join("");
        gsap.set(caption, { opacity: 1, y: 0, autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.to(caption, {
        opacity: 0,
        y: -14,
        duration: reduced ? 0 : 0.28,
        ease: "power2.in",
        onComplete() {
          caption.querySelector<HTMLElement>(`.${styles.wcIdx}`)!.textContent =
            p.idx;
          caption.querySelector<HTMLElement>("h2")!.textContent = p.title;
          caption.querySelector<HTMLElement>("p")!.textContent = p.desc;
          caption.querySelector<HTMLElement>(`.${styles.wcTags}`)!.innerHTML =
            p.tags
              .map((t) => `<span class="${styles.ptag}">${t}</span>`)
              .join("");
        },
      }).to(caption, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0 : 0.45,
        ease: "power3.out",
      });
    }

    function setCaption(i: number) {
      if (i === activeIdx.current) return;
      activeIdx.current = i;
      updateCaption(i);
      progressRef.current.forEach((s, k) =>
        s?.classList.toggle(styles.on, k === i)
      );
    }

    useEffect(() => {
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, [measure]);

    /* 초기 로드가 끝난 뒤 유휴 시간에 비디오를 미리 버퍼링 —
       첫 스크롤 중 play() 시점의 버퍼링·디코더 초기화 끊김 방지 */
    useEffect(() => {
      const warm = () => {
        videosRef.current.forEach((v) => {
          if (!v || !v.paused) return;
          v.preload = "auto";
          v.load();
        });
      };
      const hasIdle = "requestIdleCallback" in window;
      const id = hasIdle
        ? requestIdleCallback(warm, { timeout: 4000 })
        : window.setTimeout(warm, 3000);
      return () => {
        if (hasIdle) cancelIdleCallback(id as number);
        else clearTimeout(id as number);
      };
    }, []);

    /* RAF 루프 */
    useEffect(() => {
      function loop() {
        /* 비활성 상태에서는 lerp/transform 업데이트 건너뜀 */
        if (!isActiveRef.current) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        smoothY.current +=
          (targetY.current - smoothY.current) * (reduced ? 1 : 0.075);
        if (Math.abs(targetY.current - smoothY.current) < 0.05)
          smoothY.current = targetY.current;

        /* 스크롤 값이 그대로면 DOM 작업 전부 생략 */
        if (smoothY.current === lastAppliedY.current) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        lastAppliedY.current = smoothY.current;

        const track = trackRef.current;
        if (track)
          track.style.transform = `translate3d(0, ${-smoothY.current}px, 0)`;

        const vh = innerHeight;
        let nearest = activeIdx.current;
        let nearestDist = Infinity;

        /* gBCR 대신 미리 측정해 둔 offset으로 계산 — 강제 레이아웃 없음 */
        itemMetrics.current.forEach((m, i) => {
          const center = m.top + m.height / 2 - smoothY.current;
          const ratio = gsap.utils.clamp(-1, 1, (center - vh / 2) / (vh / 2));
          const img = imgsRef.current[i];
          if (img) img.style.transform = `translate3d(0, ${ratio * 8}%, 0)`;
          const dist = Math.abs(center - vh / 2);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = i;
          }

          /* 화면에 보이는 비디오만 재생 — 오프스크린 디코딩 방지 */
          const video = videosRef.current[i];
          if (video && !reduced) {
            const onScreen = center > -m.height && center < vh + m.height;
            if (onScreen && video.paused) video.play().catch(() => {});
            else if (!onScreen && !video.paused) video.pause();
          }
        });

        const caption = captionRef.current;
        const lastMetric = itemMetrics.current[itemMetrics.current.length - 1];
        if (caption && lastMetric) {
          const lastCenter =
            lastMetric.top + lastMetric.height / 2 - smoothY.current;
          const inCTA = lastCenter < vh * 0.18;
          /* CTA 진입/이탈이 바뀔 때만 트윈 생성 — 매 프레임 생성 방지 */
          if (inCTA !== inCTARef.current) {
            inCTARef.current = inCTA;
            gsap.to(caption, {
              autoAlpha: inCTA ? 0 : 1,
              duration: 0.3,
              overwrite: "auto",
            });
          }
          if (!inCTA && nearestDist < vh * 0.5) setCaption(nearest);
        }
        rafRef.current = requestAnimationFrame(loop);
      }
      rafRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafRef.current);
    }, [reduced]);

    /* 휠 이벤트 — 큐브 전환 중에는 관성 휠 이벤트가 targetY에 쌓이지 않도록 전부 무시 */
    useEffect(() => {
      const handler = (e: WheelEvent) => {
        if (!isActiveRef.current || animating.current) return;
        if (targetY.current <= 0 && e.deltaY < -30) {
          targetY.current = 0;
          onGo("hero");
          return;
        }
        targetY.current = gsap.utils.clamp(
          0,
          maxScroll.current,
          targetY.current + e.deltaY
        );
      };
      window.addEventListener("wheel", handler, { passive: true });
      return () => window.removeEventListener("wheel", handler);
    }, [onGo, animating]);

    /* 터치 이벤트 */
    useEffect(() => {
      let startY = 0;
      let lastY = 0;
      const onStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
        lastY = startY;
      };
      const onMove = (e: TouchEvent) => {
        if (!isActiveRef.current || animating.current) return;
        const y = e.touches[0].clientY;
        targetY.current = gsap.utils.clamp(
          0,
          maxScroll.current,
          targetY.current + (lastY - y) * 1.6
        );
        lastY = y;
      };
      const onEnd = (e: TouchEvent) => {
        if (!isActiveRef.current || animating.current) return;
        const dy = e.changedTouches[0].clientY - startY;
        if (targetY.current <= 0 && dy > 60) onGo("hero");
      };
      window.addEventListener("touchstart", onStart, { passive: true });
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onEnd, { passive: true });
      return () => {
        window.removeEventListener("touchstart", onStart);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };
    }, [onGo, animating]);

    /* works 키보드 — 스크롤 최상단에서 ArrowUp 시 hero로 이동만 처리 */
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (!isActiveRef.current || animating.current) return;
        if (
          e.key === "ArrowUp" &&
          smoothY.current <= 1 &&
          targetY.current <= 0
        ) {
          e.preventDefault();
          onGo("hero");
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onGo, animating]);

    const p0 = PROJECTS[0];

    return (
      <section
        className={styles.works}
        id="p-works"
        aria-label="대표 프로젝트"
        ref={sectionRef}
      >
        <AuroraBackground reduced={reduced} />
        <div className={styles.caption} ref={captionRef}>
          <div className={styles.wcIdx}>{p0.idx}</div>
          <h2>{p0.title}</h2>
          <p>{p0.desc}</p>
          <div className={styles.wcTags}>
            {p0.tags.map((t) => (
              <span key={t} className={styles.ptag}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          {PROJECTS.map((_, i) => (
            <span
              key={i}
              className={i === 0 ? styles.on : ""}
              ref={(el) => {
                if (el) progressRef.current[i] = el;
              }}
            />
          ))}
        </div>

        <div className={styles.track} ref={trackRef}>
          <div className={styles.spacer} />
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.idx}
              className={styles.item}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
            >
              <div className={styles.thumb}>
                <div
                  className={styles.img}
                  ref={(el) => {
                    if (el) imgsRef.current[i] = el;
                  }}
                >
                  <img
                    className={styles.thumbImg}
                    src={proj.img}
                    alt={proj.title}
                    loading="eager"
                    decoding="async"
                  />
                  {proj.video && (
                    <video
                      className={styles.thumbVideo}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      ref={(el) => {
                        if (el) videosRef.current[i] = el;
                      }}
                    >
                      {proj.videoWebm && (
                        <source src={proj.videoWebm} type="video/webm" />
                      )}
                      <source src={proj.video} type="video/mp4" />
                    </video>
                  )}
                  <span>{proj.label}</span>
                </div>
                {/* 링크가 있는 프로젝트만 바로가기 버튼 렌더링 — .img 밖에 두어 패럴랙스 영향 없음 */}
                {proj.link && (
                  <a
                    className={styles.shortcut}
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${proj.title} 바로가기`}
                  >
                    바로가기 ↗
                  </a>
                )}
              </div>
            </div>
          ))}

          <div className={styles.cta}>
            <h3>다음 경험을 함께 만들어갈 준비가 되어 있습니다. ✏️</h3>
            <div className={common.links}>
              <a
                className={`${common.btn}`}
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onGo("contact");
                }}
              >
                Contact →
              </a>
              <a
                className={common.btn}
                href="#/career"
                onClick={(e) => {
                  e.preventDefault();
                  onGo("career");
                }}
              >
                Career →
              </a>
            </div>
            <div className={styles.foot}>Let's build something better.</div>
          </div>
        </div>

        {/* <EdgeButton pos="top" target="hero" onGo={onGo}>Home</EdgeButton> */}
        <div className={common.shade} data-shade aria-hidden="true" />
      </section>
    );
  }
);

WorksPanel.displayName = "WorksPanel";
export default WorksPanel;
