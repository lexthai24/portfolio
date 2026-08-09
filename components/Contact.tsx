import Reveal from "./Reveal";
import type { Profile } from "@/lib/content";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <div className="rounded-xl border border-line bg-bg-card p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-dim">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Say hello.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            I&apos;m open to full-time roles and contract work. If you&apos;re
            hiring, or just want to talk shop, my inbox is open. I usually reply
            within a day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-bright hover:shadow-[0_0_24px_rgba(99,102,241,0.25)]"
            >
              {profile.email}
            </a>
            <a
              href={profile.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              Telegram {profile.telegramHandle}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-sm"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
