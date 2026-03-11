'use server';

import indexData from '@/data/names/us/index.json';

export type IndexEntry = {
  n: string;
  g: 'M' | 'F' | 'U';
  lr: number;
  py: number;
  pr: number;
  my: number;
};

export async function checkNameRarity(name: string): Promise<IndexEntry | null> {
  const cleanName = name.toLowerCase().trim();
  if (!cleanName) return null;
  
  // Cast indexData
  const index = indexData as IndexEntry[];
  
  // Find exact match
  const match = index.find((e) => e.n === cleanName);
  
  return match || null;
}
