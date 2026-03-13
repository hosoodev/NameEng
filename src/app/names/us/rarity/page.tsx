import { Metadata } from 'next';
import RarityClient from './_components/RarityClient';
import { ShieldCheck, Info, Zap } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '희귀한 영어 이름 찾기 및 내 이름 유니크 점수 측정 - 영어 이름 희귀도 분석 | NameEng',
  description: '희귀한 영어 이름을 찾고 있거나 내 영어 이름이 미국에서 얼마나 유니크한지 알고 싶다면 지금 바로 측정해 보세요. 145년 누적 데이터를 바탕으로 내 이름의 희소성 레벨, 상위 퍼센트, 그리고 흔하지 않은 나만의 특별한 이름을 제안해 드립니다.',
};

export default function RarityPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-5xl mx-auto pt-4">
      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <Zap className="text-amber-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">영어 이름 희귀도 분석</span>
        </h1>
        <p className="text-gray-600 text-lg">
          내 영어 이름은 얼마나 흔할까요? 미국 사회보장국(SSA)의 방대한 데이터를 바탕으로<br className="hidden md:block"/> 이름의 희소성과 시대별 트렌드를 분석해 드립니다.
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-purple-500 shrink-0 mt-0.5" size={20} />
        <p className="text-purple-800 text-sm leading-relaxed">
          <strong>활용 팁:</strong> 궁금한 영어 이름을 입력하면 1880년부터 현재까지의 데이터를 분석합니다. 분석 결과에서는 해당 이름이 미국에서 **상위 몇 %**인지, 그리고 **어떤 세대**에서 가장 인기가 많았는지 확인할 수 있습니다.
        </p>
      </div>

      {/* Client Component for Interactive Analysis */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center bg-gray-50 rounded-3xl animate-pulse text-gray-400">분석기 준비 중...</div>}>
        <RarityClient />
      </Suspense>

      {/* Footer Info / Data Source */}
      <div className="pt-8 border-t border-gray-100 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 justify-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <ShieldCheck size={14} /> Data Source: Social Security Administration (SSA)
        </div>
        <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed">
          본 도구는 미국 사회보장국의 공식 통계 데이터를 바탕으로 작동하며,<br className="hidden sm:inline"/> 1880년부터 2024년까지의 모든 누적 출생 기록을 반영합니다.
        </p>
      </div>
    </div>
  );
}
