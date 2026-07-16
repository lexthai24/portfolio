import Reveal from "./Reveal";
import type { Profile } from "@/lib/content";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs text-ink-dim">Contact</p>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Say hello.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          I&apos;m open to full-time roles and contract work. If you&apos;re
          hiring, or just want to talk shop, my inbox is open. I usually reply
          within a day.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-bright"
          >
            {profile.email}
          </a>
          <a
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm"
          >
            Telegram {profile.telegramHandle}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
