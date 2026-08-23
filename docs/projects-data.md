# Projects Data

`src/data/projects.ts`의 프로젝트 데이터를 사람이 읽고 편집하기 쉬운 형태로 정리한 문서입니다.
다른 템플릿에 포트폴리오를 이식하거나, 코드를 열지 않고 내용만 수정/검토할 때 이 파일을 기준으로 작업하세요.

> 이 문서는 참고/작업용 자료이며, 실제 데이터 소스는 여전히 `src/data/projects.ts`입니다.
> 이 md를 수정해도 사이트에는 반영되지 않습니다 — 반영하려면 `projects.ts`를 직접 수정하세요.

---

## 필드 스펙

새 템플릿에 이식하거나 항목을 추가할 때 참고하는 필드 정의입니다.

| 필드                        | 타입                   | 필수 | 설명                                                                                                                              |
| --------------------------- | ---------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `title`                     | string                 | ✅   | 프로젝트 제목                                                                                                                     |
| `summary`                   | string                 | ✅   | 카드 설명 + 상세페이지 개요 공용. `\n`으로 줄바꿈                                                                                 |
| `subtitle`                  | string                 | -    | 상세페이지 타이틀 하단 짧은 영문 부제                                                                                             |
| `tags`                      | string[]               | ✅   | 필터 칩에 쓰이는 기술 태그                                                                                                        |
| `thumbnail`                 | ProjectMedia           | ✅   | 카드 썸네일. `image` / `video` / `videoWebm` 중 조합. video가 있으면 image보다 우선 렌더링                                        |
| `externalLink`              | string                 | -    | 바로가기 URL. 있으면 카드/상세페이지에 버튼 노출                                                                                  |
| `chipColor`                 | ChipColor              | ✅   | 카드 상단 칩 색상 + 상세페이지 강조색(`--accent`)으로 재사용. `Red`/`Blue`/`Yellow`/`Purple`/`Green`                              |
| `hero`                      | ProjectHero            | -    | 상세페이지 상단 hero 영역. 생략 시 `{ enabled: true, media: thumbnail }`과 동일 동작. `enabled: false`면 hero 자체를 렌더링 안 함 |
| `sections`                  | ProjectDetailSection[] | -    | 상세페이지 본문. 작성 순서대로 렌더링. 섹션마다 `images[]` 또는 `video` + `captions[]`(heading/body)                              |
| `openInDetailPage` / `slug` | boolean / string       | ✅   | `true`면 `slug` 필수 — 카드 클릭 시 `/work/{slug}`로 이동. `false`면 클릭 불가, 상세페이지 없음                                   |

**미디어 파일 규칙**: `assets/imgs/`, `assets/videos/`에 파일을 넣고 파일명 문자열만 적으면 `img()` / `video()` 헬퍼가 `import.meta.glob`으로 자동 로드합니다 (import 구문 불필요). 각 프로젝트 폴더 기준 경로는 `work-thumb-img/`, `work-thumb/`(썸네일 영상), `work-detail-img/{slug}/`, `work-detail-video/`로 정리되어 있습니다.

**idx 필드**: `PROJECT_ITEMS` 배열의 작성 순서대로 `"01 / 12"` 형식으로 자동 부여됩니다. 직접 작성하지 않습니다.

---

## 프로젝트 목록 (작성 순서 = idx 순서)

### 01. 위메이드 공식 홈페이지

- **slug**: `wemade` (상세페이지 있음)
- **subtitle**: WEMADE Official
- **tags**: Next.js, GSAP, Responsive
- **chipColor**: Purple
- **externalLink**: https://www.wemade.com/
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-wemade.webp` / videoWebm `work-thumb/work-thumb-wemade.webm`

**summary**

> GSAP ScrollTrigger 라이브러리 활용, 스크롤 인터랙션으로 기업 스토리에 리듬을 만들었습니다.
> 작업에 참여한 페이지 → 메인·Loader(intro)·소개&채용(Work with us)·IR

**sections**

1. 비디오: `work-detail-video/work-detail-wemade.webm` (images 없음)
   - **GSAP ScrollTrigger를 활용한 스크롤 인터랙션 구현 —** 섹션 진입 시점에 맞춰 요소가 순차적으로 나타나도록 타임라인을 구성해, 페이지에 자연스러운 리듬감과 몰입감을 더했습니다.
     뷰포트 사이즈에 관계없이 유연하게 반응하는 구조로 설계하여, 어떤 화면에서도 자연스러운 콘텐츠 노출과 일관된 사용자 경험을 제공합니다.
2. 비디오: `work-detail-video/work-detail-wemade-join.webm` (images 없음, 캡션 없음)
3. 이미지: `work-detail-img/wemade/wemade-intro.webp`, `wemade-jointeam.webp`, `wemade-ir.webp` (캡션 없음)

---

### 02. WEMIXPLAY 4.0

- **slug**: `wemixplay` (상세페이지 있음)
- **tags**: Next.js, Storybook
- **chipColor**: Purple
- **externalLink**: https://wemixplay.com/
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-wemixplay.webp` / video `work-thumb/work-thumb-wemixplay.webm`

