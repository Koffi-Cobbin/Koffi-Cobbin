export default function ProjectLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3 w-8 bg-line rounded animate-pulse" />
            <div className="h-3 w-1 bg-line rounded animate-pulse" />
            <div className="h-3 w-16 bg-line rounded animate-pulse" />
            <div className="h-3 w-1 bg-line rounded animate-pulse" />
            <div className="h-3 w-20 bg-line rounded animate-pulse" />
          </div>

          {/* Date skeleton */}
          <div className="h-4 w-32 bg-line rounded animate-pulse" />

          {/* Title skeleton */}
          <div className="h-10 w-3/4 bg-line rounded mt-4 animate-pulse" />
          <div className="h-10 w-1/2 bg-line rounded mt-2 animate-pulse" />

          {/* Summary skeleton */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-line rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-line rounded animate-pulse" />
          </div>

          {/* Tags skeleton */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 bg-line rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="aspect-[16/9] bg-line rounded-xl animate-pulse -mt-4" />
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-[1fr_250px] gap-12">
          {/* Main content skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-line rounded animate-pulse" />
            <div className="h-4 w-full bg-line rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-line rounded animate-pulse" />
            <div className="h-4 w-full bg-line rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-line rounded animate-pulse" />
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="p-4 border border-line rounded-xl">
              <div className="h-5 w-16 bg-line rounded animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-line rounded animate-pulse" />
                <div className="h-4 w-24 bg-line rounded animate-pulse" />
              </div>
            </div>
            <div className="p-4 border border-line rounded-xl">
              <div className="h-5 w-20 bg-line rounded animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-line rounded animate-pulse" />
                <div className="h-4 w-full bg-line rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
