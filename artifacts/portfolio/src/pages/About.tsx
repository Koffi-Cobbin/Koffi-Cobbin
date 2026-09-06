import { useQuery } from '@tanstack/react-query';
import { getTimeline } from '@/lib/api';
import Timeline from '@/components/Timeline';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import profileImage from '@assets/Koffi_Cobbin_SNS_1788505789145.png';
import { Github, Linkedin, Printer } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

const capabilities = [
  'Product engineering',
  'Geospatial systems',
  'Embedded systems',
  'Technical prototyping',
  'Environmental monitoring',
  'Community technology',
];

export default function AboutPage() {
  const { data: timeline = [], isLoading } = useQuery({
    queryKey: ['timeline'],
    queryFn: getTimeline
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <SEO
        title="About"
        description="Experience and capabilities of Koffi Cobbin — building practical systems across software, hardware, and impact."
        url="https://kofficobbin.com/about"
      />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-line pb-8 sm:pb-10"
      >
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">About / CV</p>
            <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">Koffi Cobbin</h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-muted">Maker · engineer · builder</p>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
              I build practical systems across software, hardware, and impact—turning complex
              operational problems into tools people can use in the real world.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden inline-flex min-h-11 w-fit items-center gap-2 border border-ink px-4 py-2.5 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            <Printer size={16} strokeWidth={1.75} aria-hidden="true" />
            Print / save PDF
          </button>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,1fr)_220px] md:gap-16">
        <main>
          <section aria-labelledby="experience-heading">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h2 id="experience-heading" className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Experience</h2>
              <span className="text-xs font-medium text-muted/70">2016 — present</span>
            </div>

            {isLoading ? (
              <div className="mt-8 space-y-8 animate-pulse">
                <div className="h-24 bg-line/50"></div>
                <div className="h-24 bg-line/50"></div>
              </div>
            ) : (
              <Timeline entries={timeline} />
            )}
          </section>
        </main>

        <aside>
          <figure className="max-w-[220px]">
            <img
              src={profileImage}
              alt="Profile portrait"
              className="block aspect-square w-full object-cover"
            />
            <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Based at the intersection of physical and digital systems
            </figcaption>
            <div className="mt-4 flex items-center gap-2 print:hidden">
              <a
                href="https://github.com/Koffi-Cobbin"
                target="_blank"
                rel="noreferrer"
                aria-label="Koffi Cobbin on GitHub"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                data-testid="link-about-github"
              >
                <Github size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/elijah-ocupualor-588734180"
                target="_blank"
                rel="noreferrer"
                aria-label="Koffi Cobbin on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                data-testid="link-about-linkedin"
              >
                <Linkedin size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                href="https://x.com/koffi_cobbin"
                target="_blank"
                rel="noreferrer"
                aria-label="Koffi Cobbin on X"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                data-testid="link-about-x"
              >
                <FaXTwitter size={16} aria-hidden="true" />
              </a>
            </div>
          </figure>

          <section className="mt-10 border-t border-line pt-5" aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Capabilities</h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed">
              {capabilities.map((capability) => (
                <li key={capability} className="border-b border-line/70 pb-2">{capability}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}