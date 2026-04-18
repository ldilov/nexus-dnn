pub mod marker;
pub mod register;
pub mod scan;

use std::path::Path;

use tracing::{info, warn};

use crate::errors::WorkerResult;
use crate::host_rpc::HostClient;

pub async fn run_if_needed(host: &HostClient, data_root: &Path) -> WorkerResult<()> {
    let marker_path = data_root.join(".migration_v1_rust");
    if marker::is_marked(&marker_path) {
        return Ok(());
    }

    info!(root = %data_root.display(), "migration: starting v0 Python -> v1 Rust scan");

    let binaries = scan::discover_legacy_binaries(data_root).unwrap_or_default();
    let binary_outcomes = register::register_binaries(host, &binaries).await;

    let models = scan::discover_legacy_models(data_root).unwrap_or_default();
    let model_outcomes = register::register_models(host, &models).await;

    let registered_bins: Vec<String> = binary_outcomes
        .iter()
        .filter_map(|r| r.as_ref().ok().cloned())
        .collect();
    let registered_models: Vec<String> = model_outcomes
        .iter()
        .filter_map(|r| r.as_ref().ok().cloned())
        .collect();

    for e in binary_outcomes.iter().filter_map(|r| r.as_ref().err()) {
        warn!(error = %e, "migration: binary register failed");
    }
    for e in model_outcomes.iter().filter_map(|r| r.as_ref().err()) {
        warn!(error = %e, "migration: model register failed");
    }

    marker::write(
        &marker_path,
        &marker::Report {
            migrated_at: chrono::Utc::now().to_rfc3339(),
            legacy_paths_scanned: vec![data_root.display().to_string()],
            binaries_registered: registered_bins,
            models_registered: registered_models,
        },
    )?;

    info!("migration: complete");
    Ok(())
}
