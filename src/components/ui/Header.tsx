import styles from "./Header.module.scss";
import { scrollToEl } from "../../lib/lenis";
import type { SectionId } from "../../types/section";

interface HeaderProps {
  active: SectionId | "";
}

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "About", id: "about" },
  { label: "Career", id: "career" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Header({ active }: HeaderProps) {
  const handleClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    scrollToEl(`#${id}`);
  };

  return (
    <header className={styles.header}>
      <a
        href="#home"
        className={styles.id}
        onClick={(e) => {
          e.preventDefault();
          scrollToEl(0);
        }}
      >
        SORA JEONG<span className={styles.swatch}>*</span>
      </a>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? styles.active : ""}
            onClick={(e) => handleClick(e, id)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
