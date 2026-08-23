import styles from "./Footer.module.scss";
import { scrollToEl } from "../../lib/lenis";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 SORA JEONG</span>
      <button
        type="button"
        className={styles.toTop}
        aria-label="맨 위로"
        onClick={() => scrollToEl(0)}
      >
        ↑
      </button>
    </footer>
  );
}
