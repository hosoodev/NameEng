import { 
  Card, 
  Text, 
  Heading, 
  Button, 
  Flex, 
  Box,
  Separator,
  Container,
  Badge,
  Table
} from '@radix-ui/themes';
import { ArrowLeft, ExternalLink, BookOpen, Info } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드 | Nameeng 네이밍',
  description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다. 자음 표기법, 모음 표기법, 표기 세칙, 인명 표기 특례 등 모든 규정을 확인하세요.',
  keywords: '국어의 로마자 표기법, 국립국어원 로마자 표기, 한국어 로마자 변환 규정, 자음 표기법, 모음 표기법, 인명 로마자 표기, 영문이름변환기 규정',
  openGraph: {
    title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드',
    description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다. 자음 표기법, 모음 표기법, 표기 세칙, 인명 표기 특례 등 모든 규정을 확인하세요.',
    type: 'website',
    url: 'https://nameeng.com/romanization-guide',
  },
  twitter: {
    card: 'summary',
    title: '국어의 로마자 표기법 - 영문이름변환기 규정 가이드',
    description: '국립국어원에서 제정한 한국어 로마자 표기 공식 규정을 정리했습니다.',
  },
};

export default function RomanizationGuide() {
  return (
    <Container size="3" className="py-6 px-4">
      <Box className="max-w-3xl mx-auto">
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
            국어의 로마자 표기법
          </Heading>
          <Text size="3" color="gray">
            국립국어원에서 제정한 한국어 로마자 표기 공식 규정입니다.
          </Text>
        </Box>

        {/* 개요 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" />
              표기법 개요
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  제정 배경
                </Text>
                <Text size="2" color="gray">
                  • 한국어의 로마자 표기를 통일하여 국제적 소통을 원활하게 함<br/>
                  • 한국어의 음성적 특징을 정확히 반영<br/>
                  • 국제적으로 통용되는 로마자 표기 체계 구축
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  적용 범위
                </Text>
                <Text size="2" color="gray">
                  • 인명, 지명의 로마자 표기<br/>
                  • 공공기관, 단체명의 로마자 표기<br/>
                  • 간판, 표지판 등의 로마자 표기<br/>
                  • 학술 자료, 출판물의 로마자 표기
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 자음 표기법 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              자음 표기법
            </Heading>
            
            <Box className="mb-4">
              <Text size="3" weight="medium" className="mb-3 block">
                기본 자음
              </Text>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>한글</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>로마자</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>예시</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ㄱ</Table.Cell>
                    <Table.Cell>g, k</Table.Cell>
                    <Table.Cell>가방 → gabang, 악기 → akgi</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㄴ</Table.Cell>
                    <Table.Cell>n</Table.Cell>
                    <Table.Cell>나무 → namu</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㄷ</Table.Cell>
                    <Table.Cell>d, t</Table.Cell>
                    <Table.Cell>다리 → dari, 맏이 → maji</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㄹ</Table.Cell>
                    <Table.Cell>r, l</Table.Cell>
                    <Table.Cell>라디오 → radio, 설날 → seolnal</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅁ</Table.Cell>
                    <Table.Cell>m</Table.Cell>
                    <Table.Cell>마음 → maeum</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅂ</Table.Cell>
                    <Table.Cell>b, p</Table.Cell>
                    <Table.Cell>바람 → baram, 밥 → bap</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅅ</Table.Cell>
                    <Table.Cell>s</Table.Cell>
                    <Table.Cell>사람 → saram</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅇ</Table.Cell>
                    <Table.Cell>ng</Table.Cell>
                    <Table.Cell>강물 → gangmul</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅈ</Table.Cell>
                    <Table.Cell>j</Table.Cell>
                    <Table.Cell>자동차 → jadongcha</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅊ</Table.Cell>
                    <Table.Cell>ch</Table.Cell>
                    <Table.Cell>차례 → charye</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅋ</Table.Cell>
                    <Table.Cell>k</Table.Cell>
                    <Table.Cell>코끼리 → kokkiri</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅌ</Table.Cell>
                    <Table.Cell>t</Table.Cell>
                    <Table.Cell>타자기 → tajagi</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅍ</Table.Cell>
                    <Table.Cell>p</Table.Cell>
                    <Table.Cell>파도 → pado</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅎ</Table.Cell>
                    <Table.Cell>h</Table.Cell>
                    <Table.Cell>하늘 → haneul</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>

            <Box>
              <Text size="3" weight="medium" className="mb-3 block">
                된소리 (경음)
              </Text>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>한글</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>로마자</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>예시</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ㄲ</Table.Cell>
                    <Table.Cell>kk</Table.Cell>
                    <Table.Cell>깍지 → kkakji</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㄸ</Table.Cell>
                    <Table.Cell>tt</Table.Cell>
                    <Table.Cell>딸기 → ttalgi</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅃ</Table.Cell>
                    <Table.Cell>pp</Table.Cell>
                    <Table.Cell>뿌리 → ppuri</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅆ</Table.Cell>
                    <Table.Cell>ss</Table.Cell>
                    <Table.Cell>씨앗 → ssiat</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅉ</Table.Cell>
                    <Table.Cell>jj</Table.Cell>
                    <Table.Cell>짜장면 → jjajangmyeon</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        </Card>

        {/* 모음 표기법 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              모음 표기법
            </Heading>
            
            <Box className="mb-4">
              <Text size="3" weight="medium" className="mb-3 block">
                단모음
              </Text>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>한글</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>로마자</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>예시</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ㅏ</Table.Cell>
                    <Table.Cell>a</Table.Cell>
                    <Table.Cell>아버지 → abeoji</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅓ</Table.Cell>
                    <Table.Cell>eo</Table.Cell>
                    <Table.Cell>어머니 → eomeoni</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅗ</Table.Cell>
                    <Table.Cell>o</Table.Cell>
                    <Table.Cell>오늘 → oneul</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅜ</Table.Cell>
                    <Table.Cell>u</Table.Cell>
                    <Table.Cell>우리 → uri</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅡ</Table.Cell>
                    <Table.Cell>eu</Table.Cell>
                    <Table.Cell>으뜸 → eutteum</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅣ</Table.Cell>
                    <Table.Cell>i</Table.Cell>
                    <Table.Cell>이름 → ireum</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅐ</Table.Cell>
                    <Table.Cell>ae</Table.Cell>
                    <Table.Cell>개나리 → gaenari</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅔ</Table.Cell>
                    <Table.Cell>e</Table.Cell>
                    <Table.Cell>게시판 → gesipan</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>

            <Box>
              <Text size="3" weight="medium" className="mb-3 block">
                복합모음
              </Text>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>한글</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>로마자</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>예시</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ㅑ</Table.Cell>
                    <Table.Cell>ya</Table.Cell>
                    <Table.Cell>야구 → yagu</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅕ</Table.Cell>
                    <Table.Cell>yeo</Table.Cell>
                    <Table.Cell>여름 → yeoreum</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅛ</Table.Cell>
                    <Table.Cell>yo</Table.Cell>
                    <Table.Cell>요리 → yori</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅠ</Table.Cell>
                    <Table.Cell>yu</Table.Cell>
                    <Table.Cell>유치원 → yuchiwon</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅒ</Table.Cell>
                    <Table.Cell>yae</Table.Cell>
                    <Table.Cell>얘기 → yaegi</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅖ</Table.Cell>
                    <Table.Cell>ye</Table.Cell>
                    <Table.Cell>예의 → yeui</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅘ</Table.Cell>
                    <Table.Cell>wa</Table.Cell>
                    <Table.Cell>과자 → gwaja</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅙ</Table.Cell>
                    <Table.Cell>wae</Table.Cell>
                    <Table.Cell>왜냐하면 → waenyahamyeon</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅚ</Table.Cell>
                    <Table.Cell>oe</Table.Cell>
                    <Table.Cell>외국 → oeguk</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅝ</Table.Cell>
                    <Table.Cell>wo</Table.Cell>
                    <Table.Cell>원숭이 → wonsungi</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅞ</Table.Cell>
                    <Table.Cell>we</Table.Cell>
                    <Table.Cell>웨딩드레스 → wedingdeureseu</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅟ</Table.Cell>
                    <Table.Cell>wi</Table.Cell>
                    <Table.Cell>위험 → wiheom</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ㅢ</Table.Cell>
                    <Table.Cell>ui</Table.Cell>
                    <Table.Cell>의사 → uisa</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        </Card>

        {/* 표기 세칙 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4">
              표기 세칙
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  1. 음성 변화 반영
                </Text>
                <Text size="2" color="gray">
                  • 한국어의 실제 발음에 따라 표기<br/>
                  • 자음동화, 모음조화 등의 음성 변화 적용<br/>
                  • 예: 맏이 → maji (맏+이 → 마지)
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  2. 어간과 어미 구분
                </Text>
                <Text size="2" color="gray">
                  • 용언의 어간과 어미를 구분하여 표기<br/>
                  • 예: 먹어 → meogeo, 읽다 → ikda
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  3. 고유명사 표기
                </Text>
                <Text size="2" color="gray">
                  • 인명: 성과 이름을 띄어 쓰되, 이름은 붙여 씀<br/>
                  • 지명: 행정구역 단위로 띄어 씀<br/>
                  • 예: 김민수 → Kim Minsu, 서울특별시 → Seoul-teukbyeolsi
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  4. 된소리 표기
                </Text>
                <Text size="2" color="gray">
                  • 된소리는 해당 자음을 두 번 써서 표기<br/>
                  • 예: ㄲ → kk, ㄸ → tt, ㅃ → pp, ㅆ → ss, ㅉ → jj
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  5. ㅇ의 표기
                </Text>
                <Text size="2" color="gray">
                  • 어두의 ㅇ: 표기하지 않음 (아 → a)<br/>
                  • 어중, 어말의 ㅇ: ng로 표기 (강 → gang)
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 인명 표기 특례 */}
        <Card size="3" className="mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box className="p-6">
            <Heading as="h2" size="5" className="mb-4 flex items-center gap-2">
              <Info size={20} className="text-amber-600" />
              인명 표기 특례
            </Heading>
            
            <Box className="space-y-4">
              <Box>
                <Badge color="amber" className="mb-2">중요</Badge>
                <Text size="3" weight="medium" className="mb-2 block">
                  관용 표기 허용
                </Text>
                <Text size="2" color="gray">
                  • 이미 널리 사용되고 있는 로마자 표기는 허용<br/>
                  • 예: 이승만 → Lee Syngman (표준: I Seungman)<br/>
                  • 김대중 → Kim Dae-jung (표준: Gim Daejung)
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  이름의 하이픈 사용
                </Text>
                <Text size="2" color="gray">
                  • 이름의 음절 사이에 하이픈(-) 사용 가능<br/>
                  • 예: 김민수 → Kim Min-su 또는 Kim Minsu<br/>
                  • 개인의 선택에 따라 결정
                </Text>
              </Box>

              <Box>
                <Text size="3" weight="medium" className="mb-2 block">
                  성씨의 특별 표기
                </Text>
                <Text size="2" color="gray">
                  • 일부 성씨는 관용적 표기가 널리 사용됨<br/>
                  • 예: 이 → Lee (표준: I), 박 → Park (표준: Bak)<br/>
                  • 개인이 선택할 수 있음
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* 출처 및 참고 */}
        <Box className="text-center">
          <Separator className="mb-6" />
          
          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              공식 출처
            </Text>
            <Text size="2" color="gray" className="mb-4">
              본 내용은 국립국어원에서 제정한 「국어의 로마자 표기법」을 정리한 것입니다.
            </Text>
            
            <Flex gap="3" justify="center" wrap="wrap">
              <Button asChild variant="outline">
                <a 
                  href="https://korean.go.kr/kornorms/regltn/regltnView.do?regltn_code=0004#a820" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  국어의 로마자 표기법 (공식 문서)
                </a>
              </Button>
              
              <Button asChild variant="outline">
                <a 
                  href="https://www.korean.go.kr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  국립국어원 홈페이지
                </a>
              </Button>
            </Flex>
          </Box>

          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2 block">
              관련 법령
            </Text>
            <Text size="2" color="gray">
              • 문화체육관광부 고시 제2014-42호 (2014.12.5.)<br/>
              • 「국어기본법」 제14조 (국어의 로마자 표기)<br/>
              • 「국어기본법 시행령」 제13조 (로마자 표기법)
            </Text>
          </Box>

          <Text size="1" color="gray">
            최종 업데이트: {new Date().toLocaleDateString('ko-KR')}<br/>
            정확한 표기법은 국립국어원 공식 자료를 참고하시기 바랍니다.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
