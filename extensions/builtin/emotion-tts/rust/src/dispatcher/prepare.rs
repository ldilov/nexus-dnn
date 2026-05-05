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
    // payloads — those degrade to an empty map and the worker falls back
    // to its built-in defaults. The map is used twice: forwarded into
    // each `SynthesisSegment.generation` (so temperature/top_p/etc.
    // actually reach the worker) and folded into the cache key as
    // `generation_params` (so two runs with different sampling settings
    // don't collide).
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
        // independently. Keep the user-supplied `seed` (if any) out of
        // `generation_params` so cache keys don't double-count.
        .filter(|(k, _)| k.as_str() != "seed")
        .map(|(k, v)| (k.clone(), stringify_generation_value(v)))
        .collect();

    // Parse the global emotion snapshot once into the typed `GlobalEmotion`
    // struct expected by `domain::emotion::resolve`. Falls back to a
    // mode=None default on missing field / malformed JSON / unknown mode.
    // Audio-ref payloads get their ref_id resolved through the voice path
    // resolver below so the worker receives an absolute filesystem path,
    // not a host artifact reference.
    let global_emotion = parse_global_emotion(run.global_emotion_snapshot_json.as_deref(), cfg);

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

    let chain_digests =
        build_voice_chain_digest_map(repos, &mappings, cfg.default_voice_asset_id.as_ref()).await?;

    let mappings_by_id: HashMap<String, &CharacterMappingRow> = mappings
        .iter()
        .map(|m| (m.mapping_id.as_str().to_string(), m))
        .collect();

    let mut segments = Vec::with_capacity(resolved.resolved.len());
    let mut plans = Vec::with_capacity(resolved.resolved.len());
    for (idx, r) in resolved.resolved.iter().enumerate() {
        let mapping_opt = r
            .mapping_id
            .as_deref()
            .and_then(|id| mappings_by_id.get(id).copied());

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
        let utterance_emotion =
            resolve_emotion(&inline, None, mapping_defaults.as_ref(), &global_emotion).payload;

        // Per-utterance effective seed. `increment_per_line` advances the
        // base by the (zero-based) utterance index so each segment gets a
        // distinct sampling seed; `random_per_line` is owned by the worker
        // (it ignores the supplied seed and rolls its own); everything else
        // ("fixed" or unrecognised) reuses the base verbatim. The computed
        // value is what gets folded into the cache key AND forwarded to
        // the worker as `generation.seed`.
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
        // pops `seed` (and a handful of other named keys) from this dict
        // and forwards everything else verbatim into `infer()` — so two
        // runs with different temperatures produce different audio AND
        // different cache rows (see `generation_params_btree` above).
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
            // `audioRefId` / `audio_ref_id` — accept all three so a
            // re-run of an existing run row keeps working.
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

fn build_inline_overrides(raw: &BTreeMap<String, String>, cfg: &PrepareConfig) -> InlineOverrides {
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
        // version). This is best-effort — nested non-trivial generation
        // values are rare and the cache key still differs across distinct
        // shapes, just maybe not optimally so.
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

    #[test]
    fn parse_global_emotion_audio_ref_accepts_camelcase_voice_asset_key() {
        // The frontend `GlobalEmotion` type (services/types.ts) uses
        // `audioRefVoiceAssetId`. parse_global_emotion must accept this
        // canonical key (HIGH-1).
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
        // older run should not break.
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
        assert_eq!(
            stringify_generation_value(&serde_json::Value::Null),
            "null"
        );
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
        // ignores the supplied seed and rolls its own.
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
        // is the regression we're guarding against.
        let mut empty_input = build_input(0.8);
        empty_input.generation_params = BTreeMap::new();
        let h_empty_a = build_cache_key(&empty_input).expect("hash empty a");
        empty_input.generation_params = BTreeMap::new();
        let h_empty_b = build_cache_key(&empty_input).expect("hash empty b");
        assert_eq!(h_empty_a.as_str(), h_empty_b.as_str());
    }
}
