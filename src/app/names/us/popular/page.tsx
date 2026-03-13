import { Metadata } from 'next';
import PopularNamesClient from './_components/PopularNamesClient';
import { Award, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: '연도별 미국 인기 영어 이름 TOP 100 순위 센터 | NameEng',
  description: '1880년부터 2024년까지, 각 시대를 풍미한 미국 인기 영어 이름 순위를 확인하세요. 연도별 남자/여자 아기 이름 트렌드와 변화를 한눈에 볼 수 있습니다.',
};

type ByYearEntry = {
  rank: number;
  m: string;
  mc: number;
  f: string;
  fc: number;
};

// Next.js searchParams interface for Server Components
export default async function PopularNamesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  // Parsing requested year from searchParams (default 2024)
  const currentStr = Array.isArray(resolvedSearchParams.year) ? resolvedSearchParams.year[0] : resolvedSearchParams.year;
  let year = parseInt(currentStr || '2024', 10);
  
  if (isNaN(year) || year < 1880 || year > 2024) {
    year = 2024;
  }

  // Load static data file dynamically
  let data: ByYearEntry[] = [];
  try {
    const res = await import(`@/data/names/us/by-year/${year}.json`);
    data = res.default.slice(0, 50); // Get TOP 50
  } catch (err) {
    // Graceful degradation if year file isn't found
    console.error(`Failed to load data for year ${year}`);
  }

  // Generate some dynamic insightful descriptions for specific era context
  let eraDesc = "";
  if (year >= 2010) eraDesc = "α세대 (스마트폰 네이티브) 시기 - 새롭고 고유한 스펠링이나 트렌디한 이름들이 눈에 띄는 시대입니다.";
  else if (year >= 1990) eraDesc = "밀레니얼 및 Z세대 초반 시기 - 고전적인 이름들이 다시 사랑받기 시작하며 다양성이 커진 시대입니다.";
  else if (year >= 1970) eraDesc = "X세대 시기 - 베이비붐 세대의 흔한 이름들에서 벗어나 새로운 유형의 이름들이 인기를 얻기 시작했습니다.";
  else if (year >= 1940) eraDesc = "베이비붐 세대 시기 - 제2차 세계대전 직후 출생률이 급증하던 시기로, 클래식한 미국 이름들이 상위권을 지배했습니다.";
  else eraDesc = "빈티지 세대 (세계대전 이전) - 존(John), 메리(Mary) 등 전통적이고 성서적인 이름들이 강세를 보였던 시대입니다.";

  return (
    <div className="space-y-8 pb-12 w-full max-w-5xl mx-auto pt-4">
      {/* Header Info */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <Award className="text-amber-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">연도별 인기 이름 TOP 50</span>
        </h1>
        <p className="text-gray-600 text-lg">
          미국 사회보장국(SSA)의 1880~2024년 공식 데이터를 통해 시대별 가장 인기 있는 영어 이름들을 확인해보세요.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <p className="text-blue-800 text-sm leading-relaxed">
          <strong>{year}년 트렌드 노트:</strong> {eraDesc}
        </p>
      </div>

      <PopularNamesClient initialYear={year} data={data} />
    </div>
  );
}
