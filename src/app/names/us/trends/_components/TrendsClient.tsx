'use client';

import React, { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadNameData, ByNameFile } from '../_actions';
import { Search, X, Loader2, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const CHART_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
];

type LoadedData = ByNameFile & { color: string };

export default function TrendsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [names, setNames] = useState<string[]>([]);
  const [dataMap, setDataMap] = useState<Record<string, LoadedData>>({});
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [filterGender, setFilterGender] = useState<'ALL' | 'M' | 'F'>('ALL');

  // Load from URL initially
  useEffect(() => {
    const initialNames = searchParams?.get('names')?.split(',').filter(Boolean) || [];
    if (initialNames.length > 0 && names.length === 0) {
      handleLoadNames(initialNames);
    }
  }, [searchParams]);

  // Sync state to URL
  useEffect(() => {
    if (names.length > 0) {
      router.replace(`?names=${names.join(',')}`, { scroll: false });
    } else {
      router.replace(`?`, { scroll: false });
    }
  }, [names]);

  const handleLoadNames = async (newNames: string[]) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const addedData = { ...dataMap };
      let updatedNames = [...names];
      let hasError = false;

      for (const n of newNames) {
        const cleanName = n.trim().toLowerCase();
        if (!cleanName || addedData[cleanName] || updatedNames.includes(cleanName)) continue;
        
        if (updatedNames.length >= 5) {
          setErrorMsg('최대 5개의 이름까지만 비교할 수 있습니다.');
          break;
        }

        const data = await loadNameData(cleanName);
        if (data) {
          updatedNames.push(cleanName);
          addedData[cleanName] = {
            ...data,
            color: CHART_COLORS[updatedNames.length - 1]
          };
        } else {
          setErrorMsg(`'${n}' 이름을 찾을 수 없습니다.`);
          hasError = true;
          setTimeout(() => setErrorMsg(''), 3000);
        }
      }
      
      setNames(updatedNames);
      setDataMap(addedData);
    } catch (err) {
      setErrorMsg('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const addName = () => {
    if (inputValue) {
      handleLoadNames([inputValue]);
      setInputValue('');
    }
  };

  const removeName = (nameToRemove: string) => {
    const nextNames = names.filter(n => n !== nameToRemove);
    setNames(nextNames);
    
    // Reassign colors based on new order
    const nextDataMap = { ...dataMap };
    nextNames.forEach((n, idx) => {
      if (nextDataMap[n]) {
        nextDataMap[n].color = CHART_COLORS[idx];
      }
    });
    delete nextDataMap[nameToRemove];
    setDataMap(nextDataMap);
  };

  const clearAll = () => {
    setNames([]);
    setDataMap({});
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addName();
    }
  };

  // Build Unified Chart Data
  const chartData = useMemo(() => {
    if (names.length === 0) return [];
    
    const yearSet = new Set<number>();
    names.forEach(n => {
      const d = dataMap[n];
      if (!d) return;
      if (filterGender === 'ALL' || filterGender === 'M') d.male.forEach(x => yearSet.add(x.y));
      if (filterGender === 'ALL' || filterGender === 'F') d.female.forEach(x => yearSet.add(x.y));
    });
    
    const years = Array.from(yearSet).sort((a, b) => a - b);
    
    // For each year, what is the best rank combined?
    return years.map(year => {
      const row: any = { year };
      names.forEach(n => {
        const d = dataMap[n];
        if (!d) return;
        
        let bestRank = Infinity;
        
        if (filterGender === 'ALL' || filterGender === 'M') {
          const m = d.male.find(x => x.y === year);
          if (m && m.r < bestRank) bestRank = m.r;
        }
        if (filterGender === 'ALL' || filterGender === 'F') {
          const f = d.female.find(x => x.y === year);
          if (f && f.r < bestRank) bestRank = f.r;
        }

        row[n] = bestRank === Infinity ? null : bestRank;
      });
      return row;
    });
  }, [names, dataMap, filterGender]);

  let maxRank = 1000;
  chartData.forEach(row => {
    names.forEach(n => {
      if (row[n] !== null && row[n] > maxRank) maxRank = row[n];
    });
  });
  maxRank = Math.ceil(maxRank / 100) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl">
          <p className="font-bold text-gray-900 mb-2">{label}년</p>
          {payload.map((entry: any, index: number) => {
            if (entry.value === null) return null;
            return (
              <div key={index} className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-gray-700 font-medium capitalize">
                  {entry.dataKey}: <span className="font-bold text-gray-900">{entry.value}위</span>
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Controls Section */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              이름 추가 (최대 5개)
            </label>
            <div className="relative flex items-center">
              <NameAutocomplete 
                value={inputValue}
                onChange={setInputValue}
                onSelect={(name) => {
                  handleLoadNames([name]);
                  setInputValue('');
                }}
                placeholder="예: James, Michael, Liam..."
                disabled={names.length >= 5 || loading}
              />
            </div>
            {errorMsg && (
              <p className="absolute -bottom-6 left-1 text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={14} /> {errorMsg}
              </p>
            )}
          </div>
          
          <button 
            onClick={addName}
            disabled={!inputValue || names.length >= 5 || loading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl transition-colors"
          >
            비교 목록에 추가
          </button>
        </div>

        {/* Selected Tags */}
        <div className="min-h-[48px] pt-4">
          <div className="flex flex-wrap gap-2">
            {names.map((n) => (
              <div 
                key={n} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium capitalize shadow-sm border"
                style={{ backgroundColor: `${dataMap[n]?.color}15`, borderColor: `${dataMap[n]?.color}30`, color: dataMap[n]?.color }}
              >
                {n}
                <button 
                  onClick={() => removeName(n)}
                  className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {names.length > 0 && (
              <button 
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 underline px-2 py-2"
              >
                전체 삭제
              </button>
            )}
            
            {names.length === 0 && !loading && (
              <span className="text-gray-400 text-sm py-2">아직 추가된 이름이 없습니다. 차트를 생성하려면 검색창에 이름을 입력하세요.</span>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1 flex items-center gap-2">
          <Sparkles size={16} className="text-amber-500" /> 추천 비교 조합
        </h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => { clearAll(); setTimeout(() => handleLoadNames(['liam', 'noah', 'olivia', 'emma']), 100); }}
            className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-sm text-sm transition-all"
          >
            🔥 Z세대/α세대 인기 (Liam & Noah)
          </button>
          <button 
            onClick={() => { clearAll(); setTimeout(() => handleLoadNames(['james', 'william', 'robert', 'john', 'michael']), 100); }}
            className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-sm text-sm transition-all"
          >
            🕰️ 미국의 영원한 클래식 TOP 5
          </button>
          <button 
            onClick={() => { clearAll(); setTimeout(() => handleLoadNames(['michael', 'jason', 'christopher', 'linda', 'amanda']), 100); }}
            className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-sm text-sm transition-all"
          >
            📻 X세대의 대표적인 이름들
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      {names.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={24} /> 
              트렌드 비교 차트
            </h2>
            
            {/* Gender Filters */}
            <div className="flex bg-gray-100 p-1 rounded-lg self-start">
              <button 
                onClick={() => setFilterGender('ALL')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${filterGender === 'ALL' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                통합
              </button>
              <button 
                onClick={() => setFilterGender('M')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${filterGender === 'M' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                남자
              </button>
              <button 
                onClick={() => setFilterGender('F')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${filterGender === 'F' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'}`}
              >
                여자
              </button>
            </div>
          </div>
          
          <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  tickMargin={12}
                  minTickGap={30}
                />
                <YAxis 
                  reversed 
                  domain={[1, maxRank]}
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickMargin={12}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
                {names.map((n) => (
                  <Line
                    key={n}
                    type="monotone"
                    dataKey={n}
                    name={n.charAt(0).toUpperCase() + n.slice(1)}
                    stroke={dataMap[n]?.color}
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0, fill: dataMap[n]?.color }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
