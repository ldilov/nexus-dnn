# Feature Specification: Backends + Models page polish (Q1 / Q3 / Q4)

**Feature Branch**: `020-backends-and-models-polish`
**Created**: 2026-04-17
**Status**: Draft
**Input**: Deferred work from the 2026-04-17 research pass on the Spectral Graphite Backends + Models surfaces. Extension activation (Q2) shipped separately on `main` in the same session; this spec covers the three remaining phases (Q1, Q3, Q4) as a single branch.

## Context

A prior research pass identified 6 issues across the Backends and DAG editor surfaces. Two of them — the 500 on `/llm/backends` and the missing extension operators causing DAG save to 400 — were already shipped (spec 019 tail + Q2). The remaining three are UX / integration work that block real usage:

- **Q1** — Backend install flow is visually styled but non-functional: `View Details` and `Install` CTAs on `BackendCard` are wired to `noop` handlers. There is **no pre-install variant picker** (release × platform × accelerator), and the existing `InstallModal` (progress tracker) is never opened.
- **Q3** — The new `/models` route renders a read-only list of host-managed models, but **does not offer any way to add new ones**. Hugging Face search, filter-by-family, and install-to-host already exist inside `ModelsPanel.tsx` scoped to a single `extensionId` — they just haven't been merged into the extension-agnostic host page.
- **Q4** — The workflow graph editor emits required-input validation errors on every node mutation, before the user has had a chance to connect edges. Correctness is not wrong, but the noise floor drowns out real errors.

Scope excludes: full legacy→host table migration for the llamacpp adapter (tracked separately); chat.yaml "Choose Model" button rewiring (tracked separately); model VRAM lease on load-model (tracked separately).

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install llama.cpp with the right accelerator in one click (Priority: P1)

A user opens `/backends`, sees the llama.cpp card in NOT INSTALLED state, and clicks **Install**. A compact picker drawer slides in listing the available `release_id × platform × accelerator_profile` combos for their machine (CPU, CUDA 12, CUDA 13, ROCm, etc.) with short descriptions and a recommended badge on whichever the machine-detect service prefers. They pick one, click **Install**, and the existing `InstallModal` opens against the `/install` endpoint streaming progress (resolve → download → verify → extract → detect → validate → persist → complete). On `complete` the card transitions to `INSTALLED · UNVALIDATED` and the drawer closes.

**Why this priority**: Without this, there is no path to install a backend from the UI at all — the CTA exists but does nothing. This is the single biggest gap between "demo works" and "users can use the product".

**Independent Test**: Can be fully tested by opening `/backends` on a fresh DB, clicking Install on llama.cpp, selecting `cuda12`, watching the 8-phase progress modal, and confirming the card re-renders as installed. Delivers the first working end-to-end install on a Spectral Graphite surface.

**Acceptance Scenarios**:

1. **Given** a machine where `GET /api/v1/backends/llama.cpp` lists at least one `{release_id, platform, accelerator_profile}` combo, **When** the user clicks Install on the llama.cpp card, **Then** a picker drawer lists those combos with labels from the existing version manifest, a recommended badge on the machine-detected default, and a primary Install button disabled until one row is selected.
2. **Given** the picker has a selected variant, **When** the user clicks Install in the drawer, **Then** the app POSTs `/api/v1/llm/backends/llama.cpp/install` with the chosen `release_id` and `accelerator_profile`, closes the picker, opens the existing `InstallModal` component streaming `llm.backend.install.progress` events, and on `install.completed` closes itself and refreshes the Backends list via SWR `mutate("host-backends")`.
3. **Given** install fails with a non-2xx from `/install`, **When** the error lands, **Then** the picker stays open, inline error surfaces the envelope `error.message` + `error.code`, and a toast fires via `sonner`.
4. **Given** the picker is open, **When** the user presses Escape or clicks the scrim, **Then** the picker closes with no mutation.
5. **Given** the backend card is in ISSUE state (`broken` / `needs_repair`), **When** the user clicks Repair, **Then** the same picker flow runs but defaults to the currently-installed combo.

---

