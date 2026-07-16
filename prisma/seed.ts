// Seeds Postgres from the original hardcoded content in lib/data.ts.
// Idempotent: clears the content tables and re-inserts. Safe to re-run.
import { PrismaClient } from "@prisma/client";
import {
  profile,
  skills,
  projects,
  career,
  education,
  languages,
} from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  // Wipe content tables (order doesn't matter — no FKs between them).
  await prisma.$transaction([
    prisma.skillGroup.deleteMany(),
    prisma.project.deleteMany(),
    prisma.careerEntry.deleteMany(),
    prisma.education.deleteMany(),
    prisma.language.deleteMany(),
  ]);

  // Profile (singleton, id = 1)
  await prisma.profile.upsert({
    where: { id: 1 },
    create: { id: 1, ...profile },
    update: { ...profile },
  });

  // Skills
  await prisma.skillGroup.createMany({
    data: skills.map((s, i) => ({ group: s.group, items: s.items, order: i })),
  });

  // Projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await prisma.project.create({
      data: {
        title: p.title,
        kind: p.kind,
        nda: p.nda,
        year: p.year,
        priority: p.priority ?? 100,
        tags: p.tags,
        blurb: p.blurb,
        problem: p.problem,
        approach: p.approach,
        outcome: p.outcome,
        challenges: p.challenges ?? [],
        highlights: p.highlights ?? [],
        stack: p.stack,
        status: p.status ?? null,
        demo: p.demo ?? null,
        linkLabel: p.link?.label ?? null,
        linkHref: p.link?.href ?? null,
        imageSrc: p.image?.src ?? null,
        imageAlt: p.image?.alt ?? null,
        imageWidth: p.image?.width ?? null,
        imageHeight: p.image?.height ?? null,
        imageFramed: p.image?.framed ?? false,
        order: i,
      },
    });
  }

  // Career
  await prisma.careerEntry.createMany({
    data: career.map((c, i) => ({
      company: c.company,
      role: c.role,
      period: c.period,
      location: c.location,
      points: c.points,
      order: i,
    })),
  });

  // Education
  await prisma.education.createMany({
    data: education.map((e, i) => ({
      school: e.school,
      detail: e.detail,
      order: i,
    })),
  });

  // Languages
  await prisma.language.createMany({
    data: languages.map((l, i) => ({
      name: l.name,
      level: l.level,
      order: i,
    })),
  });

  const counts = {
    skills: await prisma.skillGroup.count(),
    projects: await prisma.project.count(),
    career: await prisma.careerEntry.count(),
    education: await prisma.education.count(),
    languages: await prisma.language.count(),
  };
  console.log("Seeded:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
