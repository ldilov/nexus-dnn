//! The TUI's render-time view of a single event.
//!
//! `EventLine` is what the ring buffer stores; it carries the original
//! payload via `Arc<RawPayload>` so inspector workflows can reach the
//! unmodified source without copying.

use std::sync::Arc;

use nexus_events::types::NexusEvent;
use nexus_run_events::RunEventItem;

use crate::stream::event_id::EventId;
use crate::stream::severity::Severity;
use crate::stream::significance::Significance;
use crate::stream::source_category::{
    SourceCategory, classify_nexus_event, classify_nexus_event_significance, host_log_severity,
};

#[derive(Debug, Clone, Default)]
pub struct CorrelationKeys {
    pub run_id: Option<String>,
    pub deployment_id: Option<String>,
    pub extension_id: Option<String>,
    pub install_run_id: Option<String>,
}

#[derive(Debug)]
#[non_exhaustive]
pub enum RawPayload {
    NexusEvent(NexusEvent),
    RunEventItem(RunEventItem),
}

#[derive(Debug, Clone)]
pub struct EventLine {
    pub id: EventId,
    pub timestamp_ms: i64,
    pub severity: Severity,
    pub significance: Significance,
    pub category: SourceCategory,
    pub source: String,
    pub summary: String,
    pub correlation: CorrelationKeys,
    pub raw_payload: Arc<RawPayload>,
}

impl EventLine {
    pub fn from_nexus_event(event: NexusEvent) -> Self {
        let category = classify_nexus_event(&event);
        let significance = classify_nexus_event_significance(&event);
        let severity = derive_severity(&event);
        let source = derive_source(&event);
        let summary = derive_summary(&event);
        let correlation = derive_correlation(&event);
        let timestamp_ms = match &event {
            NexusEvent::HostLog { timestamp_ms, .. } => *timestamp_ms,
            _ => current_timestamp_ms(),
        };

        Self {
            id: EventId::new(),
            timestamp_ms,
            severity,
            significance,
            category,
            source,
            summary,
            correlation,
            raw_payload: Arc::new(RawPayload::NexusEvent(event)),
        }
    }
}

fn current_timestamp_ms() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0)
}

fn derive_severity(event: &NexusEvent) -> Severity {
    use NexusEvent::*;
    match event {
        NodeFailed { .. }
        | StorageValidationFailed { .. }
        | StorageApplyFailed { .. }
        | ExtensionInstallStepFailed { .. } => Severity::Error,

        StorageIntegrityDriftDetected { .. } => Severity::Fatal,

        WorkerHealthChanged { new_status, .. } if status_is_unhealthy(new_status) => Severity::Warn,

        ExtensionQuarantined { .. } => Severity::Warn,

        HostLog { level, .. } => host_log_severity(level),

        _ => Severity::Info,
    }
}

fn status_is_unhealthy(status: &str) -> bool {
    let normalized = status.trim().to_ascii_lowercase();
    matches!(
        normalized.as_str(),
        "unhealthy" | "stalled" | "failed" | "down" | "degraded"
    )
}

fn derive_source(event: &NexusEvent) -> String {
    use NexusEvent::*;
    match event {
        WorkflowUpdated { workflow_id } => format!("workflow:{workflow_id}"),
        RunCreated { run_id, .. }
        | RunStateChanged { run_id, .. }
        | NodeScheduled { run_id, .. }
        | NodeStarted { run_id, .. }
        | NodeProgress { run_id, .. }
        | NodeCompleted { run_id, .. }
        | NodeFailed { run_id, .. }
        | ArtifactProduced { run_id, .. } => format!("run:{run_id}"),

        WorkerStarted { worker_id, .. } | WorkerHealthChanged { worker_id, .. } => {
            format!("worker:{worker_id}")
        }

        ExtensionDiscovered { extension_id }
        | ExtensionValidated { extension_id, .. }
        | ExtensionActivated { extension_id }
        | ExtensionDisabled { extension_id }
        | ExtensionQuarantined { extension_id }
        | ModuleInstalled { extension_id, .. } => format!("extension:{extension_id}"),

        ExtensionInstallStepStarted { extension_id, .. }
        | ExtensionInstallStepProgress { extension_id, .. }
        | ExtensionInstallStepCompleted { extension_id, .. }
        | ExtensionInstallStepFailed { extension_id, .. }
        | ExtensionInstallCompleted { extension_id, .. } => format!("extension:{extension_id}"),

        StorageNamespaceReserved { extension_id, .. }
        | StorageValidationStarted { extension_id }
        | StorageValidationFailed { extension_id, .. }
        | StoragePlanReady { extension_id, .. }
        | StorageApplyStarted { extension_id, .. }
        | StorageMigrationApplied { extension_id, .. }
        | StorageApplyFailed { extension_id, .. }
        | StorageIntegrityVerified { extension_id, .. }
        | StorageIntegrityDriftDetected { extension_id, .. }
        | StorageUninstallStarted { extension_id, .. }
        | StorageUninstallCompleted { extension_id, .. } => format!("storage:{extension_id}"),

        DeploymentDeleted { deployment_id, .. } | DeploymentPurged { deployment_id, .. } => {
            format!("deploy:{deployment_id}")
        }

        HostLog { target, .. } => format!("host.{target}"),
    }
}

