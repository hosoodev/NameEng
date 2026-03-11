'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { checkNameRarity, IndexEntry } from '../_actions';
import { Search, Loader2, Calendar, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

const getRarityInfo = (lr: number) => {
  if (lr <= 10) return { label: 'TOP 10 (매우 흔함)', desc: '미국에서 가장 대중적이고 널리 쓰이는 이름입니다.', color: 'text-blue-600' };
  if (lr <= 50) return { label: 'TOP 50 (흔함)', desc: '대중적으로 인기 있는 보편적인 이름입니다.', color: 'text-blue-500' };
  if (lr <= 100) return { label: 'TOP 100 (다소 흔함)', desc: '자주 쓰이는 편에 속하는 익숙한 이름입니다.', color: 'text-emerald-500' };
  if (lr <= 500) return { label: 'TOP 500 (보통)', desc: '너무 흔하지도, 낯설지도 않은 적절한 인지도를 가진 이름입니다.', color: 'text-emerald-500' };
  if (lr <= 1000) return { label: 'TOP 1000 (약간 희귀)', desc: '개성을 보여줄 수 있으면서도 영어권에서 충분히 통용되는 이름입니다.', color: 'text-amber-500' };
  if (lr === 9999) return { label: '매우 희귀 (순위권 밖)', desc: '2024년 기준 TOP 1000 밖으로, 매우 유니크한 이름입니다.', color: 'text-purple-500' };
  return { label: '희귀함', desc: '자주 사용되지 않아 개성을 뽐낼 수 있는 유니크한 이름입니다.', color: 'text-purple-500' };
};

const getGeneration = (py: number) => {
  if (py <= 1939) return '1930년대 이전 (빈티지)';
  if (py <= 1959) return '1940~50년대 (베이비붐)';
  if (py <= 1979) return '1960~70년대 (X세대)';
  if (py <= 1999) return '1980~90년대 (밀레니얼)';
  if (py <= 2009) return '2000년대 (Z세대)';
  return '2010년대 이후 (알파세대)';
};

export default function RarityClient() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IndexEntry | null>(null);
  const [searchedName, setSearchedName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setLoading(true);
    setHasSearched(true);
    setSearchedName(cleanQuery);
    
    try {
      const data = await checkNameRarity(cleanQuery);
      setResult(data);
    } catch (error) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResult(null);
    setHasSearched(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 md:px-0">
      <form onSubmit={handleSearch} className="relative mt-8">
        <label className="block text-gray-700 font-bold mb-2">
          영어 이름 검색
        </label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-12 pr-28 py-4 bg-white border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
            placeholder="예: Olivia, James"
            spellCheck={false}
            autoComplete="off"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : '분석'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <Loader2 className="animate-spin text-blue-500 w-8 h-8 mb-4" />
          <p className="text-gray-500 font-medium">데이터 조회 중...</p>
        </div>
      )}

      {!loading && hasSearched && result && (() => {
        const rarityInfo = getRarityInfo(result.lr);
        return (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 md:p-10 space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 capitalize mb-4">
                  {result.n}
                </h2>
                <div className="flex justify-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                    {result.g === 'M' ? '남자 이름' : result.g === 'F' ? '여자 이름' : '남녀 공용'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium gap-1.5">
                    <Calendar size={14} /> {result.my}년 데이터 누적
                  </span>
                </div>
              </div>

              <div className="text-center py-6 border-y border-gray-100">
                <h3 className={`text-2xl font-black mb-2 ${rarityInfo.color}`}>
                  {rarityInfo.label}
                </h3>
                <p className="text-gray-600">
                  {rarityInfo.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-500 block mb-1">2024년 랭킹</span>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.lr === 9999 ? '순위 밖' : `${result.lr}위`}
                  </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-500 block mb-1">가장 인기있던 시기</span>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {result.py}년
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {getGeneration(result.py)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5 flex items-center justify-between border-t border-gray-200">
              <Link href={`/names/us/${result.n}`} className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1.5 transition-colors">
                <TrendingUp size={16} /> 상세 데이터 보기
              </Link>
              
              <button onClick={handleReset} className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1.5 transition-colors text-sm">
                <RefreshCw size={14} /> 다시 검색
              </button>
            </div>
          </div>
        );
      })()}

      {!loading && hasSearched && !result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">검색 내역이 없습니다.</h2>
          <p className="text-gray-500">
            <strong className="text-gray-700 capitalize">{searchedName}</strong> 이름은 1880년 이후의 미국 이름 데이터베이스에 존재하지 않습니다.<br/>스펠링이 올바른지 확인해 주세요.
          </p>
          <button onClick={handleReset} className="mt-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
            다시 시도하기
          </button>
        </div>
      )}
    </div>
  );
}
