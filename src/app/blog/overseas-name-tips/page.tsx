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
import { ArrowLeft, Calendar, Clock, Share2, Globe, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '해외 거주 시 영문명 사용 팁과 주의사항 | NameEng 블로그',
  description: '해외에서 생활할 때 영문명을 효과적으로 사용하는 방법과 문화적 차이를 고려한 실용적인 조언을 제공합니다.',
  keywords: ['해외거주', '영문명 사용법', '문화차이', '해외생활 팁', '국제 커뮤니케이션'],
};

export default function OverseasNameTipsPage() {
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
            <Badge color="green" size="2">해외생활</Badge>
            <Heading size="8" weight="bold">
              해외 거주 시 영문명 사용 팁과 주의사항
            </Heading>
            <Flex align="center" gap="4" className="text-gray-600">
              <Flex align="center" gap="1">
                <Calendar size={16} />
                <Text size="2">2024년 12월 5일</Text>
              </Flex>
              <Flex align="center" gap="1">
                <Clock size={16} />
                <Text size="2">10분 읽기</Text>
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
              <Globe className="text-green-500" size={20} />
              <Heading size="4">해외에서의 이름, 단순한 호칭 이상의 의미</Heading>
            </Flex>
            <Text size="3" className="leading-relaxed">
              해외에서 생활할 때 영문명은 단순한 호칭을 넘어 첫인상, 사회적 관계, 심지어 취업 기회에까지 영향을 미칠 수 있습니다. 
              문화적 차이를 이해하고 전략적으로 영문명을 사용하는 방법을 알아보겠습니다.
            </Text>
          </Card>

          {/* 1. 지역별 문화적 특성 */}
          <Box>
            <Heading size="5" className="mb-4">1. 지역별 문화적 특성 이해하기</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Heading size="3" className="mb-3">🇺🇸 미국</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>다양성 존중:</strong> 다문화 사회로 외국 이름에 대한 수용도가 높음</Text>
                  <Text size="3">• <strong>발음 중시:</strong> 발음하기 쉬운 이름을 선호하는 경향</Text>
                  <Text size="3">• <strong>닉네임 문화:</strong> 긴 이름을 줄여서 부르는 것이 일반적</Text>
                </Flex>
                <Box className="mt-3 p-3 bg-blue-50 rounded-md">
                  <Text size="2" weight="medium">💡 팁: </Text>
                  <Text size="2">Kim Minjun → MJ, Min 등의 닉네임 준비</Text>
                </Box>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🇬🇧 영국</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>전통 중시:</strong> 클래식한 영어 이름에 대한 선호</Text>
                  <Text size="3">• <strong>정중함:</strong> 이름 발음을 정확히 하려고 노력하는 문화</Text>
                  <Text size="3">• <strong>격식:</strong> 비즈니스에서는 풀네임 사용이 일반적</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🇦🇺 호주</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>캐주얼함:</strong> 친근하고 편안한 분위기</Text>
                  <Text size="3">• <strong>줄임말 선호:</strong> 거의 모든 이름을 줄여서 부름</Text>
                  <Text size="3">• <strong>다문화 친화적:</strong> 아시아 이름에 대한 높은 수용도</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 2. 상황별 영문명 사용 전략 */}
          <Box>
            <Heading size="5" className="mb-4">2. 상황별 영문명 사용 전략</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-blue-200 bg-blue-50">
                <Flex align="center" gap="3" className="mb-3">
                  <Users className="text-blue-500" size={18} />
                  <Heading size="3">직장에서</Heading>
                </Flex>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>이메일 서명:</strong> 한국 이름과 영문명을 모두 표기</Text>
                  <Text size="3">• <strong>명함:</strong> 양면 활용 (한쪽은 영문, 한쪽은 한글)</Text>
                  <Text size="3">• <strong>회의:</strong> 자기소개 시 발음 가이드 제공</Text>
                  <Text size="3">• <strong>네트워킹:</strong> 기억하기 쉬운 닉네임 활용</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🏫 학교에서</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>등록:</strong> 공식 문서는 여권명과 일치시키기</Text>
                  <Text size="3">• <strong>일상:</strong> 친구들이 부르기 쉬운 별명 사용</Text>
                  <Text size="3">• <strong>교수님께:</strong> 정중하게 선호하는 호칭 안내</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🏥 공공기관에서</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>병원:</strong> 여권명 사용으로 의료기록 일치</Text>
                  <Text size="3">• <strong>은행:</strong> 공식 문서와 동일한 이름 사용</Text>
                  <Text size="3">• <strong>관공서:</strong> 법적 문서는 반드시 여권명</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 3. 흔한 실수와 해결책 */}
          <Box>
            <Heading size="5" className="mb-4">3. 흔한 실수와 해결책</Heading>
            
            <Flex direction="column" gap="4">
              <Card className="border-orange-200 bg-orange-50">
                <Flex align="center" gap="3" className="mb-3">
                  <AlertTriangle className="text-orange-500" size={18} />
                  <Heading size="3">자주 발생하는 문제들</Heading>
                </Flex>
                <Flex direction="column" gap="3">
                  <Box>
                    <Text size="3" weight="medium" className="mb-1">❌ 문제: 여러 버전의 이름 사용</Text>
                    <Text size="2" color="gray">공식 문서마다 다른 영문명 사용으로 인한 혼란</Text>
                    <Text size="2" className="mt-1"><strong>✅ 해결:</strong> 주요 문서는 하나의 이름으로 통일</Text>
                  </Box>
                  
                  <Box>
                    <Text size="3" weight="medium" className="mb-1">❌ 문제: 발음 설명 부족</Text>
                    <Text size="2" color="gray">이름 발음을 제대로 안내하지 않아 계속 잘못 불림</Text>
                    <Text size="2" className="mt-1"><strong>✅ 해결:</strong> 간단한 발음 가이드 준비</Text>
                  </Box>
                  
                  <Box>
                    <Text size="3" weight="medium" className="mb-1">❌ 문제: 문화적 맥락 무시</Text>
                    <Text size="2" color="gray">현지 문화를 고려하지 않은 이름 사용</Text>
                    <Text size="2" className="mt-1"><strong>✅ 해결:</strong> 현지인에게 조언 구하기</Text>
                  </Box>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 4. 실용적인 팁들 */}
          <Box>
            <Heading size="5" className="mb-4">4. 실용적인 팁들</Heading>
            
            <Flex direction="column" gap="4">
              <Card>
                <Flex align="center" gap="3" className="mb-3">
                  <CheckCircle className="text-green-500" size={18} />
                  <Heading size="3">발음 가이드 만들기</Heading>
                </Flex>
                <Box className="space-y-2">
                  <Text size="3">영어권 사람들이 이해하기 쉬운 발음 설명을 준비하세요:</Text>
                  <Box className="p-3 bg-gray-50 rounded-md">
                    <Text size="2">• 김민준 → "Kim Min-jun, like 'mean June'"</Text>
                    <Text size="2">• 이소영 → "Lee So-young, like 'so young'"</Text>
                    <Text size="2">• 박지훈 → "Park Ji-hoon, like 'gee who'"</Text>
                  </Box>
                </Box>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">📱 디지털 시대 팁</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>소셜미디어:</strong> 프로필에 발음 표기 추가</Text>
                  <Text size="3">• <strong>화상회의:</strong> 이름 표시 기능 적극 활용</Text>
                  <Text size="3">• <strong>이메일:</strong> 서명에 발음 가이드 포함</Text>
                  <Text size="3">• <strong>연락처:</strong> 친구들 폰에 발음 메모 추가 요청</Text>
                </Flex>
              </Card>

              <Card>
                <Heading size="3" className="mb-3">🤝 관계 형성 전략</Heading>
                <Flex direction="column" gap="2">
                  <Text size="3">• <strong>첫 만남:</strong> 이름의 의미나 유래 간단히 설명</Text>
                  <Text size="3">• <strong>친밀감 형성:</strong> 상대방도 이름 발음 도와주기</Text>
                  <Text size="3">• <strong>문화 교류:</strong> 한국 이름 문화 소개하기</Text>
                  <Text size="3">• <strong>유머 활용:</strong> 이름 관련 재미있는 에피소드 공유</Text>
                </Flex>
              </Card>
            </Flex>
          </Box>

          {/* 5. 법적 고려사항 */}
          <Box>
            <Heading size="5" className="mb-4">5. 법적 고려사항</Heading>
            
            <Card className="border-red-200 bg-red-50">
              <Flex align="center" gap="3" className="mb-3">
                <AlertTriangle className="text-red-500" size={18} />
                <Heading size="3">중요한 법적 사항들</Heading>
              </Flex>
              <Flex direction="column" gap="2">
                <Text size="3">• <strong>비자 신청:</strong> 여권명과 정확히 일치해야 함</Text>
                <Text size="3">• <strong>은행 계좌:</strong> 신분증명서와 동일한 이름 필요</Text>
                <Text size="3">• <strong>보험 가입:</strong> 공식 문서명 사용 필수</Text>
                <Text size="3">• <strong>계약서:</strong> 법적 효력을 위해 여권명 사용</Text>
                <Text size="3">• <strong>세금 신고:</strong> 정부 기록과 일치하는 이름 사용</Text>
              </Flex>
            </Card>
          </Box>

          {/* 마무리 */}
          <Card>
            <Heading size="4" className="mb-3">성공적인 해외 생활을 위한 이름 전략</Heading>
            <Text size="3" className="leading-relaxed">
              해외에서의 영문명 사용은 단순히 이름을 바꾸는 것이 아니라, 
              새로운 문화에 적응하면서도 자신의 정체성을 유지하는 균형잡기입니다. 
              상황에 맞는 유연한 접근과 현지 문화에 대한 이해를 바탕으로 
              자신만의 이름 사용 전략을 만들어보세요.
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