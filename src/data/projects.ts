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
  if (!url) console.warn(`이미지를 찾을 수 없습니다: ${filename}`);
  return url;
};
const video = (filename: string) => {
  const url = videoFiles[`../assets/videos/${filename}`];
  if (!url) console.warn(`비디오를 찾을 수 없습니다: ${filename}`);
  return url;
};

// WorkSection 카드 상단 chip 색상 — globals.scss의 --c1~--c5 변수와 매칭됨
export const ChipColor = {
  Red: "var(--c1)",
  Blue: "var(--c2)",
  Yellow: "var(--c3)",
  Purple: "var(--c4)",
  Green: "var(--c5)",
} as const;
export type ChipColor = (typeof ChipColor)[keyof typeof ChipColor];

export interface Project {
  idx: string; // 배열 순서대로 자동 부여됨 (예: "01 / 04") — 직접 작성하지 않음
  slug: string; // 서브페이지 URL(/work/:slug)에 사용되는 고유 값
  title: string;
  desc: string; // \n을 넣으면 해당 위치에서 줄바꿈됨

  tags: string[];
  img?: string; // 없으면 썸네일 이미지 없이 렌더링됨
  label: string;
  video?: string;
  videoWebm?: string; // video의 webm 소스 — 있으면 <source>로 mp4보다 우선 시도됨
  link?: string; // 바로가기 URL — 있으면 썸네일에 바로가기 버튼이 렌더링됨
  chipColor: ChipColor; // WorkSection 카드 상단 chip 색상
  details?: {
    title: string;
    img: string;
    desc: string;
  }[];
}

/* 작성된 순서대로 idx가 자동 부여됨 — 순서를 바꾸거나 추가/삭제해도 번호와 total이 자동 갱신 */
const PROJECT_ITEMS: Omit<Project, "idx">[] = [
  {
    slug: "wemade",
    title: "위메이드 공식 홈페이지",
    desc: "GSAP ScrollTrigger 라이브러리 활용, 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다.\n참여페이지 : 메인·소개&채용(Work with us)·IR ",
    tags: ["Next.js", "Interaction", "GSAP", "ScrollTrigger"],
    img: img("works-thumbnail-wemade.webp"),
    label: "WEMADE Official",
    videoWebm: video("works-thumbnail-wemade.webm"),
    link: "https://www.wemade.com/", // 바로가기 URL
    chipColor: ChipColor.Purple,
    details: [
      {
        img: img("works_wemade_shot_1.webp"),
        title: "초기진입 인트로 화면영상",
        desc: "",
      },
      {
        img: img("works_wemade_shot_2.webp"),
        title:
          "메인페이지의 HERO, GAMES, PARTNERS, BLOCKCHAIN 섹션을 gsap scrolltrigger를 활용하여 스크롤에 따른 인터랙션을 구현 ",
        desc: "",
      },
      {
        img: img("works_wemade_shot_3.webp"),
        title:
          "WORK WITH US \n 아코디언 컨텐츠형식의 BECOME PARTNER, OFFICE소개 및 채용리스트페이지가 포함된 JOIN OUR TEAM페이지의 UI & 인터랙션 구현 ",
        desc: "",
      },
      {
        img: img("works_wemade_shot_4.webp"),
        title: "IR static page 구현",
        desc: "",
      },
    ],
  },
  {
    slug: "wemixplay",
    title: "WEMIXPLAY 4.0",
    desc: "리뉴얼 초기 단계부터 참여해 UI 시스템의 뼈대를 만들었습니다.\n다크·라이트 테마, 아톰 컴포넌트 + storybook.",
    tags: ["Next.js", "UI System", "Storybook"],
    img: img("works-thumbnail-wemixplay.webp"),
    label: "",
    video: video("works-thumbnail-wemixplay.mp4"),
    link: "https://wemixplay.com/", // 바로가기 URL
    chipColor: ChipColor.Purple,
  },
  {
    slug: "ai-console-admin",
    title: "AI-driven Console Admin",
    desc: "AI-driven 파이프라인 과정에서 UI일관성 유지를 위한 협업 스크립트 작업을 수행했습니다.\nWEMIX PAY · DEX.",
    tags: ["Vite", "AI-driven", "BackOffice"],
    img: img("works-thumbnail-backoffice.webp"),
    label: "AI-Driven",
    chipColor: ChipColor.Purple,
  },
  {
    slug: "stablenet",
    title: "StabletNet",
    desc: "Framer Motion 라이브러리를 활용하여 스크롤 인터랙션을 구현하였습니다. ",
    tags: ["Next.js", "Framer Motion"],
    img: img("works-thumbnail-stablenet.webp"),
    label: "",
    // video: video("works-thumbnail-web3.mp4"),
    chipColor: ChipColor.Purple,
    link: "https://stablenet.network/ko",
  },
  {
    slug: "web3-pre-registration",
    title: "WEB3 게임 글로벌 사전예약 FE 및 UI 개발",
    desc: "ROM, Legend of YMIR 등 글로벌 타이틀의 사전예약 프로모션의 UI를 제작하였고, 악마단돌겨억(Hell Squad Rrrush)의 사전예약 프로모션에서 UI 및 FE 개발을 담당했습니다.",
    tags: ["Next.js", "Promotion"],
    img: img("works-thumbnail-web3.webp"),
    label: "",
    video: video("works-thumbnail-web3.mp4"),
    chipColor: ChipColor.Purple,
  },
  {
    slug: "winkstone-partners",
    title: "윙크스톤파트너스",
    desc: "핀테크 스타트업의 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다.",
    tags: ["HTML", "SCSS", "Responsive"],
    img: img("works-thumbnail-wink.webp"),
    label: "",
    video: video("works-thumbnail-wink.mp4"),
    link: "https://www.winkstonepartners.com/",
    chipColor: ChipColor.Red,
  },
  {
    slug: "welcome-fnd",
    title: "Welcome F&D",
    desc: "웰컴금융그룹   계열사 웹사이트를 담당하며 신규 구축 프로젝트를 진행했습니다.\nWelcome Leasing LAO, 웰컴파이낸스 필리핀, 렌탈 Backoffice",
    tags: ["HTML", "SCSS", "Responsive"],
    img: img("works-thumbnail-welcome.webp"),
    label: "",
    video: video("works-thumbnail-welcome.mp4"),
    link: "https://www.welcomefnd.com/",
    chipColor: ChipColor.Red,
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

export const PROJECTS: Project[] = PROJECT_ITEMS.map((item, i) => ({
  ...item,
  idx: `${pad2(i + 1)} / ${pad2(PROJECT_ITEMS.length)}`,
}));
