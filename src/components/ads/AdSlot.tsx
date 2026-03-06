'use client';

import { useEffect, useRef } from 'react';

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';

interface AdSlotProps {
  slot: string;
  format?: AdFormat;
  /** fullWidth: 모바일에서 화면 전체 너비 광고 (마진 없음) */
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default function AdSlot({
  slot,
  format = 'auto',
  fullWidth = false,
  className = '',
  style,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // silently fail in dev
    }
  }, []);

  return (
    <div
      className={[
        'ad-slot overflow-hidden',
        fullWidth
          ? 'w-screen relative left-1/2 -translate-x-1/2' // 부모 패딩 무시하고 full width
          : 'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      aria-label="광고"
    >
      {/* 광고 레이블 - 작고 눈에 덜 띄게 */}
      <p className="text-[10px] text-center text-gray-300 leading-none mb-0.5 select-none">
        광고
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  );
}
