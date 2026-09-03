import Link from 'next/link';
import { Discipline, ProjectSummary } from '@/lib/types';

interface Props {
  discipline: Discipline;
  flagshipProjects: ProjectSummary[];
}

// This is the 2D landing treatment. It doubles as the reduced-motion /
// no-WebGL fallback once the 3D hub (Phase 3) replaces this on capable
// devices — see Frontend.md section 3.1.
export default function DisciplineCard({ discipline, flagshipProjects }: Props) {
  return (
    <div className="border border-line p-6" style={{ borderTopColor: discipline.theme_color, borderTopWidth: 3 }}>
      <h2 className="font-display text-2xl">{discipline.name}</h2>
      <p className="mt-2 text-muted">{discipline.description}</p>

      {flagshipProjects.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2">
          {flagshipProjects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${discipline.slug}/${p.slug}`}
                className="text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/work/${discipline.slug}`}
        className="mt-6 inline-block text-sm text-muted hover:text-ink"
      >
        View all {discipline.name.toLowerCase()} work
      </Link>
    </div>
  );
}
