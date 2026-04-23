//! Python runtime family handler (spec 032, FR-021).
//!
//! Implements the `bootstrap_runtime`, `install_deps`, and `validate_env`
//! phase hooks for extensions that declare `family: python` in their
//! `backend_runtime` manifest entries, plus a [`LaunchSpec`] helper that
//! spawns the embedded interpreter + the worker entrypoint.
//!
//! Public surface is [`FamilyPythonHandler`] and the asset descriptor
//! types in [`asset`]. Internal phase runners live in sibling modules
//! (`bootstrap`, `uv_install`, `validate`).

pub mod asset;
pub mod bootstrap;
pub mod config;
pub mod handler;
pub mod uv_install;
pub mod validate;

pub use asset::{PythonArchiveKind, PythonAsset};
pub use config::PythonAssetConfig;
pub use handler::{FamilyPythonHandler, python_exe_in};
pub use uv_install::UvInvocation;

use crate::family::RuntimeFamily;

/// The family this module handles. Callers MUST use this constant rather
/// than hardcoding `RuntimeFamily::Python` so a future rename or trait
/// replacement touches one site.
pub const FAMILY: RuntimeFamily = RuntimeFamily::Python;
