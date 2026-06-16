# NexusDNN Multi-Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship five independent fixes — true-concurrent TTS with realtime per-item progress, Stop-runtime that frees VRAM, a navbar "free all memory" GC button, a self-healing dependency installer (the SVI2 missing-model bug), and complete proprietary-wheel vendoring/wiring.

**Architecture:** Five workstreams (WS-A..WS-E), each independently shippable and testable. Host changes stay generic per `.claude/rules/host-extension-boundary.md`; extension changes stay under `extensions/builtin/<ext-id>/`. WS-B and WS-D share one new generic worker RPC (`runtime.release_memory`). Verification target is the DGX Spark (aarch64 GB10, SSH `~/.ssh/.dgx_session_key`, container `nexusdnn`, volume `nexusdata` → `/data`).

**Tech Stack:** Rust (axum, tokio, sqlx), Python worker SDK (JSON-RPC over stdio), React 19 + vanilla-extract (Spectral Graphite), uv for Python deps, Git LFS for wheels.

**Grounding:** Root causes confirmed by live DGX inspection + code reads on 2026-06-16. See `docs/superpowers/plans/_evidence-2026-06-16.md` is NOT created; evidence is inline below.

---

## Execution order (recommended)

1. **WS-E** — installer self-heal (prevents recurrence of the bug that blocked rendering today; smallest, highest leverage).
2. **WS-B+D** — Stop-frees-VRAM + GC button (shared `runtime.release_memory` RPC).
3. **WS-A** — concurrent TTS + per-item progress UI (largest; lead complaint).
4. **WS-C** — wheel vendoring/wiring (infra; partly needs GPU build hosts).

Workstreams are independent; WS-A/WS-C touch only extension files, WS-B+D/WS-E touch host crates + worker SDK. They can run in parallel git worktrees if desired.

---

## Key design decisions (locked)

- **WS-A concurrency model = chunk-into-workers, NOT per-utterance fan-out.** The pool+queue design makes the *run* the unit of concurrency (one pooled worker per run; `max_in_flight` gates concurrent runs). `POST /runtime/start {numWorkers}` already sets `queue.set_max_in_flight` AND exposes `workersActive` (`extensions/builtin/emotion-tts/rust/src/router/runtime.rs:63,159`). So: on storyboard Generate, chunk the N jobs into `workersActive` runs (≤4, since WORKERS is 1–4) → ≤4 concurrent runs across ≤4 workers; merge their per-segment SSE events into ONE per-item grid. `workersActive=1` → 1 chunk = today's single-batch behaviour (the "1-model batch" mode). This needs **near-zero backend change** (per-segment events already fire via `forward_notification`); the `SegmentQueued` event is polish-tier and optional.
- **WS-B+D `runtime.release_memory`** does a full model unload + `torch.cuda.empty_cache()` + `gc.collect()` (matches "free all VRAM and RAM"). It is best-effort and bounded by a host-side 5s timeout per worker. The GC button interrupts in-flight work by design (it is a manual nuke); the tooltip says so.
- **WS-E fix is in the generic step probe**, not the manifests. The manifests already declare files correctly (verified on DGX: container manifest has T2V lines 79-80). The step probe must consult per-file presence (existing `install_map`/orchestrator partial-state infra) instead of `is_family_installed` (any-row).

---

# WS-E — Self-healing dependency installer (per-file verify + idempotent resume)

**Root cause (confirmed live on DGX):** `ModelArtifactHandler::probe` calls `is_family_installed(family)` → returns `Some(path)` if ANY one file of the family is on disk → step reports Satisfied → the declared T2V files (never downloaded) are silently skipped. `.dep-installer/validation.ok` is a coarse marker (`validated_at`+`timeout` only). Re-runs skip forever. The render then fails at load time.
Evidence: `crates/nexus-extension-deps/src/handlers/model_artifact.rs:86-91`; DGX `find /data -iname '*Wan2_2-T2V*'` = empty while `I2V/` had both files; `.dep-installer/validation.ok` content = `validated_at=…\ntimeout_seconds=120`.

**Supporting infra that already exists:** `crates/nexus-models-store/src/downloads/install_map.rs:329` (`<sink_root>/<job_id>/<filename>` existence check), `downloads/store.rs:397` ("what's already downloaded" no-network partial-state probe), `Duplicate(JobId)` dedup (`store.rs:231,309`). The step probe just never consults the per-file layer.

**Files:**
- Modify: `crates/nexus-extension-deps/src/context.rs` — add `verify_files_present` to `ModelStoreClient` trait (default no-op `Ok(vec![])`).
- Modify: `crates/nexus-extension-deps/src/handlers/model_artifact.rs` — probe + post-download verify.
- Modify: `crates/nexus-api/src/dep_bootstrap.rs` — implement `verify_files_present` on `RealModelStoreClient` against `install_map`.
- Test: `crates/nexus-extension-deps/src/handlers/model_artifact.rs` (`#[cfg(test)]`), `crates/nexus-extension-deps/tests/provision_flow_test.rs`.

### Task E1: Add `verify_files_present` to `ModelStoreClient` trait

- [ ] **Step 1 — Write the trait method (default no-op).** In `context.rs`, after the existing `family_integrity` method:

```rust
/// Returns declared files (from `selection.files`, or matched by include/exclude
/// against the family's known rows) that are absent from the install map OR
/// missing / zero-size on disk. Empty => all declared files present.
/// For unrestricted selections this MUST return Ok(vec![]) (enumerating a
/// whole-repo snapshot needs a network call, forbidden in probe()).
async fn verify_files_present(
    &self,
    _family_id: &str,
    _accelerator: Option<&str>,
    _selection: &crate::FileSelection,
) -> Result<Vec<String>, crate::DepError> {
    Ok(vec![])
}
```

- [ ] **Step 2 — Verify it compiles, all existing test doubles still build.** Run: `cargo check -p nexus-extension-deps` → expect clean (default no-op satisfies every existing impl).
- [ ] **Step 3 — Commit.** `git add crates/nexus-extension-deps/src/context.rs && git commit -m "feat(deps): add verify_files_present to ModelStoreClient trait"`

### Task E2: Implement `verify_files_present` on `RealModelStoreClient`

