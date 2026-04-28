//! Single-run handler — pulled out so it can be tested independently
//! and so the outer loop can panic-isolate each iteration.

use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Duration;

use chrono::Utc;
use futures::StreamExt;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::prepare::{prepare, PrepareConfig};
use crate::dispatcher::{RunChannelRegistry, RunEvent};
use crate::domain::EmotionTtsError;
use crate::host_contract::{HostArtifactStore, NotificationEnvelope};
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
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    extension_version: String,
    output_root_base: PathBuf,
) {
    let run_id = qrun.run_id.clone();
    let run_id_str = run_id.as_str().to_string();
    let (tx, _guard) = registry.register(run_id_str.clone()).await;

    let result = dispatch_inner(
        &qrun,
        &repos,
        &lease_provider,
        &tx,
        artifact_store,
        &extension_version,
        &output_root_base,
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
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    extension_version: &str,
    output_root_base: &Path,
) -> crate::domain::Result<String> {
    let run_id = &qrun.run_id;

    // Output dir: <base>/<deployment_id>/<run_id>/. The base is supplied
    // by the caller — typically `<host_data_dir>/extensions/<id>/runs`
    // when the host has wired in a data dir, or `temp_dir()/...` for
    // tests and minimal-config hosts (StubLeaseFactory path).
    let output_root = output_root_base
        .join(qrun.deployment_id.as_str())
        .join(run_id.as_str());

    // Pre-fetch all voice assets for this deployment so the prepare()
    // step's voice_path_resolver can be a synchronous HashMap lookup —
    // avoids tokio::task::block_in_place (which panics under
    // single-thread runtimes used by #[tokio::test]).
    let dep_id = crate::domain::DeploymentId::try_from(qrun.deployment_id.as_str())
        .map_err(|e| EmotionTtsError::internal(format!("invalid deployment id: {e}")))?;
    let dep_row = repos
        .deployments
        .get(&dep_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {dep_id}")))?;
    let voice_rows = repos.voice_assets.list_by_deployment(&dep_id).await?;
    let mut voice_paths: std::collections::HashMap<String, String> = std::collections::HashMap::new();
    let mut voice_sha256s: std::collections::HashMap<String, String> = std::collections::HashMap::new();
    for row in voice_rows {
        let key = row.voice_asset_id.as_str().to_string();
        // The voice_assets row's audio_artifact_ref is a host-internal
        // artifact reference (e.g., "blobs/1f/1f84...") — NOT an absolute
        // filesystem path. The worker needs an absolute path it can open.
        // Resolve through the host's artifact store when available; fall
        // back to the raw ref so tests that pre-populate absolute paths
        // continue to work.
        let resolved_path = if let Some(store) = artifact_store.as_ref() {
            match store.resolve_path(&row.audio_artifact_ref).await {
                Ok(abs) => abs,
                Err(err) => {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        voice_asset_id = key.as_str(),
                        artifact_ref = %row.audio_artifact_ref,
                        error = %err,
                        "artifact store could not resolve voice path; \
                         falling back to raw ref (worker will likely fail)"
                    );
                    row.audio_artifact_ref.clone()
                }
            }
        } else {
            row.audio_artifact_ref.clone()
        };
        voice_paths.insert(key.clone(), resolved_path);
        voice_sha256s.insert(key, row.content_sha256);
    }

    let voice_resolver: Arc<dyn Fn(&str) -> Option<String> + Send + Sync> =
        Arc::new(move |voice_asset_id: &str| -> Option<String> {
            voice_paths.get(voice_asset_id).cloned()
        });

    let voice_sha256_resolver: Arc<dyn Fn(&str) -> Option<String> + Send + Sync> =
        Arc::new(move |voice_asset_id: &str| -> Option<String> {
            voice_sha256s.get(voice_asset_id).cloned()
        });

    let cfg = PrepareConfig {
        output_root,
        voice_path_resolver: voice_resolver,
        voice_sha256_resolver,
        default_voice_asset_id: dep_row.default_voice_asset_id.clone(),
    };
    let prepared = prepare(repos, run_id, &cfg, extension_version).await?;

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
                    source_run_id: prepared.source_run_id.clone(),
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
                    source_run_id: prepared.source_run_id.clone(),
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

    // Fire SegmentCompleted SSE events up-front for cache hits so the
    // frontend's progress table fills immediately without waiting for the
    // worker to boot.
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

    // TODO(spec-035 follow-up): replace with `set_started_guarded` that
    // only transitions queued → running. Today this can race with a
    // cancel arriving between insert_many and set_started, overwriting
    // the cancelled status back to running.
    repos.runs.set_started(run_id, Utc::now().timestamp()).await?;

    // Acquire the lease (spawns the worker if needed; takes minutes on cold start).
    let client = lease_provider.spawn_if_needed().await?;
    let mut notifications = client.lease().subscribe_notifications().await;

    // Filter the batch payload to miss segments only — cache hits have
    // already been inserted as `completed` and don't need synthesis.
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

    // Dispatch the batch RPC and the notification draining concurrently.
    // The worker emits per-segment notifications while the RPC is in
    // flight; the RPC resolves once the entire batch is done.
    let segment_total = batch_input.segments.len();
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

    let batch_op = BatchSynthesizeOperator::new(Arc::new(client.clone()));
    let rpc_result: crate::domain::Result<BatchOutput> = if batch_input.segments.is_empty() {
        // All segments were cache hits — skip the worker RPC entirely.
        Ok(BatchOutput {
            request_id: batch_input.request_id.clone(),
            status: "ok".into(),
            segments: vec![],
        })
    } else {
        tokio::select! {
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
            result = batch_op.execute(batch_input.clone()) => result,
        }
    };

    // Wait briefly for trailing notifications, then forcibly abort the
    // drain task. Without the abort, the drain would keep writing
    // `segment_completed` to the DB after `process_one` has already
    // emitted `RunTerminal`, producing out-of-order SSE events and
    // stale row state.
    let mut drain = drain;
    if tokio::time::timeout(Duration::from_secs(2), &mut drain).await.is_err() {
        drain.abort();
    }

    if qrun.cancel.is_cancelled() {
        // Mark in-flight utterances as cancelled so the recomputed
        // terminal status (above) and any future read of the run reflect
        // the user's intent. Errors are logged but do not block the
        // cancel response — the run row itself is updated by process_one.
        let utts = repos.utterances.list_by_run(run_id).await.unwrap_or_default();
        for u in utts {
            if u.status == "running" || u.status == "queued" {
                if let Err(err) = repos
                    .utterances
                    .update_status(&u.utterance_id, "cancelled")
                    .await
                {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        utterance_id = u.utterance_id.as_str(),
                        error = %err,
                        "failed to mark in-flight utterance cancelled"
                    );
                }
            }
        }
        return Ok("cancelled".to_string());
    }

    let _output = rpc_result?;

    // Test-line runs are single-segment fast-lane previews — they MUST
    // NOT pollute the cache (the user is iterating on a line, each run
    // is throwaway) and MUST NOT produce an export ZIP (no batch to
    // bundle). Both side-effects are gated below.
    let is_test_line = prepared.run.kind == "test_line";

    // Insert new cache rows for completed miss segments so future runs
    // with the same hash can be served from cache. Duplicate inserts
    // (e.g., two concurrent runs synthesising the same segment) are
    // expected; log at debug and move on.
    let now = Utc::now().timestamp();
    let utts_after = repos.utterances.list_by_run(run_id).await?;
    if !is_test_line {
    for u in &utts_after {
        if u.cache_hit {
            continue;
        }
        if u.status != "completed" {
            continue;
        }
        let Some(hash_str) = u.content_hash.clone() else {
            continue;
        };
        let Some(audio_ref) = u.audio_artifact_ref.clone() else {
            continue;
        };
        let hash = match crate::domain::ContentHash::from_hex(hash_str) {
            Ok(h) => h,
            Err(_) => continue,
        };
        let cache_row = crate::storage::repo_traits::SynthesisCacheRow {
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
        if let Err(e) = repos.cache.insert(&cache_row).await {
            tracing::debug!(
                target: "emotion_tts::dispatch",
                error = %e,
                "cache insert failed (likely duplicate)"
            );
        }
    }
    }

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

    if !is_test_line && (status == "completed" || status == "partial") && artifact_store.is_some() {
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
    // Worker payload conventions: notifications are camelCase per the
    // worker's `synthesis.py::_emit_*` builders. We translate to our
    // snake_case `RunEvent` shape here. The segment_id key in our
    // `lookup` map is the utterance_id string we generated in prepare()
    // and echoed to the worker as `segment_id` in the batch params.
    let segment_id = env
        .params
        .get("segmentId")
        .and_then(|v| v.as_str())
        .unwrap_or_default()
        .to_string();
    let global_index = lookup.get(&segment_id).copied().unwrap_or(-1);
    let run_id_str = env
        .params
        .get("runId")
        .and_then(|v| v.as_str())
        .unwrap_or_default()
        .to_string();

    match env.method.as_str() {
        "segment_started" => {
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                if let Err(err) = repos.utterances.update_status(&uid, "running").await {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        utterance_id = uid.as_str(),
                        error = %err,
                        "failed to persist segment_started status — terminal status may be incorrect"
                    );
                }
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
                .get("durationMs")
                .and_then(|v| v.as_i64())
                .unwrap_or(0);
            let audio_ref = env
                .params
                .get("outputPathAbs")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                if let Err(err) = repos
                    .utterances
                    .mark_completed(&uid, &audio_ref, false, Some(duration_ms))
                    .await
                {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        utterance_id = uid.as_str(),
                        error = %err,
                        "failed to persist segment_completed status — terminal status may be incorrect"
                    );
                }
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
                .get("failureCategory")
                .and_then(|v| v.as_str())
                .unwrap_or("synthesis_failed")
                .to_string();
            let failure_detail = env
                .params
                .get("failureDetail")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string());
            if let Ok(uid) = crate::domain::UtteranceId::try_from(segment_id.as_str()) {
                if let Err(err) = repos.utterances.update_status(&uid, "failed").await {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        utterance_id = uid.as_str(),
                        error = %err,
                        "failed to persist segment_failed status — terminal status may be incorrect"
                    );
                }
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
