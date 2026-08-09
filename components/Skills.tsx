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
              className="glass-card glow-border rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.06)]"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent/60" />
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                  {s.group}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
