'use client';

import React, { useEffect } from 'react';

interface AdsenseProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

const Adsense: React.FC<AdsenseProps> = ({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = ''
}) => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // 이미 초기화된 광고가 있는지 확인
        const existingAds = document.querySelectorAll(`ins[data-ad-slot="${dataAdSlot}"]`);
        const isAlreadyInitialized = Array.from(existingAds).some(ad => 
          ad.getAttribute('data-adsbygoogle-status') === 'done'
        );
        
        if (!isAlreadyInitialized) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Adsense error', e);
      }
    }
  }, [dataAdSlot]); // dataAdSlot을 의존성으로 추가

  return (
    <div className={`mx-auto text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

// 전역 타입 선언
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default Adsense;


// 참고 https://github.com/janhbnr/Next.js-14-Google-Adsense