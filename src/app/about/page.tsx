import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Separator,
  Container,
  Badge
} from '@radix-ui/themes';
import { ArrowLeft, Target, Shield, Zap, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NameEng 소개 - 영문이름변환기 서비스 개요 | Nameeng 네이밍',
  description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다. 국어의 로마자 표기법 준수, 부정적 의미 필터링, 관용 표기 지원 등 모든 기능을 확인하세요.',
  keywords: 'NameEng 소개, 영문이름변환기 서비스, 한글 이름 로마자 변환, 국어의 로마자 표기법, 부정적 의미 필터링, 관용 성씨 표기, 여권 로마자 표기',
  openGraph: {
    title: 'NameEng 소개 - 영문이름변환기 서비스 개요',
    description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다. 국어의 로마자 표기법 준수, 부정적 의미 필터링, 관용 표기 지원 등 모든 기능을 확인하세요.',
    type: 'website',
    url: 'https://nameeng.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'NameEng 소개 - 영문이름변환기 서비스 개요',
    description: 'NameEng는 한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다.',
  },
};

export default function About() {
  return (
    <Container size="3" className="py-6 px-4">
      <Box className="max-w-5xl mx-auto">
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
            NameEng 소개
          </Heading>
          <Text size="3" color="gray">
            한국어 이름의 정확하고 안전한 로마자 표기를 위한 전문 서비스입니다.
          </Text>
        </Box>

        {/* 서비스 개요 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-600" />
              서비스 목표
            </Heading>
            
            <Box className="space-y-4">
              <Text size="3" className="leading-relaxed">
                NameEng는 한글 이름을 로마자로 변환할 때 발생할 수 있는 다양한 문제를 해결하기 위해 개발된 전문 서비스입니다. 
                단순한 변환을 넘어서 여권 발급, 해외 거주, 국제 업무 등 실제 상황에서 필요한 모든 요소를 고려합니다.
              </Text>
              
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box className="p-4 bg-blue-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    🎯 정확성
                  </Text>
                  <Text size="2" color="gray">
                    국립국어원 표준 규정을 완벽히 준수하여 공식 문서에 사용 가능한 정확한 표기를 제공합니다.
                  </Text>
                </Box>
                
                <Box className="p-4 bg-green-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    🛡️ 안전성
                  </Text>
                  <Text size="2" color="gray">
                    부정적 의미를 가진 영어 단어를 자동으로 감지하고 안전한 대안을 제시합니다.
                  </Text>
                </Box>
                
                <Box className="p-4 bg-purple-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    🌍 실용성
                  </Text>
                  <Text size="2" color="gray">
                    관용 표기, 여권 규정, 국제 표준까지 모든 실무적 요구사항을 반영합니다.
                  </Text>
                </Box>
                
                <Box className="p-4 bg-amber-50 rounded-md">
                  <Text size="2" weight="medium" className="mb-2 block">
                    ⚡ 편의성
                  </Text>
                  <Text size="2" color="gray">
                    직관적인 인터페이스로 누구나 쉽게 사용할 수 있으며, URL 공유로 결과를 간편하게 공유 가능합니다.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 주요 기능 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Zap size={20} className="text-amber-600" />
              주요 기능
            </Heading>
            
            <Box className="space-y-6">
              <Box>
                <Badge color="blue" className="mb-2">핵심 기능</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  1. 정확한 로마자 변환
                </Text>
                <Text size="2" color="gray">
                  • 국립국어원 「국어의 로마자 표기법」 완벽 준수<br/>
                  • 음성 변화 및 발음 규칙 정확 반영<br/>
                  • 복성(남궁, 선우 등) 자동 인식 및 선택 옵션 제공
                </Text>
              </Box>

              <Box>
                <Badge color="green" className="mb-2">안전 기능</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  2. 부정적 의미 필터링
                </Text>
                <Text size="2" color="gray">
                  • 영어권에서 부정적 의미를 가진 단어 자동 감지<br/>
                  • 실시간 경고 메시지 및 안전한 대안 제시<br/>
                  • 글로벌 환경에서 안전한 이름 사용 보장
                </Text>
              </Box>

              <Box>
                <Badge color="purple" className="mb-2">맞춤 기능</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  3. 다양한 표기 옵션
                </Text>
                <Text size="2" color="gray">
                  • 관용 성씨 표기 선택 (김→Kim/Gim, 이→Lee/I 등)<br/>
                  • 이름 순서 선택 (성-이름 / 이름-성)<br/>
                  • 하이픈 사용 옵션 (Kim Min-su / Kim Minsu)<br/>
                  • 대소문자 스타일 선택 (대문자/소문자/첫글자만)
                </Text>
              </Box>

              <Box>
                <Badge color="amber" className="mb-2">편의 기능</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  4. 사용자 편의 기능
                </Text>
                <Text size="2" color="gray">
                  • 원클릭 복사 기능<br/>
                  • URL 공유 기능 (설정값 포함)<br/>
                  • 엔터키 변환 지원<br/>
                  • 모바일 최적화 반응형 디자인
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 기술적 특징 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Shield size={20} className="text-green-600" />
              기술적 특징
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  현대적 웹 기술 스택
                </Text>
                <Text size="2" color="gray">
                  • <strong>Next.js 15</strong>: 최신 React 프레임워크로 빠른 성능과 SEO 최적화<br/>
                  • <strong>TypeScript</strong>: 타입 안전성으로 안정적인 코드 품질 보장<br/>
                  • <strong>Radix UI</strong>: 접근성을 고려한 모던 UI 컴포넌트<br/>
                  • <strong>Tailwind CSS</strong>: 효율적이고 일관된 스타일링
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  성능 최적화
                </Text>
                <Text size="2" color="gray">
                  • 정적 사이트 생성으로 빠른 로딩 속도<br/>
                  • 코드 분할로 효율적인 번들 크기 관리<br/>
                  • 모바일 우선 반응형 디자인<br/>
                  • PWA 지원으로 오프라인 사용 가능
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  데이터 품질
                </Text>
                <Text size="2" color="gray">
                  • 213개 한국 성씨 완전 지원<br/>
                  • 관용 표기 및 변형 표기 포괄적 제공<br/>
                  • 지속적인 데이터 업데이트 및 검증<br/>
                  • 사용자 피드백 반영 시스템
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 사용 대상 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Users size={20} className="text-purple-600" />
              주요 사용 대상
            </Heading>
            
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  🛂 여권 발급 준비자
                </Text>
                <Text size="2" color="gray">
                  여권 신청 시 정확한 로마자 표기가 필요한 모든 분들
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  ✈️ 해외 거주/유학 준비자
                </Text>
                <Text size="2" color="gray">
                  해외에서 사용할 안전하고 적절한 영문 이름이 필요한 분들
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  💼 국제 업무 종사자
                </Text>
                <Text size="2" color="gray">
                  글로벌 비즈니스에서 전문적인 영문 이름 표기가 필요한 분들
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  📚 학술/연구 분야 종사자
                </Text>
                <Text size="2" color="gray">
                  논문 발표, 국제 학회 참가 시 표준 로마자 표기가 필요한 분들
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  🏢 공무원/공공기관 종사자
                </Text>
                <Text size="2" color="gray">
                  공식 문서나 국제 업무에서 정확한 표기가 필요한 분들
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  👨‍👩‍👧‍👦 자녀 이름 고민 부모님
                </Text>
                <Text size="2" color="gray">
                  글로벌 시대에 적합한 이름을 고려하시는 부모님들
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 개발 철학 */}
        <Card size="3" className="mb-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Heart size={20} className="text-red-600" />
              개발 철학
            </Heading>
            
            <Box className="space-y-4">
              <Text size="3" className="leading-relaxed">
                NameEng는 단순한 변환 도구를 넘어서, 한국인의 정체성을 존중하면서도 
                글로벌 환경에서 안전하고 효과적으로 소통할 수 있도록 돕는 것을 목표로 합니다.
              </Text>

              <Box className="p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                <Text size="2" style={{ fontStyle: 'italic' }}>
                  &ldquo;모든 한국인이 자신의 이름을 자랑스럽게, 그리고 안전하게 
                  세계 어디서든 사용할 수 있도록 하는 것&rdquo;
                </Text>
                <Text size="1" color="gray" className="mt-2">
                  - NameEng 개발팀
                </Text>
              </Box>

              <Text size="2" color="gray">
                이러한 철학을 바탕으로 지속적인 개선과 업데이트를 통해 
                더 나은 서비스를 제공하기 위해 노력하고 있습니다.
              </Text>
            </Box>
          </Box>
        </Card>

        {/* 연락처/피드백 */}
        <Box className="text-center">
          <Separator className="mb-6" />
          
          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              개선 제안 및 문의
            </Text>
            <Text size="2" color="gray" className="mb-4">
              더 나은 서비스를 위해 여러분의 의견을 기다립니다.
            </Text>
            
            <Text size="2" color="gray">
              서비스 개선 제안, 오류 신고, 새로운 기능 요청 등 
              모든 피드백을 환영합니다.
            </Text>
          </Box>

          <Text size="1" color="gray">
            © {new Date().getFullYear()} NameEng. 
            한국어 이름의 정확한 로마자 표기를 위한 서비스입니다.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
