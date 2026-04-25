use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum NexusEvent {
    WorkflowUpdated {
        workflow_id: String,
    },
    RunCreated {
        run_id: String,
        workflow_id: String,
    },
    RunStateChanged {
        run_id: String,
        old_status: String,
        new_status: String,
    },
    NodeScheduled {
        run_id: String,
        node_id: String,
        worker_id: String,
    },
    NodeStarted {
        run_id: String,
        node_id: String,
    },
    NodeProgress {
        run_id: String,
        node_id: String,
        percent: u8,
        message: String,
    },
    NodeCompleted {
        run_id: String,
        node_id: String,
        artifact_ids: Vec<String>,
    },
    NodeFailed {
        run_id: String,
        node_id: String,
        error: String,
    },
    ArtifactProduced {
        artifact_id: String,
        run_id: String,
        node_id: String,
    },
    WorkerStarted {
        worker_id: String,
        extension_id: String,
    },
    WorkerHealthChanged {
        worker_id: String,
        old_status: String,
        new_status: String,
    },
    ExtensionDiscovered {
        extension_id: String,
    },
    ExtensionValidated {
        extension_id: String,
        valid: bool,
    },
    ExtensionActivated {
        extension_id: String,
    },
    ExtensionDisabled {
        extension_id: String,
    },
    ExtensionQuarantined {
        extension_id: String,
    },
    StorageNamespaceReserved {
        extension_id: String,
        namespace_id: String,
        effective_prefix: String,
    },
    StorageValidationStarted {
        extension_id: String,
    },
    StorageValidationFailed {
        extension_id: String,
        errors: Vec<String>,
    },
    StoragePlanReady {
        extension_id: String,
        action: String,
    },
    StorageApplyStarted {
        extension_id: String,
        namespace_id: String,
    },
    StorageMigrationApplied {
        extension_id: String,
        namespace_id: String,
        migration_id: String,
    },
    StorageApplyFailed {
        extension_id: String,
        namespace_id: String,
        error: String,
    },
    StorageIntegrityVerified {
        extension_id: String,
        namespace_id: String,
    },
    StorageIntegrityDriftDetected {
        extension_id: String,
        namespace_id: String,
        objects: Vec<String>,
    },
    StorageUninstallStarted {
        extension_id: String,
        namespace_id: String,
    },
    StorageUninstallCompleted {
        extension_id: String,
        namespace_id: String,
    },
    /// Spec 019 FR-IE03 / FR-TP01 — emitted on a successful ZIP install. Local
    /// bus only; no user prompt text or runtime-setting values carried.
    ModuleInstalled {
        extension_id: String,
        module_id: String,
    },
    /// Spec 035 — install step started.
    ExtensionInstallStepStarted {
        extension_id: String,
        install_run_id: String,
        step_id: String,
        step_type: String,
        started_at: String,
    },
    /// Spec 035 — install step progress (download bytes, package counts, etc.).
    ExtensionInstallStepProgress {
        extension_id: String,
        install_run_id: String,
        step_id: String,
        phase: String,
        current_bytes: u64,
        total_bytes: u64,
        message: String,
    },
    /// Spec 035 — install step completed successfully.
    ExtensionInstallStepCompleted {
        extension_id: String,
        install_run_id: String,
        step_id: String,
        completed_at: String,
        summary: String,
        bytes_placed: u64,
    },
    /// Spec 035 — install step failed (categorised).
    ExtensionInstallStepFailed {
        extension_id: String,
        install_run_id: String,
        step_id: String,
        failed_at: String,
        category: String,
        message: String,
        hint: Option<String>,
    },
    /// Spec 035 — overall install run finished (terminal step succeeded).
    ExtensionInstallCompleted {
        extension_id: String,
        install_run_id: String,
        completed_at: String,
    },
}
