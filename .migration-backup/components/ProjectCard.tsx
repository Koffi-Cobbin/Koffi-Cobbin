import Image from 'next/image';
import Link from 'next/link';
import { ProjectSummary } from '@/lib/types';

// Discipline-specific tag styles
const tagStyles: Record<string, string> = {
  software: 'bg-software-50 text-software-700 border-software-200',
  hardware: 'bg-hardware-50 text-hardware-700 border-hardware-200',
  impact: 'bg-impact-50 text-impact-700 border-impact-200',
};

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const disciplineTagStyle = tagStyles[project.discipline] || tagStyles.software;

  return (
    <Link
      href={`/work/${project.discipline}/${project.slug}`}
      className="group block card p-0 overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-line">
        <Image
          src={project.cover_image}
          alt={`${project.title} cover image`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-paper/90 backdrop-blur-sm text-ink rounded-full shadow-soft">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-display text-xl text-ink group-hover:text-ink-light transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${disciplineTagStyle}`}
            >
              {tag}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-muted bg-paper-dark rounded-full">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="mt-4 pt-4 border-t border-line">
          <time className="text-xs text-muted" dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