fn derive_summary(event: &NexusEvent) -> String {
    use NexusEvent::*;
    match event {
        WorkflowUpdated { .. } => "workflow updated".to_string(),
        RunCreated { .. } => "run created".to_string(),
        RunStateChanged {
            old_status,
            new_status,
            ..
        } => format!("run state {old_status} → {new_status}"),
        NodeScheduled { node_id, .. } => format!("node scheduled {node_id}"),
        NodeStarted { node_id, .. } => format!("node started {node_id}"),
        NodeProgress {
            node_id, percent, ..
        } => format!("node progress {node_id} {percent}%"),
        NodeCompleted { node_id, .. } => format!("node completed {node_id}"),
        NodeFailed { node_id, error, .. } => format!("node failed {node_id}: {error}"),
        ArtifactProduced { artifact_id, .. } => format!("artifact produced {artifact_id}"),
        WorkerStarted { worker_id, .. } => format!("worker started {worker_id}"),
        WorkerHealthChanged {
            old_status,
            new_status,
            ..
        } => format!("worker health {old_status} → {new_status}"),
        ExtensionDiscovered { .. } => "extension discovered".to_string(),
        ExtensionValidated { valid, .. } => {
            if *valid {
                "extension validated".to_string()
            } else {
                "extension validation failed".to_string()
            }
        }
        ExtensionActivated { .. } => "extension activated".to_string(),
        ExtensionDisabled { .. } => "extension disabled".to_string(),
        ExtensionQuarantined { .. } => "extension quarantined".to_string(),
        ModuleInstalled { module_id, .. } => format!("module installed {module_id}"),
        ExtensionInstallStepStarted { step_id, .. } => format!("install step started {step_id}"),
        ExtensionInstallStepProgress {
            step_id,
            current_bytes,
            total_bytes,
            ..
        } => format!("install step {step_id} {current_bytes}/{total_bytes}B"),
        ExtensionInstallStepCompleted { step_id, .. } => {
            format!("install step completed {step_id}")
        }
        ExtensionInstallStepFailed {
            step_id,
            category,
            message,
            ..
        } => format!("install step failed {step_id} [{category}]: {message}"),
        ExtensionInstallCompleted { outcome, .. } => format!("install completed: {outcome}"),
        StorageNamespaceReserved { namespace_id, .. } => {
            format!("storage namespace reserved {namespace_id}")
        }
        StorageValidationStarted { .. } => "storage validation started".to_string(),
        StorageValidationFailed { errors, .. } => {
            format!("storage validation failed: {} error(s)", errors.len())
        }
        StoragePlanReady { action, .. } => format!("storage plan ready: {action}"),
        StorageApplyStarted { namespace_id, .. } => format!("storage apply started {namespace_id}"),
        StorageMigrationApplied { migration_id, .. } => {
            format!("storage migration applied {migration_id}")
        }
        StorageApplyFailed { error, .. } => format!("storage apply failed: {error}"),
        StorageIntegrityVerified { namespace_id, .. } => {
            format!("storage integrity verified {namespace_id}")
        }
        StorageIntegrityDriftDetected {
            namespace_id,
            objects,
            ..
        } => format!(
            "storage integrity drift in {namespace_id}: {} object(s)",
            objects.len()
        ),
        StorageUninstallStarted { namespace_id, .. } => {
            format!("storage uninstall started {namespace_id}")
        }
        StorageUninstallCompleted { namespace_id, .. } => {
            format!("storage uninstall completed {namespace_id}")
        }
        DeploymentDeleted { deployment_id, .. } => format!("deployment deleted {deployment_id}"),
        DeploymentPurged { deployment_id, .. } => format!("deployment purged {deployment_id}"),
        HostLog { message, .. } => message.clone(),
    }
}

fn derive_correlation(event: &NexusEvent) -> CorrelationKeys {
    use NexusEvent::*;
    let mut keys = CorrelationKeys::default();
    match event {
        RunCreated { run_id, .. }
        | RunStateChanged { run_id, .. }
        | NodeScheduled { run_id, .. }
        | NodeStarted { run_id, .. }
        | NodeProgress { run_id, .. }
        | NodeCompleted { run_id, .. }
        | NodeFailed { run_id, .. } => {
            keys.run_id = Some(run_id.clone());
        }
        ArtifactProduced { run_id, .. } => {
            keys.run_id = Some(run_id.clone());
        }
        ExtensionDiscovered { extension_id }
        | ExtensionValidated { extension_id, .. }
        | ExtensionActivated { extension_id }
        | ExtensionDisabled { extension_id }
        | ExtensionQuarantined { extension_id }
        | ModuleInstalled { extension_id, .. } => {
            keys.extension_id = Some(extension_id.clone());
        }
        ExtensionInstallStepStarted {
            extension_id,
            install_run_id,
            ..
        }
        | ExtensionInstallStepProgress {
            extension_id,
            install_run_id,
            ..
        }
        | ExtensionInstallStepCompleted {
            extension_id,
            install_run_id,
            ..
        }
        | ExtensionInstallStepFailed {
            extension_id,
            install_run_id,
            ..
        }
        | ExtensionInstallCompleted {
            extension_id,
            install_run_id,
            ..
        } => {
            keys.extension_id = Some(extension_id.clone());
            keys.install_run_id = Some(install_run_id.clone());
        }
        StorageNamespaceReserved { extension_id, .. }
        | StorageValidationStarted { extension_id }
        | StorageValidationFailed { extension_id, .. }
        | StoragePlanReady { extension_id, .. }
        | StorageApplyStarted { extension_id, .. }
        | StorageMigrationApplied { extension_id, .. }
        | StorageApplyFailed { extension_id, .. }
        | StorageIntegrityVerified { extension_id, .. }
        | StorageIntegrityDriftDetected { extension_id, .. }
        | StorageUninstallStarted { extension_id, .. }
        | StorageUninstallCompleted { extension_id, .. } => {
            keys.extension_id = Some(extension_id.clone());
        }
        DeploymentDeleted { deployment_id, .. } | DeploymentPurged { deployment_id, .. } => {
            keys.deployment_id = Some(deployment_id.clone());
        }
        _ => {}
    }
    keys
}
