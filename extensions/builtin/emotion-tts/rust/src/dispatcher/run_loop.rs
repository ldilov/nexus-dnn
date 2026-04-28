//! Single-run handler — pulled out so it can be tested independently
//! and so the outer loop can panic-isolate each iteration.

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

    let result = dispatch_inner(&qrun, &repos, &lease_provider, &tx).await;

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
) -> crate::domain::Result<String> {
    let run_id = &qrun.run_id;

    // Output dir: temp_dir/nexus-emotion-tts-runs/<deployment_id>/<run_id>/.
    // This is intentionally simple for v1 — a future task can move it
    // under the host's data dir once the dispatcher has access to it.
    let output_root = std::env::temp_dir()
        .join("nexus-emotion-tts-runs")
        .join(qrun.deployment_id.clone())
        .join(run_id.as_str());

    // Pre-fetch all voice assets for this deployment so the prepare()
    // step's voice_path_resolver can be a synchronous HashMap lookup —
    // avoids tokio::task::block_in_place (which panics under
    // single-thread runtimes used by #[tokio::test]).
    let dep_id = crate::domain::DeploymentId::try_from(qrun.deployment_id.as_str())
        .map_err(|e| EmotionTtsError::internal(format!("invalid deployment id: {e}")))?;
    let voice_rows = repos.voice_assets.list_by_deployment(&dep_id).await?;
    let voice_paths: std::collections::HashMap<String, String> = voice_rows
        .into_iter()
        .map(|row| (row.voice_asset_id.as_str().to_string(), row.audio_artifact_ref))
        .collect();

    let voice_resolver: Arc<dyn Fn(&str) -> Option<String> + Send + Sync> =
        Arc::new(move |voice_asset_id: &str| -> Option<String> {
            voice_paths.get(voice_asset_id).cloned()
        });

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

    // TODO(spec-035 follow-up): replace with `set_started_guarded` that
    // only transitions queued → running. Today this can race with a
    // cancel arriving between insert_many and set_started, overwriting
    // the cancelled status back to running.
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

    let batch_op = BatchSynthesizeOperator::new(Arc::new(client.clone()));
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
        result = batch_op.execute(prepared.batch_input.clone()) => result,
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
