'use client';

import { useState, useEffect, useRef, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  romanizeKoreanName,
  getSurnameVariants,
  getFamilyNameOptions,
  type RomanizationOptions,
  type Warning,
} from '@/lib/romanization';

import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import NameInput from '@/components/converter/NameInput';
import ResultCard from '@/components/converter/ResultCard';
import WarningCard from '@/components/converter/WarningCard';
import OptionsPanel from '@/components/converter/OptionsPanel';
import ContentLinks from '@/components/converter/ContentLinks';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import AdSlot from '@/components/ads/AdSlot';
import {
  FileText,
  AlertTriangle,
  BookOpen,
  Globe,
  Briefcase,
  Search,
  Ruler,
  CheckCircle2,
  CircleDollarSign,
  ChevronRight
} from 'lucide-react';

/* ─── 상수 ─── */
const AD_SLOT_INDEX_CONTENT = '2738626516';   // 초기화면 콘텐츠 섹션 진입 전
const AD_SLOT_RESULT = '2738626516';    // 결과 카드 하단
const AD_SLOT_CONTENT = '2738626516';   // 콘텐츠 섹션 진입 전
const AD_SLOT_SIDEBAR = '2738626516';   // 데스크탑 사이드바

/* 예시 이름 풀: 아이돌·유명인 이름 리스트 */
const CELEBRITY_NAMES = [
  // BTS
  '김남준', '김석진', '민윤기', '정호석', '박지민', '김태형', '전정국',
  // BLACKPINK
  '김지수', '김제니', '박채영',
  // 배우·연예인
  '송중기', '김수현', '이민호', '전지현', '수지', '배수지',
  '이종석', '보아', '차은우', '이준호', '박서준', '마동석',
  // 스포츠
  '손흥민', '김연경', '박인비', '권은비',
  // 일반 예시
  '김민수', '이지은', '박준혁', '최수연', '남궁민',
];

/** 배열에서 중복 없이 n개를 랜덤으로 추출 */
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const DEFAULT_OPTIONS: RomanizationOptions = {
  order: 'family-given',
  hyphen: false,
  caseStyle: 'capitalized',
  surnameVariant: undefined,
  familyNameType: undefined,
};

/* ─── 히스토리 유틸 ─── */
type HistoryItem = { name: string; result: string; timestamp: number };
const HISTORY_KEY = 'nameeng-history';

