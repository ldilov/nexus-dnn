//! Generic install-pipeline phase implementations (T051-T054, T058).
//!
//! Each phase mutates the [`InstallCtx`](super::install_ctx::InstallCtx)
//! in place; the orchestrator in
//! [`super::install_pipeline`](super::install_pipeline) calls them in
//! order. Failures return [`GenericInstallError`](super::errors::GenericInstallError)
//! with a structured [`PipelineFailureCategory`](super::enums::PipelineFailureCategory).

pub mod download;
pub mod extract;
pub mod resolve;
pub mod verify;
