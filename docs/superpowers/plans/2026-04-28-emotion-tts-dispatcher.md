# EmotionTTS End-to-End Generation Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the recipe page's **Generate** button actually produce audio segments and a downloadable ZIP — currently the request enqueues a run that nothing pops off the queue.

**Architecture:** Add a per-extension dispatcher task that pops `RuntimeQueue` entries, acquires the worker lease, runs `BatchSynthesizeOperator`, persists each segment outcome, and emits SSE-friendly events through a per-run broadcast channel. The existing SSE endpoint switches from DB polling to subscribing to that channel.

**Tech Stack:** Rust 1.84 (`tokio`, `axum`, `sqlx`, `async-stream`), the extension's existing `BackendClient` / `LeaseProvider` / `BatchSynthesizeOperator` / `ExportBundleOperator` / `RuntimeQueue` / `NotificationFanout`, frontend SSE handler in `apps/web` is already wired and unchanged.

**Out of scope (deferred to future plans):**
- Synthesis cache lookup (`cache_policy="use_cache"` is accepted but ignored — every segment is synthesized fresh).
- Resume / partial-run replay.
- SSE late-subscribe replay of already-completed segments.
- Lease idle release timer.
- Test-line endpoint dispatch (separate small plan once batch path works).
- Default voice / Quick mode.
- **Export ZIP** — writing the ZIP through the existing `ExportHistoryRow` plumbing + frontend `Download ZIP` button. The dispatcher writes the per-segment WAV/MP3/FLAC files to `output_target_abs`; a follow-up plan wires those into the `/exports/{id}/download` flow. The Generate button label still reads "Generate + Export ZIP" until the follow-up plan ships.

---

## File Structure

**New files:**
- `extensions/builtin/emotion-tts/rust/src/dispatcher/mod.rs` — module root, public `spawn_dispatcher` function.
- `extensions/builtin/emotion-tts/rust/src/dispatcher/channels.rs` — per-run broadcast channel registry.
- `extensions/builtin/emotion-tts/rust/src/dispatcher/events.rs` — `RunEvent` enum the dispatcher publishes (segment_started / segment_completed / segment_failed / run_terminal) with `serde::Serialize` so the SSE handler can stringify it directly.
- `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs` — pre-flight: reload run row, mappings, voice paths; build `Vec<SynthesisSegment>`.
- `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs` — single-iteration "process one queued run" function.
- `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs` — integration test using the existing `MockBackendRuntimeLease`.

**Modified files:**
- `extensions/builtin/emotion-tts/rust/src/lib.rs` — module declaration; spawn dispatcher inside `register`.
- `extensions/builtin/emotion-tts/rust/src/register.rs` — spawn dispatcher inside `build_router_inner_async`; thread the channel registry into router state.
- `extensions/builtin/emotion-tts/rust/src/router/mod.rs::build_router_with_families` — accept and thread `Arc<RunChannelRegistry>`.
- `extensions/builtin/emotion-tts/rust/src/router/runs.rs` — add registry to `RunsState`; rewrite `run_progress` to subscribe to the channel instead of polling.

---

## Sanity-check before starting

- [ ] **Step S1: Verify the working tree compiles**

Run: `cargo build -p emotion-tts-extension`
Expected: success. If it fails because of unrelated drift, stop and resolve before starting.

- [ ] **Step S2: Verify existing tests pass**

Run: `cargo test -p emotion-tts-extension --tests`
Expected: all green.

---

## Phase 1 — Per-run progress channel

### Task 1: `RunEvent` enum

**Files:**
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/events.rs`
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/mod.rs`

- [ ] **Step 1.1: Create `dispatcher/mod.rs` with module declarations**

```rust
//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;

pub use channels::{RunChannelRegistry, RunEventSender, RunEventReceiver};
pub use events::RunEvent;
```

- [ ] **Step 1.2: Create `events.rs` with the typed event enum**

```rust
use serde::{Deserialize, Serialize};

use crate::domain::{RunId, UtteranceId};

/// Events the dispatcher publishes per-run. Frontend's
/// `subscribeRunProgress` already handles `segment_started`,
/// `segment_completed`, `segment_failed`, and `run_terminal` — so the
/// `serde(tag = "type")` discriminator becomes the SSE event name's
/// payload, while the SSE event field is set separately by the handler.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum RunEvent {
    SegmentStarted {
        run_id: String,
        utterance_id: String,
        global_index: i64,
    },
    SegmentCompleted {
        run_id: String,
        utterance_id: String,
        global_index: i64,
        duration_ms: i64,
    },
    SegmentFailed {
        run_id: String,
        utterance_id: String,
        global_index: i64,
        failure_category: String,
        failure_detail: Option<String>,
    },
    RunTerminal {
        run_id: String,
        status: String,
    },
}

impl RunEvent {
    pub fn run_id(&self) -> &str {
        match self {
            RunEvent::SegmentStarted { run_id, .. }
            | RunEvent::SegmentCompleted { run_id, .. }
            | RunEvent::SegmentFailed { run_id, .. }
            | RunEvent::RunTerminal { run_id, .. } => run_id,
        }
    }

    pub fn sse_event_name(&self) -> &'static str {
        match self {
            RunEvent::SegmentStarted { .. } => "segment_started",
            RunEvent::SegmentCompleted { .. } => "segment_completed",
            RunEvent::SegmentFailed { .. } => "segment_failed",
            RunEvent::RunTerminal { .. } => "run_terminal",
        }
    }
}

#[allow(dead_code)]
fn _bind_unused_imports(_a: RunId, _b: UtteranceId) {} // keep imports if domain swaps to typed strings later
```

- [ ] **Step 1.3: Build to confirm**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step 1.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/
git commit -m "feat(emotion-tts): add RunEvent enum for dispatcher progress channel"
```

---

### Task 2: `RunChannelRegistry`

**Files:**
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/channels.rs`

- [ ] **Step 2.1: Write the failing unit test inside `channels.rs`**

