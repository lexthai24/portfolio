"use client";

import { useMemo, useState } from "react";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import type { Project, ProjectKind } from "@/lib/content";

const PER_PAGE = 3;

const KIND_META: Record<ProjectKind, { label: string; note: string }> = {
  "Personal project": {
    label: "Personal projects",
    note: "",
  },
  "Client project": {
    label: "Client work, under NDA",
    note: "",
  },
  "Open source": {
    label: "Open source",
    note: "Contributions to community projects.",
  },
};

/** One kind-group with its own local pagination. */
function ProjectGroup({
  kind,
  items,
  showHeader,
}: {
  kind: ProjectKind;
  items: Project[];
  showHeader: boolean;
}) {
  const [page, setPage] = useState(0);
  const { label, note } = KIND_META[kind];

  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const visible = items.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  return (
    <div className="mb-20 last:mb-0">
      {showHeader && (
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold tracking-tight text-accent">
            {label}
          </h3>
          {note && (
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-dim">
              {note}
            </p>
          )}
        </div>
      )}

      {/* Cards — keyed by page so the set swaps cleanly */}
      <div key={current} className="divide-y divide-line border-t border-line pt-2">
        {visible.map((p, i) => (
          <div
            key={p.title}
            className="animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
          >
            <ProjectCard p={p} />
          </div>
        ))}
      </div>

      {/* Local pagination (only when this group overflows one page) */}
      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 0}
            className="text-ink-soft transition-colors enabled:hover:text-accent-bright disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="flex items-center gap-3">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`${label}, page ${i + 1}`}
                aria-current={i === current ? "page" : undefined}
                className={`transition-colors ${
                  i === current
                    ? "text-accent underline underline-offset-4"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </span>
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === pageCount - 1}
            className="text-ink-soft transition-colors enabled:hover:text-accent-bright disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectCatalog({
  kinds,
  kicker,
  title,
  intro,
  projects,
}: {
  kinds: ProjectKind[];
  kicker: string;
  title: string;
  intro: string;
  projects: Project[];
}) {
  const [filter, setFilter] = useState<string>("All");

  const pool = useMemo(
    () => projects.filter((p) => kinds.includes(p.kind)),
    [kinds, projects],
  );
  const filters = useMemo(
    () => ["All", ...Array.from(new Set(pool.flatMap((p) => p.tags))).sort()],
    [pool],
  );

  // Sort key: explicit priority first (lower = earlier), then projects with a
  // screenshot, then original array order. Keeps the strongest, most visual
  // work at the top of each group.
  const rank = (p: Project, index: number) =>
    (p.priority ?? 100) * 1000 + (p.image ? 0 : 100) + index;

  // Group the (filtered) pool by kind, in the order given. Empty groups drop.
  const groups = useMemo(() => {
    const match = (p: Project) => filter === "All" || p.tags.includes(filter);
    return kinds
      .map((kind) => ({
        kind,
        items: pool
          .map((p, i) => ({ p, i }))
          .filter(({ p }) => p.kind === kind && match(p))
          .sort((a, b) => rank(a.p, a.i) - rank(b.p, b.i))
          .map(({ p }) => p),
      }))
      .filter((g) => g.items.length > 0);
  }, [pool, kinds, filter]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section kicker={kicker} title={title}>
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink-soft">
        {intro}
      </p>

      {/* Filter bar — plain text, no pills */}
      <div className="mb-14 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-4 text-sm">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`transition-colors ${
                active
                  ? "text-accent underline underline-offset-8 decoration-accent"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Groups — remount on filter change so per-group pages reset.
          The first kind is the page's main subject, so its header is
          redundant with the page title; later groups keep theirs. */}
      <div key={filter}>
        {groups.map((g) => (
          <ProjectGroup
            key={g.kind}
            kind={g.kind}
            items={g.items}
            showHeader={g.kind !== kinds[0]}
          />
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-ink-dim">
        {total} project{total === 1 ? "" : "s"}
        {filter !== "All" && ` · ${filter}`}
      </p>
    </Section>
  );
}
