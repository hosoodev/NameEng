'use client';

import { useState } from 'react';
import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Container,
  Badge,
  TextField,
  Progress,
  Separator
} from '@radix-ui/themes';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import Link from 'next/link';

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
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    if (score >= 80) return 'green';
    if (score >= 60) return 'amber';
    return 'red';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="text-green-500" size={18} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={18} />;
      case 'error': return <XCircle className="text-red-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <Container size="3" className="py-8">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <Box>
          <Link href="/tools">
            <Button variant="ghost" size="2" className="mb-4">
              <ArrowLeft size={16} />
              도구 목록으로 돌아가기
            </Button>
          </Link>
          
          <Flex direction="column" gap="3">
            <Badge color="purple" size="2">영문명 도구</Badge>
            <Heading as="h1" size="8" weight="bold">
              영문명 적합성 검사기
            </Heading>
            <Text size="3" color="gray">
              영문명의 적합성을 종합적으로 분석하고 개선점을 제안합니다
            </Text>
          </Flex>
        </Box>

        <Separator size="4" />

        {/* 입력 폼 */}
        <Card>
          <Flex direction="column" gap="4">
            <Heading as="h2" size="4">영문명 입력</Heading>
            
            <Box>
              <Text size="2" weight="medium" className="mb-2 block">
                검사할 영문명을 입력하세요
              </Text>
              <TextField.Root
                placeholder="예: KIM Minjun, PARK So-young"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                size="3"
              />
              <Text size="1" color="gray" className="mt-1 block">
                성과 이름을 모두 포함하여 입력해주세요
              </Text>
            </Box>

            <Button 
              size="3" 
              onClick={analyzeName}
              disabled={!inputName.trim() || isAnalyzing}
              loading={isAnalyzing}
            >
              {isAnalyzing ? '분석 중...' : '적합성 검사 시작'}
            </Button>
          </Flex>
        </Card>

        {/* 전체 점수 */}
        {results.length > 0 && (
          <Card>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="4">종합 점수</Heading>
              <Flex align="center" gap="4">
                <Box className="flex-1">
                  <Progress value={overallScore} color={getScoreColor(overallScore)} size="3" />
                </Box>
                <Badge color={getScoreColor(overallScore)} size="3">
                  {overallScore}점
                </Badge>
              </Flex>
              <Text size="2" color="gray">
                {overallScore >= 80 ? '우수한 영문명입니다!' : 
                 overallScore >= 60 ? '양호한 영문명이지만 개선 여지가 있습니다.' :
                 '개선이 필요한 영문명입니다.'}
              </Text>
            </Flex>
          </Card>
        )}

        {/* 상세 결과 */}
        {results.length > 0 && (
          <Box className="space-y-4">
            <Heading as="h2" size="4">상세 분석 결과</Heading>
            {results.map((result, index) => (
              <Card key={index}>
                <Flex direction="column" gap="3">
                  <Flex justify="between" align="center">
                    <Flex align="center" gap="2">
                      {getStatusIcon(result.status)}
                      <Heading as="h3" size="3">{result.category}</Heading>
                    </Flex>
                    <Badge color={getScoreColor(result.score)} size="2">
                      {result.score}점
                    </Badge>
                  </Flex>
                  
                  <Text size="2">{result.message}</Text>
                  
                  {result.suggestions && (
                    <Box className="p-3 bg-gray-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-2 block">
                        개선 제안:
                      </Text>
                      <Flex direction="column" gap="1">
                        {result.suggestions.map((suggestion, idx) => (
                          <Text key={idx} size="2" color="gray">
                            • {suggestion}
                          </Text>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Card>
            ))}
          </Box>
        )}

        {/* 검사 기준 안내 */}
        <Card className="border-blue-200 bg-blue-50">
          <Flex direction="column" gap="3">
            <Heading as="h2" size="4">검사 기준 안내</Heading>
            <Flex direction="column" gap="2">
              <Text size="2"><strong>부정적 의미 검사:</strong> 부적절하거나 부정적인 의미를 가진 단어 포함 여부</Text>
              <Text size="2"><strong>발음 난이도:</strong> 영어권에서의 발음 용이성과 이름 길이</Text>
              <Text size="2"><strong>국제 통용성:</strong> 국제 표준 형식 준수 여부 (대소문자, 특수문자 등)</Text>
              <Text size="2"><strong>길이 적합성:</strong> 실용적이고 기억하기 쉬운 적절한 길이</Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}