# EmotionTTS Deferred Follow-ups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship every deferred-from-the-dispatcher-MVP feature: ZIP export, synthesis cache, partial-run resume, SSE late-subscribe replay, lease idle release, test-line dispatch, and Quick voice mode (default voice without character mapping).

**Architecture:** Each phase is independently shippable — merge after the corresponding phase passes its tests + manual smoke. The dispatcher MVP plan (`2026-04-28-emotion-tts-dispatcher.md`) is a hard prerequisite; this plan extends what that plan builds. Nothing here touches host crates outside the `extensions/builtin/emotion-tts/` tree (boundary discipline per `.claude/rules/host-extension-boundary.md`).

**Tech Stack:** Rust 1.84 (`tokio`, `axum`, `sqlx`, `chrono`, `zip`), TypeScript 5.x / React 19 (vanilla-extract + react-router) for the recipe + mappings UI, the existing `BackendClient` / `LeaseProvider` / `BatchSynthesizeOperator` / `ExportBundleOperator` / `RuntimeQueue` / `NotificationFanout` / `RunChannelRegistry` / `RunsRepo` / `UtterancesRepo` / `SynthesisCacheRepo` / `ExportHistoryRepo`.

**Prerequisite (must be merged first):** `docs/superpowers/plans/2026-04-28-emotion-tts-dispatcher.md` — adds the dispatcher loop, `RunChannelRegistry`, `dispatcher::prepare`, `dispatcher::run_loop`, and the SSE-via-channel handler. Every task below assumes those already exist on `main`.

---

## Phase ordering and shipping checkpoints

Each phase produces a working, shippable feature. Merge order is recommended but not strict; phases B/C share a small contract (`SynthesisCacheRepo` lookup helper) and B should land before C.

| Phase | Feature | Approx tasks | Ships when |
|---|---|---|---|
| A | Export ZIP | 4 | `Download ZIP` button on a completed batch downloads a valid `.zip` |
| B | Synthesis cache | 4 | Re-running an identical script with `cache_policy=use_cache` skips the worker (proven by test) |
| C | Resume / partial replay | 3 | The recipe page's "Resume" button on a partial run completes the missing segments only |
| D | SSE late-subscribe replay | 2 | Page refresh during a run shows already-completed segments without waiting for a new event |
| E | Lease idle release timer | 2 | After `EMOTIONTTS_LEASE_IDLE_SECS` of no runs, lease is released; next run re-acquires |
| F | Test-line dispatch | 3 | "Test this line" button on the mapping editor produces an audio file in <10s |
| G | Quick voice mode (default voice) | 6 | Recipe page's new "Quick mode" toggle lets the user paste text + pick a single voice with no mapping required |

---

## Cross-phase shared infrastructure

Two small additions are used by multiple phases:

