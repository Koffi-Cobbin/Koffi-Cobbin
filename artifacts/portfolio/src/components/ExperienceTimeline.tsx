import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimeline } from '@/lib/api';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const disciplineColors: Record<string, string> = {
  software: '#3b5bdb',
  hardware: '#c2410c',
  impact: '#0f7a4d',
};

export default function ExperienceTimeline() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const { data: timeline = [], isLoading } = useQuery({
    queryKey: ['timeline'],
    queryFn: getTimeline,
  });

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (isLoading || timeline.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="experience-heading">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-4 sm:mb-8">
        <h2 id="experience-heading" className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
          Experience
        </h2>
        <span className="text-xs text-muted">{timeline.length} roles</span>
      </div>

      <div className="relative">
        {/* Vertical line - offset to the left */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[30%] sm:-translate-x-px" />

        <div className="space-y-8">
          {timeline.map((entry, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <motion.div
                key={`${entry.organization}-${entry.date_range}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="relative flex gap-6 sm:gap-0"
              >
                {/* Dot */}
                <div className="relative z-10 mt-1.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center sm:left-[30%] sm:-translate-x-1/2 sm:absolute">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entry.discipline ? disciplineColors[entry.discipline] : 'var(--color-muted)' }}
                  />
                </div>

                {/* Left side - Logo + Date */}
                <div className="hidden w-[30%] pr-8 sm:block">
                  <div className="flex flex-col items-end gap-3">
                    {entry.logo && (
                      <img
                        src={entry.logo}
                        alt={`${entry.organization} logo`}
                        className="h-10 w-auto object-contain opacity-80"
                        loading="lazy"
                      />
                    )}
                    <p className="font-mono text-xs text-muted">{entry.date_range}</p>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="min-w-0 flex-1 pl-8 sm:w-[70%] sm:pl-8">
                  <p className="font-mono text-xs text-muted sm:hidden">{entry.date_range}</p>
                  <h3 className="mt-1 font-display text-lg leading-tight text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-muted">
                    {entry.organization}
                  </p>
                  
                  {/* Description - hidden on mobile unless expanded */}
                  <div className={`mt-3 max-w-lg text-sm leading-relaxed text-muted/80 sm:block ${isExpanded ? 'block' : 'hidden'}`}>
                    {entry.description}
                  </div>

                  {/* View more button - mobile only */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-ink sm:hidden"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'View less' : 'View more'}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
