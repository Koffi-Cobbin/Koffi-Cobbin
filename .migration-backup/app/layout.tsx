import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Font Configuration ──────────────────────────────────────────────
const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// ─── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Koffi Cobbin — Portfolio',
    template: '%s | Koffi Cobbin',
  },
  description:
    'Fullstack web development, hardware engineering, and impact projects by Koffi Cobbin.',
  keywords: [
    'portfolio',
    'web development',
    'hardware engineering',
    'fullstack',
    'React',
    'Next.js',
    'IoT',
    'sustainability',
  ],
  authors: [{ name: 'Koffi Cobbin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Koffi Cobbin Portfolio',
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body flex min-h-screen flex-col bg-paper text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
