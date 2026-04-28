//! Pre-flight for a popped run: reload the row from DB (don't trust the
//! queue copy because settings may have changed), reload mappings,
//! resolve voice asset paths, build the `SynthesisSegment` list the
//! `BatchSynthesizeOperator` expects.

use std::collections::BTreeMap;
use std::path::PathBuf;

use crate::domain::cache_key::{build as build_cache_key, CacheKeyInput};
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
    /// Set when this run is a resume — points at the original (partial)
    /// run whose completed utterances we want to attribute as
    /// `source_run_id` on the new utterance rows. Lets the UI trace
    /// reused audio back to where it was first synthesized.
    pub source_run_id: Option<crate::domain::RunId>,
}

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

#[derive(Clone)]
pub(crate) struct PrepareConfig {
    /// Where segment audio files are written. Created if missing.
    pub output_root: PathBuf,
    /// Resolves a `VoiceAssetId` to its absolute file path on disk.
    /// Currently the voice asset row stores `audio_artifact_ref` which is
    /// already an absolute path written by the artifact store; passing
    /// it through unchanged is correct.
    pub voice_path_resolver: std::sync::Arc<dyn Fn(&str) -> Option<String> + Send + Sync>,
    /// Resolves a `VoiceAssetId` to the `content_sha256` of the voice asset.
    /// Used as `speaker_ref_sha256` in the cache key computation.
    pub voice_sha256_resolver: std::sync::Arc<dyn Fn(&str) -> Option<String> + Send + Sync>,
    /// Fallback voice used when a character has no explicit mapping.
    /// Required for `raw_text` parser mode (single-speaker plain text).
    pub default_voice_asset_id: Option<crate::domain::VoiceAssetId>,
}

