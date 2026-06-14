use crate::ids::{DeploymentId, InstallId, MessageId, ThreadId};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
#[non_exhaustive]
pub enum MessageRole {
    User,
    Assistant,
    System,
}

impl MessageRole {
    pub fn as_db_str(&self) -> &'static str {
        match self {
            MessageRole::User => "user",
            MessageRole::Assistant => "assistant",
            MessageRole::System => "system",
        }
    }

    pub fn from_db_str(s: &str) -> Option<Self> {
        match s {
            "user" => Some(MessageRole::User),
            "assistant" => Some(MessageRole::Assistant),
            "system" => Some(MessageRole::System),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[non_exhaustive]
pub struct ChatThread {
    pub thread_id: ThreadId,
    pub extension_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub deployment_id: Option<DeploymentId>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub install_id: Option<InstallId>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub title: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub title_auto: Option<String>,
    pub title_resolved: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub system_prompt: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sampler_override: Option<SamplerOverride>,
    pub is_unbound: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl ChatThread {
    pub fn resolve_title(title: Option<&str>, title_auto: Option<&str>) -> String {
        title
            .map(ToOwned::to_owned)
            .or_else(|| title_auto.map(ToOwned::to_owned))
            .unwrap_or_else(|| "New chat".to_owned())
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[non_exhaustive]
pub struct ChatMessage {
    pub message_id: MessageId,
    pub thread_id: ThreadId,
    pub ordinal: u32,
    pub role: MessageRole,
    pub content: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sampler_effective: Option<SamplerBlock>,
    pub is_partial: bool,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub retry_of_message_id: Option<MessageId>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Default)]
#[non_exhaustive]
pub struct SamplerOverride {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub temperature: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub min_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_k: Option<u32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub seed: Option<i64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub repeat_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub presence_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub frequency_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub typical_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dynatemp_range: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dynatemp_exponent: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub xtc_threshold: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub xtc_probability: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_multiplier: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_base: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_allowed_length: Option<u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Default)]
#[non_exhaustive]
pub struct SamplerBlock {
    pub temperature: f32,
    pub min_p: f32,
    pub top_k: u32,
    pub seed: i64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub repeat_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub presence_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub frequency_penalty: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub typical_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dynatemp_range: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dynatemp_exponent: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub xtc_threshold: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub xtc_probability: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_multiplier: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_base: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_allowed_length: Option<u32>,
}

impl SamplerBlock {
    pub fn new(temperature: f32, min_p: f32, top_k: u32, seed: i64) -> Self {
        Self {
            temperature,
            min_p,
            top_k,
            seed,
            ..Default::default()
        }
    }

    pub fn with_top_p(mut self, v: f32) -> Self {
        self.top_p = Some(v);
        self
    }
}

impl SamplerOverride {
    pub fn empty() -> Self {
        Self::default()
    }
    pub fn with_temperature(mut self, v: f32) -> Self {
        self.temperature = Some(v);
        self
    }
    pub fn with_min_p(mut self, v: f32) -> Self {
        self.min_p = Some(v);
        self
    }
    pub fn with_top_k(mut self, v: u32) -> Self {
        self.top_k = Some(v);
        self
    }
    pub fn with_top_p(mut self, v: f32) -> Self {
        self.top_p = Some(v);
        self
    }
    pub fn with_seed(mut self, v: i64) -> Self {
        self.seed = Some(v);
        self
    }
    pub fn with_repeat_penalty(mut self, v: f32) -> Self {
        self.repeat_penalty = Some(v);
        self
    }
}
