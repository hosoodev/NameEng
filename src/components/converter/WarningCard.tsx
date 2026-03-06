import { AlertTriangle } from 'lucide-react';
import type { Warning } from '@/lib/romanization';

interface WarningCardProps {
  warnings: Warning[];
}

export default function WarningCard({ warnings }: WarningCardProps) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle size={15} className="text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-amber-800 mb-2">
            부적절한 의미를 포함할 수 있습니다
          </p>
          {warnings.map((warning, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="text-sm text-amber-700">
                <strong className="font-semibold">{warning.word}</strong>
                <span className="text-amber-600">: {warning.meaning}</span>
              </p>
              {warning.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {warning.suggestions.map((suggestion: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded-lg px-2.5 py-1 font-medium"
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
