mod fixtures;

use std::collections::BTreeMap;
use std::sync::Arc;
use std::time::Duration;

use fixtures::fake_artifact_store::FakeArtifactStore;

use async_trait::async_trait;
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::dispatcher::{spawn_dispatcher, RunChannelRegistry, RunEvent};
use emotion_tts_extension::domain::cache_key::{build as build_cache_key, CacheKeyInput};
use emotion_tts_extension::domain::emotion::EmotionPayload;
use emotion_tts_extension::domain::{DeploymentId, MappingId, PresetId, RunId, VoiceAssetId};
use emotion_tts_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    SharedLease,
};
use emotion_tts_extension::queue::{RunClass, RuntimeQueue};
use emotion_tts_extension::storage::repo_traits::{
    CharacterMappingRow, DeploymentRow, RunRow, SynthesisCacheRow, VectorPresetRow, VoiceAssetRow,
};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::{domain::RuntimeLeaseId, MIGRATIONS};
use serde_json::json;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tokio::sync::mpsc;

// ---------------------------------------------------------------------------
// Channel-based mock lease
//
// The existing `MockBackendRuntimeLease` in `fixtures/mock_backend.rs` uses a
// snapshot-based `subscribe_notifications` (returns items buffered *before*
// subscribe is called). The dispatcher calls `subscribe_notifications` once
// then immediately fires `synthesize.batch`, so any notifications pushed
// inside the RPC handler arrive *after* the snapshot was taken and are never
// seen by the drain loop.
//
// This file-local mock replaces that with an mpsc channel so notifications
// pushed at any time after subscribe are delivered to the stream.
// ---------------------------------------------------------------------------

struct ChannelLease {
    id: RuntimeLeaseId,
    /// Receiver wrapped in a Mutex so `subscribe_notifications` can take it
    /// exactly once (the dispatcher only subscribes once per run).
    notif_rx: tokio::sync::Mutex<Option<mpsc::UnboundedReceiver<NotificationEnvelope>>>,
    /// Synchronous RPC handler — returns Ok(value) or Err(LeaseError).
    handler: Arc<dyn Fn(&str, serde_json::Value) -> Result<serde_json::Value, LeaseError> + Send + Sync>,
}

impl ChannelLease {
    fn new(
        handler: impl Fn(&str, serde_json::Value) -> Result<serde_json::Value, LeaseError>
            + Send
            + Sync
            + 'static,
    ) -> (Arc<Self>, mpsc::UnboundedSender<NotificationEnvelope>) {
        let (tx, rx) = mpsc::unbounded_channel();
        let lease = Arc::new(Self {
            id: RuntimeLeaseId::new(),
            notif_rx: tokio::sync::Mutex::new(Some(rx)),
            handler: Arc::new(handler),
        });
        (lease, tx)
    }
}

#[async_trait]
impl BackendRuntimeLease for ChannelLease {
    fn id(&self) -> RuntimeLeaseId {
        self.id.clone()
    }

    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }

    async fn send_rpc(
        &self,
        method: &str,
        params: serde_json::Value,
    ) -> Result<serde_json::Value, LeaseError> {
        (self.handler)(method, params)
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        let rx = self
            .notif_rx
            .lock()
            .await
            .take()
            .expect("subscribe_notifications called more than once on ChannelLease");
        let stream = tokio_stream::wrappers::UnboundedReceiverStream::new(rx);
        Box::pin(stream)
    }

    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

// ---------------------------------------------------------------------------
// StaticLeaseFactory — always hands out the same pre-built Arc<dyn Lease>.
// ---------------------------------------------------------------------------

struct StaticLeaseFactory(SharedLease);

#[async_trait]
impl LeaseFactory for StaticLeaseFactory {
    async fn acquire(&self) -> emotion_tts_extension::domain::Result<SharedLease> {
        Ok(self.0.clone())
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory SQLite pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {e}", m.name));
    }
    pool
}

