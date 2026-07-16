import type { Project } from "@/lib/content";
import { saveProject } from "../actions";
import { Field, Area, ListArea, Checkbox, SaveButton } from "../ui";

// Shared form for both editing an existing project and creating a new one.
export default function ProjectForm({
  project,
  defaultOrder,
}: {
  project?: Project;
  defaultOrder?: number;
}) {
  const p = project;
  return (
    <form action={saveProject} className="grid gap-3">
      {p && <input type="hidden" name="id" value={p.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={p?.title} required />
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-400">Kind</span>
          <select
            name="kind"
            defaultValue={p?.kind ?? "Client project"}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
          >
            <option>Client project</option>
            <option>Personal project</option>
            <option>Open source</option>
          </select>
        </label>
        <Field label="Year" name="year" defaultValue={p?.year ?? "2026"} />
        <Field
          label="Priority (lower = first)"
          name="priority"
          type="number"
          defaultValue={p?.priority ?? 100}
        />
      </div>

      <ListArea label="Tags" name="tags" items={p?.tags} rows={2} />
      <Area label="Blurb" name="blurb" defaultValue={p?.blurb} rows={2} />
      <Area label="Problem" name="problem" defaultValue={p?.problem} rows={3} />
      <Area label="Approach" name="approach" defaultValue={p?.approach} rows={3} />
      <Area label="Outcome" name="outcome" defaultValue={p?.outcome} rows={3} />
      <ListArea label="Challenges" name="challenges" items={p?.challenges} rows={5} />
      <ListArea label="Highlights" name="highlights" items={p?.highlights} rows={4} />
      <ListArea label="Stack" name="stack" items={p?.stack} rows={4} />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Status (optional)" name="status" defaultValue={p?.status} />
        <Field label="Demo URL (optional)" name="demo" defaultValue={p?.demo} />
        <Field label="Link label" name="linkLabel" defaultValue={p?.link?.label} />
        <Field label="Link href" name="linkHref" defaultValue={p?.link?.href} />
      </div>

      <div className="rounded-md border border-neutral-800 p-3">
        <p className="mb-2 text-xs font-medium text-neutral-500">
          Screenshot (optional)
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Image src"
            name="imageSrc"
            defaultValue={p?.image?.src}
            placeholder="/projects/foo.png"
          />
          <Field label="Image alt" name="imageAlt" defaultValue={p?.image?.alt} />
          <Field label="Width" name="imageWidth" type="number" defaultValue={p?.image?.width} />
          <Field label="Height" name="imageHeight" type="number" defaultValue={p?.image?.height} />
        </div>
        <div className="mt-3">
          <Checkbox
            label="Framed (border + rounded, for opaque screenshots)"
            name="imageFramed"
            defaultChecked={p?.image?.framed}
          />
        </div>
      </div>

      <Field
        label="Order (lower = first in its group)"
        name="order"
        type="number"
        defaultValue={p?.order ?? defaultOrder ?? 0}
      />
      <div>
        <SaveButton>{p ? "Save project" : "Add project"}</SaveButton>
      </div>
    </form>
  );
}
