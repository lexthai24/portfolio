"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/career", label: "Career" },
  { href: "/admin/education", label: "Education & languages" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (it: (typeof items)[number]) =>
    it.exact ? pathname === it.href : pathname.startsWith(it.href);

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="sticky top-20 hidden h-max w-44 shrink-0 flex-col gap-1 text-sm sm:flex">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`rounded-md px-3 py-2 transition-colors ${
              isActive(it)
                ? "bg-amber-500/10 font-medium text-amber-400"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: horizontal scroll strip */}
      <nav className="-mx-5 mb-6 flex gap-2 overflow-x-auto border-b border-neutral-800 px-5 pb-3 text-sm sm:hidden">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 transition-colors ${
              isActive(it)
                ? "bg-amber-500/10 font-medium text-amber-400"
                : "text-neutral-400 hover:text-neutral-100"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
