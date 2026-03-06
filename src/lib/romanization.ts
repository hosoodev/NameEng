/**
 * 국어의 로마자 표기법 (2024.05.23 시행) 기반 한글 → 로마자 변환 엔진
 */

import romanizationData from '@/data/romanization.json';
import surnameStatData from '@/data/korean_surnames_romanization.json';

// 한글 자음/모음 매핑 테이블 (국어의 로마자 표기법 기준)
const INITIAL_CONSONANTS = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
  'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
  'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
};

const VOWELS = {
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
  'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
  'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
  'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
  'ㅣ': 'i'
};

const FINAL_CONSONANTS = {
  '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n', 'ㄵ': 'n',
  'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k', 'ㄻ': 'm', 'ㄼ': 'l',
  'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p', 'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p',
  'ㅄ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
};

// 한글 유니코드 범위: AC00-D7AF
const HANGUL_BASE = 0xAC00;
const HANGUL_END = 0xD7AF;
const VOWEL_COUNT = 21;
const FINAL_COUNT = 28;

// 복성 (2글자 성씨) 목록을 통계 데이터와 기존 쓰레기 데이터 양쪽에서 추출
const COMPOUND_SURNAMES = Array.from(new Set([
  ...Object.keys(surnameStatData),
  ...Object.keys(romanizationData.surnames)
])).filter(surname => surname.length === 2);

export interface RomanizationOptions {
  order?: 'family-given' | 'given-family';
  hyphen?: boolean;
  caseStyle?: 'capitalized' | 'lowercase' | 'uppercase';
  surnameVariant?: string; // 관용 성씨 표기 선택
  familyNameType?: 'compound' | 'single'; // 복성/단성 선택
}

export interface RomanizationResult {
  romanized: string;
  warnings: Warning[];
  alternatives: string[];
}

export interface Warning {
  type: 'negative-meaning' | 'pronunciation-confusion';
  word: string;
  meaning: string;
  suggestions: string[];
}

export interface SurnameStatistic {
  romanization: string;
  percentage: number;
  count: number | null; // 일부 소스는 count 데이터가 없을 수 있음
  isStandard: boolean;
}

/**
 * 한글 문자를 자음/모음으로 분해
 */
function decomposeHangul(char: string): [string, string, string] {
  const code = char.charCodeAt(0);

  if (code < HANGUL_BASE || code > HANGUL_END) {
    return ['', '', ''];
  }

  const syllableIndex = code - HANGUL_BASE;
  const initialIndex = Math.floor(syllableIndex / (VOWEL_COUNT * FINAL_COUNT));
  const vowelIndex = Math.floor((syllableIndex % (VOWEL_COUNT * FINAL_COUNT)) / FINAL_COUNT);
  const finalIndex = syllableIndex % FINAL_COUNT;

  const initialConsonants = Object.keys(INITIAL_CONSONANTS);
  const vowels = Object.keys(VOWELS);
  const finalConsonants = ['', ...Object.keys(FINAL_CONSONANTS).slice(1)];

  return [
    initialConsonants[initialIndex],
    vowels[vowelIndex],
    finalConsonants[finalIndex]
  ];
}

/**
 * 단일 한글 음절을 로마자로 변환
 */
function romanizeSyllable(char: string): string {
  const [initial, vowel, final] = decomposeHangul(char);

  if (!initial && !vowel) {
    return char; // 한글이 아닌 문자는 그대로 반환
  }

  const initialRoman = INITIAL_CONSONANTS[initial as keyof typeof INITIAL_CONSONANTS] || '';
  const vowelRoman = VOWELS[vowel as keyof typeof VOWELS] || '';
  const finalRoman = FINAL_CONSONANTS[final as keyof typeof FINAL_CONSONANTS] || '';

  return initialRoman + vowelRoman + finalRoman;
}

/**
 * 한글 문자열을 로마자로 변환 (기본 규칙 적용)
 */
function standardRomanize(hangul: string): string {
  return hangul
    .split('')
    .map(char => romanizeSyllable(char))
    .join('');
}

/**
 * 성씨 분리 (사용자 선택에 따라 복성/단성 결정)
 */