**summary**

> 리뉴얼 초기 단계부터 참여해 UI 시스템의 아키텍처를 설계했습니다. 디자인 토큰 기반의 다크·라이트 테마와 아토믹 컴포넌트 체계를 구축해 신규 화면 개발 속도와 유지보수성을 개선했으며, Storybook을 도입해 기획·디자인팀이 실제 컴포넌트를 직접 확인하며 협업할 수 있는 환경을 마련했습니다.

**sections**

1. 비디오: `work-detail-video/work-detail-wemixplay.webm` (images 없음)
   - **WEMIXPLAY 4.0 리뉴얼 —** Sass Variable와 Mixin 기반으로 다크·라이트 테마 시스템을 설계했습니다. 컬러뿐 아니라 폰트 스타일, 인터랙션 영역까지 테마 변수 체계에 포함시켜 전환 시에도 스타일 깨짐 없이 일관되게 반영되도록 구조화했고, 컴포넌트 단위로 변수를 관리해 신규 페이지 추가 시에도 별도 작업 없이 테마가 자동 적용되는 구조를 만들었습니다. 이를 기반으로 폰트 스타일, 컬러 variants, 공통 컴포넌트를 체계적으로 정리하고 페이지·Atom 컴포넌트 단위로 Storybook화하여, 디자인팀과 개발팀 간 협업 효율을 높이고 커뮤니케이션 비용을 줄였습니다.
2. 이미지: `work-detail-img/wemixplay/works_wemixplay_shot_1.webp`, `works_wemixplay_shot_2.webp`, `works_wemixplay_shot_3.webp` (캡션 없음)

---

### 03. AI-driven Backoffice

- **slug**: `ai-console-admin` (상세페이지 있음)
- **subtitle**: AI-Driven
- **tags**: Vite, Design
- **chipColor**: Purple
- **thumbnail**: 비어 있음 (placeholder 렌더링)
- **hero**: 비활성 (`enabled: false`)

**summary**

> AI-driven 파이프라인 과정에서 UI일관성 유지를 위한 협업 스크립트 작업을 수행했습니다.

**sections**

1. 이미지: `work-detail-img/backoffice/backoffice-skills.webp`
   - **부서 간 소통 자동화를 위한 Jira 코멘트 스킬 개발 —** 기획·백엔드 API·보안 영역 간 요소가 일치하지 않을 경우 이를 감지해 해당 담당 부서를 자동으로 멘션하고 코멘트를 등록하도록 구현했습니다.
     ai-driven pipeline의 spec-intake 단계에서 로컬 문서(plan·api·security)를 교차 참조해 일관성 파괴 요소를 조기에 감지하고, 코드 생성(Phase 3) 이전 단계에서 담당 부서로 이슈를 에스컬레이션함으로써, AI 파이프라인 환경에서도 부서 간 커뮤니케이션 누락 없이 일관성을 유지할 수 있도록 했습니다.
2. 이미지: `work-detail-img/backoffice/backoffice-rules.webp`
   - **JSON 기반 UI Generation Rules 설계 —** 백오피스에 필요한 form·list·detail·dialog·filter 등의 컴포넌트를 JSON 스키마로 규칙화하여, AI가 UI를 생성할 때마다 할루시네이션 없이 동일한 구조와 스타일의 UI가 생성되도록 했습니다.
     아이콘·컴포넌트 레지스트리와 닫힌 enum(variant/size), spec 기반 버튼 생성 규칙을 통해 존재하지 않는 요소를 추측 생성하는 문제를 차단하고, 스키마·레지스트리·검증기를 한 세트로 관리해 규칙 간 정합성을 유지했습니다.
     또한 신규 요구사항(대시보드형 상세, 슬라이드 패널, 고정 저장 바 등)이 발생했을 때 스키마를 무분별하게 확장하는 대신, 기존 스키마 규칙에 맞게 UI를 재설계(슬라이드 패널→다이얼로그, 고정 저장 바→폼 내 액션 영역)하거나, 기존 어휘로 표현 불가능한 경우에만 신규 타입(dashboard)을 최소 범위로 정의하는 원칙을 세워 스키마의 비대화를 방지했습니다.

---

