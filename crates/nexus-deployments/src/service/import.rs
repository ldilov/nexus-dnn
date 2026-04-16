use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{DeploymentRepository, NewDeployment, NewRevision};
use crate::service::export::ExportEnvelope;
use chrono::Utc;
use std::sync::Arc;

pub struct DeploymentImportService {
    repo: Arc<dyn DeploymentRepository>,
}

#[derive(Debug, Clone)]
pub struct ImportResult {
    pub deployment_id: DeploymentId,
    pub state: String,
    pub diagnostics_count: usize,
}

impl DeploymentImportService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn import(
        &self,
        envelope: ExportEnvelope,
        missing_dependencies: Vec<String>,
    ) -> Result<(ImportResult, Vec<DeploymentEvent>), DeploymentError> {
        if envelope.package_version != 1 {
            return Err(DeploymentError::ImportMissingDependency(format!(
                "unsupported package_version {}",
                envelope.package_version
            )));
        }
        if envelope.revisions.is_empty() {
            return Err(DeploymentError::ImportMissingDependency(
                "envelope contains no revisions".into(),
            ));
        }

        let new_id = DeploymentId::new_v7();
        let new_revision_id = DeploymentRevisionId::new_v7();
        let now = Utc::now().to_rfc3339();

        let state = if missing_dependencies.is_empty() {
            "saved"
        } else {
            "stale"
        };
        let restore_state = if missing_dependencies.is_empty() {
            "fully_restorable"
        } else {
            "restorable_with_degraded_features"
        };

        let display_name = envelope
            .deployment
            .get("display_name")
            .and_then(|v| v.as_str())
            .unwrap_or("imported")
            .to_owned();
        let slug = format!("imported-{}", &new_id.as_str()[..8]);

        self.repo
            .insert_deployment(NewDeployment {
                id: new_id.clone(),
                workspace_id: None,
                slug,
                display_name,
                description: None,
                state: state.into(),
                restore_state: restore_state.into(),
                created_at: now.clone(),
                updated_at: now.clone(),
                created_from_surface: "api".into(),
                notes_markdown: None,
            })
            .await?;

        let effective_workflow_hash = envelope.revisions[0]
            .get("effective_workflow_hash")
            .and_then(|v| v.as_str())
            .unwrap_or("0".repeat(64).as_str())
            .to_owned();
        let mapping_state = envelope.revisions[0]
            .get("mapping_state")
            .and_then(|v| v.as_str())
            .unwrap_or("custom")
            .to_owned();

        self.repo
            .insert_revision(NewRevision {
                id: new_revision_id.clone(),
                deployment_id: new_id.clone(),
                revision_number: 1,
                save_mode: "create".into(),
                created_at: now.clone(),
                created_by_action: "import".into(),
                base_workflow_ref: None,
                base_workflow_version_ref: None,
                base_recipe_ref: None,
                base_recipe_version_ref: None,
                base_extension_ref: None,
                mapping_state,
                workflow_snapshot_id: None,
                workflow_patch_json: None,
                effective_workflow_hash,
                ui_restore_json: None,
                execution_policy_json: None,
                compatibility_summary_json: None,
                change_summary_json: None,
            })
            .await?;
        self.repo
            .advance_current_revision(&new_id, &new_revision_id, None)
            .await?;

        let result = ImportResult {
            deployment_id: new_id.clone(),
            state: state.into(),
            diagnostics_count: missing_dependencies.len(),
        };

        Ok((
            result,
            vec![DeploymentEvent::Created {
                deployment_id: new_id,
            }],
        ))
    }
}
