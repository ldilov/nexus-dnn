---
description: "Task list for 026-llm-chat-wiring-and-downloaded-filter"
---

# Tasks: LLM Chat wiring + Models Search "Downloaded" filter

**Input**: Design documents from `/specs/026-llm-chat-wiring-and-downloaded-filter/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Mandatory per Principle VI. US4's proof contract test is the gating test and MUST be written before its production code (see strategy note under Phase 6).

**Organization**: Tasks grouped by user story (US1–US6) so every P1 story is independently deployable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: May run in parallel (different files, no dependency on an incomplete task).
- **[Story]**: Maps to the user story (US1..US6). Setup / Foundational / Polish carry no story label.
- All paths are absolute to the repo root.

## Path Conventions

- Rust: `crates/nexus-models-store/`, `crates/nexus-api/`, `crates/nexus-backend-runtimes/`.
- Extension: `extensions/builtin/local-llm/`.
- Web: `apps/web/src/`.
- Tests: `crates/nexus-api/tests/`, `extensions/builtin/local-llm/tests/`, `apps/web/tests/`.

---

## Phase 1: Setup (shared infrastructure)

**Purpose**: Branch hygiene + scaffolding with no production behavior.

- [X] T001 Confirm branch `026-llm-chat-wiring-and-downloaded-filter` is based on `main` post-spec-025 merge; abort if divergence detected. Repo root.
- [X] T002 [P] Create `specs/026-llm-chat-wiring-and-downloaded-filter/scripts/scope_check.sh` — anchored allow-list mirroring spec 025's pattern with the 026 allow-list (paths under Phase 3–8).
- [X] T003 [P] Create `specs/026-llm-chat-wiring-and-downloaded-filter/scripts/no_comments_check.sh` — `rg -n '^\\s*//[^!/]' <allow-list paths>` exits non-zero on any inline `//` rationale in files touched by this spec (Principle IV gate).
- [X] T004 [P] Create handler module skeleton in `crates/nexus-api/src/handlers/model_store/installed.rs` — empty handler returning 501; `crates/nexus-api/src/handlers/model_store/mod.rs` adds `pub mod installed;`.

**Checkpoint**: `cargo check --workspace` + `pnpm tsc --noEmit` both pass; navigating to `/api/v1/model-store/installed` returns 501.

---

## Phase 2: Foundational (blocking prerequisites for every user story)

**Purpose**: Shared spine — DTOs, newtype surfaces, extension migration, worker method table.

> **Correction (2026-04-20)**: the `local-llm` extension was Rust-ported
> in spec 024 (`crates/nexus-local-llm-worker/`); the original Python
> `worker/` tree is dead legacy. T010 / T013 / T014 / T015 re-target to
> the Rust worker; paths updated below.

- [X] T010 Add additive migration `extensions/builtin/local-llm/storage/migrations/007_generation_settings.sql` — three idempotent `ALTER TABLE ext_local_llm_chat_threads ADD COLUMN` statements (`generation_settings TEXT`, `active_model_family_id TEXT`, `active_model_variant_id TEXT`).
- [X] T011 [P] Add `InstalledArtifactDto` + `InstalledIndexDto` structs in `crates/nexus-api/src/dto/model_store.rs` (or colocated with `installed.rs` if the DTO module does not exist), with `serde(rename_all = "snake_case")` and `#[non_exhaustive]` where applicable.
- [X] T012 [P] Define `pub async fn list_all(&self) -> JobStoreResult<Vec<InstalledArtifactRow>>` on `InstallMap` in `crates/nexus-models-store/src/downloads/install_map.rs`. Sort: `installed_at DESC, artifact_id ASC`. Hard cap 500 rows.
- [X] T013 [P] Add serde structs `GenerationParams` (with `Default` matching data-model.md defaults) + `ActiveModelBinding` + `DownloadedModel` in `crates/nexus-local-llm-worker/src/methods/chat_types.rs` (new file).
- [X] T014 Create `crates/nexus-local-llm-worker/src/methods/chat.rs` with stub handlers returning `METHOD_NOT_IMPLEMENTED` for `llm.new_thread`, `llm.list_threads`, `llm.get_active_model`, `llm.set_active_model`, `llm.get_generation_settings`, `llm.set_generation_settings`, `llm.list_downloaded_models`, `llm.open_model_browser`. Wire new match arms in `crates/nexus-local-llm-worker/src/dispatch.rs`.
- [X] T015 [P] Add `InstalledClient` in `crates/nexus-local-llm-worker/src/host_rpc/installed.rs` — wraps `transport.call("host.models.installed", …)`. Host-side handler registration deferred to US3 (we only need the client surface for foundational compile).
- [X] T016 [P] Add the route entry `GET /api/v1/model-store/installed` in `crates/nexus-api/src/router.rs` wired to `handlers::model_store::installed::get_installed` (handler stub still 501 from T004).

