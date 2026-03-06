'use client';


export default function Footer() {
    return (
        <footer className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 px-4">
                <a href="/about" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        사이트 소개
                    </span>
                </a>
                <a href="/how-to-use" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        이용방법
                    </span>
                </a>
                <a href="/passport-guide" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        여권 규정
                    </span>
                </a>
                <a href="/romanization-guide" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        표기법 가이드
                    </span>
                </a>
                <a href="/faq" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        FAQ
                    </span>
                </a>
                <a href="/blog" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        블로그
                    </span>
                </a>
                <a href="/tools" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        도구
                    </span>
                </a>
                <a href="https://juso24.com/english" target="_blank" className="text-center">
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        영문주소변환기
                    </span>
                </a>
            </div>

            <div className="text-xs text-gray-500 px-4">
                © {new Date().getFullYear()} Nameeng.
            </div>
        </footer>
    );
}
