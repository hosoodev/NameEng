'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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

type ByNameEntry = { y: number; r: number; c: number };

interface NameTrendChartProps {
  maleData: ByNameEntry[];
  femaleData: ByNameEntry[];
}

export default function NameTrendChart({ maleData, femaleData }: NameTrendChartProps) {
  const chartData = useMemo(() => {
    // Collect all unique years
    const yearSet = new Set<number>();
    maleData.forEach(d => yearSet.add(d.y));
    femaleData.forEach(d => yearSet.add(d.y));
    
    const years = Array.from(yearSet).sort((a, b) => a - b);
    
    // Create unified data array for Recharts
    const maleMap = new Map(maleData.map(d => [d.y, d]));
    const femaleMap = new Map(femaleData.map(d => [d.y, d]));

    return years.map(year => ({
      year,
      maleRank: maleMap.has(year) ? maleMap.get(year)?.r : null,
      maleCount: maleMap.has(year) ? maleMap.get(year)?.c : 0,
      femaleRank: femaleMap.has(year) ? femaleMap.get(year)?.r : null,
      femaleCount: femaleMap.has(year) ? femaleMap.get(year)?.c : 0,
    }));
  }, [maleData, femaleData]);

  // If there's no data
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500">차트 데이터가 없습니다.</p>
      </div>
    );
  }

  // Find min/max rank to scale Y-axis properly, capping at 1000 or the max rank
  let maxRank = 1000;
  chartData.forEach(d => {
    if (d.maleRank && d.maleRank > maxRank) maxRank = d.maleRank;
    if (d.femaleRank && d.femaleRank > maxRank) maxRank = d.femaleRank;
  });
  // Add some padding to maxRank
  maxRank = Math.ceil(maxRank / 100) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl">
          <p className="font-bold text-gray-900 mb-2">{label}년</p>
          {payload.map((entry: any, index: number) => {
            if (entry.value === null) return null;
            const isMale = entry.dataKey === 'maleRank';
            const count = isMale ? entry.payload.maleCount : entry.payload.femaleCount;
            // rank is entry.value
            return (
              <div key={index} className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-gray-700 font-medium">
                  {isMale ? '남자' : '여자'}: <span className="font-bold text-gray-900">{entry.value}위</span> ({count.toLocaleString()}명)
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] mt-8 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            tickMargin={12}
            minTickGap={30}
          />
          {/* YAxis domain is reversed so rank 1 is at the top */}
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
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          {maleData.length > 0 && (
            <Line
              type="monotone"
              dataKey="maleRank"
              name="남자 순위"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
              connectNulls
            />
          )}
          
          {femaleData.length > 0 && (
            <Line
              type="monotone"
              dataKey="femaleRank"
              name="여자 순위"
              stroke="#F43F5E"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#F43F5E' }}
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
