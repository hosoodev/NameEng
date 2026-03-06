import Image from 'next/image';

interface SiteHeaderProps {
  onLogoClick?: () => void;
}

export default function SiteHeader({ onLogoClick }: SiteHeaderProps) {
  return (
    <header className="w-full pt-8 pb-4 flex flex-col items-center gap-1">
      <a
        href="/"
        onClick={onLogoClick}
        className="flex items-center gap-2.5 group"
      >
        <Image
          src="/logo.svg"
          alt="Nameeng Logo"
          width={36}
          height={36}
          className="w-9 h-9 transition-transform group-hover:scale-105"
          priority
        />
        <span className="text-2xl font-extrabold tracking-tight text-gray-900">
          Nameeng
        </span>
      </a>
      <p className="text-sm text-gray-400 font-medium tracking-wide">
        한글 이름 영문 변환기
      </p>
    </header>
  );
}
