'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import ResultCard from '@/components/converter/ResultCard';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';
import {
    romanizeKoreanName,
    getFamilyNameOptions,
    getSurnameVariants,
    type RomanizationOptions,
} from '@/lib/romanization';
import {
    Sparkles,
    FileText,
    BookOpen,
    Globe,
    Award
} from 'lucide-react';

/* 단축 URL 옵션 디코딩 함수 */
function decodeOptions(s: string): Partial<RomanizationOptions> {
    if (s.length < 4) return {};
    const caseMap: Record<string, 'capitalized' | 'lowercase' | 'uppercase'> = {
        c: 'capitalized', l: 'lowercase', u: 'uppercase',
    };
    return {
        order: s[0] === '1' ? 'given-family' : 'family-given',
        hyphen: s[1] === '1',
        caseStyle: caseMap[s[2]] || 'capitalized',
        ...(s[3] !== '-' && { familyNameType: s[3] === 'c' ? 'compound' : 'single' }),
    };
}

function ResultPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams.get('n');
    const optionsParam = searchParams.get('o');
    const surnameParam = searchParams.get('s');

    useEffect(() => {
        // 필수 파라미터가 없으면 메인으로 리다이렉트
        if (!name) {
            router.replace('/');
        }
    }, [name, router]);

    if (!name) return null;

    /* 이름 변환 로직 호출 */
    const nameOpts = getFamilyNameOptions(name);
    const decoded = decodeOptions(optionsParam || '');

    const familyNameType: 'compound' | 'single' =
        (decoded.familyNameType as 'compound' | 'single') ??
        (nameOpts.hasCompoundOption ? 'compound' : 'single');

    const familyName =
        familyNameType === 'compound' && nameOpts.hasCompoundOption
            ? nameOpts.compoundFamily
            : nameOpts.singleFamily;

    const variants = getSurnameVariants(familyName);

    const options: RomanizationOptions = {
        order: decoded.order ?? 'family-given',
        hyphen: decoded.hyphen ?? false,
        caseStyle: decoded.caseStyle ?? 'capitalized',
        familyNameType,
        surnameVariant: surnameParam ?? (variants[0] ?? undefined),
    };

    const result = romanizeKoreanName(name.trim(), options);

    /* 하단 CTA 링크 목록 */
    const contextualLinks = [
        { href: '/names/us/popular', label: '미국 인기 영문명 차트', icon: <Award className="text-amber-500" size={18} /> },
        { href: '/passport-guide', label: '여권 발급 표기법', icon: <FileText className="text-blue-500" size={18} /> },
        { href: '/romanization-guide', label: '로마자 표기 안내', icon: <BookOpen className="text-emerald-500" size={18} /> },
    ];

    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

    return (
        <TwoColumnLayout
            sidebarLinks={[
                {
                    href: '/blog/passport-name-guide',
                    icon: <FileText className="text-blue-500" size={20} />,
                    title: '여권 발급 시 영문명 작성법',
                    desc: '여권 신청 시 주의사항과 실제 사례',
                },
                {
                    href: '/blog/overseas-name-tips',
                    icon: <Globe className="text-emerald-500" size={20} />,
                    title: '해외 거주 시 영문명 사용 팁',
                    desc: '문화적 차이를 교려한 실용적인 조언',
                }
            ]}
        >
                        <div className="text-center space-y-2">
                            <h1 className="text-xl font-bold text-gray-900">
                                <span className="text-blue-600">{name}</span>님의 영문 이름
                            </h1>
                            <p className="text-sm text-gray-500">
                                친구가 공유한 영문 이름 변환 결과입니다.
                            </p>
                        </div>

                        <ResultCard
                            inputName={name}
                            romanized={result.romanized}
                            onCopy={copyToClipboard}
                            onShare={() => { }}
                            contextualLinks={contextualLinks}
                        />

                        <AdSlot
                            slot="2738626516"
                            format="auto"
                            wrapperClassName="py-2 md:my-6 md:rounded-lg md:overflow-hidden"
                            lazyLoad={false}
                        />

                        <button
                            onClick={() => router.push('/')}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-lg transition-colors shadow-sm mt-4"
                        >
                            내 이름 무료로 변환하기
                        </button>

                        <div className="md:hidden">
                            <ContentLinks
                                title="유용한 가이드"
                                items={[
                                    {
                                        href: '/blog/passport-name-guide',
                                        icon: <FileText className="text-blue-500" size={20} />,
                                        title: '여권 발급 시 영문명 작성법',
                                        desc: '여권 신청 시 주의사항과 실제 사례',
                                    },
                                    {
                                        href: '/blog/overseas-name-tips',
                                        icon: <Globe className="text-emerald-500" size={20} />,
                                        title: '해외 거주 시 영문명 사용 팁',
                                        desc: '문화적 차이를 교려한 실용적인 조언',
                                    }
                                ]}
                            />
                        </div>
            </TwoColumnLayout>
    );
}

export default function ResultPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <ResultPageContent />
        </Suspense>
    );
}
