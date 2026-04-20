//! Compatibility classifier — the single owner of
//! [`crate::types::CompatibilityStatus`] derivation.
//!
//! The frontend never re-derives this value; it renders the enum the
//! backend produced. Keeping the rule in one place prevents two
//! definitions of truth drifting over time (Principle III — SINGLE-CHOICE).

use crate::capabilities::CapabilityRegistry;
use crate::model::ModelFamily;
use crate::types::{CompatibilityStatus, DependencyRole, Format, Requirement};

/// Classify compatibility of a normalized family against the currently
/// enabled backend set. Rule table per research R9:
///
/// ```text
/// (primary.format, supporting_backend, required_deps_satisfied)
/// -----------------------------------------------------------
/// (Unknown,      _,     _     ) => Unsupported
/// (fmt,   some,  true   ) => Compatible
/// (fmt,   some,  false  ) => CompatibleWithRequirements
/// (fmt,   empty, _      ) => DownloadableButNotRunnable  (if fmt is known)
/// (_,     _,     _      ) => Unknown
/// ```
#[must_use]
pub fn classify_compat(
    family: &ModelFamily,
    registry: &CapabilityRegistry,
) -> CompatibilityStatus {
    let Some(primary) = family
        .artifacts
        .iter()
        .find(|a| a.role == DependencyRole::Primary)
    else {
        return CompatibilityStatus::Unsupported;
    };

    if primary.format == Format::Unknown {
        return CompatibilityStatus::Unsupported;
    }

    let has_backend = registry.supporting_format(primary.format).next().is_some();
    if !has_backend {
        return CompatibilityStatus::DownloadableButNotRunnable;
    }

    let all_required_met = family
        .dependencies
        .iter()
        .filter(|d| d.requirement == Requirement::Required)
        .all(|d| {
            if let Some(target) = &d.target_artifact_id {
                family.artifacts.iter().any(|a| a.artifact_id == *target)
            } else {
                false
            }
        });

    if all_required_met {
        CompatibilityStatus::Compatible
    } else {
        CompatibilityStatus::CompatibleWithRequirements
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::capabilities::LlamaCppAdapter;
    use crate::ids::{ArtifactId, FamilyId};
    use crate::model::{Artifact, Dependency, ModelRepository, SourceProvider};
    use crate::types::{
        DownloadState, Modality, Precision, PrecisionSource,
    };
    use std::sync::Arc;

    fn llm_repo() -> ModelRepository {
        ModelRepository {
            repo_id: "t/m".into(),
            source_provider: SourceProvider::Huggingface,
            owner: "t".into(),
            name: "m".into(),
            description: None,
            license: None,
            tags: vec![],
            downloads: None,
            likes: None,
            last_updated: None,
            modality: Modality::Llm,
        }
    }

    fn primary(fmt: Format) -> Artifact {
        Artifact {
            artifact_id: ArtifactId::from("hf:t/m#p.bin"),
            role: DependencyRole::Primary,
            format: fmt,
            precision: Precision::Unknown,
            precision_source: PrecisionSource::Unknown,
            size_bytes: None,
            filename: "p".into(),
            download_url: "u".into(),
            sha256: None,
            install_state: DownloadState::NotDownloaded,
        }
    }

    fn family_with(artifacts: Vec<Artifact>, deps: Vec<Dependency>) -> ModelFamily {
        ModelFamily {
            family_id: FamilyId::from("hf:t/m"),
            repository: llm_repo(),
            artifacts,
            variants: vec![],
            dependencies: deps,
            compat: CompatibilityStatus::Unknown,
            warnings: vec![],
        }
    }

    fn registry() -> CapabilityRegistry {
        let mut r = CapabilityRegistry::new();
        r.register(Arc::new(LlamaCppAdapter::new()));
        r
    }

    #[test]
    fn gguf_primary_is_compatible() {
        let fam = family_with(vec![primary(Format::Gguf)], vec![]);
        assert_eq!(classify_compat(&fam, &registry()), CompatibilityStatus::Compatible);
    }

    #[test]
    fn safetensors_without_backend_is_downloadable_only() {
        let fam = family_with(vec![primary(Format::Safetensors)], vec![]);
        assert_eq!(
            classify_compat(&fam, &registry()),
            CompatibilityStatus::DownloadableButNotRunnable
        );
    }

    #[test]
    fn unknown_format_is_unsupported() {
        let fam = family_with(vec![primary(Format::Unknown)], vec![]);
        assert_eq!(
            classify_compat(&fam, &registry()),
            CompatibilityStatus::Unsupported
        );
    }

    #[test]
    fn no_primary_is_unsupported() {
        let fam = family_with(vec![], vec![]);
        assert_eq!(
            classify_compat(&fam, &registry()),
            CompatibilityStatus::Unsupported
        );
    }

    #[test]
    fn missing_required_dep_downgrades_to_needs_requirements() {
        let missing_dep = Dependency {
            role: DependencyRole::Vae,
            requirement: Requirement::Required,
            target_artifact_id: Some(ArtifactId::from("hf:t/m#absent.safetensors")),
            external_ref: None,
        };
        let fam = family_with(vec![primary(Format::Gguf)], vec![missing_dep]);
        assert_eq!(
            classify_compat(&fam, &registry()),
            CompatibilityStatus::CompatibleWithRequirements
        );
    }
}
