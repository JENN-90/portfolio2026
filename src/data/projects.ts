/* assets/imgs, assets/videos 하위 폴더 전체를 파일 경로 기준으로 미리 로드
   PROJECT_ITEMS에서는 import 없이 폴더 정리용 상대 경로 문자열만 적으면 됨
   예) image: img("work-thumb-img/works-thumbnail-wemade.webp"),
       video: video("work-thumb/work-thumb-wemade.webm") */
const imgFiles = import.meta.glob("../assets/imgs/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const videoFiles = import.meta.glob("../assets/videos/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const img = (path: string) => {
  const url = imgFiles[`../assets/imgs/${path.replace(/^\//, "")}`];
  if (!url) console.warn(`이미지를 찾을 수 없습니다: ${path}`);
  return url;
};
const video = (path: string) => {
  const url = videoFiles[`../assets/videos/${path.replace(/^\//, "")}`];
  if (!url) console.warn(`비디오를 찾을 수 없습니다: ${path}`);
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

// 카드/상세페이지 썸네일 — video가 있으면 image보다 우선 렌더링됨 (videoWebm은 video의 webm 소스)
export interface ProjectMedia {
  image?: string;
  video?: string;
  videoWebm?: string;
}

// 상세페이지 상단 hero 영역. 값이 없는 필드는 thumbnail(카드 썸네일)로 폴백됨 — WorkDetailPage의 resolveHeroMedia 참고
export interface ProjectHero {
  enabled: boolean; // false면 hero 영역 자체를 렌더링하지 않음
  media?: ProjectMedia; // 비워두면 thumbnail 전체를 그대로 사용
}

// 상세페이지 본문의 캡션 한 덩어리 — heading은 완결된 제목이 아니라 body로 이어지는 문장의 서두일 수 있음(데이터 참고)
export interface ProjectCaption {
  heading?: string;
  body?: string;
}

// 상세페이지 본문을 구성하는 섹션 하나 — video가 있으면 images는 무시되고 video가 렌더링됨
export interface ProjectDetailSection {
  images: string[];
  video?: string;
  captions?: ProjectCaption[];
}

interface ProjectBase {
  title: string;
  summary: string; // 카드 설명 + 상세페이지 개요에 공용으로 쓰임. \n을 넣으면 해당 위치에서 줄바꿈됨
  subtitle?: string; // 상세페이지 타이틀 하단에 표시되는 짧은 영문 부제 — 없으면 렌더링 안 됨
  tags: string[];
  thumbnail: ProjectMedia; // 카드(WorkSection) 썸네일 — 비어 있으면 placeholder 렌더링
  externalLink?: string; // 바로가기 URL — 있으면 카드/상세페이지에 바로가기 버튼이 렌더링됨
  chipColor: ChipColor; // 카드 상단 chip 색상 + 상세페이지 강조색(--accent)으로 재사용됨
  hero?: ProjectHero; // 생략 시 { enabled: true, media: thumbnail }과 동일하게 동작
  sections?: ProjectDetailSection[]; // 상세페이지 본문 — 작성 순서대로 렌더링됨
}

// 카드 클릭으로 상세페이지 이동이 가능한 프로젝트는 slug가 필수, 아니면 slug 자체가 없음(URL 직접 접근도 불가)
type ProjectRouting =
  | { openInDetailPage: true; slug: string }
  | { openInDetailPage: false; slug?: undefined };

export type Project = ProjectBase &
  ProjectRouting & {
    idx: string; // 배열 순서대로 자동 부여됨 (예: "01 / 04") — 직접 작성하지 않음
  };

type ProjectInput = ProjectBase & ProjectRouting;

/* 작성된 순서대로 idx가 자동 부여됨 — 순서를 바꾸거나 추가/삭제해도 번호와 total이 자동 갱신 */
const PROJECT_ITEMS: ProjectInput[] = [
  {
    openInDetailPage: true,
    slug: "wemade",
    title: "위메이드 공식 홈페이지",
    summary:
      "GSAP ScrollTrigger 라이브러리 활용, 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다. \n작업에 참여한 페이지 → 메인·Loader(intro)·소개&채용(Work with us)·IR ",
    tags: ["Next.js", "GSAP", "Responsive"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-wemade.webp"),
      videoWebm: video("work-thumb/work-thumb-wemade.webm"),
    },
    subtitle: "WEMADE Official",
    externalLink: "https://www.wemade.com/",
    chipColor: ChipColor.Purple,
    hero: { enabled: false },
    sections: [
      {
        images: [],
        video: video("work-detail-video/work-detail-wemade.webm"),
        captions: [
          {
            heading: "GSAP ScrollTrigger를 활용한 스크롤 인터랙션 구현 — ",
            body: "섹션 진입 시점에 맞춰 요소가 순차적으로 나타나도록 타임라인을 구성해, 페이지에 자연스러운 리듬감과 몰입감을 더했습니다. \n 뷰포트 사이즈에 관계없이 유연하게 반응하는 구조로 설계하여, 어떤 화면에서도 자연스러운 콘텐츠 노출과 일관된 사용자 경험을 제공합니다.",
          },
        ],
      },
      {
        images: [],
        video: video("work-detail-video/work-detail-wemade-join.webm"),
      },
      {
        images: [
          img("work-detail-img/wemade/wemade-intro.webp"),
          img("work-detail-img/wemade/wemade-jointeam.webp"),
          img("work-detail-img/wemade/wemade-ir.webp"),
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "wemixplay",
    title: "WEMIXPLAY 4.0",
    summary:
      "리뉴얼 초기 단계부터 참여해 UI 시스템의 아키텍처를 설계했습니다. 디자인 토큰 기반의 다크·라이트 테마와 아토믹 컴포넌트 체계를 구축해 신규 화면 개발 속도와 유지보수성을 개선했으며, Storybook을 도입해 기획·디자인팀이 실제 컴포넌트를 직접 확인하며 협업할 수 있는 환경을 마련했습니다.",
    tags: ["Next.js", "Storybook"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-wemixplay.webp"),
      video: video("work-thumb/work-thumb-wemixplay.webm"),
    },
    externalLink: "https://wemixplay.com/",
    chipColor: ChipColor.Purple,
    hero: { enabled: false },
    sections: [
      {
        images: [],
        video: video("work-detail-video/work-detail-wemixplay.webm"),
        captions: [
          {
            heading: "WEMIXPLAY 4.0 리뉴얼 —",
            body: " Sass Variable와 Mixin 기반으로 다크·라이트 테마 시스템을 설계했습니다. 컬러뿐 아니라 폰트 스타일, 인터랙션 영역까지 테마 변수 체계에 포함시켜 전환 시에도 스타일 깨짐 없이 일관되게 반영되도록 구조화했고, 컴포넌트 단위로 변수를 관리해 신규 페이지 추가 시에도 별도 작업 없이 테마가 자동 적용되는 구조를 만들었습니다. 이를 기반으로 폰트 스타일, 컬러 variants, 공통 컴포넌트를 체계적으로 정리하고 페이지·Atom 컴포넌트 단위로 Storybook화하여, 디자인팀과 개발팀 간 협업 효율을 높이고 커뮤니케이션 비용을 줄였습니다.",
          },
        ],
      },
      {
        images: [
          img("work-detail-img/wemixplay/works_wemixplay_shot_1.webp"),
          img("work-detail-img/wemixplay/works_wemixplay_shot_2.webp"),
          img("work-detail-img/wemixplay/works_wemixplay_shot_3.webp"),
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "ai-console-admin",
    title: "AI-driven Backoffice",
    summary:
      "AI-driven 파이프라인 과정에서 UI일관성 유지를 위한 협업 스크립트 작업을 수행했습니다.",
    tags: ["Vite", "Design"],
    thumbnail: {},
    subtitle: "AI-Driven",
    chipColor: ChipColor.Purple,
    hero: { enabled: false },
    sections: [
      {
        images: [img("work-detail-img/backoffice/backoffice-skills.webp")],
        captions: [
          {
            heading: "부서 간 소통 자동화를 위한 Jira 코멘트 스킬 개발 — ",
            body: "기획·백엔드 API·보안 영역 간 요소가 일치하지 않을 경우 이를 감지해 해당 담당 부서를 자동으로 멘션하고 코멘트를 등록하도록 구현했습니다. \n ai-driven pipeline의 spec-intake 단계에서 로컬 문서(plan·api·security)를 교차 참조해 일관성 파괴 요소를 조기에 감지하고, 코드 생성(Phase 3) 이전 단계에서 담당 부서로 이슈를 에스컬레이션함으로써, AI 파이프라인 환경에서도 부서 간 커뮤니케이션 누락 없이 일관성을 유지할 수 있도록 했습니다.",
          },
        ],
      },
      {
        images: [img("work-detail-img/backoffice/backoffice-rules.webp")],
        captions: [
          {
            heading: "JSON 기반 UI Generation Rules 설계 — ",
            body: "백오피스에 필요한 form·list·detail·dialog·filter 등의 컴포넌트를 JSON 스키마로 규칙화하여, AI가 UI를 생성할 때마다 할루시네이션 없이 동일한 구조와 스타일의 UI가 생성되도록 했습니다. \n아이콘·컴포넌트 레지스트리와 닫힌 enum(variant/size), spec 기반 버튼 생성 규칙을 통해 존재하지 않는 요소를 추측 생성하는 문제를 차단하고, 스키마·레지스트리·검증기를 한 세트로 관리해 규칙 간 정합성을 유지했습니다. \n또한 신규 요구사항(대시보드형 상세, 슬라이드 패널, 고정 저장 바 등)이 발생했을 때 스키마를 무분별하게 확장하는 대신, 기존 스키마 규칙에 맞게 UI를 재설계(슬라이드 패널→다이얼로그, 고정 저장 바→폼 내 액션 영역)하거나, 기존 어휘로 표현 불가능한 경우에만 신규 타입(dashboard)을 최소 범위로 정의하는 원칙을 세워 스키마의 비대화를 방지했습니다.",
          },
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "stablenet",
    title: "StabletNet",
    summary:
      "Framer Motion 라이브러리를 활용하여 스크롤 인터랙션을 구현하였습니다. ",
    tags: ["Next.js", "Framer Motion"],
    thumbnail: { image: img("work-thumb-img/works-thumbnail-stablenet.webp") },
    chipColor: ChipColor.Purple,
    externalLink: "https://stablenet.network/ko",
    hero: { enabled: false },
    sections: [
      {
        images: [],
        video: video("work-detail-video/work-detail-stablenet.webm"),
        captions: [
          {
            heading: "Framer Motion과 CSS Animation으로 완성한 스크롤 인터랙션",
            body: "짧은 운영 배포 일정에 맞춰 Framer Motion을 활용한 인터랙션을 신속하게 구현하고 배포했습니다. 스크롤에 따라 요소가 순차적으로 나타나는 reveal 모션을 구현했고, CSS animation을 함께 활용해 페이지 전반에 재미 요소를 더했습니다.",
          },
        ],
      },
      {
        images: [
          img("work-detail-img/stablenet/stablenet-screen-1.webp"),
          img("work-detail-img/stablenet/stablenet-screen-2.webp"),
          img("work-detail-img/stablenet/stablenet-screen-3.webp"),
          img("work-detail-img/stablenet/stablenet-screen-4.webp"),
          img("work-detail-img/stablenet/stablenet-screen-5.webp"),
          img("work-detail-img/stablenet/stablenet-screen-6.webp"),
          img("work-detail-img/stablenet/stablenet-screen-7.webp"),
          img("work-detail-img/stablenet/stablenet-screen-8.webp"),
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "web3-pre-registration",
    title: "WEB3 게임 글로벌 사전예약 FE 및 UI 개발",
    summary:
      "ROM, Legend of YMIR 등 글로벌 타이틀의 사전예약 프로모션의 UI를 제작하였고, 악마단돌겨억(Hell Squad Rrrush)의 사전예약 프로모션에서 UI 및 FE 개발을 담당했습니다.",
    tags: ["Next.js", "Adaptive"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-web3.png"),
      video: video("work-thumb/work-thumb-web3.webm"),
    },
    chipColor: ChipColor.Purple,
    hero: { enabled: false },
    sections: [
      {
        images: [img("work-detail-img/web3/web3-ncgl-hero.webp")],
        captions: [
          {
            heading: "Night Crows 여름이벤트 페이지 — ",
            body: "글로벌 Night Crows의 여름 이벤트 'Crimson Sun Festival' 적응형 웹 UI를 작업했습니다.",
          },
        ],
      },
      {
        images: [img("work-detail-img/web3/web3-hsgl-hero.webp")],
        captions: [
          {
            heading: "Hell Squad RRRush 사전예약 UI 및 FE 기능 개발중 — ",
            body: "reCAPTCHA를 연동한 로그인 및 사전예약 기능을 구현해, 안정적인 사용자 인증과 캠페인 참여 흐름을 완성했습니다.",
          },
        ],
      },
      {
        images: [
          img("work-detail-img/web3/web3-rom-hero.webp"),
          img("work-detail-img/web3/web3-lygl-hero.webp"),
        ],
        captions: [
          {
            heading:
              "ROM, Legend of YMIR 사전예약 및 발할라트라이얼 이벤트 UI 개발 — ",
            body: "모바일/데스크탑 적응형(Adaptive) 레이아웃으로 설계해, 디바이스 환경에 관계없이 최적화된 화면을 제공했습니다.",
          },
        ],
      },
    ],
  },
  {
    openInDetailPage: false,
    title: "윙크스톤파트너스",
    summary:
      "핀테크 스타트업의 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다.",
    tags: ["HTML/SCSS", "Responsive"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-winkstone.webp"),
      video: video("work-thumb/work-thumb-winkstone.webm"),
    },
    chipColor: ChipColor.Blue,
    externalLink: "https://winkstonepartners.com/", // TODO: 실제 바로가기 URL로 교체 필요
  },
  {
    openInDetailPage: false,
    title: "Welcome F&D",
    summary:
      "웰컴금융그룹 계열사 웹사이트를 담당하며 신규 구축 프로젝트를 진행했습니다.\nWelcome Leasing LAO, 웰컴파이낸스 필리핀, 렌탈 Backoffice",
    tags: ["HTML/SCSS", "Responsive"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-welcome.webp"),
      video: video("work-thumb/work-thumb-welcome.webm"),
    },
    externalLink: "https://www.welcomefnd.com/",
    chipColor: ChipColor.Red,
  },
  {
    openInDetailPage: false,
    title: "아이스크림키즈 리틀홈런",
    summary: "유아 교육 콘텐츠 플렛폼 리틀홈런 PC/Mobile 적응형 웹 전구간 담당",
    tags: ["HTML/SCSS", "Adaptive"],
    thumbnail: {
      image: img("work-thumb-img/works-thumbnail-little-homelearn.webp"),
    },
    externalLink: "https://little.home-learn.co.kr/main/index",
    chipColor: ChipColor.Yellow,
  },
  {
    openInDetailPage: true,
    slug: "tinpo",
    title: "아이스크림키즈 창의력발달검사 Tinpo 하이브리드앱",
    summary: "창의력발달검사 Tinpo하이브리드 앱 퍼블리싱",
    tags: ["HTML/SCSS", "Hybrid APP"],
    thumbnail: { image: img("work-thumb-img/works-thumbnail-tinpo.webp") },
    chipColor: ChipColor.Yellow,
    hero: { enabled: false },
    sections: [
      {
        video: video("work-detail-video/work-detail-tinpo.webm"),
        images: [],
        captions: [
          {
            heading: "창의력발달검사 하이브리드 앱 -",
            body: "갤럭시탭 A8(1280×800) 전용 하이브리드 앱으로, 아이들이 게임처럼 즐기며 창의력을 검사하는 콘텐츠를 퍼블리싱했습니다. CSS Animation의 steps() 카운트 방식과 스프라이트 이미지를 활용해 캐릭터 애니메이션을 구현했고, 차트 라이브러리로 검사 결과를 시각화한 대시보드를 구현했습니다.",
          },
        ],
      },
      {
        images: [
          img("work-detail-img/tinpo/tinpo-screen-1.webp"),
          img("work-detail-img/tinpo/tinpo-screen-2.webp"),
          img("work-detail-img/tinpo/tinpo-screen-3.webp"),
          img("work-detail-img/tinpo/tinpo-screen-4.webp"),
          img("work-detail-img/tinpo/tinpo-screen-5.webp"),
          img("work-detail-img/tinpo/tinpo-screen-6.webp"),
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "lgd-webzine",
    title: "LGDisplay 사내 웹진 디자인&퍼블리싱",
    summary:
      "매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현해 안정적으로 서비스했습니다. (2020-2021)",
    tags: ["HTML/SCSS", "Responsive", "Design"],
    thumbnail: { image: img("work-thumb-img/works-thumbnail-lgdisplay.webp") },
    chipColor: ChipColor.Yellow,
    hero: { enabled: false },
    sections: [
      {
        images: [
          img("work-detail-img/lgdisplay/lgdisplay-screen-1.webp"),
          img("work-detail-img/lgdisplay/lgdisplay-screen-2.webp"),
          img("work-detail-img/lgdisplay/lgdisplay-screen-3.webp"),
        ],
        captions: [
          {
            heading: "LGDisplay 사내 웹진 디자인&퍼블리싱 —",
            body: "매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 서브페이지 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현하여 서비스했습니다. (2020-2021)",
          },
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "ssu-law",
    title: "숭실대학교 법학과 홈페이지 디자인 및 UI개발",
    summary: "",
    tags: ["HTML/SCSS", "Responsive", "Design"],
    thumbnail: { image: img("work-thumb-img/works-thumbnail-ssu.webp") },
    chipColor: ChipColor.Green,
    hero: { enabled: false },
    sections: [
      {
        video: video("work-detail-video/work-detail-ssu.webm"),
        images: [],
        captions: [
          {
            heading: "숭실대학교 법학과 웹사이트 —",
            body: "단일 코드베이스 기반의 실제 반응형(Responsive) 웹사이트를 디자인하고 퍼블리싱으로 구현하였습니다. \nUI 디자인부터 퍼블리싱까지 전 과정을 담당한 프로젝트입니다. 메인 비주얼 슬라이더, 공지사항 카드 그리드, GNB 메가메뉴 등 대학 홈페이지에 맞는 UI를 직접 디자인하고 구현했습니다. \n숭실대학교의 전용 컬러를 사용하여 퀵링크 아이콘 배너로 정보 접근성과 시각적 통일감을 함께 설계했습니다.",
          },
        ],
      },
      {
        images: [
          img("work-detail-img/ssu/ssu-screen-1.webp"),
          img("work-detail-img/ssu/ssu-screen-2.webp"),
        ],
        captions: [
          {
            heading: "숭실대학교 법학과 웹사이트 —",
            body: "메인, 서브 포함 16개 페이지 규모의 학과 소개, 교육과정, 학사 정보 사이트를 SCSS 믹스인으로 6개 구간(모바일~데스크톱 1920px)의 breakpoint를 실제 분기 적용하였습니다. \n접근성을 고려한 스킵 네비게이션과 jQuery 기반 megamenu(GNB)를 구현했습니다.",
          },
        ],
      },
    ],
  },
  {
    openInDetailPage: true,
    slug: "tix-korea",
    title: "TIX Korea 티켓예매 플랫폼 ",
    summary:
      "뮤지컬·연극 등 공연 티켓과 함께 식사권을 함께 예매할 수 있는 반응형 예매 플랫폼입니다. 공연 검색부터 좌석/식사권 선택, 결제까지 이어지는 예매 플로우를 PC·모바일 반응형으로 퍼블리싱했습니다.",
    tags: ["HTML/SCSS", "Responsive"],
    thumbnail: { image: img("work-thumb-img/works-thumbnail-tix.webp") },
    chipColor: ChipColor.Green,
    hero: { enabled: false },
    sections: [
      {
        images: [
          img("work-detail-img/tix/tix-screen-1.webp"),
          img("work-detail-img/tix/tix-screen-2.webp"),
          img("work-detail-img/tix/tix-screen-3.webp"),
        ],
      },
    ],
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

export const PROJECTS: Project[] = PROJECT_ITEMS.map((item, i) => ({
  ...item,
  idx: `${pad2(i + 1)} / ${pad2(PROJECT_ITEMS.length)}`,
})) as Project[];
