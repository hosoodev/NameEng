'use client';

import { useEffect, useRef } from 'react';

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';

interface AdSlotProps {
  slot: string;
  format?: AdFormat;
  /** fullWidth: 모바일에서 화면 전체 너비 광고 (마진 없음) */
  fullWidth?: boolean;
  className?: string;
  /** <ins> 태그에 직접 적용되는 스타일 (AdSense가 덮어쓰지 않는 속성 용도) */
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
        'ad-slot overflow-hidden text-center',
        fullWidth
          ? 'w-screen relative left-1/2 -translate-x-1/2'
          : 'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="광고"
    >
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  );
}
