"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 pb-20 pt-40 sm:pt-48">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {profile.available && (
          <p className="mb-8 font-mono text-xs text-ink-dim">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            Open to new roles · {profile.location}
          </p>
        )}

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-7xl">
          Software that
          <br />
          can&apos;t afford to be{" "}
          <span className="text-accent">wrong</span>.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/work"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-bright"
          >
            See the work
          </Link>
          <Link href="/about" className="u-link text-sm">
            More about me
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm"
          >
            GitHub
          </a>
        </div>

        <p className="mt-14 border-t border-line pt-5 font-mono text-xs leading-relaxed text-ink-dim">
          Currently {profile.currently} · before that: a trading platform, a
          hotel-booking app, and a UN operation in Iceland
        </p>
      </motion.div>
    </section>
  );
}
