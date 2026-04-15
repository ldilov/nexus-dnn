//! Model-install orchestration: drives the shared Hugging Face capability
//! to download artifacts, route them to a backend, and commit a registry row.
//!
//! This module owns the *domain* layer for model lifecycle; it never speaks
//! HTTP to Hugging Face directly — that belongs to `nexus_huggingface`.

use std::path::PathBuf;
use std::sync::Arc;

use sqlx::{Row, SqlitePool};
use tokio_util::sync::CancellationToken;

use nexus_huggingface::{
    DownloadFileSpec, DownloadSpec, DownloadedArtifact, HfError, HuggingFaceCapability,
};

use crate::error::RuntimeAdapterError;

#[derive(Debug, Clone)]
pub struct InstallModelRequest {
    pub repo_id: String,
    pub revision: Option<String>,
    pub files: Vec<String>,
    pub display_name: Option<String>,
}

#[derive(Debug, Clone)]
pub struct ModelInstallOutcome {
    pub task_id: String,
    pub model_install_id: String,
    pub routed_backend: String,
    pub routing_signal: String,
    pub total_bytes: u64,
}

#[derive(Debug, thiserror::Error)]
pub enum InstallModelError {
    #[error("hugging face error: {0}")]
    Hf(#[from] HfError),
    #[error("no compatible backend for this model")]
    NoCompatibleBackend { reason: String },
    #[error("hyperparameter '{field}' out of range: {message}")]
    HyperparametersOutOfRange { field: String, message: String },
    #[error("storage error: {0}")]
    Storage(String),
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

impl From<sqlx::Error> for InstallModelError {
    fn from(e: sqlx::Error) -> Self {
        Self::Storage(e.to_string())
    }
}

impl From<InstallModelError> for RuntimeAdapterError {
    fn from(e: InstallModelError) -> Self {
        match e {
            InstallModelError::Storage(msg) => RuntimeAdapterError::Storage(msg),
            InstallModelError::Io(err) => RuntimeAdapterError::Io(err),
            other => RuntimeAdapterError::Storage(other.to_string()),
        }
    }
}

pub struct ModelInstaller {
    pool: SqlitePool,
    capability: Arc<dyn HuggingFaceCapability>,
    models_root: PathBuf,
    trt_supported_architectures: Arc<Vec<String>>,
}

impl ModelInstaller {
    pub fn new(
        pool: SqlitePool,
        capability: Arc<dyn HuggingFaceCapability>,
        models_root: PathBuf,
    ) -> Self {
        Self::with_trt_allowlist(pool, capability, models_root, default_trt_allowlist())
    }

    pub fn with_trt_allowlist(
        pool: SqlitePool,
        capability: Arc<dyn HuggingFaceCapability>,
        models_root: PathBuf,
        trt_supported_architectures: Vec<String>,
    ) -> Self {
        Self {
            pool,
            capability,
            models_root,
            trt_supported_architectures: Arc::new(trt_supported_architectures),
        }
    }

    #[tracing::instrument(
        name = "model.install",
        skip(self, cancel_token),
        fields(repo_id = %request.repo_id, task_id, model_install_id, routed_backend)
    )]
    pub async fn begin(
        &self,
        request: InstallModelRequest,
        cancel_token: CancellationToken,
    ) -> Result<ModelInstallOutcome, InstallModelError> {
        let task_id = format!("dl_{}", uuid_like());
        let model_install_id = format!("mi_{}", uuid_like());
        let revision = request.revision.clone().unwrap_or_else(|| "main".into());
        tracing::Span::current().record("task_id", task_id.as_str());
        tracing::Span::current().record("model_install_id", model_install_id.as_str());

        let meta = self
            .capability
            .detail(&request.repo_id, Some(&revision))
            .await?;
        let (routed_backend, routing_signal) =
            route_backend(&meta, &self.trt_supported_architectures);
        tracing::debug!(files = ?request.files, "routing decision evaluated");
        let routed_backend = routed_backend.ok_or_else(|| {
            let archs = meta.architectures().join(", ");
            let files_sample = meta
                .siblings
                .iter()
                .take(3)
                .map(|f| f.path.as_str())
                .collect::<Vec<_>>()
                .join(", ");
            InstallModelError::NoCompatibleBackend {
                reason: format!(
                    "No compatible backend for {}. architectures=[{}] files~[{}]. \
                     Llama.cpp requires a GGUF file; TensorRT-LLM requires a prebuilt \
                     *.engine or a supported architecture.",
                    meta.repo_id, archs, files_sample
                ),
            }
        })?;
        tracing::Span::current().record("routed_backend", routed_backend.as_str());
        tracing::info!(signal = %routing_signal, "model routed to backend");

        let now = chrono::Utc::now().to_rfc3339();

        sqlx::query(
            "INSERT INTO ext_local_llm_model_download_tasks \
             (id, repo_id, revision, requested_files, download_mode, backend_target, \
              model_install_id, status, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'queued', $8, $8)",
        )
        .bind(&task_id)
        .bind(&request.repo_id)
        .bind(&revision)
        .bind(serde_json::to_string(&request.files).unwrap_or_default())
        .bind("manual")
        .bind(&routed_backend)
        .bind(&model_install_id)
        .bind(&now)
        .execute(&self.pool)
        .await?;

        let staging_dir = self
            .models_root
            .join(&routed_backend)
            .join(&model_install_id);

        let download_files: Vec<DownloadFileSpec> = request
            .files
            .iter()
            .map(|path| DownloadFileSpec {
                path: path.clone(),
                expected_sha256: None,
                size_bytes: None,
            })
            .collect();

        let download_spec = DownloadSpec {
            task_id: task_id.clone(),
            repo_id: request.repo_id.clone(),
            revision: revision.clone(),
            files: download_files,
            staging_dir: staging_dir.clone(),
            cancel_token: cancel_token.clone(),
        };

        self.mark_task_status(&task_id, "downloading", None).await?;

        let artifact = match self.capability.download(download_spec).await {
            Ok(a) => a,
            Err(HfError::Cancelled) => {
                self.mark_task_status(&task_id, "cancelled", None).await?;
                let _ = tokio::fs::remove_dir_all(&staging_dir).await;
                return Err(InstallModelError::Hf(HfError::Cancelled));
            }
            Err(e) => {
                self.mark_task_status(&task_id, "failed", Some(&e.to_string()))
                    .await?;
                let _ = tokio::fs::remove_dir_all(&staging_dir).await;
                return Err(InstallModelError::Hf(e));
            }
        };

        self.commit_install(
            &task_id,
            &model_install_id,
            &request,
            &revision,
            &routed_backend,
            &routing_signal,
            &artifact,
        )
        .await?;

        Ok(ModelInstallOutcome {
            task_id,
            model_install_id,
            routed_backend,
            routing_signal,
            total_bytes: artifact.total_bytes,
        })
    }

