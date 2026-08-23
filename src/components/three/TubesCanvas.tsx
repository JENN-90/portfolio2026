import { useEffect, useRef } from "react";
import TubesCursor from "threejs-components/build/cursors/tubes1.min.js";
import styles from "./TubesCanvas.module.scss";

export default function TubesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    let app: ReturnType<typeof TubesCursor> | undefined;
    try {
      app = TubesCursor(canvas, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
          },
        },
      });
    } catch {
      return;
    }

    return () => {
      app?.dispose();
    };
  }, []);

  return (
    <div className={styles.canvasHost} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
