//! Chat handlers migrated from
//! `crates/nexus-api/src/handlers/extensions_local_llm/chat.rs` per spec
//! 030 CP2. Replaced `State<AppState>` with `State<Arc<ChatHandlerResources>>`;
//! all other behaviour preserved byte-for-byte (same SQL, same response
//! shapes, same llama.cpp spawn flow).
//!
//! `#[allow(dead_code)]` is applied at the module level: the
//! `create_thread`, `list_threads`, and `send_message` handlers are no
//! longer mounted (spec 029's chat-history router owns those URLs after
//! CP2 — see the route map in `super::build_chat_router`). The handler
//! bodies remain to preserve provenance during the migration window;
//! a follow-up cleanup spec MAY prune them once all consumers are
//! confirmed to use the spec-029 endpoints.
#![allow(dead_code)]

use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use super::envelope::ApiResponse;
use super::load_registry::LoadState;
use super::resources::ChatHandlerResources;

use nexus_backend_runtimes::channel::RuntimeAddress;
use nexus_backend_runtimes::runtime_installs_store;
use nexus_backend_runtimes::settings::AcceleratorProfile;
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest};

const LLAMA_CPP_FAMILY: &str = "llama.cpp";
const LOCAL_LLM_EXTENSION: &str = "extension.nexus.local-llm";
const CHANNEL_READY_TIMEOUT_SECS: u64 = 300;

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
    #[serde(default)]
    pub runtime: Option<RuntimeTuning>,
}

#[derive(Debug, Deserialize, Default, Clone)]
pub struct RuntimeTuning {
    #[serde(default)]
    pub n_gpu_layers: Option<u32>,
    #[serde(default)]
    pub threads: Option<u32>,
    #[serde(default)]
    pub flash_attn: Option<bool>,
    #[serde(default)]
    pub ctx_size: Option<u32>,
    #[serde(default)]
    pub cache_type_k: Option<String>,
    #[serde(default)]
    pub cache_type_v: Option<String>,
    #[serde(default)]
    pub mmap: Option<bool>,
    #[serde(default)]
    pub mlock: Option<bool>,
    #[serde(default)]
    pub n_batch: Option<u32>,
    #[serde(default)]
    pub n_ubatch: Option<u32>,
    #[serde(default)]
    pub n_parallel: Option<u32>,
    #[serde(default)]
    pub cont_batching: Option<bool>,
    #[serde(default)]
    pub seed: Option<i64>,
}

impl RuntimeTuning {
    pub fn sensible_defaults(layer_count: Option<u32>, has_cuda: bool) -> Self {
        let threads = std::thread::available_parallelism()
            .map(|n| n.get() as u32 / 2)
            .unwrap_or(4)
            .max(1);
        Self {
            n_gpu_layers: layer_count.map(|n| if has_cuda { n } else { 0 }),
            threads: Some(threads),
            flash_attn: Some(has_cuda),
            ctx_size: Some(4096),
            cache_type_k: Some(if has_cuda {
                "q8_0".into()
            } else {
                "fp16".into()
            }),
            cache_type_v: Some(if has_cuda {
                "q8_0".into()
            } else {
                "fp16".into()
            }),
            mmap: Some(true),
            mlock: Some(false),
            n_batch: Some(512),
            n_ubatch: Some(128),
            n_parallel: Some(1),
            cont_batching: Some(true),
            seed: None,
        }
    }
}

