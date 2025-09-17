import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Separator,
  Container,
  Badge,
  Code
} from '@radix-ui/themes';
import { 
  ArrowLeft, 
  Play, 
  Settings, 
  Copy, 
  Share2, 
  AlertTriangle,
  CheckCircle,
  Keyboard
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용방법 가이드 - 영문이름변환기 사용법 | Nameeng 네이밍',
  description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다. 한글 이름 입력부터 복성 선택, 성씨 표기 선택, 옵션 설정까지 모든 기능을 쉽게 배워보세요.',
  keywords: '영문이름변환기 사용법, NameEng 이용방법, 한글 이름 로마자 변환 가이드, 복성 선택 방법, 성씨 표기 선택, 로마자 변환 옵션 설정',
  openGraph: {
    title: '이용방법 가이드 - 영문이름변환기 사용법',
    description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다. 한글 이름 입력부터 복성 선택, 성씨 표기 선택, 옵션 설정까지 모든 기능을 쉽게 배워보세요.',
    type: 'website',
    url: 'https://nameeng.com/how-to-use',
  },
  twitter: {
    card: 'summary',
    title: '이용방법 가이드 - 영문이름변환기 사용법',
    description: 'NameEng 영문이름변환기 사용법을 단계별로 안내합니다.',
  },
};

