use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{DeploymentRepository, RevisionRow};
use crate::state::RestoreState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoadResult {
    pub session_id: String,
    pub revision: RevisionRow,
    pub restore_state: RestoreState,
    pub diagnostics: Vec<crate::diagnostic::Diagnostic>,
}

pub struct DeploymentLoadService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentLoadService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn load(
        &self,
        deployment_id: &DeploymentId,
        revision_id: Option<&DeploymentRevisionId>,
    ) -> Result<(LoadResult, Vec<DeploymentEvent>), DeploymentError> {
        let deployment = self.repo.fetch_deployment(deployment_id).await?;
        let target_revision_id = revision_id
            .cloned()
            .or(deployment.current_revision_id.clone())
            .ok_or_else(|| DeploymentError::RestoreBlocked("no revision".into()))?;
        let revision = self.repo.fetch_revision(&target_revision_id).await?;
        let restore_state = match deployment.restore_state.as_str() {
            "fully_restorable" => RestoreState::FullyRestorable,
            "restorable_with_rebase" => RestoreState::RestorableWithRebase,
            "restorable_with_degraded_features" => RestoreState::RestorableWithDegradedFeatures,
            "restorable_read_only" => RestoreState::RestorableReadOnly,
            _ => RestoreState::NotRestorable,
        };
        let session_id = format!("sess_{}", uuid::Uuid::now_v7());
        let result = LoadResult {
            session_id,
            revision: revision.clone(),
            restore_state,
            diagnostics: Vec::new(),
        };
        let event = match restore_state {
            RestoreState::FullyRestorable | RestoreState::RestorableWithRebase => {
                DeploymentEvent::Loaded {
                    deployment_id: deployment_id.clone(),
                    revision_id: revision.id.clone(),
                    restore_state,
                }
            }
            _ => DeploymentEvent::RestoreDegraded {
                deployment_id: deployment_id.clone(),
                revision_id: revision.id.clone(),
            },
        };
        Ok((result, vec![event]))
    }
}
