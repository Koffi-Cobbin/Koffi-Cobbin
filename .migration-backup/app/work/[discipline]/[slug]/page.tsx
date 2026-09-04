import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject } from '@/lib/api';
import DOMPurify from 'isomorphic-dompurify';

// Discipline-specific styles
const disciplineStyles: Record<string, { tag: string; accent: string }> = {
  software: {
    tag: 'bg-software-50 text-software-700 border-software-200',
    accent: 'text-software-500',
  },
  hardware: {
    tag: 'bg-hardware-50 text-hardware-700 border-hardware-200',
    accent: 'text-hardware-500',
  },
  impact: {
    tag: 'bg-impact-50 text-impact-700 border-impact-200',
    accent: 'text-impact-500',
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ discipline: string; slug: string }>;
}) {
  const { discipline, slug } = await params;
  const project = await getProject(slug);
  if (!project || project.discipline !== discipline) notFound();

  const styles = disciplineStyles[project.discipline] || disciplineStyles.software;

  // Sanitize HTML body to prevent XSS
  const sanitizedBody = DOMPurify.sanitize(project.body, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'className', 'target', 'rel'],
  });

  return (
    <article className="min-h-screen">
      {/* Header section */}
      <div className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/work/${project.discipline}`} className="hover:text-ink transition-colors capitalize">
              {project.discipline}
            </Link>
            <span>/</span>
            <span className="text-ink">{project.title}</span>
          </nav>

          {/* Date */}
          <time
            className={`text-sm font-medium ${styles.accent}`}
            dateTime={project.date}
          >
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mt-2">
            {project.title}
          </h1>

          {/* Summary */}
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Tech stack tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech_stack.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${styles.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative aspect-[16/9] overflow-hidden bg-line rounded-xl shadow-medium -mt-4">
          <Image
            src={project.cover_image}
            alt={`${project.title} cover image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-[1fr_250px] gap-12">
          {/* Main content */}
          <div>
            {/* Rich text body */}
            <div
              className="prose prose-lg prose-stone max-w-none
                prose-headings:font-display prose-headings:text-ink
                prose-p:text-muted prose-p:leading-relaxed
                prose-a:text-software-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink
                prose-code:text-software-600 prose-code:bg-software-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-ink prose-pre:text-paper
                prose-blockquote:border-software-500 prose-blockquote:text-muted"
              dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            />

            {/* 3D model viewer placeholder */}
            {project.model_3d && (
              <div className="mt-10 p-6 bg-paper-dark border border-line rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-hardware-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  <h3 className="font-display text-lg text-ink">3D Model</h3>
                </div>
                <p className="text-sm text-muted">
                  Interactive 3D model viewer coming soon — {project.model_3d}
                </p>
              </div>
            )}

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-ink mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden bg-line rounded-lg shadow-soft hover:shadow-medium transition-shadow"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Links */}
            {(project.links.repo || project.links.live_demo || project.links.video) && (
              <div className="p-4 bg-white border border-line rounded-xl">
                <h3 className="font-medium text-ink mb-3">Links</h3>
                <div className="space-y-2">
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View Source
                    </a>
                  )}
                  {project.links.live_demo && (
                    <a
                      href={project.links.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Video
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Project info */}
            <div className="p-4 bg-white border border-line rounded-xl">
              <h3 className="font-medium text-ink mb-3">Project Info</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Discipline</dt>
                  <dd className="text-ink capitalize">{project.discipline}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Date</dt>
                  <dd className="text-ink">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                {project.is_featured && (
                  <div className="flex justify-between">
                    <dt className="text-muted">Status</dt>
                    <dd className="text-software-500 font-medium">Featured</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Back link */}
            <Link
              href={`/work/${project.discipline}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-muted bg-white border border-line rounded-xl hover:bg-paper-dark hover:text-ink transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {project.discipline}
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
