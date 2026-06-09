//! GGUF quantization variant detector (pure function).
//!
//! A GGUF repository typically ships 5–15 quantization files with
//! names like `Llama-3-8B-Instruct.Q5_K_M.gguf`. We extract the quant
//! token, group artifacts (including sharded `-00001-of-00003.gguf`
//! sets), and default-flag one recommended variant per research R4.

use crate::ids::{ArtifactId, FamilyId, VariantId};
use crate::model::{Artifact, Variant};
use crate::types::{DownloadState, Format, VariantType};

/// All quantization tokens llama.cpp emits today. Filename tokens
/// outside this list still produce a variant (as `VariantType::Other`),
/// preserving forward-compat with future llama.cpp quant kinds.
const KNOWN_QUANTS: &[&str] = &[
    "F32", "F16", "BF16", "Q2_K", "Q3_K_S", "Q3_K_M", "Q3_K_L", "Q4_0", "Q4_1", "Q4_K_S", "Q4_K_M",
    "Q5_0", "Q5_1", "Q5_K_S", "Q5_K_M", "Q6_K", "Q8_0", "IQ1_S", "IQ1_M", "IQ2_XXS", "IQ2_XS",
    "IQ2_S", "IQ2_M", "IQ3_XXS", "IQ3_XS", "IQ3_S", "IQ3_M", "IQ4_XS", "IQ4_NL",
];

/// Fallback priority for the "recommended" default variant per research
/// R4: `Q4_K_M` → `Q5_K_M` → `Q8_0` → first-by-order.
const DEFAULT_PRIORITY: &[&str] = &["Q4_K_M", "Q5_K_M", "Q8_0"];

fn strip_shard_suffix(stem: &str) -> &str {
    if let Some(idx) = stem.find("-of-") {
        let before = &stem[..idx];
        if let Some(dash) = before.rfind('-') {
            let tail = &before[dash + 1..];
            if tail.chars().all(|c| c.is_ascii_digit()) {
                return &stem[..dash];
            }
        }
    }
    stem
}

fn extract_quant_token(filename: &str) -> Option<String> {
    let lower = filename.to_ascii_lowercase();
    let stem = lower
        .strip_suffix(".gguf")
        .or_else(|| lower.strip_suffix(".ggml"))?;
    let cleaned = strip_shard_suffix(stem);
    for known in KNOWN_QUANTS {
        let needle = format!(".{}", known.to_ascii_lowercase());
        if cleaned.ends_with(&needle)
            || cleaned.contains(&format!(".{}-", known.to_ascii_lowercase()))
        {
            return Some((*known).to_string());
        }
        let underscore_needle = format!("-{}", known.to_ascii_lowercase());
        if cleaned.ends_with(&underscore_needle) {
            return Some((*known).to_string());
        }
    }
    let last = cleaned.rsplit(['.', '-']).next()?;
    if last.is_empty() || last.len() > 12 {
        return None;
    }
    Some(last.to_ascii_uppercase())
}

fn pick_default<'a>(labels: impl Iterator<Item = &'a str>) -> Option<String> {
    let collected: Vec<&str> = labels.collect();
    for pref in DEFAULT_PRIORITY {
        if collected.iter().any(|l| l == pref) {
            return Some((*pref).to_string());
        }
    }
    collected.first().map(|s| (*s).to_string())
}

