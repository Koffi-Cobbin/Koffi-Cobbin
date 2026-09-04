export default function AboutLoading() {
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

      {/* Bio section skeleton */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Bio */}
          <div>
            <div className="h-7 w-32 bg-line rounded animate-pulse mb-6" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-line rounded animate-pulse" />
              <div className="h-4 w-full bg-line rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-line rounded animate-pulse" />
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <div className="h-7 w-40 bg-line rounded animate-pulse mb-6" />

            {/* Software skills skeleton */}
            <div className="mb-6">
              <div className="h-3 w-20 bg-line rounded animate-pulse mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 w-16 bg-line rounded-full animate-pulse" />
                ))}
              </div>
            </div>

            {/* Hardware skills skeleton */}
            <div className="mb-6">
              <div className="h-3 w-20 bg-line rounded animate-pulse mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-16 bg-line rounded-full animate-pulse" />
                ))}
              </div>
            </div>

            {/* Impact skills skeleton */}
            <div>
              <div className="h-3 w-16 bg-line rounded animate-pulse mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-20 bg-line rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline skeleton */}
      <section className="bg-paper-dark/50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="h-8 w-48 bg-line rounded mx-auto animate-pulse mb-12" />

          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-line" />

            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-12">
                {/* Dot skeleton */}
                <div className="absolute left-4 top-1 w-3 h-3 -translate-x-1.5 bg-line rounded-full animate-pulse" />

                {/* Card skeleton */}
                <div className="bg-white border border-line rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-24 bg-line rounded animate-pulse" />
                    <div className="h-5 w-16 bg-line rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 w-48 bg-line rounded animate-pulse mb-1" />
                  <div className="h-4 w-32 bg-line rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-line rounded animate-pulse" />
                    <div className="h-3 w-3/4 bg-line rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
