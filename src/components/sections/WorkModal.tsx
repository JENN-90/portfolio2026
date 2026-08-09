import { useEffect } from "react";
import type { Project } from "../../data/projects";
import styles from "./WorkModal.module.scss";

interface WorkModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function WorkModal({ project, onClose }: WorkModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  const show = project !== null;

  return (
    <div
      className={`${styles.overlay} ${show ? styles.show : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className={styles.box}>
          <button
            type="button"
            className={styles.close}
            aria-label="닫기"
            onClick={onClose}
          >
            ×
          </button>
          <div className={styles.scroll}>
            <div className={styles.num}>/work/{project.idx.split(" / ")[0]}</div>
            <h2>{project.title}</h2>
            <div className={styles.meta}>
              <span>{project.label}</span>
            </div>
            <p className={styles.overview}>{project.desc}</p>
            <div className={styles.tags}>
              {project.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.hero}>
              {project.img ? (
                <img src={project.img} alt={project.title} />
              ) : project.video || project.videoWebm ? (
                <video muted loop playsInline autoPlay>
                  {project.videoWebm && (
                    <source src={project.videoWebm} type="video/webm" />
                  )}
                  {project.video && (
                    <source src={project.video} type="video/mp4" />
                  )}
                </video>
              ) : (
                <span>cover image</span>
              )}
            </div>
            {project.link && (
              <a
                className={styles.link}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                바로가기 <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
