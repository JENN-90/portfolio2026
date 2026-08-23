import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.scss";

interface MarqueeProps {
  items: string[];
  repeat?: number;
}

export default function Marquee({ items, repeat = 4 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const loopedItems = Array.from({ length: repeat }).flatMap(() => items);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 트랙은 아이템 세트를 repeat번 복제해 렌더링하므로, 세트 하나(1/repeat)만큼만
      // 이동하면 정확히 이어붙는 것처럼 보이는 무한 루프를 만들 수 있다.
      tweenRef.current = gsap.to(track, {
        xPercent: -100 / repeat,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, [repeat]);

  const handleEnter = () => tweenRef.current?.pause();
  const handleLeave = () => tweenRef.current?.resume();

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track} ref={trackRef}>
        {loopedItems.map((text, i) => (
          <span
            className={styles.item}
            key={i}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <span>{text}</span>
            <i className={styles.dot}>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
