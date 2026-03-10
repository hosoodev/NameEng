import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import { Search, FileText, Briefcase } from 'lucide-react';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

export const metadata: Metadata = {
  title: '국어의 로마자 표기법 규칙 상세 해설 | NameEng 블로그',
  description: '국립국어원의 로마자 표기법 규칙을 실제 예시와 함께 쉽게 이해할 수 있도록 상세히 설명합니다.',
  keywords: ['로마자 표기법', '국립국어원', '한글 로마자 변환', '표기법 규칙', '언어학'],
};

export default function RomanizationRulesPage() {
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
                <span className="inline-flex items-center rounded-sm bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
                  언어학
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                국어의 로마자 표기법 규칙 상세 해설
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>2024년 11월 20일</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>15분 읽기</span>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-10">

              {/* 소개 */}
              <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" />
                  정확한 로마자 표기의 중요성
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  2000년에 제정된 국어의 로마자 표기법은 한국어를 로마자로 표기하는 공식 기준입니다.
                  이 규칙을 정확히 이해하면 일관되고 표준적인 영문명을 만들 수 있습니다.
                  복잡해 보이는 규칙들을 실제 예시와 함께 쉽게 풀어보겠습니다.
                </p>
              </section>

              {/* 1. 기본 원칙 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. 로마자 표기법의 기본 원칙
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="text-blue-600" size={18} />
                      핵심 원칙 3가지
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-800">
                      <li>• <strong className="font-semibold">음성 중심:</strong> 한글의 실제 발음을 기준으로 표기</li>
                      <li>• <strong className="font-semibold">어법 존중:</strong> 한국어의 음성 변화 규칙 반영</li>
                      <li>• <strong className="font-semibold">국제성:</strong> 외국인이 발음하기 쉽도록 고려</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">📝 표기 순서</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>한글을 소리 나는 대로 적되</li>
                      <li>음성 변화는 표기에 반영하고</li>
                      <li>체언은 단독형으로 적는다</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* 2. 자음 표기법 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. 자음 표기법
                </h2>

                <div className="bg-white border text-sm text-gray-700 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">기본 자음 대응표</h3>

                  <div className="divide-y divide-gray-200">
                    <div className="flex p-3 bg-gray-100 font-medium text-gray-900">
                      <div className="w-16">한글</div>
                      <div className="w-20">로마자</div>
                      <div className="flex-1">예시</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㄱ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">g</div>
                      <div className="flex-1">가방 → gabang</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㄴ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">n</div>
                      <div className="flex-1">나무 → namu</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㄷ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">d</div>
                      <div className="flex-1">다리 → dari</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㄹ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">r</div>
                      <div className="flex-1">라면 → ramyeon</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅁ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">m</div>
                      <div className="flex-1">마음 → maeum</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅂ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">b</div>
                      <div className="flex-1">바다 → bada</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅅ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">s</div>
                      <div className="flex-1">사람 → saram</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors bg-amber-50/50">
                      <div className="w-16 font-semibold">ㅇ</div>
                      <div className="w-20 text-amber-600 font-mono text-sm">-</div>
                      <div className="flex-1">아이 → ai (초성일 때는 표기하지 않음)</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅈ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">j</div>
                      <div className="flex-1">자동차 → jadongcha</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅊ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">ch</div>
                      <div className="flex-1">차례 → charye</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅋ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">k</div>
                      <div className="flex-1">코끼리 → kokkiri</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅌ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">t</div>
                      <div className="flex-1">타자기 → tajagi</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅍ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">p</div>
                      <div className="flex-1">파도 → pado</div>
                    </div>

                    <div className="flex p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 font-semibold">ㅎ</div>
                      <div className="w-20 text-blue-600 font-mono text-sm">h</div>
                      <div className="flex-1">하늘 → haneul</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 모음 표기법 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. 모음 표기법
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4">단모음</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅏ → a</div>
                        <div className="text-xs text-gray-500">아버지 → abeoji</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅓ → eo</div>
                        <div className="text-xs text-gray-500">어머니 → eomeoni</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅗ → o</div>
                        <div className="text-xs text-gray-500">오늘 → oneul</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅜ → u</div>
                        <div className="text-xs text-gray-500">우리 → uri</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅡ → eu</div>
                        <div className="text-xs text-gray-500">은행 → eunhaeng</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅣ → i</div>
                        <div className="text-xs text-gray-500">이름 → ireum</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅐ → ae</div>
                        <div className="text-xs text-gray-500">개구리 → gaeguri</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100 text-center shadow-sm">
                        <div className="font-bold text-gray-900 mb-1">ㅔ → e</div>
                        <div className="text-xs text-gray-500">세상 → sesang</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4">복합모음</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅑ → ya</div>
                        <div className="text-xs text-gray-600">야구 → yagu</div>
                      </div>
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅕ → yeo</div>
                        <div className="text-xs text-gray-600">여행 → yeohaeng</div>
                      </div>
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅛ → yo</div>
                        <div className="text-xs text-gray-600">요리 → yori</div>
                      </div>
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅠ → yu</div>
                        <div className="text-xs text-gray-600">유명 → yumyeong</div>
                      </div>
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅘ → wa</div>
                        <div className="text-xs text-gray-600">과일 → gwail</div>
                      </div>
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center shadow-sm">
                        <div className="font-bold text-blue-900 mb-1">ㅝ → wo</div>
                        <div className="text-xs text-gray-600">권투 → gwontu</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. 받침 표기법 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. 받침 표기법
                </h2>

                <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="text-orange-600" size={18} />
                    받침의 특별 규칙
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    받침은 뒤에 오는 소리에 따라 표기가 달라집니다. 발음되는 소리를 기준으로 적는 것이 원칙입니다.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">1. 자음 앞이나 어말에서 (기본 받침소리 7개로 실현)</h4>
                      <div className="bg-white rounded-lg p-4 border border-orange-100 text-sm text-gray-700 space-y-1">
                        <p>• ㄱ, ㅋ, ㄲ → <strong className="font-bold">k</strong>: 국가 → gukga, 부엌 → bueok</p>
                        <p>• ㄴ → <strong className="font-bold">n</strong>: 산길 → sangil, 눈 → nun</p>
                        <p>• ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ → <strong className="font-bold">t</strong>: 밭 → bat, 낮 → nat</p>
                        <p>• ㄹ → <strong className="font-bold">l</strong>: 달 → dal, 물 → mul</p>
                        <p>• ㅁ → <strong className="font-bold">m</strong>: 감사 → gamsa, 봄 → bom</p>
                        <p>• ㅂ, ㅍ → <strong className="font-bold">p</strong>: 입구 → ipgu, 앞 → ap</p>
                        <p className="bg-amber-50 inline-block px-1 rounded">• ㅇ → <strong className="font-bold">ng</strong>: 강물 → gangmul, 방 → bang (받침일 때는 종성 ng로 표기)</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">2. 모음 앞에서</h4>
                      <div className="bg-white rounded-lg p-4 border border-orange-100 text-sm text-gray-700">
                        <p>• 받침이 뒤 음절 첫소리로 이어져 발음될 경우 연음대로 표기: 국어 → gugeo, 밥알 → babal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 인명 표기 특례 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  5. 인명 표기의 특별 규칙
                </h2>

                <div className="bg-green-50/50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={18} />
                    성씨와 이름 표기
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">성씨 표기 원칙</h4>
                      <div className="bg-white rounded-lg p-4 border border-green-100 text-sm text-gray-700 space-y-1">
                        <p>• 김 → <strong className="font-semibold">Gim</strong> (표준) / <strong className="font-semibold">Kim</strong> (관용 통용)</p>
                        <p>• 이 → <strong className="font-semibold">I</strong> (표준) / <strong className="font-semibold">Lee</strong> (관용 통용)</p>
                        <p>• 박 → <strong className="font-semibold">Bak</strong> (표준) / <strong className="font-semibold">Park</strong> (관용 통용)</p>
                        <p>• 최 → <strong className="font-semibold">Choe</strong> (표준) / <strong className="font-semibold">Choi</strong> (관용 통용)</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">이름 표기 방식 (규정에 따른 이름 표기는 붙여 쓰는 것이 원칙)</h4>
                      <div className="bg-white rounded-lg p-4 border border-green-100 text-sm text-gray-700 space-y-1">
                        <p>• 붙여쓰기 (원칙): 민준 → <strong className="font-semibold">Minjun</strong></p>
                        <p>• 하이픈 (허용): 민준 → <strong className="font-semibold">Min-jun</strong> (음절 구분이 필요할 때)</p>
                        <p className="text-red-500">• 띄어쓰기: 민준 → Min jun <strong className="font-bold">(권장하지 않음, 미들네임으로 오해될 수 있음)</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 마무리 */}
              <section>
                <div className="bg-gray-100 text-gray-800 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">정확한 표기법으로 더 나은 소통을</h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    로마자 표기법은 복잡해 보이지만, 기본 원칙을 이해하면 누구나 정확한 표기를 할 수 있습니다.
                    표준 표기와 관용 표기 중 자신의 상황에 맞는 것을 선택하되,
                    일관성을 유지하는 것이 가장 중요합니다.
                    NameEng는 이러한 규칙들을 자동으로 적용하여 정확하고 일관된 영문명을 제공합니다.
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
              { href: '/tools/name-checker', icon: <Search className="text-blue-500" size={20} />, title: '영문명 적합성 검사', desc: '나의 영문명 디자인 분석' },
              { href: '/blog/passport-name-guide', icon: <FileText className="text-emerald-500" size={20} />, title: '여권 영문명 가이드', desc: '올바른 로마자 표기법' },
              { href: '/passport-guide', icon: <Briefcase className="text-indigo-500" size={20} />, title: '여권 발급 공식 규정', desc: '외교부 최신 로마자 규정' }
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