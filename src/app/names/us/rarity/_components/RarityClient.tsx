'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { checkNameRarity, IndexEntry } from '../_actions';
import { Search, Loader2, Calendar, TrendingUp, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

const getRarityInfo = (lr: number) => {
  if (lr <= 10) return { label: 'TOP 10 (매우 흔함)', desc: '미국에서 가장 대중적이고 널리 쓰이는 이름입니다.', color: 'text-blue-600', bgColor: 'bg-blue-50' };
  if (lr <= 50) return { label: 'TOP 50 (흔함)', desc: '대중적으로 인기 있는 보편적인 이름입니다.', color: 'text-blue-500', bgColor: 'bg-blue-50' };
  if (lr <= 100) return { label: 'TOP 100 (다소 흔함)', desc: '자주 쓰이는 편에 속하는 익숙한 이름입니다.', color: 'text-emerald-500', bgColor: 'bg-emerald-50' };
  if (lr <= 500) return { label: 'TOP 500 (보통)', desc: '너무 흔하지도, 낯설지도 않은 적절한 인지도를 가진 이름입니다.', color: 'text-emerald-500', bgColor: 'bg-emerald-50' };
  if (lr <= 1000) return { label: 'TOP 1000 (약간 희귀)', desc: '개성을 보여줄 수 있으면서도 영어권에서 충분히 통용되는 이름입니다.', color: 'text-amber-500', bgColor: 'bg-amber-50' };
  if (lr === 9999) return { label: '매우 희귀 (순위권 밖)', desc: '2024년 기준 TOP 1000 밖으로, 매우 유니크한 이름입니다.', color: 'text-purple-500', bgColor: 'bg-purple-50' };
  return { label: '희귀함', desc: '자주 사용되지 않아 개성을 뽐낼 수 있는 유니크한 이름입니다.', color: 'text-purple-500', bgColor: 'bg-purple-50' };
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
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                분석할 영어 이름
              </label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="예: Olivia, James, Liam..."
                  spellCheck={false}
                  autoComplete="off"
                  disabled={loading}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : '분석하기'}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10 mb-4" />
          <p className="text-gray-500 font-bold">미국 사회보장국 데이터 분석 중...</p>
        </div>
      )}

      {!loading && hasSearched && result && (() => {
        const rarityInfo = getRarityInfo(result.lr);
        return (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 md:p-12 space-y-10">
              <div className="text-center space-y-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-widest">
                  {result.g === 'M' ? 'Male Name' : result.g === 'F' ? 'Female Name' : 'Unisex Name'}
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 capitalize tracking-tight">
                  {result.n}
                </h2>
                <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
                  <Calendar size={16} className="text-blue-500" /> {result.my}년간의 통계 데이터 보유
                </p>
              </div>

              <div className={`text-center py-10 px-6 rounded-2xl ${rarityInfo.bgColor} border border-transparent transition-colors`}>
                <h3 className={`text-3xl font-black mb-3 ${rarityInfo.color}`}>
                  {rarityInfo.label}
                </h3>
                <p className="text-gray-700 text-lg font-medium leading-relaxed max-w-lg mx-auto">
                  {rarityInfo.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-sm transition-all">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">2024년 순위</span>
                  <div className="text-4xl font-black text-gray-900">
                    {result.lr === 9999 ? '순위 밖' : `${result.lr}위`}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-medium">최신 트렌드 기준</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-sm transition-all">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">최고 전성기</span>
                  <div className="text-4xl font-black text-gray-900">
                    {result.py}년
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {getGeneration(result.py).split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <Link href={`/names/us/${result.n}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                <TrendingUp size={18} /> 상세 통계 레포트 보기 <ArrowRight size={18} />
              </Link>
              
              <button onClick={handleReset} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-900 font-bold transition-colors">
                <RefreshCw size={18} /> 다시 분석하기
              </button>
            </div>
          </div>
        );
      })()}

      {!loading && hasSearched && !result && (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-6 shadow-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-gray-300" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">데이터가 존재하지 않습니다</h2>
            <p className="text-gray-500 leading-relaxed">
              죄송합니다. <strong className="text-blue-600 capitalize">{searchedName}</strong>라는 이름은<br className="hidden sm:inline"/> 1880년 이후의 미국 이름 공식 데이터베이스에서 찾을 수 없습니다.
            </p>
          </div>
          <button 
            onClick={handleReset} 
            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
          >
            다른 이름 검색하기
          </button>
        </div>
      )}
    </div>
  );
}
