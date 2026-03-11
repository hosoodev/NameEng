type HistoryItem = { name: string; result: string; timestamp: number };
export const HISTORY_KEY = 'nameeng-history';

export type { HistoryItem };

export function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}
