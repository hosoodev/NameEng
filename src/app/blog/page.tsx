import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  FileText,
  Briefcase,
  Search
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1">
        <div className="px-4 md:hidden mt-4">
          <SiteHeader />
        </div>

        <div className="md:grid md:grid-cols-[1fr_300px] gap-8 mt-8">
          {/* Main Column */}
          <div className="w-full px-4 md:px-0">
            {/* Header Content */}
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                NameEng로 돌아가기
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                블로그
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                한글 이름의 로마자 표기에 대한 전문 정보와 실용적인 가이드
              </p>
            </div>

            {/* 카테고리 필터 */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 cursor-pointer">전체</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">실용정보</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">해외생활</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">비즈니스</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">언어학</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">역사</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">안전가이드</span>
            </div>

            {/* 블로그 포스트 목록 */}
            <div className="space-y-4 mb-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm md:text-base text-gray-600 mb-5 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-sm bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 border border-gray-200">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-sm font-bold text-blue-600">
                        <span>읽어보기</span>
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 더 많은 콘텐츠 예고 */}
            <div className="bg-gray-100 rounded-2xl border border-gray-200 p-8 text-center mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                더 많은 콘텐츠가 준비 중입니다
              </h3>
              <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
                한글 이름의 로마자 표기에 대한 더 많은 유용한 정보를
                지속적으로 업데이트하고 있습니다.
              </p>
              <p className="text-xs text-gray-500">
                새로운 글이 업데이트되면 알림을 받고 싶으시다면
                북마크에 추가해 주세요.
              </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden md:block w-[300px]">
            <div className="sticky top-4 space-y-4">
              <AdSlot slot="4812260682" format="rectangle" />
              <div className="mb-6">
                <ContentLinks
                  title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 연관 추천</span>}
                  items={[
                    { href: '/how-to-use', icon: <FileText className="text-emerald-500" size={20} />, title: 'NameEng 기초 사용법', desc: '서비스를 활용법과 꿀팁 알아보기' },
                    { href: '/passport-guide', icon: <Briefcase className="text-indigo-500" size={20} />, title: '여권 로마자 표기 규정', desc: '외교부 여권 발급 공식 가이드' },
                    { href: '/faq', icon: <Search className="text-blue-500" size={20} />, title: '비자/여권 FAQ', desc: '가장 많이 물어보는 여권 질문과 답변' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
        <SiteFooter />
      </div>
    </div>
  );
}