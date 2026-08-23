# Experiences Data

`src/data/experiences.ts`의 경력(Work Experience) 데이터를 사람이 읽고 편집하기 쉬운 형태로 정리한 문서입니다.
CareerPanel 아코디언에서 사용되는 데이터로, 다른 템플릿에 포트폴리오를 이식하거나 코드를 열지 않고 내용만 수정/검토할 때 이 파일을 기준으로 작업하세요.

> 이 문서는 참고/작업용 자료이며, 실제 데이터 소스는 여전히 `src/data/experiences.ts`입니다.
> 이 md를 수정해도 사이트에는 반영되지 않습니다 — 반영하려면 `experiences.ts`를 직접 수정하세요.

---

## 필드 스펙

새 템플릿에 이식하거나 항목을 추가할 때 참고하는 필드 정의입니다.

| 필드               | 타입              | 필수 | 설명                                                                                                    |
| ------------------ | ----------------- | ---- | ------------------------------------------------------------------------------------------------------- |
| `id`               | string            | ✅   | 고유 식별자 (kebab-case)                                                                                |
| `name`             | string            | ✅   | 회사/기관명                                                                                             |
| `role`             | string            | ✅   | 직무·역할 한 줄 요약                                                                                    |
| `period`           | string            | ✅   | 재직 기간 (예: `2022.11 — 현재`)                                                                        |
| `current`          | boolean           | -    | 현재 재직 중이면 `true` — 뱃지 등으로 강조 표시                                                         |
| `accentColor`      | ChipColor         | ✅   | 카드 내 강조 색상 (`Red`/`Blue`/`Yellow`/`Purple`/`Green`). `src/data/projects.ts`의 `ChipColor` 재사용 |
| `summary`          | string            | ✅   | 카드 상단 요약 문단                                                                                     |
| `tags`             | string[]          | ✅   | 사용 기술/키워드 태그                                                                                   |
| `groups`           | ExperienceGroup[] | ✅   | 아코디언 본문을 구성하는 하위 그룹 목록                                                                 |
| `groups[].title`   | string            | ✅   | 그룹 제목. 빈 문자열이면 제목 없이 bullets/note만 렌더링                                                |
| `groups[].bullets` | string[]          | -    | 불릿 목록형 내용                                                                                        |
| `groups[].note`    | string            | -    | 나열형 텍스트 (예: 참여 학교 목록처럼 문장으로 이어지는 콘텐츠). bullets와 배타적으로 사용              |

**정렬 규칙**: 배열 작성 순서대로 렌더링됩니다 (별도 정렬 로직 없음). 최신 경력을 위에 배치하는 현재 관례를 유지하세요.

---

## 경력 목록 (작성 순서)

### 1. 위메이드

- **id**: `wemade`
- **role**: WEMIXPLAY Front & 백오피스 UI 담당
- **period**: 2022.11 — 현재 (`current: true`)
- **accentColor**: Purple
- **tags**: Next.js, GSAP, Framer Motion, Storybook, Design System, Web3

**summary**

> 블록체인 게임 플랫폼 WEMIXPLAY의 3.0 → 4.0 리뉴얼에 초기 단계부터 UI 작업자로 참여했습니다. AI-driven Admin 파이프라인에서는 UI 일관성 유지를 위한 UI 생성 Rule과 원활한 협업을 위한 Auto-Comment 스킬을 구현했으며, WEMADE 공식 홈페이지에 GSAP 스크롤 인터랙션을, StabletNet에는 Framer Motion 스크롤 인터랙션을 적용했습니다. 현재는 Web3 글로벌 게임 사전예약 이벤트의 UI 및 FE 기능을 구현하고 있습니다.

**groups**

1. **WEMIXPLAY 3.0 → 4.0**
   - 게임 소개 중심의 3.0에서 커뮤니케이션 중심의 4.0까지, 리뉴얼 초기 기획 단계부터 UI 작업자로 참여
   - 4.0 사전예약 프로모션 및 소개 페이지 제작, 3.0의 불필요한 스타일·리소스 정리 및 유지보수
   - variable·mixin을 활용해 다크/라이트 테마, 폰트, 인터랙션 영역을 시스템으로 적용
   - 재사용 가능한 아톰 컴포넌트(버튼·입력창·태그·모달 등)를 제작하고 Storybook으로 관리하며 유관 부서와 정기 공유
   - 정기 회고와 피드백을 통해 불필요한 태그·스타일을 제거 및 개선
2. **Developer Console & AI-driven Admin**
   - Wemix Developer Console admin 컴포넌트 제작 및 화면 구축
   - AI-driven 파이프라인의 spec-intake 단계에서 기획·API·보안 문서를 교차 참조해 불일치를 감지하고, 담당 부서를 자동 멘션·코멘트하는 Jira 스킬 개발
   - form·list·detail·dialog·filter 등 백오피스 컴포넌트를 JSON 스키마로 규칙화해, AI가 UI를 생성할 때 할루시네이션 없이 일관된 구조로 생성되도록 UI Generation Rules 설계
