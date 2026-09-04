import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Let’s build something useful</p>
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">Contact</h1>
        <p className="mt-6 max-w-prose text-base font-medium leading-relaxed text-ink/80 sm:mt-8 sm:text-xl">
          Working on something in software, hardware, or impact? Send a message.
        </p>
      </motion.div>
      <ContactForm />
    </div>
  );
}