import { Metadata } from 'next';
import TrendsClient from './_components/TrendsClient';
import { LineChart, Info } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '영어 이름 트렌드 탐색 및 인기도 비교 분석 - 시대별 이름 변화 | NameEng',
  description: '최대 5개의 영어 이름을 동시에 비교하여 145년 동안의 인기도 변화를 한눈에 볼 수 있는 트렌드 차트입니다. 내가 선택한 영어 이름이 어느 시대에 가장 유행했는지, 서로 어떤 변화 양상을 보이는지 상세한 데이터 시각화를 통해 시각적으로 분석해보세요.',
};

export default function TrendsPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-5xl mx-auto pt-4">
      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <LineChart className="text-blue-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">이름 트렌드 탐색기</span>
        </h1>
        <p className="text-gray-600 text-lg">
          영어 이름의 시대별 유행 흐름을 한눈에 확인할 수 있습니다.<br className="hidden md:block"/> 최대 5개의 이름을 입력하여 차트로 비교해보세요.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-indigo-500 shrink-0 mt-0.5" size={20} />
        <p className="text-indigo-800 text-sm leading-relaxed">
          <strong>활용 팁:</strong> 궁금한 영어 이름이나 친구들의 이름을 추가해보고, 누가 가장 먼저 인기있는 이름이었는지 확인해보세요. 하단의 <strong>추천 비교 조합</strong>을 클릭하면 대표적인 시대별 이름들의 대결을 볼 수 있어요!
        </p>
      </div>

      {/* Client Component for Interactive Chart */}
      <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center bg-gray-50 rounded-3xl animate-pulse">로딩 중...</div>}>
        <TrendsClient />
      </Suspense>
    </div>
  );
}
