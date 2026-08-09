import type { Profile } from "@/lib/content";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="relative border-t border-line-subtle">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-8 font-mono text-xs text-ink-dim">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Built with Next.js ·{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            @{profile.handle}
          </a>
        </p>
      </div>
    </footer>
  );
}
