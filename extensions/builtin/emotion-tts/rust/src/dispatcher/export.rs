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
                        .unwrap_or_else(|| {
                            format!("seg_{:03}.{}", plan.global_index, run.output_format)
                        }),
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
