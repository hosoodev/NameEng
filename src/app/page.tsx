import { Suspense } from 'react';
import NameEngConverter from '@/components/converter/NameEngConverter';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <NameEngConverter />
    </Suspense>
  );
}