fn runtime_to_args(tuning: &RuntimeTuning) -> Vec<String> {
    let mut args: Vec<String> = Vec::new();
    if let Some(n) = tuning.n_gpu_layers {
        args.push("--n-gpu-layers".into());
        args.push(n.to_string());
    }
    if let Some(t) = tuning.threads {
        args.push("--threads".into());
        args.push(t.to_string());
        args.push("--threads-batch".into());
        args.push(t.to_string());
    }
    if let Some(fa) = tuning.flash_attn {
        args.push("--flash-attn".into());
        args.push(if fa { "on".into() } else { "off".into() });
    }
    if let Some(c) = tuning.ctx_size {
        args.push("--ctx-size".into());
        args.push(c.to_string());
    }
    if let Some(ref k) = tuning.cache_type_k {
        if matches!(k.as_str(), "fp16" | "q8_0" | "q4_0") {
            args.push("--cache-type-k".into());
            args.push(k.clone());
        }
    }
    if let Some(ref v) = tuning.cache_type_v {
        if matches!(v.as_str(), "fp16" | "q8_0" | "q4_0") {
            args.push("--cache-type-v".into());
            args.push(v.clone());
        }
    }
    match tuning.mmap {
        Some(true) => args.push("--mmap".into()),
        Some(false) => args.push("--no-mmap".into()),
        None => {}
    }
    if let Some(true) = tuning.mlock {
        args.push("--mlock".into());
    }
    if let Some(b) = tuning.n_batch {
        args.push("--batch-size".into());
        args.push(b.to_string());
    }
    if let Some(ub) = tuning.n_ubatch {
        args.push("--ubatch-size".into());
        args.push(ub.to_string());
    }
    if let Some(p) = tuning.n_parallel {
        args.push("--parallel".into());
        args.push(p.to_string());
    }
    if let Some(true) = tuning.cont_batching {
        args.push("--cont-batching".into());
    }
    if let Some(s) = tuning.seed {
        args.push("--seed".into());
        args.push(s.to_string());
    }
    args
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
pub struct ActiveModelStatus {
    #[serde(flatten)]
    pub state: LoadState,
}

fn emit_session_state(
    publisher: &nexus_backend_runtimes::events::SharedPublisher,
    thread_id: &str,
    cause: &str,
    extra: serde_json::Value,
) {
    let mut payload = serde_json::json!({
        "session_id": thread_id,
        "cause": cause,
    });
    if let (Some(obj), serde_json::Value::Object(map)) = (payload.as_object_mut(), extra) {
        for (k, v) in map {
            obj.insert(k, v);
        }
    }
    let evt = nexus_backend_runtimes::events::BackendEvent::new(
        "session.state.changed",
        LOCAL_LLM_EXTENSION,
        payload,
    );
    let pub_clone = publisher.clone();
    tokio::spawn(async move {
        pub_clone.publish(evt).await;
    });
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
    State(res): State<Arc<ChatHandlerResources>>,
    Json(body): Json<NewThreadBody>,
) -> Response {
    let pool = &res.pool;
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
    State(res): State<Arc<ChatHandlerResources>>,
    Query(params): Query<ListThreadsParams>,
) -> Response {
    let pool = &res.pool;
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
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
) -> Response {
    let pool = &res.pool;
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let row =
        sqlx::query("SELECT generation_settings FROM ext_local_llm_chat_threads WHERE id = ?1")
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
        Ok(None) => ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn set_generation_settings(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
    Json(params): Json<GenerationParams>,
) -> Response {
    let pool = &res.pool;
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
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
) -> Response {
    let pool = &res.pool;
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
                    let install_map = match res.install_map.as_ref() {
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
                        None => ApiResponse::<Option<ActiveModelBinding>>::ok(None).into_response(),
                    }
                }
                _ => ApiResponse::<Option<ActiveModelBinding>>::ok(None).into_response(),
            }
        }
        Ok(None) => ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response(),
        Err(e) => ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    }
}

