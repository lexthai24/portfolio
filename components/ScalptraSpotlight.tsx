import Reveal from "./Reveal";
import ImageLightbox from "./ImageLightbox";

const ownership = [
  ["01", "Requirements & strategy", "Mapped trading workflows, exchange constraints, and safety rules into a product the team could build and validate."],
  ["02", "Product & UX design", "Designed the public product, the operations dashboard, and the moments where traders need a clear view of risk."],
  ["03", "Architecture & engineering", "Built an event-driven platform with deterministic Go engines, TypeScript services, ML inference, and a real-time web experience."],
  ["04", "Production & iteration", "Deployed the system, added observability and auditability, then used forward-test evidence to keep improving the model."],
];

const proof = [
  "Binance + OKX futures",
  "7 services over NATS",
  "Risk engine has final veto",
  "Audit-ready execution",
];

export default function ScalptraSpotlight() {
  return (
    <section id="scalptra" className="relative scroll-mt-24 overflow-hidden border-y border-line-subtle bg-[#0d1018] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_50%_0%,rgba(34,211,238,0.12),transparent_72%),radial-gradient(ellipse_44%_26%_at_90%_58%,rgba(168,85,247,0.12),transparent_76%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.75fr)] lg:items-end lg:gap-16">
          <Reveal>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">
                <span className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Flagship case study
                </span>
                <span>2026 — present</span>
              </div>
              <p className="mt-7 font-mono text-sm uppercase tracking-[0.24em] text-cyan-200/80">Scalptra</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:max-w-none lg:text-[4.25rem]">
                AI-assisted futures trading, engineered around risk.
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-soft">
                A production-grade crypto futures platform for Binance and OKX USDⓈ-M markets. Deterministic services generate signals, size positions, enforce risk limits, and execute orders; AI reviews each setup, but never gets to override the risk engine.
              </p>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
                I owned the journey from early requirements and trading workflows through product design, distributed-system architecture, frontend and backend development, deployment, and ongoing production operations. The system is running end to end, showing positive forward-test performance, while the model is being fine-tuned for better prediction quality.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-1">
            <aside className="relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-slate-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">Product access</p>
                <p className="mt-4 font-display text-3xl font-semibold leading-tight text-ink">
                  See the live platform in motion.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Explore the public product experience, the trading workspace, and the risk-first interface behind Scalptra.
                </p>
                <a
                  href="https://scalptra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-cyan-300 to-violet-400 px-5 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                >
                  <span>Live Demo</span>
                  <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">Opens scalptra.com</p>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-cyan-200/15 bg-[#090c13] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 font-mono text-[11px] text-ink-dim sm:px-6">
              <span>scalptra.com — public product experience</span>
              <span className="text-emerald-300">SYSTEM ONLINE · MODEL ITERATION ACTIVE</span>
            </div>
            <ImageLightbox
              src="/projects/scalptra01.png"
              alt="Scalptra public landing page for the AI-assisted crypto futures trading platform"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal delay={0.04}>
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#090c13]">
              <ImageLightbox
                src="/projects/scalptra02.png"
                alt="Scalptra positions screen showing open positions and live profit and loss"
                width={1920}
                height={1080}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <figcaption className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-ink-soft">
                Live position monitoring across active trading systems.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#090c13]">
              <ImageLightbox
                src="/projects/scalptra03.png"
                alt="Scalptra dashboard showing position controls and risk calculations"
                width={1920}
                height={1080}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <figcaption className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-ink-soft">
                Position-level controls, leverage calculation, and liquidation safety.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200/70">End-to-end ownership</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                From a risky domain to a system that can be trusted with real decisions.
              </h3>
              <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {ownership.map(([number, title, copy]) => (
                  <div key={number} className="border-t border-white/10 pt-4">
                    <span className="font-mono text-xs text-cyan-300/70">{number}</span>
                    <h4 className="mt-2 text-base font-medium text-ink">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-xl border border-white/10 bg-black/20 p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-dim">Engineering principles</p>
              <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-ink">
                “AI reviews. The risk engine decides.”
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Every order goes through deterministic checks for sizing, leverage, liquidation buffer, and stop protection before execution.
              </p>
              <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                {proof.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://scalptra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-opacity hover:opacity-90"
              >
                Visit Scalptra ↗
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
