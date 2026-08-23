import styles from "./ContactSection.module.scss";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/JENN-90#" },
  { label: "Resume/이력서", href: "/docs/resume_2026.pdf" },
  // { label: "LinkedIn", href: "#" },
];

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.label}>( Contact )</div>

        <h2 className={`${styles.heading} reveal`}>
          Let&apos;s Build
          <br />
          <span className={styles.outline} data-cursor="contact">
            Something Great.
          </span>
        </h2>

        <a
          className={`${styles.email} reveal`}
          href="mailto:syriana77@naver.com"
        >
          syriana77@naver.com
        </a>

        <div className={`${styles.socials} reveal`}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
