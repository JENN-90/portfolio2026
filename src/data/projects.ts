import imgWemade from "../assets/imgs/works-thumbnail-wemade.webp";
import imgWemixplay from "../assets/imgs/works-thumbnail-wemixplay.webp";
import imgHellsquad from "../assets/imgs/works-thumbnail-hellsquad.webp";
import imgNcglSummer from "../assets/imgs/works-thumbnail-ncgl-summer.webp";
import wemadeVideo from "../assets/videos/works-thumbnail-wemade.webm";
import wemixplayVideo from "../assets/videos/works-thumbnail-wemixplay.mp4";

/* 썸네일 이미지는 img 필드에, 비디오가 있는 프로젝트는 video 필드에 import한 에셋을 지정
   예) import wemixplayVideo from '../assets/videos/works-wemixplay.mp4';
       { ..., video: wemixplayVideo } — video가 있으면 이미지 위에 비디오가 재생됨 */
export interface Project {
  idx: string;
  title: string;
  desc: string;
  tags: string[];
  img: string;
  label: string;
  video?: string;
}

export const PROJECTS: Project[] = [
  {
    idx: "02 / 04",
    title: "위메이드 공식 홈페이지",
    desc: "GSAP ScrollTrigger 기반 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다. main · Work with us · IR.",
    tags: ["Next.js", "GSAP", "ScrollTrigger"],
    img: imgWemade,
    label: "📹 GSAP SCROLL INTERACTION",
    video: wemadeVideo,
  },
  {
    idx: "01 / 04",
    title: "WEMIXPLAY 3.0 → 4.0",
    desc: "리뉴얼 기획 단계부터 참여해 UI 시스템의 뼈대를 만들었습니다. 다크·라이트 테마와 아톰 컴포넌트 + 스토리북 운영.",
    tags: ["React", "TypeScript", "SCSS Module", "Storybook"],
    img: imgWemixplay,
    label: "📹 WEMIXPLAY PREVIEW",
    video: wemixplayVideo,
  },
  {
    idx: "03 / 04",
    title: "AI-driven Console Admin",
    desc: "AI-driven pipeline 구현 과정에서 UI 일관성을 지키기 위한 협업 스크립트를 작업했습니다. WEMIX PAY · DEX.",
    tags: ["React", "TypeScript", "AI Pipeline"],
    img: imgHellsquad,
    label: "🤖 AI PIPELINE",
  },
  {
    idx: "04 / 04",
    title: "WEB3 글로벌 사전예약",
    desc: "ROM, YMIR 등 글로벌 타이틀의 사전예약 프로모션. UI 제작과 FE 기능 구현을 함께 담당했습니다.",
    tags: ["React", "TypeScript", "SCSS"],
    img: imgNcglSummer,
    label: "🎮 GLOBAL PRE-REGISTRATION",
  },
];

export type PanelName = "hero" | "contact" | "career" | "works";

export const GRID: Record<PanelName, [number, number]> = {
  contact: [-1, 0],
  hero: [0, 0],
  career: [1, 0],
  works: [0, 1],
};

export const NAV_MAP: Record<
  PanelName,
  Partial<Record<"left" | "right" | "up" | "down", PanelName>>
> = {
  hero: { left: "contact", right: "career", down: "works" },
  contact: { right: "hero" },
  career: { left: "hero" },
  works: { up: "hero" },
};

export const ROUTE: Record<PanelName, string> = {
  hero: "#/",
  contact: "#/contact",
  career: "#/career",
  works: "#/works",
};

export const FROM_ROUTE: Record<string, PanelName> = {
  "#/": "hero",
  "#/contact": "contact",
  "#/career": "career",
  "#/works": "works",
  "": "hero",
  "#": "hero",
};
