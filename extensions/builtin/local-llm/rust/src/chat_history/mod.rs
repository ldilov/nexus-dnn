pub mod migrations;
pub mod model;
pub mod sampler_merge;
pub mod schema_version;
pub mod store_sqlx;
pub mod title_autoderive;

use crate::error::Result;
use crate::ids::{DeploymentId, InstallId, MessageId, ThreadId};
use async_trait::async_trait;
use chrono::{DateTime, Utc};

pub use model::{ChatMessage, ChatThread, MessageRole, SamplerBlock, SamplerOverride};

#[derive(Debug, Clone, Default)]
pub struct ThreadListFilter {
    pub deployment_id: Option<DeploymentId>,
    pub exclude_unbound: bool,
    pub before_updated_at: Option<DateTime<Utc>>,
    pub limit: u32,
}

#[derive(Debug, Clone)]
pub struct ThreadListPage {
    pub threads: Vec<ChatThread>,
    pub has_more: bool,
    pub next_before_updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone)]
pub struct MessageListPage {
    pub messages: Vec<ChatMessage>,
    pub has_more: bool,
    pub next_after_ordinal: Option<u32>,
}

#[derive(Debug, Clone, Default)]
pub struct CreateThreadInput {
    pub deployment_id: Option<DeploymentId>,
    pub install_id: Option<InstallId>,
    pub title: Option<String>,
    pub system_prompt: Option<String>,
    pub sampler_override: Option<SamplerOverride>,
}

#[derive(Debug, Clone, Default)]
pub struct PatchThreadInput {
    pub title: Option<String>,
    pub sampler_override: Option<SamplerOverride>,
    pub clear_sampler_override: bool,
    pub attach_to_current_deployment: bool,
}

#[derive(Debug, Clone)]
pub struct AppendMessageInput {
    pub role: MessageRole,
    pub content: String,
    pub sampler_effective: Option<SamplerBlock>,
    pub is_partial: bool,
    pub retry_of_message_id: Option<MessageId>,
}

#[async_trait]
pub trait ChatHistoryStore: Send + Sync {
    async fn create_thread(&self, input: CreateThreadInput) -> Result<ChatThread>;

    async fn get_thread(&self, thread_id: &ThreadId) -> Result<ChatThread>;

    async fn list_threads(&self, filter: ThreadListFilter) -> Result<ThreadListPage>;

    async fn patch_thread(
        &self,
        thread_id: &ThreadId,
        patch: PatchThreadInput,
    ) -> Result<ChatThread>;

    async fn delete_thread(&self, thread_id: &ThreadId) -> Result<()>;

    async fn append_message(
        &self,
        thread_id: &ThreadId,
        input: AppendMessageInput,
    ) -> Result<ChatMessage>;

    async fn list_messages(
        &self,
        thread_id: &ThreadId,
        after_ordinal: Option<u32>,
        limit: u32,
    ) -> Result<MessageListPage>;
}