```rust
//! Per-run broadcast channels used by the dispatcher to notify SSE
//! subscribers about segment-level progress.
//!
//! Lifecycle:
//! * dispatcher calls `register(run_id)` when it pops a run; obtains a
//!   sender + cleans up via the returned guard on drop.
//! * SSE handler calls `subscribe(run_id)` which returns
//!   `Some(receiver)` once the run is registered, or `None` if the
//!   dispatcher has not yet popped it (handler can re-poll briefly or
//!   surface a "queued" state).

use std::collections::HashMap;
use std::sync::Arc;

use tokio::sync::{broadcast, RwLock};

use crate::dispatcher::events::RunEvent;

const CAPACITY: usize = 256;

pub type RunEventSender = broadcast::Sender<RunEvent>;
pub type RunEventReceiver = broadcast::Receiver<RunEvent>;

#[derive(Clone, Default)]
pub struct RunChannelRegistry {
    inner: Arc<RwLock<HashMap<String, RunEventSender>>>,
}

impl RunChannelRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    /// Register a new channel for `run_id`. Returns a `RegistrationGuard`
    /// that removes the channel when dropped.
    pub async fn register(&self, run_id: impl Into<String>) -> (RunEventSender, RegistrationGuard) {
        let run_id = run_id.into();
        let (tx, _) = broadcast::channel(CAPACITY);
        self.inner.write().await.insert(run_id.clone(), tx.clone());
        (
            tx,
            RegistrationGuard {
                inner: self.inner.clone(),
                run_id,
            },
        )
    }

    pub async fn subscribe(&self, run_id: &str) -> Option<RunEventReceiver> {
        self.inner.read().await.get(run_id).map(|tx| tx.subscribe())
    }
}

/// Drop-guard that removes the channel from the registry.
pub struct RegistrationGuard {
    inner: Arc<RwLock<HashMap<String, RunEventSender>>>,
    run_id: String,
}

impl Drop for RegistrationGuard {
    fn drop(&mut self) {
        let inner = self.inner.clone();
        let run_id = std::mem::take(&mut self.run_id);
        // Removal must run on the runtime even though Drop is sync. Spawn
        // a detached task — registry shutdown is best-effort.
        tokio::spawn(async move {
            inner.write().await.remove(&run_id);
        });
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn subscribe_returns_none_for_unknown_run() {
        let registry = RunChannelRegistry::new();
        assert!(registry.subscribe("run_unknown").await.is_none());
    }

    #[tokio::test]
    async fn subscribe_returns_receiver_for_registered_run() {
        let registry = RunChannelRegistry::new();
        let (tx, _guard) = registry.register("run_a").await;
        let mut rx = registry.subscribe("run_a").await.expect("registered");
        tx.send(RunEvent::RunTerminal {
            run_id: "run_a".into(),
            status: "completed".into(),
        })
        .unwrap();
        let event = rx.recv().await.unwrap();
        assert_eq!(event.run_id(), "run_a");
    }

    #[tokio::test]
    async fn drop_guard_removes_channel() {
        let registry = RunChannelRegistry::new();
        let (_tx, guard) = registry.register("run_b").await;
        drop(guard);
        // Allow the spawned cleanup task to run.
        tokio::task::yield_now().await;
        tokio::time::sleep(std::time::Duration::from_millis(10)).await;
        assert!(registry.subscribe("run_b").await.is_none());
    }
}
```

- [ ] **Step 2.2: Run the test — expect compile then test fail**

Run: `cargo test -p emotion-tts-extension --lib dispatcher::channels`
Expected: tests compile and pass on first try (this module has no external deps). If anything fails, fix the type mismatch before continuing.

- [ ] **Step 2.3: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/channels.rs
git commit -m "feat(emotion-tts): add RunChannelRegistry for per-run progress fanout"
```

---

### Task 3: Wire `dispatcher` module into `lib.rs`

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/lib.rs` (add `pub mod dispatcher;` near the other module declarations)

- [ ] **Step 3.1: Locate the module declarations near the top of `lib.rs`**

Look for the block that declares `pub mod backend_client;`, `pub mod operators;`, etc. (around the top of the file).

- [ ] **Step 3.2: Add the dispatcher module**

Insert `pub mod dispatcher;` alphabetically with the others.

- [ ] **Step 3.3: Build to confirm**

Run: `cargo build -p emotion-tts-extension`
Expected: success. The dispatcher module is now part of the public API surface.

- [ ] **Step 3.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/lib.rs
git commit -m "chore(emotion-tts): expose dispatcher module from crate root"
```

---

## Phase 2 — SSE plumbing to channel registry

### Task 4: Thread `RunChannelRegistry` through router state

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/router/mod.rs`
- Modify: `extensions/builtin/emotion-tts/rust/src/router/runs.rs`

- [ ] **Step 4.1: Update `RunsState` to carry the registry**

Open `router/runs.rs`. Replace the existing `RunsState` struct with:

```rust
#[derive(Clone)]
pub struct RunsState {
    pub repos: Repos,
    pub queue: SharedQueue,
    pub extension_version: String,
    pub run_channels: std::sync::Arc<crate::dispatcher::RunChannelRegistry>,
}
```

- [ ] **Step 4.2: Update `build_router_with_families` signature in `router/mod.rs`**

Add a parameter `run_channels: Arc<crate::dispatcher::RunChannelRegistry>` after `artifact_store`. Pass it into `RunsState`. Also forward it from `build_router` (which constructs an empty default if not supplied).

```rust
pub fn build_router(
    repos: Repos,
    queue: SharedQueue,
    extension_version: impl Into<String>,
    provider: Option<Arc<LeaseProvider>>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
) -> Router {
    build_router_with_families(
        repos,
        queue,
        extension_version,
        provider,
        artifact_store,
        Arc::new(crate::dispatcher::RunChannelRegistry::new()),
        Arc::new(FamilyRegistry::new(Vec::new())),
        families::default_reconciler(),
    )
}

pub fn build_router_with_families(
    repos: Repos,
    queue: SharedQueue,
    extension_version: impl Into<String>,
    provider: Option<Arc<LeaseProvider>>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    run_channels: Arc<crate::dispatcher::RunChannelRegistry>,
    family_registry: Arc<FamilyRegistry>,
    reconciler: families::BoxReconciler,
) -> Router {
    let runs_state = runs::RunsState {
        repos: repos.clone(),
        queue: queue.clone(),
        extension_version: extension_version.into(),
        run_channels,
    };
    // ...rest unchanged
```

- [ ] **Step 4.3: Update every call site that breaks**

Run `cargo build -p emotion-tts-extension 2>&1 | head -40` and fix each broken call site by passing `Arc::new(crate::dispatcher::RunChannelRegistry::new())` or accepting it as a parameter. Expected sites: `register.rs`, `lib.rs::build_router_with`, `lib.rs::build_router_with_artifact_store`, `lib.rs::register`, plus several integration tests.

For tests and the simple wrappers, just construct an empty registry inline.