pub(crate) async fn prepare(
    repos: &Repos,
    run_id: &RunId,
    cfg: &PrepareConfig,
    extension_version: &str,
) -> Result<Prepared> {
    let run = repos
        .runs
        .get(run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    let dep = run.deployment_id.clone();

    // Parse the global emotion snapshot once. Falls back to None on
    // missing field / malformed JSON / unknown mode. Audio-ref payloads
    // get their ref_id resolved through the voice path resolver below
    // so the worker receives an absolute filesystem path, not a host
    // artifact reference.
    let global_emotion =
        parse_global_emotion(run.global_emotion_snapshot_json.as_deref(), cfg);
    // Diagnostic for the "emotion not applied" bug — prints what the
    // parser saw and what it produced. Remove once the global emotion
    // path is verified end-to-end on a real host.
    tracing::info!(
        target: "emotion_tts::dispatch",
        snapshot_json = %run.global_emotion_snapshot_json.as_deref().unwrap_or("<null>"),
        parsed_mode = %global_emotion.mode().as_str(),
        "parse_global_emotion result"
    );

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

    if cfg.default_voice_asset_id.is_none() && !resolved.unresolved_characters.is_empty() {
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
        // The mapping lookup key is the display name lowercased — same
        // logic `MappingResolveOperator` uses internally.
        // Pass 1: look for an explicit character mapping.
        // Pass 2: fall back to the deployment's default voice (raw_text mode).
        let mapping_opt = mappings
            .iter()
            .find(|m| m.character_name_lower == r.utterance.character_display.to_lowercase());

        let speaker_voice_id = match mapping_opt {
            Some(m) => m.speaker_voice_asset_id.clone(),
            None => match &cfg.default_voice_asset_id {
                Some(id) => id.clone(),
                None => {
                    return Err(EmotionTtsError::Conflict(format!(
                        "no mapping for character '{}' and no default voice set",
                        r.utterance.character_display
                    )))
                }
            },
        };

        let speaker_path = (cfg.voice_path_resolver)(speaker_voice_id.as_str())
            .ok_or_else(|| {
                EmotionTtsError::Conflict(format!(
                    "voice file missing for asset {}",
                    speaker_voice_id.as_str()
                ))
            })?;

        let content_hash = (cfg.voice_sha256_resolver)(speaker_voice_id.as_str())
            .and_then(|sha256| {
                let cache_input = CacheKeyInput {
                    extension_version: extension_version.to_string(),
                    runtime_version: "0.0.0".to_string(), // TODO: thread real runtime_version once available
                    model_version: "indextts-2".to_string(),
                    model_family: "indextts-2".to_string(),
                    text: r.utterance.text.clone(),
                    speaker_ref_sha256: sha256,
                    emotion: global_emotion.clone(),
                    generation_params: BTreeMap::new(),
                    seed: run.base_seed,
                    speed_factor: run.speed_factor,
                    speed_mode: run.speed_mode.clone(),
                    output_format: run.output_format.clone(),
                };
                build_cache_key(&cache_input).ok()
            });

        let global_index = (idx + 1) as i64;
        let filename_info = build_filename(
            global_index,
            &r.utterance.character_display,
            r.character_index,
            &run.output_format,
        );
        let output_target = cfg.output_root.join(&filename_info.filename);
        let output_target_abs = output_target.to_string_lossy().into_owned();

        let utterance_id = crate::domain::UtteranceId::new();
        plans.push(UtterancePlan {
            utterance_id: utterance_id.clone(),
            global_index,
            character_display: r.utterance.character_display.clone(),
            character_sanitised: filename_info.character_sanitised.clone(),
            character_index: r.character_index,
            text: r.utterance.text.clone(),
            output_target_abs: output_target_abs.clone(),
            content_hash,
            speaker_voice_asset_id: speaker_voice_id.clone(),
        });

        segments.push(SynthesisSegment {
            segment_id: utterance_id.as_str().to_string(),
            global_index,
            character_display: r.utterance.character_display.clone(),
            character_sanitised: filename_info.character_sanitised,
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

    let source_run_id = run.original_run_id.clone();
    Ok(Prepared {
        run,
        deployment_id: dep,
        batch_input,
        utterances: plans,
        source_run_id,
    })
}

/// Convert the run row's `global_emotion_snapshot_json` (whatever the
/// frontend sent) into a typed `EmotionPayload`. Tolerates both
/// camelCase and snake_case keys because `CreateRunBody.global_emotion`
/// is `serde_json::Value` (no rename, just passthrough). For audio_ref
/// mode the ref is resolved through the host artifact store so the
/// worker receives an absolute filesystem path.
///
/// Falls back to `EmotionPayload::None` when:
/// - The snapshot is None or fails to parse as JSON.
/// - `mode` is missing, "none", or unrecognized.
/// - The mode-specific payload field is missing.
/// - For audio_ref: the ref doesn't resolve via the path resolver.
fn parse_global_emotion(json_str: Option<&str>, cfg: &PrepareConfig) -> EmotionPayload {
    let Some(s) = json_str else {
        return EmotionPayload::None;
    };
    let Ok(v): std::result::Result<serde_json::Value, _> = serde_json::from_str(s) else {
        return EmotionPayload::None;
    };
    let mode = v.get("mode").and_then(|m| m.as_str()).unwrap_or("none");
    // Frontend sends `emotionAlpha`; older payloads / Rust GlobalEmotion
    // use `alpha`. Try both.
    let alpha = v
        .get("emotionAlpha")
        .and_then(serde_json::Value::as_f64)
        .or_else(|| v.get("alpha").and_then(serde_json::Value::as_f64))
        .unwrap_or(1.0);

    match mode {
        "audio_ref" => {
            let ref_id = v
                .get("audioRefId")
                .and_then(|r| r.as_str())
                .or_else(|| v.get("audio_ref_id").and_then(|r| r.as_str()))
                .map(str::to_string);
            let Some(raw_ref) = ref_id else {
                return EmotionPayload::None;
            };
            // Resolve through the voice path resolver so the worker sees
            // an absolute path. Fall back to the raw ref if resolution
            // misses (worker will then fail with a clear "file not
            // found" error rather than silently mis-rendering).
            let resolved = (cfg.voice_path_resolver)(&raw_ref).unwrap_or(raw_ref);
            EmotionPayload::AudioRef {
                ref_id: resolved,
                alpha,
            }
        }
        "emotion_vector" => {
            let arr = v.get("vector").and_then(|a| a.as_array());
            let Some(arr) = arr else {
                return EmotionPayload::None;
            };
            if arr.len() != 8 {
                return EmotionPayload::None;
            }
            let mut out = [0.0f64; 8];
            for (i, n) in arr.iter().enumerate() {
                let Some(f) = n.as_f64() else {
                    return EmotionPayload::None;
                };
                out[i] = f.clamp(0.0, 1.0);
            }
            EmotionPayload::EmotionVector {
                vector: out,
                alpha,
            }
        }
        "qwen_template" => {
            let template = v
                .get("qwenTemplate")
                .and_then(|t| t.as_str())
                .or_else(|| v.get("qwen_template").and_then(|t| t.as_str()))
                .map(str::to_string);
            let Some(template) = template else {
                return EmotionPayload::None;
            };
            EmotionPayload::QwenTemplate { template, alpha }
        }
        _ => EmotionPayload::None,
    }
}
