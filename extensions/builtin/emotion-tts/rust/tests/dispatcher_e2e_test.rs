mod fixtures;

use std::sync::Arc;
use std::time::Duration;

use fixtures::fake_artifact_store::FakeArtifactStore;

use async_trait::async_trait;
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::dispatcher::{spawn_dispatcher, RunChannelRegistry, RunEvent};
use emotion_tts_extension::domain::{DeploymentId, MappingId, RunId, VoiceAssetId};
use emotion_tts_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    SharedLease,
};
use emotion_tts_extension::queue::{RunClass, RuntimeQueue};
use emotion_tts_extension::storage::repo_traits::{
    CharacterMappingRow, DeploymentRow, RunRow, VoiceAssetRow,
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
