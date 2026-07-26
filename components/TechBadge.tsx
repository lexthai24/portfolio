import * as si from "simple-icons";

type Icon = { title: string; path: string };

// Map a stack label → a simple-icons export. Labels not listed here (REST, SSE,
// EVM, gRPC, viem, concept-only entries) render as a text badge with a dot.
const ICON_SLUG: Record<string, string> = {
  "Node.js": "siNodedotjs",
  "Next.js": "siNextdotjs",
  React: "siReact",
  "React Native / Expo": "siExpo",
  Expo: "siExpo",
  TypeScript: "siTypescript",
  JavaScript: "siJavascript",
  Go: "siGo",
  Python: "siPython",
  Kotlin: "siKotlin",
  PostgreSQL: "siPostgresql",
  Redis: "siRedis",
  Prisma: "siPrisma",
  NestJS: "siNestjs",
  Fastify: "siFastify",
  Express: "siExpress",
  AdonisJS: "siAdonisjs",
  "Nuxt 3": "siNuxt",
  Vuetify: "siVuetify",
  Vite: "siVite",
  "Tailwind CSS": "siTailwindcss",
  "Socket.io": "siSocketdotio",
  Zod: "siZod",
  Turborepo: "siTurborepo",
  pnpm: "siPnpm",
  Puppeteer: "siPuppeteer",
  NATS: "siNatsdotio",
  TimescaleDB: "siTimescale",
  Web3: "siWeb3dotjs",
  ethers: "siEthers",
  "LINE API": "siLine",
  FCM: "siFirebase",
  "Ledger / Trezor": "siTrezor",
  "Deepseek API": "siDeepseek",
};

function iconFor(label: string): Icon | null {
  const key = ICON_SLUG[label];
  if (!key) return null;
  const icon = (si as Record<string, unknown>)[key] as Icon | undefined;
  return icon ?? null;
}

export function TechBadge({ label }: { label: string }) {
  const icon = iconFor(label);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg-soft px-2 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:border-line-strong hover:text-ink">
      {icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-3 w-3 shrink-0 fill-current opacity-80"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full bg-accent/60"
        />
      )}
      {label}
    </span>
  );
}

export function TechBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <TechBadge key={t} label={t} />
      ))}
    </div>
  );
}
