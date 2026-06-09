//! Shared value types used across the handler trait, runner, and HTTP DTOs.

use std::collections::HashMap;
use std::path::PathBuf;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// Canonical platform tuple. See spec 035 research D-08 for the full table.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct PlatformTuple {
    pub os: String,
    pub arch: String,
}

impl PlatformTuple {
    /// Resolve the host's platform tuple from compile-time `cfg` values.
    pub fn host() -> Self {
        let os = match std::env::consts::OS {
            "macos" => "darwin".to_owned(),
            other => other.to_owned(),
        };
        let arch = match std::env::consts::ARCH {
            "x86_64" => "x64".to_owned(),
            "aarch64" => "arm64".to_owned(),
            other => other.to_owned(),
        };
        Self { os, arch }
    }

    /// Format as the canonical hyphenated form used in manifests, e.g. `windows-x64`.
    pub fn as_canonical(&self) -> String {
        format!("{}-{}", self.os, self.arch)
    }

    /// Parse from a canonical string. Returns `None` for malformed input.
    pub fn parse(s: &str) -> Option<Self> {
        let (os, arch) = s.split_once('-')?;
        if os.is_empty() || arch.is_empty() {
            return None;
        }
        Some(Self {
            os: os.to_owned(),
            arch: arch.to_owned(),
        })
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ArchiveFormat {
    Zip,
    TarGz,
    TarXz,
    TarBz2,
    None,
}

impl ArchiveFormat {
    pub fn parse(s: &str) -> Option<Self> {
        match s {
            "zip" => Some(Self::Zip),
            "tar.gz" | "tgz" => Some(Self::TarGz),
            "tar.xz" | "txz" => Some(Self::TarXz),
            "tar.bz2" | "tbz2" => Some(Self::TarBz2),
            "none" | "" => Some(Self::None),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepArtifact {
    pub path: Option<PathBuf>,
    pub bytes_placed: u64,
    pub summary: String,
    #[serde(default)]
    pub metadata: serde_json::Value,
}

impl StepArtifact {
    pub fn empty(summary: impl Into<String>) -> Self {
        Self {
            path: None,
            bytes_placed: 0,
            summary: summary.into(),
            metadata: serde_json::Value::Null,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StepError {
    pub category: String,
    pub message: String,
    pub hint: Option<String>,
    pub log_excerpt: Option<String>,
}

impl StepError {
    pub fn new(category: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            category: category.into(),
            message: message.into(),
            hint: None,
            log_excerpt: None,
        }
    }

    pub fn with_hint(mut self, hint: impl Into<String>) -> Self {
        self.hint = Some(hint.into());
        self
    }
}

/// Per-step status within an active install run. Not persisted.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case", tag = "kind")]
pub enum StepStatus {
    Pending,
    Running {
        phase: String,
        current_bytes: u64,
        total_bytes: u64,
        started_at: DateTime<Utc>,
    },
    Ok {
        artifact: StepArtifact,
        completed_at: DateTime<Utc>,
    },
    Failed {
        error: StepError,
        failed_at: DateTime<Utc>,
    },
    Skipped {
        reason: String,
    },
}

impl StepStatus {
    pub fn is_satisfied(&self) -> bool {
        matches!(self, Self::Ok { .. } | Self::Skipped { .. })
    }
}

/// Per-extension in-memory install run state. Lives in a `DashMap` on `AppState`.
#[derive(Debug, Default)]
pub struct ExtensionInstallState {
    pub install_run_id: Option<uuid::Uuid>,
    pub started_at: Option<DateTime<Utc>>,
    pub cancellation_token: tokio_util::sync::CancellationToken,
    pub steps: HashMap<String, StepStatus>,
}

/// Progress events emitted by handlers and the runner. The host event bus topic is
/// `extension.install`. See `specs/035-extension-dependency-installer/contracts/sse-events.md`.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "event", rename_all = "snake_case")]
pub enum ProgressEvent {
    StepStarted {
        extension_id: String,
        install_run_id: uuid::Uuid,
        step_id: String,
        step_type: String,
        started_at: DateTime<Utc>,
    },
    StepProgress {
        extension_id: String,
        install_run_id: uuid::Uuid,
        step_id: String,
        phase: String,
        current_bytes: u64,
        total_bytes: u64,
        message: String,
    },
    StepCompleted {
        extension_id: String,
        install_run_id: uuid::Uuid,
        step_id: String,
        completed_at: DateTime<Utc>,
        artifact: StepArtifact,
    },
    StepFailed {
        extension_id: String,
        install_run_id: uuid::Uuid,
        step_id: String,
        failed_at: DateTime<Utc>,
        error: StepError,
    },
    InstallCompleted {
        extension_id: String,
        install_run_id: uuid::Uuid,
        completed_at: DateTime<Utc>,
        outcome: InstallOutcome,
    },
}

/// Terminal outcome of an install run, carried by [`ProgressEvent::InstallCompleted`].
/// Subscribers that only need to clear an "active" flag can ignore this; subscribers
/// that want a one-shot success/failure signal without reconciling per-step events
/// can read it directly.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum InstallOutcome {
    /// Every step ended in `Ok` or `Skipped` — the dep gate is now green.
    Success,
    /// At least one step ended in `Failed` (and the runner halted there). Downstream
    /// steps will be visible as `Pending` in the next `GET /dependencies` snapshot.
    Failed,
    /// The runner observed `CancellationToken::is_cancelled()` and halted
    /// cooperatively. The in-flight step is recorded as failed with category
    /// `cancelled`; downstream steps stay `Pending`.
    Cancelled,
}

/// Cheap, no-network estimate of what a `NotSatisfied` step still has to do. Derived
/// from persisted job rows / on-disk state so the API can surface "what's left / what's
/// present" without touching the network. Returned by [`crate::handler::StepHandler::estimate`].
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct StepEstimate {
    pub remaining_bytes: u64,
    pub present_bytes: u64,
    pub files_present: u32,
    pub files_total: u32,
}

/// Caller-supplied sink for handler progress reports. Default impl forwards to the
/// host event bus; tests can capture events into a buffer.
pub trait ProgressSink: Send + Sync {
    fn emit(&self, event: ProgressEvent);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn platform_tuple_canonicalises() {
        let host = PlatformTuple::host();
        assert!(!host.os.is_empty());
        assert!(!host.arch.is_empty());
        assert_eq!(host.as_canonical(), format!("{}-{}", host.os, host.arch));
    }

    #[test]
    fn platform_tuple_parses_canonical_form() {
        let parsed = PlatformTuple::parse("windows-x64").unwrap();
        assert_eq!(parsed.os, "windows");
        assert_eq!(parsed.arch, "x64");

        assert!(PlatformTuple::parse("").is_none());
        assert!(PlatformTuple::parse("malformed").is_none());
        assert!(PlatformTuple::parse("-x64").is_none());
        assert!(PlatformTuple::parse("windows-").is_none());
    }

    #[test]
    fn archive_format_parses_known_values() {
        assert_eq!(ArchiveFormat::parse("zip"), Some(ArchiveFormat::Zip));
        assert_eq!(ArchiveFormat::parse("tar.gz"), Some(ArchiveFormat::TarGz));
        assert_eq!(ArchiveFormat::parse("tgz"), Some(ArchiveFormat::TarGz));
        assert_eq!(ArchiveFormat::parse("tar.xz"), Some(ArchiveFormat::TarXz));
        assert_eq!(ArchiveFormat::parse("tar.bz2"), Some(ArchiveFormat::TarBz2));
        assert_eq!(ArchiveFormat::parse("none"), Some(ArchiveFormat::None));
        assert_eq!(ArchiveFormat::parse(""), Some(ArchiveFormat::None));
        assert_eq!(ArchiveFormat::parse("rar"), None);
    }

    #[test]
    fn step_status_satisfied_check() {
        let pending = StepStatus::Pending;
        assert!(!pending.is_satisfied());

        let skipped = StepStatus::Skipped {
            reason: "already installed".to_owned(),
        };
        assert!(skipped.is_satisfied());

        let ok = StepStatus::Ok {
            artifact: StepArtifact::empty("done"),
            completed_at: Utc::now(),
        };
        assert!(ok.is_satisfied());

        let failed = StepStatus::Failed {
            error: StepError::new("test", "test"),
            failed_at: Utc::now(),
        };
        assert!(!failed.is_satisfied());
    }
}
