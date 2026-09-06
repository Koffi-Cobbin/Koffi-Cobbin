import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react';
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    project.links.live_demo ? { 
      href: project.links.live_demo, 
      label: project.discipline === 'impact' ? 'Support the next project' : 'Open live demo', 
      icon: ExternalLink 
    } : null,
    project.links.video ? { href: project.links.video, label: 'Watch overview', icon: Play } : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6 md:py-8 lg:py-10">
      <div className="flex min-h-11 items-center gap-5">
        <Link href={`/work/${project.discipline}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to {discipline?.name ?? 'work'}
        </Link>
        <span
          className="border-l border-line pl-5 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: discipline?.theme_color }}
        >
          {discipline?.name ?? 'Project'}
        </span>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mt-4">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted sm:text-lg">{project.summary}</p>
        </div>

        <div className="mt-7 aspect-[4/3] overflow-hidden bg-line sm:mt-9 sm:aspect-[16/8]">
          <img src={project.cover_image} alt={`${project.title} project cover`} className="h-full w-full object-cover" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_220px] md:gap-16">
          <div className="prose prose-neutral max-w-prose text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: project.body }} />
          <aside className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8">
            {project.discipline === 'impact' ? (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Impact metrics</p>
                <ul className="mt-4 space-y-4">
                  <li>
                    <p className="text-2xl font-display font-semibold text-ink">110+</p>
                    <p className="text-xs text-muted">Students reached</p>
                  </li>
                  <li>
                    <p className="text-2xl font-display font-semibold text-ink">1</p>
                    <p className="text-xs text-muted">Community served</p>
                  </li>
                  <li>
                    <p className="text-2xl font-display font-semibold text-ink">600</p>
                    <p className="text-xs text-muted">Books & supplies donated</p>
                  </li>
                </ul>
              </>
            ) : project.discipline === 'hardware' ? (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Skills & Tools</p>
                <ul className="mt-4 flex flex-wrap gap-2 md:block md:space-y-2">
                  {project.tech_stack.map((tag) => (
                    <li key={tag} className="inline-block border border-line px-2 py-1 text-xs text-muted md:block md:w-fit">{tag}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Built with</p>
                <ul className="mt-4 flex flex-wrap gap-2 md:block md:space-y-2">
                  {project.tech_stack.map((tag) => (
                    <li key={tag} className="inline-block border border-line px-2 py-1 text-xs text-muted md:block md:w-fit">{tag}</li>
                  ))}
                </ul>
              </>
            )}
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

        {project.gallery.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Gallery</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {String(currentImageIndex + 1).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden bg-line">
                <img 
                  src={project.gallery[currentImageIndex]} 
                  alt={`${project.title} gallery image ${currentImageIndex + 1}`} 
                  className="h-full w-full object-cover transition-opacity duration-300" 
                />
              </div>

              {project.gallery.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-ink/50 text-paper hover:bg-ink/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-ink/50 text-paper hover:bg-ink/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {project.gallery.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {project.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-ink' : 'border-line hover:border-muted'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="h-full w-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </article>
  );
}