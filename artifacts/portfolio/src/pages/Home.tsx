import { useQuery } from '@tanstack/react-query';
import { getDisciplines, getProjects } from '@/lib/api';
import DisciplineCard from '@/components/DisciplineCard';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function HomePage() {
  const { data: disciplines = [], isLoading: loadingDisciplines } = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines
  });

  const { data: flagshipProjects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => getProjects({ featured: true })
  });

  if (loadingDisciplines || loadingProjects) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-16 sm:px-6 sm:py-24">
        <div className="h-16 w-3/4 bg-line/50 mb-6"></div>
        <div className="h-6 w-1/2 bg-line/50"></div>
        <div className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 border border-line/50 bg-white/20"></div>
          ))}
        </div>
      </div>
    );
  }

  const flagshipByDiscipline = disciplines.map(d => ({
    discipline: d,
    projects: flagshipProjects.filter(p => p.discipline === d.slug)
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 md:py-32">
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Independent maker · selected work</p>
        <h1 className="max-w-3xl font-display text-[2.65rem] leading-[1.04] tracking-tight sm:text-5xl lg:text-[4rem]">
          Building across software, hardware, and impact.
        </h1>
        <p className="mt-6 max-w-prose text-base font-medium leading-relaxed text-muted sm:mt-8 sm:text-xl">
          A record of shipped products, physical prototypes, and work that moves
          real outcomes forward.
        </p>
        <div className="mt-8 flex flex-col gap-3 text-sm font-medium sm:flex-row">
          <Link href="/work/software" className="inline-flex min-h-11 items-center justify-center border-2 border-ink bg-ink px-5 py-3 text-paper transition-colors hover:bg-transparent hover:text-ink">
            Explore the work
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 transition-colors hover:border-ink">
            Start a conversation
          </Link>
        </div>
      </motion.section>

      <section className="mt-16 sm:mt-24" aria-labelledby="directions-heading">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-4 sm:mb-8">
          <h2 id="directions-heading" className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Ways of working</h2>
          <span className="text-xs text-muted">{disciplines.length} disciplines</span>
        </div>
        <div className="grid items-start gap-5 md:grid-cols-3 md:gap-8">
        {flagshipByDiscipline.map(({ discipline, projects }, index) => (
          <DisciplineCard 
            key={discipline.slug} 
            discipline={discipline} 
            flagshipProjects={projects} 
            index={index}
          />
        ))}
        </div>
      </section>
    </div>
  );
}