import { Discipline, ProjectSummary } from '@/lib/types';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface Props {
  discipline: Discipline;
  flagshipProjects: ProjectSummary[];
  index?: number;
}

export default function DisciplineCard({ discipline, flagshipProjects, index = 0 }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="flex flex-col border border-line bg-white/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] sm:p-6" 
      style={{ borderTopColor: discipline.theme_color, borderTopWidth: 4 }}
    >
      <h2 className="font-display text-2xl">{discipline.name}</h2>
      <p className="mt-3 text-muted leading-relaxed">{discipline.description}</p>

      {flagshipProjects.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {flagshipProjects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${discipline.slug}/${p.slug}`}
                className="block py-1 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                aria-label={`Read ${p.title}`}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 pt-4 border-t border-line/50">
        <Link
          href={`/work/${discipline.slug}`}
          className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors hover:text-ink group"
        >
          View all {discipline.name.toLowerCase()} work
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}