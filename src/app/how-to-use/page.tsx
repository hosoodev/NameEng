import {
  ArrowLeft,
  Play,
  Settings,
  Copy,
  Share2,
  AlertTriangle,
  CheckCircle,
  Keyboard,
  BookOpen,
  FileText,
  Globe,
  Briefcase,
  Search,
  Ruler
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
  title: '이용방법 가이드 - 영문이름변환기 사용법 | Nameeng 네이밍',
  description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다. 한글 이름 입력부터 복성 선택, 성씨 표기 선택, 옵션 설정까지 모든 기능을 쉽게 배워보세요.',
  keywords: '영문이름변환기 사용법, NameEng 이용방법, 한글 이름 로마자 변환 가이드, 복성 선택 방법, 성씨 표기 선택, 로마자 변환 옵션 설정',
  openGraph: {
    title: '이용방법 가이드 - 영문이름변환기 사용법',
    description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다. 한글 이름 입력부터 복성 선택, 성씨 표기 선택, 옵션 설정까지 모든 기능을 쉽게 배워보세요.',
    type: 'website',
    url: 'https://nameeng.com/how-to-use',
  },
  twitter: {
    card: 'summary',
    title: '이용방법 가이드 - 영문이름변환기 사용법',
    description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다.',
  },
};

export default function HowToUse() {
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
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                NameEng로 돌아가기
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                이용방법 가이드
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                NameEng를 효과적으로 활용하는 방법을 단계별로 안내합니다.
              </p>
            </div>

            {/* 빠른 시작 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Play size={24} className="text-green-600" />
                빠른 시작
              </h2>

              <div className="space-y-6">
                <p className="text-base text-gray-700">
                  가장 기본적인 사용법을 30초만에 익혀보세요!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl text-center">
                    <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_2px_10px_rgba(37,99,235,0.2)]">1</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">이름 입력</h3>
                    <p className="text-xs text-gray-600">한글 이름을 입력하세요</p>
                  </div>

                  <div className="p-4 bg-green-50/50 border border-green-100/50 rounded-xl text-center">
                    <div className="w-8 h-8 bg-green-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_2px_10px_rgba(22,163,74,0.2)]">2</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">변환하기</h3>
                    <p className="text-xs text-gray-600">Enter키나 버튼 클릭</p>
                  </div>

                  <div className="p-4 bg-purple-50/50 border border-purple-100/50 rounded-xl text-center">
                    <div className="w-8 h-8 bg-purple-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_2px_10px_rgba(147,51,234,0.2)]">3</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">결과 확인</h3>
                    <p className="text-xs text-gray-600">로마자 변환 결과 확인</p>
                  </div>

                  <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl text-center">
                    <div className="w-8 h-8 bg-amber-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_2px_10px_rgba(217,119,6,0.2)]">4</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">복사 & 활용</h3>
                    <p className="text-xs text-gray-600">결과 복사 후 사용</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 items-start">
                  <span className="text-xl">💡</span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">예시: "김민수" 입력 → "Kim Minsu" 출력</h3>
                    <p className="text-sm text-gray-600">추가 옵션 없이도 바로 표준 로마자 표기를 얻을 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 상세 사용법 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Settings size={24} className="text-blue-600" />
                상세 사용법
              </h2>

              <div className="space-y-10">
                {/* 이름 입력 */}
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200 mb-3">Step 1</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">한글 이름 입력</h3>

                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">✅ 올바른 입력 예시</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        • 김민수, 이영희, 박지성<br />
                        • 남궁민수, 선우용녀 (복성 포함)<br />
                        • 최민, 이준 (외자 이름 포함)
                      </p>
                    </div>

                    <div className="p-4 bg-red-50/50 border border-red-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">❌ 피해야 할 입력</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        • 영어나 숫자 포함 (Kim민수, 이영희2)<br />
                        • 특수문자 포함 (김-민수, 이*영희)<br />
                        • 공백 포함 (김 민수, 이 영희)
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                      <Keyboard size={20} className="text-amber-600 shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>팁:</strong> 입력 후 <kbd className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-mono shadow-sm">Enter</kbd> 키를 누르면 바로 변환됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 복성 선택 */}
                <div>
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200 mb-3">Step 2</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">복성 선택 (해당하는 경우)</h3>

                  <p className="text-sm text-gray-600 mb-4">
                    남궁, 선우, 사공, 제갈, 독고 등의 복성이 감지되면 선택 옵션이 나타납니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50/50 border border-purple-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">복성 선택 시</h4>
                      <p className="text-sm text-gray-600">
                        선우용녀 → <strong>Seonu</strong> Yongnyeo<br />
                        <span className="text-gray-500 text-xs mt-1 block">(선우를 하나의 성씨로 인식)</span>
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50/50 border border-gray-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">단성 선택 시</h4>
                      <p className="text-sm text-gray-600">
                        선우용녀 → <strong>Seon</strong> Uyongnyeo<br />
                        <span className="text-gray-500 text-xs mt-1 block">(선만을 성씨로 인식)</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 성씨 표기 선택 */}
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 border border-green-200 mb-3">Step 3</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">성씨 표기 선택</h3>

                  <p className="text-sm text-gray-600 mb-4">
                    각 성씨마다 여러 표기 옵션이 제공됩니다. 첫 번째가 표준 표기이며,
                    관용적으로 사용되는 다른 표기들도 선택할 수 있습니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50/50 border border-green-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">김(金) 씨</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Kim (관용) | Gim (표준)<br />
                        Keem | Ghim | Kym
                      </p>
                    </div>

                    <div className="p-4 bg-green-50/50 border border-green-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">이(李) 씨</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Lee (관용) | I (표준)<br />
                        Rhee | Yi | Yee
                      </p>
                    </div>

                    <div className="p-4 bg-green-50/50 border border-green-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">박(朴) 씨</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Park (관용) | Bak (표준)<br />
                        Bark | Pack | Pag
                      </p>
                    </div>
                  </div>
                </div>

                {/* 기타 옵션 */}
                <div>
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200 mb-3">Step 4</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">추가 옵션 설정</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">📝 이름 순서</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          • <strong>성-이름</strong>: Kim Minsu (기본)<br />
                          • <strong>이름-성</strong>: Minsu Kim
                        </p>
                      </div>

                      <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">🔤 대소문자 스타일</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          • <strong>첫 글자 대문자</strong>: Kim Minsu<br />
                          • <strong>소문자</strong>: kim minsu<br />
                          • <strong>대문자</strong>: KIM MINSU
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">➖ 이름 음절 구분 (하이픈)</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        • <strong>사용 안함</strong>: Kim Minsu<br />
                        • <strong>사용함</strong>: Kim Min-su (이름 음절 사이에 하이픈 추가)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 결과 활용법 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <CheckCircle size={24} className="text-green-600" />
                결과 활용법
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50/50 border border-green-100/50 rounded-xl">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                      <Copy size={16} className="text-green-600" /> 복사 기능
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      변환된 결과를 클릭 한 번으로 클립보드에 복사하여 다른 문서나 카카오톡에 바로 붙여넣기할 수 있습니다.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                      <Share2 size={16} className="text-blue-600" /> 공유 기능
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      설정된 옵션값을 포함해 결과를 URL로 생성합니다. 다른 사람의 확인을 받거나 기록해둘 때 매우 유용합니다.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl mt-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                    <AlertTriangle size={16} className="text-yellow-600" /> 부정적 의미 경고 알림
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    만약 로마자 표기가 해외(영어권)에서 놀림의 대상이 되거나 부정적 의미를 가질 수 있다면 시스템이 자동으로 경고를 띄웁니다. 이 경우 함께 제공되는 대체 표기(Safe Alternative)를 선택하시면 안전합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 실용적 팁 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                💡 실용적 팁
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">1. 여권 발급 시</h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-200">
                    • 표준 표기를 기본으로 하되, 기존에 사용하던 가족 관용 표기가 있다면 일치시키는 것이 좋습니다.<br />
                    • 이름 사이 하이픈(-)은 꼭 필요할 때만 신중히 고려하세요.<br />
                    • 여권청 직원의 안내를 최종적으로 따르는 것을 권장합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">2. 해외 거주 및 비즈니스</h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-200">
                    • 부정적 의미 경고를 결코 무시하지 마십시오. 비즈니스 이메일에서 오해를 살 수 있습니다.<br />
                    • 국제 학회 논문, 회사 이메일, 명함 등에서는 자신이 한 번 정한 표기를 평생 일관성 있게 동일하게 사용해야 합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 추가 도움말 */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm font-bold text-gray-900 mb-4">질문이 더 있으신가요?</p>

              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <Link href="/faq" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  자주 묻는 질문
                </Link>
                <Link href="/romanization-guide" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  로마자 표기법 기준
                </Link>
              </div>

              <p className="text-xs text-gray-400">
                원하는 결과를 위해 편하게 여러 번 테스트해보세요.
              </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden md:block w-[300px]">
            <div className="sticky top-4 space-y-4">
              <AdSlot slot="4812260682" format="rectangle" />
              <div className="mb-6">
                <ContentLinks
                  title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 유용한 가이드</span>}
                  items={[
                    { href: '/blog/passport-name-guide', icon: <FileText className="text-blue-500" size={20} />, title: '여권 발급 시 영문명 작성법', desc: '여권 신청 시 주의사항과 실제 사례' },
                    { href: '/blog/overseas-name-tips', icon: <Globe className="text-emerald-500" size={20} />, title: '해외 거주 시 영문명 사용 팁', desc: '문화적 차이를 고려한 실용적인 조언' },
                    { href: '/blog/business-name-etiquette', icon: <Briefcase className="text-slate-500" size={20} />, title: '국제 비즈니스 영문명 에티켓', desc: '전문적인 영문명 사용법과 명함 작성 가이드' }
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
