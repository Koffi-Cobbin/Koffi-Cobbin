import { getTimeline } from '@/lib/api';
import Timeline from '@/components/Timeline';

export default async function AboutPage() {
  const timeline = await getTimeline();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-paper to-paper-dark">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            About
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink">
            Koffi Cobbin
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            Fullstack developer and hardware engineer with a passion for building
            technology that creates positive impact. I work across the entire stack—from
            crafting elegant user interfaces to designing physical products that solve
            real-world problems.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Bio */}
          <div>
            <h2 className="font-display text-2xl text-ink mb-6">
              Background
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                With expertise spanning software development, hardware engineering,
                and sustainability-focused projects, I bring a unique perspective to
                every project. My work sits at the intersection of technology and
                human impact.
              </p>
              <p>
                Whether it's building scalable web applications, designing IoT devices,
                or creating solutions for environmental challenges, I'm driven by the
                belief that technology should serve people and planet.
              </p>
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <h2 className="font-display text-2xl text-ink mb-6">
              Skills & Expertise
            </h2>

            {/* Software Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-software-600 uppercase tracking-wider mb-3">
                Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'Tailwind CSS'].map((skill) => (
                  <span key={skill} className="tag-software">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Hardware Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-hardware-600 uppercase tracking-wider mb-3">
                Hardware
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Arduino', 'Raspberry Pi', 'IoT', 'PCB Design', '3D Printing', 'Sensors'].map((skill) => (
                  <span key={skill} className="tag-hardware">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Skills */}
            <div>
              <h3 className="text-sm font-semibold text-impact-600 uppercase tracking-wider mb-3">
                Impact
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Sustainability', 'Environmental Monitoring', 'Data Analysis', 'Community Tech'].map((skill) => (
                  <span key={skill} className="tag-impact">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-paper-dark/50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <h2 className="font-display text-3xl text-ink mb-12 text-center">
            Experience & Journey
          </h2>
          <Timeline entries={timeline} />
        </div>
      </section>
    </div>
  );
}
