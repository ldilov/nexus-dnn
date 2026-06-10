//! Normalization pipeline: transforms raw upstream repository data into
//! canonical [`crate::model::ModelFamily`] values.
//!
//! The pipeline is a chain of pure functions with no I/O. Order of
//! application per spec FR-100 / research R9:
//!
//! 1. [`classify::classify_format`] — format from metadata, filename fallback.
//! 2. [`classify::classify_modality`] — HF pipeline_tag → Modality.
//! 3. [`precision::infer_precision`] — value + source marker.
//! 4. [`deps::resolve_dependencies`] — VAE / tokenizer / etc.
//! 5. [`variants::detect_variants`] — GGUF quantization picker.
//! 6. [`compat::classify_compat`] — final intersect with capability registry.

pub mod classify;
pub mod compat;
pub mod deps;
pub mod precision;
pub mod variants;

use nexus_huggingface::SearchResult as HfSearchResult;

use crate::capabilities::CapabilityRegistry;
use crate::ids::{ArtifactId, FamilyId};
use crate::model::{Artifact, ModelFamily, ModelRepository, SourceProvider};
use crate::types::{DependencyRole, DownloadState, Modality};

/// Full pipeline: take a raw HF search result and produce a normalized
/// [`ModelFamily`] with compatibility classified against the registry.
///
/// This function is the integrator — it composes every submodule in
/// the documented order. Its only side effect is a `tracing::trace!`
/// on unknown-format rows (dropped to keep the result stable).
#[must_use]
pub fn normalize_family(raw: &HfSearchResult, registry: &CapabilityRegistry) -> ModelFamily {
    let repo_id = raw.repo_id.clone();
    let (owner, name) = split_repo_id(&repo_id);
    let family_id = FamilyId::from(format!("huggingface:{repo_id}"));
    let modality = classify::classify_modality(raw.pipeline_tag.as_deref(), &[]);
    let repository = ModelRepository {
        repo_id,
        source_provider: SourceProvider::Huggingface,
        owner,
        name,
        description: None,
        license: raw.license.clone(),
        tags: vec![],
        downloads: raw.downloads_30d,
        likes: None,
        last_updated: raw
            .last_modified
            .as_deref()
            .and_then(|s| chrono::DateTime::parse_from_rfc3339(s).ok())
            .map(|dt| dt.with_timezone(&chrono::Utc)),
        modality,
    };

    let mut artifacts: Vec<Artifact> = raw
        .files
        .iter()
        .filter_map(|file| build_artifact(&family_id, file, &raw.repo_id))
        .collect();

    assign_primary_role(&mut artifacts);

    let variants = variants::detect_variants(&family_id, &artifacts);
    let dependencies = deps::resolve_dependencies(&artifacts);

    let mut family = ModelFamily {
        family_id,
        repository,
        artifacts,
        variants,
        dependencies,
        compat: crate::types::CompatibilityStatus::Unknown,
        warnings: vec![],
    };
    family.compat = compat::classify_compat(&family, registry);
    family
}

fn build_artifact(
    family_id: &FamilyId,
    file: &nexus_huggingface::RepoFile,
    repo_id: &str,
) -> Option<Artifact> {
    let filename = file.path.clone();
    if filename.is_empty() {
        return None;
    }
    let format = classify::classify_format(&filename);
    if matches!(format, crate::types::Format::Unknown) && !is_candidate_companion(&filename) {
        return None;
    }
    let role = deps::classify_role(&filename);
    let (precision, precision_source) = precision::infer_precision(format, &filename, None);
    let download_url = format!("https://huggingface.co/{repo_id}/resolve/main/{filename}",);
    Some(Artifact {
        artifact_id: ArtifactId::from(format!("{family_id}#{filename}")),
        role,
        format,
        precision,
        precision_source,
        size_bytes: file.size_bytes,
        filename,
        download_url,
        sha256: None,
        install_state: DownloadState::NotDownloaded,
    })
}

fn is_candidate_companion(filename: &str) -> bool {
    let lower = filename.to_ascii_lowercase();
    lower == "tokenizer.json"
        || lower == "tokenizer.model"
        || lower == "tokenizer_config.json"
        || lower == "vocab.json"
        || lower == "merges.txt"
        || lower.contains("tokenizer")
}