/// Produce a selectable [`Variant`] per quantization found among the
/// family's GGUF / GGML artifacts. Non-GGUF artifacts are ignored — the
/// caller pipes them through as single-artifact primaries.
#[must_use]
pub fn detect_variants(family_id: &FamilyId, artifacts: &[Artifact]) -> Vec<Variant> {
    let mut buckets: Vec<(String, Vec<ArtifactId>)> = Vec::new();
    for a in artifacts {
        if !matches!(a.format, Format::Gguf | Format::Ggml) {
            continue;
        }
        let Some(label) = extract_quant_token(&a.filename) else {
            continue;
        };
        if let Some(bucket) = buckets.iter_mut().find(|(l, _)| *l == label) {
            bucket.1.push(a.artifact_id.clone());
        } else {
            buckets.push((label, vec![a.artifact_id.clone()]));
        }
    }
    let default_label = pick_default(buckets.iter().map(|(l, _)| l.as_str()));
    buckets
        .into_iter()
        .map(|(label, artifact_ids)| Variant {
            variant_id: VariantId::from(format!("{family_id}@{label}")),
            variant_type: VariantType::Quantization,
            label: label.clone(),
            artifact_ids,
            is_default: default_label.as_deref() == Some(label.as_str()),
            install_state: DownloadState::NotDownloaded,
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{DependencyRole, Precision, PrecisionSource};

    fn gguf_artifact(family: &FamilyId, filename: &str) -> Artifact {
        Artifact {
            artifact_id: ArtifactId::from(format!("{family}#{filename}")),
            role: DependencyRole::Primary,
            format: Format::Gguf,
            precision: Precision::Quantized,
            precision_source: PrecisionSource::Explicit,
            size_bytes: Some(1_000_000_000),
            filename: filename.into(),
            download_url: format!("https://example/{filename}"),
            sha256: None,
            install_state: DownloadState::NotDownloaded,
        }
    }

    #[test]
    fn detects_common_quant_set() {
        let family = FamilyId::from("hf:test/llama");
        let arts = [
            gguf_artifact(&family, "llama-3-Q4_K_M.gguf"),
            gguf_artifact(&family, "llama-3-Q5_K_M.gguf"),
            gguf_artifact(&family, "llama-3-Q8_0.gguf"),
        ];
        let variants = detect_variants(&family, &arts);
        let labels: Vec<&str> = variants.iter().map(|v| v.label.as_str()).collect();
        assert_eq!(labels, vec!["Q4_K_M", "Q5_K_M", "Q8_0"]);
        assert!(
            variants
                .iter()
                .find(|v| v.label == "Q4_K_M")
                .unwrap()
                .is_default,
            "Q4_K_M should be the default per R4"
        );
    }

    #[test]
    fn handles_sharded_filenames() {
        let family = FamilyId::from("hf:test/big");
        let arts = [
            gguf_artifact(&family, "big-Q5_K_M-00001-of-00003.gguf"),
            gguf_artifact(&family, "big-Q5_K_M-00002-of-00003.gguf"),
            gguf_artifact(&family, "big-Q5_K_M-00003-of-00003.gguf"),
        ];
        let variants = detect_variants(&family, &arts);
        assert_eq!(variants.len(), 1);
        assert_eq!(variants[0].label, "Q5_K_M");
        assert_eq!(variants[0].artifact_ids.len(), 3);
    }

    #[test]
    fn default_falls_back_to_q5_then_q8_then_first() {
        let family = FamilyId::from("hf:test/x");

        let q5_only = [gguf_artifact(&family, "x-Q5_K_M.gguf")];
        assert!(detect_variants(&family, &q5_only)[0].is_default);

        let q8_only = [gguf_artifact(&family, "x-Q8_0.gguf")];
        assert!(detect_variants(&family, &q8_only)[0].is_default);

        let exotic = [
            gguf_artifact(&family, "x-IQ3_M.gguf"),
            gguf_artifact(&family, "x-IQ4_XS.gguf"),
        ];
        let v = detect_variants(&family, &exotic);
        assert!(
            v[0].is_default,
            "first variant is default when no canonical match"
        );
        assert!(!v[1].is_default);
    }

    #[test]
    fn non_gguf_artifacts_are_ignored() {
        let family = FamilyId::from("hf:test/mix");
        let mut safetensors = gguf_artifact(&family, "model.safetensors");
        safetensors.format = Format::Safetensors;
        let arts = [gguf_artifact(&family, "model-Q4_K_M.gguf"), safetensors];
        let variants = detect_variants(&family, &arts);
        assert_eq!(variants.len(), 1);
        assert_eq!(variants[0].label, "Q4_K_M");
    }
}
