import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./ScrollProgress.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { scrub: 0.3, start: "top top", end: "max" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return <div className={styles.progress} ref={barRef} />;
}
