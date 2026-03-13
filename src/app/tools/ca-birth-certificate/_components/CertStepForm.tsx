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

const COUNTIES = ["Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", "Tuolumne", "Ventura", "Yolo", "Yuba"];

export default function CertStepForm({ data, onChange, onShare, onPrint, onClear }: CertStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  // 카운티 필터링을 위한 상태
  const [countySearch, setCountySearch] = useState('');
  const [showCounties, setShowCounties] = useState<'top' | '5d' | null>(null);

  // 검색어 하이라이팅 헬퍼 함수
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="text-blue-600 font-bold">{part}</span> 
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm gap-4">
              <span className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-blue-700">※ 인쇄 안내:</span> 브라우저 인쇄 시 <strong>"배율: 100%, 여백: 없음"</strong>을 설정해주세요.
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <label className="font-semibold text-gray-700">인쇄 용지:</label>
                <select
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
                  value={data['paper-size']}
                  onChange={e => onChange('paper-size', e.target.value)}
                >
                  <option value="letter">Letter (미국 표준)</option>
                  <option value="A4">A4 (한국 표준)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">파일번호</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['file-no']} onChange={e => onChange('file-no', e.target.value)} />
              </div>
              <div className="space-y-1 relative group">
                <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600">중앙 카운티 명</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm" 
                    placeholder="영문 검색 (예: Los Angeles)" 
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
                </div>
                {showCounties === 'top' && data['top-county'] && (
                  <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-1.5">
                      {COUNTIES.filter(c => c.toLowerCase().includes(data['top-county'].toLowerCase())).length > 0 ? (
                        COUNTIES.filter(c => c.toLowerCase().includes(data['top-county'].toLowerCase())).map(c => (
                          <button
                            key={c}
                            className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 transition-all flex justify-between items-center group/item"
                            onClick={() => {
                              onChange('top-county', c);
                              setShowCounties(null);
                            }}
                          >
                            <span>{highlightMatch(c, data['top-county'])}</span>
                            <span className="opacity-0 group-hover/item:opacity-100 text-blue-400 transition-opacity">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-4 text-center text-xs text-gray-400 italic">일치하는 카운티가 없습니다.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">지방등기소 증명번호</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['reg-no']} onChange={e => onChange('reg-no', e.target.value)} />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">1A. 이름</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['1a']} onChange={e => onChange('1a', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">1B. 중간이름</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['1b']} onChange={e => onChange('1b', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">1C. 성</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['1c']} onChange={e => onChange('1c', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">2. 성별</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer"><input type="radio" checked={data['2'] === '남'} onChange={() => onChange('2', '남')} className="w-4 h-4 text-blue-600" /> 남</label>
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer"><input type="radio" checked={data['2'] === '여'} onChange={() => onChange('2', '여')} className="w-4 h-4 text-blue-600" /> 여</label>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-600 block">3A. 단생아/쌍생아 등</label>
                <div className="flex gap-3 pt-2 flex-wrap items-center">
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" checked={data['3a'] === '단생아'} onChange={() => onChange('3a', '단생아')} className="w-4 h-4" /> 단생아</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" checked={data['3a'] === '쌍생아'} onChange={() => onChange('3a', '쌍생아')} className="w-4 h-4" /> 쌍생아</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" checked={data['3a'] === '기타'} onChange={() => onChange('3a', '기타')} className="w-4 h-4" /> 기타</label>
                  {data['3a'] === '기타' && (
                    <input type="text" className="w-16 p-1 border border-gray-300 rounded text-xs ml-1" placeholder="직접입력" value={data['3a-text']} onChange={e => onChange('3a-text', e.target.value)} />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">3B. 쌍생아 순번</label>
                <input type="text" disabled={data['3a'] !== '쌍생아' && data['3a'] !== '기타'} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" placeholder={data['3a'] === '단생아' || !data['3a'] ? '비활성' : '첫째, 둘째'} value={data['3b']} onChange={e => onChange('3b', e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">4A. 출생일자 / 4B. 시간</label>
                <div className="flex gap-2">
                  <input type="text" className="w-3/5 p-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['4a']} onChange={e => handleDateInput('4a', e.target.value)} />
                  <input type="text" className="w-2/5 p-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-300" placeholder="HH:MM" value={data['4b']} onChange={e => handleTimeInput('4b', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">5A. 병원 또는 기관</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['5a']} onChange={e => onChange('5a', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">5B. 주소 (번지 또는 위치)</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['5b']} onChange={e => onChange('5b', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">5C. 도시</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['5c']} onChange={e => onChange('5c', e.target.value)} />
            </div>
            <div className="space-y-1 relative group">
              <label className="text-xs font-bold text-gray-600 transition-colors group-focus-within:text-blue-600">5D. 카운티</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm" 
                  placeholder="영문 카운티" 
                  value={data['5d']} 
                  onChange={e => onChange('5d', e.target.value)} 
                  onFocus={() => setShowCounties('5d')}
                  onBlur={() => setTimeout(() => setShowCounties(null), 200)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              {showCounties === '5d' && data['5d'] && (
                <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-1.5">
                    {COUNTIES.filter(c => c.toLowerCase().includes(data['5d'].toLowerCase())).length > 0 ? (
                      COUNTIES.filter(c => c.toLowerCase().includes(data['5d'].toLowerCase())).map(c => (
                        <button
                          key={c}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 transition-all flex justify-between items-center group/item"
                          onClick={() => {
                            onChange('5d', c);
                            setShowCounties(null);
                          }}
                        >
                          <span>{highlightMatch(c, data['5d'])}</span>
                          <span className="opacity-0 group-hover/item:opacity-100 text-blue-400 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-xs text-gray-400 italic">일치하는 카운티가 없습니다.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-blue-700 mb-3 block pb-1 border-b border-gray-100">아버지 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">6A. 아버지 이름</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['6a']} onChange={e => onChange('6a', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">6B. 중간이름</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['6b']} onChange={e => onChange('6b', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">6C. 성</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['6c']} onChange={e => onChange('6c', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">7. 출생지</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['7']} onChange={e => onChange('7', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">8. 출생일자</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['8']} onChange={e => handleDateInput('8', e.target.value)} /></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-pink-700 mb-3 block pb-1 border-b border-gray-100">어머니 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">9A. 어머니 이름</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['9a']} onChange={e => onChange('9a', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">9B. 중간이름</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['9b']} onChange={e => onChange('9b', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">9C. 성</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['9c']} onChange={e => onChange('9c', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">10. 출생지</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['10']} onChange={e => onChange('10', e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">11. 출생일자</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['11']} onChange={e => handleDateInput('11', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">12A. 증명자 서명</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['12a']} onChange={e => onChange('12a', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">12B. 출생자와 관계</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['12b']} onChange={e => onChange('12b', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">12C. 서명일</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['12c']} onChange={e => handleDateInput('12c', e.target.value)} /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">13A. 담당자 서명</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['13a']} onChange={e => onChange('13a', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">13B. 인가번호</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['13b']} onChange={e => onChange('13b', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">13C. 서명일</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['13c']} onChange={e => handleDateInput('13c', e.target.value)} /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">13D. 담당의사명</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['13d-name']} onChange={e => onChange('13d-name', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">13D. 담당의사 주소</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['13d-addr']} onChange={e => onChange('13d-addr', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">14. 기타 증명인 이름</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['14']} onChange={e => onChange('14', e.target.value)} /></div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">15A. 사망일시</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['15a']} onChange={e => handleDateInput('15a', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">15B. 주정부인가번호</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['15b']} onChange={e => onChange('15b', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">16. 지역담당자 서명</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm" value={data['16']} onChange={e => onChange('16', e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold text-gray-500">17. 등록 승인일</label><input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['17']} onChange={e => handleDateInput('17', e.target.value)} /></div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">번역일</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-300" placeholder="MM/DD/YYYY" value={data['t-date']} onChange={e => handleDateInput('t-date', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">번역인 이름</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['t-name']} onChange={e => onChange('t-name', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">주소</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['t-addr']} onChange={e => onChange('t-addr', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">연락처</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={data['t-contact']} onChange={e => onChange('t-contact', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">이메일 (선택)</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-300" placeholder="example@email.com" value={data['t-email']} onChange={e => onChange('t-email', e.target.value)} />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 mt-6 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                모든 입력을 마쳤습니다.<br />
                하단의 <strong>미리보기</strong>를 확인하고 결과를 공유하거나 인쇄하세요!
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onShare}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 flex-1 sm:flex-auto whitespace-nowrap"
                >
                  <Share2 size={16} /> 링크 공유
                </button>
                <button
                  type="button"
                  onClick={onPrint}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm flex-1 sm:flex-auto whitespace-nowrap"
                >
                  <Printer size={16} /> 인쇄 및 PDF 저장
                </button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      {/* Step Indicators */}
      <div className="flex flex-wrap overflow-x-auto border-b border-gray-100 bg-gray-50/50">
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
      <div className="p-5 sm:p-7">
        {renderStepContent()}
      </div>

      {/* Navigation Footer */}
      <div className="px-5 sm:px-7 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center overflow-x-auto gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200 bg-gray-100'
              }`}
          >
            <ChevronLeft size={16} /> 이전
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="모든 입력값을 초기화합니다"
          >
            <Trash2 size={16} /> <span className="hidden sm:inline">전체</span> 지우기
          </button>
        </div>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all active:scale-95"
          >
            다음 <ChevronRight size={16} />
          </button>
        ) : (
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full">
            완료
          </span>
        )}
      </div>

    </div>
  );
}
