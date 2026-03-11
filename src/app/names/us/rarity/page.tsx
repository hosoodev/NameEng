import { Metadata } from 'next';
import RarityClient from './_components/RarityClient';
import { ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '영어 이름 희귀도 분석 - NameEng',
  description: '내 영어 이름이 미국에서 얼마나 흔한지 확인해보세요. 145년 누적 데이터를 바탕으로 희귀도와 인기 세대를 분석합니다.',
};

export default function RarityPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-4xl mx-auto pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          영어 이름 희귀도 분석
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          내 영어 이름은 얼마나 흔할까요? 1880년부터 누적된 미국 출생 데이터를 바탕으로 이름의 희소성을 분석합니다.
        </p>
      </div>

      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
        <RarityClient />
      </Suspense>

      <div className="pt-16 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 justify-center text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
          <ShieldCheck size={16} /> 데이터 출처
        </div>
        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
          미국 사회보장국(SSA) 구체적 출생 데이터(1880~2024년) 기준 1억 명 이상의 데이터를 사용합니다.
        </p>
      </div>
    </div>
  );
}
