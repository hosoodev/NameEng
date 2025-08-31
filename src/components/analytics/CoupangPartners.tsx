'use client';

import Script from 'next/script';

export default function CoupangPartners() {
  return (
    <Script
      async
      src="https://ads-partners.coupang.com/g.js"
      strategy="afterInteractive"
    />
  );
} 