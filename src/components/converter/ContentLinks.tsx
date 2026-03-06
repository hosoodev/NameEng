import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentItem {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ContentLinksProps {
  title?: React.ReactNode;
  items: ContentItem[];
}

export default function ContentLinks({
  title = '📚 유용한 가이드',
  items,
}: ContentLinksProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-blue-200 hover:bg-blue-50/30 active:bg-blue-50 transition-colors group"
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{item.desc}</p>
            </div>
            <ChevronRight
              size={15}
              className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
