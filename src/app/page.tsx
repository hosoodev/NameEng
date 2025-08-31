'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { Copy, AlertTriangle, Share2, Check } from 'lucide-react';
import Link from 'next/link';
import { romanizeKoreanName, getSurnameVariants, getFamilyNameOptions, type RomanizationOptions, type Warning } from '@/lib/romanization';

function NameEngConverter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
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

  // URL 파라미터에서 초기값 로드
  useEffect(() => {
    const name = searchParams.get('n');
    const orderParam = searchParams.get('o');
    const hyphenParam = searchParams.get('h');
    const caseParam = searchParams.get('c');
    const familyNameTypeParam = searchParams.get('f');
    const surname = searchParams.get('s');

    if (name) {
      setInputName(name);
      
      const nameOptions = getFamilyNameOptions(name);
      setFamilyNameOptions(nameOptions);
      
      const order = orderParam === '1' ? 'given-family' : 'family-given';
      const hyphen = hyphenParam === '1';
      
      const caseMap = { 'c': 'capitalized', 'l': 'lowercase', 'u': 'uppercase' } as const;
      const caseStyle = caseMap[caseParam as keyof typeof caseMap] || 'capitalized';
      
      let familyNameType: 'compound' | 'single' | undefined;
      if (familyNameTypeParam === 'c') {
        familyNameType = 'compound';
      } else if (familyNameTypeParam === 's') {
        familyNameType = 'single';
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
        order,
        hyphen,
        caseStyle,
        familyNameType,
        surnameVariant: surname || (variants.length > 0 ? variants[0] : undefined)
      };
      
      setOptions(newOptions);
      
      const convertResult = romanizeKoreanName(name.trim(), newOptions);
      setResult(convertResult);
    }
  }, [searchParams]);

  const handleNameChange = (value: string) => {
    setInputName(value);
    
    if (value.trim()) {
      const nameOptions = getFamilyNameOptions(value.trim());
      setFamilyNameOptions(nameOptions);
      
      const defaultFamilyNameType = nameOptions.hasCompoundOption ? 'compound' : 'single';
      const currentFamilyNameType = options.familyNameType || defaultFamilyNameType;
      const familyName = currentFamilyNameType === 'compound' && nameOptions.hasCompoundOption 
        ? nameOptions.compoundFamily 
        : nameOptions.singleFamily;
      
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      
      setOptions(prev => ({
        ...prev,
        familyNameType: currentFamilyNameType,
        surnameVariant: variants.length > 0 ? variants[0] : undefined
      }));
      
      // 즉시 변환
      const newOptions = {
        ...options,
        familyNameType: currentFamilyNameType,
        surnameVariant: variants.length > 0 ? variants[0] : undefined
      };
      const convertResult = romanizeKoreanName(value.trim(), newOptions);
      setResult(convertResult);
      updateUrl(value, newOptions);
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
    params.set('o', newOptions.order === 'given-family' ? '1' : '0');
    params.set('h', newOptions.hyphen ? '1' : '0');
    
    const caseMap = { 'capitalized': 'c', 'lowercase': 'l', 'uppercase': 'u' };
    params.set('c', caseMap[newOptions.caseStyle || 'capitalized']);
    
    if (newOptions.familyNameType) {
      params.set('f', newOptions.familyNameType === 'compound' ? 'c' : 's');
    }
    
    if (newOptions.surnameVariant) {
      params.set('s', newOptions.surnameVariant);
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleConvert = () => {
    if (!inputName.trim()) return;
    
    const convertResult = romanizeKoreanName(inputName.trim(), options);
    setResult(convertResult);
    updateUrl(inputName, options);
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
    params.set('o', options.order === 'given-family' ? '1' : '0');
    params.set('h', options.hyphen ? '1' : '0');
    
    const caseMap = { 'capitalized': 'c', 'lowercase': 'l', 'uppercase': 'u' };
    params.set('c', caseMap[options.caseStyle || 'capitalized']);
    
    if (options.familyNameType) {
      params.set('f', options.familyNameType === 'compound' ? 'c' : 's');
    }
    
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
    const updatedOptions = { ...options, ...newOptions };
    setOptions(updatedOptions);
    
    if (inputName.trim()) {
      const convertResult = romanizeKoreanName(inputName.trim(), updatedOptions);
      setResult(convertResult);
      updateUrl(inputName, updatedOptions);
    }
  };

  return (
    <Container size="2" className="py-6 px-4">
      <Box className="max-w-2xl mx-auto">
        {/* Simplified Header */}
        <Box className="text-center mb-8">
          <Flex align="center" justify="center" gap="3" className="mb-4">
            <img src="/logo.svg" alt="NameEng Logo" className="w-12 h-12" />
            <Heading size="7" style={{ letterSpacing: '-0.02em' }}>
              NameEng
            </Heading>
          </Flex>
          <Text size="3" color="gray">
            한글 이름을 영문으로 변환
          </Text>
        </Box>

        {/* Main Input */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <TextField.Root
            placeholder="한글 이름을 입력하세요 (예: 김민수)"
            value={inputName}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleConvert();
              }
            }}
            size="3"
            style={{ fontSize: '18px' }}
            autoFocus
          />
        </Card>

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

        {/* Footer Links */}
        <Box className="mt-12 text-center">
          <Flex gap="4" justify="center" className="mb-4">
            <Link href="/passport-guide">
              <Text size="2" color="gray" className="hover:text-blue-600">
                여권 규정
              </Text>
            </Link>
            <Link href="/romanization-guide">
              <Text size="2" color="gray" className="hover:text-blue-600">
                표기법 가이드
              </Text>
            </Link>
            <Link href="/faq">
              <Text size="2" color="gray" className="hover:text-blue-600">
                FAQ
              </Text>
            </Link>
          </Flex>
                  
          <Text size="1" color="gray">
            © {new Date().getFullYear()} Nameeng. 
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <Container size="2" className="py-6">
        <Box className="max-w-2xl mx-auto text-center">
          <Text color="gray">Loading...</Text>
        </Box>
      </Container>
    }>
      <NameEngConverter />
    </Suspense>
  );
}