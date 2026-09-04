import { getDisciplines, getFeaturedProjectsByDiscipline } from '@/lib/api';
import DisciplineCard from '@/components/DisciplineCard';

export default async function HomePage() {
  // Fetch disciplines and all featured projects in parallel (2 calls instead of N+1)
  const [disciplines, featuredByDiscipline] = await Promise.all([
    getDisciplines(),
    getFeaturedProjectsByDiscipline(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
              Portfolio
            </p>

            {/* Main heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-ink">
              Building across{' '}
              <span className="text-software-500">software</span>,{' '}
              <span className="text-hardware-500">hardware</span>, and{' '}
              <span className="text-impact-500">impact</span>.
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              A working portfolio of shipped products, physical prototypes, and
              projects built for real-world outcomes.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/work/software" className="btn-primary">
                View My Work
              </a>
              <a href="/about" className="btn-secondary">
                About Me
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-software-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 bg-hardware-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-32 h-32 bg-impact-500 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Discipline Cards Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-ink">
            Areas of Focus
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Each discipline represents a distinct approach to solving problems—
            from writing elegant code to building tangible products that make a difference.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {disciplines.map((discipline) => (
            <DisciplineCard
              key={discipline.slug}
              discipline={discipline}
              flagshipProjects={featuredByDiscipline.get(discipline.slug) || []}
            />
          ))}
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-paper">
              Featured Work
            </h2>
            <p className="mt-4 text-muted-light max-w-2xl mx-auto">
              Highlights from across all disciplines—selected projects that showcase
              the intersection of technology, engineering, and positive impact.
            </p>
          </div>

          <div className="text-center">
            <a href="/work/software" className="inline-flex items-center gap-2 text-paper hover:text-paper-dark transition-colors">
              <span className="font-medium">Explore all projects</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
