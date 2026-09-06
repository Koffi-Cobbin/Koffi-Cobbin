import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <SEO
        title="Contact"
        description="Get in touch with Koffi Cobbin for software, hardware, or impact projects."
        url="https://kofficobbin.com/contact"
      />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16"
      >
        <div className="lg:pr-6">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Let’s build something useful</p>
          <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">Contact</h1>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
            Working on something in software, hardware, or impact? Send a message.
          </p>

          <div className="mt-10 border-t border-line pt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">A good place to start</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Tell me what you’re making, where it’s stuck, and what a useful outcome looks like.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/70">
              <span>Software</span>
              <span>Hardware</span>
              <span>Impact</span>
            </div>
          </div>
        </div>

        <div className="border border-line bg-white/35 p-5 sm:p-7">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Start a conversation</p>
              <p className="mt-1 text-sm text-muted">I’ll get back to you as soon as I can.</p>
            </div>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-muted/70 sm:block">01 / 01</span>
          </div>
          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
}