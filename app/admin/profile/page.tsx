import { getProfile } from "@/lib/content";
import { saveProfile } from "../actions";
import { Field, Area, Checkbox, Card, PageHeader } from "../ui";
import { AdminForm, SubmitButton } from "../AdminForm";

export const dynamic = "force-dynamic";

export default async function ProfileAdmin() {
  const profile = await getProfile();
  return (
    <div>
      <PageHeader title="Profile" subtitle="Your name, headline, and contact links." />
      <Card>
        <AdminForm action={saveProfile} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={profile.name} required />
          <Field label="Handle" name="handle" defaultValue={profile.handle} />
          <Field label="Role" name="role" defaultValue={profile.role} />
          <Field label="Tagline" name="tagline" defaultValue={profile.tagline} />
          <Field label="Location" name="location" defaultValue={profile.location} />
          <Field label="Currently" name="currently" defaultValue={profile.currently} />
          <div className="sm:col-span-2">
            <Area label="Summary" name="summary" defaultValue={profile.summary} rows={5} />
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
            <SubmitButton>Save profile</SubmitButton>
          </div>
        </AdminForm>
      </Card>
    </div>
  );
}