function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveHistory(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

/* ─── URL 인코딩/디코딩 ─── */
function encodeOptions(o: RomanizationOptions): string {
  const caseMap = { capitalized: 'c', lowercase: 'l', uppercase: 'u' };
  return [
    o.order === 'given-family' ? '1' : '0',
    o.hyphen ? '1' : '0',
    caseMap[o.caseStyle || 'capitalized'],
    o.familyNameType ? (o.familyNameType === 'compound' ? 'c' : 's') : '-',
  ].join('');
}
function decodeOptions(s: string): Partial<RomanizationOptions> {
  if (s.length < 4) return {};
  const caseMap: Record<string, 'capitalized' | 'lowercase' | 'uppercase'> = {
    c: 'capitalized', l: 'lowercase', u: 'uppercase',
  };
  return {
    order: s[0] === '1' ? 'given-family' : 'family-given',
    hyphen: s[1] === '1',
    caseStyle: caseMap[s[2]] || 'capitalized',
    ...(s[3] !== '-' && { familyNameType: s[3] === 'c' ? 'compound' : 'single' }),
  };
}

/* ─── 맥락 기반 CTA 링크 생성 ─── */
function getContextualLinks(
  inputName: string,
  warnings: Warning[],
  familyNameOptions: { hasCompoundOption: boolean },
) {
  const links: { href: string; label: string; icon: React.ReactNode }[] = [];

  // 여권 가이드 (항상 최우선)
  links.push({ href: '/passport-guide', label: '여권 발급 시 영문명 작성법', icon: <FileText className="text-blue-500" size={18} /> });

  // 부정적 의미 경고가 있는 경우
  if (warnings.length > 0) {
    links.push({ href: '/blog/negative-meaning-words', label: '부적절한 의미 피하는 법', icon: <AlertTriangle className="text-amber-500" size={18} /> });
  }

  // 복성인 경우
  if (familyNameOptions.hasCompoundOption) {
    links.push({ href: '/blog/korean-surname-history', label: '한국 성씨 영문 표기 역사', icon: <BookOpen className="text-emerald-500" size={18} /> });
  } else {
    links.push({ href: '/romanization-guide', label: '로마자 표기법 완전 정복', icon: <BookOpen className="text-emerald-500" size={18} /> });
  }

  return links.slice(0, 3);
}

/* ─── 콘텐츠 섹션 링크 ─── */
const guideLinks = [
  {
    href: '/blog/passport-name-guide',
    icon: <FileText className="text-blue-500" size={20} />,
    title: '여권 발급 시 영문명 작성법',
    desc: '여권 신청 시 주의사항과 실제 사례',
  },
  {
    href: '/blog/overseas-name-tips',
    icon: <Globe className="text-emerald-500" size={20} />,
    title: '해외 거주 시 영문명 사용 팁',
    desc: '문화적 차이를 고려한 실용적인 조언',
  },
  {
    href: '/blog/business-name-etiquette',
    icon: <Briefcase className="text-slate-500" size={20} />,
    title: '국제 비즈니스 영문명 에티켓',
    desc: '전문적인 영문명 사용법과 명함 작성 가이드',
  },
  {
    href: '/blog/korean-surname-history',
    icon: <BookOpen className="text-indigo-500" size={20} />,
    title: '한국 성씨의 영문 표기 역사',
    desc: '조선시대부터 현재까지의 변천사',
  },
];

const toolLinks = [
  {
    href: '/tools/name-checker',
    icon: <Search className="text-blue-500" size={20} />,
    title: '영문명 적합성 검사기',
    desc: '기존 영문명의 적합성을 종합적으로 분석',
  },
  {
    href: '/romanization-guide',
    icon: <Ruler className="text-amber-500" size={20} />,
    title: '로마자 표기법 가이드',
    desc: '국어의 로마자 표기법 2024년 기준 정리',
  },
];

/* ─── 메인 컨버터 ─── */
function NameEngConverter() {
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [inputName, setInputName] = useState('');
  const [options, setOptions] = useState<RomanizationOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<{
    romanized: string;
    warnings: Warning[];
    alternatives: string[];
  } | null>(null);
  const [surnameVariants, setSurnameVariants] = useState<string[]>([]);
  const [familyNameOptions, setFamilyNameOptions] = useState({
    hasCompoundOption: false,
    compoundFamily: '',
    singleFamily: '',
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  /* 히스토리 로드 */
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  /* URL 파라미터 처리 */
  useEffect(() => {
    const name = searchParams.get('n');
    const optionsParam = searchParams.get('o');
    const surnameParam = searchParams.get('s');

    // Legacy support
    const orderParam = searchParams.get('order');
    const hyphenParam = searchParams.get('h');
    const caseParam = searchParams.get('c');
    const familyNameTypeParam = searchParams.get('f');

    if (!name) return;

    setInputName(name);
    const nameOpts = getFamilyNameOptions(name);
    setFamilyNameOptions(nameOpts);

    let decoded: Partial<RomanizationOptions> = {};
    if (optionsParam && optionsParam.length === 4) {
      decoded = decodeOptions(optionsParam);
    } else {
      if (orderParam !== null) decoded.order = orderParam === '1' ? 'given-family' : 'family-given';
      if (hyphenParam !== null) decoded.hyphen = hyphenParam === '1';
      if (caseParam) {
        const caseMap = { 'c': 'capitalized', 'l': 'lowercase', 'u': 'uppercase' } as const;
        decoded.caseStyle = caseMap[caseParam as keyof typeof caseMap] || 'capitalized';
      }
      if (familyNameTypeParam) {
        decoded.familyNameType = familyNameTypeParam === 'c' ? 'compound' : 'single';
      }
    }

    const familyNameType: 'compound' | 'single' =
      (decoded.familyNameType as 'compound' | 'single') ??
      (nameOpts.hasCompoundOption ? 'compound' : 'single');

    const familyName =
      familyNameType === 'compound' && nameOpts.hasCompoundOption
        ? nameOpts.compoundFamily
        : nameOpts.singleFamily;

    const variants = getSurnameVariants(familyName);
    setSurnameVariants(variants);

    const newOptions: RomanizationOptions = {
      order: decoded.order ?? 'family-given',
      hyphen: decoded.hyphen ?? false,
      caseStyle: decoded.caseStyle ?? 'capitalized',
      familyNameType,
      surnameVariant: surnameParam ?? (variants[0] ?? undefined),
    };
    setOptions(newOptions);
    setResult(romanizeKoreanName(name.trim(), newOptions));
  }, [searchParams]);

  /* 언마운트 정리 */
  useEffect(() => () => { debounceRef.current && clearTimeout(debounceRef.current); }, []);

  /* 히스토리 저장 */
  const pushHistory = useCallback((name: string, romanized: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) => !(h.name === name && h.result === romanized)
      );
      const next = [{ name, result: romanized, timestamp: Date.now() }, ...filtered].slice(0, 10);
      saveHistory(next);
      return next;
    });
  }, []);

  /* 이름 입력 핸들러 */
  const handleNameChange = useCallback(
    (value: string) => {
      setInputName(value);
      debounceRef.current && clearTimeout(debounceRef.current);

      if (!value.trim()) {
        setResult(null);
        setSurnameVariants([]);
        setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
        setOptions((prev) => ({ ...prev, surnameVariant: undefined, familyNameType: undefined }));
        return;
      }

      const nameOpts = getFamilyNameOptions(value.trim());
      setFamilyNameOptions(nameOpts);

      const familyNameType: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
      const familyName =
        familyNameType === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);

      const newOptions: RomanizationOptions = {
        ...options,
        familyNameType,
        surnameVariant: variants[0] ?? undefined,
      };
      setOptions(newOptions);

      // 자동 변환(타이핑 시) 로직 제거됨. 엔터나 변환 버튼 클릭 시에만 변환되도록 변경.
    },
    [options]
  );

  /* 변환 실행 */
  const handleConvert = useCallback(() => {
    if (!inputName.trim()) return;
    const res = romanizeKoreanName(inputName.trim(), options);
    setResult(res);
    pushHistory(inputName.trim(), res.romanized);
  }, [inputName, options, pushHistory]);

  /* 옵션 변경 */
  const handleOptionChange = useCallback(
    (newOpts: Partial<RomanizationOptions>) => {
      debounceRef.current && clearTimeout(debounceRef.current);
      const updated = { ...options, ...newOpts };
      setOptions(updated);
      if (inputName.trim()) {
        const res = romanizeKoreanName(inputName.trim(), updated);
        setResult(res);
      }
    },
    [options, inputName]
  );

  /* 복성/단성 변경 */
  const handleFamilyNameTypeChange = useCallback(
    (type: 'compound' | 'single') => {
      const familyName =
        type === 'compound' ? familyNameOptions.compoundFamily : familyNameOptions.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      handleOptionChange({
        familyNameType: type,
        surnameVariant: variants[0] ?? undefined,
      });
    },
    [familyNameOptions, handleOptionChange]
  );

  /* 복사 */
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  /* 공유 */
  const handleShare = useCallback(() => {
    if (!result) return;
    const params = new URLSearchParams({ n: inputName, o: encodeOptions(options) });
    if (options.surnameVariant) params.set('s', options.surnameVariant);
    const url = `${window.location.origin}/result?${params}`;
    if (navigator.share) {
      navigator.share({ title: 'NameEng', text: `${inputName} → ${result.romanized}`, url });
    } else {
      navigator.clipboard.writeText(`${inputName} → ${result.romanized}\n\n${url}`);
    }
  }, [result, inputName, options]);

  /* 히스토리 선택 */
  const handleSelectHistory = useCallback(
    (name: string) => {
      setInputName(name);
      setShowHistory(false);
      const nameOpts = getFamilyNameOptions(name.trim());
      setFamilyNameOptions(nameOpts);
      const familyNameType: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
      const familyName = familyNameType === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      const newOptions: RomanizationOptions = {
        ...DEFAULT_OPTIONS,
        familyNameType,
        surnameVariant: variants[0] ?? undefined,
      };
      setOptions(newOptions);
      const res = romanizeKoreanName(name.trim(), newOptions);
      setResult(res);
      pushHistory(name.trim(), res.romanized);
    },
    [pushHistory]
  );

  const handleRemoveHistory = useCallback((index: number) => {
    setHistory((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveHistory(next);
      return next;
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const handleLogoClick = useCallback(() => {
    setInputName('');
    setResult(null);
    setSurnameVariants([]);
    setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
    setOptions(DEFAULT_OPTIONS);
    debounceRef.current && clearTimeout(debounceRef.current);
  }, []);

  // 매 마운트 시 유명인 이름 풀에서 7개를 랜덤 추출 (모바일 4개, 데스크탑 7개 표시)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exampleNames = useMemo(() => pickRandom(CELEBRITY_NAMES, 7), []);

  const contextualLinks =
    result ? getContextualLinks(inputName, result.warnings, familyNameOptions) : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      {/* 페이지 최대 너비 컨테이너 */}
      <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1">

        {/* 모바일 헤더 */}
        <div className="px-4 md:hidden">
          <SiteHeader onLogoClick={handleLogoClick} />
        </div>

        {/* 데스크탑 그리드 레이아웃 */}
        <div className="md:grid md:grid-cols-[1fr_300px] gap-8">

          {/* Main Column (Left) */}
          <div className="w-full">
            {/* 입력 영역 */}
            <div className="px-4 md:px-0 mt-4 mb-3">
              <NameInput
                value={inputName}
                onChange={handleNameChange}
                onConvert={handleConvert}
                history={history}
                showHistory={showHistory}
                onShowHistory={setShowHistory}
                onSelectHistory={handleSelectHistory}
                onRemoveHistory={handleRemoveHistory}
                onClearHistory={handleClearHistory}
              />
            </div>

            {/* ─── 결과 영역 ─── */}
            {result ? (
              <div className="space-y-3">
                {/* 현재 성씨 */}
                {(() => {
                  const familyName =
                    options.familyNameType === 'compound' && familyNameOptions.hasCompoundOption
                      ? familyNameOptions.compoundFamily
                      : familyNameOptions.singleFamily;

                  return (
                    <>
                      {/* 1. 결과 카드 */}
                      <div className="px-4 md:px-0">
                        <ResultCard
                          inputName={inputName}
                          romanized={result.romanized}
                          onCopy={copyToClipboard}
                          onShare={handleShare}
                          contextualLinks={contextualLinks}
                        />
                      </div>

                      {/* 2. 경고 카드 */}
                      {result.warnings.length > 0 && (
                        <div className="px-4 md:px-0">
                          <WarningCard warnings={result.warnings} />
                        </div>
                      )}

                      {/* 3. 광고 슬롯 A: 결과 직후 */}
                      <AdSlot
                        slot={AD_SLOT_RESULT}
                        format="auto"
                        wrapperClassName="py-1 md:my-6 md:rounded-lg md:overflow-hidden"
                        lazyLoad={true}
                      />

                      {/* 4. 옵션 패널 */}
                      <div className="px-4 md:px-0">
                        <OptionsPanel
                          options={options}
                          onChange={handleOptionChange}
                          familyName={familyName}
                          familyNameOptions={familyNameOptions}
                          alternatives={result.alternatives}
                          onCopyAlternative={copyToClipboard}
                          onFamilyNameTypeChange={handleFamilyNameTypeChange}
                        />
                      </div>

                      {/* 5. 표기법 안내 */}
                      <div className="px-4 md:px-0 mt-2">
                        <p className="text-xs text-gray-400 text-center">
                          국어의 로마자 표기법 (2024.05.23) 기준 ·{' '}
                          <a href="/passport-guide" className="underline hover:text-blue-500 transition-colors">
                            여권 표기 규정 확인
                          </a>
                        </p>
                      </div>
                    </>
                  );
                })()}

                {/* 6. 광고 슬롯 B: 콘텐츠 섹션 전 배너 */}
                <AdSlot
                  slot={AD_SLOT_CONTENT}
                  format="auto"
                  wrapperClassName="py-1 md:my-6 md:rounded-lg md:overflow-hidden"
                  lazyLoad={true}
                />

                <div className="md:hidden">
                  <div className="px-4 mt-6">
                    <ContentLinks title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 유용한 가이드</span>} items={guideLinks} />
                  </div>
                  <div className="px-4 pb-2 mt-4">
                    <ContentLinks title={<span className="flex items-center gap-1.5"><Briefcase size={16} className="text-gray-500" /> 도구</span>} items={toolLinks} />
                  </div>
                </div>
              </div>
            ) : (
              /* ─── 초기 화면 (입력 전) ─── */
              <>
                <div className="px-4 md:px-0 space-y-6 mt-2">
                  {/* 빠른 예시: 유명인 이름에서 랜덤 추출 */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                      예시 이름
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exampleNames.map((name, i) => (
                        <button
                          key={name}
                          onClick={() => {
                            setInputName(name);
                            const nameOpts = getFamilyNameOptions(name);
                            setFamilyNameOptions(nameOpts);
                            const type: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
                            const familyName = type === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
                            const variants = getSurnameVariants(familyName);
                            setSurnameVariants(variants);
                            const opts: RomanizationOptions = {
                              ...DEFAULT_OPTIONS,
                              familyNameType: type,
                              surnameVariant: variants[0] ?? undefined,
                            };
                            setOptions(opts);
                            const res = romanizeKoreanName(name, opts);
                            setResult(res);
                          }}
                          className={`px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all ${i >= 4 ? 'hidden md:inline-flex' : ''
                            }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <AdSlot
                  slot={AD_SLOT_INDEX_CONTENT}
                  format="auto"
                  wrapperClassName="py-1 md:my-6 md:rounded-lg md:overflow-hidden mt-2"
                  lazyLoad={false}
                  mobileFixed={true} // 모바일에서 320×100 고정
                />

                <div className="px-4 md:px-0 space-y-6 mt-2">
                  {/* 주요 기능 특징 안내 */}
                  <div className="mt-4">
                    <a
                      href="/about"
                      className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between transition-all hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Nameeng 서비스 소개</span>
                        </div>
                        <span className="text-sm text-gray-500 leading-relaxed pr-8 line-clamp-2 md:line-clamp-none">
                          여권 로마자 표기 규정부터 부정적 영단어 어감 분석까지. 가장 쉽고 정확하게 내 이름의 영문 스펠링을 찾아보세요.
                        </span>
                      </div>
                      <div className="shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors bg-gray-50 group-hover:bg-blue-50 p-2 rounded-full">
                        <ChevronRight size={20} />
                      </div>
                    </a>
                  </div>

                  {/* 모바일에서만 노출되는 초기화면 가이드 링크 */}
                  <div className="md:hidden mt-6">
                    <ContentLinks title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 인기 가이드</span>} items={guideLinks.slice(0, 3)} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar Column (Right) */}
          <div className="hidden md:block w-[300px]">
            <AdSlot
              slot={AD_SLOT_SIDEBAR}
              format="auto"
              wrapperClassName="sticky top-4 mb-6 overflow-hidden min-h-[250px]"
              lazyLoad={true}
            />

            {/* 데스크탑에서 항상 보이는 가이드 및 도구 메뉴 */}
            <div className="sticky top-[290px]">
              <div className="mb-6">
                <ContentLinks title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 유용한 가이드</span>} items={guideLinks} />
              </div>
              <div>
                <ContentLinks title={<span className="flex items-center gap-1.5"><Briefcase size={16} className="text-gray-500" /> 도구</span>} items={toolLinks} />
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 푸터 */}
      <SiteFooter />
    </div >
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <NameEngConverter />
    </Suspense>
  );
}