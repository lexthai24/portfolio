import type { Project } from "./content";

export type EngineeringNote = { label: string; detail: string };

type EngineeringNoteRule = {
  matcher: RegExp;
  notes: EngineeringNote[];
};

// Quantify implementation scope and algorithmic shape without presenting
// unverified business KPIs as production results.
const RULES: EngineeringNoteRule[] = [
  {
    matcher: /richgn|richglobal/i,
    notes: [
      { label: "Scale", detail: "Three portals, five wallet balances, multi-language member flows, and a retention lifecycle from 30-day warning through 365-day archive." },
      { label: "Complexity", detail: "Bounded binary traversal is O(k) for k returned nodes plus O(h) recursion depth; keyset reports are O(log n + p) per page." },
      { label: "AI boundary", detail: "I use AI to explore workflows and test cases, but ledger entries, commission rules, CR limits, and flush transitions stay deterministic and auditable." },
      { label: "Integration", detail: "NowPayments, signed webhooks, bank-slip deposits, withdrawals, fulfilment webhooks, notifications, and mobile operations meet through idempotent service boundaries." },
      { label: "People side", detail: "I kept requirements, product design, architecture, deployment, and operations aligned across members, finance, admins, and Mobile Company users." },
    ],
  },
  {
    matcher: /enterprise payroll/i,
    notes: [
      { label: "Scale", detail: "10k-employee payroll runs and 100k-row imports are handled by background jobs so interactive requests stay bounded." },
      { label: "Complexity", detail: "The pure calculation pass is O(e) for e employees; indexed batch reads are O(log n + p) per page instead of N+1 scans." },
      { label: "AI boundary", detail: "I use AI-assisted review to look for edge cases; Decimal arithmetic, golden tests, canonical hashes, and versioned rules still make the final call." },
      { label: "Integration", detail: "Shared Zod contracts keep the API, web, mobile app, worker, bank exports, and Thai tax adapters aligned." },
      { label: "People side", detail: "I turned vague payroll requirements into rules that finance, HR, mobile, and operations teams could review and sign off." },
    ],
  },
  {
    matcher: /non-custodial crypto wallet/i,
    notes: [
      { label: "Scale", detail: "One extension serves Chrome and Firefox through a Manifest V3 service worker, content scripts, and a side-panel UI." },
      { label: "Complexity", detail: "Indexed activity and approval history use cursor pagination, O(log n + p), while vault operations stay isolated from UI rendering." },
      { label: "AI boundary", detail: "AI is useful for generating test ideas, but signing, encryption, and approval paths still go through property-based tests and a security review." },
      { label: "Integration", detail: "EVM RPC, Ledger, Trezor, ERC-4337 paymasters, and the dApp bridge are kept behind narrow adapters and trust boundaries." },
      { label: "People side", detail: "The key discussion was agreeing what an untrusted page, the wallet UI, and the hardware signer are each allowed to do." },
    ],
  },
  {
    matcher: /ai-assisted crypto futures/i,
    notes: [
      { label: "Scale", detail: "About seven Go engines communicate over NATS, with Python inference over gRPC and a NestJS control plane in front." },
      { label: "Complexity", detail: "A risk decision is O(1) over a bounded rule set; indexed time-series reads are O(log n + p) for n records and page size p." },
      { label: "AI boundary", detail: "The model reviews setups and is still being fine-tuned. Risk, leverage, liquidation, and execution remain deterministic, so the model cannot place a trade." },
      { label: "Integration", detail: "Binance and OKX adapters normalize different order and fill semantics before the idempotent execution workflow sees them." },
      { label: "People side", detail: "I made service contracts and failure ownership explicit, so a market-data delay could not quietly turn into an unsafe order." },
    ],
  },
  {
    matcher: /football predictions/i,
    notes: [
      { label: "Scale", detail: "Around 24k lines and roughly 50 domain modules cover provider ingestion, handicap math, settlement, analysis, and admin operations." },
      { label: "Complexity", detail: "Each provider batch is processed in O(b) for b records; indexed score, odds, and history queries use O(log n + p) pagination." },
      { label: "AI boundary", detail: "Groq/Gemini writes commentary after the data is checked. The model never decides settlement or handicap results." },
      { label: "Integration", detail: "API-Football, Azuro on-chain odds, Redis, WebSockets, cron jobs, and Telegram alerts are isolated so one provider outage is recoverable." },
      { label: "People side", detail: "A lot of the work was agreeing definitions with data providers and making it clear which source wins when values disagree." },
    ],
  },
  {
    matcher: /ai exam prep/i,
    notes: [
      { label: "Scale", detail: "A 1,000-question bank spans 14 categories, with 100-question rounds and three practice modes." },
      { label: "Complexity", detail: "Blueprint sampling and deterministic shuffling are O(q + c) for q selected questions and c categories; cached explanations are O(1) reads." },
      { label: "AI boundary", detail: "Deepseek writes explanations ahead of time, and a multi-agent pass helps improve distractors. Answer keys and grading remain deterministic." },
      { label: "Integration", detail: "Prisma/Postgres stores question, explanation, and progress state behind a hashed-PIN identity flow that works across devices." },
      { label: "People side", detail: "Educational trust came first: content, category weighting, and feedback behavior had to be agreed before polishing the UI." },
    ],
  },
  {
    matcher: /police alarm/i,
    notes: [
      { label: "Scale", detail: "The pilot covered five shops, three client surfaces, and six roles across shop, officer, radio-room, and command workflows." },
      { label: "Complexity", detail: "Targeting checks indexed on station and duty status are O(log n + k) for k eligible officers; each incident transition is O(1) plus audit writes." },
      { label: "AI boundary", detail: "I kept AI out of the emergency path. Deterministic status transitions and an append-only timeline are easier to trust and audit." },
      { label: "Integration", detail: "FCM push, LINE fallback, SSE dashboard updates, device-bound sessions, and Postgres must agree during partial delivery failures." },
      { label: "People side", detail: "The silent-panic workflow had to make sense to shop staff, officers, radio operators, and commanders without losing its audit trail." },
    ],
  },
  {
    matcher: /enterprise e-invoice/i,
    notes: [
      { label: "Scale", detail: "The domain is modeled across 45+ Prisma models and produces PDF, Word, Excel, and dot-matrix-friendly output." },
      { label: "Complexity", detail: "Receipt state transitions are O(1) per command; indexed book, approval, and audit queries use O(log n + p) pagination." },
      { label: "AI boundary", detail: "AI can help draft tests and mappings, but numbering, fiscal-year rules, Thai dates, and reprint approvals still need deterministic checks." },
      { label: "Integration", detail: "Puppeteer, react-pdf, docx, SheetJS, Thai fonts, and printer constraints are isolated behind document rendering boundaries." },
      { label: "People side", detail: "I translated policy and approval responsibilities into explicit states that finance and operations could audit." },
    ],
  },
  {
    matcher: /web3 domain registrar/i,
    notes: [
      { label: "Scale", detail: "The product was split into three apps in a Turborepo while retaining shared auth, database, UI, and service packages." },
      { label: "Complexity", detail: "Character-price evaluation is O(c) for c characters; checkout reconciliation is O(1) per idempotency key plus O(t) for a selected transaction batch." },
      { label: "AI boundary", detail: "AI may help review pricing and edge cases, but minting, referral locks, and 2FA stay explicit and testable." },
      { label: "Integration", detail: "wagmi/viem, on-chain minting, referral accounting, and three-provider email failover are kept behind service boundaries." },
      { label: "People side", detail: "The monorepo split meant coordinating public, affiliate, and admin ownership without breaking shared contracts or releases." },
    ],
  },
  {
    matcher: /web3 matrix placement/i,
    notes: [
      { label: "Scale", detail: "The platform combines tiered purchases, forced binary placement, queues, rebirths, and a live tree view." },
      { label: "Complexity", detail: "Placement walks O(h) for hierarchy depth h; each queue or rebirth transition is O(1) before indexed persistence and audit writes." },
      { label: "AI boundary", detail: "AI stays on the development side. Purchase eligibility, placement, and payout rules are deterministic and testable." },
      { label: "Integration", detail: "BSC event signatures, RPC sync, USDT confirmation, and Postgres reconciliation are separated so chain delays cannot create duplicate purchases." },
      { label: "People side", detail: "The important conversation was making payout rules precise enough for product, finance, and engineering to read the tree the same way." },
    ],
  },
  {
    matcher: /game top-up/i,
    notes: [
      { label: "Scale", detail: "The backend has 33 models, 21 controllers, 34 migrations, and an admin surface of roughly 50 pages." },
      { label: "Complexity", detail: "Wallet and order commands are O(1) per transaction under indexed keys; history and admin lists use O(log n + p) pagination." },
      { label: "AI boundary", detail: "AI helps with repetitive test and mapping work, while transactions and review protect wallet, coupon, and order invariants." },
      { label: "Integration", detail: "Socket.io, LINE bot/LIFF login, catalog, promotions, and wallet operations share one authorization and event model." },
      { label: "People side", detail: "The challenge was keeping a wide commerce surface consistent while operators, support, and end users followed different workflows." },
    ],
  },
  {
    matcher: /digital-goods store/i,
    notes: [
      { label: "Scale", detail: "Two payment rails, a storefront, a user dashboard, and an admin panel are unified behind one checkout contract." },
      { label: "Complexity", detail: "Validation is O(f) for f submitted fields; payment mutation is O(1) per idempotency key with O(t) reconciliation over selected transactions." },
      { label: "AI boundary", detail: "AI helps with implementation and test coverage, but QR slip review, USDT settlement, and refunds require evidence and compensating actions." },
      { label: "Integration", detail: "Thai QR slip verification and on-chain USDT settlement are isolated behind adapters so payment providers do not leak into UI logic." },
      { label: "People side", detail: "I aligned customer support, payment operations, and engineering around one status model for two very different payment rails." },
    ],
  },
  {
    matcher: /evm chain metadata/i,
    notes: [
      { label: "Scale", detail: "The contribution spans Kotlin and JavaScript registry datasets consumed by wallets and dApps." },
      { label: "Complexity", detail: "Validation is O(n) over changed registry entries, while chain-ID lookup is O(1) with a keyed map or indexed registry." },
      { label: "AI boundary", detail: "AI can suggest consistency checks, but I verify chain IDs, RPC URLs, and native-currency metadata against upstream conventions." },
      { label: "Integration", detail: "One inaccurate field can break connections across many independent wallet and dApp consumers." },
      { label: "People side", detail: "The goal was a small, reviewable change that maintainers could accept without surprising downstream consumers." },
    ],
  },
  {
    matcher: /payment gateway platform/i,
    notes: [
      { label: "Scale", detail: "One engineer owned two environments, sandbox and production, across design, backend, frontend, testing, bank liaison, and go-live." },
      { label: "Complexity", detail: "Payment callbacks are O(1) per reference with indexed idempotency; reconciliation is O(t) over the selected transaction set." },
      { label: "AI boundary", detail: "AI can speed up scaffolding, but bank certification, callback signatures, and settlement evidence must match the bank contract." },
      { label: "Integration", detail: "SCB APIs, callbacks, sandbox certification, UAT, paperwork, and production approval had to move in parallel." },
      { label: "People side", detail: "I kept the build, bank paperwork, sandbox testing, and UAT moving together so one track did not block go-live." },
    ],
  },
  {
    matcher: /docflow/i,
    notes: [
      { label: "Scale", detail: "The system covers 20+ screens, 38 data models, 8 roles, and 28 granular permissions." },
      { label: "Complexity", detail: "Permission-filtered search is O(log n + p) with indexed pagination; folder cycle checks are O(h) over ancestor depth." },
      { label: "AI boundary", detail: "AI can help draft tests and documentation, but RBAC, workflow transitions, and audit masking are enforced and tested on the server." },
      { label: "Integration", detail: "PDF/image/CSV preview, local/S3 storage adapters, sessions, notifications, and audit events stay behind replaceable boundaries." },
      { label: "People side", detail: "The hard part was turning document policy into permissions and approval states that legal, department owners, and users could understand." },
    ],
  },
  {
    matcher: /authoritative dice/i,
    notes: [
      { label: "Scale", detail: "The browser replays a server trace frame by frame, with 30 FPS, 45 FPS, and full-quality device profiles." },
      { label: "Complexity", detail: "Playback interpolation is O(d) per frame for d dice; the client does not duplicate the server's physics simulation." },
      { label: "AI boundary", detail: "AI can help inspect rendering code, but physics and results stay server-authoritative; the client never guesses the outcome." },
      { label: "Integration", detail: "WebSockets, React Three Fiber, Drei, Three.js materials, and the live operations dashboard share an explicit trace contract." },
      { label: "People side", detail: "The trade-off was explaining why visual fidelity, low-end device budgets, and server authority all mattered at once." },
    ],
  },
];

export function applyEngineeringNotes(project: Project): Project {
  if (project.engineeringNotes?.length) return project;
  const rule = RULES.find(({ matcher }) => matcher.test(project.title));
  return rule ? { ...project, engineeringNotes: rule.notes } : project;
}
