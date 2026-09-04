export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="h-4 w-16 bg-line rounded animate-pulse" />
          <div className="h-10 w-64 bg-line rounded mt-4 animate-pulse" />
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full bg-line rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-line rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Form section skeleton */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Form skeleton */}
          <div>
            <div className="h-7 w-36 bg-line rounded animate-pulse mb-6" />

            <div className="space-y-6">
              {/* Name field */}
              <div>
                <div className="h-4 w-12 bg-line rounded animate-pulse mb-2" />
                <div className="h-12 w-full bg-line rounded-lg animate-pulse" />
              </div>

              {/* Email field */}
              <div>
                <div className="h-4 w-12 bg-line rounded animate-pulse mb-2" />
                <div className="h-12 w-full bg-line rounded-lg animate-pulse" />
              </div>

              {/* Message field */}
              <div>
                <div className="h-4 w-18 bg-line rounded animate-pulse mb-2" />
                <div className="h-32 w-full bg-line rounded-lg animate-pulse" />
              </div>

              {/* Submit button */}
              <div className="h-12 w-full bg-line rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Right: Contact info skeleton */}
          <div>
            <div className="h-7 w-28 bg-line rounded animate-pulse mb-6" />

            <div className="space-y-6">
              {/* Email info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-line rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-12 bg-line rounded animate-pulse mb-2" />
                  <div className="h-3 w-48 bg-line rounded animate-pulse" />
                </div>
              </div>

              {/* GitHub info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-line rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-16 bg-line rounded animate-pulse mb-2" />
                  <div className="h-3 w-40 bg-line rounded animate-pulse" />
                </div>
              </div>

              {/* Location info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-line rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-18 bg-line rounded animate-pulse mb-2" />
                  <div className="h-3 w-56 bg-line rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Additional note skeleton */}
            <div className="mt-8 p-4 bg-paper-dark rounded-lg border border-line">
              <div className="h-4 w-full bg-line rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-line rounded animate-pulse mt-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
