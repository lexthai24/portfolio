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
    <section id={id} className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {kicker && (
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-ink-dim">
          <span className="h-px w-6 bg-accent/60" />
          {kicker}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}
