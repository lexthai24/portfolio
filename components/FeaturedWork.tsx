import Link from "next/link";
import ImageLightbox from "./ImageLightbox";
import Reveal from "./Reveal";
import Section from "./Section";
import { TechBadges } from "./TechBadge";
import type { Project } from "@/lib/content";

const FEATURED_MATCHERS = [
  /richgn|richglobal/i,
  /ai-assisted crypto futures/i,
  /police alarm/i,
  /docflow/i,
  /football predictions/i,
  /ai exam prep/i,
];

function selectProjects(projects: Project[]): Project[] {
  const selected: Project[] = [];

  for (const matcher of FEATURED_MATCHERS) {
    const project = projects.find((candidate) => matcher.test(candidate.title));
    if (project) selected.push(project);
  }

  return [...selected, ...projects.filter((project) => !selected.includes(project))].slice(0, 6);
}

function projectType(project: Project): string {
  if (project.kind === "Client project") return "Client · NDA";
  if (project.kind === "Open source") return "Open source";
  return "Personal project";
}

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = selectProjects(projects);

  return (
    <Section id="selected-work" kicker="Selected work" title="Different domains. The same standard of delivery.">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          A cross-section of the products I have taken from unclear requirements to working software: commerce, finance, public safety, data platforms, and enterprise operations.
        </p>
        <Link href="/projects" className="u-link shrink-0 text-sm">
          Browse all projects →
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {featured.map((project, index) => {
          const externalHref = project.demo ?? project.link?.href;
          const externalLabel = project.demo ? "Live demo" : project.link?.label;
          const gallery = project.gallery?.length
            ? project.gallery
            : project.image
              ? [project.image]
              : [];
          const previewImage = gallery[0];

          return (
            <Reveal key={project.title} delay={Math.min(index * 0.04, 0.2)}>
              <article className="glow-border group flex h-full flex-col rounded-xl border border-line bg-bg-card/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:bg-bg-elevated sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <span className="font-mono text-xs text-accent-bright">0{index + 1}</span>
                  <div className="flex flex-wrap justify-end gap-2 text-[11px]">
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-ink-dim">
                      {projectType(project)}
                    </span>
                    <span className="font-mono text-ink-dim">{project.year}</span>
                  </div>
                </div>

                {previewImage && (
                  <div className="mt-6 overflow-hidden rounded-lg border border-line-subtle bg-black/20">
                    <ImageLightbox
                      src={previewImage.src}
                      alt={previewImage.alt}
                      width={previewImage.width}
                      height={previewImage.height}
                      images={gallery}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      previewClassName="h-52 w-full object-cover object-top"
                    />
                  </div>
                )}

                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent-bright">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.blurb}</p>

                <div className="mt-6">
                  <TechBadges items={project.stack.slice(0, 4)} />
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                  <Link href="/projects" className="u-link">
                    Read the case study →
                  </Link>
                  {externalHref && externalLabel && (
                    <a
                      href={externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-soft transition-colors hover:text-ink"
                    >
                      {externalLabel} ↗
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
