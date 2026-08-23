import { useEffect, useRef } from "react";
import gsap from "gsap";
import TubesCanvas from "../three/TubesCanvas";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(".reveal");

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 46 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className={styles.hero} ref={rootRef}>
      <div className={styles.canvasWrap} aria-hidden="true">
        <TubesCanvas />
      </div>

      <div className={`${styles.eyebrow} reveal`}>
        <span className={styles.eyebrowDot} />
        <span>UI Developer — Portfolio 2026</span>
      </div>

      <h1 className={styles.title}>
        <span className={`${styles.titleLine} reveal`}>Sora</span>
        <span className={`${styles.titleOutline} reveal`}>
          Jeong
          <em className={styles.mark}>.</em>
        </span>
      </h1>

      <p className={`${styles.intro} reveal`}>
        사용자가 마주하는 모든 화면을 책임집니다.
        <br />
        디테일한 인터랙션과 견고한 퍼블리싱으로 제품의 경험을 완성하는 <br />
        UI 개발자입니다.
      </p>

      <div className={styles.scroll}>
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>

      <div className={styles.location}>
        SEOUL, KR — <span className={styles.openToWork}>OPEN TO WORK</span>
      </div>
    </section>
  );
}
