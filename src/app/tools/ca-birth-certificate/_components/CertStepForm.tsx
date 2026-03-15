import React, { useState } from 'react';
import type { CertData } from '../CaBirthCertClient';
import { ChevronRight, ChevronLeft, Printer, Share2, Trash2 } from 'lucide-react';

interface CertStepFormProps {
  data: CertData;
  onChange: (key: keyof CertData, value: string) => void;
  onShare: () => void;
  onPrint: () => void;
  onClear: () => void;
}

const STEPS = [
  '상단 정보',
  '출생자',
  '출생장소',
  '부모 정보',
  '증명제공자/담당자',
  '번역인 정보'
];

import { CA_COUNTIES, countyTranslations } from '../_lib/countyData';

export default function CertStepForm({ data, onChange, onShare, onPrint, onClear }: CertStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  // 카운티 필터링을 위한 상태
  const [showCounties, setShowCounties] = useState<'top' | '5d' | null>(null);

  // 한글/영어 통합 검색 필터링
  const getFilteredCounties = (searchTerm: string) => {
    if (!searchTerm) return [];
    const lowSearch = searchTerm.toLowerCase();

    return CA_COUNTIES.filter(county => {
      const engName = county.toLowerCase();
      const korName = countyTranslations[engName] || '';
      return engName.includes(lowSearch) || korName.includes(searchTerm);
    });
  };

  // 사용자가 한글로 검색 중인지 확인
  const isSearchingInKorean = (searchTerm: string) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(searchTerm);
  };

  // 검색어 하이라이팅 헬퍼 함수
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    // 한글로 검색했을 때는 하이라이팅 생략 (영문 텍스트 기준이므로)
    if (isSearchingInKorean(query)) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase()
            ? <span key={i} className="text-blue-600 font-bold underline decoration-2 underline-offset-2">{part}</span>
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  const nextStep = () => setCurrentStep(p => Math.min(STEPS.length - 1, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));

  // 날짜/시간 포맷 통일 핸들러
  const handleDateInput = (key: keyof CertData, value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 8) v = v.substring(0, 8);
    if (v.length >= 5) v = v.substring(0, 2) + '/' + v.substring(2, 4) + '/' + v.substring(4, 8);
    else if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2, 4);
    onChange(key, v);
  };

  const handleTimeInput = (key: keyof CertData, value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 4) v = v.substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + ':' + v.substring(2, 4);
    onChange(key, v);
  };

  // 부모 정보 자동 완성 핸들러
  const fillParentInfo = (target: '12' | 't', parentType: 'Father' | 'Mother') => {
    // 부모 성함 생성 (성이름 붙여서 + 중간이름)
    const getCompactName = (first: string, middle: string, last: string) => {
      const mainName = (last + first).trim();
      return middle ? `${mainName} ${middle}` : mainName;
    };

    const fName = getCompactName(data['6a'], data['6b'], data['6c']);
    const mName = getCompactName(data['9a'], data['9b'], data['9c']);

    if (target === '12') {
      if (parentType === 'Father') {
        onChange('12a', fName);
        onChange('12b', '부');
      } else {
        onChange('12a', mName);
        onChange('12b', '모');
      }
    } else if (target === 't') {
      if (parentType === 'Father') {
        onChange('t-name', fName);
      } else {
        onChange('t-name', mName);
      }
    }
  };

  // 오늘 날짜 입력 핸들러
  const fillTodayDate = (key: keyof CertData) => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    onChange(key, `${mm}/${dd}/${yyyy}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">파일번호</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  value={data['file-no']}
                  onChange={e => onChange('file-no', e.target.value)}
                />
              </div>
              <div className="space-y-1 relative group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">중앙 카운티 명</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                    placeholder="예: 로스앤젤레스, Los Angeles"
                    value={data['top-county']}
                    onChange={e => {
                      onChange('top-county', e.target.value);
                    }}
                    onFocus={() => setShowCounties('top')}
                    onBlur={() => setTimeout(() => setShowCounties(null), 200)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  {showCounties === 'top' && getFilteredCounties(data['top-county']).length > 0 && (
                    <div className="absolute z-50 w-full top-full left-0 mt-1.5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl max-h-60 overflow-y-auto shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-1.5">
                        {getFilteredCounties(data['top-county']).map(c => (
                          <button
                            key={c}
                            className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 transition-all flex justify-between items-center group/item"
                            onClick={() => {
                              const valueToSet = isSearchingInKorean(data['top-county'])
                                ? (countyTranslations[c.toLowerCase()] || c)
                                : c;
                              onChange('top-county', valueToSet);
                              setShowCounties(null);
                            }}
                          >
                            <span className="font-medium text-gray-700 group-hover/item:text-blue-700">{highlightMatch(c, data['top-county'])}</span>
                            <span className="text-xs text-gray-400 group-hover/item:text-blue-400 transition-colors uppercase tracking-wider font-semibold">
                              {countyTranslations[c.toLowerCase()] || ''}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {showCounties === 'top' && data['top-county'] && getFilteredCounties(data['top-county']).length === 0 && (
                    <div className="absolute z-50 w-full top-full left-0 mt-1.5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-4 text-center text-xs text-gray-400 italic">일치하는 카운티가 없습니다.</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">지방등기소 증명번호</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  value={data['reg-no']}
                  onChange={e => onChange('reg-no', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">1A. 이름</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  value={data['1a']}
                  onChange={e => onChange('1a', e.target.value)}
                />
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">1B. 중간이름</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  value={data['1b']}
                  onChange={e => onChange('1b', e.target.value)}
                />
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">1C. 성</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  value={data['1c']}
                  onChange={e => onChange('1c', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 pt-4">
              <div className="lg:col-span-2 space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">2. 성별</label>
                <div className="flex gap-4 h-[42px] items-center">
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer group/radio">
                    <input type="radio" checked={data['2'] === '남'} onChange={() => onChange('2', '남')} className="w-4 h-4 text-blue-600 focus:ring-blue-500/20" />
                    <span className="text-gray-700 group-hover/radio:text-blue-600 transition-colors">남</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer group/radio">
                    <input type="radio" checked={data['2'] === '여'} onChange={() => onChange('2', '여')} className="w-4 h-4 text-blue-600 focus:ring-blue-500/20" />
                    <span className="text-gray-700 group-hover/radio:text-blue-600 transition-colors">여</span>
                  </label>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">3A. 단생아/쌍생아 등</label>
                <div className="flex gap-4 h-[42px] items-center">
                  {data['3a'] === '기타' ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        autoFocus
                        className="flex-1 h-[42px] px-3 py-2.5 border border-blue-500 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                        placeholder="기타 유형 직접 입력"
                        value={data['3a-text']}
                        onChange={e => onChange('3a-text', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          onChange('3a', '');
                          onChange('3a-text', '');
                        }}
                        className="px-3 h-[42px] text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors whitespace-nowrap border border-red-100"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-center">
                      <label className="flex items-center gap-1.5 text-sm cursor-pointer group/radio">
                        <input type="radio" checked={data['3a'] === '단생아'} onChange={() => onChange('3a', '단생아')} className="w-4 h-4 text-blue-600 focus:ring-blue-500/20" />
                        <span className="text-gray-700 group-hover/radio:text-blue-600 transition-colors">단생아</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-sm cursor-pointer group/radio">
                        <input type="radio" checked={data['3a'] === '쌍생아'} onChange={() => onChange('3a', '쌍생아')} className="w-4 h-4 text-blue-600 focus:ring-blue-500/20" />
                        <span className="text-gray-700 group-hover/radio:text-blue-600 transition-colors">쌍생아</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-sm cursor-pointer group/radio">
                        <input type="radio" checked={data['3a'] === '기타'} onChange={() => onChange('3a', '기타')} className="w-4 h-4 text-blue-600 focus:ring-blue-500/20" />
                        <span className="text-gray-700 group-hover/radio:text-blue-600 transition-colors">기타</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">3B. 쌍생아 순번</label>
                <input
                  type="text"
                  disabled={data['3a'] !== '쌍생아' && data['3a'] !== '기타'}
                  className="w-full h-[42px] px-3 py-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={data['3a'] === '단생아' || !data['3a'] ? '비활성' : '첫째, 둘째'}
                  value={data['3b']}
                  onChange={e => onChange('3b', e.target.value)}
                />
              </div>

              <div className="lg:col-span-4 space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">4A. 출생일자 / 4B. 시간</label>
                <div className="flex gap-2">
                  <input type="text" className="w-3/5 h-[42px] px-3 py-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['4a']} onChange={e => handleDateInput('4a', e.target.value)} />
                  <input type="text" className="w-2/5 h-[42px] px-3 py-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-300" placeholder="HH:MM" value={data['4b']} onChange={e => handleTimeInput('4b', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 group">
              <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">5A. 병원 또는 기관</label>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['5a']} onChange={e => onChange('5a', e.target.value)} />
            </div>
            <div className="space-y-1 group">
              <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">5B. 주소 (번지 또는 위치)</label>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['5b']} onChange={e => onChange('5b', e.target.value)} />
            </div>
            <div className="space-y-1 group">
              <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">5C. 도시</label>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['5c']} onChange={e => onChange('5c', e.target.value)} />
            </div>
            <div className="space-y-1 relative group">
              <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">5D. 카운티</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none "
                  placeholder="예: 로스앤젤레스, Los Angeles"
                  value={data['5d']}
                  onChange={e => onChange('5d', e.target.value)}
                  onFocus={() => setShowCounties('5d')}
                  onBlur={() => setTimeout(() => setShowCounties(null), 200)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                {showCounties === '5d' && getFilteredCounties(data['5d']).length > 0 && (
                  <div className="absolute z-50 w-full top-full left-0 mt-1.5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl max-h-60 overflow-y-auto shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-1.5">
                      {getFilteredCounties(data['5d']).map(c => (
                        <button
                          key={c}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 transition-all flex justify-between items-center group/item"
                          onClick={() => {
                            const valueToSet = isSearchingInKorean(data['5d'])
                              ? (countyTranslations[c.toLowerCase()] || c)
                              : c;
                            onChange('5d', valueToSet);
                            setShowCounties(null);
                          }}
                        >
                          <span className="font-medium text-gray-700 group-hover/item:text-blue-700">{highlightMatch(c, data['5d'])}</span>
                          <span className="text-xs text-gray-400 group-hover/item:text-blue-400 transition-colors uppercase tracking-wider font-semibold">
                            {countyTranslations[c.toLowerCase()] || ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {showCounties === '5d' && data['5d'] && getFilteredCounties(data['5d']).length === 0 && (
                  <div className="absolute z-50 w-full top-full left-0 mt-1.5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-4 text-center text-xs text-gray-400 italic">일치하는 카운티가 없습니다.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-blue-700 mb-3 flex items-center h-[21px] pb-1 border-b border-gray-100">아버지 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">6A. 아버지 이름</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['6a']} onChange={e => onChange('6a', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">6B. 중간이름</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['6b']} onChange={e => onChange('6b', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">6C. 성</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['6c']} onChange={e => onChange('6c', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">7. 출생지</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['7']} onChange={e => onChange('7', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">8. 생년월일</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['8']} onChange={e => handleDateInput('8', e.target.value)} /></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-pink-700 mb-3 flex items-center h-[21px] pb-1 border-b border-gray-100">어머니 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-pink-600 flex items-center h-[21px]">9A. 어머니 이름</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none " value={data['9a']} onChange={e => onChange('9a', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-pink-600 flex items-center h-[21px]">9B. 중간이름</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none " value={data['9b']} onChange={e => onChange('9b', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-pink-600 flex items-center h-[21px]">9C. 성</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none " value={data['9c']} onChange={e => onChange('9c', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-pink-600 flex items-center h-[21px]">10. 출생지</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none " value={data['10']} onChange={e => onChange('10', e.target.value)} /></div>
                <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-pink-600 flex items-center h-[21px]">11. 생년월일</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['11']} onChange={e => handleDateInput('11', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
              <div className="space-y-1 group">
                <div className="flex justify-between items-center h-[21px]">
                  <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">12A. 증명자 서명</label>
                  <div className="flex gap-1 mb-0.5">
                    <button type="button" onClick={() => fillParentInfo('12', 'Father')} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded hover:bg-blue-600 hover:text-white transition-all font-bold">부</button>
                    <button type="button" onClick={() => fillParentInfo('12', 'Mother')} className="text-[10px] px-1.5 py-0.5 bg-pink-50 text-pink-600 border border-pink-100 rounded hover:bg-pink-600 hover:text-white transition-all font-bold">모</button>
                  </div>
                </div>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['12a']} onChange={e => onChange('12a', e.target.value)} />
              </div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">12B. 출생자와 관계</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['12b']} onChange={e => onChange('12b', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">12C. 서명일</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['12c']} onChange={e => handleDateInput('12c', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">13A. 담당자 서명</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['13a']} onChange={e => onChange('13a', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">13B. 인가번호</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['13b']} onChange={e => onChange('13b', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">13C. 서명일</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['13c']} onChange={e => handleDateInput('13c', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">13D. 담당의사명</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['13d-name']} onChange={e => onChange('13d-name', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">13D. 담당의사 주소</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['13d-addr']} onChange={e => onChange('13d-addr', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">14. 기타 증명인 이름</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['14']} onChange={e => onChange('14', e.target.value)} /></div>
            </div>
            <hr className="border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">15A. 사망일시</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['15a']} onChange={e => handleDateInput('15a', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">15B. 주정부인가번호</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['15b']} onChange={e => onChange('15b', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">16. 지역담당자 서명</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['16']} onChange={e => onChange('16', e.target.value)} /></div>
              <div className="space-y-1 group"><label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">17. 등록 승인일</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['17']} onChange={e => handleDateInput('17', e.target.value)} /></div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 group">
                <div className="flex justify-between items-center h-[21px]">
                  <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">번역일</label>
                  <button type="button" onClick={() => fillTodayDate('t-date')} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded hover:bg-gray-800 hover:text-white transition-all font-bold mb-0.5">오늘날짜로</button>
                </div>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['t-date']} onChange={e => handleDateInput('t-date', e.target.value)} />
              </div>
              <div className="space-y-1 group">
                <div className="flex justify-between items-center h-[21px]">
                  <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">번역인 이름</label>
                  <div className="flex gap-1 mb-0.5">
                    <button type="button" onClick={() => fillParentInfo('t', 'Father')} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded hover:bg-blue-600 hover:text-white transition-all font-bold">부</button>
                    <button type="button" onClick={() => fillParentInfo('t', 'Mother')} className="text-[10px] px-1.5 py-0.5 bg-pink-50 text-pink-600 border border-pink-100 rounded hover:bg-pink-600 hover:text-white transition-all font-bold">모</button>
                  </div>
                </div>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['t-name']} onChange={e => onChange('t-name', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">주소</label>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['t-addr']} onChange={e => onChange('t-addr', e.target.value)} />
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">연락처</label>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none " value={data['t-contact']} onChange={e => onChange('t-contact', e.target.value)} />
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600 flex items-center h-[21px]">이메일 (선택)</label>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none  placeholder:text-gray-300" placeholder="example@email.com" value={data['t-email']} onChange={e => onChange('t-email', e.target.value)} />
              </div>
            </div>

          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl  border border-gray-200 mb-8">
      {/* Step Indicators */}
      <div className="flex flex-wrap overflow-x-auto border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
        {STEPS.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`flex-1 min-w-[100px] text-center py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${currentStep === idx
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-white/50'
              }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="p-5 sm:p-7 min-h-[440px] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {renderStepContent()}
      </div>

      {/* ActionBar: Notice, Paper Size, Share, Print */}
      <div className="border-y border-gray-100 bg-gray-50/80 backdrop-blur-sm">
        {/* Dynamic Notice Area */}
        <div className="px-5 sm:px-7 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 text-[11px] sm:text-xs leading-relaxed transition-all">
            <div className="mt-0.5 p-1 bg-blue-100 rounded-lg shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0114 0z" /></svg>
            </div>
            <div>
              <p className="text-blue-800 font-bold mb-0.5">인쇄 및 저장 가이드</p>
              <p className="text-gray-600">브라우저 인쇄 설정에서 <strong className="text-gray-900 underline decoration-gray-300 underline-offset-2">"배율: 100%, 여백: 없음"</strong> 설정을 확인해 주세요.</p>
            </div>
          </div>

          {currentStep === 5 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl animate-in fade-in slide-in-from-right-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700">모든 입력을 마쳤습니다. 미리보기를 확인하세요!</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="px-5 sm:px-7 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
            {/* Paper Size Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">용지 설정</span>
              <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button
                  type="button"
                  onClick={() => onChange('paper-size', 'letter')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${data['paper-size'] === 'letter'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  Letter
                </button>
                <button
                  type="button"
                  onClick={() => onChange('paper-size', 'A4')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${data['paper-size'] === 'A4'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  A4
                </button>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2 hidden lg:block"></div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={onShare}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 flex-1 sm:flex-auto whitespace-nowrap shadow-sm transition-all active:scale-95 group"
            >
              <Share2 size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" /> 링크 공유
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex-1 sm:flex-auto whitespace-nowrap shadow-md shadow-blue-500/10 transition-all active:scale-95 group"
            >
              <Printer size={16} className="animate-pulse" /> 인쇄 및 PDF 저장
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="px-5 sm:px-7 py-4 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4 rounded-b-2xl">
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${currentStep === 0
              ? 'text-gray-300 cursor-not-allowed bg-gray-50 border border-gray-100'
              : 'text-gray-600 hover:bg-gray-200 bg-gray-100 shadow-sm border border-gray-200'
              }`}
          >
            <ChevronLeft size={16} /> 이전
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
            title="모든 입력값을 초기화합니다"
          >
            <Trash2 size={16} /> <span className="hidden sm:inline">전체</span> 지우기
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="text-xs font-bold text-gray-400 mr-2 tabular-nums">
            {currentStep + 1} / {STEPS.length}
          </div>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-5 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95"
            >
              다음 <ChevronRight size={16} />
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
              완료
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
