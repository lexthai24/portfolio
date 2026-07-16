import Section from "./Section";
import Reveal from "./Reveal";
import type { SkillGroup } from "@/lib/content";

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" kicker="Skills" title="What I work with">
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {skills.map((s) => (
            <div
              key={s.group}
              className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-ink-dim sm:pt-1">
                {s.group}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-soft">
                {s.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
