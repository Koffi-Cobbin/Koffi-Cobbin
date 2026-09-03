import { notFound } from 'next/navigation';
import { getDisciplines, getProjects } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ discipline: string }>;
}) {
  const { discipline: disciplineSlug } = await params;
  const disciplines = await getDisciplines();
  const discipline = disciplines.find((d) => d.slug === disciplineSlug);
  if (!discipline) notFound();

  const projects = await getProjects({ discipline: discipline.slug });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-3xl">{discipline.name}</h1>
      <p className="mt-2 max-w-prose text-muted">{discipline.description}</p>

      {projects.length === 0 ? (
        <p className="mt-12 text-muted">No projects published yet.</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
