# US Names 데이터 구조

미국 이름 통계 데이터 (1880~2024, 145년, 7,387개 이름)

원본 CSV: `src/data/names/us/names_all.csv`
변환 스크립트: `scripts/convert-names.ts` (`npm run names:convert`)

---

## 폴더 구조

```
src/data/names/us/
├── index.json          전체 이름 목록 + 기본 통계 (428KB)
├── by-year/            연도별 순위 데이터
│   ├── 1880.json
│   ├── 1881.json
│   └── 2024.json       (145개 파일)
└── by-name/            이름별 전체 연도 데이터
    ├── james.json
    ├── olivia.json
    └── ...             (7,387개 파일, 이름은 소문자)
```

---

## index.json

전체 이름 목록. 검색, 자동완성, `generateStaticParams`에 사용.
최신 순위(lr) 기준 오름차순 정렬.

```ts
type IndexEntry = {
  n: string        // 이름 (소문자) — "james", "olivia"
  g: 'M' | 'F' | 'U'  // 성별 (M: 남, F: 여, U: 유니섹스)
  lr: number       // 최신 순위 (2024년 기준, 없으면 9999)
  py: number       // 전성기 연도 (역대 최고 순위 달성 연도)
  pr: number       // 전성기 순위 (역대 최고 순위)
  my: number       // 총 등장 연도 수
}

// IndexEntry[]
```

**예시:**
```json
[
  { "n": "olivia", "g": "F", "lr": 1,    "py": 2019, "pr": 1, "my": 145 },
  { "n": "liam",   "g": "M", "lr": 1,    "py": 2017, "pr": 1, "my": 52  },
  { "n": "emma",   "g": "F", "lr": 2,    "py": 2008, "pr": 1, "my": 145 },
  { "n": "john",   "g": "M", "lr": 9999, "py": 1880, "pr": 1, "my": 145 }
]
```

**성별(g) 판단 기준:**
- `M`: 남자 총 출생수 > 여자 총 출생수 × 3
- `F`: 여자 총 출생수 > 남자 총 출생수 × 3
- `U`: 그 외 (유니섹스)

**사용 예시:**
```ts
import index from '@/data/names/us/index.json'

// 자동완성 검색
const results = index.filter(e => e.n.startsWith('jam'))

// generateStaticParams (7,387개 페이지 생성)
export async function generateStaticParams() {
  return index.map(e => ({ name: e.n }))
}

// 2024년 TOP 10
const top10 = index.filter(e => e.lr <= 10)
```

---

## by-year/[year].json

특정 연도의 순위 데이터. rank 기준 오름차순 정렬.

```ts
type ByYearEntry = {
  rank: number   // 순위
  m: string      // 남자 이름
  mc: number     // 남자 출생자 수
  f: string      // 여자 이름
  fc: number     // 여자 출생자 수
}

// ByYearEntry[]
```

**예시** (`by-year/2024.json`):
```json
[
  { "rank": 1, "m": "Liam",     "mc": 22164, "f": "Olivia",    "fc": 14718 },
  { "rank": 2, "m": "Noah",     "mc": 20337, "f": "Emma",      "fc": 13485 },
  { "rank": 3, "m": "Oliver",   "mc": 15343, "f": "Amelia",    "fc": 12740 },
  { "rank": 4, "m": "Theodore", "mc": 12011, "f": "Charlotte", "fc": 12552 },
  { "rank": 5, "m": "James",    "mc": 11793, "f": "Mia",       "fc": 12113 }
]
```

**사용 예시:**
```ts
// 특정 연도 데이터 로드
import data2024 from '@/data/names/us/by-year/2024.json'

// 동적으로 로드 (연도가 변수일 때)
const res = await import(`@/data/names/us/by-year/${year}.json`)
const data: ByYearEntry[] = res.default
```

---

## by-name/[name].json

특정 이름의 1880~2024 전체 연도 데이터.
파일명은 **소문자**. year 기준 오름차순 정렬.

```ts
type ByNameEntry = {
  y: number   // 연도
  r: number   // 순위
  c: number   // 출생자 수
}

type ByNameFile = {
  name: string          // 이름 (소문자)
  male: ByNameEntry[]   // 남자로 사용된 연도별 데이터
  female: ByNameEntry[] // 여자로 사용된 연도별 데이터
}
```

**예시** (`by-name/james.json`):
```json
{
  "name": "james",
  "male": [
    { "y": 1880, "r": 3,  "c": 5927  },
    { "y": 1940, "r": 1,  "c": 62481 },
    { "y": 1950, "r": 1,  "c": 86223 },
    { "y": 2024, "r": 5,  "c": 11793 }
  ],
  "female": [
    { "y": 1950, "r": 44, "c": 1458  },
    { "y": 1975, "r": 38, "c": 2103  }
  ]
}
```

**참고:** `male`과 `female` 중 하나가 빈 배열일 수 있어요.
대부분의 이름은 한 성별로만 등장하고, 유니섹스 이름만 둘 다 데이터가 있어요.

**사용 예시:**
```ts
// [name]/page.tsx 에서
import { notFound } from 'next/navigation'

export default async function NamePage({ params }: { params: { name: string } }) {
  const name = params.name.toLowerCase()

  let data: ByNameFile
  try {
    data = (await import(`@/data/names/us/by-name/${name}.json`)).default
  } catch {
    notFound()  // 존재하지 않는 이름이면 404
  }

  const maleData = data.male    // 차트용
  const femaleData = data.female
}
```

---

## 데이터 활용 패턴

### 이름 희귀도 계산
```ts
// index.json의 lr(latest rank) 기준
const getRarity = (lr: number) => {
  if (lr <= 10)   return '매우 흔함 (TOP 10)'
  if (lr <= 50)   return '흔함 (TOP 50)'
  if (lr <= 100)  return '보통 (TOP 100)'
  if (lr <= 500)  return '드문 편'
  if (lr === 9999) return '매우 희귀 (2024년 미등장)'
  return '희귀'
}
```

### 세대 분류
```ts
// index.json의 py(peak year) 기준
const getGeneration = (py: number) => {
  if (py <= 1939) return '빈티지 (1930년대 이전)'
  if (py <= 1959) return '베이비붐 세대 (1940~50년대)'
  if (py <= 1979) return 'X세대 (1960~70년대)'
  if (py <= 1999) return '밀레니얼 (1980~90년대)'
  if (py <= 2009) return 'Z세대 (2000년대)'
  return 'α세대 (2010년대 이후)'
}
```

### 트렌드 방향 계산
```ts
// by-name의 최근 5년 데이터로 판단
const getTrend = (entries: ByNameEntry[]) => {
  const recent = entries.slice(-5)
  if (recent.length < 2) return '데이터 없음'
  const first = recent[0].r
  const last = recent[recent.length - 1].r
  if (last < first - 10)  return '상승 중 ↑'
  if (last > first + 10)  return '하락 중 ↓'
  return '안정적 →'
}
```

---

## 주의사항

- 파일명(by-name/)은 항상 **소문자** (예: `James` → `james.json`)
- `lr: 9999`는 2024년 TOP 순위권 밖이라는 의미 (이름 자체는 존재)
- CSV 원본이 변경되면 `npm run names:convert` 재실행 필요
- `by-name/`과 `by-year/` 파일은 동적 import 사용 권장 (정적 import 시 번들 크기 문제)