- [ ] **Step 4.4: Confirm clean build**

Run: `cargo build -p emotion-tts-extension --tests`
Expected: success.

- [ ] **Step 4.5: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/router/ extensions/builtin/emotion-tts/rust/src/lib.rs extensions/builtin/emotion-tts/rust/src/register.rs
git commit -m "refactor(emotion-tts): thread RunChannelRegistry through router state"
```

---

### Task 5: Replace polling SSE with channel subscriber

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/router/runs.rs` (replace `run_progress_stream`)

- [ ] **Step 5.1: Rewrite `run_progress_stream`**

Locate the existing `run_progress_stream` function in `router/runs.rs` (~line 99) and replace it with the implementation below. Keep the outer `run_progress` handler as-is — it still validates the run exists before opening the stream, just hand it the new stream factory.

```rust
fn run_progress_stream(
    state: RunsState,
    run_id: RunId,
) -> impl Stream<Item = std::result::Result<Event, Infallible>> {
    async_stream::stream! {
        // Try to find the per-run channel. If the dispatcher has not yet
        // popped this run, we briefly retry — there's a small window
        // between `enqueue` (in create_run) and `register` (in the
        // dispatcher loop) where the channel does not exist yet.
        let mut maybe_rx = None;
        for _ in 0..50 {
            if let Some(rx) = state.run_channels.subscribe(run_id.as_str()).await {
                maybe_rx = Some(rx);
                break;
            }
            // Poll the run row — if it's already terminal, the dispatcher
            // finished before we subscribed; emit a single run_terminal
            // and close.
            if let Ok(Some(row)) = state.repos.runs.get(&run_id).await {
                if matches!(row.status.as_str(), "completed" | "failed" | "cancelled" | "partial") {
                    let payload = serde_json::json!({
                        "type": "run_terminal",
                        "run_id": run_id.as_str(),
                        "status": row.status,
                    });
                    yield Ok(Event::default().event("run_terminal").data(payload.to_string()));
                    return;
                }
            }
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        let mut rx = match maybe_rx {
            Some(rx) => rx,
            None => {
                let payload = serde_json::json!({
                    "type": "run_terminal",
                    "run_id": run_id.as_str(),
                    "status": "failed",
                    "error": "dispatcher did not pick up run within 5s",
                });
                yield Ok(Event::default().event("run_terminal").data(payload.to_string()));
                return;
            }
        };
        loop {
            match rx.recv().await {
                Ok(event) => {
                    let name = event.sse_event_name();
                    let data = serde_json::to_string(&event)
                        .unwrap_or_else(|_| "{}".to_string());
                    yield Ok(Event::default().event(name).data(data));
                    if matches!(event, crate::dispatcher::RunEvent::RunTerminal { .. }) {
                        return;
                    }
                }
                Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => {
                    // Slow subscriber — drop the lagged frames and continue.
                    continue;
                }
                Err(tokio::sync::broadcast::error::RecvError::Closed) => {
                    return;
                }
            }
        }
    }
}
```

- [ ] **Step 5.2: Add the `Duration` import if missing**

The function uses `tokio::time::sleep(Duration::from_millis(100))`. Confirm `use std::time::Duration;` is at the top of `runs.rs` (it already is — line 8).

- [ ] **Step 5.3: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success.

- [ ] **Step 5.4: Update existing SSE contract test if it exists**

Run: `cargo test -p emotion-tts-extension --tests http_contract_runs`
Expected: existing test for `progress` may fail because old shape (`event: run_state`) no longer fires. Update the test to match new shape (subscribe + assert dispatch path) OR mark the old assertions as `#[ignore]` with a TODO comment pointing to this plan, whichever is cheaper. Do not skip silently — the test was a regression net for the polling shim.

If you choose `#[ignore]`, add the comment:

```rust
// TODO: replaced by integration test in `tests/dispatcher_e2e_test.rs` once dispatcher lands.
```

- [ ] **Step 5.5: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/router/runs.rs extensions/builtin/emotion-tts/rust/tests/http_contract_runs_test.rs
git commit -m "refactor(emotion-tts): SSE progress endpoint subscribes to RunChannelRegistry"
```

---

## Phase 3 — Dispatcher scaffold

### Task 6: Empty dispatcher loop with shutdown

**Files:**
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs`
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/mod.rs` (add `spawn` function)

- [ ] **Step 6.1: Create `run_loop.rs` with a placeholder**

```rust
//! Single-run handler — pulled out so it can be tested independently
//! and so the outer loop can panic-isolate each iteration.

use std::sync::Arc;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::{RunChannelRegistry, RunEvent};
use crate::queue::QueuedRun;
use crate::storage::Repos;

#[allow(clippy::too_many_arguments)]
pub(crate) async fn process_one(
    qrun: QueuedRun,
    _repos: Repos,
    _lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    extension_version: String,
) {
    let _ = extension_version;
    let run_id_str = qrun.run_id.as_str().to_string();
    let (tx, _guard) = registry.register(run_id_str.clone()).await;
    // Placeholder: emit a single failed run_terminal so SSE doesn't
    // hang. Replaced in Task 7+ with real dispatch.
    let _ = tx.send(RunEvent::RunTerminal {
        run_id: run_id_str,
        status: "failed".to_string(),
    });
}
```

- [ ] **Step 6.2: Add `spawn_dispatcher` in `dispatcher/mod.rs`**

Replace the contents of `dispatcher/mod.rs` with:

```rust
//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;
pub(crate) mod run_loop;

pub use channels::{RegistrationGuard, RunChannelRegistry, RunEventReceiver, RunEventSender};
pub use events::RunEvent;

use std::sync::Arc;

use tokio::task::JoinHandle;

use crate::backend_client::LeaseProvider;
use crate::queue::SharedQueue;
use crate::storage::Repos;

