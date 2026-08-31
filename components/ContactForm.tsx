'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1, 'Enter your name.'),
  email: z.string().email('Enter a valid email.'),
  message: z.string().min(10, 'Message needs a bit more detail.'),
  honeypot: z.string().max(0).optional(), // must stay empty; bots fill it in
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
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

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
    return <p className="mt-8 text-sm">Message sent. I'll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-md flex-col gap-5">
      <div className="hidden">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input id="honeypot" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2"
        />
        {errors.name && <p className="mt-1 text-sm text-accent-hardware">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2"
        />
        {errors.email && <p className="mt-1 text-sm text-accent-hardware">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-accent-hardware">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && <p className="text-sm text-accent-hardware">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="border border-ink px-5 py-2 text-sm disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending' : 'Send message'}
      </button>
    </form>
  );
}
