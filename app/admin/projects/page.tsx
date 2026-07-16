import { getProjects } from "@/lib/content";
import { deleteProject } from "../actions";
import { Card, PageHeader } from "../ui";
import { AdminForm, DeleteSubmitButton } from "../AdminForm";
import ProjectForm from "./ProjectForm";

export const dynamic = "force-dynamic";

export default async function ProjectsAdmin() {
  const projects = await getProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Click a project to expand and edit. Lists take one item per line."
      />

      <div className="space-y-3">
        {projects.map((p) => (
          <details
            key={p.id}
            className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 hover:bg-neutral-900">
              <span className="flex items-center gap-3">
                <span className="font-medium text-neutral-100">{p.title}</span>
                <span className="rounded border border-neutral-700 px-1.5 py-0.5 text-[11px] text-neutral-400">
                  {p.kind.replace(" project", "")}
                </span>
                {(p.demo || p.link) && (
                  <span className="text-[11px] text-amber-400/80">link</span>
                )}
              </span>
              <span className="text-xs text-neutral-500">
                #{p.order ?? 0} · {p.year}
              </span>
            </summary>
            <div className="border-t border-neutral-800 p-5">
              <ProjectForm project={p} />
              <AdminForm action={deleteProject} className="mt-3">
                <input type="hidden" name="id" value={p.id} />
                <DeleteSubmitButton />
              </AdminForm>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <p className="mb-4 text-sm font-medium text-neutral-400">Add a project</p>
          <ProjectForm defaultOrder={projects.length} />
        </Card>
      </div>
    </div>
  );
}
