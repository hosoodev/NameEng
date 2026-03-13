import type { Metadata } from 'next';
import CaBirthCertClient from './CaBirthCertClient';

export const metadata: Metadata = {
  title: '미국 캘리포니아주 출생증명서 번역기 (PDF 인쇄/다운로드) | 네이밍(NameEng)',
  description: '미국 캘리포니아주 출생증명서(California Birth Certificate) 영문 원본을 손쉽게 한국어로 번역하고, 실제 공식 관공서 제출용 서식 사이즈에 맞추어 즉시 PDF로 인쇄 및 다운로드할 수 있는 완전 무료 번역 양식 자동 완성 도구입니다.',
};

export default function CaBirthCertificatePage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6 print:hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">미국 캘리포니아주 출생증명서 번역기</h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          미국 캘리포니아주 출생증명서(California Birth Certificate) 영문 양식을 편리하게 한국어로 번역할 수 있는 무료 도구입니다.<br className="hidden md:block"/>
          출생자 이름, 날짜, 병원 주소 등 필수 정보만 단계별로 차례대로 입력하시면, 관공서 제출 목적에 부합하는 한국어 번역본 양식이 자동으로 완성됩니다.<br className="hidden md:block"/>
          모든 입력을 마치신 후 하단의 <strong>[인쇄 및 PDF 저장]</strong> 버튼을 눌러 제출용 규격(A4 및 Letter 사이즈)으로 바로 출력하실 수 있습니다. 입력하신 모든 민감한 개인정보는 <strong>보안을 위해 100% 사용자의 브라우저 내부에만 안전하게 보관</strong>되며 서버로 전송되지 않습니다.
        </p>
      </div>

      <CaBirthCertClient />
    </div>
  );
}
