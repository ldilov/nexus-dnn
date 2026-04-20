use axum::Json;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::EventPublisher;

use super::inference::{InferenceError, InferenceRequest};

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct SamplingParams {
    pub temperature: f32,
    pub top_p: f32,
    pub top_k: u32,
    pub max_tokens: u32,
    pub repeat_penalty: f32,
}

pub fn to_sampling_params(p: &GenerationParams) -> SamplingParams {
    SamplingParams {
        temperature: p.temperature,
        top_p: p.top_p,
        top_k: p.top_k,
        max_tokens: p.max_tokens,
        repeat_penalty: p.repeat_penalty,
    }
}

pub fn system_prompt_for_adapter(p: &GenerationParams) -> Option<String> {
    let trimmed = p.system_prompt.trim();
    if trimmed.is_empty() {
        None
    } else {
        Some(p.system_prompt.clone())
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GenerationParams {
    pub temperature: f32,
    pub top_p: f32,
    pub top_k: u32,
    pub max_tokens: u32,
    pub repeat_penalty: f32,
    pub system_prompt: String,
}

impl Default for GenerationParams {
    fn default() -> Self {
        Self {
            temperature: 0.8,
            top_p: 0.95,
            top_k: 40,
            max_tokens: 4096,
            repeat_penalty: 1.1,
            system_prompt: "You are a helpful assistant.".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct Thread {
    pub id: String,
    pub title: String,
    pub message_count: i64,
    pub created_at: String,
    pub updated_at: String,
    pub archived_at: Option<String>,
    pub system_prompt: Option<String>,
    pub generation_settings: Option<GenerationParams>,
    pub active_model_family_id: Option<String>,
    pub active_model_variant_id: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ActiveModelBinding {
    pub family_id: String,
    pub variant_id: String,
    pub artifact_id: String,
    pub absolute_path: String,
    pub label: String,
}

#[derive(Debug, Deserialize)]
pub struct NewThreadBody {
    #[serde(default)]
    pub title: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ListThreadsParams {
    #[serde(default)]
    pub archived: Option<bool>,
    #[serde(default)]
    pub limit: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct SetActiveModelBody {
    pub family_id: String,
    pub variant_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SendMessageBody {
    pub content: String,
}

#[derive(Debug, Serialize)]
pub struct SendMessageResponse {
    pub content: String,
}

#[derive(Debug, Serialize)]
pub struct ThreadListResponse {
    pub items: Vec<Thread>,
}

async fn ensure_schema(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_local_llm_chat_threads (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT,
            system_prompt TEXT,
            message_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            archived_at TEXT
        )",
    )
    .execute(pool)
    .await?;

    for stmt in [
        "ALTER TABLE ext_local_llm_chat_threads ADD COLUMN generation_settings TEXT",
        "ALTER TABLE ext_local_llm_chat_threads ADD COLUMN active_model_family_id TEXT",
        "ALTER TABLE ext_local_llm_chat_threads ADD COLUMN active_model_variant_id TEXT",
    ] {
        if let Err(e) = sqlx::query(stmt).execute(pool).await {
            let msg = e.to_string();
            if !msg.contains("duplicate column") {
                return Err(e);
            }
        }
    }
    Ok(())
}

fn parse_thread(row: sqlx::sqlite::SqliteRow) -> Thread {
    let settings_json: Option<String> = row.try_get("generation_settings").unwrap_or(None);
    let generation_settings = settings_json
        .as_deref()
        .and_then(|s| serde_json::from_str::<GenerationParams>(s).ok());
    Thread {
        id: row.try_get("id").unwrap_or_default(),
        title: row.try_get("title").unwrap_or_default(),
        message_count: row.try_get("message_count").unwrap_or(0),
        created_at: row.try_get("created_at").unwrap_or_default(),
        updated_at: row.try_get("updated_at").unwrap_or_default(),
        archived_at: row.try_get("archived_at").ok().flatten(),
        system_prompt: row.try_get("system_prompt").ok().flatten(),
        generation_settings,
        active_model_family_id: row.try_get("active_model_family_id").ok().flatten(),
        active_model_variant_id: row.try_get("active_model_variant_id").ok().flatten(),
    }
}

async fn next_session_title(pool: &SqlitePool) -> String {
    let today_prefix = Utc::now().format("%Y-%m-%d").to_string();
    let count = sqlx::query(
        "SELECT COUNT(*) as c FROM ext_local_llm_chat_threads
         WHERE created_at LIKE ?1",
    )
    .bind(format!("{today_prefix}%"))
    .fetch_one(pool)
    .await
    .ok()
    .and_then(|row| row.try_get::<i64, _>("c").ok())
    .unwrap_or(0);
    format!("Session {}", count + 1)
}

pub async fn create_thread(
    State(state): State<AppState>,
    Json(body): Json<NewThreadBody>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let id = format!("th-{}", ulid::Ulid::new());
    let title = match body.title {
        Some(t) if !t.trim().is_empty() => t,
        _ => next_session_title(pool).await,
    };
    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        "INSERT INTO ext_local_llm_chat_threads
         (id, title, message_count, created_at, updated_at)
         VALUES (?1, ?2, 0, ?3, ?3)",
    )
    .bind(&id)
    .bind(&title)
    .bind(&now)
    .execute(pool)
    .await;
    if let Err(e) = result {
        return ApiResponse::<()>::internal(format!("insert: {e}")).into_response();
    }

    let row = sqlx::query(
        "SELECT id, title, system_prompt, message_count, created_at, updated_at,
                archived_at, generation_settings, active_model_family_id,
                active_model_variant_id
         FROM ext_local_llm_chat_threads WHERE id = ?1",
    )
    .bind(&id)
    .fetch_one(pool)
    .await;
    match row {
        Ok(r) => (StatusCode::CREATED, ApiResponse::ok(parse_thread(r))).into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn list_threads(
    State(state): State<AppState>,
    Query(params): Query<ListThreadsParams>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let archived = params.archived.unwrap_or(false);
    let limit = params.limit.unwrap_or(50).clamp(1, 500);

    let rows = sqlx::query(
        "SELECT id, title, system_prompt, message_count, created_at, updated_at,
                archived_at, generation_settings, active_model_family_id,
                active_model_variant_id
         FROM ext_local_llm_chat_threads
         WHERE (?1 = 1 AND archived_at IS NOT NULL)
            OR (?1 = 0 AND archived_at IS NULL)
         ORDER BY updated_at DESC
         LIMIT ?2",
    )
    .bind(archived as i64)
    .bind(limit)
    .fetch_all(pool)
    .await;
    match rows {
        Ok(rs) => {
            let items = rs.into_iter().map(parse_thread).collect();
            ApiResponse::ok(ThreadListResponse { items }).into_response()
        }
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn get_generation_settings(
    State(state): State<AppState>,
    Path(thread_id): Path<String>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let row = sqlx::query(
        "SELECT generation_settings FROM ext_local_llm_chat_threads WHERE id = ?1",
    )
    .bind(&thread_id)
    .fetch_optional(pool)
    .await;
    match row {
        Ok(Some(r)) => {
            let raw: Option<String> = r.try_get("generation_settings").unwrap_or(None);
            let params = raw
                .as_deref()
                .and_then(|s| serde_json::from_str::<GenerationParams>(s).ok())
                .unwrap_or_default();
            ApiResponse::ok(params).into_response()
        }
        Ok(None) => ApiResponse::<()>::not_found(format!("thread: {thread_id}"))
            .into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn set_generation_settings(
    State(state): State<AppState>,
    Path(thread_id): Path<String>,
    Json(params): Json<GenerationParams>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let json = match serde_json::to_string(&params) {
        Ok(s) => s,
        Err(e) => return ApiResponse::<()>::bad_request(format!("encode: {e}")).into_response(),
    };
    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        "UPDATE ext_local_llm_chat_threads
         SET generation_settings = ?1, updated_at = ?2
         WHERE id = ?3",
    )
    .bind(&json)
    .bind(&now)
    .bind(&thread_id)
    .execute(pool)
    .await;
    match result {
        Ok(r) if r.rows_affected() == 0 => {
            ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response()
        }
        Ok(_) => ApiResponse::ok(params).into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("update: {e}")).into_response(),
    }
}

pub async fn get_active_model(
    State(state): State<AppState>,
    Path(thread_id): Path<String>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let row = sqlx::query(
        "SELECT active_model_family_id, active_model_variant_id
         FROM ext_local_llm_chat_threads WHERE id = ?1",
    )
    .bind(&thread_id)
    .fetch_optional(pool)
    .await;
    match row {
        Ok(Some(r)) => {
            let family: Option<String> = r.try_get("active_model_family_id").ok().flatten();
            let variant: Option<String> = r.try_get("active_model_variant_id").ok().flatten();
            match (family, variant) {
                (Some(f), Some(v)) => {
                    let install_map = match state.install_map.as_ref() {
                        Some(m) => m,
                        None => {
                            return ApiResponse::<Option<ActiveModelBinding>>::ok(None)
                                .into_response();
                        }
                    };
                    let rows = install_map.list_all(500).await.unwrap_or_default();
                    let matched = rows.into_iter().find(|row| {
                        row.family_id == f && row.variant_id.as_deref() == Some(v.as_str())
                    });
                    match matched {
                        Some(r) => {
                            let absolute_path = r.filename.clone();
                            let binding = ActiveModelBinding {
                                family_id: f,
                                variant_id: v.clone(),
                                artifact_id: r.artifact_id,
                                absolute_path,
                                label: format!("{} / {}", r.family_id, v),
                            };
                            ApiResponse::ok(Some(binding)).into_response()
                        }
                        None => ApiResponse::<Option<ActiveModelBinding>>::ok(None)
                            .into_response(),
                    }
                }
                _ => ApiResponse::<Option<ActiveModelBinding>>::ok(None).into_response(),
            }
        }
        Ok(None) => ApiResponse::<()>::not_found(format!("thread: {thread_id}"))
            .into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn set_active_model(
    State(state): State<AppState>,
    Path(thread_id): Path<String>,
    Json(body): Json<SetActiveModelBody>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let now = Utc::now().to_rfc3339();
    let result = sqlx::query(
        "UPDATE ext_local_llm_chat_threads
         SET active_model_family_id = ?1,
             active_model_variant_id = ?2,
             updated_at = ?3
         WHERE id = ?4",
    )
    .bind(&body.family_id)
    .bind(&body.variant_id)
    .bind(&now)
    .bind(&thread_id)
    .execute(pool)
    .await;
    match result {
        Ok(r) if r.rows_affected() == 0 => {
            ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response()
        }
        Ok(_) => get_active_model(State(state), Path(thread_id)).await,
        Err(e) => ApiResponse::<()>::internal(format!("update: {e}")).into_response(),
    }
}

pub async fn send_message(
    State(state): State<AppState>,
    Path(thread_id): Path<String>,
    Json(body): Json<SendMessageBody>,
) -> Response {
    let pool = state.db.pool();
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let row = sqlx::query(
        "SELECT generation_settings, active_model_family_id, active_model_variant_id
         FROM ext_local_llm_chat_threads WHERE id = ?1",
    )
    .bind(&thread_id)
    .fetch_optional(pool)
    .await;
    let row = match row {
        Ok(Some(r)) => r,
        Ok(None) => {
            return ApiResponse::<()>::not_found(format!("thread: {thread_id}"))
                .into_response();
        }
        Err(e) => return ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    };

    let family: Option<String> = row.try_get("active_model_family_id").ok().flatten();
    let variant: Option<String> = row.try_get("active_model_variant_id").ok().flatten();
    let (family, variant) = match (family, variant) {
        (Some(f), Some(v)) => (f, v),
        _ => {
            return ApiResponse::<()>::bad_request("no_active_model".to_string())
                .into_response();
        }
    };

    let install_map = match state.install_map.as_ref() {
        Some(m) => m,
        None => {
            return ApiResponse::<()>::internal("install_map unavailable".to_string())
                .into_response();
        }
    };
    let installed = install_map.list_all(500).await.unwrap_or_default();
    let matched = installed.into_iter().find(|r| {
        r.family_id == family && r.variant_id.as_deref() == Some(variant.as_str())
    });
    let binding = match matched {
        Some(r) => r,
        None => {
            let evt = nexus_backend_runtimes::events::BackendEvent::new(
                "session.state.changed",
                "extension.local-llm",
                serde_json::json!({
                    "session_id": thread_id,
                    "cause": "model_unavailable",
                    "family_id": family,
                    "variant_id": variant,
                }),
            );
            state.backend_event_bus.publish(evt).await;
            return (
                StatusCode::GONE,
                ApiResponse::<()>::bad_request("model_unavailable".to_string()),
            )
                .into_response();
        }
    };

    let settings_json: Option<String> = row.try_get("generation_settings").unwrap_or(None);
    let params = settings_json
        .as_deref()
        .and_then(|s| serde_json::from_str::<GenerationParams>(s).ok())
        .unwrap_or_default();

    let req = InferenceRequest {
        sampling: to_sampling_params(&params),
        system_prompt: system_prompt_for_adapter(&params),
        user_content: body.content,
        model_path: std::path::PathBuf::from(&binding.filename),
    };

    match state.inference.generate(req).await {
        Ok(resp) => ApiResponse::ok(SendMessageResponse { content: resp.content })
            .into_response(),
        Err(InferenceError::ModelUnavailable(msg)) => (
            StatusCode::GONE,
            ApiResponse::<()>::bad_request(msg),
        )
            .into_response(),
        Err(InferenceError::Backend(msg)) => {
            ApiResponse::<()>::internal(msg).into_response()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn params() -> GenerationParams {
        GenerationParams {
            temperature: 1.7,
            top_p: 0.9,
            top_k: 40,
            max_tokens: 16,
            repeat_penalty: 1.1,
            system_prompt: "You are a helpful assistant.".into(),
        }
    }

    #[test]
    fn sampling_params_preserve_all_numerics_byte_for_byte() {
        let p = params();
        let s = to_sampling_params(&p);
        assert_eq!(s.temperature.to_bits(), 1.7f32.to_bits());
        assert_eq!(s.top_p.to_bits(), 0.9f32.to_bits());
        assert_eq!(s.top_k, 40);
        assert_eq!(s.max_tokens, 16);
        assert_eq!(s.repeat_penalty.to_bits(), 1.1f32.to_bits());
    }

    #[test]
    fn mapper_is_pure_no_mutation_of_input() {
        let p = params();
        let before = serde_json::to_string(&p).unwrap();
        let _ = to_sampling_params(&p);
        let after = serde_json::to_string(&p).unwrap();
        assert_eq!(before, after);
    }

    #[test]
    fn system_prompt_non_empty_passes_through() {
        let p = params();
        assert_eq!(
            system_prompt_for_adapter(&p).as_deref(),
            Some("You are a helpful assistant."),
        );
    }

    #[test]
    fn system_prompt_empty_becomes_none() {
        let mut p = params();
        p.system_prompt = "".into();
        assert_eq!(system_prompt_for_adapter(&p), None);
    }

    #[test]
    fn system_prompt_whitespace_only_becomes_none() {
        let mut p = params();
        p.system_prompt = "   \n\t  ".into();
        assert_eq!(system_prompt_for_adapter(&p), None);
    }

    #[test]
    fn default_params_round_trip_through_mapper() {
        let p = GenerationParams::default();
        let s = to_sampling_params(&p);
        assert_eq!(s.temperature.to_bits(), 0.8f32.to_bits());
        assert_eq!(s.top_p.to_bits(), 0.95f32.to_bits());
        assert_eq!(s.top_k, 40);
        assert_eq!(s.max_tokens, 4096);
        assert_eq!(s.repeat_penalty.to_bits(), 1.1f32.to_bits());
    }
}
