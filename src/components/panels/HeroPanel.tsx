import { forwardRef, useEffect, useRef } from "react";
import heroVideo from "../../assets/hero.mp4";
import EdgeButton from "../ui/EdgeButton";
import AuroraBackground from "../ui/AuroraBackground";
import type { PanelName } from "../../data/projects";
import common from "../../styles/common.module.scss";
import styles from "./HeroPanel.module.scss";

interface HeroPanelProps {
  onGo: (target: PanelName) => void;
  reduced: boolean;
}

const HeroPanel = forwardRef<HTMLElement, HeroPanelProps>(
  ({ onGo, reduced }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (reduced && videoRef.current) {
        videoRef.current.autoplay = false;
        videoRef.current.pause();
      }
    }, [reduced]);

    return (
      <section
        className={`${styles.hero} ${common.current}`}
        id="p-hero"
        aria-label="메인"
        ref={ref}
      >
        <AuroraBackground reduced={reduced}>
          <video
            ref={videoRef}
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(e) =>
              (e.currentTarget as HTMLVideoElement).classList.add(styles.ready)
            }
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).style.display = "none";
            }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </AuroraBackground>
        <div className={common.eyebrow}>UI Developer Portfolio</div>
        <h1>화면 너머의 사용자를 먼저 생각하고 고민합니다. </h1>
        <p className={common.sub}>
          교육 · 금융 · 게임 플랫폼을 거쳐온 UI Developer
          <br />
          사용자가 마주하는 모든 화면을 책임지고 있습니다.
        </p>
        <EdgeButton pos="left" target="contact" onGo={onGo}>
          Resume &amp; Contact
        </EdgeButton>
        <EdgeButton pos="right" target="career" onGo={onGo}>
          Career
        </EdgeButton>
        <EdgeButton pos="bottom" target="works" onGo={onGo}>
          Featured Works
        </EdgeButton>
        <div className={common.shade} data-shade aria-hidden="true" />
      </section>
    );
  }
);

HeroPanel.displayName = "HeroPanel";
export default HeroPanel;
