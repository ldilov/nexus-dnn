use crate::error::DeploymentError;
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{
    DeploymentRepository, DeploymentRow, ListFilter, MetadataPatch, NewArtifactBinding,
    NewDeployment, NewModelBinding, NewParameter, NewRestoreDiagnostic, NewRevision, NewRunLink,
    NewRuntimeBinding, NewSnapshot, NewSourceLink, NewValidation, RevisionRow,
};
use async_trait::async_trait;
use nexus_storage::DeploymentMappers;
use std::str::FromStr;

pub struct SqliteDeploymentRepository {
    inner: DeploymentMappers,
}

impl SqliteDeploymentRepository {
    pub fn new(inner: DeploymentMappers) -> Self {
        Self { inner }
    }
}

#[async_trait]
impl DeploymentRepository for SqliteDeploymentRepository {
    async fn insert_deployment(&self, row: NewDeployment) -> Result<(), DeploymentError> {
        self.inner
            .insert_deployment(
                row.id.as_str(),
                row.workspace_id.as_deref(),
                &row.slug,
                &row.display_name,
                row.description.as_deref(),
                &row.state,
                &row.restore_state,
                &row.created_at,
                &row.updated_at,
                &row.created_from_surface,
                row.notes_markdown.as_deref(),
            )
            .await?;
        Ok(())
    }

    async fn insert_revision(&self, row: NewRevision) -> Result<(), DeploymentError> {
        self.inner
            .insert_revision(
                row.id.as_str(),
                row.deployment_id.as_str(),
                row.revision_number,
                &row.save_mode,
                &row.created_at,
                &row.created_by_action,
                row.base_workflow_ref.as_deref(),
                row.base_workflow_version_ref.as_deref(),
                row.base_recipe_ref.as_deref(),
                row.base_recipe_version_ref.as_deref(),
                row.base_extension_ref.as_deref(),
                &row.mapping_state,
                row.workflow_snapshot_id.as_deref(),
                row.workflow_patch_json.as_deref(),
                &row.effective_workflow_hash,
                row.ui_restore_json.as_deref(),
                row.execution_policy_json.as_deref(),
                row.compatibility_summary_json.as_deref(),
                row.change_summary_json.as_deref(),
            )
            .await?;
        Ok(())
    }

    async fn insert_snapshot(&self, row: NewSnapshot) -> Result<(), DeploymentError> {
        self.inner
            .insert_snapshot(
                &row.id,
                row.deployment_revision_id.as_str(),
                &row.snapshot_kind,
                &row.payload_format,
                &row.payload_json,
                &row.payload_hash,
                &row.created_at,
            )
            .await?;
        Ok(())
    }

    async fn insert_source_link(&self, row: NewSourceLink) -> Result<(), DeploymentError> {
        self.inner
            .insert_source_link(
                &row.id,
                row.deployment_revision_id.as_str(),
                &row.source_kind,
                row.source_id.as_deref(),
                row.source_version_id.as_deref(),
                row.source_extension_id.as_deref(),
                row.source_template_ref.as_deref(),
                &row.source_availability_state,
                row.is_primary_source,
            )
            .await?;
        Ok(())
    }

    async fn insert_parameter_batch(&self, rows: &[NewParameter]) -> Result<(), DeploymentError> {
        for row in rows {
            self.inner
                .insert_parameter(
                    &row.id,
                    row.deployment_revision_id.as_str(),
                    &row.scope,
                    &row.binding_target,
                    &row.logical_key,
                    &row.data_type,
                    &row.value_json,
                    row.default_value_json.as_deref(),
                    row.is_user_modified,
                    row.is_recipe_exposed,
                    row.is_runtime_exposed,
                    &row.validation_state,
                    row.validation_message.as_deref(),
                )
                .await?;
        }
        Ok(())
    }

