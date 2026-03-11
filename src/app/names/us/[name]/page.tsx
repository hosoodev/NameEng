import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import NameTrendChart from './_components/NameTrendChart';
import indexData from '@/data/names/us/index.json';
import { ArrowLeft, Award, Calendar, Hash, Zap, ArrowRight, ArrowRightCircle, TrendingUp } from 'lucide-react';
import fs from 'fs/promises';
import path from 'path';

type IndexEntry = {
  n: string;
  g: 'M' | 'F' | 'U';
  lr: number;
  py: number;
  pr: number;
  my: number;
};

type ByNameEntry = {
  y: number;
  r: number;
  c: number;
};

type ByNameFile = {
  name: string;
  male: ByNameEntry[];
  female: ByNameEntry[];
};

export async function generateStaticParams() {
  const index = indexData as IndexEntry[];
  return index.map(e => ({ name: e.n }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${cap} 이름 뜻과 인기 순위 - 미국 영어 이름 통계 | NameEng`,
    description: `${cap}는 미국에서 몇 위 이름일까요? 1880~2024 연도별 순위 변화와 세대별 트렌드를 확인하세요.`,
  };
}

const getGeneration = (py: number) => {
  if (py <= 1939) return '빈티지 (1930년대 이전)';
  if (py <= 1959) return '베이비붐 세대 (1940~50년대)';
  if (py <= 1979) return 'X세대 (1960~70년대)';
  if (py <= 1999) return '밀레니얼 (1980~90년대)';
  if (py <= 2009) return 'Z세대 (2000년대)';
  return 'α세대 (2010년대 이후)';
};

const getRarity = (lr: number) => {
  if (lr <= 10) return '매우 흔함 (TOP 10)';
  if (lr <= 50) return '흔함 (TOP 50)';
  if (lr <= 100) return '보통 (TOP 100)';
  if (lr <= 500) return '드문 편';
  if (lr === 9999) return '매우 희귀 (2024년 미등장)';
  return '희귀';
};

const getTrend = (entries: ByNameEntry[]) => {
  const recent = entries.slice(-5);
  if (recent.length < 2) return '데이터 없음';
  
  const first = recent[0].r;
  const last = recent[recent.length - 1].r;
  
  if (last < first - 10) return '상승 중 ↑';
  if (last > first + 10) return '하락 중 ↓';
  return '안정적 →';
};

export default async function NamePage({ params }: { params: Promise<{ name: string }> }) {
  const { name: paramName } = await params;
  const name = paramName.toLowerCase();
  const capLabel = name.charAt(0).toUpperCase() + name.slice(1);

  // Load target name data
  let data: ByNameFile;
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'names', 'us', 'by-name', `${name}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch {
    notFound();
  }

  // Load index data for overview stats
  const index = indexData as IndexEntry[];
  const overview = index.find(e => e.n === name);

  if (!overview) {
    notFound();
  }

  // Determing main gender for text logic
  const mainGenderText = overview.g === 'M' ? '남자' : overview.g === 'F' ? '여자' : '남/여 공용';
  
  // Calculate Peak Births
  let maxBirths = 0;
  data.male.forEach(d => { if (d.c > maxBirths) maxBirths = d.c; });
  data.female.forEach(d => { if (d.c > maxBirths) maxBirths = d.c; });

  // Insight texts based on stats
  const mainGenderEntries = overview.g === 'M' ? data.male : overview.g === 'F' ? data.female : (data.male.length > data.female.length ? data.male : data.female);
  const trend = getTrend(mainGenderEntries);
  const rarity = getRarity(overview.lr);
  const generation = getGeneration(overview.py);

  return (
    <div className="space-y-10 pb-12 w-full max-w-4xl mx-auto pt-4">
      {/* Breadcrumb / Back Link */}
      <div>
        <Link href="/names/us" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> 미국 이름 홈으로
        </Link>
      </div>

      {/* Header Profile */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {capLabel}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-gray-600 font-medium">
            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              {mainGenderText} 이름
            </span>
            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              {overview.my}년 연속 등장
            </span>
          </div>
        </div>
        
        {/* Quick CTA to NameEng Converter */}
        <Link 
          href={`/?name=${capLabel}`} 
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-full font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
        >
          로마자 변환기 보기 <ArrowRightCircle size={18} />
        </Link>
      </div>

      {/* Core Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm text-center">
          <Hash className="text-blue-500 w-6 h-6 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">2024년 순위</h3>
          <p className="text-2xl font-bold text-gray-900">{overview.lr === 9999 ? '순위 밖' : `${overview.lr}위`}</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm text-center">
          <Award className="text-rose-500 w-6 h-6 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">전성기 (최고 순위)</h3>
          <p className="text-2xl font-bold text-gray-900">{overview.py}년 
            <span className="text-sm text-gray-500 font-normal ml-1">({overview.pr}위)</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm text-center">
          <Calendar className="text-indigo-500 w-6 h-6 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">주요 세대</h3>
          <p className="text-lg md:text-xl font-bold text-gray-900 mt-2">{generation.split(' ')[0]}</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm text-center">
          <Zap className="text-amber-500 w-6 h-6 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">희귀도</h3>
          <p className="text-lg md:text-xl font-bold text-gray-900 mt-2">{rarity.split(' ')[0]}</p>
        </div>
      </div>

      {/* Name Trend Chart Section */}
      <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl shadow-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-500" />
            연도별 순위 변화 (1880~2024)
          </h2>
          <p className="text-gray-500 mt-1">
            위로 올라갈수록 인기 있는 이름입니다 (1위가 가장 위쪽 위치).
          </p>
        </div>
        
        <NameTrendChart maleData={data.male} femaleData={data.female} />
        
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 {capLabel} 이름 인사이트</h3>
          <ul className="space-y-3 text-gray-700 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>{capLabel}</strong>는 <strong>{overview.py}년</strong>에 미국에서 <strong>{overview.pr}위</strong>를 기록하며 전성기를 맞았습니다. 
                당시에만 무려 <strong>{maxBirths.toLocaleString()}명</strong>이 태어났어요.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                최근 5년간의 순위를 분석해보면, 인기가 <strong>{trend}</strong> 상태입니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                세대별로 분류하면 주로 <strong>{generation}</strong>를 대표하는 이름 중 하나입니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                2024년 기준 <strong>{rarity}</strong>인 이름으로 분류됩니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Relevant Links / CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/names/us/popular?year=${overview.py}`} className="flex items-center justify-between p-6 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-2xl transition-colors group">
          <div>
            <h3 className="font-bold text-lg mb-1">{overview.py}년도 TOP 50 보기</h3>
            <p className="text-indigo-700/80 text-sm">{capLabel}의 전성기 시대 인기 이름들</p>
          </div>
          <ArrowRight className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link href={`/names/us/trends?names=${name}`} className="flex items-center justify-between p-6 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-2xl transition-colors group">
          <div>
            <h3 className="font-bold text-lg mb-1">다른 이름과 비교하기</h3>
            <p className="text-emerald-700/80 text-sm">트렌드 차트로 한번에 보기</p>
          </div>
          <ArrowRight className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm mb-4">내 한국어 이름도 영어로 멋지게 만들고 싶다면?</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-md">
          NameEng 메인으로 이동하기 <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}


