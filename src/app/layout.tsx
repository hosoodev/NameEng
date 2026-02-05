import type { Metadata } from "next";
// import { Nanum_Gothic } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Analytics from '@/components/analytics/Analytics';

// 시스템 폰트만 사용하는 경우
// const nanumGothic = Nanum_Gothic({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   display: "swap",
//   preload: true,
//   fallback: ['system-ui', 'arial'],
//   variable: '--font-nanum-gothic',
// });

const SITE_TITLE = "영문이름변환기 - Nameeng 네이밍 | 한글이름 영문 변환기";
const SITE_DESCRIPTION = "NameEng는 국어의 로마자 표기법을 준수하는 정확한 영문이름 변환기를 제공합니다. 여권 발급, 해외 거주에 안전한 영문이름 변환기 사이트입니다. 네이버 영문이름 변환기 서비스 종료 후 가장 신뢰받는 대체 서비스입니다.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: "영문이름변환기, 영문이름 변환기, 영문이름 변환기 한글, 영문이름 변환기 여권, 네이버 영문이름 변환기, 한글이름 영문 변환기, 영문이름 변환기 사이트, 영문이름 로마자 변환기, 영문이름 영어 변환기, 한글 이름 로마자, 로마자 표기법, 여권 로마자, 해외 거주 이름",
  authors: [{ name: 'NameEng Team' }],
  creator: 'NameEng Team',
  publisher: 'NameEng',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nameeng.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://nameeng.com",
    siteName: "NameEng - 영문이름변환기",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "영문이름변환기 - 네이버 영문이름 변환기 대체 서비스",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      'naver-site-verification': [process.env.NEXT_PUBLIC_NAVER_VERIFICATION || ''],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0090ff" />
        <meta name="msapplication-TileColor" content="#0090ff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <Analytics />
      </head>
      <body className="antialiased">
        <Theme accentColor="blue" grayColor="slate" radius="medium">
          {children}
        </Theme>
      </body>
    </html>
  );
}
