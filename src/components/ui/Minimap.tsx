import type { PanelName } from '../../data/projects';
import styles from './Minimap.module.scss';

interface MinimapProps {
  current: PanelName;
}

const MINIMAP_ITEMS: Array<{ key: PanelName | null }> = [
  { key: 'contact' }, { key: 'hero' }, { key: 'career' },
  { key: null }, { key: 'works' }, { key: null },
];

export default function Minimap({ current }: MinimapProps) {
  return (
    <div className={styles.minimap} aria-hidden="true">
      {MINIMAP_ITEMS.map((item, i) =>
        item.key ? (
          <span key={i} className={current === item.key ? styles.on : ''} />
        ) : (
          <span key={i} className={styles.blank} />
        )
      )}
    </div>
  );
}
