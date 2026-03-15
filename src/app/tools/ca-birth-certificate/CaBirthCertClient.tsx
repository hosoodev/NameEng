'use client';

import { useState, useEffect, useCallback } from 'react';
import CertStepForm from './_components/CertStepForm';
import CertPreview from './_components/CertPreview';

export interface CertData {
  'paper-size': string;
  'file-no': string;
  'top-county': string;
  'reg-no': string;
  '1a': string;
  '1b': string;
  '1c': string;
  '2': string;
  '3a': string;
  '3a-text': string;
  '3b': string;
  '4a': string;
  '4b': string;
  '5a': string;
  '5b': string;
  '5c': string;
  '5d': string;
  '6a': string;
  '6b': string;
  '6c': string;
  '7': string;
  '8': string;
  '9a': string;
  '9b': string;
  '9c': string;
  '10': string;
  '11': string;
  '12a': string;
  '12b': string;
  '12c': string;
  '13a': string;
  '13b': string;
  '13c': string;
  '13d-name': string;
  '13d-addr': string;
  '14': string;
  '15a': string;
  '15b': string;
  '16': string;
  '17': string;
  't-date': string;
  't-name': string;
  't-addr': string;
  't-contact': string;
  't-email': string;
}

const defaultData: CertData = {
  'paper-size': 'letter',
  'file-no': '',
  'top-county': '',
  'reg-no': '',
  '1a': '', '1b': '', '1c': '',
  '2': '', '3a': '', '3a-text': '', '3b': '', '4a': '', '4b': '',
  '5a': '', '5b': '', '5c': '', '5d': '',
  '6a': '', '6b': '', '6c': '', '7': '', '8': '',
  '9a': '', '9b': '', '9c': '', '10': '', '11': '',
  '12a': '', '12b': '', '12c': '',
  '13a': '', '13b': '', '13c': '', '13d-name': '', '13d-addr': '', '14': '',
  '15a': '', '15b': '', '16': '', '17': '',
  't-date': '', 't-name': '', 't-addr': '', 't-contact': '', 't-email': ''
};

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { encryptPayload, decryptPayload } from './_lib/crypto-url';

const STORAGE_KEY = 'californiaBirthCertFinalV12';

export default function CaBirthCertClient() {
  const [data, setData] = useState<CertData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. 초기 로딩 및 복호화 로직
  useEffect(() => {
    const handleInitialLoad = async () => {
      const dParam = searchParams.get('d');
      
      // 보안 링크 처리 (d 파라미터 우선)
      if (dParam) {
        const password = window.prompt("보안 링크를 열기 위해 비밀번호를 입력해주세요.");
        if (password) {
          try {
            const decrypted = await decryptPayload(dParam, password);
            setData(decrypted);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(decrypted));
            // 처리 후 클린 URL로 변경
            router.replace(pathname);
            setIsLoaded(true);
            return;
          } catch (e) {
            alert("비밀번호가 일치하지 않거나 링크가 손상되었습니다.");
            router.replace(pathname);
          }
        } else {
          // 비밀번호 취소 시 d 파라미터 제거
          router.replace(pathname);
        }
      }

      // 평문 URL 파라미터 로드
      const params = new URLSearchParams(window.location.search);
      let initialData: CertData | null = null;

      if (Array.from(params.keys()).length > 0) {
        initialData = { ...defaultData };
        (Object.keys(defaultData) as (keyof CertData)[]).forEach(k => {
          if (params.has(k)) {
            initialData![k] = params.get(k) || '';
          }
        });
      }
      // 로컬스토리지 로드
      else {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            initialData = { ...defaultData, ...parsed };
          } catch (e) {
            console.error("Failed to parse local storage data", e);
          }
        }
      }

      if (initialData) {
        setData(initialData);
        if (Array.from(params.keys()).length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
      }
      setIsLoaded(true);
    };

    handleInitialLoad();
  }, [searchParams, pathname, router]);

  // 데이터 업데이트 및 스토리지 저장
  const handleChange = useCallback((key: keyof CertData, value: string) => {
    setData(prev => {
      const next = { ...prev, [key]: value };
      
      // 3A 항목에 따른 3B 초기화 연동 로직
      if (key === '3a') {
        if (value !== '쌍생아' && value !== '기타') {
          next['3b'] = '';
          next['3a-text'] = '';
        } else if (value === '쌍생아') {
          next['3a-text'] = '';
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // 보안 공유 링크 생성 (암호화)
  const handleShare = useCallback(async () => {
    const password = window.prompt("보안 공유를 위해 비밀번호를 설정해주세요.\n(비밀번호를 아는 사람만 이 링크를 열 수 있습니다)");
    if (!password) return;

    let shareUrl = "";
    try {
      const token = await encryptPayload(data, password);
      shareUrl = `${window.location.origin}${pathname}?d=${token}`;
      
      // 데스크탑 환경 판별 (단순화된 체크)
      const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // 1. 데스크탑: 클립보드 복사 우선
      if (isDesktop && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        alert('공유 링크가 클립보드에 복사되었습니다!\n비밀번호와 함께 전달해 주세요.');
      } 
      // 2. 모바일 또는 데스크탑 복사 실패 시: 네이티브 공유 시도
      else if (navigator.share) {
        await navigator.share({
          title: '출생증명서 보안 링크',
          text: '안전하게 암호화된 출생증명서 데이터입니다. 전달받은 비밀번호를 입력해 주세요.',
          url: shareUrl
        });
      }
      // 3. 둘 다 불가능한 경우 (예: 구형 브라우저, http 환경 등)
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert('공유 링크가 클립보드에 복사되었습니다!');
      } else {
        throw new Error("Sharing methods not available");
      }
    } catch (error: any) {
      // 사용자가 공유 창을 띄웠다가 그냥 닫은 경우(AbortError)는 무시
      if (error.name === 'AbortError') return;

      // 브라우저 정책상 자동 복사가 완전히 막힌 경우 최후의 방어책 (window.prompt)
      console.warn("자동 공유 실패:", error);
      window.prompt('보안 정책으로 자동 복사가 차단되었습니다.\n아래 링크를 직접 복사하여 전달해 주세요.', shareUrl);
    }
  }, [data, pathname]);

  // 인쇄 실행
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // 전체 초기화
  const handleClear = useCallback(() => {
    if (window.confirm("입력된 모든 정보를 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      localStorage.removeItem(STORAGE_KEY);
      setData({ ...defaultData });
      
      const url = new URL(window.location.href);
      if (url.search) {
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
      }
      
      alert('모든 입력 정보가 삭제되었습니다.');
    }
  }, []);

  if (!isLoaded) return null; // Hydration 렌더링 방지

  return (
    <div className="flex flex-col gap-10">
      <div className="no-print">
         <CertStepForm data={data} onChange={handleChange} onShare={handleShare} onPrint={handlePrint} onClear={handleClear} />
      </div>

      <div className="w-full overflow-x-auto pb-10 no-print-bg bg-gray-100 sm:rounded-xl border-y sm:border border-gray-200 py-6 sm:py-10 print:py-0 print:border-none print:bg-white">
        <div className="w-[850px] mx-auto lg:w-full flex justify-start lg:justify-center px-4 md:px-0 print:w-full print:px-0 py-4 print:py-0">
          <CertPreview data={data} />
        </div>
      </div>
    </div>
  );
}