/// Spawn the dispatcher background task. Returns the `JoinHandle` so the
/// caller can `.abort()` it on shutdown (host has no shutdown hook today,
/// so the handle is currently dropped — the task lives for the process
/// lifetime).
pub fn spawn_dispatcher(
    queue: SharedQueue,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    extension_version: impl Into<String>,
) -> JoinHandle<()> {
    let extension_version = extension_version.into();
    tokio::spawn(async move {
        loop {
            let Some(qrun) = queue.pop_next().await else {
                // pop_next never returns None today (it always blocks on
                // notify), but be defensive: sleep briefly and retry.
                tokio::time::sleep(std::time::Duration::from_millis(50)).await;
                continue;
            };
            let run_id = qrun.run_id.clone();
            let repos_c = repos.clone();
            let lease_c = lease_provider.clone();
            let registry_c = registry.clone();
            let version_c = extension_version.clone();
            // Isolate each run in its own task so a panic does not kill
            // the dispatcher.
            let join = tokio::spawn(async move {
                run_loop::process_one(qrun, repos_c, lease_c, registry_c, version_c).await;
            });
            if let Err(err) = join.await {
                tracing::error!(
                    target: "emotion_tts::dispatch",
                    run_id = run_id.as_str(),
                    error = %err,
                    "dispatcher task panicked"
                );
            }
            queue.complete_in_flight(&run_id).await;
        }
    })
}
```

- [ ] **Step 6.3: Spawn the dispatcher in `register.rs`**

Open `register.rs::build_router_inner_async`. After `let provider = Arc::new(LeaseProvider::new(lease_factory));` and before `let artifact_store = ...`, construct the registry, spawn the dispatcher, and pass the registry to `build_router_with_families` (which is what `build_router` calls — but you may need to switch from the simpler `build_router` to the `_with_families` variant to thread the registry).

```rust
let provider = Arc::new(LeaseProvider::new(lease_factory));
let run_channels = Arc::new(crate::dispatcher::RunChannelRegistry::new());
let _dispatcher = crate::dispatcher::spawn_dispatcher(
    queue.clone(),
    repos.clone(),
    provider.clone(),
    run_channels.clone(),
    EXTENSION_VERSION,
);
let artifact_store = self.resources.artifact_store.clone();
Ok(crate::router::build_router_with_families(
    repos,
    queue,
    EXTENSION_VERSION,
    Some(provider),
    artifact_store,
    run_channels,
    Arc::new(crate::families::FamilyRegistry::new(Vec::new())),
    crate::router::families::default_reconciler(),
))
```

- [ ] **Step 6.4: Also spawn dispatcher in `lib.rs::register`**

`lib.rs::register` is the alternate entry the host's loader can call. Mirror the same wiring there: construct `run_channels`, call `spawn_dispatcher`, pass to `build_router`.

- [ ] **Step 6.5: Build + smoke test**

Run: `cargo build -p emotion-tts-extension --tests`
Expected: success.

Run: `cargo test -p emotion-tts-extension --tests`
Expected: prior tests still green; the new dispatcher just emits "failed" so any test that goes through the queue would observe failed runs — that's fine, the next tasks fix the body.

- [ ] **Step 6.6: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/ extensions/builtin/emotion-tts/rust/src/register.rs extensions/builtin/emotion-tts/rust/src/lib.rs
git commit -m "feat(emotion-tts): spawn dispatcher loop wired to RunChannelRegistry"
```

---

## Phase 4 — Run preparation

### Task 7: `prepare.rs` — reload run + build segments

**Files:**
- Create: `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs`

- [ ] **Step 7.1: Write the prepare module**

```rust
//! Pre-flight for a popped run: reload the row from DB (don't trust the
//! queue copy because settings may have changed), reload mappings,
//! resolve voice asset paths, build the `SynthesisSegment` list the
//! `BatchSynthesizeOperator` expects.

use std::path::PathBuf;

use crate::domain::emotion::EmotionPayload;
use crate::domain::filenames::build_filename;
use crate::domain::parser::{parse_script, ParserMode};
use crate::domain::{DeploymentId, EmotionTtsError, Result, RunId};
use crate::operators::batch_synthesize::{BatchOptimisations, Input as BatchInput, SynthesisSegment};
use crate::operators::mapping_resolve::{Input as MapInput, MappingResolveOperator};
use crate::operators::Operator;
use crate::storage::repo_traits::RunRow;
use crate::storage::Repos;

pub(crate) struct Prepared {
    pub run: RunRow,
    pub deployment_id: DeploymentId,
    pub batch_input: BatchInput,
    pub utterances: Vec<UtterancePlan>,
}

pub(crate) struct UtterancePlan {
    pub utterance_id: crate::domain::UtteranceId,
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub text: String,
    pub output_target_abs: String,
}

#[derive(Clone)]
pub(crate) struct PrepareConfig {
    /// Where segment audio files are written. Created if missing.
    pub output_root: PathBuf,
    /// Resolves a `VoiceAssetId` to its absolute file path on disk.
    /// Currently the voice asset row stores `audio_artifact_ref` which is
    /// already an absolute path written by the artifact store; passing
    /// it through unchanged is correct.
    pub voice_path_resolver: std::sync::Arc<dyn Fn(&str) -> Option<String> + Send + Sync>,
}

pub(crate) async fn prepare(
    repos: &Repos,
    run_id: &RunId,
    cfg: &PrepareConfig,
) -> Result<Prepared> {
    let run = repos
        .runs
        .get(run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    let dep = run.deployment_id.clone();

    let parser_mode = match run.parser_mode.as_str() {
        "raw_text" => ParserMode::RawText,
        "advanced_tagged" => ParserMode::AdvancedTagged,
        _ => ParserMode::Dialogue,
    };
    let parsed = parse_script(&run.script_snapshot, parser_mode);

    let mappings = repos.mappings.list_by_deployment(&dep).await?;
    let resolved = MappingResolveOperator
        .execute(MapInput {
            utterances: parsed.utterances.clone(),
            mappings: mappings.clone(),
        })
        .await?;

    if !resolved.unresolved_characters.is_empty() {
        return Err(EmotionTtsError::Conflict(format!(
            "{} unmapped characters: {:?}",
            resolved.unresolved_characters.len(),
            resolved.unresolved_characters
        )));
    }

    std::fs::create_dir_all(&cfg.output_root).map_err(|e| {
        EmotionTtsError::internal(format!(
            "create output_root {}: {e}",
            cfg.output_root.display()
        ))
    })?;

    let mut segments = Vec::with_capacity(resolved.resolved.len());
    let mut plans = Vec::with_capacity(resolved.resolved.len());
    for (idx, r) in resolved.resolved.iter().enumerate() {
        let mapping = mappings
            .iter()
            .find(|m| m.character_name_lower == r.utterance.character_sanitised.to_lowercase())
            .ok_or_else(|| {
                EmotionTtsError::internal(format!(
                    "internal: resolved character {} has no matching mapping row",
                    r.utterance.character_sanitised
                ))
            })?;
        let speaker_path = (cfg.voice_path_resolver)(mapping.speaker_voice_asset_id.as_str())
            .ok_or_else(|| {
                EmotionTtsError::Conflict(format!(
                    "voice file missing for character {} (asset {})",
                    r.utterance.character_display,
                    mapping.speaker_voice_asset_id.as_str()
                ))
            })?;

        let global_index = (idx + 1) as i64;
        let filename = build_filename(
            global_index,
            &r.utterance.character_display,
            r.character_index,
            &run.output_format,
        )
        .filename;
        let output_target = cfg.output_root.join(&filename);
        let output_target_abs = output_target.to_string_lossy().into_owned();

        let utterance_id = crate::domain::UtteranceId::new();
        plans.push(UtterancePlan {
            utterance_id: utterance_id.clone(),
            global_index,
            character_display: r.utterance.character_display.clone(),
            character_sanitised: r.utterance.character_sanitised.clone(),
            character_index: r.character_index,
            text: r.utterance.text.clone(),
            output_target_abs: output_target_abs.clone(),
        });

        segments.push(SynthesisSegment {
            segment_id: utterance_id.as_str().to_string(),
            global_index,
            character_display: r.utterance.character_display.clone(),
            character_sanitised: r.utterance.character_sanitised.clone(),
            character_index: r.character_index,
            text: r.utterance.text.clone(),
            speaker_audio_ref_abs: speaker_path,
            emotion: EmotionPayload::None,
            generation: serde_json::json!({}),
            output_target_abs,
        });
    }

    let batch_input = BatchInput {
        request_id: format!("{}-batch", run_id.as_str()),
        run_id: run_id.as_str().to_string(),
        deployment_id: dep.as_str().to_string(),
        segments,
        optimisations: BatchOptimisations::default(),
    };

    Ok(Prepared {
        run,
        deployment_id: dep,
        batch_input,
        utterances: plans,
    })
}
```

