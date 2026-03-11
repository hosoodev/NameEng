'use server';

type ByNameEntry = {
  y: number;
  r: number;
  c: number;
};

export type ByNameFile = {
  name: string;
  male: ByNameEntry[];
  female: ByNameEntry[];
};

import fs from 'fs/promises';
import path from 'path';

export async function loadNameData(name: string): Promise<ByNameFile | null> {
  try {
    const cleanName = name.toLowerCase().trim();
    if (!cleanName) return null;
    
    const filePath = path.join(process.cwd(), 'src', 'data', 'names', 'us', 'by-name', `${cleanName}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as ByNameFile;
  } catch (error) {
    // Return null if the name doesn't exist in the database
    return null;
  }
}