function separateFamilyName(name: string, familyNameType?: 'compound' | 'single'): [string, string] {

  // 사용자가 단성을 명시적으로 선택한 경우
  if (familyNameType === 'single') {
    return [name[0], name.slice(1)];
  }

  // 사용자가 복성을 명시적으로 선택했거나, 자동 감지 모드인 경우
  for (const surname of COMPOUND_SURNAMES) {
    if (name.startsWith(surname)) {
      // 복성을 명시적으로 선택했거나, 자동 감지에서 복성이 발견된 경우
      if (familyNameType === 'compound' || !familyNameType) {
        return [surname, name.slice(2)];
      }
    }
  }

  // 복성이 없거나 단성 선택 시 첫 글자가 성씨
  return [name[0], name.slice(1)];
}

/**
 * 이름을 음절별로 분리하여 하이픈으로 연결
 */
function applyGivenNameHyphen(givenName: string): string {
  // 한글 이름을 음절별로 분리
  const syllables = givenName.split('');
  const romanizedSyllables = syllables.map(syllable => standardRomanize(syllable));

  // 외자(1글자)인 경우 하이픈 없이 로마자만 반환
  if (syllables.length <= 1) {
    return romanizedSyllables[0] || '';
  }

  // 음절 사이에 하이픈 추가
  return romanizedSyllables.join('-');
}

/**
 * 부정적 의미 단어 체크
 */
function checkNegativeWords(romanized: string): Warning[] {
  const warnings: Warning[] = [];
  const negativeWords = romanizationData.negative_words as Record<string, Record<string, string | string[]>>;
  const addedWords = new Set<string>(); // 중복 방지

  for (const [, meanings] of Object.entries(negativeWords)) {
    for (const [word, meaning] of Object.entries(meanings)) {
      if (word === 'suggestions') continue;

      // 정확한 단어 매칭 (단어 경계 고려)
      const wordRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (wordRegex.test(romanized) && !addedWords.has(word.toLowerCase())) {
        warnings.push({
          type: 'negative-meaning',
          word,
          meaning: meaning as string,
          suggestions: meanings.suggestions as string[] || []
        });
        addedWords.add(word.toLowerCase());
      }
    }
  }

  return warnings;
}

/**
 * 대소문자 스타일 적용
 */
function formatCase(text: string, caseStyle: string): string {
  switch (caseStyle) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalized':
    default:
      return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
  }
}

/**
 * 메인 로마자 변환 함수
 */
export function romanizeKoreanName(
  hangulName: string,
  options: RomanizationOptions = {}
): RomanizationResult {
  const {
    order = 'family-given',
    hyphen = false,
    caseStyle = 'capitalized',
    surnameVariant,
    familyNameType
  } = options;

  if (!hangulName.trim()) {
    return {
      romanized: '',
      warnings: [],
      alternatives: []
    };
  }

  // 성-이름 분리
  const [family, given] = separateFamilyName(hangulName.trim(), familyNameType);

  // 기본 로마자 변환
  let familyRomanized = standardRomanize(family);
  let givenRomanized = standardRomanize(given);

  // 관용 성씨 표기 적용
  const surnameOptions = getSurnameVariants(family);

  if (surnameOptions && surnameOptions.length > 0) {
    const uppercaseVariant = surnameVariant?.toUpperCase();
    const matchedOption = surnameOptions.find((opt: string) => opt.toUpperCase() === uppercaseVariant);
    if (matchedOption) {
      familyRomanized = matchedOption;
    } else {
      familyRomanized = surnameOptions[0]; // 기본값은 첫 번째 옵션
    }
  }

  // 하이픈 적용 (이름 음절 사이에)
  if (hyphen) {
    givenRomanized = applyGivenNameHyphen(given);
  }

  // 순서 적용 (대소문자 스타일 먼저 적용)
  const familyFormatted = formatCase(familyRomanized, caseStyle);
  const givenFormatted = formatCase(givenRomanized, caseStyle);

  const result = order === 'family-given'
    ? `${familyFormatted} ${givenFormatted}`
    : `${givenFormatted} ${familyFormatted}`;

  // 부정적 의미 체크
  const warnings = checkNegativeWords(result);

  // 대안 생성 (성씨 관용 표기들)
  const alternatives: string[] = [];
  if (surnameOptions && surnameOptions.length > 1) {
    for (const variant of surnameOptions) {
      if (variant !== familyRomanized) {
        const variantFormatted = formatCase(variant, caseStyle);
        const altResult = order === 'family-given'
          ? `${variantFormatted} ${givenFormatted}`
          : `${givenFormatted} ${variantFormatted}`;

        alternatives.push(altResult);
      }
    }
  }

  return {
    romanized: result,
    warnings,
    alternatives
  };
}

