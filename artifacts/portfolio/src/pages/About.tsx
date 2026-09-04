import { useQuery } from '@tanstack/react-query';
import { getTimeline } from '@/lib/api';
import Timeline from '@/components/Timeline';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { data: timeline = [], isLoading } = useQuery({
    queryKey: ['timeline'],
    queryFn: getTimeline
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">A little context</p>
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">About</h1>
        
        <div className="mt-8 max-w-prose space-y-6 text-base font-medium leading-relaxed text-ink/80 sm:mt-10 sm:text-lg">
          <p>
            I am a maker and engineer focused on the intersection of physical and digital systems. 
            My work spans robust web infrastructure, tactile embedded devices, and tools designed 
            to solve real problems on the ground.
          </p>
          <p>
            This portfolio is a living document of that process—a collection of things I've built, 
            the tools I've used, and the outcomes they've driven.
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="mt-24 space-y-12 animate-pulse">
          <div className="h-24 bg-line/50"></div>
          <div className="h-24 bg-line/50"></div>
        </div>
      ) : (
        <div className="mt-16 sm:mt-24">
          <h2 className="text-sm font-bold tracking-widest text-muted uppercase mb-8">Experience</h2>
          <Timeline entries={timeline} />
        </div>
      )}
    </div>
  );
}