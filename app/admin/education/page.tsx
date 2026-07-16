import { getEducation, getLanguages } from "@/lib/content";
import {
  saveEducation,
  deleteEducation,
  saveLanguage,
  deleteLanguage,
} from "../actions";
import { Field, SaveButton, DeleteButton, Card, PageHeader } from "../ui";

export const dynamic = "force-dynamic";

export default async function EducationAdmin() {
  const [education, languages] = await Promise.all([
    getEducation(),
    getLanguages(),
  ]);

  return (
    <div>
      <PageHeader title="Education & languages" />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Education
      </h2>
      <div className="space-y-4">
        {education.map((e) => (
          <Card key={e.id}>
            <form action={saveEducation} className="grid gap-3">
              <input type="hidden" name="id" value={e.id} />
              <Field label="School" name="school" defaultValue={e.school} />
              <Field label="Detail" name="detail" defaultValue={e.detail} />
              <Field label="Order" name="order" type="number" defaultValue={0} />
              <div>
                <SaveButton />
              </div>
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
            <div>
              <SaveButton>Add</SaveButton>
            </div>
          </form>
        </Card>
      </div>

      <h2 className="mb-3 mt-12 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Languages
      </h2>
      <div className="space-y-4">
        {languages.map((l) => (
          <Card key={l.id}>
            <form action={saveLanguage} className="grid gap-3">
              <input type="hidden" name="id" value={l.id} />
              <Field label="Language" name="name" defaultValue={l.name} />
              <Field label="Level" name="level" defaultValue={l.level} />
              <Field label="Order" name="order" type="number" defaultValue={0} />
              <div>
                <SaveButton />
              </div>
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
            <div>
              <SaveButton>Add</SaveButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
