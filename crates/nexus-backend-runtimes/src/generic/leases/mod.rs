//! Lease subsystem — live lease rows, JSON-RPC framer, matchmaker,
//! notification fanout, crash recovery.
//!
//! This module currently exposes the storage record shape and the repo
//! trait (T015). Subsequent tasks wire in:
//! - T018 trait `BackendRuntimeLease` + `LeaseNotification`
//! - T019 NDJSON framer (8 MB cap, JSON-RPC 2.0 envelope)
//! - T020 JSON-RPC matchmaker
//! - T021 Notification fanout
//! - T027 Crash-recovery sweep

pub mod acquire;
pub mod crash_recovery;
pub mod error;
pub mod framer;
pub mod handshake;
pub mod manager;
pub mod matchmaker;
pub mod notifications;
pub mod progress_log;
pub mod repo;
pub mod sqlite;
pub mod stdio_lease;
pub mod text_completion;
pub mod trait_def;

pub use acquire::{AcquireOptions, acquire_lease};
pub use error::LeaseError;
pub use handshake::{HANDSHAKE_TIMEOUT, HOST_PROTOCOL_VERSION, HandshakeInfo, do_handshake};
pub use manager::LeaseManager;
pub use matchmaker::{Matchmaker, MatchmakerFailure};
pub use notifications::{NOTIFICATION_BACKLOG_CAPACITY, NotificationFanout};
pub use sqlite::SqliteLeasesRepo;
pub use stdio_lease::{DEFAULT_RPC_TIMEOUT, SHUTDOWN_GRACE, StdioLease};
pub use trait_def::{BackendRuntimeLease, LeaseNotification};

use crate::generic::enums::{LeaseState, OwnerKind, PipelineFailureCategory, Transport};
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};

/// In-memory projection of one lease row. Retained for audit after
/// release (`released_at` is populated and `state` becomes `released`).
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LeaseRecord {
    pub lease_id: RuntimeLeaseId,
    pub runtime_install_id: RuntimeInstallId,
    pub owner_kind: OwnerKind,
    /// Caller-supplied opaque key (deployment_id, run_id, session uuid).
    pub owner_ref: String,
    pub transport: Transport,
    /// Transport-specific endpoint descriptor. `None` for stdio (v1).
    pub endpoint_json: Option<serde_json::Value>,
    /// Worker subprocess PID; `None` pre-spawn and post-reap.
    pub pid: Option<i32>,
    pub state: LeaseState,
    /// Set to `true` by the host startup sweep (R-05) for rows left
    /// non-terminal across a host restart.
    pub crash_recovered: bool,
    pub last_failure_category: Option<PipelineFailureCategory>,
    pub acquired_at: i64,
    /// Populated when the lease transitions to `released` or `failed`.
    pub released_at: Option<i64>,
}

pub use repo::BackendRuntimeLeasesRepo;
