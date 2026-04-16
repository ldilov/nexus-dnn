//! Modules surface — aggregate read endpoints over `extensions` / `recipes` /
//! `workflows` / `deployments` plus sugar write endpoints for the one-click
//! Deploy Instance flow, Blueprint dry-run, and Blank Module materialize
//! (spec 019 FR-027..FR-031, FR-BM04).

pub mod module_id;

pub use module_id::{ModuleId, ModuleIdKind, ModuleIdParseError};