pub async fn set_active_model(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
    Json(body): Json<SetActiveModelBody>,
) -> Response {
    let pool = &res.pool;
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let now = Utc::now().to_rfc3339();
    let update = sqlx::query(
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
    match update {
        Ok(r) if r.rows_affected() == 0 => {
            return ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response();
        }
        Err(e) => {
            return ApiResponse::<()>::internal(format!("update: {e}")).into_response();
        }
        Ok(_) => {}
    }

    let install_map = match res.install_map.as_ref() {
        Some(m) => m,
        None => {
            return ApiResponse::<()>::internal("install_map unavailable".to_string())
                .into_response();
        }
    };
    let installed = install_map.list_all(500).await.unwrap_or_default();
    let matched = installed.into_iter().find(|r| {
        r.family_id == body.family_id && r.variant_id.as_deref() == Some(body.variant_id.as_str())
    });
    let record = match matched {
        Some(r) => r,
        None => {
            emit_session_state(
                &res.backend_event_publisher,
                &thread_id,
                "model_unavailable",
                serde_json::json!({
                    "family_id": body.family_id,
                    "variant_id": body.variant_id,
                }),
            );
            return (
                StatusCode::GONE,
                ApiResponse::<()>::bad_request("model_unavailable".to_string()),
            )
                .into_response();
        }
    };

    let orchestrator = match res.download_orchestrator.as_ref() {
        Some(o) => o,
        None => {
            return ApiResponse::<()>::internal("download_orchestrator unavailable".to_string())
                .into_response();
        }
    };
    let abs_path = orchestrator
        .sink_root()
        .join(&record.job_id)
        .join(&record.filename);

    let runtime_row =
        match runtime_installs_store::resolve_dependency(pool, LLAMA_CPP_FAMILY, None, &[]).await {
            Ok(Some(r)) => r,
            Ok(None) => {
                let reason = format!(
                    "no installed {LLAMA_CPP_FAMILY} runtime — install it via Backends first"
                );
                emit_session_state(
                    &res.backend_event_publisher,
                    &thread_id,
                    "model_load_failed",
                    serde_json::json!({
                        "family_id": body.family_id,
                        "variant_id": body.variant_id,
                        "reason": reason.clone(),
                        "remediation": "install_runtime",
                        "runtime_family": LLAMA_CPP_FAMILY,
                    }),
                );
                return (
                    StatusCode::CONFLICT,
                    ApiResponse::<()>::err(
                        StatusCode::CONFLICT,
                        "RUNTIME_NOT_INSTALLED",
                        "state",
                        reason,
                    ),
                )
                    .into_response();
            }
            Err(e) => {
                return ApiResponse::<()>::internal(format!("runtime lookup: {e}")).into_response();
            }
        };

    let binding = ActiveModelBinding {
        family_id: record.family_id.clone(),
        variant_id: body.variant_id.clone(),
        artifact_id: record.artifact_id.clone(),
        absolute_path: abs_path.display().to_string(),
        label: format!("{} / {}", record.family_id, body.variant_id),
    };

    res.model_load_registry
        .set(
            thread_id.clone(),
            LoadState::Loading {
                family_id: body.family_id.clone(),
                variant_id: body.variant_id.clone(),
                label: binding.label.clone(),
            },
        )
        .await;

    emit_session_state(
        &res.backend_event_publisher,
        &thread_id,
        "model_loading",
        serde_json::json!({
            "family_id": body.family_id,
            "variant_id": body.variant_id,
            "label": binding.label,
        }),
    );

    let spawner = match res.spawner.as_ref() {
        Some(s) => s.clone(),
        None => {
            let reason = "runtime spawner not wired in this build".to_string();
            res.model_load_registry
                .set(
                    thread_id.clone(),
                    LoadState::Failed {
                        family_id: body.family_id.clone(),
                        variant_id: body.variant_id.clone(),
                        reason: reason.clone(),
                    },
                )
                .await;
            emit_session_state(
                &res.backend_event_publisher,
                &thread_id,
                "model_load_failed",
                serde_json::json!({
                    "family_id": body.family_id,
                    "variant_id": body.variant_id,
                    "reason": reason,
                }),
            );
            return ApiResponse::<()>::internal("spawner unavailable".to_string()).into_response();
        }
    };

    let registry = res.model_load_registry.clone();
    let publisher = res.backend_event_publisher.clone();
    let bus = res.backend_event_bus.clone();
    let thread_for_task = thread_id.clone();
    let binding_for_task = binding.clone();
    let install_id_for_task = runtime_row.install_id.clone();
    let model_path_string = abs_path.display().to_string();
    let runtime_tuning = body.runtime.clone().unwrap_or_default();
    let accelerator_for_task = if runtime_tuning.n_gpu_layers.unwrap_or(0) > 0
        && runtime_row.accelerator.starts_with("cuda")
    {
        match runtime_row.accelerator.as_str() {
            "cuda13" => AcceleratorProfile::Cuda13,
            _ => AcceleratorProfile::Cuda12,
        }
    } else {
        AcceleratorProfile::Cpu
    };

    tokio::spawn(async move {
        let mut args: Vec<String> = vec!["--model".to_string(), model_path_string.clone()];
        args.extend(runtime_to_args(&runtime_tuning));
        tracing::info!(
            target: "nexus_local_llm::chat",
            family = %LLAMA_CPP_FAMILY,
            args = ?args,
            "spawning llama.cpp with tuned runtime args",
        );
        let spawn_req = SpawnRuntimeRequest {
            extension_id: LOCAL_LLM_EXTENSION.to_string(),
            family: LLAMA_CPP_FAMILY.to_string(),
            version_req: None,
            accelerator: accelerator_for_task,
            args,
            env: std::collections::BTreeMap::new(),
            port_hint: None,
            bind_mode: RuntimeBindMode::Loopback,
            install_id: Some(install_id_for_task),
        };
        let lease = match spawner.spawn(spawn_req).await {
            Ok(l) => l,
            Err(e) => {
                let reason = format!("spawn failed: {e}");
                registry
                    .set(
                        thread_for_task.clone(),
                        LoadState::Failed {
                            family_id: binding_for_task.family_id.clone(),
                            variant_id: binding_for_task.variant_id.clone(),
                            reason: reason.clone(),
                        },
                    )
                    .await;
                emit_session_state(
                    &publisher,
                    &thread_for_task,
                    "model_load_failed",
                    serde_json::json!({
                        "family_id": binding_for_task.family_id,
                        "variant_id": binding_for_task.variant_id,
                        "reason": reason,
                    }),
                );
                return;
            }
        };
        let port = match &lease.channel.address {
            RuntimeAddress::Tcp { port, .. } => *port,
            _ => {
                let reason = "spawned lease has non-TCP address".to_string();
                let _ = spawner.shutdown(&lease.lease_id).await;
                registry
                    .set(
                        thread_for_task.clone(),
                        LoadState::Failed {
                            family_id: binding_for_task.family_id.clone(),
                            variant_id: binding_for_task.variant_id.clone(),
                            reason: reason.clone(),
                        },
                    )
                    .await;
                emit_session_state(
                    &publisher,
                    &thread_for_task,
                    "model_load_failed",
                    serde_json::json!({ "reason": reason }),
                );
                return;
            }
        };

        let mut rx = bus.subscribe();
        let lease_id = lease.lease_id.clone();
        let timeout =
            tokio::time::sleep(std::time::Duration::from_secs(CHANNEL_READY_TIMEOUT_SECS));
        tokio::pin!(timeout);
        let outcome: Result<(), String> = loop {
            tokio::select! {
                biased;
                _ = &mut timeout => {
                    break Err(format!(
                        "timed out after {CHANNEL_READY_TIMEOUT_SECS}s waiting for llama.cpp /health",
                    ));
                }
                recv = rx.recv() => {
                    match recv {
                        Ok(evt) => {
                            let matches_lease = evt
                                .payload
                                .get("lease_id")
                                .and_then(|v| v.as_str())
                                == Some(lease_id.as_str());
                            if !matches_lease { continue; }
                            match evt.topic.as_str() {
                                "channel.ready" => break Ok(()),
                                "process.exited" | "process.crashed" => {
                                    break Err(format!(
                                        "runtime exited before ready: {}",
                                        evt.payload
                                    ));
                                }
                                _ => continue,
                            }
                        }
                        Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => continue,
                        Err(tokio::sync::broadcast::error::RecvError::Closed) => {
                            break Err("event bus closed".to_string());
                        }
                    }
                }
            }
        };

        match outcome {
            Ok(()) => {
                registry
                    .set(
                        thread_for_task.clone(),
                        LoadState::Ready {
                            binding: binding_for_task.clone(),
                            lease_id: Some(lease_id.clone()),
                            port,
                        },
                    )
                    .await;
                emit_session_state(
                    &publisher,
                    &thread_for_task,
                    "model_ready",
                    serde_json::json!({
                        "family_id": binding_for_task.family_id,
                        "variant_id": binding_for_task.variant_id,
                        "label": binding_for_task.label,
                        "lease_id": lease_id,
                        "port": port,
                    }),
                );
            }
            Err(reason) => {
                let _ = spawner.shutdown(&lease_id).await;
                registry
                    .set(
                        thread_for_task.clone(),
                        LoadState::Failed {
                            family_id: binding_for_task.family_id.clone(),
                            variant_id: binding_for_task.variant_id.clone(),
                            reason: reason.clone(),
                        },
                    )
                    .await;
                emit_session_state(
                    &publisher,
                    &thread_for_task,
                    "model_load_failed",
                    serde_json::json!({
                        "family_id": binding_for_task.family_id,
                        "variant_id": binding_for_task.variant_id,
                        "reason": reason,
                    }),
                );
            }
        }
    });

    (
        StatusCode::ACCEPTED,
        ApiResponse::ok(ActiveModelStatus {
            state: LoadState::Loading {
                family_id: binding.family_id.clone(),
                variant_id: binding.variant_id.clone(),
                label: binding.label.clone(),
            },
        }),
    )
        .into_response()
}

pub async fn unload_active_model(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
) -> Response {
    let pool = &res.pool;
    if let Err(e) = ensure_schema(pool).await {
        return ApiResponse::<()>::internal(format!("schema: {e}")).into_response();
    }

    let existed = res.model_load_registry.clear(&thread_id).await;
    if let Some(LoadState::Ready { lease_id, .. }) = &existed {
        if let (Some(spawner), Some(id)) = (res.spawner.as_ref(), lease_id.clone()) {
            let spawner = spawner.clone();
            tokio::spawn(async move {
                if let Err(e) = spawner.shutdown(&id).await {
                    tracing::warn!(lease_id = %id, error = %e, "shutdown on unload failed");
                }
            });
        }
    }

    let now = Utc::now().to_rfc3339();
    let result = sqlx::query(
        "UPDATE ext_local_llm_chat_threads
         SET active_model_family_id = NULL,
             active_model_variant_id = NULL,
             updated_at = ?1
         WHERE id = ?2",
    )
    .bind(&now)
    .bind(&thread_id)
    .execute(pool)
    .await;
    if let Err(e) = result {
        return ApiResponse::<()>::internal(format!("update: {e}")).into_response();
    }

    let mut extra = serde_json::json!({});
    if let Some(prev) = existed {
        match prev {
            LoadState::Ready { binding, .. } => {
                extra = serde_json::json!({
                    "family_id": binding.family_id,
                    "variant_id": binding.variant_id,
                    "label": binding.label,
                });
            }
            LoadState::Loading {
                family_id,
                variant_id,
                label,
            } => {
                extra = serde_json::json!({
                    "family_id": family_id,
                    "variant_id": variant_id,
                    "label": label,
                });
            }
            LoadState::Failed {
                family_id,
                variant_id,
                ..
            } => {
                extra = serde_json::json!({
                    "family_id": family_id,
                    "variant_id": variant_id,
                });
            }
        }
    }

    emit_session_state(
        &res.backend_event_publisher,
        &thread_id,
        "model_unloaded",
        extra,
    );

    ApiResponse::<()>::no_content().into_response()
}

pub async fn get_active_model_status(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
) -> Response {
    match res.model_load_registry.get(&thread_id).await {
        Some(s) => ApiResponse::ok(ActiveModelStatus { state: s }).into_response(),
        None => ApiResponse::<Option<ActiveModelStatus>>::ok(None).into_response(),
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct AvailableModelDto {
    pub family_id: String,
    pub variant_id: Option<String>,
    pub label: String,
    pub format: String,
    pub size_bytes: Option<u64>,
    pub max_context: Option<u32>,
}

#[derive(Debug, Clone, Serialize)]
pub struct AvailableModelsDto {
    pub models: Vec<AvailableModelDto>,
}

pub async fn list_available_models(State(res): State<Arc<ChatHandlerResources>>) -> Response {
    let Some(install_map) = res.install_map.as_ref() else {
        return ApiResponse::ok(AvailableModelsDto { models: Vec::new() }).into_response();
    };
    let rows = match install_map.list_all(500).await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::internal(format!("list_all: {e}")).into_response();
        }
    };
    let models: Vec<AvailableModelDto> = rows
        .into_iter()
        .filter(|row| row.format.eq_ignore_ascii_case("gguf"))
        .map(|row| {
            let label =
                derive_model_label(&row.family_id, row.variant_id.as_deref(), &row.filename);
            AvailableModelDto {
                family_id: row.family_id,
                variant_id: row.variant_id,
                label,
                format: row.format,
                size_bytes: row.size_bytes,
                max_context: row.max_context,
            }
        })
        .collect();
    ApiResponse::ok(AvailableModelsDto { models }).into_response()
}

fn derive_model_label(family_id: &str, variant_id: Option<&str>, filename: &str) -> String {
    match variant_id {
        Some(v) if !v.is_empty() => format!("{family_id} · {v}"),
        _ => {
            let stem = filename
                .rsplit_once('.')
                .map(|(s, _)| s)
                .unwrap_or(filename);
            if stem.is_empty() {
                family_id.to_string()
            } else {
                format!("{family_id} · {stem}")
            }
        }
    }
}

pub async fn cancel_inference(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
) -> Response {
    res.inference_cancel_registry
        .mark_cancelled(thread_id)
        .await;
    ApiResponse::<()>::no_content().into_response()
}

pub async fn send_message(
    State(res): State<Arc<ChatHandlerResources>>,
    Path(thread_id): Path<String>,
    Json(body): Json<SendMessageBody>,
) -> Response {
    let pool = &res.pool;
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
            return ApiResponse::<()>::not_found(format!("thread: {thread_id}")).into_response();
        }
        Err(e) => return ApiResponse::<()>::internal(format!("select: {e}")).into_response(),
    };

    let family: Option<String> = row.try_get("active_model_family_id").ok().flatten();
    let variant: Option<String> = row.try_get("active_model_variant_id").ok().flatten();
    let (family, variant) = match (family, variant) {
        (Some(f), Some(v)) => (f, v),
        _ => {
            return ApiResponse::<()>::bad_request("no_active_model".to_string()).into_response();
        }
    };

    let load_state = res.model_load_registry.get(&thread_id).await;
    let (binding_path, lease_port) = match load_state {
        Some(LoadState::Ready { binding, port, .. }) => {
            if binding.family_id != family || binding.variant_id != variant {
                return (
                    StatusCode::CONFLICT,
                    ApiResponse::<()>::err(
                        StatusCode::CONFLICT,
                        "MODEL_NOT_READY",
                        "conflict",
                        "active model pointer drift — rebind required".to_string(),
                    ),
                )
                    .into_response();
            }
            (binding.absolute_path, port)
        }
        Some(LoadState::Loading { .. }) => {
            return (
                StatusCode::CONFLICT,
                ApiResponse::<()>::err(
                    StatusCode::CONFLICT,
                    "MODEL_NOT_READY",
                    "conflict",
                    "model is still loading".to_string(),
                ),
            )
                .into_response();
        }
        Some(LoadState::Failed { reason, .. }) => {
            return (
                StatusCode::CONFLICT,
                ApiResponse::<()>::err(
                    StatusCode::CONFLICT,
                    "MODEL_LOAD_FAILED",
                    "conflict",
                    reason,
                ),
            )
                .into_response();
        }
        None => {
            return (
                StatusCode::CONFLICT,
                ApiResponse::<()>::err(
                    StatusCode::CONFLICT,
                    "MODEL_NOT_READY",
                    "conflict",
                    "bind a model before sending".to_string(),
                ),
            )
                .into_response();
        }
    };
    let _ = binding_path;

    let settings_json: Option<String> = row.try_get("generation_settings").unwrap_or(None);
    let params = settings_json
        .as_deref()
        .and_then(|s| serde_json::from_str::<GenerationParams>(s).ok())
        .unwrap_or_default();

    let mut messages: Vec<serde_json::Value> = Vec::new();
    if let Some(sys) = system_prompt_for_adapter(&params) {
        messages.push(serde_json::json!({ "role": "system", "content": sys }));
    }
    messages.push(serde_json::json!({ "role": "user", "content": body.content }));

    let completion_body = serde_json::json!({
        "messages": messages,
        "temperature": params.temperature,
        "top_p": params.top_p,
        "top_k": params.top_k,
        "max_tokens": params.max_tokens,
        "repeat_penalty": params.repeat_penalty,
        "stream": false,
    });

    let url = format!("http://127.0.0.1:{lease_port}/v1/chat/completions");
    let client = match reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(600))
        .build()
    {
        Ok(c) => c,
        Err(e) => {
            return ApiResponse::<()>::internal(format!("http client: {e}")).into_response();
        }
    };

    let http_resp = match client.post(&url).json(&completion_body).send().await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::internal(format!("llama.cpp request failed: {e}"))
                .into_response();
        }
    };
    let status = http_resp.status();
    let body_text = http_resp.text().await.unwrap_or_default();
    if !status.is_success() {
        return ApiResponse::<()>::internal(format!(
            "llama.cpp {status}: {}",
            body_text.chars().take(512).collect::<String>(),
        ))
        .into_response();
    }
    let parsed: serde_json::Value = match serde_json::from_str(&body_text) {
        Ok(v) => v,
        Err(e) => {
            return ApiResponse::<()>::internal(format!(
                "llama.cpp response parse: {e}; body: {}",
                body_text.chars().take(256).collect::<String>(),
            ))
            .into_response();
        }
    };
    let content = parsed
        .pointer("/choices/0/message/content")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();

    ApiResponse::ok(SendMessageResponse { content }).into_response()
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

