import { forwardRef, useState } from "react";
import type { FormEvent } from "react";
import EdgeButton from "../ui/EdgeButton";
import AuroraBackground from "../ui/AuroraBackground";
import type { PanelName } from "../../data/projects";
import common from "../../styles/common.module.scss";
import styles from "./ContactPanel.module.scss";

interface ContactPanelProps {
  onGo: (target: PanelName) => void;
  reduced: boolean;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ContactPanel = forwardRef<HTMLElement, ContactPanelProps>(
  ({ onGo, reduced }, ref) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === "loading") return;

      setStatus("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error ?? "전송에 실패했습니다.");
        }

        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "전송에 실패했습니다."
        );
      }
    };

    return (
      <section
        className={common.panel}
        id="p-contact"
        aria-label="이력서 및 연락처"
        ref={ref}
      >
        <AuroraBackground reduced={reduced} />
        {/* <div className={common.eyebrow}>Contact</div> */}
        <h1>
          <b>UI를 설계</b>하고, <b>경험을 구현</b>합니다.
        </h1>
        <p className={common.sub}>
          좋은 UI는 보기 좋은 화면에서 끝나지 않습니다. <br />
          유지보수와 협업까지 고려한 구조를 설계하고, 사용자에게 자연스러운
          경험으로 완성합니다.
        </p>
        <div className={common.links}>
          <a className={`${common.btn} ${common.secondary}`} href="resume.pdf">
            이력서 PDF
          </a>
          <a
            className={`${common.btn} ${common.secondary}`}
            href="mailto:syriana77@naver.com"
          >
            Email
          </a>
          <a
            className={`${common.btn}`}
            href="https://github.com/JENN-90"
            target="_blank"
          >
            GitHub
          </a>
          {/* <a
            className={`${common.btn} ${common.secondary}`}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            LinkedIn
          </a> */}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              className={styles.field}
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={styles.field}
              type="email"
              placeholder="답장받을 이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            className={`${styles.field} ${styles.textarea}`}
            placeholder="전하고 싶은 메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
            required
          />
          <button
            type="submit"
            className={styles.submit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "전송 중..." : "메시지 보내기"}
          </button>
          <p
            className={`${styles.status} ${
              status === "success" ? styles.success : ""
            } ${status === "error" ? styles.error : ""}`}
            role="status"
          >
            {status === "success" && "메시지가 전송되었습니다. 감사합니다!"}
            {status === "error" && errorMsg}
          </p>
        </form>
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
