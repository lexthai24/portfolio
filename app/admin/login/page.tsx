import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { login } from "../actions";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-lg border border-neutral-800 bg-neutral-900/40 p-6"
      >
        <h1 className="mb-1 text-lg font-semibold text-neutral-100">
          Admin
        </h1>
        <p className="mb-5 text-sm text-neutral-500">
          Enter the admin password to edit the site.
        </p>
        <input
          type="password"
          name="password"
          autoFocus
          required
          placeholder="Password"
          className="mb-3 w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
        />
        {searchParams.error && (
          <p className="mb-3 text-sm text-red-400">Wrong password.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