- [ ] **Step 7.2: Re-export and add to `dispatcher/mod.rs`**

Add `pub(crate) mod prepare;` near the other module declarations in `dispatcher/mod.rs`.

- [ ] **Step 7.3: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success. If `MappingResolveOperator`, `parse_script`, or `build_filename` signatures don't match, fix the call sites here — do not change those operator APIs.

- [ ] **Step 7.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/
git commit -m "feat(emotion-tts): dispatcher prepare step (reload run + build segments)"
```

---

## Phase 5 — Dispatch + segment persistence

### Task 8: `process_one` — real dispatch path

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs`

- [ ] **Step 8.1: Replace `process_one` placeholder with the real implementation**

```rust
//! Single-run handler — pulled out so it can be tested independently
//! and so the outer loop can panic-isolate each iteration.

use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use chrono::Utc;
use futures::StreamExt;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::prepare::{prepare, PrepareConfig};
use crate::dispatcher::{RunChannelRegistry, RunEvent};
use crate::domain::EmotionTtsError;
use crate::host_contract::NotificationEnvelope;
use crate::operators::batch_synthesize::{BatchSynthesizeOperator, Output as BatchOutput};
use crate::operators::Operator;
use crate::queue::QueuedRun;
use crate::storage::repo_traits::UtteranceRow;
use crate::storage::Repos;

pub(crate) async fn process_one(
    qrun: QueuedRun,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    _extension_version: String,
) {
    let run_id = qrun.run_id.clone();
    let run_id_str = run_id.as_str().to_string();
    let (tx, _guard) = registry.register(run_id_str.clone()).await;

    let result = dispatch_inner(
        &qrun,
        &repos,
        &lease_provider,
        &tx,
        // Voice files in this build are stored at absolute paths in the
        // voice_assets row's `audio_artifact_ref` column. The repository
        // already returns them ready-to-use, so the resolver is identity.
        Arc::new({
            let repos = repos.clone();
            move |voice_asset_id: &str| -> Option<String> {
                let repos = repos.clone();
                let id = voice_asset_id.to_string();
                tokio::task::block_in_place(|| {
                    tokio::runtime::Handle::current().block_on(async move {
                        let parsed = crate::domain::VoiceAssetId::try_from(id.as_str()).ok()?;
                        let row = repos.voice_assets.get(&parsed).await.ok().flatten()?;
                        Some(row.audio_artifact_ref)
                    })
                })
            }
        }),
    )
    .await;

    let terminal_status = match result {
        Ok(status) => status,
        Err(err) => {
            tracing::error!(
                target: "emotion_tts::dispatch",
                run_id = run_id_str,
                error = %err,
                "dispatch failed"
            );
            "failed".to_string()
        }
    };

    let _ = repos
        .runs
        .update_status(&run_id, &terminal_status, Some(Utc::now().timestamp()))
        .await;

    let _ = tx.send(RunEvent::RunTerminal {
        run_id: run_id_str,
        status: terminal_status,
    });
}

async fn dispatch_inner(
    qrun: &QueuedRun,
    repos: &Repos,
    lease_provider: &Arc<LeaseProvider>,
    tx: &crate::dispatcher::RunEventSender,
    voice_resolver: Arc<dyn Fn(&str) -> Option<String> + Send + Sync>,
) -> crate::domain::Result<String> {
    let run_id = &qrun.run_id;

    // Output dir: ~/.nexus-emotion-tts-runs/<deployment_id>/<run_id>/.
    // This is intentionally simple for v1 — a future task can move it
    // under the host's data dir once the dispatcher has access to it.
    let output_root = std::env::temp_dir()
        .join("nexus-emotion-tts-runs")
        .join(qrun.deployment_id.clone())
        .join(run_id.as_str());

    let cfg = PrepareConfig {
        output_root,
        voice_path_resolver: voice_resolver,
    };
    let prepared = prepare(repos, run_id, &cfg).await?;

    // Insert all utterance rows up-front in `queued` state so the
    // `segment_started` notifications have something to update.
    let utterance_rows: Vec<UtteranceRow> = prepared
        .utterances
        .iter()
        .map(|p| UtteranceRow {
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
            content_hash: None,
            status: "queued".to_string(),
            source_run_id: None,
            audio_artifact_ref: None,
            cache_hit: false,
            duration_ms: None,
            started_at: None,
            finished_at: None,
            failure_category: None,
            failure_detail: None,
        })
        .collect();
    repos.utterances.insert_many(&utterance_rows).await?;

    // Mark run started.
    repos.runs.set_started(run_id, Utc::now().timestamp()).await?;

    // Acquire the lease (spawns the worker if needed; takes minutes on cold start).
    let client = lease_provider.spawn_if_needed().await?;
    let mut notifications = client.lease().subscribe_notifications().await;

    // Dispatch the batch RPC and the notification draining concurrently.
    // The worker emits per-segment notifications while the RPC is in
    // flight; the RPC resolves once the entire batch is done.
    let segment_total = prepared.batch_input.segments.len();
    let segment_lookup: std::collections::HashMap<String, i64> = prepared
        .utterances
        .iter()
        .map(|p| (p.utterance_id.as_str().to_string(), p.global_index))
        .collect();

    let cancel = qrun.cancel.clone();
    let tx_for_drain = tx.clone();
    let repos_for_drain = repos.clone();
    let segment_lookup_drain = segment_lookup.clone();
    let drain = tokio::spawn(async move {
        let mut completed = 0usize;
        let mut failed = 0usize;
        loop {
            tokio::select! {
                biased;
                _ = cancel.cancelled() => break,
                next = notifications.next() => {
                    let Some(env) = next else { break };
                    forward_notification(
                        env,
                        &tx_for_drain,
                        &repos_for_drain,
                        &segment_lookup_drain,
                        &mut completed,
                        &mut failed,
                    ).await;
                    if completed + failed >= segment_total {
                        break;
                    }
                }
            }
        }
        (completed, failed)
    });

    let rpc_result: crate::domain::Result<BatchOutput> = tokio::select! {
        biased;
        _ = qrun.cancel.cancelled() => {
            // Best-effort cancel RPC; ignore the result.
            let _ = client
                .call::<_, serde_json::Value>(
                    "cancel",
                    &serde_json::json!({"run_id": run_id.as_str()}),
                )
                .await;
            Err(EmotionTtsError::Conflict("run cancelled".into()))
        }
        result = BatchSynthesizeOperator::new(Arc::new(client.clone()))
            .execute(prepared.batch_input.clone()) => result,
    };

    // Wait briefly for trailing notifications, then stop draining.
    let _ = tokio::time::timeout(Duration::from_secs(2), drain).await;

    if qrun.cancel.is_cancelled() {
        return Ok("cancelled".to_string());
    }

    let _output = rpc_result?;

    // Recompute terminal status from utterance rows — the most reliable
    // source given that not every notification is guaranteed to arrive.
    let utts = repos.utterances.list_by_run(run_id).await?;
    let mut completed = 0;
    let mut failed = 0;
    for u in &utts {
        match u.status.as_str() {
            "completed" => completed += 1,
            "failed" => failed += 1,
            _ => {}
        }
    }
    let status = if failed == 0 && completed == utts.len() {
        "completed"
    } else if completed == 0 {
        "failed"
    } else {
        "partial"
    };
    Ok(status.to_string())
}

async fn forward_notification(
    env: NotificationEnvelope,
    tx: &crate::dispatcher::RunEventSender,
    repos: &Repos,
    lookup: &std::collections::HashMap<String, i64>,
    completed: &mut usize,
    failed: &mut usize,
) {
    // Worker payload conventions: every per-segment notification
    // includes a `segment_id` (= utterance_id we generated) and the
    // worker echoes it back; map → global_index for the SSE payload.
    let segment_id = env
        .params
        .get("segment_id")
        .and_then(|v| v.as_str())
        .unwrap_or_default()
        .to_string();
    let global_index = lookup.get(&segment_id).copied().unwrap_or(-1);
    let run_id_str = env
        .params
        .get("run_id")
        .and_then(|v| v.as_str())
        .unwrap_or_default()
        .to_string();

    match env.method.as_str() {
        "segment_started" => {
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                let _ = repos.utterances.update_status(&uid, "running").await;
            }
            let _ = tx.send(RunEvent::SegmentStarted {
                run_id: run_id_str,
                utterance_id: segment_id,
                global_index,
            });
        }
        "segment_completed" => {
            let duration_ms = env
                .params
                .get("duration_ms")
                .and_then(|v| v.as_i64())
                .unwrap_or(0);
            let audio_ref = env
                .params
                .get("output_path_abs")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                let _ = repos
                    .utterances
                    .mark_completed(&uid, &audio_ref, false, Some(duration_ms))
                    .await;
            }
            *completed += 1;
            let _ = tx.send(RunEvent::SegmentCompleted {
                run_id: run_id_str,
                utterance_id: segment_id,
                global_index,
                duration_ms,
            });
        }
        "segment_failed" => {
            let failure_category = env
                .params
                .get("failure_category")
                .and_then(|v| v.as_str())
                .unwrap_or("synthesis_failed")
                .to_string();
            let failure_detail = env
                .params
                .get("failure_detail")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string());
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                let _ = repos.utterances.update_status(&uid, "failed").await;
            }
            *failed += 1;
            let _ = tx.send(RunEvent::SegmentFailed {
                run_id: run_id_str,
                utterance_id: segment_id,
                global_index,
                failure_category,
                failure_detail,
            });
        }
        _ => {
            // Other notifications (model.load.progress, log, warning) are
            // not part of the SSE contract — drop them.
        }
    }
}

#[allow(dead_code)]
fn _bind_unused(_p: PathBuf) {}
```

