'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  BookOpen,
  FileText,
  Globe,
  Briefcase,
  Search,
  Ruler
} from 'lucide-react';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CommonSidebar from '@/components/layout/CommonSidebar';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

interface CheckResult {
  category: string;
  score: number;
  status: 'good' | 'warning' | 'error';
  message: string;
  suggestions?: string[];
}

const problematicWords = [
  'hell', 'damn', 'shit', 'fuck', 'ass', 'bitch', 'dick', 'cock', 'piss',
  'devil', 'satan', 'nazi', 'hitler', 'isis', 'kill', 'die', 'death', 'dead'
];

const difficultPronunciations = [
  'th', 'zh', 'tsch', 'sch', 'pf', 'kn', 'gn', 'wr'
];

export default function NameCheckerPage() {
  const [inputName, setInputName] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeName = async () => {
    if (!inputName.trim()) return;

    setIsAnalyzing(true);

    // 시뮬레이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 1200));

    const name = inputName.trim().toLowerCase();
    const checkResults: CheckResult[] = [];

    // 1. 부정적 의미 검사
    const hasProblematicWord = problematicWords.some(word => name.includes(word));
    checkResults.push({
      category: '부정적 의미 검사',
      score: hasProblematicWord ? 0 : 100,
      status: hasProblematicWord ? 'error' : 'good',
      message: hasProblematicWord
        ? '부정적이거나 부적절한 의미를 포함할 수 있습니다'
        : '부정적 의미가 발견되지 않았습니다',
      suggestions: hasProblematicWord ? ['다른 철자나 발음을 고려해보세요'] : undefined
    });

    // 2. 발음 난이도 검사
    const hasDifficultPronunciation = difficultPronunciations.some(pattern => name.includes(pattern));
    const length = name.replace(/\s/g, '').length;
    let pronunciationScore = 100;

    if (hasDifficultPronunciation) pronunciationScore -= 30;
    if (length > 12) pronunciationScore -= 20;
    if (length < 3) pronunciationScore -= 40;

    checkResults.push({
      category: '발음 난이도',
      score: Math.max(0, pronunciationScore),
      status: pronunciationScore >= 80 ? 'good' : pronunciationScore >= 60 ? 'warning' : 'error',
      message: pronunciationScore >= 80
        ? '발음하기 쉬운 이름입니다'
        : pronunciationScore >= 60
          ? '보통 수준의 발음 난이도입니다'
          : '발음하기 어려울 수 있습니다',
      suggestions: pronunciationScore < 80 ? [
        '더 짧고 간단한 철자를 고려해보세요',
        '일반적인 영어 발음 패턴을 사용해보세요'
      ] : undefined
    });

    // 3. 국제 통용성 검사
    const hasCommonPattern = /^[A-Z][a-z]+ [A-Z][a-z-]+$/.test(inputName.trim());
    const hasSpecialChars = /[^a-zA-Z\s-]/.test(inputName);

    let internationalScore = 100;
    if (!hasCommonPattern) internationalScore -= 20;
    if (hasSpecialChars) internationalScore -= 40;
    if (name.includes('  ')) internationalScore -= 10; // 연속 공백

    checkResults.push({
      category: '국제 통용성',
      score: Math.max(0, internationalScore),
      status: internationalScore >= 80 ? 'good' : internationalScore >= 60 ? 'warning' : 'error',
      message: internationalScore >= 80
        ? '국제적으로 통용되기 좋은 형태입니다'
        : internationalScore >= 60
          ? '일부 개선이 필요할 수 있습니다'
          : '국제 표준에 맞지 않는 부분이 있습니다',
      suggestions: internationalScore < 80 ? [
        '성은 대문자로, 이름은 첫 글자만 대문자로 작성하세요',
        '특수문자나 숫자는 사용하지 마세요',
        '적절한 띄어쓰기를 사용하세요'
      ] : undefined
    });

    // 4. 길이 적합성 검사
    const totalLength = name.replace(/\s/g, '').length;
    let lengthScore = 100;

    if (totalLength < 4) lengthScore = 40;
    else if (totalLength > 20) lengthScore = 60;
    else if (totalLength > 15) lengthScore = 80;

    checkResults.push({
      category: '길이 적합성',
      score: lengthScore,
      status: lengthScore >= 80 ? 'good' : lengthScore >= 60 ? 'warning' : 'error',
      message: lengthScore >= 80
        ? '적절한 길이입니다'
        : lengthScore >= 60
          ? '조금 긴 편이지만 사용 가능합니다'
          : totalLength < 4 ? '너무 짧습니다' : '너무 깁니다',
      suggestions: lengthScore < 80 ? [
        totalLength < 4 ? '더 긴 이름을 고려해보세요' : '더 짧은 이름을 고려해보세요'
      ] : undefined
    });

    const avgScore = Math.round(checkResults.reduce((sum, result) => sum + result.score, 0) / checkResults.length);

    setResults(checkResults);
    setOverallScore(avgScore);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
      case 'error': return <XCircle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

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
              <a href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                도구 목록으로 돌아가기
              </a>
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                  영문명 도구
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                영문명 적합성 검사기
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                나의 영문명 디자인이 국제 표준에 적응하는지 종합적으로 분석하고 개선점을 제안합니다.
              </p>
            </div>

            {/* 입력 폼 */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                영문명 입력
              </h2>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label htmlFor="name-input" className="block text-sm font-bold text-gray-900 mb-2">
                    검사할 영문명을 입력하세요
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="예: KIM Minjun, PARK So-young"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputName.trim() && !isAnalyzing) {
                        analyzeName();
                      }
                    }}
                    className="w-full text-lg p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-shadow transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    성과 이름을 모두 포함하여 띄어쓰기를 곁들여 입력해주세요.
                  </p>
                </div>

                <button
                  onClick={analyzeName}
                  disabled={!inputName.trim() || isAnalyzing}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      분석 중...
                    </>
                  ) : (
                    '적합성 검사 시작'
                  )}
                </button>
              </div>
            </section>

            {/* 검사 결과 */}
            {results.length > 0 && (
              <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 종합 점수 */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                    검사 종합 평가 점수
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
                    <div className="text-5xl font-extrabold text-gray-900 mb-2">
                      {overallScore}<span className="text-2xl text-gray-500 font-normal">/100</span>
                    </div>
                    <p className={`font-bold mt-2 ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                      {overallScore >= 80 ? '우수한 영문명 디자인입니다!' :
                        overallScore >= 60 ? '양호한 영문명이지만 개선 요소가 식별되었습니다.' :
                          '국제 사용을 위해 개선이 권장되는 영문명입니다.'}
                    </p>
                    <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mt-5 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${getScoreBarColor(overallScore)}`} style={{ width: `${overallScore}%` }}></div>
                    </div>
                  </div>
                </section>

                {/* 상세 결과 */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-6">
                    상세 분석 지표
                  </h2>

                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            <h3 className="text-base font-bold text-gray-900">{result.category}</h3>
                          </div>
                          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-bold rounded-full border ${getScoreColor(result.score)}`}>
                            {result.score}점
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {result.message}
                        </p>

                        {result.suggestions && (
                          <div className="bg-gray-100/50 rounded-lg p-4 mt-2">
                            <p className="text-xs font-bold text-gray-900 mb-2">💡 개선 고려: 제안 및 권고사항</p>
                            <ul className="list-disc pl-4 space-y-1.5">
                              {result.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="text-xs text-gray-600">
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* 검사 기준 안내 */}
            <section className="bg-blue-50 rounded-2xl border border-blue-100 p-6 md:p-8 mb-8">
              <h2 className="text-base font-bold flex items-center gap-2 text-blue-900 mb-4">
                <Info size={20} className="text-blue-600" />
                적합성 검사 알고리즘 기준 안내
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-blue-800"><strong className="font-bold">부정적 의미 검사:</strong> 부적절하거나 부정적인 의미를 가진 영단어 포함 여부 스캔</p>
                <p className="text-sm text-blue-800"><strong className="font-bold">발음 난이도:</strong> 영어권 네이티브 스피커 기준 발음 용이성과 구조적 장애 형태 패턴 스캔</p>
                <p className="text-sm text-blue-800"><strong className="font-bold">국제 통용성:</strong> 문서 및 실무에서 사용되는 국제 표준 규격(대소문자, 약호 등) 준수 여부</p>
                <p className="text-sm text-blue-800"><strong className="font-bold">길이 적합성:</strong> 여권/크레딧카드 각인 및 입력 폼 한계를 고려한 길이 적합성</p>
              </div>
            </section>
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