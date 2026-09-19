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
      { label: "AI and correctness", detail: "AI can assist with workflow analysis and test cases, but ledger entries, commission rules, CR limits, and flush transitions remain deterministic and auditable." },
      { label: "Integration", detail: "NowPayments, signed webhooks, bank-slip deposits, withdrawals, fulfilment webhooks, notifications, and mobile operations meet through idempotent service boundaries." },
      { label: "Staff delivery", detail: "Requirements, product design, architecture, implementation, deployment, and operations had to stay aligned across members, finance, admins, and Mobile Company users." },
    ],
  },
  {
    matcher: /enterprise payroll/i,
    notes: [
      { label: "Scale", detail: "10k-employee payroll runs and 100k-row imports are handled by background jobs so interactive requests stay bounded." },
      { label: "Complexity", detail: "The pure calculation pass is O(e) for e employees; indexed batch reads are O(log n + p) per page instead of N+1 scans." },
      { label: "AI and correctness", detail: "AI-assisted review helps find edge cases, but Decimal arithmetic, golden tests, canonical hashes, and versioned rules remain the source of truth." },
      { label: "Integration", detail: "Shared Zod contracts keep the API, web, mobile app, worker, bank exports, and Thai tax adapters aligned." },
      { label: "Staff delivery", detail: "Requirements had to become stable payroll rules that finance, HR, mobile, and operations teams could review and sign off." },
    ],
  },
  {
    matcher: /non-custodial crypto wallet/i,
    notes: [
      { label: "Scale", detail: "One extension serves Chrome and Firefox through a Manifest V3 service worker, content scripts, and a side-panel UI." },
      { label: "Complexity", detail: "Indexed activity and approval history use cursor pagination, O(log n + p), while vault operations stay isolated from UI rendering." },
      { label: "AI and correctness", detail: "AI can accelerate test generation, but signing, encryption, and approval paths are verified with property-based tests and explicit security review." },
      { label: "Integration", detail: "EVM RPC, Ledger, Trezor, ERC-4337 paymasters, and the dApp bridge are kept behind narrow adapters and trust boundaries." },
      { label: "Staff delivery", detail: "The key coordination problem is agreeing on what an untrusted page, wallet UI, and hardware signer are each allowed to do." },
    ],
  },
  {
    matcher: /ai-assisted crypto futures/i,
    notes: [
      { label: "Scale", detail: "About seven Go engines communicate over NATS, with Python inference over gRPC and a NestJS control plane in front." },
      { label: "Complexity", detail: "A risk decision is O(1) over a bounded rule set; indexed time-series reads are O(log n + p) for n records and page size p." },
      { label: "AI and correctness", detail: "The model reviews setups and is being fine-tuned; deterministic risk, leverage, liquidation, and execution state machines keep veto power outside the model." },
      { label: "Integration", detail: "Binance and OKX adapters normalize different order and fill semantics before the idempotent execution workflow sees them." },
      { label: "Staff delivery", detail: "The senior-level job is defining service contracts and failure ownership so a market-data delay cannot silently become an unsafe order." },
    ],
  },
  {
    matcher: /football predictions/i,
    notes: [
      { label: "Scale", detail: "Around 24k lines and roughly 50 domain modules cover provider ingestion, handicap math, settlement, analysis, and admin operations." },
      { label: "Complexity", detail: "Each provider batch is processed in O(b) for b records; indexed score, odds, and history queries use O(log n + p) pagination." },
      { label: "AI and correctness", detail: "Groq/Gemini writes commentary only after deterministic data validation; AI text never decides settlement or handicap results." },
      { label: "Integration", detail: "API-Football, Azuro on-chain odds, Redis, WebSockets, cron jobs, and Telegram alerts are isolated so one provider outage is recoverable." },
      { label: "Staff delivery", detail: "The work is reconciliation: agreeing definitions with data providers and making operations understand which source wins when values disagree." },
    ],
  },
  {
    matcher: /ai exam prep/i,
    notes: [
      { label: "Scale", detail: "A 1,000-question bank spans 14 categories, with 100-question rounds and three practice modes." },
      { label: "Complexity", detail: "Blueprint sampling and deterministic shuffling are O(q + c) for q selected questions and c categories; cached explanations are O(1) reads." },
      { label: "AI and correctness", detail: "Deepseek generates explanations ahead of time; multi-agent review improves distractors, while answer keys and grading stay deterministic." },
      { label: "Integration", detail: "Prisma/Postgres stores question, explanation, and progress state behind a hashed-PIN identity flow that works across devices." },
      { label: "Staff delivery", detail: "The product constraint is educational trust: content, category weighting, and feedback behavior must be agreed before optimizing the UI." },
    ],
  },
  {
    matcher: /police alarm/i,
    notes: [
      { label: "Scale", detail: "The pilot covered five shops, three client surfaces, and six roles across shop, officer, radio-room, and command workflows." },
      { label: "Complexity", detail: "Targeting checks indexed on station and duty status are O(log n + k) for k eligible officers; each incident transition is O(1) plus audit writes." },
      { label: "AI and correctness", detail: "No AI sits in the emergency decision path; deterministic status transitions and append-only timelines are safer than opaque automation." },
      { label: "Integration", detail: "FCM push, LINE fallback, SSE dashboard updates, device-bound sessions, and Postgres must agree during partial delivery failures." },
      { label: "Staff delivery", detail: "The silent-panic workflow had to work for shop staff, officers, radio operators, and commanders without weakening auditability." },
    ],
  },
  {
    matcher: /enterprise e-invoice/i,
    notes: [
      { label: "Scale", detail: "The domain is modeled across 45+ Prisma models and produces PDF, Word, Excel, and dot-matrix-friendly output." },
      { label: "Complexity", detail: "Receipt state transitions are O(1) per command; indexed book, approval, and audit queries use O(log n + p) pagination." },
      { label: "AI and correctness", detail: "AI can assist with test and mapping drafts, but numbering, fiscal-year rules, Thai dates, and reprint approvals require deterministic review." },
      { label: "Integration", detail: "Puppeteer, react-pdf, docx, SheetJS, Thai fonts, and printer constraints are isolated behind document rendering boundaries." },
      { label: "Staff delivery", detail: "The coordination task is turning policy and approval responsibilities into explicit state machines that finance and operations can audit." },
    ],
  },
  {
    matcher: /web3 domain registrar/i,
    notes: [
      { label: "Scale", detail: "The product was split into three apps in a Turborepo while retaining shared auth, database, UI, and service packages." },
      { label: "Complexity", detail: "Character-price evaluation is O(c) for c characters; checkout reconciliation is O(1) per idempotency key plus O(t) for a selected transaction batch." },
      { label: "AI and correctness", detail: "AI may help review pricing and edge cases, but minting, referral locks, and 2FA remain explicit, testable state transitions." },
      { label: "Integration", detail: "wagmi/viem, on-chain minting, referral accounting, and three-provider email failover are kept behind service boundaries." },
      { label: "Staff delivery", detail: "The monorepo split required coordinating public, affiliate, and admin ownership without breaking shared contracts or release cadence." },
    ],
  },
  {
    matcher: /web3 matrix placement/i,
    notes: [
      { label: "Scale", detail: "The platform combines tiered purchases, forced binary placement, queues, rebirths, and a live tree view." },
      { label: "Complexity", detail: "Placement walks O(h) for hierarchy depth h; each queue or rebirth transition is O(1) before indexed persistence and audit writes." },
      { label: "AI and correctness", detail: "AI is limited to development assistance; purchase eligibility, placement, and payout rules are deterministic and testable." },
      { label: "Integration", detail: "BSC event signatures, RPC sync, USDT confirmation, and Postgres reconciliation are separated so chain delays cannot create duplicate purchases." },
      { label: "Staff delivery", detail: "The central coordination problem is making payout rules precise enough that product, finance, and engineering interpret the tree identically." },
    ],
  },
  {
    matcher: /game top-up/i,
    notes: [
      { label: "Scale", detail: "The backend has 33 models, 21 controllers, 34 migrations, and an admin surface of roughly 50 pages." },
      { label: "Complexity", detail: "Wallet and order commands are O(1) per transaction under indexed keys; history and admin lists use O(log n + p) pagination." },
      { label: "AI and correctness", detail: "AI can help generate repetitive tests and mappings, but wallet, coupon, and order invariants are protected by transactions and review." },
      { label: "Integration", detail: "Socket.io, LINE bot/LIFF login, catalog, promotions, and wallet operations share one authorization and event model." },
      { label: "Staff delivery", detail: "The senior challenge is keeping a broad commerce surface consistent while operators, support, and end users need different workflows." },
    ],
  },
  {
    matcher: /digital-goods store/i,
    notes: [
      { label: "Scale", detail: "Two payment rails, a storefront, a user dashboard, and an admin panel are unified behind one checkout contract." },
      { label: "Complexity", detail: "Validation is O(f) for f submitted fields; payment mutation is O(1) per idempotency key with O(t) reconciliation over selected transactions." },
      { label: "AI and correctness", detail: "AI assists implementation and test coverage, but QR slip review, USDT settlement, and refunds require evidence and compensating actions." },
      { label: "Integration", detail: "Thai QR slip verification and on-chain USDT settlement are isolated behind adapters so payment providers do not leak into UI logic." },
      { label: "Staff delivery", detail: "The work is aligning customer support, payment operations, and engineering on one status model for two different payment rails." },
    ],
  },
  {
    matcher: /evm chain metadata/i,
    notes: [
      { label: "Scale", detail: "The contribution spans Kotlin and JavaScript registry datasets consumed by wallets and dApps." },
      { label: "Complexity", detail: "Validation is O(n) over changed registry entries, while chain-ID lookup is O(1) with a keyed map or indexed registry." },
      { label: "AI and correctness", detail: "AI can suggest consistency checks, but chain IDs, RPC URLs, and native-currency metadata are verified against upstream conventions." },
      { label: "Integration", detail: "One inaccurate field can break connections across many independent wallet and dApp consumers." },
      { label: "Staff delivery", detail: "The coordination work is keeping a small, reviewable change set compatible with maintainers and downstream consumers." },
    ],
  },
  {
    matcher: /payment gateway platform/i,
    notes: [
      { label: "Scale", detail: "One engineer owned two environments, sandbox and production, across design, backend, frontend, testing, bank liaison, and go-live." },
      { label: "Complexity", detail: "Payment callbacks are O(1) per reference with indexed idempotency; reconciliation is O(t) over the selected transaction set." },
      { label: "AI and correctness", detail: "AI can accelerate scaffolding, but bank certification, callback signatures, and settlement evidence must be verified against the bank contract." },
      { label: "Integration", detail: "SCB APIs, callbacks, sandbox certification, UAT, paperwork, and production approval had to move in parallel." },
      { label: "Staff delivery", detail: "The responsibility was keeping technical delivery and external bank coordination synchronized so neither track blocked go-live." },
    ],
  },
  {
    matcher: /docflow/i,
    notes: [
      { label: "Scale", detail: "The system covers 20+ screens, 38 data models, 8 roles, and 28 granular permissions." },
      { label: "Complexity", detail: "Permission-filtered search is O(log n + p) with indexed pagination; folder cycle checks are O(h) over ancestor depth." },
      { label: "AI and correctness", detail: "AI can help draft tests and documentation, but RBAC, workflow transitions, and audit masking are enforced server-side and tested explicitly." },
      { label: "Integration", detail: "PDF/image/CSV preview, local/S3 storage adapters, sessions, notifications, and audit events stay behind replaceable boundaries." },
      { label: "Staff delivery", detail: "The hard part is turning document policy into permissions and approval states that legal, department owners, and users can understand." },
    ],
  },
  {
    matcher: /authoritative dice/i,
    notes: [
      { label: "Scale", detail: "The browser replays a server trace frame by frame, with 30 FPS, 45 FPS, and full-quality device profiles." },
      { label: "Complexity", detail: "Playback interpolation is O(d) per frame for d dice; the client does not duplicate the server's physics simulation." },
      { label: "AI and correctness", detail: "AI can help inspect rendering code, but physics and results stay server-authoritative and are never inferred by the client." },
      { label: "Integration", detail: "WebSockets, React Three Fiber, Drei, Three.js materials, and the live operations dashboard share an explicit trace contract." },
      { label: "Staff delivery", detail: "The senior trade-off is balancing visual fidelity, low-end device budgets, and a trust model that keeps the browser out of result calculation." },
    ],
  },
];

export function applyEngineeringNotes(project: Project): Project {
  if (project.engineeringNotes?.length) return project;
  const rule = RULES.find(({ matcher }) => matcher.test(project.title));
  return rule ? { ...project, engineeringNotes: rule.notes } : project;
}
