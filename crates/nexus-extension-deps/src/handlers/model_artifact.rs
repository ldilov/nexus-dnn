//! `model_artifact` step handler — thin adapter over the host's model store.
//!
//! All bytes flow through spec 025's `nexus-models-store` via the
//! [`crate::context::ModelStoreClient`] trait. This handler never touches
//! HuggingFace directly. Models always live under the host's `models/` dir, never
//! inside the extension's data dir.

use std::time::Duration;

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::{ModelDownloadProgress, StepContext};
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::{ProgressEvent, StepArtifact};

#[derive(Debug, Deserialize)]
struct ModelArtifactSpec {
    family_id: String,
    #[serde(default)]
    acceleration_match: Option<String>,
}

pub struct ModelArtifactHandler;

impl ModelArtifactHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for ModelArtifactHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<ModelArtifactSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

/// Resolve the requested accelerator profile from the spec's `acceleration_match`
/// directive against upstream artifacts. Sentinel form is
/// `matches_runtime_step:<step_id>` — read that step's `metadata.resolved_profile`.
fn resolve_accelerator(parsed: &ModelArtifactSpec, ctx: &StepContext<'_>) -> Option<String> {
    let directive = parsed.acceleration_match.as_deref()?;
    if let Some(step_id) = directive.strip_prefix("matches_runtime_step:") {
        let upstream = ctx.upstream_artifacts.get(step_id)?;
        return upstream
            .metadata
            .get("resolved_profile")
            .and_then(Value::as_str)
            .map(String::from);
    }
    Some(directive.to_owned())
}

#[async_trait]
impl StepHandler for ModelArtifactHandler {
    fn step_type(&self) -> &'static str {
        "model_artifact"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.family_id.trim().is_empty() {
            return Err(DepError::invalid_spec("", "family_id", "empty"));
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        let installed = ctx
            .model_store
            .is_family_installed(&parsed.family_id, accelerator.as_deref())
            .await?;
        match installed {
            Some(path) => Ok(ProbeResult::Satisfied {
                artifact: StepArtifact {
                    path: Some(path),
                    bytes_placed: 0,
                    summary: format!(
                        "model {} ({})",
                        parsed.family_id,
                        accelerator.as_deref().unwrap_or("default")
                    ),
                    metadata: Value::Null,
                },
            }),
            None => Ok(ProbeResult::NotSatisfied),
        }
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        let job_id = ctx
            .model_store
            .start_download(&parsed.family_id, accelerator.as_deref())
            .await?;

        loop {
            if ctx.cancellation_token.is_cancelled() {
                return Err(DepError::Cancelled);
            }
            match ctx.model_store.poll_job(&job_id).await? {
                ModelDownloadProgress::InProgress {
                    current_bytes,
                    total_bytes,
                    message,
                } => {
                    ctx.progress_sink.emit(ProgressEvent::StepProgress {
                        extension_id: ctx.extension_id.to_owned(),
                        install_run_id: ctx.install_run_id,
                        // step_id is unknown to the handler — runner re-tags it.
                        step_id: String::new(),
                        phase: "download".to_owned(),
                        current_bytes,
                        total_bytes,
                        message,
                    });
                    tokio::time::sleep(Duration::from_millis(500)).await;
                }
                ModelDownloadProgress::Completed { path, bytes_placed } => {
                    return Ok(StepArtifact {
                        path: Some(path),
                        bytes_placed,
                        summary: format!(
                            "model {} ({})",
                            parsed.family_id,
                            accelerator.as_deref().unwrap_or("default")
                        ),
                        metadata: Value::Null,
                    });
                }
                ModelDownloadProgress::Failed { category, message } => {
                    return Err(DepError::Backend(format!("{category}: {message}")));
                }
            }
        }
    }
}
