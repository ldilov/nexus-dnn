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

/// Normalized progress payload carried by [`ProgressEvent::StepProgress`].
///
/// Every long-running handler reports progress through this single shape so the
/// frontend renders all step types consistently. `phase` is a short closed
/// vocabulary token (e.g. `probing | resolving | downloading | extracting |
/// installing | verifying | running | done`); `message` is a free-form live
/// line; byte counts are present only for transfers; `pct` is derived from the
/// byte counts (or supplied directly when only counts-of-N are known) and is
/// guaranteed to be `0..=100`, never `NaN`/`Inf`.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct StepProgress {
    pub phase: String,
    #[serde(default)]
    pub message: Option<String>,
    #[serde(default)]
    pub bytes_done: Option<u64>,
    #[serde(default)]
    pub bytes_total: Option<u64>,
    #[serde(default)]
    pub pct: Option<f32>,
}

impl StepProgress {
    /// A phase-only update (no bytes, no derived pct) — used by handlers whose
    /// work isn't byte-quantified (runtime install, validation, handshake).
    pub fn phase(phase: impl Into<String>) -> Self {
        Self {
            phase: phase.into(),
            ..Self::default()
        }
    }

    /// A byte-transfer update — `pct` is derived safely from the counts.
    pub fn bytes(phase: impl Into<String>, bytes_done: u64, bytes_total: u64) -> Self {
        let total = (bytes_total > 0).then_some(bytes_total);
        Self {
            phase: phase.into(),
            message: None,
            bytes_done: Some(bytes_done),
            bytes_total: total,
            pct: derive_pct(Some(bytes_done), total),
        }
    }

    pub fn with_message(mut self, message: impl Into<String>) -> Self {
        self.message = Some(message.into());
        self
    }

    /// Set `pct` directly from a count-of-N signal (e.g. uv "k/N packages")
    /// where there are no byte totals. Clamped to `0..=100`.
    pub fn with_count(mut self, done: u64, total: u64) -> Self {
        self.pct = derive_pct(Some(done), (total > 0).then_some(total));
        self
    }
}

/// Derive a safe percentage from optional byte counts. Returns `None` when
/// either count is missing or the total is zero — never divides by zero and
/// never yields `NaN`/`Inf`. The result is clamped to `0.0..=100.0`.
pub fn derive_pct(bytes_done: Option<u64>, bytes_total: Option<u64>) -> Option<f32> {
    match (bytes_done, bytes_total) {
        (Some(done), Some(total)) if total > 0 => {
            let pct = (done as f64 / total as f64) * 100.0;
            Some(pct.clamp(0.0, 100.0) as f32)
        }
        _ => None,
    }
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
        /// Derived percentage (`0..=100`), `None` when no total is known.
        /// Additive — existing consumers that ignore it keep working.
        #[serde(default)]
        pct: Option<f32>,
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

impl ProgressEvent {
    /// Build a [`ProgressEvent::StepProgress`] from the normalized [`StepProgress`]
    /// payload. The legacy byte fields are filled (0 when absent) for backward
    /// compatibility with existing consumers, while `pct` is carried through.
    /// Handlers that don't know their `step_id` pass `String::new()`; the runner
    /// re-tags it before publishing.
    pub fn step_progress(
        extension_id: impl Into<String>,
        install_run_id: uuid::Uuid,
        step_id: impl Into<String>,
        progress: StepProgress,
    ) -> Self {
        ProgressEvent::StepProgress {
            extension_id: extension_id.into(),
            install_run_id,
            step_id: step_id.into(),
            phase: progress.phase,
            current_bytes: progress.bytes_done.unwrap_or(0),
            total_bytes: progress.bytes_total.unwrap_or(0),
            message: progress.message.unwrap_or_default(),
            pct: progress.pct,
        }
    }
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

    #[test]
    fn derive_pct_returns_none_for_zero_total() {
        assert_eq!(derive_pct(Some(5), Some(0)), None);
    }

    #[test]
    fn derive_pct_returns_none_for_missing_total() {
        assert_eq!(derive_pct(Some(5), None), None);
        assert_eq!(derive_pct(None, Some(10)), None);
        assert_eq!(derive_pct(None, None), None);
    }

    #[test]
    fn derive_pct_computes_and_clamps() {
        assert_eq!(derive_pct(Some(0), Some(100)), Some(0.0));
        assert_eq!(derive_pct(Some(50), Some(100)), Some(50.0));
        assert_eq!(derive_pct(Some(100), Some(100)), Some(100.0));
        // Over-shoot (e.g. content-length under-reported) clamps to 100, never >100.
        assert_eq!(derive_pct(Some(250), Some(100)), Some(100.0));
    }

    #[test]
    fn derive_pct_never_yields_nan_or_inf() {
        for (done, total) in [(0u64, 0u64), (1, 0), (u64::MAX, 0)] {
            let pct = derive_pct(Some(done), Some(total));
            assert!(pct.is_none(), "zero total must be None, got {pct:?}");
        }
        let pct = derive_pct(Some(u64::MAX), Some(1)).expect("some");
        assert!(pct.is_finite() && (0.0..=100.0).contains(&pct));
    }

    #[test]
    fn step_progress_bytes_derives_pct() {
        let p = StepProgress::bytes("downloading", 250, 1000);
        assert_eq!(p.bytes_done, Some(250));
        assert_eq!(p.bytes_total, Some(1000));
        assert_eq!(p.pct, Some(25.0));
    }

    #[test]
    fn step_progress_bytes_with_zero_total_has_null_pct() {
        let p = StepProgress::bytes("downloading", 250, 0);
        assert_eq!(p.bytes_total, None);
        assert_eq!(p.pct, None);
    }

    #[test]
    fn step_progress_phase_only_has_no_bytes_or_pct() {
        let p = StepProgress::phase("installing").with_message("Resolving 47 packages");
        assert_eq!(p.phase, "installing");
        assert_eq!(p.message.as_deref(), Some("Resolving 47 packages"));
        assert_eq!(p.bytes_done, None);
        assert_eq!(p.bytes_total, None);
        assert_eq!(p.pct, None);
    }

    #[test]
    fn step_progress_with_count_derives_pct_without_bytes() {
        let p = StepProgress::phase("installing").with_count(12, 47);
        assert!(p.bytes_total.is_none());
        let pct = p.pct.expect("count yields pct");
        assert!((pct - (12.0 / 47.0 * 100.0)).abs() < 0.01);
    }

    #[test]
    fn step_progress_serializes_snake_case() {
        let p = StepProgress::bytes("downloading", 5, 10).with_message("file.bin");
        let json = serde_json::to_value(&p).expect("serialize");
        assert_eq!(json["phase"], "downloading");
        assert_eq!(json["message"], "file.bin");
        assert_eq!(json["bytes_done"], 5);
        assert_eq!(json["bytes_total"], 10);
        assert_eq!(json["pct"], 50.0);
    }

    #[test]
    fn progress_event_step_progress_carries_pct_and_legacy_bytes() {
        let event = ProgressEvent::step_progress(
            "ext",
            uuid::Uuid::nil(),
            "step-a",
            StepProgress::bytes("downloading", 30, 120),
        );
        match event {
            ProgressEvent::StepProgress {
                current_bytes,
                total_bytes,
                pct,
                phase,
                ..
            } => {
                assert_eq!(current_bytes, 30);
                assert_eq!(total_bytes, 120);
                assert_eq!(pct, Some(25.0));
                assert_eq!(phase, "downloading");
            }
            other => panic!("expected StepProgress, got {other:?}"),
        }
    }
}
