'use client';

import { useRef, useEffect, useState } from 'react';
import { Clock, Trash2, X, ArrowRight } from 'lucide-react';

interface HistoryItem {
  name: string;
  result: string;
  timestamp: number;
}

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  onConvert: () => void;
  history: HistoryItem[];
  showHistory: boolean;
  onShowHistory: (show: boolean) => void;
  onSelectHistory: (name: string) => void;
  onRemoveHistory: (index: number) => void;
  onClearHistory: () => void;
}

export default function NameInput({
  value,
  onChange,
  onConvert,
  history,
  showHistory,
  onShowHistory,
  onSelectHistory,
  onRemoveHistory,
  onClearHistory,
}: NameInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClicked, setIsClicked] = useState(false);

  // 텍스트가 변경될 때 버튼 상태(애니메이션) 초기화
  useEffect(() => {
    setIsClicked(false);
  }, [value]);

  // 페이지 로드 시 자동 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsClicked(true);
      onConvert();
      onShowHistory(false);
    }
    if (e.key === 'Escape') {
      onShowHistory(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* 입력창 */}
      <div className="relative flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors shadow-sm overflow-hidden">
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          lang="ko"
          placeholder="한글 이름 입력 (예: 김민수)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => history.length > 0 && onShowHistory(true)}
          onBlur={() => setTimeout(() => onShowHistory(false), 200)}
          className="w-full px-4 py-4 text-lg font-medium bg-transparent outline-none border-none ring-0 rounded-none focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 appearance-none placeholder:text-gray-300 text-gray-900"
          style={{ outline: 'none', boxShadow: 'none' }}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {/* 변환 버튼 - 애니메이션 적용된 확장형 (항상 노출) */}
        <button
          onClick={() => {
            if (value.trim()) {
              setIsClicked(true);
              onConvert();
              onShowHistory(false);
            } else {
              inputRef.current?.focus();
            }
          }}
          className="mr-3 flex items-center justify-center h-10 rounded-xl transition-all duration-300 ease-out text-white flex-shrink-0 overflow-hidden shadow-sm bg-blue-500 hover:bg-blue-600 active:scale-95"
          style={{ width: isClicked && value.trim() ? '40px' : '108px' }}
          aria-label="변환하기"
        >
          <span
            className="text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxWidth: isClicked && value.trim() ? '0px' : '64px',
              opacity: isClicked && value.trim() ? 0 : 1,
              marginRight: isClicked && value.trim() ? '0px' : '4px',
            }}
          >
            변환하기
          </span>
          <ArrowRight size={18} strokeWidth={2.5} className="flex-shrink-0" />
        </button>
      </div>

      {/* 검색 히스토리 드롭다운 */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          {/* 히스토리 헤더 */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">최근 검색</span>
              <span className="text-xs text-gray-300 bg-gray-100 rounded-full px-1.5 py-0.5">
                {history.length}
              </span>
            </div>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
            >
              <Trash2 size={11} />
              전체삭제
            </button>
          </div>

          {/* 히스토리 목록 */}
          <ul>
            {history.slice(0, 6).map((item, index) => (
              <li
                key={`${item.name}-${item.timestamp}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                onMouseDown={() => onSelectHistory(item.name)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Clock size={13} className="text-gray-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{item.result}</span>
                  </div>
                </div>
                <button
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onRemoveHistory(index);
                  }}
                  className="ml-2 p-1 rounded-md hover:bg-gray-200 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                >
                  <X size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