**Checkpoint**: Extension restart runs migration 007 cleanly; `cargo check -p nexus-local-llm-worker` passes; RPC dispatcher answers the new methods with a stable `METHOD_NOT_IMPLEMENTED` error.

---

## Phase 3: User Story 1 — Downloaded filter on Models Search (Priority: P1) 🎯 MVP

**Story goal**: Filter the grid on Models Search to installed-only (or not-installed) using a chip driven by URL-round-tripped state.

**Independent test**: Install one GGUF variant; load `/models?installed=installed`; grid shows exactly that family; reload preserves state; clearing the chip restores the full grid.

### Tests for User Story 1

- [X] T020 [P] [US1] Add vitest cases in `apps/web/src/services/model_store.test.ts` covering `parseSearchParams` ↔ `serializeSearchParams` round-trip for `installed=any|installed|not_installed`, including default-elision of `any` from the URL.
- [X] T021 [US1] Add contract test `crates/nexus-api/tests/contract_model_store_installed.rs` covering T-I1..T-I5 from `contracts/rest-installed.md`. Test MUST fail until T023 lands.
- [ ] T022 [US1] Add contract test in `crates/nexus-api/tests/contract_model_store_search.rs` (new case T-S9) asserting `installed=installed` filters results against an installed set, `installed=not_installed` inverts, `installed=any` is a no-op.

### Implementation for User Story 1

- [X] T023 [US1] Implement `GET /api/v1/model-store/installed` in `crates/nexus-api/src/handlers/model_store/installed.rs` — calls `InstallMap::list_all()`, projects to `InstalledIndexDto`, derives `family_ids` as the unique set, applies the 500 cap + `truncated` flag.
- [X] T024 [US1] Extend `crates/nexus-api/src/handlers/model_store/search.rs` `SearchQuery` with `installed: Option<String>`, parse from query string, include in `fingerprint()` so cache entries don't collide.
- [X] T025 [US1] In the same file, fetch the installed roll-up once per miss via the same `AppState` that serves `/installed`, intersect with the normalized families, apply `installed=installed` / `installed=not_installed` filter between the format/compat filters and the sort.
- [X] T026 [P] [US1] Extend `apps/web/src/services/model_store.ts`:
  - Add `InstalledArtifact` + `InstalledIndex` types matching the DTOs.
  - Add `fetchInstalled(signal)` fetcher.
  - Extend `parseSearchParams` / `serializeSearchParams` for `installed`.
- [X] T027 [P] [US1] Add Downloaded chip to `apps/web/src/views/models-search/components/FilterBar.tsx` — three-state toggle (any → installed → not_installed → any). Keyboard: Enter/Space cycles. Style via existing `chip`/`chipActive` variants.
- [X] T028 [US1] Wire chip state round-trip in `apps/web/src/views/models-search/models_search.view.tsx` — map URL param to chip visual state, dispatch updates through the existing URL-mutation handler.
- [X] T029 [P] [US1] Extend the empty state in `apps/web/src/views/models-search/components/SkeletonGrid.tsx` (EmptyState) — when `params.installed === "installed"` and the result set is empty, render the "No downloaded models yet" copy + anchor to `/models` with the filter cleared.
- [ ] T030 [US1] Append Downloaded chip assertion to `apps/web/tests/a11y/models-search.a11y.spec.ts` — chip focusable, Enter cycles state, non-color channel preserved.

