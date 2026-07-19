import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import EdgeButton from "../ui/EdgeButton";
import AuroraBackground from "../ui/AuroraBackground";
import type { PanelName } from "../../data/projects";
import { EXPERIENCES } from "../../data/experiences";
import common from "../../styles/common.module.scss";
import styles from "./CareerPanel.module.scss";

export interface CareerPanelHandle {
  el: HTMLElement | null;
  resetScroll: () => void;
}

interface CareerPanelProps {
  onGo: (target: PanelName) => void;
  reduced: boolean;
}

const CareerPanel = forwardRef<CareerPanelHandle, CareerPanelProps>(
  ({ onGo, reduced }, ref) => {
    /* 열린 아코디언 항목 id 집합 — 초기에는 전부 닫힘 */
    const [openIds, setOpenIds] = useState(new Set<string>());
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        get el() {
          return sectionRef.current;
        },
        resetScroll() {
          scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        },
      }),
      []
    );

    const toggle = (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };

    return (
      <section
        className={styles.career}
        id="p-career"
        aria-label="경력"
        ref={sectionRef}
      >
        <AuroraBackground reduced={reduced} />

        <div className={styles.careerScroll} ref={scrollRef}>
          <div className={styles.careerHero}>
            <div>
              <div className={common.eyebrow}>만들며 성장해온 기록</div>
              <h1>
                Where I&apos;ve
                <br />
                built things.
              </h1>
            </div>
            <div className={styles.careerMeta}>
              <div>
                <b>11+</b> years &nbsp;/&nbsp; <b>5</b> companies &nbsp;/&nbsp;
                <b>46</b> projects
              </div>
              <div>Building Better Interfaces</div>
            </div>
          </div>

          <div className={styles.expList}>
            {EXPERIENCES.map((exp, i) => {
              const open = openIds.has(exp.id);
              return (
                <div
                  key={exp.id}
                  className={`${styles.exp}${open ? ` ${styles.open}` : ""}`}
                >
                  <button
                    type="button"
                    className={styles.expHead}
                    aria-expanded={open}
                    aria-controls={`exp-body-${exp.id}`}
                    onClick={() => toggle(exp.id)}
                  >
                    <span className={styles.expIndex}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.expTitleWrap}>
                      <span className={styles.expMobilePeriod}>
                        {exp.period}
                      </span>
                      <span className={styles.expName}>
                        {exp.name}
                        {exp.current && (
                          <span className={styles.now}>CURRENT</span>
                        )}
                      </span>
                      <span className={styles.expRole}>{exp.role}</span>
                      <span className={styles.expSummary}>{exp.summary}</span>
                    </span>
                    <span className={styles.expPeriod}>{exp.period}</span>
                    <span className={styles.expToggle} aria-hidden="true" />
                  </button>

                  {/* 닫힘 상태에서는 inert로 스크린리더/포커스 접근 차단 — grid 0fr은 시각적으로만 숨김 */}
                  <div
                    className={styles.expBody}
                    id={`exp-body-${exp.id}`}
                    inert={!open}
                  >
                    <div className={styles.expBodyInner}>
                      <div className={styles.expCard}>
                        {exp.groups.map((group) => (
                          <div key={group.title} className={styles.expGroup}>
                            <div className={styles.expGroupTitle}>
                              {group.title}
                            </div>
                            {group.bullets && (
                              <ul className={styles.expBullets}>
                                {group.bullets.map((b) => (
                                  <li key={b}>{b}</li>
                                ))}
                              </ul>
                            )}
                            {group.note && (
                              <p className={styles.expNote}>{group.note}</p>
                            )}
                          </div>
                        ))}
                        <div className={styles.expTags}>
                          {exp.tags.map((t) => (
                            <span key={t} className={styles.expTag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <EdgeButton pos="left" target="hero" onGo={onGo}>
          Home
        </EdgeButton>
        <div className={common.shade} data-shade aria-hidden="true" />
      </section>
    );
  }
);

CareerPanel.displayName = "CareerPanel";
export default CareerPanel;
