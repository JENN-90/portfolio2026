/// <reference types="vite/client" />

declare module "threejs-components/build/cursors/tubes1.min.js" {
  interface TubesCursorOptions {
    tubes?: {
      colors?: string[];
      lights?: {
        intensity?: number;
        colors?: string[];
      };
    };
  }

  interface TubesCursorApp {
    dispose: () => void;
    three: { size: { width: number; height: number } };
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
  }

  export default function TubesCursor(
    canvas: HTMLCanvasElement,
    options?: TubesCursorOptions
  ): TubesCursorApp;
}
