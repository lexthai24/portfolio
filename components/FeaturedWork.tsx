import Link from "next/link";
import Reveal from "./Reveal";
import Section from "./Section";
import type { Project } from "@/lib/content";

// A project links to a live demo or an external repo.
const hasLink = (p: Project) => Boolean(p.demo || p.link?.href);

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  // Show the ones you can actually click through to first, then the rest.
  // `projects` already arrives sorted by `order` (managed in admin), and the
  // sort below is stable, so `order` stays the tiebreaker within each group.
  const featured = [...projects]
    .sort((a, b) => Number(hasLink(b)) - Number(hasLink(a)))
    .slice(0, 3);

  return (
    <Section kicker="Selected work" title="A few things I've built">
      <div className="divide-y divide-line border-y border-line">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={Math.min(i * 0.05, 0.15)}>
            <div className="group flex flex-col gap-2 py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <span className="font-mono text-xs text-ink-dim">
                  {p.kind === "Client project" ? "Client · NDA" : "Personal"}
                </span>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
                {p.blurb}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs">
                <span className="font-mono text-ink-dim">
                  {p.stack.slice(0, 4).join(" · ")}
                </span>
                {p.demo ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link"
                  >
                    Live ↗
                  </a>
                ) : (
                  p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-link"
                    >
                      {p.link.label} ↗
                    </a>
                  )
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        <Link href="/work" className="u-link text-sm">
          Client work →
        </Link>
        <Link href="/projects" className="u-link text-sm">
          Personal projects →
        </Link>
      </div>
    </Section>
  );
}
