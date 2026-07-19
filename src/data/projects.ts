/* assets/imgs, assets/videos 전체를 파일명 기준으로 미리 로드
   PROJECT_ITEMS에서는 import 없이 파일명 문자열만 적으면 됨
   예) img: "works-thumbnail-wemade.webp", video: "works-thumbnail-wemade.webm" */
const imgFiles = import.meta.glob("../assets/imgs/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const videoFiles = import.meta.glob("../assets/videos/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const img = (filename: string) => {
  const url = imgFiles[`../assets/imgs/${filename}`];
  if (!url) throw new Error(`이미지를 찾을 수 없습니다: ${filename}`);
  return url;
};
const video = (filename: string) => {
  const url = videoFiles[`../assets/videos/${filename}`];
  if (!url) throw new Error(`비디오를 찾을 수 없습니다: ${filename}`);
  return url;
};

export interface Project {
  idx: string; // 배열 순서대로 자동 부여됨 (예: "01 / 04") — 직접 작성하지 않음
  title: string;
  desc: string; // \n을 넣으면 해당 위치에서 줄바꿈됨

  tags: string[];
  img: string;
  label: string;
  video?: string;
  videoWebm?: string; // video의 webm 소스 — 있으면 <source>로 mp4보다 우선 시도됨
  link?: string; // 바로가기 URL — 있으면 썸네일에 바로가기 버튼이 렌더링됨
}

/* 작성된 순서대로 idx가 자동 부여됨 — 순서를 바꾸거나 추가/삭제해도 번호와 total이 자동 갱신 */
const PROJECT_ITEMS: Omit<Project, "idx">[] = [
  {
    title: "위메이드 공식 홈페이지",
    desc: "GSAP ScrollTrigger 기반 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다.\nMain · Work with us · IR.",
    tags: ["Next.js", "GSAP", "ScrollTrigger"],
    img: img("works-thumbnail-wemade.webp"),
    label: "📹 GSAP SCROLL INTERACTION",
    video: video("works-thumbnail-wemade.webm"),
    link: "https://www.wemade.com/", // 바로가기 URL
  },
  {
    title: "WEMIXPLAY 4.0",
    desc: "리뉴얼 초기 단계부터 참여해 UI 시스템의 뼈대를 만들었습니다.\n다크·라이트 테마, 아톰 컴포넌트 + storybook.",
    tags: ["React", "TypeScript", "SCSS Module", "Storybook"],
    img: img("works-thumbnail-wemixplay.webp"),
    label: "📹 WEMIXPLAY PREVIEW",
    video: video("works-thumbnail-wemixplay.mp4"),
    link: "https://wemixplay.com/", // 바로가기 URL
  },
  {
    title: "AI-driven Console Admin",
    desc: "AI-driven pipeline 구현 과정에서 UI 일관성을 지키기위한 rule 을 적용하고, 타 부서와의 협업 자동화를 위한 jira comment 자동작성 스크립트를 작업했습니다.\nWEMIX PAY · DEX.",
    tags: ["React", "TypeScript", "AI-driven"],
    img: img("works-thumbnail-hellsquad.webp"),
    label: "🤖 AI PIPELINE",
  },
  {
    title: "WEB3 게임 글로벌 사전예약 FE 및 UI 개발",
    desc: "ROM, Legend of YMIR 등 글로벌 타이틀의 사전예약 프로모션의 UI 개발작업.\n악마단 돌겨억(Hell Squad RRRush) 사전예약의 FE개발 및 UI 제작을 담당했습니다.",
    tags: ["Next.js", "TypeScript", "SCSS"],
    img: img("works-thumbnail-ncgl-summer.webp"),
    label: "🎮 GLOBAL PRE-REGISTRATION",
  },
  {
    title: "윙크스톤파트너스",
    desc: "핀테크 스타트업의 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다.",
    tags: ["Fintech", "Responsive", "Landing Page"],
    img: img("works-thumbnail-wink.webp"),
    label: "💳 FINTECH RENEWAL",
    video: video("works-thumbnail-wink.mp4"),
    link: "https://www.winkstonepartners.com/",
  },
  {
    title: "Welcome F&D",
    desc: "웰컴금융그룹 계열사 웹사이트를 담당하며 신규 구축 프로젝트를 진행했습니다.\nWelcome Leasing LAO 리뉴얼, 웰컴파이낸스 필리핀(WBP)",
    tags: ["금융", "PC/Mobile", "App UI"],
    img: img("works-thumbnail-welcome.webp"),
    label: "🏦 FINANCE GROUP UI",
    video: video("works-thumbnail-welcome.mp4"),
    link: "https://www.welcomefnd.com/",
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
