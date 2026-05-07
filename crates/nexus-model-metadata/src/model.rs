use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum ArtifactFormat {
    Gguf,
    Safetensors,
    PytorchIndex,
    Unknown,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum ExtractionStatus {
    Ok,
    Partial,
    Failed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
#[non_exhaustive]
pub struct ExtractedMetadata {
    pub install_id: String,
    pub format: ArtifactFormat,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub is_moe: Option<bool>,
    pub expert_layer_count: Option<u32>,
    pub extraction_status: ExtractionStatus,
    pub extracted_at: i64,
}

impl Default for ExtractedMetadata {
    fn default() -> Self {
        Self {
            install_id: String::new(),
            format: ArtifactFormat::Unknown,
            layer_count: None,
            max_context: None,
            architecture: None,
            hidden_size: None,
            is_moe: None,
            expert_layer_count: None,
            extraction_status: ExtractionStatus::Failed,
            extracted_at: 0,
        }
    }
}

impl ExtractedMetadata {
    pub fn failed(install_id: impl Into<String>, format: ArtifactFormat) -> Self {
        Self {
            install_id: install_id.into(),
            format,
            extraction_status: ExtractionStatus::Failed,
            extracted_at: now_millis(),
            ..Self::default()
        }
    }

    pub fn ok(install_id: impl Into<String>, format: ArtifactFormat) -> Self {
        Self {
            install_id: install_id.into(),
            format,
            extraction_status: ExtractionStatus::Ok,
            extracted_at: now_millis(),
            ..Self::default()
        }
    }
}

pub(crate) fn now_millis() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0)
}
