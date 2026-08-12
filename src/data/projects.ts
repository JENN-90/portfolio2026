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
  showHero?: boolean; // 상세페이지 상단 hero 영역 렌더링 여부 — 기본값 true, false면 렌더링하지 않음
  chipColor: ChipColor; // WorkSection 카드 상단 chip 색상
  details?: {
    img: string;
    texts: {
      title: string;
      desc: string;
    }[];
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
        texts: [],
      },
      {
        img: img("works_wemade_shot_2.webp"),
        texts: [
          {
            title: "GSAP ScrollTrigger를 활용한 스크롤 인터랙션 구현 — ",
            desc: "섹션 진입 시점에 맞춰 요소가 순차적으로 나타나도록 타임라인을 구성해, 페이지에 자연스러운 리듬감과 몰입감을 더했습니다.",
          },
        ],
      },
      {
        img: img("works_wemade_shot_3.webp"),
        texts: [
          {
            title: "스크롤 기반 reveal 인터랙션과 반응형 레이아웃 구현 — ",
            desc: "뷰포트 사이즈에 관계없이 유연하게 반응하는 구조로 설계해, 어떤 화면에서도 자연스러운 콘텐츠 노출과 일관된 사용자 경험을 제공했습니다.",
          },
        ],
      },
      {
        img: img("works_wemade_shot_4.webp"),
        texts: [
          {
            title: "정보 제공 중심의 스태틱 웹페이지 구현 — ",
            desc: "불필요한 인터랙션 없이 정보 전달력에 집중한 구조로, 사용자가 핵심 정보를 빠르고 명확하게 파악할 수 있도록 했습니다.",
          },
        ],
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
    details: [
      {
        img: img("works_wemixplay_shot_1.webp"),
        texts: [],
      },
      {
        img: img("works_wemixplay_shot_3.webp"),
        texts: [
          {
            title: "Variable·Mixin 기반 다크/라이트 테마 시스템 구현 —",
            desc: "Sass Variable와 Mixin을 활용해 다크/라이트 테마 시스템을 설계했습니다. 컬러뿐 아니라 폰트 스타일, 인터랙션 영역까지 테마 변수 체계에 포함시켜 전환 시에도 깨짐 없이 일관되게 반영되도록 구조화했고, 컴포넌트 단위로 변수를 관리해 신규 페이지 추가 시에도 별도 작업 없이 테마가 자동 적용되도록 했습니다.",
          },
        ],
      },
      {
        img: img("works_wemixplay_shot_3.webp"),
        texts: [
          {
            title: "Storybook 기반 협업 체계 구축 — ",
            desc: "폰트 스타일, 컬러 variants, 공통 컴포넌트를 정리하고 페이지/atom components 단위로 스토리북화하여 디자인·개발 간 협업 효율을 높였습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-console-admin",
    title: "AI-driven Console Admin",
    desc: "AI-driven 파이프라인 과정에서 UI일관성 유지를 위한 협업 스크립트 작업을 수행했습니다.",
    tags: ["Vite", "AI-driven", "BackOffice", "WEMADE Console"],
    img: img("works-thumbnail-backoffice.webp"),
    label: "AI-Driven",
    chipColor: ChipColor.Purple,
    showHero: false,
    details: [
      {
        img: "",
        texts: [
          {
            title: "부서 간 소통 자동화를 위한 Jira 코멘트 스킬 개발 — ",
            desc: "기획·백엔드 API·보안 영역 간 요소가 일치하지 않을 경우 이를 감지해 해당 담당 부서를 자동으로 멘션하고 코멘트를 등록하도록 구현해, AI 파이프라인 환경에서도 부서 간 커뮤니케이션 누락 없이 일관성을 유지할 수 있도록 했습니다.",
          },
          {
            title: "JSON 기반 UI Generation Rules 설계 — ",
            desc: "백오피스에 필요한 form, list, dialog, filter 등의 컴포넌트를 규칙화하여, AI가 UI를 생성할 때마다 할루시네이션 없이 동일한 구조와 스타일의 UI가 생성되도록 했습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "stablenet",
    title: "StabletNet",
    desc: "Framer Motion 라이브러리를 활용하여 스크롤 인터랙션을 구현하였습니다. ",
    tags: ["Next.js", "Framer Motion", "CSS Animation"],
    img: img("works-thumbnail-stablenet.webp"),
    label: "",
    // video: video("works-thumbnail-web3.mp4"),
    chipColor: ChipColor.Purple,
    link: "https://stablenet.network/ko",
    details: [
      {
        img: "",
        texts: [
          {
            title: "Stablenet — ",
            desc: "Framer Motion을 활용한 신속한 인터랙션 구현 및 배포 — 짧은 운영 배포 일정에 맞춰 스크롤에 따라 reveal되는 모션을 구현하고, CSS animation을 함께 활용해 페이지에 재미 요소를 더했습니다.",
          },
        ],
      },
    ],
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
    details: [
      {
        img: "",
        texts: [
          {
            title: "ROM, Legend of YMIR 사전예약 UI 개발 — ",
            desc: "모바일/데스크탑 적응형(Adaptive) 레이아웃으로 설계해, 디바이스 환경에 관계없이 최적화된 화면을 제공했습니다.",
          },
        ],
      },
      {
        img: "",
        texts: [
          {
            title: "RHell Squad RRRush 사전예약 UI 및 FE 기능 개발 — ",
            desc: "reCAPTCHA를 연동한 로그인 및 사전예약 기능을 구현해, 안정적인 사용자 인증과 캠페인 참여 흐름을 완성했습니다.",
          },
        ],
      },
    ],
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
    chipColor: ChipColor.Blue,
    details: [
      {
        img: "",
        texts: [
          {
            title:
              "윙크스톤파트너스 내부 사이트·P2P 플랫폼 웹 및 정산관리시스템 백오피스 UI 개발 — ",
            desc: "HTML/CSS 기반으로 페이지를 구현하여, 별도 프레임워크 없이도 안정적이고 가벼운 웹 환경을 구축했습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "welcome-fnd",
    title: "Welcome F&D",
    desc: "웰컴금융그룹 계열사 웹사이트를 담당하며 신규 구축 프로젝트를 진행했습니다.\nWelcome Leasing LAO, 웰컴파이낸스 필리핀, 렌탈 Backoffice",
    tags: ["HTML", "SCSS", "Responsive"],
    img: img("works-thumbnail-welcome.webp"),
    label: "",
    video: video("works-thumbnail-welcome.mp4"),
    link: "https://www.welcomefnd.com/",
    chipColor: ChipColor.Red,
    details: [
      {
        img: "",
        texts: [
          {
            title: "웰컴금융그룹 대표 홈페이지 및 해외 서비스웹 구현 — ",
            desc: "Vanilla JS로 스크롤 인터랙션을 직접 구현하고, 저속 인터넷 환경을 고려한 경량화 작업을 통해 필리핀, 라오스 등의 해외 웹 구축 프로젝트에 참여했습니다.",
          },
        ],
      },
    ],
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

export const PROJECTS: Project[] = PROJECT_ITEMS.map((item, i) => ({
  ...item,
  idx: `${pad2(i + 1)} / ${pad2(PROJECT_ITEMS.length)}`,
}));
