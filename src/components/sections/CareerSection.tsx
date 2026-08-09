import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EXPERIENCES } from "../../data/experiences";
import styles from "./CareerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function CareerSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openId, setOpenId] = useState<string | null>(EXPERIENCES[0]?.id ?? null);

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll(`.${styles.careerCard}`);
    const triggers: ScrollTrigger[] = [];
    cards?.forEach((card, i) => {
      const tween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    Object.entries(panelRefs.current).forEach(([id, el]) => {
      if (!el) return;
      el.style.maxHeight = id === openId ? `${el.scrollHeight}px` : "0px";
    });
  }, [openId]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="wrap">
      <section id="career">
        <div className={`${styles.careerHead} reveal`}>
          <div>
            <div className={`${styles.eyebrow} mono`}>만들며 성장해온 기록</div>
            <h2>
              Where I&apos;ve
              <br />
              built things.
            </h2>
          </div>
          <div className={styles.careerStats}>
            <div>
              <b className={styles.c1}>11+</b> years&nbsp;/&nbsp;
              <b className={styles.c2}>5</b> companies&nbsp;/&nbsp;
              <b className={styles.c4}>46</b> projects
            </div>
            <div className={styles.tagline}>Building Better Interfaces</div>
          </div>
        </div>

        <div className={styles.careerList} ref={listRef}>
          {EXPERIENCES.map((exp, i) => {
            const open = openId === exp.id;
            return (
              <div
                key={exp.id}
                className={`${styles.careerCard} ${open ? styles.open : ""}`}
              >
                <div
                  className={styles.careerSummary}
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
                  <div className={`${styles.idx} mono`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.careerTitle}>
                    <h3>
                      {exp.name}{" "}
                      {exp.current && (
                        <span className={styles.badgeCurrent}>CURRENT</span>
                      )}
                    </h3>
                    <div className={styles.roleLine}>{exp.role}</div>
                  </div>
                  <div className={styles.careerPeriod}>
                    <span className={`${styles.period} mono`}>{exp.period}</span>
                    <div className={styles.toggleBtn}>{open ? "−" : "+"}</div>
                  </div>
                </div>

                <div className={styles.careerDesc}>{exp.summary}</div>

                <div
                  className={styles.careerPanel}
                  ref={(el) => {
                    panelRefs.current[exp.id] = el;
                  }}
                >
                  <div className={styles.detailBox}>
                    {exp.groups.map((group) => (
                      <div key={group.title} className={styles.detailGroup}>
                        <h4>{group.title}</h4>
                        {group.bullets && (
                          <ul>
                            {group.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {group.note && <p>{group.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
