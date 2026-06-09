//! `runtime` step handler — language-runtime install.
//!
//! Delegates to the host-supplied [`crate::context::RuntimeBootstrapper`] (wired to
//! spec 032's `nexus-backend-runtimes` at host startup). Stores the resolved profile
//! in the artifact's `metadata` so a downstream `model_artifact` step can match on it.

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::{ProgressEvent, StepArtifact, StepProgress};

#[derive(Debug, Deserialize)]
struct RuntimeSpec {
    family: String,
    #[serde(default)]
    version: Option<String>,
    #[serde(default)]
    accelerator_profiles: Vec<String>,
}

pub struct RuntimeHandler;

impl RuntimeHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for RuntimeHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<RuntimeSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

fn build_artifact(
    parsed: &RuntimeSpec,
    result: crate::context::RuntimeBootstrapResult,
) -> StepArtifact {
    let mut metadata = serde_json::Map::new();
    metadata.insert(
        "resolved_version".to_owned(),
        Value::String(result.resolved_version.clone()),
    );
    if let Some(profile) = result.resolved_profile.as_deref() {
        metadata.insert(
            "resolved_profile".to_owned(),
            Value::String(profile.to_owned()),
        );
    }
    metadata.insert("family".to_owned(), Value::String(parsed.family.clone()));

    let summary = format!(
        "{} {} ({})",
        parsed.family,
        result.resolved_version,
        result
            .resolved_profile
            .as_deref()
            .unwrap_or("default profile"),
    );

    StepArtifact {
        path: Some(result.install_dir),
        bytes_placed: result.bytes_placed,
        summary,
        metadata: Value::Object(metadata),
    }
}

#[async_trait]
impl StepHandler for RuntimeHandler {
    fn step_type(&self) -> &'static str {
        "runtime"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.family.trim().is_empty() {
            return Err(DepError::invalid_spec("", "family", "empty"));
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let target_dir = runtime_dir(ctx, &parsed.family);
        match ctx
            .runtime_bootstrapper
            .probe(
                &parsed.family,
                parsed.version.as_deref(),
                &parsed.accelerator_profiles,
                &target_dir,
            )
            .await?
        {
            None => Ok(ProbeResult::NotSatisfied),
            Some(result) => Ok(ProbeResult::Satisfied {
                artifact: build_artifact(&parsed, result),
            }),
        }
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let target_dir = runtime_dir(ctx, &parsed.family);
        tokio::fs::create_dir_all(&target_dir).await?;

        let emit = |progress: StepProgress| {
            ctx.progress_sink.emit(ProgressEvent::step_progress(
                ctx.extension_id,
                ctx.install_run_id,
                // step_id is unknown to the handler — runner re-tags it.
                String::new(),
                progress,
            ));
        };

        // The bootstrapper is opaque (download + verify + extract happen inside
        // the host adapter), so we bracket it with explicit phase transitions
        // rather than mid-flight bytes (AC-2.4).
        emit(
            StepProgress::phase("resolving")
                .with_message(format!("resolving {} runtime", parsed.family)),
        );
        emit(
            StepProgress::phase("installing")
                .with_message(format!("installing {} runtime", parsed.family)),
        );

        let result = ctx
            .runtime_bootstrapper
            .bootstrap(
                &parsed.family,
                parsed.version.as_deref(),
                &parsed.accelerator_profiles,
                &target_dir,
                ctx.cancellation_token.clone(),
            )
            .await?;

        emit(StepProgress::phase("done").with_message(format!("{} ready", result.resolved_version)));

        Ok(build_artifact(&parsed, result))
    }
}

fn runtime_dir(ctx: &StepContext<'_>, family: &str) -> std::path::PathBuf {
    runtime_dir_for(ctx.extension_data_dir, family)
}

