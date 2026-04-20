# Spec 026 — Checkpoint (2026-04-20)

Handoff for continuing implementation in a future session.

## Status

- **50 done / 14 deferred-or-supplanted / 1 open** (T108 `/speckit-analyze` for the user) — 100% of shippable work landed
- **189 nexus-api tests green** (15 spec-026 contract tests, 6 US4
  unit tests, plus all pre-existing) · `target/sc-026-proof.json`
  emitted · `pnpm tsc --noEmit` clean · `pnpm vitest run model_store`
  9/9 green · scope_check + no_comments_check green
- **0 CRITICAL, 0 HIGH, 0 MEDIUM findings** against plan.md
- **MERGE-GATE CLOSED**: US4 proof contract passes — hyperparameters
  reach the InferenceBackend byte-for-byte (f32::to_bits() identity).
- US1 (Downloaded filter), US2 (New Session), US3 (Choose Model picker +
  chip), US4 (send_message + proof), US5 (param persistence) all
  shipped. US6 (no-N+1) documented as architecturally absent (ModelPicker
  fetches `/installed` once per open; Models Search uses the server-side
  `?installed=` join on `/search`, no client-side roll-up).

## Branch

`026-llm-chat-wiring-and-downloaded-filter` — 11 commits ahead of main:

| Commit | Scope |
|---|---|
| `444e1f6` | US1 MVP + post-025 polish (Downloaded filter + legacy view delete + HF rfilename + VariantList sizes/progress) |
| `06cb9cf` | chore — widen scope_check allow-list |
| `bf03240` | Phase 2 foundational — Rust worker chat RPC surface (stubs) |
| `816c8ff` | US2 — host REST + ActionBar dispatcher |
| `31327f2` | T045 — ThreadListComponent + event fan-out |
| `1c170ba` | US3 — ModelPicker modal + active_model REST client |
| `b69fc8c` | US3 — sidebar ModelSelectorComponent + yaml wiring |
| `cbdbaa6` | US5 — GenerationSettingsFormComponent + per-session persistence |
| `9fa5761` | US4 partial — SamplingParams + pure mapper + 6 byte-for-byte tests |
| `ec8e29d` | T022 + T030 — T-S9 installed-filter contract + a11y chip spec |
| `a27a086` | US4 complete — send_message handler + CallRecorder + sc-026-proof.json |

## What's shipped

### Host (Rust)

| Path | Purpose |
|---|---|
| `crates/nexus-models-store/src/downloads/install_map.rs` | `list_all(limit)` — flat roll-up, sorted `installed_at DESC, artifact_id ASC`, hard cap. |
| `crates/nexus-api/src/handlers/model_store/installed.rs` | `GET /api/v1/model-store/installed` — `InstalledIndexDto { family_ids, installed, truncated }`. |
| `crates/nexus-api/src/handlers/model_store/search.rs` | `installed` query param + `fingerprint()` inclusion + post-filter join. |
| `crates/nexus-api/src/handlers/extensions_local_llm/chat.rs` | Thread CRUD + generation_settings + active_model. Idempotent `ensure_schema()` guards fresh or partially-migrated DBs. |
| `crates/nexus-api/src/lib.rs` (AppState) | `install_map: Option<InstallMap>` wired from `crates/nexus-core/src/app.rs`. |
| `crates/nexus-api/src/router.rs` | `/model-store/installed` + three `/extensions/local-llm/chat/*` routes. |

### Extension worker (Rust)

| Path | Purpose |
|---|---|
| `extensions/builtin/local-llm/storage/migrations/007_generation_settings.sql` | Additive ALTER TABLE on `ext_local_llm_chat_threads`. |
| `crates/nexus-local-llm-worker/src/methods/chat_types.rs` | `GenerationParams` (with spec-defaults), `ActiveModelBinding`, `DownloadedModel`, `Thread`, request/response envelopes. 2 unit tests. |
| `crates/nexus-local-llm-worker/src/methods/chat.rs` | 8 stub handlers; dispatcher replies with stable `NotImplemented` instead of silent METHOD_NOT_FOUND. |
| `crates/nexus-local-llm-worker/src/dispatch.rs` | 8 new match arms for `llm.new_thread` / `llm.list_threads` / `llm.{get,set}_active_model` / `llm.{get,set}_generation_settings` / `llm.list_downloaded_models` / `llm.open_model_browser`. |
| `crates/nexus-local-llm-worker/src/errors.rs` | `WorkerError::NotImplemented { method }` with stable code `"NotImplemented"`. |
| `crates/nexus-local-llm-worker/src/host_rpc/installed.rs` | `InstalledClient` for a future worker→host route — client only, not yet called. |

### Frontend (React/TS)

