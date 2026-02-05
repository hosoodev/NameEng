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
          let isNaverInitialized = false;
          let lastUrl = '';
          
          function wcsInit() {
            if (!window.wcs || isNaverInitialized) return;
            
            const currentUrl = window.location.href;
            if (currentUrl === lastUrl) return; // 같은 URL이면 스킵
            
            lastUrl = currentUrl;
            window.wcs_do = window.wcs_do || function() {};
            window.wcs_do();
            isNaverInitialized = true;
            
            // 5초 후 다시 초기화 가능하도록 (실제 페이지 이동 시에만)
            setTimeout(() => {
              isNaverInitialized = false;
            }, 5000);
          }
          
          // 페이지 로드 시 실행
          wcsInit();
          
          // 실제 페이지 이동 시에만 실행 (URL 파라미터 변경 제외)
          if (typeof window !== 'undefined') {
            window.addEventListener('popstate', () => {
              setTimeout(wcsInit, 100); // 약간의 지연 후 실행
            });
          }
        `}
      </Script>
    </>
  );
} 