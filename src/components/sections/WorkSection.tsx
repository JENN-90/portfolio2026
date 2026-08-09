import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "../../data/projects";
import WorkModal from "./WorkModal";
import styles from "./WorkSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const COL_A = PROJECTS.filter((_, i) => i % 2 === 0);
const COL_B = PROJECTS.filter((_, i) => i % 2 === 1);

export default function WorkSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
    const triggers: ScrollTrigger[] = [];

    cards?.forEach((card) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%" },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    [colARef.current, colBRef.current].forEach((col, i) => {
      if (!col) return;
      const speed = i === 0 ? 26 : 48;
      const tween = gsap.to(col, {
        yPercent: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const openModal = (project: Project) => setActiveProject(project);
  const closeModal = () => setActiveProject(null);

  return (
    <section id="work">
      <div className="wrap">
        <div className={`${styles.sectionHead} reveal`}>
          <h2>Work</h2>
        </div>

        <div className={styles.workGrid} ref={gridRef}>
          <div className={styles.col} ref={colARef}>
            {COL_A.map((proj) => (
              <WorkCard key={proj.title} project={proj} onOpen={openModal} />
            ))}
          </div>
          <div className={`${styles.col} ${styles.colB}`} ref={colBRef}>
            {COL_B.map((proj) => (
              <WorkCard key={proj.title} project={proj} onOpen={openModal} />
            ))}
          </div>
        </div>
      </div>

      <WorkModal project={activeProject} onClose={closeModal} />
    </section>
  );
}

function WorkCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      className={styles.card}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
    >
      <div className={styles.chip} style={{ background: project.chipColor }} />
      <div className={styles.thumb}>
        {project.img && (
          <img src={project.img} alt={project.title} loading="lazy" />
        )}
        {(project.video || project.videoWebm) && (
          <video muted loop playsInline preload="metadata" autoPlay>
            {project.videoWebm && (
              <source src={project.videoWebm} type="video/webm" />
            )}
            {project.video && <source src={project.video} type="video/mp4" />}
          </video>
        )}
        {!project.img && !project.video && !project.videoWebm && (
          <span className={styles.thumbPlaceholder}>preview</span>
        )}
      </div>
      <div className={styles.num}>{project.idx.split(" / ")[0]}</div>
      <h3>{project.title}</h3>
      <p>{project.desc.replace(/\n/g, " ")}</p>
      <div className={styles.tags}>
        {project.tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
