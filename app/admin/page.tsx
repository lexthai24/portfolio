import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import {
  getProfile,
  getSkills,
  getProjects,
  getCareer,
  getEducation,
  getLanguages,
} from "@/lib/content";
import {
  logout,
  saveProfile,
  saveSkillGroup,
  deleteSkillGroup,
  saveProject,
  deleteProject,
  saveCareer,
  deleteCareer,
  saveEducation,
  deleteEducation,
  saveLanguage,
  deleteLanguage,
} from "./actions";
import {
  Field,
  Area,
  ListArea,
  Checkbox,
  SaveButton,
  DeleteButton,
  Card,
  SectionTitle,
} from "./ui";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const [profile, skills, projects, career, education, languages] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getCareer(),
      getEducation(),
      getLanguages(),
    ]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <h1 className="text-base font-semibold text-neutral-100">
            Portfolio admin
          </h1>
          <nav className="hidden gap-4 text-xs text-neutral-500 sm:flex">
            <a href="#profile" className="hover:text-neutral-200">Profile</a>
            <a href="#skills" className="hover:text-neutral-200">Skills</a>
            <a href="#projects" className="hover:text-neutral-200">Projects</a>
            <a href="#career" className="hover:text-neutral-200">Career</a>
            <a href="#education" className="hover:text-neutral-200">Education</a>
            <a href="#languages" className="hover:text-neutral-200">Languages</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a
            href="/"
            target="_blank"
            className="text-neutral-400 hover:text-neutral-100"
          >
            View site ↗
          </a>
          <form action={logout}>
            <button className="text-neutral-400 hover:text-neutral-100">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-32">
        {/* ── Profile ── */}
        <SectionTitle title="Profile" />
        <Card>
          <form action={saveProfile} className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" defaultValue={profile.name} required />
            <Field label="Handle" name="handle" defaultValue={profile.handle} />
            <Field label="Role" name="role" defaultValue={profile.role} />
            <Field label="Tagline" name="tagline" defaultValue={profile.tagline} />
            <Field label="Location" name="location" defaultValue={profile.location} />
            <Field label="Currently" name="currently" defaultValue={profile.currently} />
            <div className="sm:col-span-2">
              <Area label="Summary" name="summary" defaultValue={profile.summary} rows={4} />
            </div>
            <Field label="Email" name="email" defaultValue={profile.email} />
            <Field label="GitHub URL" name="github" defaultValue={profile.github} />
            <Field label="Telegram URL" name="telegram" defaultValue={profile.telegram} />
            <Field label="Telegram handle" name="telegramHandle" defaultValue={profile.telegramHandle} />
            <Field label="Website" name="website" defaultValue={profile.website} />
            <div className="flex items-end">
              <Checkbox label="Open to work" name="available" defaultChecked={profile.available} />
            </div>
            <div className="sm:col-span-2">
              <SaveButton>Save profile</SaveButton>
            </div>
          </form>
        </Card>

        {/* ── Skills ── */}
        <SectionTitle id="skills" title="Skills" count={skills.length} />
        <div className="space-y-4">
          {skills.map((s) => (
            <Card key={s.id}>
              <form action={saveSkillGroup} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input type="hidden" name="id" value={s.id} />
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_6rem]">
                    <Field label="Group" name="group" defaultValue={s.group} />
                    <Field label="Order" name="order" type="number" defaultValue={0} />
                  </div>
                  <ListArea label="Items" name="items" items={s.items} />
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <SaveButton />
                </div>
              </form>
              <form action={deleteSkillGroup} className="mt-2">
                <input type="hidden" name="id" value={s.id} />
                <DeleteButton />
              </form>
            </Card>
          ))}
          <Card>
            <p className="mb-3 text-sm font-medium text-neutral-400">Add skill group</p>
            <form action={saveSkillGroup} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_6rem]">
                <Field label="Group" name="group" />
                <Field label="Order" name="order" type="number" defaultValue={skills.length} />
              </div>
              <ListArea label="Items" name="items" />
              <div><SaveButton>Add group</SaveButton></div>
            </form>
          </Card>
        </div>

        {/* ── Projects ── */}
        <SectionTitle id="projects" title="Projects" count={projects.length} />
        <div className="space-y-6">
          {projects.map((p) => (
            <Card key={p.id}>
              <form action={saveProject} className="grid gap-3">
                <input type="hidden" name="id" value={p.id} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title" name="title" defaultValue={p.title} required />
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-neutral-400">Kind</span>
                    <select
                      name="kind"
                      defaultValue={p.kind}
                      className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
                    >
                      <option>Client project</option>
                      <option>Personal project</option>
                      <option>Open source</option>
                    </select>
                  </label>
                  <Field label="Year" name="year" defaultValue={p.year} />
                  <Field label="Priority (lower = first)" name="priority" type="number" defaultValue={p.priority ?? 100} />
                </div>
                <ListArea label="Tags" name="tags" items={p.tags} rows={3} />
                <Area label="Blurb" name="blurb" defaultValue={p.blurb} rows={2} />
                <Area label="Problem" name="problem" defaultValue={p.problem} rows={3} />
                <Area label="Approach" name="approach" defaultValue={p.approach} rows={3} />
                <Area label="Outcome" name="outcome" defaultValue={p.outcome} rows={3} />
                <ListArea label="Challenges" name="challenges" items={p.challenges} rows={5} />
                <ListArea label="Highlights" name="highlights" items={p.highlights} rows={4} />
                <ListArea label="Stack" name="stack" items={p.stack} rows={4} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Status (optional)" name="status" defaultValue={p.status} />
                  <Field label="Demo URL (optional)" name="demo" defaultValue={p.demo} />
                  <Field label="Link label" name="linkLabel" defaultValue={p.link?.label} />
                  <Field label="Link href" name="linkHref" defaultValue={p.link?.href} />
                </div>
                <div className="rounded-md border border-neutral-800 p-3">
                  <p className="mb-2 text-xs font-medium text-neutral-500">Screenshot (optional)</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Image src" name="imageSrc" defaultValue={p.image?.src} placeholder="/projects/foo.png" />
                    <Field label="Image alt" name="imageAlt" defaultValue={p.image?.alt} />
                    <Field label="Width" name="imageWidth" type="number" defaultValue={p.image?.width} />
                    <Field label="Height" name="imageHeight" type="number" defaultValue={p.image?.height} />
                  </div>
                  <div className="mt-3">
                    <Checkbox label="Framed (border + rounded, for opaque screenshots)" name="imageFramed" defaultChecked={p.image?.framed} />
                  </div>
                </div>
                <Field label="Order" name="order" type="number" defaultValue={0} />
                <div className="flex items-center gap-3">
                  <SaveButton>Save project</SaveButton>
                </div>
              </form>
              <form action={deleteProject} className="mt-2">
                <input type="hidden" name="id" value={p.id} />
                <DeleteButton />
              </form>
            </Card>
          ))}
          <Card>
            <p className="mb-3 text-sm font-medium text-neutral-400">Add project</p>
            <form action={saveProject} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title" name="title" required />
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-neutral-400">Kind</span>
                  <select name="kind" className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500">
                    <option>Client project</option>
                    <option>Personal project</option>
                    <option>Open source</option>
                  </select>
                </label>
                <Field label="Year" name="year" defaultValue="2026" />
                <Field label="Priority" name="priority" type="number" defaultValue={100} />
              </div>
              <ListArea label="Tags" name="tags" rows={2} />
              <Area label="Blurb" name="blurb" rows={2} />
              <Area label="Problem" name="problem" rows={2} />
              <Area label="Approach" name="approach" rows={2} />
              <Area label="Outcome" name="outcome" rows={2} />
              <ListArea label="Challenges" name="challenges" rows={3} />
              <ListArea label="Highlights" name="highlights" rows={3} />
              <ListArea label="Stack" name="stack" rows={3} />
              <Field label="Order" name="order" type="number" defaultValue={projects.length} />
              <div><SaveButton>Add project</SaveButton></div>
            </form>
          </Card>
        </div>

        {/* ── Career ── */}
        <SectionTitle id="career" title="Career" count={career.length} />
        <div className="space-y-4">
          {career.map((c) => (
            <Card key={c.id}>
              <form action={saveCareer} className="grid gap-3">
                <input type="hidden" name="id" value={c.id} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Company" name="company" defaultValue={c.company} />
                  <Field label="Role" name="role" defaultValue={c.role} />
                  <Field label="Period" name="period" defaultValue={c.period} />
                  <Field label="Location" name="location" defaultValue={c.location} />
                </div>
                <ListArea label="Points" name="points" items={c.points} rows={5} />
                <Field label="Order" name="order" type="number" defaultValue={0} />
                <div><SaveButton /></div>
              </form>
              <form action={deleteCareer} className="mt-2">
                <input type="hidden" name="id" value={c.id} />
                <DeleteButton />
              </form>
            </Card>
          ))}
          <Card>
            <p className="mb-3 text-sm font-medium text-neutral-400">Add job</p>
            <form action={saveCareer} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Company" name="company" />
                <Field label="Role" name="role" />
                <Field label="Period" name="period" />
                <Field label="Location" name="location" />
              </div>
              <ListArea label="Points" name="points" rows={4} />
              <Field label="Order" name="order" type="number" defaultValue={career.length} />
              <div><SaveButton>Add job</SaveButton></div>
            </form>
          </Card>
        </div>

        {/* ── Education ── */}
        <SectionTitle id="education" title="Education" count={education.length} />
        <div className="space-y-4">
          {education.map((e) => (
            <Card key={e.id}>
              <form action={saveEducation} className="grid gap-3">
                <input type="hidden" name="id" value={e.id} />
                <Field label="School" name="school" defaultValue={e.school} />
                <Field label="Detail" name="detail" defaultValue={e.detail} />
                <Field label="Order" name="order" type="number" defaultValue={0} />
                <div><SaveButton /></div>
              </form>
              <form action={deleteEducation} className="mt-2">
                <input type="hidden" name="id" value={e.id} />
                <DeleteButton />
              </form>
            </Card>
          ))}
          <Card>
            <p className="mb-3 text-sm font-medium text-neutral-400">Add education</p>
            <form action={saveEducation} className="grid gap-3">
              <Field label="School" name="school" />
              <Field label="Detail" name="detail" />
              <Field label="Order" name="order" type="number" defaultValue={education.length} />
              <div><SaveButton>Add</SaveButton></div>
            </form>
          </Card>
        </div>

        {/* ── Languages ── */}
        <SectionTitle id="languages" title="Languages" count={languages.length} />
        <div className="space-y-4">
          {languages.map((l) => (
            <Card key={l.id}>
              <form action={saveLanguage} className="grid gap-3">
                <input type="hidden" name="id" value={l.id} />
                <Field label="Language" name="name" defaultValue={l.name} />
                <Field label="Level" name="level" defaultValue={l.level} />
                <Field label="Order" name="order" type="number" defaultValue={0} />
                <div><SaveButton /></div>
              </form>
              <form action={deleteLanguage} className="mt-2">
                <input type="hidden" name="id" value={l.id} />
                <DeleteButton />
              </form>
            </Card>
          ))}
          <Card>
            <p className="mb-3 text-sm font-medium text-neutral-400">Add language</p>
            <form action={saveLanguage} className="grid gap-3">
              <Field label="Language" name="name" />
              <Field label="Level" name="level" />
              <Field label="Order" name="order" type="number" defaultValue={languages.length} />
              <div><SaveButton>Add</SaveButton></div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
