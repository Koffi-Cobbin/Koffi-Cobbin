import { Discipline, ProjectSummary } from '@/lib/types';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers3 } from 'lucide-react';

interface Props {
  discipline: Discipline;
  flagshipProjects: ProjectSummary[];
  index?: number;
  disciplineCount?: number;
}

export default function DisciplineCard({
  discipline,
  flagshipProjects,
  index = 0,
  disciplineCount = 3,
}: Props) {
  const featuredProject = flagshipProjects[0];
  const featuredProjectCount = flagshipProjects.length;
  const titleId = `discipline-card-title-${discipline.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full overflow-hidden border border-line bg-white/70 shadow-[0_20px_50px_-30px_rgba(28,27,26,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-28px_rgba(28,27,26,0.32)]"
      style={{ borderTopColor: discipline.theme_color, borderTopWidth: 5 }}
      aria-labelledby={titleId}
    >
      <header
        className="p-6 sm:p-7"
        style={{ backgroundColor: `${discipline.theme_color}12` }}
      >
        <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <span style={{ color: discipline.theme_color }}>
            {String(index + 1).padStart(2, '0')} / {String(disciplineCount).padStart(2, '0')}
          </span>
          <span>Ways of working</span>
        </div>

        <div className="mt-7">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center"
              style={{ backgroundColor: discipline.theme_color, color: 'var(--color-paper)' }}
              aria-hidden="true"
            >
              <Layers3 size={22} strokeWidth={1.6} />
            </div>
            <h2 id={titleId} className="font-display text-3xl leading-none tracking-tight">
              {discipline.name}
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {discipline.description}
          </p>
        </div>
      </header>

      <div className="p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Featured work
          </p>
          <span className="font-mono text-xs text-muted">
            {featuredProject
              ? `01 / ${String(featuredProjectCount).padStart(2, '0')}`
              : '00 / 00'}
          </span>
        </div>

        {featuredProject ? (
          <ol className="divide-y divide-line">
            <li>
              <Link
                href={`/work/${discipline.slug}/${featuredProject.slug}`}
                className="group flex min-h-24 items-center gap-4 py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-paper)_72%,var(--color-line))] sm:gap-5 sm:px-2"
                aria-label={`Read ${featuredProject.title}`}
                data-testid={`link-discipline-project-${featuredProject.slug}`}
              >
                <span className="w-5 shrink-0 font-mono text-xs text-muted" aria-hidden="true">
                  01
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl leading-tight transition-colors group-hover:text-[var(--color-muted)]">
                    {featuredProject.title}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted">
                    {featuredProject.summary}
                  </span>
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted/70">
                    {featuredProject.tech_stack.slice(0, 2).join(' · ')}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ol>
        ) : (
          <p className="border-b border-line py-8 text-sm text-muted">
            No featured work published yet.
          </p>
        )}

        <Link
          href={`/work/${discipline.slug}`}
          className="group mt-6 flex min-h-12 items-center justify-between border-2 border-ink px-4 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
          data-testid={`link-discipline-${discipline.slug}`}
        >
          <span>Browse all {discipline.name.toLowerCase()} work</span>
          <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}