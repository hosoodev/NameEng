import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Briefcase,
  Mail,
  CreditCard,
  Users,
  Globe,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
  title: '국제 비즈니스에서의 영문명 에티켓 | NameEng 블로그',
  description: '글로벌 비즈니스 환경에서 전문적이고 효과적인 영문명 사용법과 명함, 이메일 서명 작성 가이드입니다.',
  keywords: ['비즈니스 영문명', '국제 비즈니스', '명함 작성법', '이메일 서명', '비즈니스 에티켓'],
};

export default function BusinessNameEtiquettePage() {
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
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                블로그 목록으로 돌아가기
              </Link>
              <div className="mb-4">
                <span className="inline-flex items-center rounded-sm bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-100">
                  비즈니스
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                국제 비즈니스에서의 영문명 에티켓
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>2024년 11월 28일</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>7분 읽기</span>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

              {/* 소개 */}
              <section className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                <h2 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Briefcase size={20} className="text-purple-600" />
                  첫인상이 결정하는 비즈니스 성공
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  글로벌 비즈니스에서 영문명은 단순한 호칭을 넘어 전문성과 신뢰도를 나타내는 중요한 요소입니다.
                  올바른 영문명 사용법과 비즈니스 에티켓을 통해 성공적인 국제 업무 관계를 구축해보세요.
                </p>
              </section>

              {/* 1. 비즈니스 영문명의 기본 원칙 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. 비즈니스 영문명의 기본 원칙
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">✨ 전문성 (Professionalism)</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">일관성:</strong> 모든 비즈니스 문서에서 동일한 이름 사용</li>
                      <li>• <strong className="font-semibold text-gray-900">정확성:</strong> 철자와 발음이 명확하고 정확해야 함</li>
                      <li>• <strong className="font-semibold text-gray-900">적절성:</strong> 비즈니스 환경에 적합한 격식 있는 표기</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🎯 기억용이성 (Memorability)</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">단순함:</strong> 복잡하지 않고 기억하기 쉬운 형태</li>
                      <li>• <strong className="font-semibold text-gray-900">발음 용이성:</strong> 국제적으로 발음하기 쉬운 구조</li>
                      <li>• <strong className="font-semibold text-gray-900">독특함:</strong> 다른 사람과 구별되는 특징</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🌍 국제성 (International Appeal)</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">문화적 중립성:</strong> 특정 문화권에서 부정적 의미 없음</li>
                      <li>• <strong className="font-semibold text-gray-900">범용성:</strong> 다양한 국가에서 통용 가능</li>
                      <li>• <strong className="font-semibold text-gray-900">현대성:</strong> 시대에 맞는 현대적 감각</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. 명함 작성 가이드 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. 명함 작성 가이드
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <CreditCard className="text-blue-600" size={18} />
                      명함 레이아웃 예시
                    </h3>

                    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4 text-sm text-gray-800">
                      <div className="font-bold text-lg mb-1 tracking-wider text-gray-900">JAMES MINJUN KIM</div>
                      <div className="text-xs text-gray-500 mb-3">김민준</div>
                      <div className="font-medium">Senior Marketing Manager</div>
                      <div className="text-xs text-gray-500 mb-3">Global Tech Solutions Inc.</div>
                      <div className="text-xs space-y-1">
                        <div>james.kim@company.com</div>
                        <div>+1-555-123-4567</div>
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-700 ml-1">
                      <li><strong className="font-semibold text-green-700">✅ 좋은 예:</strong> 영문명을 크게, 한글명을 작게 병기</li>
                      <li><strong className="font-semibold text-green-700">✅ 좋은 예:</strong> 미들네임으로 한국 이름 활용</li>
                      <li><strong className="font-semibold text-green-700">✅ 좋은 예:</strong> 직책과 회사명 명확히 표기</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">📋 명함 작성 체크리스트</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>□ 영문명이 여권/공식 문서와 일치하는가?</li>
                      <li>□ 한글명을 함께 표기했는가?</li>
                      <li>□ 직책이 정확하게 번역되었는가?</li>
                      <li>□ 연락처 정보가 국제 형식(국가번호 포함)인가?</li>
                      <li>□ 회사 로고와 디자인이 조화로운가?</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 이메일 서명 작성법 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. 이메일 서명 작성법
                </h2>

                <div className="space-y-4">
                  <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-sm font-bold text-green-900 mb-4 flex items-center gap-2">
                      <Mail className="text-green-600" size={18} />
                      전문적인 이메일 서명 예시
                    </h3>

                    <div className="bg-white rounded-lg p-5 border border-gray-200 font-mono text-sm shadow-sm space-y-1 text-gray-800">
                      <div>Best regards,</div>
                      <div className="pt-2"><strong className="text-gray-900 font-bold">James Minjun Kim</strong> (김민준)</div>
                      <div>Senior Marketing Manager</div>
                      <div className="pb-2">Global Tech Solutions Inc.</div>
                      <div>📧 james.kim@company.com</div>
                      <div>📱 +1-555-123-4567</div>
                      <div>🌐 www.company.com</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">💡 이메일 서명 팁</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">발음 가이드:</strong> 복잡한 이름의 경우 간단한 발음 표기 추가</li>
                      <li>• <strong className="font-semibold text-gray-900">시간대 표시:</strong> 국제 업무 시 현지 시간대 명시 (e.g., KST, GMT+9)</li>
                      <li>• <strong className="font-semibold text-gray-900">언어 표기:</strong> 구사 가능한 언어 간단히 표시 (수신자 편의)</li>
                      <li>• <strong className="font-semibold text-gray-900">소셜 링크:</strong> 전문적인 LinkedIn 프로필 연결</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. 화상회의 에티켓 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. 화상회의 에티켓
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="text-blue-500" size={18} />
                      화상회의에서의 이름 표시
                    </h3>

                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-bold text-green-700 mb-2">✅ 권장 표시 방법</h4>
                        <div className="bg-white rounded-md p-3 border border-gray-100 shadow-sm space-y-1">
                          <p>• James Kim (김민준)</p>
                          <p>• J. Kim | Marketing Manager</p>
                          <p>• James M. Kim - Seoul Office</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-red-600 mb-2">❌ 피해야 할 표시</h4>
                        <div className="bg-white rounded-md p-3 border border-gray-100 shadow-sm space-y-1">
                          <p>• 김민준 (영문 표기 없음)</p>
                          <p>• James (성씨 생략하여 누군지 파악 어려움)</p>
                          <p>• JamesKim (띄어쓰기 없이 붙여씀)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100">
                    <h3 className="text-sm font-bold text-indigo-900 mb-3">🎤 자기소개 스크립트</h3>
                    <div className="bg-white rounded-lg p-4 border border-indigo-50 text-sm font-medium text-gray-700 italic">
                      "Hello everyone, I am James Kim, you can call me James.
                      I am the Senior Marketing Manager from our Seoul office.
                      My Korean name is Minjun, but James works perfectly for our international meetings."
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 네트워킹 전략 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  5. 네트워킹 전략
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🤝 첫 만남 인상 관리</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">명확한 발음:</strong> 자신의 이름을 또렷하게 스피크</li>
                      <li>• <strong className="font-semibold text-gray-900">기억 도구:</strong> 이름과 관련된 연상법 (rhymes with ~)</li>
                      <li>• <strong className="font-semibold text-gray-900">상호 존중:</strong> 상대 이름도 정확히 부르려 노력</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">📱 디지털 네트워킹</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">LinkedIn:</strong> 영문명과 한글명 모두 표기</li>
                      <li>• <strong className="font-semibold text-gray-900">헤드라인:</strong> 이름과 함께 전문 분야 명시</li>
                      <li>• <strong className="font-semibold text-gray-900">개인화:</strong> 연결 요청시 개인화된 메시지 발송</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. 문화별 비즈니스 에티켓 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  6. 문화별 비즈니스 에티켓
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🌏 아시아 태평양</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">일본:</strong> 명함 교환 시 양손으로, 정중한 인사 우선</li>
                      <li>• <strong className="font-semibold text-gray-900">중국:</strong> 가급적 한자 본명 혹은 한자 병기 시 문화적 친밀감 증대</li>
                      <li>• <strong className="font-semibold text-gray-900">싱가포르:</strong> 다문화 환경이므로 영문명과 영어 소통 위주</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🌍 유럽</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">독일:</strong> 격식과 정확성 중시, 첫 대면시 직함과 풀네임 사용 선호</li>
                      <li>• <strong className="font-semibold text-gray-900">프랑스:</strong> 문화적 언어적 자존감 고려, 정중한 태도 및 성을 부르는 포멀함</li>
                      <li>• <strong className="font-semibold text-gray-900">영국:</strong> 전통적 예의와 점진적인 친밀감 형성 지향</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3">🌎 아메리카</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong className="font-semibold text-gray-900">미국:</strong> 캐주얼하지만 전문적 태도 유지, 퍼스트네임 혹은 닉네임 활발히 사용</li>
                      <li>• <strong className="font-semibold text-gray-900">남미:</strong> 친근감, 가벼운 포옹 등 개인적 스킨십 및 관계 중시 유연성</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 마무리 */}
              <section>
                <div className="bg-gray-100 text-gray-800 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">성공적인 글로벌 비즈니스를 위한 영문명 전략</h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    국제 비즈니스에서 영문명은 단순한 호칭을 넘어 개인 브랜드의 핵심 요소입니다.
                    일관성 있는 사용, 문화적 감수성, 그리고 전문적인 표현을 통해
                    글로벌 무대에서 성공적인 비즈니스 관계를 구축하세요.
                    기억하세요 - 좋은 첫인상은 성공적인 비즈니스의 시작입니다.
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
              <AdSlot slot="4812260682" format="rectangle" />
              <div className="mb-6">
                <ContentLinks
                  title={<span className="flex items-center gap-1.5"><Globe size={16} className="text-blue-500" /> 연관 추천 콘텐츠</span>}
                  items={[
                    { href: '/blog/overseas-name-tips', icon: <Globe className="text-emerald-500" size={20} />, title: '해외 거주 영문명 팁', desc: '다문화 이해와 영문명' },
                    { href: '/blog/negative-meaning-words', icon: <AlertTriangle className="text-amber-500" size={20} />, title: '금지 영문 표기어', desc: '영어권 부정적 의미' }
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