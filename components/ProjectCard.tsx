import Image from "next/image";
import type { Project } from "@/lib/content";
import { TechBadges } from "./TechBadge";

const SECTIONS = [
  ["The problem", "problem"],
  ["How I approached it", "approach"],
  ["Where it landed", "outcome"],
] as const;

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="glass-card glow-border rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]">
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

      {p.gallery && p.gallery.length > 0 ? (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {p.gallery.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className={`h-auto w-full transition-transform duration-500 hover:scale-[1.012] ${
                  image.framed ? "rounded-lg border border-line" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : (
        p.image &&
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
            />
          );
          return p.demo ? (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title} live site`}
              className="group/img mt-6 block overflow-hidden rounded-lg transition-opacity hover:opacity-95"
            >
              <div className="transition-transform duration-500 group-hover/img:scale-[1.015]">
                {img}
              </div>
            </a>
          ) : (
            <div className="mt-6">{img}</div>
          );
        })()
      )}

      <div className="mt-7 space-y-6">
        {SECTIONS.map(([label, key]) => (
          <div key={key}>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
              <span className="h-px w-3 bg-accent/50" />
              {label}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              {p[key]}
            </p>
          </div>
        ))}
      </div>

      {p.challenges && p.challenges.length > 0 && (
        <div className="mt-7">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            <span className="h-px w-3 bg-accent/50" />
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

      {p.engineeringNotes && p.engineeringNotes.length > 0 && (
        <div className="mt-7 rounded-xl border border-accent/20 bg-accent/[0.04] p-4 sm:p-5">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
            <span className="h-px w-3 bg-accent/70" />
            Senior / Staff engineering notes
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {p.engineeringNotes.map((note) => (
              <div key={note.label}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                  {note.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {note.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.highlights && p.highlights.length > 0 && (
        <div className="mt-7">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            <span className="h-px w-3 bg-accent/50" />
            What shipped
          </p>
          <ul className="mt-2.5 grid gap-x-8 gap-y-2.5 md:grid-cols-2">
            {p.highlights.map((highlight) => {
              const [head, ...rest] = highlight.split(":");
              const hasHead = rest.length > 0;
              return (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-accent/60" />
                  <span>
                    {hasHead ? (
                      <>
                        <span className="font-medium text-ink">{head}.</span>
                        {rest.join(":")}
                      </>
                    ) : (
                      highlight
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-7">
        <TechBadges items={p.stack} />
      </div>

      {(p.demo || p.link) && (
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-accent/40 px-4 py-2 font-medium text-accent transition-all hover:border-accent hover:bg-accent-soft"
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
      )}
    </article>
  );
}
