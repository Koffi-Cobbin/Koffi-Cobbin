'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error message */}
        <h2 className="font-display text-2xl text-ink mb-2">
          Something went wrong
        </h2>
        <p className="text-muted mb-6">
          An unexpected error occurred. Please try again or contact support if the
          problem persists.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <a href="/" className="btn-secondary">
            Return Home
          </a>
        </div>

        {/* Error details (dev only) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-6 p-4 bg-paper-dark rounded-lg text-left">
            <p className="text-xs font-mono text-muted">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