- [ ] **Step 8.2: Build**

Run: `cargo build -p emotion-tts-extension`
Expected: success. If the worker's notification field names differ (`output_path_abs` vs `audio_path` etc.), grep `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/handlers.py` for the actual emit calls and adjust the field reads — do not change the worker.

- [ ] **Step 8.3: Run existing tests**

Run: `cargo test -p emotion-tts-extension --tests`
Expected: prior tests still pass; the dispatcher itself has no direct test yet (Task 11 adds one).

- [ ] **Step 8.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "feat(emotion-tts): dispatcher dispatches batch + persists per-segment outcomes"
```

---

### Task 9: Verify worker notification shape against this implementation

**Files:**
- Read: `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/handlers.py`
- Read: any helper that emits `segment_started`/`segment_completed`/`segment_failed`

- [ ] **Step 9.1: Grep for notification emits in the worker**

Run: `grep -rn "emit\|publish_notification\|segment_started\|segment_completed\|segment_failed" extensions/builtin/emotion-tts/worker/src/`

- [ ] **Step 9.2: Confirm the field names match**

For each event, check the keys in the notification body:
- `segment_id` — string, matches `SynthesisSegment.segment_id`
- `run_id` — string
- `output_path_abs` (segment_completed) — string path
- `duration_ms` (segment_completed) — integer
- `failure_category` / `failure_detail` (segment_failed) — strings

- [ ] **Step 9.3: If field names differ, update `forward_notification` in `run_loop.rs` to read the actual keys**

Do not change the worker. Adjust the dispatcher to match what the worker already emits. Document the field mapping in a comment if they're not 1:1.

- [ ] **Step 9.4: Build + commit any adjustment**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "fix(emotion-tts): align dispatcher notification field reads with worker emit shape"
```

