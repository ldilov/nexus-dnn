//! Emotion precedence resolver (FR-063).
//!
//! Five sources, highest precedence first:
//! 1. inline explicit override  — `[Bob|emotion_vector:happy=0.7]`
//! 2. inline compat emotion-ref — `[Alice:happy_sarah]`
//! 3. mapping default           — from character_mappings table
//! 4. global panel              — run-level `global_emotion`
//! 5. none                      — fallthrough
//!
//! Pure function. No I/O, no random, no ambient state.

use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

pub const VECTOR_KEYS: [&str; 8] = [
    "happy",
    "angry",
    "sad",
    "afraid",
    "disgusted",
    "melancholic",
    "surprised",
    "calm",
];

#[derive(Debug, Clone, Copy, Default, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EmotionMode {
    #[default]
    None,
    AudioRef,
    EmotionVector,
    QwenTemplate,
}

impl EmotionMode {
    #[must_use]
    pub const fn as_str(&self) -> &'static str {
        match self {
            Self::None => "none",
            Self::AudioRef => "audio_ref",
            Self::EmotionVector => "emotion_vector",
            Self::QwenTemplate => "qwen_template",
        }
    }
}

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EmotionSource {
    Inline,
    Mapping,
    Global,
    None,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "mode", rename_all = "snake_case")]
pub enum EmotionPayload {
    None,
    AudioRef { ref_id: String, alpha: f64 },
    EmotionVector { vector: [f64; 8], alpha: f64 },
    QwenTemplate { template: String, alpha: f64 },
}

