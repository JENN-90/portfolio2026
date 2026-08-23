import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.scss";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduced || noHover) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor]")) {
        cursor.classList.add(styles.active);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor]")) {
        cursor.classList.remove(styles.active);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className={styles.cursor} ref={cursorRef} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.ring} />
    </div>
  );
}
