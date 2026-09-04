'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please provide a bit more detail (at least 10 characters).'),
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
      setErrorMessage(result.error ?? 'Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-8 p-6 bg-impact-50 border border-impact-200 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-impact-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg text-impact-800">Message Sent!</h3>
            <p className="mt-1 text-sm text-impact-700">
              Thank you for reaching out. I'll get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-lg space-y-6">
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          id="honeypot"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full px-4 py-3 bg-white border rounded-lg text-ink placeholder-muted-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            errors.name
              ? 'border-hardware-500 focus:ring-hardware-500'
              : 'border-line focus:ring-software-500 focus:border-software-500'
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-hardware-600 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-3 bg-white border rounded-lg text-ink placeholder-muted-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            errors.email
              ? 'border-hardware-500 focus:ring-hardware-500'
              : 'border-line focus:ring-software-500 focus:border-software-500'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-hardware-600 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`w-full px-4 py-3 bg-white border rounded-lg text-ink placeholder-muted-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none ${
            errors.message
              ? 'border-hardware-500 focus:ring-hardware-500'
              : 'border-line focus:ring-software-500 focus:border-software-500'
          }`}
          placeholder="Tell me about your project or question..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-hardware-600 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="p-4 bg-hardware-50 border border-hardware-200 rounded-lg">
          <p className="text-sm text-hardware-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Privacy note */}
      <p className="text-xs text-muted text-center">
        Your information will only be used to respond to your message.
      </p>
    </form>
  );
}
