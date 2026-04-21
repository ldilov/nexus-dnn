use super::ChatRouterState;
use crate::chat_history::{
    ChatThread, CreateThreadInput, PatchThreadInput, SamplerOverride, ThreadListFilter,
    ThreadListPage,
};
use crate::error::Result;
use crate::ids::{DeploymentId, InstallId, ThreadId};
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct ListThreadsQuery {
    #[serde(default)]
    pub deployment_id: Option<String>,
    #[serde(default)]
    pub exclude_unbound: bool,
    #[serde(default)]
    pub limit: Option<u32>,
    #[serde(default)]
    pub before_updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize)]
pub struct ListThreadsResponse {
    pub threads: Vec<ChatThread>,
    pub has_more: bool,
    pub next_before_updated_at: Option<DateTime<Utc>>,
}

impl From<ThreadListPage> for ListThreadsResponse {
    fn from(p: ThreadListPage) -> Self {
        Self {
            threads: p.threads,
            has_more: p.has_more,
            next_before_updated_at: p.next_before_updated_at,
        }
    }
}

pub async fn list_threads_handler(
    State(state): State<ChatRouterState>,
    Query(q): Query<ListThreadsQuery>,
) -> Result<Json<ListThreadsResponse>> {
    let filter = ThreadListFilter {
        deployment_id: q.deployment_id.map(DeploymentId::new),
        exclude_unbound: q.exclude_unbound,
        before_updated_at: q.before_updated_at,
        limit: q.limit.unwrap_or(50),
    };
    let page = state.store.list_threads(filter).await?;
    Ok(Json(page.into()))
}

#[derive(Debug, Deserialize)]
pub struct CreateThreadRequest {
    #[serde(default)]
    pub deployment_id: Option<String>,
    #[serde(default)]
    pub install_id: Option<String>,
    #[serde(default)]
    pub title: Option<String>,
    #[serde(default)]
    pub system_prompt: Option<String>,
    #[serde(default)]
    pub sampler_override: Option<SamplerOverride>,
}

pub async fn create_thread_handler(
    State(state): State<ChatRouterState>,
    Json(req): Json<CreateThreadRequest>,
) -> Result<(StatusCode, Json<ChatThread>)> {
    let input = CreateThreadInput {
        deployment_id: req.deployment_id.map(DeploymentId::new),
        install_id: req.install_id.map(InstallId::new),
        title: req.title,
        system_prompt: req.system_prompt,
        sampler_override: req.sampler_override,
    };
    let thread = state.store.create_thread(input).await?;
    Ok((StatusCode::CREATED, Json(thread)))
}

pub async fn get_thread_handler(
    State(state): State<ChatRouterState>,
    Path(thread_id): Path<String>,
) -> Result<Json<ChatThread>> {
    let thread = state.store.get_thread(&ThreadId::new(thread_id)).await?;
    Ok(Json(thread))
}

#[derive(Debug, Deserialize, Default)]
pub struct PatchThreadRequest {
    #[serde(default)]
    pub title: Option<String>,
    #[serde(default)]
    pub sampler_override: Option<SamplerOverride>,
    #[serde(default)]
    pub clear_sampler_override: bool,
    #[serde(default)]
    pub attach_to_current_deployment: bool,
}

pub async fn patch_thread_handler(
    State(state): State<ChatRouterState>,
    Path(thread_id): Path<String>,
    Json(req): Json<PatchThreadRequest>,
) -> Result<Json<ChatThread>> {
    let patch = PatchThreadInput {
        title: req.title,
        sampler_override: req.sampler_override,
        clear_sampler_override: req.clear_sampler_override,
        attach_to_current_deployment: req.attach_to_current_deployment,
    };
    let thread = state.store.patch_thread(&ThreadId::new(thread_id), patch).await?;
    Ok(Json(thread))
}

pub async fn delete_thread_handler(
    State(state): State<ChatRouterState>,
    Path(thread_id): Path<String>,
) -> Result<StatusCode> {
    state.store.delete_thread(&ThreadId::new(thread_id)).await?;
    Ok(StatusCode::NO_CONTENT)
}
