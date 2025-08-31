'use client';

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
import { ArrowLeft, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PassportGuide() {
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
            외교부 여권 로마자 표기 규정
          </Heading>
          <Text size="3" color="gray">
            여권 발급 시 로마자 성명 표기에 대한 공식 규정을 정리했습니다.
          </Text>
        </Box>

        {/* 기본 원칙 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              기본 표기 원칙
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  1. 표기 기준
                </Text>
                <Text size="2" color="gray">
                  • 가족관계등록부에 등록된 한글 성명을 기준으로 표기<br/>
                  • 문화체육관광부장관이 정하여 고시하는 표기 방법 적용<br/>
                  • 음절 단위로 음역(音譯)에 맞게 표기
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  2. 이름 표기 방식
                </Text>
                <Text size="2" color="gray">
                  • 기본: 붙여 쓰기 (예: MINSU)<br/>
                  • 허용: 음절 사이 붙임표(-) 사용 (예: MIN-SU)<br/>
                  • 허용: 띄어 쓰기 (예: MIN SU)
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  3. 표기 제한 사항
                </Text>
                <Text size="2" color="gray">
                  • 존칭, 직함, 자격, 훈장, 세습 등을 나타내는 약어 표기 불가<br/>
                  • CEO, DR, SIR, 1ST 등 특수 기호 사용 불가<br/>
                  • 세례명 등 추가 이름 표기 불가
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 관용 표기 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              관용 표기 허용
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  허용 조건
                </Text>
                <Text size="2" color="gray">
                  • 기존에 사용하던 로마자 표기가 있는 경우<br/>
                  • 국립국어원의 외래어 표기법과 용례에서 확인 가능한 경우<br/>
                  • 실물 용례를 증빙서류로 제출하는 경우
                </Text>
              </Box>

              <Box className="p-4 bg-blue-50 rounded-md">
                <Text size="2">
                  <Text weight="medium">예시:</Text> 김(金) 씨의 경우<br/>
                  • 표준: GIM<br/>
                  • 관용 허용: KIM (기존 사용 시)
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 주의사항 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-600" />
              중요 주의사항
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Badge color="red" className="mb-2">주의</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  로마자 표기 변경 제한
                </Text>
                <Text size="2" color="gray">
                  • 여권 재발급 시에도 이전과 동일한 로마자 표기 유지<br/>
                  • 법령에서 허용하는 사유가 아니면 변경 불가<br/>
                  • 변경 시 과거 여행국 재방문 시 입국 거부 위험
                </Text>
              </Box>

              <Box>
                <Badge color="amber" className="mb-2">참고</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  기존 비자(VISA) 사용 불가 위험
                </Text>
                <Text size="2" color="gray">
                  • 로마자 표기 변경 시 유효한 외국 사증 사용 불가능<br/>
                  • 붙여쓰기 ↔ 띄어쓰기 ↔ 하이픈 변경 시에도 해당<br/>
                  • 반드시 담당 공무원에게 사증 소지 여부 확인 필요
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 신청 절차 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              표기 변경 신청 방법
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  이름 표기 방식 변경
                </Text>
                <Text size="2" color="gray">
                  • 붙여쓰기 → 띄어쓰기 또는 하이픈 추가<br/>
                  • &apos;여권 로마자성명 변경 신청서&apos; 작성 제출
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  관용 표기 신청
                </Text>
                <Text size="2" color="gray">
                  • 기존 사용 증명 서류 제출<br/>
                  • 국립국어원 외래어 표기법 용례 확인<br/>
                  • 실물 용례 증빙서류 제출
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 문의처 */}
        <Card size="3" className="mb-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              문의처
            </Heading>
            
            <Flex gap="6" wrap="wrap">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  외교부 여권과
                </Text>
                <Text size="2" color="gray">
                  • 운영시간: 09:00~18:00 (평일)<br/>
                  • 점심시간: 12:00~13:00<br/>
                  • 토/일/공휴일 휴무
                </Text>
              </Box>
              
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  여권 민원 상담
                </Text>
                <Text size="2" color="gray">
                  • 전화: 02-3210-0404<br/>
                  • (영사콜센터)
                </Text>
              </Box>
            </Flex>
          </Box>
        </Card>

        {/* 출처 및 링크 */}
        <Box className="text-center">
          <Separator className="mb-6" />
          
          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              공식 출처
            </Text>
            <Text size="2" color="gray" className="mb-4">
              본 내용은 외교부 여권안내 공식 웹사이트의 정보를 정리한 것입니다.
            </Text>
            
            <Button asChild variant="outline">
              <a 
                href="https://www.passport.go.kr/home/kor/contents.do?menuPos=37" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink size={16} />
                외교부 여권안내 원문 보기
              </a>
            </Button>
          </Box>

          <Text size="1" color="gray">
            최종 업데이트: {new Date().toLocaleDateString('ko-KR')}<br/>
            여권 발급 시에는 반드시 공식 사이트에서 최신 정보를 확인하시기 바랍니다.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