### 04. StabletNet

- **slug**: `stablenet` (상세페이지 있음)
- **tags**: Next.js, Framer Motion
- **chipColor**: Purple
- **externalLink**: https://stablenet.network/ko
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-stablenet.webp`

**summary**

> Framer Motion 라이브러리를 활용하여 스크롤 인터랙션을 구현하였습니다.

**sections**

1. 비디오: `work-detail-video/work-detail-stablenet.webm` (images 없음)
   - **Framer Motion과 CSS Animation으로 완성한 스크롤 인터랙션 —** 짧은 운영 배포 일정에 맞춰 Framer Motion을 활용한 인터랙션을 신속하게 구현하고 배포했습니다. 스크롤에 따라 요소가 순차적으로 나타나는 reveal 모션을 구현했고, CSS animation을 함께 활용해 페이지 전반에 재미 요소를 더했습니다.
2. 이미지: `work-detail-img/stablenet/stablenet-screen-1.webp` ~ `stablenet-screen-8.webp` (8장, 캡션 없음)

---

### 05. WEB3 게임 글로벌 사전예약 FE 및 UI 개발

- **slug**: `web3-pre-registration` (상세페이지 있음)
- **tags**: Next.js, Adaptive
- **chipColor**: Purple
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-web3.png` / video `work-thumb/work-thumb-web3.webm`

**summary**

> ROM, Legend of YMIR 등 글로벌 타이틀의 사전예약 프로모션의 UI를 제작하였고, 악마단돌겨억(Hell Squad Rrrush)의 사전예약 프로모션에서 UI 및 FE 개발을 담당했습니다.

**sections**

1. 이미지: `work-detail-img/web3/web3-ncgl-hero.webp`
   - **Night Crows 여름이벤트 페이지 —** 글로벌 Night Crows의 여름 이벤트 'Crimson Sun Festival' 적응형 웹 UI를 작업했습니다.
2. 이미지: `work-detail-img/web3/web3-hsgl-hero.webp`
   - **Hell Squad RRRush 사전예약 UI 및 FE 기능 개발중 —** reCAPTCHA를 연동한 로그인 및 사전예약 기능을 구현해, 안정적인 사용자 인증과 캠페인 참여 흐름을 완성했습니다.
3. 이미지: `work-detail-img/web3/web3-rom-hero.webp`, `web3-lygl-hero.webp`
   - **ROM, Legend of YMIR 사전예약 및 발할라트라이얼 이벤트 UI 개발 —** 모바일/데스크탑 적응형(Adaptive) 레이아웃으로 설계해, 디바이스 환경에 관계없이 최적화된 화면을 제공했습니다.

---

### 06. 윙크스톤파트너스

- **상세페이지 없음** (`openInDetailPage: false`)
- **tags**: HTML/SCSS, Responsive
- **chipColor**: Blue
- **externalLink**: https://winkstonepartners.com/ ⚠️ TODO: 실제 바로가기 URL로 교체 필요 (원본 코드 주석)
- **thumbnail**: image `work-thumb-img/works-thumbnail-winkstone.webp` / video `work-thumb/work-thumb-winkstone.webm`

**summary**

> 핀테크 스타트업의 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다.

---

### 07. Welcome F&D

- **상세페이지 없음** (`openInDetailPage: false`)
- **tags**: HTML/SCSS, Responsive
- **chipColor**: Red
- **externalLink**: https://www.welcomefnd.com/
- **thumbnail**: image `work-thumb-img/works-thumbnail-welcome.webp` / video `work-thumb/work-thumb-welcome.webm`

**summary**

> 웰컴금융그룹 계열사 웹사이트를 담당하며 신규 구축 프로젝트를 진행했습니다.
> Welcome Leasing LAO, 웰컴파이낸스 필리핀, 렌탈 Backoffice

---

### 08. 아이스크림키즈 리틀홈런

- **상세페이지 없음** (`openInDetailPage: false`)
- **tags**: HTML/SCSS, Adaptive
- **chipColor**: Yellow
- **externalLink**: https://little.home-learn.co.kr/main/index
- **thumbnail**: image `work-thumb-img/works-thumbnail-little-homelearn.webp`

**summary**

> 유아 교육 콘텐츠 플렛폼 리틀홈런 PC/Mobile 적응형 웹 전구간 담당

---

### 09. 아이스크림키즈 창의력발달검사 Tinpo 하이브리드앱

