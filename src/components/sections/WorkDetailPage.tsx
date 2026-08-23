import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS, type Project, type ProjectMedia } from "../../data/projects";
import styles from "./WorkDetailPage.module.scss";

gsap.registerPlugin(ScrollTrigger);

// hero.media가 없으면 카드 썸네일(thumbnail)을 그대로 hero에 사용
const resolveHeroMedia = (project: Project): ProjectMedia | null => {
  if (project.hero?.enabled === false) return null;
  return project.hero?.media ?? project.thumbnail;
};

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);

  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const detailRefs = useRef<HTMLDivElement[]>([]);
  detailRefs.current = [];

  const addDetailRef = (el: HTMLDivElement | null) => {
    if (el) detailRefs.current.push(el);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(
          `.${styles.num}, .${styles.titleRow}, .${styles.meta}, .${styles.overview}, .${styles.tags}`,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
          "-=0.3"
        )
        .fromTo(
          heroRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.5"
        );

      // hero(상단 비디오/이미지) 진입이 끝난 뒤에만 detail 이미지의 스크롤 트리거를 등록
      // 그전에는 트리거 자체가 없어 아무리 빨리 스크롤해도 detail이 hero보다 먼저 뜰 수 없음
      tl.eventCallback("onComplete", () => {
        detailRefs.current.forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project]);

  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/#work");
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") goBack();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <p>존재하지 않는 프로젝트입니다.</p>
          <button type="button" onClick={() => navigate("/")}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const heroMedia = resolveHeroMedia(project);

  return (
    <div
      className={styles.page}
      ref={rootRef}
      style={{ "--accent": project.chipColor } as React.CSSProperties}
    >
      <button type="button" className={styles.back} onClick={goBack}>
        <span aria-hidden="true">←</span> Work
      </button>

      <div className={styles.scroll}>
        <div className={styles.num}>/work/{project.idx.split(" / ")[0]}</div>
        <div className={styles.titleRow}>
          <h1>{project.title}</h1>
          {project.externalLink && (
            <a
              className={styles.linkInline}
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              바로가기 <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div className={styles.meta}>
          <span>{project.subtitle}</span>
        </div>
        <p className={styles.overview}>{project.summary}</p>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        {heroMedia && (
          <div className={styles.hero} ref={heroRef}>
            {heroMedia.image ? (
              <img src={heroMedia.image} alt={project.title} />
            ) : heroMedia.video || heroMedia.videoWebm ? (
              <video muted loop playsInline autoPlay>
                {heroMedia.videoWebm && (
                  <source src={heroMedia.videoWebm} type="video/webm" />
                )}
                {heroMedia.video && (
                  <source src={heroMedia.video} type="video/mp4" />
                )}
              </video>
            ) : (
              <span>cover image</span>
            )}
          </div>
        )}

        <div className={styles.details}>
          {project.sections?.map((section) => (
            <div
              key={
                section.images[0] ||
                section.video ||
                section.captions?.[0]?.heading
              }
              className={styles.item}
              ref={addDetailRef}
            >
              <div className={styles.image}>
                {section.video ? (
                  <video
                    src={section.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  section.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={section.captions?.[0]?.heading ?? ""}
                    />
                  ))
                )}
              </div>

              {section.captions && section.captions.length > 0 && (
                <div className={styles.description}>
                  {section.captions.map((caption, i) => (
                    <div
                      key={caption.heading ?? i}
                      className={styles.textGroup}
                    >
                      {caption.heading && <h3>{caption.heading}</h3>}
                      {caption.body && <p>{caption.body}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {project.externalLink && (
          <a
            className={styles.link}
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            바로가기 <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
