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
import { ArrowLeft, Calendar, Clock, Share2, Briefcase, Mail, CreditCard, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '국제 비즈니스에서의 영문명 에티켓 | NameEng 블로그',
  description: '글로벌 비즈니스 환경에서 전문적이고 효과적인 영문명 사용법과 명함, 이메일 서명 작성 가이드입니다.',
  keywords: ['비즈니스 영문명', '국제 비즈니스', '명함 작성법', '이메일 서명', '비즈니스 에티켓'],
};

export default function BusinessNameEtiquettePage() {
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
            <Badge color="purple" size="2">비즈니스</Badge>
            <Heading size="8" weight="bold">
              국제 비즈니스에서의 영문명 에티켓
            </Heading>
            <Flex align="center" gap="4" className="text-gray-600">
              <Flex align="center" gap="1">
                <Calendar size={16} />
                <Text size="2">2024년 11월 28일</Text>
              </Flex>
              <Flex align="center" gap="1">
                <Clock size={16} />
                <Text size="2">7분 읽기</Text>
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
              <Briefcase className="text-purple-500" size={20} />
              <Heading size="4">첫인상이 결정하는 비즈니스 성공</Heading>
            </Flex>
            <Text size="3" className="leading-relaxed">
              글로벌 비즈니스에서 영문명은 단순한 호칭을 넘어 전문성과 신뢰도를 나타내는 중요한 요소입니다. 
              올바른 영문명 사용법과 비즈니스 에티켓을 통해 성공적인 국제 업무 관계를 구축해보세요.
            </Text>
          </Card>

          {/* 1. 비즈니스 영문명의 기본 원칙 */}
          <Box>
            <Heading size="5" className="mb-4">1. 비즈니스 영문명의 기본 원칙</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">✨ 전문성 (Professionalism)</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>일관성:</strong> 모든 비즈니스 문서에서 동일한 이름 사용</Text>
                  <Text size="3">• <strong>정확성:</strong> 철자와 발음이 명확하고 정확해야 함</Text>
                  <Text size="3">• <strong>적절성:</strong> 비즈니스 환경에 적합한 격식 있는 표기</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🎯 기억용이성 (Memorability)</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>단순함:</strong> 복잡하지 않고 기억하기 쉬운 형태</Text>
                  <Text size="3">• <strong>발음 용이성:</strong> 국제적으로 발음하기 쉬운 구조</Text>
                  <Text size="3">• <strong>독특함:</strong> 다른 사람과 구별되는 특징</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🌍 국제성 (International Appeal)</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>문화적 중립성:</strong> 특정 문화권에서 부정적 의미 없음</Text>
                  <Text size="3">• <strong>범용성:</strong> 다양한 국가에서 통용 가능</Text>
                  <Text size="3">• <strong>현대성:</strong> 시대에 맞는 현대적 감각</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 2. 명함 작성 가이드 */}
          <Box>
            <Heading size="5" className="mb-4">2. 명함 작성 가이드</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-blue-200 bg-blue-50">
                <Flex align="center" gap="3" className="mb-3">
                  <CreditCard className="text-blue-500" size={18} />
                  <Heading size="3">명함 레이아웃 예시</Heading>
                </Flex>
                
                <Box className="space-y-4">
                  <Box className="p-4 bg-white rounded-md border">
                    <Text size="2" weight="bold" className="block">JAMES MINJUN KIM</Text>
                    <Text size="1" color="gray" className="block">김민준</Text>
                    <Text size="2" className="block mt-2">Senior Marketing Manager</Text>
                    <Text size="1" className="block">Global Tech Solutions Inc.</Text>
                    <Text size="1" className="block mt-2">james.kim@company.com</Text>
                    <Text size="1" className="block">+1-555-123-4567</Text>
                  </Box>
                  
                  <Flex direction="column" gap="2">
                    <Text size="2"><strong>✅ 좋은 예:</strong> 영문명을 크게, 한글명을 작게 병기</Text>
                    <Text size="2"><strong>✅ 좋은 예:</strong> 미들네임으로 한국 이름 활용</Text>
                    <Text size="2"><strong>✅ 좋은 예:</strong> 직책과 회사명 명확히 표기</Text>
                  </Flex>
                </Box>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">📋 명함 작성 체크리스트</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">□ 영문명이 여권/공식 문서와 일치하는가?</Text>
                  <Text size="3">□ 한글명을 함께 표기했는가?</Text>
                  <Text size="3">□ 직책이 정확하게 번역되었는가?</Text>
                  <Text size="3">□ 연락처 정보가 국제 형식인가?</Text>
                  <Text size="3">□ 회사 로고와 디자인이 조화로운가?</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 3. 이메일 서명 작성법 */}
          <Box>
            <Heading size="5" className="mb-4">3. 이메일 서명 작성법</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-green-200 bg-green-50">
                <Flex align="center" gap="3" className="mb-3">
                  <Mail className="text-green-500" size={18} />
                  <Heading size="3">전문적인 이메일 서명 예시</Heading>
                </Flex>
                
                <Box className="p-4 bg-white rounded-md border font-mono text-sm">
                  <Text size="2" className="block">Best regards,</Text>
                  <Text size="2" className="block mt-2"><strong>James Minjun Kim</strong> (김민준)</Text>
                  <Text size="2" className="block">Senior Marketing Manager</Text>
                  <Text size="2" className="block">Global Tech Solutions Inc.</Text>
                  <Text size="2" className="block">📧 james.kim@company.com</Text>
                  <Text size="2" className="block">📱 +1-555-123-4567</Text>
                  <Text size="2" className="block">🌐 www.company.com</Text>
                </Box>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">💡 이메일 서명 팁</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>발음 가이드:</strong> 복잡한 이름의 경우 발음 표기 추가</Text>
                  <Text size="3">• <strong>시간대 표시:</strong> 국제 업무 시 현지 시간대 명시</Text>
                  <Text size="3">• <strong>언어 표기:</strong> 구사 가능한 언어 간단히 표시</Text>
                  <Text size="3">• <strong>소셜 링크:</strong> 전문적인 LinkedIn 프로필 연결</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 4. 화상회의 에티켓 */}
          <Box>
            <Heading size="5" className="mb-4">4. 화상회의 에티켓</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Flex align="center" gap="3" className="mb-3">
                  <Users className="text-blue-500" size={18} />
                  <Heading size="3">화상회의에서의 이름 표시</Heading>
                </Flex>
                <Flex direction="column" gap="3">
                  <Box>
                    <Text size="3" weight="medium" className="mb-2">✅ 권장 표시 방법</Text>
                    <Box className="p-3 bg-gray-50 rounded-md">
                      <Text size="2">• James Kim (김민준)</Text>
                      <Text size="2">• J. Kim | Marketing Manager</Text>
                      <Text size="2">• James M. Kim - Seoul Office</Text>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Text size="3" weight="medium" className="mb-2">❌ 피해야 할 표시</Text>
                    <Box className="p-3 bg-red-50 rounded-md">
                      <Text size="2">• 김민준 (영문명 없음)</Text>
                      <Text size="2">• James (성씨 생략)</Text>
                      <Text size="2">• JamesKim (띄어쓰기 없음)</Text>
                    </Box>
                  </Box>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🎤 자기소개 스크립트</Heading>
                <Box className="p-4 bg-blue-50 rounded-md">
                  <Text size="2" className="italic">
                    &ldquo;Hello everyone, I am James Kim, you can call me James. 
                    I am the Senior Marketing Manager from our Seoul office. 
                    My Korean name is Minjun, but James works perfectly for our international meetings.&rdquo;
                  </Text>
                </Box>
              </Card>
            </Flex>
          </Box>

          {/* 5. 네트워킹 전략 */}
          <Box>
            <Heading size="5" className="mb-4">5. 네트워킹 전략</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">🤝 첫 만남에서의 인상 관리</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>명확한 발음:</strong> 자신의 이름을 또렷하게 발음</Text>
                  <Text size="3">• <strong>기억 도구:</strong> 이름과 관련된 기억하기 쉬운 연상법 제공</Text>
                  <Text size="3">• <strong>문화적 배경:</strong> 필요시 이름의 의미나 유래 간단히 설명</Text>
                  <Text size="3">• <strong>상호 존중:</strong> 상대방 이름도 정확히 발음하려 노력</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">📱 디지털 네트워킹</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>LinkedIn:</strong> 영문명과 한글명 모두 표기</Text>
                  <Text size="3">• <strong>프로필 사진:</strong> 전문적이고 친근한 이미지</Text>
                  <Text size="3">• <strong>헤드라인:</strong> 이름과 함께 전문 분야 명시</Text>
                  <Text size="3">• <strong>연결 메시지:</strong> 개인화된 인사말로 관계 시작</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 6. 문화별 비즈니스 에티켓 */}
          <Box>
            <Heading size="5" className="mb-4">6. 문화별 비즈니스 에티켓</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">🌏 아시아 태평양</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>일본:</strong> 명함 교환 시 양손으로, 정중한 인사</Text>
                  <Text size="3">• <strong>중국:</strong> 한자 이름 병기 시 문화적 친밀감 증대</Text>
                  <Text size="3">• <strong>싱가포르:</strong> 다문화 환경, 영문명 중심 사용</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🌍 유럽</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>독일:</strong> 격식과 정확성 중시, 풀네임 사용</Text>
                  <Text size="3">• <strong>프랑스:</strong> 문화적 세련됨 중시, 발음 정확성 중요</Text>
                  <Text size="3">• <strong>영국:</strong> 전통적 예의, 점진적 친밀감 형성</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🌎 아메리카</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>미국:</strong> 캐주얼하지만 전문적, 닉네임 활용</Text>
                  <Text size="3">• <strong>캐나다:</strong> 다문화 존중, 정중한 소통</Text>
                  <Text size="3">• <strong>브라질:</strong> 친근함과 개인적 관계 중시</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 마무리 */}
          <Card>
            <Heading size="4" className="mb-3">성공적인 글로벌 비즈니스를 위한 영문명 전략</Heading>
            <Text size="3" className="leading-relaxed">
              국제 비즈니스에서 영문명은 단순한 호칭을 넘어 개인 브랜드의 핵심 요소입니다. 
              일관성 있는 사용, 문화적 감수성, 그리고 전문적인 표현을 통해 
              글로벌 무대에서 성공적인 비즈니스 관계를 구축하세요. 
              기억하세요 - 좋은 첫인상은 성공적인 비즈니스의 시작입니다.
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