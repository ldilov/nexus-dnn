//! Pre-flight for a popped run: reload the row from DB (don't trust the
//! queue copy because settings may have changed), reload mappings,
//! resolve voice asset paths, build the `SynthesisSegment` list the
//! `BatchSynthesizeOperator` expects.

use std::collections::{BTreeMap, HashMap};
use std::path::PathBuf;

use crate::backend_client::HandshakeInfo;
use crate::domain::cache_key::{build as build_cache_key, CacheKeyInput};
use crate::domain::emotion::{
    resolve as resolve_emotion, EmotionMode, EmotionPayload, GlobalEmotion, InlineOverrides,
    MappingDefaults,
};
use crate::domain::filenames::build_filename;
use crate::domain::parser::{parse_script, ParserMode};
use crate::domain::{EmotionTtsError, Result, RunId};
use crate::operators::batch_synthesize::{
    BatchOptimisations, Input as BatchInput, SynthesisSegment,
};
use crate::operators::mapping_resolve::{Input as MapInput, MappingResolveOperator};
use crate::operators::Operator;
use crate::storage::repo_traits::{CharacterMappingRow, RunRow};
use crate::storage::Repos;

pub(crate) struct Prepared {
    pub run: RunRow,
    pub batch_input: BatchInput,
    pub utterances: Vec<UtterancePlan>,
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
    /// Latest cached worker handshake. When `Some`, supplies the real
    /// `worker_version` + `model_family_id` to the cache key. When
    /// `None` (no handshake yet), the cache key uses the deterministic
    /// `unknown-runtime` / `unknown-model` sentinels from
    /// [`crate::backend_client`] so a future real-handshake row cannot
    /// collide.
    pub runtime_meta: Option<HandshakeInfo>,
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

    // Parse the persisted generation blob (set by `create_run` from
    // `CreateRunBody.generation`). Tolerates malformed JSON / non-object
    let generation_value: serde_json::Value = serde_json::from_str(&run.generation_settings_json)
        .unwrap_or_else(|_| serde_json::Value::Object(serde_json::Map::new()));
    let generation_obj: serde_json::Map<String, serde_json::Value> = match &generation_value {
        serde_json::Value::Object(m) => m.clone(),
        _ => serde_json::Map::new(),
    };
    let generation_params_btree: BTreeMap<String, String> = generation_obj
        .iter()
        // The per-utterance `seed` is computed below from
        // (base_seed, seed_strategy) and folded into the cache key
        .filter(|(k, _)| k.as_str() != "seed")
        .map(|(k, v)| (k.clone(), stringify_generation_value(v)))
        .collect();

    // Parse the global emotion snapshot once into the typed `GlobalEmotion`
    // struct expected by `domain::emotion::resolve`. Falls back to a
    let global_emotion = parse_global_emotion(run.global_emotion_snapshot_json.as_deref(), cfg);

    if let Some(raw_segments) = run.prebuilt_segments_json.clone() {
        return prepare_from_prebuilt(
            repos,
            run,
            run_id,
            cfg,
            extension_version,
            &raw_segments,
            &generation_obj,
            &generation_params_btree,
            &global_emotion,
        )
        .await;
    }

    // Pre-fetch all vector presets for this deployment once. Per-character
    // mappings reference presets by id when their default emotion mode is
    let presets = repos.presets.list_by_deployment(&dep).await?;
    let preset_vectors: HashMap<String, [f64; 8]> = presets
        .iter()
        .filter_map(|p| {
            serde_json::from_str::<[f64; 8]>(&p.vector_json)
                .ok()
                .map(|v| (p.preset_id.as_str().to_string(), v))
        })
        .collect();
    let mut sorted_presets: Vec<&_> = presets.iter().collect();
    sorted_presets.sort_by(|a, b| a.preset_name.cmp(&b.preset_name));
    let mut preset_vectors_by_name_ci: HashMap<String, [f64; 8]> =
        HashMap::with_capacity(sorted_presets.len());
    for p in sorted_presets {
        if let Ok(v) = serde_json::from_str::<[f64; 8]>(&p.vector_json) {
            let key = p.preset_name.to_lowercase();
            if let Some(_existing) = preset_vectors_by_name_ci.insert(key.clone(), v) {
                tracing::warn!(
                    deployment_id = %dep.as_str(),
                    preset_name_lower = %key,
                    "preset name case-collision; later entry overrides earlier (sort-stable)"
                );
            }
        }
    }