// ---------------------------------------------------------------------------
// The test
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_emits_segment_events_and_runs_to_completion() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_dispatcher").unwrap();
    let now = Utc::now().timestamp();

    // Seed deployment.
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "E2E Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Seed voice asset — audio_artifact_ref is the path the voice resolver returns.
    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice.wav".into(),
            content_sha256: "a".repeat(64),
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

    // Seed character mapping for "Narrator" → voice_id.
    repos
        .mappings
        .insert(&CharacterMappingRow {
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
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

    // Seed run row. The script is an untagged line so the parser assigns
    // character "Narrator" — matches the mapping above.
    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Narrator: Hello world.".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "force_regenerate".into(),
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

    // Build ChannelLease. The RPC handler for `synthesize.batch` reads the
    // first segment_id from the params, then spawns a task that pushes
    // camelCase notifications through the mpsc channel. The camelCase keys
    // match what `forward_notification` in run_loop.rs reads (segmentId,
    // runId, durationMs, outputPathAbs — fixed in Task 9).
    let (lease, notif_tx) = ChannelLease::new(move |method, _params| {
        if method != "synthesize.batch" {
            return Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {method}"),
            });
        }
        // Return immediately. Notifications are pushed by a separate task
        // polling the DB for the utterance row — no segment_id needed here.
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    // Spawn the notification-pusher task.  We do this *before* handing the
    // lease to the provider so the channel is open, but the notifications
    // themselves are delayed slightly to arrive after the drain loop starts.
    let notif_tx_clone = notif_tx.clone();
    let run_id_notif = run_id.as_str().to_string();
    // We need the segment_id, but we don't know it until dispatch happens.
    // Instead, we watch the DB: once an utterance row appears for the run,
    // we read its utterance_id and push the notifications using that id.
    let repos_for_notifier = repos.clone();
    let run_id_for_notifier = run_id.clone();
    tokio::spawn(async move {
        // Poll until the utterance row has been inserted by dispatch_inner.
        let segment_id = loop {
            tokio::time::sleep(Duration::from_millis(10)).await;
            let rows = repos_for_notifier
                .utterances
                .list_by_run(&run_id_for_notifier)
                .await
                .unwrap_or_default();
            if let Some(row) = rows.first() {
                break row.utterance_id.as_str().to_string();
            }
        };

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_started".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
            }),
        });

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_completed".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
                "durationMs": 1234,
                "outputPathAbs": "/tmp/out.wav",
            }),
        });
    });

    // Wire the dispatcher.
    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        None,
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    // Enqueue the run.
    queue
        .enqueue(run_id.clone(), dep.as_str(), RunClass::Batch)
        .await;

    // Poll until the dispatcher registers the per-run channel (small race
    // window between enqueue and the dispatcher calling registry.register).
    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    // Drain events until RunTerminal arrives (or 10s timeout).
    let collected = tokio::time::timeout(Duration::from_secs(10), async {
        let mut events = Vec::new();
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    let terminal = matches!(ev, RunEvent::RunTerminal { .. });
                    events.push(ev);
                    if terminal {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
        events
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    // Assert: SegmentStarted observed.
    assert!(
        collected
            .iter()
            .any(|e| matches!(e, RunEvent::SegmentStarted { .. })),
        "expected SegmentStarted event; got: {collected:?}"
    );

    // Assert: SegmentCompleted observed.
    assert!(
        collected
            .iter()
            .any(|e| matches!(e, RunEvent::SegmentCompleted { .. })),
        "expected SegmentCompleted event; got: {collected:?}"
    );

    // Assert: RunTerminal status is "completed".
    let terminal_status = collected
        .iter()
        .find_map(|e| match e {
            RunEvent::RunTerminal { status, .. } => Some(status.as_str()),
            _ => None,
        })
        .expect("RunTerminal must be present in collected events");
    assert_eq!(
        terminal_status, "completed",
        "expected terminal status 'completed', got {terminal_status:?}"
    );

    // Assert: DB run row reflects "completed".
    let final_row = repos
        .runs
        .get(&run_id)
        .await
        .unwrap()
        .expect("run row must exist");
    assert_eq!(
        final_row.status, "completed",
        "DB run row status should be 'completed', got {:?}",
        final_row.status
    );
}

// ---------------------------------------------------------------------------
// Test: dispatcher writes ExportHistoryRow when artifact store is wired
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_writes_export_history_on_completed_run() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_export").unwrap();
    let now = Utc::now().timestamp();

    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Export Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice_export.wav".into(),
            content_sha256: "b".repeat(64),
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
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
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
            script_snapshot: "Narrator: Hello world.".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "force_regenerate".into(),
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

    // Write a real WAV stub to a temp file so build_zip_bytes can read it.
    let wav_dir = std::env::temp_dir().join("nexus-emotion-tts-test-export");
    std::fs::create_dir_all(&wav_dir).unwrap();
    let wav_path = wav_dir.join("seg_000.wav");
    std::fs::write(&wav_path, b"RIFF\0\0\0\0WAVEfmt ").unwrap();
    let wav_path_str = wav_path.to_string_lossy().into_owned();

    let wav_path_for_notifier = wav_path_str.clone();
    let (lease, notif_tx) = ChannelLease::new(move |method, _params| {
        if method != "synthesize.batch" {
            return Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {method}"),
            });
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    let notif_tx_clone = notif_tx.clone();
    let run_id_notif = run_id.as_str().to_string();
    let repos_for_notifier = repos.clone();
    let run_id_for_notifier = run_id.clone();
    tokio::spawn(async move {
        let segment_id = loop {
            tokio::time::sleep(Duration::from_millis(10)).await;
            let rows = repos_for_notifier
                .utterances
                .list_by_run(&run_id_for_notifier)
                .await
                .unwrap_or_default();
            if let Some(row) = rows.first() {
                break row.utterance_id.as_str().to_string();
            }
        };

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_started".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
            }),
        });

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_completed".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
                "durationMs": 1234,
                "outputPathAbs": wav_path_for_notifier,
            }),
        });
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let artifact_store: Arc<dyn emotion_tts_extension::host_contract::HostArtifactStore> =
        Arc::new(FakeArtifactStore::new());

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        Some(artifact_store),
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    queue
        .enqueue(run_id.clone(), dep.as_str(), RunClass::Batch)
        .await;

    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    // Give the export write a moment to complete — it runs after the terminal
    // event is emitted but in the same task as dispatch_inner.
    tokio::time::sleep(Duration::from_millis(50)).await;

    // Assert: an ExportHistoryRow was inserted for this run.
    let export_row = repos
        .exports
        .get_latest_for_run(&run_id)
        .await
        .expect("repo query must not fail")
        .expect("ExportHistoryRow must exist for a completed run with artifact store wired");

    assert_eq!(
        export_row.run_id.as_ref().map(|id| id.as_str()),
        Some(run_id.as_str()),
        "export row must reference the correct run"
    );

    // Smoke-check: the DB run row also reflects "completed".
    let final_row = repos
        .runs
        .get(&run_id)
        .await
        .unwrap()
        .expect("run row must exist");
    assert_eq!(
        final_row.status, "completed",
        "DB run row status should be 'completed', got {:?}",
        final_row.status
    );
}

