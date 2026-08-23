import { useEffect, useRef, type KeyboardEvent } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "../../data/projects";
import { navigateWithTransition } from "../ui/PageTransition";
import styles from "./WorkSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const colA = PROJECTS.filter((_, i) => i % 3 === 0);
const colB = PROJECTS.filter((_, i) => i % 3 === 1);
const colC = PROJECTS.filter((_, i) => i % 3 === 2);

export default function WorkSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const colCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = [colARef.current, colBRef.current, colCRef.current];
      const revealDirections = [-1, 0, 1]; // A: 왼쪽에서, B: 아래에서, C: 오른쪽에서

      // 지그재그 reveal: 좌/우 컬럼은 반대 방향에서, 중앙 컬럼은 아래에서 등장
      columns.forEach((col, colIdx) => {
        if (!col) return;
        const cards = col.querySelectorAll(`.${styles.card}`);
        const dir = revealDirections[colIdx];

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 56, x: dir * 36 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", fastScrollEnd: true },
            }
          );
        });
      });

      // parallax: 데스크톱에서만, 컬럼마다 다른 속도로 수직 이동
      const parallaxSpeeds = [-60, 40, -30]; // A, B, C 컬럼별 이동량(px)

      ScrollTrigger.matchMedia({
        "(min-width: 821px)": () => {
          columns.forEach((col, colIdx) => {
            if (!col) return;
            gsap.to(col, {
              y: parallaxSpeeds[colIdx],
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const openProject = (project: Project & { slug: string }) =>
    navigateWithTransition(`/work/${project.slug}`, project.chipColor);

  return (
    <section id="work" className={styles.work}>
      <div className={styles.headArea}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>
            Selected
            <br />
            Work<span className={styles.asterisk}>*</span>
          </h2>
          <span className={`${styles.range} mono`}>
            ( {PROJECTS.length} PROJECTS · 2020 — 2026 )
          </span>
        </div>
      </div>

      <div className={styles.workGrid} ref={gridRef}>
        <div className={styles.col} ref={colARef}>
          {colA.map((proj) => (
            <WorkCard key={proj.title} project={proj} onOpen={openProject} />
          ))}
        </div>
        <div className={`${styles.col} ${styles.colB}`} ref={colBRef}>
          {colB.map((proj) => (
            <WorkCard key={proj.title} project={proj} onOpen={openProject} />
          ))}
        </div>
        <div className={`${styles.col} ${styles.colC}`} ref={colCRef}>
          {colC.map((proj) => (
            <WorkCard key={proj.title} project={proj} onOpen={openProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project & { slug: string }) => void;
}) {
  const clickable = project.openInDetailPage;
  const { image, video: thumbVideo, videoWebm } = project.thumbnail;
  const hasVideo = Boolean(thumbVideo || videoWebm);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => videoRef.current?.play();
  const pauseVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    // currentTime만 초기화하면 poster 대신 0초 프레임이 남아있어 load()로 poster를 다시 그림
    el.load();
  };

  return (
    <article
      className={styles.card}
      data-cursor="work"
      style={{ "--accent": project.chipColor } as React.CSSProperties}
      onMouseEnter={hasVideo ? playVideo : undefined}
      onMouseLeave={hasVideo ? pauseVideo : undefined}
      {...(clickable && {
        onClick: () => onOpen(project),
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        },
      })}
    >
      <div className={`${styles.thumb} ${!image && !hasVideo ? styles.thumbNoMedia : ""}`}>
        {!image && !hasVideo && (
          <span className={styles.thumbPlaceholder}>{project.title}</span>
        )}
        {image && <img src={image} alt={project.title} loading="lazy" />}
        {hasVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={image}
          >
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            {thumbVideo && <source src={thumbVideo} type="video/mp4" />}
          </video>
        )}

        {project.tags[0] && (
          <span className={styles.category}>
            [<span>{project.tags[0]}</span>]
          </span>
        )}

        <div className={styles.overlay}>
          <p className={styles.overlaySummary}>
            {project.summary.replace(/\n/g, " ")}
          </p>
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
          {project.externalLink && (
            <a
              className={styles.linkBtn}
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Site <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.num}>{project.idx.split(" / ")[0]}</span>
        <h3 className={styles.title}>{project.title}</h3>
      </div>
    </article>
  );
}
