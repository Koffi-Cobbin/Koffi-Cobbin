import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProject } from '@/lib/api';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ discipline: string; slug: string }>;
}) {
  const { discipline, slug } = await params;
  const project = await getProject(slug);
  if (!project || project.discipline !== discipline) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-muted">
        {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
      </p>
      <h1 className="font-display mt-2 text-3xl">{project.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{project.summary}</p>

      <div className="relative mt-8 aspect-[3/2] overflow-hidden bg-line">
        <Image src={project.cover_image} alt="" fill className="object-cover" sizes="768px" />
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-3 text-xs text-muted">
        {project.tech_stack.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div
        className="prose prose-neutral mt-8 max-w-prose"
        dangerouslySetInnerHTML={{ __html: project.body }}
      />

      {/* Optional block: 3D model viewer — populated once react-three-fiber
          is added in Phase 3. Only renders a placeholder note for now so
          hardware case studies with a model_3d field don't silently drop it. */}
      {project.model_3d && (
        <div className="mt-8 border border-line p-6 text-sm text-muted">
          3D model viewer placeholder — {project.model_3d} will render here once the R3F
          model viewer is built (Frontend.md section 3.3).
        </div>
      )}

      {project.gallery.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4">
          {project.gallery.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden bg-line">
              <Image src={src} alt="" fill className="object-cover" sizes="384px" />
            </div>
          ))}
        </div>
      )}

      {(project.links.repo || project.links.live_demo || project.links.video) && (
        <div className="mt-10 flex gap-4 text-sm">
          {project.links.repo && (
            <a href={project.links.repo} className="underline underline-offset-4">
              View source
            </a>
          )}
          {project.links.live_demo && (
            <a href={project.links.live_demo} className="underline underline-offset-4">
              View live
            </a>
          )}
          {project.links.video && (
            <a href={project.links.video} className="underline underline-offset-4">
              Watch video
            </a>
          )}
        </div>
      )}
    </article>
  );
}
