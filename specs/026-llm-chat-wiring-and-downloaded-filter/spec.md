# Feature Specification: LLM Chat wiring + Models Search "Downloaded" filter

**Feature Branch**: `026-llm-chat-wiring-and-downloaded-filter`
**Created**: 2026-04-20
**Status**: Draft
**Input**: User description: "i should be able to see models that i have downloaded too, meaning i should have Downloaded filter. On the LLM extension side … We need to make sure that Choose model and New session works because currently they do nothing. We should also make sure that the right sidebar hyperparams work and are passed to llamacpp, we will need proof for that"

## Overview

Two orthogonal but tightly-coupled user problems exposed by shipping spec 025
(Models Search refactor) and the current state of the `local-llm` extension:

1. The Models Search page has no way to narrow results to the models the user
   actually owns. With search and normalization fixed, users still cannot
   answer "what's on my disk right now?" without leaving the screen.
2. Local Chat's primary controls — **Choose Model**, **+ New Session**, and
   the right-sidebar **Generation Parameters** — render but do nothing. The
   UI layout declares actions (`llm.open_model_browser`, `llm.new_thread`,
   `llm.get_generation_settings`) that have no matching handler in the
   worker, so every click is silently dropped and llama.cpp receives whatever
   defaults happen to be compiled into the adapter.

This spec closes both gaps and demands **mechanical proof** that the
hyperparameter values the user sees in the sidebar are the exact values
llama.cpp samples with.

## 2026-04-20 correction — production path pivot

After implementation started, two architectural facts changed how FR-040
— FR-042 (worker JSON-RPC methods) read:

1. The `local-llm` extension was **Rust-ported in spec 024** before this
   spec started. `extensions/builtin/local-llm/worker/*.py` is dead
   legacy; production handlers live in `crates/nexus-local-llm-worker/`.
2. Chat CRUD, active-model binding, generation-settings persistence, and
   `send_message` are served by **host REST** in
   `crates/nexus-api/src/handlers/extensions_local_llm/chat.rs`, not by
   worker RPC. The worker has stubs for `llm.new_thread` / `llm.list_threads` /
   `llm.get_active_model` / `llm.set_active_model` / `llm.get_generation_settings`
   / `llm.set_generation_settings` / `llm.list_downloaded_models` /
   `llm.open_model_browser` that return a stable `NotImplemented`
   envelope. The UI calls the REST surface directly.

Mapping from FR text to shipped surface:

