export default function DisciplineLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="h-4 w-24 bg-line rounded animate-pulse" />
          <div className="h-10 w-64 bg-line rounded mt-4 animate-pulse" />
          <div className="h-4 w-96 bg-line rounded mt-4 animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-0 overflow-hidden">
              {/* Image skeleton */}
              <div className="aspect-[3/2] bg-line animate-pulse" />

              {/* Content skeleton */}
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-line rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-line rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-line rounded animate-pulse" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-line rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-line rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-line rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
