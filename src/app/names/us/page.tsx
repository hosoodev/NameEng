import { Metadata } from 'next';
import Link from 'next/link';
import NameSearchForm from './_components/NameSearchForm';
import { Database, TrendingUp, Users, Calendar, Award, Zap, ArrowRight } from 'lucide-react';

// Data is loaded at build time since this is a server component
import indexData from '@/data/names/us/index.json';

export const metadata: Metadata = {
  title: '미국 영어 이름 추천 및 인기 순위 분석 - 145년 누적 통계 기반 | NameEng',
  description: '미국 사회보장국(SSA)에서 발표한 1880년부터 2024년까지의 실제 출생 데이터 1억 건 이상을 분석합니다. 미국 현지에서 가장 많이 쓰이는 남자/여자 이름 순위, 연도별 트렌드 변화, 그리고 희귀한 영어 이름까지 완벽하게 찾아볼 수 있는 필수 가이드입니다.',
  keywords: '미국 이름 순위, 영어 이름 추천, 미국 인기 이름, 영문명 통계, 영어 이름 뜻, 희귀한 영어 이름',
};

// Define the type loosely based on usage since it's from JSON
type IndexEntry = {
  n: string;
  g: 'M' | 'F' | 'U';
  lr: number;
  py: number;
  pr: number;
  my: number;
};

export default function UsNamesHubPage() {
  const typedIndex = indexData as IndexEntry[];
  
  // Get 2024 Top 5 for each gender
  const top5Male = typedIndex.filter(e => e.g === 'M' && e.lr <= 5).sort((a, b) => a.lr - b.lr);
  const top5Female = typedIndex.filter(e => e.g === 'F' && e.lr <= 5).sort((a, b) => a.lr - b.lr);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          미국 이름 데이터베이스 <span className="text-blue-600 block sm:inline">(1880~2024)</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          미국 사회보장국(SSA)의 <strong>145년 공식 누적 데이터</strong>를 바탕으로 이름의 트렌드, 인기 순위, 희귀도를 시각적으로 분석해 드립니다.
        </p>
        
        <div className="flex justify-center pt-4">
          <NameSearchForm />
        </div>
      </section>

      {/* Data Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <Calendar size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">145년</h3>
          <p className="text-gray-500 font-medium">축적된 시대별 데이터</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-2">
            <Database size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">7,387개</h3>
          <p className="text-gray-500 font-medium">분석된 영어 이름 수</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-2">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">2024년</h3>
          <p className="text-gray-500 font-medium">가장 최신 트렌드 반영</p>
        </div>
      </section>

      {/* Top 5 Preview Section */}
      <section className="bg-gray-50 -mx-4 px-4 py-12 md:rounded-3xl border border-gray-100">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">2024년 최신 인기 이름 TOP 5</h2>
          <p className="text-gray-500">현재 가장 사랑받는 아기 이름들을 확인해보세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Male Top 5 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <h3 className="text-lg font-bold text-gray-900">남자 이름</h3>
            </div>
            <ul className="space-y-3">
              {top5Male.map((entry) => (
                <li key={entry.n}>
                  <Link href={`/names/us/${entry.n}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-400 w-6 text-center">{entry.lr}</span>
                      <span className="text-lg font-medium text-gray-900 capitalize group-hover:text-blue-600 transition-colors">{entry.n}</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Female Top 5 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <h3 className="text-lg font-bold text-gray-900">여자 이름</h3>
            </div>
            <ul className="space-y-3">
              {top5Female.map((entry) => (
                <li key={entry.n}>
                  <Link href={`/names/us/${entry.n}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-400 w-6 text-center">{entry.lr}</span>
                      <span className="text-lg font-medium text-gray-900 capitalize group-hover:text-rose-600 transition-colors">{entry.n}</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-rose-500 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/names/us/popular" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 hover:underline">
            TOP 50 전체 순위 보기 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Explore Tools Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">더 많은 탐색 도구</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/names/us/popular" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">연도별 인기 이름</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              1880년부터 2024년까지 원하는 시작 연도의 시대별 최고의 이름들을 순위표로 확인해보세요.
            </p>
          </Link>

          <Link href="/names/us/trends" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">이름 트렌드 탐색기</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              최대 5개의 이름을 동시에 시계열 차트로 비교하고 시대별 유행의 변화를 분석해보세요.
            </p>
          </Link>

          <Link href="/names/us/rarity" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">이름 희귀도 체크</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              나의 영문 이름은 미국에서 얼마나 흔할까요? 하위 몇 %에 해당하는 특별한 이름인지 확인해보세요.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
