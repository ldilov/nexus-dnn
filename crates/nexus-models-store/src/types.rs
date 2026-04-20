//! Canonical domain enums. All are `#[non_exhaustive]` (Principle V —
//! additive enums) so new variants can be added without breaking
//! downstream extensions that pin an older version.
//!
//! Serde uses `snake_case` everywhere so the wire form matches the REST
//! contract documented under `specs/025-models-search-refactor/contracts/`.

use serde::{Deserialize, Serialize};

/// Recognised artifact container formats. Unknown filenames fall back to
/// `Unknown` (FR-014) — the system never panics on a surprising extension.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Format {
    Gguf,
    Ggml,
    Safetensors,
    PytorchBin,
    Pth,
    #[default]
    #[serde(other)]
    Unknown,
}

/// Numeric precision reported for an artifact. GGUF artifacts report
/// `Quantized` (the quantization label lives on the `Variant`).
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Precision {
    Fp32,
    Fp16,
    Bf16,
    Int8,
    Quantized,
    #[default]
    #[serde(other)]
    Unknown,
}

/// Where the reported [`Precision`] came from — critical for honest UI
/// copy (FR-032): inferred values must never be rendered as if
/// authoritative.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PrecisionSource {
    Explicit,
    Inferred,
    #[default]
    #[serde(other)]
    Unknown,
}

/// Coarse-grained model domain — used both for filtering (FR-003) and
/// for icon selection on the card.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Modality {
    Llm,
    Image,
    Video,
    Audio,
    Upscaler,
    Embedding,
    #[default]
    #[serde(other)]
    Other,
}

/// The role a concrete artifact plays inside a [`ModelFamily`] — primary
/// weight, VAE, text encoder, tokenizer, etc. (FR-040).
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DependencyRole {
    Primary,
    Vae,
    TextEncoder,
    Tokenizer,
    Controlnet,
    Lora,
    Scheduler,
    #[default]
    #[serde(other)]
    Other,
}

/// Whether a declared dependency must be downloaded for the model to
/// function (FR-041).
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Requirement {
    Required,
    #[default]
    #[serde(other)]
    Optional,
}

/// Variant kind — a GGUF quantization, a precision tier, a separate
/// checkpoint, or anything else (FR-020).
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum VariantType {
    Quantization,
    Precision,
    Checkpoint,
    #[default]
    #[serde(other)]
    Other,
}

/// Final compatibility classification for a family (FR-060). The single
/// owner of this computation is [`crate::normalize::compat`]; the frontend
/// only renders the enum.
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CompatibilityStatus {
    Compatible,
    CompatibleWithRequirements,
    DownloadableButNotRunnable,
    Unsupported,
    #[default]
    #[serde(other)]
    Unknown,
}

/// Download-job state machine (FR-082). `AuthRequired` is the recoverable
/// state entered when the upstream returns 401/403 — setting the HF
/// token flips matching jobs back to `Queued` (FR-114).
#[non_exhaustive]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DownloadState {
    #[default]
    NotDownloaded,
    Queued,
    Downloading,
    Paused,
    Downloaded,
    Failed,
    Incompatible,
    AuthRequired,
}

impl DownloadState {
    /// `true` for terminal states where no further orchestrator work is
    /// expected. Used by the frontend to stop per-job SWR polling.
    #[must_use]
    pub fn is_terminal(self) -> bool {
        matches!(
            self,
            Self::Downloaded | Self::Failed | Self::Incompatible
        )
    }

    /// `true` while the orchestrator still owns a semaphore slot for
    /// this job.
    #[must_use]
    pub fn is_active(self) -> bool {
        matches!(self, Self::Downloading)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn format_unknown_is_default() {
        let json = "\"never-heard-of-it\"";
        let f: Format = serde_json::from_str(json).unwrap();
        assert_eq!(f, Format::Unknown);
    }

    #[test]
    fn compat_unknown_is_default() {
        let c: CompatibilityStatus = serde_json::from_str("\"future-state\"").unwrap();
        assert_eq!(c, CompatibilityStatus::Unknown);
    }

    #[test]
    fn dependency_role_unknown_falls_back_to_other() {
        let r: DependencyRole = serde_json::from_str("\"future-role\"").unwrap();
        assert_eq!(r, DependencyRole::Other);
    }

    #[test]
    fn download_state_terminal_and_active_classification() {
        assert!(DownloadState::Downloaded.is_terminal());
        assert!(DownloadState::Failed.is_terminal());
        assert!(!DownloadState::Queued.is_terminal());
        assert!(!DownloadState::AuthRequired.is_terminal());
        assert!(DownloadState::Downloading.is_active());
        assert!(!DownloadState::Paused.is_active());
    }
}
