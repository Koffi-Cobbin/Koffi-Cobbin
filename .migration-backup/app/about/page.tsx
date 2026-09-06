import { getTimeline } from '@/lib/api';
import Timeline from '@/components/Timeline';

export default async function AboutPage() {
  const timeline = await getTimeline();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl">About</h1>
      <p className="mt-4 max-w-prose text-muted">
        Bio content goes here — replace with real copy once available.
      </p>

      <Timeline entries={timeline} />
    </div>
  );
}
