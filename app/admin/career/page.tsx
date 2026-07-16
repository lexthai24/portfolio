import { getCareer } from "@/lib/content";
import { saveCareer, deleteCareer } from "../actions";
import {
  Field,
  ListArea,
  SaveButton,
  DeleteButton,
  Card,
  PageHeader,
} from "../ui";

export const dynamic = "force-dynamic";

export default async function CareerAdmin() {
  const career = await getCareer();
  return (
    <div>
      <PageHeader title="Career" subtitle="Your work history, newest first." />
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
              <div>
                <SaveButton />
              </div>
            </form>
            <form action={deleteCareer} className="mt-2">
              <input type="hidden" name="id" value={c.id} />
              <DeleteButton />
            </form>
          </Card>
        ))}

        <Card>
          <p className="mb-3 text-sm font-medium text-neutral-400">Add a job</p>
          <form action={saveCareer} className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company" name="company" />
              <Field label="Role" name="role" />
              <Field label="Period" name="period" />
              <Field label="Location" name="location" />
            </div>
            <ListArea label="Points" name="points" rows={4} />
            <Field label="Order" name="order" type="number" defaultValue={career.length} />
            <div>
              <SaveButton>Add job</SaveButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
