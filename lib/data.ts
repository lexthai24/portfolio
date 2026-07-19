// ─────────────────────────────────────────────────────────────
// Portfolio content. Edit this file to update the site.
// NOTE: Client project details are intentionally anonymized to
// respect NDAs — no client names, source code, or confidential
// business logic are exposed. Only role, domain, tech, and
// generalized outcomes are described.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Ekkawit P.",
  handle: "lexthai24",
  role: "Senior Software Engineer",
  tagline: "Node.js / TypeScript · Next.js · 10+ years",
  location: "Singapore",
  summary:
    "I'm a senior software engineer, a bit over ten years in, working across web apps, backend services, and the kind of system integrations that have to keep running. Right now that's ground-operations and border-control systems for airports. Before that it was fintech, trading platforms, and a stretch as a business analyst. I tend to gravitate toward the work where being wrong is expensive, and I build accordingly: boring architecture, real tests, and a healthy suspicion of anything that touches production.",
  currently: "Senior Software Engineer II at Collins Aerospace",
  email: "lexthai24@gmail.com",
  github: "https://github.com/lexthai24",
  telegram: "https://telegram.me/lexthai24",
  telegramHandle: "@lexthai24",
  website: "https://lex.nvxthai.dev",
  available: true,
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Nuxt / Vue",
      "Tailwind CSS",
      "HTML / CSS",
      "SSR / SEO",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Go",
      "PHP",
      "Laravel",
      "AdonisJS",
      "NestJS",
      "Fastify",
      "REST",
      "gRPC",
      "WebSockets",
    ],
  },
  {
    group: "Data & Integration",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "TimescaleDB",
      "Redis",
      "Prisma",
      "REST APIs",
      "System integration",
      "Data mapping",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "GitHub Actions / GitLab CI",
      "Linux",
      "Nginx / PM2",
      "NATS",
    ],
  },
  {
    group: "Web3",
    items: [
      "EVM / Solidity",
      "viem / wagmi",
      "ethers.js",
      "Wallet & hardware keys",
      "ERC-4337",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "LLM integration",
      "Claude (Anthropic)",
      "OpenAI",
      "Deepseek",
      "Groq / Gemini",
      "Python",
      "LightGBM / XGBoost",
      "Prompt engineering",
    ],
  },
  {
    group: "AI-Assisted Dev",
    items: ["Claude Code", "Cursor", "GitHub Copilot", "Codex", "Agentic workflows"],
  },
  {
    group: "Business & Delivery",
    items: [
      "Project management",
      "Requirements & user stories",
      "Process mapping",
      "Gap analysis",
      "Stakeholder management",
      "Vendor & bank coordination",
      "UAT",
      "Agile / Scrum",
      "JIRA / Confluence",
    ],
  },
  {
    group: "Testing & Tooling",
    items: [
      "Jest",
      "Playwright",
      "Vitest / fast-check",
      "Zod",
      "Turborepo / pnpm",
      "Expo",
      "Postman",
      "Git",
    ],
  },
];

export type ProjectKind = "Personal project" | "Client project" | "Open source";

