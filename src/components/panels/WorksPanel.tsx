import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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

    /* 캡션 내용은 React state로 렌더링 — GSAP은 페이드 애니메이션만 담당 */
    const [capIdx, setCapIdx] = useState(0);

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
      if (instant) {
        setCapIdx(i);
        gsap.set(caption, { opacity: 1, y: 0, autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.to(caption, {
        opacity: 0,
        y: -14,
        duration: reduced ? 0 : 0.28,
        ease: "power2.in",
        /* 페이드아웃 완료(opacity 0) 시점에 내용 교체 — React가 다음 렌더에서 반영 */
        onComplete() {
          setCapIdx(i);
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

    /* works 키보드 스크롤 — 방향키/PageUp·Down/Home·End 지원, 최상단 ArrowUp은 hero 이동 */
    useEffect(() => {
      const STEP = 90;
      const handler = (e: KeyboardEvent) => {
        if (!isActiveRef.current || animating.current) return;
        const max = maxScroll.current;
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            if (smoothY.current <= 1 && targetY.current <= 0) onGo("hero");
            else targetY.current = Math.max(0, targetY.current - STEP);
            break;
          case "ArrowDown":
            e.preventDefault();
            targetY.current = Math.min(max, targetY.current + STEP);
            break;
          case "PageUp":
            e.preventDefault();
            targetY.current = Math.max(0, targetY.current - innerHeight * 0.8);
            break;
          case "PageDown":
            e.preventDefault();
            targetY.current = Math.min(max, targetY.current + innerHeight * 0.8);
            break;
          case "Home":
            e.preventDefault();
            targetY.current = 0;
            break;
          case "End":
            e.preventDefault();
            targetY.current = max;
            break;
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onGo, animating]);

    /* Tab 포커스 이동 시 브라우저가 overflow:hidden 컨테이너를 임의로 스크롤하는 것 방지 —
       스크롤 위치는 transform으로만 제어하므로 네이티브 스크롤은 항상 0으로 되돌림 */
    useEffect(() => {
      const el = sectionRef.current;
      if (!el) return;
      const onScroll = () => {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      };
      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }, []);

    const cap = PROJECTS[capIdx];

    return (
      <section
        className={styles.works}
        id="p-works"
        aria-label="대표 프로젝트"
        ref={sectionRef}
      >
        <AuroraBackground reduced={reduced} />
        <div className={styles.caption} ref={captionRef}>
          <div className={styles.wcIdx}>{cap.idx}</div>
          <h2>{cap.title}</h2>
          <p>{cap.desc}</p>
          <div className={styles.wcTags}>
            {cap.tags.map((t) => (
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
                  {proj.img && (
                    <img
                      className={styles.thumbImg}
                      src={proj.img}
                      alt={proj.title}
                      loading="eager"
                      decoding="async"
                    />
                  )}
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
                </div>
                <span className={styles.label}>{proj.label}</span>
                {/* 링크가 있는 프로젝트만 바로가기 버튼 렌더링 — .img 밖에 두어 패럴랙스 영향 없음 */}
                {proj.link && (
                  <a
                    className={styles.shortcut}
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${proj.title} 바로가기 (새 창 열림)`}
                    onFocus={() => {
                      /* 키보드 포커스 시 해당 프로젝트가 화면 중앙에 오도록 스크롤 동기화 */
                      const m = itemMetrics.current[i];
                      if (!m) return;
                      targetY.current = gsap.utils.clamp(
                        0,
                        maxScroll.current,
                        m.top + m.height / 2 - innerHeight / 2
                      );
                    }}
                  >
                    바로가기 <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          <div className={styles.cta}>
            <h3>
              다음 <strong>경험</strong>을 함께 만들어갈 <br />
              준비가 되어 있습니다.
            </h3>
            <div className={common.links}>
              <a
                className={`${common.btn}`}
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onGo("contact");
                }}
              >
                Contact <span aria-hidden="true">→</span>
              </a>
              <a
                className={common.btn}
                href="#/career"
                onClick={(e) => {
                  e.preventDefault();
                  onGo("career");
                }}
              >
                Career <span aria-hidden="true">→</span>
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
