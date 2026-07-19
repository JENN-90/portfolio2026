import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import AuroraBackground from "./AuroraBackground";
import styles from "./LoadingScreen.module.scss";

interface LoadingScreenProps {
  /** 로딩 완료 시점(0~100 도달) 콜백 */
  onComplete?: () => void;
  /** 진행 완료까지 걸리는 시간(ms) */
  duration?: number;
}

const MESSAGES = [
  "로딩중입니다. 잠시만 기다려주세요!",
  "안녕하세요! 환영합니다!",
  "멋진 화면을 준비하고 있어요!",
  "조금만 더 기다려주세요!",
  "곧 시작됩니다!",
];

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LoadingScreen({
  onComplete,
  duration = 5000,
}: LoadingScreenProps) {
  const reduced = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [fadingOut, setFadingOut] = useState(false);
  const progressRef = useRef({ value: 0 });
  const circleRef = useRef<SVGCircleElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  /* 원형 프로그레스바 채우기 애니메이션 */
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

  /* 완료 후 페이드아웃 */
  useEffect(() => {
    if (!fadingOut || !rootRef.current) return;
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.out",
      onComplete,
    });
  }, [fadingOut, onComplete]);

  /* 2초마다 랜덤 텍스트 전환 */
  useEffect(() => {
    const pickNext = () => {
      setMessage((prev) => {
        const candidates = MESSAGES.filter((m) => m !== prev);
        return candidates[Math.floor(Math.random() * candidates.length)];
      });
    };
    const id = setInterval(pickNext, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      <AuroraBackground reduced={reduced} />
      <div className={styles.content}>
        <div className={styles.gaugeWrap}>
          <svg className={styles.gauge} viewBox="0 0 200 200">
            <defs>
              <linearGradient
                id="gaugeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c9b8ff" />
                <stop offset="100%" stopColor="#6b4fff" />
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
        <p key={message} className={styles.message}>
          {message}
        </p>
      </div>
    </div>
  );
}
