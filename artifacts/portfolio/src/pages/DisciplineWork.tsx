import { useParams } from 'wouter';
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 md:py-32">
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