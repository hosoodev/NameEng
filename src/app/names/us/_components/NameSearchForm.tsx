'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function NameSearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery) {
      router.push(`/names/us/${cleanQuery}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl w-full">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-11 pr-32 py-4 bg-white border border-gray-200 rounded-full text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-shadow outline-none"
          placeholder="영어 이름을 입력해 보세요 (예: James, Olivia)"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-full transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
}