### User Story 2 — Clicking "View Details" on a backend card opens a drawer with real info (Priority: P2)

A user clicks **View Details** on either card and sees a right-side drawer with: full `implementation_status`, `supported_profiles_on_this_machine`, `last_failure_category`, `unavailable_reason`, current install metadata (release_id / platform / accelerator_profile / source_url / checksum_sha256 / installed_at / validated_at), a mounted `LogConsole` tailing the last N runtime log lines, and a primary action row (Validate / Repair / Uninstall / Open Settings) whose visibility matches the card's state matrix.

**Why this priority**: Critical for debugging but not blocking day-one install. The data is already served by `GET /api/v1/backends/{installId}` and `/api/v1/backends/{installId}/logs`; the drawer is UI-only.

**Independent Test**: Can be fully tested by clicking View Details on a ready backend, confirming the drawer opens with correct data and that the mounted log console receives live lines as the runtime emits them.

**Acceptance Scenarios**:

1. **Given** an installed backend, **When** View Details is clicked, **Then** a right drawer opens with all metadata from `GET /backends/{installId}` and the LogConsole subscribes to the runtime WS events for that backend.
2. **Given** the drawer is open, **When** Validate is clicked, **Then** the existing `validate` endpoint is invoked, the card state updates via SWR revalidation, and any validation failure category surfaces inline.
3. **Given** the drawer is open, **When** Uninstall is clicked, **Then** a confirm prompt appears, the existing `/backends/{installId}` DELETE fires on confirm, and the drawer closes with a success toast.

---

### User Story 3 — Browse + install models from Hugging Face on the host `/models` page (Priority: P1)

A user opens `/models`. Alongside the existing host-installed list, a tab (or section) offers a Hugging Face search with a query input, a family/backend filter (llama.cpp → GGUF only, future backends → their formats), a license filter (Apache-2.0, LLAMA-3, etc.), and a result grid with model card metadata from the upstream HF API. Clicking **Install** on any result kicks off the existing `POST /extensions/huggingface/models` pipeline — but since models are host-managed and content-addressed (spec 017), the resulting row lands in `host_model_installs` with `owner_extension_id = NULL` (or set to the installing user/extension for provenance only) and is **visible to every extension** via `GET /host-models`.

**Why this priority**: Without a global model install path, extensions either ship their own silos (the very thing spec 017 was meant to eliminate) or leave the Models page as decoration. This is what makes the `/models` route a real hub instead of a read-only list.

**Independent Test**: Can be fully tested by searching "llama-3-8b" on the `/models` page, filtering by GGUF, clicking Install on the top result, watching the install task progress, and confirming the new install appears in both `/host-models` and the local-llm extension's model list without a second download.

**Acceptance Scenarios**:

1. **Given** the `/models` page is mounted, **When** the user types a search query, **Then** `hfSearch({ q, limit: 20, page: 1 })` fires debounced at 300ms and renders results in a grid with download/size/license/downloads metadata.
2. **Given** a family filter is active (`llama.cpp → GGUF`), **When** results render, **Then** only HF repos with matching `library_name` or `tags` containing the format are shown; others are filtered client-side.
3. **Given** the user clicks Install on a result, **When** the request completes with a matching SHA on an already-installed file, **Then** dedup returns the existing install row without a second download and the UI shows "already installed — shared with N extension(s)".
4. **Given** the install is new, **When** the progress stream reports `complete`, **Then** the Models page list refreshes via SWR `mutate("host-models")` and the row shows the global install marker.
5. **Given** the user focuses on a host-installed row, **When** the row renders, **Then** it shows a "Shared by N extension(s)" chip sourced from a future `/host-models/{install_id}/dependents` endpoint (P3 scope note).

---

### User Story 4 — DAG editor stops yelling about incomplete nodes while I'm still wiring them (Priority: P3)

A user drops an operator node from the palette onto the canvas. Previously, the node immediately emits `required input X on Y is not connected` for every unwired required input, polluting the error panel while the user is mid-wire. The editor now distinguishes `draft` nodes (orange dashed border, not-yet-validated, errors suppressed) from `live` nodes (full validation), and only promotes a node from draft → live when either (a) the user explicitly clicks Validate on it, or (b) the node's incoming ports that are marked `required: true` all have edges.

