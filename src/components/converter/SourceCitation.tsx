import { Link2 } from 'lucide-react';

export default function SourceCitation() {
    return (
        <div className="mt-8 pt-6 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-4">
            <p className="font-bold text-gray-700 mb-1">자료 출처</p>
            <p>"성씨의 로마자 표기 정책 마련 연구" (연구책임자: 이상억, 발행일: 2011/09/16, 관리번호: DM00011819, 문화체육관광부)</p>
            <a
                href="https://www.archives.go.kr/next/newsearch/showDetailPopup.do?rc_code=1310377&rc_rfile_no=201103735365&rc_ritem_no=000000000001&sitePage=0-0-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 text-blue-600 hover:text-blue-800 hover:underline"
            >
                <Link2 size={12} />
                국가기록원 원문 보기
            </a>
        </div>
    );
}
