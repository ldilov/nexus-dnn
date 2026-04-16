use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::id::DeploymentId;
use crate::repository::{DeploymentRepository, NewDeployment, NewRevision, NewSourceLink};
use chrono::Utc;
use std::sync::Arc;
use uuid::Uuid;

pub struct DeploymentCloneService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentCloneService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn clone(
        &self,
        source_id: &DeploymentId,
        new_slug: String,
        new_display_name: String,
    ) -> Result<(DeploymentId, Vec<DeploymentEvent>), DeploymentError> {
        let source = self.repo.fetch_deployment(source_id).await?;
        let source_revision_id = source
            .current_revision_id
            .clone()
            .ok_or_else(|| DeploymentError::RestoreBlocked("no current revision".into()))?;
        let source_revision = self.repo.fetch_revision(&source_revision_id).await?;

        let new_id = DeploymentId::new_v7();
        let new_revision_id = crate::id::DeploymentRevisionId::new_v7();
        let now = Utc::now().to_rfc3339();

        self.repo
            .insert_deployment(NewDeployment {
                id: new_id.clone(),
                workspace_id: source.workspace_id.clone(),
                slug: new_slug,
                display_name: new_display_name,
                description: source.description.clone(),
                state: "saved".into(),
                restore_state: source.restore_state.clone(),
                created_at: now.clone(),
                updated_at: now.clone(),
                created_from_surface: "api".into(),
                notes_markdown: source.notes_markdown.clone(),
            })
            .await?;

        self.repo
            .insert_revision(NewRevision {
                id: new_revision_id.clone(),
                deployment_id: new_id.clone(),
                revision_number: 1,
                save_mode: "create".into(),
                created_at: now.clone(),
                created_by_action: format!("clone_from:{}", source_id),
                base_workflow_ref: None,
                base_workflow_version_ref: None,
                base_recipe_ref: None,
                base_recipe_version_ref: None,
                base_extension_ref: None,
                mapping_state: source_revision.mapping_state.clone(),
                workflow_snapshot_id: None,
                workflow_patch_json: None,
                effective_workflow_hash: source_revision.effective_workflow_hash.clone(),
                ui_restore_json: None,
                execution_policy_json: None,
                compatibility_summary_json: source_revision.compatibility_summary_json.clone(),
                change_summary_json: None,
            })
            .await?;

        self.repo
            .insert_source_link(NewSourceLink {
                id: format!("src_{}", Uuid::now_v7()),
                deployment_revision_id: new_revision_id.clone(),
                source_kind: "cloned_deployment".into(),
                source_id: Some(source_id.to_string()),
                source_version_id: Some(source_revision.id.to_string()),
                source_extension_id: None,
                source_template_ref: None,
                source_availability_state: "available".into(),
                is_primary_source: true,
            })
            .await?;

        self.repo
            .advance_current_revision(&new_id, &new_revision_id, None)
            .await?;

        let events = vec![
            DeploymentEvent::Created {
                deployment_id: new_id.clone(),
            },
            DeploymentEvent::RevisionCreated {
                deployment_id: new_id.clone(),
                revision_id: new_revision_id,
            },
        ];
        Ok((new_id, events))
    }
}
