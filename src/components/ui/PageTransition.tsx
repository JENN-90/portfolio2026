import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import styles from "./PageTransition.module.scss";

let transitionTo: ((path: string, color: string) => void) | null = null;

export function navigateWithTransition(path: string, color: string) {
  transitionTo?.(path, color);
}

export default function PageTransition() {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("var(--c2)");

  useEffect(() => {
    transitionTo = (path: string, c: string) => {
      setColor(c);
      const el = overlayRef.current;
      if (!el) {
        navigate(path);
        return;
      }
      gsap.set(el, { scaleY: 0, transformOrigin: "bottom" });
      gsap
        .timeline()
        .to(el, { scaleY: 1, duration: 0.45, ease: "power4.inOut" })
        .call(() => navigate(path))
        .set(el, { transformOrigin: "top" })
        .to(el, { scaleY: 0, duration: 0.5, ease: "power4.inOut", delay: 0.05 });
    };
    return () => {
      transitionTo = null;
    };
  }, [navigate]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{ background: color }}
    />
  );
}
