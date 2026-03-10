import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';
import { Search, FileText, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: '해외 거주 시 영문명 사용 팁과 주의사항 | NameEng 블로그',
  description: '해외에서 생활할 때 영문명을 효과적으로 사용하는 방법과 문화적 차이를 고려한 실용적인 조언을 제공합니다.',
  keywords: ['해외거주', '영문명 사용법', '문화차이', '해외생활 팁', '국제 커뮤니케이션'],
};

export default function OverseasNameTipsPage() {
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
                <span className="inline-flex items-center rounded-sm bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                  해외생활
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                해외 거주 시 영문명 사용 팁과 주의사항
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>2024년 12월 5일</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>10분 읽기</span>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

              {/* 소개 */}
              <section className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                <h2 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <Globe size={20} className="text-emerald-600" />
                  해외에서의 이름, 단순한 호칭 이상의 의미
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  해외에서 생활할 때 영문명은 단순한 호칭을 넘어 첫인상, 사회적 관계, 심지어 취업 기회에까지 영향을 미칠 수 있습니다.
                  문화적 차이를 이해하고 전략적으로 영문명을 사용하는 방법을 알아보겠습니다.
                </p>
              </section>

              {/* 1. 지역별 문화적 특성 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. 지역별 문화적 특성 이해하기
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🇺🇸 미국</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li>• <strong className="font-semibold text-gray-900">다양성 존중:</strong> 다문화 사회로 외국 이름에 대한 수용도가 높음</li>
                      <li>• <strong className="font-semibold text-gray-900">발음 중시:</strong> 발음하기 쉬운 이름을 선호하는 경향</li>
                      <li>• <strong className="font-semibold text-gray-900">닉네임 문화:</strong> 긴 이름을 줄여서 부르는 것이 일반적</li>
                    </ul>
                    <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100">
                      <strong className="font-bold">💡 팁:</strong> Kim Minjun → MJ, Min 등의 닉네임 준비
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🇬🇧 영국</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">전통 중시:</strong> 클래식한 영어 이름에 대한 선호</li>
                      <li>• <strong className="font-semibold text-gray-900">정중함:</strong> 이름 발음을 정확히 하려고 노력하는 문화</li>
                      <li>• <strong className="font-semibold text-gray-900">격식:</strong> 비즈니스에서는 풀네임 사용이 일반적</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🇦🇺 호주</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">캐주얼함:</strong> 친근하고 편안한 분위기</li>
                      <li>• <strong className="font-semibold text-gray-900">줄임말 선호:</strong> 거의 모든 이름을 줄여서 부름</li>
                      <li>• <strong className="font-semibold text-gray-900">다문화 친화적:</strong> 아시아 이름에 대한 높은 수용도</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. 상황별 직장 영문명 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. 상황별 영문명 사용 전략
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Users className="text-blue-600" size={18} />
                      직장에서
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">이메일 서명:</strong> 한국 이름과 영문명을 모두 표기</li>
                      <li>• <strong className="font-semibold text-gray-900">명함:</strong> 양면 활용 (한쪽은 영문, 한쪽은 한글)</li>
                      <li>• <strong className="font-semibold text-gray-900">회의:</strong> 자기소개 시 발음 가이드 제공</li>
                      <li>• <strong className="font-semibold text-gray-900">네트워킹:</strong> 기억하기 쉬운 닉네임 활용</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">🏫 학교에서</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong className="font-semibold text-gray-900">등록:</strong> 공식 문서는 여권명과 일치시키기</li>
                        <li>• <strong className="font-semibold text-gray-900">일상:</strong> 친구들이 부르기 쉬운 별명 사용</li>
                        <li>• <strong className="font-semibold text-gray-900">교수님께:</strong> 정중하게 선호하는 호칭 안내</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">🏥 공공기관에서</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong className="font-semibold text-gray-900">병원:</strong> 여권명 사용으로 의료기록 일치</li>
                        <li>• <strong className="font-semibold text-gray-900">은행:</strong> 공식 문서와 동일한 이름 사용</li>
                        <li>• <strong className="font-semibold text-gray-900">관공서:</strong> 법적 문서는 반드시 여권명</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 흔한 실수와 해결책 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. 흔한 실수와 해결책
                </h2>

                <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-sm font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-orange-600" size={18} />
                    자주 발생하는 문제들
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-100">
                      <div className="flex gap-2 items-center mb-1">
                        <span className="text-red-500 font-bold text-sm">❌ 문제</span>
                        <span className="text-sm font-medium text-gray-900">여러 버전의 이름 사용</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 pl-6">공식 문서마다 다른 영문명 사용으로 인한 혼란</p>
                      <div className="flex gap-2 items-start pl-6">
                        <span className="text-green-500 font-bold text-sm">✅ 해결</span>
                        <span className="text-sm text-gray-700 font-medium">주요 문서는 하나의 이름으로 통일</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-100">
                      <div className="flex gap-2 items-center mb-1">
                        <span className="text-red-500 font-bold text-sm">❌ 문제</span>
                        <span className="text-sm font-medium text-gray-900">발음 설명 부족</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 pl-6">이름 발음을 제대로 안내하지 않아 계속 잘못 불림</p>
                      <div className="flex gap-2 items-start pl-6">
                        <span className="text-green-500 font-bold text-sm">✅ 해결</span>
                        <span className="text-sm text-gray-700 font-medium">간단한 발음 가이드 준비 (It rhymes with...)</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-100">
                      <div className="flex gap-2 items-center mb-1">
                        <span className="text-red-500 font-bold text-sm">❌ 문제</span>
                        <span className="text-sm font-medium text-gray-900">문화적 맥락 무시</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 pl-6">현지 문화를 고려하지 않은 이름 사용</p>
                      <div className="flex gap-2 items-start pl-6">
                        <span className="text-green-500 font-bold text-sm">✅ 해결</span>
                        <span className="text-sm text-gray-700 font-medium">현지인에게 조언 구하기, 부정적 의미인지 사전 검토</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. 실용적 팁들 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. 실용적인 팁들
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={18} />
                      발음 가이드 만들기
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      영어권 사람들이 이해하기 쉬운 발음 설명을 준비하세요:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-gray-100 space-y-2 text-sm text-gray-700 shadow-sm">
                      <p>• 김민준 → &ldquo;Kim Min-jun, like <strong>'mean June'</strong>&rdquo;</p>
                      <p>• 이소영 → &ldquo;Lee So-young, like <strong>'so young'</strong>&rdquo;</p>
                      <p>• 박지훈 → &ldquo;Park Ji-hoon, like <strong>'gee who'</strong>&rdquo;</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">📱 디지털 시대 팁</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong className="font-semibold text-gray-900">소셜미디어:</strong> 프로필에 발음 표기 추가</li>
                        <li>• <strong className="font-semibold text-gray-900">화상회의:</strong> 이름 표시 기능 적극 활용</li>
                        <li>• <strong className="font-semibold text-gray-900">이메일:</strong> 서명에 발음 가이드 포함</li>
                        <li>• <strong className="font-semibold text-gray-900">연락처:</strong> 친구들 폰에 발음 메모 추가 요청</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">🤝 관계 형성 전략</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong className="font-semibold text-gray-900">첫 만남:</strong> 이름의 의미나 유래 간단히 설명</li>
                        <li>• <strong className="font-semibold text-gray-900">친밀감 형성:</strong> 상대방도 이름 발음 도와주기</li>
                        <li>• <strong className="font-semibold text-gray-900">문화 교류:</strong> 한국 이름 문화 소개하기</li>
                        <li>• <strong className="font-semibold text-gray-900">유머 활용:</strong> 이름 관련 재미있는 에피소드 공유</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 법적 고려사항 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  5. 법적 고려사항
                </h2>

                <div className="bg-red-50/50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" size={18} />
                    중요한 법적 사항들
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li>• <strong className="font-semibold text-gray-900">비자 신청:</strong> 여권명과 정확히 일치해야 함</li>
                    <li>• <strong className="font-semibold text-gray-900">은행 계좌:</strong> 신분증명서와 동일한 이름 필요</li>
                    <li>• <strong className="font-semibold text-gray-900">보험 가입:</strong> 공식 문서명 사용 필수</li>
                    <li>• <strong className="font-semibold text-gray-900">계약서:</strong> 법적 효력을 위해 여권명 사용</li>
                    <li>• <strong className="font-semibold text-gray-900">세금 신고:</strong> 정부 기록과 일치하는 이름 사용</li>
                  </ul>
                </div>
              </section>

              {/* 마무리 */}
              <section>
                <div className="bg-gray-100 text-gray-800 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">성공적인 해외 생활을 위한 이름 전략</h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    해외에서의 영문명 사용은 단순히 이름을 바꾸는 것이 아니라,
                    새로운 문화에 적응하면서도 자신의 정체성을 유지하는 균형잡기입니다.
                    상황에 맞는 유연한 접근과 현지 문화에 대한 이해를 바탕으로
                    자신만의 이름 사용 전략을 만들어보세요.
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
              { href: '/blog/business-name-etiquette', icon: <Briefcase className="text-indigo-500" size={20} />, title: '비즈니스 영문명 매너', desc: '국제 비즈니스 명함 에티켓' },
              { href: '/passport-guide', icon: <CheckCircle className="text-emerald-500" size={20} />, title: '여권 영문명 가이드', desc: '외교부 여권 발급 공식' }
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