**Why this priority**: Quality-of-life polish. Doesn't block any flow; just reduces visual noise during authoring. Ships last.

**Independent Test**: Drop a node, observe orange dashed border + no errors in the panel. Wire all required ports, observe the border transitions to solid and validation runs in the background.

**Acceptance Scenarios**:

1. **Given** a user drops a new operator node, **When** it renders, **Then** it has class `draft` (orange dashed border), required-input validation is suppressed for that node, and the global errors panel does not show entries for it.
2. **Given** a draft node's required inputs all become connected via edges, **When** the last edge lands, **Then** the node auto-promotes to `live`, the border solid-darkens, and validation runs — showing any remaining non-required problems.
3. **Given** a live node loses a required edge, **When** the edge is deleted, **Then** the node does NOT revert to draft; it stays live with a real "required input disconnected" error — the workflow was functional before the deletion.

---

### Edge Cases

- **Q1-edge1** — Backend machine-detect returns no supported profiles (headless server with no GPU, unusual architecture): the picker lists only CPU variants and disables everything else with a tooltip explaining why.
- **Q1-edge2** — User clicks Install while an install is already in progress for that backend: picker shows the existing install's progress modal directly instead of the variant selection.
- **Q1-edge3** — Version manifest yaml is malformed or missing on disk: Install CTA disables with a "Backend catalog unavailable" message, no picker opens.
- **Q3-edge1** — HF returns 429 rate-limit: toast with retry-after seconds, search input stays editable, no partial results rendered.
- **Q3-edge2** — User searches while offline: toast "Hugging Face unreachable — install via URL or check your network", search stays in empty state.
- **Q3-edge3** — User installs a model that is already globally installed but private (owned by a different extension): respect the `private_model` flag and refuse with envelope code `MODEL_PRIVATE`.
- **Q4-edge1** — User saves a workflow that still contains draft nodes: save fails with a list of still-draft node ids; editor highlights them with pulsing orange borders.

## Requirements *(mandatory)*

### Functional Requirements

**FR-Q1-01**: `BackendCard.Install` opens a `VariantPickerDrawer` populated from `GET /api/v1/backends/{id}` — NOT from a client-side hardcoded list.

**FR-Q1-02**: The picker's "recommended" badge is sourced from `MachineDescriptor::detect()` output echoed on `/backends/{id}` (the endpoint already emits `supported_profiles_on_this_machine`); there is no heuristic in the UI.

**FR-Q1-03**: Picker → Install chains into the existing `InstallModal` component without any state duplication; the modal reads progress events from the same WS channel the backend currently emits.

**FR-Q1-04**: `BackendCard.ViewDetails` opens a right drawer (reusable component, candidate: a new `BackendDetailDrawer`) showing full install metadata, `LogConsole`, and state-appropriate actions (Validate / Repair / Uninstall / Open Settings).

**FR-Q1-05**: Repair CTA on `broken` cards routes through the same VariantPickerDrawer, pre-selecting the currently-installed combo.

**FR-Q1-06**: Uninstall CTA confirms, calls `DELETE /api/v1/backends/{installId}`, and mutates the SWR `host-backends` key on success.

**FR-Q3-01**: `/models` route merges the host-installed list and a Hugging Face search panel in a single surface — no separate route.

**FR-Q3-02**: The HF search panel reuses the existing `hfSearch()` client + `HfResultCard` component from `ModelsPanel.tsx`, with the panel decoupled from any `extensionId` scoping.

**FR-Q3-03**: The HF search query supports a format filter that maps runtime family → accepted upstream `library_name` / `tags` (llama.cpp → `gguf`). The filter is client-side for now; server-side query support is a future-scope follow-up.

**FR-Q3-04**: Install-to-host uses the existing `installExtensionModel()` client but omits any extension scoping; the resulting row's `owner_extension_id` is NULL (globally shared). If provenance is required, the calling user's id lands in a separate `installed_by` field — **[NEEDS CLARIFICATION]** whether to add that column now or defer.