- [ ] **Step 1 — Implement against `install_map`.** In `crates/nexus-api/src/dep_bootstrap.rs`, inside `impl ModelStoreClient for RealModelStoreClient`, after `family_integrity`. Use blueprint sketch (WS-E contract "RealModelStoreClient::verify_files_present"): if `selection.is_unrestricted()` → `Ok(vec![])`; else build candidate set from `selection.files` (or glob via `install_map.list_for_family` + `selection.filter`); for each, look up `ArtifactId::from(format!("{family_id}#{filename}"))` via `install_map.find_by_artifact`; missing row OR `sink_root.join(job_id).join(filename)` absent/zero-size → push to `missing`. **Implementer note:** confirm the actual install_map row→on-disk path resolution (`install_map.rs:329`/`417` already does this — prefer reusing its existing presence check rather than re-deriving the path).
- [ ] **Step 2 — Verify.** `cargo check -p nexus-api`
- [ ] **Step 3 — Commit.**

### Task E3: Probe consults per-file presence for explicit selections

- [ ] **Step 1 — Write failing unit tests** in `model_artifact.rs` `#[cfg(test)]` (blueprint sketch tasks T5: `PartialFileStore`, `probe_satisfied_when_all_declared_files_present`, `probe_not_satisfied_when_declared_file_missing`).
- [ ] **Step 2 — Run, expect FAIL.** `cargo test -p nexus-extension-deps model_artifact` → fails (probe currently returns Satisfied on any-row).
- [ ] **Step 3 — Implement probe change** (blueprint sketch T3): keep `is_family_installed` fast path → `None` ⇒ `NotSatisfied`; `Some` + `selection.is_unrestricted()` ⇒ `Satisfied`; `Some` + explicit selection ⇒ call `verify_files_present`; non-empty ⇒ `tracing::warn!` listing missing + return `NotSatisfied`; empty ⇒ `Satisfied`.
- [ ] **Step 4 — Run, expect PASS.** `cargo test -p nexus-extension-deps model_artifact`
- [ ] **Step 5 — Commit.**

### Task E4: Post-download verify fails LOUD

- [ ] **Step 1 — Write failing test** `run_fails_loud_when_files_still_missing_after_download` (blueprint T5 sketch: `PostDownloadMissingStore`).
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** in the `ModelDownloadProgress::Completed` arm (model_artifact.rs:242, after `record_reference`, before the `return Ok(StepArtifact…)` at :280): if `!selection.is_unrestricted()`, call `verify_files_present`; if non-empty → `return Err(DepError::Backend(format!("model_artifact post-download verify failed for {family_id}: {} file(s) still absent: {}", missing.len(), missing.join(", "))))`.
- [ ] **Step 4 — Run, expect PASS.** Error message must name the step and the missing file.
- [ ] **Step 5 — Commit.**

### Task E5: Integration test — partial install heals on re-run

- [ ] **Step 1 — Add `partial_install_probe_returns_not_satisfied_and_run_heals`** to `tests/provision_flow_test.rs` (blueprint T6 sketch: `PartialMockModelStore` reports T2V missing until `start_download` heals it; assert `download_calls == 1` and final `all_satisfied`).
- [ ] **Step 2 — Run, expect PASS.** `cargo test -p nexus-extension-deps --test provision_flow_test partial_install`
- [ ] **Step 3 — Commit.**

### Task E6: Verify the resume path actually re-fetches missing files (NOT just fails loud)

- [ ] **Step 1 — Read** `crates/nexus-models-store/src/downloads/orchestrator.rs` `start_download` + the `Duplicate(JobId)` branch. Determine: when probe (now) returns NotSatisfied and `run()` calls `start_download` with I2V present + T2V absent, does the orchestrator resume the existing job and fetch ONLY the missing files (HF snapshot semantics), or return `Duplicate` and no-op?
- [ ] **Step 2 — If it resumes/fetches-missing:** no further change; document in the handler. **If it no-ops on Duplicate:** add a targeted re-fetch — when probe detected a partial install (not `force`), drive the missing-file download (either by resuming the job to completion, or `purge_family` + fresh `start_download` as a documented fallback). Keep it generic (no extension-id).
- [ ] **Step 3 — Verify** with the E5 integration test extended to assert files materialize.
- [ ] **Step 4 — Commit.**

### Task E7: Audit emotion-tts installer (unrestricted IndexTTS-2 selection)

- [ ] **Step 1 — Document the search-fallback risk** (blueprint T7): in `dep_bootstrap.rs` `snapshot_targets_from_huggingface`, expand the existing `hf detail enumeration failed … missing field repo_id` WARN to state the consequence. No functional change. The new post-download verify is a no-op for unrestricted selections, so a partial IndexTTS-2 download could still probe Satisfied — flag as a known limitation; recommend pinning emotion-tts to explicit `files[]` once the repo list is stable.
- [ ] **Step 2 — Verify** `cargo check -p nexus-api`.
- [ ] **Step 3 — Commit.**

### Task E8: DGX heal verification (after deploy)

