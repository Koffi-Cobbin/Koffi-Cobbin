import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl">Contact</h1>
      <p className="mt-4 max-w-prose text-muted">
        Working on something in software, hardware, or impact? Send a message.
      </p>
      <ContactForm />
    </div>
  );
}
