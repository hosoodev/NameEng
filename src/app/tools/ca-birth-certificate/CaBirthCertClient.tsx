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

const STORAGE_KEY = 'californiaBirthCertFinalV12';

export default function CaBirthCertClient() {
  const [data, setData] = useState<CertData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // 로드 로직 (URL -> LocalStorage -> Default)
  useEffect(() => {
    const loadData = () => {
      const params = new URLSearchParams(window.location.search);
      let initialData: CertData | null = null;

      // 1. URL 파라미터가 있으면 URL에서 로드
      if (Array.from(params.keys()).length > 0) {
        initialData = { ...defaultData };
        (Object.keys(defaultData) as (keyof CertData)[]).forEach(k => {
          if (params.has(k)) {
            initialData![k] = params.get(k) || '';
          }
        });
      }
      // 2. 없으면 로컬스토리지에서 로드
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
        // URL로 로드했더라도 즉시 스토리지에 동기화
        if (Array.from(params.keys()).length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
      }
      setIsLoaded(true);
    };

    loadData();
  }, []);

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

  // 전체 공유 링크 복사
  const handleShare = useCallback(() => {
    const params = new URLSearchParams();
    (Object.entries(data) as [keyof CertData, string][]).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Fallback 복사 로직 포함
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('링크가 복사되었습니다!');
      }).catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = shareUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        alert('링크가 복사되었습니다!');
      } catch (err) {
        console.error("링크 복사 실패", err);
      }
      document.body.removeChild(tempInput);
    }
  }, [data]);

  // 인쇄 실행
  const handlePrint = useCallback(() => {
    // 디버깅을 위한 출력 요소 로깅
    console.log("--- [인쇄 직전 노출 요소 분석] ---");
    const allElements = document.querySelectorAll('body > *:not(script):not(style)');
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) !== 0;
      if (isVisible) {
        console.log(`[노출] 태그: <${el.tagName.toLowerCase()}>, 클래스: "${el.className}", ID: "${el.id}"`);
      }
    });
    
    // 추가로 html 바로 아래에 붙은 광고 관련 요소들 체크
    const rootElements = document.querySelectorAll('html > ins, html > iframe');
    if (rootElements.length > 0) {
      console.log("[경고] <html> 직계 자식으로 광고 요소가 발견됨:");
      rootElements.forEach(el => console.log(`[발견] <${el.tagName.toLowerCase()}> 클래스: "${el.className}"`));
    }
    console.log("---------------------------------");
    
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
