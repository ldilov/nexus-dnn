//! Artifact download orchestrator with a strict concurrency cap (FR-087)
//! and resumable, state-tracked jobs persisted in the SQLite
//! `download_jobs` + `download_job_artifacts` tables (migration 013).

pub mod auth;
pub mod install_map;
pub mod legibility;
pub mod orchestrator;
pub mod store;

pub use auth::{TokenEvent, TokenStore};
pub use install_map::{
    GcOutcome, InstallMap, InstalledArtifactRecord, InstalledArtifactRow, PruneReport,
    ReconcileReport,
};
pub use legibility::{IndexEntry, LegibilityIndex, ManifestSidecar};
pub use orchestrator::DownloadOrchestrator;
pub use store::{
    CreateJobParams, JobStore, JobStoreError, JobStoreResult, JobTargetInput, PersistedJob,
    PersistedTarget, RequestedKind, TargetState,
};

/// Maximum number of concurrent active download jobs enforced by the
/// orchestrator (FR-087, FR-088). Raise the value here to lift the cap
/// without touching UI or contract layers.
pub const MAX_CONCURRENT_DOWNLOADS: usize = 2;
