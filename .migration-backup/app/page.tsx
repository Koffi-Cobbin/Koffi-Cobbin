import { getDisciplines, getProjects } from '@/lib/api';
import DisciplineCard from '@/components/DisciplineCard';

export default async function HomePage() {
  const disciplines = await getDisciplines();

  const flagshipByDiscipline = await Promise.all(
    disciplines.map(async (d) => ({
      discipline: d,
      projects: await getProjects({ discipline: d.slug, featured: true }),
    })),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/*
        This section is the permanent 2D fallback described in Frontend.md
        3.1 (reduced-motion / mobile / no-WebGL). It's also the whole
        landing page for now — the 3D hub (orbiting node graph, one node
        per discipline surfacing its 2–4 flagship projects) is scheduled
        for Phase 3, after Phase 0.5 visual identity is locked. Wiring it
        in later means adding a client component here, e.g.:
          <Hub3D disciplines={disciplines} /> behind a dynamic() import,
        with this grid kept exactly as the fallback path.
      */}
      <section>
        <h1 className="font-display text-4xl leading-tight">
          Building across software, hardware, and impact.
        </h1>
        <p className="mt-4 max-w-prose text-muted">
          A working portfolio of shipped products, physical prototypes, and
          projects built for real-world outcomes.
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {flagshipByDiscipline.map(({ discipline, projects }) => (
          <DisciplineCard key={discipline.slug} discipline={discipline} flagshipProjects={projects} />
        ))}
      </section>
    </div>
  );
}
