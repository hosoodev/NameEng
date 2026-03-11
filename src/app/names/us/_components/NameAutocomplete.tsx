'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getAutocompleteNames } from '../_actions';
import { Search, Loader2 } from 'lucide-react';

interface NameAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (name: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function NameAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "이름을 입력하세요...",
  className = "",
  disabled = false,
  autoFocus = false
}: NameAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 검색어 변경 시 자동완성 로직 (디바운싱 적용)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const cleanValue = value.trim().toLowerCase();
    if (cleanValue.length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const results = await getAutocompleteNames(cleanValue);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Autocomplete error:', error);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleSelect = (name: string) => {
    onChange(name.charAt(0).toUpperCase() + name.slice(1));
    setSuggestions([]);
    setShowDropdown(false);
    if (onSelect) onSelect(name);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim() && suggestions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100"
          spellCheck={false}
          autoComplete="off"
          disabled={disabled}
          autoFocus={autoFocus}
        />
        {loading && (
          <div className="absolute right-3">
            <Loader2 className="animate-spin text-blue-500" size={18} />
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
          <ul className="py-2">
            {suggestions.map((name, index) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => handleSelect(name)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-4 py-2.5 text-left capitalize font-medium flex items-center justify-between group transition-colors ${
                    index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{name}</span>
                  <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 font-bold uppercase tracking-wider">Select</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
