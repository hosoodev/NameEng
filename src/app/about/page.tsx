import {
  ArrowLeft,
  Target,
  ShieldCheck,
  Zap,
  Heart,
  Users,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Landmark,
  Baby,
  FileText,
  Globe,
  Search,
  Ruler,
  HelpCircle
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
  title: 'NameEng 소개 - 영문이름변환기 서비스 개요 | Nameeng 네이밍',
  description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다. 국어의 로마자 표기법 준수, 부정적 의미 필터링, 관용 표기 지원 등 모든 기능을 확인하세요.',
  keywords: 'NameEng 소개, 영문이름변환기 서비스, 한글 이름 로마자 변환, 국어의 로마자 표기법, 부정적 의미 필터링, 관용 성씨 표기, 여권 로마자 표기',
  openGraph: {
    title: 'NameEng 소개 - 영문이름변환기 서비스 개요',
    description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다. 국어의 로마자 표기법 준수, 부정적 의미 필터링, 관용 표기 지원 등 모든 기능을 확인하세요.',
    type: 'website',
    url: 'https://nameeng.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'NameEng 소개 - 영문이름변환기 서비스 개요',
    description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다.',
  },
};

export default function About() {
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
              <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                NameEng로 돌아가기
              </a>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                NameEng 소개
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다.
              </p>
            </div>

            {/* 서비스 목표 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Target size={24} className="text-blue-500" />
                서비스 목표
              </h2>

              <div className="space-y-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  NameEng는 한글 이름을 로마자로 변환할 때 발생할 수 있는 다양한 문제를 해결하기 위해 개발된 전문 서비스입니다.
                  단순한 변환을 넘어서 여권 발급, 해외 거주, 국제 업무 등 실제 상황에서 필요한 모든 요소를 고려합니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-blue-600" /> 정확성
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      국립국어원 표준 규정을 완벽히 준수하여 공식 문서에 사용 가능한 정확한 표기를 제공합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-green-50/50 rounded-xl border border-green-100/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600" /> 안전성
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      부정적 의미를 가진 영어 단어를 자동으로 감지하고 안전한 대안을 제시합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-purple-50/50 rounded-xl border border-purple-100/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Globe2 size={16} className="text-purple-600" /> 실용성
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      관용 표기, 여권 규정, 국제 표준까지 모든 실무적 요구사항을 반영합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-100/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-600" /> 편의성
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      직관적인 인터페이스로 누구나 쉽게 사용할 수 있으며, URL 공유로 결과를 간편하게 공유 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 주요 기능 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Zap size={24} className="text-amber-500" />
                주요 기능
              </h2>

              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200 mb-3">핵심 기능</span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">1. 정확한 로마자 변환</h3>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed pl-4 list-disc marker:text-gray-300">
                    <li>국립국어원 「국어의 로마자 표기법」 완벽 준수</li>
                    <li>음성 변화 및 발음 규칙 정확 반영</li>
                    <li>복성(남궁, 선우 등) 자동 인식 및 선택 옵션 제공</li>
                  </ul>
                </div>

                <div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 border border-green-200 mb-3">안전 기능</span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">2. 부정적 의미 필터링</h3>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed pl-4 list-disc marker:text-gray-300">
                    <li>영어권에서 부정적 의미를 가진 단어 자동 감지</li>
                    <li>실시간 경고 메시지 및 안전한 대안 제시</li>
                    <li>글로벌 환경에서 안전한 이름 사용 보장</li>
                  </ul>
                </div>

                <div>
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200 mb-3">맞춤 기능</span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">3. 다양한 표기 옵션</h3>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed pl-4 list-disc marker:text-gray-300">
                    <li>관용 성씨 표기 선택 (김→Kim/Gim, 이→Lee/I 등)</li>
                    <li>이름 순서 선택 (성-이름 / 이름-성)</li>
                    <li>하이픈 사용 옵션 (Kim Min-su / Kim Minsu)</li>
                    <li>대소문자 스타일 선택 (대문자/소문자/첫글자만)</li>
                  </ul>
                </div>

                <div>
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200 mb-3">편의 기능</span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">4. 사용자 편의 기능</h3>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed pl-4 list-disc marker:text-gray-300">
                    <li>원클릭 복사 기능</li>
                    <li>URL 공유 기능 (설정값 포함)</li>
                    <li>엔터키 변환 지원</li>
                    <li>모바일 최적화 반응형 디자인</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 기술적 특징 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Award size={24} className="text-indigo-500" />
                기술 스택 및 최적화
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">현대적 웹 기술 스택</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong>Next.js 15</strong> (최신 React 프레임워크 최적화),
                    <strong>TypeScript</strong> (타입 안전성),
                    <strong>Tailwind CSS</strong> (효율적 스타일링) 기반으로 빠르고 접근성 높은 UI를 제공합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">성능 최적화</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    정적 사이트(Static Generate) 배포, PWA 지원, 이미지/폰트 에셋 최적화를 통해 쾌적한 데스크탑 및 모바일 웹 경험을 보장합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 주요 사용 대상 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Users size={24} className="text-blue-600" />
                주요 사용 대상
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex gap-3">
                  <BookOpen size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">여권 발급 준비자</h3>
                    <p className="text-sm text-gray-600">여권 신청 시 정확한 로마자 표기가 필요한 모든 분들</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Globe2 size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">해외 거주/유학 준비자</h3>
                    <p className="text-sm text-gray-600">해외에서 사용할 안전하고 적절한 영문 이름이 필요한 분들</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Briefcase size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">국제 업무 종사자</h3>
                    <p className="text-sm text-gray-600">글로벌 비즈니스에서 전문적인 영문 이름 표기가 필요한 분들</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GraduationCap size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">학술/연구 분야 종사자</h3>
                    <p className="text-sm text-gray-600">논문 발표, 국제 학회 참가 시 표준 표기가 필요한 분들</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Landmark size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">공공기관 종사자</h3>
                    <p className="text-sm text-gray-600">공식 문서나 국제 업무에서 정확한 표기가 필요한 분들</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Baby size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">자녀 이름 고민 부모님</h3>
                    <p className="text-sm text-gray-600">글로벌 시대에 적합한 로마자 이름 표기를 고려하시는 부모님들</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 개발 철학 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Heart size={24} className="text-red-500" />
                개발 철학
              </h2>

              <div className="space-y-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  NameEng는 단순한 변환 도구를 넘어서, 한국인의 정체성을 존중하면서도
                  글로벌 환경에서 안전하고 효과적으로 소통할 수 있도록 돕는 것을 목표로 합니다.
                </p>

                <blockquote className="p-5 bg-gray-50 rounded-xl text-gray-700 italic">
                  "모든 한국인이 자신의 이름을 자랑스럽게, 그리고 안전하게 세계 어디서든 사용할 수 있도록 하는 것"
                  <footer className="mt-3 text-sm text-gray-500 font-medium not-italic">- NameEng 개발팀</footer>
                </blockquote>

                <p className="text-sm text-gray-600 leading-relaxed">
                  이러한 철학을 바탕으로 지속적인 개선과 업데이트를 통해
                  더 나은 서비스를 제공하기 위해 노력하고 있습니다.
                </p>
              </div>
            </section>

            {/* 연락처/피드백 */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm font-bold text-gray-900 mb-2">개선 제안 및 문의</p>
              <p className="text-sm text-gray-600 mb-6">
                더 나은 서비스를 위해 여러분의 의견을 기다립니다.<br />
                오류 신고, 새로운 기능 요청 등 자유롭게 피드백을 전달해 주세요.
              </p>
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} NameEng. 한국어 이름의 정확한 로마자 표기를 위한 서비스입니다.
              </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <CommonSidebar
            customLinks={[
              { href: '/how-to-use', icon: <HelpCircle className="text-blue-500" size={20} />, title: '이용 가이드', desc: '서비스 백배 활용하기' },
              { href: '/tools/name-generator', icon: <Sparkles className="text-purple-500" size={20} />, title: 'AI 이름 생성기', desc: '트렌디한 영문명 추천' }
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
