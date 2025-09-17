import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Container,
  Badge,
  Separator
} from '@radix-ui/themes';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '국어의 로마자 표기법 규칙 상세 해설 | NameEng 블로그',
  description: '국립국어원의 로마자 표기법 규칙을 실제 예시와 함께 쉽게 이해할 수 있도록 상세히 설명합니다.',
  keywords: ['로마자 표기법', '국립국어원', '한글 로마자 변환', '표기법 규칙', '언어학'],
};

export default function RomanizationRulesPage() {
  return (
    <Container size="3" className="py-8">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <Box>
          <Link href="/blog">
            <Button variant="ghost" size="2" className="mb-4">
              <ArrowLeft size={16} />
              블로그로 돌아가기
            </Button>
          </Link>
          
          <Flex direction="column" gap="3">
            <Badge color="indigo" size="2">언어학</Badge>
            <Heading size="8" weight="bold">
              국어의 로마자 표기법 규칙 상세 해설
            </Heading>
            <Flex align="center" gap="4" className="text-gray-600">
              <Flex align="center" gap="1">
                <Calendar size={16} />
                <Text size="2">2024년 11월 20일</Text>
              </Flex>
              <Flex align="center" gap="1">
                <Clock size={16} />
                <Text size="2">15분 읽기</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Separator size="4" />

        {/* 본문 */}
        <Flex direction="column" gap="6">
          {/* 소개 */}
          <Card>
            <Flex align="center" gap="3" className="mb-4">
              <BookOpen className="text-indigo-500" size={20} />
              <Heading size="4">정확한 로마자 표기의 중요성</Heading>
            </Flex>
            <Text size="3" className="leading-relaxed">
              2000년에 제정된 국어의 로마자 표기법은 한국어를 로마자로 표기하는 공식 기준입니다. 
              이 규칙을 정확히 이해하면 일관되고 표준적인 영문명을 만들 수 있습니다. 
              복잡해 보이는 규칙들을 실제 예시와 함께 쉽게 풀어보겠습니다.
            </Text>
          </Card>

          {/* 1. 기본 원칙 */}
          <Box>
            <Heading size="5" className="mb-4">1. 로마자 표기법의 기본 원칙</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-blue-200 bg-blue-50">
                <Flex align="center" gap="3" className="mb-3">
                  <CheckCircle className="text-blue-500" size={18} />
                  <Heading size="3">핵심 원칙 3가지</Heading>
                </Flex>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>음성 중심:</strong> 한글의 실제 발음을 기준으로 표기</Text>
                  <Text size="3">• <strong>어법 존중:</strong> 한국어의 음성 변화 규칙 반영</Text>
                  <Text size="3">• <strong>국제성:</strong> 외국인이 발음하기 쉽도록 고려</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">📝 표기 순서</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">1. 한글을 소리 나는 대로 적되</Text>
                  <Text size="3">2. 음성 변화는 표기에 반영하고</Text>
                  <Text size="3">3. 체언은 단독형으로 적는다</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 2. 자음 표기법 */}
          <Box>
            <Heading size="5" className="mb-4">2. 자음 표기법</Heading>
            
            <Card>
              <Heading size="3" className="mb-4">기본 자음 대응표</Heading>
              <Box className="space-y-2">
                <Flex className="p-2 bg-gray-100 rounded font-medium">
                  <Box className="w-16">한글</Box>
                  <Box className="w-20">로마자</Box>
                  <Box className="flex-1">예시</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㄱ</Box>
                  <Box className="w-20">g</Box>
                  <Box className="flex-1">가방 → gabang</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㄴ</Box>
                  <Box className="w-20">n</Box>
                  <Box className="flex-1">나무 → namu</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㄷ</Box>
                  <Box className="w-20">d</Box>
                  <Box className="flex-1">다리 → dari</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㄹ</Box>
                  <Box className="w-20">r</Box>
                  <Box className="flex-1">라면 → ramyeon</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅁ</Box>
                  <Box className="w-20">m</Box>
                  <Box className="flex-1">마음 → maeum</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅂ</Box>
                  <Box className="w-20">b</Box>
                  <Box className="flex-1">바다 → bada</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅅ</Box>
                  <Box className="w-20">s</Box>
                  <Box className="flex-1">사람 → saram</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅇ</Box>
                  <Box className="w-20">-</Box>
                  <Box className="flex-1">아이 → ai</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅈ</Box>
                  <Box className="w-20">j</Box>
                  <Box className="flex-1">자동차 → jadongcha</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅊ</Box>
                  <Box className="w-20">ch</Box>
                  <Box className="flex-1">차례 → charye</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅋ</Box>
                  <Box className="w-20">k</Box>
                  <Box className="flex-1">코끼리 → kokkiri</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅌ</Box>
                  <Box className="w-20">t</Box>
                  <Box className="flex-1">타자기 → tajagi</Box>
                </Flex>
                <Flex className="p-2 border-b">
                  <Box className="w-16">ㅍ</Box>
                  <Box className="w-20">p</Box>
                  <Box className="flex-1">파도 → pado</Box>
                </Flex>
                <Flex className="p-2">
                  <Box className="w-16">ㅎ</Box>
                  <Box className="w-20">h</Box>
                  <Box className="flex-1">하늘 → haneul</Box>
                </Flex>
              </Box>
            </Card>
          </Box>

          {/* 3. 모음 표기법 */}
          <Box>
            <Heading size="5" className="mb-4">3. 모음 표기법</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-4">단모음</Heading>
                <Box className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅏ → a</Text>
                    <Text size="1" color="gray">아버지 → abeoji</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅓ → eo</Text>
                    <Text size="1" color="gray">어머니 → eomeoni</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅗ → o</Text>
                    <Text size="1" color="gray">오늘 → oneul</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅜ → u</Text>
                    <Text size="1" color="gray">우리 → uri</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅡ → eu</Text>
                    <Text size="1" color="gray">은행 → eunhaeng</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅣ → i</Text>
                    <Text size="1" color="gray">이름 → ireum</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅐ → ae</Text>
                    <Text size="1" color="gray">개구리 → gaeguri</Text>
                  </Box>
                  <Box className="p-2 bg-gray-50 rounded text-center">
                    <Text size="2" weight="bold">ㅔ → e</Text>
                    <Text size="1" color="gray">세상 → sesang</Text>
                  </Box>
                </Box>
              </Card>

              <Card>
                <Heading size="3" className="mb-4">복합모음</Heading>
                <Box className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅑ → ya</Text>
                    <Text size="1" color="gray">야구 → yagu</Text>
                  </Box>
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅕ → yeo</Text>
                    <Text size="1" color="gray">여행 → yeohaeng</Text>
                  </Box>
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅛ → yo</Text>
                    <Text size="1" color="gray">요리 → yori</Text>
                  </Box>
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅠ → yu</Text>
                    <Text size="1" color="gray">유명 → yumyeong</Text>
                  </Box>
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅘ → wa</Text>
                    <Text size="1" color="gray">과일 → gwail</Text>
                  </Box>
                  <Box className="p-2 bg-blue-50 rounded text-center">
                    <Text size="2" weight="bold">ㅝ → wo</Text>
                    <Text size="1" color="gray">권투 → gwontu</Text>
                  </Box>
                </Box>
              </Card>
            </Flex>
          </Box>

          {/* 4. 받침 표기법 */}
          <Box>
            <Heading size="5" className="mb-4">4. 받침 표기법</Heading>
            
            <Card className="border-orange-200 bg-orange-50">
              <Flex align="center" gap="3" className="mb-3">
                <AlertCircle className="text-orange-500" size={18} />
                <Heading size="3">받침의 특별 규칙</Heading>
              </Flex>
              <Text size="3" className="mb-3">
                받침은 뒤에 오는 소리에 따라 표기가 달라집니다.
              </Text>
              
              <Flex direction="column" gap="3">
                <Box>
                  <Text size="2" weight="medium" className="mb-2">1. 자음 앞이나 어말에서</Text>
                  <Box className="p-3 bg-white rounded-md">
                    <Text size="2">• ㄱ, ㅋ, ㄲ → k: 국가 → gukga, 부엌 → bueok</Text>
                    <Text size="2">• ㄴ → n: 산길 → sangil, 눈 → nun</Text>
                    <Text size="2">• ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ → t: 밭 → bat, 낮 → nat</Text>
                    <Text size="2">• ㄹ → l: 달 → dal, 물 → mul</Text>
                    <Text size="2">• ㅁ → m: 감사 → gamsa, 봄 → bom</Text>
                    <Text size="2">• ㅂ, ㅍ → p: 입구 → ipgu, 앞 → ap</Text>
                    <Text size="2">• ㅇ → ng: 강물 → gangmul, 방 → bang</Text>
                  </Box>
                </Box>
                
                <Box>
                  <Text size="2" weight="medium" className="mb-2">2. 모음 앞에서</Text>
                  <Box className="p-3 bg-white rounded-md">
                    <Text size="2">• 받침이 뒤 음절 첫소리로: 국어 → gugeo, 밥알 → babal</Text>
                  </Box>
                </Box>
              </Flex>
            </Card>
          </Box>

          {/* 5. 인명 표기 특례 */}
          <Box>
            <Heading size="5" className="mb-4">5. 인명 표기의 특별 규칙</Heading>
            
            <Card className="border-green-200 bg-green-50">
              <Flex align="center" gap="3" className="mb-3">
                <CheckCircle className="text-green-500" size={18} />
                <Heading size="3">성씨와 이름 표기</Heading>
              </Flex>
              
              <Flex direction="column" gap="3">
                <Box>
                  <Text size="2" weight="medium" className="mb-2">성씨 표기 원칙</Text>
                  <Box className="p-3 bg-white rounded-md">
                    <Text size="2">• 김 → Gim (표준) / Kim (관용)</Text>
                    <Text size="2">• 이 → I (표준) / Lee (관용)</Text>
                    <Text size="2">• 박 → Bak (표준) / Park (관용)</Text>
                    <Text size="2">• 최 → Choe (표준) / Choi (관용)</Text>
                  </Box>
                </Box>
                
                <Box>
                  <Text size="2" weight="medium" className="mb-2">이름 표기 방식</Text>
                  <Box className="p-3 bg-white rounded-md">
                    <Text size="2">• 붙여쓰기: 민준 → Minjun</Text>
                    <Text size="2">• 하이픈: 민준 → Min-jun</Text>
                    <Text size="2">• 띄어쓰기: 민준 → Min jun (권장하지 않음)</Text>
                  </Box>
                </Box>
              </Flex>
            </Card>
          </Box>

          {/* 마무리 */}
          <Card>
            <Heading size="4" className="mb-3">정확한 표기법으로 더 나은 소통을</Heading>
            <Text size="3" className="leading-relaxed">
              로마자 표기법은 복잡해 보이지만, 기본 원칙을 이해하면 누구나 정확한 표기를 할 수 있습니다. 
              표준 표기와 관용 표기 중 자신의 상황에 맞는 것을 선택하되, 
              일관성을 유지하는 것이 가장 중요합니다. 
              NameEng는 이러한 규칙들을 자동으로 적용하여 정확하고 일관된 영문명을 제공합니다.
            </Text>
          </Card>
        </Flex>

        {/* 공유 버튼 */}
        <Flex justify="center" className="pt-6">
          <Button variant="outline" size="3">
            <Share2 size={16} />
            이 글 공유하기
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}