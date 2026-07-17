import { useRef } from 'react';
import { useCubeNav } from '../hooks/useCubeNav';
import HeroPanel from './panels/HeroPanel';
import ContactPanel from './panels/ContactPanel';
import CareerPanel from './panels/CareerPanel';
import WorksPanel, { type WorksPanelHandle } from './panels/WorksPanel';
import Nav from './ui/Nav';
import Minimap from './ui/Minimap';
import styles from './CubeStage.module.scss';

interface PanelRefs {
  hero: HTMLElement | null;
  contact: HTMLElement | null;
  career: HTMLElement | null;
  works: HTMLElement | null;
}

export default function CubeStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<PanelRefs>({ hero: null, contact: null, career: null, works: null });
  const worksHandleRef = useRef<WorksPanelHandle>(null);

  const { current, go, reduced, animating } = useCubeNav(
    panelRefs as React.RefObject<PanelRefs>,
    stageRef as React.RefObject<HTMLElement | null>,
    cubeRef as React.RefObject<HTMLElement | null>,
    (target) => {
      if (target === 'works') worksHandleRef.current?.resetScroll();
    },
  );

  const handleGo = go;

  return (
    <>
      <Nav current={current} onGo={handleGo} />
      <Minimap current={current} />

      <div className={styles.stage} ref={stageRef}>
        <div className={styles.cube} ref={cubeRef}>
          <HeroPanel
            ref={(el) => { panelRefs.current.hero = el; }}
            onGo={handleGo}
            reduced={reduced}
          />
          <ContactPanel
            ref={(el) => { panelRefs.current.contact = el; }}
            onGo={handleGo}
            reduced={reduced}
          />
          <CareerPanel
            ref={(el) => { panelRefs.current.career = el; }}
            onGo={handleGo}
            reduced={reduced}
          />
          <WorksPanel
            ref={(handle) => {
              worksHandleRef.current = handle;
              panelRefs.current.works = handle?.el ?? null;
            }}
            onGo={handleGo}
            reduced={reduced}
            isActive={current === 'works'}
            animating={animating}
          />
        </div>
      </div>
    </>
  );
}
