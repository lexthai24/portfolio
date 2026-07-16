import Image from "next/image";
import type { Project } from "@/lib/content";

const SECTIONS = [
  ["The problem", "problem"],
  ["How I approached it", "approach"],
  ["Where it landed", "outcome"],
] as const;

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="py-12 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
          {p.title}
        </h3>
        <p className="font-mono text-xs text-ink-dim">
          {p.year}
          {p.nda && " · NDA"}
        </p>
      </div>

      {p.status && (
        <p className="mt-2 font-mono text-xs text-accent">{p.status}</p>
      )}

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
        {p.blurb}
      </p>

      {p.image &&
        (() => {
          const img = (
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              className={`h-auto w-full ${
                p.image.framed ? "rounded-lg border border-line" : ""
              }`}
              style={{ maxWidth: p.image.width }}
              sizes="(max-width: 768px) 100vw, 672px"
              unoptimized
            />
          );
          return p.demo ? (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title} live site`}
              className="mt-6 block transition-opacity hover:opacity-85"
            >
              {img}
            </a>
          ) : (
            <div className="mt-6">{img}</div>
          );
        })()}

      <div className="mt-7 space-y-6">
        {SECTIONS.map(([label, key]) => (
          <div key={key}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
              {label}
            </p>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">
              {p[key]}
            </p>
          </div>
        ))}
      </div>

      {p.challenges && p.challenges.length > 0 && (
        <div className="mt-7">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            The interesting parts
          </p>
          <ul className="mt-2.5 max-w-xl space-y-2.5">
            {p.challenges.map((c) => {
              const [head, ...rest] = c.split(":");
              const hasHead = rest.length > 0;
              return (
                <li
                  key={c}
                  className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-accent/60" />
                  <span>
                    {hasHead ? (
                      <>
                        <span className="font-medium text-ink">{head}.</span>
                        {rest.join(":")}
                      </>
                    ) : (
                      c
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-xs">
        <p className="font-mono text-ink-dim">{p.stack.join(" · ")}</p>
        <div className="flex items-center gap-4">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/50 px-4 py-1.5 font-medium text-accent transition-colors hover:border-accent hover:text-accent-bright"
            >
              View it live ↗
            </a>
          )}
          {p.link && (
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link"
            >
              {p.link.label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
