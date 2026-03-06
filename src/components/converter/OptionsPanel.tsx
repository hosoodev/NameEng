'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { RomanizationOptions } from '@/lib/romanization';
import SurnameStatistics from './SurnameStatistics';

interface OptionsPanelProps {
  options: RomanizationOptions;
  onChange: (options: Partial<RomanizationOptions>) => void;
  familyName: string;
  familyNameOptions: {
    hasCompoundOption: boolean;
    compoundFamily: string;
    singleFamily: string;
  };
  alternatives: string[];
  onCopyAlternative: (text: string) => void;
  onFamilyNameTypeChange: (type: 'compound' | 'single') => void;
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 text-[13px] sm:text-sm rounded-lg font-medium transition-all active:scale-95 whitespace-nowrap',
        active
          ? 'bg-white text-blue-600 shadow-sm font-semibold'
          : 'text-gray-500 hover:text-gray-700',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function OptionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600 font-medium flex-shrink-0">{label}</span>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function OptionsPanel({
  options,
  onChange,
  familyName,
  familyNameOptions,
  alternatives,
  onCopyAlternative,
  onFamilyNameTypeChange,
}: OptionsPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* 성씨 구분 - 복성인 경우만 표시 */}
      {familyNameOptions.hasCompoundOption && (
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            성씨 구분
          </p>
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            <SegmentButton
              active={options.familyNameType === 'compound'}
              onClick={() => onFamilyNameTypeChange('compound')}
            >
              복성 ({familyNameOptions.compoundFamily})
            </SegmentButton>
            <SegmentButton
              active={options.familyNameType === 'single'}
              onClick={() => onFamilyNameTypeChange('single')}
            >
              단성 ({familyNameOptions.singleFamily})
            </SegmentButton>
          </div>
        </div>
      )}

      {/* 성씨 표기 변형 (시각화) */}
      <div className="px-4 py-3 border-b border-gray-50">
        <SurnameStatistics
          familyName={familyName}
          selectedVariant={options.surnameVariant || ''}
          onSelect={(variant) => onChange({ surnameVariant: variant })}
        />
      </div>

      {/* 이름 순서 - 기본 옵션 (항상 노출) */}
      <div className="px-4 py-3 border-b border-gray-50">
        <OptionRow label="이름 순서">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5 min-w-[120px]">
            <SegmentButton
              active={options.order === 'family-given'}
              onClick={() => onChange({ order: 'family-given' })}
            >
              성&#x2011;이름
            </SegmentButton>
            <SegmentButton
              active={options.order === 'given-family'}
              onClick={() => onChange({ order: 'given-family' })}
            >
              이름&#x2011;성
            </SegmentButton>
          </div>
        </OptionRow>
      </div>

      {/* 상세 옵션 토글 (Progressive Disclosure) */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">상세 옵션 (대소문자, 하이픈)</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 상세 옵션 - 아코디언 */}
      {showAdvanced && (
        <div className="px-4 pb-3 border-t border-gray-50 pt-2">
          {/* 대소문자 */}
          <OptionRow label="대소문자">
            <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
              {(
                [
                  { val: 'capitalized', label: 'Aa' },
                  { val: 'lowercase', label: 'aa' },
                  { val: 'uppercase', label: 'AA' },
                ] as const
              ).map(({ val, label }) => (
                <SegmentButton
                  key={val}
                  active={options.caseStyle === val}
                  onClick={() => onChange({ caseStyle: val })}
                >
                  {label}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>

          {/* 하이픈 */}
          <OptionRow label="음절 구분 (하이픈)">
            <button
              onClick={() => onChange({ hyphen: !options.hyphen })}
              className={[
                'relative w-12 h-6 rounded-full transition-colors',
                options.hyphen ? 'bg-blue-500' : 'bg-gray-200',
              ].join(' ')}
              role="switch"
              aria-checked={options.hyphen}
            >
              <span
                className={[
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform',
                  options.hyphen ? 'translate-x-6' : 'translate-x-0.5',
                ].join(' ')}
              />
            </button>
          </OptionRow>

          {/* 대안 표기 */}
          {alternatives.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                다른 표기
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {alternatives.map((alt, index) => (
                  <button
                    key={index}
                    onClick={() => onCopyAlternative(alt)}
                    className="px-2 sm:px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 rounded-xl transition-colors font-medium truncate"
                    title="클릭하여 복사"
                  >
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