/// Pure form of [`runtime_dir`] — does not require a full `StepContext`. The
/// only thing this layout decision depends on is the extension's data dir and
/// the family name; carving the helper out keeps the isolation invariant
/// testable without standing up trait stubs.
pub(crate) fn runtime_dir_for(
    extension_data_dir: &std::path::Path,
    family: &str,
) -> std::path::PathBuf {
    extension_data_dir.join("runtime").join(family)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Pin: runtime installs land under the per-extension data dir, never
    /// in a shared/global location. Companion to FR-033 + the host-extension
    /// boundary rule. Catches refactors that accidentally reach for
    /// `host_data_dir` or a system path.
    #[test]
    fn runtime_dir_is_extension_scoped() {
        let ext_data = std::path::Path::new("/host/extensions/example");
        let dir = runtime_dir_for(ext_data, "python");
        assert!(
            dir.starts_with(ext_data),
            "runtime dir {} escapes extension_data_dir {}",
            dir.display(),
            ext_data.display()
        );
        // Plus: the family name segment is the deepest component, so two
        // families on the same extension never collide.
        assert!(dir.ends_with("python"));
    }

    /// A different family lands in a different leaf, never overlapping.
    #[test]
    fn runtime_dirs_for_different_families_do_not_alias() {
        let ext_data = std::path::Path::new("/host/extensions/example");
        let py = runtime_dir_for(ext_data, "python");
        let llama = runtime_dir_for(ext_data, "llama.cpp");
        assert_ne!(py, llama);
        // Neither is a parent of the other.
        assert!(!py.starts_with(&llama));
        assert!(!llama.starts_with(&py));
    }

    use std::collections::HashMap;
    use std::path::{Path, PathBuf};
    use std::sync::{Arc, Mutex};

    use crate::context::RuntimeBootstrapResult;

    #[derive(Default)]
    struct CapturingSink {
        events: Mutex<Vec<ProgressEvent>>,
    }
    impl crate::ProgressSink for CapturingSink {
        fn emit(&self, e: ProgressEvent) {
            self.events.lock().expect("lock").push(e);
        }
    }

    struct OkBootstrapper;
    #[async_trait]
    impl crate::RuntimeBootstrapper for OkBootstrapper {
        async fn probe(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            _t: &Path,
        ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
            Ok(None)
        }
        async fn bootstrap(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            target: &Path,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<RuntimeBootstrapResult, DepError> {
            Ok(RuntimeBootstrapResult {
                install_dir: target.to_path_buf(),
                resolved_version: "3.11.13".to_owned(),
                resolved_profile: Some("cpu".to_owned()),
                bytes_placed: 42,
            })
        }
    }

    struct NoopModelStore;
    #[async_trait]
    impl crate::ModelStoreClient for NoopModelStore {
        async fn is_family_installed(
            &self,
            _f: &str,
            _a: Option<&str>,
        ) -> Result<Option<PathBuf>, DepError> {
            Ok(None)
        }
        async fn start_download(&self, _f: &str, _a: Option<&str>) -> Result<String, DepError> {
            unreachable!()
        }
        async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
            unreachable!()
        }
    }

    struct NoopHandshake;
    #[async_trait]
    impl crate::WorkerHandshake for NoopHandshake {
        async fn run_handshake(
            &self,
            _ext: &str,
            _dir: &Path,
            _data: &Path,
            _ups: &HashMap<String, StepArtifact>,
            _t: std::time::Duration,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<(), crate::HandshakeError> {
            unreachable!()
        }
    }

    /// AC-2.4 + AC-2.6: the runtime handler emits an early phase transition and a
    /// terminal `done` around the opaque bootstrapper call.
    #[tokio::test]
    async fn run_emits_phase_transitions_and_terminal_done() {
        let sink = Arc::new(CapturingSink::default());
        let dir = tempfile::tempdir().expect("tmp");
        let upstream = HashMap::new();
        let ctx = StepContext {
            extension_id: "example",
            extension_dir: dir.path(),
            extension_data_dir: dir.path(),
            host_data_dir: dir.path(),
            model_store: Arc::new(NoopModelStore),
            runtime_bootstrapper: Arc::new(OkBootstrapper),
            worker_handshake: Arc::new(NoopHandshake),
            fetch_artifact: Arc::new(|_req: crate::fetch::FetchRequest| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            }),
            progress_sink: sink.clone(),
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            upstream_artifacts: &upstream,
        };
        let spec = serde_json::json!({ "family": "python", "version": ">=3.11" });

        let handler = RuntimeHandler::new();
        let artifact = handler.run(&ctx, &spec).await.expect("run ok");
        assert_eq!(artifact.bytes_placed, 42);

        let phases: Vec<String> = sink
            .events
            .lock()
            .expect("lock")
            .iter()
            .filter_map(|e| match e {
                ProgressEvent::StepProgress { phase, .. } => Some(phase.clone()),
                _ => None,
            })
            .collect();
        assert!(!phases.is_empty(), "expected phase transitions");
        assert_eq!(phases.first().map(String::as_str), Some("resolving"));
        assert_eq!(phases.last().map(String::as_str), Some("done"));
    }
}
