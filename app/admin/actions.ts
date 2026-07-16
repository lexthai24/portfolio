"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthed,
} from "@/lib/auth";

// Result shape consumed by useActionState on the client → drives the toast.
export type ActionState = { ok: boolean; message: string } | null;

// ─── Auth ───

export async function login(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  if (!checkPassword(pw)) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

async function guard() {
  if (!(await isAuthed())) redirect("/admin/login");
}

function revalidateSite() {
  for (const p of ["/", "/about", "/work", "/projects", "/admin"]) {
    revalidatePath(p);
  }
}

// Wrap a mutation so it always returns an ActionState instead of throwing.
async function run(
  label: string,
  fn: () => Promise<void>,
): Promise<ActionState> {
  try {
    await guard();
    await fn();
    revalidateSite();
    return { ok: true, message: `${label} saved.` };
  } catch (e) {
    console.error(`${label} failed:`, e);
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return { ok: false, message: `Couldn't save ${label.toLowerCase()}: ${message}` };
  }
}

async function runDelete(
  label: string,
  fn: () => Promise<void>,
): Promise<ActionState> {
  try {
    await guard();
    await fn();
    revalidateSite();
    return { ok: true, message: `${label} deleted.` };
  } catch (e) {
    console.error(`Delete ${label} failed:`, e);
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return { ok: false, message: `Couldn't delete: ${message}` };
  }
}

// ─── Helpers ───

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const optStr = (fd: FormData, k: string) => {
  const v = String(fd.get(k) ?? "").trim();
  return v === "" ? null : v;
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";
const int = (fd: FormData, k: string, dflt = 0) => {
  const n = parseInt(String(fd.get(k) ?? ""), 10);
  return Number.isFinite(n) ? n : dflt;
};
// Textareas hold one item per line; blank lines are dropped.
const lines = (fd: FormData, k: string): string[] =>
  String(fd.get(k) ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

// ─── Profile ───

export async function saveProfile(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Profile", async () => {
    const data = {
      name: str(formData, "name"),
      handle: str(formData, "handle"),
      role: str(formData, "role"),
      tagline: str(formData, "tagline"),
      location: str(formData, "location"),
      summary: str(formData, "summary"),
      currently: str(formData, "currently"),
      email: str(formData, "email"),
      github: str(formData, "github"),
      telegram: str(formData, "telegram"),
      telegramHandle: str(formData, "telegramHandle"),
      website: str(formData, "website"),
      available: bool(formData, "available"),
    };
    await prisma.profile.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
  });
}

// ─── Skills ───

export async function saveSkillGroup(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Skill group", async () => {
    const id = int(formData, "id", 0);
    const data = {
      group: str(formData, "group"),
      items: lines(formData, "items"),
      order: int(formData, "order"),
    };
    if (id) await prisma.skillGroup.update({ where: { id }, data });
    else await prisma.skillGroup.create({ data });
  });
}

export async function deleteSkillGroup(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return runDelete("Skill group", async () => {
    await prisma.skillGroup.delete({ where: { id: int(formData, "id") } });
  });
}

// ─── Projects ───

export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Project", async () => {
    const id = int(formData, "id", 0);
    const data = {
      title: str(formData, "title"),
      kind: str(formData, "kind"),
      nda: bool(formData, "nda"),
      year: str(formData, "year"),
      priority: int(formData, "priority", 100),
      tags: lines(formData, "tags"),
      blurb: str(formData, "blurb"),
      problem: str(formData, "problem"),
      approach: str(formData, "approach"),
      outcome: str(formData, "outcome"),
      challenges: lines(formData, "challenges"),
      highlights: lines(formData, "highlights"),
      stack: lines(formData, "stack"),
      status: optStr(formData, "status"),
      demo: optStr(formData, "demo"),
      linkLabel: optStr(formData, "linkLabel"),
      linkHref: optStr(formData, "linkHref"),
      imageSrc: optStr(formData, "imageSrc"),
      imageAlt: optStr(formData, "imageAlt"),
      imageWidth: formData.get("imageWidth") ? int(formData, "imageWidth") : null,
      imageHeight: formData.get("imageHeight") ? int(formData, "imageHeight") : null,
      imageFramed: bool(formData, "imageFramed"),
      order: int(formData, "order"),
    };
    if (id) await prisma.project.update({ where: { id }, data });
    else await prisma.project.create({ data });
  });
}

export async function deleteProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return runDelete("Project", async () => {
    await prisma.project.delete({ where: { id: int(formData, "id") } });
  });
}

// ─── Career ───

export async function saveCareer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Job", async () => {
    const id = int(formData, "id", 0);
    const data = {
      company: str(formData, "company"),
      role: str(formData, "role"),
      period: str(formData, "period"),
      location: str(formData, "location"),
      points: lines(formData, "points"),
      order: int(formData, "order"),
    };
    if (id) await prisma.careerEntry.update({ where: { id }, data });
    else await prisma.careerEntry.create({ data });
  });
}

export async function deleteCareer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return runDelete("Job", async () => {
    await prisma.careerEntry.delete({ where: { id: int(formData, "id") } });
  });
}

// ─── Education ───

export async function saveEducation(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Education", async () => {
    const id = int(formData, "id", 0);
    const data = {
      school: str(formData, "school"),
      detail: str(formData, "detail"),
      order: int(formData, "order"),
    };
    if (id) await prisma.education.update({ where: { id }, data });
    else await prisma.education.create({ data });
  });
}

export async function deleteEducation(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return runDelete("Education", async () => {
    await prisma.education.delete({ where: { id: int(formData, "id") } });
  });
}

// ─── Languages ───

export async function saveLanguage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return run("Language", async () => {
    const id = int(formData, "id", 0);
    const data = {
      name: str(formData, "name"),
      level: str(formData, "level"),
      order: int(formData, "order"),
    };
    if (id) await prisma.language.update({ where: { id }, data });
    else await prisma.language.create({ data });
  });
}

export async function deleteLanguage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return runDelete("Language", async () => {
    await prisma.language.delete({ where: { id: int(formData, "id") } });
  });
}
