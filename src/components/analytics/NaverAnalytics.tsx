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
          let lastPathname = '';
          
          function wcsInit() {
            if (!window.wcs) return;
            
            const currentPathname = window.location.pathname;
            
            // 경로(pathname)가 변경된 경우에만 페이지뷰 카운트
            // URL 파라미터(?n=이름&o=옵션) 변경은 무시
            if (currentPathname === lastPathname && lastPathname !== '') {
              return; // 같은 페이지 내 파라미터 변경은 스킵
            }
            
            lastPathname = currentPathname;
            window.wcs_do = window.wcs_do || function() {};
            window.wcs_do();
          }
          
          // 페이지 로드 시 실행 (최초 1회만)
          wcsInit();
          
          // 실제 페이지 이동 시에만 실행
          if (typeof window !== 'undefined') {
            window.addEventListener('popstate', () => {
              setTimeout(wcsInit, 100);
            });
          }
        `}
      </Script>
    </>
  );
} 