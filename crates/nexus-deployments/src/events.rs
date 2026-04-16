use crate::hash::EffectiveWorkflowHash;
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::state::RestoreState;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
#[non_exhaustive]
pub enum DeploymentEvent {
    Created {
        deployment_id: DeploymentId,
    },
    Updated {
        deployment_id: DeploymentId,
    },
    RevisionCreated {
        deployment_id: DeploymentId,
        revision_id: DeploymentRevisionId,
    },
    Validated {
        deployment_id: DeploymentId,
        validation_id: String,
    },
    Loaded {
        deployment_id: DeploymentId,
        revision_id: DeploymentRevisionId,
        restore_state: RestoreState,
    },
    RestoreDegraded {
        deployment_id: DeploymentId,
        revision_id: DeploymentRevisionId,
    },
    Archived {
        deployment_id: DeploymentId,
    },
    Deleted {
        deployment_id: DeploymentId,
    },
    RunCreated {
        deployment_id: DeploymentId,
        revision_id: DeploymentRevisionId,
        run_id: String,
        execution_context_hash: EffectiveWorkflowHash,
    },
    CompatibilityChanged {
        deployment_id: DeploymentId,
        revision_id: DeploymentRevisionId,
    },
}
