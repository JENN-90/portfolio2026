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
  "픽셀 정리중...",
  "디테일을 다듬는 중입니다...",
  "다 왔어요!",
];

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LoadingScreen({
  onComplete,
  duration = 2200,
}: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [fadingOut, setFadingOut] = useState(false);
  const progressRef = useRef({ value: 0 });
  const circleRef = useRef<SVGCircleElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(progressRef.current, {
      value: 100,
      duration: duration / 1000,
      ease: "power2.out",
      onUpdate: () => {
        const v = progressRef.current.value;
        setPercent(v);
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = String(
            CIRCUMFERENCE * (1 - v / 100)
          );
        }
      },
      onComplete: () => setFadingOut(true),
    });
    return () => {
      tween.kill();
    };
  }, [duration]);

  useEffect(() => {
    if (!fadingOut || !rootRef.current) return;
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete,
    });
  }, [fadingOut, onComplete]);

  useEffect(() => {
    const interval = duration / MESSAGES.length;
    const id = setInterval(() => {
      setMessage((prev) => {
        const next = MESSAGES.indexOf(prev) + 1;
        if (next >= MESSAGES.length) {
          clearInterval(id);
          return prev;
        }
        return MESSAGES[next];
      });
    }, interval);
    return () => clearInterval(id);
  }, [duration]);

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.content}>
        <div className={styles.gaugeWrap}>
          <svg
            className={styles.gauge}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="gaugeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--c1)" />
                <stop offset="100%" stopColor="var(--c2)" />
              </linearGradient>
            </defs>
            <circle className={styles.track} cx="100" cy="100" r={RADIUS} />
            <circle
              ref={circleRef}
              className={styles.progress}
              cx="100"
              cy="100"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
            />
          </svg>
          <div className={styles.percentText}>{percent.toFixed(1)}%</div>
        </div>
        <p key={message} className={styles.message} role="status">
          {message}
        </p>
      </div>
    </div>
  );
}
