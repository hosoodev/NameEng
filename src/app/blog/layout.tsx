import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import { FileText, Globe, BookOpen } from 'lucide-react';

const blogSidebarLinks = [
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
    href: '/blog/romanization-rules-explained',
    icon: <BookOpen className="text-purple-500" size={20} />,
    title: '로마자 표기법 완벽 가이드',
    desc: '국립국어원 기준 표기법 상세 설명',
  },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <TwoColumnLayout sidebarLinks={blogSidebarLinks}>
      {children}
    </TwoColumnLayout>
  );
}
