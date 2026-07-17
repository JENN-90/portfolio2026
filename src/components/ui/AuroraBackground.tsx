import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AuroraBackground.module.scss';

interface AuroraBackgroundProps {
  reduced: boolean;
  children?: React.ReactNode;
}

/* 패널 공통 오로라 배경 — 드리프트/색조 애니메이션 + 커서 글로우 */
export default function AuroraBackground({ reduced, children }: AuroraBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const aurorasRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (reduced) return;

    /* 오로라 드리프트 애니메이션 */
    const drifts = [
      { x: '7vmax', y: '5vmax', scale: 1.12, rot: '+=6', dur: 21 },
      { x: '-9vmax', y: '6vmax', scale: 1.18, rot: '-=8', dur: 26 },
      { x: '6vmax', y: '-6vmax', scale: 1.10, rot: '+=5', dur: 17 },
    ];
    aurorasRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        x: drifts[i].x, y: drifts[i].y, scale: drifts[i].scale, rotation: drifts[i].rot,
        duration: drifts[i].dur, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    });

    /* 색조 랜덤 전환 */
    function shiftHue(el: HTMLElement) {
      gsap.to(el, {
        '--h': gsap.utils.random(160, 340),
        duration: gsap.utils.random(5, 10),
        ease: 'sine.inOut',
        onComplete: () => shiftHue(el),
      });
    }
    aurorasRef.current.forEach((el) => { if (el) shiftHue(el); });

    const els = aurorasRef.current.slice();
    return () => { els.forEach((el) => { if (el) gsap.killTweensOf(el); }); };
  }, [reduced]);

  /* 커서 글로우 — 부모 패널의 mousemove 추적 */
  useEffect(() => {
    const root = rootRef.current;
    const parent = root?.parentElement;
    if (!root || !parent || reduced) return;
    const handler = (e: MouseEvent) => {
      root.style.setProperty('--mx', (e.clientX / innerWidth * 100) + '%');
      root.style.setProperty('--my', (e.clientY / innerHeight * 100) + '%');
    };
    parent.addEventListener('mousemove', handler);
    return () => parent.removeEventListener('mousemove', handler);
  }, [reduced]);

  return (
    <div className={styles.canvas} ref={rootRef} aria-hidden="true">
      {children}
      <div
        className={`${styles.aurora} ${styles.aurora1}`}
        ref={(el) => { if (el) aurorasRef.current[0] = el; }}
      />
      <div
        className={`${styles.aurora} ${styles.aurora2}`}
        ref={(el) => { if (el) aurorasRef.current[1] = el; }}
      />
      <div
        className={`${styles.aurora} ${styles.aurora3}`}
        ref={(el) => { if (el) aurorasRef.current[2] = el; }}
      />
      <div className={styles.vignette} />
      <div className={styles.cursorGlow} />
    </div>
  );
}
