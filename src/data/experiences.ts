/* 경력(Work Experience) 데이터 — CareerPanel 아코디언에서 사용 */

export interface ExperienceGroup {
  title: string;
  bullets?: string[];
  /* 나열형 텍스트 (예: 참여 학교 목록) */
  note?: string;
}

export interface Experience {
  id: string;
  name: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  groups: ExperienceGroup[];
  tags: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'wemade',
    name: '위메이드',
    role: 'WEMIXPLAY 프론트엔드 & 백오피스 UI 담당',
    period: '2022.11 — 현재',
    current: true,
    summary:
      '블록체인 게임 플랫폼 WEMIXPLAY의 3.0→4.0 리뉴얼을 초기 기획 단계부터 UI 작업자로 참여했습니다. ' +
      'Storybook 기반 아톰 컴포넌트 시스템과 다크/라이트 테마를 구축하고, AI-driven Admin 파이프라인의 UI 일관성 작업을 수행했으며, ' +
      'WEMADE 공식 홈페이지의 GSAP 스크롤 인터랙션과 Web3 글로벌 게임 사전예약 이벤트의 FE 기능을 구현했습니다.',
    groups: [
      {
        title: 'WEMIXPLAY 3.0 → 4.0',
        bullets: [
          '게임 소개 중심의 3.0부터 커뮤니케이션 중심의 4.0까지, 리뉴얼 초기 기획 단계부터 UI 작업자로 참여',
          '4.0 사전예약 프로모션 및 소개 페이지 제작, 3.0에서는 불필요한 스타일·리소스를 정리해 유지보수성 향상',
          'variable·mixin을 활용해 다크/라이트 테마, 폰트, 인터랙션 영역을 시스템으로 적용',
          '재사용 가능한 아톰 컴포넌트(버튼·입력창·태그·모달 등)를 제작하고 Storybook으로 관리하며 유관 부서와 정기 공유',
          '정기 회고와 피드백을 통해 불필요한 태그·스타일을 제거 및 개선',
        ],
      },
      {
        title: 'Developer Console & AI-driven Admin',
        bullets: [
          'Wemix Developer Console admin 컴포넌트 제작 및 화면 구축',
          'WEMIX PAY·DEX AI-driven console admin — AI 전용 구축 파이프라인 과정에서 UI 일관성 유지를 위한 협업 스크립트 작업',
        ],
      },
      {
        title: '공식 홈페이지 & Web3 이벤트',
        bullets: [
          'WEMADE 공식 홈페이지 구축(Main, Work with us, 채용/회사소개, IR) — Next.js·GSAP 스크롤 인터랙션 구현',
          'Web3 글로벌 게임 사전예약 이벤트 UI 제작 및 FE 기능 구현 (ROM, YMIR, 악마단 돌격)',
        ],
      },
    ],
    tags: ['Next.js', 'GSAP', 'Storybook', 'Design System', 'SCSS', 'Web3'],
  },
  {
    id: 'winkstone',
    name: '윙크스톤파트너스',
    role: '핀테크 서비스 웹 퍼블리싱',
    period: '2022.05 — 2022.11',
    summary:
      '핀테크 스타트업에서 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다. ' +
      "선정산 플랫폼 '데일리드림'의 유지보수와 긱워커 대상 랜딩페이지를 반응형으로 퍼블리싱하며, " +
      '금융 서비스 특유의 신뢰감 있는 UI를 빠른 호흡으로 구현했습니다.',
    groups: [
      {
        title: '주요 업무',
        bullets: [
          '윙크스톤파트너스 기업 홈페이지 리뉴얼 — 반응형 웹 퍼블리싱',
          '윙크스톤 대출(loan.winkstone)·투자(invest.winkstone) 사이트 리뉴얼 — 랜딩 및 마이페이지 등',
          "온라인쇼핑몰 매출채권 선정산 플랫폼 '데일리드림' 유지보수",
          '긱워커 선정산 진입용 랜딩페이지 퍼블리싱',
        ],
      },
    ],
    tags: ['Fintech', 'Responsive', 'Landing Page'],
  },
  {
    id: 'welcome-fnd',
    name: 'Welcome F&D',
    role: '웰컴금융그룹 — 금융 계열사 UI/퍼블리싱',
    period: '2021.03 — 2022.05',
    summary:
      '웰컴금융그룹 계열사들의 웹사이트를 담당하며 웰컴캐피탈 PC/Mobile 신규 구축 프로젝트를 진행했습니다. ' +
      'Welcome Leasing LAO 리뉴얼과 웰컴파이낸스 필리핀(WBP) 랜딩페이지 UI를 맡았고, ' +
      '웰릭스렌탈 전산 UI 개선 등 금융 도메인 전반의 화면을 폭넓게 다뤘습니다.',
    groups: [
      {
        title: '주요 업무',
        bullets: [
          'Welcome Leasing LAO 리뉴얼',
          '웰컴캐피탈 홈페이지 PC/Mobile 신규 프로젝트 진행',
          '웰컴파이낸스 필리핀(WBP) 랜딩페이지 UI 작업 담당',
          '웰컴에프앤디 홈페이지 유지보수, 웰릭스렌탈 전산 UI 일부 화면 개선',
        ],
      },
      {
        title: '기타 프로젝트',
        bullets: [
          'ENE System APP UI',
          'LG Display Techforum 반응형 웹 퍼블리싱',
          'LG Display 사내 웹진 2021(디자인·퍼블리싱), 2022(퍼블리싱)',
          '셀스미스 반응형 웹',
        ],
      },
    ],
    tags: ['금융', 'PC/Mobile', 'App UI'],
  },
  {
    id: 'icecream-kids',
    name: '아이스크림키즈',
    role: '교육 플랫폼 웹/앱 퍼블리싱 (PDM)',
    period: '2019.02 — 2020.11',
    summary:
      "유아 교육 콘텐츠 플랫폼 '누리놀이'의 PC 웹사이트 리뉴얼과 유지보수, 이벤트·랜딩페이지를 담당했습니다. " +
      "'리틀홈런' PC/모바일 신규 웹사이트를 전담 구축하고, " +
      "'틴포' 창의력발달검사 하이브리드 앱 퍼블리싱까지 교육 서비스 전반의 화면을 만들었습니다.",
    groups: [
      {
        title: '주요 업무',
        bullets: [
          '누리놀이 PC 웹사이트 리뉴얼, 유지보수, 이벤트·랜딩페이지 제작',
          '리틀홈런 PC/모바일 신규 웹사이트 담당',
          '틴포 창의력발달검사 하이브리드 앱 퍼블리싱',
          '누리놀이 연간교육계획안 퍼블리싱',
        ],
      },
    ],
    tags: ['Education', 'Hybrid App', 'PC/Mobile'],
  },
  {
    id: 'nitroi',
    name: '니트로아이',
    role: '교육기관·기업 홈페이지 신규 구축',
    period: '2015.07 — 2018.11',
    summary:
      '경기도교육청 산하 초·중·고등학교 홈페이지를 일반형/반응형으로 신규 구축하며 웹 표준의 기본기를 다졌습니다. ' +
      '세종교육청 초등학교 홈페이지 템플릿 제작과 경기도교육정보기록원 등 기관 사이트를 구축했고, ' +
      '외국어고·예술고를 포함한 13개 이상의 학교 프로젝트를 수행했습니다 (KOSA 등록).',
    groups: [
      {
        title: '주요 업무',
        bullets: [
          '경기도교육청 초·중·고등학교 신규 홈페이지 일반형/반응형 구축',
          '일반 기업, 기관, 경기도교육정보기록원 홈페이지 신규 구축',
          '세종교육청 초등학교 홈페이지 템플릿 제작',
        ],
      },
      {
        title: '참여 학교',
        note:
          '대원외국어고등학교 · 그라시아스 음악학교 · 여주 방과후 학교 지원센터 · 예닮 글로벌학교 · 대일외국어고등학교 · ' +
          '동화중학교 · 동일공업고등학교 · 명덕외국어고등학교 · 계원예술고등학교 · 경기외국어고등학교 · ' +
          '성덕고등학교 · 태원고등학교 · 구미전자공업고등학교 외',
      },
    ],
    tags: ['웹표준', '반응형', 'KOSA'],
  },
];