    let parser_mode = match run.parser_mode.as_str() {
        "raw_text" => ParserMode::RawText,
        "advanced_tagged" => ParserMode::AdvancedTagged,
        "story" => ParserMode::Story,
        "dialogue" | "" => ParserMode::Dialogue,
        unknown => {
            tracing::warn!(
                run_id = %run_id.as_str(),
                parser_mode = %unknown,
                "unknown parser_mode; falling back to Dialogue"
            );
            ParserMode::Dialogue
        }
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

    let chain_digests =
        build_voice_chain_digest_map(repos, &mappings, cfg.default_voice_asset_id.as_ref()).await?;

    let mut mappings_by_id: HashMap<String, &CharacterMappingRow> =
        HashMap::with_capacity(mappings.len());
    for m in &mappings {
        let key = m.mapping_id.as_str().to_string();
        if mappings_by_id.insert(key.clone(), m).is_some() {
            return Err(EmotionTtsError::internal(format!(
                "duplicate mapping_id {key} in deployment slice"
            )));
        }
    }

    let mut segments = Vec::with_capacity(resolved.resolved.len());
    let mut plans = Vec::with_capacity(resolved.resolved.len());
    for (idx, r) in resolved.resolved.iter().enumerate() {
        let mapping_opt = match r.mapping_id.as_deref() {
            Some(id) => Some(mappings_by_id.get(id).copied().ok_or_else(|| {
                EmotionTtsError::internal(format!(
                    "resolved mapping_id {id} not found in prepare slice"
                ))
            })?),
            None => None,
        };

        let speaker_voice_id = match (mapping_opt, &cfg.default_voice_asset_id) {
            (Some(m), _) => m.speaker_voice_asset_id.clone(),
            (None, Some(id)) => id.clone(),
            (None, None) => {
                return Err(EmotionTtsError::Conflict(format!(
                    "no mapping for character '{}' and no default voice set",
                    r.utterance.character_display
                )))
            }
        };

        let speaker_path =
            (cfg.voice_path_resolver)(speaker_voice_id.as_str()).ok_or_else(|| {
                EmotionTtsError::Conflict(format!(
                    "voice file missing for asset {}",
                    speaker_voice_id.as_str()
                ))
            })?;

        // Build per-character mapping defaults so the precedence chain in
        // `domain::emotion::resolve` can consult them. Audio-ref ids are
        let mapping_defaults = mapping_opt.map(|m| build_mapping_defaults(m, cfg, &preset_vectors));

        // Per-utterance inline overrides parsed from the script (Task 3).
        // The parser populates `ParsedUtterance.inline_overrides` from tag
        let inline = build_inline_overrides(
            &r.utterance.inline_overrides,
            cfg,
            &preset_vectors_by_name_ci,
        );
        let utterance_emotion =
            resolve_emotion(&inline, None, mapping_defaults.as_ref(), &global_emotion).payload;

        // Per-utterance effective seed. `increment_per_line` advances the
        // base by the (zero-based) utterance index so each segment gets a
        let utterance_seed: i64 = match run.seed_strategy.as_str() {
            "increment_per_line" => run.base_seed.saturating_add(idx as i64),
            _ => run.base_seed,
        };

        let content_hash =
            (cfg.voice_sha256_resolver)(speaker_voice_id.as_str()).and_then(|sha256| {
                let cache_input = CacheKeyInput {
                    extension_version: extension_version.to_string(),
                    runtime_version: cfg
                        .runtime_meta
                        .as_ref()
                        .map_or(
                            crate::backend_client::FALLBACK_RUNTIME_VERSION,
                            HandshakeInfo::runtime_version_for_cache,
                        )
                        .to_string(),
                    model_version: cfg
                        .runtime_meta
                        .as_ref()
                        .map_or(
                            crate::backend_client::FALLBACK_MODEL_VERSION,
                            HandshakeInfo::model_version_for_cache,
                        )
                        .to_string(),
                    model_family: cfg
                        .runtime_meta
                        .as_ref()
                        .map_or(
                            crate::backend_client::FALLBACK_MODEL_FAMILY,
                            HandshakeInfo::model_family_for_cache,
                        )
                        .to_string(),
                    text: r.utterance.text.clone(),
                    speaker_ref_sha256: sha256,
                    emotion: utterance_emotion.clone(),
                    generation_params: generation_params_btree.clone(),
                    seed: utterance_seed,
                    speed_factor: run.speed_factor,
                    speed_mode: run.speed_mode.clone(),
                    output_format: run.output_format.clone(),
                    voice_asset_chain_digest: chain_digests
                        .get(speaker_voice_id.as_str())
                        .cloned()
                        .unwrap_or(crate::domain::ChainDigest::EMPTY),
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
        });

        // Forward the user-supplied generation map AND the per-utterance
        // computed seed to the worker. The worker's `_build_infer_kwargs`
        let mut segment_generation = generation_obj.clone();
        segment_generation.insert("seed".to_string(), serde_json::json!(utterance_seed));

        segments.push(SynthesisSegment {
            segment_id: utterance_id.as_str().to_string(),
            global_index,
            character_display: r.utterance.character_display.clone(),
            character_sanitised: filename_info.character_sanitised,
            character_index: r.character_index,
            text: r.utterance.text.clone(),
            speaker_audio_ref_abs: speaker_path,
            emotion: utterance_emotion,
            generation: serde_json::Value::Object(segment_generation),
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
        batch_input,
        utterances: plans,
        source_run_id,
    })
}

const MAX_PREBUILT_SEGMENTS: usize = 5000;

#[derive(Debug, Clone, serde::Deserialize)]
struct PrebuiltSegment {
    text: String,
    voice_asset_id: String,
    #[serde(default)]
    speaker_label: Option<String>,
    #[serde(default)]
    emotion: Option<serde_json::Value>,
}

async fn prepare_from_prebuilt(
    repos: &Repos,
    run: RunRow,
    run_id: &RunId,
    cfg: &PrepareConfig,
    extension_version: &str,
    raw_segments: &str,
    generation_obj: &serde_json::Map<String, serde_json::Value>,
    generation_params_btree: &BTreeMap<String, String>,
    run_global_emotion: &GlobalEmotion,
) -> Result<Prepared> {
    let prebuilt: Vec<PrebuiltSegment> = serde_json::from_str(raw_segments)
        .map_err(|e| EmotionTtsError::Conflict(format!("invalid prebuilt_segments: {e}")))?;
    if prebuilt.is_empty() {
        return Err(EmotionTtsError::Conflict(
            "prebuilt_segments is empty".to_string(),
        ));
    }
    if prebuilt.len() > MAX_PREBUILT_SEGMENTS {
        return Err(EmotionTtsError::Conflict(format!(
            "prebuilt_segments exceeds maximum of {MAX_PREBUILT_SEGMENTS}"
        )));
    }

    std::fs::create_dir_all(&cfg.output_root).map_err(|e| {
        EmotionTtsError::internal(format!(
            "create output_root {}: {e}",
            cfg.output_root.display()
        ))
    })?;

    let mut voice_ids: Vec<crate::domain::VoiceAssetId> = Vec::with_capacity(prebuilt.len());
    for seg in &prebuilt {
        let id = crate::domain::VoiceAssetId::try_from(seg.voice_asset_id.clone())
            .map_err(|e| EmotionTtsError::Conflict(format!("invalid voice_asset_id: {e}")))?;
        voice_ids.push(id);
    }
    voice_ids.sort_by(|a, b| a.as_str().cmp(b.as_str()));
    voice_ids.dedup();

    let chains = repos.voice_assets.read_edit_chains_for(&voice_ids).await?;
    let mut chain_digests: HashMap<String, crate::domain::ChainDigest> =
        HashMap::with_capacity(voice_ids.len());
    for id in &voice_ids {
        let digest = chains.get(id.as_str()).map_or_else(
            || crate::domain::ChainDigest::EMPTY,
            crate::domain::ChainDigest::of,
        );
        chain_digests.insert(id.as_str().to_string(), digest);
    }

    let (segments, plans) = build_prebuilt_segments(
        &prebuilt,
        &run,
        cfg,
        extension_version,
        generation_obj,
        generation_params_btree,
        run_global_emotion,
        &chain_digests,
    )?;

    let batch_input = BatchInput {
        request_id: format!("{}-batch", run_id.as_str()),
        run_id: run_id.as_str().to_string(),
        deployment_id: run.deployment_id.as_str().to_string(),
        segments,
        optimisations: BatchOptimisations::default(),
    };
    let source_run_id = run.original_run_id.clone();
    Ok(Prepared {
        run,
        batch_input,
        utterances: plans,
        source_run_id,
    })
}

#[allow(clippy::too_many_arguments)]
fn build_prebuilt_segments(
    prebuilt: &[PrebuiltSegment],
    run: &RunRow,
    cfg: &PrepareConfig,
    extension_version: &str,
    generation_obj: &serde_json::Map<String, serde_json::Value>,
    generation_params_btree: &BTreeMap<String, String>,
    run_global_emotion: &GlobalEmotion,
    chain_digests: &HashMap<String, crate::domain::ChainDigest>,
) -> Result<(Vec<SynthesisSegment>, Vec<UtterancePlan>)> {
    let mut occurrence_by_speaker: HashMap<String, i64> = HashMap::new();
    let mut segments = Vec::with_capacity(prebuilt.len());
    let mut plans = Vec::with_capacity(prebuilt.len());

    for (idx, seg) in prebuilt.iter().enumerate() {
        if seg.text.trim().is_empty() {
            return Err(EmotionTtsError::Conflict(format!(
                "prebuilt segment {idx} has empty text"
            )));
        }

        let speaker_path = (cfg.voice_path_resolver)(&seg.voice_asset_id).ok_or_else(|| {
            EmotionTtsError::Conflict(format!(
                "voice file missing for asset {}",
                seg.voice_asset_id
            ))
        })?;

        let utterance_emotion =
            resolve_prebuilt_emotion(seg.emotion.as_ref(), cfg, run_global_emotion);

        let utterance_seed: i64 = match run.seed_strategy.as_str() {
            "increment_per_line" => run.base_seed.saturating_add(idx as i64),
            _ => run.base_seed,
        };

        let character_display = seg
            .speaker_label
            .as_deref()
            .map(str::trim)
            .filter(|label| !label.is_empty())
            .map(str::to_string)
            .unwrap_or_else(|| seg.voice_asset_id.clone());
        let character_index = {
            let counter = occurrence_by_speaker
                .entry(character_display.to_lowercase())
                .or_insert(0);
            *counter += 1;
            *counter
        };

        let content_hash = (cfg.voice_sha256_resolver)(&seg.voice_asset_id).and_then(|sha256| {
            let cache_input = CacheKeyInput {
                extension_version: extension_version.to_string(),
                runtime_version: cfg
                    .runtime_meta
                    .as_ref()
                    .map_or(
                        crate::backend_client::FALLBACK_RUNTIME_VERSION,
                        HandshakeInfo::runtime_version_for_cache,
                    )
                    .to_string(),
                model_version: cfg
                    .runtime_meta
                    .as_ref()
                    .map_or(
                        crate::backend_client::FALLBACK_MODEL_VERSION,
                        HandshakeInfo::model_version_for_cache,
                    )
                    .to_string(),
                model_family: cfg
                    .runtime_meta
                    .as_ref()
                    .map_or(
                        crate::backend_client::FALLBACK_MODEL_FAMILY,
                        HandshakeInfo::model_family_for_cache,
                    )
                    .to_string(),
                text: seg.text.clone(),
                speaker_ref_sha256: sha256,
                emotion: utterance_emotion.clone(),
                generation_params: generation_params_btree.clone(),
                seed: utterance_seed,
                speed_factor: run.speed_factor,
                speed_mode: run.speed_mode.clone(),
                output_format: run.output_format.clone(),
                voice_asset_chain_digest: chain_digests
                    .get(seg.voice_asset_id.as_str())
                    .cloned()
                    .unwrap_or(crate::domain::ChainDigest::EMPTY),
            };
            build_cache_key(&cache_input).ok()
        });

        let global_index = (idx + 1) as i64;
        let filename_info = build_filename(
            global_index,
            &character_display,
            character_index,
            &run.output_format,
        );
        let output_target = cfg.output_root.join(&filename_info.filename);
        let output_target_abs = output_target.to_string_lossy().into_owned();

        let utterance_id = crate::domain::UtteranceId::new();
        plans.push(UtterancePlan {
            utterance_id: utterance_id.clone(),
            global_index,
            character_display: character_display.clone(),
            character_sanitised: filename_info.character_sanitised.clone(),
            character_index,
            text: seg.text.clone(),
            output_target_abs: output_target_abs.clone(),
            content_hash,
        });

        let mut segment_generation = generation_obj.clone();
        segment_generation.insert("seed".to_string(), serde_json::json!(utterance_seed));

        segments.push(SynthesisSegment {
            segment_id: utterance_id.as_str().to_string(),
            global_index,
            character_display,
            character_sanitised: filename_info.character_sanitised,
            character_index,
            text: seg.text.clone(),
            speaker_audio_ref_abs: speaker_path,
            emotion: utterance_emotion,
            generation: serde_json::Value::Object(segment_generation),
            output_target_abs,
        });
    }

    Ok((segments, plans))
}

fn resolve_prebuilt_emotion(
    seg_emotion: Option<&serde_json::Value>,
    cfg: &PrepareConfig,
    run_global: &GlobalEmotion,
) -> EmotionPayload {
    match seg_emotion {
        Some(v) if !v.is_null() => {
            let snapshot = v.to_string();
            let g = parse_global_emotion(Some(&snapshot), cfg);
            resolve_emotion(&InlineOverrides::default(), None, None, &g).payload
        }
        _ => resolve_emotion(&InlineOverrides::default(), None, None, run_global).payload,
    }
}

/// Convert the run row's `global_emotion_snapshot_json` (whatever the
/// frontend sent) into a typed `GlobalEmotion`. Tolerates both
/// camelCase and snake_case keys because `CreateRunBody.global_emotion`
/// is `serde_json::Value` (no rename, just passthrough). For audio_ref
/// mode the ref is resolved through the host artifact store so the
/// worker receives an absolute filesystem path.
///
/// Falls back to `GlobalEmotion::default()` (mode=None) when:
/// - The snapshot is None or fails to parse as JSON.
/// - `mode` is missing, "none", or unrecognized.
/// - The mode-specific payload field is missing or malformed.
/// - For audio_ref: the ref doesn't resolve via the path resolver — in
///   that case the raw ref string is kept (worker will surface a clear
///   "file not found" error rather than silently mis-rendering).
fn parse_global_emotion(json_str: Option<&str>, cfg: &PrepareConfig) -> GlobalEmotion {
    let Some(s) = json_str else {
        return GlobalEmotion::default();
    };
    let Ok(v): std::result::Result<serde_json::Value, _> = serde_json::from_str(s) else {
        return GlobalEmotion::default();
    };
    let mode = v.get("mode").and_then(|m| m.as_str()).unwrap_or("none");
    // Frontend sends `emotionAlpha`; older payloads / Rust GlobalEmotion
    // use `alpha`. Try both.
    let alpha = v
        .get("emotionAlpha")
        .and_then(serde_json::Value::as_f64)
        .or_else(|| v.get("alpha").and_then(serde_json::Value::as_f64));

    match mode {
        "audio_ref" => {
            // Frontend canonical key (per `web/src/services/types.ts:15`)
            // is `audioRefVoiceAssetId`. Older payloads may still use
            let ref_id = v
                .get("audioRefVoiceAssetId")
                .and_then(|r| r.as_str())
                .or_else(|| v.get("audioRefId").and_then(|r| r.as_str()))
                .or_else(|| v.get("audio_ref_id").and_then(|r| r.as_str()))
                .map(str::to_string);
            let Some(raw_ref) = ref_id else {
                return GlobalEmotion::default();
            };
            let resolved = (cfg.voice_path_resolver)(&raw_ref).unwrap_or(raw_ref);
            GlobalEmotion {
                mode: EmotionMode::AudioRef,
                audio_ref_id: Some(resolved),
                alpha,
                ..Default::default()
            }
        }
        "emotion_vector" => {
            let Some(arr) = v.get("vector").and_then(|a| a.as_array()) else {
                return GlobalEmotion::default();
            };
            if arr.len() != 8 {
                tracing::warn!(
                    vector_len = arr.len(),
                    "emotion_vector payload is not length 8; emotion discarded"
                );
                return GlobalEmotion::default();
            }
            let mut out = [0.0f64; 8];
            for (i, n) in arr.iter().enumerate() {
                let Some(f) = n.as_f64() else {
                    return GlobalEmotion::default();
                };
                out[i] = f.clamp(0.0, 1.0);
            }
            GlobalEmotion {
                mode: EmotionMode::EmotionVector,
                vector: Some(out),
                alpha,
                ..Default::default()
            }
        }
        "qwen_template" => {
            let template = v
                .get("qwenTemplate")
                .and_then(|t| t.as_str())
                .or_else(|| v.get("qwen_template").and_then(|t| t.as_str()))
                .map(str::to_string);
            let Some(template) = template else {
                return GlobalEmotion::default();
            };
            GlobalEmotion {
                mode: EmotionMode::QwenTemplate,
                qwen_template: Some(template),
                alpha,
                ..Default::default()
            }
        }
        _ => GlobalEmotion::default(),
    }
}

/// Translate a `CharacterMappingRow` into the typed `MappingDefaults`
/// that `domain::emotion::resolve` consumes.
///
/// - `audio_ref` mode: the stored `default_emotion_voice_asset_id` is run
///   through the voice path resolver so the worker receives an absolute
///   path. When resolution misses, `audio_ref_id` is left None and
///   `resolve()` will skip the mapping branch entirely (precedence falls
///   through to global / none).
/// - `vector_preset` mode: the stored preset id is looked up in the
///   pre-fetched `preset_vectors` map (single DB hit per run rather than
///   one per utterance). A miss leaves `vector` as None and the resolver
///   skips this mapping branch.
/// - `qwen_template` mode: the template string is taken verbatim from
///   the row.
/// - Unknown / "none" modes produce a `MappingDefaults` with mode=None,
///   which the resolver treats as "no mapping override available".
///
/// `alpha` is intentionally left None — there is no per-mapping alpha
/// column. Inline overrides supply alpha (Task 3, not yet shipped); when
/// neither inline nor mapping provide it, `resolve_mapping` defaults to
/// 1.0.
fn build_mapping_defaults(
    row: &CharacterMappingRow,
    cfg: &PrepareConfig,
    preset_vectors: &HashMap<String, [f64; 8]>,
) -> MappingDefaults {
    match row.default_emotion_mode.as_str() {
        "audio_ref" => {
            let audio_ref_id = row
                .default_emotion_voice_asset_id
                .as_ref()
                .and_then(|id| (cfg.voice_path_resolver)(id.as_str()));
            MappingDefaults {
                mode: EmotionMode::AudioRef,
                audio_ref_id,
                ..Default::default()
            }
        }
        "vector_preset" => {
            let vector = row
                .default_vector_preset_id
                .as_ref()
                .and_then(|id| preset_vectors.get(id.as_str()).copied());
            MappingDefaults {
                mode: EmotionMode::EmotionVector,
                vector,
                ..Default::default()
            }
        }
        "qwen_template" => MappingDefaults {
            mode: EmotionMode::QwenTemplate,
            qwen_template: row.default_qwen_template.clone(),
            ..Default::default()
        },
        _ => MappingDefaults::default(),
    }
}

/// Build `InlineOverrides` from the per-utterance map produced by the
/// script parser, resolving `emotion_audio_ref` values through the voice
/// path resolver — mirrors what `parse_global_emotion` does for the
/// run-level global emotion so the worker always sees an absolute
/// filesystem path rather than a host artifact reference.
///
/// The original `raw` map is not mutated. When the resolver misses an
/// `emotion_audio_ref` id, the raw value is preserved so the worker
/// surfaces a clear "file not found" rather than the override silently
/// dropping out.
///
/// All other override keys (`emotion_vector`, `qwen`, `emotion_alpha`,
/// and any future additions) are forwarded verbatim — `from_map` parses
/// the values it understands and ignores the rest.
const INLINE_AUDIO_REF_KEY: &str = "emotion_audio_ref";
const INLINE_PRESET_KEY: &str = "emotion_preset";
const INLINE_VECTOR_KEY: &str = "emotion_vector";
const VECTOR_KEYS: [&str; 8] = [
    "happy",
    "angry",
    "sad",
    "afraid",
    "disgusted",
    "melancholic",
    "surprised",
    "calm",
];

fn build_inline_overrides(
    raw: &BTreeMap<String, String>,
    cfg: &PrepareConfig,
    presets_by_name_ci: &HashMap<String, [f64; 8]>,
) -> InlineOverrides {
    if raw.is_empty() {
        return InlineOverrides::default();
    }

    let needs_preset_lower =
        raw.contains_key(INLINE_PRESET_KEY) && !raw.contains_key(INLINE_VECTOR_KEY);
    let needs_audio_ref_resolve = raw.contains_key(INLINE_AUDIO_REF_KEY);

    if !needs_preset_lower && !needs_audio_ref_resolve {
        return InlineOverrides::from_map(raw);
    }

    let mut normalised: BTreeMap<String, String> = raw.clone();

    if needs_preset_lower {
        if let Some(preset_name) = raw.get(INLINE_PRESET_KEY) {
            if let Some(vector) = presets_by_name_ci.get(&preset_name.to_lowercase()) {
                normalised.insert(INLINE_VECTOR_KEY.to_string(), encode_inline_vector(vector));
            }
        }
    }

    if needs_audio_ref_resolve {
        if let Some(ref_id) = raw.get(INLINE_AUDIO_REF_KEY) {
            let resolved = (cfg.voice_path_resolver)(ref_id).unwrap_or_else(|| ref_id.clone());
            normalised.insert(INLINE_AUDIO_REF_KEY.to_string(), resolved);
        }
    }

    InlineOverrides::from_map(&normalised)
}

fn encode_inline_vector(vector: &[f64; 8]) -> String {
    let mut parts: Vec<String> = Vec::new();
    for (i, &v) in vector.iter().enumerate() {
        if v.abs() < 1e-3 {
            continue;
        }
        let clamped = v.clamp(0.0, 1.0);
        parts.push(format!("{}={}", VECTOR_KEYS[i], format_inline_num(clamped)));
    }
    parts.join(",")
}

fn format_inline_num(n: f64) -> String {
    let rounded = (n * 1_000_000.0).round() / 1_000_000.0;
    if (rounded - rounded.trunc()).abs() < f64::EPSILON {
        format!("{rounded:.1}")
    } else {
        format!("{rounded}")
    }
}

/// Stable string representation of a generation-param value for cache-key
/// hashing. Numbers are formatted via `serde_json` so `1.0` and `1` agree
/// with their JSON representation, booleans become `"true"`/`"false"`,
/// strings drop their quotes, and any other shape (object/array/null)
/// falls through to the canonical JSON string. Two runs with semantically
/// equal generation maps must produce byte-equal strings here.
fn stringify_generation_value(v: &serde_json::Value) -> String {
    match v {
        serde_json::Value::String(s) => s.clone(),
        serde_json::Value::Bool(b) => b.to_string(),
        serde_json::Value::Number(n) => n.to_string(),
        serde_json::Value::Null => "null".to_string(),
        // Objects + arrays: lean on serde_json's canonical ordering
        // (BTreeMap-backed by default in this crate's serde_json
        other => other.to_string(),
    }
}

async fn build_voice_chain_digest_map(
    repos: &Repos,
    mappings: &[CharacterMappingRow],
    default_voice_asset_id: Option<&crate::domain::VoiceAssetId>,
) -> Result<HashMap<String, crate::domain::ChainDigest>> {
    let mut ids: Vec<crate::domain::VoiceAssetId> = mappings
        .iter()
        .map(|m| m.speaker_voice_asset_id.clone())
        .collect();
    if let Some(default) = default_voice_asset_id {
        ids.push(default.clone());
    }
    ids.sort_by(|a, b| a.as_str().cmp(b.as_str()));
    ids.dedup_by(|a, b| a.as_str() == b.as_str());

    let chains = repos.voice_assets.read_edit_chains_for(&ids).await?;
    let mut out = HashMap::with_capacity(ids.len());
    for id in &ids {
        let digest = chains.get(id.as_str()).map_or_else(
            || crate::domain::ChainDigest::EMPTY,
            crate::domain::ChainDigest::of,
        );
        out.insert(id.as_str().to_string(), digest);
    }
    Ok(out)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn cfg_with_resolver_returning_path(path: &'static str) -> PrepareConfig {
        PrepareConfig {
            output_root: std::env::temp_dir(),
            voice_path_resolver: std::sync::Arc::new(move |_id: &str| Some(path.to_string())),
            voice_sha256_resolver: std::sync::Arc::new(|_id: &str| None),
            default_voice_asset_id: None,
            runtime_meta: None,
        }
    }

    fn fake_run_row() -> RunRow {
        RunRow {
            run_id: crate::domain::RunId::new(),
            deployment_id: crate::domain::DeploymentId::try_from("dep_test".to_string()).unwrap(),
            kind: "generate".to_string(),
            status: "queued".to_string(),
            script_snapshot: String::new(),
            parser_mode: "raw_text".to_string(),
            generation_settings_json: "{}".to_string(),
            global_emotion_snapshot_json: None,
            output_format: "wav".to_string(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".to_string(),
            cache_policy: "use_cache".to_string(),
            seed_strategy: "fixed".to_string(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.0.0-test".to_string(),
            queued_at: 0,
            started_at: None,
            finished_at: None,
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
            prebuilt_segments_json: None,
        }
    }

    fn empty_generation() -> (
        serde_json::Map<String, serde_json::Value>,
        BTreeMap<String, String>,
    ) {
        (serde_json::Map::new(), BTreeMap::new())
    }

    fn seg(
        text: &str,
        voice: &str,
        label: Option<&str>,
        emotion: Option<serde_json::Value>,
    ) -> PrebuiltSegment {
        PrebuiltSegment {
            text: text.to_string(),
            voice_asset_id: voice.to_string(),
            speaker_label: label.map(str::to_string),
            emotion,
        }
    }

    #[test]
    fn prebuilt_segments_number_occurrences_per_speaker() {
        let cfg = cfg_with_resolver_returning_path("/abs/voice.wav");
        let run = fake_run_row();
        let (gen_obj, gen_btree) = empty_generation();
        let global = GlobalEmotion::default();
        let chains = HashMap::new();
        let prebuilt = vec![
            seg("one", "va_a", Some("Alice"), None),
            seg("two", "va_b", Some("Bob"), None),
            seg("three", "va_a", Some("Alice"), None),
        ];
        let (segs, plans) = build_prebuilt_segments(
            &prebuilt, &run, &cfg, "0.0.0", &gen_obj, &gen_btree, &global, &chains,
        )
        .unwrap();
        assert_eq!(segs.len(), 3);
        assert_eq!(plans.len(), 3);
        assert_eq!(
            segs.iter().map(|s| s.global_index).collect::<Vec<_>>(),
            vec![1, 2, 3]
        );
        assert_eq!(
            segs.iter().map(|s| s.character_index).collect::<Vec<_>>(),
            vec![1, 1, 2]
        );
        assert_eq!(segs[0].text, "one");
        assert_eq!(segs[0].character_display, "Alice");
        assert_eq!(segs[1].character_display, "Bob");
    }

    #[test]
    fn prebuilt_segment_honours_per_segment_emotion_vector() {
        let cfg = cfg_with_resolver_returning_path("/abs/voice.wav");
        let run = fake_run_row();
        let (gen_obj, gen_btree) = empty_generation();
        let global = GlobalEmotion::default();
        let chains = HashMap::new();
        let emotion = serde_json::json!({
            "mode": "emotion_vector",
            "vector": [0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3],
            "emotionAlpha": 0.5,
        });
        let prebuilt = vec![seg("hi", "va_a", None, Some(emotion))];
        let (segs, _) = build_prebuilt_segments(
            &prebuilt, &run, &cfg, "0.0.0", &gen_obj, &gen_btree, &global, &chains,
        )
        .unwrap();
        match &segs[0].emotion {
            EmotionPayload::EmotionVector { vector, alpha } => {
                assert!((vector[0] - 0.7).abs() < 1e-9);
                assert!((vector[7] - 0.3).abs() < 1e-9);
                assert!((*alpha - 0.5).abs() < 1e-9);
            }
            other => panic!("expected EmotionVector, got {other:?}"),
        }
        assert_eq!(segs[0].character_display, "va_a");
    }

    #[test]
    fn prebuilt_segment_without_emotion_falls_back_to_run_global() {
        let cfg = cfg_with_resolver_returning_path("/abs/voice.wav");
        let run = fake_run_row();
        let (gen_obj, gen_btree) = empty_generation();
        let global = GlobalEmotion {
            mode: EmotionMode::EmotionVector,
            vector: Some([0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]),
            alpha: Some(1.0),
            ..Default::default()
        };
        let chains = HashMap::new();
        let prebuilt = vec![seg("hi", "va_a", None, None)];
        let (segs, _) = build_prebuilt_segments(
            &prebuilt, &run, &cfg, "0.0.0", &gen_obj, &gen_btree, &global, &chains,
        )
        .unwrap();
        assert!(matches!(
            segs[0].emotion,
            EmotionPayload::EmotionVector { .. }
        ));
    }

    #[test]
    fn prebuilt_segment_empty_text_rejected() {
        let cfg = cfg_with_resolver_returning_path("/abs/voice.wav");
        let run = fake_run_row();
        let (gen_obj, gen_btree) = empty_generation();
        let global = GlobalEmotion::default();
        let chains = HashMap::new();
        let prebuilt = vec![seg("   ", "va_a", None, None)];
        let result = build_prebuilt_segments(
            &prebuilt, &run, &cfg, "0.0.0", &gen_obj, &gen_btree, &global, &chains,
        );
        assert!(matches!(result, Err(EmotionTtsError::Conflict(_))));
    }

    #[test]
    fn prebuilt_segment_missing_voice_file_rejected() {
        let cfg = PrepareConfig {
            output_root: std::env::temp_dir(),
            voice_path_resolver: std::sync::Arc::new(|_id: &str| None),
            voice_sha256_resolver: std::sync::Arc::new(|_id: &str| None),
            default_voice_asset_id: None,
            runtime_meta: None,
        };
        let run = fake_run_row();
        let (gen_obj, gen_btree) = empty_generation();
        let global = GlobalEmotion::default();
        let chains = HashMap::new();
        let prebuilt = vec![seg("hi", "va_a", None, None)];
        let result = build_prebuilt_segments(
            &prebuilt, &run, &cfg, "0.0.0", &gen_obj, &gen_btree, &global, &chains,
        );
        assert!(matches!(result, Err(EmotionTtsError::Conflict(_))));
    }

    #[test]
    fn encode_inline_vector_omits_zeros_and_uses_canonical_keys() {
        let v: [f64; 8] = [0.7, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.3];
        assert_eq!(
            encode_inline_vector(&v),
            "happy=0.7,melancholic=0.2,calm=0.3"
        );
    }

    #[test]
    fn build_inline_overrides_lowers_emotion_preset_to_emotion_vector() {
        let cfg = cfg_with_resolver_returning_path("/abs/x.wav");
        let mut presets = HashMap::new();
        presets.insert(
            "happy".to_string(),
            [0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3],
        );
        let mut raw = BTreeMap::new();
        raw.insert("emotion_preset".to_string(), "Happy".to_string());
        let inline = build_inline_overrides(&raw, &cfg, &presets);
        assert_eq!(inline.emotion_vector.as_deref(), Some("happy=0.7,calm=0.3"));
    }

    #[test]
    fn build_inline_overrides_preset_does_not_override_explicit_vector() {
        let cfg = cfg_with_resolver_returning_path("/abs/x.wav");
        let mut presets = HashMap::new();
        presets.insert(
            "happy".to_string(),
            [0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3],
        );
        let mut raw = BTreeMap::new();
        raw.insert("emotion_preset".to_string(), "Happy".to_string());
        raw.insert("emotion_vector".to_string(), "sad=0.5".to_string());
        let inline = build_inline_overrides(&raw, &cfg, &presets);
        assert_eq!(inline.emotion_vector.as_deref(), Some("sad=0.5"));
    }

    #[test]
    fn build_inline_overrides_unknown_preset_silently_ignored() {
        let cfg = cfg_with_resolver_returning_path("/abs/x.wav");
        let presets = HashMap::new();
        let mut raw = BTreeMap::new();
        raw.insert("emotion_preset".to_string(), "no_such".to_string());
        let inline = build_inline_overrides(&raw, &cfg, &presets);
        assert!(inline.emotion_vector.is_none());
    }

    #[test]
    fn parse_global_emotion_audio_ref_accepts_camelcase_voice_asset_key() {
        // The frontend `GlobalEmotion` type (services/types.ts) uses
        // `audioRefVoiceAssetId`. parse_global_emotion must accept this
        let json = r#"{"mode":"audio_ref","audioRefVoiceAssetId":"voice_xyz","emotionAlpha":0.6}"#;
        let cfg = cfg_with_resolver_returning_path("/abs/path/voice.wav");
        let parsed = parse_global_emotion(Some(json), &cfg);
        assert_eq!(parsed.mode, EmotionMode::AudioRef);
        assert_eq!(parsed.audio_ref_id.as_deref(), Some("/abs/path/voice.wav"));
        // alpha must thread through (HIGH-2 spec finding).
        assert_eq!(parsed.alpha, Some(0.6));
    }

    #[test]
    fn parse_global_emotion_audio_ref_still_accepts_legacy_keys() {
        // Existing run rows persisted with the older `audioRefId` /
        // `audio_ref_id` shape must keep deserialising — re-runs of an
        let cfg = cfg_with_resolver_returning_path("/abs/legacy.wav");
        for legacy in [
            r#"{"mode":"audio_ref","audioRefId":"voice_old"}"#,
            r#"{"mode":"audio_ref","audio_ref_id":"voice_older"}"#,
        ] {
            let parsed = parse_global_emotion(Some(legacy), &cfg);
            assert_eq!(parsed.mode, EmotionMode::AudioRef);
            assert_eq!(parsed.audio_ref_id.as_deref(), Some("/abs/legacy.wav"));
        }
    }

    #[test]
    fn stringify_generation_value_handles_common_shapes() {
        assert_eq!(stringify_generation_value(&serde_json::json!(0.8)), "0.8");
        assert_eq!(stringify_generation_value(&serde_json::json!(1)), "1");
        assert_eq!(stringify_generation_value(&serde_json::json!(true)), "true");
        assert_eq!(
            stringify_generation_value(&serde_json::json!("warm")),
            "warm"
        );
        assert_eq!(stringify_generation_value(&serde_json::Value::Null), "null");
    }

    /// Mirrors the per-utterance seed math in `prepare()` — keep this
    /// in lockstep with the body. Regressions here are HIGH-A
    /// (cache-key correctness) AND a worker-side determinism bug at
    /// the same time.
    fn compute_utterance_seed(strategy: &str, base_seed: i64, idx: usize) -> i64 {
        match strategy {
            "increment_per_line" => base_seed.saturating_add(idx as i64),
            _ => base_seed,
        }
    }

    #[test]
    fn seed_strategy_increment_per_line_advances_per_utterance() {
        let seeds: Vec<i64> = (0..4)
            .map(|i| compute_utterance_seed("increment_per_line", 100, i))
            .collect();
        assert_eq!(seeds, vec![100, 101, 102, 103]);
    }

    #[test]
    fn seed_strategy_fixed_repeats_base_seed() {
        let seeds: Vec<i64> = (0..3)
            .map(|i| compute_utterance_seed("fixed", 42, i))
            .collect();
        assert_eq!(seeds, vec![42, 42, 42]);
    }

    #[test]
    fn seed_strategy_unknown_falls_back_to_base_seed() {
        // Unknown strategies (forward-compat) must NOT silently increment.
        // The worker is the source of truth for `random_per_line`; it
        let seeds: Vec<i64> = (0..3)
            .map(|i| compute_utterance_seed("random_per_line", 7, i))
            .collect();
        assert_eq!(seeds, vec![7, 7, 7]);
    }

    /// HIGH-C: `generation_params` must be derived from the run's
    /// generation map and exclude the `seed` key (which is folded into
    /// CacheKeyInput::seed independently). Two cache keys built with
    /// different temperatures must differ.
    #[test]
    fn generation_params_are_built_from_run_generation_settings() {
        use crate::domain::cache_key::{build as build_cache_key, CacheKeyInput};
        use crate::domain::emotion::EmotionPayload;

        fn build_input(temperature: f64) -> CacheKeyInput {
            let gen = serde_json::json!({
                "temperature": temperature,
                "top_p": 0.9,
                "seed": 42,
            });
            let obj = match &gen {
                serde_json::Value::Object(m) => m.clone(),
                _ => unreachable!(),
            };
            let params: BTreeMap<String, String> = obj
                .iter()
                .filter(|(k, _)| k.as_str() != "seed")
                .map(|(k, v)| (k.clone(), stringify_generation_value(v)))
                .collect();

            CacheKeyInput {
                extension_version: "0.0.0-test".into(),
                runtime_version: "rt".into(),
                model_version: "mv".into(),
                model_family: "mf".into(),
                text: "hello".into(),
                speaker_ref_sha256: "a".repeat(64),
                emotion: EmotionPayload::None,
                generation_params: params,
                seed: 42,
                speed_factor: 1.0,
                speed_mode: "preserve_pitch".into(),
                output_format: "wav".into(),
                voice_asset_chain_digest: crate::domain::ChainDigest::EMPTY,
            }
        }

        let h1 = build_cache_key(&build_input(0.8)).expect("hash 1");
        let h2 = build_cache_key(&build_input(1.2)).expect("hash 2");
        assert_ne!(
            h1.as_str(),
            h2.as_str(),
            "different temperatures must produce different cache keys (HIGH-C)"
        );

        // And: if generation_params is left empty (the pre-fix BTreeMap::new()
        // behaviour), both temperatures collapse onto the same key — this
        let mut empty_input = build_input(0.8);
        empty_input.generation_params = BTreeMap::new();
        let h_empty_a = build_cache_key(&empty_input).expect("hash empty a");
        empty_input.generation_params = BTreeMap::new();
        let h_empty_b = build_cache_key(&empty_input).expect("hash empty b");
        assert_eq!(h_empty_a.as_str(), h_empty_b.as_str());
    }
}
