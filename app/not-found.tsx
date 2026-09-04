import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* 404 number */}
        <div className="mb-6">
          <span className="text-8xl font-display text-line">404</span>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl text-ink mb-4">
          Page Not Found
        </h1>
        <p className="text-muted mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/work/software" className="btn-secondary">
            Browse Work
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 pt-8 border-t border-line">
          <p className="text-sm text-muted mb-4">Or try these pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-muted hover:text-ink transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted hover:text-ink transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/work/software"
              className="text-muted hover:text-ink transition-colors"
            >
              Software
            </Link>
            <Link
              href="/work/hardware"
              className="text-muted hover:text-ink transition-colors"
            >
              Hardware
            </Link>
            <Link
              href="/work/impact"
              className="text-muted hover:text-ink transition-colors"
            >
              Impact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
