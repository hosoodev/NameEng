'use client';

import { useState } from 'react';
import { ArrowLeft, Calculator, Copy, Download, Zap } from 'lucide-react';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
const AD_SLOT_INFEED = "2738626516";

const surnameVariations: Record<string, string[]> = {
  '김': ['KIM', 'GEEM'],
  '이': ['LEE', 'YI', 'RHEE'],
  '박': ['PARK', 'PAK'],
  '최': ['CHOI', 'CHOE'],
  '정': ['JUNG', 'JEONG', 'CHUNG'],
  '강': ['KANG', 'GANG'],
  '조': ['CHO', 'JO'],
  '윤': ['YOON', 'YUN'],
  '장': ['JANG', 'CHANG'],
  '임': ['LIM', 'IM'],
  '한': ['HAN', 'HAHN'],
  '오': ['OH', 'O'],
  '서': ['SEO', 'SUH'],
  '신': ['SHIN', 'SIN'],
  '권': ['KWON', 'KWAN'],
  '황': ['HWANG', 'WHANG'],
  '안': ['AHN', 'AN'],
  '송': ['SONG', 'SOUNG'],
  '류': ['RYU', 'YOO', 'LYU'],
  '전': ['JEON', 'JUN', 'CHUN']
};

const nameStyles = [
  { id: 'combined', label: '붙여쓰기', example: 'Minjun' },
  { id: 'hyphenated', label: '하이픈', example: 'Min-jun' },
  { id: 'spaced', label: '띄어쓰기', example: 'Min jun' }
];



export default function NameGeneratorPage() {
  const [surname, setSurname] = useState('');
  const [givenName, setGivenName] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['combined']);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCombinations = () => {
    if (!surname || !givenName) return;

    const surnameOptions = surnameVariations[surname] || [surname.toUpperCase()];
    const combinations: string[] = [];

    surnameOptions.forEach(surnameVariation => {
      selectedStyles.forEach(style => {
        let formattedName = givenName;

        if (style === 'hyphenated' && givenName.length > 2) {
          // 간단한 하이픈 처리 (2글자씩 나누기)
          const mid = Math.ceil(givenName.length / 2);
          formattedName = givenName.slice(0, mid) + '-' + givenName.slice(mid);
        } else if (style === 'spaced' && givenName.length > 2) {
          // 간단한 띄어쓰기 처리
          const mid = Math.ceil(givenName.length / 2);
          formattedName = givenName.slice(0, mid) + ' ' + givenName.slice(mid);
        }

        // 첫 글자만 대문자로
        formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase();

        combinations.push(`${surnameVariation} ${formattedName}`);
      });
    });

    setResults(combinations);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadResults = () => {
    const content = results.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'english-name-combinations.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="md:grid md:grid-cols-[1fr_300px] gap-8">
          {/* Main Content Column */}
          <div className="w-full space-y-8">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <a href="/tools" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4">
                  <ArrowLeft size={16} />
                  <span>도구 목록으로 돌아가기</span>
                </a>

                <div className="flex flex-col gap-3">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 self-start">
                    영문명 도구
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calculator size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                      영문명 조합 생성기
                    </h1>
                  </div>
                  <p className="text-gray-500 text-lg">
                    다양한 성씨 표기와 이름 스타일을 조합하여 여러 가지 영문명 후보를 생성합니다.
                  </p>
                </div>
              </div>

              {/* Mobile Ad Slot */}
              <div className="block md:hidden border-t border-b border-gray-100 py-4 -mx-4">
                <AdSlot
                  slot={AD_SLOT_INFEED}
                  format="fluid"
                  wrapperClassName="md:rounded-lg md:overflow-hidden"
                  lazyLoad={true}
                />
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 입력 폼 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">이름 정보 입력</h2>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="surname-input" className="block text-sm font-medium text-gray-900 mb-2">
                        성씨 (한글)
                      </label>
                      <input
                        id="surname-input"
                        type="text"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-500 sm:text-base py-3 px-4 shadow-sm transition-colors"
                        placeholder="예: 김, 이, 박"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                      {surname && surnameVariations[surname] && (
                        <p className="mt-2 text-sm text-blue-600 font-medium">
                          사용 가능한 표기: {surnameVariations[surname].join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="givenName-input" className="block text-sm font-medium text-gray-900 mb-2">
                        이름 (영문 표기)
                      </label>
                      <input
                        id="givenName-input"
                        type="text"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-500 sm:text-base py-3 px-4 shadow-sm transition-colors"
                        placeholder="예: Minjun, Soyoung"
                        value={givenName}
                        onChange={(e) => setGivenName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        이름 스타일 선택
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {nameStyles.map(style => {
                          const isSelected = selectedStyles.includes(style.id);
                          return (
                            <button
                              key={style.id}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedStyles(selectedStyles.filter(s => s !== style.id));
                                } else {
                                  setSelectedStyles([...selectedStyles, style.id]);
                                }
                              }}
                              className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSelected
                                ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                              {style.label} ({style.example})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={generateCombinations}
                    disabled={!surname || !givenName || selectedStyles.length === 0}
                    className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-colors mt-2 ${!surname || !givenName || selectedStyles.length === 0
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                  >
                    <Calculator size={18} />
                    조합 생성하기
                  </button>
                </div>
              </div>

              {/* 결과 */}
              {results.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-3">
                      <h2 className="text-xl font-bold text-gray-900">생성된 영문명 조합 ({results.length}개)</h2>
                      <button
                        onClick={downloadResults}
                        className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <Download size={16} />
                        다운로드
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {results.map((name, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                          <span className="text-lg font-medium text-gray-900">{name}</span>
                          <button
                            onClick={() => copyToClipboard(name, index)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group"
                            title="복사하기"
                          >
                            {copiedIndex === index ? (
                              <span className="text-xs font-medium text-blue-600 animate-in fade-in zoom-in duration-300">복사됨</span>
                            ) : (
                              <Copy size={18} className="group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 사용 팁 */}
              <div className="bg-blue-50 rounded-2xl p-6 md:p-8 border border-blue-100 mt-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <Zap size={20} className="text-blue-500" />
                    사용 팁
                  </h2>
                  <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-blue-400 font-bold">✔️</span>
                      <span>여러 스타일을 선택하여 다양한 옵션을 확인해보세요.</span>
                    </li>
                    <li className="flex gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-blue-400 font-bold">✔️</span>
                      <span>생성된 조합 중에서 발음하기 쉽고 기억하기 좋은 것을 선택하세요.</span>
                    </li>
                    <li className="flex gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-blue-400 font-bold">✔️</span>
                      <span>공식 문서에 사용할 때는 일관성을 유지하는 것이 중요합니다.</span>
                    </li>
                    <li className="flex gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-blue-400 font-bold">✔️</span>
                      <span>복사 버튼을 클릭하여 원하는 조합을 쉽게 복사할 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <CommonSidebar type="tool" />
        </div>
      </main>

      <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
        <SiteFooter />
      </div>
    </div>
  );
}