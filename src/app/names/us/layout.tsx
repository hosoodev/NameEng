import { Metadata } from 'next';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import { LineChart, ListOrdered, BarChart2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '미국 이름 데이터베이스 - Layout | NameEng',
  description: '미국 이름 데이터베이스 통합 레이아웃',
};

// 사이드바 링크
const US_NAMES_SIDEBAR_LINKS = [
  {
    href: '/names/us',
    icon: <ListOrdered className="text-blue-500" size={20} />,
    title: '미국 이름 홈',
    desc: '전체 데이터 요약 및 검색',
  },
  {
    href: '/names/us/popular',
    icon: <BarChart2 className="text-emerald-500" size={20} />,
    title: '연도별 순위 (TOP 50)',
    desc: '1880~2024년 인기 이름',
  },
  {
    href: '/names/us/trends',
    icon: <LineChart className="text-indigo-500" size={20} />,
    title: '이름 트렌드 탐색기',
    desc: '다중 이름 인기도 비교 분석',
  },
  {
    href: '/names/us/rarity',
    icon: <CheckCircle2 className="text-purple-500" size={20} />,
    title: '이름 희귀도 체크',
    desc: '내 영문명의 희소성 확인',
  },
];

export default function UsNamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TwoColumnLayout 
      sidebarLinks={US_NAMES_SIDEBAR_LINKS}
      extraContent={
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 px-4 md:px-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-blue-400" />
            Official Data Source
          </div>
          <p className="text-[11px] leading-relaxed text-gray-400">
            Social Security Administration (SSA)<br/>
            1880 - 2024 Cumulative Data<br/>
            Analyze over 100M+ birth records.
          </p>
        </div>
      }
    >
      {children}
    </TwoColumnLayout>
  );
}
