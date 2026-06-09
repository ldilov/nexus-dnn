//! Generic extension dependency installer.
//!
//! See `specs/035-extension-dependency-installer/spec.md` for the contract this crate
//! implements. This crate is host-owned and extension-agnostic — zero extension-id
//! literals, zero step-type-specific control flow outside the matching handler module.

pub mod context;
pub mod error;
pub mod fetch;
pub mod handler;
pub mod handlers;
pub mod plan;
pub mod runner;
pub mod types;

pub use context::{
    HandshakeError, ModelDownloadProgress, ModelPartialState, ModelStoreClient,
    RuntimeBootstrapResult, RuntimeBootstrapper, StepContext, WorkerHandshake,
};
pub use error::DepError;
pub use handler::{HandlerRegistry, ProbeResult, StepHandler};
pub use plan::{DependenciesBlock, InstallPlan, Step, parse_dependencies_block};
pub use runner::{InstallReport, InstallRunner, RunnerContext};
pub use types::{
    ArchiveFormat, ExtensionInstallState, InstallOutcome, PlatformTuple, ProgressEvent,
    ProgressSink, StepArtifact, StepError, StepEstimate, StepProgress, StepStatus, derive_pct,
};
