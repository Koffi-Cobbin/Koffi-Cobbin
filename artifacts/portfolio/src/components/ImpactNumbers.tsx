import { motion } from 'framer-motion';

const stats = [
  { value: '7+', label: 'Products shipped' },
  { value: '110+', label: 'Students reached' },
  { value: '3', label: 'Communities served' },
  { value: '4+', label: 'Years building' },
];

export default function ImpactNumbers() {
  return (
    <section aria-labelledby="impact-heading">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-4 sm:mb-8">
        <h2 id="impact-heading" className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
          Impact
        </h2>
      </div>

      <div className="flex items-start justify-between gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="flex-1 text-center"
          >
            <p className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
