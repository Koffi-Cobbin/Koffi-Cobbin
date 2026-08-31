import { Discipline, Project, ProjectSummary, TimelineEntry } from '@/lib/types';
import { disciplines, projects, timeline, projectSummaries } from '@/mocks/data';

// Central data-access layer. Every page imports from here, never fetches
// directly — so wiring in the real Django/Wagtail API later (see Backend.md)
// is a change confined to this one file.
//
// Set NEXT_PUBLIC_API_URL to point at the real backend. Until then, every
// function falls back to mocks/data.ts, matching the same response shapes.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchJSON<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error('[api]', err);
    return null;
  }
}

export async function getDisciplines(): Promise<Discipline[]> {
  return (await fetchJSON<Discipline[]>('/api/disciplines/')) ?? disciplines;
}

export async function getProjects(opts?: {
  discipline?: string;
  featured?: boolean;
}): Promise<ProjectSummary[]> {
  const params = new URLSearchParams();
  if (opts?.discipline) params.set('discipline', opts.discipline);
  if (opts?.featured !== undefined) params.set('featured', String(opts.featured));

  const remote = await fetchJSON<ProjectSummary[]>(`/api/projects/?${params.toString()}`);
  if (remote) return remote;

  let list = projects;
  if (opts?.discipline) list = list.filter((p) => p.discipline === opts.discipline);
  if (opts?.featured !== undefined) list = list.filter((p) => p.is_featured === opts.featured);
  return projectSummaries(list);
}

export async function getProject(slug: string): Promise<Project | null> {
  const remote = await fetchJSON<Project>(`/api/projects/${slug}/`);
  if (remote) return remote;
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  return (await fetchJSON<TimelineEntry[]>('/api/timeline/')) ?? timeline;
}

export async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!API_URL) {
    // No backend configured yet — simulate success so the form flow is
    // testable end-to-end before the real endpoint exists.
    console.warn('[api] NEXT_PUBLIC_API_URL not set — contact form is mocked.');
    return { ok: true };
  }
  try {
    const res = await fetch(`${API_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data?.detail ?? 'Something went wrong. Try again.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not reach the server. Try again shortly.' };
  }
}
