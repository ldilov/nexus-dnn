//! Generic multi-family backend-runtime subsystem (spec 032).
//!
//! Parallel to the grandfathered [`crate::llamacpp`] path. The generic
//! subsystem knows nothing about any specific extension or runtime family
//! beyond the opaque family string it receives from extension manifests;
//! family-specific behaviour lives behind the `RuntimeFamilyHandler` trait
//! (implemented by sibling modules such as `crate::family_python`).
//!
//! Phase-2 modules landed so far:
//! - [`enums`] — non-exhaustive state enums
//! - [`errors`] — typed error enums (install, catalog, repo)
//! - [`ids`] — newtype ids
//! - [`catalog`], [`installs`], [`settings`], [`leases`] — storage entity
//!   shapes + async repository traits (T015)
//!
//! Phase-2 follow-ups (subsequent tasks): concrete SQLite repo impls
//! (T016), repo tests (T017), `BackendRuntimeLease` trait + framer +
//! matchmaker (T018–T023), `RuntimeFamilyHandler` trait + registry (T024),
//! `InstallCtx` + pipeline orchestrator (T025–T026), crash recovery
//! (T027–T028).

pub mod catalog;
pub mod enums;
pub mod errors;
pub mod family_handler;
pub mod host_model_registrar;
pub mod ids;
pub mod install_ctx;
pub mod install_pipeline;
pub mod installs;
pub mod leases;
pub mod phases;
pub mod settings;
pub mod version_manifest;
