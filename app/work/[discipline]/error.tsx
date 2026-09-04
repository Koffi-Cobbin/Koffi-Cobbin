'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DisciplineError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Discipline page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-hardware-50 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-hardware-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        {/* Error message */}
        <h2 className="font-display text-2xl text-ink mb-2">
          Couldn't Load Projects
        </h2>
        <p className="text-muted mb-6">
          We had trouble loading this discipline's projects. Please try again.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/work/software" className="btn-secondary">
            Browse All Work
          </Link>
        </div>
      </div>
    </div>
  );
}
