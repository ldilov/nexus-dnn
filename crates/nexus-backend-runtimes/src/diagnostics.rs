use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FailureCategory {
    AssetResolutionFailed,
    DownloadFailed,
    ChecksumMismatch,
    ExtractionFailed,
    RequiredBinaryMissing,
    DependencyLoadFailure,
    PortBindFailure,
    InvalidRuntimeSettings,
    RuntimeValidationTimeout,
    ModelFileMissing,
    ModelIncompatible,
    ModelLoadFailure,
    CudaMismatch,
    GpuUnavailable,
    OutOfMemory,
    UnexpectedProcessExit,
}

impl FailureCategory {
    pub fn title(&self) -> &'static str {
        match self {
            Self::AssetResolutionFailed => "Runtime asset could not be resolved",
            Self::DownloadFailed => "Runtime package download failed",
            Self::ChecksumMismatch => "Downloaded package did not match the expected checksum",
            Self::ExtractionFailed => "Runtime package could not be extracted",
            Self::RequiredBinaryMissing => "Required runtime binary is missing",
            Self::DependencyLoadFailure => "Runtime could not load a required dependency",
            Self::PortBindFailure => "Runtime could not bind to the configured port",
            Self::InvalidRuntimeSettings => "Runtime settings are invalid",
            Self::RuntimeValidationTimeout => "Runtime validation probe timed out",
            Self::ModelFileMissing => "Model file is missing",
            Self::ModelIncompatible => "Model is incompatible with this runtime",
            Self::ModelLoadFailure => "Model failed to load",
            Self::CudaMismatch => "Installed CUDA toolkit does not match runtime package",
            Self::GpuUnavailable => "GPU required by this runtime is unavailable",
            Self::OutOfMemory => "Runtime ran out of memory",
            Self::UnexpectedProcessExit => "Runtime process exited unexpectedly",
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DiagnosticRecord {
    pub category: FailureCategory,
    pub title: String,
    pub explanation: String,
    pub likely_cause: String,
    pub suggested_actions: Vec<String>,
    pub technical_details: serde_json::Value,
    pub event_refs: Vec<String>,
    pub created_at: i64,
}

impl DiagnosticRecord {
    pub fn builder(category: FailureCategory) -> DiagnosticRecordBuilder {
        DiagnosticRecordBuilder {
            category,
            title: category.title().to_string(),
            explanation: String::new(),
            likely_cause: String::new(),
            suggested_actions: Vec::new(),
            technical_details: serde_json::Value::Null,
            event_refs: Vec::new(),
            created_at: chrono::Utc::now().timestamp_millis(),
        }
    }
}

pub struct DiagnosticRecordBuilder {
    category: FailureCategory,
    title: String,
    explanation: String,
    likely_cause: String,
    suggested_actions: Vec<String>,
    technical_details: serde_json::Value,
    event_refs: Vec<String>,
    created_at: i64,
}

impl DiagnosticRecordBuilder {
    pub fn explanation(mut self, value: impl Into<String>) -> Self {
        self.explanation = value.into();
        self
    }

    pub fn likely_cause(mut self, value: impl Into<String>) -> Self {
        self.likely_cause = value.into();
        self
    }

    pub fn suggest(mut self, value: impl Into<String>) -> Self {
        self.suggested_actions.push(value.into());
        self
    }

    pub fn technical_details(mut self, value: serde_json::Value) -> Self {
        self.technical_details = value;
        self
    }

    pub fn event_ref(mut self, value: impl Into<String>) -> Self {
        self.event_refs.push(value.into());
        self
    }

    pub fn build(self) -> DiagnosticRecord {
        DiagnosticRecord {
            category: self.category,
            title: self.title,
            explanation: self.explanation,
            likely_cause: self.likely_cause,
            suggested_actions: self.suggested_actions,
            technical_details: self.technical_details,
            event_refs: self.event_refs,
            created_at: self.created_at,
        }
    }
}
