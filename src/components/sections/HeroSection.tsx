import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./HeroSection.module.scss";

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = titleRef.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitText | undefined;
    document.fonts.ready.then(() => {
      split = SplitText.create(el, { type: "words, chars" });
      gsap.set(split.chars, { yPercent: 110, opacity: 0 });
      gsap.set(el, { opacity: 1 });

      const timer = setTimeout(() => {
        gsap.to(split!.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.018,
        });
      }, 1000);

      return () => clearTimeout(timer);
    });

    return () => {
      split?.revert();
    };
  }, []);

  return (
    <div className="wrap">
      <div className={styles.titleBlock}>
        <div className={`${styles.eyebrow} mono reveal`}>
          UI Developer / portfolio
        </div>
        <h1 className={styles.splitTitle} ref={titleRef}>
          화면 너머의 <em>사용자</em>를
          <br />
          먼저 <em>생각하고 고민</em>합니다.
        </h1>
        <p className="reveal">
          코드와 인터랙션으로 즐거운 경험을 만드는 UI 개발자입니다. <br />
          최근 진행한 프로젝트와 저의 경력을 확인해보세요.
        </p>
      </div>
    </div>
  );
}
