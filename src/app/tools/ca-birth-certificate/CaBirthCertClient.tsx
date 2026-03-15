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

import PasswordModal from './_components/PasswordModal';

const STORAGE_KEY = 'californiaBirthCertFinalV12';

export default function CaBirthCertClient() {
  const [data, setData] = useState<CertData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 모달 상태
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    mode: 'encrypt' | 'decrypt';
    title: string;
    description: string;
    submitLabel: string;
    token?: string;
  }>({
    isOpen: false,
    mode: 'encrypt',
    title: '',
    description: '',
    submitLabel: ''
  });

  // 1. 초기 로딩 및 복호화 로직
  useEffect(() => {
    const handleInitialLoad = async () => {
      const dParam = searchParams.get('d');
      
      // 보안 링크 처리 (d 파라미터 우선)
      if (dParam) {
        setModalConfig({
          isOpen: true,
          mode: 'decrypt',
          title: '보안 링크 복구',
          description: '이 링크는 암호화되어 있습니다. 비밀번호를 입력해주세요.',
          submitLabel: '복구하기',
          token: dParam
        });
        // 복호화 로직은 Modal의 onSubmit에서 처리하므로 여기서 중단
        return;
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

  // 비밀번호 입력 완료 시 실행
  const handleModalSubmit = async (password: string) => {
    if (modalConfig.mode === 'decrypt' && modalConfig.token) {
      try {
        const decrypted = await decryptPayload(modalConfig.token, password);
        setData(decrypted);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(decrypted));
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        router.replace(pathname);
        setIsLoaded(true);
      } catch (e) {
        alert("비밀번호가 일치하지 않거나 링크가 손상되었습니다.");
      }
    } else if (modalConfig.mode === 'encrypt') {
      try {
        const token = await encryptPayload(data, password);
        const shareUrl = `${window.location.origin}${pathname}?d=${token}`;
        
        setModalConfig(prev => ({ ...prev, isOpen: false }));

        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareUrl);
          alert('암호화된 보안 링크가 클립보드에 복사되었습니다. 설정하신 비밀번호와 함께 상대방에게 전달해주세요.');
        } else {
          // Fallback
          const tempInput = document.createElement("input");
          tempInput.value = shareUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
          alert('암호화된 보안 링크가 복사되었습니다.');
        }
      } catch (e) {
        console.error('Sharing failed:', e);
        alert('보안 링크 생성 중 오류가 발생했습니다.');
      }
    }
  };

  const handleModalClose = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
    if (modalConfig.mode === 'decrypt') {
      router.replace(pathname);
      setIsLoaded(true); // 복호화 취소 시에도 폼은 보여줘야 함 (기존 데이터 유지)
    }
  };

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

  // 보안 공유 링크 생성 (암호화 모달 띄우기)
  const handleShare = useCallback(async () => {
    setModalConfig({
      isOpen: true,
      mode: 'encrypt',
      title: '보안 링크 생성',
      description: '링크를 보호할 비밀번호를 설정해주세요.',
      submitLabel: '링크 생성 및 복사'
    });
  }, []);

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

      {/* 비밀번호 입력 모달 */}
      <PasswordModal
        isOpen={modalConfig.isOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title={modalConfig.title}
        description={modalConfig.description}
        submitLabel={modalConfig.submitLabel}
      />
    </div>
  );
}
