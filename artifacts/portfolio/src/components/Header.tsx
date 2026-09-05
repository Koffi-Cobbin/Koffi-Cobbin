import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getDisciplines } from '@/lib/api';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: disciplines } = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  const linkClasses = (href: string) =>
    `transition-colors hover:text-ink ${isActive(href) ? 'text-ink' : ''}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="font-display text-xl tracking-tight transition-opacity hover:opacity-70"
          aria-label="Koffi Cobbin home"
        >
          Koffi Cobbin
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex lg:gap-8" aria-label="Main navigation">
          {disciplines?.map((d) => (
            <Link key={d.slug} href={`/work/${d.slug}`} className={linkClasses(`/work/${d.slug}`)}>
              {d.name}
            </Link>
          ))}
          <Link href="/about" className={linkClasses('/about')}>
            About
          </Link>
          <Link href="/contact" className={linkClasses('/contact')}>
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-paper sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`${menuOpen ? 'grid' : 'hidden'} border-t border-line bg-paper px-4 py-3 sm:hidden`}
      >
        <nav className="grid gap-1 text-base font-medium text-muted" aria-label="Mobile navigation">
          {disciplines?.map((d) => (
            <Link
              key={d.slug}
              href={`/work/${d.slug}`}
              className={`${linkClasses(`/work/${d.slug}`)} flex min-h-12 items-center border-b border-line/60`}
              onClick={() => setMenuOpen(false)}
            >
              {d.name}
            </Link>
          ))}
          <Link href="/about" className={`${linkClasses('/about')} flex min-h-12 items-center border-b border-line/60`} onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className={`${linkClasses('/contact')} flex min-h-12 items-center`} onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}