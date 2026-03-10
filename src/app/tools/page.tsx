import {
  ArrowLeft,
  Calculator,
  Volume2,
  CheckCircle,
  Users,
  ArrowRight,
  Zap,
  BarChart3
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import CommonSidebar from '@/components/layout/CommonSidebar';

export const metadata: Metadata = {
  title: '유용한 도구툴 - 영문명 관련 추가 도구 | NameEng',
  description: '영문명 조합 생성기, 발음 가이드, 영문명 적합성 검사기 등 한국 이름의 로마자 표기와 관련된 다양한 유용한 도구들을 제공합니다.',
  keywords: '영문명 생성기, 발음 가이드, 이름 적합성 검사, 로마자 표기 도구, 한글 이름 변환 도구',
};

const AD_SLOT_INFEED = "2738626516";

const tools = [
  {
    id: 'surname-frequency',
    title: '성씨 로마자 표기 통계 검색',
    description: '한국의 다양한 성씨들이 실제로 여권 등에 어떤 영문 표기로 가장 많이 사용되는지 통계 데이터를 시각적으로 확인해 보세요.',
    icon: <BarChart3 size={24} />,
    color: 'blue',
    status: '사용 가능',
    features: ['여권 데이터 기반', '가장 많이 쓰는 표기', '로마자 표기법 기준']
  },
  {
    id: 'name-generator',
    title: '영문명 조합 생성기',
    description: '다양한 성씨 표기와 이름 옵션을 조합하여 여러 가지 영문명 후보를 한 번에 생성합니다.',
    icon: <Calculator size={24} />,
    color: 'blue',
    status: '사용 가능',
    features: ['다중 성씨 표기', '옵션별 조합', '일괄 생성']
  },
  {
    id: 'pronunciation-guide',
    title: '영문명 발음 가이드',
    description: '생성된 영문명이 영어권에서 어떻게 발음되는지 음성으로 들어보고 발음 기호를 확인할 수 있습니다.',
    icon: <Volume2 size={24} />,
    color: 'green',
    status: '준비 중',
    features: ['음성 재생', '발음 기호', '발음 팁']
  },
  {
    id: 'name-checker',
    title: '영문명 적합성 검사기',
    description: '기존에 사용 중인 영문명이나 고려 중인 영문명의 적합성을 종합적으로 분석하고 개선점을 제안합니다.',
    icon: <CheckCircle size={24} />,
    color: 'purple',
    status: '사용 가능',
    features: ['부정적 의미 검사', '발음 통용성', '국제 통용성']
  },
  {
    id: 'popular-names',
    title: '인기 영문명 통계',
    description: '한국인이 가장 많이 사용하는 영문명 통계와 트렌드를 확인하고 참고할 수 있습니다.',
    icon: <Users size={24} />,
    color: 'amber',
    status: '준비 중',
    features: ['사용 빈도', '연도별 트렌드', '지역별 선호도']
  }
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="md:grid md:grid-cols-[1fr_300px] gap-8">
          {/* Main Content Column */}
          <div className="w-full space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                <span>NameEng로 돌아가기</span>
              </a>

              <div className="mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                  유용한 도구툴
                </h1>
                <p className="text-gray-500 text-lg">
                  영문명 작성과 관련된 다양한 추가 도구들을 제공합니다.
                </p>
              </div>
            </div>

            {/* Mobile Ad Slot */}
            <div className="block md:hidden -mx-4">
              <AdSlot
                slot={AD_SLOT_INFEED}
                format="fluid"
                lazyLoad={true}
              />
            </div>

            {/* 도구 목록 */}
            <div className="space-y-6">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                      ${tool.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                      ${tool.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                      ${tool.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                      ${tool.color === 'amber' ? 'bg-amber-100 text-amber-600' : ''}
                    `}>
                      {tool.icon}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-gray-900">
                          {tool.title}
                        </h2>
                        {tool.status === '사용 가능' ? (
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 self-start sm:self-auto">
                            {tool.status}
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 self-start sm:self-auto">
                            {tool.status}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 leading-relaxed text-base">
                        {tool.description}
                      </p>

                      <div>
                        <span className="block text-sm font-medium text-gray-900 mb-2">
                          주요 기능:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tool.features.map((feature) => (
                            <span key={feature} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        {tool.status === '사용 가능' ? (
                          <a
                            href={`/tools/${tool.id}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            사용하기
                            <ArrowRight size={16} />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-400 font-medium text-sm rounded-lg cursor-not-allowed border border-gray-200"
                          >
                            준비 중
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 추가 정보 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={24} className="text-amber-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  더 많은 도구가 추가될 예정입니다.
                </h3>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                사용자들의 피드백을 바탕으로 더욱 유용한 도구들을 지속적으로 개발하고 있습니다.
                필요한 기능이나 개선사항이 있으시면 언제든지 제안해 주세요.
              </p>

              <div className="bg-blue-50/50 rounded-xl p-5 md:p-6 border border-blue-100">
                <span className="block text-sm font-bold text-blue-900 mb-3">
                  🛠 추가 개발 예정 도구
                </span>
                <ul className="space-y-2 text-gray-700 sm:columns-2">
                  <li className="flex items-center gap-2"><span className="text-blue-400">✔️</span> 영문명 유사도 검사기</li>
                  <li className="flex items-center gap-2"><span className="text-blue-400">✔️</span> 국가별 이름 규정 가이드</li>
                  <li className="flex items-center gap-2"><span className="text-blue-400">✔️</span> 영문명 변경 이력 관리</li>
                  <li className="flex items-center gap-2"><span className="text-blue-400">✔️</span> AI 기반 맞춤 영문명 추천</li>
                </ul>
              </div>
            </div>

            {/* 기본 변환기로 돌아가기 */}
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                기본적인 한글 이름 변환이 필요하신가요?
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                NameEng 변환기 사용하기
              </a>
            </div>

          </div>

          {/* Sidebar Column */}
          <CommonSidebar />
        </div>
      </main>

      <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
        <SiteFooter />
      </div>
    </div>
  );
}