#[cfg(test)]
mod runtime_tuning_tests {
    use super::*;

    fn pos(args: &[String], flag: &str) -> Option<usize> {
        args.iter().position(|s| s == flag)
    }

    fn contains(args: &[String], flag: &str) -> bool {
        pos(args, flag).is_some()
    }

    #[test]
    fn runtime_to_args_includes_all_extended_knobs() {
        let tuning = RuntimeTuning {
            n_gpu_layers: Some(40),
            threads: Some(8),
            flash_attn: Some(true),
            ctx_size: Some(8192),
            cache_type_k: Some("q8_0".into()),
            cache_type_v: Some("q8_0".into()),
            mmap: Some(true),
            mlock: Some(true),
            n_batch: Some(512),
            n_ubatch: Some(128),
            n_parallel: Some(4),
            cont_batching: Some(true),
            seed: Some(42),
        };
        let args = runtime_to_args(&tuning);

        assert!(contains(&args, "--mmap"));
        assert!(contains(&args, "--mlock"));
        assert!(contains(&args, "--cont-batching"));

        let bs = pos(&args, "--batch-size").expect("--batch-size present");
        assert_eq!(args[bs + 1], "512");

        let ubs = pos(&args, "--ubatch-size").expect("--ubatch-size present");
        assert_eq!(args[ubs + 1], "128");

        let par = pos(&args, "--parallel").expect("--parallel present");
        assert_eq!(args[par + 1], "4");

        let seed = pos(&args, "--seed").expect("--seed present");
        assert_eq!(args[seed + 1], "42");
    }

