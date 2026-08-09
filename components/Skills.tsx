import Section from "./Section";
import Reveal from "./Reveal";
import type { SkillGroup } from "@/lib/content";

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" kicker="Skills" title="What I work with">
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div
              key={s.group}
              className="rounded-xl border border-line bg-bg-card p-5 transition-colors hover:border-line-strong"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                {s.group}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {s.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
