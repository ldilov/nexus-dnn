# Implementation Plan: LLM Chat wiring + Models Search "Downloaded" filter

**Branch**: `026-llm-chat-wiring-and-downloaded-filter` | **Date**: 2026-04-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/026-llm-chat-wiring-and-downloaded-filter/spec.md`

## Summary

Ship two tightly-coupled capabilities on top of spec 025:

1. A **Downloaded** filter on Models Search, fed by a new
   `GET /api/v1/model-store/installed` roll-up endpoint backed by a new
   `InstallMap::list_all()` method (migration 014 is already frozen).
2. Wire **Choose Model**, **+ New Session**, and the right-sidebar
   **Generation Parameters** form in `extensions/builtin/local-llm` to
   real JSON-RPC methods in the extension worker, and add a stub-adapter
   integration test that proves the exact values the user sees in the
   sidebar reach `LlamaCppAdapter::generate` byte-for-byte.

The hyperparameter path is the quality-gating concern: every other
surface is plumbing. Proof (`target/sc-026-proof.json`) is produced by
`cargo test -p nexus-api --test chat_hyperparameters_reach_llamacpp`
via a `record_next_call` shim on the existing `LlamaCppAdapter`.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV, per existing crates);
TypeScript 5.x / React 19 / Node ≥ 20 on the frontend; Python 3.11 for
the `local-llm` extension worker (existing).

**Primary Dependencies**:
- Rust: `axum 0.7`, `sqlx 0.8` (sqlite), `tokio 1.x`, `serde`,
  `thiserror`, `chrono`. No new workspace-level deps.
- Web: `react 19`, `react-router 7`, `swr 2`, `@vanilla-extract/css`,
  `sonner`, existing. No new frontend deps.
- Extension worker: `pydantic`, `aiohttp`, `pytest` — all existing. No
  new worker deps.

**Storage**:
- Host SQLite via `nexus-storage`. **No new migrations.** Read side uses
  `model_store_installed_artifacts` (migration 014, frozen by spec 025)
  through a new `InstallMap::list_all()` accessor.
- Extension SQLite at `extensions/builtin/local-llm/storage/*.db`. One
  additive migration: `generation_settings` JSON column on the existing
  `threads` table, plus `active_model_variant_id`, `active_model_family_id`
  nullable TEXT columns (idempotent `ALTER TABLE … ADD COLUMN IF NOT
  EXISTS` via the extension's existing migration runner).

**Testing**:
- Rust contract tests under `crates/nexus-api/tests/`.
- Extension Python tests under `extensions/builtin/local-llm/tests/`
  (pytest, existing setup).
- Frontend: vitest for `services/model_store.ts` URL round-trip
  extensions; Playwright for the send-to-llama flow with the stub
  adapter wired in via an `env NEXUS_TEST_MODE=1` feature flag (already
  used by the `record_next_call` path).

**Target Platform**: Windows / macOS / Linux desktop app. No server
deployment. Browser target is the bundled web view.

**Project Type**: Web application (existing backend + frontend + one
internal extension).

**Performance Goals** (from NFR-002 / NFR-003):
- One `/installed` GET per search page render; no per-family roll-up
  requests.
- Choose Model picker first-paint < 300 ms with 50 installed variants.
- Parameter write debounce client-side 200 ms; server roundtrip budget
  100 ms p95.

**Constraints**:
- **No** new code comments per Principle IV.
- **Zero** direct SQL queries from the extension worker against the
  host DB; extension reads installs through the host REST surface only
  (FR-042 / SC-004).
- `GenerationParams` is never mutated between `get_generation_settings`
  and the adapter call (SC-002 static assertion).

**Scale/Scope**:
- ≤ 200 installed artifacts per user (generous upper bound; typical
  is < 20).
- ≤ 500 threads per user.
- 6 hyperparameter fields exposed to llama.cpp; schema is frozen at
  this number for spec 026.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I — Ecosystem-First | PASS | No new libraries. Reuses `axum`, `sqlx`, SWR, vanilla-extract. The "record next call" test shim is ≈ 30 LOC over `std::sync::Mutex`; no crate needed. |
| II — SOLID / Pure | PASS | `GenerationParams → SamplingParams` is a pure mapping. `InstallMap::list_all` is a read-only query. UI state reducers stay pure. |
| III — Modularity / small crates | PASS | No new crates. Added surface lives in three existing modules: `nexus-models-store::downloads::install_map`, `nexus-api::handlers::model_store::installed`, `extensions/builtin/local-llm/worker/methods/chat.py` (new file). |
| IV — Self-Documenting (NON-NEGOTIABLE) | PASS | No inline rationale comments. Every "why" lives in this spec + plan. Task list will enforce. |
| V — Sealed adapters | PASS | `record_next_call` is added as a `pub(crate)` hook on the **existing** `LlamaCppAdapter`, not as a new public plug-in. The sealed trait stays sealed. |
| VI — Test-First | PASS | Contract test for FR-022 ships in Phase 1 **before** the `send_message` handler lands in Phase 2. Pinned by task ordering. |
| VII — Memory & Type Safety | PASS | No `unsafe`. `GenerationParams` uses newtype-like validation at the edge; adapter owns clamping. |
| VIII — Living Documentation | PASS | CHECKPOINT.md will track. `apps/web/src/models/README.md` gets a one-line update when the Downloaded chip lands. |
| IX — Git-Flow / Bisectable | PASS | Branch `026-…`. Tasks order admits 3–5 bisectable commits (install REST → worker methods → sidebar form wiring → proof test → polish). |
| X — Parallelism-First | PASS | Stories 1, 2+3, 4 are parallelisable. `[P]` markers on install-REST, worker methods, sidebar-form UI, sampler shim. |
| XI — Rust Idioms | PASS | `InstallMap::list_all` returns `Vec<InstalledArtifactRow>`; reuses the existing row parser. No anti-pattern additions. |
| XII — Frontend layering | PASS | Downloaded chip ships inside `views/models-search/components/FilterBar.tsx`. The LLM chat picker ships inside the extension layout tree; no cross-view imports. |

**Gates open. No complexity-tracking entries required.**

## Project Structure

### Documentation (this feature)

```text
specs/026-llm-chat-wiring-and-downloaded-filter/
├── plan.md              # This file
├── spec.md              # Feature spec (already written)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── rest-installed.md
│   ├── extension-worker-jsonrpc.md
│   └── sampler-proof.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
crates/
├── nexus-models-store/
│   └── src/downloads/install_map.rs       # +list_all()
├── nexus-api/
│   ├── src/handlers/model_store/
│   │   ├── installed.rs                   # NEW — GET /installed handler
│   │   ├── mod.rs                         # +pub mod installed;
│   │   └── search.rs                      # +installed filter join
│   ├── src/router.rs                      # +route wiring
│   └── tests/
│       ├── contract_model_store_installed.rs   # NEW
│       └── chat_hyperparameters_reach_llamacpp.rs  # NEW (proof)
└── nexus-backend-runtimes/
    └── src/llamacpp/adapter.rs            # +record_next_call shim

extensions/builtin/local-llm/
├── storage/migrations/
│   └── 002_generation_settings.sql        # NEW
├── worker/
│   ├── methods/
│   │   ├── chat.py                        # NEW — new_thread, list_threads,
│   │   │                                  #       get/set_active_model,
│   │   │                                  #       get/set_generation_settings,
│   │   │                                  #       send_message,
│   │   │                                  #       list_downloaded_models
│   │   └── __init__.py                    # +import chat
│   └── chat/
│       ├── session_manager.py             # +active_model + params columns
│       └── executor.py                    # pass GenerationParams through
└── tests/
    └── test_chat_wiring.py                # NEW

apps/web/src/
├── services/
│   └── model_store.ts                     # +fetchInstalled(),
│                                          #  parse/serialise installed param
├── views/models-search/
│   └── components/
│       └── FilterBar.tsx                  # +Downloaded chip
└── (no other web changes — the LLM extension owns the Local Chat surface)
```

**Structure Decision**: Web-application layout with backend (Rust
crates) + frontend (apps/web) + one internal Python extension. No new
crates. One new host migration NOT required (reuses migration 014). One
new extension migration (additive columns only).

## Phase 0 — Research

Generated artifact: [`research.md`](./research.md). Scope:

R1. Shape of the `/installed` roll-up — one flat list vs
family-grouped vs per-variant. Chose flat + family-keyed convenience
map; frontend joins in-process.

R2. Whether to add `installed` to the existing search handler's filter
pipeline or to fork a dedicated handler. Chose: extend search handler
with an optional SQLite join against `model_store_installed_artifacts`
so the Downloaded chip composes with format / modality / compat without
N+1 requests.

R3. Where per-session generation settings live. Chose: JSON column on
the existing extension `threads` table (simplest; no extra table; no
join at read time). Columns: `generation_settings TEXT` (JSON),
`active_model_family_id TEXT`, `active_model_variant_id TEXT`.

R4. How the extension worker fetches installed models without DB
access to the host. Chose: the worker already speaks to the host over
the existing JSON-RPC transport layer; add a host-facing client call
`host.api.model_store.installed()` that wraps the new REST endpoint.
Principle V (sealed adapters) is honoured — the extension is a
consumer, not a co-owner.

R5. Sampler-shim design. Chose: `LlamaCppAdapter::set_recorder(Box<dyn
CallRecorder + Send + Sync>)` test-only entry point behind `#[cfg(any(
test, feature = "test-shim"))]`. Adapter records the `SamplingParams`
struct, system prompt, and user content handed in, then returns a
deterministic stub stream. Default `None` recorder = production path
untouched.

R6. Proof artifact format. Chose: `target/sc-026-proof.json` —
`{ "spec": "026", "captured": { …SamplingParams, "system_prompt":…,
"user_content":… } }`. The integration test writes it on success.

## Phase 1 — Design & Contracts

Generated artifacts:

- [`data-model.md`](./data-model.md) — entities: `InstalledArtifactRow`
  (reused), `Thread` (additive columns), `GenerationParams` (new, pure
  serde struct), `ActiveModelBinding` (derived view), DTOs.
- [`contracts/rest-installed.md`](./contracts/rest-installed.md) —
  `GET /api/v1/model-store/installed` request/response + error cases.
- [`contracts/extension-worker-jsonrpc.md`](./contracts/extension-worker-jsonrpc.md)
  — 8 new `llm.*` methods with exact param + return shapes.
- [`contracts/sampler-proof.md`](./contracts/sampler-proof.md) — the
  contract test's input, capture record, and proof-file schema.
- [`quickstart.md`](./quickstart.md) — "from zero to proof": install one
  GGUF, open Local Chat, new session → pick model → set
  temperature=0.1, max_tokens=16 → send → inspect
  `target/sc-026-proof.json`.

Agent-context update: running
`.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`
adds spec 026's tech notes to CLAUDE.md (existing convention).

**Post-design Constitution re-check**:

| Gate | Status |
|---|---|
| New crates? | No. |
| New public deps? | No. |
| Comments added? | No. Zero `//` inline rationale in any file touched. |
| Sealed-adapter violation? | No — `record_next_call` is `pub(crate)`, gated `#[cfg(...)]`. |
| Test-first ordering? | Yes — contract test (T-H1) is T+0, handler/adapter wiring is T+1. |
| Per-file size < 800 lines? | Yes. Largest new file is `extensions/builtin/local-llm/worker/methods/chat.py` ≤ 450 LOC. |
| Parallel markers sensible? | Yes — install-REST (Rust) / sampler-shim (Rust) / chat.py (Python) / FilterBar.tsx (web) all share zero files. |

Gates still open. Proceed to `/speckit-tasks`.

## Phase 2 — Task planning (deferred)

`/speckit-tasks` will produce `tasks.md` from this plan. Expected shape:

- **Setup** (3 tasks): spec branch confirmation, extension migration
  002 stub, sampler-shim skeleton behind `#[cfg(test)]`.
- **Foundational** (6 tasks): `InstallMap::list_all`, installed DTO +
  route + handler skeleton (501), `GenerationParams` serde struct,
  extension `threads` column ADDs, `chat.py` method skeletons (returning
  stubs), `host.api.model_store.installed()` client helper.
- **US1 — Downloaded filter** (≈ 10 tasks): search-handler join, URL
  round-trip vitest update, FilterBar chip, empty-state deep link,
  SWR refetch on download-complete event.
- **US2 — New Session** (≈ 6 tasks): `new_thread` handler, thread-store
  write, list-threads event fan-out, UI event subscription, keyboard
  wiring, contract test.
- **US3 — Choose Model** (≈ 10 tasks): picker modal component +
  dataSource → `llm.list_downloaded_models`, set_active_model handler,
  session chip, unavailable-state handling, keyboard nav, a11y spec.
- **US4 — Hyperparameters reach llama.cpp + proof** (≈ 8 tasks):
  contract test `chat_hyperparameters_reach_llamacpp.rs` (written
  FIRST), `GenerationParams` → `SamplingParams` mapper, adapter
  `set_recorder`, stub streaming response, `target/sc-026-proof.json`
  emitter, CI artifact upload wiring, sidebar form `onChange` debounce
  + persistence.
- **US5 — Parameter persistence** (≈ 4 tasks): threads-table JSON
  read/write, session switch restores form, per-message metadata
  freeze, test.
- **US6 — Install-state roll-up no-N+1** (≈ 3 tasks): single-fetch
  verification test, SWR dedupe, Playwright network-tab assertion.
- **Polish** (≈ 6 tasks): scope-diff gate for spec 026, a11y sweep,
  Playwright end-to-end "new session → pick model → tune → send → see
  stream", docs sweep, CHECKPOINT, `/speckit-analyze` re-pass.

Estimated total: ≈ 56 tasks.

## Complexity Tracking

No constitution-gate violations; no justifications required.
