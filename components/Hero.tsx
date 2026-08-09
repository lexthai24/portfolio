"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

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
    <section className="relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-40 sm:pt-48">
        <motion.div variants={container} initial="hidden" animate="show">
          {profile.available && (
            <motion.div variants={item} className="mb-10">
              <span className="glass inline-flex items-center gap-2.5 rounded-full border border-white/5 px-4 py-1.5 font-mono text-xs text-ink-soft">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to new roles · {profile.location}
              </span>
            </motion.div>
          )}

          <motion.h1
            variants={item}
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-7xl lg:text-[5.25rem]"
          >
            Software that
            <br />
            can&apos;t afford to be{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent">
                wrong
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-accent/40 to-accent-bright/40 blur-sm" />
            </span>
            .
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/work"
              className="group relative overflow-hidden rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-bright hover:shadow-[0_0_32px_rgba(99,102,241,0.3)]"
            >
              <span className="relative z-10">See the work</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/about"
              className="glass-card rounded-lg border border-white/5 px-6 py-3 text-sm font-medium text-ink-soft transition-all hover:border-line-strong hover:text-ink hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]"
            >
              More about me
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-sm"
            >
              GitHub ↗
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 border-t border-line-subtle pt-6"
          >
            <p className="font-mono text-xs leading-relaxed text-ink-dim">
              Currently {profile.currently} · before that: a trading platform, a
              hotel-booking app, and a UN operation in Iceland
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
