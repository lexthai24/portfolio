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
  order?: number;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    framed?: boolean;
  };
  gallery?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    framed?: boolean;
  }>;
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

const RICHGN_PROJECT_DETAILS: Pick<
  Project,
  | "title"
  | "tags"
  | "blurb"
  | "problem"
  | "approach"
  | "outcome"
  | "challenges"
  | "highlights"
  | "stack"
  | "demo"
  | "gallery"
> = {
  title: "RichGN — Direct-Selling Commerce & Financial Operations Platform",
  tags: ["Full-stack", "E-commerce", "MLM", "Fintech", "Realtime"],
  blurb:
    "An end-to-end direct-selling and MLM commerce platform for dietary supplements, connecting member sales, referral networks, commissions, multi-wallet accounting, and back-office operations across member, admin, and Mobile Company portals.",
  problem:
    "The business needed one reliable system for product sales, member relationships, referrals, commissions, wallet balances, fulfilment, and operational controls. The hard part was keeping every financial and network action consistent, traceable, and safe to retry while serving different workflows for members, administrators, and Mobile Company operators.",
  approach:
    "I owned the work from requirements and workflow mapping through product design, architecture, implementation, production deployment, and ongoing operations. The solution is split into a member portal, an administrative back office, and a permission-controlled Mobile Company portal, backed by explicit ledger records, audited state transitions, and database-side reporting. It supports Thai, English, and Lao experiences and keeps high-impact financial mutations idempotent with safe compensating transactions.",
  outcome:
    "A working production platform covering the full journey from signup and KYC through supplement discovery, package purchase, referrals, commission calculation, wallet movement, withdrawals, fulfilment, reporting, and operational review. It also includes a retention-oriented inactivity Flush System with warning, lock, grace-period, reactivation, dry-run, and audit controls.",
  challenges: [
    "Member portal: secure signup, sign-in, password recovery, referral links, guided onboarding, Thai/English/Lao, profile and address management, bank accounts, identity documents, KYC review, notifications, and web-push subscriptions.",
    "Network operations: binary-tree visualisation, team structure, direct-referral tracking, member directory, downline activity, upline exploration, placement review, rank management, and bounded hierarchy rendering.",
    "Commerce: product catalogue, cart, checkout, package purchase, order history, fulfilment, shipping labels, barcodes, QR codes, PDF output, bulk labels, and Flash fulfilment webhooks.",
    "Multi-wallet accounting: Cash, RP, CR, Bonus, and pending balances with before/after values, source references, idempotency keys, reconciliation, and safe reversal workflows.",
    "Commission engine: Direct Referral Bonus, Weak Leg Bonus, Matching Bonus, Global Share, and Mobile Company Bonus with daily/monthly schedules, RP/PV/BV tracking, CR limits, and rank gates.",
    "Payment rails: bank-transfer deposits with slip history, Cash and USDT withdrawals, NowPayments integration, signed webhook processing, payout handling, status tracking, and reconciliation.",
    "Retention and Flush System: activity tracking, 30-day warnings, 60-day Matching Bonus lock, 90-day PV/binary lock and one-rank reduction, 180-day wallet flush, 365-day suspension/archive, grace periods, reactivation, notifications, and append-only audit events.",
    "Admin controls: secure administrator access, dashboard metrics, KYC and deposit review, withdrawal approval, payout controls, refund and cancellation workflows, member-tier overrides, audit logs, KPI monitoring, notification templates, and operational calculators.",
    "Binary traversal: recursive PostgreSQL CTEs walk the bounded hierarchy in O(k) for k returned nodes plus O(h) recursion depth, with indexed parent/position lookups instead of recursive application-side N+1 queries.",
    "Commission batches: each run is O(m × l) for m qualifying members and a bounded commission depth l, effectively O(m) for the four-level Matching Bonus; ledger writes and idempotency checks are batched.",
    "Reporting and history: keyset pagination is O(log n + p) for an indexed dataset of n rows and page size p, avoiding the growing O(n) skip cost of offset pagination; reconciliation is O(t) over the selected transaction set t with indexed joins.",
    "Flush and notifications: the worker evaluates eligible members in O(c) after indexed candidate selection, applies each state transition once, and dispatches notification batches in O(c); cached rate and KPI reads stay O(1) for hot values.",
  ],
  highlights: [
    "Member portal: wallets, KYC, referrals, network views, products, orders, deposits, withdrawals, reports, and notifications.",
    "Financial engine: Cash, RP, CR, Bonus, pending balances, ledger history, reconciliation, reversal, and idempotency.",
    "Commission operations: DRB, WLB, Matching Bonus, Global Share, Mobile Company Bonus, rank gates, and scheduled processing.",
    "Retention controls: inactivity Flush System, grace period, commission hold, reactivation, dry-run, audit trail, and operational dashboard.",
    "Admin back office: KYC, deposits, withdrawals, payouts, products, fulfilment, reports, audit logs, KPI, and system controls.",
    "Mobile Company: scoped organisation dashboard, binary network, upline, members, orders, bonuses, and leaderboard reporting.",
    "Engineering: TypeScript, Next.js, React, Tailwind CSS, PostgreSQL/Supabase, Prisma, Docker, PM2, and Nginx.",
    "Performance: recursive CTEs, database-side aggregation, keyset pagination, indexes, batch notifications, and cached rate calculations.",
    "Safety: explicit ledger records, before/after balances, compensating transactions, signed webhooks, auditability, and retry-safe mutations.",
  ],
  stack: [
    "TypeScript",
    "Next.js",
    "React",
    "Tailwind CSS",
    "PostgreSQL / Supabase",
    "Prisma",
    "Docker",
    "PM2 / Nginx",
    "WebSockets",
    "NowPayments",
  ],
  demo: "https://richgn.com",
  gallery: [
    {
      src: "/projects/richgn-member-portal.png",
      alt: "RichGlobal member portal dashboard showing Cash, RP, CR, and Bonus wallets",
      width: 1916,
      height: 906,
      framed: true,
    },
    {
      src: "/projects/richgn-flush-system.png",
      alt: "RichGlobal admin Flush System dashboard showing retention and inactivity states",
      width: 1919,
      height: 911,
      framed: true,
    },
  ],
};

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
    order: r.order,
    image: r.imageSrc
      ? {
          src: r.imageSrc,
          alt: r.imageAlt ?? "",
          width: r.imageWidth ?? 1200,
          height: r.imageHeight ?? 800,
          framed: r.imageFramed,
        }
      : undefined,
    gallery: undefined,
    link: r.linkHref
      ? { label: r.linkLabel ?? "Link", href: r.linkHref }
      : undefined,
  })).map((project) =>
    project.title.toLowerCase().includes("richglobal") ||
    project.title.toLowerCase().includes("richgn")
      ? { ...project, ...RICHGN_PROJECT_DETAILS }
      : project,
  );
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
