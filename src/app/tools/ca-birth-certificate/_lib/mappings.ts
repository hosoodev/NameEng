// 캘리포니아 58개 카운티 통합 데이터 (ID, 영문명, 한글명)
export interface CountyInfo {
  id: number;
  en: string;
  ko: string;
}

export const CA_COUNTY_DATA: CountyInfo[] = [
  { id: 1, en: "Alameda", ko: "알라미다" },
  { id: 2, en: "Alpine", ko: "알파인" },
  { id: 3, en: "Amador", ko: "아마도르" },
  { id: 4, en: "Butte", ko: "뷰트" },
  { id: 5, en: "Calaveras", ko: "캘러베러스" },
  { id: 6, en: "Colusa", ko: "콜루사" },
  { id: 7, en: "Contra Costa", ko: "콘트라 코스타" },
  { id: 8, en: "Del Norte", ko: "델노르트" },
  { id: 9, en: "El Dorado", ko: "엘도라도" },
  { id: 10, en: "Fresno", ko: "프레즈노" },
  { id: 11, en: "Glenn", ko: "글렌" },
  { id: 12, en: "Humboldt", ko: "험볼트" },
  { id: 13, en: "Imperial", ko: "임페리얼" },
  { id: 14, en: "Inyo", ko: "인요" },
  { id: 15, en: "Kern", ko: "컨" },
  { id: 16, en: "Kings", ko: "킹스" },
  { id: 17, en: "Lake", ko: "레이크" },
  { id: 18, en: "Lassen", ko: "래슨" },
  { id: 19, en: "Los Angeles", ko: "로스앤젤레스" },
  { id: 20, en: "Madera", ko: "마데라" },
  { id: 21, en: "Marin", ko: "마린" },
  { id: 22, en: "Mariposa", ko: "마리포사" },
  { id: 23, en: "Mendocino", ko: "멘도시노" },
  { id: 24, en: "Merced", ko: "머세드" },
  { id: 25, en: "Modoc", ko: "모독" },
  { id: 26, en: "Mono", ko: "모노" },
  { id: 27, en: "Monterey", ko: "몬터레이" },
  { id: 28, en: "Napa", ko: "나파" },
  { id: 29, en: "Nevada", ko: "네바다" },
  { id: 30, en: "Orange", ko: "오렌지" },
  { id: 31, en: "Placer", ko: "플레이서" },
  { id: 32, en: "Plumas", ko: "플루머스" },
  { id: 33, en: "Riverside", ko: "리버사이드" },
  { id: 34, en: "Sacramento", ko: "새크라멘토" },
  { id: 35, en: "San Benito", ko: "산베니토" },
  { id: 36, en: "San Bernardino", ko: "샌버너디노" },
  { id: 37, en: "San Diego", ko: "샌디에이고" },
  { id: 38, en: "San Francisco", ko: "샌프란시스코" },
  { id: 39, en: "San Joaquin", ko: "샌호아킨" },
  { id: 40, en: "San Luis Obispo", ko: "산루이스오비스포" },
  { id: 41, en: "San Mateo", ko: "산마테오" },
  { id: 42, en: "Santa Barbara", ko: "산타바바라" },
  { id: 43, en: "Santa Clara", ko: "산타클라라" },
  { id: 44, en: "Santa Cruz", ko: "산타크루즈" },
  { id: 45, en: "Shasta", ko: "샤스타" },
  { id: 46, en: "Sierra", ko: "시에라" },
  { id: 47, en: "Siskiyou", ko: "시스키유" },
  { id: 48, en: "Solano", ko: "솔라노" },
  { id: 49, en: "Sonoma", ko: "소노마" },
  { id: 50, en: "Stanislaus", ko: "스타니슬라오" },
  { id: 51, en: "Sutter", ko: "서터" },
  { id: 52, en: "Tehama", ko: "테하마" },
  { id: 53, en: "Trinity", ko: "트리니티" },
  { id: 54, en: "Tulare", ko: "툴레어" },
  { id: 55, en: "Tuolumne", ko: "투올러미" },
  { id: 56, en: "Ventura", ko: "벤투라" },
  { id: 57, en: "Yolo", ko: "욜로" },
  { id: 58, en: "Yuba", ko: "유바" }
];

// 헬퍼 맵 (룩업 효율 최적화)
export const CA_COUNTY_BY_ID = CA_COUNTY_DATA.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<number, CountyInfo>);
export const CA_COUNTY_BY_NAME = CA_COUNTY_DATA.reduce((acc, c) => ({
  ...acc,
  [c.en.toLowerCase()]: c,
  [c.ko]: c
}), {} as Record<string, CountyInfo>);

// 국가 데이터 정의
export interface CountryInfo {
  code: string;
  en: string;
  ko: string;
  aliases?: string[];
}

export const COUNTRY_DATA: CountryInfo[] = [
  { code: "kr", en: "South Korea", ko: "대한민국", aliases: ["한국", "Korea"] },
  { code: "us", en: "United States", ko: "미국", aliases: ["USA"] },
  { code: "jp", en: "Japan", ko: "일본" },
  { code: "cn", en: "China", ko: "중국" },
  { code: "vn", en: "Vietnam", ko: "베트남" },
  { code: "tw", en: "Taiwan", ko: "대만" },
  { code: "th", en: "Thailand", ko: "태국" },
  { code: "ph", en: "Philippines", ko: "필리핀" },
  { code: "au", en: "Australia", ko: "호주" },
  { code: "nz", en: "New Zealand", ko: "뉴질랜드" },
  { code: "gb", en: "United Kingdom", ko: "영국", aliases: ["UK"] },
  { code: "de", en: "Germany", ko: "독일" },
  { code: "fr", en: "France", ko: "프랑스" },
  { code: "it", en: "Italy", ko: "이탈리아" },
  { code: "es", en: "Spain", ko: "스페인" },
  { code: "ca", en: "Canada", ko: "캐나다" },
  { code: "mx", en: "Mexico", ko: "멕시코" },
  { code: "br", en: "Brazil", ko: "브라질" },
  { code: "ru", en: "Russia", ko: "러시아" },
  { code: "in", en: "India", ko: "인도" }
];

// 국가 코드 매핑 사전 (COUNTRY_DATA에서 동적 생성)
export const COUNTRY_TO_CODE: Record<string, string> = COUNTRY_DATA.reduce((acc, c) => {
  acc[c.en.toLowerCase()] = c.code;
  acc[c.ko] = c.code;
  acc[c.code] = c.code;
  if (c.aliases) {
    c.aliases.forEach(alias => {
      acc[alias.toLowerCase()] = c.code;
    });
  }
  return acc;
}, {} as Record<string, string>);

export const CODE_TO_COUNTRY: Record<string, string> = COUNTRY_DATA.reduce((acc, c) => ({
  ...acc,
  [c.code]: c.ko
}), {} as Record<string, string>);

// 국가 검색 도우미
export const COUNTRY_BY_NAME = COUNTRY_DATA.reduce((acc, c) => {
  acc[c.en.toLowerCase()] = c;
  acc[c.ko] = c;
  if (c.aliases) {
    c.aliases.forEach(alias => {
      acc[alias.toLowerCase()] = c;
    });
  }
  return acc;
}, {} as Record<string, CountryInfo>);
