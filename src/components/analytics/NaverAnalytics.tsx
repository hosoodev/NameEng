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
            if(window.wcs) {
              window.wcs_do = window.wcs_do || function() {};
              window.wcs_do();
            }
          }
          
          // 페이지 로드 시 실행
          wcsInit();
          
          // Next.js의 라우팅 이벤트에서도 실행
          // 사용자가 페이지를 이동할 때마다 애널리틱스 호출
          if (typeof window !== 'undefined') {
            const pushState = window.history.pushState;
            window.history.pushState = function() {
              pushState.apply(window.history, arguments);
              wcsInit();
            };
            
            window.addEventListener('popstate', wcsInit);
          }
        `}
      </Script>
    </>
  );
} 