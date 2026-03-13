'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MobileSlideMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // 메뉴가 열렸을 때 body 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const links = [
        { href: '/romanization-guide', label: '로마자 표기법' },
        { href: '/passport-guide', label: '여권 가이드' },
        { href: '/names/us/popular', label: '영어 이름 순위' },
        { href: '/blog', label: '블로그' },
        { href: '/tools', label: '도구' },
        { href: '/faq', label: 'FAQ' },
    ];

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -mr-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="메뉴 열기"
            >
                <Menu size={24} />
            </button>

            {/* 오버레이 (반투명 배경) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[90] transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 슬라이드 메뉴 */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <span className="text-lg font-bold text-gray-900">메뉴</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="메뉴 닫기"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col py-2 overflow-y-auto h-[calc(100vh-61px)]">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b border-gray-50 last:border-0"
                        >
                            {link.label}
                            <ChevronRight size={18} className="text-gray-300" />
                        </Link>
                    ))}
                    
                    <div className="p-5 mt-4 bg-gray-50 mx-4 rounded-xl">
                        <p className="text-xs text-center text-gray-500 font-medium">
                            한글 이름 영문 변환기
                            <br />
                            <span className="font-bold text-gray-800 mt-1 block">Nameeng</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
