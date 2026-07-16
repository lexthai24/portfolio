import { getSkills } from "@/lib/content";
import { saveSkillGroup, deleteSkillGroup } from "../actions";
import {
  Field,
  ListArea,
  SaveButton,
  DeleteButton,
  Card,
  PageHeader,
} from "../ui";

export const dynamic = "force-dynamic";

export default async function SkillsAdmin() {
  const skills = await getSkills();
  return (
    <div>
      <PageHeader
        title="Skills"
        subtitle="Each group shows on the About page as a labelled row."
      />
      <div className="space-y-4">
        {skills.map((s) => (
          <Card key={s.id}>
            <form action={saveSkillGroup} className="grid gap-3">
              <input type="hidden" name="id" value={s.id} />
              <div className="grid gap-3 sm:grid-cols-[1fr_6rem]">
                <Field label="Group" name="group" defaultValue={s.group} />
                <Field label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <ListArea label="Items" name="items" items={s.items} />
              <div className="flex items-center gap-3">
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
            <div>
              <SaveButton>Add group</SaveButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
