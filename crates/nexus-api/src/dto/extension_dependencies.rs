//! DTOs for the spec 035 Extension Dependency Installer HTTP API.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum StepStatusKind {
    Pending,
    Running,
    Ok,
    Failed,
    Skipped,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepProgressDto {
    pub phase: String,
    pub current_bytes: u64,
    pub total_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepArtifactDto {
    pub path: Option<String>,
    pub bytes_placed: u64,
    pub summary: String,
}

/// On-disk integrity verdict for a satisfied step. Present only when the step's
/// handler can verify integrity (e.g. `model_artifact`). `ok: false` drives a
/// per-row "corrupt — reinstall" warning in the UI.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepIntegrityDto {
    pub ok: bool,
    pub detail: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepErrorDto {
    pub category: String,
    pub message: String,
    pub hint: Option<String>,
    pub log_excerpt: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepDto {
    pub id: String,
    #[serde(rename = "type")]
    pub step_type: String,
    pub requires: Vec<String>,
    pub status: StepStatusKind,
    pub satisfied: bool,
    pub artifact: Option<StepArtifactDto>,
    pub last_error: Option<StepErrorDto>,
    pub progress: Option<StepProgressDto>,
    /// Estimated remaining bytes for the step. Pending download steps surface a
    /// useful number; satisfied/failed steps report 0.
    pub estimated_remaining_bytes: u64,
    /// Files already present for a `NotSatisfied` step, when the handler can supply a
    /// cheap no-network estimate (e.g. model downloads resuming from a partial job).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub files_present: Option<u32>,
    /// Total files the step needs, paired with `files_present`. `None` when unknown.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub files_total: Option<u32>,
    /// On-disk integrity verdict for a satisfied step. `None` when not verifiable;
    /// `Some(ok=false)` drives the per-row "corrupt — reinstall" warning.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub integrity: Option<StepIntegrityDto>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DependenciesResponseDto {
    pub steps: Vec<StepDto>,
    pub all_satisfied: bool,
    pub total_remaining_bytes: u64,
    /// True while an install run is active for this extension. Lets a freshly
    /// (re)mounted Dependencies page know an install is in flight immediately —
    /// without waiting for the next WebSocket progress event.
    #[serde(default)]
    pub install_active: bool,
    /// True when no run is active but a partially-downloaded (paused) artifact
    /// exists on disk — e.g. a host restart parked an in-flight download. Drives
    /// a "Resume install" affordance; triggering install continues from the
    /// persisted partial bytes rather than restarting.
    #[serde(default)]
    pub install_resumable: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstallStartedResponseDto {
    pub install_run_id: String,
    pub started_at: String,
}
