import { Discipline, ProjectSummary } from '@/lib/types';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
}: Props) {
  const featuredProject = flagshipProjects[0];
  const titleId = `discipline-card-title-${discipline.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative h-[420px] overflow-hidden border border-line bg-white shadow-[0_20px_50px_-30px_rgba(28,27,26,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-28px_rgba(28,27,26,0.32)] sm:h-[480px]"
      aria-labelledby={titleId}
    >
      {/* Hero Image */}
      <Link
        href={`/work/${discipline.slug}`}
        className="absolute inset-0"
        aria-label={`View all ${discipline.name} work`}
      >
        <div className="absolute inset-0 overflow-hidden">
          {featuredProject?.cover_image ? (
            <img
              src={featuredProject.cover_image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${discipline.theme_color}22 0%, ${discipline.theme_color}08 100%)`
              }}
            />
          )}
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${discipline.theme_color}ee 0%, ${discipline.theme_color}99 40%, ${discipline.theme_color}33 70%, transparent 100%)`
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
          {/* Top: Project count badge */}
          <div className="flex justify-end">
            {featuredProject && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {flagshipProjects.length} project{flagshipProjects.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Bottom: Title and CTA */}
          <div>
            <h2
              id={titleId}
              className="font-display text-4xl leading-none tracking-tight text-white sm:text-5xl"
            >
              {discipline.name}
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
              {discipline.description}
            </p>

            {/* Featured project teaser */}
            {featuredProject && (
              <div className="mt-4 flex items-center gap-3 border-t border-white/20 pt-4">
                <span className="truncate text-xs font-medium text-white/90">
                  {featuredProject.title}
                </span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Browse all button - fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-0 sm:p-7 sm:pt-0">
        <Link
          href={`/work/${discipline.slug}`}
          className="flex min-h-11 items-center justify-between border-2 border-white/40 bg-white/10 px-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
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
