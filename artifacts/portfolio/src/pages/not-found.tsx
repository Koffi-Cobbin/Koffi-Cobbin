import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Page not found</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">That page moved.</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        The work may have changed, but there is more to explore from the home page.
      </p>
      <Link href="/" className="mt-8 inline-flex min-h-11 w-fit items-center border-2 border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:bg-transparent hover:text-ink">
        Back home
      </Link>
    </div>
  );
}
