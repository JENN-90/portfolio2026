import { forwardRef } from "react";
import EdgeButton from "../ui/EdgeButton";
import AuroraBackground from "../ui/AuroraBackground";
import type { PanelName } from "../../data/projects";
import common from "../../styles/common.module.scss";

interface ContactPanelProps {
  onGo: (target: PanelName) => void;
  reduced: boolean;
}

const ContactPanel = forwardRef<HTMLElement, ContactPanelProps>(
  ({ onGo, reduced }, ref) => {
    return (
      <section
        className={common.panel}
        id="p-contact"
        aria-label="이력서 및 연락처"
        ref={ref}
      >
        <AuroraBackground reduced={reduced} />
        <div className={common.eyebrow}>Resume &amp; Contact</div>
        <h1>UI를 설계하고, 경험을 구현합니다</h1>
        <p className={common.sub}>
          좋은 UI는 보기 좋은 화면에서 끝나지 않습니다. <br />
          유지보수와 협업까지 고려한 구조를 설계하고, 사용자에게 자연스러운
          경험으로 완성합니다.
        </p>
        {/* <div className={common.links}>
          <a
            className={`${common.btn} ${common.primary}`}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            이력서 PDF ↓
          </a>
          <a
            className={common.btn}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            📧 Email
          </a>
          <a
            className={common.btn}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            GitHub
          </a>
          <a
            className={common.btn}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            LinkedIn
          </a>
        </div> */}
        {/* contact form */}
        <EdgeButton pos="right" target="hero" onGo={onGo}>
          Home
        </EdgeButton>
        <div className={common.shade} data-shade aria-hidden="true" />
      </section>
    );
  }
);

ContactPanel.displayName = "ContactPanel";
export default ContactPanel;
