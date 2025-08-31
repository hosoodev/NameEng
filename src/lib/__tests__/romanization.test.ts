/**
 * 로마자 변환 엔진 테스트
 */

import { romanizeKoreanName, getSurnameVariants } from '../romanization';

describe('romanizeKoreanName', () => {
  describe('기본 변환 테스트', () => {
    test('일반적인 이름 변환', () => {
      const result = romanizeKoreanName('김민수');
      expect(result.romanized).toBe('Kim Minsu');
      expect(result.warnings).toHaveLength(0);
    });

    test('복성 처리', () => {
      const result = romanizeKoreanName('남궁민수');
      expect(result.romanized).toBe('Namgung Minsu');
    });

    test('단일 글자 이름', () => {
      const result = romanizeKoreanName('김수');
      expect(result.romanized).toBe('Kim Su');
    });
  });

  describe('옵션 테스트', () => {
    test('이름-성 순서', () => {
      const result = romanizeKoreanName('김민수', { order: 'given-family' });
      expect(result.romanized).toBe('Minsu Kim');
    });

    test('하이픈 사용 (이름 음절 구분)', () => {
      const result = romanizeKoreanName('김민수', { hyphen: true });
      expect(result.romanized).toBe('Kim Min-su');
    });

    test('소문자 변환', () => {
      const result = romanizeKoreanName('김민수', { caseStyle: 'lowercase' });
      expect(result.romanized).toBe('kim minsu');
    });

    test('대문자 변환', () => {
      const result = romanizeKoreanName('김민수', { caseStyle: 'uppercase' });
      expect(result.romanized).toBe('KIM MINSU');
    });
  });

  describe('관용 성씨 표기', () => {
    test('김씨 변형', () => {
      const variants = getSurnameVariants('김');
      expect(variants).toContain('Kim');
      expect(variants).toContain('Gim');
      expect(variants).toContain('Keem');
    });

    test('이씨 변형', () => {
      const variants = getSurnameVariants('이');
      expect(variants).toContain('Lee');
      expect(variants).toContain('Rhee');
      expect(variants).toContain('Yi');
    });

    test('성씨 변형 선택', () => {
      const result = romanizeKoreanName('김민수', { surnameVariant: 'Gim' });
      expect(result.romanized).toBe('Gim Minsu');
    });
  });

  describe('부정적 의미 필터링', () => {
    test('Gang 경고 (명시적 선택)', () => {
      const result = romanizeKoreanName('강민수', { surnameVariant: 'Gang' });
      expect(result.warnings).toHaveLength(1);
      expect(result.warnings[0].word).toBe('Gang');
      expect(result.warnings[0].meaning).toContain('폭력단');
      expect(result.warnings[0].suggestions).toContain('Kang');
    });

    test('기본 변환은 안전한 표기 사용', () => {
      const result = romanizeKoreanName('강민수');
      expect(result.romanized).toBe('Kang Minsu');
      expect(result.warnings).toHaveLength(0);
      expect(result.alternatives).toContain('Gang Minsu'); // 대안에는 포함
    });

    test('Gun 경고', () => {
      const result = romanizeKoreanName('군수');
      expect(result.warnings).toHaveLength(1);
      expect(result.warnings[0].word).toBe('Gun');
      expect(result.warnings[0].meaning).toContain('총');
    });
  });

  describe('대안 제공', () => {
    test('성씨 대안 생성', () => {
      const result = romanizeKoreanName('김민수');
      expect(result.alternatives.length).toBeGreaterThan(0);
      expect(result.alternatives).toContain('Gim Minsu');
    });

    test('관용 표기 없는 성씨', () => {
      const result = romanizeKoreanName('가민수'); // 가씨는 관용표기가 적음
      expect(result.alternatives.length).toBe(0);
    });
  });

  describe('에지 케이스', () => {
    test('빈 문자열', () => {
      const result = romanizeKoreanName('');
      expect(result.romanized).toBe('');
      expect(result.warnings).toHaveLength(0);
      expect(result.alternatives).toHaveLength(0);
    });

    test('공백만 있는 문자열', () => {
      const result = romanizeKoreanName('   ');
      expect(result.romanized).toBe('');
    });

    test('영문자 포함', () => {
      const result = romanizeKoreanName('김A민수');
      expect(result.romanized).toBe('Kim Aminsu');
    });

    test('숫자 포함', () => {
      const result = romanizeKoreanName('김1민수');
      expect(result.romanized).toBe('Kim 1minsu');
    });
  });
});

describe('getSurnameVariants', () => {
  test('존재하는 성씨', () => {
    const variants = getSurnameVariants('김');
    expect(Array.isArray(variants)).toBe(true);
    expect(variants.length).toBeGreaterThan(0);
  });

  test('존재하지 않는 성씨', () => {
    const variants = getSurnameVariants('없');
    expect(variants).toEqual([]);
  });
});
