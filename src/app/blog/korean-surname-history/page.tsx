import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    BookOpen,
    Info
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
    title: '한국 성씨의 영문 표기 역사와 변천사 | NameEng 블로그',
    description: '조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지, 그 역사적 배경과 변화 과정을 자세히 살펴봅니다.',
    keywords: '한국 성씨 역사, 로마자 표기 변천사, 성씨 영문 표기 역사, 조선시대 성씨, 일제강점기 성씨 표기',
};

export default function KoreanSurnameHistory() {
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
                            <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                <ArrowLeft size={16} />
                                블로그 목록으로 돌아가기
                            </a>
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                                    역사
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                                한국 성씨의 영문 표기 역사와 변천사
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>2024년 12월 15일</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>8분 읽기</span>
                                </div>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지,
                                그 역사적 배경과 변화 과정을 살펴봅니다.
                            </p>
                        </div>

                        {/* 본문 */}
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

                            {/* 서론 */}
                            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">김(Kim), 이(Lee), 박(Park)</h3>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    한국인의 성씨를 로마자로 표기하는 것은 단순한 언어 변환을 넘어서
                                    역사적, 문화적, 정치적 맥락이 복합적으로 얽힌 복잡한 과정입니다.
                                    오늘날 우리가 사용하는 Kim, Lee, Park 등의 표기가 어떻게 형성되었는지,
                                    그 뒤에 숨겨진 흥미로운 이야기들을 함께 살펴보겠습니다.
                                </p>
                            </section>

                            {/* 1. 조선시대와 개화기 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    1. 조선시대와 개화기 (1876-1910)
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    한국 성씨의 로마자 표기는 19세기 후반 서구 문물이 본격적으로 유입되면서 시작되었습니다.
                                    이 시기의 표기는 주로 선교사들과 외교관들에 의해 이루어졌으며,
                                    체계적인 규칙보다는 개인의 판단에 따라 다양하게 표기되었습니다.
                                </p>
                                <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                                    <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                                        📚 초기 표기 사례들
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• <strong className="font-bold">김(金):</strong> Kim, Kin, Keem</li>
                                        <li>• <strong className="font-bold">이(李):</strong> Lee, Yi, Ri</li>
                                        <li>• <strong className="font-bold">박(朴):</strong> Park, Pak, Bak</li>
                                        <li>• <strong className="font-bold">최(崔):</strong> Choi, Choe, Tsoi</li>
                                    </ul>
                                </div>
                                <p className="text-base text-gray-700 leading-relaxed mt-6">
                                    특히 주목할 점은 이 시기부터 '김'씨가 'Kim'으로, '이'씨가 'Lee'로 표기되기 시작했다는 것입니다.
                                    이는 당시 조선을 방문한 서구인들이 한국어 발음을 자신들의 언어 체계로 해석한 결과였습니다.
                                </p>
                            </section>

                            {/* 2. 일제강점기 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    2. 일제강점기 (1910-1945)
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    일제강점기는 한국 성씨 표기에 있어 매우 복잡한 시기였습니다.
                                    일본은 한국인의 성명을 일본식으로 개명하도록 강요했지만,
                                    동시에 국제적인 문서에서는 로마자 표기가 필요했습니다.
                                </p>
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                                    <h4 className="text-sm font-bold text-red-900 mb-2 flex items-center gap-2">
                                        ⚠️ 창씨개명의 영향
                                    </h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        1940년 창씨개명령 이후 많은 한국인들이 일본식 성명을 강요받았지만,
                                        해외에 거주하거나 국제적 활동을 하는 한국인들은 여전히
                                        한국식 성씨의 로마자 표기를 사용했습니다.
                                    </p>
                                </div>
                            </section>

                            {/* 3. 해방 후 혼란기 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    3. 해방 후 혼란기 (1945-1959)
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    광복 이후 한국은 성씨 표기에 있어 큰 혼란을 겪었습니다.
                                    일제강점기 동안 억압되었던 한국식 성명이 부활했지만,
                                    로마자 표기에 대한 통일된 기준이 없어 개인마다 다른 표기를 사용했습니다.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h4 className="text-sm font-bold text-gray-900 mb-2">🇺🇸 미군정 시기 (1945-1948)</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            미군정은 영어식 발음에 가까운 표기를 선호했습니다.
                                            이 시기에 Kim, Lee, Park 등의 표기가 더욱 고착화되었습니다.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h4 className="text-sm font-bold text-gray-900 mb-2">🇰🇷 대한민국 정부 수립 후</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            정부 수립 후에도 통일된 로마자 표기법이 없어
                                            개인의 선택에 따라 다양한 표기가 혼재했습니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 4. 표준화 시도 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    4. 표준화 시도와 발전 (1959-2000)
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    1959년 문교부(현 교육부)에서 처음으로 「한글의 로마자 표기법」을 제정했습니다.
                                    이는 한국어의 로마자 표기에 대한 최초의 공식적인 기준이었습니다.
                                </p>
                                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                                    <h4 className="text-sm font-bold text-blue-900 mb-3">📋 1959년 표기법의 특징</h4>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                                        <p>• ㄱ → g, k</p>
                                        <p>• ㄴ → n</p>
                                        <p>• ㄷ → d, t</p>
                                        <p>• ㄹ → r, l</p>
                                        <p>• ㅁ → m</p>
                                        <p>• ㅂ → b, p</p>
                                        <p>• ㅅ → s</p>
                                        <p>• ㅇ → ng (받침일 때)</p>
                                    </div>
                                </div>
                                <p className="text-base text-gray-700 leading-relaxed mt-6">
                                    하지만 이미 널리 사용되고 있던 관용적 표기들(Kim, Lee, Park 등)과
                                    새로운 표준 표기 사이에 괴리가 있어 실제 사용에서는 혼재가 계속되었습니다.
                                </p>
                            </section>

                            {/* 5. 현대의 표기법 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    5. 현대의 로마자 표기법 (2000-현재)
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    2000년 국립국어원에서 새로운 「국어의 로마자 표기법」을 제정했습니다.
                                    이는 현재까지 사용되고 있는 공식적인 표기법으로,
                                    언어학적 정확성과 국제적 통용성을 모두 고려한 체계입니다.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                                        <h4 className="text-sm font-bold text-emerald-800 mb-3">✅ 표준 표기 (2000년 기준)</h4>
                                        <ul className="space-y-1 text-sm text-gray-700">
                                            <li>• 김(金) → Gim</li>
                                            <li>• 이(李) → I</li>
                                            <li>• 박(朴) → Bak</li>
                                            <li>• 최(崔) → Choe</li>
                                        </ul>
                                    </div>
                                    <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                                        <h4 className="text-sm font-bold text-indigo-800 mb-3">📝 관용 표기 (계속 사용)</h4>
                                        <ul className="space-y-1 text-sm text-gray-700">
                                            <li>• 김(金) → Kim</li>
                                            <li>• 이(李) → Lee</li>
                                            <li>• 박(朴) → Park</li>
                                            <li>• 최(崔) → Choi</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 6. 현재의 상황과 미래 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    6. 현재의 상황과 미래 전망
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    오늘날 한국 성씨의 로마자 표기는 표준 표기와 관용 표기가 공존하는 상황입니다.
                                    여권 발급 시에는 표준 표기를 권장하지만,
                                    이미 널리 사용되고 있던 관용 표기도 인정하고 있습니다.
                                </p>
                                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                                    <h4 className="text-sm font-bold text-purple-900 mb-3">🔮 미래 전망</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• 표준 표기의 점진적 확산</li>
                                        <li>• 개인 선택권 존중 지속</li>
                                        <li>• 국제적 통용성 고려한 유연한 적용</li>
                                        <li>• 디지털 시대에 맞는 새로운 표기 방식 모색</li>
                                    </ul>
                                </div>
                            </section>

                            {/* 결론 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    마무리
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    한국 성씨의 로마자 표기 역사는 우리나라의 근현대사와 밀접하게 연결되어 있습니다.
                                    외침과 혼란 속에서도 우리의 정체성을 지키려 했던 선조들의 노력이
                                    오늘날의 다양한 표기 방식으로 이어져 왔습니다.
                                </p>

                                <div className="bg-gray-900 text-white rounded-xl p-6 flex flex-col items-center text-center mt-8">
                                    <p className="text-sm text-gray-300 mb-1 font-semibold uppercase tracking-wider">NameEng의 역할</p>
                                    <p className="text-base text-gray-100">
                                        NameEng는 이러한 역사적 맥락을 이해하고, 표준 표기와 관용 표기를 모두 제공하여
                                        사용자가 자신의 상황에 맞는 최적의 선택을 할 수 있도록 돕습니다.
                                    </p>
                                </div>
                            </section>
                        </article>

                        {/* 관련 글 추천 */}
                        <div className="mt-8 mb-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                관련 글 더 보기
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a href="/blog/romanization-rules-explained" className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                                    <h4 className="text-base font-bold text-gray-900 mb-2">국어의 로마자 표기법 규칙 상세 해설</h4>
                                    <p className="text-sm text-gray-500">현재 사용되는 표기법의 구체적인 규칙들을 알아보세요.</p>
                                </a>
                                <a href="/blog/passport-name-guide" className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                                    <h4 className="text-base font-bold text-gray-900 mb-2">여권 발급 시 영문명 작성 완벽 가이드</h4>
                                    <p className="text-sm text-gray-500">여권 신청 시 영문명 작성법을 자세히 알아보세요.</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <CommonSidebar
                        customLinks={[
                            { href: '/blog/overseas-name-tips', icon: <BookOpen className="text-emerald-500" size={20} />, title: '해외 거주 시 영문명 팁', desc: '문화적 차이를 고려한 영문명 가이드' },
                            { href: '/blog/negative-meaning-words', icon: <Info className="text-amber-500" size={20} />, title: '피해야 할 한국 이름 표기', desc: '영어권에서 오해를 살 수 있는 철자' }
                        ]}
                    />
                </div>
            </main>

            <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
                <SiteFooter />
            </div>
        </div>
    );
}
