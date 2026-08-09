import styles from "./Header.module.scss";

type SectionId = "work" | "career" | "contact";

interface HeaderProps {
  active: SectionId | "";
}

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "Work", id: "work" },
  { label: "Career", id: "career" },
  { label: "Contact", id: "contact" },
];

export default function Header({ active }: HeaderProps) {
  const handleClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.id}>
          <span className={styles.swatch} />
          SORA.JEONG
        </div>
        <ul>
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? styles.active : ""}
                onClick={(e) => handleClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
