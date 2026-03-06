import {
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  BookOpen,
  FileText,
  Globe,
  Briefcase,
  Search,
  Ruler
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
  title: '외교부 여권 로마자 표기 규정 - 영문이름변환기 가이드 | Nameeng 네이밍',
  description: '외교부 여권 발급 시 로마자 성명 표기에 대한 공식 규정을 정리했습니다. 여권 로마자 표기 변경, 관용 표기 허용, 주의사항 등 모든 정보를 확인하세요.',
  keywords: '여권 로마자 표기 규정, 외교부 여권 가이드, 로마자 성명 표기, 여권 발급 로마자, 관용 표기 허용, 여권 로마자 변경, 영문이름변환기 여권',
  openGraph: {
    title: '외교부 여권 로마자 표기 규정 - 영문이름변환기 가이드',
    description: '외교부 여권 발급 시 로마자 성명 표기에 대한 공식 규정을 정리했습니다. 여권 로마자 표기 변경, 관용 표기 허용, 주의사항 등 모든 정보를 확인하세요.',
    type: 'website',
    url: 'https://nameeng.com/passport-guide',
  },
  twitter: {
    card: 'summary',
    title: '외교부 여권 로마자 표기 규정 - 영문이름변환기 가이드',
    description: '외교부 여권 발급 시 로마자 성명 표기에 대한 공식 규정을 정리했습니다.',
  },
};

export default function PassportGuide() {
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
                외교부 여권 로마자 표기 규정
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                여권 발급 시 로마자 성명 표기에 대한 공식 규정을 알기 쉽게 정리했습니다.
              </p>
            </div>

            {/* 기본 원칙 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <CheckCircle size={24} className="text-green-600" />
                기본 표기 원칙
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">1. 표기 기준</h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-200">
                    • 가족관계등록부에 등록된 한글 성명을 기준으로 표기<br />
                    • 문화체육관광부장관이 정하여 고시하는 표기 방법 적용<br />
                    • 음절 단위로 음역(音譯)에 맞게 표기
                  </p>
                </div>

                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">2. 이름 표기 방식</h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-200">
                    • <strong>기본</strong>: 붙여 쓰기 (예: MINSU)<br />
                    • <strong>허용</strong>: 음절 사이 붙임표(-) 사용 (예: MIN-SU)<br />
                    • <strong>허용</strong>: 띄어 쓰기 (예: MIN SU)
                  </p>
                </div>

                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">3. 표기 제한 사항</h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-red-200">
                    • 존칭, 직함, 자격, 훈장, 세습 등을 나타내는 약어 표기 불가<br />
                    • CEO, DR, SIR, 1ST 등 특수 기호 및 단어 사용 불가<br />
                    • 세례명 등 호적상 이름 외의 추가 기입 불가
                  </p>
                </div>
              </div>
            </section>

            {/* 관용 표기 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                관용 표기 허용 조건
              </h2>

              <div className="space-y-6">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">허용 조건 (아래 중 하나라도 해당하는 경우)</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    • 기존에 이미 사용하던 로마자 표기가 있는 경우 (예: 기존 여권이 있는 경우)<br />
                    • 국립국어원 외래어 표기법 또는 용례에서 공식적으로 확인 가능한 경우<br />
                    • 실물 용례를 증빙서류로 제출하여 입증 가능한 경우
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl">
                  <span className="inline-flex items-center rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 mb-2">예시</span>
                  <p className="text-sm text-gray-700">
                    <strong>김(金) 씨의 경우</strong><br />
                    • <strong>표준</strong>: GIM<br />
                    • <strong>관용 허용</strong>: KIM (본인 또는 가족이 기존 신청시 사용했던 경우)
                  </p>
                </div>
              </div>
            </section>

            {/* 주의사항 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <AlertCircle size={24} className="text-amber-600" />
                중요 알림 및 주의사항
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl">
                  <span className="inline-flex items-center rounded-sm bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800 mb-3 border border-red-200">
                    주의
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">여권 재발급 시 변경 제한</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    여권을 재발급 받더라도 원칙적으로 이전과 <strong>동일한 로마자 표기를 유지</strong>해야 합니다.
                    법령(여권법 시행령)에서 예외적으로 허용하는 특수 사유가 아니면 변경 신청이 반려될 수 있습니다.
                    무리한 변경은 과거 방문했던 국가의 입국 심사에서 불이익을 초래할 수 있습니다.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl mt-4">
                  <span className="inline-flex items-center rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 mb-3 border border-amber-200">
                    참고
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">기존 비자(VISA) 사용 불가 유의</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    로마자 표기를 기어코 변경한 경우, <strong>기존에 발급받아 유효한 외국 사증(비자)은 원칙적으로 재사용이 불가능</strong>해집니다.
                    붙여쓰기 ↔ 띄어쓰기 ↔ 하이픈(-) 추가 등 사소해 보이는 변경에도 비자 효력이 상실될 위험이 높으므로 변경 신청 전 반드시 각국 대사관에 문의하십시오.
                  </p>
                </div>
              </div>
            </section>

            {/* 신청 절차 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                표기 변경 신청 방법
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">이름 표기 방식 변경 시</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    • 띄어쓰기 또는 하이픈(-) 추가 요청 시<br />
                    • 창구에 방문하여 <strong>'여권 로마자성명 변경 신청서'</strong>를 작성하여 제출해야만 심사 후 처리됩니다.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">관용 표기 신청 시</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    • 기존 사용 증명 서류 (학위증, 해외 체류증 등) 지참<br />
                    • 실물 용례가 있는 증빙서류 제출 필수 (단순 주장 불가)
                  </p>
                </div>
              </div>
            </section>

            {/* 문의처 및 공식 링크 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                문의처 및 공식 안내
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">외교부 여권과</h3>
                  <p className="text-sm text-gray-600">
                    • 평일 기준 09:00 - 18:00 (점심시간 제외)<br />
                    • 주말, 공휴일 민원 응대 불가
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">여권 민원 전담 상담(영사콜센터)</h3>
                  <p className="text-sm text-gray-600">
                    • <strong>02-3210-0404</strong><br />
                    • 국내외 통합 민원 안내
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600 mb-4">본 가이드는 공공목적으로 외교부 규정을 요약한 것입니다. 자세한 법령 원문은 아래 외교부 여권안내 홈페이지를 참조하세요.</p>
                <a href="https://www.passport.go.kr/home/kor/contents.do?menuPos=37" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  <ExternalLink size={16} />
                  외교부 공식 홈페이지 원문 가이드 보기
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="hidden md:block w-[300px]">
            <div className="sticky top-4 space-y-4">
              <AdSlot slot="4812260682" format="rectangle" />
              <div className="mb-6">
                <ContentLinks
                  title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 연관 가이드</span>}
                  items={[
                    { href: '/how-to-use', icon: <FileText className="text-emerald-500" size={20} />, title: 'NameEng 기초 사용법', desc: '서비스를 활용법과 꿀팁 알아보기' },
                    { href: '/romanization-guide', icon: <BookOpen className="text-indigo-500" size={20} />, title: '국어의 로마자 표기법 고시', desc: '국립국어원 2024 기준 최신 고시' },
                    { href: '/faq', icon: <Search className="text-blue-500" size={20} />, title: '비자/여권 FAQ', desc: '사용자들이 가장 많이 물어보는 여권 질문과 답변' }
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
