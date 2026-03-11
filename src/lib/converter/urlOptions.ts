import type { RomanizationOptions } from '@/lib/romanization';

export function encodeOptions(o: RomanizationOptions): string {
  const caseMap = { capitalized: 'c', lowercase: 'l', uppercase: 'u' };
  return [
    o.order === 'given-family' ? '1' : '0',
    o.hyphen ? '1' : '0',
    caseMap[o.caseStyle || 'capitalized'],
    o.familyNameType ? (o.familyNameType === 'compound' ? 'c' : 's') : '-',
  ].join('');
}

export function decodeOptions(s: string): Partial<RomanizationOptions> {
  if (s.length < 4) return {};
  const caseMap: Record<string, 'capitalized' | 'lowercase' | 'uppercase'> = {
    c: 'capitalized', l: 'lowercase', u: 'uppercase',
  };
  return {
    order: s[0] === '1' ? 'given-family' : 'family-given',
    hyphen: s[1] === '1',
    caseStyle: caseMap[s[2]] || 'capitalized',
    ...(s[3] !== '-' && { familyNameType: s[3] === 'c' ? 'compound' : 'single' }),
  };
}
