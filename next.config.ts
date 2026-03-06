import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 패키지 임포트 최적화
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // 정적 자산 캐싱 헤더 설정
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*\.(?:jpg|jpeg|gif|png|webp|svg|ico))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
