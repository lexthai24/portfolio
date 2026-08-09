import type { Profile } from "@/lib/content";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line-subtle">
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
