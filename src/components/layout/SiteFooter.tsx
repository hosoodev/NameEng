import Link from 'next/link';

const footerLinks = [
  { href: '/how-to-use', label: '사용 방법' },
  { href: '/romanization-guide', label: '로마자 표기법' },
  { href: '/passport-guide', label: '여권 가이드' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: '블로그' },
  { href: '/about', label: '소개' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 pb-8 border-t border-gray-100 pt-6">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={false}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="text-center text-[11px] text-gray-300">
        © {new Date().getFullYear()} Nameeng · 국어의 로마자 표기법 준수
      </p>
    </footer>
  );
}
