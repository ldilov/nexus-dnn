# Spec 020 follow-ups

These are the 7 tasks from `tasks.md` that were **not** completable in the implementation sessions and require operator action post-merge.

## T001 — Branch cut + commit split

**Status**: prepared, not executed.

Run `bash specs/020-backends-and-models-polish/commit-split.sh` from `main` with a working tree that still mixes session-19 tail + spec-020 changes. The script:
1. Cuts branch `020-backends-and-models-polish` from main.
2. Stages only the 33 spec-020 files.
3. Commits with a structured message.
4. Returns to `main` so the session-19 remainder can be committed separately.

## T211 / T213 / T223 — Host-install pipeline wiring

**Status**: `POST /host-models` ships as `501 host_install_pending` with a structured envelope + 4 contract tests pinning the 501 contract. Full pipeline wiring is deferred as a single coupled slice.

**Scope for the follow-up slice** (all three together):

- **T211** — `install_host_model` handler body in `crates/nexus-api/src/handlers/backends/host_models.rs`.
  1. Add `models_store_ctx: Option<Arc<ModelStoreCtx>>` field to `AppState` (`crates/nexus-api/src/lib.rs`).
  2. Construct it in `crates/nexus-core/src/app.rs` alongside the HF client: requires `installs_root` + `blobs_root` paths from `AppConfig`, an `HttpFetcher`, and either `ZeroHfProbe` (default) or `HuggingFaceClient` cast to `HfProbe`.
  3. Replace the handler body with:
     - Resolve `repo_id` + `files` → `Vec<PlannedFile>` via the HF probe (populates `sha256`, `size_bytes`, `source_url` per file).
     - Call `install_model(ctx, req).await`.
     - On SHA match (dedup), return `200 OK` with `already_installed: true` + `install_id`.
     - On new install, return `201 CREATED` with the fresh `task_id`.
  4. Map `403 model_private` on the private-flag collision path; re-check `private_model` / `owner_extension_id` on the dedup short-circuit (see Security review finding HIGH #2 — `InstalledModelDto` must be re-validated against the requesting context before returning to the caller).
  5. Map `429 hf_rate_limited` on upstream HF rate-limit errors.

- **T213** — extend `ModelInstallTaskDto` with `already_installed: bool` (default `false`) in its canonical location (`crates/nexus-models-store/src/dto.rs` or equivalent). Propagate to the ts-rs generated bindings. Update `ModelsPanel.tsx` + `hf_search_panel.tsx` callers (most already read the field).

- **T223** — create `apps/web/src/models/hooks/use_host_model_install_stream.ts` (mirrors `use_install_stream` but filters on `topic.startsWith("hf.model.install.") && payload.task_id === taskId`). Wire into `hf_search_panel.tsx#handleInstall` so new installs open the existing `InstallModal` with the task event stream.

**Path-traversal safeguard** is already in place at `crates/nexus-models-store/src/install/pipeline.rs#safe_join_under` with 7 unit tests — the real pipeline can call it immediately without new guards.

## T504 — Quickstart wall-time capture

**Status**: not runnable in automated sessions (needs live Rust daemon + real HF network).

Run the walkthrough in [quickstart.md](quickstart.md) end-to-end on a fresh DB. Capture:
- **SC-Q1-01** — fresh DB → CUDA 12 llama.cpp installed, under 90 s wall time.
- **SC-Q3-01** — HF search first-page P95 under 1.5 s.
- **SC-Q3-02** — dedup install under 500 ms.
- **SC-Q4-02** — live-node validation under 100 ms after edge mutation.

Paste results into the spec 020 PR description.

## T508 — Frontend coverage follow-up ticket

**Status**: tracked here; book as a GitHub issue when the operator has repo write access.

**Title**: Frontend coverage for spec 020 — VariantPickerDrawer + HfSearchPanel + use_draft_nodes unit + Playwright install happy-path

**Scope**:
- vitest: unit tests on `useDraftNodes` (modes Map invariants, clear-on-workflowId-change) and `computePromotions` (required-port wiring rules, no auto-demotion).
- vitest: `VariantPickerDrawer` reducer behavior (default selection, recommended badge, disabled row tooltip).
- vitest: `HfSearchPanel` debounce + format filter + dedup-badge.
- Playwright: end-to-end install happy-path — fresh DB → Install → CUDA 12 → InstallModal completes → card re-renders READY.

This is the mandatory follow-up under Principle VI v1.1.2 design-heavy-UI carve-out that spec 020 invoked in `spec.md` § Test strategy.

## T511 — Squash before merge

**Status**: post-commit action for the operator.

Every commit on `020-backends-and-models-polish` must leave the workspace green-building (`cargo check --workspace` passes) so `git bisect` remains useful (Principle IX). The `commit-split.sh` script lands a single structured commit on the branch — no intermediate broken states. If additional fix-up commits land during review, squash them before merging to `main`.

## Security review follow-up (not a spec task, landed during T506)

- **CRITICAL (fixed)**: `safe_join_under` added to `crates/nexus-models-store/src/install/pipeline.rs` + 7 unit tests. Path traversal via `PlannedFile.path` is now blocked before any filesystem write.
- **HIGH (documented for T211)**: dedup short-circuit must re-validate `private_model` and `owner_extension_id` against the requesting context before returning an existing install.

## Rust review follow-up (T505, not closed in full)

- **H-1 (out of scope for 020)**: `release_lease` silently succeeds on unknown `lease_id`. Pre-existing behavior; changing semantics risks breaking retry-safe callers. Flag for a future spec.