fn assign_primary_role(artifacts: &mut [Artifact]) {
    if artifacts.iter().any(|a| a.role == DependencyRole::Primary) {
        return;
    }
    let primary_idx = artifacts
        .iter()
        .enumerate()
        .filter(|(_, a)| a.role == DependencyRole::Other)
        .max_by_key(|(_, a)| a.size_bytes.unwrap_or(0))
        .map(|(i, _)| i);
    if let Some(i) = primary_idx {
        artifacts[i].role = DependencyRole::Primary;
        return;
    }
    let fallback_idx = artifacts
        .iter()
        .enumerate()
        .filter(|(_, a)| !matches!(a.format, crate::types::Format::Unknown))
        .max_by_key(|(_, a)| a.size_bytes.unwrap_or(0))
        .map(|(i, _)| i);
    if let Some(i) = fallback_idx {
        artifacts[i].role = DependencyRole::Primary;
    }
}

fn split_repo_id(id: &str) -> (String, String) {
    match id.split_once('/') {
        Some((owner, name)) => (owner.to_owned(), name.to_owned()),
        None => (String::new(), id.to_owned()),
    }
}

fn _silence_modality_unused() -> Modality {
    Modality::Other
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::capabilities::LlamaCppAdapter;
    use std::sync::Arc;

    fn gguf_result() -> HfSearchResult {
        HfSearchResult {
            repo_id: "TheBloke/Llama-3-8B-Instruct-GGUF".into(),
            author: Some("TheBloke".into()),
            license: Some("llama3".into()),
            downloads_30d: Some(10000),
            last_modified: Some("2026-01-01T00:00:00Z".into()),
            files: vec![
                nexus_huggingface::RepoFile {
                    path: "Llama-3-8B-Instruct.Q4_K_M.gguf".into(),
                    size_bytes: Some(4_900_000_000),
                },
                nexus_huggingface::RepoFile {
                    path: "Llama-3-8B-Instruct.Q5_K_M.gguf".into(),
                    size_bytes: Some(5_700_000_000),
                },
                nexus_huggingface::RepoFile {
                    path: "README.md".into(),
                    size_bytes: Some(8000),
                },
            ],
            formats: vec!["gguf".into()],
            quantizations: vec!["Q4_K_M".into(), "Q5_K_M".into()],
            pipeline_tag: Some("text-generation".into()),
        }
    }

    #[test]
    fn gguf_result_normalizes_to_compatible_llm_family() {
        let mut reg = CapabilityRegistry::new();
        reg.register(Arc::new(LlamaCppAdapter::new()));
        let fam = normalize_family(&gguf_result(), &reg);

        assert_eq!(fam.repository.modality, Modality::Llm);
        assert_eq!(fam.artifacts.len(), 2, "README is dropped, 2 GGUF kept");
        assert_eq!(fam.variants.len(), 2);
        assert_eq!(fam.compat, crate::types::CompatibilityStatus::Compatible);
        let default = fam.variants.iter().find(|v| v.is_default).unwrap();
        assert_eq!(default.label, "Q4_K_M");
    }

    #[test]
    fn sdxl_without_backend_is_downloadable_only() {
        let raw = HfSearchResult {
            repo_id: "stabilityai/stable-diffusion-xl-base-1.0".into(),
            author: Some("stabilityai".into()),
            license: Some("openrail++".into()),
            downloads_30d: Some(500_000),
            last_modified: None,
            files: vec![
                nexus_huggingface::RepoFile {
                    path: "sd_xl_base_1.0.safetensors".into(),
                    size_bytes: Some(6_900_000_000),
                },
                nexus_huggingface::RepoFile {
                    path: "vae/diffusion_pytorch_model.safetensors".into(),
                    size_bytes: Some(335_000_000),
                },
            ],
            formats: vec!["safetensors".into()],
            quantizations: vec![],
            pipeline_tag: Some("text-to-image".into()),
        };
        let mut reg = CapabilityRegistry::new();
        reg.register(Arc::new(LlamaCppAdapter::new()));
        let fam = normalize_family(&raw, &reg);
        assert_eq!(fam.repository.modality, Modality::Image);
        assert_eq!(
            fam.compat,
            crate::types::CompatibilityStatus::DownloadableButNotRunnable
        );
    }
}
