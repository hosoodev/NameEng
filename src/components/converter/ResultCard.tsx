'use client';

import { useState } from 'react';
import { Copy, Check, Share2, ChevronRight, Wifi } from 'lucide-react';

interface ContextualLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ResultCardProps {
  inputName: string;
  romanized: string;
  onCopy: (text: string) => void;
  onShare: () => void;
  contextualLinks?: ContextualLink[];
}

export default function ResultCard({
  inputName,
  romanized,
  onCopy,
  onShare,
  contextualLinks = [],
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(romanized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
    >
      {/* 결과 메인 */}
      <div className="px-5 pt-5 pb-4">
        {/* 원문 이름 — 작고 조용하게 */}
        <p className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-2">
          <span
            className="inline-block flex-shrink-0 rounded-full"
            style={{ width: 6, height: 6, background: '#0090ff' }}
          />
          {inputName}
        </p>

        {/* 영문명 — 가장 크고 강하게 */}
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-gray-900 text-3xl font-extrabold leading-none break-words"
            style={{ letterSpacing: '-0.04em' }}
          >
            {romanized}
          </p>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-xl px-3 py-2.5 text-xs font-bold transition-all"
              aria-label="복사하기"
            >
              {copied ? (
                <><Check size={13} strokeWidth={2.5} />복사됨</>
              ) : (
                <><Copy size={13} strokeWidth={2} />복사</>
              )}
            </button>
            <button
              onClick={onShare}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-500 rounded-xl transition-all border border-gray-200"
              aria-label="공유하기"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 맥락 CTA */}
      {contextualLinks.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-3">
          <p className="text-gray-400 text-[10px] font-bold mb-2 uppercase tracking-widest">
            이 이름이 궁금하다면
          </p>
          <div className="flex flex-col gap-1.5">
            {/* CTA: 인터넷 가입 배너 - 링크 카드 최상단 */}
            <a
              href="/go/internet"
              className="flex items-center justify-between bg-white hover:bg-orange-50 active:bg-orange-100 rounded-xl px-3 py-2.5 transition-colors group border border-orange-100 hover:border-orange-200"
            >
              <span className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                <Wifi size={14} className="text-orange-400 flex-shrink-0" />
                {/* 모바일: 짧은 문구, 데스크탑: 긴 문구 */}
                <span className="sm:hidden">인터넷 가입 시 40만원+@ 혜택!</span>
                <span className="hidden sm:inline">인터넷 신규·환승 가입 시 40만원+@ 혜택!</span>
              </span>
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[9px] font-bold text-orange-300 border border-orange-200 rounded px-1 py-0.5 leading-none">광고</span>
                <ChevronRight
                  size={13}
                  className="text-orange-200 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all"
                />
              </span>
            </a>
            {contextualLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between bg-white hover:bg-blue-50 active:bg-blue-100 rounded-xl px-3 py-2.5 transition-colors group border border-gray-100 hover:border-blue-200"
              >
                <span className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-blue-700 font-medium transition-colors">
                  <span>{link.icon}</span>
                  {link.label}
                </span>
                <ChevronRight
                  size={13}
                  className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
