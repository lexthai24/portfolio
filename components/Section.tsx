import type { ReactNode } from "react";

export default function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      {kicker && <p className="font-mono text-xs text-ink-dim">{kicker}</p>}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
