import Image from 'next/image';

export default function DesktopNavBar() {
    return (
        <div className="hidden md:flex items-center justify-between py-6 border-b border-gray-200 mb-8 max-w-[1280px] mx-auto w-full px-4 md:px-8">
            <div className="flex items-center gap-4 lg:gap-6">
                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
                    {/* Note: since next/image might require config for remote image, we'll keep standard img for SVG but usually Next.js handles local well */}
                    <img src="/logo.svg" alt="NameEng Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold tracking-tight">Nameeng</span>
                </a>
                <div className="h-4 w-px bg-gray-300 shrink-0"></div>
                <nav className="flex items-center gap-3 lg:gap-6 whitespace-nowrap">
                    <a href="/romanization-guide" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">로마자 표기법</a>
                    <a href="/passport-guide" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">여권 가이드</a>
                    <a href="/names/us/popular" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">영어 이름 순위</a>
                    <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">블로그</a>
                    <a href="/tools" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">도구</a>
                    <a href="/faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
                </nav>
            </div>
            <div className="text-sm font-medium text-gray-500">
                한글 이름 영문 변환기
            </div>
        </div>
    );
}
