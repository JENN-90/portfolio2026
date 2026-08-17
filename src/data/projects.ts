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
  slug?: string; // 서브페이지 URL(/work/:slug)에 사용되는 고유 값 — hasDetailPage: false인 경우 생략 가능
  title: string;
  desc: string; // \n을 넣으면 해당 위치에서 줄바꿈됨

  tags: string[];
  img?: string; // 없으면 썸네일 이미지 없이 렌더링됨
  label: string;
  video?: string;
  videoWebm?: string; // video의 webm 소스 — 있으면 <source>로 mp4보다 우선 시도됨
  link?: string; // 바로가기 URL — 있으면 썸네일에 바로가기 버튼이 렌더링됨
  showHero?: boolean; // 상세페이지 상단 hero 영역 렌더링 여부 — 기본값 true, false면 렌더링하지 않음
  heroImg?: string; // 상세페이지 hero 전용 이미지 — 없으면 img로 폴백
  heroVideo?: string; // 상세페이지 hero 전용 비디오 — 없으면 video로 폴백. thumb에서는 영상, hero에서는 이미지만 쓰고 싶을 때 heroImg만 지정하면 됨
  heroVideoWebm?: string; // heroVideo의 webm 소스
  hasDetailPage?: boolean; // 상세페이지(/work/:slug) 라우팅 여부 — 기본값 true, false면 카드 클릭 비활성화
  chipColor: ChipColor; // WorkSection 카드 상단 chip 색상
  details?: {
    imgs: string[]; // 여러 장 작성 가능 — 작성 순서대로 렌더링됨. video가 있으면 무시되고 video가 렌더링됨
    video?: string;
    texts?: {
      title?: string;
      desc?: string;
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
    heroImg: img("works-thumbnail-wemade.webp"),
    label: "WEMADE Official",
    videoWebm: video("works-thumbnail-wemade.webm"),
    link: "https://www.wemade.com/", // 바로가기 URL
    chipColor: ChipColor.Purple,
    showHero: false,
    details: [
      {
        imgs: [img("works_wemade_shot_1.webp")],
        texts: [],
      },
      {
        imgs: [img("works_wemade_shot_2.webp")],
        texts: [
          {
            title: "GSAP ScrollTrigger를 활용한 스크롤 인터랙션 구현 — ",
            desc: "섹션 진입 시점에 맞춰 요소가 순차적으로 나타나도록 타임라인을 구성해, 페이지에 자연스러운 리듬감과 몰입감을 더했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_wemade_shot_3.webp")],
        texts: [
          {
            title: "스크롤 기반 reveal 인터랙션과 반응형 레이아웃 구현 — ",
            desc: "뷰포트 사이즈에 관계없이 유연하게 반응하는 구조로 설계해, 어떤 화면에서도 자연스러운 콘텐츠 노출과 일관된 사용자 경험을 제공했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_wemade_shot_4.webp")],
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
    heroImg: img("works-thumbnail-wemixplay.webp"),
    label: "",
    video: video("works-thumbnail-wemixplay.mp4"),
    link: "https://wemixplay.com/", // 바로가기 URL
    chipColor: ChipColor.Purple,
    showHero: false,
    details: [
      {
        imgs: [img("works_wemixplay_shot_1.webp")],
        texts: [
          {
            title: "WEMIXPLAY 4.0 리뉴얼 —",
            desc: "커뮤니티 중심의 위믹스플레이 4.0 리뉴얼. Feed, Community기능 중심의 반응형 웹 플랫폼",
          },
        ],
      },
      {
        imgs: [img("works_wemixplay_shot_3.webp")],
        texts: [
          {
            title: "Variable·Mixin 기반 다크/라이트 테마 시스템 구현 —",
            desc: "Sass Variable와 Mixin을 활용해 다크/라이트 테마 시스템을 설계했습니다. 컬러뿐 아니라 폰트 스타일, 인터랙션 영역까지 테마 변수 체계에 포함시켜 전환 시에도 깨짐 없이 일관되게 반영되도록 구조화했고, 컴포넌트 단위로 변수를 관리해 신규 페이지 추가 시에도 별도 작업 없이 테마가 자동 적용되도록 했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_wemixplay_shot_3.webp")],
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
        imgs: [img("works_aidriven_commentskills.webp")],
        texts: [
          {
            title: "부서 간 소통 자동화를 위한 Jira 코멘트 스킬 개발 — ",
            desc: "기획·백엔드 API·보안 영역 간 요소가 일치하지 않을 경우 이를 감지해 해당 담당 부서를 자동으로 멘션하고 코멘트를 등록하도록 구현했습니다. \n ai-driven pipeline의 spec-intake 단계에서 로컬 문서(plan·api·security)를 교차 참조해 일관성 파괴 요소를 조기에 감지하고, 코드 생성(Phase 3) 이전 단계에서 담당 부서로 이슈를 에스컬레이션함으로써, AI 파이프라인 환경에서도 부서 간 커뮤니케이션 누락 없이 일관성을 유지할 수 있도록 했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_aidriven_uirules.webp")],
        texts: [
          {
            title: "JSON 기반 UI Generation Rules 설계 — ",
            desc: "백오피스에 필요한 form·list·detail·dialog·filter 등의 컴포넌트를 JSON 스키마로 규칙화하여, AI가 UI를 생성할 때마다 할루시네이션 없이 동일한 구조와 스타일의 UI가 생성되도록 했습니다. \n아이콘·컴포넌트 레지스트리와 닫힌 enum(variant/size), spec 기반 버튼 생성 규칙을 통해 존재하지 않는 요소를 추측 생성하는 문제를 차단하고, 스키마·레지스트리·검증기를 한 세트로 관리해 규칙 간 정합성을 유지했습니다. \n또한 신규 요구사항(대시보드형 상세, 슬라이드 패널, 고정 저장 바 등)이 발생했을 때 스키마를 무분별하게 확장하는 대신, 기존 스키마 규칙에 맞게 UI를 재설계(슬라이드 패널→다이얼로그, 고정 저장 바→폼 내 액션 영역)하거나, 기존 어휘로 표현 불가능한 경우에만 신규 타입(dashboard)을 최소 범위로 정의하는 원칙을 세워 스키마의 비대화를 방지했습니다.",
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
        imgs: [],
        video: video("works-detail-stabletnet.mp4"),
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
    heroImg: img("works-thumbnail-web3.webp"),
    label: "",
    video: video("works-thumbnail-web3.mp4"),
    chipColor: ChipColor.Purple,
    showHero: false,
    details: [
      {
        imgs: [img("works_web3_ncgl.webp")],
        texts: [
          {
            title: "Night Crows 여름이벤트 페이지 — ",
            desc: "글로벌 Night Crows의 여름 이벤트 'Crimson Sun Festival' 적응형 웹 UI를 작업했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_web3_hsgl.webp")],
        texts: [
          {
            title: "Hell Squad RRRush 사전예약 UI 및 FE 기능 개발중 — ",
            desc: "reCAPTCHA를 연동한 로그인 및 사전예약 기능을 구현해, 안정적인 사용자 인증과 캠페인 참여 흐름을 완성했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_web3_rom.webp"), img("works_web3_ymir.webp")],
        texts: [
          {
            title:
              "ROM, Legend of YMIR 사전예약 및 발할라트라이얼 이벤트 UI 개발 — ",
            desc: "모바일/데스크탑 적응형(Adaptive) 레이아웃으로 설계해, 디바이스 환경에 관계없이 최적화된 화면을 제공했습니다.",
          },
        ],
      },
    ],
  },
  {
    title: "윙크스톤파트너스",
    desc: "핀테크 스타트업의 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다.",
    tags: ["HTML", "SCSS", "Responsive"],
    img: img("works-thumbnail-wink.webp"),
    label: "",
    video: video("works-thumbnail-wink.mp4"),
    chipColor: ChipColor.Blue,
    link: "https://winkstonepartners.com/", // TODO: 실제 바로가기 URL로 교체 필요
    hasDetailPage: false,
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
    hasDetailPage: false,
  },
  {
    slug: "icecreamkids",
    title: "아이스크림키즈 리틀홈런",
    desc: "유아 교육 콘텐츠 플렛폼 리틀홈런 PC/Mobile 적응형 웹 전구간 담당",
    tags: ["HTML", "SCSS", "Adaptive", "jQuery"],
    img: img("works-thumbnail-little.webp"),
    label: "",
    link: "https://little.home-learn.co.kr/main/index",
    chipColor: ChipColor.Yellow,
    hasDetailPage: false,
  },
  {
    slug: "tinpo",
    title: "아이스크림키즈 창의력발달검사 Tinpo 하이브리드앱",
    desc: "창의력발달검사 Tinpo하이브리드 앱 퍼블리싱",
    tags: ["HTML", "SCSS", "Hybrid", "jQuery"],
    img: img("works-thumbnail-tinpo.webp"),
    label: "",
    chipColor: ChipColor.Yellow,
    showHero: false,
    details: [
      {
        video: video("work-detail-tinpo.mp4"),
        imgs: [],
        texts: [
          {
            title: "창의력발달검사 하이브리드 앱 -",
            desc: "갤럭시탭 A8(1280×800) 전용 하이브리드 앱으로, 아이들이 게임처럼 즐기며 창의력을 검사하는 콘텐츠를 퍼블리싱했습니다. CSS Animation의 steps() 카운트 방식과 스프라이트 이미지를 활용해 캐릭터 애니메이션을 구현했고, 차트 라이브러리로 검사 결과를 시각화한 대시보드를 구현했습니다.",
          },
        ],
      },
      {
        imgs: [
          img("works-detail-tinpo-1.webp"),
          img("works-detail-tinpo-2.webp"),
          img("works-detail-tinpo-3.webp"),
          img("works-detail-tinpo-4.webp"),
          img("works-detail-tinpo-5.webp"),
          img("works-detail-tinpo-6.webp"),
        ],
      },
    ],
  },
  {
    slug: "lgd-webzine",
    title: "LGDisplay 사내 웹진 디자인&퍼블리싱",
    desc: "매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현해 안정적으로 서비스했습니다. (2020-2021)",
    tags: ["HTML", "SCSS", "Adaptive", "jQuery"],
    img: img("works-thumbnail-lgd.webp"),
    label: "",
    chipColor: ChipColor.Yellow,
    showHero: false,
    details: [
      {
        imgs: [
          img("works-detail-lgd-1.webp"),
          img("works-detail-lgd-2.webp"),
          img("works-detail-lgd-3.webp"),
        ],
        texts: [
          {
            title: "LGDisplay 사내 웹진 디자인&퍼블리싱 —",
            desc: "매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 서브페이지 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현하여 서비스했습니다. (2020-2021)",
          },
        ],
      },
    ],
  },
  {
    slug: "ssu-law",
    title: "숭실대학교 법학과 홈페이지 디자인 및 UI개발",
    desc: "",
    tags: ["HTML", "SCSS", "Responsive", "jQuery"],
    img: img("works-thumbnail-ssu.webp"),
    label: "",
    // link: "https://little.home-learn.co.kr/main/index",
    chipColor: ChipColor.Green,
    showHero: false,
    details: [
      {
        video: video("works-detail-ssu.mp4"),
        imgs: [],
        texts: [
          {
            title: "숭실대학교 법학과 웹사이트 —",
            desc: "단일 코드베이스 기반의 실제 반응형(Responsive) 웹사이트를 디자인하고 퍼블리싱으로 구현하였습니다. \nUI 디자인부터 퍼블리싱까지 전 과정을 담당한 프로젝트입니다. 메인 비주얼 슬라이더, 공지사항 카드 그리드, GNB 메가메뉴 등 대학 홈페이지에 맞는 UI를 직접 디자인하고 구현했습니다. \n숭실대학교의 전용 컬러를 사용하여 퀵링크 아이콘 배너로 정보 접근성과 시각적 통일감을 함께 설계했습니다.",
          },
        ],
      },
      {
        imgs: [img("works_ssu-shot1.webp"), img("works_ssu-shot2.webp")],
        texts: [
          {
            title: "숭실대학교 법학과 웹사이트 —",
            desc: "메인, 서브 포함 16개 페이지 규모의 학과 소개, 교육과정, 학사 정보 사이트를 SCSS 믹스인으로 6개 구간(모바일~데스크톱 1920px)의 breakpoint를 실제 분기 적용하였습니다. \n접근성을 고려한 스킵 네비게이션과 jQuery 기반 megamenu(GNB)를 구현했습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "tix-korea",
    title: "TIX Korea 티켓예매 플랫폼 ",
    desc: "뮤지컬·연극 등 공연 티켓과 함께 식사권을 함께 예매할 수 있는 반응형 예매 플랫폼입니다. 공연 검색부터 좌석/식사권 선택, 결제까지 이어지는 예매 플로우를 PC·모바일 반응형으로 퍼블리싱했습니다.",
    tags: ["HTML", "SCSS", "Responsive", "jQuery"],
    img: img("works-thumbnail-tix.webp"),
    label: "",
    chipColor: ChipColor.Green,
    showHero: false,
    details: [
      {
        imgs: [
          img("works-tix-1.webp"),
          img("works-tix-2.webp"),
          img("works-tix-3.webp"),
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
