import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./LoadingScreen.module.scss";

interface LoadingScreenProps {
  /** 로딩 완료 시점(0~100 도달) 콜백 */
  onComplete?: () => void;
  /** 진행 완료까지 걸리는 시간(ms) */
  duration?: number;
}

const MESSAGES = [
  "화면 너머의 사용자를 먼저 생각하고 고민합니다",
  "데스크탑 브라우저에서 최적의 화면을 제공합니다. 원활한 감상을 위해 PC 환경에서 접속해 주세요 :)",
  "조금만 기다려주세요, 디테일을 다듬는 중입니다.",
];

const MESSAGE_INTERVAL = 2000;

export default function LoadingScreen({
  onComplete,
  duration = 5000,
}: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [msgIndex, setMsgIndex] = useState(-1);
  const [fadingOut, setFadingOut] = useState(false);
  const progressRef = useRef({ value: 0 });
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(progressRef.current, {
      value: 100,
      duration: duration / 1000,
      ease: "power3.out",
      onUpdate: () => {
        const v = progressRef.current.value;
        setPercent(Math.min(99, Math.floor(v)));
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${v / 100})`;
        }
      },
      onComplete: () => setFadingOut(true),
    });
    return () => {
      tween.kill();
    };
  }, [duration]);

  useEffect(() => {
    setMsgIndex(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= MESSAGES.length) {
        clearInterval(id);
        return;
      }
      setMsgIndex(i);
    }, MESSAGE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!fadingOut || !rootRef.current) return;
    gsap.to(rootRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      delay: 0.25,
      onComplete,
    });
  }, [fadingOut, onComplete]);

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.topRow}>
        <span>
          Sora Jeong<span className={styles.dot}>*</span>
        </span>
        <span>Loading Portfolio</span>
      </div>

      <div className={styles.counterRow}>
        <div className={styles.count}>{String(percent).padStart(2, "0")}</div>
        <div className={styles.percentSign}>%</div>
      </div>

      <div className={styles.messageRow}>
        {msgIndex >= 0 && (
          <span key={msgIndex} className={styles.message}>
            {MESSAGES[msgIndex]}
          </span>
        )}
      </div>

      <div className={styles.bottom}>
        <div className={styles.track}>
          <div className={styles.bar} ref={barRef} />
        </div>
        <div className={styles.bottomRow}>
          <span>UI Developer</span>
          <span>Seoul, KR</span>
        </div>
      </div>
    </div>
  );
}