impl EmotionPayload {
    #[must_use]
    pub const fn mode(&self) -> EmotionMode {
        match self {
            Self::None => EmotionMode::None,
            Self::AudioRef { .. } => EmotionMode::AudioRef,
            Self::EmotionVector { .. } => EmotionMode::EmotionVector,
            Self::QwenTemplate { .. } => EmotionMode::QwenTemplate,
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct InlineOverrides {
    pub emotion_vector: Option<String>,
    pub emotion_audio_ref: Option<String>,
    pub qwen_template: Option<String>,
    pub emotion_alpha: Option<f64>,
}

impl InlineOverrides {
    #[must_use]
    pub fn from_map(map: &BTreeMap<String, String>) -> Self {
        Self {
            emotion_vector: map.get("emotion_vector").cloned(),
            emotion_audio_ref: map.get("emotion_audio_ref").cloned(),
            qwen_template: map.get("qwen").cloned(),
            emotion_alpha: map.get("emotion_alpha").and_then(|s| s.parse().ok()),
        }
    }

    #[must_use]
    pub fn has_explicit_mode(&self) -> bool {
        self.emotion_vector.is_some()
            || self.emotion_audio_ref.is_some()
            || self.qwen_template.is_some()
    }
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct MappingDefaults {
    pub mode: EmotionMode,
    pub audio_ref_id: Option<String>,
    pub vector: Option<[f64; 8]>,
    pub qwen_template: Option<String>,
    pub alpha: Option<f64>,
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct GlobalEmotion {
    pub mode: EmotionMode,
    pub audio_ref_id: Option<String>,
    pub vector: Option<[f64; 8]>,
    pub qwen_template: Option<String>,
    /// `None` is treated as the implicit default (`1.0`) by `resolve_global`
    /// — the resolver applies `inline_alpha.or(g.alpha).unwrap_or(1.0)` so
    /// every downstream `EmotionPayload` carries a concrete `f64`. Callers
    /// that serialize `GlobalEmotion` directly should be aware that `None`
    /// here does NOT mean "alpha = 0".
    pub alpha: Option<f64>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Resolved {
    pub payload: EmotionPayload,
    pub source: EmotionSource,
}

pub fn resolve(
    inline: &InlineOverrides,
    legacy_ref: Option<&str>,
    mapping: Option<&MappingDefaults>,
    global: &GlobalEmotion,
) -> Resolved {
    if let Some(payload) = resolve_inline_explicit(inline) {
        return Resolved { payload, source: EmotionSource::Inline };
    }
    if let Some(tok) = legacy_ref {
        let alpha = inline.emotion_alpha.unwrap_or(1.0);
        return Resolved {
            payload: EmotionPayload::AudioRef { ref_id: tok.to_string(), alpha },
            source: EmotionSource::Inline,
        };
    }
    if let Some(m) = mapping {
        if let Some(payload) = resolve_mapping(m, inline.emotion_alpha) {
            return Resolved { payload, source: EmotionSource::Mapping };
        }
    }
    if let Some(payload) = resolve_global(global, inline.emotion_alpha) {
        return Resolved { payload, source: EmotionSource::Global };
    }
    Resolved { payload: EmotionPayload::None, source: EmotionSource::None }
}

fn resolve_inline_explicit(inline: &InlineOverrides) -> Option<EmotionPayload> {
    let alpha = inline.emotion_alpha.unwrap_or(1.0);
    if let Some(raw) = &inline.emotion_vector {
        if let Some(vec) = parse_inline_vector(raw) {
            return Some(EmotionPayload::EmotionVector { vector: vec, alpha });
        }
    }
    if let Some(id) = &inline.emotion_audio_ref {
        return Some(EmotionPayload::AudioRef { ref_id: id.clone(), alpha });
    }
    if let Some(tmpl) = &inline.qwen_template {
        return Some(EmotionPayload::QwenTemplate { template: tmpl.clone(), alpha });
    }
    None
}

fn parse_inline_vector(raw: &str) -> Option<[f64; 8]> {
    let mut out = [0.0f64; 8];
    for pair in raw.split(',').map(str::trim).filter(|s| !s.is_empty()) {
        let (key, value) = pair.split_once('=')?;
        let key = key.trim();
        let value: f64 = value.trim().parse().ok()?;
        let idx = VECTOR_KEYS.iter().position(|k| *k == key)?;
        out[idx] = value.clamp(0.0, 1.0);
    }
    Some(out)
}

fn resolve_mapping(m: &MappingDefaults, inline_alpha: Option<f64>) -> Option<EmotionPayload> {
    let alpha = inline_alpha.or(m.alpha).unwrap_or(1.0);
    match m.mode {
        EmotionMode::None => None,
        EmotionMode::AudioRef => Some(EmotionPayload::AudioRef {
            ref_id: m.audio_ref_id.clone()?,
            alpha,
        }),
        EmotionMode::EmotionVector => Some(EmotionPayload::EmotionVector {
            vector: m.vector?,
            alpha,
        }),
        EmotionMode::QwenTemplate => Some(EmotionPayload::QwenTemplate {
            template: m.qwen_template.clone()?,
            alpha,
        }),
    }
}

fn resolve_global(g: &GlobalEmotion, inline_alpha: Option<f64>) -> Option<EmotionPayload> {
    let alpha = inline_alpha.or(g.alpha).unwrap_or(1.0);
    match g.mode {
        EmotionMode::None => None,
        EmotionMode::AudioRef => Some(EmotionPayload::AudioRef {
            ref_id: g.audio_ref_id.clone()?,
            alpha,
        }),
        EmotionMode::EmotionVector => Some(EmotionPayload::EmotionVector {
            vector: g.vector?,
            alpha,
        }),
        EmotionMode::QwenTemplate => Some(EmotionPayload::QwenTemplate {
            template: g.qwen_template.clone()?,
            alpha,
        }),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn mapping_audio_ref(id: &str) -> MappingDefaults {
        MappingDefaults {
            mode: EmotionMode::AudioRef,
            audio_ref_id: Some(id.to_string()),
            ..Default::default()
        }
    }

    fn global_vector(v: [f64; 8]) -> GlobalEmotion {
        GlobalEmotion {
            mode: EmotionMode::EmotionVector,
            vector: Some(v),
            ..Default::default()
        }
    }

    #[test]
    fn inline_explicit_wins_over_mapping() {
        let inline = InlineOverrides {
            emotion_audio_ref: Some("inline_ref".into()),
            ..Default::default()
        };
        let mapping = mapping_audio_ref("mapping_ref");
        let global = GlobalEmotion::default();
        let r = resolve(&inline, None, Some(&mapping), &global);
        assert_eq!(r.source, EmotionSource::Inline);
        match r.payload {
            EmotionPayload::AudioRef { ref_id, .. } => assert_eq!(ref_id, "inline_ref"),
            _ => panic!("expected AudioRef"),
        }
    }

    #[test]
    fn legacy_ref_wins_when_no_inline_explicit() {
        let inline = InlineOverrides::default();
        let mapping = mapping_audio_ref("mapping_ref");
        let r = resolve(&inline, Some("legacy_token"), Some(&mapping), &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::Inline);
        match r.payload {
            EmotionPayload::AudioRef { ref_id, .. } => assert_eq!(ref_id, "legacy_token"),
            _ => panic!(),
        }
    }

    #[test]
    fn mapping_wins_when_no_inline_no_legacy() {
        let mapping = mapping_audio_ref("mapping_ref");
        let r = resolve(&InlineOverrides::default(), None, Some(&mapping), &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::Mapping);
    }

    #[test]
    fn global_wins_when_no_mapping() {
        let global = global_vector([1.0; 8]);
        let r = resolve(&InlineOverrides::default(), None, None, &global);
        assert_eq!(r.source, EmotionSource::Global);
        assert!(matches!(r.payload, EmotionPayload::EmotionVector { .. }));
    }

    #[test]
    fn falls_through_to_none() {
        let r = resolve(&InlineOverrides::default(), None, None, &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::None);
        assert!(matches!(r.payload, EmotionPayload::None));
    }

    #[test]
    fn parses_inline_vector_string() {
        let inline = InlineOverrides {
            emotion_vector: Some("happy=0.7,surprised=0.2".into()),
            ..Default::default()
        };
        let r = resolve(&inline, None, None, &GlobalEmotion::default());
        match r.payload {
            EmotionPayload::EmotionVector { vector, .. } => {
                assert!((vector[0] - 0.7).abs() < 1e-9);
                assert!((vector[6] - 0.2).abs() < 1e-9);
            }
            _ => panic!(),
        }
    }

    #[test]
    fn inline_vector_clamps_to_0_1() {
        let inline = InlineOverrides {
            emotion_vector: Some("happy=5.0,sad=-1.0".into()),
            ..Default::default()
        };
        let r = resolve(&inline, None, None, &GlobalEmotion::default());
        if let EmotionPayload::EmotionVector { vector, .. } = r.payload {
            assert_eq!(vector[0], 1.0);
            assert_eq!(vector[2], 0.0);
        } else {
            panic!();
        }
    }

    #[test]
    fn inline_alpha_overrides_mapping_alpha() {
        let inline = InlineOverrides {
            emotion_alpha: Some(0.3),
            ..Default::default()
        };
        let mapping = MappingDefaults {
            mode: EmotionMode::AudioRef,
            audio_ref_id: Some("ref".into()),
            alpha: Some(0.9),
            ..Default::default()
        };
        let r = resolve(&inline, None, Some(&mapping), &GlobalEmotion::default());
        if let EmotionPayload::AudioRef { alpha, .. } = r.payload {
            assert!((alpha - 0.3).abs() < 1e-9);
        } else {
            panic!();
        }
    }

    #[test]
    fn mapping_qwen_template_resolved() {
        let mapping = MappingDefaults {
            mode: EmotionMode::QwenTemplate,
            qwen_template: Some("Friendly teen: {seg}".into()),
            ..Default::default()
        };
        let r = resolve(&InlineOverrides::default(), None, Some(&mapping), &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::Mapping);
        assert!(matches!(r.payload, EmotionPayload::QwenTemplate { .. }));
    }

    #[test]
    fn missing_payload_in_mapping_falls_through() {
        let mapping = MappingDefaults {
            mode: EmotionMode::AudioRef,
            audio_ref_id: None,
            ..Default::default()
        };
        let r = resolve(&InlineOverrides::default(), None, Some(&mapping), &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::None);
    }

    #[test]
    fn invalid_inline_vector_falls_through() {
        let inline = InlineOverrides {
            emotion_vector: Some("not_a_key=0.5".into()),
            ..Default::default()
        };
        let r = resolve(&inline, None, None, &GlobalEmotion::default());
        assert_eq!(r.source, EmotionSource::None);
    }

    #[test]
    fn vector_keys_in_upstream_order() {
        assert_eq!(VECTOR_KEYS[0], "happy");
        assert_eq!(VECTOR_KEYS[7], "calm");
    }
}
