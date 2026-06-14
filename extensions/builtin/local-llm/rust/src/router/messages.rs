use super::ChatRouterState;
use crate::chat_history::{
    AppendMessageInput, ChatMessage, MessageListPage, MessageRole, SamplerBlock,
};
use crate::error::Result;
use crate::ids::{MessageId, ThreadId};
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct ListMessagesQuery {
    #[serde(default)]
    pub after_ordinal: Option<u32>,
    #[serde(default)]
    pub limit: Option<u32>,
}

#[derive(Debug, Serialize)]
pub struct ListMessagesResponse {
    pub messages: Vec<ChatMessage>,
    pub has_more: bool,
    pub next_after_ordinal: Option<u32>,
}

impl From<MessageListPage> for ListMessagesResponse {
    fn from(p: MessageListPage) -> Self {
        Self {
            messages: p.messages,
            has_more: p.has_more,
            next_after_ordinal: p.next_after_ordinal,
        }
    }
}

pub async fn list_messages_handler(
    State(state): State<ChatRouterState>,
    Path(thread_id): Path<String>,
    Query(q): Query<ListMessagesQuery>,
) -> Result<Json<ListMessagesResponse>> {
    let page = state
        .store
        .list_messages(
            &ThreadId::new(thread_id),
            q.after_ordinal,
            q.limit.unwrap_or(100),
        )
        .await?;
    Ok(Json(page.into()))
}

#[derive(Debug, Deserialize)]
pub struct AppendMessageRequest {
    pub role: MessageRole,
    pub content: String,
    #[serde(default)]
    pub sampler_effective: Option<SamplerBlock>,
    #[serde(default)]
    pub is_partial: bool,
    #[serde(default)]
    pub retry_of_message_id: Option<String>,
}

pub async fn append_message_handler(
    State(state): State<ChatRouterState>,
    Path(thread_id): Path<String>,
    Json(req): Json<AppendMessageRequest>,
) -> Result<(StatusCode, Json<ChatMessage>)> {
    let input = AppendMessageInput {
        role: req.role,
        content: req.content,
        sampler_effective: req.sampler_effective,
        is_partial: req.is_partial,
        retry_of_message_id: req.retry_of_message_id.map(MessageId::new),
    };
    let msg = state
        .store
        .append_message(&ThreadId::new(thread_id), input)
        .await?;
    Ok((StatusCode::CREATED, Json(msg)))
}
