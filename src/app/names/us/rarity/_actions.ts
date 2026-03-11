'use server';

import fs from 'fs/promises';
import path from 'path';

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
  
  try {
    const indexPath = path.join(process.cwd(), 'src', 'data', 'names', 'us', 'index.json');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const index = JSON.parse(indexContent) as IndexEntry[];
    
    // Find exact match
    const match = index.find((e) => e.n === cleanName);
    return match || null;
  } catch (error) {
    console.error('Error reading index.json in rarity check:', error);
    return null;
  }
}
