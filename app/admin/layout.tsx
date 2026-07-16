import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isAuthed } from "@/lib/auth";
import AdminNav from "./AdminNav";
import { ToastProvider } from "./Toast";
import { logout } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page renders its own shell; only gate the panel pages.
  const pathname = headers().get("x-pathname") ?? "";
  const isLogin = pathname.endsWith("/admin/login");

  if (!isLogin && !(await isAuthed())) redirect("/admin/login");
  if (isLogin) return <>{children}</>;

  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-200">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-5 py-3 backdrop-blur">
          <span className="text-sm font-semibold text-neutral-100">
            Portfolio admin
          </span>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/"
              target="_blank"
              className="text-neutral-400 transition-colors hover:text-neutral-100"
            >
              View site ↗
            </a>
            <form action={logout}>
              <button className="text-neutral-400 transition-colors hover:text-neutral-100">
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-5 py-8">
          <div className="sm:flex sm:gap-8">
            <AdminNav />
            <main className="min-w-0 flex-1 pb-24">{children}</main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
