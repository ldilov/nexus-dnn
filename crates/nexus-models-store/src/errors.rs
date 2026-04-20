use std::path::PathBuf;

use thiserror::Error;

/// Unified error taxonomy for `nexus-models-store`.
///
/// Two coexisting concerns share this enum:
/// 1. The original installer / lease / provenance pipeline (pre-025).
/// 2. The spec-025 model-store handler surface
///    (`contracts/rust-backend-adapter.md §4`) — search, detail, download,
///    auth. Handlers under `crates/nexus-api/src/handlers/model_store/` map
///    these variants to the REST envelope's `error.code` (snake_case name)
///    via `error_map::into_response`.
#[derive(Debug, Error)]
pub enum ModelStoreError {
    // ---------- spec-025 model-store surface ----------
    /// Upstream provider (Hugging Face in v1) could not be reached. Maps to
    /// HTTP 502 `upstream_unavailable`.
    #[error("upstream unavailable: {0}")]
    UpstreamUnavailable(String),

    /// The upstream returned 401/403 for a gated repository and the caller
    /// has not yet supplied a valid token. Maps to HTTP 401 `auth_required`
    /// so the frontend can trigger the Settings token flow (FR-114).
    #[error("auth required for {repo}")]
    AuthRequired { repo: String },

    /// The requested `family_id` was not found or did not normalize. Maps
    /// to HTTP 404 `family_not_found`.
    #[error("family not found: {0}")]
    FamilyNotFound(String),

    /// A download request referenced an artifact / variant / dependency
    /// that does not belong to the resolved family. Maps to HTTP 404
    /// `target_not_found`.
    #[error("target not found in family")]
    TargetNotFound,

    /// The resolved target is not runnable by any enabled backend (FR-060
    /// → `unsupported`). Maps to HTTP 422 `incompatible`.
    #[error("incompatible: {0}")]
    Incompatible(String),

    /// Generic internal failure — an invariant broke inside normalization,
    /// the orchestrator, or an adapter. Maps to HTTP 500 `internal`.
    #[error("internal: {0}")]
    Internal(String),

    // ---------- pre-existing installer surface ----------
    #[error("model install not found: {0}")]
    InstallNotFound(String),

    #[error("install {install_id} has active leases held by {extensions:?}")]
    LeasedByExtensions {
        install_id: String,
        extensions: Vec<String>,
    },

    #[error("checksum mismatch for {file}: expected {expected}, got {actual}")]
    ChecksumMismatch {
        file: PathBuf,
        expected: String,
        actual: String,
    },

    #[error("insufficient VRAM on {device}: requested {requested}, available {available}")]
    InsufficientResources {
        device: String,
        requested: u64,
        available: u64,
    },

    #[error("source unreachable ({source_url}): {detail}")]
    SourceUnreachable { source_url: String, detail: String },

    #[error("manifest invalid: {0}")]
    ManifestInvalid(String),

    #[error("storage error: {0}")]
    Storage(String),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

impl ModelStoreError {
    /// Snake-case variant name used as the `error.code` field in the REST
    /// envelope. Stable across refactors — new variants must add a new code,
    /// never rename an existing one.
    #[must_use]
    pub fn code(&self) -> &'static str {
        match self {
            Self::UpstreamUnavailable(_) => "upstream_unavailable",
            Self::AuthRequired { .. } => "auth_required",
            Self::FamilyNotFound(_) => "family_not_found",
            Self::TargetNotFound => "target_not_found",
            Self::Incompatible(_) => "incompatible",
            Self::Internal(_) => "internal",
            Self::InstallNotFound(_) => "install_not_found",
            Self::LeasedByExtensions { .. } => "leased_by_extensions",
            Self::ChecksumMismatch { .. } => "checksum_mismatch",
            Self::InsufficientResources { .. } => "insufficient_resources",
            Self::SourceUnreachable { .. } => "source_unreachable",
            Self::ManifestInvalid(_) => "manifest_invalid",
            Self::Storage(_) => "storage",
            Self::Io(_) => "io",
        }
    }

    /// HTTP status that handlers should emit when surfacing this error.
    /// Kept on the error type so every call site agrees without re-deriving
    /// the mapping inline.
    #[must_use]
    pub fn status_u16(&self) -> u16 {
        match self {
            Self::UpstreamUnavailable(_) | Self::SourceUnreachable { .. } => 502,
            Self::AuthRequired { .. } => 401,
            Self::FamilyNotFound(_)
            | Self::TargetNotFound
            | Self::InstallNotFound(_) => 404,
            Self::Incompatible(_)
            | Self::ChecksumMismatch { .. }
            | Self::InsufficientResources { .. }
            | Self::ManifestInvalid(_) => 422,
            Self::LeasedByExtensions { .. } => 409,
            Self::Internal(_) | Self::Storage(_) | Self::Io(_) => 500,
        }
    }
}

impl From<sqlx::Error> for ModelStoreError {
    fn from(e: sqlx::Error) -> Self {
        Self::Storage(e.to_string())
    }
}

pub type ModelStoreResult<T> = Result<T, ModelStoreError>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn error_codes_are_stable_snake_case() {
        assert_eq!(
            ModelStoreError::UpstreamUnavailable("x".into()).code(),
            "upstream_unavailable"
        );
        assert_eq!(
            ModelStoreError::AuthRequired { repo: "a/b".into() }.code(),
            "auth_required"
        );
        assert_eq!(
            ModelStoreError::FamilyNotFound("x".into()).code(),
            "family_not_found"
        );
        assert_eq!(ModelStoreError::TargetNotFound.code(), "target_not_found");
        assert_eq!(
            ModelStoreError::Incompatible("unsupported".into()).code(),
            "incompatible"
        );
        assert_eq!(
            ModelStoreError::Internal("bug".into()).code(),
            "internal"
        );
    }

    #[test]
    fn status_codes_match_rest_contract() {
        assert_eq!(
            ModelStoreError::UpstreamUnavailable("x".into()).status_u16(),
            502
        );
        assert_eq!(
            ModelStoreError::AuthRequired { repo: "a/b".into() }.status_u16(),
            401
        );
        assert_eq!(
            ModelStoreError::FamilyNotFound("x".into()).status_u16(),
            404
        );
        assert_eq!(ModelStoreError::TargetNotFound.status_u16(), 404);
        assert_eq!(
            ModelStoreError::Incompatible("x".into()).status_u16(),
            422
        );
        assert_eq!(ModelStoreError::Internal("x".into()).status_u16(), 500);
    }
}
