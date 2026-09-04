import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink">
            Let's Work Together
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            Have a project in mind? Whether it's software development, hardware
            engineering, or an impact-driven initiative, I'd love to hear about it.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Form */}
          <div>
            <h2 className="font-display text-2xl text-ink mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Right: Contact Info */}
          <div>
            <h2 className="font-display text-2xl text-ink mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-software-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-software-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Email</h3>
                  <p className="text-sm text-muted">ocupualorelijah@gmail.com</p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-ink/5 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">GitHub</h3>
                  <p className="text-sm text-muted">github.com/Koffi-Cobbin</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-impact-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-impact-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Location</h3>
                  <p className="text-sm text-muted">Available for remote work worldwide</p>
                </div>
              </div>
            </div>

            {/* Additional note */}
            <div className="mt-8 p-4 bg-paper-dark rounded-lg border border-line">
              <p className="text-sm text-muted leading-relaxed">
                <strong className="text-ink">Open to collaborations</strong> — I'm
                particularly interested in projects that combine technology with
                sustainability, education, or community impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
