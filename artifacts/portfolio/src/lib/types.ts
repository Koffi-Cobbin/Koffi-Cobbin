export interface Discipline {
  slug: string;
  name: string;
  description: string;
  theme_color: string; // hex
  icon_ref: string | null;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  summary: string;
  cover_image: string;
  discipline: string; // discipline slug
  is_featured: boolean;
  tech_stack: string[];
  date: string; // ISO date
}

export interface ProjectLinks {
  repo?: string;
  live_demo?: string;
  video?: string;
}

export interface Project extends ProjectSummary {
  body: string; // rendered HTML from Wagtail StreamField
  gallery: string[];
  links: ProjectLinks;
  model_3d: string | null; // .glb URL, hardware projects only
}

export interface TimelineEntry {
  title: string;
  organization: string;
  date_range: string;
  description: string;
  discipline: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}