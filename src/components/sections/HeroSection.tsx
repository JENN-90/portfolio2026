import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import styles from "./HeroSection.module.scss";

gsap.registerPlugin(SplitText, MorphSVGPlugin);

const BLOB_PATHS = [
  "M478,320Q460,390,400,435Q340,480,270,460Q200,440,150,390Q100,340,110,270Q120,200,170,150Q220,100,290,105Q360,110,415,155Q470,200,478,260Q486,320,478,320Z",
  "M440,300Q430,370,360,410Q290,450,220,420Q150,390,120,320Q90,250,140,190Q190,130,260,120Q330,110,390,155Q450,200,455,250Q460,300,440,300Z",
  "M460,280Q470,350,410,400Q350,450,280,445Q210,440,160,395Q110,350,115,280Q120,210,175,165Q230,120,300,130Q370,140,425,190Q480,240,460,280Z",
  "M420,120Q500,160,505,250Q510,340,450,410Q390,480,300,470Q210,460,150,400Q90,340,110,255Q130,170,205,120Q280,70,350,85Q420,100,420,120Z",
  "M300,90Q400,90,455,170Q510,250,470,340Q430,430,340,465Q250,500,175,440Q100,380,105,285Q110,190,175,140Q240,90,300,90Z",
  "M330,110Q420,140,460,220Q500,300,445,375Q390,450,300,455Q210,460,155,395Q100,330,120,245Q140,160,215,120Q290,80,330,110Z",
];

const EASES = ["sine.inOut", "power2.inOut", "power3.inOut", "circ.inOut"];

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blobRef = useRef<SVGPathElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (reduced || isMobile) return;

    const blob = blobRef.current;
    const orbit = orbitRef.current;
    if (!blob || !orbit) return;

    const shuffledPaths = [...BLOB_PATHS].sort(() => Math.random() - 0.5);

    const morphTl = gsap.timeline({ repeat: -1 });
    shuffledPaths.forEach((path, i) => {
      morphTl.to(blob, {
        morphSVG: path,
        duration: gsap.utils.random(2.2, 4.5),
        ease: EASES[i % EASES.length],
      });
    });

    const floatTl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
    floatTl
      .to(orbit, { y: -28, x: 16, rotate: 8, scale: 1.04, duration: 4.5 })
      .to(orbit, { y: 14, x: -14, rotate: -6, scale: 0.97, duration: 5.5 })
      .to(orbit, { y: -8, x: 20, rotate: 4, scale: 1.02, duration: 4 })
      .to(orbit, { y: 0, x: 0, rotate: 0, scale: 1, duration: 4.5 });

    return () => {
      morphTl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <div className="wrap">
      <div className={styles.heroGrid}>
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

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orbit} ref={orbitRef}>
            <svg viewBox="0 0 560 560" className={styles.blobSvg}>
              <defs>
                <linearGradient id="heroBlobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--c4)" />
                  <stop offset="55%" stopColor="var(--c2)" />
                  <stop offset="100%" stopColor="var(--c5)" />
                </linearGradient>
              </defs>
              <path
                ref={blobRef}
                d={BLOB_PATHS[0]}
                fill="url(#heroBlobGradient)"
              />
            </svg>
            <span className={`${styles.dot} ${styles.dotA}`} />
            <span className={`${styles.dot} ${styles.dotB}`} />
            <span className={`${styles.dot} ${styles.dotC}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
