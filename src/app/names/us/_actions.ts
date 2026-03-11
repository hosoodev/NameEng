'use server';

import indexData from '@/data/names/us/index.json';

export type IndexEntry = {
  n: string;
  g: 'M' | 'F' | 'U';
  lr: number;
  py: number;
  pr: number;
  my: number;
};

/**
 * 영어 이름 자동완성을 위한 검색 액션
 * @param query 검색어 (예: 'oli')
 * @returns 검색어로 시작하는 상위 10개 이름 리스트
 */
export async function getAutocompleteNames(query: string): Promise<string[]> {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery || cleanQuery.length < 1) return [];

  const index = indexData as IndexEntry[];
  
  // 1. 검색어로 시작하는 이름들 필터링
  // 2. 2024년 랭킹(lr)이 높은 순서(인기 있는 순서)로 정렬
  // 3. 상위 10개만 반환
  const matches = index
    .filter(e => e.n.startsWith(cleanQuery))
    .sort((a, b) => a.lr - b.lr)
    .slice(0, 10)
    .map(e => e.n);

  return matches;
}