**Checkpoint**: All US1 contract tests green; vitest round-trip green; manually: `/models?installed=installed` shows the installed set; reload preserves URL.

---

## Phase 4: User Story 2 — "+ New Session" creates a real chat thread (Priority: P1)

**Story goal**: The + New Session button creates a new thread, selects it, fans out `session.state.changed`, and persists across reload.

**Independent test**: Click **+ New Session** twice → Recent History has two rows; reload → both remain.

### Tests for User Story 2

- [ ] T040 [P] [US2] Pytest case T-C1 in `extensions/builtin/local-llm/tests/test_chat_wiring.py` asserts `llm.new_thread` writes a row and `llm.list_threads` returns it.
- [ ] T041 [P] [US2] Pytest case asserting `llm.new_thread` emits `session.state.changed` exactly once per call (mock event bus).

### Implementation for User Story 2

- [X] T042 [US2] Implement `handle_new_thread` in `extensions/builtin/local-llm/worker/methods/chat.py` — inserts via `session_manager.create_thread(title=…)`; default title `Session {N}` where N = next integer for the current calendar day.
- [X] T043 [US2] Extend `extensions/builtin/local-llm/worker/chat/session_manager.py::create_thread` (new method; existing `list_threads` stays intact) to insert + return the hydrated `Thread` DTO.
- [X] T044 [US2] Register `llm.new_thread` + `llm.list_threads` in the `chat.py` handler table; confirm `methods/__init__.py` picks them up.
- [X] T045 [US2] Emit `session.state.changed` post-commit via the existing event bus; reuse the pattern from `llm.update_profile` in `methods/profile.py`.
- [X] T046 [P] [US2] No frontend change required — the existing `action_bar` in `extensions/builtin/local-llm/ui/layouts/chat.yaml` already calls `llm.new_thread`. Only dataSource verification: `thread_list.events` already includes `session.state.changed`.

**Checkpoint**: Pytest suite green; manual click of **+ New Session** creates and selects a thread; reload preserves selection.

---

## Phase 5: User Story 3 — "Choose Model" binds a downloaded GGUF to the session (Priority: P1)

**Story goal**: Picker modal lists installed GGUF variants grouped by family; selecting binds `(family, variant)` to the active thread.

**Independent test**: Install two GGUF variants; open Local Chat; pick `Q8_0`; sidebar chip updates; reload; chip still shows `Q8_0`.

### Tests for User Story 3

- [ ] T050 [P] [US3] Pytest T-C2 in `extensions/builtin/local-llm/tests/test_chat_wiring.py` — `set_active_model` writes, `get_active_model` reads matching `ActiveModelBinding`.
- [ ] T051 [P] [US3] Pytest T-C6 — `list_downloaded_models` calls `host.api.model_store.installed()` exactly once per invocation (mock HTTP client asserts call count = 1).
- [ ] T052 [US3] Playwright case in `apps/web/tests/a11y/local-chat.a11y.spec.ts` (new file) — picker opens, keyboard-navigable, selecting updates sidebar chip.

### Implementation for User Story 3