3. **공식 홈페이지 & Web3 이벤트**
   - WEMADE 공식 홈페이지 구축(Main, Work with us, 채용/회사소개, IR) — Next.js·GSAP 스크롤 인터랙션 구현
   - StabletNet 랜딩페이지 — Framer Motion·CSS Animation 기반 스크롤 reveal 인터랙션 구현 및 배포
   - Night Crows·ROM·Legend of YMIR 등 글로벌 타이틀 사전예약 프로모션 UI 제작(모바일/데스크탑 적응형)
   - Hell Squad Rrrush 사전예약 프로모션 — reCAPTCHA 연동 로그인 및 사전예약 기능 UI·FE 개발

---

### 2. 윙크스톤파트너스

- **id**: `winkstone`
- **role**: 핀테크 서비스 웹 퍼블리싱
- **period**: 2022.05 — 2022.11
- **accentColor**: Red
- **tags**: Vue, HTML, CSS, JS, Responsive

**summary**

> 핀테크 스타트업에서 기업 홈페이지와 대출·투자 서비스 사이트 리뉴얼을 담당했습니다. 선정산 플랫폼 '데일리드림'을 유지보수하고 긱워커 대상 랜딩페이지를 반응형으로 제작하였습니다.

**groups**

1. _(제목 없음)_
   - 윙크스톤파트너스 기업 홈페이지 리뉴얼 — 반응형 웹 퍼블리싱
   - 윙크스톤 대출(loan.winkstone)·투자(invest.winkstone) 사이트 리뉴얼 — 랜딩 및 마이페이지 등
   - 긱워커 선정산 진입용 랜딩페이지 퍼블리싱

---

### 3. 웰컴에프앤디(웰컴금융그룹)

- **id**: `welcome-fnd`
- **role**: 웰컴금융그룹 — 금융 계열사 UI/퍼블리싱
- **period**: 2021.03 — 2022.05
- **accentColor**: Red
- **tags**: Vue, HTML, CSS, JS, Responsive

**summary**

> 웰컴금융그룹 계열사들의 웹사이트를 담당하며 웰컴캐피탈 PC/Mobile 신규 구축 프로젝트를 진행했습니다. Welcome Leasing LAO 리뉴얼과 웰컴파이낸스 필리핀(WBP) 랜딩페이지 UI를 맡았고, 웰릭스렌탈 전산 UI 개선 등 금융 도메인 전반의 화면을 폭넓게 다뤘습니다.

**groups**

1. _(제목 없음)_
   - Welcome Leasing LAO 리뉴얼
   - 웰컴캐피탈 홈페이지 PC/Mobile 신규 프로젝트 진행
   - 웰컴파이낸스 필리핀(WBP) 랜딩페이지 UI 작업
   - 웰컴에프앤디 홈페이지 유지보수, 웰릭스렌탈 전산 UI 일부 화면 개선

---

### 4. 아이스크림키즈

- **id**: `icecream-kids`
- **role**: 교육 플랫폼 웹/앱 퍼블리싱
- **period**: 2019.02 — 2020.11
- **accentColor**: Yellow
- **tags**: HTML, CSS, JS, Hybrid, Responsive

**summary**

> 유아 교육 콘텐츠 플랫폼 '누리놀이'의 PC 웹사이트 리뉴얼과 유지보수, 이벤트·랜딩페이지를 담당했습니다. '리틀홈런' PC/모바일 신규 웹사이트를 전담 구축하고, '틴포' 창의력발달검사 하이브리드 앱 퍼블리싱까지 교육 서비스 전반의 화면을 만들었습니다.

**groups**

1. _(제목 없음)_
   - 누리놀이 PC 웹사이트 리뉴얼, 유지보수, 다운로드 이벤트·랜딩페이지 제작
   - 리틀홈런 PC/모바일 신규 웹사이트 담당
   - 틴포 창의력발달검사 하이브리드 앱 퍼블리싱

---

### 5. 니트로아이

- **id**: `nitroi`
- **role**: 교육기관·기업 홈페이지 신규 구축
- **period**: 2015.07 — 2018.11
- **accentColor**: Green
- **tags**: HTML, CSS, JS, Responsive

**summary**

> 경기도교육청 산하 초·중·고등학교 홈페이지를 일반형/반응형으로 신규 구축하며 웹 표준의 기본기를 다졌습니다. 세종교육청 초등학교 홈페이지 템플릿 제작과 경기도교육정보기록원 등 기관 사이트를 구축했고, 외국어고·예술고를 포함한 13개 이상의 학교 프로젝트를 수행했습니다.

**groups**

1. _(제목 없음)_
   - 경기도교육청 초·중·고등학교 신규 홈페이지 일반형/반응형 구축
   - 일반 기업, 기관, 경기도교육정보기록원 홈페이지 신규 구축
   - 세종교육청 초등학교 홈페이지 템플릿 제작
2. **교육청 소재 초·중·고등학교 홈페이지 신규 구축 참여리스트** _(note — 나열형 텍스트)_
   > 대원외국어고등학교 · 그라시아스 음악학교 · 여주 방과후 학교 지원센터 · 예닮 글로벌학교 · 대일외국어고등학교 · 동화중학교 · 동일공업고등학교 · 명덕외국어고등학교 · 계원예술고등학교 · 경기외국어고등학교 · 성덕고등학교 · 태원고등학교 · 구미전자공업고등학교 외

---

## 요약 통계

- 총 경력: 5개
- 현재 재직 중 (`current: true`): 1개 (위메이드)
- accentColor 분포: Red 2, Purple 1, Yellow 1, Green 1
- `note` 필드 사용: 니트로아이 1건 (참여 학교 리스트)
