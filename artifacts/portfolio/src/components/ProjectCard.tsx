import { Link } from 'wouter';
import { ProjectSummary } from '@/lib/types';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }: { project: ProjectSummary, index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/work/${project.discipline}/${project.slug}`} className="group flex h-full cursor-pointer flex-col">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-line">
          <img
            src={project.cover_image}
            alt={`${project.title} project cover`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {project.is_featured && (
            <div className="absolute top-3 right-3 bg-paper px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
              Featured
            </div>
          )}
        </div>
        <div className="mt-4 flex-1 sm:mt-5">
          <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-muted">{project.title}</h3>
          <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">{project.summary}</p>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-muted">
          {project.tech_stack.map((tag) => (
          <li key={tag} className="border border-line/70 bg-white/50 px-2 py-1">{tag}</li>
          ))}
        </ul>
      </Link>
    </motion.div>
  );
}