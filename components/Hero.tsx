"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

// Orchestrated page-load: each block fades up a beat after the last.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 pb-20 pt-40 sm:pt-48">
      <motion.div variants={container} initial="hidden" animate="show">
        {profile.available && (
          <motion.p
            variants={item}
            className="mb-8 flex items-center gap-2 font-mono text-xs text-ink-dim"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open to new roles · {profile.location}
          </motion.p>
        )}

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-7xl"
        >
          Software that
          <br />
          can&apos;t afford to be{" "}
          <span className="text-accent">wrong</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <Link
            href="/work"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(217,166,72,0.15)]"
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
        </motion.div>

        <motion.p
          variants={item}
          className="mt-14 border-t border-line pt-5 font-mono text-xs leading-relaxed text-ink-dim"
        >
          Currently {profile.currently} · before that: a trading platform, a
          hotel-booking app, and a UN operation in Iceland
        </motion.p>
      </motion.div>
    </section>
  );
}
