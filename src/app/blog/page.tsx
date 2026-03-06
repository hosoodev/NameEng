import {
  ArrowLeft,
  BookOpen,
  FileText,
  Briefcase,
  Search
} from 'lucide-react';
import type { Metadata } from 'next';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AdSlot from '@/components/ads/AdSlot';
import ContentLinks from '@/components/converter/ContentLinks';
import BlogFilterList from './BlogFilterList';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: '블로그 - 한글 이름 로마자 표기 가이드 | Nameeng 네이밍',
  description: '한글 이름의 로마자 표기에 대한 전문 정보와 실용적인 가이드를 제공합니다. 여권 발급, 해외 거주, 국제 업무 시 필요한 영문명 작성법을 배워보세요.',
  keywords: '한글 이름 로마자 표기, 영문명 작성법, 여권 로마자 표기, 해외 거주 영문명, 국제 업무 이름 표기, 성씨 영문 표기',
};



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
          <div className="w-full px-4 md:px-0 pb-12">
            {/* Header Content */}
            <div className="mb-8">
              <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <ArrowLeft size={16} />
                NameEng로 돌아가기
              </a>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                블로그
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                한글 이름의 로마자 표기에 대한 전문 정보와 실용적인 가이드
              </p>

              {/* Filtering Post List Component */}
              <BlogFilterList
                posts={blogPosts}
                adSlot={<div className="my-8"><AdSlot slot="2738626516" format="horizontal" /></div>}
              />
            </div>

            {/* 더 많은 콘텐츠 예고 */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">새로운 가이드가 계속 추가됩니다</h3>
                <p className="text-blue-100 mb-6 max-w-lg">
                  전문가들이 검토한 더 많은 이름 표기 가이드와 해외 생활 정보를 준비 중입니다. 궁금한 주제가 있다면 언제든 알려주세요.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">문화 차이 가이드</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <Briefcase size={18} />
                    <span className="text-sm font-medium">비즈니스 매너</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <FileText size={18} />
                    <span className="text-sm font-medium">서류 작성 팁</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="hidden md:block space-y-8">
            <AdSlot slot="2738626516" format="vertical" />

            <div className="sticky top-4">
              <ContentLinks
                title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 연관 추천</span>}
                items={[
                  { href: '/how-to-use', icon: <FileText className="text-emerald-500" size={20} />, title: 'NameEng 기초 사용법', desc: '서비스를 활용법과 꿀팁 알아보기' },
                  { href: '/passport-guide', icon: <Briefcase className="text-indigo-500" size={20} />, title: '여권 로마자 표기 규정', desc: '외교부 여권 발급 공식 가이드' },
                  { href: '/faq', icon: <Search className="text-blue-500" size={20} />, title: '비자/여권 FAQ', desc: '가장 많이 물어보는 여권 질문과 답변' }
                ]}
              />
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}