    async fn insert_runtime_binding(&self, row: NewRuntimeBinding) -> Result<(), DeploymentError> {
        self.inner
            .insert_runtime_binding(
                &row.id,
                row.deployment_revision_id.as_str(),
                row.profile_id.as_deref(),
                row.runtime_adapter_id.as_deref(),
                row.runtime_install_id.as_deref(),
                row.runtime_settings_id.as_deref(),
                row.backend_family.as_deref(),
                row.backend_display_name.as_deref(),
                &row.compatibility_state,
                row.capability_snapshot_json.as_deref(),
                row.selection_reason.as_deref(),
            )
            .await?;
        Ok(())
    }

    async fn insert_model_binding(&self, row: NewModelBinding) -> Result<(), DeploymentError> {
        self.inner
            .insert_model_binding(
                &row.id,
                row.deployment_revision_id.as_str(),
                row.model_record_id.as_deref(),
                &row.model_source_kind,
                row.model_locator.as_deref(),
                row.model_format.as_deref(),
                row.model_hash.as_deref(),
                row.model_size_bytes,
                row.quantization.as_deref(),
                row.capability_class.as_deref(),
                row.compatibility_snapshot_json.as_deref(),
                row.load_parameters_json.as_deref(),
            )
            .await?;
        Ok(())
    }

    async fn insert_artifact_binding_batch(
        &self,
        rows: &[NewArtifactBinding],
    ) -> Result<(), DeploymentError> {
        for row in rows {
            self.inner
                .insert_artifact_binding(
                    &row.id,
                    row.deployment_revision_id.as_str(),
                    &row.usage_kind,
                    row.binding_target.as_deref(),
                    row.artifact_id.as_deref(),
                    row.artifact_ref.as_deref(),
                    row.is_pinned,
                )
                .await?;
        }
        Ok(())
    }

    async fn insert_validation(&self, row: NewValidation) -> Result<(), DeploymentError> {
        self.inner
            .insert_validation(
                &row.id,
                row.deployment_revision_id.as_str(),
                &row.validated_at,
                &row.overall_state,
                &row.restore_state,
                &row.diagnostics_json,
                row.missing_dependencies_count,
                row.warnings_count,
                row.errors_count,
            )
            .await?;
        Ok(())
    }

    async fn insert_restore_diagnostic_batch(
        &self,
        rows: &[NewRestoreDiagnostic],
    ) -> Result<(), DeploymentError> {
        for row in rows {
            self.inner
                .insert_restore_diagnostic(
                    &row.id,
                    &row.deployment_validation_id,
                    &row.severity,
                    &row.category,
                    &row.code,
                    &row.message,
                    row.subject_ref.as_deref(),
                    row.resolution_hint.as_deref(),
                )
                .await?;
        }
        Ok(())
    }

    async fn insert_run_link(&self, row: NewRunLink) -> Result<(), DeploymentError> {
        self.inner
            .insert_run_link(
                &row.id,
                row.deployment_id.as_str(),
                row.deployment_revision_id.as_str(),
                &row.run_id,
                &row.link_kind,
                &row.created_at,
            )
            .await?;
        Ok(())
    }

    async fn advance_current_revision(
        &self,
        deployment_id: &DeploymentId,
        revision_id: &DeploymentRevisionId,
        last_validation_id: Option<&str>,
    ) -> Result<(), DeploymentError> {
        let now = chrono::Utc::now().to_rfc3339();
        self.inner
            .advance_current_revision(
                deployment_id.as_str(),
                revision_id.as_str(),
                last_validation_id,
                &now,
            )
            .await?;
        Ok(())
    }

    async fn fetch_deployment(&self, id: &DeploymentId) -> Result<DeploymentRow, DeploymentError> {
        let raw = self
            .inner
            .fetch_deployment_row(id.as_str())
            .await?
            .ok_or_else(|| DeploymentError::NotFound(id.clone()))?;
        Ok(DeploymentRow {
            id: DeploymentId::from_str(&raw.id).unwrap(),
            workspace_id: raw.workspace_id,
            slug: raw.slug,
            display_name: raw.display_name,
            description: raw.description,
            state: raw.state,
            restore_state: raw.restore_state,
            is_archived: raw.is_archived,
            is_favorite: raw.is_favorite,
            created_at: raw.created_at,
            updated_at: raw.updated_at,
            created_from_surface: raw.created_from_surface,
            current_revision_id: raw
                .current_revision_id
                .map(|s| DeploymentRevisionId::from_str(&s).unwrap()),
            last_run_id: raw.last_run_id,
            last_successful_run_id: raw.last_successful_run_id,
            last_failed_run_id: raw.last_failed_run_id,
            run_count: raw.run_count,
            notes_markdown: raw.notes_markdown,
        })
    }