- [ ] T053 [US3] Implement `handle_list_downloaded_models` in `extensions/builtin/local-llm/worker/methods/chat.py` — awaits `host.api.model_store.installed()`, filters to `format in {"gguf","ggml"}`, projects to `DownloadedModel`.
- [ ] T054 [US3] Implement `handle_get_active_model` + `handle_set_active_model` in the same file. `set_active_model` validates the `(family_id, variant_id)` pair exists in `installed()` before writing; returns `not_found` (404) otherwise.
- [ ] T055 [US3] Thread write helpers in `extensions/builtin/local-llm/worker/chat/session_manager.py` — `set_active_model(thread_id, family_id, variant_id)` and `get_active_model(thread_id)` methods reading the new columns.
- [ ] T056 [P] [US3] Add `extensions/builtin/local-llm/ui/components/model_picker.yaml` — modal with `role="dialog"`, `role="listbox"`, `role="option"` rows, dataSource `llm.list_downloaded_models`. Wire `action_bar#model_selector` to open this modal via the existing `llm.open_model_browser` command (re-declare command to open this modal).
- [ ] T057 [US3] Add empty-state branch in the picker — when the list is empty, render "Go to Model Foundry" anchor with deep link `/models?installed=installed&format=gguf`.
- [ ] T058 [P] [US3] `active_model` chip on the sidebar — update `extensions/builtin/local-llm/ui/layouts/chat.yaml` `model_selector` dataSource to `llm.get_active_model`; render label `{family_id} / {variant_id}` when bound, fallback to existing copy when null.
- [ ] T059 [US3] Dead-pointer handling per FR-014 — `executor.py` checks that `absolute_path` exists before `send_message` proceeds; if missing, raise `model_unavailable` (mapped to 410 at the handler). Handler emits a `session.state.changed` so the UI re-renders the chip.

**Checkpoint**: Pytest green; picker modal opens via Tab + Enter; selection persists across reload.

---

## Phase 6: User Story 4 — Hyperparameters reach llama.cpp + mechanical proof (Priority: P1)

**Story goal**: UI sliders for `temperature / top_p / top_k / max_tokens / repeat_penalty / system_prompt` are persisted per thread and forwarded to `LlamaCppAdapter` unchanged. Proof is a CI-uploaded JSON artifact.

**Independent test**: `cargo test -p nexus-api --test chat_hyperparameters_reach_llamacpp` passes; `target/sc-026-proof.json` is emitted and matches the fixed expected shape.

### Tests for User Story 4 (WRITTEN FIRST — Principle VI gate)

- [ ] T060 [US4] Author `crates/nexus-api/tests/chat_hyperparameters_reach_llamacpp.rs` with assertions T-H1..T-H10 from `contracts/sampler-proof.md`. MUST compile but MUST fail until T061–T066 land. This ordering is the test-first proof per Principle VI and SC-006.
- [ ] T061 [P] [US4] Pytest T-C3 in `extensions/builtin/local-llm/tests/test_chat_wiring.py` — `set_generation_settings` with `temperature=3.0` returns 422 `validation`; in-range value persists and round-trips via `get_generation_settings`.
- [ ] T062 [P] [US4] Pytest T-C4 — `send_message` with no active model returns `no_active_model` (422).

### Implementation for User Story 4