    #[test]
    fn runtime_to_args_emits_no_mmap_when_false() {
        let tuning = RuntimeTuning {
            mmap: Some(false),
            ..Default::default()
        };
        let args = runtime_to_args(&tuning);
        assert!(contains(&args, "--no-mmap"));
        assert!(!contains(&args, "--mmap"));
    }

    #[test]
    fn runtime_to_args_omits_mmap_when_none() {
        let tuning = RuntimeTuning {
            mmap: None,
            ..Default::default()
        };
        let args = runtime_to_args(&tuning);
        assert!(!contains(&args, "--mmap"));
        assert!(!contains(&args, "--no-mmap"));
    }

    #[test]
    fn runtime_to_args_omits_mlock_when_false_or_none() {
        let none_tuning = RuntimeTuning {
            mlock: None,
            ..Default::default()
        };
        assert!(!contains(&runtime_to_args(&none_tuning), "--mlock"));

        let false_tuning = RuntimeTuning {
            mlock: Some(false),
            ..Default::default()
        };
        assert!(!contains(&runtime_to_args(&false_tuning), "--mlock"));
    }

    #[test]
    fn runtime_to_args_omits_cont_batching_when_false_or_none() {
        let none_tuning = RuntimeTuning {
            cont_batching: None,
            ..Default::default()
        };
        assert!(!contains(&runtime_to_args(&none_tuning), "--cont-batching"));

        let false_tuning = RuntimeTuning {
            cont_batching: Some(false),
            ..Default::default()
        };
        assert!(!contains(
            &runtime_to_args(&false_tuning),
            "--cont-batching"
        ));
    }

