import { Discipline, Project, ProjectSummary, TimelineEntry } from '@/lib/types';

export const disciplines: Discipline[] = [
  {
    slug: 'software',
    name: 'Software',
    description: 'Fullstack web applications, from product idea to shipped code.',
    theme_color: '#3b5bdb',
    icon_ref: null,
  },
  {
    slug: 'hardware',
    name: 'Hardware',
    description: 'Physical products and embedded systems, prototyped and built by hand.',
    theme_color: '#c2410c',
    icon_ref: null,
  },
  {
    slug: 'impact',
    name: 'Impact',
    description: 'Projects built to move a real outcome for a real community.',
    theme_color: '#0f7a4d',
    icon_ref: null,
  },
];

export const projects: Project[] = [
  {
    slug: 'realtime-ops-dashboard',
    title: 'Realtime Ops Dashboard',
    summary: 'A live operations dashboard used by a 40-person logistics team.',
    cover_image: 'https://placehold.co/1200x800/3b5bdb/fafaf9?text=Ops+Dashboard',
    discipline: 'software',
    is_featured: true,
    tech_stack: ['Next.js', 'Django', 'WebSockets', 'PostgreSQL'],
    date: '2025-11-02',
    body: '<p>Placeholder case-study body — replace with real content once Wagtail is live.</p>',
    gallery: [],
    links: { repo: 'https://github.com/example/ops-dashboard', live_demo: 'https://example.com' },
    model_3d: null,
  },
  {
    slug: 'field-ready-sensor-kit',
    title: 'Field-Ready Sensor Kit',
    summary: 'A ruggedized environmental sensor kit for off-grid field research.',
    cover_image: 'https://placehold.co/1200x800/c2410c/fafaf9?text=Sensor+Kit',
    discipline: 'hardware',
    is_featured: true,
    tech_stack: ['KiCad', 'STM32', '3D printing'],
    date: '2025-08-14',
    body: '<p>Placeholder case-study body — replace with real content once Wagtail is live.</p>',
    gallery: [],
    links: {},
    model_3d: null,
  },
  {
    slug: 'clean-water-access-map',
    title: 'Clean Water Access Map',
    summary: 'A crowdsourced map used to route repair crews to failing wells.',
    cover_image: 'https://placehold.co/1200x800/0f7a4d/fafaf9?text=Water+Access+Map',
    discipline: 'impact',
    is_featured: true,
    tech_stack: ['React Native', 'Django', 'PostGIS'],
    date: '2025-05-20',
    body: '<p>Placeholder case-study body — replace with real content once Wagtail is live.</p>',
    gallery: [],
    links: { live_demo: 'https://example.com' },
    model_3d: null,
  },
];

export const timeline: TimelineEntry[] = [
  {
    title: 'Founded independent studio',
    organization: 'Self-employed',
    date_range: '2023 — present',
    description: 'Operating as an independent consultant and builder, shipping production software and developing early-stage hardware prototypes for clients in logistics, environmental monitoring, and community tech.',
    discipline: null,
  },
  {
    title: 'Senior Engineer',
    organization: 'CivicTech Foundation',
    date_range: '2019 — 2023',
    description: 'Led a team of 4 engineers building geospatial data platforms used by municipal governments to map and allocate resources for infrastructure repair.',
    discipline: 'software',
  },
  {
    title: 'Embedded Systems Developer',
    organization: 'OceanOps',
    date_range: '2016 — 2019',
    description: 'Designed and programmed STM32-based telemetry buoys deployed in coastal waters. Handled schematic capture, firmware development in C, and mechanical enclosures.',
    discipline: 'hardware',
  },
];

export function projectSummaries(list: Project[]): ProjectSummary[] {
  return list.map(({ body, gallery, links, model_3d, ...summary }) => summary);
}