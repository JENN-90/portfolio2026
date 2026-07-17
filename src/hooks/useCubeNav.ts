import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { type PanelName, GRID, NAV_MAP, ROUTE, FROM_ROUTE } from '../data/projects';

const DUR = 1.2;
const EASE = 'power4.inOut';

interface PanelRefs {
  hero: HTMLElement | null;
  contact: HTMLElement | null;
  career: HTMLElement | null;
  works: HTMLElement | null;
}

export function useCubeNav(
  panelRefs: React.RefObject<PanelRefs>,
  stageRef: React.RefObject<HTMLElement | null>,
  cubeRef: React.RefObject<HTMLElement | null>,
  onBeforeGo?: (target: PanelName) => void,
) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [current, setCurrent] = useState<PanelName>(() => {
    return FROM_ROUTE[location.hash] ?? 'hero';
  });
  const animating = useRef(false);
  const currentRef = useRef<PanelName>(current);
  currentRef.current = current;
  const onBeforeGoRef = useRef(onBeforeGo);
  onBeforeGoRef.current = onBeforeGo;

  const setCurrentOnly = useCallback((name: PanelName) => {
    const panels = panelRefs.current;
    const cube = cubeRef.current;
    if (!panels || !cube) return;

    (Object.keys(panels) as PanelName[]).forEach((k) => {
      const el = panels[k];
      if (!el) return;
      el.style.transform = '';
      el.style.visibility = k === name ? 'visible' : 'hidden';
      /* CSS Module로 클래스명이 해시되므로 shade는 data 속성으로 조회 */
      const sh = el.querySelector<HTMLElement>('[data-shade]');
      if (sh) {
        gsap.killTweensOf(sh);
        sh.style.visibility = 'hidden';
        sh.style.opacity = '0';
      }
    });
    cube.style.transform = '';
  }, [panelRefs, cubeRef]);

  /* 마운트 후 초기 패널 적용 — panelRefs가 세팅된 다음 프레임에 실행 */
  useEffect(() => {
    const initial = FROM_ROUTE[location.hash] ?? 'hero';
    setCurrentOnly(initial);
    /* hash가 없으면 #/ 로 정규화 */
    if (!location.hash || location.hash === '#') {
      history.replaceState(null, '', ROUTE[initial]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback((target: PanelName, pushRoute = true) => {
    const panels = panelRefs.current;
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!panels || !stage || !cube) return;

    const prev = currentRef.current;
    if (!GRID[target] || target === prev || animating.current) return;

    onBeforeGoRef.current?.(target);
    animating.current = true;

    setCurrent(target);
    currentRef.current = target;

    /* Nav/Minimap 활성 표시는 current state 변경으로 React가 리렌더링 */
    if (pushRoute && location.hash !== ROUTE[target]) {
      history.pushState(null, '', ROUTE[target]);
    }

    if (reduced) {
      const targetEl = panels[target];
      if (targetEl) {
        targetEl.style.visibility = 'visible';
        gsap.fromTo(targetEl, { autoAlpha: 0 }, {
          autoAlpha: 1, duration: 0.01,
          onComplete() { setCurrentOnly(target); animating.current = false; },
        });
      }
      return;
    }

    const [cx, cy] = GRID[prev];
    const [tx, ty] = GRID[target];
    const dx = tx - cx, dy = ty - cy;
    const axisY = dx !== 0;
    const W = innerWidth, H = innerHeight;
    const D = axisY ? W / 2 : H / 2;
    const dir = axisY ? (dx > 0 ? 1 : -1) : (dy > 0 ? 1 : -1);
    const faceRot = axisY ? `rotateY(${dir * 90}deg)` : `rotateX(${dir * -90}deg)`;
    const cubeEnd = axisY ? { y: -dir * 90, x: 0 } : { y: 0, x: dir * 90 };

    const cur = panels[prev];
    const nxt = panels[target];
    if (!cur || !nxt) { animating.current = false; return; }

    const curShade = cur.querySelector<HTMLElement>('[data-shade]');
    const nxtShade = nxt.querySelector<HTMLElement>('[data-shade]');

    cube.style.transform = `translateZ(${-D}px) rotateX(0deg) rotateY(0deg)`;
    cur.style.transform = `translateZ(${D}px)`;
    cur.style.visibility = 'visible';
    nxt.style.transform = `${faceRot} translateZ(${D}px)`;
    nxt.style.visibility = 'visible';

    if (curShade) { curShade.style.visibility = 'visible'; curShade.style.opacity = '0'; }
    if (nxtShade) { nxtShade.style.visibility = 'visible'; nxtShade.style.opacity = '0.55'; }

    const rot = { t: 0 };
    const tl = gsap.timeline({
      onComplete() { setCurrentOnly(target); animating.current = false; },
    });

    tl.to(rot, {
      t: 1, duration: DUR, ease: EASE,
      onUpdate() {
        const ry = cubeEnd.y * rot.t, rx = cubeEnd.x * rot.t;
        cube.style.transform = `translateZ(${-D}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      },
    }, 0);

    tl.to(stage, { scale: 0.84, duration: DUR / 2, ease: 'power2.in' }, 0)
      .to(stage, { scale: 1, duration: DUR / 2, ease: 'power2.out' }, DUR / 2);

    if (curShade) tl.to(curShade, { opacity: 0.55, duration: DUR, ease: 'power2.inOut' }, 0);
    if (nxtShade) tl.to(nxtShade, { opacity: 0, duration: DUR, ease: 'power2.inOut' }, 0);

    return tl;
  }, [panelRefs, stageRef, cubeRef, reduced, setCurrentOnly]);

  /* 키보드 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (animating.current) return;
      const key = ({ ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' } as Record<string, string>)[e.key];
      if (!key) return;
      const cur = currentRef.current;
      if (cur === 'works') return;
      const next = NAV_MAP[cur]?.[key as 'left' | 'right' | 'up' | 'down'];
      if (next) { e.preventDefault(); go(next); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  /* 휠: hero에서 아래로 스크롤 → works 전환 — transition 중에는 무시 */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (animating.current) return;
      if (currentRef.current === 'hero' && e.deltaY > 30) go('works');
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [go]);

  /* 터치: hero에서 위 스와이프 → works */
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      if (animating.current) return;
      if (currentRef.current !== 'hero') return;
      const dy = e.changedTouches[0].clientY - startY;
      if (dy < -60) go('works');
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [go]);

  /* 해시 라우팅 */
  useEffect(() => {
    const sync = () => {
      const t = FROM_ROUTE[location.hash] ?? 'hero';
      if (t !== currentRef.current) go(t, false);
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [go]);

  return { current, go, animating, reduced };
}
