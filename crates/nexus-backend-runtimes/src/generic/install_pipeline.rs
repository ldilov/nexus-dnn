//! Install-pipeline orchestrator. Iterates the 10 canonical phases,
//! emits [`PhaseEvent`]s at `started`/`completed`/`failed` boundaries,
//! and honours cancellation at every phase edge.
//!
//! The generic phases (`resolve`, `download`, `verify`, `extract`,
//! `detect_models`, `persist`, `complete`) are scaffolded here as
//! phase-handler hooks; user-story phases (T045+) plug in the concrete
//! HTTP-download / archive-extract / model-scan implementations. The
//! family-specific phases (`bootstrap_runtime`, `install_deps`,
//! `validate_env`) delegate to [`RuntimeFamilyHandler`].

use std::sync::Arc;
use std::time::Instant;

use serde::{Deserialize, Serialize};

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::family_handler::RuntimeFamilyHandler;
use crate::generic::ids::RuntimeInstallId;
use crate::generic::install_ctx::InstallCtx;

/// Canonical phase order. MUST match the OpenAPI enum in
/// [`contracts/http/backend_runtime_installs.yaml`].
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Phase {
    Resolve,
    Download,
    Verify,
    Extract,
    BootstrapRuntime,
    InstallDeps,
    ValidateEnv,
    DetectModels,
    Persist,
    Complete,
}

impl Phase {
    pub const ORDER: &'static [Phase] = &[
        Phase::Resolve,
        Phase::Download,
        Phase::Verify,
        Phase::Extract,
        Phase::BootstrapRuntime,
        Phase::InstallDeps,
        Phase::ValidateEnv,
        Phase::DetectModels,
        Phase::Persist,
        Phase::Complete,
    ];

    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Resolve => "resolve",
            Self::Download => "download",
            Self::Verify => "verify",
            Self::Extract => "extract",
            Self::BootstrapRuntime => "bootstrap_runtime",
            Self::InstallDeps => "install_deps",
            Self::ValidateEnv => "validate_env",
            Self::DetectModels => "detect_models",
            Self::Persist => "persist",
            Self::Complete => "complete",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PhaseState {
    Started,
    Completed,
    Failed,
}

/// Per-phase event emitted over backend-events. Schema mirrors
/// [`contracts/http/backend_runtime_installs.yaml#PhaseEvent`].
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PhaseEvent {
    pub install_id: RuntimeInstallId,
    pub phase: Phase,
    pub state: PhaseState,
    pub elapsed_ms: u64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub failure_category: Option<PipelineFailureCategory>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub failure_detail: Option<String>,
    #[serde(default, skip_serializing_if = "serde_json::Value::is_null")]
    pub payload: serde_json::Value,
}

impl PhaseEvent {
    pub fn started(install_id: RuntimeInstallId, phase: Phase) -> Self {
        Self {
            install_id,
            phase,
            state: PhaseState::Started,
            elapsed_ms: 0,
            failure_category: None,
            failure_detail: None,
            payload: serde_json::Value::Null,
        }
    }

    pub fn completed(install_id: RuntimeInstallId, phase: Phase, elapsed_ms: u64) -> Self {
        Self {
            install_id,
            phase,
            state: PhaseState::Completed,
            elapsed_ms,
            failure_category: None,
            failure_detail: None,
            payload: serde_json::Value::Null,
        }
    }

    pub fn completed_cached(install_id: RuntimeInstallId, phase: Phase, elapsed_ms: u64) -> Self {
        Self {
            install_id,
            phase,
            state: PhaseState::Completed,
            elapsed_ms,
            failure_category: None,
            failure_detail: None,
            payload: serde_json::json!({ "cached": true }),
        }
    }

    pub fn failed(
        install_id: RuntimeInstallId,
        phase: Phase,
        elapsed_ms: u64,
        err: &GenericInstallError,
    ) -> Self {
        Self {
            install_id,
            phase,
            state: PhaseState::Failed,
            elapsed_ms,
            failure_category: Some(err.category.clone()),
            failure_detail: Some(err.detail.clone()),
            payload: serde_json::Value::Null,
        }
    }
}

/// Receiver of phase-lifecycle events. The host wires this to the
/// existing [`BackendEventPublisher`](crate::events::SharedPublisher);
/// tests plug in an in-memory collector.
#[async_trait::async_trait]
pub trait PhaseEventSink: Send + Sync {
    async fn emit(&self, event: PhaseEvent);
}

