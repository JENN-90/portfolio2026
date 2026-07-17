import type { PanelName } from '../../data/projects';
import styles from './EdgeButton.module.scss';

type EdgePos = 'left' | 'right' | 'top' | 'bottom';
type ArrDir = 'l' | 'r' | 'u' | 'd';

interface EdgeButtonProps {
  pos: EdgePos;
  target: PanelName;
  onGo: (target: PanelName) => void;
  children: React.ReactNode;
}

const ARR_DIR: Record<EdgePos, ArrDir> = {
  left: 'l', right: 'r', top: 'u', bottom: 'd',
};

const ARR_SYMBOL: Record<ArrDir, string> = {
  l: '←', r: '→', u: '↑', d: '↓',
};

export default function EdgeButton({ pos, target, onGo, children }: EdgeButtonProps) {
  const dir = ARR_DIR[pos];
  const sym = ARR_SYMBOL[dir];
  const isLeft = pos === 'left' || pos === 'top';
  const arrow = <span className={`${styles.arr} ${styles[dir]}`}>{sym}</span>;

  return (
    <button
      className={`${styles.edge} ${styles[pos]}`}
      onClick={() => onGo(target)}
    >
      {isLeft && arrow}
      {children}
      {!isLeft && arrow}
    </button>
  );
}
