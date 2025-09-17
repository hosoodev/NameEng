import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Separator,
  Container
} from '@radix-ui/themes';
import { 
  ArrowLeft, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 FAQ - 영문이름변환기 질문과 답변 | Nameeng 네이밍',
  description: 'NameEng 영문이름변환기 사용 중 자주 묻는 질문들을 모아 정리했습니다. 무료 사용, 여권 발급, 로마자 표기, 부정적 의미 필터 등 모든 궁금증을 해결하세요.',
  keywords: '영문이름변환기 FAQ, NameEng 자주묻는질문, 로마자 변환 질문답변, 여권 로마자 표기 FAQ, 부정적 의미 필터 질문, 한글 이름 영문 변환 문의',
  openGraph: {
    title: '자주 묻는 질문 FAQ - 영문이름변환기 질문과 답변',
    description: 'NameEng 영문이름변환기 사용 중 자주 묻는 질문들을 모아 정리했습니다. 무료 사용, 여권 발급, 로마자 표기, 부정적 의미 필터 등 모든 궁금증을 해결하세요.',
    type: 'website',
    url: 'https://nameeng.com/faq',
  },
  twitter: {
    card: 'summary',
    title: '자주 묻는 질문 FAQ - 영문이름변환기 질문과 답변',
    description: 'NameEng 영문이름변환기 사용 중 자주 묻는 질문들을 모아 정리했습니다.',
  },
};

