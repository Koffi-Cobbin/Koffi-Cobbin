import Link from 'next/link';
import { Discipline, ProjectSummary } from '@/lib/types';

interface Props {
  discipline: Discipline;
  flagshipProjects: ProjectSummary[];
}

// Discipline-specific styles mapping
const disciplineStyles: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  software: {
    border: 'border-software-500',
    bg: 'bg-software-50',
    text: 'text-software-700',
    hover: 'hover:bg-software-100',
  },
  hardware: {
    border: 'border-hardware-500',
    bg: 'bg-hardware-50',
    text: 'text-hardware-700',
    hover: 'hover:bg-hardware-100',
  },
  impact: {
    border: 'border-impact-500',
    bg: 'bg-impact-50',
    text: 'text-impact-700',
    hover: 'hover:bg-impact-100',
  },
};

// This is the 2D landing treatment. It doubles as the reduced-motion /
// no-WebGL fallback once the 3D hub (Phase 3) replaces this on capable
// devices — see Frontend.md section 3.1.
export default function DisciplineCard({ discipline, flagshipProjects }: Props) {
  const styles = disciplineStyles[discipline.slug] || disciplineStyles.software;

  return (
    <article
      data-discipline={discipline.slug}
      className={`card-discipline group relative overflow-hidden ${styles.border}`}
    >
      {/* Accent gradient overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.bg}`}
        style={{ opacity: 0.3 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-display text-2xl md:text-3xl text-ink group-hover:text-ink-light transition-colors">
            {discipline.name}
          </h2>
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${styles.bg} ${styles.text}`}
          >
            {discipline.slug}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted leading-relaxed mb-6">
          {discipline.description}
        </p>

        {/* Flagship Projects */}
        {flagshipProjects.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
              Featured Work
            </h3>
            <ul className="space-y-2">
              {flagshipProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${discipline.slug}/${project.slug}`}
                    className="flex items-center p-3 rounded-lg bg-paper-dark/50 hover:bg-paper-dark transition-colors group/link"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink group-hover/link:text-ink-light truncate">
                        {project.title}
                      </p>
                      <p className="text-sm text-muted truncate mt-0.5">
                        {project.summary}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-muted group-hover/link:text-ink ml-3 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* View All Link */}
        <Link
          href={`/work/${discipline.slug}`}
          className={`mt-6 inline-flex items-center text-sm font-medium ${styles.text} hover:underline underline-offset-4`}
        >
          View all {discipline.name.toLowerCase()} work
          <svg
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
