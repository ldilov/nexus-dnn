//! Spec 032 — manifest `backend_runtimes:` validation.
//!
//! Extensions declare zero or more `backend_runtimes` in their manifest.
//! Each entry becomes one row in the host's `backend_runtime_catalog`.
//! This module validates the entry's shape; registration (checksum +
//! upsert) lives in the host bridge under `nexus-api`.

pub mod schema;

pub use schema::{ContributionValidationError, validate_contribution, validate_contributions};
