import React from 'react';
import { FileText, Globe, Briefcase, BookOpen, Search, Ruler, Award } from 'lucide-react';
import type { RomanizationOptions } from '@/lib/romanization';

// 광고 슬롯 ID
export const AD_SLOT_INDEX_CONTENT = '2738626516';
export const AD_SLOT_RESULT = '2738626516';
export const AD_SLOT_CONTENT = '2738626516';
export const AD_SLOT_SIDEBAR = '2738626516';

// 기본 옵션
export const DEFAULT_OPTIONS: RomanizationOptions = {
  order: 'family-given',
  hyphen: false,
  caseStyle: 'capitalized',
  surnameVariant: undefined,
  familyNameType: undefined,
};

// 정적 링크 데이터 (guideLinks, toolLinks)
export const guideLinks = [
  {
    href: '/blog/passport-name-guide',
    icon: <FileText className="text-blue-500" size={20} />,
    title: '여권 발급 시 영문명 작성법',
    desc: '여권 신청 시 주의사항과 실제 사례',
  },
  {
    href: '/blog/overseas-name-tips',
    icon: <Globe className="text-emerald-500" size={20} />,
    title: '해외 거주 시 영문명 사용 팁',
    desc: '문화적 차이를 고려한 실용적인 조언',
  },
  {
    href: '/blog/business-name-etiquette',
    icon: <Briefcase className="text-slate-500" size={20} />,
    title: '국제 비즈니스 영문명 에티켓',
    desc: '전문적인 영문명 사용법과 명함 작성 가이드',
  },
  {
    href: '/blog/korean-surname-history',
    icon: <BookOpen className="text-indigo-500" size={20} />,
    title: '한국 성씨의 영문 표기 역사',
    desc: '조선시대부터 현재까지의 변천사',
  },
];

export const toolLinks = [
  {
    href: '/names/us/popular',
    icon: <Award className="text-amber-500" size={20} />,
    title: '미국 영어 이름 순위 차트',
    desc: '2024년 글로벌 인기 이름 TOP 50',
  },
  {
    href: '/tools/name-checker',
    icon: <Search className="text-blue-500" size={20} />,
    title: '영문명 적합성 검사기',
    desc: '기존 영문명의 적합성을 종합적으로 분석',
  },
  {
    href: '/romanization-guide',
    icon: <Ruler className="text-amber-500" size={20} />,
    title: '로마자 표기법 가이드',
    desc: '국어의 로마자 표기법 2024년 기준 정리',
  },
];
