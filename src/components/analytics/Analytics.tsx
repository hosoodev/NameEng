'use client';

import GoogleAdsense from './GoogleAdsense';
// import CoupangPartners from './CoupangPartners';
import GoogleAnalytics from './GoogleAnalytics';
import NaverAnalytics from './NaverAnalytics';
// import VercelSpeedInsights from './VercelSpeedInsights';

export default function Analytics() {
  return (
    <>
      <GoogleAdsense />
      {/* <CoupangPartners /> */}
      <GoogleAnalytics />
      <NaverAnalytics />
      {/* <VercelSpeedInsights /> */}
    </>
  );
} 