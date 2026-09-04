import Link from 'next/link';
import { getDisciplines } from '@/lib/api';

export default async function Header() {
  const disciplines = await getDisciplines();

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Site Name */}
        <Link
          href="/"
          className="font-display text-xl md:text-2xl text-ink hover:text-ink-light transition-colors"
        >
          Koffi Cobbin
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          {/* Discipline Links */}
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              href={`/work/${d.slug}`}
              className="px-3 py-2 text-sm font-medium text-muted hover:text-ink hover:bg-paper-dark rounded-lg transition-all"
            >
              {d.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-line mx-2" />

          {/* Utility Links */}
          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium text-muted hover:text-ink hover:bg-paper-dark rounded-lg transition-all"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium bg-ink text-paper hover:bg-ink-light rounded-lg transition-colors ml-2"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
