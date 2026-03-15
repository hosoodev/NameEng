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

// 기존 코드와의 호환성을 위한 shim
export const CA_COUNTY_MAP = CA_COUNTY_DATA.reduce((acc, c) => ({ ...acc, [c.id]: c.en }), {} as Record<number, string>);
export const CA_COUNTIES = CA_COUNTY_DATA.map(c => c.en);
export const countyTranslations = CA_COUNTY_DATA.reduce((acc, c) => ({ ...acc, [c.en.toLowerCase()]: c.ko }), {} as Record<string, string>);

// 국가 코드 매핑 사전
export const COUNTRY_TO_CODE: Record<string, string> = {
  "대한민국": "kr", "한국": "kr", "South Korea": "kr", "Korea": "kr", "kr": "kr",
  "미국": "us", "USA": "us", "United States": "us", "us": "us",
  "멕시코": "mx", "Mexico": "mx", "mx": "mx",
  "캐나다": "ca", "Canada": "ca", "ca": "ca"
};

export const CODE_TO_COUNTRY: Record<string, string> = {
  "kr": "대한민국", "us": "미국", "mx": "멕시코", "ca": "캐나다"
};
