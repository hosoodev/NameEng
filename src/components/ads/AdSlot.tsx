'use client';

import { useEffect, useRef } from 'react';

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';

interface AdSlotProps {
  slot: string;
  format?: AdFormat;
  /** fullWidth: 모바일에서 화면 전체 너비 광고 (마진 없음) */
  fullWidth?: boolean;
  className?: string;
  /**
   * style은 외부 래퍼 div에 적용됨.
   * AdSense JS가 내부 .ad-slot 요소에 min-height: 0px !important를 주입하므로
   * style prop을 별도 래퍼에 분리하여 덮어씌워지지 않도록 처리함.
   */
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
    // 외부 래퍼: style prop (min-height 등) 담당 — AdSense가 건드리지 않음
    <div style={style}>
      {/* 내부 .ad-slot: AdSense JS가 이 요소에 min-height: 0px !important를 주입 */}
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
        aria-label="광고"
      >
        <ins
          ref={adRef}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={fullWidth ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
