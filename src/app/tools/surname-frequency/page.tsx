'use client';

import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Search,
    ChevronRight,
    BarChart3,
    Users,
    Star,
    ChevronDown
} from 'lucide-react';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';
import SourceCitation from '@/components/converter/SourceCitation';
import surnameData from '@/data/normalized_romanization.json';

interface RomanizationStat {
    romanization: string;
    weighted_score: number;
}

interface SourceCount {
    romanization: string;
    count: number | null;
    percentage?: number;
}

interface SurnameEntry {
    hangul: string;
    combined_ranking: RomanizationStat[];
    sources?: Record<string, SourceCount[]>;
}

const SECTION_MARKERS: Record<string, string> = {
    "1999_passport": "1999년 외교부 여권 자료",
    "2011_passport": "2011년 외교부 여권 자료",
    "2011_snu": "2011년 서울대 재학생 자료",
    "2011_internet": "2011년 인터넷 표기 자료",
};

export default function SurnameFrequencyPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // 가나다 순으로 정렬된 데이터 가공
    const allSurnames = useMemo(() => {
        return Object.entries(surnameData).map(([hangul, data]) => ({
            hangul,
            combined_ranking: (data as any).combined_ranking as RomanizationStat[],
            sources: (data as any).sources as Record<string, SourceCount[]>
        })).sort((a, b) => a.hangul.localeCompare(b.hangul, 'ko'));
    }, []);

    // 검색 필터링 logic
    const filteredSurnames = useMemo(() => {
        // 공백 무시
        const term = searchTerm.replace(/\s/g, '');
        if (!term) return allSurnames.slice(0, 12); // 초기에는 우선 상위 표기/가나다 일부
        return allSurnames.filter(s => s.hangul.includes(term)).slice(0, 20);
    }, [searchTerm, allSurnames]);

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
                            <a href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                <ArrowLeft size={16} />
                                도구 목록으로 돌아가기
                            </a>
                            <div className="mb-3">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                                    성씨 데이터 도구
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                성씨 영문 표기 빈도 검색
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                특정 성씨가 영문으로 어떻게 가장 많이 표기되는지, 실생활 데이터를 기반으로 분석한 통계를 제공합니다.
                            </p>
                        </div>

                        {/* 검색 섹션 */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                            <div className="max-w-xl">
                                <label htmlFor="surname-search" className="block text-sm font-bold text-gray-900 mb-3">
                                    검색하고 싶은 성씨를 입력하세요
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="surname-search"
                                        type="text"
                                        placeholder="예: 김, 이, 박, 남궁"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-lg transition-colors"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 결과 리스트 */}
                        <section className="space-y-4 mb-8">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {searchTerm.trim() ? `'${searchTerm}' 검색 결과` : '주요 성씨 목록'}
                                </h2>
                                <span className="text-xs text-gray-500">
                                    {filteredSurnames.length}개 표시 중
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {filteredSurnames.map((entry) => (
                                    <div key={entry.hangul} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-blue-200 transition-colors">
                                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-black text-gray-900">{entry.hangul}</span>
                                                <span className="text-xs text-gray-400 font-medium">씨</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={`/tools/surname-frequency/${entry.hangul}`}
                                                    className="text-[11px] font-bold text-gray-500 hover:text-gray-900 border border-gray-200 px-2 py-1 rounded-md bg-white flex items-center gap-0.5 transition-colors"
                                                >
                                                    상세 통계 <ChevronRight size={12} />
                                                </a>
                                                <a
                                                    href={`/tools/name-checker?input=${entry.hangul}`}
                                                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                                                >
                                                    적합성 검사 <ChevronRight size={12} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-5 space-y-3">
                                            {entry.combined_ranking.slice(0, 3).map((rank, idx) => (
                                                <div key={rank.romanization} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-5 h-5 flex items-center justify-center rounded-md text-[10px] font-bold ${idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                                            {idx + 1}
                                                        </span>
                                                        <span className="font-bold text-gray-800 tracking-wide text-sm">{rank.romanization}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                                                            <div
                                                                className={`h-full rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                                style={{ width: `${Math.min(100, rank.weighted_score)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-500 w-8 text-right">
                                                            {rank.weighted_score.toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                            {entry.combined_ranking.length > 3 && (
                                                <p className="text-[11px] text-gray-400 pt-1">
                                                    외 {entry.combined_ranking.length - 3}개의 다른 표기가 더 있습니다.
                                                </p>
                                            )}

                                            {/* 출처별 상세 통계 아코디언 */}
                                            {entry.sources && Object.keys(entry.sources).length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <details className="group">
                                                        <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors select-none">
                                                            <span className="flex items-center gap-1"><BarChart3 size={14} />상세 통계 자료 보기</span>
                                                            <ChevronDown size={14} className="transition-transform group-open:-rotate-180" />
                                                        </summary>
                                                        <div className="mt-3 space-y-3">
                                                            {Object.entries(SECTION_MARKERS).map(([sourceKey, sourceLabel]) => {
                                                                const sourceData = entry.sources![sourceKey];
                                                                if (!sourceData || sourceData.length === 0) return null;

                                                                // 상위 5개까지만 표시하고 빈도순 정렬
                                                                const sortedData = [...sourceData]
                                                                    .sort((a, b) => (b.count || 0) - (a.count || 0))
                                                                    .slice(0, 5);

                                                                return (
                                                                    <div key={sourceKey} className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                                                                        <h4 className="text-[10px] font-bold text-gray-500 mb-2.5 flex items-center gap-1.5">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                                                                            {sourceLabel}
                                                                        </h4>
                                                                        <div className="flex flex-wrap gap-1.5">
                                                                            {sortedData.map(stat => (
                                                                                <div key={stat.romanization} className="inline-flex items-baseline gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded text-[11px] font-medium">
                                                                                    <span className="font-bold text-gray-800">{stat.romanization}</span>
                                                                                    {stat.count !== null && stat.count !== undefined && (
                                                                                        <span className="text-[10px] text-gray-400">({stat.count.toLocaleString()}명)</span>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </details>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredSurnames.length === 0 && (
                                <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                                    <p className="text-gray-500 font-medium italic">검색 결과가 없습니다.</p>
                                </div>
                            )}
                        </section>

                        {/* 안내 및 팁 */}
                        <section className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
                                <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                                    <BarChart3 size={16} /> 점수(Score)의 의미
                                </h3>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    표기 점수는 여권 발급 데이터 및 각종 신뢰할 수 있는 통계를 가중 평균하여 산출된 값입니다. 100점에 가까울수록 해당 성씨에서 압도적으로 많이 쓰이는 표기임을 의미합니다.
                                </p>
                            </div>
                            <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6">
                                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                                    <Star size={16} /> 추천 활용법
                                </h3>
                                <p className="text-xs text-emerald-800 leading-relaxed">
                                    일반적으로 가장 높은 점수의 표기를 사용하는 것이 무난하지만, 본인의 선호도나 가족과의 통일성을 고려하여 상위 3순위 내에서 선택하는 것이 좋습니다.
                                </p>
                            </div>
                        </section>

                        {/* Citation Section */}
                        <div className="mb-8">
                            <SourceCitation />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="hidden md:block w-[300px]">
                        <div className="sticky top-4 space-y-4">
                            <AdSlot
                                slot="4812260682"
                                format="rectangle"
                                lazyLoad={true}
                            />
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

            <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
                <SiteFooter />
            </div>
        </div>
    );
}