| Spec wording | Shipped surface |
|---|---|
| FR-040 `llm.new_thread` | `POST /api/v1/extensions/local-llm/chat/threads` |
| FR-040 `llm.list_threads` | `GET /api/v1/extensions/local-llm/chat/threads` |
| FR-040 `llm.get_active_model` / `llm.set_active_model` | `GET/PUT /…/threads/{id}/active_model` |
| FR-040 `llm.get_generation_settings` / `llm.set_generation_settings` | `GET/PUT /…/threads/{id}/generation_settings` |
| FR-040 `llm.send_message` | `POST /…/threads/{id}/messages` |
| FR-040 `llm.list_downloaded_models` | Frontend fetches `GET /api/v1/model-store/installed` directly (still satisfies FR-042's "host REST, not host DB" intent) |
| FR-041 envelope compat | N/A — worker RPC envelope is moot; host REST envelope (`ApiResponse`) is used throughout |
| FR-042 no direct host-DB reads from worker | Structurally satisfied: worker has no path to the DB at all; host REST is the sole surface |

**FR-021 de-scoped to follow-up**: `messages.params_snapshot` persistence
requires a `messages` table that does not exist today. The current
`send_message` handler is stateless (no history write). The UI has no
history-replay path either, so the snapshot divergence FR-021 guards
against is architecturally impossible to trigger in this release. When
message persistence lands in a future spec, `params_snapshot` must be
added at the same time — the pure mapper `to_sampling_params` already
makes capturing the snapshot a one-line addition.

**SC-004 becomes vacuous**: worker-side `llm.list_downloaded_models` is
a stub and performs zero SQL by construction. The intent — "no direct
DB reads from the extension" — is still honored, just trivially.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Downloaded-only filter on Models Search (Priority: P1)

A returning user opens Models Search to find something they already pulled.
They toggle **Downloaded** in the filter bar and the grid collapses to only
the families with at least one artifact installed on local disk. Clearing
the filter or combining it with `format=gguf` works as expected; the URL
serialises the state so the view is shareable and survives reload.

**Why this priority**: Without it the user has no landing surface for
"manage the models I own" — which is the first step before opening Local
Chat, because Local Chat's model picker (Story 3) reads from the same
source of truth.

**Independent Test**: Install one GGUF family via the download flow; open
`/models?installed=installed`; the grid shows exactly that family. Change
to `installed=not_installed`; the family disappears. The URL round-trips
(`parseSearchParams` ↔ `serializeSearchParams` invariant holds for the new
key).

**Acceptance Scenarios**:

1. **Given** two GGUF families exist on HF and one has a downloaded Q5_K_M
   variant, **When** the user toggles Downloaded on, **Then** the grid
   shows only the installed family and the total count reflects that.
2. **Given** Downloaded is on, **When** the user reloads the page,
   **Then** Downloaded stays on and the filtered view renders without a
   "flash of unfiltered results".
3. **Given** zero artifacts are installed, **When** the user toggles
   Downloaded on, **Then** the grid shows the empty state copy
   ("No downloaded models yet — install one from search").
4. **Given** a family has multiple variants and only one is installed,
   **When** Downloaded is on, **Then** the family renders and its variant
   rows visually distinguish installed (`check_circle`) from not-installed
   variants.

---

### User Story 2 — "+ New Session" creates a real chat thread (Priority: P1)

A user opens Local Chat. The left-rail **+ New Session** button creates a
new chat thread, selects it, clears the main message area, and appears at
the top of the **Recent History** list. A second click creates a second
thread without discarding the first. Sessions persist across reloads and
across host restart.

**Why this priority**: Without this, there is no way to start a
conversation from a clean slate; the "Initialize Conversation" placeholder
is a dead end.

**Independent Test**: Click **+ New Session**; thread appears in the list
with a deterministic title ("Session N" where N is the next integer for
this day). Reload the page; the new thread is still there and selected.

**Acceptance Scenarios**:

1. **Given** no conversations exist, **When** the user clicks **+ New
   Session**, **Then** a new thread is created, selected, and the main
   area switches from the welcome state to an empty chat transcript.
2. **Given** an active thread with messages, **When** the user clicks
   **+ New Session**, **Then** a new empty thread is created and the
   previous thread is retained in Recent History.
3. **Given** a thread exists, **When** the user reloads, **Then** the
   previously-selected thread is re-selected and its messages re-render.

---

### User Story 3 — "Choose Model" binds a downloaded GGUF to the session (Priority: P1)

Clicking **Choose Model** opens a picker listing every GGUF family with at
least one downloaded variant. The user selects a variant; the button label
changes to the selected family + variant; the sidebar header's
"LOCAL_MODEL" chip reflects the selection; sending a message routes through
llama.cpp bound to exactly that `.gguf` file.

**Why this priority**: Without model binding, the send button either fails
or silently falls back to a default. The Spec 025 install flow now produces
real installed files; this story makes them reachable from chat.

**Independent Test**: Install two GGUF variants (e.g. Q4_K_M + Q8_0 of the
same family). Open Local Chat, click **Choose Model**, pick `Q8_0`. Send
"ping". The llama.cpp backend log shows the resolved path ends in
`*Q8_0*.gguf`.

**Acceptance Scenarios**:

1. **Given** zero downloaded GGUF variants, **When** the user opens the
   Choose Model picker, **Then** the picker shows the empty state with a
   deep link to `/models?installed=installed&format=gguf` (story 1 + 4).
2. **Given** the user selects variant V, **When** they reload, **Then** V
   remains the active model for the session.
3. **Given** V is selected but then uninstalled from Models Search,
   **When** the user returns to Local Chat, **Then** the active-model
   chip flips to "Model unavailable" and the send button disables with
   a hint to re-select.
4. **Given** two sessions pick different models, **When** the user
   switches between sessions, **Then** the active-model chip updates to
   each session's bound model.

---

### User Story 4 — Hyperparameters reach llama.cpp, with mechanical proof (Priority: P1)

Every field in the right-sidebar **Generation Parameters** form
(`temperature`, `top_p`, `top_k`, `max_tokens`, `repeat_penalty`,
`system_prompt`) is persisted per session and passed to the llama.cpp
sampler on every generation call. A test verifies this without a running
model by asserting the parameter object handed to the adapter matches the
UI state byte-for-byte.

**Why this priority**: The current UI form reads nothing, writes nothing,
and its values are discarded. Users tune a slider, see no effect, and lose
trust. Without verifiable parameter wiring, every future issue report
("model ignores my system prompt") is unfalsifiable.

**Independent Test**: Load a session, set `temperature=0.1`,
`top_k=1`, `max_tokens=16`, a deterministic `system_prompt`. Send a
message. Inspect the `SamplingParams` struct handed to the llama.cpp
adapter in the integration test; assert every field matches.

**Acceptance Scenarios**:

1. **Given** the user moves the Temperature slider to 1.7, **When** they
   click Send, **Then** the request payload sent to the llama.cpp adapter
   has `temperature=1.7` (assertion is a contract test).
2. **Given** the user edits System Prompt, **When** they send a message,
   **Then** the system message is prepended to the conversation as the
   first entry and llama.cpp receives it as the first `role: system`
   turn.
3. **Given** `max_tokens=16`, **When** the user sends a message, **Then**
   the streamed response stops at ≤16 tokens and the UI surfaces
   `finish_reason = length`.
4. **Given** the user edits a parameter mid-session, **When** they send a
   new message, **Then** the new value is used and the old value is
   retained on previously-generated messages (no retroactive rewrite).

---

### User Story 5 — Per-session parameter persistence (Priority: P2)

Hyperparameter values are session-scoped and persisted: closing and
re-opening Local Chat restores each session's last-known values without
leaking settings between sessions.

**Why this priority**: Without persistence, users re-type prompts and
re-tune sliders on every reload. The existing host storage layer makes
this a small additive surface — bundling it with Story 4 keeps the spec
atomic.

**Independent Test**: Set distinct temperatures on two sessions. Reload.
Switch between sessions; each recalls its own value.

**Acceptance Scenarios**:

1. **Given** two sessions with different `temperature` values, **When**
   the user switches between them, **Then** the sidebar form updates to
   each session's value.
2. **Given** no explicit edits, **When** a new session is created,
   **Then** it starts with the global defaults (see FR-011).

---

### User Story 6 — Install-state signalling without N+1 queries (Priority: P3)

The Downloaded filter and the Choose Model picker must not issue one API
call per family on every render. A single `GET` returns the installed-artifact
roll-up keyed by `family_id`, and the frontend joins it against the search
results in-process.

**Why this priority**: Correctness lives in Stories 1 and 3; this story
prevents the feature from becoming a performance regression on larger
installs.

**Independent Test**: Open Network tab; load Models Search with ≥20
installed artifacts; assert exactly one request to `/installed` and zero
per-family calls.

**Acceptance Scenarios**:

1. **Given** 30 installed artifacts, **When** the grid renders, **Then**
   a single GET fetches the roll-up.
2. **Given** the user installs a new variant, **When** the download
   completes, **Then** the roll-up refreshes (SWR refetch) and the grid
   updates within 2 seconds.

---

### Edge Cases

- Installed artifact on disk but orchestrator row missing (manual copy):
  listed under Downloaded only if `install_map` knows about it. A
  future reconciliation task is out of scope.
- User picks a model, then uninstalls it from another tab: the picker chip
  flips to "unavailable" on next focus; in-flight generation is not
  cancelled.
- A session's bound variant exists on disk but its family row is gone:
  treat as `unavailable` and offer re-selection.
- Hyperparameter value at the schema edge (`temperature=0`, `top_k=1`):
  accepted; the adapter is the sole owner of clamping.
- System prompt empty string: send no `system` message (don't inject an
  empty turn).

## Requirements *(mandatory)*

### Functional Requirements — Downloaded filter

- **FR-001**: `ParsedSearchParams.installed` already exists as `"any" |
  "installed" | "not_installed"`; its value MUST round-trip the URL via
  `installed=installed` / `installed=not_installed`. Default: `any`.
- **FR-002**: Search handler MUST accept `installed` and join the result
  set against the installed-artifacts index before returning.
- **FR-003**: Filter bar MUST expose a **Downloaded** chip driven by
  `ParsedSearchParams.installed`, with three visual states: off (any),
  on (installed), inverted (not_installed). Cycling is via keyboard
  Enter/Space.
- **FR-004**: The empty state for `installed=installed` MUST render a
  deep link to `/models` with the filter cleared.
- **FR-005**: Models Search MUST read installed state from a single
  source: `GET /api/v1/model-store/installed` returning
  `{ family_ids: string[], variant_ids: string[] }`. One request per
  page render; in-flight refetch piggybacks on the existing
  family cache.

### Functional Requirements — LLM Chat actions

- **FR-010**: Clicking **+ New Session** MUST:
  1. Insert a new row in the thread store (backed by the existing
     extension SQLite store under `extensions/builtin/local-llm/storage/`).
  2. Select the new thread and clear the active-model/messages panes.
  3. Fire `session.state.changed` so the `thread_list` dataSource
     refreshes without a full page reload.
- **FR-011**: Each new session MUST be initialised with **default
  parameters**:

  ```text
  temperature     = 0.8
  top_p           = 0.95
  top_k           = 40
  max_tokens      = 4096
  repeat_penalty  = 1.1
  system_prompt   = "You are a helpful assistant."
  ```

  These are the same values already declared in
  `extensions/builtin/local-llm/ui/layouts/chat.yaml`; the schema is the
  contract.

- **FR-012**: Clicking **Choose Model** MUST open a picker listing
  installed GGUF variants (format ∈ {gguf, ggml}, install state =
  `downloaded`, grouped by family). Selecting a variant binds
  `(family_id, variant_id, artifact_id, absolute_path)` to the active
  session.
- **FR-013**: When no GGUF variants are installed, the picker MUST render
  the empty state with a "Go to Model Foundry" action targeting
  `/models?installed=installed&format=gguf`.
- **FR-014**: When an installed variant is deleted while bound to an
  active session, the chat UI MUST:
  1. Surface "Model unavailable — select another" in the send box.
  2. Disable the send button.
  3. NOT auto-remap to a different variant.

### Functional Requirements — Generation parameters → llama.cpp

- **FR-020**: The right-sidebar form MUST read from and write to
  per-session storage via `llm.get_generation_settings(session_id)` and
  `llm.set_generation_settings(session_id, params)`. Writes are
  debounced client-side at 200 ms.
- **FR-021**: Parameter edits MUST NOT rewrite prior turns. Each
  message's stored metadata records the params active at generation time.
- **FR-022**: `llm.send_message(session_id, content)` MUST load the
  session's persisted `GenerationParams` and forward them to the
  llama.cpp adapter **unmodified** except for type coercion. The adapter
  is the single owner of range clamping.
- **FR-023**: The adapter call MUST include all six fields:
  `temperature`, `top_p`, `top_k`, `max_tokens`, `repeat_penalty`,
  `system_prompt` (rendered as the first `role: system` message iff
  non-empty).
- **FR-024**: Mechanical proof (NFR-001) MUST be executable without a
  GPU, a downloaded model, or network access. The adapter exposes a
  `record_next_call` shim for tests that captures the params object and
  returns a stub streaming response.

### Functional Requirements — Installed-artifacts REST surface

- **FR-030**: `GET /api/v1/model-store/installed` MUST return the current
  roll-up:

  ```json
  {
    "family_ids": ["llama-3-8b", "qwen-2.5-7b"],
    "installed": [
      {
        "family_id": "llama-3-8b",
        "variant_id": "Q5_K_M",
        "artifact_id": "a_123",
        "filename": "llama-3-8b-Q5_K_M.gguf",
        "format": "gguf",
        "size_bytes": 5379129344,
        "installed_at": "2026-04-20T12:34:00Z"
      }
    ]
  }
  ```

- **FR-031**: The handler MUST derive its result from
  `model_store_installed_artifacts` (migration 014) via a new
  `InstallMap::list_all()` method.
- **FR-032**: Envelope headers mirror the rest of `/api/v1/model-store/*`
  (no breaking shape).

### Functional Requirements — Extension worker methods

- **FR-040**: The `local-llm` worker MUST register these JSON-RPC
  methods under the `llm.*` namespace:
  - `llm.new_thread(params?) -> Thread`
  - `llm.list_threads(archived?, limit?) -> Thread[]`
  - `llm.get_active_model(session_id) -> { family_id, variant_id, label } | null`
  - `llm.set_active_model(session_id, family_id, variant_id) -> void`
  - `llm.get_generation_settings(session_id) -> GenerationParams`
  - `llm.set_generation_settings(session_id, params) -> GenerationParams`
  - `llm.send_message(session_id, content) -> stream<ChatDelta>`
  - `llm.list_downloaded_models() -> DownloadedModel[]`
- **FR-041**: Every method MUST return the envelope already used by
  existing `llm.*` methods (see `monitoring.py` / `profile.py`). No new
  envelope variants.
- **FR-042**: `llm.list_downloaded_models()` MUST call out to the host
  REST surface (FR-030), not re-query the host DB directly. The
  extension has no leased read access to `model_store_installed_artifacts`.

### Non-Functional Requirements

- **NFR-001** *(proof)*: An integration test in
  `crates/nexus-api/tests/` OR
  `extensions/builtin/local-llm/tests/` MUST:
  1. Seed a fake installed variant.
  2. Call `llm.set_generation_settings` with a known payload.
  3. Call `llm.send_message` with a stub llama.cpp adapter
     (`record_next_call`).
  4. Assert the captured `SamplingParams` equals the payload (per-field,
     exact equality for numerics; string equality for system prompt).
  5. Produce a machine-readable artifact (`target/sc-026-proof.json`)
     that CI uploads.
- **NFR-002**: The Downloaded filter adds no per-family network request;
  one `GET /installed` per search render (FR-005).
- **NFR-003**: Opening Local Chat with 50 installed variants must render
  the Choose Model picker in < 300 ms (perceived).
- **NFR-004**: No log line or error banner may include a path outside
  the user's home dir when a model is missing.
- **NFR-005**: Session-parameter writes survive a hard host kill. The
  extension's existing SQLite store is durable (WAL mode); reuse it.
- **NFR-006**: Keyboard access — every action in this spec must be
  reachable by Tab + Enter/Space. The picker is an `aria-listbox` with
  arrow-key navigation.

### Constitution alignment

| Principle | Relevance | How this spec honors it |
|---|---|---|
| II (No-comment provenance) | Code produced under this spec is self-documenting; all rationale lives in this spec. | Task list will enforce zero `//`-style inline rationale. |
| V (Sealed adapters) | llama.cpp sampler shim lives in-tree; no extension owns it. | `record_next_call` is added to the existing `LlamaCppAdapter`, not via a public plug-in. |
| VI (Test-first) | Hyperparameter proof is the gating test. | Task order: contract test for FR-022 before implementation. |
| X (Parallel-friendly) | Stories 1, 2+3, 4 are independent modules. | Task `[P]` markers cover installed REST, chat handlers, sampler shim. |
| XII (Frontend layering) | Downloaded filter ships inside `views/models-search/`; new picker ships inside the LLM extension's layout. | No cross-view imports. |

## Success Criteria

- **SC-001**: For a test repository with 1 installed GGUF family,
  `/models?installed=installed` returns exactly that family in **100 %**
  of runs against a warm cache.
- **SC-002**: With the proof test in place, **zero** code paths in
  `llm.send_message` modify the persisted `GenerationParams` before the
  adapter call. Static check: no assignment to any field of
  `GenerationParams` between `get_generation_settings` and the adapter
  invocation.
- **SC-003**: Opening Local Chat with zero threads, clicking
  **+ New Session**, then clicking **+ New Session** again, yields a
  Recent History list of length 2 in **100 %** of runs (Playwright).
- **SC-004**: `llm.list_downloaded_models()` makes **0** direct SQL
  queries against the host DB — verifiable by a unit test that swaps
  the host REST client with a mock.
- **SC-005**: **0** hardcoded model paths anywhere in
  `extensions/builtin/local-llm/worker/**`. The only source of truth is
  the host `/installed` endpoint.
- **SC-006**: The `target/sc-026-proof.json` artifact is emitted by
  every CI run and is re-generated by `cargo test -p nexus-api
  --test chat_hyperparameters_reach_llamacpp`.
- **SC-007**: Tab + Enter can complete the full "new session → pick
  model → tweak temperature → send → see stream" flow without touching
  the mouse.

## Assumptions

- llama.cpp remains the only enabled backend; `LlamaCppAdapter` is the
  target of proof.
- The `model_store_installed_artifacts` schema from spec 025 is frozen
  and already carries every field Story 1 needs (`family_id`, `variant_id`,
  `filename`, `size_bytes`, `installed_at`, `format`, `source_repo`).
- The extension SQLite store (`extensions/builtin/local-llm/storage/`)
  is already provisioned; no new migration on the extension side beyond
  the `generation_settings_per_session` columns (or a JSON column on
  the existing `threads` table — implementation choice, out of scope
  for spec).
- Playwright E2E lands on top of the existing `/models` webServer setup;
  no new dev-server infra.

## Out of Scope

- Safetensors / PyTorch backends — this spec is GGUF + llama.cpp.
- Multi-model ensembles on a single session.
- Tool calling, function calling, RAG orchestration (covered separately
  by `local_chat_rag.yaml`).
- A dedicated "Installed Models" page distinct from Models Search.
- Auto-reconciliation of orphan files on disk that never went through
  the orchestrator.
- Export / import of session settings.

## Clarifications

### Resolved by construction

- **Q**: Should Downloaded be a chip or a drawer?
  **A**: Chip in the existing filter bar. Three-state cycle (any →
  installed → not_installed → any).
- **Q**: Is the picker modal or inline?
  **A**: Modal with `role="dialog"` + focus-trap; closes on Esc and on
  selection.
- **Q**: Where do hyperparameters persist?
  **A**: Per-thread in the extension SQLite store. Host never sees them.
- **Q**: Can the user pick a variant whose file was deleted out-of-band?
  **A**: Picker hides such rows (source of truth is
  `/installed`, not a disk scan).
