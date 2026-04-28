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
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DependenciesResponseDto {
    pub steps: Vec<StepDto>,
    pub all_satisfied: bool,
    pub total_remaining_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstallStartedResponseDto {
    pub install_run_id: String,
    pub started_at: String,
}
