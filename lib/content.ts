import "server-only";
import { prisma } from "./prisma";

// ─── Shapes consumed by the components (unchanged from the old lib/data.ts) ───

export type ProjectKind = "Personal project" | "Client project" | "Open source";

export type Project = {
  id: number;
  title: string;
  kind: ProjectKind;
  nda: boolean;
  year: string;
  priority?: number;
  tags: string[];
  blurb: string;
  problem: string;
  approach: string;
  outcome: string;
  challenges?: string[];
  highlights?: string[];
  stack: string[];
  status?: string;
  demo?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    framed?: boolean;
  };
  link?: { label: string; href: string };
};

export type Profile = {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  summary: string;
  currently: string;
  email: string;
  github: string;
  telegram: string;
  telegramHandle: string;
  website: string;
  available: boolean;
};

export type SkillGroup = { id: number; group: string; items: string[] };
export type CareerEntry = {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};
export type Education = { id: number; school: string; detail: string };
export type Language = { id: number; name: string; level: string };

// ─── Fallback profile so pages render even before the DB is seeded ───

const FALLBACK_PROFILE: Profile = {
  name: "Portfolio",
  handle: "",
  role: "Software Engineer",
  tagline: "",
  location: "",
  summary: "",
  currently: "",
  email: "",
  github: "",
  telegram: "",
  telegramHandle: "",
  website: "",
  available: false,
};

const asStrings = (v: unknown): string[] =>
  Array.isArray(v) ? (v as unknown[]).map((x) => String(x)) : [];

// ─── Readers (server-only) ───

// If the DB is unreachable (e.g. build time with no connection), degrade to
// empty content instead of throwing, so pages still render.
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("content query failed, using fallback:", e);
    return fallback;
  }
}

export async function getProfile(): Promise<Profile> {
  return safe(async () => {
    const p = await prisma.profile.findUnique({ where: { id: 1 } });
    if (!p) return FALLBACK_PROFILE;
    const { id, updatedAt, ...rest } = p;
    return rest;
  }, FALLBACK_PROFILE);
}

export async function getSkills(): Promise<SkillGroup[]> {
  return safe(async () => {
    const rows = await prisma.skillGroup.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({ id: r.id, group: r.group, items: asStrings(r.items) }));
  }, []);
}

export async function getProjects(): Promise<Project[]> {
  return safe(async () => {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    kind: r.kind as ProjectKind,
    nda: r.nda,
    year: r.year,
    priority: r.priority,
    tags: asStrings(r.tags),
    blurb: r.blurb,
    problem: r.problem,
    approach: r.approach,
    outcome: r.outcome,
    challenges: asStrings(r.challenges),
    highlights: asStrings(r.highlights),
    stack: asStrings(r.stack),
    status: r.status ?? undefined,
    demo: r.demo ?? undefined,
    image: r.imageSrc
      ? {
          src: r.imageSrc,
          alt: r.imageAlt ?? "",
          width: r.imageWidth ?? 1200,
          height: r.imageHeight ?? 800,
          framed: r.imageFramed,
        }
      : undefined,
    link: r.linkHref
      ? { label: r.linkLabel ?? "Link", href: r.linkHref }
      : undefined,
  }));
  }, []);
}

export async function getCareer(): Promise<CareerEntry[]> {
  return safe(async () => {
    const rows = await prisma.careerEntry.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({
      id: r.id,
      company: r.company,
      role: r.role,
      period: r.period,
      location: r.location,
      points: asStrings(r.points),
    }));
  }, []);
}

export async function getEducation(): Promise<Education[]> {
  return safe(async () => {
    const rows = await prisma.education.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({ id: r.id, school: r.school, detail: r.detail }));
  }, []);
}

export async function getLanguages(): Promise<Language[]> {
  return safe(async () => {
    const rows = await prisma.language.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({ id: r.id, name: r.name, level: r.level }));
  }, []);
}
