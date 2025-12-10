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
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '한국 성씨의 영문 표기 역사와 변천사 | NameEng 블로그',
    description: '조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지, 그 역사적 배경과 변화 과정을 자세히 살펴봅니다.',
    keywords: '한국 성씨 역사, 로마자 표기 변천사, 성씨 영문 표기 역사, 조선시대 성씨, 일제강점기 성씨 표기',
};

export default function KoreanSurnameHistory() {
    return (
        <Container size="3" className="py-6 px-4">
            <Box className="max-w-5xl mx-auto">
                {/* Header */}
                <Flex align="center" gap="4" className="mb-6">
                    <Link href="/blog">
                        <Button variant="ghost" size="2">
                            <ArrowLeft size={16} />
                            블로그로 돌아가기
                        </Button>
                    </Link>
                </Flex>

                {/* Article Header */}
                <Box className="mb-8">
                    <Badge color="blue" className="mb-3">역사</Badge>

                    <Heading as="h1" size="7" className="mb-4" style={{ letterSpacing: '-0.02em' }}>
                        한국 성씨의 영문 표기 역사와 변천사
                    </Heading>

                    <Flex align="center" gap="4" className="mb-4 text-gray-500">
                        <Flex align="center" gap="1">
                            <Calendar size={16} />
                            <Text size="2">2024년 12월 15일</Text>
                        </Flex>
                        <Flex align="center" gap="1">
                            <Clock size={16} />
                            <Text size="2">8분 읽기</Text>
                        </Flex>
                        <Button variant="ghost" size="1">
                            <Share2 size={14} />
                            공유하기
                        </Button>
                    </Flex>

                    <Text size="3" color="gray" className="leading-relaxed">
                        조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지,
                        그 역사적 배경과 변화 과정을 살펴봅니다.
                    </Text>
                </Box>

                {/* Article Content */}
                <Box className="prose prose-gray max-w-none">

                    {/* 서론 */}
                    <Card size="3" className="mb-6">
                        <Box className="p-6">
                            <Text size="3" className="leading-relaxed">
                                한국인의 성씨를 로마자로 표기하는 것은 단순한 언어 변환을 넘어서
                                역사적, 문화적, 정치적 맥락이 복합적으로 얽힌 복잡한 과정입니다.
                                오늘날 우리가 사용하는 Kim, Lee, Park 등의 표기가 어떻게 형성되었는지,
                                그 뒤에 숨겨진 흥미로운 이야기들을 함께 살펴보겠습니다.
                            </Text>
                        </Box>
                    </Card>

                    {/* 1. 조선시대와 개화기 */}
                    <Heading as="h2" size="5" className="mb-4">
                        1. 조선시대와 개화기 (1876-1910)
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        한국 성씨의 로마자 표기는 19세기 후반 서구 문물이 본격적으로 유입되면서 시작되었습니다.
                        이 시기의 표기는 주로 선교사들과 외교관들에 의해 이루어졌으며,
                        체계적인 규칙보다는 개인의 판단에 따라 다양하게 표기되었습니다.
                    </Text>

                    <Card size="2" className="mb-6" style={{ backgroundColor: '#f8f9fa' }}>
                        <Box className="p-4">
                            <Text size="2" weight="medium" className="mb-2 block">
                                📚 초기 표기 사례들
                            </Text>
                            <Text size="2" color="gray">
                                • 김(金): Kim, Kin, Keem<br />
                                • 이(李): Lee, Yi, Ri<br />
                                • 박(朴): Park, Pak, Bak<br />
                                • 최(崔): Choi, Choe, Tsoi
                            </Text>
                        </Box>
                    </Card>

                    <Text size="3" className="mb-6 leading-relaxed">
                        특히 주목할 점은 이 시기부터 &lsquo;김&rsquo;씨가 &lsquo;Kim&rsquo;으로, &lsquo;이&rsquo;씨가 &lsquo;Lee&rsquo;로 표기되기 시작했다는 것입니다.
                        이는 당시 조선을 방문한 서구인들이 한국어 발음을 자신들의 언어 체계로
                        해석한 결과였습니다.
                    </Text>

                    {/* 2. 일제강점기 */}
                    <Heading as="h2" size="5" className="mb-4">
                        2. 일제강점기 (1910-1945)
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        일제강점기는 한국 성씨 표기에 있어 매우 복잡한 시기였습니다.
                        일본은 한국인의 성명을 일본식으로 개명하도록 강요했지만,
                        동시에 국제적인 문서에서는 로마자 표기가 필요했습니다.
                    </Text>

                    <Card size="2" className="mb-6" style={{ backgroundColor: '#fff3cd' }}>
                        <Box className="p-4">
                            <Text size="2" weight="medium" className="mb-2 block">
                                ⚠️ 창씨개명의 영향
                            </Text>
                            <Text size="2" color="gray">
                                1940년 창씨개명령 이후 많은 한국인들이 일본식 성명을 강요받았지만,
                                해외에 거주하거나 국제적 활동을 하는 한국인들은 여전히
                                한국식 성씨의 로마자 표기를 사용했습니다.
                            </Text>
                        </Box>
                    </Card>

                    {/* 3. 해방 후 혼란기 */}
                    <Heading as="h2" size="5" className="mb-4">
                        3. 해방 후 혼란기 (1945-1959)
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        광복 이후 한국은 성씨 표기에 있어 큰 혼란을 겪었습니다.
                        일제강점기 동안 억압되었던 한국식 성명이 부활했지만,
                        로마자 표기에 대한 통일된 기준이 없어 개인마다 다른 표기를 사용했습니다.
                    </Text>

                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card size="2">
                            <Box className="p-4">
                                <Text size="2" weight="medium" className="mb-2 block">
                                    🇺🇸 미군정 시기 (1945-1948)
                                </Text>
                                <Text size="2" color="gray">
                                    미군정은 영어식 발음에 가까운 표기를 선호했습니다.
                                    이 시기에 Kim, Lee, Park 등의 표기가 더욱 고착화되었습니다.
                                </Text>
                            </Box>
                        </Card>

                        <Card size="2">
                            <Box className="p-4">
                                <Text size="2" weight="medium" className="mb-2 block">
                                    🇰🇷 대한민국 정부 수립 후
                                </Text>
                                <Text size="2" color="gray">
                                    정부 수립 후에도 통일된 로마자 표기법이 없어
                                    개인의 선택에 따라 다양한 표기가 혼재했습니다.
                                </Text>
                            </Box>
                        </Card>
                    </Box>

                    {/* 4. 표준화 시도 */}
                    <Heading as="h2" size="5" className="mb-4">
                        4. 표준화 시도와 발전 (1959-2000)
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        1959년 문교부(현 교육부)에서 처음으로 「한글의 로마자 표기법」을 제정했습니다.
                        이는 한국어의 로마자 표기에 대한 최초의 공식적인 기준이었습니다.
                    </Text>

                    <Card size="2" className="mb-6" style={{ backgroundColor: '#e7f3ff' }}>
                        <Box className="p-4">
                            <Text size="2" weight="medium" className="mb-2 block">
                                📋 1959년 표기법의 특징
                            </Text>
                            <Text size="2" color="gray">
                                • ㄱ → g, k (위치에 따라)<br />
                                • ㄴ → n<br />
                                • ㄷ → d, t (위치에 따라)<br />
                                • ㄹ → r, l (위치에 따라)<br />
                                • ㅁ → m<br />
                                • ㅂ → b, p (위치에 따라)<br />
                                • ㅅ → s<br />
                                • ㅇ → ng (받침일 때)
                            </Text>
                        </Box>
                    </Card>

                    <Text size="3" className="mb-6 leading-relaxed">
                        하지만 이미 널리 사용되고 있던 관용적 표기들(Kim, Lee, Park 등)과
                        새로운 표준 표기 사이에 괴리가 있어 실제 사용에서는 혼재가 계속되었습니다.
                    </Text>

                    {/* 5. 현대의 표기법 */}
                    <Heading as="h2" size="5" className="mb-4">
                        5. 현대의 로마자 표기법 (2000-현재)
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        2000년 국립국어원에서 새로운 「국어의 로마자 표기법」을 제정했습니다.
                        이는 현재까지 사용되고 있는 공식적인 표기법으로,
                        언어학적 정확성과 국제적 통용성을 모두 고려한 체계입니다.
                    </Text>

                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card size="2">
                            <Box className="p-4">
                                <Text size="2" weight="medium" className="mb-2 block text-green-600">
                                    ✅ 표준 표기 (2000년 기준)
                                </Text>
                                <Text size="2" color="gray">
                                    • 김(金) → Gim<br />
                                    • 이(李) → I<br />
                                    • 박(朴) → Bak<br />
                                    • 최(崔) → Choe
                                </Text>
                            </Box>
                        </Card>

                        <Card size="2">
                            <Box className="p-4">
                                <Text size="2" weight="medium" className="mb-2 block text-blue-600">
                                    📝 관용 표기 (계속 사용)
                                </Text>
                                <Text size="2" color="gray">
                                    • 김(金) → Kim<br />
                                    • 이(李) → Lee<br />
                                    • 박(朴) → Park<br />
                                    • 최(崔) → Choi
                                </Text>
                            </Box>
                        </Card>
                    </Box>

                    {/* 6. 현재의 상황과 미래 */}
                    <Heading as="h2" size="5" className="mb-4">
                        6. 현재의 상황과 미래 전망
                    </Heading>

                    <Text size="3" className="mb-4 leading-relaxed">
                        오늘날 한국 성씨의 로마자 표기는 표준 표기와 관용 표기가 공존하는 상황입니다.
                        여권 발급 시에는 표준 표기를 권장하지만,
                        이미 널리 사용되고 있는 관용 표기도 인정하고 있습니다.
                    </Text>

                    <Card size="2" className="mb-6" style={{ backgroundColor: '#f0f9ff' }}>
                        <Box className="p-4">
                            <Text size="2" weight="medium" className="mb-2 block">
                                🔮 미래 전망
                            </Text>
                            <Text size="2" color="gray">
                                • 표준 표기의 점진적 확산<br />
                                • 개인 선택권 존중 지속<br />
                                • 국제적 통용성 고려한 유연한 적용<br />
                                • 디지털 시대에 맞는 새로운 표기 방식 모색
                            </Text>
                        </Box>
                    </Card>

                    {/* 결론 */}
                    <Heading as="h2" size="5" className="mb-4">
                        마무리
                    </Heading>

                    <Text size="3" className="mb-6 leading-relaxed">
                        한국 성씨의 로마자 표기 역사는 우리나라의 근현대사와 밀접하게 연결되어 있습니다.
                        외침과 혼란 속에서도 우리의 정체성을 지키려 했던 선조들의 노력이
                        오늘날의 다양한 표기 방식으로 이어져 왔습니다.
                    </Text>

                    <Card size="3" className="mb-8" style={{ backgroundColor: '#fef7e0' }}>
                        <Box className="p-6">
                            <Text size="2" weight="medium" className="mb-2 block">
                                💡 NameEng의 역할
                            </Text>
                            <Text size="2" color="gray">
                                NameEng는 이러한 역사적 맥락을 이해하고,
                                표준 표기와 관용 표기를 모두 제공하여
                                사용자가 자신의 상황에 맞는 최적의 선택을 할 수 있도록 돕습니다.
                            </Text>
                        </Box>
                    </Card>
                </Box>

                {/* 관련 글 추천 */}
                <Separator className="my-8" />

                <Box>
                    <Heading as="h3" size="4" className="mb-4">
                        관련 글 더 보기
                    </Heading>

                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card size="2">
                            <Link href="/blog/romanization-rules-explained" className="block p-4 hover:bg-gray-50">
                                <Text size="2" weight="medium" className="mb-1 block">
                                    국어의 로마자 표기법 규칙 상세 해설
                                </Text>
                                <Text size="1" color="gray">
                                    현재 사용되는 표기법의 구체적인 규칙들을 알아보세요.
                                </Text>
                            </Link>
                        </Card>

                        <Card size="2">
                            <Link href="/blog/passport-name-guide" className="block p-4 hover:bg-gray-50">
                                <Text size="2" weight="medium" className="mb-1 block">
                                    여권 발급 시 영문명 작성 완벽 가이드
                                </Text>
                                <Text size="1" color="gray">
                                    여권 신청 시 영문명 작성법을 자세히 알아보세요.
                                </Text>
                            </Link>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}