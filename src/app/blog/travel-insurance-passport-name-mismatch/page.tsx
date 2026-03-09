import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    Shield,
    AlertTriangle,
    FileText,
    Phone,
    CheckCircle,
    Globe,
    Plane
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
    title: '여행자 보험 가입 시 여권 영문명 불일치 문제: 주의사항과 해결 방법 | NameEng 블로그',
    description: '해외 여행자 보험 가입 시 가장 흔히 하는 실수인 여권 영문명 불일치! 스펠링이 틀렸을 때 발생하는 문제점과 실용적인 해결 방법을 정리해 드립니다.',
    keywords: ['여행자보험 영문명', '여권 영문명 불일치', '해외여행 보험금 청구', '여권 스펠링 오류', '영문 이름 변경'],
};

export default function TravelInsuranceMismatchPage() {
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
                                여행자 보험 가입 시 여권 영문명 불일치 문제: 주의사항과 해결 방법
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>2025년 3월 9일</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>6분 읽기</span>
                                </div>
                            </div>
                        </div>

                        {/* 본문 */}
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

                            {/* 소개 */}
                            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <Shield size={20} className="text-blue-600" />
                                    설레는 여행의 동반자, 하지만 이름은 냉정하게
                                </h2>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    설레는 해외여행 준비, 항공권과 숙소 예약을 마치고 나면 꼭 챙겨야 하는 것이 바로 '해외 여행자 보험'입니다. 가입 시 의외로 아주 치명적인 실수를 하는 경우가 많은데, 바로 <strong className="text-blue-700">여권 영문명 불일치</strong> 문제입니다. 이름 스펠링이 틀렸을 때 발생하는 문제점과 해결 방법을 자세히 알아보겠습니다.
                                </p>
                            </section>

                            {/* 1. 여권 영문명이 왜 정확해야 할까? */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    1. 여권 영문명이 왜 정확해야 할까?
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    여행자 보험은 단순한 보조 수단이 아니라 엄연한 <strong className="font-semibold">금융 및 법적 계약</strong>입니다. 해외에서 사고가 발생해 병원을 이용하거나 경찰서에서 폴리스 리포트를 작성할 때, 본인을 증명할 수 있는 유일한 공식 신분증은 '여권'입니다.
                                </p>
                                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                                    <p className="text-sm text-gray-800 italic">
                                        "보험사는 청구된 서류의 이름과 보험 가입자의 이름이 <strong className="text-red-600">알파벳 단 한 글자라도 다르면</strong> 동일인으로 인정하지 않을 수 있습니다."
                                    </p>
                                </div>
                            </section>

                            {/* 2. 영문명 불일치 시 발생하는 치명적인 문제 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    2. 영문명 불일치 시 발생하는 치명적인 문제
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <AlertTriangle size={18} className="text-red-500" />
                                            보험금 청구 거절
                                        </h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            귀국 후 보험금을 청구할 때 영문명이 다르면 서류 심사에서 반려되어 막대한 병원비나 보상금을 전액 사비로 부담해야 할 위험이 큽니다.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <Clock size={18} className="text-blue-500" />
                                            지불 보증 지연
                                        </h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            입원이 필요한 긴급 상황에서 보험사가 병원에 직접 지불을 보증하는 제도를 이용할 때, 이름 불일치는 승인 거부나 무한정 지연의 원인이 됩니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 3. 가입 후 스펠링 오류를 발견했다면? */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    3. 가입 후 스펠링 오류를 발견했다면?
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
                                            <CheckCircle size={20} />
                                            방법 A: 여행 출발 전 발견한 경우
                                        </h3>
                                        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 text-sm text-gray-700 space-y-2">
                                            <p>• <strong className="text-emerald-900">가장 안전한 방법:</strong> 보험사 고객센터에 즉시 연락하여 수정을 요청하세요.</p>
                                            <p>• <strong className="text-emerald-900">처리 방식:</strong> 본인 확인 후 즉시 수정이 가능하며, 수정된 증명서를 다시 받을 수 있습니다.</p>
                                            <p>• <strong className="text-emerald-900">팁:</strong> 시스템상 수정이 어렵다면 계약 취소 후 재가입하는 것이 가장 깔끔합니다.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-amber-700 mb-3 flex items-center gap-2">
                                            <Globe size={20} />
                                            방법 B: 이미 출국을 해버린 경우
                                        </h3>
                                        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 text-sm text-gray-700 space-y-2">
                                            <p>• <strong className="text-amber-900">해외 전용 콜센터:</strong> 보험사 앱이나 웹사이트에서 해외 사고 접수 전용 번호를 찾으세요.</p>
                                            <p>• <strong className="text-amber-900">카카오톡 상담:</strong> 요즘은 주요 보험사가 카카오톡 전용 채널을 운영하므로 실시간 문의가 가능합니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 4. 핵심 요약 및 꿀팁 */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    4. 핵심 요약 및 꿀팁
                                </h2>

                                <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200">
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-500 rounded-full p-1">
                                                <CheckCircle size={14} className="text-white" />
                                            </div>
                                            <span className="text-gray-700">여권 사진을 옆에 두고 <strong className="text-gray-900">스펠링과 띄어쓰기까지</strong> 100% 동일하게 입력하세요.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-500 rounded-full p-1">
                                                <CheckCircle size={14} className="text-white" />
                                            </div>
                                            <span className="text-gray-700">결제 전 최종 확인 단계에서 이름을 다시 한번 크게 소리 내어 읽어보세요.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-500 rounded-full p-1">
                                                <CheckCircle size={14} className="text-white" />
                                            </div>
                                            <span className="text-gray-700">가족이나 지인의 보험까지 대신 가입할 때 더욱 주의가 필요합니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* 마무리 */}
                            <section>
                                <div className="bg-gray-100 text-gray-800 rounded-xl p-6 border border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 italic">"작은 실수가 큰 손해로 이어지지 않기를 바랍니다"</h2>
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        보험은 여러분의 즐거운 추억을 지켜주는 든든한 방어벽입니다. 꼼꼼한 확인 한 번이 여행지에서의 갑작스러운 사고에도 차분하게 대응할 수 있는 힘이 됩니다. 모두 안전하고 행복한 여행 되시길 바랍니다!
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
                    <div className="hidden md:block w-[300px]">
                        <div className="sticky top-4 space-y-4">
                            <AdSlot
                                slot="2738626516"
                                format="rectangle"
                                wrapperClassName="md:rounded-lg md:overflow-hidden min-h-[250px]"
                                lazyLoad={true}
                            />
                            <div className="mb-6">
                                <ContentLinks
                                    title={<span className="flex items-center gap-1.5"><Globe size={16} className="text-blue-500" /> 연관 추천 콘텐츠</span>}
                                    items={[
                                        { href: '/blog/passport-name-guide', icon: <FileText className="text-blue-500" size={20} />, title: '여권 영문명 작성 가이드', desc: '공식 문서 작성법' },
                                        { href: '/blog/overseas-name-tips', icon: <Globe className="text-emerald-500" size={20} />, title: '해외 거주 영문명 사용법', desc: '문화적 차이 이해' }
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
