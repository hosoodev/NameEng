import Link from 'next/link';
import { Metadata } from 'next';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import { Map, Flag, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '영어 이름 국가별 인기 순위 및 트렌드 데이터 분석 센터 - 예쁜 영어 이름 추천 | NameEng',
  description: '영어 이름 국가별 인기 순위와 시대별 트렌드를 한눈에 확인하세요. 미국, 영국 등 전 세계 성명 통계 데이터를 기반으로 한 가장 정확한 영어 이름 추천 및 인기 랭킹 서비스를 제공합니다. 내 아이를 위한 최고의 글로벌 이름을 지금 바로 찾아보세요.',
};

export default function NamesHubPage() {
  return (
    <TwoColumnLayout>
      <div className="max-w-4xl mx-auto space-y-12 pb-12">
        <header className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            세계 이름 데이터베이스
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            국가별 이름의 최신 인기 순위, 세대별 트렌드, 희귀도를 탐색해보세요.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* US Section Card */}
          <Link
            href="/names/us"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Map size={120} className="text-blue-600" strokeWidth={1} />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                <Flag size={14} /> 미국 (US)
              </span>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                미국 이름 데이터베이스
              </h2>
              <p className="text-gray-600 leading-relaxed">
                1880년부터 2024년까지 145년간 누적된 7,387개 영어 이름의 연도별 랭킹과 트렌드를 분석합니다.
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center gap-4 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1.5"><Clock size={16} /> 1880-2024</span>
              <span>·</span>
              <span>7,300+ Names</span>
            </div>
          </Link>

          {/* Future Sections */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 p-8 border border-gray-200 border-dashed relative">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Map size={120} className="text-gray-600" strokeWidth={1} />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                준비 중
              </span>
              <h2 className="text-2xl font-bold text-gray-400">
                영국 이름 데이터베이스
              </h2>
              <p className="text-gray-500">
                영국(UK)의 시대별 이름 트렌드와 지역별 선호도 데이터를 준비하고 있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </TwoColumnLayout>
  );
}
