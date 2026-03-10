import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import { Wrench, Search, BarChart2 } from 'lucide-react';

const toolsSidebarLinks = [
  {
    href: '/tools/name-checker',
    icon: <Search className="text-blue-500" size={20} />,
    title: '영문명 적합성 검사',
    desc: '내 영문명이 해외에서 안전한지 확인',
  },
  {
    href: '/tools/name-generator',
    icon: <Wrench className="text-emerald-500" size={20} />,
    title: '영문명 생성기',
    desc: '한글 이름으로 최적의 영문명 생성',
  },
  {
    href: '/tools/surname-frequency',
    icon: <BarChart2 className="text-purple-500" size={20} />,
    title: '성씨 빈도 분석',
    desc: '한국 성씨의 영문 표기 빈도 분석',
  },
];

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <TwoColumnLayout sidebarLinks={toolsSidebarLinks}>
      {children}
    </TwoColumnLayout>
  );
}
