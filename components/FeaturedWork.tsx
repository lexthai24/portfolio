import Link from "next/link";
import Reveal from "./Reveal";
import Section from "./Section";
import { TechBadges } from "./TechBadge";
import type { Project } from "@/lib/content";

const hasLink = (p: Project) => Boolean(p.demo || p.link?.href);

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = [...projects]
    .sort((a, b) => Number(hasLink(b)) - Number(hasLink(a)))
    .slice(0, 3);

  return (
    <Section kicker="More selected work" title="Other systems I&apos;ve built">
      <div className="grid gap-4">
        {featured.map((p, i) => {
          const href = p.demo ?? p.link?.href;
          const linkLabel = p.demo ? "Live" : p.link?.label;
          return (
            <Reveal key={p.title} delay={Math.min(i * 0.05, 0.15)}>
              <div className="group relative rounded-xl border border-line bg-bg-card p-6 transition-all duration-300 hover:border-line-strong hover:bg-bg-elevated sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent-bright">
                    {p.title}
                  </h3>
                  <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ink-dim">
                    {p.kind === "Client project" ? "Client · NDA" : "Personal"}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <TechBadges items={p.stack.slice(0, 4)} />
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-link"
                    >
                      {linkLabel} ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/projects" className="u-link text-sm">
          See all projects →
        </Link>
        <Link href="/work" className="u-link text-sm">
          Client work →
        </Link>
      </div>
    </Section>
  );
}
