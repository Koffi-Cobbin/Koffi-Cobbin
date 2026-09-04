import { Link, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getDisciplines, getProjects } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';
import NotFound from '@/pages/not-found';
import { motion } from 'framer-motion';

export default function DisciplineWorkPage() {
  const { discipline: disciplineSlug } = useParams<{ discipline: string }>();

  const { data: disciplines = [], isLoading: loadingDisciplines } = useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines
  });

  const { data: projects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ['projects', disciplineSlug],
    queryFn: () => getProjects({ discipline: disciplineSlug }),
    enabled: !!disciplineSlug
  });

  if (loadingDisciplines || loadingProjects) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-16 sm:px-6 sm:py-24">
        <div className="h-6 w-24 bg-line/50 mb-6"></div>
        <div className="h-16 w-1/3 bg-line/50 mb-6"></div>
        <div className="h-6 w-1/2 bg-line/50"></div>
        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-[3/2] bg-line/50"></div>
          ))}
        </div>
      </div>
    );
  }

  const discipline = disciplines.find((d) => d.slug === disciplineSlug);
  if (!discipline) return <NotFound />;

  const isSoftwarePage = discipline.slug === 'software';
  const featuredProject = projects.find((project) => project.is_featured);
  const remainingProjects = isSoftwarePage && featuredProject
    ? projects.filter((project) => project.slug !== featuredProject.slug)
    : projects;

  if (isSoftwarePage && featuredProject) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:py-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <p
              className="border-l-4 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-muted"
              style={{ borderLeftColor: discipline.theme_color }}
            >
              {discipline.name}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Featured work</p>
          </div>

          <Link
            href={`/work/${featuredProject.discipline}/${featuredProject.slug}`}
            className="group mt-6 grid overflow-hidden border border-line bg-white/40 md:grid-cols-[1.35fr_0.85fr]"
          >
            <div className="relative aspect-[16/8] overflow-hidden bg-line md:aspect-auto md:min-h-[360px]">
              <img
                src={featuredProject.cover_image}
                alt={`${featuredProject.title} project cover`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute right-3 top-3 bg-paper px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                Featured
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:p-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Selected project</p>
                <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-[3.25rem]">
                  {featuredProject.title}
                </h1>
                <p className="mt-5 text-base font-medium leading-relaxed text-ink/75 sm:text-lg">
                  {featuredProject.summary}
                </p>
              </div>

              <div>
                <ul className="flex flex-wrap gap-2 text-xs font-medium text-muted">
                  {featuredProject.tech_stack.map((tag) => (
                    <li key={tag} className="border border-line/70 bg-white/50 px-2 py-1">{tag}</li>
                  ))}
                </ul>
                <p className="mt-8 text-sm font-bold uppercase tracking-wide text-ink transition-colors group-hover:text-muted">
                  View case study <span aria-hidden="true">→</span>
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {remainingProjects.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h2 className="border-b border-line pb-4 text-sm font-bold uppercase tracking-widest text-muted">
              More software work
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {remainingProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div 
          className="inline-block px-4 py-1.5 mb-8 border border-line bg-white/40 text-[11px] font-bold uppercase tracking-widest text-muted" 
          style={{ borderLeftColor: discipline.theme_color, borderLeftWidth: 4 }}
        >
          Discipline
        </div>
        <h1 className="font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-[4rem]">{discipline.name}</h1>
        <p className="mt-6 max-w-prose text-base font-medium leading-relaxed text-ink/80 sm:mt-8 sm:text-xl">{discipline.description}</p>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-16 border-t border-line py-16 text-center sm:mt-24"
        >
          <p className="text-muted text-lg font-medium">No projects published yet.</p>
        </motion.div>
      ) : (
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:mt-24 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}