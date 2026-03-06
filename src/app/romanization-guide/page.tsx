import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Info,
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
  title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드 | Nameeng 네이밍',
  description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다. 자음 표기법, 모음 표기법, 표기 세칙, 인명 표기 특례 등 모든 규정을 확인하세요.',
  keywords: '국어의 로마자 표기법, 국립국어원 로마자 표기, 한국어 로마자 변환 규정, 자음 표기법, 모음 표기법, 인명 로마자 표기, 영문이름변환기 규정',
  openGraph: {
    title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드',
    description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다. 자음 표기법, 모음 표기법, 표기 세칙, 인명 표기 특례 등 모든 규정을 확인하세요.',
    type: 'website',
    url: 'https://nameeng.com/romanization-guide',
  },
  twitter: {
    card: 'summary',
    title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드',
    description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다.',
  },
};

export default function RomanizationGuide() {
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
                국어의 로마자 표기법
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                국립국어원에서 제정한 한국어 로마자 표기 공식 규정 요약 안내입니다.
              </p>
            </div>

            {/* 개요 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <BookOpen size={24} className="text-blue-600" />
                표기법 개요
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="px-4 py-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">제정 배경</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    • 한국어의 로마자 표기를 통일하여 국제적 소통을 원활하게 함<br />
                    • 한국어의 음성적 특징을 정확히 반영<br />
                    • 국제적으로 통용되는 표기 체계 확립
                  </p>
                </div>
                <div className="px-4 py-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">적용 범위</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    • 인명, 지명의 로마자 표기<br />
                    • 공공기관, 단체명의 로마자 표기<br />
                    • 각종 증명서, 학술 자료, 여권 표기 기준
                  </p>
                </div>
              </div>
            </section>

            {/* 자음 표기법 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                자음 표기법
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-2">기본 자음</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-y border-gray-200 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">한글</th>
                        <th className="px-4 py-3 text-left font-bold border-x border-gray-200">로마자</th>
                        <th className="px-4 py-3 text-left font-bold">예시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄱ</td>
                        <td className="px-4 py-2 border-x border-gray-100">g, k</td>
                        <td className="px-4 py-2">가방 → gabang, 악기 → akgi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄴ</td>
                        <td className="px-4 py-2 border-x border-gray-100">n</td>
                        <td className="px-4 py-2">나무 → namu</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄷ</td>
                        <td className="px-4 py-2 border-x border-gray-100">d, t</td>
                        <td className="px-4 py-2">다리 → dari, 맏이 → maji</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄹ</td>
                        <td className="px-4 py-2 border-x border-gray-100">r, l</td>
                        <td className="px-4 py-2">라디오 → radio, 설날 → seolnal</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅁ</td>
                        <td className="px-4 py-2 border-x border-gray-100">m</td>
                        <td className="px-4 py-2">마음 → maeum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅂ</td>
                        <td className="px-4 py-2 border-x border-gray-100">b, p</td>
                        <td className="px-4 py-2">바람 → baram, 밥 → bap</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅅ</td>
                        <td className="px-4 py-2 border-x border-gray-100">s</td>
                        <td className="px-4 py-2">사람 → saram</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅇ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ng</td>
                        <td className="px-4 py-2">강물 → gangmul</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅈ</td>
                        <td className="px-4 py-2 border-x border-gray-100">j</td>
                        <td className="px-4 py-2">자동차 → jadongcha</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅊ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ch</td>
                        <td className="px-4 py-2">차례 → charye</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅋ</td>
                        <td className="px-4 py-2 border-x border-gray-100">k</td>
                        <td className="px-4 py-2">코끼리 → kokkiri</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅌ</td>
                        <td className="px-4 py-2 border-x border-gray-100">t</td>
                        <td className="px-4 py-2">타자기 → tajagi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅍ</td>
                        <td className="px-4 py-2 border-x border-gray-100">p</td>
                        <td className="px-4 py-2">파도 → pado</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅎ</td>
                        <td className="px-4 py-2 border-x border-gray-100">h</td>
                        <td className="px-4 py-2">하늘 → haneul</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-2">된소리 (경음)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-600 border-collapse border-b border-gray-200">
                    <thead className="bg-gray-50 border-y border-gray-200 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">한글</th>
                        <th className="px-4 py-3 text-left font-bold border-x border-gray-200">로마자</th>
                        <th className="px-4 py-3 text-left font-bold">예시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄲ</td>
                        <td className="px-4 py-2 border-x border-gray-100">kk</td>
                        <td className="px-4 py-2">깍지 → kkakji</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㄸ</td>
                        <td className="px-4 py-2 border-x border-gray-100">tt</td>
                        <td className="px-4 py-2">딸기 → ttalgi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅃ</td>
                        <td className="px-4 py-2 border-x border-gray-100">pp</td>
                        <td className="px-4 py-2">뿌리 → ppuri</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅆ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ss</td>
                        <td className="px-4 py-2">씨앗 → ssiat</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅉ</td>
                        <td className="px-4 py-2 border-x border-gray-100">jj</td>
                        <td className="px-4 py-2">짜장면 → jjajangmyeon</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 모음 표기법 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                모음 표기법
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-2">단모음</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-y border-gray-200 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">한글</th>
                        <th className="px-4 py-3 text-left font-bold border-x border-gray-200">로마자</th>
                        <th className="px-4 py-3 text-left font-bold">예시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅏ</td>
                        <td className="px-4 py-2 border-x border-gray-100">a</td>
                        <td className="px-4 py-2">아버지 → abeoji</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅓ</td>
                        <td className="px-4 py-2 border-x border-gray-100">eo</td>
                        <td className="px-4 py-2">어머니 → eomeoni</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅗ</td>
                        <td className="px-4 py-2 border-x border-gray-100">o</td>
                        <td className="px-4 py-2">오늘 → oneul</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅜ</td>
                        <td className="px-4 py-2 border-x border-gray-100">u</td>
                        <td className="px-4 py-2">우리 → uri</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅡ</td>
                        <td className="px-4 py-2 border-x border-gray-100">eu</td>
                        <td className="px-4 py-2">으뜸 → eutteum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅣ</td>
                        <td className="px-4 py-2 border-x border-gray-100">i</td>
                        <td className="px-4 py-2">이름 → ireum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅐ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ae</td>
                        <td className="px-4 py-2">개나리 → gaenari</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅔ</td>
                        <td className="px-4 py-2 border-x border-gray-100">e</td>
                        <td className="px-4 py-2">게시판 → gesipan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-2">복합모음</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-600 border-collapse border-b border-gray-200">
                    <thead className="bg-gray-50 border-y border-gray-200 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">한글</th>
                        <th className="px-4 py-3 text-left font-bold border-x border-gray-200">로마자</th>
                        <th className="px-4 py-3 text-left font-bold">예시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅑ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ya</td>
                        <td className="px-4 py-2">야구 → yagu</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅕ</td>
                        <td className="px-4 py-2 border-x border-gray-100">yeo</td>
                        <td className="px-4 py-2">여름 → yeoreum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅛ</td>
                        <td className="px-4 py-2 border-x border-gray-100">yo</td>
                        <td className="px-4 py-2">요리 → yori</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅠ</td>
                        <td className="px-4 py-2 border-x border-gray-100">yu</td>
                        <td className="px-4 py-2">유치원 → yuchiwon</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅒ</td>
                        <td className="px-4 py-2 border-x border-gray-100">yae</td>
                        <td className="px-4 py-2">얘기 → yaegi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅖ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ye</td>
                        <td className="px-4 py-2">예의 → yeui</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅘ</td>
                        <td className="px-4 py-2 border-x border-gray-100">wa</td>
                        <td className="px-4 py-2">과자 → gwaja</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅙ</td>
                        <td className="px-4 py-2 border-x border-gray-100">wae</td>
                        <td className="px-4 py-2">왜냐하면 → waenyahamyeon</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅚ</td>
                        <td className="px-4 py-2 border-x border-gray-100">oe</td>
                        <td className="px-4 py-2">외국 → oeguk</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅝ</td>
                        <td className="px-4 py-2 border-x border-gray-100">wo</td>
                        <td className="px-4 py-2">원숭이 → wonsungi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅞ</td>
                        <td className="px-4 py-2 border-x border-gray-100">we</td>
                        <td className="px-4 py-2">웨딩드레스 → wedingdeureseu</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅟ</td>
                        <td className="px-4 py-2 border-x border-gray-100">wi</td>
                        <td className="px-4 py-2">위험 → wiheom</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold bg-gray-50/50">ㅢ</td>
                        <td className="px-4 py-2 border-x border-gray-100">ui</td>
                        <td className="px-4 py-2">의사 → uisa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 표기 세칙 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                표기 세칙 요약
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">1. 음성 변화 반영</h3>
                  <p className="text-sm text-gray-600">한국어의 실제 발음에 따라 표기 (자음동화 등 적용). 예: 맏이 → maji</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">2. 어간과 어미 구분</h3>
                  <p className="text-sm text-gray-600">용언의 어간과 어미를 구분하여 표기. 예: 먹어 → meogeo</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">3. 고유명사 표기</h3>
                  <p className="text-sm text-gray-600">인명은 성과 이름을 띄어 쓰되 이름은 붙여 씀. 예: 김민수 → Kim Minsu</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">4. ㅇ의 표기</h3>
                  <p className="text-sm text-gray-600">어두의 ㅇ은 무음이므로 표기 안함 (아→a), 어중/어말은 ng 표기 (강→gang)</p>
                </div>
              </div>
            </section>

            {/* 인명 표기 특례 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                <Info size={24} className="text-amber-600" />
                인명 표기 특례
              </h2>

              <div className="space-y-5">
                <div className="border-l-4 border-amber-400 pl-4 py-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">관용 표기 허용</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    이미 널리 사용되고 있는 로마자 표기는 허용됩니다.<br />
                    예: 이승만 → Lee Syngman (표준 I Seungman), 김대중 → Kim Dae-jung
                  </p>
                </div>

                <div className="border-l-4 border-gray-200 pl-4 py-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">이름의 하이픈 사용</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    이름의 음절 사이에 하이픈(-)을 사용할 수 있습니다. 선택은 자유입니다.<br />
                    예: 김민수 → Kim Min-su 또는 Kim Minsu
                  </p>
                </div>

                <div className="border-l-4 border-gray-200 pl-4 py-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">성씨 특별 표기</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    일부 성씨는 관용적 표기가 널리 굳어져 많이 쓰입니다.<br />
                    예: 이 → Lee(관용) / I(표준), 박 → Park(관용) / Bak(표준)
                  </p>
                </div>
              </div>
            </section>

            {/* 출처 및 링크 */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm font-bold text-gray-900 mb-2">공식 출처</p>
              <p className="text-sm text-gray-600 mb-6">
                본 내용은 국립국어원에서 제정한 「국어의 로마자 표기법」을 정리한 것입니다.
              </p>

              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <a href="https://korean.go.kr/kornorms/regltn/regltnView.do?regltn_code=0004#a820" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
                  <ExternalLink size={16} /> 원문 공식 문서 보기
                </a>
              </div>

              <p className="text-xs text-gray-400">
                문화체육관광부 고시 제2014-42호 (2014.12.5.) 기준<br />
                최종 업데이트: {new Date().toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden md:block w-[300px]">
            <div className="sticky top-4 space-y-4">
              <AdSlot slot="2738626516" format="rectangle" />
              <div className="mb-6">
                <ContentLinks
                  title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 연관 가이드</span>}
                  items={[
                    { href: '/how-to-use', icon: <FileText className="text-emerald-500" size={20} />, title: 'NameEng 기초 사용법', desc: '서비스를 활용법과 꿀팁 알아보기' },
                    { href: '/passport-guide', icon: <Briefcase className="text-indigo-500" size={20} />, title: '여권 로마자 표기 규정', desc: '외교부 여권 발급 공식 가이드' },
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
