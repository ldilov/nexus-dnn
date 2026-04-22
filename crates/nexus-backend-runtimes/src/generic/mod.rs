//! Generic multi-family backend-runtime subsystem (spec 032).
//!
//! Parallel to the grandfathered [`crate::llamacpp`] path. The generic
//! subsystem knows nothing about any specific extension or runtime family
//! beyond the opaque family string it receives from extension manifests;
//! family-specific behaviour lives behind the `RuntimeFamilyHandler` trait
//! (implemented by sibling modules such as `crate::family_python`).
//!
//! Phase-2 modules (this session):
//! - [`enums`] — non-exhaustive state enums
//! - [`errors`] — typed error enums
//! - [`ids`] — newtype ids
//!
//! Phase-2 follow-ups (subsequent sessions): `family_handler`, `install_ctx`,
//! `install_pipeline`, `phases/*`, `catalog`, `installs`, `settings`, `leases`.

pub mod enums;
pub mod errors;
pub mod ids;