// ---------------------------------------------------------------------------
// Test: cache-hit-only run never calls synthesize.batch
// ---------------------------------------------------------------------------
//
// Pre-seeds a SynthesisCacheRow whose content_hash exactly matches what
// prepare() computes for the single segment in "Narrator: Hello world." with
// cache_policy="use_cache". Asserts:
//   - synthesize.batch handler call count is 0 (RPC short-circuited)
//   - run row reaches "completed"
//   - utterance row has cache_hit=true + cached audio_artifact_ref
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn dispatcher_serves_cache_hits_without_calling_worker() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_cache_hit").unwrap();
    let now = Utc::now().timestamp();

    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Cache Hit Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Use "c".repeat(64) — valid 64-char lowercase hex, distinct from the
    // other two tests so their pools don't interfere.
    let voice_sha256 = "c".repeat(64);
    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice_cache_hit.wav".into(),
            content_sha256: voice_sha256.clone(),
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
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
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

    // Seed run with cache_policy="use_cache". Without this the dispatcher
    // skips the cache lookup entirely and the test would falsely pass for
    // the wrong reason.
    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Narrator: Hello world.".into(),
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

    // Compute the same hash that prepare() will compute for the single segment.
    // The inputs mirror prepare.rs exactly:
    //   extension_version  → passed to spawn_dispatcher as "0.0.0-test"
    //   runtime_version    → FALLBACK_RUNTIME_VERSION ("unknown-runtime")
    //                         because no handshake has populated
    //                         LeaseProvider::cached_handshake in this test
    //   model_version      → FALLBACK_MODEL_VERSION ("unknown-model")
    //   model_family       → FALLBACK_MODEL_FAMILY ("unknown-model")
    //   text               → dialogue parser treats "Narrator: Hello world." as an
    //                         UNTAGGED line (no leading `[`), so the full trimmed
    //                         line becomes the utterance text unchanged.
    //   speaker_ref_sha256 → voice_sha256 above
    //   seed               → run.base_seed = 42
    //   speed_factor       → run.speed_factor = 1.0
    //   speed_mode         → run.speed_mode = "preserve_pitch"
    //   output_format      → run.output_format = "wav"
    let cache_input = CacheKeyInput {
        extension_version: "0.0.0-test".into(),
        runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
        model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
        model_family: emotion_tts_extension::backend_client::FALLBACK_MODEL_FAMILY.into(),
        text: "Narrator: Hello world.".into(),
        speaker_ref_sha256: voice_sha256,
        emotion: EmotionPayload::None,
        generation_params: BTreeMap::new(),
        seed: 42,
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".into(),
        output_format: "wav".into(),
    };
    let hash = build_cache_key(&cache_input).expect("cache key must build for valid inputs");

    repos
        .cache
        .insert(&SynthesisCacheRow {
            content_hash: hash.clone(),
            audio_artifact_ref: "/tmp/cached_seg.wav".into(),
            extension_version: "0.0.0-test".into(),
            runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
            model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
            size_bytes: 100,
            hit_count: 0,
            created_at: now,
            last_hit_at: now,
        })
        .await
        .unwrap();

    // Build a lease whose synthesize.batch handler counts every call.
    // The count must remain zero — cache hits skip the RPC entirely.
    let call_count = Arc::new(std::sync::atomic::AtomicUsize::new(0));
    let counter = call_count.clone();
    let (lease, _notif_tx) = ChannelLease::new(move |method, _params| {
        if method == "synthesize.batch" {
            counter.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        None,
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    queue
        .enqueue(run_id.clone(), dep.as_str(), RunClass::Batch)
        .await;

    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    assert_eq!(
        call_count.load(std::sync::atomic::Ordering::SeqCst),
        0,
        "synthesize.batch must not be called when every segment is a cache hit"
    );

    let final_row = repos
        .runs
        .get(&run_id)
        .await
        .unwrap()
        .expect("run row must exist");
    assert_eq!(
        final_row.status, "completed",
        "run must reach 'completed' on all-cache-hit path, got {:?}",
        final_row.status
    );

    // Utterance row must reflect cache_hit=true and the cached audio_artifact_ref.
    let utts = repos
        .utterances
        .list_by_run(&run_id)
        .await
        .expect("utterance query must not fail");
    assert_eq!(utts.len(), 1, "expected exactly one utterance row");
    let utt = &utts[0];
    assert!(utt.cache_hit, "utterance must have cache_hit=true");
    assert_eq!(
        utt.audio_artifact_ref.as_deref(),
        Some("/tmp/cached_seg.wav"),
        "utterance must reference the pre-seeded cached audio file"
    );
}

// ---------------------------------------------------------------------------
// Test: resume run reuses cache rows from the original run
// ---------------------------------------------------------------------------
//
// Seeds an original run (status=partial) and a cache row whose hash matches
// what the dispatcher will compute for the single segment. Then enqueues a
// NEW resume run that points at the original via `original_run_id`. Asserts:
//   - synthesize.batch handler call count is 0 (cache hit short-circuits)
//   - all utterance rows for the resume run have cache_hit=true
//   - all utterance rows have source_run_id=Some(original_run_id) (C2 fix)
//   - resume run reaches "completed"
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn resume_run_reuses_cache_from_original() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_resume_cache").unwrap();
    let now = Utc::now().timestamp();

    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Resume Cache Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Use "d".repeat(64) — distinct from the other three tests.
    let voice_sha256 = "d".repeat(64);
    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice_resume.wav".into(),
            content_sha256: voice_sha256.clone(),
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
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
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

    // Insert an original run that ended in `partial`.
    let original_run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: original_run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "partial".into(),
            script_snapshot: "Narrator: Hello world.".into(),
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
            started_at: Some(now),
            finished_at: Some(now),
            error_category: None,
            error_detail: None,
        })
        .await
        .unwrap();

    // Pre-seed the cache row with the same hash prepare() will compute for the
    // single segment in "Narrator: Hello world." with the voice above.
    // Without a populated handshake the runtime/model version fields take
    // the FALLBACK_* sentinels — see comment in the cache_hit test above.
    let cache_input = CacheKeyInput {
        extension_version: "0.0.0-test".into(),
        runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
        model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
        model_family: emotion_tts_extension::backend_client::FALLBACK_MODEL_FAMILY.into(),
        text: "Narrator: Hello world.".into(),
        speaker_ref_sha256: voice_sha256,
        emotion: EmotionPayload::None,
        generation_params: BTreeMap::new(),
        seed: 42,
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".into(),
        output_format: "wav".into(),
    };
    let hash = build_cache_key(&cache_input).expect("cache key must build for valid inputs");

    repos
        .cache
        .insert(&SynthesisCacheRow {
            content_hash: hash.clone(),
            audio_artifact_ref: "/tmp/resume_cached_seg.wav".into(),
            extension_version: "0.0.0-test".into(),
            runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
            model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
            size_bytes: 100,
            hit_count: 0,
            created_at: now,
            last_hit_at: now,
        })
        .await
        .unwrap();

    // Insert the resume run: same script, points at the original via original_run_id.
    let resume_run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: resume_run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Narrator: Hello world.".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "fixed".into(),
            base_seed: 42,
            original_run_id: Some(original_run_id.clone()),
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

    // Build a lease whose synthesize.batch handler counts every call.
    // The count must remain zero — cache hits skip the RPC entirely.
    let call_count = Arc::new(std::sync::atomic::AtomicUsize::new(0));
    let counter = call_count.clone();
    let (lease, _notif_tx) = ChannelLease::new(move |method, _params| {
        if method == "synthesize.batch" {
            counter.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        None,
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    queue
        .enqueue(resume_run_id.clone(), dep.as_str(), RunClass::Resume)
        .await;

    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(resume_run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    assert_eq!(
        call_count.load(std::sync::atomic::Ordering::SeqCst),
        0,
        "synthesize.batch must not be called when every segment is a cache hit on resume"
    );

    let final_row = repos
        .runs
        .get(&resume_run_id)
        .await
        .unwrap()
        .expect("resume run row must exist");
    assert_eq!(
        final_row.status, "completed",
        "resume run must reach 'completed' on all-cache-hit path, got {:?}",
        final_row.status
    );

    // All utterance rows for the resume run must have cache_hit=true and
    // source_run_id pointing at the original run (C2 fix).
    let utts = repos
        .utterances
        .list_by_run(&resume_run_id)
        .await
        .expect("utterance query must not fail");
    assert_eq!(utts.len(), 1, "expected exactly one utterance row for resume run");
    let utt = &utts[0];
    assert!(utt.cache_hit, "utterance must have cache_hit=true on resume");
    assert_eq!(
        utt.source_run_id.as_ref().map(|id| id.as_str()),
        Some(original_run_id.as_str()),
        "utterance source_run_id must equal the original run id (C2 fix)"
    );
}

// ---------------------------------------------------------------------------
// Test: raw_text run uses deployment default voice when no character mapping
// exists
// ---------------------------------------------------------------------------
//
// Seeds a deployment with `default_voice_asset_id` set to a real voice, but
// does NOT insert any CharacterMappingRow. Enqueues a run with
// parser_mode="raw_text" and script="Hello.\nWorld." — the raw_text parser
// attributes both lines to "Narrator" (no character tag). With no mapping for
// "Narrator" the prepare() path must fall back to the deployment's
// `default_voice_asset_id` (G3 fallback) rather than returning a Conflict
// error.
//
// Validates G3 + G1 together. Pins the Quick voice mode contract:
// adding a default voice unblocks plain-text synthesis without any
// per-character setup.
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn raw_text_run_uses_deployment_default_voice() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_quick").unwrap();
    let now = Utc::now().timestamp();

    // Voice asset — the default voice the deployment will fall back to.
    // Use "f".repeat(64) — distinct sha256 from all other tests.
    let voice_sha256 = "f".repeat(64);
    let voice_id = VoiceAssetId::new();
    let voice_wav = std::env::temp_dir()
        .join(format!("voice-quick-{}.wav", voice_id.as_str()));
    std::fs::write(&voice_wav, b"RIFF\0\0\0\0WAVEfmt ").unwrap();
    let voice_wav_str = voice_wav.to_string_lossy().into_owned();

    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Default".into(),
            kind: "speaker".into(),
            audio_artifact_ref: voice_wav_str,
            content_sha256: voice_sha256,
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

    // Deployment WITH default_voice_asset_id set — the key difference from
    // all other tests which use None here.
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Quick Mode Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: Some(voice_id.clone()),
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // NO character mappings — this is the whole point of the test.

    // Run with parser_mode="raw_text" and a two-line script. The raw_text
    // parser attributes both lines to "Narrator"; without a mapping and
    // without a default_voice_asset_id this would error. With the default
    // set, prepare() should succeed and produce two UtterancePlan entries.
    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Hello.\nWorld.".into(),
            parser_mode: "raw_text".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "force_regenerate".into(),
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

    // The two-line script produces 2 utterances. We write a WAV stub for the
    // output of each segment so any downstream read succeeds.
    let wav_dir = std::env::temp_dir().join("nexus-emotion-tts-test-quick");
    std::fs::create_dir_all(&wav_dir).unwrap();

    let (lease, notif_tx) = ChannelLease::new(move |method, _params| {
        if method != "synthesize.batch" {
            return Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {method}"),
            });
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    // Notification pusher: poll until both utterance rows exist, then push
    // segment_started + segment_completed for each one in sequence.
    let notif_tx_clone = notif_tx.clone();
    let run_id_notif = run_id.as_str().to_string();
    let repos_for_notifier = repos.clone();
    let run_id_for_notifier = run_id.clone();
    let wav_dir_for_notifier = wav_dir.clone();
    tokio::spawn(async move {
        // Poll until both utterance rows appear (prepare() inserts them before
        // starting the worker RPC).
        let segment_ids = loop {
            tokio::time::sleep(Duration::from_millis(10)).await;
            let rows = repos_for_notifier
                .utterances
                .list_by_run(&run_id_for_notifier)
                .await
                .unwrap_or_default();
            if rows.len() >= 2 {
                break rows
                    .into_iter()
                    .map(|r| r.utterance_id.as_str().to_string())
                    .collect::<Vec<_>>();
            }
        };

        for segment_id in segment_ids {
            // Write a stub WAV to the expected output path so downstream
            // reads succeed if anything tries to open the file.
            let stub_path = wav_dir_for_notifier.join(format!("{}.wav", &segment_id));
            let _ = std::fs::write(&stub_path, b"RIFF\0\0\0\0WAVEfmt ");
            let output_path = stub_path.to_string_lossy().into_owned();

            tokio::time::sleep(Duration::from_millis(20)).await;
            let _ = notif_tx_clone.send(NotificationEnvelope {
                method: "segment_started".into(),
                params: json!({
                    "segmentId": segment_id,
                    "runId": run_id_notif,
                }),
            });

            tokio::time::sleep(Duration::from_millis(20)).await;
            let _ = notif_tx_clone.send(NotificationEnvelope {
                method: "segment_completed".into(),
                params: json!({
                    "segmentId": segment_id,
                    "runId": run_id_notif,
                    "durationMs": 500,
                    "outputPathAbs": output_path,
                }),
            });
        }
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        None,
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    queue
        .enqueue(run_id.clone(), dep.as_str(), RunClass::Batch)
        .await;

    // Poll until the dispatcher registers the per-run channel.
    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    // Drain events until RunTerminal arrives (or 15s timeout for 2 segments).
    tokio::time::timeout(Duration::from_secs(15), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 15s");

    // Assert 1: utterance rows exist — prepare() ran and produced segments
    // without erroring on "no mapping for Narrator".
    let utts = repos
        .utterances
        .list_by_run(&run_id)
        .await
        .expect("utterance query must not fail");
    assert!(
        !utts.is_empty(),
        "prepare() should have produced utterance rows for raw_text script with default voice"
    );

    // Assert 2: run did not fail with an unmapped-character error. The
    // G3 fallback must have delivered the default voice for every utterance.
    let final_row = repos
        .runs
        .get(&run_id)
        .await
        .unwrap()
        .expect("run row must exist");
    assert_ne!(
        final_row.status, "failed",
        "run should not fail on unmapped characters when default voice is set; got status {:?}",
        final_row.status
    );
}

// ---------------------------------------------------------------------------
// Test: test_line run does NOT write cache rows and does NOT write export ZIP
// ---------------------------------------------------------------------------
//
// Enqueues a run with kind="test_line" and cache_policy="use_cache" (so the
// cache-write code path would run for a normal batch run). Also wires in a
// real FakeArtifactStore (so the export-write code path would also run for a
// normal batch run). The mock handler writes a WAV stub to disk so that
// build_zip_bytes could succeed *if* it were called.
//
// After RunTerminal, asserts:
//   - synthesis_cache table is empty (cache.total_size_bytes() == 0)
//   - exports.get_latest_for_run() returns None
//   - run row status = "completed"
//
// Validates F1's two gates (is_test_line short-circuits both side-effects).
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn test_line_skips_cache_and_export() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_line_gates").unwrap();
    let now = Utc::now().timestamp();

    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Test-Line Gate Test Deployment".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Use "e".repeat(64) — distinct sha256 from all other tests.
    let voice_sha256 = "e".repeat(64);
    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice_test_line.wav".into(),
            content_sha256: voice_sha256,
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
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
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

    // Seed the run row with kind="test_line" and cache_policy="use_cache".
    // The dispatcher reads run.kind from this row to decide whether to apply
    // the cache-write and export-write gates (both are skipped when
    // is_test_line=true). Using cache_policy="use_cache" ensures the cache
    // lookup path runs; the gate we're testing is the *write* path.
    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "test_line".into(),
            status: "queued".into(),
            script_snapshot: "Narrator: Hello world.".into(),
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

    // Write a real WAV stub to a temp file so build_zip_bytes *could* read it
    // if the export gate were absent. This is defensive — the test asserts that
    // the export path is never reached at all.
    let wav_dir = std::env::temp_dir().join("nexus-emotion-tts-test-test-line");
    std::fs::create_dir_all(&wav_dir).unwrap();
    let wav_path = wav_dir.join("seg_000_tl.wav");
    std::fs::write(&wav_path, b"RIFF\0\0\0\0WAVEfmt ").unwrap();
    let wav_path_str = wav_path.to_string_lossy().into_owned();

    let wav_path_for_notifier = wav_path_str.clone();
    let (lease, notif_tx) = ChannelLease::new(move |method, _params| {
        if method != "synthesize.batch" {
            return Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {method}"),
            });
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    let notif_tx_clone = notif_tx.clone();
    let run_id_notif = run_id.as_str().to_string();
    let repos_for_notifier = repos.clone();
    let run_id_for_notifier = run_id.clone();
    tokio::spawn(async move {
        let segment_id = loop {
            tokio::time::sleep(Duration::from_millis(10)).await;
            let rows = repos_for_notifier
                .utterances
                .list_by_run(&run_id_for_notifier)
                .await
                .unwrap_or_default();
            if let Some(row) = rows.first() {
                break row.utterance_id.as_str().to_string();
            }
        };

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_started".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
            }),
        });

        tokio::time::sleep(Duration::from_millis(20)).await;
        let _ = notif_tx_clone.send(NotificationEnvelope {
            method: "segment_completed".into(),
            params: json!({
                "segmentId": segment_id,
                "runId": run_id_notif,
                "durationMs": 1234,
                "outputPathAbs": wav_path_for_notifier,
            }),
        });
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    // Wire a real FakeArtifactStore so the export-write code path would run
    // if the is_test_line gate were absent.
    let artifact_store: Arc<dyn emotion_tts_extension::host_contract::HostArtifactStore> =
        Arc::new(FakeArtifactStore::new());

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        Some(artifact_store),
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    // Enqueue via the test-line priority slot. The dispatcher's gating reads
    // run.kind from the DB row ("test_line") — the queue class is consistent
    // with that but the gate does NOT use it.
    queue
        .enqueue_test_line(run_id.clone(), dep.as_str())
        .await
        .expect("test-line slot must be free");

    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    // Give any async post-terminal writes a moment to settle — they should not
    // exist for test_line, but we want to catch any latent write, not race past it.
    tokio::time::sleep(Duration::from_millis(50)).await;

    // Assert: cache table is empty — test_line must NOT pollute the cache.
    assert_eq!(
        repos.cache.total_size_bytes().await.unwrap(),
        0,
        "test_line must NOT pollute the synthesis cache"
    );

    // Assert: no export history row — test_line must NOT produce an export ZIP.
    assert!(
        repos
            .exports
            .get_latest_for_run(&run_id)
            .await
            .unwrap()
            .is_none(),
        "test_line must NOT produce an export ZIP"
    );

    // Smoke: run row reached "completed".
    let final_row = repos
        .runs
        .get(&run_id)
        .await
        .unwrap()
        .expect("run row must exist");
    assert_eq!(
        final_row.status, "completed",
        "test_line run must still reach 'completed', got {:?}",
        final_row.status
    );
}

// ---------------------------------------------------------------------------
// Test: per-character mapping vector_preset default flows into the cache key
// ---------------------------------------------------------------------------
//
// Backlog Task 2 — `domain::emotion::resolve()` precedence:
//   inline > legacy_ref > mapping > global > none
//
// Seeds:
//   - a vector preset with a known [f64; 8]
//   - a character mapping for "Narrator" with default_emotion_mode="vector_preset"
//     pointing at that preset
//   - a SynthesisCacheRow whose content_hash is computed using the EXPECTED
//     emotion payload — `EmotionPayload::EmotionVector { vector, alpha: 1.0 }`
//
// If prepare() correctly applies the mapping default through `resolve()`,
// the per-utterance cache_input.emotion will match the seeded row and the
// utterance will land with cache_hit=true.
//
// If prepare() regresses to using a global EmotionPayload::None, the hash
// will not match the seeded row and the test will fail (cache_hit=false).
//
// This pins the contract that mapping defaults are resolved per-utterance
// rather than ignored in favor of the run-level global emotion.
// ---------------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn mapping_vector_preset_default_applied_to_cache_key() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let dep = DeploymentId::try_from("dep_test_vec_preset").unwrap();
    let now = Utc::now().timestamp();

    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "host:test".into(),
            display_name: "Vector Preset Mapping Default Test".into(),
            backend_runtime_preference: None,
            default_output_format: "wav".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: false,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Distinct sha256 from all other tests in this file.
    let voice_sha256 = "9".repeat(64);
    let voice_id = VoiceAssetId::new();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep.clone(),
            display_name: "Narrator".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "/tmp/fake_voice_vec_preset.wav".into(),
            content_sha256: voice_sha256.clone(),
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

    // Seed the vector preset with a known 8-tuple. The order matches
    // VECTOR_KEYS = [happy, angry, sad, afraid, disgusted, melancholic,
    // surprised, calm] but the emotion resolver does not validate order —
    // it just round-trips the array.
    let preset_id = PresetId::new();
    let vector: [f64; 8] = [0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.1];
    let vector_json = serde_json::to_string(&vector).unwrap();
    repos
        .presets
        .insert(&VectorPresetRow {
            preset_id: preset_id.clone(),
            deployment_id: dep.clone(),
            preset_name: "happy_calm".into(),
            vector_json,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    // Mapping with vector_preset default — the unit under test.
    repos
        .mappings
        .insert(&CharacterMappingRow {
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: "Narrator".into(),
            character_name_lower: "narrator".into(),
            speaker_voice_asset_id: voice_id.clone(),
            default_emotion_mode: "vector_preset".into(),
            default_emotion_voice_asset_id: None,
            default_vector_preset_id: Some(preset_id.clone()),
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

    // Run with cache_policy="use_cache" so the cache lookup path runs.
    let run_id = RunId::new();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "queued".into(),
            script_snapshot: "Narrator: Hello world.".into(),
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

    // Build the cache key prepare() is expected to produce. The emotion
    // payload reflects the mapping default — vector preset with alpha=1.0
    // (no inline alpha, no mapping alpha column → resolver default).
    let expected_cache_input = CacheKeyInput {
        extension_version: "0.0.0-test".into(),
        runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
        model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
        model_family: emotion_tts_extension::backend_client::FALLBACK_MODEL_FAMILY.into(),
        text: "Narrator: Hello world.".into(),
        speaker_ref_sha256: voice_sha256.clone(),
        emotion: EmotionPayload::EmotionVector {
            vector,
            alpha: 1.0,
        },
        generation_params: BTreeMap::new(),
        seed: 42,
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".into(),
        output_format: "wav".into(),
    };
    let expected_hash = build_cache_key(&expected_cache_input)
        .expect("expected cache key must build for valid inputs");

    // Sanity: the same hash with EmotionPayload::None must differ — this
    // is what would land if the regression returned (mapping ignored).
    let regression_input = CacheKeyInput {
        emotion: EmotionPayload::None,
        ..expected_cache_input.clone()
    };
    let regression_hash = build_cache_key(&regression_input)
        .expect("regression cache key must build for valid inputs");
    assert_ne!(
        expected_hash.as_str(),
        regression_hash.as_str(),
        "test setup invariant: mapping-applied hash MUST differ from no-emotion hash"
    );

    repos
        .cache
        .insert(&SynthesisCacheRow {
            content_hash: expected_hash.clone(),
            audio_artifact_ref: "/tmp/cached_vec_preset_seg.wav".into(),
            extension_version: "0.0.0-test".into(),
            runtime_version: emotion_tts_extension::backend_client::FALLBACK_RUNTIME_VERSION.into(),
            model_version: emotion_tts_extension::backend_client::FALLBACK_MODEL_VERSION.into(),
            size_bytes: 100,
            hit_count: 0,
            created_at: now,
            last_hit_at: now,
        })
        .await
        .unwrap();

    let call_count = Arc::new(std::sync::atomic::AtomicUsize::new(0));
    let counter = call_count.clone();
    let (lease, _notif_tx) = ChannelLease::new(move |method, _params| {
        if method == "synthesize.batch" {
            counter.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        }
        Ok(json!({"request_id": "x", "status": "ok", "segments": []}))
    });

    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(RunChannelRegistry::new());
    let provider = Arc::new(LeaseProvider::new(Arc::new(StaticLeaseFactory(
        lease as SharedLease,
    ))));

    let _handle = spawn_dispatcher(
        queue.clone(),
        repos.clone(),
        provider,
        registry.clone(),
        None,
        "0.0.0-test",
        std::env::temp_dir().join(emotion_tts_extension::FALLBACK_RUNS_DIR),
    );

    queue
        .enqueue(run_id.clone(), dep.as_str(), RunClass::Batch)
        .await;

    let mut rx = None;
    for _ in 0..100 {
        if let Some(r) = registry.subscribe(run_id.as_str()).await {
            rx = Some(r);
            break;
        }
        tokio::time::sleep(Duration::from_millis(20)).await;
    }
    let mut rx = rx.expect("dispatcher should register run channel within 2s");

    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            match rx.recv().await {
                Ok(ev) => {
                    if matches!(ev, RunEvent::RunTerminal { .. }) {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
    })
    .await
    .expect("dispatcher should reach RunTerminal within 10s");

    // Worker must NOT be invoked — the seeded cache row only matches when
    // prepare() correctly applied the mapping vector preset default.
    assert_eq!(
        call_count.load(std::sync::atomic::Ordering::SeqCst),
        0,
        "synthesize.batch must not be called: the cache row matches only \
         when the per-character vector_preset default flows into the cache key"
    );

    let utts = repos
        .utterances
        .list_by_run(&run_id)
        .await
        .expect("utterance query must not fail");
    assert_eq!(utts.len(), 1, "expected exactly one utterance row");
    let utt = &utts[0];
    assert!(
        utt.cache_hit,
        "utterance must be a cache hit — proves prepare() applied the \
         mapping vector_preset default through domain::emotion::resolve()"
    );
    assert_eq!(
        utt.content_hash.as_deref(),
        Some(expected_hash.as_str()),
        "utterance content_hash must equal the hash built with the \
         mapping's vector emotion (vs. EmotionPayload::None regression hash {})",
        regression_hash.as_str()
    );
    assert_eq!(
        utt.audio_artifact_ref.as_deref(),
        Some("/tmp/cached_vec_preset_seg.wav"),
        "utterance must reference the pre-seeded cached audio file"
    );
}
