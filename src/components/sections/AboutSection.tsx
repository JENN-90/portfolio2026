import styles from "./AboutSection.module.scss";

/* TODO: 아래 자기소개 문구·통계 수치는 index_v2 샘플 데이터입니다. 실제 정보로 교체 예정입니다. */
const STATS = [
  { value: "11", suffix: "+", label: "Years Experience" },
  { value: "46", suffix: "+", label: "Projects Delivered" },
  { value: "4", suffix: "+", label: "Industry Domains" },
  { value: "100", suffix: "%", label: "Ownership to Completion" },
];

const SKILLS = [
  "HTML5",
  "CSS / SCSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "GSAP",
  "Figma",
  "Design System",
  "Accessibility",
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>( About )</div>
          <p className={`${styles.intro} reveal`}>
            안녕하세요, UI 개발자 <span className={styles.accent}>정소라</span>
            입니다.
            <br />
            픽셀 단위의 완성도와 자연스러운 모션을 함께 고민하며, <br />
            <span className={styles.muted}>
              기획–디자인–개발 사이의 간극을 메우는 일
            </span>
            을 좋아합니다.
          </p>
        </div>

        <div className={styles.stats}>
          {STATS.map((stat) => (
            <div className={`reveal`} key={stat.label}>
              <div className={styles.statValue}>
                {stat.value}
                {stat.suffix && <i className={styles.suffix}>{stat.suffix}</i>}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.skillsBlock}>
        <div className={styles.skillLabel}>( Skills )</div>
        <div className={styles.skillList}>
          {SKILLS.map((skill) => (
            <span className={`${styles.pill} reveal`} key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
