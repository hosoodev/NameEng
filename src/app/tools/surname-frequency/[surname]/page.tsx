import { notFound } from 'next/navigation';
import { ArrowLeft, BarChart3, ChevronRight, Search, Star, Users } from 'lucide-react';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ContentLinks from '@/components/converter/ContentLinks';
import AdSlot from '@/components/ads/AdSlot';
import surnameData from '@/data/normalized_romanization.json';
import SourceCitation from '@/components/converter/SourceCitation';
import { Metadata } from 'next';

interface RomanizationStat {
    romanization: string;
    weighted_score: number;
}

interface SourceCount {
    romanization: string;
    count: number | null;
    percentage?: number;
}

const SECTION_MARKERS: Record<string, string> = {
    "1999_passport": "1999년 외교부 여권 자료",
    "2011_passport": "2011년 외교부 여권 자료",
    "2011_snu": "2011년 서울대 재학생 자료",
    "2011_internet": "2011년 인터넷 표기 자료",
};

interface PageProps {
    params: Promise<{ surname: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const decodedSurname = decodeURIComponent(resolvedParams.surname);
    return {
        title: `${decodedSurname}씨 영문 이름 표기법 및 로마자 변환 빈도 - Nameeng`,
        description: `${decodedSurname}씨 성씨의 영문 (로마자) 표기 빈도 분석. 여권 데이터, 인터넷 사용 통계 등을 기반으로 한국어 성씨 '${decodedSurname}'의 올바르고 널리 쓰이는 영문 스펠링을 추천합니다.`,
        openGraph: {
            title: `${decodedSurname}씨 영문 이름 표기법 및 통계 - Nameeng`,
            description: `${decodedSurname}씨 성씨의 가장 대중적인 영문 표기법 스펠링과 통계를 확인하세요.`,
        }
    };
}

// Generate static params for common surnames to optimize build
export function generateStaticParams() {
    const commonSurnames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
    return commonSurnames.map((surname) => ({
        surname,
    }));
}

export default async function SurnameDetail({ params }: PageProps) {
    const resolvedParams = await params;
    const decodedSurname = decodeURIComponent(resolvedParams.surname);
    const data = (surnameData as any)[decodedSurname];

    if (!data) {
        notFound();
    }

    const combinedRanking = data.combined_ranking as RomanizationStat[];
    const sources = data.sources as Record<string, SourceCount[]>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DesktopNavBar />

            <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1">
                <div className="px-4 md:hidden mt-4">
                    <SiteHeader />
                </div>

                <div className="md:grid md:grid-cols-[1fr_300px] gap-8 mt-8">
                    {/* Main Column */}
                    <div className="w-full px-4 md:px-0">
                        {/* Header Content */}
                        <div className="mb-8">
                            <a href="/tools/surname-frequency" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm">
                                <ArrowLeft size={16} />
                                성씨 빈도 검색 목록으로
                            </a>
                            <div className="mb-3">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200 shadow-sm">
                                    성씨 상세 통계 분석
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight flex items-end gap-2">
                                <span className="text-blue-600">'{decodedSurname}'</span>씨 로마자 표기
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                한국에서 '{decodedSurname}'씨 성을 가진 사람들이 가장 많이 사용하는 영문 표기와 각 출처별 세부 통계를 확인해 보세요.
                            </p>

                            <a
                                href={`/tools/name-checker?input=${decodedSurname}`}
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md"
                            >
                                <Search size={18} />
                                '{decodedSurname}'씨 영문명 적합성 바로 검사하기
                            </a>
                        </div>

                        {/* Combined Ranking Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <BarChart3 size={200} />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Star className="text-blue-500" />
                                    종합 표기 순위
                                </h2>

                                <div className="space-y-4 max-w-2xl">
                                    {combinedRanking.map((rank, idx) => (
                                        <div key={rank.romanization} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 group hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                                            <div className="flex items-center gap-4 border-r border-gray-200 pr-4 min-w-[120px]">
                                                <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold shadow-sm ${idx === 0 ? 'bg-blue-600 text-white' : idx <= 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
                                                    {idx + 1}
                                                </span>
                                                <span className="text-xl font-black text-gray-900 tracking-wide">{rank.romanization}</span>
                                            </div>

                                            <div className="flex-1 flex items-center justify-end md:justify-start gap-4 pl-4">
                                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden hidden md:block max-w-sm">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'bg-blue-500' : idx <= 2 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                                        style={{ width: `${Math.min(100, rank.weighted_score)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-base font-bold text-gray-700">
                                                        {rank.weighted_score.toFixed(1)}<span className="text-xs text-gray-400 ml-0.5">점</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Source Specific Data Section */}
                        {sources && Object.keys(sources).length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">
                                    출처별 세부 통계
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {Object.entries(SECTION_MARKERS).map(([sourceKey, sourceLabel]) => {
                                        const sourceData = sources[sourceKey];
                                        if (!sourceData || sourceData.length === 0) return null;

                                        const sortedData = [...sourceData]
                                            .sort((a, b) => (b.count || 0) - (a.count || 0));

                                        return (
                                            <div key={sourceKey} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                                <h3 className="text-sm font-bold text-blue-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    {sourceLabel}
                                                </h3>
                                                <div className="space-y-2">
                                                    {sortedData.map((stat, idx) => (
                                                        <div key={stat.romanization} className="flex items-center justify-between text-sm py-1">
                                                            <span className="font-bold text-gray-700 flex items-center gap-2">
                                                                <span className="text-[10px] w-4 text-gray-400">{idx + 1}.</span>
                                                                {stat.romanization}
                                                            </span>
                                                            {stat.count !== null && stat.count !== undefined ? (
                                                                <span className="text-gray-500 font-medium">
                                                                    {stat.count.toLocaleString()}명
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400 text-xs italic">데이터 없음</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Citation Section */}
                        <SourceCitation />

                    </div>

                    {/* Sidebar Column */}
                    <div className="hidden md:block w-[300px]">
                        <div className="sticky top-4 space-y-4">
                            <AdSlot slot="4812260682" format="rectangle" />
                            <div className="mb-6">
                                <ContentLinks
                                    title={<span className="flex items-center gap-1.5"><Users size={16} className="text-gray-500" /> 다른 앱 보기</span>}
                                    items={[
                                        { href: '/tools/name-checker', icon: <Search className="text-blue-500" size={20} />, title: '영문명 적합성 검사', desc: '나의 영문명 디자인 분석' },
                                        { href: '/', icon: <Search className="text-blue-500" size={20} />, title: '영문이름변환기', desc: '이름을 가장 적합한 로마자로 변환' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto mt-12">
                <SiteFooter />
            </div>
        </div>
    );
}