- [ ] **Step 1 — Deploy** the fixed host binary to DGX (`docker cp` / rebuild), restart `nexusdnn`.
- [ ] **Step 2 — Trigger non-force install** for svi2-pro; watch logs for `model_artifact: probe found partial install — N file(s) missing` (note: T2V already present from today's stopgap, so this confirms NO false-positive re-download when files exist; to truly exercise heal, move a T2V file aside first).
- [ ] **Step 3 — Idempotency** — second install run: logs show `probe satisfied — skipping run`.
- [ ] **Step 4 — Commit** any doc updates.

**Boundary:** all changes in generic host step-executor code; manifests unchanged; no extension-id literals. PASS.
**Risks:** glob-based selections (no explicit `files[]`) can only check filenames already in the install_map — a never-downloaded file isn't flagged. Mitigation: prefer explicit `files[]` (svi2-pro already does). Unrestricted (emotion-tts) keeps pre-existing any-row behaviour. Job `Duplicate` dedup may require Task E6's re-fetch handling.

---

# WS-B + WS-D — Stop frees VRAM + Navbar GC button (shared `runtime.release_memory`)

**Root cause (B):** `StdioLease::release()` sends a best-effort 1s `shutdown` RPC, closes stdin, 5s grace, then SIGKILL — but never unloads the model / clears CUDA cache, so VRAM can linger on a hung CUDA context. (`crates/nexus-backend-runtimes/src/generic/leases/stdio_lease.rs:245`.) **D:** no "free all" capability or navbar button exists.

**Files:**
- Modify (workers): `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/main.py` (+`handlers.py` override), `extensions/builtin/nexus-video-longcat/worker/src/longcat_video_worker/main.py`, `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/main.py`, `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/main.py`.
- Modify (host): `crates/nexus-backend-runtimes/src/generic/leases/manager.rs` (`all_live_handles`), `crates/nexus-api/src/handlers/backend_runtimes/installs_stop.rs` (pre-kill release), `crates/nexus-api/src/router.rs`, `crates/nexus-api/src/handlers/host/mod.rs`.
- Create (host): `crates/nexus-api/src/handlers/host/gc.rs`.
- Modify (web): `apps/web/src/services/backend_runtimes_client.ts`, `apps/web/src/layout/top_bar.tsx`, `apps/web/src/layout/top_bar.css.ts`, `apps/web/src/root_layout.tsx`.

### Task BD1: `runtime.release_memory` in all four worker `_register_intrinsic()`

- [ ] **Step 1 — Write failing test** (emotion-tts worker): dispatch `runtime.release_memory` on a `Worker()` with no model loaded → `{vram_used_mb:0, vram_total_mb:0, freed_mb:0}`, no exception, torch-absent-safe.
- [ ] **Step 2 — Run, expect FAIL.** `cd extensions/builtin/emotion-tts/worker && uv run pytest tests/ -k release_memory -v`
- [ ] **Step 3 — Implement intrinsic** in each worker `_register_intrinsic()` (blueprint BD-T1 sketch): `gc.collect()`, then if torch+cuda available, measure `memory_allocated` before/after `empty_cache()`, return deltas; on `ImportError/RuntimeError` return zeros. For emotion-tts, add a Phase-4 `replace=True` override calling `adapter.unload()` + `_vram_usage()`; for longcat/svi2, full variant calls the existing `vram.evict_models(state)` + `vram.memory_stats()`.
  - **Implementer note:** confirm each worker's actual unload/vram helper names (`adapter.unload`, `vram.evict_models`, `vram.memory_stats`, `_vram_usage`) before wiring. Add `# REQUIRED: every nexus worker implements runtime.release_memory` comment.
- [ ] **Step 4 — Run, expect PASS** (all four workers).
- [ ] **Step 5 — Commit.**

### Task BD2: `LeaseManager::all_live_handles()`

- [ ] **Step 1 — Write failing test** in `manager.rs`: `all_live_handles().len() == live_count()`.
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement:** `pub async fn all_live_handles(&self) -> Vec<Arc<StdioLease>>` locking `entries` once and collecting `e.lease.clone()`. Confirm the entry field name (`e.lease`) against `manager.rs`.
- [ ] **Step 4 — Run, expect PASS.** `cargo test -p nexus-backend-runtimes -- leases::manager`
- [ ] **Step 5 — Commit.**

### Task BD3: Stop sends `runtime.release_memory` before kill

- [ ] **Step 1 — Write failing integration test** (mock `StdioLease` records RPC calls): stop handler sends `runtime.release_memory` before `release_all_for_install`; worker timeout does not abort stop. **Implementer note:** if a hand-rolled lease double is needed (broadcast::Receiver involved), prefer it over mockall per `[[feedback_mockall_vs_handrolled_for_broadcast]]`.
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** in `installs_stop.rs::stop` (blueprint BD-T3): before `release_all_for_install`, `handles_for_install` → `futures::future::join_all` of per-handle `tokio::time::timeout(5s, lease.send_rpc("runtime.release_memory", Value::Null))`; log freed_mb / warn on err/timeout; proceed unconditionally. Confirm `lease.send_rpc` + `lease.id()` signatures; add `futures` to `nexus-api/Cargo.toml` only if missing.
- [ ] **Step 4 — Run, expect PASS.** `cargo test -p nexus-api -- installs_stop`
- [ ] **Step 5 — Commit.**

### Task BD4: `POST /api/host/gc/free-all` handler + route

- [ ] **Step 1 — Write failing test:** `free_all` with empty LeaseManager → `{workers_notified:0, total_freed_mb:0}`, 200.
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** `crates/nexus-api/src/handlers/host/gc.rs` (blueprint BD-T4): `all_live_handles()` → `join_all` of `send_rpc("runtime.release_memory", Null)` with 5s timeout each → sum `freed_mb` → `FreeAllResponse { workers_notified, total_freed_mb }`. Add `pub mod gc;` to `host/mod.rs`; add `.route("/gc/free-all", post(host::gc::free_all))` to the `api_host` Router block in `router.rs`.
- [ ] **Step 4 — Run + boundary grep.** `cargo test -p nexus-api -- gc` and `grep -nE 'local.llm|emotion.tts|longcat|svi2' crates/nexus-api/src/handlers/host/gc.rs` → zero hits.
- [ ] **Step 5 — Commit.**

### Task BD5: `freeAllMemory()` web client

- [ ] **Step 1 — Implement** in `apps/web/src/services/backend_runtimes_client.ts`: `POST /api/host/gc/free-all`, `unwrap<{workers_notified:number; total_freed_mb:number}>`.
- [ ] **Step 2 — Verify** `cd apps/web && pnpm tsc --noEmit`. **Step 3 — Commit.**

### Task BD6: Navbar GC button (TopBar)

- [ ] **Step 1 — Add props** `onFreeMemory?: () => void; gcState?: 'idle'|'loading'|'done'|'error'` to `TopBarProps` (both optional → existing usages compile).
- [ ] **Step 2 — Render** the button in `rightZone` before notifications (blueprint BD-T6): icon `memory`/`sync`(spinning)/`check_circle`; disabled when `loading`/`done`; aria-labels per state; title "Broadcast runtime.release_memory to all live workers — interrupts active renders".
- [ ] **Step 3 — Style** `gcButton` in `top_bar.css.ts` (amber hover) + a `spinningIcon` keyframes for the loading state. Confirm real token names (`vars.color.*`, `vars.motion.*`, `vars.control.heightSm`, `vars.radius.full`) against the file.
- [ ] **Step 4 — Verify** `pnpm tsc --noEmit`. **Step 5 — Commit.**

### Task BD7: Wire `handleFreeMemory` in `root_layout.tsx`

- [ ] **Step 1 — Implement** (blueprint BD-T7): `gcState` state; `handleFreeMemory` → `freeAllMemory()` → `toast.success('Freed X.X GB across N runtime(s)')` / `toast.error(...)`; `workers_notified===0` → info toast "No live runtimes to free"; reset to `idle` after 3s (guard against unmounted-set via ref/effect cleanup). Pass `onFreeMemory`+`gcState` to `TopBar`. Confirm `toast` is sonner.
- [ ] **Step 2 — Verify** `pnpm tsc --noEmit && pnpm vitest run`. **Step 3 — Commit.**

### Task BD8: Build + DGX smoke

- [ ] **Step 1 — Build** `cargo build -p nexus-api -p nexus-backend-runtimes`; `cd apps/web && pnpm build`.
- [ ] **Step 2 — DGX smoke:** load a model, click GC button → `POST /api/host/gc/free-all` 200, toast shows freed GB, `nvidia-smi` shows VRAM drop while worker still alive. Stop a runtime with model loaded → tracing shows `pre-stop memory released freed_mb>0`, VRAM drops before exit.
- [ ] **Step 3 — Commit** any fixups.

**Boundary:** `gc.rs` operates only on lease handles via `all_live_handles()`; `runtime.release_memory` is a generic protocol method (like `health`), not an extension capability tag; route under `/api/host/*`; worker changes under `extensions/builtin/<id>/`. PASS.
**UI states:** idle (memory icon, amber hover) · loading (spinning sync, disabled) · done (check_circle, disabled, 3s) · error (memory icon, enabled for retry). Toasts: success `Freed X.X GB across N runtimes`; empty `No live runtimes to free`; error `Failed to free GPU memory`.
**Open decision:** GC `runtime.release_memory` does full model eviction (frees most VRAM) — confirm acceptable that it interrupts active renders, or add a `{full:bool}` param for a soft empty_cache-only variant. Recommendation: full unload (matches "free all").

---

# WS-A — True-concurrent TTS + realtime per-item progress UI

**Root cause (confirmed):** storyboard Generate issues ONE `createRun` (`run_panel.tsx:120`) → ONE `BatchSynthesizeOperator` on ONE pooled worker (`run_loop.rs:463`), utterances processed inside one batch RPC. `max_in_flight` defaults to 1 (`queue/mod.rs:57`). The pool's N workers only engage across N concurrent *runs*. Frontend shows only an aggregate chip; no per-item position/ETA.

**Design (chunk-into-workers):** On Generate in storyboard mode, read `workersActive`, split the N jobs into `min(workersActive, N)` contiguous chunks, issue one `createRun` per chunk (each chunk = a batch of its utterances), subscribe to each run's SSE, and merge per-segment events into ONE per-item progress grid keyed by job/global_index. `workersActive=1` ⇒ 1 chunk ⇒ today's single-batch path. The WORKERS dropdown already sets the cap via `POST /runtime/start`, so chunks run concurrently.

**Files:**
- Modify (web): `extensions/builtin/emotion-tts/web/src/views/recipe/components/run_panel.tsx` (chunk + multi-stream merge + per-item grid + button states), `run_panel.css.ts` (grid/spinner/eta styles), `web/src/services/runs_client.ts` (`createRuns` helper + multi-subscribe), `web/src/services/types.ts` (optional `segment_queued`), `web/src/views/recipe/components/storyboard/storyboard_data.ts` (`RunProgress` + `runProgressToJobStatus`), `recipe.view.tsx` + `storyboard/storyboard.tsx` (live card status).
- Modify (rust, optional polish): `rust/src/dispatcher/events.rs` + `run_loop.rs` + `router/runs.rs` (`SegmentQueued` event + SSE replay).
- Rebuild + commit: `web/dist/emotion-tts.{js,css}` (project rule: dist is committed).

### Task A1: `createRuns` + chunking helper

- [ ] **Step 1 — Write failing vitest:** `chunkJobs(jobs, workers)` splits into `min(workers, jobs.length)` balanced contiguous chunks (e.g. 12 jobs / 3 workers → [4,4,4]; 5 jobs / 3 → [2,2,1]; 2 jobs / 4 → [1,1]); `createRuns(deploymentId, payloads)` issues `Promise.all(createRun)` and returns responses in order.
- [ ] **Step 2 — Run, expect FAIL.** `cd extensions/builtin/emotion-tts/web && pnpm vitest run tests/unit/`
- [ ] **Step 3 — Implement** `chunkJobs` + `createRuns` in `runs_client.ts` (each chunk payload = `{...createPayload, prebuiltSegments: chunkSegments}`).
- [ ] **Step 4 — Run, expect PASS.** **Step 5 — Commit.**

### Task A2: `RunProgress` type + `runProgressToJobStatus`

- [ ] **Step 1 — Add** `RunProgress` interface + `runProgressToJobStatus` to `storyboard_data.ts` (blueprint A-T4 sketch). **Step 2 — Unit test** the mapper. **Step 3 — Verify** `pnpm tsc --noEmit && pnpm vitest run tests/unit/`. **Step 4 — Commit.**

### Task A3: RunPanel — chunked fan-out + per-item state + multi-stream merge

- [ ] **Step 1 — Write failing test:** storyboard mode with `workersActive=3` and 6 jobs issues 3 `createRun` calls; per-item `ItemState` map has 6 entries keyed by job; each chunk's SSE `segment_started/completed/failed` updates the right item; Generate disabled while any run in-flight; Cancel cancels all run ids (ignore 409).
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** `startBatch` (blueprint A-T5 sketch, adapted to chunking): branch on `props.storyboardJobs?.length`; chunk via `chunkJobs(jobs, workersActive)`; `createRuns`; subscribe to each run; `handleItemEvent(event, runId→jobIds, …)` updates `ItemState`; phase→`terminal` only when all items terminal; Cancel iterates run ids with try/catch. Non-storyboard path unchanged (single `createRun`). Map worker per-segment events to items by `global_index`/utterance id.
- [ ] **Step 4 — Run, expect PASS.** `pnpm tsc --noEmit && pnpm vitest run`
- [ ] **Step 5 — Commit.**

### Task A4: Per-item progress grid CSS

- [ ] **Step 1 — Add** `progressGrid`, `progressGridRow` (`display:contents` hover), `gridCell`, `gridLabel`, `spinner` (reduced-motion-safe), `etaChip`, `inFlightBadge` to `run_panel.css.ts` (blueprint A-T6 sketch). **Preserve** the StatusPill pill-padding rule (`paddingInline:0.55em / marginInline:-0.55em`) — it lives in `status_pill.css.ts`; do not override it. Confirm real token names (`vars.space.*`, `vars.color.*`, `vars.text.*`, `vars.motion.*`, `vars.radius.pill`).
- [ ] **Step 2 — Verify** `pnpm build`. **Step 3 — Commit.**

### Task A5: Live storyboard card status from RunProgress

- [ ] **Step 1 — Thread** `onJobProgressChange` from RunPanel → `recipe.view.tsx` (`jobProgressMap` state) → `storyboard.tsx` (`jobProgress` prop); card visual status = `runProgressToJobStatus(jobProgress.get(j.id)) ?? j.status` (blueprint A-T7). Editor-side `statusSummary` still uses `j.status`.
- [ ] **Step 2 — Verify** `pnpm tsc --noEmit && pnpm vitest run`. **Step 3 — Commit.**

### Task A6 (optional polish): `SegmentQueued` SSE event

- [ ] **Step 1 — Add** `RunEvent::SegmentQueued{run_id,utterance_id,global_index,queue_position,queue_total,eta_ms}` to `events.rs` (`sse_event_name`→`segment_queued`), emit in `run_loop.rs` after `insert_many` for misses, and replay queued rows in `router/runs.rs` (blueprint A-T1/T2). Frontend handles `segment_queued` → status `queued` + position + eta. **Skip if time-boxed** — core concurrency works without it; this only adds pre-start "position N of M · ~Ns" polish.
- [ ] **Step 2 — Verify** `cargo test` (emotion-tts rust) + `pnpm tsc`. **Step 3 — Commit.**

### Task A7: Build + commit dist + DGX smoke

- [ ] **Step 1 — Build** `pnpm build` (emotion-tts web) → dist updated; `cargo test` (emotion-tts rust) green.
- [ ] **Step 2 — Commit dist** `dist/emotion-tts.{js,css}` (project rule).
- [ ] **Step 3 — DGX smoke** (WORKERS=3, storyboard with ≥6 segments across 2 voices): Generate → 3 `POST /runs` in Network tab → ≤3 SSE streams → per-item grid shows all rows, multiple generating simultaneously → carousel cards flip rendering→ready without refresh → Generate disabled during, re-enables on completion → Cancel cancels all.
- [ ] **Step 4 — Commit** fixups.

**Boundary:** all changes under `extensions/builtin/emotion-tts/`. PASS.
**UI states:** Generate — idle(primary)/blocked(disabled, "Start runtime"/"Queue segments")/starting(spinner "Starting…")/running(spinner "Generating N segments…")/terminal(re-enabled). Cancel — visible only while running, cancels all. Per-item grid: label(mono) · status pill (queued/generating/done/failed/cancelled tones) · ETA/spinner/duration · failure category. In-flight badge: `● N generating` / `N done`.
**Risks:** chunk runs need `max_in_flight = workersActive` (already set by the WORKERS dropdown — if user never opened it, cap defaults to 1 and chunks serialize; have Generate ensure the cap is raised, or surface a hint). SSE streams ≤ workersActive ≤ 4 → no browser connection-limit issue. Cancel atomicity: ignore 409 on already-completed runs.

---

# WS-C — Vendor + wire proprietary wheels (all 3 targets)

**Inventory (confirmed):** `binaries/` has flash-attn 2.8.3 (win cp311+cp312, linux x86_64 cp312, linux aarch64 cp312) fully wired into svi2-pro; sageattn3 1.0.0 win cp312 only (NOT wired anywhere). longcat declares `sageattention>=1.0.6` (PyPI) + `flash-attn>=2.6` with NO `[tool.uv.sources]` (builds from source). emotion-tts has no attention deps. Deployed image has REAL wheels (flash-attn aarch64 = 65MB, not an LFS pointer) → LFS expansion in Docker build works. `uv.sources` relative path `../../../../binaries/` resolves at both dev-root and `/usr/local/share/nexus-dnn/` in the image.

**Files:** `extensions/builtin/svi2-pro/worker/pyproject.toml`, `extensions/builtin/nexus-video-longcat/worker/pyproject.toml`, `binaries/{win-amd64,linux-amd64,linux-aarch64}/`, `binaries/README.md`, both `uv.lock`.

### Task C1: Audit sageattention v1 PyPI binary availability

- [ ] **Step 1 — Probe** (blueprint C-T1): `uv pip download 'sageattention>=1.0.6' --platform {manylinux_2_28_x86_64, manylinux_2_28_aarch64, win_amd64} --python-version 3.12 --only-binary :all: --dry-run`. Record which targets have prebuilt wheels (Triton-based → likely linux yes, Windows no).
- [ ] **Step 2 — Record** results in `binaries/README.md`.

### Task C2: Wire flash-attn into longcat (reuse existing wheels — zero new files)

- [ ] **Step 1 — Add `[tool.uv.sources]` flash-attn** entries to longcat pyproject pointing at the existing `binaries/linux-amd64/flash_attn-2.8.3+cu132torch2.12-cp312-cp312-linux_x86_64.whl` and `binaries/linux-aarch64/flash_attn-2.8.3-cp312-cp312-linux_aarch64.whl` (blueprint C-T3). Windows intentionally excluded.
- [ ] **Step 2 — Regenerate** `uv lock`. **Step 3 — Verify** `cd extensions/builtin/nexus-video-longcat/worker && uv sync --extra flash_attn --dry-run 2>&1 | grep -iE 'flash.attn|Building'` → resolved from local, no `Building`. **Step 4 — Commit.**

### Task C3: Wire existing sageattn3 win wheel into svi2-pro

- [ ] **Step 1 — Add** sageattn3 to a `sage` extra (or `flash`) in svi2-pro `[project.optional-dependencies]` + `[tool.uv.sources]` win cp312 entry (blueprint C-T2). **Confirm the distribution name** in the wheel metadata (`unzip -p <whl> *.dist-info/METADATA | grep ^Name`) — the `[tool.uv.sources]` key must match exactly or uv ignores it.
- [ ] **Step 2 — Regenerate** `uv lock`; **verify** `uv sync --extra sage --dry-run` resolves from local on win cp312. **Step 3 — Commit.**

### Task C4: Build sageattn3 aarch64 wheel on DGX GB10

- [ ] **Step 1 — Build** on DGX (blueprint C-T5): clone thu-ml/SageAttention, cu130 torch venv, `TORCH_CUDA_ARCH_LIST='8.0;8.6;9.0;12.0+PTX'`, `MAX_JOBS=4`, `pip wheel . --no-deps`. SCP wheel → `binaries/linux-aarch64/`.
- [ ] **Step 2 — Verify import** on DGX; `git lfs ls-files | grep sageattn3` shows LFS OID.
- [ ] **Step 3 — Wire** the aarch64 slot in svi2-pro `[tool.uv.sources]`; **uv lock**. **Step 4 — Commit** (LFS wheel + pyproject + lock).

### Task C5: Resolve longcat sageattention (vendor or pin per C1)

- [ ] **Step 1 — If PyPI binary exists** for needed targets: pin `sageattention>=1.0.6,<2.0` (no sources). **Else vendor** the wheel(s) into `binaries/<platform>/` + `[tool.uv.sources]` entry (blueprint C-T4). Confirm package name = `sageattention`.
- [ ] **Step 2 — uv lock; verify** `uv sync --extra diffusers --dry-run` no `Building` for sageattention on each available target. **Step 3 — Commit.**

### Task C6 (deferred unless a cu132 x86_64 GPU host is available): sageattn3 linux-amd64

- [ ] **Step 1 — Build** sageattn3 cp312 on a CUDA-13.2 x86_64 host (blueprint C-T6), wire the linux-amd64 slot. **If no such host:** document the gap in `binaries/README.md` (svi2-pro silently falls back to SDPA on linux-x86_64; acceptable). Skip rather than block.

### Task C7: Update `binaries/README.md` + LFS/Docker guard

- [ ] **Step 1 — Rewrite** the inventory table (blueprint coverage matrix) with per-platform wheels + the cu131-vs-cu132 (Triton JIT = cu-version-agnostic) and no-cu-tag-aarch64 notes.
- [ ] **Step 2 — Confirm** the aarch64 Dockerfile builder expands LFS before `COPY` (deployed image already has real wheels, so this works today — just assert/document).
- [ ] **Step 3 — Commit.**

### Task C8: End-to-end uv-sync smoke (no source build)

- [ ] **Step 1 — Verify** on win-amd64 (svi2-pro `uv sync --extra flash --extra sage`) and DGX aarch64 (longcat `uv sync --extra diffusers --extra flash_attn`, svi2-pro `uv sync --extra sage`): `grep -E 'Building.*(flash|sage)'` → empty (PASS).
- [ ] **Step 2 — Commit** any fixups.

**Boundary:** only extension pyproject + repo-global `binaries/` + README. No host crate touched. PASS.
**Risks:** sageattn3 dist-name vs key mismatch silently ignores the source entry (verify METADATA Name); cu131 win wheel on cu132 torch is fine (Triton JIT); aarch64 cu130-vs-cu132 ABI — Triton JIT independent of build-time torch CUDA, verify import; sageattention v1 likely no Windows binary (longcat Windows GPU not targeted — acceptable).

---

# WS-F — emotion-tts won't start: heal partial uv installs (`libcudnn.so.9` missing)

**Symptom:** emotion-tts worker `model.load` dies: `ImportError: libcudnn.so.9: cannot open shared object file` (torch import fails in `_indextts_compat.patch_indextts_text_normalizer` → `indextts.utils.common` → `import torch` → `torch._C`). Worker then `worker.stop {}` ×2 and the runtime 503s.

**Root cause (confirmed live on DGX, HIGH confidence):** the emotion-tts venv has a **partial uv install** — `nvidia_cudnn_cu13-9.19.0.56.dist-info/RECORD` (and ~12 other nvidia CUDA-stack dist-infos) are recorded, but their payloads were **never materialized into `site-packages/nvidia/*/lib`**. torch's `libtorch_cuda.so` has a load-time `DT_NEEDED` on `libcudnn.so.9` and `torch/__init__.py` preloads it by globbing `site-packages/nvidia/cudnn/lib/libcudnn.so.*[0-9]` — that dir was empty → import fails. The payload IS intact in the per-extension uv cache (`.uv-cache/archive-v0/...`), just not linked into the venv.
- **Self-perpetuating:** because the `.dist-info/RECORD` exists, `uv sync` treats the package as already-installed and skips re-materialization. The host install path (`package_set.rs::run()`, plain `uv sync`, no `--reinstall`) therefore **cannot self-heal** — re-installing via `POST /api/v1/extensions/{id}/install` is a no-op for the broken packages. Only `--reinstall`/`--reinstall-package` (or a wiped venv) re-links the payload.
- **Why svi2/longcat work on the same box:** identical `nvidia-cudnn-cu13` wheel, but their venvs materialized the payload fine. This is an install-**integrity** bug, not a dependency-pin bug. `extensions/builtin/emotion-tts/worker/pyproject.toml` + `uv.lock` are CORRECT — **no manifest change**.
- Evidence: `crates/nexus-extension-deps/src/handlers/package_set.rs:122-167` (probe trusts the `.synced.json` marker, never verifies payloads), `:214-218` (`uv sync` args, no `--reinstall`). DGX: `find .venv -name libcudnn.so.9` = empty pre-heal; `nvidia_cudnn_cu13-*.dist-info` present; `uv sync --dry-run` would NOT reinstall cudnn; `--reinstall-package nvidia-cudnn-cu13 --dry-run` WOULD.

**Files:**
- Modify: `crates/nexus-extension-deps/src/handlers/package_set.rs` — add a generic `venv_partial_install_packages(venv) -> Vec<String>` integrity scan; consult it in `probe()` (force re-run) and `run()` (force re-materialize). Tests in the same file's `#[cfg(test)]`.

### Task F0 — DONE (operator heal, executed 2026-06-17)

- [x] Ran host-identical `uv sync … --reinstall` (no extras, mirroring `package_set.rs::run()`) inside the DGX `nexusdnn` container against the emotion-tts venv → re-linked all 180 pkgs from the intact cache. **Verified:** `libcudnn.so.9` present; `import torch` → `2.11.0+cu130 cuda_avail True`; GPU matmul (cublas, staged under `nvidia/cu13/lib/`) `matmul_ok`. emotion-tts unblocked NOW. F1-F3 below make this durable so a from-scratch / re-install never recurs.

### Task F1: Generic partial-install integrity scan (helper + RED tests)

- [ ] **Step 1 — Write failing unit tests** in `package_set.rs` `#[cfg(test)]`: stage a temp fake venv `lib/.../site-packages/<pkg>-<ver>.dist-info/RECORD` whose RECORD lists a payload path (e.g. `nvidia/cudnn/lib/libcudnn.so.9,,`) that does NOT exist on disk → `venv_partial_install_packages(&venv)` returns `["nvidia-cudnn-cu13"]` (normalized dist name: dir stem before the version, `_`→`-`). A second case where the listed file DOES exist → returns `[]`. Cover: no dist-info dirs → `[]`; RECORD with only metadata entries (`.dist-info/…`) is skipped (don't flag a package for its own metadata). **Sample, don't stat-every-line** — check the first one or two non-`.dist-info`, non-`.pyc` payload entries per RECORD to keep it cheap.
- [ ] **Step 2 — Run, expect FAIL.** `cargo test -p nexus-extension-deps package_set`
- [ ] **Step 3 — Implement** `venv_partial_install_packages(venv: &Path) -> Vec<String>` (sync std::fs is fine here; or async tokio::fs): for each `*.dist-info` dir under `<venv>/lib*/**/site-packages` (Windows: `<venv>/Lib/site-packages`; POSIX: `<venv>/lib/python*/site-packages`), read `RECORD`, take the first ≤2 payload entries whose path does NOT start with the package's own `.dist-info/` and is not a `.pyc`, resolve relative to `site-packages`, and if absent (or zero-size) record the package (dist dir stem, `_`→`-`, lowercased). Component::Normal traversal guard; ignore unreadable RECORDs (don't flag). Generic — no extension-id literals.
- [ ] **Step 4 — Run, expect PASS.** **Step 5 — Commit.**

### Task F2: `probe()` returns NotSatisfied on partial install

- [ ] **Step 1 — Write failing test:** a probe over a venv whose marker (`.synced.json`) matches the manifest sha + extras BUT whose payload is partial returns `ProbeResult::NotSatisfied` (today it returns `Satisfied`). Build the fixture: real marker JSON with the manifest sha, a `.dist-info/RECORD` listing a missing payload.
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement:** in `probe()`, after the sha + extras checks pass (before the `Satisfied` return at `:158-166`), call `venv_partial_install_packages(&venv)`; if non-empty → `tracing::warn!(target: "extension_install::package_set", packages = ?broken, "partial uv install detected — forcing re-sync")` and `return Ok(ProbeResult::NotSatisfied)`.
- [ ] **Step 4 — Run, expect PASS.** **Step 5 — Commit.**

### Task F3: `run()` force-reinstalls the broken packages

- [ ] **Step 1 — Write failing test** (or assert via a small refactor that makes the arg-builder unit-testable): when the venv pre-exists and `venv_partial_install_packages` is non-empty, the `uv sync` argv includes a `--reinstall-package <name>` for each broken package (NOT a blanket `--reinstall` — keep the heal surgical so a healthy re-sync stays cheap). When the venv is absent or fully intact, no reinstall flags are added (preserves today's behaviour + avoids needless re-extraction).
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** in `run()` after the `cmd.arg("sync")` + extras block (`:215-218`): if `venv.exists()`, scan; for each broken package `cmd.arg("--reinstall-package").arg(name)`. (uv re-links from cache → cheap; matches the verified F0 heal mechanism.) Keep generic.
- [ ] **Step 4 — Run, expect PASS** + boundary: `cargo test -p nexus-extension-deps && cargo test -p nexus-extension-deps --test boundary_test`. Grep the file for extension-id literals → zero. **Step 5 — Commit.**

### Task F4: Build + DGX from-scratch heal verification (operator)

- [ ] **Step 1 — Build** `cargo build -p nexus-api -p nexus-extension-deps`. Rebuild the aarch64 image (`dockerfiles/aarch64.dockerfile`) so the DGX host binary carries the fix; recreate `nexusdnn`.
- [ ] **Step 2 — Prove from-scratch heal:** move a materialized payload aside in the emotion-tts venv (`mv nvidia/cudnn/lib/libcudnn.so.9 …bak`) to simulate the partial state, then `POST /api/v1/extensions/nexus.audio.emotiontts/install` → host logs show `partial uv install detected — forcing re-sync` and the `--reinstall-package` heals it; `import torch` succeeds again. Second install run → `probe satisfied — skipping`.
- [ ] **Step 3 — Generation smoke:** start an emotion-tts generation → `model.load` reaches IndexTTS-2 with no `libcudnn` error, no double `worker.stop`/503; produces a WAV.
- [ ] **Step 4 — Commit** any fixups.

**Boundary:** all changes in generic host step-executor code (`package_set.rs`); no manifest change; no extension-id literals. PASS.
**Risks:** the scan samples ≤2 payloads/package — a package broken only in an unsampled file slips through (acceptable: torch + the CUDA stack each have a representative `.so`/`.pyd` as their first payload). Healthy re-syncs add zero reinstall flags (no perf regression). Open question deferred: WHY the original materialization was left partial (uv 0.11.21 exited 0 on an incomplete venv, or an interrupted/cancelled install) — the integrity heal makes the cause moot, but if it recurs frequently, pin it to a uv bug.

---

# WS-G — svi2 render: progress + Stop vanish after a window switch (re-subscribe + persist)

**Symptom (user):** "If I start video generation but I change window for a second and come back, I no longer see progress and I can't stop the generation."

**Root cause (confirmed, HIGH confidence — svi2-pro-specific):** the in-flight render state lives in `RenderRequestProvider` as plain React `useState`; both the progress bar AND the Cancel button are gated on the same `render.phase === "running"`, so when that field reverts they disappear together.
- **Primary (Cause A):** a backgrounded tab throttles/kills the `EventSource`; the client never reconnects — `subscribeSse` (`src/services/http.ts:49-68`) only fires `onError` (→ `markStalled`, `render_request_store.tsx:217-219`), never reopens. With no frames, the stall watchdog (`render_request_store.tsx:112-130`) escalates and at `STALL_LOST_MS` (240s) calls `connectionLostState(prev)` (`render_state.ts:181-191`) → `phase:"error"` → `RenderProgress` renders the error/Dismiss box (`render_progress.tsx:38-53`), unmounting the bar AND the "Cancel render" button (`render_progress.tsx:135-139`). The backend keeps rendering. (Even a brief background gap often permanently kills the throttled EventSource since there's no reconnect.)
- **Secondary (Cause B):** `main.tsx:paint()` (`:137-147`) rebuilds the router + root on ANY observed-attribute / `hostContext` write (`:62-65`, `:128-131`) → fresh provider → `render` resets to `initialRenderState()` (`jobId:null`). After that `cancelRenderJob` early-returns on null jobId (`render_request_store.tsx:224-226`) — Stop is impossible.
- **Backend ALREADY supports the fix:** `router/render.rs:165-218` (`/render/jobs/{id}/events` drains the full `backlog` then tails live; sink retained 30s past terminal — `dispatcher.rs:39-43,259-262`) and `GET /render/jobs/{id}` returns current status. `reduceRenderFrame` revives the UI on the next frame (`render_state.ts:102-103`). **Fix is frontend-only**, all under `extensions/builtin/svi2-pro/web/`.

**Files (all in `extensions/builtin/svi2-pro/web/`):**
- `src/store/render_request_store.tsx` (provider, watchdog, onError, cancel)
- `src/services/http.ts` (`subscribeSse` — caller-driven reconnect)
- `src/domain/render_state.ts` (`connectionLostState`, `reduceRenderFrame`)
- tests: `tests/unit/render_reconnect.test.tsx`, `render_watchdog.test.ts` (or extend `render_state.test.ts`), `render_persist.test.tsx`
- rebuild + commit `dist/svi2-pro.{js,css}` (project rule: svi2-pro commits its bundle).

### Task G1: Re-subscribe on visibility/focus return (RED→GREEN)

- [ ] **Step 1 — Failing test** `tests/unit/render_reconnect.test.tsx`: mock `subscribeRenderStream`/`getRenderJob`; `startRenderJob` → one subscription; dispatch `visibilitychange` with `document.visibilityState="visible"` while `phase==="running"` → asserts the stream is re-subscribed with the same `jobId` and the prior cleanup ran. Also a `window` `focus` case.
- [ ] **Step 2 — Run, expect FAIL.** `cd extensions/builtin/svi2-pro/web && pnpm test -- render_reconnect`
- [ ] **Step 3 — Implement** in `RenderRequestProvider`: an effect adding `document` `visibilitychange` + `window` `focus` listeners; on visible/focus, if `render.phase==="running"` && `render.jobId`, tear down the existing `streamCleanup`, re-open `subscribeRenderStream(jobId,…)` (backend replays backlog), and reset the watchdog baseline. Idempotent (don't stack subscriptions). Clean up listeners on unmount.
- [ ] **Step 4 — Run, expect PASS** + `pnpm test` (no regressions). **Step 5 — Commit.**

### Task G2: Watchdog reconnects before declaring connection lost

- [ ] **Step 1 — Failing test** `render_watchdog.test.ts` (fake timers): advance past `STALL_LOST_MS` → the store first attempts a reconnect; it only transitions to `connectionLostState` if a stubbed `getRenderJob` reports the job gone/terminal-without-resume. A reconnect that yields a fresh frame returns the UI to running (`stalled:false`).
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement** in the watchdog `STALL_LOST` branch (`render_request_store.tsx:118-123`): reconnect-then-fallback — re-subscribe + `getRenderJob`; keep `running` if the job is still live, only `connectionLostState` when status confirms it's unrecoverable.
- [ ] **Step 4 — Run, expect PASS** + `pnpm test`. **Step 5 — Commit.**

### Task G3: Persist `{jobId,phase}` so the run survives a remount (Cause B)

- [ ] **Step 1 — Failing test** `render_persist.test.tsx`: `startRenderJob`, unmount the provider, remount with the same deployment id → `render.phase==="running"` + `render.jobId` restored (via stubbed `getRenderJob`) and a subscription re-opens (so Cancel renders + works).
- [ ] **Step 2 — Run, expect FAIL.**
- [ ] **Step 3 — Implement:** persist `{jobId,phase}` to an **extension-owned** `sessionStorage` key (literal defined ONLY inside svi2-pro, namespaced by extension id + deployment id — never referenced from host code; per `.claude/rules/host-extension-boundary.md`). Write on `startRenderJob` + terminal transitions (clear on terminal); on provider mount, if a non-terminal jobId is found, hydrate `render` from `GET /render/jobs/{id}` then re-subscribe.
- [ ] **Step 4 — Run, expect PASS** + `pnpm test`. **Step 5 — Commit.**

### Task G4 (optional polish): idempotent `paint()`

- [ ] **Step 1 — Implement** in `main.tsx`: cache last `route`/`deployment-id`; rebuild the router + root only when they actually change; no-op attribute/`hostContext` writes skip the re-render (removes the gratuitous remount at the source). **Skip if time-boxed** — G3 already makes remount survivable.
- [ ] **Step 2 — Verify** `pnpm build`. **Step 3 — Commit.**

### Task G5: Build + commit dist + DGX/browser smoke

- [ ] **Step 1 — Build** `pnpm build` (tsc clean) + `pnpm test` (all green); backend guard `cargo test -p svi2-pro-extension` (replay path unchanged).
- [ ] **Step 2 — Commit** `dist/svi2-pro.{js,css}` (project rule).
- [ ] **Step 3 — DGX/browser smoke:** start a real svi2 render → progress bar + "Cancel render" visible. Switch to another window ~5s, return → **progress still advancing (replayed+live), Cancel still present + functional**. Repeat with a ~2-min background gap (crosses 90s warn) → on return the UI self-heals to live progress (no permanent "connection lost"). Click Cancel after returning → confirms `jobId` survived and the backend run stops.
- [ ] **Step 4 — Commit** fixups.

**Boundary:** all changes under `extensions/builtin/svi2-pro/web/`; backend unchanged (replay already exists); sessionStorage key is an extension-owned literal. PASS.
**Scope:** svi2-pro-specific — ltx23 has the same custom-element shell but no render store/SSE progress; longcat has no separate web render store in-tree. If either later reuses this store, it inherits the fix.
**Risks:** backlog buffer is uncapped (good); the live broadcast channel cap is 512 — a reconnect lagging >512 frames hits `Lagged` (already handled with `continue` in `render.rs:200`), fine for minute-long renders. Confirm which of Cause A/B fires "for a second" in the G5 browser smoke; the fix covers both regardless.

---

## Self-review

- **Spec coverage:** Concurrent TTS = WS-A. No realtime queue progress = WS-A (per-item grid + optional SegmentQueued). Stop frees memory = WS-B (BD1/BD3). GC navbar button = WS-D (BD4-BD7). Proprietary wheels all 3 arches + installers install them = WS-C. SVI2 missing-model + "installers perfect" (fix gap, post-install verify, idempotent resume, emotion-tts audit) = WS-E (E3 verify, E4 fail-loud, E6 resume, E7 emotion-tts). DGX stopgap T2V = already executed this session. ✓ all covered.
- **Type consistency:** `runtime.release_memory` used identically in BD1/BD3/BD4. `verify_files_present` signature identical across E1/E2/E3/E4. `RunProgress`/`runProgressToJobStatus` consistent A2/A3/A5. `workersActive` is the single concurrency knob across A1/A3/A7.
- **Placeholders:** impl sketches reference real symbols/line numbers from code reads; where a symbol must be re-confirmed at implement time, it is called out as an "Implementer note" rather than left vague.
