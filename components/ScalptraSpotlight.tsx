import ImageLightbox from "./ImageLightbox";
import Reveal from "./Reveal";

const proof = [
  "Binance and OKX futures markets",
  "Deterministic risk engine with final veto",
  "Model fine-tuning active in production",
];

export default function ScalptraSpotlight() {
  return (
    <section id="scalptra" className="relative scroll-mt-24 border-y border-line-subtle py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_90%_at_85%_50%,rgba(34,211,238,0.08),transparent_72%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-200/70">Closer look</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Scalptra: AI-assisted futures trading, risk first.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              A production futures platform where deterministic services handle signals, position sizing, and risk limits. I led it from requirements and product design through architecture, deployment, and ongoing iteration.
            </p>
            <ul className="mt-7 space-y-3">
              {proof.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
              <a
                href="https://scalptra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-cyan-300 px-5 py-2.5 font-medium text-slate-950 transition-colors hover:bg-cyan-200"
              >
                Live demo ↗
              </a>
              <a href="/projects" className="u-link">
                View every project →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="overflow-hidden rounded-2xl border border-cyan-200/15 bg-[#090c13] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <ImageLightbox
              src="/projects/scalptra01.webp"
              alt="Scalptra public landing page for the AI-assisted crypto futures trading platform"
              width={1280}
              height={605}
              priority
              sizes="(max-width: 1024px) 100vw, 576px"
            />
            <figcaption className="border-t border-white/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-dim">
              AI-assisted futures trading · risk first
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