export type Project = {
  title: string;
  kind: ProjectKind;
  nda: boolean;
  year: string; // for sorting / display
  priority?: number; // lower = shown first within its group (default 100)
  tags: string[]; // for filtering: e.g. "Web3", "Fintech", "Backend"
  blurb: string;
  problem: string;
  approach: string;
  outcome: string;
  challenges?: string[]; // notable engineering challenges solved
  highlights?: string[]; // architecture / scope highlights
  stack: string[];
  status?: string; // optional live status, e.g. "Fine-tuning LLM accuracy"
  demo?: string; // live demo URL
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    framed?: boolean; // border + rounded corners, for opaque screenshots
  };
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    title: "Enterprise Payroll & Workforce Platform",
    kind: "Client project",
    nda: true,
    year: "2026",
    priority: 1,
    tags: ["Fintech", "Backend", "Monorepo"],
    blurb:
      "Payroll, time attendance, and HR for the Thai market, built as one pnpm/Turborepo monorepo: an API, a queue worker, a Next.js web app, and an Expo mobile app. At the center is a payroll calculation engine written as a pure TypeScript package.",
    problem:
      "Payroll is a domain where a rounding error becomes a phone call from an angry employee. The same inputs have to produce the same numbers every time, even years later, and Thai tax and social security rules change annually without breaking historical runs. Web, mobile, and overnight batch jobs all need to agree on one source of truth.",
    approach:
      "I kept the calculation engine completely pure: no I/O, no database, typed inputs in and results out. That makes it independently versionable and easy to test. Around it sits a modular-monolith API that owns all authorization, a worker that chews through the big jobs (10k-employee runs, 100k-row imports), and thin web and mobile clients sharing the same Zod contracts.",
    outcome:
      "Same input plus same rule version gives the same result every time, with a matching SHA-256 hash to prove it. Money never touches a float. Adding a new bank export format or tax form means writing a new adapter, not changing core code.",
    challenges: [
      "Reproducibility: payroll inputs are hashed with a canonical, key-sorted JSON serializer, so two semantically equal inputs always hash the same. That's what makes re-runs idempotent and comparisons trustworthy.",
      "Money math: everything monetary runs on a Decimal type with explicit HALF_UP rounding. Floats never enter the picture.",
      "Thai tax rules: PIT brackets, social security, and provident fund live as versioned data, not code. When rates change next year it's a data update, and last year's runs still reproduce.",
      "Attendance fraud: each check-in gets a 0-100 risk score from signals like mock-location flags, GPS accuracy, clock skew, and impossible-travel speed between punches. Risky ones go to a manager for review instead of getting auto-rejected.",
      "Bank and tax adapters: a small registry pattern for per-bank file formats (fixed-width, CSV) and Revenue Department forms, so new integrations never touch the engine.",
    ],
    highlights: [
      "pnpm workspaces + Turborepo monorepo",
      "Modular-monolith API with enforced domain boundaries",
      "RBAC + ABAC, tenant isolation, and audit logging in the API layer",
      "Queue-based worker for long-running batch jobs",
      "Golden-test suite running against the pure engine (no DB)",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Turborepo",
      "pnpm",
      "Zod",
      "Expo",
    ],
    // Client and source code withheld under NDA. Details above describe
    // architecture and engineering approach only — no proprietary data.
  },
  {
    title: "Non-Custodial Crypto Wallet (Browser Extension)",
    kind: "Client project",
    nda: true,
    year: "2026",
    tags: ["Web3", "Frontend", "Security"],
    blurb:
      "A browser-extension wallet (Chrome and Firefox, Manifest V3) for a gold-backed EVM chain. Swaps, bridging, NFT and identity management, hardware wallet support, and gasless transactions through ERC-4337.",
    problem:
      "A wallet extension is about the most hostile environment you can ship security-critical code into. It holds real keys, signs real transactions, and every page it touches is untrusted. It still has to feel instant.",
    approach:
      "React and Zustand on Vite, structured around Manifest V3: a background service worker, content scripts split across the main and isolated worlds, and a side panel UI. All key handling goes through a single vault module. Nothing else in the codebase ever sees raw key material.",
    outcome:
      "Ledger and Trezor support, a dApp bridge that pages can talk to without reaching wallet internals, gasless swaps through a paymaster, and property-based tests on the paths that matter most.",
    challenges: [
      "Key storage: the seed is encrypted with the Web Crypto API using PBKDF2 at 100k iterations and AES-GCM, with non-extractable keys. Raw secrets never sit in plain memory or storage.",
      "The dApp bridge: a provider injected across the main and isolated content-script worlds, so pages can request signatures while staying completely walled off from the wallet.",
      "Hardware wallets: Ledger over WebUSB and Trezor Connect, so signing happens on-device and keys never enter the browser.",
      "Account abstraction: an ERC-4337 paymaster for gasless swaps, plus services for MEV protection, bridge aggregation, and revoking token approvals.",
    ],
    highlights: [
      "Manifest V3 (service worker + side panel)",
      "viem for EVM interaction",
      "Vitest + fast-check property tests",
      "Phishing detection & approval-revoke tooling",
    ],
    stack: [
      "TypeScript",
      "React",
      "Zustand",
      "Vite",
      "viem",
      "Web Crypto API",
      "Ledger / Trezor",
      "ERC-4337",
    ],
  },
  {
    title: "AI-Assisted Crypto Futures Trading Platform",
    kind: "Personal project",
    nda: false,
    year: "2026",
    tags: ["Backend", "AI/ML", "Distributed"],
    blurb:
      "My take on automated futures trading: deterministic Go engines generate and execute trades, a risk engine holds absolute veto power, and the AI only reviews. It never pulls the trigger.",
    problem:
      "One flaky bug or one un-vetoed order can empty an account, so I wanted guarantees I could actually test, not vibes. The ground rule for the whole design: the model advises, the risk engine decides.",
    approach:
      "A Go monorepo of small services (market data, signals, risk, execution, portfolio, AI orchestrator) talking over NATS. Python handles ML inference over gRPC, a NestJS control plane fronts everything, TimescaleDB stores the time series, and Redis keeps the hot state.",
    outcome:
      "Risk, leverage, and liquidation math that's deterministic and unit-tested. Order execution runs through a state machine with idempotency baked in, and exchange adapters normalize fills across Binance and OKX.",
    challenges: [
      "Risk comes first: the risk engine can kill any trade, and its leverage and liquidation math is deterministic, with unit tests to keep it that way.",
      "Execution safety: the order state machine is idempotent and guards against naked positions, so retries and partial fills can't corrupt state.",
      "Exchange quirks: Binance and OKX disagree on order and fill semantics. Adapters reconcile both into one internal model.",
      "Decoupling: around seven engines talk over a NATS event bus, so market data, signals, risk, and execution each scale on their own.",
    ],
    highlights: [
      "Go multi-service monorepo (go.work)",
      "Python ML (LightGBM/XGBoost) via gRPC",
      "TimescaleDB + Redis + NATS + pgvector",
      "Next.js dashboard with TradingView charts",
    ],
    stack: [
      "Go",
      "Python",
      "NestJS",
      "gRPC",
      "NATS",
      "TimescaleDB",
      "Redis",
      "Next.js",
    ],
    status: "Fine-tuning in progress: improving LLM prediction accuracy",
    demo: "https://scalptra.com",
    image: {
      src: "/projects/scalptra2.png",
      alt: "Scalptra on desktop, laptop, tablet, and phone",
      width: 546,
      height: 283,
    },
  },
  {
    title: "Football Predictions & Live-Scores Portal",
    kind: "Personal project",
    nda: false,
    year: "2026",
    tags: ["Full-stack", "AI/ML", "Data"],
    blurb:
      "Football scores, fixtures, standings, and analysis for Thai readers, fed by a multi-provider data pipeline and topped with LLM-written match commentary.",
    problem:
      "Sports data is a mess. Every provider has its own shapes, gaps, and outages, scores need to settle correctly in near real time, and no human can write timely analysis for every match on the board.",
    approach:
      "Next.js over raw Postgres and Redis, pulling from several football data sources plus on-chain odds. The interesting part is the domain library: about 50 modules covering Asian handicap math, score resolution, and parlay building. Cron jobs ingest odds, form, and results around the clock.",
    outcome:
      "An ingest-and-settle pipeline that runs itself, an admin CMS with an audit log, and Groq/Gemini generating Thai match commentary automatically.",
    challenges: [
      "Handicap math: Asian handicap settlement is full of edge cases. Getting quarter-lines and refunds right took a dedicated, well-tested set of modules.",
      "The pipeline: separate cron jobs for odds, boards, form, analysis, and settlement, each locked behind a shared secret, reconciling providers that rarely agree with each other.",
      "AI commentary: prompting Groq and Gemini to produce readable Thai match analysis at scale, not template mush.",
      "Delivery: sitemaps, caching, and Telegram alerts on top of a plain pg data layer. No ORM.",
    ],
    highlights: [
      "~24k lines of TypeScript",
      "Multi-provider data (API-Football, Azuro on-chain odds)",
      "Redis caching + WebSocket updates",
      "Admin CMS with audit log",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "LLM (Groq/Gemini)",
    ],
    demo: "https://nexscor.com",
    image: {
      src: "/projects/nexscor.png",
      alt: "NexScor football scores and analysis homepage",
      width: 1440,
      height: 900,
      framed: true,
    },
  },
  {
    title: "AI Exam Prep for Thai Civil Service",
    kind: "Personal project",
    nda: false,
    year: "2026",
    tags: ["Full-stack", "AI/ML", "Education"],
    blurb:
      "An exam-prep app for Thailand's community development volunteer exam. You practice against a 1,000-question bank, and every answer comes with an AI explanation of why the right choice is right.",
    problem:
      "Reading past papers tells you what the answer is, not why. I wanted practice that explains the reasoning behind every question, mirrors the real exam's category weighting, and doesn't burn API credit every time someone taps an answer.",
    approach:
      "Next.js and Prisma over Postgres, with Deepseek writing the explanations. Every explanation is generated once and cached in the database, so the app never calls the model at runtime. Each 100-question round is sampled from the bank using the real exam's category blueprint, and the shuffle is deterministic per round, so reloading mid-exam changes nothing.",
    outcome:
      "A 1,000-question bank across 14 categories, three practice modes (drill, timed mock, and review-your-mistakes), and per-person progress behind a name plus a hashed 4-digit PIN. Runs on a free-tier database with near-zero API spend.",
    challenges: [
      "Answer-key bias: with fixed choice positions, students start memorizing 'it's usually the third one'. Choices now shuffle every round and grading goes by choice ID, not position.",
      "Blueprint sampling: every round draws 100 questions weighted across 14 categories to match the real exam. Deterministic per round, so a mid-exam reload doesn't reshuffle. Starting over does.",
      "Zero-cost AI: all explanations are pre-generated and cached in the DB. Runtime never touches the Deepseek API, so quota and latency both stop being problems.",
      "Distractor quality: obviously-wrong choices teach nothing. I ran a multi-agent pass over the whole bank to rewrite weak distractors until none could be flagged.",
    ],
    highlights: [
      "1,000 questions, 14 categories, duplicate-checked",
      "Practice, timed mock, and review modes",
      "Name + hashed PIN, works across devices",
      "Mobile-first UI",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Deepseek API",
    ],
    demo: "https://cmrkj4oa502233wdwpikfa6v0.sin.prisma.build/",
    image: {
      src: "/projects/aiexam.png",
      alt: "A question in the exam app, with the AI explanation of why the answer is right",
      width: 1440,
      height: 1150,
      framed: true,
    },
  },
  {
    title: "Silent-Alarm Command System for Gold Shops",
    kind: "Personal project",
    nda: false,
    year: "2026",
    priority: 1,
    tags: ["Full-stack", "Mobile", "Backend", "Realtime"],
    blurb:
      "An emergency-response platform I built for gold shops, piloted with a handful of stores. A shop hits a silent panic button, and within seconds the on-duty officers get a push alert on their phone and the radio room sees it live on a dashboard. It's three surfaces over one backend: a store app, an officer Android app, and a radio-room dashboard.",
    problem:
      "Gold shops are robbery targets, and a loud alarm can make a hostage situation worse. The shop needs a way to call for help without anyone in the room knowing, the right officers need it on their phone immediately (not the whole station), and the radio room needs the full picture in real time. And since this is operational safety data, the audit trail and access control can't be an afterthought.",
    approach:
      "One Express/Prisma/Postgres backend feeding three clients: a store PWA, an officer app in React Native (Expo), and a web dashboard for the radio room. A panic event creates an immutable first record, finds the officers currently checked in for that station, and pushes to them over FCM (with LINE as a backup channel). The dashboard updates live over SSE. Six roles — shop, duty officer, radio room, commander, station admin, super admin — each see only what they should.",
    outcome:
      "A working pilot for five shops covering the whole flow: silent panic, on-duty officer targeting, push to the officer app, live radio dashboard, the new→acknowledged→enroute→arrived→controlled→closed status chain, and commander reports with response timing and a full audit trail. Test incidents are kept separate from real ones in the database.",
    challenges: [
      "The officer app: a React Native (Expo) Android app for duty officers — check in and out of shift, receive the FCM push the moment an incident fires, and move it through the status chain from the field. Their location feeds back so the radio room and the map know who's where.",
      "On-duty targeting: alerts go only to officers actually checked in for that station and role, not a station-wide blast, so the right people move and nobody tunes out the noise.",
      "Immutable timeline: every incident starts with a locked first event, and each status change is written to both a timeline and an audit log. You can reconstruct exactly what happened, when, and who did it.",
      "Realtime dashboard: SSE pushes incidents to the radio room the moment they're created, with an audible alert, so response starts without anyone refreshing a page.",
      "Device-bound sessions: sessions are tied to registered devices with refresh-token rotation and remote revoke, and login/refresh/incident endpoints are rate-limited.",
    ],
    highlights: [
      "React Native (Expo) officer app",
      "FCM push + LINE backup channel",
      "SSE realtime radio-room dashboard",
      "6-role RBAC, per-action, server-side",
    ],
    stack: [
      "React Native / Expo",
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "FCM",
      "LINE API",
      "SSE",
    ],
    image: {
      src: "/projects/policemuk.png",
      alt: "Super-admin overview of the command system: user, store, and incident counts, uptime, security checklist, and environment status",
      width: 1920,
      height: 906,
      framed: true,
    },
  },
  {
    title: "Enterprise E-Invoice & Receipt System",
    kind: "Client project",
    nda: true,
    year: "2026",
    priority: 3,
    tags: ["Full-stack", "Enterprise", "Documents"],
    blurb:
      "A Thai-language e-invoice and receipt system for a large institution: receipt books, vendors, approval workflows, and documents generated in every format the office needs.",
    problem:
      "Official receipts come with rules that don't bend. Sequential numbering, reprint and cancel workflows with sign-offs, Buddhist-era dates, fiscal years, and output that has to print correctly on hardware as old as dot-matrix.",
    approach:
      "Most of the work was modeling: 45+ Prisma models covering books, stock, requests, and approvals, with a workflow engine and role-based permissions on top. One record renders to PDF, Word, or Excel with correct Thai fonts and layout.",
    outcome:
      "The full receipt lifecycle works end to end, every sensitive action is permission-checked and audit-logged, and the documents print right. Even on dot-matrix.",
    challenges: [
      "The domain itself: receipt books, stock registries, and reprint/extend/cancel/reset flows, each a state machine with its own approval path.",
      "Thai documents: PDF, Word, and Excel generation with Thai fonts, Buddhist-era dates, and dot-matrix printer support. Harder than it sounds.",
      "Access control: a workflow engine with permission and audit middleware, so every action is checked and recorded.",
    ],
    highlights: [
      "45+ Prisma models",
      "Puppeteer + react-pdf + docx + SheetJS",
      "NextAuth + audit middleware",
      "PM2 process management",
    ],
    image: {
      src: "/projects/einvoice.png",
      alt: "Admin dashboard of the e-invoice and receipt system",
      width: 1920,
      height: 913,
      framed: true,
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Puppeteer",
      "NextAuth",
    ],
    // Institution name and source withheld under NDA.
  },
  {
    title: "Web3 Domain Registrar & Affiliate Platform",
    kind: "Client project",
    nda: true,
    year: "2026",
    tags: ["Web3", "Full-stack", "Fintech"],
    blurb:
      "A storefront for premium on-chain domains: search, character-based pricing, checkout, on-chain minting, and an affiliate program. Later split into a Turborepo monorepo with separate admin, affiliate, and public apps.",
    problem:
      "The hard part is welding a normal web checkout to blockchain minting, then running a referral program on top where the commission math has to be right and hard to game.",
    approach:
      "It started as one Next.js app on Prisma/Postgres with wagmi/viem for the chain side. As it grew, I split it into a monorepo: three apps sharing packages for auth, database, UI, and external services.",
    outcome:
      "A commission engine with referral locking and scheduled reconciliation, 2FA on auth, transactional email that fails over across three providers, and minting wired straight into checkout.",
    challenges: [
      "Commissions: referral locks plus a scheduled reconciliation job keep payouts accurate and auditable.",
      "Web-to-chain checkout: reservation, pricing, and minting in one flow through wagmi/viem.",
      "The monorepo split: pulling one app apart into admin, affiliate, and public apps without breaking shared auth and data access.",
      "Email that actually sends: one abstraction over SES, Brevo, and Resend, failing over when a provider has a bad day.",
    ],
    highlights: [
      "Turborepo + pnpm workspaces",
      "wagmi / viem on-chain integration",
      "2FA (TOTP) auth, rate limiting, audit log",
      "Playwright E2E suite",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "wagmi / viem",
      "Turborepo",
    ],
  },
  {
    title: "Web3 Matrix Placement Platform",
    kind: "Client project",
    nda: true,
    year: "2026",
    tags: ["Web3", "Full-stack", "Backend"],
    blurb:
      "A BSC platform where users buy tiered positions in USDT and land in a forced binary-tree placement network, rebirth mechanics included, with the tree rendered live in the UI.",
    problem:
      "Placement rules with queues and rebirths are easy to get subtly wrong, and every position maps to a real on-chain payment that has to reconcile with the database. Every time, no exceptions.",
    approach:
      "The placement engine handles queue and rebirth logic. A sync pipeline reads BSC events by signature and reconciles them into Postgres, and purchases run through a prepare/confirm flow gated by tier.",
    outcome:
      "Placement logic with documented payout rules, on-chain reconciliation that doesn't drift, a live hexagonal tree view, and an owner-only admin area.",
    challenges: [
      "The placement engine: binary-tree placement with queues and rebirths. Simple on the surface, but the edge cases pile up fast.",
      "On-chain sync: computing event signatures and syncing over RPC so BSC transactions and database state never drift apart.",
      "The purchase flow: a tier-gated prepare/confirm API that makes double or invalid purchases impossible.",
    ],
    highlights: [
      "wagmi + viem + ethers on BSC",
      "Real-time matrix-tree visualization",
      "Neon Postgres + Prisma",
      "Custom i18n tooling",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "wagmi / viem", "ethers", "BSC"],
  },
  {
    title: "Game Top-Up Storefront (API + Admin)",
    kind: "Client project",
    nda: true,
    year: "2025",
    tags: ["Full-stack", "Backend", "E-commerce"],
    blurb:
      "The backend and back-office for a game top-up store: a REST plus realtime API on one side, and a Nuxt admin covering catalog, orders, wallets, coupons, and promotions on the other.",
    problem:
      "Commerce backends are wide more than they are deep. Catalog, orders, wallets, payments, promos, messaging: all of it has to stay consistent, and the operators need an admin they can actually live in every day.",
    approach:
      "AdonisJS with Lucid over Postgres for the API, with role-based permissions, Socket.io for realtime, and a LINE bot for notifications and login. The admin is Nuxt 3 with Vuetify. About 50 pages of it.",
    outcome:
      "33 models, 21 controllers, and 34 migrations on the backend, plus a full back-office covering top-ups, wallets, and even a lucky-draw module.",
    challenges: [
      "Breadth: carts, orders, wallets, transactions, coupons, and permissions, all kept consistent across 33 models.",
      "Realtime and messaging: Socket.io plus LINE bot and LIFF login, because that's where the audience actually is.",
      "SEO tooling: the API generates page metadata and the admin shows a live Google/social preview while you edit.",
    ],
    highlights: [
      "AdonisJS + Lucid ORM",
      "Nuxt 3 + Vuetify 3 admin SPA",
      "Socket.io realtime + LINE integration",
      "Dockerized with UAT/prod configs",
    ],
    stack: ["AdonisJS", "TypeScript", "PostgreSQL", "Socket.io", "Nuxt 3", "Vuetify"],
  },
  {
    title: "Digital-Goods Store with Crypto Payments",
    kind: "Client project",
    nda: true,
    year: "2026",
    tags: ["Full-stack", "Web3", "E-commerce"],
    blurb:
      "An e-commerce site for digital goods with a storefront, user dashboard, and admin panel. Customers pay by Thai QR transfer with slip verification, or in USDT on-chain.",
    problem:
      "Thai customers pay by bank QR and upload a slip. Crypto customers pay in USDT. Supporting both without the payment code turning into spaghetti was the real design problem.",
    approach:
      "A Next.js app with strict layering: server actions call services, services call repositories, everything validated with Zod. There's a mock repository layer so the whole app runs without a database during development. Auth is JWT in httpOnly cookies with PBKDF2 hashing.",
    outcome:
      "Both payment rails work behind one clean interface, and the codebase stayed navigable as it grew.",
    challenges: [
      "The layering: server actions, services, repositories, and validators, plus a mock-repo mode for offline development.",
      "Auth without a framework: JWTs in httpOnly cookies, PBKDF2 password hashing through the Web Crypto API.",
      "Two payment rails: QR slip upload and verification sitting next to on-chain USDT settlement, behind one checkout.",
    ],
    highlights: [
      "Next.js server actions",
      "wagmi / viem for USDT",
      "jose JWT sessions",
      "Strict TypeScript + Zod",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "wagmi / viem", "jose"],
  },
  {
    title: "Payment Gateway Platform (Bank Integration)",
    kind: "Client project",
    nda: true,
    year: "2018",
    priority: 50,
    tags: ["Full-stack", "Fintech", "Payments", "Project management"],
    blurb:
      "A payment-gateway platform with a bank integration to Siam Commercial Bank (SCB), delivered as a one-person outsource job. I ran the whole thing myself, from design and development through sandbox testing, the bank paperwork, UAT, and go-live — with the phases moving in parallel rather than one neat step after another.",
    problem:
      "The client needed a platform that could actually take payments, which meant integrating with a bank's rails end to end. That's two hard problems at once: building a reliable gateway, and getting through a real bank's onboarding — application documents, sandbox certification, and UAT sign-off — before anything can go live. And these tracks don't run sequentially; the paperwork and the bank's testing gates land while you're still building, so they have to be managed together.",
    approach:
      "I owned the full lifecycle solo and ran the tracks concurrently. Design and development on the platform itself; integration and testing against SCB's sandbox; the onboarding paperwork with the bank in parallel with the build; then UAT with the client and the bank before go-live. Backend in Node.js talking to the SCB API — payment flows, callbacks, and reconciliation — and the frontend in React.",
    outcome:
      "A live payment-gateway platform integrated with SCB, taken from a blank design to production single-handedly: the platform, the bank integration, the sandbox and UAT gates, and the paperwork. No part of it — architecture, code, bank liaison, or testing — was handed to anyone else.",
    challenges: [
      "Banking integration: building the gateway against SCB's payment API — payment flows, callbacks, and reconciliation — and getting it through the bank's sandbox certification.",
      "Parallel delivery: design, development, sandbox testing, paperwork, and UAT didn't run in a tidy line. The bank's document and testing gates arrived mid-build, so I had to keep all of them moving at once without one blocking the others.",
      "Bank onboarding: preparing and submitting the application, satisfying SCB's requirements, and following it through UAT to go-live approval.",
      "Wearing every hat: as the only person on it, I was the architect, backend and frontend developer, tester, and the bank's point of contact — the plan and the code had to stay in sync in one head.",
    ],
    highlights: [
      "Full lifecycle solo: design → dev → sandbox → UAT → live",
      "SCB banking integration (sandbox + production)",
      "Node.js backend + React frontend",
      "Parallel tracks: build, paperwork, and testing at once",
    ],
    stack: ["Node.js", "React", "JavaScript", "REST", "SCB Payment API"],
  },
  {
    title: "EVM Chain Metadata",
    kind: "Open source",
    nda: false,
    year: "2026",
    tags: ["Web3", "Open source"],
    blurb:
      "Contributions to the community registries that keep EVM chain metadata accurate.",
    problem:
      "Wallets and dApps rely on shared registries for chain IDs, RPC endpoints, and currency data. When those go stale, connections break.",
    approach:
      "Maintained and extended chain metadata in the Kotlin and JavaScript datasets that wallet and dApp tooling pulls from.",
    outcome:
      "Cleaner chain data for the tools other Web3 developers build on.",
    stack: ["Kotlin", "JavaScript", "EVM", "Web3"],
    link: { label: "GitHub", href: "https://github.com/lexthai24" },
  },
];

