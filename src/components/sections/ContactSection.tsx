import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./ContactSection.module.scss";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
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
      setTimeout(() => setStatus("idle"), 2600);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "전송에 실패했습니다.");
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="wrap">
        <div className={`${styles.contactHead} reveal`}>
          <h2>
            UI를 설계하고, <em>경험을 구현</em>합니다.
          </h2>
          <p>
            좋은 UI는 보기 좋은 화면에서 끝나지 않습니다.
            <br />
            유지보수와 협업까지 고려한 구조를 설계하고, 사용자에게 자연스러운
            경험으로 완성합니다.
          </p>
        </div>

        <div className={`${styles.contactPills} reveal`}>
          <a className={styles.pillBtn} href="/docs/resume_2026.pdf" download="resume_2026.pdf">
            이력서 PDF
          </a>
          <a className={styles.pillBtn} href="mailto:syriana77@naver.com">
            Email
          </a>
        </div>

        <form className={`${styles.contactForm} reveal`} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <span className={styles.fieldAccent} />
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="이름(Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldAccent} />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="메일(Email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <span className={styles.fieldAccent} />
            <textarea
              name="message"
              placeholder="전하고 싶은 메시지를 남겨주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.submitBtn} ${status === "success" ? styles.sent : ""}`}
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "전송 중..."
              : status === "success"
              ? "전송 완료"
              : "메시지 보내기"}
          </button>
          <div
            className={`${styles.formNote} ${
              status === "success" || status === "error" ? styles.show : ""
            }`}
          >
            {status === "success" &&
              "메시지가 전달되었습니다. 빠르게 답장드릴게요 :)"}
            {status === "error" && errorMsg}
          </div>
        </form>
      </div>
    </section>
  );
}
