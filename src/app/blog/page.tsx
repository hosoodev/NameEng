import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Container,
  Badge
} from '@radix-ui/themes';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 - 한글 이름 로마자 표기 가이드 | Nameeng 네이밍',
  description: '한글 이름의 로마자 표기에 대한 전문 정보와 실용적인 가이드를 제공합니다. 여권 발급, 해외 거주, 국제 업무 시 필요한 영문명 작성법을 배워보세요.',
  keywords: '한글 이름 로마자 표기, 영문명 작성법, 여권 로마자 표기, 해외 거주 영문명, 국제 업무 이름 표기, 성씨 영문 표기',
};

const blogPosts = [
  {
    id: 'korean-surname-history',
    title: '한국 성씨의 영문 표기 역사와 변천사',
    excerpt: '조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지, 그 역사적 배경과 변화 과정을 살펴봅니다.',
    date: '2024-12-15',
    readTime: '8분',
    category: '역사',
    tags: ['성씨', '역사', '로마자표기법']
  },
  {
    id: 'passport-name-guide',
    title: '여권 발급 시 영문명 작성 완벽 가이드',
    excerpt: '여권 신청 시 영문명을 어떻게 작성해야 하는지, 주의사항과 실제 사례를 통해 자세히 알아봅니다.',
    date: '2024-12-10',
    readTime: '12분',
    category: '실용정보',
    tags: ['여권', '영문명', '공식문서']
  },
  {
    id: 'overseas-name-tips',
    title: '해외 거주 시 영문명 사용 팁과 주의사항',
    excerpt: '해외에서 생활할 때 영문명을 효과적으로 사용하는 방법과 문화적 차이를 고려한 실용적인 조언을 제공합니다.',
    date: '2024-12-05',
    readTime: '10분',
    category: '해외생활',
    tags: ['해외거주', '문화차이', '실용팁']
  },
  {
    id: 'business-name-etiquette',
    title: '국제 비즈니스에서의 영문명 에티켓',
    excerpt: '글로벌 비즈니스 환경에서 전문적이고 효과적인 영문명 사용법과 명함, 이메일 서명 작성 가이드입니다.',
    date: '2024-11-28',
    readTime: '7분',
    category: '비즈니스',
    tags: ['비즈니스', '네트워킹', '전문성']
  },
  {
    id: 'romanization-rules-explained',
    title: '국어의 로마자 표기법 규칙 상세 해설',
    excerpt: '국립국어원의 로마자 표기법 규칙을 실제 예시와 함께 쉽게 이해할 수 있도록 상세히 설명합니다.',
    date: '2024-11-20',
    readTime: '15분',
    category: '언어학',
    tags: ['표기법', '언어학', '규칙']
  },
  {
    id: 'negative-meaning-words',
    title: '영어권에서 피해야 할 한국 이름 표기들',
    excerpt: '한글 이름을 로마자로 변환할 때 영어권에서 부정적 의미를 가질 수 있는 표기들과 안전한 대안을 소개합니다.',
    date: '2024-11-15',
    readTime: '9분',
    category: '안전가이드',
    tags: ['부정적의미', '안전표기', '대안']
  }
];

export default function Blog() {
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
          <Heading as="h1" size="7" className="mb-4">
            블로그
          </Heading>
          <Text size="3" color="gray">
            한글 이름의 로마자 표기에 대한 전문 정보와 실용적인 가이드
          </Text>
        </Box>

        {/* 카테고리 필터 */}
        <Box className="mb-6">
          <Flex gap="2" wrap="wrap">
            <Badge color="blue">전체</Badge>
            <Badge variant="outline">실용정보</Badge>
            <Badge variant="outline">해외생활</Badge>
            <Badge variant="outline">비즈니스</Badge>
            <Badge variant="outline">언어학</Badge>
            <Badge variant="outline">역사</Badge>
            <Badge variant="outline">안전가이드</Badge>
          </Flex>
        </Box>

        {/* 블로그 포스트 목록 */}
        <Box className="space-y-4">
          {blogPosts.map((post) => (
            <Card key={post.id} size="3" className="hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.id}`} className="block p-6">
                <Flex justify="between" align="start" className="mb-3">
                  <Badge color="blue" variant="soft">
                    {post.category}
                  </Badge>
                  <Flex align="center" gap="4" className="text-gray-500">
                    <Flex align="center" gap="1">
                      <Calendar size={14} />
                      <Text size="1">{post.date}</Text>
                    </Flex>
                    <Flex align="center" gap="1">
                      <Clock size={14} />
                      <Text size="1">{post.readTime}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                
                <Heading as="h2" size="4" className="mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </Heading>
                
                <Text size="2" color="gray" className="mb-3 leading-relaxed">
                  {post.excerpt}
                </Text>
                
                <Flex justify="between" align="center">
                  <Flex gap="2" wrap="wrap">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="1">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                  
                  <Flex align="center" gap="1" className="text-blue-600">
                    <Text size="2">읽어보기</Text>
                    <ArrowRight size={14} />
                  </Flex>
                </Flex>
              </Link>
            </Card>
          ))}
        </Box>

        {/* 더 많은 콘텐츠 예고 */}
        <Card size="3" className="mt-8 text-center">
          <Box className="p-6">
            <Heading as="h3" size="4" className="mb-2">
              더 많은 콘텐츠가 준비 중입니다
            </Heading>
            <Text size="2" color="gray" className="mb-4">
              한글 이름의 로마자 표기에 대한 더 많은 유용한 정보를 
              지속적으로 업데이트하고 있습니다.
            </Text>
            <Text size="1" color="gray">
              새로운 글이 업데이트되면 알림을 받고 싶으시다면 
              북마크에 추가해 주세요.
            </Text>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}