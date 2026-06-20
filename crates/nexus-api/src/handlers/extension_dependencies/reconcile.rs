//! Startup dependency reconcile.
//!
//! A worker venv is synced once, at install time, from the extension's
//! `pyproject.toml` + lock. When a later release adds a dependency (e.g. a new
//! package in an optional extra) the already-installed venv is never refreshed,
//! so the worker hits `ModuleNotFoundError` at runtime even though the bundled
//! manifest is correct. The `package_set` step's `probe()` already detects this
//! drift (its `.synced.json` marker records the manifest sha256), but nothing
//! re-runs the plan for an installed extension after a redeploy.
//!
//! This pass closes that gap: at host startup, before any worker lease is
//! acquired, re-probe each installed extension's `package_set` step(s) and
//! re-sync the ones whose manifest drifted. Only `package_set` steps are
//! touched — model artifacts and worker handshakes are left alone so boot never
//! triggers a surprise download or spawns a worker. Best-effort: a failure for
//! one extension is logged and the loop continues.

use std::collections::HashMap;
use std::sync::Arc;

use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{InstallRunner, RunnerContext, StepArtifact, StepStatus};
use uuid::Uuid;

use crate::AppState;

use super::common::{EventBusProgressSink, install_plan_for, runner_context_inputs};

const PACKAGE_SET_STEP_TYPE: &str = "package_set";

/// Reconcile every installed extension's `package_set` venv against its current
/// bundled manifest. Intended to run once in the background at host startup.
pub async fn reconcile_extension_deps(state: AppState) {
    let inputs = match runner_context_inputs(&state) {
        Ok(i) => i,
        Err(e) => {
            tracing::debug!(
                target: "extension_install::reconcile",
                error = %e,
                "dep services not wired — skipping startup reconcile"
            );
            return;
        }
    };

    let extensions = state.extension_registry.list_extensions();
    tracing::info!(
        target: "extension_install::reconcile",
        count = extensions.len(),
        "startup dependency reconcile: checking installed extensions for venv drift"
    );

    let empty_upstream: HashMap<String, StepArtifact> = HashMap::new();
    let mut healed: usize = 0;

    for ext in extensions {
        let extension_id = ext.manifest.extension.id.clone();

        // Never race a user-triggered install on the same venv.
        if let Some(active) = state.dep_install_state.get(&extension_id) {
            if active.lock().await.install_run_id.is_some() {
                continue;
            }
        }

        let plan = match install_plan_for(&state, &extension_id) {
            Ok(Some(p)) => p,
            Ok(None) => continue,
            Err(e) => {
                tracing::warn!(
                    target: "extension_install::reconcile",
                    %extension_id,
                    error = %e,
                    "reconcile: could not build install plan — skipping"
                );
                continue;
            }
        };

        let package_step_ids: Vec<String> = plan
            .steps
            .iter()
            .filter(|s| s.step_type == PACKAGE_SET_STEP_TYPE)
            .map(|s| s.id.clone())
            .collect();
        if package_step_ids.is_empty() {
            continue;
        }

        let extension_dir = ext.directory.clone();
        let extension_data_dir = inputs.host_data_dir.join("extensions").join(&extension_id);
        let progress_sink: Arc<dyn nexus_extension_deps::ProgressSink> =
            Arc::new(EventBusProgressSink::new(state.event_bus.clone()));

        let runner = InstallRunner::new(plan, inputs.registry.clone());
        let mut ctx = RunnerContext {
            extension_id: extension_id.as_str(),
            extension_dir: extension_dir.as_path(),
            extension_data_dir: extension_data_dir.as_path(),
            host_data_dir: inputs.host_data_dir.as_path(),
            model_store: inputs.model_store.clone(),
            runtime_bootstrapper: inputs.runtime_bootstrapper.clone(),
            worker_handshake: inputs.worker_handshake.clone(),
            fetch_artifact: inputs.fetch_artifact.clone(),
            progress_sink,
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: Uuid::new_v4(),
            force: false,
        };

        for step_id in package_step_ids {
            match runner
                .run_single_step(&step_id, &mut ctx, &empty_upstream)
                .await
            {
                StepStatus::Ok { .. } => {
                    healed += 1;
                    tracing::info!(
                        target: "extension_install::reconcile",
                        %extension_id,
                        step_id,
                        "reconcile: manifest drifted — re-synced worker venv"
                    );
                }
                StepStatus::Failed { error, .. } => {
                    tracing::warn!(
                        target: "extension_install::reconcile",
                        %extension_id,
                        step_id,
                        category = %error.category,
                        message = %error.message,
                        "reconcile: venv re-sync failed — leaving install as-is"
                    );
                }
                _ => {}
            }
        }
    }

    tracing::info!(
        target: "extension_install::reconcile",
        healed,
        "startup dependency reconcile complete"
    );
}
