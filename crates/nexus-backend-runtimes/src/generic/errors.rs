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
    #[error(
        "duplicate runtime_id `{runtime_id}`: contributed by `{existing_extension}` and `{new_extension}`"
    )]
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
    #[error(transparent)]
    Repo(#[from] GenericRepoError),
}

/// Storage-layer repository error. Concrete SQLite impls (T016) map
/// `sqlx::Error` onto these variants; higher layers (catalog service,
/// install pipeline) wrap these into domain-specific errors
/// ([`GenericCatalogError`], [`GenericInstallError`]).
#[derive(Debug, Error)]
pub enum GenericRepoError {
    #[error("storage error: {0}")]
    Storage(String),
    #[error("row not found")]
    NotFound,
    #[error("unique constraint violation: {0}")]
    UniqueViolation(String),
    #[error("invalid state transition from `{from}` to `{to}`")]
    InvalidTransition { from: String, to: String },
    #[error("serialization error: {0}")]
    Serialization(String),
}

impl From<sqlx::Error> for GenericRepoError {
    fn from(e: sqlx::Error) -> Self {
        match e {
            sqlx::Error::RowNotFound => GenericRepoError::NotFound,
            sqlx::Error::Database(db) if db.is_unique_violation() => {
                GenericRepoError::UniqueViolation(db.to_string())
            }
            other => GenericRepoError::Storage(other.to_string()),
        }
    }
}

impl From<serde_json::Error> for GenericRepoError {
    fn from(e: serde_json::Error) -> Self {
        GenericRepoError::Serialization(e.to_string())
    }
}
