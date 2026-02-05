'use client';

import Script from 'next/script';

export default function NaverAnalytics() {
  const naverId = process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID;
  
  if (!naverId) {
    return null;
  }
  
  return (
    <>
      <Script
        src="https://wcs.naver.net/wcslog.js"
        strategy="afterInteractive"
      />
      <Script id="naver-analytics" strategy="afterInteractive">
        {`
          if(!window.wcs_add) window.wcs_add = {};
          window.wcs_add["wa"] = "${naverId}";
        `}
      </Script>
      <Script id="naver-analytics-execute" strategy="afterInteractive">
        {`
          function wcsInit() {
            if (!window.wcs) return;
            window.wcs_do = window.wcs_do || function() {};
            window.wcs_do();
          }
          
          // 페이지 로드 시 실행 (1회만)
          wcsInit();
        `}
      </Script>
    </>
  );
} 