    #[test]
    fn runtime_to_args_preserves_existing_cache_type_validation() {
        let tuning = RuntimeTuning {
            cache_type_k: Some("garbage".into()),
            cache_type_v: Some("also-bad".into()),
            ..Default::default()
        };
        let args = runtime_to_args(&tuning);
        assert!(!contains(&args, "--cache-type-k"));
        assert!(!contains(&args, "--cache-type-v"));
    }

    #[test]
    fn sensible_defaults_for_cuda_enables_flash_attn_and_q8_kv() {
        let d = RuntimeTuning::sensible_defaults(Some(40), true);
        assert_eq!(d.n_gpu_layers, Some(40));
        assert_eq!(d.flash_attn, Some(true));
        assert_eq!(d.cache_type_k.as_deref(), Some("q8_0"));
        assert_eq!(d.cache_type_v.as_deref(), Some("q8_0"));
    }

    #[test]
    fn sensible_defaults_for_cpu_zeros_gpu_layers_and_uses_fp16() {
        let d = RuntimeTuning::sensible_defaults(Some(40), false);
        assert_eq!(d.n_gpu_layers, Some(0));
        assert_eq!(d.flash_attn, Some(false));
        assert_eq!(d.cache_type_k.as_deref(), Some("fp16"));
        assert_eq!(d.cache_type_v.as_deref(), Some("fp16"));
    }

