'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  Text,
  Heading,
  Button,
  TextField,
  Switch,
  Flex,
  Box,
  Badge,
  Container,
  SegmentedControl
} from '@radix-ui/themes';
import { Copy, AlertTriangle, Share2, Check, X, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { romanizeKoreanName, getSurnameVariants, getFamilyNameOptions, type RomanizationOptions, type Warning } from '@/lib/romanization';
import Image from "next/image";
import Adsense from '@/components/google/Adsense';
import Footer from '@/components/layout/Footer';

const createHistoryEntry = (name: string, result: string) => ({
  name: name.trim(),
  result,
  timestamp: Date.now(),
});

// URL 파라미터 압축/해제 함수들
const encodeOptions = (options: RomanizationOptions): string => {
  const parts = [];

  // 순서: 0=family-given, 1=given-family
  parts.push(options.order === 'given-family' ? '1' : '0');

  // 하이픈: 0=false, 1=true
  parts.push(options.hyphen ? '1' : '0');

  // 대소문자: c=capitalized, l=lowercase, u=uppercase
  const caseMap = { 'capitalized': 'c', 'lowercase': 'l', 'uppercase': 'u' };
  parts.push(caseMap[options.caseStyle || 'capitalized']);

  // 성씨 타입: c=compound, s=single, -=undefined
  if (options.familyNameType) {
    parts.push(options.familyNameType === 'compound' ? 'c' : 's');
  } else {
    parts.push('-');
  }

  return parts.join('');
};

const decodeOptions = (encoded: string): Partial<RomanizationOptions> => {
  if (encoded.length < 4) return {};

  const options: Partial<RomanizationOptions> = {};

  // 순서
  options.order = encoded[0] === '1' ? 'given-family' : 'family-given';

  // 하이픈
  options.hyphen = encoded[1] === '1';

  // 대소문자
  const caseMap = { 'c': 'capitalized', 'l': 'lowercase', 'u': 'uppercase' } as const;
  options.caseStyle = caseMap[encoded[2] as keyof typeof caseMap] || 'capitalized';

  // 성씨 타입
  if (encoded[3] !== '-') {
    options.familyNameType = encoded[3] === 'c' ? 'compound' : 'single';
  }

  return options;
};

// 간단한 debounce 함수
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

function NameEngConverter() {
  const searchParams = useSearchParams();

  const [inputName, setInputName] = useState('');
  const [options, setOptions] = useState<RomanizationOptions>({
    order: 'family-given',
    hyphen: false,
    caseStyle: 'capitalized',
    surnameVariant: undefined,
    familyNameType: undefined
  });
  const [result, setResult] = useState<{
    romanized: string;
    warnings: Warning[];
    alternatives: string[];
  } | null>(null);
  const [surnameVariants, setSurnameVariants] = useState<string[]>([]);
  const [familyNameOptions, setFamilyNameOptions] = useState<{
    hasCompoundOption: boolean;
    compoundFamily: string;
    singleFamily: string;
  }>({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{
    name: string;
    result: string;
    timestamp: number;
  }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // URL 파라미터에서 초기값 로드
  useEffect(() => {
    const name = searchParams.get('n');
    const optionsParam = searchParams.get('o'); // 압축된 옵션
    const surname = searchParams.get('s');

    // 기존 파라미터들 (호환성을 위해)
    const orderParam = searchParams.get('order');
    const hyphenParam = searchParams.get('h');
    const caseParam = searchParams.get('c');
    const familyNameTypeParam = searchParams.get('f');

    if (name) {
      setInputName(name);

      const nameOptions = getFamilyNameOptions(name);
      setFamilyNameOptions(nameOptions);

      let decodedOptions: Partial<RomanizationOptions> = {};

      // 새로운 압축 형식이 있으면 사용, 없으면 기존 파라미터들 사용
      if (optionsParam && optionsParam.length === 4) {
        decodedOptions = decodeOptions(optionsParam);
      } else {
        // 기존 파라미터들로부터 옵션 구성
        if (orderParam !== null) {
          decodedOptions.order = orderParam === '1' ? 'given-family' : 'family-given';
        }
        if (hyphenParam !== null) {
          decodedOptions.hyphen = hyphenParam === '1';
        }
        if (caseParam) {
          const caseMap = { 'c': 'capitalized', 'l': 'lowercase', 'u': 'uppercase' } as const;
          decodedOptions.caseStyle = caseMap[caseParam as keyof typeof caseMap] || 'capitalized';
        }
        if (familyNameTypeParam) {
          decodedOptions.familyNameType = familyNameTypeParam === 'c' ? 'compound' : 'single';
        }
      }

      let familyNameType: 'compound' | 'single' | undefined;
      if (decodedOptions.familyNameType) {
        familyNameType = decodedOptions.familyNameType;
      } else if (nameOptions.hasCompoundOption) {
        familyNameType = 'compound';
      } else {
        familyNameType = 'single';
      }

      const familyName = familyNameType === 'compound' && nameOptions.hasCompoundOption
        ? nameOptions.compoundFamily
        : nameOptions.singleFamily;

      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);

      const newOptions: RomanizationOptions = {
        order: decodedOptions.order || 'family-given',
        hyphen: decodedOptions.hyphen || false,
        caseStyle: decodedOptions.caseStyle || 'capitalized',
        familyNameType,
        surnameVariant: surname || (variants.length > 0 ? variants[0] : undefined)
      };

      setOptions(newOptions);

      const convertResult = romanizeKoreanName(name.trim(), newOptions);
      setResult(convertResult);
    }
  }, [searchParams]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // 히스토리 로드
  useEffect(() => {
    const savedHistory = localStorage.getItem('nameeng-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
  }, []);

  // 히스토리 저장
  const saveToHistory = (name: string, result: string) => {
    const newEntry = createHistoryEntry(name, result);

    setHistory(prevHistory => {
      // 중복 제거 (같은 이름과 결과가 있으면 제거)
      const filteredHistory = prevHistory.filter(
        item => !(item.name === newEntry.name && item.result === newEntry.result)
      );

      // 새 항목을 맨 앞에 추가
      const updatedHistory = [newEntry, ...filteredHistory].slice(0, 10); // 최대 10개만 저장

      // 로컬 스토리지에 저장
      localStorage.setItem('nameeng-history', JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  // 히스토리에서 항목 삭제
  const removeFromHistory = (index: number) => {
    setHistory(prevHistory => {
      const updatedHistory = prevHistory.filter((_, i) => i !== index);
      localStorage.setItem('nameeng-history', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  // 히스토리 전체 삭제
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('nameeng-history');
  };

  // 히스토리 항목 클릭 시 해당 이름으로 설정
  const selectHistoryItem = (name: string) => {
    setInputName(name);
    setShowHistory(false);

    // 해당 이름으로 즉시 변환
    const nameOptions = getFamilyNameOptions(name.trim());
    setFamilyNameOptions(nameOptions);

    const defaultFamilyNameType: 'compound' | 'single' = nameOptions.hasCompoundOption ? 'compound' : 'single';
    const familyName = defaultFamilyNameType === 'compound' && nameOptions.hasCompoundOption
      ? nameOptions.compoundFamily
      : nameOptions.singleFamily;

    const variants = getSurnameVariants(familyName);
    setSurnameVariants(variants);

    const newOptions: RomanizationOptions = {
      order: 'family-given',
      hyphen: false,
      caseStyle: 'capitalized',
      familyNameType: defaultFamilyNameType,
      surnameVariant: variants.length > 0 ? variants[0] : undefined
    };

    setOptions(newOptions);

    const convertResult = romanizeKoreanName(name.trim(), newOptions);
    setResult(convertResult);
    updateUrl(name, newOptions);

    // 히스토리에 다시 저장 (최신 순서로 업데이트)
    saveToHistory(name.trim(), convertResult.romanized);
  };

  const handleNameChange = (value: string) => {
    setInputName(value);

    // 이전 타이머 정리
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.trim()) {
      const nameOptions = getFamilyNameOptions(value.trim());
      setFamilyNameOptions(nameOptions);

      const defaultFamilyNameType: 'compound' | 'single' = nameOptions.hasCompoundOption ? 'compound' : 'single';
      // 복성이 검색되면 무조건 복성으로 설정, 단성만 있으면 단성으로 설정
      const currentFamilyNameType = defaultFamilyNameType;
      const familyName = currentFamilyNameType === 'compound' && nameOptions.hasCompoundOption
        ? nameOptions.compoundFamily
        : nameOptions.singleFamily;

      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);

      const newOptions = {
        ...options,
        familyNameType: currentFamilyNameType,
        surnameVariant: variants.length > 0 ? variants[0] : undefined
      };

      setOptions(newOptions);

      // 디바운싱 적용 - 500ms 후에 변환
      debounceTimeoutRef.current = setTimeout(() => {
        const convertResult = romanizeKoreanName(value.trim(), newOptions);
        setResult(convertResult);
        debouncedUpdateUrl(value, newOptions); // 디바운싱된 URL 업데이트 사용
      }, 500);
    } else {
      setSurnameVariants([]);
      setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
      setOptions(prev => ({
        ...prev,
        surnameVariant: undefined,
        familyNameType: undefined
      }));
      setResult(null);
    }
  };

  const updateUrl = (name: string, newOptions: RomanizationOptions) => {
    if (!name.trim()) return;

    const params = new URLSearchParams();
    params.set('n', name);
    params.set('o', encodeOptions(newOptions));

    if (newOptions.surnameVariant) {
      params.set('s', newOptions.surnameVariant);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    // 현재 URL과 같으면 업데이트하지 않음
    if (window.location.search === `?${params.toString()}`) {
      return;
    }
    
    window.history.replaceState(null, '', newUrl);
  };

  // URL 업데이트를 위한 디바운싱
  const debouncedUpdateUrl = debounce((name: string, newOptions: RomanizationOptions) => {
    updateUrl(name, newOptions);
  }, 1000); // 1초 디바운싱

  const handleConvert = () => {
    if (!inputName.trim()) return;

    // 디바운싱을 우회하고 즉시 변환
    const convertResult = romanizeKoreanName(inputName.trim(), options);
    setResult(convertResult);
    updateUrl(inputName, options);

    // 히스토리에 저장
    saveToHistory(inputName.trim(), convertResult.romanized);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareResult = () => {
    if (!result) return;

    const params = new URLSearchParams();
    params.set('n', inputName);
    params.set('o', encodeOptions(options));

    if (options.surnameVariant) {
      params.set('s', options.surnameVariant);
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({
        title: 'NameEng - 한글 이름 로마자 표기',
        text: `${inputName} → ${result.romanized}`,
        url: shareUrl
      });
    } else {
      const shareText = `${inputName} → ${result.romanized}\n\nNameEng에서 확인: ${shareUrl}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleOptionChange = (newOptions: Partial<RomanizationOptions>) => {
    // 이전 디바운싱 타이머 정리
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    const updatedOptions = { ...options, ...newOptions };
    setOptions(updatedOptions);

    if (inputName.trim()) {
      const convertResult = romanizeKoreanName(inputName.trim(), updatedOptions);
      setResult(convertResult);
      debouncedUpdateUrl(inputName, updatedOptions); // 디바운싱된 URL 업데이트 사용
    }
  };

  return (
    <Container size="3" className="py-6 px-4">
      <Box className="max-w-5xl mx-auto">
        {/* Simplified Header */}
        <Box className="text-center mb-8">
          <Link
            href="/"
            prefetch={false}
            className="block"
            onClick={() => {
              // 로고 클릭 시 모든 상태 초기화
              setInputName('');
              setResult(null);
              setSurnameVariants([]);
              setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
              setOptions({
                order: 'family-given',
                hyphen: false,
                caseStyle: 'capitalized',
                surnameVariant: undefined,
                familyNameType: undefined
              });
              // 디바운싱 타이머 정리
              if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
                debounceTimeoutRef.current = null;
              }
            }}
          >
            <Flex align="center" justify="center" gap="3" className="mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="NameEng Logo" width={48} height={48} className="w-12 h-12" />
              <Heading size="7" style={{ letterSpacing: '-0.02em' }}>
                Nameeng
              </Heading>
            </Flex>
          </Link>
          <Text size="3" color="gray">
            한글 이름 영문 변환
          </Text>
        </Box>

        {/* Main Input */}
        <Card size="3" className="mb-6">
          <TextField.Root
            placeholder="한글 이름을 입력하세요 (예: 김민수)"
            value={inputName}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleConvert();
                setShowHistory(false);
              }
              if (e.key === 'Escape') {
                setShowHistory(false);
              }
            }}
            onFocus={() => setShowHistory(true)}
            onBlur={() => {
              // 약간의 지연을 두어 클릭 이벤트가 처리되도록 함
              setTimeout(() => setShowHistory(false), 200);
            }}
            size="3"
            style={{ fontSize: '18px' }}
            autoFocus
          />
        </Card>

        {/* Search History */}
        {showHistory && history.length > 0 && (
          <Card size="2" className="mb-6">
            <Flex justify="between" align="center" className="mb-3">
              <Flex align="center" gap="2">
                <Clock size={16} color="gray" />
                <Text size="2" weight="medium">
                  최근 검색 기록
                </Text>
                <Badge color="gray" variant="soft" size="1">
                  {history.length}
                </Badge>
              </Flex>
              <Flex gap="2">
                <Button
                  variant="ghost"
                  size="1"
                  onClick={clearHistory}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={14} />
                  전체 삭제
                </Button>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500"
                >
                  <X size={14} />
                </Button>
              </Flex>
            </Flex>

            <Box className="space-y-2">
              {history.slice(0, 5).map((item, index) => (
                <Flex
                  key={`${item.name}-${item.timestamp}`}
                  justify="between"
                  align="center"
                  className="p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => selectHistoryItem(item.name)}
                >
                  <Box>
                    <Text size="2" weight="medium">
                      {item.name}
                    </Text>
                    <Text size="1" color="gray">
                      {item.result}
                    </Text>
                  </Box>
                  <Flex align="center" gap="2">
                    <Text size="1" color="gray">
                      {new Date(item.timestamp).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                    <Button
                      variant="ghost"
                      size="1"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(index);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </Card>
        )}

        {/* AdSense 광고 */}
        <Box className="mb-6">
          <Adsense
            dataAdSlot="2738626516"
          />
        </Box>

        {/* Result Display */}
        {result && (
          <Card size="3" className="mb-6">
            <Flex justify="between" align="center">
              <Box>
                <Text size="2" style={{ opacity: 0.9 }} className="mb-1">
                  {inputName}
                </Text>
                <Heading size="6">
                  {result.romanized}
                </Heading>
              </Box>
              <Flex gap="2">
                <Button
                  variant="soft"
                  size="2"
                  onClick={() => copyToClipboard(result.romanized)}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
                <Button variant="soft" size="2" onClick={shareResult}>
                  <Share2 size={16} />
                </Button>
              </Flex>
            </Flex>

            {/* 안내 문구 추가 */}
            <Box className="mt-4 pt-3 border-t border-gray-200">

              {/* AdSense 광고 */}
              <Adsense
                dataAdSlot="2738626516"
                className="my-6 max-w-[336px] md:max-w-[728px]"
              />

              <div className="flex flex-col space-y-2">
                <Text size="1" color="gray">
                  국어의 로마자 표기법 (2024.05.23) 기준
                </Text>
                <Text size="1" color="gray">
                  ※ 여권 발급 시에는{' '}
                  <a
                    href="/passport-guide"
                    className="underline hover:text-blue-600"
                  >
                    외교부 여권 로마자 표기 규정
                  </a>
                  을 확인하시기 바랍니다.
                </Text>
              </div>
            </Box>
          </Card>
        )}

        {/* Warnings */}
        {result?.warnings && result.warnings.length > 0 && (
          <Card size="2" className="mb-6" style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A'
          }}>
            <Flex gap="2" align="start">
              <AlertTriangle size={18} style={{ color: '#F59E0B', marginTop: '2px' }} />
              <Box style={{ flex: 1 }}>
                <Text size="2" weight="medium" className="mb-2">
                  부적절한 의미를 포함할 수 있습니다
                </Text>
                {result.warnings.map((warning, index) => (
                  <Box key={index} className="mb-2">
                    <Text size="2">
                      <strong>{warning.word}</strong>: {warning.meaning}
                    </Text>
                    <Flex gap="1" wrap="wrap" className="mt-1">
                      {warning.suggestions.map((suggestion: string, idx: number) => (
                        <Badge key={idx} color="amber" variant="soft" size="1">
                          {suggestion}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </Box>
            </Flex>
          </Card>
        )}

        {/* Options - Only show when name is entered */}
        {inputName.trim() && (
          <Box className="space-y-4">
            {/* Family Name Type */}
            {familyNameOptions.hasCompoundOption && (
              <Card size="2">
                <Text size="2" weight="medium" className="mb-3">
                  성씨 구분
                </Text>
                <SegmentedControl.Root
                  value={options.familyNameType || 'compound'}
                  onValueChange={(value: 'compound' | 'single') => {
                    const familyName = value === 'compound'
                      ? familyNameOptions.compoundFamily
                      : familyNameOptions.singleFamily;

                    const variants = getSurnameVariants(familyName);
                    setSurnameVariants(variants);

                    handleOptionChange({
                      familyNameType: value,
                      surnameVariant: variants.length > 0 ? variants[0] : undefined
                    });
                  }}
                  className="w-full"
                >
                  <SegmentedControl.Item value="compound" className="flex-1">
                    복성 ({familyNameOptions.compoundFamily})
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="single" className="flex-1">
                    단성 ({familyNameOptions.singleFamily})
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Card>
            )}

            {/* Surname Variants */}
            {surnameVariants.length > 0 && (
              <Card size="2">
                <Text size="2" weight="medium" className="mb-3">
                  성씨 표기
                </Text>
                <Flex gap="2" wrap="wrap">
                  {surnameVariants.map((variant) => (
                    <Button
                      key={variant}
                      variant={options.surnameVariant === variant ? 'solid' : 'outline'}
                      size="2"
                      onClick={() => handleOptionChange({ surnameVariant: variant })}
                    >
                      {variant}
                    </Button>
                  ))}
                </Flex>
              </Card>
            )}

            {/* Quick Options */}
            <Card size="2">
              <Text size="2" weight="medium" className="mb-3">
                표기 옵션
              </Text>

              <Flex direction="column" gap="3">
                {/* Name Order */}
                <Flex align="center" justify="between">
                  <Text size="2">이름 순서</Text>
                  <SegmentedControl.Root
                    value={options.order}
                    onValueChange={(value: 'family-given' | 'given-family') =>
                      handleOptionChange({ order: value })
                    }
                    size="1"
                  >
                    <SegmentedControl.Item value="family-given">
                      성-이름
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="given-family">
                      이름-성
                    </SegmentedControl.Item>
                  </SegmentedControl.Root>
                </Flex>

                {/* Case Style */}
                <Flex align="center" justify="between">
                  <Text size="2">대소문자</Text>
                  <SegmentedControl.Root
                    value={options.caseStyle}
                    onValueChange={(value: 'capitalized' | 'lowercase' | 'uppercase') =>
                      handleOptionChange({ caseStyle: value })
                    }
                    size="1"
                  >
                    <SegmentedControl.Item value="capitalized">Aa</SegmentedControl.Item>
                    <SegmentedControl.Item value="lowercase">aa</SegmentedControl.Item>
                    <SegmentedControl.Item value="uppercase">AA</SegmentedControl.Item>
                  </SegmentedControl.Root>
                </Flex>

                {/* Hyphen */}
                <Flex align="center" justify="between">
                  <Text size="2">음절 구분</Text>
                  <Switch
                    checked={options.hyphen}
                    onCheckedChange={(checked) => handleOptionChange({ hyphen: checked })}
                  />
                </Flex>
              </Flex>
            </Card>

            {/* Alternative Results */}
            {result?.alternatives && result.alternatives.length > 0 && (
              <Card size="2">
                <Text size="2" weight="medium" className="mb-3">
                  다른 표기 옵션
                </Text>
                <Flex gap="2" wrap="wrap">
                  {result.alternatives.map((alt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="2"
                      onClick={() => copyToClipboard(alt)}
                    >
                      {alt}
                    </Button>
                  ))}
                </Flex>
              </Card>
            )}
          </Box>
        )}

        {/* 추가 콘텐츠 섹션 */}
        <Box className="mt-12 space-y-8">
          {/* 블로그 섹션 */}
          <Card size="3">
            <Box className="p-6">
              <Flex justify="between" align="center" className="mb-4">
                <Heading as="h2" size="4">
                  📚 유용한 가이드
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link href="/blog" prefetch={false}>
                    더 보기 →
                  </Link>
                </Button>
              </Flex>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/korean-surname-history" className="block" prefetch={false}>
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      한국 성씨의 영문 표기 역사
                    </Text>
                    <Text size="1" color="gray">
                      조선시대부터 현재까지의 변천사를 살펴보세요
                    </Text>
                  </Box>
                </Link>

                <Link href="/blog/passport-name-guide" className="block" prefetch={false}>
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      여권 발급 시 영문명 작성법
                    </Text>
                    <Text size="1" color="gray">
                      여권 신청 시 주의사항과 실제 사례
                    </Text>
                  </Box>
                </Link>

                <Link href="/blog/overseas-name-tips" className="block">
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      해외 거주 시 영문명 사용 팁
                    </Text>
                    <Text size="1" color="gray">
                      문화적 차이를 고려한 실용적인 조언
                    </Text>
                  </Box>
                </Link>

                <Link href="/blog/business-name-etiquette" className="block">
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      국제 비즈니스 영문명 에티켓
                    </Text>
                    <Text size="1" color="gray">
                      전문적인 영문명 사용법과 명함 작성 가이드
                    </Text>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Card>

          {/* 도구 섹션 */}
          <Card size="3">
            <Box className="p-6">
              <Flex justify="between" align="center" className="mb-4">
                <Heading as="h2" size="4">
                  🛠️ 추가 도구
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link href="/tools">
                    모든 도구 보기 →
                  </Link>
                </Button>
              </Flex>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/tools/name-generator" className="block">
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      영문명 조합 생성기
                    </Text>
                    <Text size="1" color="gray">
                      다양한 성씨 표기와 이름 옵션을 조합하여 생성
                    </Text>
                  </Box>
                </Link>

                <Link href="/tools/name-checker" className="block">
                  <Box className="p-4 rounded-md hover:bg-gray-50 transition-colors">
                    <Text size="2" weight="medium" className="mb-1 block">
                      영문명 적합성 검사기
                    </Text>
                    <Text size="1" color="gray">
                      기존 영문명의 적합성을 종합적으로 분석
                    </Text>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Card>

          {/* 실용 정보 섹션 */}
          <Card size="3">
            <Box className="p-6">
              <Heading as="h2" size="4" className="mb-4">
                💡 알아두면 유용한 정보
              </Heading>

              <Box className="space-y-4">
                <Box className="p-4 bg-blue-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    🛂 여권 발급 시 주의사항
                  </Text>
                  <Text size="2" color="gray">
                    표준 표기를 기본으로 하되, 기존에 사용하던 관용 표기가 있다면
                    증빙서류와 함께 신청할 수 있습니다. 하이픈 사용 여부는 신중히 결정하세요.
                  </Text>
                </Box>

                <Box className="p-4 bg-green-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    🌍 해외 거주 시 팁
                  </Text>
                  <Text size="2" color="gray">
                    부정적 의미 경고가 있는 경우 반드시 대안 표기를 고려하고,
                    현지에서 발음하기 쉬운 표기를 선택하는 것이 좋습니다.
                  </Text>
                </Box>

                <Box className="p-4 bg-purple-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    💼 비즈니스 용도
                  </Text>
                  <Text size="2" color="gray">
                    전문적이고 격식 있는 표기를 선택하고,
                    명함, 이메일 서명 등에서 일관성을 유지하는 것이 중요합니다.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Footer Links */}
        {/* Footer Links */}
        <Footer />
      </Box>
    </Container>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <Container size="3" className="py-6">
        <Box className="max-w-5xl mx-auto text-center">
          <Text color="gray">Loading...</Text>
        </Box>
      </Container>
    }>
      <NameEngConverter />
    </Suspense>
  );
}