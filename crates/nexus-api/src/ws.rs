use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Query, State};
use axum::response::IntoResponse;
use futures_util::{SinkExt, StreamExt};

use crate::AppState;

#[derive(serde::Deserialize, Default)]
pub struct EventFilter {
    pub run_id: Option<String>,
    pub event_type: Option<String>,
}

pub async fn events_ws(
    State(state): State<AppState>,
    Query(filter): Query<EventFilter>,
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, state, filter))
}

async fn handle_socket(socket: WebSocket, state: AppState, filter: EventFilter) {
    let (mut sender, _receiver) = socket.split();
    let mut subscription = state.event_bus.subscribe();

    loop {
        match subscription.recv().await {
            Ok(event) => {
                if !matches_filter(&event, &filter) {
                    continue;
                }

                let json = match serde_json::to_string(&event) {
                    Ok(j) => j,
                    Err(_) => continue,
                };

                let msg: Message = Message::Text(json.into());
                if sender.send(msg).await.is_err() {
                    break;
                }
            }
            Err(tokio::sync::broadcast::error::RecvError::Lagged(n)) => {
                tracing::warn!(missed = n, "websocket subscriber lagged");
            }
            Err(tokio::sync::broadcast::error::RecvError::Closed) => {
                break;
            }
        }
    }
}

fn matches_filter(event: &nexus_events::types::NexusEvent, filter: &EventFilter) -> bool {
    if let Some(ref run_id_filter) = filter.run_id {
        let event_run_id = extract_run_id(event);
        if let Some(eid) = event_run_id {
            if eid != run_id_filter {
                return false;
            }
        } else {
            return false;
        }
    }

    if let Some(ref type_filter) = filter.event_type {
        let event_type = extract_event_type(event);
        if event_type != type_filter.as_str() {
            return false;
        }
    }

    true
}

fn extract_run_id(event: &nexus_events::types::NexusEvent) -> Option<&str> {
    use nexus_events::types::NexusEvent::*;
    match event {
        RunCreated { run_id, .. }
        | RunStateChanged { run_id, .. }
        | NodeScheduled { run_id, .. }
        | NodeStarted { run_id, .. }
        | NodeProgress { run_id, .. }
        | NodeCompleted { run_id, .. }
        | NodeFailed { run_id, .. }
        | ArtifactProduced { run_id, .. } => Some(run_id),
        WorkflowUpdated { .. }
        | WorkerStarted { .. }
        | WorkerHealthChanged { .. }
        | ExtensionDiscovered { .. }
        | ExtensionValidated { .. }
        | ExtensionActivated { .. }
        | ExtensionDisabled { .. }
        | ExtensionQuarantined { .. }
        | StorageNamespaceReserved { .. }
        | StorageValidationStarted { .. }
        | StorageValidationFailed { .. }
        | StoragePlanReady { .. }
        | StorageApplyStarted { .. }
        | StorageMigrationApplied { .. }
        | StorageApplyFailed { .. }
        | StorageIntegrityVerified { .. }
        | StorageIntegrityDriftDetected { .. }
        | StorageUninstallStarted { .. }
        | StorageUninstallCompleted { .. }
        | ModuleInstalled { .. }
        | ExtensionInstallStepStarted { .. }
        | ExtensionInstallStepProgress { .. }
        | ExtensionInstallStepCompleted { .. }
        | ExtensionInstallStepFailed { .. }
        | ExtensionInstallCompleted { .. }
        | DeploymentDeleted { .. }
        | DeploymentPurged { .. } => None,
    }
}

fn extract_event_type(event: &nexus_events::types::NexusEvent) -> &'static str {
    use nexus_events::types::NexusEvent::*;
    match event {
        WorkflowUpdated { .. } => "workflow_updated",
        RunCreated { .. } => "run_created",
        RunStateChanged { .. } => "run_state_changed",
        NodeScheduled { .. } => "node_scheduled",
        NodeStarted { .. } => "node_started",
        NodeProgress { .. } => "node_progress",
        NodeCompleted { .. } => "node_completed",
        NodeFailed { .. } => "node_failed",
        ArtifactProduced { .. } => "artifact_produced",
        WorkerStarted { .. } => "worker_started",
        WorkerHealthChanged { .. } => "worker_health_changed",
        ExtensionDiscovered { .. } => "extension_discovered",
        ExtensionValidated { .. } => "extension_validated",
        ExtensionActivated { .. } => "extension_activated",
        ExtensionDisabled { .. } => "extension_disabled",
        ExtensionQuarantined { .. } => "extension_quarantined",
        StorageNamespaceReserved { .. } => "storage_namespace_reserved",
        StorageValidationStarted { .. } => "storage_validation_started",
        StorageValidationFailed { .. } => "storage_validation_failed",
        StoragePlanReady { .. } => "storage_plan_ready",
        StorageApplyStarted { .. } => "storage_apply_started",
        StorageMigrationApplied { .. } => "storage_migration_applied",
        StorageApplyFailed { .. } => "storage_apply_failed",
        StorageIntegrityVerified { .. } => "storage_integrity_verified",
        StorageIntegrityDriftDetected { .. } => "storage_integrity_drift_detected",
        StorageUninstallStarted { .. } => "storage_uninstall_started",
        StorageUninstallCompleted { .. } => "storage_uninstall_completed",
        ModuleInstalled { .. } => "module_installed",
        ExtensionInstallStepStarted { .. } => "extension_install_step_started",
        ExtensionInstallStepProgress { .. } => "extension_install_step_progress",
        ExtensionInstallStepCompleted { .. } => "extension_install_step_completed",
        ExtensionInstallStepFailed { .. } => "extension_install_step_failed",
        ExtensionInstallCompleted { .. } => "extension_install_completed",
        DeploymentDeleted { .. } => "deployment_deleted",
        DeploymentPurged { .. } => "deployment_purged",
    }
}