    #[test]
    fn runtime_tuning_deserializes_with_extended_fields() {
        let json = r#"{"mmap": true, "n_batch": 512, "seed": 42}"#;
        let parsed: RuntimeTuning = serde_json::from_str(json).expect("parses");
        assert_eq!(parsed.mmap, Some(true));
        assert_eq!(parsed.n_batch, Some(512));
        assert_eq!(parsed.seed, Some(42));
        assert_eq!(parsed.mlock, None);
        assert_eq!(parsed.n_ubatch, None);
        assert_eq!(parsed.n_parallel, None);
        assert_eq!(parsed.cont_batching, None);
    }

    #[test]
    fn runtime_tuning_deserializes_when_extended_fields_omitted() {
        let json = r#"{"n_gpu_layers": 26}"#;
        let parsed: RuntimeTuning = serde_json::from_str(json).expect("parses");
        assert_eq!(parsed.n_gpu_layers, Some(26));
        assert_eq!(parsed.mmap, None);
        assert_eq!(parsed.mlock, None);
        assert_eq!(parsed.n_batch, None);
        assert_eq!(parsed.n_ubatch, None);
        assert_eq!(parsed.n_parallel, None);
        assert_eq!(parsed.cont_batching, None);
        assert_eq!(parsed.seed, None);
    }
}