- [ ] T063 [US4] Add `CallRecorder` trait + `SamplerCall` struct to `crates/nexus-backend-runtimes/src/llamacpp/adapter.rs` behind `#[cfg(any(test, feature = "test-shim"))]` per `contracts/sampler-proof.md`. Store `recorder: Option<Box<dyn CallRecorder>>` on the adapter; record before handing off to `llama-cpp-2`.
- [ ] T064 [US4] Expose `LlamaCppAdapter::set_recorder(...)` (gated `#[cfg(...)]`, `pub(crate)`) and a `test-shim` feature in `crates/nexus-backend-runtimes/Cargo.toml`.
- [ ] T065 [US4] Implement `handle_get_generation_settings` + `handle_set_generation_settings` in `extensions/builtin/local-llm/worker/methods/chat.py`. Validate via `GenerationParams` pydantic model; persist as JSON column on `threads`; read defaults on NULL.
- [ ] T066 [US4] Implement `handle_send_message` in the same file — loads `GenerationParams`, resolves `ActiveModelBinding`, converts to `SamplingParams` via a pure-function mapper in `worker/chat/executor.py`, calls the adapter. Pre-conditions run in the fail-fast order from `contracts/extension-worker-jsonrpc.md`.
- [ ] T067 [US4] Persist `messages.params_snapshot TEXT` — additive column add via `extensions/builtin/local-llm/storage/migrations/003_params_snapshot.sql`. Write the snapshot at message-commit; read back unchanged on replay. This satisfies FR-021.
- [ ] T068 [US4] Proof emitter — at the end of the test (T060), write `target/sc-026-proof.json` with the captured snapshot and ISO-8601 `passed_at`. Include `std::fs::create_dir_all("target")` for sandbox safety.
- [ ] T069 [US4] CI artifact wiring — update `.github/workflows/*` (or equivalent project CI) to upload `target/sc-026-proof.json` on success. One-line addition.
- [ ] T070 [P] [US4] Sidebar form `onChange` → debounced `llm.set_generation_settings` in the existing form node of `extensions/builtin/local-llm/ui/layouts/chat.yaml`. Debounce 200 ms on the client dataSource layer (existing infra supports `debounceMs`).

**Checkpoint**: `cargo test -p nexus-api --test chat_hyperparameters_reach_llamacpp` green; `target/sc-026-proof.json` emitted; pytest green.

---

## Phase 7: User Story 5 — Per-session parameter persistence (Priority: P2)

**Story goal**: Parameters are session-scoped; switching sessions restores per-session values; defaults apply to new sessions.

**Independent test**: Set `temp=0.3` on session A, `temp=1.3` on session B; switch between them; sidebar form updates accordingly; reload; values stick.

### Tests for User Story 5

- [ ] T080 [P] [US5] Pytest T-C7 — two threads with distinct settings; reading each returns the right per-thread value; editing one does not touch the other.

### Implementation for User Story 5

- [ ] T081 [US5] Thread-selection wiring in `extensions/builtin/local-llm/ui/layouts/chat.yaml` — `thread_list` selection fires `session.state.changed`; the sidebar form's dataSource `llm.get_generation_settings` already keys on the active `session_id`, so swapping sessions auto-refreshes.
- [ ] T082 [US5] New-session path — `handle_new_thread` writes `generation_settings = NULL`; `get_generation_settings` interprets NULL as the canonical defaults (already implemented in T065). Add a pytest case asserting this.

**Checkpoint**: Pytest green; manual session swap swaps sidebar values correctly.

---

## Phase 8: User Story 6 — Install-state roll-up no-N+1 (Priority: P3)

**Story goal**: Models Search + Local Chat picker each issue exactly one `GET /installed` per page render.

**Independent test**: Playwright opens Models Search with 20 installed artifacts, asserts Network panel shows one call to `/installed`.

### Tests for User Story 6

- [ ] T090 [P] [US6] Playwright case in `apps/web/tests/smoke/models-search.network.spec.ts` (new file) — seed 20 installed; assert `/installed` request count = 1 after first render.
- [ ] T091 [P] [US6] Unit test in `apps/web/src/services/model_store.test.ts` — SWR dedupe: two simultaneous `fetchInstalled` calls resolve from one in-flight request.

### Implementation for User Story 6

- [ ] T092 [US6] In `apps/web/src/views/models-search/models_search.view.tsx`, use a single SWR key (`"model-store/installed"`) for the roll-up; `jobByVariant` updates piggyback on SWR's built-in dedupe. Invalidate via SWR `mutate` only when a download job reaches terminal state.

**Checkpoint**: Network assertion green; no regression on spec-025 tests.

---

## Phase 9: Polish & cross-cutting

**Purpose**: Pre-merge gates, docs, clippy, cleanup.

