'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  romanizeKoreanName,
  getSurnameVariants,
  getFamilyNameOptions,
  type RomanizationOptions,
  type Warning,
} from '@/lib/romanization';
import { loadHistory, saveHistory, type HistoryItem, HISTORY_KEY } from '@/lib/converter/history';
import { encodeOptions, decodeOptions } from '@/lib/converter/urlOptions';
import { getContextualLinks } from '@/lib/converter/contextualLinks';
import { DEFAULT_OPTIONS } from '@/lib/converter/constants';

export function useNameConverter() {
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [inputName, setInputName] = useState('');
  const [options, setOptions] = useState<RomanizationOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<{
    romanized: string;
    warnings: Warning[];
    alternatives: string[];
  } | null>(null);
  const [surnameVariants, setSurnameVariants] = useState<string[]>([]);
  const [familyNameOptions, setFamilyNameOptions] = useState({
    hasCompoundOption: false,
    compoundFamily: '',
    singleFamily: '',
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  /* 히스토리 로드 */
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  /* URL 파라미터 처리 */
  useEffect(() => {
    const name = searchParams.get('n');
    const optionsParam = searchParams.get('o');
    const surnameParam = searchParams.get('s');

    // Legacy support
    const orderParam = searchParams.get('order');
    const hyphenParam = searchParams.get('h');
    const caseParam = searchParams.get('c');
    const familyNameTypeParam = searchParams.get('f');

    if (!name) return;

    setInputName(name);
    const nameOpts = getFamilyNameOptions(name);
    setFamilyNameOptions(nameOpts);

    let decoded: Partial<RomanizationOptions> = {};
    if (optionsParam && optionsParam.length === 4) {
      decoded = decodeOptions(optionsParam);
    } else {
      if (orderParam !== null) decoded.order = orderParam === '1' ? 'given-family' : 'family-given';
      if (hyphenParam !== null) decoded.hyphen = hyphenParam === '1';
      if (caseParam) {
        const caseMap = { 'c': 'capitalized', 'l': 'lowercase', 'u': 'uppercase' } as const;
        decoded.caseStyle = caseMap[caseParam as keyof typeof caseMap] || 'capitalized';
      }
      if (familyNameTypeParam) {
        decoded.familyNameType = familyNameTypeParam === 'c' ? 'compound' : 'single';
      }
    }

    const familyNameType: 'compound' | 'single' =
      (decoded.familyNameType as 'compound' | 'single') ??
      (nameOpts.hasCompoundOption ? 'compound' : 'single');

    const familyName =
      familyNameType === 'compound' && nameOpts.hasCompoundOption
        ? nameOpts.compoundFamily
        : nameOpts.singleFamily;

    const variants = getSurnameVariants(familyName);
    setSurnameVariants(variants);

    const newOptions: RomanizationOptions = {
      order: decoded.order ?? 'family-given',
      hyphen: decoded.hyphen ?? false,
      caseStyle: decoded.caseStyle ?? 'capitalized',
      familyNameType,
      surnameVariant: surnameParam ?? (variants[0] ?? undefined),
    };
    setOptions(newOptions);
    setResult(romanizeKoreanName(name.trim(), newOptions));
  }, [searchParams]);

  /* 언마운트 정리 */
  useEffect(() => () => { debounceRef.current && clearTimeout(debounceRef.current); }, []);

  /* 히스토리 저장 */
  const pushHistory = useCallback((name: string, romanized: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) => !(h.name === name && h.result === romanized)
      );
      const next = [{ name, result: romanized, timestamp: Date.now() }, ...filtered].slice(0, 10);
      saveHistory(next);
      return next;
    });
  }, []);

  /* 이름 입력 핸들러 */
  const handleNameChange = useCallback(
    (value: string) => {
      setInputName(value);
      debounceRef.current && clearTimeout(debounceRef.current);

      if (!value.trim()) {
        setResult(null);
        setSurnameVariants([]);
        setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
        setOptions((prev) => ({ ...prev, surnameVariant: undefined, familyNameType: undefined }));
        return;
      }

      const nameOpts = getFamilyNameOptions(value.trim());
      setFamilyNameOptions(nameOpts);

      const familyNameType: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
      const familyName =
        familyNameType === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);

      const newOptions: RomanizationOptions = {
        ...options,
        familyNameType,
        surnameVariant: variants[0] ?? undefined,
      };
      setOptions(newOptions);
    },
    [options]
  );

  /* 변환 실행 */
  const handleConvert = useCallback(() => {
    if (!inputName.trim()) return;
    const res = romanizeKoreanName(inputName.trim(), options);
    setResult(res);
    pushHistory(inputName.trim(), res.romanized);
  }, [inputName, options, pushHistory]);

  /* 옵션 변경 */
  const handleOptionChange = useCallback(
    (newOpts: Partial<RomanizationOptions>) => {
      debounceRef.current && clearTimeout(debounceRef.current);
      const updated = { ...options, ...newOpts };
      setOptions(updated);
      if (inputName.trim()) {
        const res = romanizeKoreanName(inputName.trim(), updated);
        setResult(res);
      }
    },
    [options, inputName]
  );

  /* 복성/단성 변경 */
  const handleFamilyNameTypeChange = useCallback(
    (type: 'compound' | 'single') => {
      const familyName =
        type === 'compound' ? familyNameOptions.compoundFamily : familyNameOptions.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      handleOptionChange({
        familyNameType: type,
        surnameVariant: variants[0] ?? undefined,
      });
    },
    [familyNameOptions, handleOptionChange]
  );

  /* 복사 */
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  /* 공유 */
  const handleShare = useCallback(() => {
    if (!result) return;
    const params = new URLSearchParams({ n: inputName, o: encodeOptions(options) });
    if (options.surnameVariant) params.set('s', options.surnameVariant);
    const url = `${window.location.origin}/result?${params}`;
    if (navigator.share) {
      navigator.share({ title: 'NameEng', text: `${inputName} → ${result.romanized}`, url });
    } else {
      navigator.clipboard.writeText(`${inputName} → ${result.romanized}\n\n${url}`);
    }
  }, [result, inputName, options]);

  /* 히스토리 선택 */
  const handleSelectHistory = useCallback(
    (name: string) => {
      setInputName(name);
      setShowHistory(false);
      const nameOpts = getFamilyNameOptions(name.trim());
      setFamilyNameOptions(nameOpts);
      const familyNameType: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
      const familyName = familyNameType === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      const newOptions: RomanizationOptions = {
        ...DEFAULT_OPTIONS,
        familyNameType,
        surnameVariant: variants[0] ?? undefined,
      };
      setOptions(newOptions);
      const res = romanizeKoreanName(name.trim(), newOptions);
      setResult(res);
      pushHistory(name.trim(), res.romanized);
    },
    [pushHistory]
  );

  const handleExampleSelect = useCallback(
    (name: string) => {
      setInputName(name);
      const nameOpts = getFamilyNameOptions(name);
      setFamilyNameOptions(nameOpts);
      const type: 'compound' | 'single' = nameOpts.hasCompoundOption ? 'compound' : 'single';
      const familyName = type === 'compound' ? nameOpts.compoundFamily : nameOpts.singleFamily;
      const variants = getSurnameVariants(familyName);
      setSurnameVariants(variants);
      const opts: RomanizationOptions = {
        ...DEFAULT_OPTIONS,
        familyNameType: type,
        surnameVariant: variants[0] ?? undefined,
      };
      setOptions(opts);
      const res = romanizeKoreanName(name, opts);
      setResult(res);
    },
    []
  );

  const handleRemoveHistory = useCallback((index: number) => {
    setHistory((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveHistory(next);
      return next;
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const handleLogoClick = useCallback(() => {
    setInputName('');
    setResult(null);
    setSurnameVariants([]);
    setFamilyNameOptions({ hasCompoundOption: false, compoundFamily: '', singleFamily: '' });
    setOptions(DEFAULT_OPTIONS);
    debounceRef.current && clearTimeout(debounceRef.current);
  }, []);

  const contextualLinks =
    result ? getContextualLinks(inputName, result.warnings, familyNameOptions) : [];

  return {
    // state
    inputName,
    options,
    result,
    surnameVariants,
    familyNameOptions,
    history,
    showHistory,
    contextualLinks,
    // handlers
    handleNameChange,
    handleConvert,
    handleOptionChange,
    handleFamilyNameTypeChange,
    copyToClipboard,
    handleShare,
    handleSelectHistory,
    handleExampleSelect,
    handleRemoveHistory,
    handleClearHistory,
    handleLogoClick,
    setShowHistory,
  };
}
