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
  idx: string; // 배열 순서대로 자동 부여됨 (예: "01 / 04") — 직접 작성하지 않음
  title: string;
  desc: string; // \n을 넣으면 해당 위치에서 줄바꿈됨

  tags: string[];
  img: string;
  label: string;
  video?: string;
  link?: string; // 바로가기 URL — 있으면 썸네일에 바로가기 버튼이 렌더링됨
}

/* 작성된 순서대로 idx가 자동 부여됨 — 순서를 바꾸거나 추가/삭제해도 번호와 total이 자동 갱신 */
const PROJECT_ITEMS: Omit<Project, "idx">[] = [
  {
    title: "위메이드 공식 홈페이지",
    desc: "GSAP ScrollTrigger 기반 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다.\nMain · Work with us · IR.",
    tags: ["Next.js", "GSAP", "ScrollTrigger"],
    img: imgWemade,
    label: "📹 GSAP SCROLL INTERACTION",
    video: wemadeVideo,
    link: "https://www.wemade.com/", // 바로가기 URL
  },
  {
    title: "WEMIXPLAY 4.0",
    desc: "리뉴얼 초기 단계부터 참여해 UI 시스템의 뼈대를 만들었습니다.\n다크·라이트 테마, 아톰 컴포넌트 + storybook.",
    tags: ["React", "TypeScript", "SCSS Module", "Storybook"],
    img: imgWemixplay,
    label: "📹 WEMIXPLAY PREVIEW",
    video: wemixplayVideo,
    link: "https://wemixplay.com/", // 바로가기 URL
  },
  {
    title: "AI-driven Console Admin",
    desc: "AI-driven pipeline 구현 과정에서 UI 일관성을 지키기위한 rule 을 적용하고, 타 부서와의 협업 자동화를 위한 jira comment 자동작성 스크립트를 작업했습니다.\nWEMIX PAY · DEX.",
    tags: ["React", "TypeScript", "AI-driven"],
    img: imgHellsquad,
    label: "🤖 AI PIPELINE",
  },
  {
    title: "WEB3 게임 글로벌 사전예약 FE 및 UI 개발",
    desc: "ROM, Legend of YMIR 등 글로벌 타이틀의 사전예약 프로모션의 UI 개발작업.\n악마단 돌겨억(Hell Squad RRRush) 사전예약의 FE개발 및 UI 제작을 담당했습니다.",
    tags: ["Next.js", "TypeScript", "SCSS"],
    img: imgNcglSummer,
    label: "🎮 GLOBAL PRE-REGISTRATION",
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

export const PROJECTS: Project[] = PROJECT_ITEMS.map((item, i) => ({
  ...item,
  idx: `${pad2(i + 1)} / ${pad2(PROJECT_ITEMS.length)}`,
}));

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
