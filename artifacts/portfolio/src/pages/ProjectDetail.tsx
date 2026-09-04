import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Github, Play } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { getDisciplines, getProject } from '@/lib/api';
import NotFound from '@/pages/not-found';

export default function ProjectDetailPage() {
  const { discipline: disciplineSlug, project: projectSlug } = useParams<{
    discipline: string;
    project: string;
  }>();
  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ['project', projectSlug],
    queryFn: () => getProject(projectSlug ?? ''),
    enabled: !!projectSlug,
  });
  const { data: disciplines = [] } = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });

  if (loadingProject) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-16 sm:px-6 sm:py-24">
        <div className="h-5 w-28 bg-line/50" />
        <div className="mt-8 aspect-[4/3] bg-line/50 sm:aspect-[16/8]" />
      </div>
    );
  }

  if (!project || project.discipline !== disciplineSlug) return <NotFound />;

  const discipline = disciplines.find((item) => item.slug === project.discipline);
  const links = [
    project.links.repo ? { href: project.links.repo, label: 'View source', icon: Github } : null,
    project.links.live_demo ? { href: project.links.live_demo, label: 'Open live demo', icon: ExternalLink } : null,
    project.links.video ? { href: project.links.video, label: 'Watch overview', icon: Play } : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:py-24">
      <Link href={`/work/${project.discipline}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to {discipline?.name ?? 'work'}
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-14">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: discipline?.theme_color }}>
              {discipline?.name ?? 'Project'}
            </p>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
          </div>
          <p className="max-w-md text-base font-medium leading-relaxed text-muted sm:text-lg">{project.summary}</p>
        </div>

        <div className="mt-10 aspect-[4/3] overflow-hidden bg-line sm:mt-14 sm:aspect-[16/8]">
          <img src={project.cover_image} alt={`${project.title} project cover`} className="h-full w-full object-cover" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_220px] md:gap-16">
          <div className="prose prose-neutral max-w-prose text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: project.body }} />
          <aside className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Built with</p>
            <ul className="mt-4 flex flex-wrap gap-2 md:block md:space-y-2">
              {project.tech_stack.map((tag) => (
                <li key={tag} className="inline-block border border-line px-2 py-1 text-xs text-muted md:block md:w-fit">{tag}</li>
              ))}
            </ul>
            {links.length > 0 && (
              <div className="mt-8 space-y-2 border-t border-line pt-6">
                {links.map(({ href, label, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 text-sm font-medium transition-colors hover:text-muted">
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </motion.div>
    </article>
  );
}