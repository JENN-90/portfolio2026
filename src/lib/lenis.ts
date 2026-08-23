import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

export function createLenis(): Lenis {
  instance = new Lenis({
    autoRaf: false,
  });
  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}

export function scrollToEl(target: HTMLElement | string | number) {
  instance?.scrollTo(target, { offset: 0 });
}