- [ ] T100 Run `bash specs/026-llm-chat-wiring-and-downloaded-filter/scripts/scope_check.sh main` — zero files outside the allow-list.
- [ ] T101 Run `bash specs/026-llm-chat-wiring-and-downloaded-filter/scripts/no_comments_check.sh` — zero inline `//` rationale in any touched production file (Principle IV).
- [ ] T102 [P] `cargo clippy --workspace --all-targets -- -D warnings` on touched crates; fix any new warnings in spec-026 files only.
- [ ] T103 [P] `pnpm --prefix apps/web tsc --noEmit` + `pnpm --prefix apps/web test` all green.
- [ ] T104 [P] `pytest extensions/builtin/local-llm/tests/` green.
- [ ] T105 [P] Extend `apps/web/src/models/README.md` with a one-line note that the Downloaded filter is now the canonical way to list installed models.
- [ ] T106 [P] Append a "Spec 026" row to `specs/026-llm-chat-wiring-and-downloaded-filter/quickstart.md § Deferred coverage` noting the vitest deferrals (picker modal + chip).
- [ ] T107 Author `specs/026-llm-chat-wiring-and-downloaded-filter/CHECKPOINT.md` mirroring the format from spec 025's checkpoint — tasks done, tests green, proof artifact path.
- [ ] T108 Run `/speckit-analyze` — zero CRITICAL / HIGH / MEDIUM findings before PR.

---

## Dependencies

| Phase | Depends on |
|---|---|
| Phase 1 (Setup) | — |
| Phase 2 (Foundational) | Phase 1 |
| Phase 3 (US1) | Phase 2 |
| Phase 4 (US2) | Phase 2 |
| Phase 5 (US3) | Phase 2 + Phase 3 (picker empty state deep-links to US1's filter) |
| Phase 6 (US4) | Phase 2 + Phase 5 (send_message needs an active model binding) |
| Phase 7 (US5) | Phase 6 (get/set_generation_settings already exist) |
| Phase 8 (US6) | Phase 3 + Phase 5 (exercises the single roll-up) |
| Phase 9 (Polish) | Phases 3–8 |

### Cross-story parallel opportunities

- **Phase 2 parallel bundle**: T011 / T012 / T013 / T015 / T016 touch disjoint files and can ship in a single parallel PR.
- **Phase 3 + Phase 4 + Phase 6 can run concurrently** after Phase 2:
  - US1 lives in `crates/nexus-api/src/handlers/model_store/` + `apps/web/src/views/models-search/`.
  - US2 lives in `extensions/builtin/local-llm/worker/`.
  - US4's contract test (T060) and `CallRecorder` shim (T063/T064) live in `crates/` and can be written against T014's stub handlers.
- **Phase 9 parallel bundle**: T102 / T103 / T104 / T105 / T106 touch disjoint files.

---

## Implementation strategy

**MVP = Phase 1 + Phase 2 + Phase 3 (US1 only)** — ships the Downloaded filter and the `/installed` roll-up. Users can answer "what's on my disk?" on day one. No LLM extension changes required for MVP.

**Release order after MVP**:

1. US2 (New Session) — unlocks creating threads in the UI.
2. US3 (Choose Model) — unlocks binding a model.
3. US4 (Hyperparameter proof) — unblocks merge to `main` (proof artifact is a merge-gate per SC-006).
4. US5 + US6 — polish / performance, bundleable.

**Estimated counts** (per plan):

- Phase 1 Setup: **4 tasks** (T001–T004)
- Phase 2 Foundational: **7 tasks** (T010–T016)
- Phase 3 US1 (P1, MVP): **11 tasks** (T020–T030)
- Phase 4 US2 (P1): **7 tasks** (T040–T046)
- Phase 5 US3 (P1): **10 tasks** (T050–T059)
- Phase 6 US4 (P1 + proof gate): **11 tasks** (T060–T070)
- Phase 7 US5 (P2): **3 tasks** (T080–T082)
- Phase 8 US6 (P3): **3 tasks** (T090–T092)
- Phase 9 Polish: **9 tasks** (T100–T108)

**Total: 65 tasks.**