- **slug**: `tinpo` (상세페이지 있음)
- **tags**: HTML/SCSS, Hybrid APP
- **chipColor**: Yellow
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-tinpo.webp`

**summary**

> 창의력발달검사 Tinpo하이브리드 앱 퍼블리싱

**sections**

1. 비디오: `work-detail-video/work-detail-tinpo.webm` (images 없음)
   - **창의력발달검사 하이브리드 앱 -** 갤럭시탭 A8(1280×800) 전용 하이브리드 앱으로, 아이들이 게임처럼 즐기며 창의력을 검사하는 콘텐츠를 퍼블리싱했습니다. CSS Animation의 steps() 카운트 방식과 스프라이트 이미지를 활용해 캐릭터 애니메이션을 구현했고, 차트 라이브러리로 검사 결과를 시각화한 대시보드를 구현했습니다.
2. 이미지 6장 (캡션 없음): `work-detail-img/tinpo/tinpo-screen-1.webp` ~ `tinpo-screen-6.webp`

---

### 10. LGDisplay 사내 웹진 디자인&퍼블리싱

- **slug**: `lgd-webzine` (상세페이지 있음)
- **tags**: HTML/SCSS, Responsive, Design
- **chipColor**: Yellow
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-lgdisplay.webp`

**summary**

> 매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현해 안정적으로 서비스했습니다. (2020-2021)

**sections**

1. 이미지: `work-detail-img/lgdisplay/lgdisplay-screen-1.webp`, `lgdisplay-screen-2.webp`, `lgdisplay-screen-3.webp`
   - **LGDisplay 사내 웹진 디자인&퍼블리싱 —** 매월 전달받는 콘텐츠와 사진을 기반으로 반응형 웹진을 디자인 및 퍼블리싱하여 정기 발행한 프로젝트입니다. 고정된 발행 주기에 맞춰 매호 새로운 서브페이지 레이아웃을 디자인하고, 디바이스별 최적화된 반응형 마크업으로 구현하여 서비스했습니다. (2020-2021)

---

### 11. 숭실대학교 법학과 홈페이지 디자인 및 UI개발

- **slug**: `ssu-law` (상세페이지 있음)
- **tags**: HTML/SCSS, Responsive, Design
- **chipColor**: Green
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-ssu.webp`

**summary**

> (빈 문자열 — summary 없음)

**sections**

1. 비디오: `work-detail-video/work-detail-ssu.webm` (images 없음)
   - **숭실대학교 법학과 웹사이트 —** 단일 코드베이스 기반의 실제 반응형(Responsive) 웹사이트를 디자인하고 퍼블리싱으로 구현하였습니다.
     UI 디자인부터 퍼블리싱까지 전 과정을 담당한 프로젝트입니다. 메인 비주얼 슬라이더, 공지사항 카드 그리드, GNB 메가메뉴 등 대학 홈페이지에 맞는 UI를 직접 디자인하고 구현했습니다.
     숭실대학교의 전용 컬러를 사용하여 퀵링크 아이콘 배너로 정보 접근성과 시각적 통일감을 함께 설계했습니다.
2. 이미지: `work-detail-img/ssu/ssu-screen-1.webp`, `ssu-screen-2.webp`
   - **숭실대학교 법학과 웹사이트 —** 메인, 서브 포함 16개 페이지 규모의 학과 소개, 교육과정, 학사 정보 사이트를 SCSS 믹스인으로 6개 구간(모바일~데스크톱 1920px)의 breakpoint를 실제 분기 적용하였습니다.
     접근성을 고려한 스킵 네비게이션과 jQuery 기반 megamenu(GNB)를 구현했습니다.

---

### 12. TIX Korea 티켓예매 플랫폼

- **slug**: `tix-korea` (상세페이지 있음)
- **tags**: HTML/SCSS, Responsive
- **chipColor**: Green
- **hero**: 비활성 (`enabled: false`)
- **thumbnail**: image `work-thumb-img/works-thumbnail-tix.webp`

**summary**

> 뮤지컬·연극 등 공연 티켓과 함께 식사권을 함께 예매할 수 있는 반응형 예매 플랫폼입니다. 공연 검색부터 좌석/식사권 선택, 결제까지 이어지는 예매 플로우를 PC·모바일 반응형으로 퍼블리싱했습니다.

**sections**

1. 이미지: `work-detail-img/tix/tix-screen-1.webp`, `tix-screen-2.webp`, `tix-screen-3.webp` (캡션 없음)

---

## 요약 통계

- 총 프로젝트: 12개
- 상세페이지 있음 (`openInDetailPage: true`): 9개
- 상세페이지 없음: 3개 (윙크스톤파트너스, Welcome F&D, 아이스크림키즈 리틀홈런)
- chipColor 분포: Purple 5, Yellow 3, Green 2, Blue 1, Red 1
- thumbnail 비어 있음(placeholder): 1개 (AI-driven Backoffice)
