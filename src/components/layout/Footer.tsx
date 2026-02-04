'use client';

import { Box, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function Footer() {
    return (
        <Box className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 px-4">
                <Link href="/about" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        사이트 소개
                    </Text>
                </Link>
                <Link href="/how-to-use" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        이용방법
                    </Text>
                </Link>
                <Link href="/passport-guide" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        여권 규정
                    </Text>
                </Link>
                <Link href="/romanization-guide" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        표기법 가이드
                    </Text>
                </Link>
                <Link href="/faq" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        FAQ
                    </Text>
                </Link>
                <Link href="/blog" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        블로그
                    </Text>
                </Link>
                <Link href="/tools" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        도구
                    </Text>
                </Link>
                <Link href="https://juso24.com/english" target="_blank" className="text-center" prefetch={false}>
                    <Text size="2" color="gray" className="hover:text-blue-600 transition-colors duration-200">
                        영문주소변환기
                    </Text>
                </Link>
            </div>

            <Text size="1" color="gray" className="px-4">
                © {new Date().getFullYear()} Nameeng.
            </Text>
        </Box>
    );
}
