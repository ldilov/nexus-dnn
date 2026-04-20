//! Normalized model-store domain structs — the values produced by
//! `crate::normalize` and consumed by `nexus-api` DTOs and the frontend
//! renderers.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::ids::{ArtifactId, BackendId, FamilyId, VariantId};
use crate::types::{
    CompatibilityStatus, DependencyRole, DownloadState, Format, Modality, Precision,
    PrecisionSource, Requirement, VariantType,
};

/// Upstream repository (Hugging Face in v1).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelRepository {
    pub repo_id: String,
    pub source_provider: SourceProvider,
    pub owner: String,
    pub name: String,
    #[serde(default)]
    pub description: Option<String>,
    #[serde(default)]
    pub license: Option<String>,
    #[serde(default)]
    pub tags: Vec<String>,
    #[serde(default)]
    pub downloads: Option<u64>,
    #[serde(default)]
    pub likes: Option<u64>,
    #[serde(default)]
    pub last_updated: Option<DateTime<Utc>>,
    #[serde(default)]
    pub modality: Modality,
}

/// Upstream source provider. `#[non_exhaustive]` so future providers
/// (civitai, direct URL, etc.) can be added without breaking clients.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SourceProvider {
    #[default]
    Huggingface,
    #[serde(other)]
    Other,
}

/// A normalized model family — exactly one per upstream repo in v1.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelFamily {
    pub family_id: FamilyId,
    pub repository: ModelRepository,
    pub artifacts: Vec<Artifact>,
    pub variants: Vec<Variant>,
    #[serde(default)]
    pub dependencies: Vec<Dependency>,
    pub compat: CompatibilityStatus,
    /// Optional non-fatal warnings the handler wants the UI to surface
    /// (e.g. `"auth_required"` for gated repos, `"degraded_metadata"`).
    #[serde(default)]
    pub warnings: Vec<String>,
}

/// A concrete downloadable asset.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Artifact {
    pub artifact_id: ArtifactId,
    pub role: DependencyRole,
    pub format: Format,
    pub precision: Precision,
    pub precision_source: PrecisionSource,
    #[serde(default)]
    pub size_bytes: Option<u64>,
    pub filename: String,
    pub download_url: String,
    #[serde(default)]
    pub sha256: Option<String>,
    #[serde(default)]
    pub install_state: DownloadState,
}

/// A selectable variant inside a family — a GGUF quantization row, a
/// precision tier, etc.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Variant {
    pub variant_id: VariantId,
    pub variant_type: VariantType,
    pub label: String,
    pub artifact_ids: Vec<ArtifactId>,
    #[serde(default)]
    pub is_default: bool,
    #[serde(default)]
    pub install_state: DownloadState,
}

/// A companion-artifact relation. Either `target_artifact_id` (same
/// family) or `external_ref` (different repo) is set — never both.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Dependency {
    pub role: DependencyRole,
    pub requirement: Requirement,
    #[serde(default)]
    pub target_artifact_id: Option<ArtifactId>,
    #[serde(default)]
    pub external_ref: Option<ExternalDependencyRef>,
}

/// Pointer to an artifact in a different upstream repo (future use —
/// v1 does not produce these, but the shape is stable so the frontend
/// does not need to change when we start emitting them).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExternalDependencyRef {
    pub source_provider: SourceProvider,
    pub repo_id: String,
    pub filename: String,
}

/// Capability description for a runtime backend. Emitted by
/// `GET /api/v1/model-store/backends` and consumed by the frontend
/// filter bar; re-used internally by
/// [`crate::normalize::compat::classify_compat`].
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackendCapability {
    pub backend_id: BackendId,
    pub display_name: String,
    pub supported_formats: Vec<Format>,
    #[serde(default)]
    pub supports_quantized_variants: bool,
    #[serde(default)]
    pub supports_multi_artifact_models: bool,
    pub status: BackendStatus,
}

/// Enablement state exposed by a backend adapter.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum BackendStatus {
    #[default]
    Enabled,
    Experimental,
    Disabled,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_download_state_is_not_downloaded() {
        assert_eq!(DownloadState::default(), DownloadState::NotDownloaded);
    }

    #[test]
    fn source_provider_serialises_snake_case() {
        let p = SourceProvider::Huggingface;
        assert_eq!(serde_json::to_string(&p).unwrap(), "\"huggingface\"");
    }
}