export type CareerEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const career: CareerEntry[] = [
  {
    company: "Collins Aerospace",
    role: "Senior Software Engineer II",
    period: "Feb 2023 – present",
    location: "Singapore (under NDA)",
    points: [
      "Design, build, and support ground-operations systems for airports: security checkpoints, auto-gates, and the passenger pre-screening flows behind them. These can't go down, so high availability isn't a nice-to-have.",
      "Write the secure APIs that move data between systems in real time, and the processing services underneath that chew through large volumes of APIS and PNR passenger data without falling over under load.",
      "Wire biometric authentication and travel-document verification into the automated border-control flow.",
      "Treat security and privacy as the default, not an afterthought. Every government-facing integration has to hold up to the compliance rules that come with this kind of data.",
      "Keep the code reliable and covered by automated tests, especially the passenger screening and validation paths where a wrong result actually matters.",
      "Containerize the services and ship them through CI/CD pipelines out to airport environments.",
      "Work directly with internal teams, airport operators, and government agencies, turning what they need operationally into something that actually works in production.",
    ],
  },
  {
    company: "Cloudstaff",
    role: "Senior Technical Business Analyst",
    period: "Jan 2019 – Dec 2022",
    location: "Manila, Philippines",
    points: [
      "Owned the technical requirements pipeline for a financial trading platform, sitting between product owners and engineering.",
      "Turned messy trading workflows into user stories and acceptance criteria developers could build from without guessing.",
      "Ran backlog refinement and sprint prioritization, and drove UAT and production-issue analysis with QA.",
    ],
  },
  {
    company: "HotelQuickly",
    role: "Software Engineer",
    period: "Aug 2017 – Nov 2018",
    location: "Bangkok, Thailand",
    points: [
      "Built and maintained core hotel-booking features in PHP and JavaScript, integrating the third-party APIs that kept bookings reliable.",
      "Translated product requirements into technical specs and production-ready features.",
    ],
  },
  {
    company: "United Nations operation",
    role: "ICT Support Specialist",
    period: "May 2016 – Jun 2017",
    location: "Reykjavík, Iceland",
    points: [
      "Automated critical backup procedures with Linux shell scripts, cutting down manual admin work.",
      "Ran the secure network (LAN/Wi-Fi) and internal web portals for international diplomatic staff.",
    ],
  },
  {
    company: "Tourism Authority of Thailand",
    role: "Web Developer",
    period: "Jan 2015 – Mar 2016",
    location: "Bangkok, Thailand",
    points: [
      "Handled technical SEO audits: crawl and redirect fixes that pushed organic rankings up.",
      "Optimized frontend assets and server response times, so pages actually felt fast.",
    ],
  },
];

export const education = [
  {
    school: "Khon Kaen University",
    detail: "Undergraduate studies, Computer Science",
  },
  {
    school: "Western University, Thailand",
    detail: "Bachelor of Laws",
  },
];

export const languages = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Professional working proficiency (EF SET C1, TOEIC 730)" },
];

