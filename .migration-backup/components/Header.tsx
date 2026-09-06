import Link from 'next/link';
import { getDisciplines } from '@/lib/api';

export default async function Header() {
  const disciplines = await getDisciplines();

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-lg">
          Portfolio
        </Link>
        <nav className="flex gap-6 text-sm text-muted">
          {disciplines.map((d) => (
            <Link key={d.slug} href={`/work/${d.slug}`} className="hover:text-ink">
              {d.name}
            </Link>
          ))}
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
