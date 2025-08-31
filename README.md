# 🌐 NameEng - 한글 이름 로마자 표기 변환기

**국어의 로마자 표기법 (2024.05.23 시행)** 기준으로 한글 이름을 영문으로 변환해주는 웹 서비스입니다.

## ✨ 주요 기능

### 🔤 정확한 로마자 변환
- 국립국어원 **「국어의 로마자 표기법」** 완전 준수
- 한글 음성학적 특성을 반영한 정확한 변환

### 👥 관용 성씨 표기 지원
- **김**: Kim, Gim, Keem, Ghim, Kym, Kin
- **이**: Lee, Rhee, Yi, Yee, Rhie
- **박**: Park, Bak, Bark, Pack, Pag, Baak
- **최**: Choe, Choi, Choy, Che, Chai, Chae
- 그 외 **100+ 성씨**의 다양한 관용 표기 옵션

### ⚠️ 부정적 의미 필터링
- 영어권에서 부정적 의미를 가질 수 있는 표기 감지
- 자동 경고 및 안전한 대안 제안
- **예시**: `강 → Gang (폭력단)` → 권장: `Kang, Ghang`

### ⚙️ 다양한 옵션
- **이름 순서**: 성-이름 / 이름-성
- **대소문자**: 첫글자 대문자 / 소문자 / 대문자
- **하이픈**: 공백 / 하이픈 구분
- **복사 기능**: 원클릭 클립보드 복사

## 🚀 사용 방법

### 1. 기본 변환
```
입력: 김민수
결과: Kim Minsu
```

### 2. 관용 성씨 선택
```
입력: 이영희
선택: Lee (기본) / Rhee / Yi / Yee / Rhie
결과: Lee Younghee
```

### 3. 부정적 의미 경고
```
입력: 강민수
경고: ⚠️ Gang은 '폭력단' 의미가 있습니다
권장: Kang Minsu
```

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Radix UI Themes, Tailwind CSS
- **Icons**: Lucide React
- **언어학**: 국어의 로마자 표기법 규칙 엔진

## 📋 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 📚 API 사용법

```typescript
import { romanizeKoreanName } from '@/lib/romanization';

const result = romanizeKoreanName('김민수', {
  order: 'family-given',
  hyphen: false,
  caseStyle: 'capitalized',
  surnameVariant: 'Kim'
});

console.log(result.romanized); // "Kim Minsu"
console.log(result.warnings);  // 부정적 의미 경고
console.log(result.alternatives); // 다른 성씨 표기 옵션
```

## 🎯 사용 사례

### 공식 문서 제출
- 여권 신청
- 비자 서류
- 국제 학회 논문
- 해외 대학 지원서

### 글로벌 비즈니스
- 영문 명함
- 이메일 서명
- LinkedIn 프로필
- 국제 컨퍼런스 등록

### 개인 브랜딩
- 소셜 미디어
- 개인 웹사이트
- 포트폴리오
- 온라인 프로필

## 📖 로마자 표기법 기준

본 서비스는 **국립국어원 고시 제2024-10호 (2024.05.23 시행)**에 따른 「국어의 로마자 표기법」을 준수합니다.

### 주요 규칙
1. **모음**: ㅏ→a, ㅓ→eo, ㅗ→o, ㅜ→u, ㅡ→eu, ㅣ→i
2. **자음**: ㄱ→g/k, ㄴ→n, ㄷ→d/t, ㄹ→r/l, ㅁ→m, ㅂ→b/p, ㅅ→s, ㅇ→ng, ㅈ→j, ㅊ→ch, ㅋ→k, ㅌ→t, ㅍ→p, ㅎ→h
3. **받침**: 음성 환경에 따른 변환

## 🔒 개인정보 보호

- **로컬 처리**: 모든 변환은 브라우저에서 처리됩니다
- **데이터 미저장**: 입력한 이름은 서버에 전송되지 않습니다
- **완전 익명**: 개인정보 수집하지 않습니다

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 문의 및 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/nameeng/nameeng/issues)
- **기능 제안**: [GitHub Discussions](https://github.com/nameeng/nameeng/discussions)

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

**NameEng**는 한국인의 정확한 영문 이름 표기를 위해 만들어진 오픈소스 프로젝트입니다. 🇰🇷 ➡️ 🌍