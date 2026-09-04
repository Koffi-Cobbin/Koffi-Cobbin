import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '@/lib/api';
import { motion } from 'framer-motion';

const schema = z.object({
  name: z.string().min(1, 'Enter your name.'),
  email: z.string().email('Enter a valid email.'),
  message: z.string().min(10, 'Message needs a bit more detail.'),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: ''
    }
  });

  async function onSubmit(values: FormValues) {
    setStatus('sending');
    const result = await submitContact({ ...values, honeypot: values.honeypot ?? '' });
    if (result.ok) {
      setStatus('sent');
      reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? 'Something went wrong. Try again.');
    }
  }

  if (status === 'sent') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-8 border border-line bg-white/50 text-center"
      >
        <p className="font-display text-2xl">Message sent.</p>
        <p className="mt-3 text-muted">I'll get back to you soon.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)} 
       className="mt-6 flex max-w-xl flex-col gap-4 sm:mt-8 sm:gap-5"
    >
      <div className="hidden">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input id="honeypot" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div className="group">
        <label htmlFor="name" className="text-sm font-medium text-ink transition-colors">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
           className="mt-1.5 w-full border border-line bg-transparent px-4 py-2.5 text-base outline-none transition-all focus:border-ink focus:bg-white focus:ring-1 focus:ring-ink sm:mt-2 sm:py-3"
           aria-invalid={!!errors.name}
           aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="mt-2 text-sm font-medium text-red-600">{errors.name.message}</p>}
      </div>

      <div className="group">
        <label htmlFor="email" className="text-sm font-medium text-ink transition-colors">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
           className="mt-1.5 w-full border border-line bg-transparent px-4 py-2.5 text-base outline-none transition-all focus:border-ink focus:bg-white focus:ring-1 focus:ring-ink sm:mt-2 sm:py-3"
           aria-invalid={!!errors.email}
           aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>}
      </div>

      <div className="group">
        <label htmlFor="message" className="text-sm font-medium text-ink transition-colors">
          Message
        </label>
        <textarea
          id="message"
           rows={4}
          {...register('message')}
           className="mt-1.5 w-full resize-none border border-line bg-transparent px-4 py-2.5 text-base outline-none transition-all focus:border-ink focus:bg-white focus:ring-1 focus:ring-ink sm:mt-2 sm:py-3"
           aria-invalid={!!errors.message}
           aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
           <p id="message-error" className="mt-2 text-sm font-medium text-red-600">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && <p className="text-sm text-red-600 font-medium">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 min-h-11 w-full border-2 border-ink bg-ink px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition-all hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 sm:mt-3 sm:w-fit sm:py-3"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </motion.form>
  );
}