export default function FAQ() {
  const faqData = [
    {
      category: "기본 사용법",
      color: "blue",
      icon: <HelpCircle size={20} />,
      questions: [
        {
          q: "NameEng는 무료인가요?",
          a: "네, NameEng는 완전 무료 서비스입니다. 모든 기능을 제한 없이 사용하실 수 있습니다."
        },
        {
          q: "회원가입이 필요한가요?",
          a: "아니요, 회원가입 없이도 모든 기능을 사용할 수 있습니다. 개인정보를 수집하지 않으며, 입력한 이름도 저장되지 않습니다."
        },
        {
          q: "모바일에서도 사용할 수 있나요?",
          a: "네, NameEng는 모바일 최적화된 반응형 웹사이트입니다. 스마트폰, 태블릿에서도 편리하게 사용하실 수 있습니다."
        },
        {
          q: "변환 결과를 저장할 수 있나요?",
          a: "복사 기능으로 결과를 클립보드에 저장하거나, 공유 기능으로 URL을 생성하여 북마크로 저장할 수 있습니다."
        }
      ]
    },
    {
      category: "로마자 표기",
      color: "green",
      icon: <CheckCircle size={20} />,
      questions: [
        {
          q: "어떤 표기법을 기준으로 하나요?",
          a: "국립국어원의 「국어의 로마자 표기법」(문화체육관광부 고시 제2014-42호)을 기준으로 합니다. 추가로 관용적으로 사용되는 표기도 선택할 수 있습니다."
        },
        {
          q: "왜 김씨가 'Kim'과 'Gim' 두 가지로 나오나요?",
          a: "'Gim'이 표준 표기이지만, 'Kim'이 관용적으로 널리 사용되고 있어 두 옵션을 모두 제공합니다. 개인의 선택에 따라 사용하시면 됩니다."
        },
        {
          q: "복성(남궁, 선우 등)은 어떻게 처리되나요?",
          a: "복성을 자동으로 인식하여 선택 옵션을 제공합니다. 예를 들어 '선우용녀'의 경우 '선우'를 하나의 성씨로 처리할지, '선'만을 성씨로 할지 선택할 수 있습니다."
        },
        {
          q: "하이픈은 언제 사용해야 하나요?",
          a: "하이픈은 이름의 음절을 구분할 때 사용합니다 (예: Min-su). 개인 선호에 따라 선택하시면 되며, 여권 발급 시에는 기존 문서와의 일치성을 고려해야 합니다."
        }
      ]
    },
    {
      category: "여권 및 공식 문서",
      color: "purple",
      icon: <Info size={20} />,
      questions: [
        {
          q: "여권 발급 시 어떤 표기를 사용해야 하나요?",
          a: "표준 표기를 기본으로 하되, 기존에 사용하던 관용 표기가 있다면 증빙서류와 함께 신청할 수 있습니다. 자세한 내용은 여권 규정 가이드를 참고하세요."
        },
        {
          q: "이미 여권이 있는데 표기를 바꿀 수 있나요?",
          a: "여권의 로마자 표기 변경은 매우 제한적입니다. 법령에서 허용하는 특별한 사유가 있어야 하며, 변경 시 기존 비자 사용에 문제가 생길 수 있습니다."
        },
        {
          q: "공식 문서마다 다른 표기를 사용해도 되나요?",
          a: "권장하지 않습니다. 신원 확인의 혼란을 피하기 위해 모든 공식 문서에서 일관된 표기를 사용하는 것이 좋습니다."
        },
        {
          q: "해외에서 은행 계좌 개설 시 주의사항이 있나요?",
          a: "여권과 동일한 표기를 사용해야 합니다. 부정적 의미 경고가 있는 경우 미리 대안 표기를 준비하시는 것이 좋습니다."
        }
      ]
    },
    {
      category: "부정적 의미 필터",
      color: "red",
      icon: <AlertTriangle size={20} />,
      questions: [
        {
          q: "부정적 의미 경고가 나타나면 어떻게 해야 하나요?",
          a: "제시된 대안 표기를 검토해보시고, 가능하면 안전한 표기를 선택하시는 것을 권장합니다. 특히 해외 거주나 비즈니스 목적인 경우 더욱 신중히 고려하세요."
        },
        {
          q: "경고가 나와도 계속 사용해도 되나요?",
          a: "법적으로는 문제없지만, 해외에서 오해나 불편을 겪을 수 있습니다. 상황에 따라 판단하시되, 가능하면 대안 표기를 고려해보세요."
        },
        {
          q: "왜 '강'씨에 경고가 나오나요?",
          a: "'Gang'이 영어권에서 '폭력단'을 의미하기 때문입니다. 'Kang', 'Ghang' 등의 대안 표기를 제공합니다."
        },
        {
          q: "부정적 의미 사전은 어떻게 만들어졌나요?",
          a: "영어권에서 실제로 부정적 의미나 속어로 사용되는 단어들을 조사하여 구성했습니다. 지속적으로 업데이트하고 있습니다."
        }
      ]
    },
    {
      category: "기술적 문제",
      color: "amber",
      icon: <Info size={20} />,
      questions: [
        {
          q: "변환이 안 되는 이름이 있나요?",
          a: "매우 드물지만, 특수한 한자나 고어에서 유래한 이름의 경우 정확하지 않을 수 있습니다. 이런 경우 국립국어원에 문의하시거나 전문가의 도움을 받으세요."
        },
        {
          q: "공유 링크가 작동하지 않아요.",
          a: "브라우저 설정에서 쿠키나 JavaScript가 비활성화되어 있을 수 있습니다. 설정을 확인하시거나 다른 브라우저를 사용해보세요."
        },
        {
          q: "복사 기능이 작동하지 않아요.",
          a: "일부 구형 브라우저에서는 자동 복사 기능이 지원되지 않을 수 있습니다. 이런 경우 결과를 직접 선택하여 복사하세요."
        },
        {
          q: "사이트가 느려요.",
          a: "네트워크 상태를 확인해보시고, 브라우저 캐시를 삭제해보세요. 문제가 지속되면 페이지를 새로고침해보세요."
        }
      ]
    }
  ];

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
            자주 묻는 질문 (FAQ)
          </Heading>
          <Text size="3" color="gray">
            NameEng 사용 중 궁금한 점들을 모아 정리했습니다.
          </Text>
        </Box>

        {/* 빠른 답변 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              🔥 가장 많이 묻는 질문
            </Heading>
            
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box className="p-4 bg-blue-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  Q. 무료인가요?
                </Text>
                <Text size="2" color="gray">
                  A. 네, 완전 무료입니다! 🎉
                </Text>
              </Box>

              <Box className="p-4 bg-green-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  Q. 여권에 사용해도 되나요?
                </Text>
                <Text size="2" color="gray">
                  A. 네, 공식 규정을 준수합니다. ✅
                </Text>
              </Box>

              <Box className="p-4 bg-purple-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  Q. 모바일에서 사용 가능한가요?
                </Text>
                <Text size="2" color="gray">
                  A. 네, 모바일 최적화되어 있습니다. 📱
                </Text>
              </Box>

              <Box className="p-4 bg-amber-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  Q. 개인정보가 저장되나요?
                </Text>
                <Text size="2" color="gray">
                  A. 아니요, 어떤 정보도 저장하지 않습니다. 🔒
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 카테고리별 FAQ */}
        {faqData.map((category, categoryIndex) => (
          <Card key={categoryIndex} size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Box className="p-6">
              <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
                <Box className={`text-${category.color}-600`}>
                  {category.icon}
                </Box>
                {category.category}
              </Heading>
              
              <Box className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <Box key={faqIndex} className="border-l-4 border-gray-200 pl-4">
                    <Text size="3" weight="medium" className="mb-2 block">
                      Q. {faq.q}
                    </Text>
                    <Text size="2" color="gray" className="leading-relaxed">
                      A. {faq.a}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        ))}

        {/* 추가 도움말 */}
        <Card size="3" className="mb-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              💡 추가 도움말
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  더 자세한 정보가 필요하신가요?
                </Text>
                <Text size="2" color="gray" className="mb-3">
                  아래 가이드 페이지에서 더 상세한 정보를 확인하실 수 있습니다.
                </Text>
                
                <Flex gap="3" wrap="wrap">
                  <Button asChild variant="outline" size="2">
                    <Link href="/how-to-use">
                      이용방법 가이드
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="2">
                    <Link href="/romanization-guide">
                      로마자 표기법 가이드
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="2">
                    <Link href="/passport-guide">
                      여권 규정 가이드
                    </Link>
                  </Button>
                </Flex>
              </Box>

              <Separator />

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  공식 자료 참고
                </Text>
                <Text size="2" color="gray" className="mb-3">
                  정확한 정보는 공식 기관의 자료를 참고하시기 바랍니다.
                </Text>
                
                <Flex gap="3" wrap="wrap">
                  <Button asChild variant="ghost" size="2">
                    <a 
                      href="https://www.korean.go.kr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      국립국어원
                    </a>
                  </Button>
                  
                  <Button asChild variant="ghost" size="2">
                    <a 
                      href="https://www.passport.go.kr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      외교부 여권안내
                    </a>
                  </Button>
                </Flex>
              </Box>

              <Separator />

              <Box className="p-4 bg-blue-50 rounded-md">
                <Text size="2" weight="medium" className="mb-2 block">
                  📧 질문이나 제안이 있으시다면
                </Text>
                <Text size="2" color="gray">
                  서비스 개선을 위한 여러분의 소중한 의견을 기다립니다. 
                  새로운 기능 제안, 오류 신고, 사용법 문의 등 
                  어떤 피드백이든 환영합니다!
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 검색 팁 */}
        <Box className="text-center">
          <Separator className="mb-6" />
          
          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              원하는 답변을 찾지 못하셨나요?
            </Text>
            <Text size="2" color="gray">
              브라우저의 검색 기능(Ctrl+F 또는 Cmd+F)을 사용하여 
              키워드로 이 페이지에서 빠르게 검색해보세요.
            </Text>
          </Box>

          <Text size="1" color="gray">
            FAQ는 사용자 피드백을 바탕으로 지속적으로 업데이트됩니다.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