    async fn fetch_revision(
        &self,
        id: &DeploymentRevisionId,
    ) -> Result<RevisionRow, DeploymentError> {
        let raw = self
            .inner
            .fetch_revision_row(id.as_str())
            .await?
            .ok_or_else(|| DeploymentError::RevisionNotFound(id.clone()))?;
        Ok(RevisionRow {
            id: DeploymentRevisionId::from_str(&raw.id).unwrap(),
            deployment_id: DeploymentId::from_str(&raw.deployment_id).unwrap(),
            revision_number: raw.revision_number,
            mapping_state: raw.mapping_state,
            effective_workflow_hash: raw.effective_workflow_hash,
            workflow_snapshot_id: raw.workflow_snapshot_id,
            compatibility_summary_json: raw.compatibility_summary_json,
        })
    }

    async fn list(&self, filter: &ListFilter) -> Result<Vec<DeploymentRow>, DeploymentError> {
        let raws = self
            .inner
            .list_deployments(
                filter.workspace_id.as_deref(),
                filter.state.as_deref(),
                filter.limit.unwrap_or(100),
            )
            .await?;
        Ok(raws
            .into_iter()
            .map(|raw| DeploymentRow {
                id: DeploymentId::from_str(&raw.id).unwrap(),
                workspace_id: raw.workspace_id,
                slug: raw.slug,
                display_name: raw.display_name,
                description: raw.description,
                state: raw.state,
                restore_state: raw.restore_state,
                is_archived: raw.is_archived,
                is_favorite: raw.is_favorite,
                created_at: raw.created_at,
                updated_at: raw.updated_at,
                created_from_surface: raw.created_from_surface,
                current_revision_id: raw
                    .current_revision_id
                    .map(|s| DeploymentRevisionId::from_str(&s).unwrap()),
                last_run_id: raw.last_run_id,
                last_successful_run_id: raw.last_successful_run_id,
                last_failed_run_id: raw.last_failed_run_id,
                run_count: raw.run_count,
                notes_markdown: raw.notes_markdown,
            })
            .collect())
    }

    async fn update_metadata(
        &self,
        id: &DeploymentId,
        patch: &MetadataPatch,
    ) -> Result<(), DeploymentError> {
        let now = chrono::Utc::now().to_rfc3339();
        self.inner
            .update_metadata(
                id.as_str(),
                patch.display_name.as_deref(),
                patch.description.as_deref(),
                patch.notes_markdown.as_deref(),
                patch.is_archived,
                patch.is_favorite,
                &now,
            )
            .await?;
        Ok(())
    }

    async fn count_runs_referencing_revision(
        &self,
        revision_id: &DeploymentRevisionId,
    ) -> Result<usize, DeploymentError> {
        let n = self
            .inner
            .count_runs_referencing_revision(revision_id.as_str())
            .await?;
        Ok(n as usize)
    }

    async fn record_run(
        &self,
        run_id: &str,
        deployment_id: &DeploymentId,
        revision_id: &DeploymentRevisionId,
        execution_context_hash: &str,
        succeeded: Option<bool>,
    ) -> Result<(), DeploymentError> {
        self.inner
            .record_run_attribution(
                run_id,
                deployment_id.as_str(),
                revision_id.as_str(),
                execution_context_hash,
            )
            .await?;
        if let Some(s) = succeeded {
            self.inner
                .record_run_outcome(run_id, deployment_id.as_str(), s)
                .await?;
        }
        Ok(())
    }

    async fn insert_tag(
        &self,
        deployment_id: &DeploymentId,
        tag: &str,
    ) -> Result<(), DeploymentError> {
        self.inner.insert_tag(deployment_id.as_str(), tag).await?;
        Ok(())
    }
}
