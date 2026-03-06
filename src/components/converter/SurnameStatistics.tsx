import React from 'react';
import { Check, Star, BookOpen } from 'lucide-react';
import { getSurnameStatistics, getSurnameVariants, SurnameStatistic } from '@/lib/romanization';

interface SurnameStatisticsProps {
    familyName: string;
    selectedVariant: string;
    onSelect: (variant: string) => void;
    className?: string;
}

export default function SurnameStatistics({
    familyName,
    selectedVariant,
    onSelect,
    className = ''
}: SurnameStatisticsProps) {
    const stats = React.useMemo(() => getSurnameStatistics(familyName), [familyName]);
    const fallbackVariants = React.useMemo(() => getSurnameVariants(familyName), [familyName]);

    if (!stats || stats.length === 0) {
        if (!fallbackVariants || fallbackVariants.length === 0) {
            return null;
        }

        // 통계 자료는 없지만 (예: 독고, 남궁 등 복성) 기존 관용 표기 데이터가 있는 경우 
        // 기본 옵션 버튼 UI를 렌더링합니다.
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                        <span className="text-blue-500">'{familyName}'</span>씨 로마자 표기
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                        기본 권장 표기
                    </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {fallbackVariants.map((variant) => (
                        <button
                            key={variant}
                            onClick={() => onSelect(variant)}
                            className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 truncate ${selectedVariant.toUpperCase() === variant
                                ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {variant}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Find the highest percentage to identify the max (usually the first one due to sorting, but let's be safe)
    const maxPercentage = Math.max(...stats.map(s => s.percentage));

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <span className="text-blue-500">'{familyName}'</span>씨 로마자 표기 통계
                </h3>
                <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    통계 점수 기준
                </span>
            </div>

            <div className="flex flex-col gap-2">
                {stats.slice(0, 5).map((stat) => {
                    const isSelected = selectedVariant.toUpperCase() === stat.romanization;
                    const isMostUsed = stat.percentage === maxPercentage && maxPercentage > 0;

                    return (
                        <button
                            key={stat.romanization}
                            onClick={() => onSelect(stat.romanization)}
                            className={`relative overflow-hidden w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 group ${isSelected
                                ? 'border-blue-500 bg-blue-50/30 shadow-sm ring-1 ring-blue-500/20'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                                }`}
                        >
                            {/* Progress Bar Background */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ease-out opacity-20 ${isSelected ? 'bg-blue-400' : 'bg-gray-300 group-hover:bg-blue-200'
                                    }`}
                                style={{ width: `${stat.percentage}%` }}
                            />

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isSelected
                                    ? 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-white border-gray-300 text-transparent group-hover:border-blue-300'
                                    }`}>
                                    <Check size={12} strokeWidth={3} />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                    <span className={`font-bold tracking-wide ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                                        {stat.romanization}
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        {isMostUsed && (
                                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 border border-amber-200/50 rounded-md">
                                                <Star size={10} className="fill-amber-500" /> 가장 많이 사용
                                            </span>
                                        )}
                                        {stat.isStandard && (
                                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200/50 rounded-md">
                                                <BookOpen size={10} /> 현행 표기법
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Percentage */}
                            <div className="relative z-10 text-right shrink-0">
                                <span className={`text-sm font-bold ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                                    {stat.percentage !== null && stat.percentage !== undefined ? stat.percentage.toFixed(1) : '알 수 없음'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {stats.length > 5 && (
                <div className="pt-2">
                    <div className="text-[11px] font-bold text-gray-400 mb-2 px-1">기타 표기 (점수)</div>
                    <div className="flex flex-wrap gap-1.5">
                        {stats.slice(5).map((stat) => {
                            const isSelected = selectedVariant.toUpperCase() === stat.romanization;
                            return (
                                <button
                                    key={stat.romanization}
                                    onClick={() => onSelect(stat.romanization)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${isSelected
                                        ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                        }`}
                                >
                                    {stat.romanization}
                                    <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {stat.percentage.toFixed(1)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
