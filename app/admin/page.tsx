import Link from "next/link";
import {
  getProfile,
  getSkills,
  getProjects,
  getCareer,
  getEducation,
  getLanguages,
} from "@/lib/content";

export const dynamic = "force-dynamic";

const sections = [
  { href: "/admin/profile", label: "Profile", desc: "Name, role, summary, and links" },
  { href: "/admin/skills", label: "Skills", desc: "Skill groups and their items" },
  { href: "/admin/projects", label: "Projects", desc: "Case studies and personal builds" },
  { href: "/admin/career", label: "Career", desc: "Work history" },
  { href: "/admin/education", label: "Education & languages", desc: "Schooling and languages" },
];

export default async function AdminOverview() {
  const [profile, skills, projects, career, education, languages] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getCareer(),
      getEducation(),
      getLanguages(),
    ]);

  const counts: Record<string, number> = {
    "/admin/skills": skills.length,
    "/admin/projects": projects.length,
    "/admin/career": career.length,
    "/admin/education": education.length + languages.length,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-100">
        Welcome back{profile.name ? `, ${profile.name}` : ""}.
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Pick a section to edit. Changes go live immediately.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-medium text-neutral-100">{s.label}</span>
              {counts[s.href] !== undefined && (
                <span className="text-sm text-neutral-500">
                  {counts[s.href]}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
            <span className="mt-3 inline-block text-sm text-amber-400 opacity-0 transition-opacity group-hover:opacity-100">
              Edit →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
