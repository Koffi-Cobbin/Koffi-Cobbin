import { TimelineEntry } from '@/lib/types';

// Discipline-specific dot colors
const disciplineColors: Record<string, string> = {
  software: 'bg-software-500 border-software-200',
  hardware: 'bg-hardware-500 border-hardware-200',
  impact: 'bg-impact-500 border-impact-200',
};

// Discipline-specific line colors
const disciplineLineColors: Record<string, string> = {
  software: 'border-software-200',
  hardware: 'border-hardware-200',
  impact: 'border-impact-200',
};

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-line" />

      <ol className="relative space-y-0">
        {entries.map((entry, i) => {
          const dotColor = disciplineColors[entry.discipline] || disciplineColors.software;
          const lineColor = disciplineLineColors[entry.discipline] || disciplineLineColors.software;

          return (
            <li
              key={i}
              className="relative pl-12 pb-10 last:pb-0 group"
              data-discipline={entry.discipline}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 top-1 w-3 h-3 -translate-x-1.5 rounded-full border-2 ${dotColor} transition-transform group-hover:scale-125`}
              />

              {/* Content card */}
              <div className="bg-white border border-line rounded-lg p-5 shadow-soft hover:shadow-medium transition-shadow">
                {/* Date range */}
                <div className="flex items-center gap-2 mb-2">
                  <time className="text-sm font-medium text-muted">
                    {entry.date_range}
                  </time>
                  {entry.discipline && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                        entry.discipline === 'software'
                          ? 'bg-software-50 text-software-700'
                          : entry.discipline === 'hardware'
                          ? 'bg-hardware-50 text-hardware-700'
                          : 'bg-impact-50 text-impact-700'
                      }`}
                    >
                      {entry.discipline}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-ink group-hover:text-ink-light transition-colors">
                  {entry.title}
                </h3>

                {/* Organization */}
                <p className="mt-1 text-sm font-medium text-muted">
                  {entry.organization}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
