import { getCareer } from "@/lib/content";
import { saveCareer, deleteCareer } from "../actions";
import { Field, ListArea, Card, PageHeader } from "../ui";
import { AdminForm, SubmitButton, DeleteSubmitButton } from "../AdminForm";

export const dynamic = "force-dynamic";

export default async function CareerAdmin() {
  const career = await getCareer();
  return (
    <div>
      <PageHeader title="Career" subtitle="Your work history, newest first." />
      <div className="space-y-4">
        {career.map((c) => (
          <Card key={c.id}>
            <AdminForm action={saveCareer} className="grid gap-3">
              <input type="hidden" name="id" value={c.id} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Company" name="company" defaultValue={c.company} />
                <Field label="Role" name="role" defaultValue={c.role} />
                <Field label="Period" name="period" defaultValue={c.period} />
                <Field label="Location" name="location" defaultValue={c.location} />
              </div>
              <ListArea label="Points" name="points" items={c.points} rows={5} />
              <Field label="Order" name="order" type="number" defaultValue={0} />
              <div>
                <SubmitButton />
              </div>
            </AdminForm>
            <AdminForm action={deleteCareer} className="mt-2">
              <input type="hidden" name="id" value={c.id} />
              <DeleteSubmitButton />
            </AdminForm>
          </Card>
        ))}

        <Card>
          <p className="mb-3 text-sm font-medium text-neutral-400">Add a job</p>
          <AdminForm action={saveCareer} className="grid gap-3" resetOnSuccess>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company" name="company" />
              <Field label="Role" name="role" />
              <Field label="Period" name="period" />
              <Field label="Location" name="location" />
            </div>
            <ListArea label="Points" name="points" rows={4} />
            <Field label="Order" name="order" type="number" defaultValue={career.length} />
            <div>
              <SubmitButton>Add job</SubmitButton>
            </div>
          </AdminForm>
        </Card>
      </div>
    </div>
  );
}
