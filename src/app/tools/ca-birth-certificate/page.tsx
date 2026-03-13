import type { Metadata } from 'next';
import CaBirthCertClient from './CaBirthCertClient';

export const metadata: Metadata = {
  title: '캘리포니아주 출생증명서 번역기 | 네이밍(NameEng)',
  description: '캘리포니아주 출생증명서(Birth Certificate)를 한글로 쉽게 번역하고, 인쇄 가능한 양식으로 바로 출력하세요.',
};

export default function CaBirthCertificatePage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">캘리포니아주 출생증명서 번역기</h1>
        <p className="text-gray-600 text-sm">
          캘리포니아주 출생증명서를 한국어로 쉽게 번역하고, 제출용 포맷으로 바로 인쇄(PDF 저장)할 수 있습니다.
        </p>
      </div>

      <CaBirthCertClient />
    </div>
  );
}
