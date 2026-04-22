//! Typed errors for the generic backend-runtime subsystem.
//!
//! Distinct from [`crate::error`] which is llama.cpp-pipeline-scoped.
//! Naming avoids collision: this crate re-exports the legacy error type
//! as `BackendRuntimeError` / `InstallError` at root, so everything here
//! uses the `Generic` prefix when accessed as `generic::errors::*`.

use thiserror::Error;

use super::enums::PipelineFailureCategory;

/// Pipeline-wide install failure. Carries a structured category plus a
/// human-readable detail; implementations attach the category returned by
/// the phase that failed.
#[derive(Debug, Error)]
#[error("install failed in phase `{phase}`: {category:?} — {detail}")]
pub struct GenericInstallError {
    pub phase: String,
    pub category: PipelineFailureCategory,
    pub detail: String,
}

impl GenericInstallError {
    pub fn new(
        phase: impl Into<String>,
        category: PipelineFailureCategory,
        detail: impl Into<String>,
    ) -> Self {
        Self {
            phase: phase.into(),
            category,
            detail: detail.into(),
        }
    }
}

/// Catalog-layer errors (manifest validation, upsert conflicts).
#[derive(Debug, Error)]
pub enum GenericCatalogError {
    #[error("duplicate runtime_id `{runtime_id}`: contributed by `{existing_extension}` and `{new_extension}`")]
    DuplicateRuntimeId {
        runtime_id: String,
        existing_extension: String,
        new_extension: String,
    },
    #[error("invalid runtime contribution: {field}: {reason}")]
    InvalidContribution { field: String, reason: String },
    #[error("unknown runtime family: `{raw}`")]
    UnknownFamily { raw: String },
    #[error("storage error: {0}")]
    Storage(String),
}
