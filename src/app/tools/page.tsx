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
import { 
  ArrowLeft, 
  Calculator, 
  Volume2, 
  CheckCircle, 
  Users,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '유용한 도구들 - 영문명 관련 추가 도구 | NameEng',
  description: '영문명 조합 생성기, 발음 가이드, 적합성 검사기 등 한글 이름의 로마자 표기와 관련된 다양한 유용한 도구들을 제공합니다.',
  keywords: '영문명 생성기, 발음 가이드, 이름 적합성 검사, 로마자 표기 도구, 한글 이름 변환 도구',
};

const tools = [
  {
    id: 'name-generator',
    title: '영문명 조합 생성기',
    description: '다양한 성씨 표기와 이름 옵션을 조합하여 여러 가지 영문명 후보를 한 번에 생성합니다.',
    icon: <Calculator size={24} />,
    color: 'blue',
    status: '사용 가능',
    features: ['다중 성씨 표기', '옵션별 조합', '일괄 생성']
  },
  {
    id: 'pronunciation-guide',
    title: '영문명 발음 가이드',
    description: '생성된 영문명이 영어권에서 어떻게 발음되는지 음성으로 들어보고 발음 기호를 확인할 수 있습니다.',
    icon: <Volume2 size={24} />,
    color: 'green',
    status: '준비 중',
    features: ['음성 재생', '발음 기호', '발음 팁']
  },
  {
    id: 'name-checker',
    title: '영문명 적합성 검사기',
    description: '기존에 사용 중인 영문명이나 고려 중인 영문명의 적합성을 종합적으로 분석하고 개선점을 제안합니다.',
    icon: <CheckCircle size={24} />,
    color: 'purple',
    status: '사용 가능',
    features: ['부정적 의미 검사', '발음 난이도', '국제 통용성']
  },
  {
    id: 'popular-names',
    title: '인기 영문명 통계',
    description: '한국인이 가장 많이 사용하는 영문명 통계와 트렌드를 확인하고 참고할 수 있습니다.',
    icon: <Users size={24} />,
    color: 'amber',
    status: '준비 중',
    features: ['사용 빈도', '연도별 트렌드', '지역별 선호도']
  }
];

export default function Tools() {
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
            유용한 도구들
          </Heading>
          <Text size="3" color="gray">
            영문명 작성과 관련된 다양한 추가 도구들을 제공합니다
          </Text>
        </Box>

        {/* 도구 목록 */}
        <Box className="space-y-4">
          {tools.map((tool) => (
            <Card key={tool.id} size="3" className="hover:shadow-md transition-shadow">
              <Box className="p-6">
                <Flex justify="between" align="start" className="mb-4">
                  <Flex align="center" gap="3">
                    <Box className={`p-2 rounded-md bg-${tool.color}-100 text-${tool.color}-600`}>
                      {tool.icon}
                    </Box>
                    <Box>
                      <Heading as="h2" size="4" className="mb-1">
                        {tool.title}
                      </Heading>
                      <Badge 
                        color={tool.status === '사용 가능' ? 'green' : 'gray'}
                        variant={tool.status === '사용 가능' ? 'solid' : 'outline'}
                      >
                        {tool.status}
                      </Badge>
                    </Box>
                  </Flex>
                </Flex>
                
                <Text size="2" color="gray" className="mb-4 leading-relaxed">
                  {tool.description}
                </Text>
                
                <Box className="mb-4">
                  <Text size="2" weight="medium" className="mb-2 block">
                    주요 기능:
                  </Text>
                  <Flex gap="2" wrap="wrap">
                    {tool.features.map((feature) => (
                      <Badge key={feature} variant="outline" size="1">
                        {feature}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
                
                <Flex justify="end">
                  {tool.status === '사용 가능' ? (
                    <Button asChild>
                      <Link href={`/tools/${tool.id}`} className="inline-flex items-center gap-2">
                        사용하기
                        <ArrowRight size={14} />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled variant="outline">
                      준비 중
                    </Button>
                  )}
                </Flex>
              </Box>
            </Card>
          ))}
        </Box>

        {/* 추가 정보 */}
        <Card size="3" className="mt-8">
          <Box className="p-6">
            <Flex align="center" gap="2" className="mb-3">
              <Zap size={20} className="text-amber-600" />
              <Heading as="h3" size="4">
                더 많은 도구가 추가될 예정입니다
              </Heading>
            </Flex>
            
            <Text size="2" color="gray" className="mb-4">
              사용자들의 피드백을 바탕으로 더욱 유용한 도구들을 지속적으로 개발하고 있습니다. 
              필요한 기능이나 개선사항이 있으시면 언제든지 제안해 주세요.
            </Text>
            
            <Box className="p-4 bg-blue-50 rounded-md">
              <Text size="2" weight="medium" className="mb-2 block">
                🚀 개발 예정 도구들
              </Text>
              <Text size="2" color="gray">
                • 영문명 유사도 검사기<br/>
                • 국가별 이름 규정 가이드<br/>
                • 영문명 변경 이력 관리<br/>
                • AI 기반 맞춤 영문명 추천
              </Text>
            </Box>
          </Box>
        </Card>

        {/* 기본 변환기로 돌아가기 */}
        <Box className="text-center mt-8">
          <Text size="2" color="gray" className="mb-4">
            기본적인 한글 이름 변환이 필요하신가요?
          </Text>
          <Button asChild size="3">
            <Link href="/">
              NameEng 변환기 사용하기
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}