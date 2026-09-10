import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function ContactCTA() {
  return (
    <section aria-labelledby="cta-heading" className="mt-16 sm:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden border border-line bg-ink p-8 sm:p-12"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-paper/50">
            Next step
          </p>
          <h2
            id="cta-heading"
            className="font-display text-3xl leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl"
          >
            Let's build something.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/70">
            Got a problem that needs solving? A product to ship? A prototype to build?
            I'm always open to conversations about software, hardware, or impact work.
          </p>

          <div className="mt-8 flex flex-col gap-3 text-sm font-medium sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border-2 border-paper bg-paper px-6 py-3 text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
