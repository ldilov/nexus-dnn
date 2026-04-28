//! Pre-flight for a popped run: reload the row from DB (don't trust the
//! queue copy because settings may have changed), reload mappings,
//! resolve voice asset paths, build the `SynthesisSegment` list the
//! `BatchSynthesizeOperator` expects.

use std::collections::{BTreeMap, HashMap};
use std::path::PathBuf;

use crate::backend_client::HandshakeInfo;
use crate::domain::cache_key::{build as build_cache_key, CacheKeyInput};
use crate::domain::emotion::{
    resolve as resolve_emotion, EmotionMode, GlobalEmotion, InlineOverrides, MappingDefaults,
};
use crate::domain::filenames::build_filename;
use crate::domain::parser::{parse_script, ParserMode};
use crate::domain::{DeploymentId, EmotionTtsError, Result, RunId};
use crate::operators::batch_synthesize::{BatchOptimisations, Input as BatchInput, SynthesisSegment};
use crate::operators::mapping_resolve::{Input as MapInput, MappingResolveOperator};
use crate::operators::Operator;
use crate::storage::repo_traits::{CharacterMappingRow, RunRow};
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

    // Parse the global emotion snapshot once into the typed `GlobalEmotion`
    // struct expected by `domain::emotion::resolve`. Falls back to a
    // mode=None default on missing field / malformed JSON / unknown mode.
    // Audio-ref payloads get their ref_id resolved through the voice path
    // resolver below so the worker receives an absolute filesystem path,
    // not a host artifact reference.
    let global_emotion =
        parse_global_emotion(run.global_emotion_snapshot_json.as_deref(), cfg);

    // Pre-fetch all vector presets for this deployment once. Per-character
    // mappings reference presets by id when their default emotion mode is
    // `vector_preset`; resolving each one on-the-fly would require an
    // async DB hit per utterance, so we eagerly index them by id and parse
    // the stored JSON `[f64; 8]` array up front.
    let presets = repos.presets.list_by_deployment(&dep).await?;
    let preset_vectors: HashMap<String, [f64; 8]> = presets
        .iter()
        .filter_map(|p| {
            serde_json::from_str::<[f64; 8]>(&p.vector_json)
                .ok()
                .map(|v| (p.preset_id.as_str().to_string(), v))
        })
        .collect();

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

        // Build per-character mapping defaults so the precedence chain in
        // `domain::emotion::resolve` can consult them. Audio-ref ids are
        // resolved through the voice path resolver — if resolution misses,
        // `MappingDefaults.audio_ref_id` is left None and `resolve()` will
        // skip the mapping branch and fall through to the global setting.
        let mapping_defaults = mapping_opt.map(|m| build_mapping_defaults(m, cfg, &preset_vectors));

        // Per-utterance inline overrides parsed from the script (Task 3).
        // The parser populates `ParsedUtterance.inline_overrides` from tag
        // syntax like `[Bob|emotion_vector:happy=0.7|emotion_alpha:0.9]`.
        // `emotion_audio_ref` values are voice asset ids that need to be
        // resolved to absolute filesystem paths the same way the global
        // audio_ref is resolved by `parse_global_emotion`. The original
        // map is left untouched; only the value passed to
        // `InlineOverrides::from_map` is normalised.
        let inline = build_inline_overrides(&r.utterance.inline_overrides, cfg);
        let utterance_emotion = resolve_emotion(
            &inline,
            None,
            mapping_defaults.as_ref(),
            &global_emotion,
        )
        .payload;

        let content_hash = (cfg.voice_sha256_resolver)(speaker_voice_id.as_str())
            .and_then(|sha256| {
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
                    generation_params: BTreeMap::new(),
                    seed: run.base_seed,
                    speed_factor: run.speed_factor,
                    speed_mode: run.speed_mode.clone(),
                    output_format: run.output_format.clone(),
                    voice_asset_chain_digest: crate::domain::ChainDigest::EMPTY.clone(),
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
            emotion: utterance_emotion,
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
            let ref_id = v
                .get("audioRefId")
                .and_then(|r| r.as_str())
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

fn build_inline_overrides(
    raw: &BTreeMap<String, String>,
    cfg: &PrepareConfig,
) -> InlineOverrides {
    if raw.is_empty() {
        return InlineOverrides::default();
    }
    // Defer the clone until we actually need to rewrite. The
    // `emotion_audio_ref` key is uncommon in practice — most utterances
    // use `emotion_vector`, which is forwarded verbatim — so the borrow
    // path saves a per-utterance heap allocation in the hot loop.
    let Some(ref_id) = raw.get(INLINE_AUDIO_REF_KEY) else {
        return InlineOverrides::from_map(raw);
    };
    let resolved = (cfg.voice_path_resolver)(ref_id).unwrap_or_else(|| ref_id.clone());
    let mut normalised: BTreeMap<String, String> = raw.clone();
    normalised.insert(INLINE_AUDIO_REF_KEY.to_string(), resolved);
    InlineOverrides::from_map(&normalised)
}
