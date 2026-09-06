import Image from 'next/image';
import Link from 'next/link';
import { ProjectSummary } from '@/lib/types';

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/work/${project.discipline}/${project.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-line">
        <Image
          src={project.cover_image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <h3 className="mt-3 font-display text-lg">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.summary}</p>
      <ul className="mt-2 flex flex-wrap gap-x-3 text-xs text-muted">
        {project.tech_stack.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </Link>
  );
}
