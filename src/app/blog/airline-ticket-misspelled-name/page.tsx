import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    Plane,
    AlertCircle,
    Clock3,
    CheckCircle,
    HelpCircle,
    Phone,
    RotateCcw,
    ShieldAlert,
    Globe,
    FileText
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
    title: '항공권 예매 후 영문 이름 스펠링이 틀렸을 때 해결 방법 | NameEng 블로그',
    description: '여권 영문명과 항공권 이름이 틀렸을 때 당황하지 마세요! 수수료 규정, 변경 기준, 그리고 발권처별 대처 방법을 자세히 안내해 드립니다.',
    keywords: ['항공권 이름 변경', '여권 영문명 스펠링 오류', '항공권 수수료', '항공권 취소', '영문명 오타 수정'],
};

export default function AirlineTicketMismatchPage() {
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
                                    여행팁
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                                항공권 예매 후 영문 이름 스펠링이 틀렸을 때 해결 방법
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>2025년 3월 9일</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>8분 읽기</span>
                                </div>
                            </div>
                        </div>

                        {/* 본문 */}
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

                            {/* 소개 */}
                            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <Plane size={20} className="text-blue-600" />
                                    단 한 글자의 실수, 탑승 거부의 원인이 됩니다
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    특가 항공권을 잡기 위해 급하게 결제하다 보면, 여권과 항공권의 영문 이름 스펠링이 다르게 입력되는 실수를 종종 하게 됩니다. 여권 영문명과 항공권 영문명이 <strong className="text-blue-700 underline underline-offset-4">단 한 글자라도 다르면</strong> 출국장 입장 및 비행기 탑승이 전면 거부될 수 있습니다. 만약 스펠링 오류를 발견했다면 어떻게 해야 할지 빠르게 조립해 보세요.
                                </p>
                            </section>

                            {/* 1. 골든타임은 결제 후 24시간 이내 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                    <Clock3 size={24} className="text-blue-600" />
                                    1. 골든타임은 결제 후 24시간 이내
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    가장 좋은 시나리오는 결제 직후, 혹은 <strong className="font-bold text-gray-900">결제 당일(24시간 이내)</strong>에 오류를 발견하는 것입니다.
                                </p>
                                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                                    <h3 className="text-emerald-900 font-bold mb-2">무료 취소 활용</h3>
                                    <p className="text-sm text-gray-700">
                                        대부분의 항공사와 여행사는 결제 당일 자정 전까지는 <strong className="text-emerald-700">수수료 없이 무료 취소</strong>가 가능합니다. 발견 즉시 기존 항공권을 무료로 취소하고, 올바른 영문명으로 다시 예매하는 것이 가장 비용이 들지 않는 확실한 방법입니다.
                                    </p>
                                </div>
                            </section>

                            {/* 2. 항공권 영문명 변경 기준 및 수수료 안내 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                    <AlertCircle size={24} className="text-amber-500" />
                                    2. 영문명 변경 기준 및 수수료 안내
                                </h2>

                                <div className="space-y-6">
                                    {/* 단순 오타 */}
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">단순 오타 (알파벳 1~3글자 이내)</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            발음상 동일인으로 추정되는 단순 타이핑 오류라면 여권 사본 증빙을 통해 변경을 허용해 주는 경우가 많습니다.
                                        </p>
                                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                            <li>• <strong className="text-gray-900">대형 항공사 (FSC):</strong> 무료 또는 약 1~3만 원 내외의 수수료로 변경 가능</li>
                                            <li>• <strong className="text-gray-900">저가 항공사 (LCC):</strong> 규정이 매우 엄격하여 변경 불허 또는 높은 수수료 청구</li>
                                        </ul>
                                    </div>

                                    {/* 성과 이름 반전 */}
                                    <div className="border-l-4 border-emerald-500 pl-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">성과 이름이 뒤바뀐 경우</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Last Name과 First Name의 위치가 바뀐 경우입니다. 대형 항공사는 대부분 무료 정정해 주지만, 일부 외항사나 저가 항공사는 취소 후 재발권을 요구할 수 있습니다.
                                        </p>
                                    </div>

                                    {/* 완전 다른 이름 */}
                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">완전히 다른 이름 / 개명</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            타인 양도로 간주되어 <strong className="text-red-600">이름 변경이 절대 불가능</strong>합니다. 기존 티켓을 취소 수수료 지불 후 취소하고, 현재 운임으로 새로 발권해야 합니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 3. 발권처에 따른 대처 방법 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                    <HelpCircle size={24} className="text-indigo-600" />
                                    3. 어디에 연락해야 할까?
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <RotateCcw size={18} className="text-blue-500" />
                                            항공사 직접 예매
                                        </h3>
                                        <p className="text-sm text-gray-700">해당 항공사 고객센터로 즉시 전화하세요. 규정에 따라 수수료 지수 후 변경하거나 재발권 안내를 받을 수 있습니다.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <Globe size={18} className="text-green-500" />
                                            여행사/OTA 예매
                                        </h3>
                                        <p className="text-sm text-gray-700">아고다, 트립닷컴 등 여행사를 통해 예매했다면 <strong className="text-gray-900">반드시 여행사로 연락</strong>해야 합니다. 항공사는 여행사 대행 건을 직접 수정해주지 않습니다.</p>
                                    </div>
                                </div>
                            </section>

                            {/* 4. 주의사항 */}
                            <section>
                                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                                    <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                        <ShieldAlert size={20} />
                                        반드시 기억해야 할 주의사항
                                    </h2>
                                    <ul className="space-y-3 text-sm text-gray-800">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span><strong className="text-gray-900">공항 카운터 수정 시도 금지:</strong> 현장에서 거절당하면 비행기를 놓치게 됩니다. 반드시 출국 전 해결하세요.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span><strong className="text-gray-900">추가 수수료 발생:</strong> 항공사 수수료 외에 여행사 자체 '발권 대행 수수료'가 추가로 붙을 수 있습니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* 마무리 */}
                            <section className="text-center py-4">
                                <div className="inline-block p-1 bg-blue-100 rounded-full mb-4">
                                    <div className="p-2 bg-blue-600 rounded-full">
                                        <CheckCircle size={24} className="text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">미리 확인하는 습관이 정답입니다</h2>
                                <p className="text-gray-600 max-w-lg mx-auto">
                                    가장 중요한 것은 결제 전 여권 영문명, 성과 이름의 위치를 재차 확인하는 것입니다. 지금 바로 나의 예약 내역을 열어 여권과 단 한 차례도 어긋남이 없는지 확인해 보세요!
                                </p>
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
                            { href: '/blog/travel-insurance-passport-name-mismatch', icon: <AlertCircle className="text-red-500" size={20} />, title: '여행자 보험 영문명 불일치', desc: '보험금 청구 거절 주의' },
                            { href: '/blog/passport-name-guide', icon: <FileText className="text-blue-500" size={20} />, title: '여권 영문명 작성 가이드', desc: '공식 문서 작성법' }
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
