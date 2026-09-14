import { TimelineEntry } from '@/lib/types';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative mt-8">
      <div className="absolute left-[5px] top-3 bottom-0 w-px bg-line/80"></div>
      <ol className="flex flex-col gap-10">
        {entries.map((entry, i) => (
          <motion.li 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative pl-8"
          >
            <div className="absolute left-[-1px] top-2 h-3 w-3 rounded-full bg-ink outline outline-4 outline-paper"></div>
            <p className="text-xs font-bold tracking-widest text-muted/80 uppercase">{entry.date_range}</p>
            <h3 className="font-display mt-2 text-2xl tracking-tight leading-snug">{entry.title}</h3>
            <p className="text-sm font-medium mt-1 text-ink/80">{entry.organization}</p>
            <p className="mt-3 text-muted leading-relaxed max-w-prose text-[15px]">{entry.description}</p>

            {entry.tech_stack && entry.tech_stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block rounded-full border border-line bg-paper px-2.5 py-0.5 text-[11px] font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {entry.links && (
              <div className="mt-3 flex flex-wrap gap-3">
                {entry.links.live_demo && (
                  <a
                    href={entry.links.live_demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 transition-colors hover:text-ink"
                  >
                    Live demo <ExternalLink size={10} strokeWidth={2} />
                  </a>
                )}
                {entry.links.repo && (
                  <a
                    href={entry.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 transition-colors hover:text-ink"
                  >
                    Source code <ExternalLink size={10} strokeWidth={2} />
                  </a>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
