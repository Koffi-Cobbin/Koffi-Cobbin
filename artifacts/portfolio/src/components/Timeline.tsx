import { TimelineEntry } from '@/lib/types';
import { motion } from 'framer-motion';

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="mt-16 relative">
      <div className="absolute left-[5px] top-3 bottom-0 w-px bg-line/80"></div>
      <ol className="flex flex-col gap-12">
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
            <h3 className="font-display mt-3 text-2xl tracking-tight leading-snug">{entry.title}</h3>
            <p className="text-sm font-medium mt-2 text-ink/80">{entry.organization}</p>
            <p className="mt-4 text-muted leading-relaxed max-w-prose text-[15px]">{entry.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}