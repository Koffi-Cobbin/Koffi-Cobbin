import { TimelineEntry } from '@/lib/types';

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="mt-8 flex flex-col gap-8">
      {entries.map((entry, i) => (
        <li key={i} className="border-l border-line pl-6">
          <p className="text-sm text-muted">{entry.date_range}</p>
          <h3 className="font-display mt-1 text-lg">{entry.title}</h3>
          <p className="text-sm text-muted">{entry.organization}</p>
          <p className="mt-2 max-w-prose text-sm">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}
