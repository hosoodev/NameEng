'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 px-4">
                <Link href="/about" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        사이트 소개
                    </span>
                </Link>
                <Link href="/how-to-use" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        이용방법
                    </span>
                </Link>
                <Link href="/passport-guide" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        여권 규정
                    </span>
                </Link>
                <Link href="/romanization-guide" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        표기법 가이드
                    </span>
                </Link>
                <Link href="/faq" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        FAQ
                    </span>
                </Link>
                <Link href="/blog" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        블로그
                    </span>
                </Link>
                <Link href="/tools" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        도구
                    </span>
                </Link>
                <Link href="https://juso24.com/english" target="_blank" className="text-center" prefetch={false}>
                    <span className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        영문주소변환기
                    </span>
                </Link>
            </div>

            <div className="text-xs text-gray-500 px-4">
                © {new Date().getFullYear()} Nameeng.
            </div>
        </footer>
    );
}