/// Orchestrate the 10-phase install pipeline. On success the final
/// `Complete` phase fires with `Completed` state; on failure the
/// offending phase emits `Failed` and [`GenericInstallError`] is
/// returned to the caller.
pub async fn run(
    ctx: &mut InstallCtx,
    handler: Arc<dyn RuntimeFamilyHandler>,
    sink: Arc<dyn PhaseEventSink>,
) -> Result<(), GenericInstallError> {
    for phase in Phase::ORDER {
        check_cancelled(ctx, *phase)?;
        ctx.phase_cached = false;
        let start = Instant::now();
        sink.emit(PhaseEvent::started(ctx.install_id, *phase)).await;

        let outcome = match phase {
            Phase::Resolve => crate::generic::phases::resolve::run(ctx).await,
            Phase::Download => crate::generic::phases::download::run(ctx).await,
            Phase::Verify => crate::generic::phases::verify::run(ctx).await,
            Phase::Extract => crate::generic::phases::extract::run(ctx).await,
            Phase::BootstrapRuntime => handler.bootstrap_runtime(ctx).await,
            Phase::InstallDeps => handler.install_deps(ctx).await,
            Phase::ValidateEnv => handler.validate_env(ctx).await,
            Phase::DetectModels => detect_models_phase(ctx).await,
            Phase::Persist => persist_phase(ctx).await,
            Phase::Complete => complete_phase(ctx).await,
        };

        let elapsed = start.elapsed().as_millis() as u64;
        match outcome {
            Ok(()) => {
                let event = if ctx.phase_cached {
                    PhaseEvent::completed_cached(ctx.install_id, *phase, elapsed)
                } else {
                    PhaseEvent::completed(ctx.install_id, *phase, elapsed)
                };
                sink.emit(event).await;
            }
            Err(err) => {
                sink.emit(PhaseEvent::failed(ctx.install_id, *phase, elapsed, &err))
                    .await;
                return Err(err);
            }
        }
    }
    Ok(())
}

fn check_cancelled(ctx: &InstallCtx, phase: Phase) -> Result<(), GenericInstallError> {
    if ctx.cancellation.is_cancelled() {
        return Err(GenericInstallError::new(
            phase.as_str(),
            PipelineFailureCategory::Cancelled,
            "cancellation requested",
        ));
    }
    Ok(())
}

async fn detect_models_phase(_ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    Ok(())
}

async fn persist_phase(_ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    Ok(())
}

/// T058 — atomic rename of the staging dir into the final install path.
///
/// Per research.md R-08: rename is the OS-level atomic operation that
/// swaps the contents in place. If `partial_path == install_path` the
/// pipeline ran in-place and there's nothing to do.
async fn complete_phase(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    if ctx.partial_path == ctx.install_path {
        return Ok(());
    }
    let sentinel = ctx
        .partial_path
        .join(crate::generic::phases::extract::EXTRACT_SENTINEL);
    if sentinel.exists() {
        let _ = tokio::fs::remove_file(&sentinel).await;
    }
    if !ctx.partial_path.exists() {
        return Err(GenericInstallError::new(
            "complete",
            PipelineFailureCategory::InvalidDownload,
            format!(
                "partial path `{}` does not exist at complete phase",
                ctx.partial_path.display()
            ),
        ));
    }
    if ctx.install_path.exists() {
        // Pre-existing install at the target path — surface as collision
        // rather than silently overwriting. Operator can resolve.
        return Err(GenericInstallError::new(
            "complete",
            PipelineFailureCategory::InstallPathCollision,
            format!(
                "install path `{}` already exists",
                ctx.install_path.display()
            ),
        ));
    }
    if let Some(parent) = ctx.install_path.parent()
        && !parent.exists()
    {
        tokio::fs::create_dir_all(parent).await.map_err(|e| {
            GenericInstallError::new(
                "complete",
                PipelineFailureCategory::InstallPathCollision,
                format!("failed to create install parent dir: {e}"),
            )
        })?;
    }
    tokio::fs::rename(&ctx.partial_path, &ctx.install_path)
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "complete",
                PipelineFailureCategory::InstallPathCollision,
                format!(
                    "rename `{}` → `{}` failed: {e}",
                    ctx.partial_path.display(),
                    ctx.install_path.display()
                ),
            )
        })?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn phase_order_matches_wire_contract() {
        let wire: Vec<&str> = Phase::ORDER.iter().map(|p| p.as_str()).collect();
        assert_eq!(
            wire,
            vec![
                "resolve",
                "download",
                "verify",
                "extract",
                "bootstrap_runtime",
                "install_deps",
                "validate_env",
                "detect_models",
                "persist",
                "complete",
            ]
        );
    }

    #[test]
    fn phase_state_serde_is_snake_case() {
        assert_eq!(
            serde_json::to_value(PhaseState::Started).unwrap(),
            serde_json::json!("started")
        );
        assert_eq!(
            serde_json::to_value(PhaseState::Completed).unwrap(),
            serde_json::json!("completed")
        );
        assert_eq!(
            serde_json::to_value(PhaseState::Failed).unwrap(),
            serde_json::json!("failed")
        );
    }
}
