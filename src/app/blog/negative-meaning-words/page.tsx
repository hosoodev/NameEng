import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle
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
  title: '영어권에서 피해야 할 한국 이름 표기들 | NameEng 블로그',
  description: '한글 이름을 로마자로 변환할 때 영어권에서 부정적 의미를 가질 수 있는 표기들과 안전한 대안을 소개합니다.',
  keywords: ['부정적 의미', '영문명 주의사항', '안전한 표기', '영어권 문화', '이름 변환 주의점'],
};

export default function NegativeMeaningWordsPage() {
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
                <span className="inline-flex items-center rounded-sm bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 border border-red-100">
                  안전가이드
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                영어권에서 피해야 할 한국 이름 표기들
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>2024년 11월 15일</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>9분 읽기</span>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

              {/* 소개 */}
              <section className="bg-orange-50 border border-orange-100 rounded-xl p-6">
                <h2 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-orange-600" />
                  문화적 차이를 고려한 안전한 영문명
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  한글 이름을 로마자로 변환할 때, 의도치 않게 영어권에서 부정적이거나 부적절한 의미를 가질 수 있습니다.
                  이런 문제를 미리 파악하고 적절한 대안을 선택하여 불필요한 오해나 불편함을 피해보세요.
                </p>
              </section>

              {/* 1. 왜 중요한가? */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. 왜 이런 주의가 필요할까요?
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      🌍 실제 경험담들
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 해외 취업 면접에서 이름 때문에 어색한 분위기가 된 경우</li>
                      <li>• 학교에서 친구들이 이름을 부르기 꺼려하는 상황</li>
                      <li>• 비즈니스 미팅에서 이름 소개 시 웃음이 나오는 경우</li>
                      <li>• 호텔이나 레스토랑 예약 시 곤란한 상황</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">💡 해결의 중요성</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">첫인상:</strong> 이름은 첫 만남에서 가장 먼저 전달되는 정보</li>
                      <li>• <strong className="font-semibold text-gray-900">전문성:</strong> 비즈니스 환경에서의 신뢰도에 영향</li>
                      <li>• <strong className="font-semibold text-gray-900">사회적 관계:</strong> 원활한 인간관계 형성에 도움</li>
                      <li>• <strong className="font-semibold text-gray-900">자신감:</strong> 당당하게 자신을 소개할 수 있는 자신감</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. 주의해야 할 표기들 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. 주의해야 할 표기 유형들
                </h2>

                <div className="space-y-4">
                  <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                    <h3 className="text-sm font-bold text-red-900 mb-4 flex items-center gap-2">
                      <XCircle className="text-red-600" size={18} />
                      부적절한 의미를 가진 단어들
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2">욕설이나 비속어와 유사한 경우</h4>
                        <div className="bg-white rounded-lg p-4 border border-red-50 text-sm text-gray-700 space-y-1">
                          <p>• Hell, Damn, Ass 등과 유사한 발음</p>
                          <p>• 성적 함의가 있는 단어들과 유사한 경우</p>
                          <p>• 종교적으로 민감한 표현들</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2">부정적 의미의 일반 단어들</h4>
                        <div className="bg-white rounded-lg p-4 border border-red-50 text-sm text-gray-700 space-y-1">
                          <p>• Sick, Die, Kill, Hate 등</p>
                          <p>• Stupid, Ugly, Bad 등</p>
                          <p>• 질병이나 부정적 상태를 나타내는 단어들</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">😅 우스꽝스럽게 들릴 수 있는 경우</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 동물 이름과 유사: Pig, Dog, Cat 등</li>
                      <li>• 음식 이름과 유사: Ham, Cheese, Bean 등</li>
                      <li>• 일상용품과 유사: Pen, Cup, Bag 등</li>
                      <li>• 유명 브랜드나 캐릭터와 동일</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 구체적인 예시와 대안 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. 구체적인 예시와 대안
                </h2>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">📝 실제 사례별 해결책</h3>

                    <div className="space-y-4">
                      {/* 사례 1 */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-red-500 font-bold text-sm">❌ 문제 소지</span>
                          <span className="text-sm font-medium text-gray-900">석진 → Seokjin</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 pl-6">↳ &ldquo;Suck Jin&rdquo;으로 들릴 수 있음</p>

                        <div className="flex gap-2 items-start">
                          <span className="text-green-500 font-bold text-sm">✅ 안전 대안</span>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• <strong className="font-semibold">Seok-jin</strong> (하이픈 사용으로 음절 분리)</li>
                            <li>• <strong className="font-semibold">Sukjin</strong> (다른 모음 발음 표기)</li>
                            <li>• <strong className="font-semibold">Jin</strong> (이름 일부분 사용)</li>
                          </ul>
                        </div>
                      </div>

                      {/* 사례 2 */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-red-500 font-bold text-sm">❌ 문제 소지</span>
                          <span className="text-sm font-medium text-gray-900">지옥 → Jiok</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 pl-6">↳ &ldquo;지옥(Hell)&rdquo;과 비슷한 발음/느낌이나 다른 언어에서의 부정적 의미</p>

                        <div className="flex gap-2 items-start">
                          <span className="text-green-500 font-bold text-sm">✅ 안전 대안</span>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• <strong className="font-semibold">Ji-ok</strong> (하이픈으로 구분)</li>
                            <li>• <strong className="font-semibold">Jiuk</strong> (다른 발음 표기 채택)</li>
                            <li>• 부르기 쉬운 영문 이름(English Name) 채택 고려</li>
                          </ul>
                        </div>
                      </div>

                      {/* 사례 3 */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-red-500 font-bold text-sm">❌ 문제 소지</span>
                          <span className="text-sm font-medium text-gray-900">병신 → Byeongsin</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 pl-6">↳ &ldquo;Sin(죄)&rdquo; 부정적 의미 띔 / 한국어에서의 욕설 발음</p>

                        <div className="flex gap-2 items-start">
                          <span className="text-green-500 font-bold text-sm">✅ 안전 대안</span>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• <strong className="font-semibold">Byeong-shin</strong> (Shin으로 표기 변경)</li>
                            <li>• <strong className="font-semibold">Ben</strong> (약어 또는 영문명 채택)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. 예방 전략 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. 문제 예방 전략
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="text-blue-600" size={18} />
                      사전 검토 방법
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">1. 영어 사전 검색</h4>
                        <p className="text-sm text-gray-600">변환된 영문명을 스펠링대로 영어 사전에서 검색해보세요</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">2. 원어민 친구에게 문의</h4>
                        <p className="text-sm text-gray-600">영어권 친구나 동료에게 어떻게 들리는지 물어보세요</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">3. 온라인 발음 도구 활용</h4>
                        <p className="text-sm text-gray-600">구글 번역기의 읽어주기 기능(TTS) 등으로 실제 영어권 발음을 들어보세요</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">4. 문화적 맥락 고려</h4>
                        <p className="text-sm text-gray-600">거주하거나 주로 활동할 지역의 문화적 특성을 고려하세요</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      🛡️ 안전한 표기 원칙
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold">하이픈 활용:</strong> 음절을 명확히 구분하여 다른 단어로 오해 방지</li>
                      <li>• <strong className="font-semibold">대체 표기:</strong> 같은 소리를 내는 다른 로마자 조합 고려</li>
                      <li>• <strong className="font-semibold">부분 사용:</strong> 성(Family Name)을 먼저 부르거나 이름의 일부만 사용</li>
                      <li>• <strong className="font-semibold">영문명 채택:</strong> 필요시 부르기 편한 글로벌 영문명(English Name) 만들기</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 5. NameEng의 안전 기능 */}
              <section>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                  <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <Shield className="text-emerald-600" size={20} />
                    NameEng의 실시간 안전 검사 기능
                  </h3>
                  <p className="text-sm text-emerald-800 mb-4">
                    NameEng에서는 로마자 변환 시 자동으로 영어권에서 오해의 소지가 있는 부정적 단어, 비속어를 필터링하고 안전한 대안을 제시해줍니다.
                  </p>

                  <a href="/tools/name-checker" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors text-sm">
                    영문명 안전 검사기 사용해보기
                  </a>
                </div>
              </section>

              {/* 마무리 */}
              <section>
                <div className="bg-gray-900 text-gray-100 rounded-xl p-6 border border-gray-900">
                  <h2 className="text-lg font-bold text-white mb-3">안전하고 자신감 있는 영문명으로</h2>
                  <p className="text-base text-gray-300 leading-relaxed">
                    영문명 선택 시 문화적 차이를 고려하는 것은 단순한 주의사항이 아니라
                    성공적인 국제적 소통을 위한 필수 요소입니다.
                    사전에 충분히 검토하고 적절한 대안을 선택하여
                    어떤 상황에서도 당당하게 자신을 소개할 수 있는 영문명을 만들어보세요.
                    작은 주의가 큰 차이를 만들어낼 수 있습니다.
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
              { href: '/blog/business-name-etiquette', icon: <CheckCircle className="text-indigo-500" size={20} />, title: '비즈니스 영문명 에티켓', desc: '이름 소개시 매너' },
              { href: '/blog/overseas-name-tips', icon: <Shield className="text-emerald-500" size={20} />, title: '해외 거주 영문명 팁', desc: '문화적 차이 이해하기' }
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