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
  const featuredProjects = projects.filter((project) => project.is_featured);
  const nonFeaturedProjects = projects.filter((project) => !project.is_featured);

  if (isSoftwarePage) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-5 md:pb-8 md:pt-6 lg:pb-10 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid gap-4 border-b border-line pb-8 pt-4 sm:grid-cols-[1fr_0.8fr] sm:items-end sm:gap-10 sm:pb-10 sm:pt-6 lg:pt-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Selected software work
              </p>
              <h1
                className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl"
                data-testid="heading-software-hero"
              >
                {discipline.name}
              </h1>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:justify-self-end sm:text-base">
              {discipline.description}
            </p>
          </div>

          <h2 className="sr-only">Featured projects</h2>
          <div className="mt-6 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          {nonFeaturedProjects.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h2 className="border-b border-line pb-4 text-sm font-bold uppercase tracking-widest text-muted">
                More software work
              </h2>
              <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {nonFeaturedProjects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  const isHardwarePage = discipline.slug === 'hardware';

  if (isHardwarePage) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-5 md:pb-10 md:pt-6 lg:pb-12 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="grid gap-8 border-b border-line pb-10 pt-4 sm:pb-14 sm:pt-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 lg:pb-16 lg:pt-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Workbench catalogue / 2023—present
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.96] tracking-tight sm:text-6xl">
                Built for the field, not the shelf.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {discipline.description} Each entry is a record of the constraints,
                materials, and decisions that make a physical system useful in the
                real world.
              </p>
            </div>

            <div className="self-end border-l-2 border-line pl-5 text-sm leading-relaxed text-muted">
              <p className="font-bold uppercase tracking-widest text-[10px] text-ink">
                Reading the catalogue
              </p>
              <p className="mt-3">
                Start with the build status, then follow the materials and tools
                into the full case study.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#c2410c]" aria-hidden="true" />
                  Prototype
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
                  Featured
                </span>
              </div>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="border-b border-line py-16 text-center">
              <p className="text-lg font-medium text-muted">No projects published yet.</p>
            </div>
          ) : (
            <div className="border-b border-line">
              <div className="flex items-center justify-between gap-4 py-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
                  Build index
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {String(projects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <div className="divide-y divide-line border-t border-line">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                  >
                    <Link
                      href={`/work/${project.discipline}/${project.slug}`}
                      className="group grid gap-5 py-7 transition-colors hover:bg-[#f5eee8] sm:grid-cols-[4rem_minmax(0,1.3fr)_minmax(12rem,0.8fr)_auto] sm:items-center sm:gap-6 sm:px-4"
                      data-testid={`link-hardware-project-${project.slug}`}
                    >
                      <span className="font-mono text-xs text-muted" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-[#a43a0b]">
                            {project.title}
                          </h3>
                          {project.is_featured && (
                            <span className="border border-[#c2410c]/40 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#a43a0b]">
                              Featured build
                            </span>
                          )}
                        </div>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                          {project.summary}
                        </p>
                      </div>

                      <div className="border-l border-line pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                          Materials & tools
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-ink">
                          {project.tech_stack.map((tag) => (
                            <li key={tag} className="after:ml-2 after:text-muted after:content-['/'] last:after:hidden">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted transition-colors group-hover:text-[#a43a0b]">
                        Inspect
                        <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  const isImpactPage = discipline.slug === 'impact';

  if (isImpactPage) {
    const impactStory = featuredProjects[0] ?? projects[0];
    const otherImpactStories = impactStory
      ? projects.filter((project) => project.slug !== impactStory.slug)
      : [];

    return (
      <div className="mx-auto max-w-5xl px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-5 md:pb-10 md:pt-6 lg:pb-12 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="grid gap-8 border-b border-line pb-10 pt-4 sm:pb-14 sm:pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pb-16 lg:pt-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Impact stories / field notes
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.96] tracking-tight sm:text-6xl">
                Work that leaves the map better than it found it.
              </h2>
            </div>
            <div className="self-end border-l-2 pl-5 text-sm leading-relaxed text-muted" style={{ borderLeftColor: discipline.theme_color }}>
              <p className="font-bold uppercase tracking-widest text-[10px] text-ink">
                Why these stories matter
              </p>
              <p className="mt-3">
                Impact is not a label added at the end of a project. It is the
                people, places, and outcomes that shape the work from the start.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['People', 'Place', 'Progress'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {!impactStory ? (
            <div className="border-b border-line py-16 text-center">
              <p className="text-lg font-medium text-muted">No impact stories published yet.</p>
            </div>
          ) : (
            <>
              <div className="border-b border-line py-10 sm:py-14">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted">
                    Featured story
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    01 / {String(projects.length).padStart(2, '0')}
                  </p>
                </div>

                <Link
                  href={`/work/${impactStory.discipline}/${impactStory.slug}`}
                  className="group block"
                  data-testid={`link-impact-story-${impactStory.slug}`}
                >
                  <div className="grid overflow-hidden border border-line bg-white/40 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#dcebe3] lg:aspect-auto lg:min-h-[28rem]">
                      <img
                        src={impactStory.cover_image}
                        alt={`${impactStory.title} project`}
                        className="h-full w-full object-cover grayscale-[0.15] transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute left-4 top-4 bg-[#f7f6f2] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#0f7a4d]">
                        A field story
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                      <div>
                        <p className="font-mono text-xs text-muted">
                          {impactStory.date.slice(0, 4)} / {impactStory.tech_stack.length} tools in the stack
                        </p>
                        <h3 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight transition-colors group-hover:text-[#0f7a4d] sm:text-4xl">
                          {impactStory.title}
                        </h3>
                        <p className="mt-5 text-base leading-relaxed text-muted">
                          {impactStory.summary}
                        </p>
                      </div>

                      <div className="mt-10 border-t border-line pt-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                              Built with
                            </p>
                            <p className="mt-2 text-sm font-medium text-ink">
                              {impactStory.tech_stack.join(' / ')}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                              Read the story
                            </p>
                            <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#0f7a4d]">
                              See the work
                              <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden="true">
                                →
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="grid gap-8 border-b border-line py-10 sm:py-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    A closer look
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                    Start with the need. Follow the change.
                  </h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="border-t-2 border-[#0f7a4d] pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      The need
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-ink">
                      Understand the people and conditions that made this project
                      worth undertaking.
                    </p>
                  </div>
                  <div className="border-t-2 border-line pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      The work
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-ink">
                      See the choices, constraints, and outcomes behind the
                      finished project.
                    </p>
                  </div>
                </div>
              </div>

              {otherImpactStories.length > 0 && (
                <div className="py-10 sm:py-14">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
                      More stories from the field
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {String(otherImpactStories.length).padStart(2, '0')} more
                    </span>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {otherImpactStories.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.45 }}
                      >
                        <Link
                          href={`/work/${project.discipline}/${project.slug}`}
                          className="group block border-t border-line pt-4"
                          data-testid={`link-impact-story-${project.slug}`}
                        >
                          <p className="font-mono text-xs text-muted">{project.date.slice(0, 4)}</p>
                          <h3 className="mt-3 font-display text-2xl transition-colors group-hover:text-[#0f7a4d]">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
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