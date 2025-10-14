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
import { ArrowLeft, Calendar, Clock, Share2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '여권 발급 시 영문명 작성 완벽 가이드 | NameEng 블로그',
    description: '여권 신청 시 영문명 작성법, 주의사항, 변경 절차까지 한 번에 알아보세요. 외교부 공식 가이드라인을 바탕으로 정확한 정보를 제공합니다.',
    keywords: ['여권', '영문명', '여권발급', '영문이름', '여권신청', '외교부'],
    openGraph: {
        title: '여권 발급 시 영문명 작성 완벽 가이드',
        description: '여권 신청 시 영문명 작성법과 주의사항을 알아보세요',
        type: 'article',
    }
};
export
    default function PassportNameGuidePage() {
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
                        <Badge color="blue" size="2">여권 가이드</Badge>
                        <Heading as="h1" size="8" weight="bold">
                            여권 발급 시 영문명 작성 완벽 가이드
                        </Heading>
                        <Flex align="center" gap="4" className="text-gray-600">
                            <Flex align="center" gap="1">
                                <Calendar size={16} />
                                <Text size="2">2024년 12월 18일</Text>
                            </Flex>
                            <Flex align="center" gap="1">
                                <Clock size={16} />
                                <Text size="2">5분 읽기</Text>
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
                            <Info className="text-blue-500" size={20} />
                            <Heading size="4">여권 영문명, 왜 중요할까요?</Heading>
                        </Flex>
                        <Text size="3" className="leading-relaxed">
                            여권의 영문명은 해외여행 시 항공권, 호텔 예약, 비자 신청 등 모든 공식 문서에 사용되는 중요한 정보입니다.
                            한 번 발급된 여권의 영문명을 변경하려면 새로운 여권을 발급받아야 하므로, 처음부터 정확하게 작성하는 것이 중요합니다.
                        </Text>
                    </Card>

                    {/* 기본 원칙 */}
                    <Box>
                        <Heading size="5" className="mb-4">1. 영문명 작성 기본 원칙</Heading>
                        <Flex direction="column" gap="4">
                            <Card>
                                <Flex align="center" gap="3" className="mb-3">
                                    <CheckCircle className="text-green-500" size={18} />
                                    <Heading size="3">외교부 공식 가이드라인</Heading>
                                </Flex>
                                <Flex direction="column" gap="2">
                                    <Text size="3">• 성(姓)은 대문자로, 이름은 첫 글자만 대문자로 작성</Text>
                                    <Text size="3">• 한글 발음을 기준으로 로마자 표기법에 따라 작성</Text>
                                    <Text size="3">• 띄어쓰기나 하이픈(-) 사용 가능</Text>
                                    <Text size="3">• 특수문자나 숫자는 사용 불가</Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Heading size="3" className="mb-3">로마자 표기법 예시</Heading>
                                <Flex direction="column" gap="2">
                                    <Text size="3">• 김철수 → KIM Cheolsu</Text>
                                    <Text size="3">• 박영희 → PARK Younghee</Text>
                                    <Text size="3">• 이지은 → LEE Jieun</Text>
                                    <Text size="3">• 최민준 → CHOI Minjun</Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Box>

                    {/* 주의사항 */}
                    <Box>
                        <Heading size="5" className="mb-4">2. 영문명 작성 시 주의사항</Heading>
                        <Flex direction="column" gap="4">
                            <Card className="border-orange-200 bg-orange-50">
                                <Flex align="center" gap="3" className="mb-3">
                                    <AlertTriangle className="text-orange-500" size={18} />
                                    <Heading size="3">반드시 확인해야 할 사항들</Heading>
                                </Flex>
                                <Flex direction="column" gap="2">
                                    <Text size="3">• 기존 여권이나 비자에 사용된 영문명과 일치하는지 확인</Text>
                                    <Text size="3">• 항공권 예약 시 사용할 이름과 동일한지 확인</Text>
                                    <Text size="3">• 영문 이름의 철자를 여러 번 검토</Text>
                                    <Text size="3">• 성과 이름의 순서가 올바른지 확인</Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Heading size="3" className="mb-3">흔한 실수 사례</Heading>
                                <Flex direction="column" gap="2">
                                    <Text size="3">❌ 잘못된 예: kim cheol su (모두 소문자)</Text>
                                    <Text size="3">✅ 올바른 예: KIM Cheolsu</Text>
                                    <Text size="3">❌ 잘못된 예: Kim Cheol-Su (성도 첫 글자만 대문자)</Text>
                                    <Text size="3">✅ 올바른 예: KIM Cheol-su 또는 KIM Cheolsu</Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Box>

                    {/* 변경 절차 */}
                    <Box>
                        <Heading size="5" className="mb-4">3. 영문명 변경이 필요한 경우</Heading>
                        <Card>
                            <Text size="3" className="mb-4">
                                이미 발급된 여권의 영문명을 변경하려면 새로운 여권을 발급받아야 합니다.
                            </Text>
                            <Flex direction="column" gap="3">
                                <Heading size="3">변경 절차</Heading>
                                <Flex direction="column" gap="2">
                                    <Text size="3">1. 여권 발급 신청서 작성 (정정된 영문명으로)</Text>
                                    <Text size="3">2. 기존 여권 반납</Text>
                                    <Text size="3">3. 신규 여권 발급 수수료 납부</Text>
                                    <Text size="3">4. 약 7-10일 후 새 여권 수령</Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </Box>

                    {/* 유용한 도구 */}
                    <Box>
                        <Heading size="5" className="mb-4">4. 영문명 작성에 도움되는 도구</Heading>
                        <Card className="border-blue-200 bg-blue-50">
                            <Flex align="center" gap="3" className="mb-3">
                                <CheckCircle className="text-blue-500" size={18} />
                                <Heading size="3">NameEng 영문명 변환기 활용하기</Heading>
                            </Flex>
                            <Text size="3" className="mb-4">
                                정확한 로마자 표기법에 따른 영문명 변환을 원한다면 NameEng의 영문명 변환기를 사용해보세요.
                            </Text>
                            <Link href="/tools">
                                <Button size="3">
                                    영문명 변환기 사용하기
                                </Button>
                            </Link>
                        </Card>
                    </Box>

                    {/* 마무리 */}
                    <Card>
                        <Heading size="4" className="mb-3">정리</Heading>
                        <Text size="3" className="leading-relaxed">
                            여권 영문명은 해외여행의 첫 단추입니다. 정확한 로마자 표기법을 따르고,
                            기존 문서들과의 일치성을 확인하여 불필요한 문제를 예방하세요.
                            궁금한 점이 있다면 여권 발급 기관에 미리 문의하는 것도 좋은 방법입니다.
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