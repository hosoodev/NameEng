import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    AlertTriangle,
    CheckCircle,
    Info,
    BookOpen,
    Briefcase
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
    title: '여권 발급 시 영문명 작성 완벽 가이드 | NameEng 블로그',
    description: '여권 신청 시 영문명 작성법, 주의사항, 변경 절차까지 한 번에 알아보세요. 외교부 공식 가이드라인을 바탕으로 정확한 정보를 제공합니다.',
    keywords: ['여권', '영문명', '여권발급', '영문이름', '여권신청', '외교부'],
    openGraph: {
        title: '여권 발급 시 영문명 작성 완벽 가이드',
        description: '여권 신청 시 영문명 작성법과 주의사항을 알아보세요',
        type: 'article',
    }
};

export default function PassportNameGuidePage() {
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
                                    실용정보
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                                여권 발급 시 영문명 작성 완벽 가이드
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>2024년 12월 18일</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>5분 읽기</span>
                                </div>
                            </div>
                        </div>

                        {/* 본문 */}
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

                            {/* 소개 */}
                            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <Info size={20} className="text-blue-600" />
                                    여권 영문명, 왜 중요할까요?
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    여권의 영문명은 해외여행 시 항공권, 호텔 예약, 비자 신청 등 모든 공식 문서에 사용되는 중요한 정보입니다.
                                    한 번 발급된 여권의 영문명을 변경하려면 새로운 여권을 발급받아야 하므로, 처음부터 정확하게 작성하는 것이 중요합니다.
                                </p>
                            </section>

                            {/* 기본 원칙 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    1. 영문명 작성 기본 원칙
                                </h2>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="text-green-500" size={18} />
                                            외교부 공식 가이드라인
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 성(姓)은 대문자로, 이름은 첫 글자만 대문자로 작성</li>
                                            <li>• 한글 발음을 기준으로 로마자 표기법에 따라 작성</li>
                                            <li>• 띄어쓰기나 하이픈(-) 사용 가능</li>
                                            <li>• 특수문자나 숫자는 사용 불가</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <BookOpen className="text-gray-500" size={18} />
                                            로마자 표기법 예시
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 김철수 → <strong className="font-semibold text-gray-900">KIM Cheolsu</strong></li>
                                            <li>• 박영희 → <strong className="font-semibold text-gray-900">PARK Younghee</strong></li>
                                            <li>• 이지은 → <strong className="font-semibold text-gray-900">LEE Jieun</strong></li>
                                            <li>• 최민준 → <strong className="font-semibold text-gray-900">CHOI Minjun</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 주의사항 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    2. 영문명 작성 시 주의사항
                                </h2>

                                <div className="space-y-4">
                                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                                        <h3 className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2">
                                            <AlertTriangle className="text-orange-600" size={18} />
                                            반드시 확인해야 할 사항들
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-800">
                                            <li>• 기존 여권이나 비자에 사용된 영문명과 일치하는지 확인</li>
                                            <li>• 항공권 예약 시 사용할 이름과 동일한지 확인</li>
                                            <li>• 영문 이름의 철자를 여러 번 검토</li>
                                            <li>• 성과 이름의 순서가 올바른지 확인</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3">흔한 실수 사례</h3>
                                        <div className="space-y-3">
                                            <div className="flex gap-4 items-center">
                                                <span className="text-red-500 font-bold whitespace-nowrap">❌ 잘못된 예</span>
                                                <span className="text-sm text-gray-600">kim cheol su (모두 소문자)</span>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <span className="text-green-500 font-bold whitespace-nowrap">✅ 올바른 예</span>
                                                <span className="text-sm font-semibold text-gray-900">KIM Cheolsu</span>
                                            </div>
                                            <div className="flex gap-4 items-center mt-4">
                                                <span className="text-red-500 font-bold whitespace-nowrap">❌ 잘못된 예</span>
                                                <span className="text-sm text-gray-600">Kim Cheol-Su (성만 첫 글자 대문자)</span>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <span className="text-green-500 font-bold whitespace-nowrap">✅ 올바른 예</span>
                                                <span className="text-sm font-semibold text-gray-900">KIM Cheol-su 또는 KIM Cheolsu</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 변경 절차 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    3. 영문명 변경이 필요한 경우
                                </h2>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                    <p className="text-base text-gray-700 mb-4">
                                        이미 발급된 여권의 영문명을 변경하려면 새로운 여권을 발급받아야 합니다.
                                    </p>
                                    <h3 className="text-sm font-bold text-gray-900 mb-3">변경 절차</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 ml-1">
                                        <li>여권 발급 신청서 작성 (정정된 영문명으로)</li>
                                        <li>기존 여권 반납</li>
                                        <li>신규 여권 발급 수수료 납부</li>
                                        <li>약 7-10일 후 새 여권 수령</li>
                                    </ol>
                                </div>
                            </section>

                            {/* 유용한 도구 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    4. 영문명 작성에 도움되는 도구
                                </h2>
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-base font-bold text-indigo-900 mb-2">NameEng 영문명 변환기 활용하기</h3>
                                        <p className="text-sm text-indigo-700 mb-0">
                                            정확한 로마자 표기법에 따른 영문명 변환을 원한다면 NameEng의 영문명 변환기를 사용해보세요.
                                        </p>
                                    </div>
                                    <a href="/" className="shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-colors text-sm">
                                        영문명 변환기 사용하기
                                    </a>
                                </div>
                            </section>

                            {/* 마무리 */}
                            <section>
                                <div className="bg-gray-900 text-white rounded-xl p-6">
                                    <h2 className="text-lg font-bold text-white mb-2">정리</h2>
                                    <p className="text-base text-gray-300 leading-relaxed">
                                        여권 영문명은 해외여행의 첫 단추입니다. 정확한 로마자 표기법을 따르고,
                                        기존 문서들과의 일치성을 확인하여 불필요한 문제를 예방하세요.
                                        궁금한 점이 있다면 여권 발급 기관에 미리 문의하는 것도 좋은 방법입니다.
                                    </p>
                                </div>
                            </section>
                        </article>

                        {/* 공유 및 내비게이션 */}
                        <div className="flex justify-center border-t border-gray-200 pt-8 mt-8 mb-12">
                            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                <Share2 size={18} />
                                이 글 공유하기
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <CommonSidebar
                        customLinks={[
                            { href: '/passport-guide', icon: <Briefcase className="text-indigo-500" size={20} />, title: '외교부 공식 규정 읽기', desc: '여권 로마자 표기 법령 기준' },
                            { href: '/faq', icon: <CheckCircle className="text-emerald-500" size={20} />, title: '비자/여권 FAQ', desc: '자주 묻는 질문과 답변' },
                            { href: '/blog/business-name-etiquette', icon: <Info className="text-amber-500" size={20} />, title: '비즈니스 영문명 에티켓', desc: '해외 비즈니스 영문명 규칙' }
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