/**
 * 성씨별 관용 표기 옵션 반환
 */
export function getSurnameVariants(familyName: string): string[] {
  const data = (surnameStatData as any)[familyName];
  const statVariants = data ? data.combined_ranking : [];

  if (statVariants && statVariants.length > 0) {
    return statVariants;
  }

  // Fallback to legacy romanizationData if stats are missing
  const legacyData = (romanizationData.surnames as any)[familyName];
  if (legacyData && legacyData.length > 0) {
    return legacyData.map((v: string) => v.toUpperCase());
  }

  return [];
}

/**
 * 성씨별 통계 데이터 반환
 * - 소스 우선순위: 2011_snu > 1999_passport > 2011_internet > 2011_passport
 * - count/percentage가 null인 소스는 건너뛰고 실제 데이터가 있는 소스 사용
 */
export function getSurnameStatistics(familyName: string): SurnameStatistic[] {
  const data = (surnameStatData as any)[familyName];
  if (!data || !data.sources) {
    return [];
  }

  const standardRoman = standardRomanize(familyName).toUpperCase();

  // 통계 품질 우선순위: 데이터가 풍부한 소스 먼저 시도
  const SOURCE_PRIORITY = ['2011_passport', '2011_snu', '2011_internet', '1999_passport'];

  // 실제 데이터(count가 null이 아닌)가 있는 소스 선택
  let bestSource: any[] | null = null;
  for (const sourceKey of SOURCE_PRIORITY) {
    const source = data.sources[sourceKey];
    if (!source || source.length === 0) continue;

    // 소스 내 하나라도 count가 null이 아니면 유효한 소스로 판단
    const hasRealData = source.some((item: any) => item.count !== null);
    if (hasRealData) {
      bestSource = source;
      break;
    }
  }

  if (!bestSource) {
    // 모든 소스가 null이면: combined_ranking만이라도 활용 (0% 표시)
    const combined: string[] = data.combined_ranking || [];
    return combined.map((romanization: string) => ({
      romanization,
      percentage: 0,
      count: null,
      isStandard: romanization === standardRoman
    }));
  }

  // 전체 카운트를 구해서 백분율이 없는 경우를 대비
  const totalCount = bestSource.reduce((sum: number, item: any) => sum + (item.count ?? 0), 0);

  return bestSource.map((item: any) => {
    // 백분율이 있으면 사용하고, 없으면 count 기반으로 계산
    const percentage = item.percentage !== null
      ? item.percentage
      : (totalCount > 0 ? Number(((item.count / totalCount) * 100).toFixed(2)) : 0);

    return {
      romanization: item.romanization,
      percentage,
      count: item.count,
      isStandard: item.romanization === standardRoman
    };
  }).sort((a: SurnameStatistic, b: SurnameStatistic) => b.percentage - a.percentage); // percentage 기준 내림차순 정렬
}


/**
 * 이름에서 복성 가능성을 체크하고 선택지를 반환
 */
export function getFamilyNameOptions(name: string): {
  hasCompoundOption: boolean;
  compoundFamily: string;
  singleFamily: string;
} {
  for (const surname of COMPOUND_SURNAMES) {
    if (name.startsWith(surname)) {
      return {
        hasCompoundOption: true,
        compoundFamily: surname,
        singleFamily: name[0]
      };
    }
  }

  return {
    hasCompoundOption: false,
    compoundFamily: '',
    singleFamily: name[0]
  };
}
