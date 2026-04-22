//! Python runtime family handler (spec 032, FR-021).
//!
//! Implements the `bootstrap_runtime`, `install_deps`, and `validate_env`
//! phase hooks for extensions that declare `family: python` in their
//! `backend_runtime` manifest entries.
//!
//! Concrete logic (embedded Python download, `uv sync`, probe) lands in
//! follow-up tasks T059–T062. This module currently establishes the
//! crate-level entry point and namespace.

use crate::family::RuntimeFamily;

/// The family this module handles. Callers MUST use this constant rather
/// than hardcoding `RuntimeFamily::Python` so a future rename or trait
/// replacement touches one site.
pub const FAMILY: RuntimeFamily = RuntimeFamily::Python;
