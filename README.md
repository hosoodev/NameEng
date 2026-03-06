# 🌐 NameEng (네이밍) - 한글 이름 로마자 표기 전문 서비스

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**NameEng(네이밍)**은 대한민국 국어의 로마자 표기법을 완벽히 준수하며, 실제 여권 데이터 및 통계 자료를 기반으로 사용자에게 최적의 영문 이름을 제안하는 전문 웹 서비스입니다. 단순한 규칙 변환을 넘어 해외 실생활에서 발생할 수 있는 부정적 의미 필터링과 성씨별 관용 표기 빈도 분석을 제공합니다.

---

## ✨ 주요 핵심 기능

### 1. 🔤 지능형 로마자 변환 엔진
- **표기법 준수**: 국립국어원 **「국어의 로마자 표기법 (2024.05.23 시행)」** 완전 반영.
- **성씨 관용 표기**: 김(Kim/Gim), 이(Lee/Yi), 박(Park/Bak) 등 100여 개 성씨에 대한 다양한 관용 표기 옵션 제공.
- **실시간 변환**: 입력과 동시에 성-이름 순서, 대소문자 세팅, 하이픈 유무를 즉시 반영.

### 2. 📊 고급 분석 도구 (Advanced Tools)
- **성씨 표기 빈도 검색**: 외교부 여권 자료, 서울대 재학생 통계 등 사실 기반 데이터(2011 연구자료)를 바탕으로 성씨별 로마자 표기 선호도 분석.
- **영문 이름 적합성 검사 (Name Checker)**: 영어권 국가에서 사용하기 적합한 이름인지, 발음상의 어려움은 없는지 체크.
- **추천 이름 생성기 (Name Generator)**: 트렌디하고 세련된 영문 이름을 성씨와 조화롭게 추천.

### 3. ⚠️ 부정적 의미 탐지 (Safety Guide)
- **부정적 의미 필터링**: 영어권에서 부정적인 의미(예: Gang, Kill, Sin 등)로 해석될 수 있는 표기를 자동으로 탐지하여 경고.
- **안전한 대안 제시**: 문화적 오해를 방지할 수 있는 최적의 대체 표기법 가이드 제공.

### 4. 📚 전문 콘텐츠 및 가이드
- **블로그 섹션**: 성씨의 역사, 여권 영문명 작성 팁, 해외 생활 에티켓 등 심도 있는 칼럼 제공.
- **공식 가이드**: 여권 발급 가이드 및 로마자 표기 규칙 상세 해설 페이지 운영.

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS (Lucide-React Icons)
- **Components**: 기능별 모듈화된 UI 컴포넌트 설계

### Infrastructure & Automation
- **SEO**: 정적/동적 경로를 포함한 자동화된 `sitemap.ts` 구현.
- **Performance**: Next.js 서버 컴포넌트와 클라이언트 컴포넌트의 효율적 분리.
- **Ads**: Google Adsense 연동 (`AdSlot` 컴포넌트 자동화).

---

## 🏗️ 프로젝트 구조 (Project Structure)

```text
src/
├── app/                # Next.js App Router (Pages & Layouts)
│   ├── blog/           # 블로그 칼럼 및 상세 페이지
│   ├── tools/          # 고급 분석 도구 (성씨 빈도, 생성기 등)
│   ├── passport-guide/ # 여권 발급 안내 가이드
│   └── sitemap.ts      # 자동화된 사이트맵 생성 로직
├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── ads/            # 광고 관리 컴포넌트
│   ├── converter/      # 이름 변환 핵심 로직 컴포넌트
│   └── layout/         # 네비게이션 및 푸터 레이아웃
├── data/               # 성씨 통계 및 블로그 게시물 데이터
└── lib/                # 로마자 변환 엔진 및 유틸리티 함수
```

---

## 🚀 시작하기 (Getting Started)

```bash
# 레포지토리 클론
git clone https://github.com/hosoodev/NameEng.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 및 프로덕션 실행
npm run build
npm start
```

---

## � 개인정보 및 보안 (Privacy & Security)

- **Client-Side Processing**: 사용자가 입력한 이름 데이터는 서버에 저장되지 않으며 대부분 브라우저에서 안전하게 처리됩니다.
- **No Data Tracking**: 개인 식별 정보를 수집하지 않는 투명한 서비스를 지향합니다.

---

## 📄 라이선스 (License)

본 프로젝트는 **MIT License**를 따릅니다. 누구나 자유롭게 수정 및 배포가 가능합니다.

---

**NameEng**는 한국인의 정체성을 담은 정확한 영문 표기를 도와 글로벌 시대를 연결합니다. 🇰🇷 ➡️ �