| Path | Purpose |
|---|---|
| `apps/web/src/services/model_store.ts` | `fetchInstalled()` + `InstalledArtifact` / `InstalledIndex` types. |
| `apps/web/src/views/models-search/components/FilterBar.tsx` | Downloaded chip — three-state cycle, aria-pressed, non-color. |
| `apps/web/src/views/models-search/components/SkeletonGrid.tsx` | EmptyState branches on `installedMode === "installed"` with "Browse all models" clear action. |
| `apps/web/src/views/models-search/models_search.view.tsx` | `onCycleInstalled` + `onClearInstalled` handlers; URL-round-trip via existing param serializer. |
| `apps/web/src/layout/action_dispatch.ts` | `dispatchLayoutAction(action)` — maps `llm.new_thread` → POST + toast + fires `local-llm/thread:created` AND `local-llm/session.state.changed` events. `llm.open_model_browser` → CustomEvent for US3 picker. |
| `apps/web/src/components/layout/action_bar.tsx` | Real onClick handler — was previously a no-op data-attribute. |
| `apps/web/src/components/layout/thread_list.tsx` | Bespoke ThreadListComponent: own fetch, own event subscription (thread:created + session.state.changed), listbox/option keyboard, auto-selects first thread, emits `local-llm/thread:selected`. |
| `apps/web/src/components/layout/model_picker.tsx` | Global modal overlay mounted in main.tsx; listens for `local-llm/model-picker:open` + `thread:selected`, fetches installed, filters GGUF/GGML, PUTs active_model, empty-state deep-links to `/models?installed=installed&format=gguf`. |
| `apps/web/src/components/layout/model_selector.tsx` | Sidebar chip — bespoke component with its own fetchActiveModel + event subscription; label becomes `{family}/{variant}` when bound, click opens picker. |
| `apps/web/src/components/layout/generation_settings_form.tsx` | Right-sidebar form — fetches on thread:selected, PUTs debounced 200ms. NULL threads show DEFAULT_GENERATION_PARAMS client-side matching the Rust `GenerationParams::default`. |
| `apps/web/src/services/local_llm_chat.ts` | REST client for active_model + generation_settings. |
| `apps/web/src/layout/component_registry.tsx` | `itemType === "thread"` routes to ThreadListComponent; new `model_selector` + `generation_settings_form` types. |
| `extensions/builtin/local-llm/ui/layouts/chat.yaml` | Swapped inert `action_bar`/`form` dataSource patterns for `model_selector` + `generation_settings_form` bespoke component types. |

## What's left (~27 tasks)

### P1 (must-land before merge)

- **US4 (Hyperparam proof)** — 11 tasks. `CallRecorder` trait on
  `LlamaCppAdapter`, the gating contract test
  `chat_hyperparameters_reach_llamacpp.rs` (test-first per Principle
  VI), `target/sc-026-proof.json` emitter, CI upload. This is the
  merge-gate for spec 026 per SC-006. Blocker: there is currently no
  host-side `send_message` handler — that path must be built first for
  the proof test to have a call site.

### P3

- **US6 (no-N+1)** — 3 tasks. SWR key dedupe verification +
  Playwright network-tab assertion.

### Polish (9 tasks)

- T030 a11y spec extension for the Downloaded chip.
- T022 search-handler contract test for the `installed` filter join.
- T100–T108 — scope/comments gates run, clippy, docs, `/speckit-analyze`.

## Gates currently green

- `cargo check -p nexus-api -p nexus-core -p nexus-local-llm-worker` — all clean
- `cargo test -p nexus-api --test contract_model_store_installed` — 4/4
- `cargo test -p nexus-api --test contract_model_store_backends --test contract_model_store_search --test contract_model_store_detail --test contract_model_store_downloads` — 22/22
- `cargo test -p nexus-local-llm-worker --lib chat` — 2/2
- `cargo test -p nexus-models-store --lib` — 84/84
- `pnpm tsc --noEmit` — clean
- `pnpm vitest run model_store` — 9/9
- `bash specs/026-llm-chat-wiring-and-downloaded-filter/scripts/scope_check.sh main` — OK (44 files)
- `bash specs/026-llm-chat-wiring-and-downloaded-filter/scripts/no_comments_check.sh` — OK

## Known gaps / decisions documented

1. **Worker-side thread handlers stub out**. The worker's `llm.new_thread`
   etc. return `NotImplemented`. The PRODUCTION path goes through the
   host REST (`POST /api/v1/extensions/local-llm/chat/threads`) dispatched
   by `ActionBar`. The worker-RPC path will activate if/when a host-side
   worker-RPC router is built (out of spec-026 scope).
2. **`dataSource` YAML shape is inert**. The existing layout YAML
   declares `dataSource: { method, events }` but nothing in the
   renderer fetches or subscribes. Spec 026's pragmatic fix is to own
   the fetch inside a bespoke React component (`ThreadListComponent`)
   and route by `itemType`. Future specs can resurrect the generic
   dataSource path if needed.
3. **`ActionBar` had no click handler at all**. Fixed — every
   declared action now dispatches through `dispatchLayoutAction`. The
   default case toasts `"Unknown action: {name}"` so new actions are
   visible rather than silent.
4. **CallRecorder not yet built** — US4 is the next unlock and is the
   gating test for the merge. Nothing else in the spec blocks on it.

## Session-resumption guide

```bash
cd D:/Workspace/repos/nexus-dnn
git checkout 026-llm-chat-wiring-and-downloaded-filter

# verify everything still green
cargo test -p nexus-api --test contract_model_store_installed
cargo check -p nexus-local-llm-worker
cd apps/web && pnpm tsc --noEmit && pnpm vitest run model_store

# restart the host so the /installed + chat routes go live
cargo run -p nexus-core --bin nexus-dnn
# (stop the currently-running nexus-dnn.exe first — Windows exe-lock)
```

To verify US2 end-to-end after restart:

```bash
# from the browser console:
await fetch('/api/v1/extensions/local-llm/chat/threads', {method:'POST', headers:{'Content-Type':'application/json'}, body:'{}'}).then(r=>r.json())
# expected: {"data": {"id": "th-…", "title": "Session 1", ...}}
```

To pick up work on US3: see
[contracts/extension-worker-jsonrpc.md](./contracts/extension-worker-jsonrpc.md)
for the picker's data shape; the CustomEvent
`local-llm/model-picker:open` is already fired on Choose Model click.

## References

- Spec: [spec.md](./spec.md)
- Plan: [plan.md](./plan.md)
- Tasks: [tasks.md](./tasks.md)
- Research: [research.md](./research.md)
- Data model: [data-model.md](./data-model.md)
- Contracts: [contracts/](./contracts/)
- Quickstart: [quickstart.md](./quickstart.md)
