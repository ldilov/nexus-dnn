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
}
