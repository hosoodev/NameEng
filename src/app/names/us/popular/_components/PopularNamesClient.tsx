'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ByYearEntry = {
  rank: number;
  m: string;
  mc: number;
  f: string;
  fc: number;
};

interface PopularNamesClientProps {
  initialYear: number;
  data: ByYearEntry[];
}

export default function PopularNamesClient({ initialYear, data }: PopularNamesClientProps) {
  const router = useRouter();
  const [localYear, setLocalYear] = useState(initialYear);
  const [activeTab, setActiveTab] = useState<'M' | 'F'>('F'); // Default to Female

  // Sync state if URL changes externally
  useEffect(() => {
    setLocalYear(initialYear);
  }, [initialYear]);

  const handleYearCommit = (yearValue: number) => {
    // Only navigate if it actually changed
    if (yearValue !== initialYear) {
      router.push(`/names/us/popular?year=${yearValue}`, { scroll: false });
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalYear(Number(e.target.value));
  };

  const jumpToDecade = (year: number) => {
    setLocalYear(year);
    handleYearCommit(year);
  };

  // Generate decade buttons
  const decades = [];
  for (let y = 1880; y <= 2020; y += 20) {
    decades.push(y);
  }
  decades.push(2024);

  return (
    <div className="space-y-10">
      {/* Year Selector Control */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
          {localYear}년
        </h2>
        <p className="text-gray-500 mb-8 font-medium">슬라이더를 움직여 연도를 선택해 보세요.</p>
        
        <div className="max-w-xl mx-auto space-y-8">
          <input
            type="range"
            min={1880}
            max={2024}
            value={localYear}
            onChange={handleYearChange}
            onMouseUp={() => handleYearCommit(localYear)}
            onTouchEnd={() => handleYearCommit(localYear)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {decades.map((dec) => (
              <button
                key={dec}
                onClick={() => jumpToDecade(dec)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  localYear === dec
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Gender Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === 'F' ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100/50'
            }`}
            onClick={() => setActiveTab('F')}
          >
            여자 이름 TOP 50
          </button>
          <button
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === 'M' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100/50'
            }`}
            onClick={() => setActiveTab('M')}
          >
            남자 이름 TOP 50
          </button>
        </div>

        {/* Top 50 List */}
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          {data.map((entry) => {
            const isFemale = activeTab === 'F';
            const name = isFemale ? entry.f : entry.m;
            const count = isFemale ? entry.fc : entry.mc;
            const colorClass = isFemale ? 'group-hover:text-rose-600' : 'group-hover:text-blue-600';

            return (
              <Link
                key={entry.rank}
                href={`/names/us/${name.toLowerCase()}`}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold w-6 text-center ${entry.rank <= 3 ? (isFemale ? 'text-rose-400' : 'text-blue-400') : 'text-gray-400'}`}>
                    {entry.rank}
                  </span>
                  <span className={`text-lg font-bold text-gray-900 capitalize transition-colors ${colorClass}`}>
                    {name}
                  </span>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  {count.toLocaleString()}명
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
