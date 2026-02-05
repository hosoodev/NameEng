'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!gaId) {
    return null;
  }
  
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date()); 
          
          // 페이지뷰 자동 전송 비활성화
          gtag('config', '${gaId}', {
            send_page_view: false
          });
          
          // 수동으로 페이지뷰 전송 (pathname 변경 시에만)
          let lastPathname = window.location.pathname;
          
          function sendPageView() {
            const currentPathname = window.location.pathname;
            if (currentPathname !== lastPathname || lastPathname === window.location.pathname) {
              gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.origin + currentPathname
              });
              lastPathname = currentPathname;
            }
          }
          
          // 초기 페이지뷰 전송
          sendPageView();
          
          // 실제 페이지 이동 시에만 페이지뷰 전송
          window.addEventListener('popstate', sendPageView);
        `}
      </Script>
    </>
  );
} 