import Image from 'next/image';

interface SiteHeaderProps {
  onLogoClick?: () => void;
}

export default function SiteHeader({ onLogoClick }: SiteHeaderProps) {
  return (
    <header className="w-full pt-4 pb-2 md:pt-8 md:pb-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1">
      <a
        href="/"
        onClick={onLogoClick}
        className="flex items-center gap-2 md:gap-2.5 group"
      >
        <Image
          src="/logo.svg"
          alt="Nameeng Logo"
          width={28}
          height={28}
          className="w-7 h-7 md:w-9 md:h-9 transition-transform group-hover:scale-105"
          priority
        />
        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
          Nameeng
        </span>
      </a>
      <p className="hidden md:block text-sm text-gray-400 font-medium tracking-wide">
        한글 이름 영문 변환기
      </p>
    </header>
  );
}
