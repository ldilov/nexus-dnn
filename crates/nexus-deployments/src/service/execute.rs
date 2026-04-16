use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::hash::{EffectiveWorkflowHash, hex, sha256_jcs};
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{DeploymentRepository, NewRunLink};
use crate::state::RestoreState;
use chrono::Utc;
use serde_json::{Value, json};
use std::sync::Arc;
use uuid::Uuid;

pub struct DeploymentExecuteService {
    repo: Arc<dyn DeploymentRepository>,
}

#[derive(Debug, Clone)]
pub struct ExecuteResult {
    pub run_id: String,
    pub revision_id: DeploymentRevisionId,
    pub execution_context_hash: String,
}

impl DeploymentExecuteService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn execute(
        &self,
        deployment_id: &DeploymentId,
        revision_id: Option<&DeploymentRevisionId>,
        inputs: &Value,
        run_id: &str,
    ) -> Result<(ExecuteResult, Vec<DeploymentEvent>), DeploymentError> {
        let deployment = self.repo.fetch_deployment(deployment_id).await?;
        match deployment.restore_state.as_str() {
            "restorable_read_only" => {
                return Err(DeploymentError::ExecuteBlocked(
                    RestoreState::RestorableReadOnly,
                ));
            }
            "not_restorable" => {
                return Err(DeploymentError::ExecuteBlocked(RestoreState::NotRestorable));
            }
            _ => {}
        }
        let target_revision_id = revision_id
            .cloned()
            .or(deployment.current_revision_id.clone())
            .ok_or_else(|| DeploymentError::RestoreBlocked("no revision".into()))?;
        let revision = self.repo.fetch_revision(&target_revision_id).await?;

        let context_payload = json!({
            "effective_workflow_hash": revision.effective_workflow_hash,
            "deployment_id": deployment_id.as_str(),
            "revision_id": revision.id.as_str(),
            "inputs": inputs,
        });
        let context_hash_bytes = sha256_jcs(&context_payload)?;
        let context_hash = hex(&context_hash_bytes);

        let now = Utc::now().to_rfc3339();

        self.repo
            .insert_run_link(NewRunLink {
                id: format!("rln_{}", Uuid::now_v7()),
                deployment_id: deployment_id.clone(),
                deployment_revision_id: revision.id.clone(),
                run_id: run_id.to_owned(),
                link_kind: "executed_from".into(),
                created_at: now.clone(),
            })
            .await?;

        self.repo
            .record_run(run_id, deployment_id, &revision.id, &context_hash, None)
            .await?;

        let result = ExecuteResult {
            run_id: run_id.to_owned(),
            revision_id: revision.id.clone(),
            execution_context_hash: context_hash.clone(),
        };
        let event = DeploymentEvent::RunCreated {
            deployment_id: deployment_id.clone(),
            revision_id: revision.id,
            run_id: run_id.to_owned(),
            execution_context_hash: EffectiveWorkflowHash::from_bytes(context_hash_bytes),
        };
        Ok((result, vec![event]))
    }
}
