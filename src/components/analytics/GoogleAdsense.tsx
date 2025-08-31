'use client';

import Script from 'next/script';

export default function GoogleAdsense() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  
  if (!adsenseId) {
    return null;
  }
  
  return (
    <>
      <meta name="google-adsense-account" content={adsenseId} />
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
} 