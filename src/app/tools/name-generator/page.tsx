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
  Separator
} from '@radix-ui/themes';
import { ArrowLeft, Calculator, Copy, Download } from 'lucide-react';
import Link from 'next/link';

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <Badge color="blue" size="2">영문명 도구</Badge>
            <Heading as="h1" size="8" weight="bold">
              영문명 조합 생성기
            </Heading>
            <Text size="3" color="gray">
              다양한 성씨 표기와 이름 스타일을 조합하여 여러 가지 영문명 후보를 생성합니다
            </Text>
          </Flex>
        </Box>

        <Separator size="4" />

        {/* 입력 폼 */}
        <Card>
          <Flex direction="column" gap="4">
            <Heading as="h2" size="4">이름 정보 입력</Heading>
            
            <Flex direction="column" gap="3">
              <Box>
                <Text size="2" weight="medium" className="mb-2 block">
                  성씨 (한글)
                </Text>
                <TextField.Root
                  placeholder="예: 김, 이, 박"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  size="3"
                />
                {surname && surnameVariations[surname] && (
                  <Text size="1" color="gray" className="mt-1 block">
                    사용 가능한 표기: {surnameVariations[surname].join(', ')}
                  </Text>
                )}
              </Box>

              <Box>
                <Text size="2" weight="medium" className="mb-2 block">
                  이름 (영문 표기)
                </Text>
                <TextField.Root
                  placeholder="예: Minjun, Soyoung"
                  value={givenName}
                  onChange={(e) => setGivenName(e.target.value)}
                  size="3"
                />
              </Box>

              <Box>
                <Text size="2" weight="medium" className="mb-2 block">
                  이름 스타일 선택
                </Text>
                <Flex gap="2" wrap="wrap">
                  {nameStyles.map(style => (
                    <Button
                      key={style.id}
                      variant={selectedStyles.includes(style.id) ? 'solid' : 'outline'}
                      size="2"
                      onClick={() => {
                        if (selectedStyles.includes(style.id)) {
                          setSelectedStyles(selectedStyles.filter(s => s !== style.id));
                        } else {
                          setSelectedStyles([...selectedStyles, style.id]);
                        }
                      }}
                    >
                      {style.label} ({style.example})
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Flex>

            <Button 
              size="3" 
              onClick={generateCombinations}
              disabled={!surname || !givenName || selectedStyles.length === 0}
            >
              <Calculator size={16} />
              조합 생성하기
            </Button>
          </Flex>
        </Card>

        {/* 결과 */}
        {results.length > 0 && (
          <Card>
            <Flex direction="column" gap="4">
              <Flex justify="between" align="center">
                <Heading as="h2" size="4">생성된 영문명 조합 ({results.length}개)</Heading>
                <Button variant="outline" size="2" onClick={downloadResults}>
                  <Download size={16} />
                  다운로드
                </Button>
              </Flex>

              <Box className="space-y-2">
                {results.map((name, index) => (
                  <Flex key={index} justify="between" align="center" className="p-3 bg-gray-50 rounded-md">
                    <Text size="3" weight="medium">{name}</Text>
                    <Button 
                      variant="ghost" 
                      size="1"
                      onClick={() => copyToClipboard(name)}
                    >
                      <Copy size={14} />
                    </Button>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </Card>
        )}

        {/* 사용 팁 */}
        <Card className="border-blue-200 bg-blue-50">
          <Flex direction="column" gap="3">
            <Heading as="h2" size="4">사용 팁</Heading>
            <Flex direction="column" gap="2">
              <Text size="2">• 여러 스타일을 선택하여 다양한 옵션을 확인해보세요</Text>
              <Text size="2">• 생성된 조합 중에서 발음하기 쉽고 기억하기 좋은 것을 선택하세요</Text>
              <Text size="2">• 공식 문서에 사용할 때는 일관성을 유지하는 것이 중요합니다</Text>
              <Text size="2">• 복사 버튼을 클릭하여 원하는 조합을 쉽게 복사할 수 있습니다</Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}