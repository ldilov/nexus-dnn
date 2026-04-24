//! Content-hash cache-key builder (R-10).
//!
//! Stable, deterministic SHA-256 over a canonicalised string representation
//! of every input that can change synthesis output. Version prefix allows
//! future format bumps without collision.

use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

use crate::domain::emotion::EmotionPayload;
use crate::domain::{ContentHash, EmotionTtsError, Result};

pub const FORMAT_VERSION: &str = "v2";

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CacheKeyInput {
    pub extension_version: String,
    pub runtime_version: String,
    pub model_version: String,
    #[serde(default = "default_model_family")]
    pub model_family: String,
    pub text: String,
    pub speaker_ref_sha256: String,
    pub emotion: EmotionPayload,
    pub generation_params: BTreeMap<String, String>,
    pub seed: i64,
    pub speed_factor: f64,
    pub speed_mode: String,
    pub output_format: String,
}

fn default_model_family() -> String {
    "indextts-2".to_string()
}

#[must_use]
pub fn build_canonical_string(input: &CacheKeyInput) -> String {
    let emotion = canonical_emotion(&input.emotion);
    let gen_params = canonical_gen_params(&input.generation_params);
    let speed = format!("{:.6}", input.speed_factor);

    format!(
        "{version}:{ext}:{runtime}:{model}:{family}:\n\
         text_utf8={text}\n\
         speaker_ref={speaker}\n\
         emotion_mode={emode}\n\
         emotion_payload={epayload}\n\
         gen_params={gen}\n\
         seed={seed}\n\
         speed_factor={speed}\n\
         speed_mode={speed_mode}\n\
         output_format={output_format}",
        version = FORMAT_VERSION,
        ext = input.extension_version,
        runtime = input.runtime_version,
        model = input.model_version,
        family = input.model_family,
        text = input.text,
        speaker = input.speaker_ref_sha256,
        emode = input.emotion.mode().as_str(),
        epayload = emotion,
        gen = gen_params,
        seed = input.seed,
        speed = speed,
        speed_mode = input.speed_mode,
        output_format = input.output_format,
    )
}

pub fn build(input: &CacheKeyInput) -> Result<ContentHash> {
    if input.speaker_ref_sha256.len() != 64
        || !input
            .speaker_ref_sha256
            .chars()
            .all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase())
    {
        return Err(EmotionTtsError::validation(format!(
            "speaker_ref_sha256 must be 64-char lowercase hex, got {:?}",
            input.speaker_ref_sha256
        )));
    }
    let canonical = build_canonical_string(input);
    let digest = Sha256::digest(canonical.as_bytes());
    ContentHash::from_hex(hex::encode(digest)).map_err(EmotionTtsError::from)
}

fn canonical_emotion(p: &EmotionPayload) -> String {
    match p {
        EmotionPayload::None => String::new(),
        EmotionPayload::AudioRef { ref_id, alpha } => format!("ref={ref_id};alpha={alpha:.6}"),
        EmotionPayload::EmotionVector { vector, alpha } => {
            let v = vector
                .iter()
                .map(|x| format!("{x:.6}"))
                .collect::<Vec<_>>()
                .join(",");
            format!("vec=[{v}];alpha={alpha:.6}")
        }
        EmotionPayload::QwenTemplate { template, alpha } => {
            format!("qwen:{template};alpha={alpha:.6}")
        }
    }
}

fn canonical_gen_params(params: &BTreeMap<String, String>) -> String {
    if params.is_empty() {
        return String::new();
    }
    params
        .iter()
        .map(|(k, v)| format!("{k}={v}"))
        .collect::<Vec<_>>()
        .join("|")
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sample_input() -> CacheKeyInput {
        CacheKeyInput {
            extension_version: "0.1.0".into(),
            runtime_version: "0.1.0".into(),
            model_version: "indextts-2-20250908".into(),
            model_family: "indextts-2".into(),
            text: "Hello there".into(),
            speaker_ref_sha256: "a".repeat(64),
            emotion: EmotionPayload::None,
            generation_params: BTreeMap::new(),
            seed: 42,
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            output_format: "mp3".into(),
        }
    }

    #[test]
    fn deterministic_same_input_same_hash() {
        let a = build(&sample_input()).unwrap();
        let b = build(&sample_input()).unwrap();
        assert_eq!(a, b);
    }

    #[test]
    fn text_change_changes_hash() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.text = "Something else".into();
        let b = build(&i).unwrap();
        assert_ne!(a, b);
    }

    #[test]
    fn seed_change_changes_hash() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.seed = 43;
        let b = build(&i).unwrap();
        assert_ne!(a, b);
    }

    #[test]
    fn speed_factor_format_stable_across_trailing_zeros() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.speed_factor = 1.000000;
        let b = build(&i).unwrap();
        assert_eq!(a, b);
    }

    #[test]
    fn gen_params_sort_independent() {
        let mut i1 = sample_input();
        i1.generation_params.insert("a".into(), "1".into());
        i1.generation_params.insert("b".into(), "2".into());

        let mut i2 = sample_input();
        i2.generation_params.insert("b".into(), "2".into());
        i2.generation_params.insert("a".into(), "1".into());

        assert_eq!(build(&i1).unwrap(), build(&i2).unwrap());
    }

    #[test]
    fn emotion_mode_switch_changes_hash() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.emotion = EmotionPayload::AudioRef {
            ref_id: "ref1".into(),
            alpha: 1.0,
        };
        let b = build(&i).unwrap();
        assert_ne!(a, b);
    }

    #[test]
    fn uppercase_speaker_hash_rejected() {
        let mut i = sample_input();
        i.speaker_ref_sha256 = "A".repeat(64);
        assert!(build(&i).is_err());
    }

    #[test]
    fn short_speaker_hash_rejected() {
        let mut i = sample_input();
        i.speaker_ref_sha256 = "abc".into();
        assert!(build(&i).is_err());
    }

    #[test]
    fn model_version_bump_invalidates_cache() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.model_version = "indextts-2-20260101".into();
        let b = build(&i).unwrap();
        assert_ne!(a, b);
    }

    #[test]
    fn content_hash_is_valid_64_char_lower_hex() {
        let h = build(&sample_input()).unwrap();
        assert_eq!(h.as_str().len(), 64);
        assert!(h.as_str().chars().all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase()));
    }

    #[test]
    fn canonical_string_has_version_prefix() {
        let s = build_canonical_string(&sample_input());
        assert!(s.starts_with("v2:"));
    }

    #[test]
    fn different_model_family_changes_hash() {
        let a = build(&sample_input()).unwrap();
        let mut i = sample_input();
        i.model_family = "indextts-2-5".into();
        let b = build(&i).unwrap();
        assert_ne!(
            a, b,
            "FR-242: cache key MUST include model_family so cross-family hits are impossible",
        );
    }
}