(Skip the commit if no changes were needed.)

---

## Phase 6 — Cancellation correctness

### Task 10: Honour `RuntimeQueue::cancel` post-dispatch

**Files:**
- Modify: `extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs`

The `dispatch_inner` body already includes a `tokio::select!` against `qrun.cancel.cancelled()`. This task makes sure cancellation:
1. Marks any in-flight utterance rows as `cancelled` (not left in `running`).
2. Sets the run row's status to `cancelled` (already covered by Task 8's outer match).
3. Sends a `cancel` RPC to the worker (already covered).

- [ ] **Step 10.1: After the `if qrun.cancel.is_cancelled() { return Ok("cancelled"...) }` line, mark in-flight utterances**

Replace that block with:

```rust
if qrun.cancel.is_cancelled() {
    let utts = repos.utterances.list_by_run(run_id).await.unwrap_or_default();
    for u in utts {
        if u.status == "running" || u.status == "queued" {
            let _ = repos.utterances.update_status(&u.utterance_id, "cancelled").await;
        }
    }
    return Ok("cancelled".to_string());
}
```

- [ ] **Step 10.2: Build + commit**

```bash
cargo build -p emotion-tts-extension
git add extensions/builtin/emotion-tts/rust/src/dispatcher/run_loop.rs
git commit -m "feat(emotion-tts): mark in-flight utterances cancelled when dispatcher sees cancel token"
```

---

## Phase 7 — Integration test

### Task 11: End-to-end dispatcher test with mock lease

**Files:**
- Create: `extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs`

- [ ] **Step 11.1: Write the integration test**

```rust
mod fixtures;

use std::sync::Arc;
use std::time::Duration;

use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::dispatcher::{spawn_dispatcher, RunChannelRegistry, RunEvent};
use emotion_tts_extension::domain::{DeploymentId, RunId};
use emotion_tts_extension::host_contract::{NotificationEnvelope, SharedLease};
use emotion_tts_extension::queue::{RunClass, RuntimeQueue};
use emotion_tts_extension::storage::repo_traits::{
    CharacterMappingRow, DeploymentRow, RunRow, VoiceAssetRow,
};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use fixtures::mock_backend::MockBackendRuntimeLease;
use serde_json::json;
use sqlx::sqlite::SqlitePoolOptions;

async fn fresh_pool() -> sqlx::SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql).execute(&pool).await.unwrap();
    }
    pool
}

struct StaticLeaseFactory(Arc<MockBackendRuntimeLease>);

#[async_trait::async_trait]
impl LeaseFactory for StaticLeaseFactory {
    async fn acquire(&self) -> emotion_tts_extension::domain::Result<SharedLease> {
        Ok(self.0.clone())
    }
}

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_emits_segment_events_and_runs_to_completion() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    // Seed deployment + voice + mapping + run + utterance-pending.
    let dep = DeploymentId::try_from("dep_test_dispatcher").unwrap();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .upsert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Test".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: true,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    let voice = emotion_tts_extension::domain::VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice.wav".into(),
            content_sha256: "0".repeat(64),
            reference_text: None,
            sample_rate: Some(24000),
            duration_ms: Some(5000),
            source_type: "upload".into(),
            notes: None,
            is_active: true,
            preprocessed_artifact_ref: None,
            preprocessing_report_json: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    repos
        .mappings
        .insert(&CharacterMappingRow {
            mapping_id: emotion_tts_extension::domain::MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice.clone(),
            default_emotion_mode: "none".into(),
            default_emotion_voice_asset_id: None,
            default_vector_preset_id: None,
            default_qwen_template: None,
            default_speed_factor: None,
            default_generation_overrides_json: "{}".into(),
            is_active: true,
            notes: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Hello world.".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "fixed".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.0.0-test".into(),
            queued_at: now,
            started_at: None,
            finished_at: None,
            error_category: None,
            error_detail: None,
        })
        .await
        .unwrap();

    // Mock lease: synthesize.batch responds with status=ok and emits one
    // segment_started + segment_completed notification.
    let lease = Arc::new(MockBackendRuntimeLease::new());
    let lease_for_handler = lease.clone();
    lease.set_handler("synthesize.batch", move |params| {
        let segment_id = params["segments"][0]["segment_id"].as_str().unwrap().to_string();
        let run_id = params["run_id"].as_str().unwrap().to_string();
        let lease_inner = lease_for_handler.clone();
        tokio::spawn(async move {
            tokio::time::sleep(Duration::from_millis(20)).await;
            lease_inner.push_notification(NotificationEnvelope {
                method: "segment_started".into(),
                params: json!({"segment_id": segment_id, "run_id": run_id}),
            }).await;
            tokio::time::sleep(Duration::from_millis(20)).await;
            lease_inner.push_notification(NotificationEnvelope {
                method: "segment_completed".into(),
                params: json!({
                    "segment_id": segment_id,
                    "run_id": run_id,
                    "duration_ms": 1234,
                    "output_path_abs": "/tmp/out.wav",
                }),
            }).await;
        });
        Ok(json!({"request_id":"x","status":"ok","segments":[]}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(lease))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        "0.0.0-test",
    );

    queue
        .enqueue(run_id.clone(), "dep_test_dispatcher", RunClass::Batch)
        .await;

    // Dispatcher registers the channel asynchronously — poll briefly.
    let mut rx = None;
    for _ in 0..50 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should have registered the run channel");

    let mut events = Vec::new();
    let drain = tokio::time::timeout(Duration::from_secs(5), async {
        while let Ok(ev) = rx.recv().await {
            let terminal = matches!(ev, RunEvent::RunTerminal { .. });
            events.push(ev);
            if terminal { break; }
        }
        events
    })
    .await
    .expect("dispatcher should reach terminal within 5s");

    assert!(drain.iter().any(|e| matches!(e, RunEvent::SegmentStarted { .. })));
    assert!(drain.iter().any(|e| matches!(e, RunEvent::SegmentCompleted { .. })));
    let terminal = drain.iter().find_map(|e| match e {
        RunEvent::RunTerminal { status, .. } => Some(status.clone()),
        _ => None,
    }).unwrap();
    assert_eq!(terminal, "completed");

    let final_row = repos.runs.get(&run_id).await.unwrap().unwrap();
    assert_eq!(final_row.status, "completed");
}
```

