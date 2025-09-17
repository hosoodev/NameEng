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
import { ArrowLeft, Calendar, Clock, Share2, Shield, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '영어권에서 피해야 할 한국 이름 표기들 | NameEng 블로그',
  description: '한글 이름을 로마자로 변환할 때 영어권에서 부정적 의미를 가질 수 있는 표기들과 안전한 대안을 소개합니다.',
  keywords: ['부정적 의미', '영문명 주의사항', '안전한 표기', '영어권 문화', '이름 변환 주의점'],
};

export default function NegativeMeaningWordsPage() {
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
            <Badge color="red" size="2">안전가이드</Badge>
            <Heading size="8" weight="bold">
              영어권에서 피해야 할 한국 이름 표기들
            </Heading>
            <Flex align="center" gap="4" className="text-gray-600">
              <Flex align="center" gap="1">
                <Calendar size={16} />
                <Text size="2">2024년 11월 15일</Text>
              </Flex>
              <Flex align="center" gap="1">
                <Clock size={16} />
                <Text size="2">9분 읽기</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Separator size="4" />

        {/* 본문 */}
        <Flex direction="column" gap="6">
          {/* 소개 */}
          <Card className="border-orange-200 bg-orange-50">
            <Flex align="center" gap="3" className="mb-4">
              <Shield className="text-orange-500" size={20} />
              <Heading size="4">문화적 차이를 고려한 안전한 영문명</Heading>
            </Flex>
            <Text size="3" className="leading-relaxed">
              한글 이름을 로마자로 변환할 때, 의도치 않게 영어권에서 부정적이거나 부적절한 의미를 가질 수 있습니다. 
              이런 문제를 미리 파악하고 적절한 대안을 선택하여 불필요한 오해나 불편함을 피해보세요.
            </Text>
          </Card>

          {/* 1. 왜 중요한가? */}
          <Box>
            <Heading size="5" className="mb-4">1. 왜 이런 주의가 필요할까요?</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">🌍 실제 경험담들</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• 해외 취업 면접에서 이름 때문에 어색한 분위기가 된 경우</Text>
                  <Text size="3">• 학교에서 친구들이 이름을 부르기 꺼려하는 상황</Text>
                  <Text size="3">• 비즈니스 미팅에서 이름 소개 시 웃음이 나오는 경우</Text>
                  <Text size="3">• 호텔이나 레스토랑 예약 시 곤란한 상황</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">💡 해결의 중요성</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>첫인상:</strong> 이름은 첫 만남에서 가장 먼저 전달되는 정보</Text>
                  <Text size="3">• <strong>전문성:</strong> 비즈니스 환경에서의 신뢰도에 영향</Text>
                  <Text size="3">• <strong>사회적 관계:</strong> 원활한 인간관계 형성에 도움</Text>
                  <Text size="3">• <strong>자신감:</strong> 당당하게 자신을 소개할 수 있는 자신감</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 2. 주의해야 할 표기들 */}
          <Box>
            <Heading size="5" className="mb-4">2. 주의해야 할 표기 유형들</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-red-200 bg-red-50">
                <Flex align="center" gap="3" className="mb-3">
                  <XCircle className="text-red-500" size={18} />
                  <Heading size="3">부적절한 의미를 가진 단어들</Heading>
                </Flex>
                
                <Flex direction="column" gap="3">
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">욕설이나 비속어와 유사한 경우</Text>
                    <Box className="p-3 bg-white rounded-md">
                      <Text size="2">• Hell, Damn, Ass 등과 유사한 발음</Text>
                      <Text size="2">• 성적 함의가 있는 단어들과 유사한 경우</Text>
                      <Text size="2">• 종교적으로 민감한 표현들</Text>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">부정적 의미의 일반 단어들</Text>
                    <Box className="p-3 bg-white rounded-md">
                      <Text size="2">• Sick, Die, Kill, Hate 등</Text>
                      <Text size="2">• Stupid, Ugly, Bad 등</Text>
                      <Text size="2">• 질병이나 부정적 상태를 나타내는 단어들</Text>
                    </Box>
                  </Box>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">😅 우스꽝스럽게 들릴 수 있는 경우</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• 동물 이름과 유사: Pig, Dog, Cat 등</Text>
                  <Text size="3">• 음식 이름과 유사: Ham, Cheese, Bean 등</Text>
                  <Text size="3">• 일상용품과 유사: Pen, Cup, Bag 등</Text>
                  <Text size="3">• 유명 브랜드나 캐릭터와 동일</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 3. 구체적인 예시와 대안 */}
          <Box>
            <Heading size="5" className="mb-4">3. 구체적인 예시와 대안</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">📝 실제 사례별 해결책</Heading>
                
                <Flex direction="column" gap="4">
                  <Box className="p-4 border rounded-md">
                    <Text size="2" weight="medium" className="mb-2 text-red-600">❌ 문제가 될 수 있는 표기</Text>
                    <Text size="2" className="mb-2">석진 → Seokjin → &ldquo;Suck Jin&rdquo;으로 들릴 수 있음</Text>
                    <Text size="2" weight="medium" className="mb-2 text-green-600">✅ 안전한 대안</Text>
                    <Text size="2">• Seok-jin (하이픈 사용)</Text>
                    <Text size="2">• Sukjin (다른 로마자 표기)</Text>
                    <Text size="2">• Jin (이름 부분만 사용)</Text>
                  </Box>
                  
                  <Box className="p-4 border rounded-md">
                    <Text size="2" weight="medium" className="mb-2 text-red-600">❌ 문제가 될 수 있는 표기</Text>
                    <Text size="2" className="mb-2">지옥 → Jiok → &ldquo;지옥(Hell)&rdquo;의 의미</Text>
                    <Text size="2" weight="medium" className="mb-2 text-green-600">✅ 안전한 대안</Text>
                    <Text size="2">• Ji-ok (하이픈으로 구분)</Text>
                    <Text size="2">• Jiuk (다른 발음 표기)</Text>
                    <Text size="2">• 영문 이름 채택 고려</Text>
                  </Box>
                  
                  <Box className="p-4 border rounded-md">
                    <Text size="2" weight="medium" className="mb-2 text-red-600">❌ 문제가 될 수 있는 표기</Text>
                    <Text size="2" className="mb-2">병신 → Byeongsin → 부정적 의미</Text>
                    <Text size="2" weight="medium" className="mb-2 text-green-600">✅ 안전한 대안</Text>
                    <Text size="2">• Byeong-sin (하이픈 사용)</Text>
                    <Text size="2">• Ben (영문 이름 채택)</Text>
                    <Text size="2">• 신 → Sin 대신 Shin 사용</Text>
                  </Box>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 4. 예방 전략 */}
          <Box>
            <Heading size="5" className="mb-4">4. 문제 예방 전략</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-blue-200 bg-blue-50">
                <Flex align="center" gap="3" className="mb-3">
                  <CheckCircle className="text-blue-500" size={18} />
                  <Heading size="3">사전 검토 방법</Heading>
                </Flex>
                
                <Flex direction="column" gap="3">
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">1. 영어 사전 검색</Text>
                    <Text size="2" color="gray">변환된 영문명을 영어 사전에서 검색해보세요</Text>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">2. 원어민 친구에게 문의</Text>
                    <Text size="2" color="gray">영어권 친구나 동료에게 어떻게 들리는지 물어보세요</Text>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">3. 온라인 발음 도구 활용</Text>
                    <Text size="2" color="gray">구글 번역기 등에서 실제 발음을 들어보세요</Text>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2">4. 문화적 맥락 고려</Text>
                    <Text size="2" color="gray">거주하거나 활동할 지역의 문화적 특성을 고려하세요</Text>
                  </Box>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🛡️ 안전한 표기 원칙</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>하이픈 활용:</strong> 음절을 명확히 구분하여 오해 방지</Text>
                  <Text size="3">• <strong>대체 표기:</strong> 같은 소리의 다른 로마자 표기 고려</Text>
                  <Text size="3">• <strong>부분 사용:</strong> 이름의 일부만 사용하는 것도 방법</Text>
                  <Text size="3">• <strong>영문명 채택:</strong> 필요시 완전히 다른 영문명 선택</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 5. 대안 선택 가이드 */}
          <Box>
            <Heading size="5" className="mb-4">5. 대안 선택 가이드</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">🎯 상황별 대응 전략</Heading>
                
                <Flex direction="column" gap="3">
                  <Box>
                    <Text size="2" weight="medium" className="mb-2 text-blue-600">비즈니스 환경</Text>
                    <Flex direction="column" gap="1">
                      <Text size="2">• 전문적이고 기억하기 쉬운 표기 선택</Text>
                      <Text size="2">• 하이픈이나 이니셜 활용으로 명확성 확보</Text>
                      <Text size="2">• 명함에 발음 가이드 추가</Text>
                    </Flex>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2 text-green-600">학교 환경</Text>
                    <Flex direction="column" gap="1">
                      <Text size="2">• 친구들이 부르기 쉬운 닉네임 준비</Text>
                      <Text size="2">• 교사에게 선호하는 호칭 미리 안내</Text>
                      <Text size="2">• 문화적 배경 설명으로 이해도 높이기</Text>
                    </Flex>
                  </Box>
                  
                  <Box>
                    <Text size="2" weight="medium" className="mb-2 text-purple-600">일상생활</Text>
                    <Flex direction="column" gap="1">
                      <Text size="2">• 상황에 따라 다른 버전 사용</Text>
                      <Text size="2">• 공식 문서는 일관성 유지</Text>
                      <Text size="2">• 친근한 관계에서는 편한 호칭 사용</Text>
                    </Flex>
                  </Box>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">💡 창의적 해결책들</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>미들네임 활용:</strong> James Minjun Kim처럼 영문명과 한국명 조합</Text>
                  <Text size="3">• <strong>이니셜 사용:</strong> M.J. Kim처럼 이니셜로 간단하게</Text>
                  <Text size="3">• <strong>의미 번역:</strong> 이름의 뜻을 영어로 번역한 이름 채택</Text>
                  <Text size="3">• <strong>음성학적 접근:</strong> 비슷한 소리의 영어 이름 선택</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 6. NameEng의 안전 기능 */}
          <Box>
            <Heading size="5" className="mb-4">6. NameEng의 안전 검사 기능</Heading>
            
            <Card className="border-green-200 bg-green-50">
              <Flex align="center" gap="3" className="mb-3">
                <Shield className="text-green-500" size={18} />
                <Heading size="3">자동 안전성 검사</Heading>
              </Flex>
              
              <Flex direction="column" gap="3">
                <Text size="3">
                  NameEng는 영문명 변환 시 자동으로 부정적 의미를 가질 수 있는 표기들을 검사하고 
                  안전한 대안을 제시합니다.
                </Text>
                
                <Box className="p-3 bg-white rounded-md">
                  <Text size="2" weight="medium" className="mb-2">포함된 검사 항목:</Text>
                  <Flex direction="column" gap="1">
                    <Text size="2">• 부적절한 의미의 영어 단어 검사</Text>
                    <Text size="2">• 발음상 문제가 될 수 있는 조합 확인</Text>
                    <Text size="2">• 문화적으로 민감한 표현 필터링</Text>
                    <Text size="2">• 안전한 대안 표기 자동 제안</Text>
                  </Flex>
                </Box>
                
                <Link href="/tools/name-checker">
                  <Button size="3">
                    영문명 안전성 검사하기
                  </Button>
                </Link>
              </Flex>
            </Card>
          </Box>

          {/* 마무리 */}
          <Card>
            <Heading size="4" className="mb-3">안전하고 자신감 있는 영문명으로</Heading>
            <Text size="3" className="leading-relaxed">
              영문명 선택 시 문화적 차이를 고려하는 것은 단순한 주의사항이 아니라 
              성공적인 국제적 소통을 위한 필수 요소입니다. 
              사전에 충분히 검토하고 적절한 대안을 선택하여 
              어떤 상황에서도 당당하게 자신을 소개할 수 있는 영문명을 만들어보세요. 
              작은 주의가 큰 차이를 만들어낼 수 있습니다.
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