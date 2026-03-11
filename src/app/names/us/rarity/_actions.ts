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

import indexData from '@/data/names/us/index.json';

export async function checkNameRarity(name: string): Promise<IndexEntry | null> {
  const cleanName = name.toLowerCase().trim();
  if (!cleanName) return null;
  
  // Find exact match
  const match = (indexData as IndexEntry[]).find((e) => e.n === cleanName);
  return match || null;
}