export default function HowToUse() {
  return (
    <Container size="2" className="py-6 px-4">
      <Box className="max-w-2xl mx-auto">
        {/* Header */}
        <Flex align="center" gap="4" className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="2">
              <ArrowLeft size={16} />
              NameEng로 돌아가기
            </Button>
          </Link>
        </Flex>

        <Box className="mb-8">
          <Heading as="h1" size="7" className="mb-4" style={{ letterSpacing: '-0.02em' }}>
            이용방법 가이드
          </Heading>
          <Text size="3" color="gray">
            NameEng를 효과적으로 활용하는 방법을 단계별로 안내합니다.
          </Text>
        </Box>

        {/* 빠른 시작 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Play size={20} className="text-green-600" />
              빠른 시작
            </Heading>
            
            <Box className="space-y-4">
              <Text size="3" className="mb-4">
                가장 기본적인 사용법을 30초만에 익혀보세요!
              </Text>

              <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Box className="p-4 bg-blue-50 rounded-md text-center">
                  <Box className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    1
                  </Box>
                  <Text size="2" weight="medium" className="mb-1 block">
                    이름 입력
                  </Text>
                  <Text size="1" color="gray">
                    한글 이름을 입력하세요
                  </Text>
                </Box>

                <Box className="p-4 bg-green-50 rounded-md text-center">
                  <Box className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    2
                  </Box>
                  <Text size="2" weight="medium" className="mb-1 block">
                    엔터 또는 변환
                  </Text>
                  <Text size="1" color="gray">
                    Enter키나 버튼 클릭
                  </Text>
                </Box>

                <Box className="p-4 bg-purple-50 rounded-md text-center">
                  <Box className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    3
                  </Box>
                  <Text size="2" weight="medium" className="mb-1 block">
                    결과 확인
                  </Text>
                  <Text size="1" color="gray">
                    로마자 변환 결과 확인
                  </Text>
                </Box>

                <Box className="p-4 bg-amber-50 rounded-md text-center">
                  <Box className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    4
                  </Box>
                  <Text size="2" weight="medium" className="mb-1 block">
                    복사 & 활용
                  </Text>
                  <Text size="1" color="gray">
                    결과 복사 후 사용
                  </Text>
                </Box>
              </Box>

              <Box className="p-4 bg-gray-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  💡 예시: &ldquo;김민수&rdquo; 입력 → &ldquo;Kim Minsu&rdquo; 출력
                </Text>
                <Text size="2" color="gray">
                  추가 옵션 없이도 바로 표준 로마자 표기를 얻을 수 있습니다.
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 상세 사용법 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Settings size={20} className="text-blue-600" />
              상세 사용법
            </Heading>
            
            <Box className="space-y-6">
              {/* 이름 입력 */}
              <Box>
                <Badge color="blue" className="mb-3">Step 1</Badge>
                <Text size="3" weight="medium" className="mb-3 block">
                  한글 이름 입력
                </Text>
                
                <Box className="space-y-3">
                  <Box className="p-3 bg-blue-50 rounded-md">
                    <Text size="2" weight="medium" className="mb-1 block">
                      ✅ 올바른 입력 예시
                    </Text>
                    <Text size="2" color="gray">
                      • 김민수, 이영희, 박지성<br/>
                      • 남궁민수, 선우용녀 (복성 포함)<br/>
                      • 최민, 이준 (외자 이름 포함)
                    </Text>
                  </Box>

                  <Box className="p-3 bg-red-50 rounded-md">
                    <Text size="2" weight="medium" className="mb-1 block">
                      ❌ 피해야 할 입력
                    </Text>
                    <Text size="2" color="gray">
                      • 영어나 숫자 포함 (Kim민수, 이영희2)<br/>
                      • 특수문자 포함 (김-민수, 이*영희)<br/>
                      • 공백 포함 (김 민수, 이 영희)
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-2 p-3 bg-amber-50 rounded-md">
                    <Keyboard size={16} className="text-amber-600" />
                    <Text size="2" color="gray">
                      <Text weight="medium">팁:</Text> 입력 후 <Code>Enter</Code> 키를 누르면 바로 변환됩니다.
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* 복성 선택 */}
              <Box>
                <Badge color="purple" className="mb-3">Step 2</Badge>
                <Text size="3" weight="medium" className="mb-3 block">
                  복성 선택 (해당하는 경우)
                </Text>
                
                <Box className="space-y-3">
                  <Text size="2" color="gray">
                    남궁, 선우, 사공, 제갈, 독고 등의 복성이 감지되면 선택 옵션이 나타납니다.
                  </Text>

                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Box className="p-3 bg-purple-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-1 block">
                        복성 선택 시
                      </Text>
                      <Text size="2" color="gray">
                        선우용녀 → <strong>Seonu</strong> Yongnyeo<br/>
                        (선우를 하나의 성씨로 인식)
                      </Text>
                    </Box>

                    <Box className="p-3 bg-gray-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-1 block">
                        단성 선택 시
                      </Text>
                      <Text size="2" color="gray">
                        선우용녀 → <strong>Seon</strong> Uyongnyeo<br/>
                        (선만을 성씨로 인식)
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* 성씨 표기 선택 */}
              <Box>
                <Badge color="green" className="mb-3">Step 3</Badge>
                <Text size="3" weight="medium" className="mb-3 block">
                  성씨 표기 선택
                </Text>
                
                <Box className="space-y-3">
                  <Text size="2" color="gray">
                    각 성씨마다 여러 표기 옵션이 제공됩니다. 첫 번째가 표준 표기이며, 
                    관용적으로 사용되는 다른 표기들도 선택할 수 있습니다.
                  </Text>

                  <Box className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Box className="p-3 bg-green-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-1 block">
                        김(金) 씨
                      </Text>
                      <Text size="2" color="gray">
                        Kim (표준) | Gim | Keem<br/>
                        Ghim | Kym | Kin
                      </Text>
                    </Box>

                    <Box className="p-3 bg-green-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-1 block">
                        이(李) 씨
                      </Text>
                      <Text size="2" color="gray">
                        Lee (관용) | I (표준)<br/>
                        Rhee | Yi | Yee | Rhie
                      </Text>
                    </Box>

                    <Box className="p-3 bg-green-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-1 block">
                        박(朴) 씨
                      </Text>
                      <Text size="2" color="gray">
                        Park (관용) | Bak (표준)<br/>
                        Bark | Pack | Pag
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* 기타 옵션 */}
              <Box>
                <Badge color="amber" className="mb-3">Step 4</Badge>
                <Text size="3" weight="medium" className="mb-3 block">
                  추가 옵션 설정
                </Text>
                
                <Box className="space-y-4">
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Box className="p-3 bg-amber-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-2 block">
                        📝 이름 순서
                      </Text>
                      <Text size="2" color="gray">
                        • <strong>성-이름</strong>: Kim Minsu (기본)<br/>
                        • <strong>이름-성</strong>: Minsu Kim
                      </Text>
                    </Box>

                    <Box className="p-3 bg-amber-50 rounded-md">
                      <Text size="2" weight="medium" className="mb-2 block">
                        🔤 대소문자 스타일
                      </Text>
                      <Text size="2" color="gray">
                        • <strong>첫글자 대문자</strong>: Kim Minsu<br/>
                        • <strong>소문자</strong>: kim minsu<br/>
                        • <strong>대문자</strong>: KIM MINSU
                      </Text>
                    </Box>
                  </Box>

                  <Box className="p-3 bg-amber-50 rounded-md">
                    <Text size="2" weight="medium" className="mb-2 block">
                      ➖ 이름 음절 구분 (하이픈)
                    </Text>
                    <Text size="2" color="gray">
                      • <strong>사용 안함</strong>: Kim Minsu<br/>
                      • <strong>사용함</strong>: Kim Min-su (이름 음절 사이에 하이픈)
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 결과 활용법 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              결과 활용법
            </Heading>
            
            <Box className="space-y-4">
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box className="p-4 bg-green-50 rounded-md">
                  <Flex align="center" gap="2" className="mb-2">
                    <Copy size={16} className="text-green-600" />
                    <Text size="2" weight="medium">
                      복사 기능
                    </Text>
                  </Flex>
                  <Text size="2" color="gray">
                    변환된 결과를 클릭 한 번으로 클립보드에 복사하여 
                    다른 문서나 양식에 바로 붙여넣기할 수 있습니다.
                  </Text>
                </Box>

                <Box className="p-4 bg-blue-50 rounded-md">
                  <Flex align="center" gap="2" className="mb-2">
                    <Share2 size={16} className="text-blue-600" />
                    <Text size="2" weight="medium">
                      공유 기능
                    </Text>
                  </Flex>
                  <Text size="2" color="gray">
                    설정된 옵션과 함께 결과를 URL로 공유하여 
                    다른 사람과 쉽게 공유하거나 나중에 다시 확인할 수 있습니다.
                  </Text>
                </Box>
              </Box>

              <Box className="p-4 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
                <Flex align="center" gap="2" className="mb-2">
                  <AlertTriangle size={16} className="text-yellow-600" />
                  <Text size="2" weight="medium">
                    부정적 의미 경고
                  </Text>
                </Flex>
                <Text size="2" color="gray">
                  변환 결과가 영어권에서 부정적 의미를 가질 수 있는 경우 
                  자동으로 경고가 표시되며, 안전한 대안이 제시됩니다.
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 실용적 팁 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              💡 실용적 팁
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  1. 여권 발급 시
                </Text>
                <Text size="2" color="gray">
                  • 표준 표기를 기본으로 하되, 기존에 사용하던 관용 표기가 있다면 증빙서류와 함께 신청<br/>
                  • 하이픈 사용 여부는 신중히 결정 (기존 비자와의 일치성 고려)<br/>
                  • <Link href="/passport-guide" className="underline hover:text-blue-600">여권 규정 가이드</Link>에서 자세한 정보 확인
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  2. 해외 거주/유학 시
                </Text>
                <Text size="2" color="gray">
                  • 부정적 의미 경고가 있는 경우 반드시 대안 표기 고려<br/>
                  • 현지에서 발음하기 쉬운 표기 선택<br/>
                  • 일관성 있게 동일한 표기 사용
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  3. 비즈니스/학술 목적
                </Text>
                <Text size="2" color="gray">
                  • 전문적이고 격식 있는 표기 선택<br/>
                  • 국제 표준에 맞는 표기법 우선 고려<br/>
                  • 명함, 이메일 서명 등에서 일관성 유지
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  4. 소셜미디어/일상 사용
                </Text>
                <Text size="2" color="gray">
                  • 개성을 살릴 수 있는 관용 표기 활용<br/>
                  • 기억하기 쉽고 입력하기 편한 표기 선택<br/>
                  • 하이픈 사용으로 가독성 향상 고려
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 자주 하는 실수 */}
        <Card size="3" className="mb-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              ⚠️ 자주 하는 실수와 해결법
            </Heading>
            
            <Box className="space-y-4">
              <Box className="p-4 bg-red-50 rounded-md border-l-4 border-red-500">
                <Text size="2" weight="medium" className="mb-2 block">
                  실수 1: 일관성 없는 표기 사용
                </Text>
                <Text size="2" color="gray" className="mb-2">
                  문서마다 다른 표기를 사용하여 신원 확인에 문제가 생기는 경우
                </Text>
                <Text size="2" weight="medium" color="green">
                  해결법: 한 번 결정한 표기를 모든 공식 문서에서 일관되게 사용
                </Text>
              </Box>

              <Box className="p-4 bg-red-50 rounded-md border-l-4 border-red-500">
                <Text size="2" weight="medium" className="mb-2 block">
                  실수 2: 부정적 의미 무시
                </Text>
                <Text size="2" color="gray" className="mb-2">
                  경고를 무시하고 문제가 있는 표기를 계속 사용하는 경우
                </Text>
                <Text size="2" weight="medium" color="green">
                  해결법: 경고가 나타나면 반드시 대안 표기 검토 후 결정
                </Text>
              </Box>

              <Box className="p-4 bg-red-50 rounded-md border-l-4 border-red-500">
                <Text size="2" weight="medium" className="mb-2 block">
                  실수 3: 복성 처리 오류
                </Text>
                <Text size="2" color="gray" className="mb-2">
                  남궁민수를 Nam Gungminsu로 잘못 분리하는 경우
                </Text>
                <Text size="2" weight="medium" color="green">
                  해결법: 복성 선택 옵션을 활용하여 올바른 성씨 구분 적용
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 추가 도움말 */}
        <Box className="text-center">
          <Separator className="mb-6" />
          
          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              더 자세한 정보가 필요하신가요?
            </Text>
            
            <Flex gap="3" justify="center" wrap="wrap">
              <Button asChild variant="outline">
                <Link href="/faq">
                  자주 묻는 질문
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/romanization-guide">
                  로마자 표기법 가이드
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/passport-guide">
                  여권 규정 가이드
                </Link>
              </Button>
            </Flex>
          </Box>

          <Text size="1" color="gray">
            이용방법에 대한 추가 질문이 있으시면 언제든지 문의해 주세요.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