- [ ] **Step 11.2: Run the test**

Run: `cargo test -p emotion-tts-extension --test dispatcher_e2e_test -- --nocapture`
Expected: PASS within 5s. If the test times out, the dispatcher likely is not subscribing to notifications correctly or the mock's notification stream API differs from what `forward_notification` expects.

- [ ] **Step 11.3: Iterate until green**

Common failure modes and fixes:
- *Channel never registered* → confirm `spawn_dispatcher` is actually spawning; add `tracing::info!` at the top of `process_one`.
- *Notification fields mismatch* → adjust `forward_notification` to match the keys the test uses. The test is the ground truth for the contract.
- *RPC blocks forever* → check that `MockBackendRuntimeLease::set_handler` returns immediately (the test's handler does), and that `BatchSynthesizeOperator::execute` awaits the right call.

- [ ] **Step 11.4: Commit**

```bash
git add extensions/builtin/emotion-tts/rust/tests/dispatcher_e2e_test.rs
git commit -m "test(emotion-tts): integration test for end-to-end dispatcher loop"
```

---

## Phase 8 — Boundary verification + manual smoke

### Task 12: Confirm host-extension boundary stays clean

**Files:** none modified — verification only.

- [ ] **Step 12.1: Run the existing boundary test**

Run: `cargo test -p emotion-tts-extension --test boundary_test`
Expected: PASS.

- [ ] **Step 12.2: Grep host-side files for new emotion-tts-named references**

Run: `grep -rn "emotion[-_]tts\|EmotionTts" crates/ apps/web/src/ --include="*.rs" --include="*.ts" --include="*.tsx" | grep -v "src/views/extension-settings\|src/views/extensions/gallery\|nexus-extension-deps"`

Expected: any hits should be either pre-existing grandfathered references OR the host re-exports of `EXTENSION_ID`. If there's a *new* hit from this plan, move it back into the extension crate.

- [ ] **Step 12.3: Run the spec-035 boundary guard**

Run: `cargo test -p nexus-extension-deps --test boundary_test`
Expected: PASS.

### Task 13: Manual smoke test (host-side)

This task is exploratory — write findings into the next checkpoint memory file.

- [ ] **Step 13.1: Rebuild the workspace and the extension UI bundle**

Run: `cargo build --workspace` then `cd extensions/builtin/emotion-tts/web && pnpm build` (or equivalent — the `dist/` is consumed by the host loader).

- [ ] **Step 13.2: Start the host**

Run the host binary. Open the EmotionTTS recipe page for a deployment that already has the worker installed (per the previous session).

- [ ] **Step 13.3: Type a one-line script "Narrator: hello world." and click Generate**

Expected: button changes to "Running…", segment row appears in the table, segment transitions to `completed`, run reaches `terminal` status. The "Download ZIP" button will NOT appear in this milestone — it's deferred. The synthesised WAV/MP3/FLAC is at the path printed in the `output_target_abs` log line under `target=emotion_tts::dispatch`.

If anything regresses, capture:
- Browser network tab: what does `POST /runs` return?
- Host log lines under `target=emotion_tts::dispatch` and `target=emotion_tts_lease`.
- Worker stderr `[synth ...]` checkpoints.

- [ ] **Step 13.4: Update the checkpoint memory file**

Append findings to `C:\Users\lazar\.claude\projects\D--Workspace-repos-nexus-dnn\memory\` — either updating the existing 2026-04-27 checkpoint or writing a new 2026-04-28 one with the dispatcher status.

---

## Self-review checklist (run before handing off)

- [ ] Every task references real files that exist in the repo today (or are explicitly created by an earlier task).
- [ ] No "TBD", "appropriate", "fill in" placeholders.
- [ ] Type names match between tasks: `RunChannelRegistry`, `RunEvent`, `RunEventSender`, `RunEventReceiver`, `spawn_dispatcher`, `process_one`, `dispatch_inner`, `forward_notification`, `prepare`, `Prepared`, `UtterancePlan`, `PrepareConfig`, `BatchSynthesizeOperator`, `LeaseProvider`, `BackendClient`, `MockBackendRuntimeLease`.
- [ ] Each task ends with a commit.
- [ ] Boundary discipline: every new file lives under `extensions/builtin/emotion-tts/`. No host crate touched.
- [ ] Deferred items (cache, resume, replay, idle release, test-line, quick mode) are listed in "Out of scope" so reviewers know they're intentional, not forgotten.

---

## Risks called out

1. **Worker notification field names** — the dispatcher reads `segment_id`, `output_path_abs`, `duration_ms`, `failure_category`. If the worker emits different keys (e.g. `seg_id`, `audio_path`), Phase 5 silently drops events. Task 9 exists to verify, but a single mismatched field name would manifest as "no segments ever transition out of `running`". Fix is local to `forward_notification`.

2. **Voice path resolver runs `block_in_place`** — Task 8's `voice_resolver` uses `block_in_place` because `prepare.rs` takes a sync closure. If this triggers `block_in_place called from a non-blocking thread` panics in a single-thread runtime, change `PrepareConfig::voice_path_resolver` to `Arc<dyn Fn(&str) -> futures::future::BoxFuture<'static, Option<String>> + Send + Sync>` and `await` it inside `prepare`.

3. **Output dir under `std::env::temp_dir()`** — temporary v1 choice. Real install should use the host data dir (`~/.nexus/extensions/nexus.audio.emotiontts/runs/<deployment>/<run_id>/`). A future task should plumb the host data dir through `EmotionTtsProviderResources` into the dispatcher.

4. **`set_export_artifact_ref` may not exist** — Task 11.5 explicitly checks. If it doesn't, the migration path adds ~30 lines and one new SQL file.

5. **Mock lease's `subscribe_notifications` semantics** — the integration test in Task 12 assumes notifications pushed *after* subscribe are observed. If the mock buffers notifications only after subscribe is called, the test's `tokio::spawn(... push ... )` already happens after subscribe (the dispatcher subscribes before calling synthesize.batch). If the mock drops notifications when nobody is subscribed yet, the test will need a small change to push notifications inside the handler closure (already the case here).
