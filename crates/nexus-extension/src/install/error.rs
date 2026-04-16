//! Errors raised by the ZIP install pipeline (spec 019 FR-IE05).
//!
//! Every variant maps 1:1 to an HTTP error code surfaced by the axum handler;
//! see `contracts/zip-install-pipeline.md` §8 for the full mapping.

use crate::error::ExtensionError;

use super::svg_sanitize::SvgSanitizeError;

/// Structured failure modes for `ZipInstallPipeline::install`.
///
/// Marked `#[non_exhaustive]` so future FR-IE05 codes (e.g. signature
/// verification when it lands) can be added without a breaking change on
/// downstream matchers.
#[derive(Debug, thiserror::Error)]
#[non_exhaustive]
pub enum ZipInstallError {
    #[error("zip.corrupt: {0}")]
    Corrupt(String),

    #[error("zip.slip_attempt")]
    SlipAttempt,

    #[error("zip.missing_manifest")]
    MissingManifest,

    #[error("zip.size_limit: {actual} > {limit}")]
    SizeLimit { actual: u64, limit: u64 },

    #[error("zip.file_count_limit: {actual} > {limit}")]
    FileCountLimit { actual: usize, limit: usize },

    #[error("zip.executable_outside_assets: {path}")]
    ExecutableOutsideAssets { path: String },

    #[error("manifest.invalid: {0}")]
    ManifestInvalid(String),

    #[error("manifest.icon_invalid: {0}")]
    ManifestIconInvalid(String),

    #[error("extension.already_installed: {extension_id}")]
    AlreadyInstalled { extension_id: String },

    #[error("io.stage_failed: {0}")]
    StageFailed(#[from] std::io::Error),
}

impl ZipInstallError {
    /// Short, stable error code — used as the structured `code` field on the
    /// axum error envelope and in log events. Changing an existing value is a
    /// breaking change for downstream clients; add a new variant instead.
    pub fn code(&self) -> &'static str {
        match self {
            Self::Corrupt(_) => "zip.corrupt",
            Self::SlipAttempt => "zip.slip_attempt",
            Self::MissingManifest => "zip.missing_manifest",
            Self::SizeLimit { .. } => "zip.size_limit",
            Self::FileCountLimit { .. } => "zip.file_count_limit",
            Self::ExecutableOutsideAssets { .. } => "zip.executable_outside_assets",
            Self::ManifestInvalid(_) => "manifest.invalid",
            Self::ManifestIconInvalid(_) => "manifest.icon_invalid",
            Self::AlreadyInstalled { .. } => "extension.already_installed",
            Self::StageFailed(_) => "io.stage_failed",
        }
    }
}

impl From<SvgSanitizeError> for ZipInstallError {
    fn from(err: SvgSanitizeError) -> Self {
        Self::ManifestIconInvalid(err.to_string())
    }
}

impl From<ExtensionError> for ZipInstallError {
    fn from(err: ExtensionError) -> Self {
        Self::ManifestInvalid(err.to_string())
    }
}

impl From<zip::result::ZipError> for ZipInstallError {
    fn from(err: zip::result::ZipError) -> Self {
        match err {
            zip::result::ZipError::Io(io) => Self::StageFailed(io),
            other => Self::Corrupt(other.to_string()),
        }
    }
}
