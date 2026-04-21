//! Multi-format model metadata extraction for nexus-dnn.
//!
//! Host-level crate that inspects downloaded model artifacts (GGUF,
//! safetensors, pytorch-bin index sidecars) and extracts layer count,
//! architecture, context length, and hidden size. Exposed to extensions
//! via the `/api/host/models/{install_id}/metadata` endpoint.
//!
//! Pickle deserialization is NOT performed on pytorch-bin files (ACE risk);
//! only the `*.index.json` sidecar is read.

use std::path::Path;
use thiserror::Error;

pub mod dispatch;
pub mod gguf;
pub mod model;
pub mod pytorch_index;
pub mod safetensors;

pub use dispatch::extract_any;
pub use model::{ArtifactFormat, ExtractedMetadata, ExtractionStatus};

#[derive(Debug, Error)]
#[non_exhaustive]
pub enum ExtractError {
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("malformed header: {0}")]
    MalformedHeader(String),

    #[error("unknown architecture: {0}")]
    UnknownArchitecture(String),

    #[error("format not recognized")]
    UnknownFormat,

    #[error("sidecar file missing: {0}")]
    MissingSidecar(String),

    #[error("json parse error: {0}")]
    Json(#[from] serde_json::Error),
}

pub trait MetadataExtractor {
    fn format(&self) -> ArtifactFormat;

    fn extract(&self, path: &Path, install_id: &str) -> Result<ExtractedMetadata, ExtractError>;
}
