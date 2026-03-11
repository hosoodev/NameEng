'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NameAutocomplete from './NameAutocomplete';

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
        <NameAutocomplete 
          value={query}
          onChange={setQuery}
          onSelect={(name) => {
            const cleanName = name.trim().toLowerCase();
            if (cleanName) {
              router.push(`/names/us/${cleanName}`);
            }
          }}
          placeholder="영어 이름을 입력해 보세요 (예: James, Olivia)"
          className="max-w-xl"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl transition-colors z-10"
        >
          검색
        </button>
      </div>
    </form>
  );
}
