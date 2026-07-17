import type { PanelName } from '../../data/projects';
import styles from './Nav.module.scss';

interface NavProps {
  current: PanelName;
  onGo: (target: PanelName) => void;
}

const NAV_ITEMS: { label: string; target: PanelName; href: string }[] = [
  { label: 'Resume & Contact', target: 'contact', href: '#/contact' },
  { label: 'Home', target: 'hero', href: '#/' },
  { label: 'Career', target: 'career', href: '#/career' },
  { label: 'Works', target: 'works', href: '#/works' },
];

export default function Nav({ current, onGo }: NavProps) {
  return (
    <nav className={styles.nav} aria-label="주요 화면 이동">
      {NAV_ITEMS.map(({ label, target, href }) => (
        <a
          key={target}
          href={href}
          className={current === target ? styles.active : ''}
          onClick={(e) => { e.preventDefault(); onGo(target); }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
