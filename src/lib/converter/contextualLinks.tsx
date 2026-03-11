import React from 'react';
import { FileText, AlertTriangle, BookOpen } from 'lucide-react';
import type { Warning } from '@/lib/romanization';

export function getContextualLinks(
  inputName: string,
  warnings: Warning[],
  familyNameOptions: { hasCompoundOption: boolean },
) {
  const links: { href: string; label: string; icon: React.ReactNode }[] = [];

  // 여권 가이드 (항상 최우선)
  links.push({ href: '/passport-guide', label: '여권 발급 시 영문명 작성법', icon: <FileText className="text-blue-500" size={18} /> });

  // 부정적 의미 경고가 있는 경우
  if (warnings.length > 0) {
    links.push({ href: '/blog/negative-meaning-words', label: '부적절한 의미 피하는 법', icon: <AlertTriangle className="text-amber-500" size={18} /> });
  }

  // 복성인 경우
  if (familyNameOptions.hasCompoundOption) {
    links.push({ href: '/blog/korean-surname-history', label: '한국 성씨 영문 표기 역사', icon: <BookOpen className="text-emerald-500" size={18} /> });
  } else {
    links.push({ href: '/romanization-guide', label: '로마자 표기법 완전 정복', icon: <BookOpen className="text-emerald-500" size={18} /> });
  }

  return links.slice(0, 3);
}