**FR-Q3-05**: Dedup behavior is end-user visible: if a new install's SHA matches an existing row, the UI shows "already installed" immediately and the progress modal does not open. Existing `nexus_models_store::install::dedup::find_existing_by_key` already returns the row; the UI just needs to branch on the initial response.

**FR-Q3-06**: Each host-model row shows a "Shared by N extension(s)" chip. Data source for N: a new `GET /api/v1/host-models/{install_id}/dependents` endpoint that returns the distinct extensions currently leasing or depending on the model. **[NEEDS CLARIFICATION]** whether to ship the endpoint in this spec or just render "Shared" without the count.

**FR-Q4-01**: `GraphView` tracks a per-node `draft | live` flag in local canvas state (not persisted server-side). Newly dropped nodes start as `draft`.

**FR-Q4-02**: Draft nodes skip required-input validation. Their visual treatment is the orange dashed border already defined in `graph_view.css.ts` as `.nodeDraft` (or equivalent — add if missing).

**FR-Q4-03**: A node auto-promotes `draft → live` when all `required: true` input ports have incoming edges. Deleting edges after promotion does NOT demote.

**FR-Q4-04**: Save rejects any draft nodes with a visible error listing the draft node ids. Users can promote manually via a new right-click "Mark as live" menu item.

**FR-Q4-05**: The change is pure-frontend — no API or server validation change. The server continues to enforce required inputs on PUT `/workflows/{id}` as today; the UI just avoids firing save until all nodes are live.

### Key Entities *(include if feature involves data)*

- **Variant** (UI-only model) — a `{ release_id, platform, accelerator_profile, label?, recommended }` tuple projected from the version manifest row for a backend. Rendered in the picker.
- **BackendDetail** (from existing `/backends/{installId}` response) — read-only; no shape change in this spec.
- **HostModelRow** (from existing `/host-models` response) — augment the frontend-side view model with a `dependents_count` derived from the new endpoint (if shipped).
- **DraftNodeState** (frontend-only, canvas-scoped) — `Map<node_id, "draft" | "live">`, cleared on workflow switch, not persisted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-Q1-01** — Time from fresh DB → llama.cpp CUDA 12 installed via UI, measured end-to-end, under 90 seconds (dominated by download speed).
- **SC-Q1-02** — Zero `noop` handlers remain in `BackendsView` or `BackendCard` — enforced by a lint rule or a smoke test.
- **SC-Q3-01** — HF search returns the first page of results within 1.5 seconds P95 against the live HF endpoint; results render within another 200ms.
- **SC-Q3-02** — Installing a model that is already present on disk completes in under 500ms (no redownload, just row link).
- **SC-Q3-03** — Installed models show their `shared by N` chip with accurate N when at least two extensions have declared a lease on the same install.
- **SC-Q4-01** — Newly-dropped operator nodes emit **zero** validation errors before their required inputs are connected.
- **SC-Q4-02** — Validation errors on promoted nodes still fire within 100ms of a relevant edge mutation.

## Out of Scope

- Architectural migration of the llama.cpp adapter from `ext_local_llm_runtime_installs` → `host_runtime_installs` (tracked separately; P2 tactical fix in place).
- Model VRAM lease integration on `/backends/load-model` (tracked separately).
- Rewiring `chat.yaml` "Choose Model" button to the `/backends/load-model` endpoint or in-chat picker (tracked separately).
- `nexus-models-store` schema change for per-user provenance (depends on FR-Q3-04 clarification).

## Resume notes

This spec is the resumable deferral of Q1 / Q3 / Q4 from the 2026-04-17 session. Q2 (operator index reindex after `activate_builtin_extension`) shipped on `main`. The next session should:

1. Run `/speckit-plan` against this spec to generate `plan.md` + initial `tasks.md`.
2. Confirm resolution of the two **[NEEDS CLARIFICATION]** markers in FR-Q3-04 and FR-Q3-06 before implementation.
3. Implement in priority order: Q1 (P1) → Q3 (P1) → Q2 on cards [done] → Q4 (P3) last.
