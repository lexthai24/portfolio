import Reveal from "./Reveal";
import Section from "./Section";
import { career, education, languages } from "@/lib/data";

export default function About() {
  return (
    <>
      <Section kicker="About" title="Ten years of shipping things.">
        <Reveal>
          <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-ink-soft">
            <p>
              I&apos;m a senior software engineer, a bit over ten years into
              this. Right now I&apos;m at Collins Aerospace, working on
              ground-operations and border-control systems for airports:
              auto-gates, security checkpoints, passenger pre-screening, and
              the integrations that tie them to biometrics and government
              data. It&apos;s the kind of work where downtime and wrong answers
              both have real consequences, which suits how I like to build.
            </p>
            <p>
              Before that I spent four years as a technical business analyst
              on a financial trading platform, which is why I&apos;m unusually
              comfortable in the space between product people and engineers.
              Earlier stops: hotel booking in Bangkok, IT for a UN operation
              in Reykjavík, and SEO-heavy web work for Thailand&apos;s tourism
              authority.
            </p>
            <p>
              Outside the day job I take contract projects and build my own
              things. The client work and the personal builds each have their
              own page here. I also hold a law degree, which comes in handier
              than you&apos;d expect when contracts show up.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section kicker="Experience" title="Where I've worked">
        <div className="space-y-12">
          {career.map((job, i) => (
            <Reveal key={job.company} delay={Math.min(i * 0.05, 0.2)}>
              <div className="border-t border-line pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {job.role}
                    <span className="text-ink-soft"> · {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-ink-dim">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{job.location}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="mt-[9px] h-px w-4 shrink-0 bg-accent/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="Background" title="Education & languages">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                Education
              </p>
              <ul className="mt-3 space-y-3">
                {education.map((e) => (
                  <li key={e.school} className="text-sm leading-relaxed">
                    <span className="text-ink">{e.school}</span>
                    <br />
                    <span className="text-ink-soft">{e.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                Languages
              </p>
              <ul className="mt-3 space-y-3">
                {languages.map((l) => (
                  <li key={l.name} className="text-sm leading-relaxed">
                    <span className="text-ink">{l.name}</span>
                    <br />
                    <span className="text-ink-soft">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
