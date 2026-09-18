import { getCareer } from "@/lib/content";
import { saveCareer } from "../actions";
import { Field, ListArea, Card, PageHeader } from "../ui";
import { AdminForm, SubmitButton } from "../AdminForm";
import CareerList from "./CareerList";

export const dynamic = "force-dynamic";

export default async function CareerAdmin() {
  const career = await getCareer();
  return (
    <div>
      <PageHeader title="Career" subtitle="Drag roles into order. The first role is shown first." />
      <CareerList career={career} />

      <div className="mt-8">
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
            <input type="hidden" name="order" value={career.length} />
            <div>
              <SubmitButton>Add job</SubmitButton>
            </div>
          </AdminForm>
        </Card>
      </div>
    </div>
  );
}