    pub async fn list_installed(&self) -> Result<Vec<InstalledModelRow>, InstallModelError> {
        list_installed(&self.pool).await
    }

    pub async fn patch_hyperparameters(
        &self,
        model_id: &str,
        profile_json: &str,
    ) -> Result<bool, InstallModelError> {
        let row = load_installed_row(&self.pool, model_id).await?;
        let Some(row) = row else { return Ok(false) };
        if let Some(limits_json) = &row.model_limits_json {
            validate_profile_against_limits(profile_json, limits_json)?;
        }
        patch_hyperparameters_json(&self.pool, model_id, profile_json).await
    }

    async fn mark_task_status(
        &self,
        task_id: &str,
        status: &str,
        error: Option<&str>,
    ) -> Result<(), InstallModelError> {
        let now = chrono::Utc::now().to_rfc3339();
        sqlx::query(
            "UPDATE ext_local_llm_model_download_tasks \
             SET status = $1, error = $2, updated_at = $3 WHERE id = $4",
        )
        .bind(status)
        .bind(error)
        .bind(&now)
        .bind(task_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn commit_install(
        &self,
        task_id: &str,
        model_install_id: &str,
        request: &InstallModelRequest,
        revision: &str,
        routed_backend: &str,
        routing_signal: &str,
        artifact: &DownloadedArtifact,
    ) -> Result<(), InstallModelError> {
        let now = chrono::Utc::now().to_rfc3339();
        let display_name = request
            .display_name
            .clone()
            .unwrap_or_else(|| request.repo_id.clone());
        let local_paths = serde_json::to_string(
            &artifact
                .files
                .iter()
                .map(|f| f.local_path.to_string_lossy().into_owned())
                .collect::<Vec<_>>(),
        )
        .unwrap_or_else(|_| "[]".to_owned());
        let backend_tags = serde_json::to_string(&vec![routed_backend]).unwrap_or_default();
        let selected_files = serde_json::to_string(&request.files).unwrap_or_default();
        let quantization_hint = infer_quantization_from_files(&request.files);
        let model_limits_json = extract_model_limits(artifact)
            .and_then(|v| serde_json::to_string(&v).ok());

        let mut tx = self.pool.begin().await?;

        sqlx::query(
            "INSERT INTO ext_local_llm_model_installs \
             (id, repo_id, revision, display_name, backend_tags, selected_files, \
              local_paths, source_mode, size_bytes, quantization_hint, state, \
              routed_backend, routing_signal, model_limits, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'huggingface', $8, $9, 'ready', \
                     $10, $11, $12, $13, $13)",
        )
        .bind(model_install_id)
        .bind(&request.repo_id)
        .bind(revision)
        .bind(&display_name)
        .bind(&backend_tags)
        .bind(&selected_files)
        .bind(&local_paths)
        .bind(artifact.total_bytes as i64)
        .bind(quantization_hint)
        .bind(routed_backend)
        .bind(routing_signal)
        .bind(&model_limits_json)
        .bind(&now)
        .execute(&mut *tx)
        .await?;

        sqlx::query(
            "UPDATE ext_local_llm_model_download_tasks \
             SET status = 'installed', bytes_downloaded = $1, bytes_total = $1, \
                 updated_at = $2 WHERE id = $3",
        )
        .bind(artifact.total_bytes as i64)
        .bind(&now)
        .bind(task_id)
        .execute(&mut *tx)
        .await?;

        tx.commit().await?;
        Ok(())
    }
}

fn route_backend(
    meta: &nexus_huggingface::RepoMetadata,
    trt_allowlist: &[String],
) -> (Option<String>, String) {
    let has_gguf = meta.has_file_matching(|p| p.to_ascii_lowercase().ends_with(".gguf"));
    if has_gguf {
        return (Some("llama.cpp".to_owned()), "gguf".to_owned());
    }

    let has_trt_engine = meta.has_file_matching(|p| {
        let lower = p.to_ascii_lowercase();
        lower.ends_with(".engine") || lower.contains("trt_llm")
    });
    if has_trt_engine {
        return (Some("tensorrt-llm".to_owned()), "trt-prebuilt".to_owned());
    }

    let archs = meta.architectures();
    if !archs.is_empty() && archs.iter().any(|a| trt_allowlist.iter().any(|s| s == a)) {
        return (
            Some("tensorrt-llm".to_owned()),
            "trt-architecture".to_owned(),
        );
    }

    (None, "none".to_owned())
}

pub fn load_trt_allowlist_from_yaml(path: &std::path::Path) -> Vec<String> {
    match std::fs::read_to_string(path) {
        Ok(contents) => parse_trt_allowlist_yaml(&contents).unwrap_or_else(|e| {
            tracing::warn!(path = %path.display(), error = %e, "trt allowlist yaml malformed; falling back to builtin");
            default_trt_allowlist()
        }),
        Err(e) => {
            tracing::warn!(path = %path.display(), error = %e, "trt allowlist yaml not found; using builtin");
            default_trt_allowlist()
        }
    }
}

fn parse_trt_allowlist_yaml(contents: &str) -> Result<Vec<String>, String> {
    #[derive(serde::Deserialize)]
    struct Shape {
        architectures: Vec<String>,
    }
    let parsed: Shape = serde_saphyr::from_str(contents).map_err(|e| e.to_string())?;
    Ok(parsed.architectures)
}

fn default_trt_allowlist() -> Vec<String> {
    [
        "LlamaForCausalLM",
        "MistralForCausalLM",
        "MixtralForCausalLM",
        "Qwen2ForCausalLM",
        "Qwen2MoeForCausalLM",
        "GPT2LMHeadModel",
        "GPTNeoXForCausalLM",
        "FalconForCausalLM",
        "BaichuanForCausalLM",
        "ChatGLMForConditionalGeneration",
        "GemmaForCausalLM",
        "Gemma2ForCausalLM",
        "Phi3ForCausalLM",
    ]
    .iter()
    .map(|s| (*s).to_owned())
    .collect()
}

fn extract_model_limits(artifact: &DownloadedArtifact) -> Option<serde_json::Value> {
    for file in &artifact.files {
        let path_lower = file.path.to_ascii_lowercase();
        if path_lower.ends_with("config.json") {
            if let Ok(contents) = std::fs::read_to_string(&file.local_path) {
                if let Ok(v) = serde_json::from_str::<serde_json::Value>(&contents) {
                    return Some(serde_json::json!({
                        "max_context": v.get("max_position_embeddings")
                            .and_then(|x| x.as_u64()),
                        "vocab_size": v.get("vocab_size").and_then(|x| x.as_u64()),
                        "hidden_size": v.get("hidden_size").and_then(|x| x.as_u64()),
                        "num_heads": v.get("num_attention_heads").and_then(|x| x.as_u64()),
                        "num_layers": v.get("num_hidden_layers").and_then(|x| x.as_u64()),
                    }));
                }
            }
        }
    }
    None
}

fn infer_quantization_from_files(files: &[String]) -> Option<String> {
    for f in files {
        let upper = f.to_ascii_uppercase();
        for tag in [
            "Q2_K", "Q3_K_S", "Q3_K_M", "Q3_K_L", "Q4_0", "Q4_K_S", "Q4_K_M", "Q5_0", "Q5_K_S",
            "Q5_K_M", "Q6_K", "Q8_0", "F16", "F32",
        ] {
            if upper.contains(tag) {
                return Some(tag.to_owned());
            }
        }
    }
    None
}

fn uuid_like() -> String {
    let now = chrono::Utc::now().timestamp_nanos_opt().unwrap_or(0);
    format!("{now:016x}")
}

pub async fn list_installed(
    pool: &SqlitePool,
) -> Result<Vec<InstalledModelRow>, InstallModelError> {
    let rows = sqlx::query(
        "SELECT id, repo_id, revision, display_name, size_bytes, quantization_hint, \
                state, routed_backend, routing_signal, created_at, model_limits, hyperparameters \
         FROM ext_local_llm_model_installs \
         ORDER BY datetime(created_at) DESC",
    )
    .fetch_all(pool)
    .await?;

    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        out.push(InstalledModelRow {
            id: row.try_get("id").map_err(sqlx_err)?,
            repo_id: row.try_get("repo_id").ok(),
            revision: row.try_get("revision").ok(),
            display_name: row.try_get("display_name").map_err(sqlx_err)?,
            size_bytes: row.try_get::<Option<i64>, _>("size_bytes").ok().flatten(),
            quantization_hint: row.try_get("quantization_hint").ok(),
            state: row.try_get("state").map_err(sqlx_err)?,
            routed_backend: row.try_get("routed_backend").ok(),
            routing_signal: row.try_get("routing_signal").ok(),
            created_at: row.try_get("created_at").map_err(sqlx_err)?,
            model_limits_json: row.try_get("model_limits").ok(),
            hyperparameters_json: row.try_get("hyperparameters").ok(),
        });
    }
    Ok(out)
}

fn sqlx_err(e: sqlx::Error) -> InstallModelError {
    InstallModelError::Storage(e.to_string())
}

#[derive(Debug, Clone)]
pub struct InstalledModelRow {
    pub id: String,
    pub repo_id: Option<String>,
    pub revision: Option<String>,
    pub display_name: String,
    pub size_bytes: Option<i64>,
    pub quantization_hint: Option<String>,
    pub state: String,
    pub routed_backend: Option<String>,
    pub routing_signal: Option<String>,
    pub created_at: String,
    pub model_limits_json: Option<String>,
    pub hyperparameters_json: Option<String>,
}

async fn load_installed_row(
    pool: &SqlitePool,
    model_id: &str,
) -> Result<Option<InstalledModelRow>, InstallModelError> {
    let row = sqlx::query(
        "SELECT id, repo_id, revision, display_name, size_bytes, quantization_hint, \
                state, routed_backend, routing_signal, created_at, model_limits, hyperparameters \
         FROM ext_local_llm_model_installs \
         WHERE id = $1",
    )
    .bind(model_id)
    .fetch_optional(pool)
    .await?;
    Ok(row.map(|row| InstalledModelRow {
        id: row.try_get("id").unwrap_or_default(),
        repo_id: row.try_get("repo_id").ok(),
        revision: row.try_get("revision").ok(),
        display_name: row.try_get("display_name").unwrap_or_default(),
        size_bytes: row.try_get::<Option<i64>, _>("size_bytes").ok().flatten(),
        quantization_hint: row.try_get("quantization_hint").ok(),
        state: row.try_get("state").unwrap_or_default(),
        routed_backend: row.try_get("routed_backend").ok(),
        routing_signal: row.try_get("routing_signal").ok(),
        created_at: row.try_get("created_at").unwrap_or_default(),
        model_limits_json: row.try_get("model_limits").ok(),
        hyperparameters_json: row.try_get("hyperparameters").ok(),
    }))
}

fn validate_profile_against_limits(
    profile_json: &str,
    limits_json: &str,
) -> Result<(), InstallModelError> {
    let profile: serde_json::Value = serde_json::from_str(profile_json).map_err(|e| {
        InstallModelError::HyperparametersOutOfRange {
            field: "root".into(),
            message: format!("invalid profile json: {e}"),
        }
    })?;
    let limits: serde_json::Value = serde_json::from_str(limits_json).unwrap_or(serde_json::json!({}));

    let check_bound = |field: &str,
                       value: Option<f64>,
                       min_exclusive: Option<f64>,
                       max_inclusive: Option<f64>|
     -> Result<(), InstallModelError> {
        let Some(v) = value else { return Ok(()) };
        if let Some(lo) = min_exclusive
            && v <= lo
        {
            return Err(InstallModelError::HyperparametersOutOfRange {
                field: field.into(),
                message: format!("{v} must be > {lo}"),
            });
        }
        if let Some(hi) = max_inclusive
            && v > hi
        {
            return Err(InstallModelError::HyperparametersOutOfRange {
                field: field.into(),
                message: format!("{v} exceeds max {hi}"),
            });
        }
        Ok(())
    };

    let common = profile.get("common");
    let get_f = |key: &str| -> Option<f64> {
        common
            .and_then(|c| c.get(key))
            .and_then(|v| v.as_f64())
    };
    let get_u = |key: &str| -> Option<f64> {
        common
            .and_then(|c| c.get(key))
            .and_then(|v| v.as_u64())
            .map(|n| n as f64)
    };

    check_bound("common.temperature", get_f("temperature"), Some(0.0), Some(2.0))?;
    check_bound("common.top_p", get_f("top_p"), Some(0.0), Some(1.0))?;
    check_bound("common.top_k", get_u("top_k"), Some(0.0), None)?;
    check_bound(
        "common.repetition_penalty",
        get_f("repetition_penalty"),
        Some(0.0),
        Some(5.0),
    )?;

    let max_ctx_limit = limits.get("max_context").and_then(|v| v.as_u64());
    if let (Some(requested), Some(limit)) = (get_u("max_context_length"), max_ctx_limit) {
        if requested as u64 > limit {
            return Err(InstallModelError::HyperparametersOutOfRange {
                field: "common.max_context_length".into(),
                message: format!("{requested} exceeds model max_context {limit}"),
            });
        }
    }

    let num_layers_limit = limits.get("num_layers").and_then(|v| v.as_u64());
    if let (Some(requested), Some(limit)) = (
        profile
            .get("llamacpp")
            .and_then(|c| c.get("n_gpu_layers"))
            .and_then(|v| v.as_i64()),
        num_layers_limit,
    ) {
        if requested > limit as i64 {
            return Err(InstallModelError::HyperparametersOutOfRange {
                field: "llamacpp.n_gpu_layers".into(),
                message: format!("{requested} exceeds model layer count {limit}"),
            });
        }
    }

    Ok(())
}

pub async fn patch_hyperparameters_json(
    pool: &SqlitePool,
    model_id: &str,
    profile_json: &str,
) -> Result<bool, InstallModelError> {
    let now = chrono::Utc::now().to_rfc3339();
    let result = sqlx::query(
        "UPDATE ext_local_llm_model_installs \
         SET hyperparameters = $1, updated_at = $2 WHERE id = $3",
    )
    .bind(profile_json)
    .bind(&now)
    .bind(model_id)
    .execute(pool)
    .await?;
    Ok(result.rows_affected() > 0)
}