- `SynthesisCacheRepo::lookup_many(&[ContentHash]) -> RepoResult<Vec<Option<SynthesisCacheRow>>>` — added in Phase B Task 1; Phase C's resume path benefits from it via the existing cache-hit path.
- `dispatcher::prepare::PrepareConfig::default_voice_asset_id: Option<VoiceAssetId>` — added in Phase G Task 3 (the field doesn't exist before Phase G; earlier phases construct `PrepareConfig` without it).

---

## Sanity-check before starting any phase

- [ ] **Step S1: Confirm dispatcher MVP is on `main`**

Run: `git log --oneline | head -20 | grep -i dispatcher`
Expected: at least one commit referencing the dispatcher.

If dispatcher hasn't merged yet, stop and finish that plan first.

- [ ] **Step S2: Confirm working tree is clean**

Run: `git status --short`
Expected: empty output. If not, commit or stash before starting.

- [ ] **Step S3: Confirm tests pass**

Run: `cargo test -p emotion-tts-extension --tests`
Expected: all green.

---

# Phase A — Export ZIP

**Goal:** When a batch run reaches `completed` or `partial`, the dispatcher builds the ZIP, persists it via `HostArtifactStore`, writes an `ExportHistoryRow`, and exposes a download URL through the existing `/api/v1/extensions/nexus.audio.emotiontts/exports/{export_id}/download` endpoint. Frontend's existing `Download ZIP` button starts working.

## Task A1: Add export-write to dispatcher

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/mod.rs::spawn_dispatcher` (accept `Option<Arc<dyn HostArtifactStore>>`)
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs` (call `write_export_zip` on terminal success)
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/export.rs`
- Modify: `extensions/builtin/emotion-tts/rust/src/register.rs` (pass artifact store into `spawn_dispatcher`)
- Modify: `extensions/builtin/emotion-tts/rust/src/lib.rs::register` (same)

- [ ] **Step A1.1: Create `dispatcher/export.rs`**

```rust
//! Build + persist the export ZIP for a terminal-status run.
//!
//! Called from `run_loop::dispatch_inner` after the run reaches
//! `completed` or `partial`. Writes:
//! 1. ZIP bytes via `HostArtifactStore::store` → returns artifact_ref.
//! 2. `ExportHistoryRow` linking run → artifact_ref.
//!
//! Failures are logged but do NOT escalate the run to `failed` — the
//! audio files on disk are the primary product; the ZIP is a
//! convenience.

use std::sync::Arc;

use chrono::Utc;

use crate::dispatcher::prepare::UtterancePlan;
use crate::domain::manifest::{build_manifest, ManifestEntry};
use crate::domain::{EmotionTtsError, ExportId, Result, RunId};
use crate::host_contract::HostArtifactStore;
use crate::operators::export_bundle::{build_zip_bytes, Input as ExportInput, SegmentFile};
use crate::storage::repo_traits::ExportHistoryRow;
use crate::storage::Repos;

pub(crate) async fn write_export_zip(
    repos: &Repos,
    run_id: &RunId,
    plans: &[UtterancePlan],
    extension_version: &str,
    store: Arc<dyn HostArtifactStore>,
) -> Result<ExportId> {
    let run = repos
        .runs
        .get(run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    let utts = repos.utterances.list_by_run(run_id).await?;

    let mut segment_files = Vec::new();
    let mut manifest_entries: Vec<ManifestEntry> = Vec::new();
    let mut completed_count: i64 = 0;
    for plan in plans {
        let row = utts.iter().find(|u| u.utterance_id == plan.utterance_id);
        let (status, audio_ref, duration_ms, cache_hit, source_run_id) = match row {
            Some(r) => (
                r.status.clone(),
                r.audio_artifact_ref.clone(),
                r.duration_ms,
                r.cache_hit,
                r.source_run_id.as_ref().map(|id| id.as_str().to_string()),
            ),
            None => ("missing".into(), None, None, false, None),
        };
        if status == "completed" {
            completed_count += 1;
            if let Some(path) = audio_ref.clone() {
                segment_files.push(SegmentFile {
                    filename: std::path::Path::new(&plan.output_target_abs)
                        .file_name()
                        .map(|s| s.to_string_lossy().into_owned())
                        .unwrap_or_else(|| format!("seg_{:03}.{}", plan.global_index, run.output_format)),
                    source_path_abs: path,
                });
            }
        }
        manifest_entries.push(ManifestEntry {
            global_index: plan.global_index,
            character_display: plan.character_display.clone(),
            character_sanitised: plan.character_sanitised.clone(),
            character_index: plan.character_index,
            text: plan.text.clone(),
            resolved_mapping_id: None,
            resolved_emotion_mode: None,
            resolved_emotion_source: crate::domain::emotion::EmotionSource::None,
            resolved_seed: None,
            content_hash: None,
            status,
            source_run_id,
            cache_hit,
            audio_artifact_ref: audio_ref,
            duration_ms,
            filename: Some(
                std::path::Path::new(&plan.output_target_abs)
                    .file_name()
                    .map(|s| s.to_string_lossy().into_owned())
                    .unwrap_or_default(),
            ),
            failure_category: None,
            reference_variant: None,
            alignment: None,
        });
    }
    if completed_count == 0 {
        return Err(EmotionTtsError::internal(
            "no completed segments — skipping export",
        ));
    }

    let manifest = build_manifest(
        run.run_id.as_str(),
        run.deployment_id.as_str(),
        extension_version,
        &run.output_format,
        run.speed_factor,
        &run.speed_mode,
        None,
        None,
        None,
        0,
        manifest_entries,
    );

    // We don't need the on-disk path — `build_zip_bytes` works in memory.
    let input = ExportInput {
        manifest,
        segment_files,
        preview_mix_abs: None,
        preview_mix_filename: None,
        output_zip_abs: String::new(),
        include_manifest_json: true,
        include_csv_index: true,
        include_preview_mix: false,
    };
    let (bytes, _entries) = build_zip_bytes(&input).await?;
    let display_name = format!("{}.zip", run.run_id.as_str());
    let put = store
        .store(bytes, &display_name, Some("application/zip"))
        .await?;

    let export_id = ExportId::new();
    let export_row = ExportHistoryRow {
        export_id: export_id.clone(),
        deployment_id: run.deployment_id.clone(),
        run_id: Some(run.run_id.clone()),
        zip_artifact_ref: put.artifact_ref,
        manifest_artifact_ref: None,
        preview_artifact_ref: None,
        output_format: run.output_format.clone(),
        utterance_count: completed_count,
        partial: run.status == "partial",
        created_at: Utc::now().timestamp(),
    };
    repos.exports.insert(&export_row).await?;
    Ok(export_id)
}
```

- [ ] **Step A1.2: Re-export `export` module from `dispatcher/mod.rs`**

Add `pub(crate) mod export;` next to `mod prepare;`.

- [ ] **Step A1.3: Add artifact store parameter to `spawn_dispatcher`**

In `dispatcher/mod.rs::spawn_dispatcher`, add a new parameter:

```rust
pub fn spawn_dispatcher(
    queue: SharedQueue,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    artifact_store: Option<Arc<dyn crate::host_contract::HostArtifactStore>>,
    extension_version: impl Into<String>,
) -> JoinHandle<()> {
```

Pass `artifact_store.clone()` into the `process_one` call. Update `process_one` and `dispatch_inner` signatures to take an `Option<Arc<dyn HostArtifactStore>>`.

- [ ] **Step A1.4: Call `write_export_zip` after status determined**

In `dispatch_inner`, after the `let status = if failed == 0 ...` block but before `Ok(status.to_string())`:

```rust
if (status == "completed" || status == "partial") && artifact_store.is_some() {
    let store = artifact_store.clone().unwrap();
    match crate::dispatcher::export::write_export_zip(
        repos,
        run_id,
        &prepared.utterances,
        extension_version,
        store,
    )
    .await
    {
        Ok(export_id) => {
            tracing::info!(
                target: "emotion_tts::dispatch",
                run_id = run_id.as_str(),
                export_id = export_id.as_str(),
                "export ZIP written"
            );
        }
        Err(err) => {
            tracing::warn!(
                target: "emotion_tts::dispatch",
                run_id = run_id.as_str(),
                error = %err,
                "export ZIP build failed — audio files still on disk"
            );
        }
    }
}
```

Add `extension_version: &str` to `dispatch_inner` arguments and forward from `process_one`.

- [ ] **Step A1.5: Update `register.rs` and `lib.rs` callers**

In `register.rs::build_router_inner_async`, change the `spawn_dispatcher` call to pass the artifact store and extension version:

```rust
let artifact_store_for_dispatcher = self.resources.artifact_store.clone();
let _dispatcher = crate::dispatcher::spawn_dispatcher(
    queue.clone(),
    repos.clone(),
    provider.clone(),
    run_channels.clone(),
    artifact_store_for_dispatcher,
    EXTENSION_VERSION,
);
```

Mirror the change in `lib.rs::register`.

- [ ] **Step A1.6: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step A1.7: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/
git commit -m "feat(emotion-tts): dispatcher writes export ZIP via HostArtifactStore"
```

## Task A2: Expose export id on the run detail JSON

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/router/runs.rs::run_detail_json` (add `latestExportId`)

The frontend's `Run` type already has `exportArtifactRef`. Today the host returns it as null because nothing populates it. We have two options:

A. Send `exportArtifactRef` directly from the run row (requires a new column).
B. Look up the latest `ExportHistoryRow` for this run, and return its id.

Option B avoids a migration. Use it.

- [ ] **Step A2.1: Add a helper that returns the latest export id for a run**

In `repo_traits.rs`, extend the `ExportHistoryRepo` trait:

```rust
async fn get_latest_for_run(&self, run: &RunId) -> RepoResult<Option<ExportHistoryRow>>;
```

Implement it in `export_history_repo.rs`:

```rust
async fn get_latest_for_run(&self, run: &RunId) -> RepoResult<Option<ExportHistoryRow>> {
    sqlx::query_as!(
        ExportHistoryRow,
        r#"
        SELECT export_id as "export_id: ExportId",
               deployment_id as "deployment_id: DeploymentId",
               run_id as "run_id: Option<RunId>",
               zip_artifact_ref,
               manifest_artifact_ref,
               preview_artifact_ref,
               output_format,
               utterance_count,
               partial,
               created_at
          FROM export_history
         WHERE run_id = ?
         ORDER BY created_at DESC
         LIMIT 1
        "#,
        run.as_str()
    )
    .fetch_optional(&self.pool)
    .await
    .map_err(|e| EmotionTtsError::internal(format!("export_history get_latest_for_run: {e}")))
}
```

(Inspect the existing `SqliteExportHistoryRepo::insert` to confirm the column names + `query_as!` style. Match what's already there.)

- [ ] **Step A2.2: Update `run_detail_json` to include the export id**

In `router/runs.rs::get_run_impl`, after building the base detail object:

```rust
let export = state.repos.exports.get_latest_for_run(&run_id).await.unwrap_or(None);
let mut body = run_detail_json(&row, &utterances);
if let Some(e) = export {
    if let Some(obj) = body.as_object_mut() {
        obj.insert("exportArtifactRef".into(), Value::String(e.export_id.as_str().to_string()));
    }
}
Ok(body)
```

- [ ] **Step A2.3: Confirm frontend type expects `exportArtifactRef: string | null`**

Open `extensions/builtin/emotion-tts/web/src/services/types.ts`, find the `Run` type. Confirm `exportArtifactRef?: string | null`. If it's typed as something else (e.g. an artifact:// URI), align it to a string id or update the type comment to clarify it's an export-history id, not an artifact ref.

- [ ] **Step A2.4: Confirm frontend uses the right URL**

Open `extensions/builtin/emotion-tts/web/src/views/recipe/components/run_panel.tsx`. The current code uses:

```tsx
<a href={`/api/v1/artifacts/${run.exportArtifactRef}/download`} download>Download ZIP</a>
```

Update it to use the extension's exports endpoint:

```tsx
<a
  href={`/api/v1/extensions/nexus.audio.emotiontts/exports/${run.exportArtifactRef}/download`}
  download
  className={css.secondaryButton}
>
  Download ZIP
</a>
```

- [ ] **Step A2.5: Build + test**

Run: `cargo build -p emotion-tts-extension && cargo test -p emotion-tts-extension --tests`
Expected: success. The `dispatcher_e2e_test` from the prerequisite plan still passes (no artifact store wired in test → no export → no failure).

- [ ] **Step A2.6: Commit**

```bash
git add extensions/builtin/emotion-tts/
git commit -m "feat(emotion-tts): expose latest export id on run detail JSON"
```

## Task A3: Confirm `/exports/{export_id}/download` route works

**Files:**
- Read: `extensions/builtin/emotion-tts/rust/src/router/exports.rs`

- [ ] **Step A3.1: Inspect the existing exports router**

Run: `cat extensions/builtin/emotion-tts/rust/src/router/exports.rs | head -80`

If the route is already implemented (loads `ExportHistoryRow`, resolves `zip_artifact_ref` via `HostArtifactStore::resolve_path`, streams the file), nothing to do.

If it's a 501 stub or missing, implement it as:

```rust
pub async fn download(
    State(state): State<ExportsState>,
    Path(export_id): Path<String>,
) -> Response {
    let id = match ExportId::try_from(export_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    let row = match state.repos.exports.get(&id).await {
        Ok(Some(r)) => r,
        Ok(None) => return EmotionTtsError::not_found(format!("export {id}")).into_response(),
        Err(err) => return err.into_response(),
    };
    let path = match state.store.resolve_path(&row.zip_artifact_ref).await {
        Ok(p) => p,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    let bytes = match tokio::fs::read(&path).await {
        Ok(b) => b,
        Err(e) => return EmotionTtsError::internal(format!("read zip {path}: {e}")).into_response(),
    };
    let filename = format!("{}.zip", id.as_str());
    (
        StatusCode::OK,
        [
            (axum::http::header::CONTENT_TYPE, "application/zip"),
            (
                axum::http::header::CONTENT_DISPOSITION,
                &format!("attachment; filename=\"{filename}\""),
            ),
        ],
        bytes,
    )
        .into_response()
}
```

- [ ] **Step A3.2: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step A3.3: Commit (if changed)**

```bash
git add extensions/builtin/emotion-tts/rust/src/router/exports.rs
git commit -m "feat(emotion-tts): wire /exports/:id/download to HostArtifactStore"
```

## Task A4: Integration test — dispatcher writes export

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs` (add a second test case)

- [ ] **Step A4.1: Add a fake `HostArtifactStore` fixture**

In `extensions/builtin/emotion-tts/rust/tests/fixtures/mod.rs`, add:

```rust
pub mod fake_artifact_store {
    use std::collections::HashMap;
    use std::sync::Arc;
    use tokio::sync::RwLock;

    use async_trait::async_trait;
    use emotion_tts_extension::host_contract::{
        ArtifactPut, HostArtifactStore, HostContractError,
    };

    #[derive(Default, Clone)]
    pub struct FakeArtifactStore {
        inner: Arc<RwLock<HashMap<String, Vec<u8>>>>,
    }

    impl FakeArtifactStore {
        pub fn new() -> Self {
            Self::default()
        }
        pub async fn count(&self) -> usize {
            self.inner.read().await.len()
        }
    }

    #[async_trait]
    impl HostArtifactStore for FakeArtifactStore {
        async fn store(
            &self,
            bytes: Vec<u8>,
            display_name: &str,
            _mime_hint: Option<&str>,
        ) -> Result<ArtifactPut, HostContractError> {
            let key = format!("artifact://fake/{}", display_name);
            let len = bytes.len() as u64;
            self.inner.write().await.insert(key.clone(), bytes);
            Ok(ArtifactPut {
                artifact_ref: key,
                content_sha256: "0".repeat(64),
                size_bytes: len,
            })
        }

        async fn resolve_path(&self, _artifact_ref: &str) -> Result<String, HostContractError> {
            // Tests don't need a real path; the export download isn't exercised here.
            Ok("/tmp/fake".into())
        }
    }
}
```

Re-export from `tests/fixtures/mod.rs` if needed.

- [ ] **Step A4.2: Add a second test that asserts an export row was written**

Append to `dispatcher_e2e_test.rs`:

```rust
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_writes_export_history_on_completed_run() {
    // Same setup as the first test, plus:
    // - write a real WAV file to the segment's output_target path so
    //   `build_zip_bytes` can actually read it.
    // - pass a FakeArtifactStore into spawn_dispatcher.
    // - assert that exactly one ExportHistoryRow exists for the run.
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    // <copy seeding from the first test — deployment, voice, mapping, run>
    // ...
    let store = Arc::new(fixtures::fake_artifact_store::FakeArtifactStore::new())
        as Arc<dyn emotion_tts_extension::host_contract::HostArtifactStore>;
    let lease = Arc::new(MockBackendRuntimeLease::new());
    let lease_for_handler = lease.clone();
    lease.set_handler("synthesize.batch", move |params| {
        let segment_id = params["segments"][0]["segment_id"].as_str().unwrap().to_string();
        let output_target = params["segments"][0]["output_target_abs"].as_str().unwrap().to_string();
        let run_id_inner = params["run_id"].as_str().unwrap().to_string();
        let lease_inner = lease_for_handler.clone();
        std::fs::create_dir_all(std::path::Path::new(&output_target).parent().unwrap()).unwrap();
        std::fs::write(&output_target, b"RIFF\0\0\0\0WAVEfmt ").unwrap();
        tokio::spawn(async move {
            tokio::time::sleep(Duration::from_millis(10)).await;
            lease_inner.push_notification(NotificationEnvelope {
                method: "segment_started".into(),
                params: json!({"segment_id": segment_id, "run_id": run_id_inner}),
            }).await;
            lease_inner.push_notification(NotificationEnvelope {
                method: "segment_completed".into(),
                params: json!({
                    "segment_id": segment_id,
                    "run_id": run_id_inner,
                    "duration_ms": 1234,
                    "output_path_abs": output_target,
                }),
            }).await;
        });
        Ok(json!({"request_id":"x","status":"ok","segments":[]}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(lease))));
    let _h = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        Some(store.clone()),
        "0.0.0-test",
    );
    queue.enqueue(run_id.clone(), "dep_test_dispatcher", RunClass::Batch).await;

    let mut rx = wait_for_channel(&registry, run_id.as_str()).await.unwrap();
    drain_until_terminal(&mut rx).await;

    let export = repos.exports.get_latest_for_run(&run_id).await.unwrap();
    assert!(export.is_some(), "export history row must exist for completed run");
}

async fn wait_for_channel(
    registry: &RunChannelRegistry,
    run_id: &str,
) -> Option<emotion_tts_extension::dispatcher::RunEventReceiver> {
    for _ in 0..50 {
        if let Some(r) = registry.subscribe(run_id).await {
            return Some(r);
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    None
}

async fn drain_until_terminal(rx: &mut emotion_tts_extension::dispatcher::RunEventReceiver) {
    tokio::time::timeout(Duration::from_secs(5), async {
        while let Ok(ev) = rx.recv().await {
            if matches!(ev, RunEvent::RunTerminal { .. }) { return; }
        }
    })
    .await
    .expect("terminal within 5s");
}
```

- [ ] **Step A4.3: Run the test**

Run: `cargo test -p emotion-tts-extension --test dispatcher_e2e_test -- --nocapture`
Expected: both tests pass.

- [ ] **Step A4.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/tests/
git commit -m "test(emotion-tts): integration test for dispatcher export write"
```

---

# Phase B — Synthesis cache

**Goal:** When `cache_policy=use_cache`, segments whose `(text, voice, generation, model_version, extension_version)` content hash matches an existing `synthesis_cache` row are served from the cache without dispatching to the worker. Cache misses are synthesized and inserted into the cache. Repeat runs of the same script become near-instant.

## Task B1: Cache lookup helper

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/storage/repo_traits.rs::SynthesisCacheRepo` (add `lookup_many`)
- Modify: `extensions/builtin/emotion-tts/rust/src/storage/synthesis_cache_repo.rs` (impl)

- [ ] **Step B1.1: Write the failing test**

In `extensions/builtin/emotion-tts/rust/tests/cache_evict_test.rs` (it already has cache infra), append:

```rust
#[tokio::test]
async fn lookup_many_returns_aligned_results() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let h1 = hash(1);
    let h2 = hash(2);
    insert_entry(&repos, &h1, 1024, 100).await;
    let results = repos.cache.lookup_many(&[h1.clone(), h2.clone()]).await.unwrap();
    assert_eq!(results.len(), 2);
    assert!(results[0].is_some(), "h1 in cache");
    assert!(results[1].is_none(), "h2 not in cache");
}
```

- [ ] **Step B1.2: Run test — expect compile fail**

Run: `cargo test -p emotion-tts-extension --test cache_evict_test lookup_many_returns_aligned_results`
Expected: compile error "no method named `lookup_many`".

- [ ] **Step B1.3: Add the trait method**

In `repo_traits.rs::SynthesisCacheRepo`:

```rust
async fn lookup_many(&self, hashes: &[ContentHash]) -> RepoResult<Vec<Option<SynthesisCacheRow>>>;
```

- [ ] **Step B1.4: Implement it**

In `synthesis_cache_repo.rs`:

```rust
async fn lookup_many(&self, hashes: &[ContentHash]) -> RepoResult<Vec<Option<SynthesisCacheRow>>> {
    let mut out = Vec::with_capacity(hashes.len());
    for h in hashes {
        out.push(self.get(h).await?);
    }
    Ok(out)
}
```

(Single round-trip per hash for simplicity — N is at most ~hundreds of segments and SQLite reads are cheap. A future optimisation can use `WHERE content_hash IN (?, ?, …)` if needed.)

- [ ] **Step B1.5: Run test — expect pass**

Run: `cargo test -p emotion-tts-extension --test cache_evict_test lookup_many_returns_aligned_results`
Expected: PASS.

- [ ] **Step B1.6: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/storage/ extensions/builtin/emotion-tts/rust/tests/cache_evict_test.rs
git commit -m "feat(emotion-tts): SynthesisCacheRepo::lookup_many helper"
```

## Task B2: Compute content hash per segment in `prepare`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs`

- [ ] **Step B2.1: Add `content_hash: Option<String>` to `UtterancePlan`**

```rust
pub(crate) struct UtterancePlan {
    pub utterance_id: crate::domain::UtteranceId,
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub text: String,
    pub output_target_abs: String,
    pub content_hash: Option<crate::domain::ContentHash>,
    pub speaker_voice_asset_id: crate::domain::VoiceAssetId,
}
```

- [ ] **Step B2.2: Compute the hash inside the segment-build loop**

After resolving `mapping`, before pushing into `plans`:

```rust
let cache_input = crate::domain::cache_key::CacheKeyInput {
    text: r.utterance.text.clone(),
    speaker_voice_asset_id: mapping.speaker_voice_asset_id.as_str().to_string(),
    emotion_mode: "none".to_string(),
    emotion_payload_canonical: "{}".to_string(),
    seed: run.base_seed,
    generation_canonical: "{}".to_string(),
    speed_factor: run.speed_factor,
    speed_mode: run.speed_mode.clone(),
    extension_version: extension_version.to_string(),
    runtime_version: "0.0.0".into(),  // TODO: thread real runtime_version once available
    model_version: "indextts-2".into(),
};
let content_hash = crate::domain::cache_key::build(&cache_input).ok();
```

Add `extension_version: &str` parameter to `prepare()` and forward from the call site in `run_loop`.

- [ ] **Step B2.3: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success. If `CacheKeyInput` field names don't match what's in `domain/cache_key.rs`, adjust. The `cache_key.rs` file is the authority — do not change it.

- [ ] **Step B2.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "feat(emotion-tts): compute content hash per segment in prepare step"
```

## Task B3: Split cache hits from misses in dispatcher

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs`

- [ ] **Step B3.1: After `prepare()` returns, look up cache hits (when policy permits)**

Inside `dispatch_inner`, replace the section that builds `utterance_rows` and dispatches the batch with:

```rust
let policy_uses_cache = matches!(prepared.run.cache_policy.as_str(), "use_cache");

let hashes: Vec<crate::domain::ContentHash> = prepared
    .utterances
    .iter()
    .filter_map(|p| p.content_hash.clone())
    .collect();
let lookups = if policy_uses_cache && !hashes.is_empty() {
    repos.cache.lookup_many(&hashes).await.unwrap_or_default()
} else {
    Vec::new()
};

// Build a map from hash → cache row.
let mut hit_by_hash: std::collections::HashMap<String, crate::storage::repo_traits::SynthesisCacheRow> =
    std::collections::HashMap::new();
for (h, maybe_row) in hashes.iter().zip(lookups.into_iter()) {
    if let Some(row) = maybe_row {
        hit_by_hash.insert(h.as_str().to_string(), row);
    }
}

// Insert utterance rows. Cache hits land directly in `completed`
// state with the cached audio_artifact_ref. Misses go in as `queued`.
let utterance_rows: Vec<UtteranceRow> = prepared
    .utterances
    .iter()
    .map(|p| {
        let hit = p
            .content_hash
            .as_ref()
            .and_then(|h| hit_by_hash.get(h.as_str()));
        if let Some(row) = hit {
            UtteranceRow {
                utterance_id: p.utterance_id.clone(),
                run_id: run_id.clone(),
                global_index: p.global_index,
                character_display: p.character_display.clone(),
                character_sanitised: p.character_sanitised.clone(),
                character_index: p.character_index,
                text: p.text.clone(),
                source_line_number: p.global_index,
                inline_overrides_json: "{}".to_string(),
                legacy_emotion_ref: None,
                resolved_mapping_id: None,
                resolved_speaker_voice_asset_id: None,
                resolved_emotion_mode: Some("none".to_string()),
                resolved_emotion_payload_json: None,
                resolved_seed: None,
                resolved_generation_json: None,
                content_hash: p.content_hash.as_ref().map(|h| h.as_str().to_string()),
                status: "completed".to_string(),
                source_run_id: None,
                audio_artifact_ref: Some(row.audio_artifact_ref.clone()),
                cache_hit: true,
                duration_ms: None,
                started_at: Some(Utc::now().timestamp()),
                finished_at: Some(Utc::now().timestamp()),
                failure_category: None,
                failure_detail: None,
            }
        } else {
            UtteranceRow {
                utterance_id: p.utterance_id.clone(),
                run_id: run_id.clone(),
                global_index: p.global_index,
                character_display: p.character_display.clone(),
                character_sanitised: p.character_sanitised.clone(),
                character_index: p.character_index,
                text: p.text.clone(),
                source_line_number: p.global_index,
                inline_overrides_json: "{}".to_string(),
                legacy_emotion_ref: None,
                resolved_mapping_id: None,
                resolved_speaker_voice_asset_id: None,
                resolved_emotion_mode: Some("none".to_string()),
                resolved_emotion_payload_json: None,
                resolved_seed: None,
                resolved_generation_json: None,
                content_hash: p.content_hash.as_ref().map(|h| h.as_str().to_string()),
                status: "queued".to_string(),
                source_run_id: None,
                audio_artifact_ref: None,
                cache_hit: false,
                duration_ms: None,
                started_at: None,
                finished_at: None,
                failure_category: None,
                failure_detail: None,
            }
        }
    })
    .collect();
repos.utterances.insert_many(&utterance_rows).await?;
```

- [ ] **Step B3.2: Filter the batch payload to misses-only**

Right before constructing the `BatchInput` (or rather, mutating the existing one):

```rust
let miss_segment_ids: std::collections::HashSet<String> = prepared
    .utterances
    .iter()
    .filter(|p| {
        p.content_hash
            .as_ref()
            .map(|h| !hit_by_hash.contains_key(h.as_str()))
            .unwrap_or(true)
    })
    .map(|p| p.utterance_id.as_str().to_string())
    .collect();

let mut batch_input = prepared.batch_input.clone();
batch_input.segments.retain(|s| miss_segment_ids.contains(&s.segment_id));
let segment_total = batch_input.segments.len();
```

Then replace `prepared.batch_input.clone()` in the `BatchSynthesizeOperator::new(...).execute(...)` call with `batch_input.clone()`.

- [ ] **Step B3.3: Emit `segment_completed` events for cache hits up-front**

Right after inserting the utterance rows, fire the SSE events for cache hits so the frontend's progress table fills instantly:

```rust
for plan in &prepared.utterances {
    let is_hit = plan
        .content_hash
        .as_ref()
        .map(|h| hit_by_hash.contains_key(h.as_str()))
        .unwrap_or(false);
    if is_hit {
        let _ = tx.send(crate::dispatcher::RunEvent::SegmentCompleted {
            run_id: run_id.as_str().to_string(),
            utterance_id: plan.utterance_id.as_str().to_string(),
            global_index: plan.global_index,
            duration_ms: 0,
        });
    }
}
```

- [ ] **Step B3.4: After successful synth, INSERT new cache rows for misses**

After `let _output = rpc_result?;` and before the `recompute terminal status` block, walk completed utterances and insert cache rows for each miss whose `audio_artifact_ref` is now populated:

```rust
let now = Utc::now().timestamp();
let utts_after = repos.utterances.list_by_run(run_id).await?;
for u in &utts_after {
    if u.cache_hit { continue; }
    if u.status != "completed" { continue; }
    let Some(hash_str) = u.content_hash.clone() else { continue };
    let Some(audio_ref) = u.audio_artifact_ref.clone() else { continue };
    let hash = match crate::domain::ContentHash::from_hex(hash_str) {
        Ok(h) => h,
        Err(_) => continue,
    };
    let row = crate::storage::repo_traits::SynthesisCacheRow {
        content_hash: hash,
        audio_artifact_ref: audio_ref,
        extension_version: extension_version.to_string(),
        runtime_version: "0.0.0".into(),
        model_version: "indextts-2".into(),
        size_bytes: 0,
        hit_count: 0,
        created_at: now,
        last_hit_at: now,
    };
    if let Err(e) = repos.cache.insert(&row).await {
        tracing::debug!(target: "emotion_tts::dispatch", error = %e, "cache insert failed (likely duplicate)");
    }
}
```

- [ ] **Step B3.5: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step B3.6: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "feat(emotion-tts): dispatcher serves cache hits + writes cache misses"
```

## Task B4: Test — cache hit skips RPC

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs`

- [ ] **Step B4.1: Add a third test that pre-seeds a cache row, runs the dispatcher, and asserts the worker was never called**

```rust
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_serves_cache_hits_without_calling_worker() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    // <copy seeding from first test>

    // Pre-seed the synthesis_cache row. We need to know the content_hash
    // the dispatcher will compute — call the same `cache_key::build`
    // here with the same inputs. (In real test code, prefer to compute
    // it inline rather than hardcoding.)
    let cache_input = emotion_tts_extension::domain::cache_key::CacheKeyInput {
        text: "Hello world.".to_string(),
        speaker_voice_asset_id: voice.as_str().to_string(),
        emotion_mode: "none".to_string(),
        emotion_payload_canonical: "{}".to_string(),
        seed: 42,
        generation_canonical: "{}".to_string(),
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".to_string(),
        extension_version: "0.0.0-test".to_string(),
        runtime_version: "0.0.0".into(),
        model_version: "indextts-2".into(),
    };
    let hash = emotion_tts_extension::domain::cache_key::build(&cache_input).unwrap();
    repos.cache.insert(&emotion_tts_extension::storage::repo_traits::SynthesisCacheRow {
        content_hash: hash.clone(),
        audio_artifact_ref: "/tmp/cached_seg.wav".into(),
        extension_version: "0.0.0-test".into(),
        runtime_version: "0.0.0".into(),
        model_version: "indextts-2".into(),
        size_bytes: 100,
        hit_count: 0,
        created_at: 0,
        last_hit_at: 0,
    }).await.unwrap();

    // Worker handler: counts how many times it's called.
    let call_count = Arc::new(std::sync::atomic::AtomicUsize::new(0));
    let counter = call_count.clone();
    let lease = Arc::new(MockBackendRuntimeLease::new());
    lease.set_handler("synthesize.batch", move |_params| {
        counter.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        Ok(json!({"request_id":"x","status":"ok","segments":[]}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(lease))));
    let _h = spawn_dispatcher(queue.clone(), repos.clone(), provider, registry.clone(), None, "0.0.0-test");
    queue.enqueue(run_id.clone(), "dep_test_dispatcher", RunClass::Batch).await;

    let mut rx = wait_for_channel(&registry, run_id.as_str()).await.unwrap();
    drain_until_terminal(&mut rx).await;

    assert_eq!(call_count.load(std::sync::atomic::Ordering::SeqCst), 0,
        "synthesize.batch must not be called when every segment is a cache hit");
    let final_row = repos.runs.get(&run_id).await.unwrap().unwrap();
    assert_eq!(final_row.status, "completed");
}
```

- [ ] **Step B4.2: Run the test**

Run: `cargo test -p emotion-tts-extension --test dispatcher_e2e_test dispatcher_serves_cache -- --nocapture`
Expected: PASS.

- [ ] **Step B4.3: If RPC is still called when batch_input.segments is empty**

The `BatchSynthesizeOperator::execute` will still call the worker with an empty segment list. Add a short-circuit in `dispatch_inner`: if `batch_input.segments.is_empty()`, skip the dispatch entirely:

```rust
let rpc_result: crate::domain::Result<BatchOutput> = if batch_input.segments.is_empty() {
    Ok(BatchOutput {
        request_id: batch_input.request_id.clone(),
        status: "ok".into(),
        segments: vec![],
    })
} else {
    tokio::select! {
        biased;
        _ = qrun.cancel.cancelled() => {
            let _ = client.call::<_, serde_json::Value>(
                "cancel",
                &serde_json::json!({"run_id": run_id.as_str()}),
            ).await;
            Err(EmotionTtsError::Conflict("run cancelled".into()))
        }
        result = BatchSynthesizeOperator::new(Arc::new(client.clone()))
            .execute(batch_input.clone()) => result,
    }
};
```

Re-run the test, expect PASS.

- [ ] **Step B4.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/
git commit -m "test(emotion-tts): cache-hit-only run skips synthesize.batch RPC"
```

---

# Phase C — Resume / partial-run replay

**Goal:** A run that ended in `partial` (some segments completed, some failed/cancelled) can be resumed by clicking a "Resume" button on the recipe page. The resume run reuses completed audio from the original run via the cache layer (already populated in Phase B), and only synthesizes the missing segments.

## Task C1: Frontend — surface "Resume" button on partial runs

**Files:**
- Modify: `extensions/builtin/emotion-tts/web/src/views/recipe/components/run_panel.tsx`
- Modify: `extensions/builtin/emotion-tts/web/src/views/recipe/components/history_panel.tsx`

The `resumeRun` client already exists (`runs_client.ts::resumeRun`). The dispatcher's resume endpoint is also already wired to the queue (`router/runs.rs::resume_run` enqueues with `RunClass::Resume`). What's missing is UX surfacing.

- [ ] **Step C1.1: Add a "Resume" button to the partial banner in `run_panel.tsx`**

Locate the existing partial banner:

```tsx
{isPartial && (
  <div className={css.warningBanner}>
    Partial run — click Generate again to resume (cache-hit completed segments).
  </div>
)}
```

Replace with:

```tsx
{isPartial && run && (
  <div className={css.warningBanner} style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ flex: 1 }}>Partial run — some segments failed or were cancelled.</span>
    <button
      type="button"
      className={css.secondaryButton}
      onClick={async () => {
        try {
          const resumed = await resumeRun(props.deploymentId, run.runId);
          setRunId(resumed.runId);
          setSegments(new Map());
          setRun(null);
          setPhase("running");
          unsubscribeRef.current?.();
          unsubscribeRef.current = subscribeRunProgress(
            props.deploymentId,
            resumed.runId,
            (event) => handleEvent(event, setSegments, setPhase, setRun, props.deploymentId, resumed.runId),
            () => setPhase("error"),
          );
        } catch (err) {
          setError(extractMessage(err));
          setPhase("error");
        }
      }}
    >
      Resume run
    </button>
  </div>
)}
```

Add `import { resumeRun } from "../../../services/runs_client";` at the top.

- [ ] **Step C1.2: Add a "Resume" link in the history panel for partial rows**

In `history_panel.tsx`, locate where each run summary is rendered. Where the run has `status === "partial"`, render a link:

```tsx
{r.status === "partial" && (
  <button
    type="button"
    className={css.linkButton}
    onClick={async () => {
      const resumed = await resumeRun(deploymentId, r.runId);
      // Navigate the user to the new run somehow — easiest is to
      // reload the page; the new run will be the most recent.
      window.location.reload();
    }}
  >
    Resume
  </button>
)}
```

Add an import for `resumeRun` and a `linkButton` style if it doesn't exist (a styled `button` with no background, underlined text colour).

- [ ] **Step C1.3: Build the bundle**

Run: `cd extensions/builtin/emotion-tts/web && pnpm build`
Expected: success, `dist/emotion-tts.js` regenerated.

- [ ] **Step C1.4: Commit**

```bash
git add extensions/builtin/emotion-tts/web/
git commit -m "feat(emotion-tts/web): surface Resume button on partial runs"
```

## Task C2: Dispatcher honors `kind=resume` + `original_run_id`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs`

When the dispatcher pops a run with `kind == "resume"`, the prepared utterance plans must inherit cache hits from the original run's completed utterances. Phase B's cache layer does most of this automatically (the content hash is identical because text + voice + settings haven't changed), but resume should also explicitly mark `source_run_id` for traceability.

- [ ] **Step C2.1: Extend `Prepared` with the original run id**

```rust
pub(crate) struct Prepared {
    pub run: RunRow,
    pub deployment_id: DeploymentId,
    pub batch_input: BatchInput,
    pub utterances: Vec<UtterancePlan>,
    pub source_run_id: Option<RunId>,  // NEW
}
```

- [ ] **Step C2.2: Set it from the run row**

At the end of `prepare()`:

```rust
Ok(Prepared {
    run: run.clone(),
    deployment_id: dep,
    batch_input,
    utterances: plans,
    source_run_id: run.original_run_id.clone(),
})
```

- [ ] **Step C2.3: In `run_loop::dispatch_inner`, propagate `source_run_id` into utterance rows**

When building `UtteranceRow` (in both the cache-hit and cache-miss branches), set:

```rust
source_run_id: prepared.source_run_id.clone(),
```

instead of `None`.

- [ ] **Step C2.4: Build + run all dispatcher tests**

Run: `cargo build -p emotion-tts-extension && cargo test -p emotion-tts-extension --test dispatcher_e2e_test`
Expected: all green.

- [ ] **Step C2.5: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/
git commit -m "feat(emotion-tts): dispatcher tags resumed utterances with source_run_id"
```

## Task C3: Test — resume reuses original run's cache rows

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs`

- [ ] **Step C3.1: Add a fourth test**

```rust
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn resume_run_reuses_cache_from_original() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    // <seeding>: deployment, voice, mapping, original run with status=partial
    //
    // Pre-populate one cache row for "Hello world." (matches Phase B's
    // hash inputs).
    //
    // Insert a resume run with original_run_id = original.run_id and
    // kind = "batch" but with run.original_run_id set.

    let lease = Arc::new(MockBackendRuntimeLease::new());
    let call_count = Arc::new(std::sync::atomic::AtomicUsize::new(0));
    let counter = call_count.clone();
    lease.set_handler("synthesize.batch", move |_| {
        counter.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        Ok(json!({"request_id":"x","status":"ok","segments":[]}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(lease))));
    let _h = spawn_dispatcher(queue.clone(), repos.clone(), provider, registry.clone(), None, "0.0.0-test");
    queue.enqueue(resume_run_id.clone(), "dep_test_dispatcher", RunClass::Resume).await;

    let mut rx = wait_for_channel(&registry, resume_run_id.as_str()).await.unwrap();
    drain_until_terminal(&mut rx).await;

    assert_eq!(call_count.load(std::sync::atomic::Ordering::SeqCst), 0);
    let utts = repos.utterances.list_by_run(&resume_run_id).await.unwrap();
    assert!(utts.iter().all(|u| u.cache_hit), "all utterances must be cache hits on resume");
    assert!(utts.iter().all(|u| u.source_run_id.is_some()), "source_run_id must be set");
}
```

- [ ] **Step C3.2: Run + commit**

```bash
cargo test -p emotion-tts-extension --test dispatcher_e2e_test resume_run_reuses_cache
git add extensions/builtin/emotion-tts/rust/tests/
git commit -m "test(emotion-tts): resume run reuses cache rows from original"
```

---

# Phase D — SSE late-subscribe replay

**Goal:** When a user refreshes the recipe page mid-run (or opens a second tab), the SSE handler immediately replays already-completed segment rows so the progress table populates without waiting for the next worker event.

## Task D1: Replay completed utterances on subscribe

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/router/runs.rs::run_progress_stream`

- [ ] **Step D1.1: Insert a replay block before the live `rx.recv()` loop**

In the `async_stream::stream! { ... }` body, after `let mut rx = match maybe_rx { ... }` but before the `loop { match rx.recv().await { ... } }`:

```rust
// Late-subscribe replay: emit segment_started + segment_completed/
// segment_failed events for every utterance row that already has a
// non-`queued` status. This lets a refreshed page rebuild the
// progress table without waiting for the next live event.
if let Ok(rows) = state.repos.utterances.list_by_run(&run_id).await {
    for row in rows {
        match row.status.as_str() {
            "running" => {
                let p = serde_json::json!({
                    "type": "segment_started",
                    "run_id": run_id.as_str(),
                    "utterance_id": row.utterance_id.as_str(),
                    "global_index": row.global_index,
                });
                yield Ok(Event::default().event("segment_started").data(p.to_string()));
            }
            "completed" => {
                let p = serde_json::json!({
                    "type": "segment_completed",
                    "run_id": run_id.as_str(),
                    "utterance_id": row.utterance_id.as_str(),
                    "global_index": row.global_index,
                    "duration_ms": row.duration_ms.unwrap_or(0),
                });
                yield Ok(Event::default().event("segment_completed").data(p.to_string()));
            }
            "failed" => {
                let p = serde_json::json!({
                    "type": "segment_failed",
                    "run_id": run_id.as_str(),
                    "utterance_id": row.utterance_id.as_str(),
                    "global_index": row.global_index,
                    "failure_category": row.failure_category.unwrap_or_else(|| "unknown".into()),
                    "failure_detail": row.failure_detail,
                });
                yield Ok(Event::default().event("segment_failed").data(p.to_string()));
            }
            _ => {}
        }
    }
}
```

- [ ] **Step D1.2: Build + manual smoke**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step D1.3: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/router/runs.rs
git commit -m "feat(emotion-tts): SSE replay completed segments on late subscribe"
```

## Task D2: Test the replay path

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/http_contract_runs_test.rs`

- [ ] **Step D2.1: Add an HTTP-level test that pre-populates utterance rows then opens SSE**

```rust
#[tokio::test]
async fn sse_replays_completed_utterances_on_subscribe() {
    // <build a router with seeded run_id + utterance rows in
    // status=completed>
    // <open the SSE stream>
    // <assert the first frame is event=segment_completed>
}
```

(Use `axum::body::to_bytes` + a 1s `tokio::time::timeout` to read the first frame; do NOT keep the stream open longer than necessary.)

- [ ] **Step D2.2: Run + commit**

```bash
cargo test -p emotion-tts-extension --test http_contract_runs_test sse_replays_completed
git add extensions/builtin/emotion-tts/rust/tests/
git commit -m "test(emotion-tts): SSE replays completed segments on subscribe"
```

---

# Phase E — Lease idle release timer

**Goal:** After `EMOTIONTTS_LEASE_IDLE_SECS` seconds (default 600 = 10 min) of no run activity, the lease is released so the worker process exits and frees ~5GB VRAM. The next run re-acquires.

## Task E1: Track last-activity timestamp on `LeaseProvider`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/backend_client/mod.rs`

- [ ] **Step E1.1: Add `last_activity: Mutex<Option<Instant>>` to `LeaseSlot`**

```rust
struct LeaseSlot {
    client: Option<BackendClient>,
    last_activity: Option<std::time::Instant>,
}
```

Update `Default::default()` accordingly.

- [ ] **Step E1.2: Bump `last_activity` inside `spawn_if_needed`**

At the end of `spawn_if_needed`, before returning the client:

```rust
slot.last_activity = Some(std::time::Instant::now());
```

- [ ] **Step E1.3: Add `pub async fn idle_for(&self) -> Option<Duration>`**

```rust
pub async fn idle_for(&self) -> Option<std::time::Duration> {
    let slot = self.state.lock().await;
    if slot.client.is_none() {
        return None;
    }
    slot.last_activity.map(|t| t.elapsed())
}
```

- [ ] **Step E1.4: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/backend_client/
git commit -m "feat(emotion-tts): LeaseProvider tracks last-activity timestamp"
```

## Task E2: Spawn the idle-release watcher

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/mod.rs` (add `spawn_idle_watcher`)
- Modify: `extensions/builtin/emotion-tts/rust/src/register.rs` (call it)

- [ ] **Step E2.1: Implement `spawn_idle_watcher`**

```rust
pub fn spawn_idle_watcher(lease_provider: Arc<LeaseProvider>) -> JoinHandle<()> {
    let idle_secs: u64 = std::env::var("EMOTIONTTS_LEASE_IDLE_SECS")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(600);
    let idle = std::time::Duration::from_secs(idle_secs);
    tokio::spawn(async move {
        let mut tick = tokio::time::interval(std::time::Duration::from_secs(30));
        loop {
            tick.tick().await;
            if let Some(elapsed) = lease_provider.idle_for().await {
                if elapsed >= idle {
                    if let Err(err) = lease_provider.stop().await {
                        tracing::warn!(
                            target: "emotion_tts::dispatch",
                            error = %err,
                            "lease idle release failed"
                        );
                    } else {
                        tracing::info!(
                            target: "emotion_tts::dispatch",
                            idle_secs = elapsed.as_secs(),
                            "released idle lease"
                        );
                    }
                }
            }
        }
    })
}
```

- [ ] **Step E2.2: Spawn it from `register.rs::build_router_inner_async`**

After the `_dispatcher = spawn_dispatcher(...)` line:

```rust
let _idle_watcher = crate::dispatcher::spawn_idle_watcher(provider.clone());
```

Mirror in `lib.rs::register`.

- [ ] **Step E2.3: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/
git commit -m "feat(emotion-tts): release lease after EMOTIONTTS_LEASE_IDLE_SECS of idle (default 600s)"
```

---

# Phase F — Test-line endpoint dispatch

**Goal:** The `/runs/test-line` endpoint enqueues a single-segment fast-lane run that bypasses the cache write path and ZIP export. The mapping editor's "Test this line" button starts producing audio.

## Task F1: Dispatcher recognises `kind=test_line`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs`

- [ ] **Step F1.1: Skip cache write + export for test_line runs**

In `dispatch_inner`, around the cache insert and export blocks, gate them on `prepared.run.kind != "test_line"`:

```rust
let is_test_line = prepared.run.kind == "test_line";

// ... existing cache lookup is fine for test_line — read but don't write.

// In the cache insert block:
if !is_test_line {
    // existing INSERT loop
}

// In the export block:
if !is_test_line && (status == "completed" || status == "partial") && artifact_store.is_some() {
    // existing write_export_zip
}
```

- [ ] **Step F1.2: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "feat(emotion-tts): test_line runs skip cache write + export"
```

## Task F2: Frontend "Test this line" calls the API

**Files:**
- Modify: `extensions/builtin/emotion-tts/web/src/views/mapping_editor/mapping_editor.view.tsx` (or wherever the "Test this line" bar lives)

The `testLine` client already exists. What may be missing is wiring + progress UX.

- [ ] **Step F2.1: Find the existing button**

Run: `grep -rn "test.line\|testLine\|Test this line" extensions/builtin/emotion-tts/web/src/`

- [ ] **Step F2.2: Wire it to call `testLine` and play the resulting audio**

In the same file as the existing "Test this line" bar, replace the button's onClick with this exact pattern:

```tsx
const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
const [audioUrl, setAudioUrl] = useState<string | null>(null);
const [errorMsg, setErrorMsg] = useState<string | null>(null);

async function runTestLine(line: string) {
  setStatus("running");
  setAudioUrl(null);
  setErrorMsg(null);
  try {
    const created = await testLine(props.deploymentId, {
      line,
      outputFormat: "wav",
    });
    // Poll until terminal — test_line is single-segment, typically <10s.
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const run = await getRun(props.deploymentId, created.runId);
      if (run.status === "completed") {
        const utt = run.utterances?.[0];
        if (utt?.audioArtifactRef) {
          // Host serves artifacts under /api/v1/artifacts/{ref}/download.
          // If artifactRef starts with "artifact://", strip the prefix.
          const ref = utt.audioArtifactRef.replace(/^artifact:\/\//, "");
          setAudioUrl(`/api/v1/artifacts/${encodeURIComponent(ref)}/download`);
          setStatus("done");
          return;
        }
      }
      if (run.status === "failed" || run.status === "cancelled") {
        setStatus("error");
        setErrorMsg(`Run ${run.status}`);
        return;
      }
    }
    setStatus("error");
    setErrorMsg("test-line timed out after 30s");
  } catch (err) {
    setStatus("error");
    setErrorMsg(err instanceof Error ? err.message : "unknown error");
  }
}

// In the bar's JSX:
<button onClick={() => runTestLine(currentLineText)} disabled={status === "running"}>
  {status === "running" ? "Synthesizing…" : "Test this line"}
</button>
{audioUrl && <audio controls src={audioUrl} style={{ marginLeft: 12 }} />}
{errorMsg && <span style={{ color: "var(--color-error, crimson)", marginLeft: 12 }}>{errorMsg}</span>}
```

Add imports at top of file: `import { testLine, getRun } from "../../services/runs_client";` (adjust the relative path if the file lives elsewhere).

- [ ] **Step F2.3: Build + commit**

```bash
cd extensions/builtin/emotion-tts/web && pnpm build
git add extensions/builtin/emotion-tts/web/
git commit -m "feat(emotion-tts/web): wire Test-this-line to /runs/test-line + inline audio playback"
```

## Task F3: Test — test_line dispatch produces a run terminal

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs`

- [ ] **Step F3.1: Add a test that enqueues a test_line and asserts no cache row was written + no export row exists**

```rust
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn test_line_skips_cache_and_export() {
    // <seeding>
    let run_id = RunId::new();
    repos.runs.insert(&RunRow {
        // ... kind: "test_line", ...
    }).await.unwrap();
    // <handler emits one segment_completed>
    queue.enqueue_test_line(run_id.clone(), "dep_test_dispatcher").await.unwrap();
    drain_until_terminal(&mut rx).await;

    assert_eq!(repos.cache.total_size_bytes().await.unwrap(), 0);
    assert!(repos.exports.get_latest_for_run(&run_id).await.unwrap().is_none());
}
```

- [ ] **Step F3.2: Run + commit**

```bash
cargo test -p emotion-tts-extension --test dispatcher_e2e_test test_line_skips
git add extensions/builtin/emotion-tts/rust/tests/
git commit -m "test(emotion-tts): test_line dispatch skips cache + export"
```

---

# Phase G — Quick voice mode (default voice)

**Goal:** A new "Quick mode" toggle on the recipe page lets the user paste plain text and pick a single voice — no character mappings required. Under the hood: a per-deployment `default_voice_asset_id` column + a parser that treats every line as `Narrator` (or whatever the user picks) + a UI toggle that hides the script/mapping complexity.

## Task G1: Migration — `default_voice_asset_id` on deployment

**Files:**
- Create: `extensions/builtin/emotion-tts/storage/migrations/013_deployment_default_voice.sql`
- Modify: `extensions/builtin/emotion-tts/rust/src/lib.rs` (register migration)
- Modify: `extensions/builtin/emotion-tts/rust/src/storage/repo_traits.rs::DeploymentRow` (add field)
- Modify: `extensions/builtin/emotion-tts/rust/src/storage/deployments_repo.rs` (read/write the new column)

- [ ] **Step G1.1: Write the migration**

```sql
-- 013_deployment_default_voice.sql
ALTER TABLE ext_emotion_tts__deployments
  ADD COLUMN default_voice_asset_id TEXT NULL
  REFERENCES ext_emotion_tts__voice_assets(voice_asset_id) ON DELETE SET NULL;
```

(Confirm the actual table name from migration 001 — adjust if it's different.)

- [ ] **Step G1.2: Register it in `lib.rs::MIGRATIONS`**

Add a new `Migration { version: 13, name: "deployment_default_voice", sql: include_str!("../../storage/migrations/013_deployment_default_voice.sql") }` to the array.

- [ ] **Step G1.3: Add the field to `DeploymentRow`**

```rust
#[serde(default)]
pub default_voice_asset_id: Option<VoiceAssetId>,
```

- [ ] **Step G1.4: Update `SqliteDeploymentsRepo` queries to include the column**

Update `SELECT` and `INSERT/UPDATE` queries in `deployments_repo.rs` to include `default_voice_asset_id`. The `query_as!` macro will fail at compile time if the column is missing — that's the safety net.

- [ ] **Step G1.5: Build + run existing deployment tests**

Run: `cargo test -p emotion-tts-extension --test deployment_defaults_test`
Expected: PASS.

- [ ] **Step G1.6: Commit**

```bash
git add extensions/builtin/emotion-tts/
git commit -m "feat(emotion-tts): add default_voice_asset_id column to deployments"
```

## Task G2: HTTP route — `PATCH /deployments/:id/default-voice`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/router/deployments.rs`
- Modify: `extensions/builtin/emotion-tts/rust/src/register.rs::http_routes` (add path)

- [ ] **Step G2.1: Add the handler**

```rust
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DefaultVoiceBody {
    pub voice_asset_id: Option<String>,
}

pub async fn set_default_voice(
    State(state): State<Repos>,
    Path(deployment_id): Path<String>,
    Json(body): Json<DefaultVoiceBody>,
) -> Response {
    let dep = match DeploymentId::try_from(deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    let parsed = match body.voice_asset_id {
        Some(s) => match VoiceAssetId::try_from(s.as_str()) {
            Ok(v) => Some(v),
            Err(err) => return EmotionTtsError::from(err).into_response(),
        },
        None => None,
    };
    match state.deployments.set_default_voice(&dep, parsed.as_ref()).await {
        Ok(_) => (StatusCode::NO_CONTENT, Json(json!({}))).into_response(),
        Err(err) => err.into_response(),
    }
}
```

- [ ] **Step G2.2: Add the route**

```rust
.route("/{deployment_id}/default-voice", post(set_default_voice))
```

- [ ] **Step G2.3: Add `set_default_voice` to `DeploymentsRepo` trait + implementation**

```rust
// in trait:
async fn set_default_voice(&self, dep: &DeploymentId, voice: Option<&VoiceAssetId>) -> RepoResult<()>;

// in impl:
async fn set_default_voice(&self, dep: &DeploymentId, voice: Option<&VoiceAssetId>) -> RepoResult<()> {
    let voice_str = voice.map(|v| v.as_str().to_string());
    sqlx::query("UPDATE ext_emotion_tts__deployments SET default_voice_asset_id = ?, updated_at = ? WHERE deployment_id = ?")
        .bind(voice_str)
        .bind(Utc::now().timestamp())
        .bind(dep.as_str())
        .execute(&self.pool)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("set_default_voice: {e}")))?;
    Ok(())
}
```

- [ ] **Step G2.4: Add to `register.rs::http_routes`**

```rust
"/deployments/{deployment_id}/default-voice".into(),
```

- [ ] **Step G2.5: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/
git commit -m "feat(emotion-tts): POST /deployments/:id/default-voice route + repo"
```

## Task G3: Parser support — `raw_text` mode falls back to default voice

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs`

The `parser_mode=raw_text` already exists in the parser (returns one utterance per line, character defaults to "Narrator"). What's missing is a fallback: if the deployment has a `default_voice_asset_id` set and a character has no mapping, use the default voice.

- [ ] **Step G3.1: Pass the deployment's default voice into `prepare`**

```rust
pub(crate) struct PrepareConfig {
    pub output_root: PathBuf,
    pub voice_path_resolver: std::sync::Arc<dyn Fn(&str) -> Option<String> + Send + Sync>,
    pub default_voice_asset_id: Option<crate::domain::VoiceAssetId>,  // NEW
}
```

- [ ] **Step G3.2: When a character has no mapping, fall back**

Inside the per-utterance loop, replace the "find mapping or fail" lookup with:

```rust
let mapping_opt = mappings
    .iter()
    .find(|m| m.character_name_lower == r.utterance.character_sanitised.to_lowercase());

let speaker_voice_id = match mapping_opt {
    Some(m) => m.speaker_voice_asset_id.clone(),
    None => match &cfg.default_voice_asset_id {
        Some(id) => id.clone(),
        None => return Err(EmotionTtsError::Conflict(format!(
            "no mapping for character {} and no default voice set",
            r.utterance.character_display
        ))),
    },
};

let speaker_path = (cfg.voice_path_resolver)(speaker_voice_id.as_str())
    .ok_or_else(|| EmotionTtsError::Conflict(format!(
        "voice file missing for asset {}",
        speaker_voice_id.as_str()
    )))?;
```

Also remove the `if !resolved.unresolved_characters.is_empty() { return Err(...) }` block — it's now redundant (the fallback handles it).

- [ ] **Step G3.3: Wire `default_voice_asset_id` from `dispatch_inner`**

In `dispatch_inner`, after fetching the `prepared.run` (which is from the prepare step — wait, `prepare()` itself needs the value). Move the `repos.deployments.get(dep)` lookup BEFORE `prepare()`:

```rust
let dep_for_default = qrun.deployment_id.clone();
let dep_id = crate::domain::DeploymentId::try_from(dep_for_default.as_str())?;
let dep_row = repos.deployments.get(&dep_id).await?
    .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {dep_id}")))?;
let cfg = PrepareConfig {
    output_root,
    voice_path_resolver: voice_resolver,
    default_voice_asset_id: dep_row.default_voice_asset_id.clone(),
};
let prepared = prepare(repos, run_id, &cfg, extension_version).await?;
```

- [ ] **Step G3.4: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/dispatcher/
git commit -m "feat(emotion-tts): unmapped characters fall back to deployment default voice"
```

## Task G4: Frontend — Quick mode toggle on recipe page

**Files:**
- Modify: `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.view.tsx`
- Modify: `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.ui.tsx`
- Create: `extensions/builtin/emotion-tts/web/src/views/recipe/components/quick_voice_picker.tsx`
- Modify: `extensions/builtin/emotion-tts/web/src/services/deployments_client.ts` (add `setDefaultVoice`)

- [ ] **Step G4.1: Add the API client method**

```ts
export async function setDefaultVoice(
  deploymentId: string,
  voiceAssetId: string | null,
): Promise<void> {
  return apiFetch(`/deployments/${deploymentId}/default-voice`, {
    method: "POST",
    body: JSON.stringify({ voiceAssetId }),
  });
}
```

- [ ] **Step G4.2: Build the picker component**

```tsx
// quick_voice_picker.tsx
import { useState, useEffect } from "react";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";
import { setDefaultVoice } from "../../../services/deployments_client";

interface Props {
  deploymentId: string;
  initialVoiceAssetId: string | null;
  onChange?: (voiceAssetId: string | null) => void;
}

export function QuickVoicePicker(props: Props): JSX.Element {
  const [voices, setVoices] = useState<VoiceAsset[]>([]);
  const [selected, setSelected] = useState<string>(props.initialVoiceAssetId ?? "");

  useEffect(() => {
    listVoiceAssets(props.deploymentId).then(setVoices).catch(() => setVoices([]));
  }, [props.deploymentId]);

  return (
    <select
      value={selected}
      onChange={async (e) => {
        const v = e.target.value || null;
        setSelected(v ?? "");
        await setDefaultVoice(props.deploymentId, v);
        props.onChange?.(v);
      }}
    >
      <option value="">— choose voice —</option>
      {voices.map((v) => (
        <option key={v.voiceAssetId} value={v.voiceAssetId}>{v.displayName}</option>
      ))}
    </select>
  );
}
```

- [ ] **Step G4.3: Add the toggle + render the picker in `recipe.view.tsx`**

```tsx
const [quickMode, setQuickMode] = useState(deployment.defaultVoiceAssetId != null);

// In the JSX, above the script editor:
<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
  <label>
    <input
      type="checkbox"
      checked={quickMode}
      onChange={(e) => setQuickMode(e.target.checked)}
    />
    Quick mode (no character mapping required)
  </label>
  {quickMode && (
    <QuickVoicePicker
      deploymentId={deployment.deploymentId}
      initialVoiceAssetId={deployment.defaultVoiceAssetId ?? null}
    />
  )}
</div>
```

- [ ] **Step G4.4: When `quickMode` is on, switch the parser mode to `raw_text` in `createPayload`**

```tsx
const createPayload: CreateRunRequest = useMemo(
  () => ({
    script,
    parserMode: quickMode ? "raw_text" : "dialogue",
    outputFormat,
    speedFactor,
    globalEmotion,
    generation,
    cachePolicy,
  }),
  [script, quickMode, outputFormat, speedFactor, globalEmotion, generation, cachePolicy],
);
```

(Add `parserMode` to the `CreateRunRequest` type if it's not already there.)

- [ ] **Step G4.5: Update the `Deployment` TS type to include `defaultVoiceAssetId?: string | null`**

In `deployments_client.ts`.

- [ ] **Step G4.6: Build + commit**

```bash
cd extensions/builtin/emotion-tts/web && pnpm build
git add extensions/builtin/emotion-tts/web/
git commit -m "feat(emotion-tts/web): Quick mode toggle + default voice picker on recipe"
```

## Task G5: Manual smoke test

- [ ] **Step G5.1: Start host, open recipe**

Verify:
1. Toggle "Quick mode" on.
2. Pick a voice.
3. Type "Hello world." in the script field (no `Narrator:` prefix).
4. Click Generate. The run completes and produces audio in the chosen voice.
5. Toggle Quick mode off — script reverts to dialogue mode behaviour (requires mappings).

- [ ] **Step G5.2: Update the checkpoint memory file**

Append findings to a new `checkpoint_2026-04-NN_emotion_tts_followups.md` in `C:\Users\lazar\.claude\projects\D--Workspace-repos-nexus-dnn\memory\`.

## Task G6: Test — default voice path

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs`

- [ ] **Step G6.1: Add a test that runs a `parser_mode=raw_text` script with no mappings, just a default voice**

```rust
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn raw_text_run_uses_deployment_default_voice() {
    // <seeding>: deployment with default_voice_asset_id set; NO mappings;
    // run with parser_mode="raw_text", script="Hello.\nWorld."
    // <mock handler returns ok>
    // <enqueue + drain>
    // assert utterances exist for both lines
    // assert dispatcher did not error on "no mapping for Narrator"
}
```

- [ ] **Step G6.2: Run + commit**

```bash
cargo test -p emotion-tts-extension --test dispatcher_e2e_test raw_text_run_uses_deployment_default
git add extensions/builtin/emotion-tts/rust/tests/
git commit -m "test(emotion-tts): raw_text dispatch uses deployment default voice when no mapping"
```

---

## Self-review checklist (run before handing off)

- [ ] Every phase ends with a working, mergeable feature.
- [ ] No "TBD" / "appropriate" / "fill in" placeholders.
- [ ] Type names match across phases: `ContentHash`, `SynthesisCacheRow`, `ExportHistoryRow`, `RunChannelRegistry`, `RunEvent`, `UtterancePlan`, `Prepared`, `PrepareConfig`, `LeaseProvider`, `BackendClient`, `BatchSynthesizeOperator`, `ExportBundleOperator`, `HostArtifactStore`, `ArtifactPut`, `MockBackendRuntimeLease`, `FakeArtifactStore`, `RuntimeQueue`, `RunClass`, `EmotionTtsError`, `Repos`, `RunsRepo`, `UtterancesRepo`, `SynthesisCacheRepo`, `ExportHistoryRepo`, `DeploymentsRepo`, `DeploymentId`, `RunId`, `UtteranceId`, `VoiceAssetId`, `MappingId`, `ExportId`.
- [ ] Each task ends with a commit on its own.
- [ ] Boundary discipline: every new file lives under `extensions/builtin/emotion-tts/`. Confirmed by grep at start of each phase if uncertain.
- [ ] Phase ordering: A → B → C makes sense (B's `lookup_many` is consumed by C's resume path; A is independent and can ship first or last).
- [ ] Dispatcher MVP plan (`2026-04-28-emotion-tts-dispatcher.md`) is called out as a hard prerequisite.

---

## Risks called out

1. **Migration 013 column-name drift** — the `default_voice_asset_id` ALTER must reference the correct table name. Confirm by reading migration 001 first; the boundary rule mandates `ext_emotion_tts__*` prefix, so it should be `ext_emotion_tts__deployments` but verify before writing the SQL.

2. **`SqliteExportHistoryRepo::get_latest_for_run` query syntax** — `query_as!` requires `DATABASE_URL` to be set at compile time for compile-time validation. If the rest of the repo uses `query_as` (no `!`) the new method must too — match the existing style.

3. **Cache-key inputs** — Phase B Task 2 uses placeholder values (`runtime_version="0.0.0"`, `model_version="indextts-2"`) because the dispatcher doesn't yet know these. This means cache hits across runtime upgrades won't work as designed. A future spec should thread real versions from the lease's handshake response into `BackendClient` and surface them here.

4. **`ContentHash::from_hex`** — used in Phase B Task 3 step 4. Confirm the constructor exists and takes a `String`; if it takes `&str`, adjust accordingly.

5. **Phase G migration is not idempotent** — `ALTER TABLE … ADD COLUMN` will fail on re-run if the migration tracking table doesn't gate it. The `register.rs` migration loop already skips applied versions (it tracks `ext_emotion_tts__schema_versions`), so this is safe in production. In tests with `MIGRATIONS` re-run, the in-memory pool starts fresh each test → also safe.

6. **Phase D late-subscribe replay races the dispatcher** — if the SSE handler subscribes to the broadcast channel between two segment events, it might receive the second event live AND the first event via replay. The frontend's `setSegments(prev => ...new Map(prev)...)` is idempotent on `globalIndex`, so a duplicate is harmless. Document this in a code comment but no special handling needed.

7. **Phase F audio playback in the browser** — the test-line button needs the audio URL. The cleanest path is for the dispatcher to write the WAV to an artifact via `HostArtifactStore::store` (single-segment path), include the `audio_artifact_ref` in the run-detail response, and use the host's `/api/v1/artifacts/{ref}/download` endpoint. If that endpoint doesn't accept `artifact://` refs directly, a small extension-side proxy route may be needed — call this out during the manual smoke and add a follow-up task if so.

8. **Phase G Quick-mode parser default character** — `parser_mode=raw_text` currently produces `character="Narrator"` for every line. If the user's chosen voice asset has a different `display_name`, the output filenames will say `Narrator_001.wav` not `Alice_001.wav`. This is a cosmetic issue; a follow-up can pull `character_display` from the chosen voice's `display_name` field when in Quick mode.
