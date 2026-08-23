import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EXPERIENCES } from "../../data/experiences";
import styles from "./CareerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function CareerSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set([EXPERIENCES[0]?.id])
  );

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll(`.${styles.card}`);
    const triggers: ScrollTrigger[] = [];
    cards?.forEach((card) => {
      const tween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", fastScrollEnd: true },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="career" className={styles.career}>
      <div className={styles.head}>
        <h2 className={styles.heading}>
          Career<span className={styles.asterisk}>*</span>
        </h2>
        <span className={`${styles.range} mono`}>( 2015 — PRESENT )</span>
      </div>

      <div className={styles.list} ref={listRef}>
        {EXPERIENCES.map((exp, i) => {
          const open = openIds.has(exp.id);
          return (
            <div
              key={exp.id}
              className={styles.card}
              style={{ "--accent": exp.accentColor } as React.CSSProperties}
            >
              <div
                className={styles.summary}
                onClick={() => toggle(exp.id)}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(exp.id);
                  }
                }}
              >
                <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.name}>{exp.name}</h3>
                <span className={styles.role}>{exp.role}</span>
                <span className={`${styles.period} mono`}>{exp.period}</span>
                <span
                  className={styles.toggle}
                  style={{ transform: open ? "rotate(0deg)" : "rotate(45deg)" }}
                >
                  +
                </span>
              </div>

              <div
                className={styles.panelOuter}
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                }}
              >
                <div
                  className={styles.panelInner}
                  ref={(el) => {
                    panelRefs.current[exp.id] = el;
                  }}
                >
                  <div className={styles.panelGrid}>
                    <div className={styles.summaryCol}>
                      <p className={styles.summaryText}>{exp.summary}</p>
                      <div className={styles.tags}>
                        {exp.tags.map((tag) => (
                          <span className={`${styles.tag} mono`} key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.groupsCol}>
                      {exp.groups.map((group) => (
                        <div key={group.title} className={styles.group}>
                          {group.title && (
                            <div className={`${styles.groupTitle} mono`}>
                              — <span>{group.title}</span>
                            </div>
                          )}
                          {group.bullets && (
                            <ul className={styles.bulletList}>
                              {group.bullets.map((b) => (
                                <li key={b}>
                                  <span className={styles.bulletMark} />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {group.note && <p className={styles.note}>{group.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
