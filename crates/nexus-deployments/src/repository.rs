use crate::error::DeploymentError;
use crate::id::{DeploymentId, DeploymentRevisionId};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewDeployment {
    pub id: DeploymentId,
    pub workspace_id: Option<String>,
    pub slug: String,
    pub display_name: String,
    pub description: Option<String>,
    pub state: String,
    pub restore_state: String,
    pub created_at: String,
    pub updated_at: String,
    pub created_from_surface: String,
    pub notes_markdown: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewRevision {
    pub id: DeploymentRevisionId,
    pub deployment_id: DeploymentId,
    pub revision_number: i64,
    pub save_mode: String,
    pub created_at: String,
    pub created_by_action: String,
    pub base_workflow_ref: Option<String>,
    pub base_workflow_version_ref: Option<String>,
    pub base_recipe_ref: Option<String>,
    pub base_recipe_version_ref: Option<String>,
    pub base_extension_ref: Option<String>,
    pub mapping_state: String,
    pub workflow_snapshot_id: Option<String>,
    pub workflow_patch_json: Option<String>,
    pub effective_workflow_hash: String,
    pub ui_restore_json: Option<String>,
    pub execution_policy_json: Option<String>,
    pub compatibility_summary_json: Option<String>,
    pub change_summary_json: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewSnapshot {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub snapshot_kind: String,
    pub payload_format: String,
    pub payload_json: String,
    pub payload_hash: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewSourceLink {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub source_kind: String,
    pub source_id: Option<String>,
    pub source_version_id: Option<String>,
    pub source_extension_id: Option<String>,
    pub source_template_ref: Option<String>,
    pub source_availability_state: String,
    pub is_primary_source: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewParameter {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub scope: String,
    pub binding_target: String,
    pub logical_key: String,
    pub data_type: String,
    pub value_json: String,
    pub default_value_json: Option<String>,
    pub is_user_modified: bool,
    pub is_recipe_exposed: bool,
    pub is_runtime_exposed: bool,
    pub validation_state: String,
    pub validation_message: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewRuntimeBinding {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub profile_id: Option<String>,
    pub runtime_adapter_id: Option<String>,
    pub runtime_install_id: Option<String>,
    pub runtime_settings_id: Option<String>,
    pub backend_family: Option<String>,
    pub backend_display_name: Option<String>,
    pub compatibility_state: String,
    pub capability_snapshot_json: Option<String>,
    pub selection_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewModelBinding {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub model_record_id: Option<String>,
    pub model_source_kind: String,
    pub model_locator: Option<String>,
    pub model_format: Option<String>,
    pub model_hash: Option<String>,
    pub model_size_bytes: Option<i64>,
    pub quantization: Option<String>,
    pub capability_class: Option<String>,
    pub compatibility_snapshot_json: Option<String>,
    pub load_parameters_json: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewArtifactBinding {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub usage_kind: String,
    pub binding_target: Option<String>,
    pub artifact_id: Option<String>,
    pub artifact_ref: Option<String>,
    pub is_pinned: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewValidation {
    pub id: String,
    pub deployment_revision_id: DeploymentRevisionId,
    pub validated_at: String,
    pub overall_state: String,
    pub restore_state: String,
    pub diagnostics_json: String,
    pub missing_dependencies_count: i64,
    pub warnings_count: i64,
    pub errors_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewRestoreDiagnostic {
    pub id: String,
    pub deployment_validation_id: String,
    pub severity: String,
    pub category: String,
    pub code: String,
    pub message: String,
    pub subject_ref: Option<String>,
    pub resolution_hint: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewRunLink {
    pub id: String,
    pub deployment_id: DeploymentId,
    pub deployment_revision_id: DeploymentRevisionId,
    pub run_id: String,
    pub link_kind: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ListFilter {
    pub workspace_id: Option<String>,
    pub state: Option<String>,
    pub restore_state: Option<String>,
    pub backend_family: Option<String>,
    pub model_format: Option<String>,
    pub source_recipe_id: Option<String>,
    pub source_workflow_id: Option<String>,
    pub source_extension_id: Option<String>,
    pub archived: Option<bool>,
    pub favorite: Option<bool>,
    pub tag: Option<String>,
    pub limit: Option<i64>,
    /// When `true`, soft-deleted rows (those with a non-NULL `deleted_at`)
    /// are included alongside live rows. Defaults to `false` so callers
    /// that don't know about delete semantics keep seeing only live rows.
    pub include_deleted: Option<bool>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MetadataPatch {
    pub display_name: Option<String>,
    pub description: Option<String>,
    pub notes_markdown: Option<String>,
    pub is_archived: Option<bool>,
    pub is_favorite: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeploymentRow {
    pub id: DeploymentId,
    pub workspace_id: Option<String>,
    pub slug: String,
    pub display_name: String,
    pub description: Option<String>,
    pub state: String,
    pub restore_state: String,
    pub is_archived: bool,
    pub is_favorite: bool,
    pub created_at: String,
    pub updated_at: String,
    pub created_from_surface: String,
    pub current_revision_id: Option<DeploymentRevisionId>,
    pub last_run_id: Option<String>,
    pub last_successful_run_id: Option<String>,
    pub last_failed_run_id: Option<String>,
    pub run_count: i64,
    pub notes_markdown: Option<String>,
    /// Spec 019 T400 — projected from `deployment_source_links` of the
    /// current revision when the primary source is extension-backed.
    /// Lets `DeploymentsView` render a module-provenance badge per row
    /// without a second round-trip.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub source_extension_id: Option<String>,
    /// Spec 019 T400 — projected from `deployment_source_links.source_id`
    /// when the primary source's `source_kind='user'` (user workflow).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub source_workflow_id: Option<String>,
    /// RFC3339 timestamp set when the deployment was soft-deleted; `None`
    /// for live rows. Soft-deleted rows are excluded from list responses
    /// unless the caller opts in via `ListFilter::include_deleted`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub deleted_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RevisionRow {
    pub id: DeploymentRevisionId,
    pub deployment_id: DeploymentId,
    pub revision_number: i64,
    pub mapping_state: String,
    pub effective_workflow_hash: String,
    pub workflow_snapshot_id: Option<String>,
    pub compatibility_summary_json: Option<String>,
}

#[async_trait]
pub trait DeploymentRepository: Send + Sync {
    async fn insert_deployment(&self, row: NewDeployment) -> Result<(), DeploymentError>;
    async fn insert_revision(&self, row: NewRevision) -> Result<(), DeploymentError>;
    async fn insert_snapshot(&self, row: NewSnapshot) -> Result<(), DeploymentError>;
    async fn insert_source_link(&self, row: NewSourceLink) -> Result<(), DeploymentError>;
    async fn insert_parameter_batch(&self, rows: &[NewParameter]) -> Result<(), DeploymentError>;
    async fn insert_runtime_binding(&self, row: NewRuntimeBinding) -> Result<(), DeploymentError>;
    async fn insert_model_binding(&self, row: NewModelBinding) -> Result<(), DeploymentError>;
    async fn insert_artifact_binding_batch(
        &self,
        rows: &[NewArtifactBinding],
    ) -> Result<(), DeploymentError>;
    async fn insert_validation(&self, row: NewValidation) -> Result<(), DeploymentError>;
    async fn insert_restore_diagnostic_batch(
        &self,
        rows: &[NewRestoreDiagnostic],
    ) -> Result<(), DeploymentError>;
    async fn insert_run_link(&self, row: NewRunLink) -> Result<(), DeploymentError>;
    async fn advance_current_revision(
        &self,
        deployment_id: &DeploymentId,
        revision_id: &DeploymentRevisionId,
        last_validation_id: Option<&str>,
    ) -> Result<(), DeploymentError>;
    async fn fetch_deployment(&self, id: &DeploymentId) -> Result<DeploymentRow, DeploymentError>;
    async fn fetch_revision(
        &self,
        id: &DeploymentRevisionId,
    ) -> Result<RevisionRow, DeploymentError>;
    async fn list(&self, filter: &ListFilter) -> Result<Vec<DeploymentRow>, DeploymentError>;
    async fn update_metadata(
        &self,
        id: &DeploymentId,
        patch: &MetadataPatch,
    ) -> Result<(), DeploymentError>;
    async fn count_runs_referencing_revision(
        &self,
        revision_id: &DeploymentRevisionId,
    ) -> Result<usize, DeploymentError>;
    async fn record_run(
        &self,
        run_id: &str,
        deployment_id: &DeploymentId,
        revision_id: &DeploymentRevisionId,
        execution_context_hash: &str,
        succeeded: Option<bool>,
    ) -> Result<(), DeploymentError>;
    async fn insert_tag(
        &self,
        deployment_id: &DeploymentId,
        tag: &str,
    ) -> Result<(), DeploymentError>;
    async fn delete_revision(
        &self,
        revision_id: &DeploymentRevisionId,
    ) -> Result<(), DeploymentError> {
        let n = self.count_runs_referencing_revision(revision_id).await?;
        if n > 0 {
            return Err(DeploymentError::RevisionReferencedByRuns(n));
        }
        Err(DeploymentError::RestoreBlocked(
            "delete_revision: backend not implemented".into(),
        ))
    }

    /// Mark the deployment as soft-deleted by stamping `deleted_at`.
    /// Returns `NotFound` if no live row matches; idempotent calls on an
    /// already-deleted row also return `NotFound` (caller treats both as
    /// "nothing to do" but the handler maps it to 404 to keep semantics
    /// crisp).
    async fn soft_delete(&self, id: &DeploymentId) -> Result<(), DeploymentError>;

    /// Hard-purge a soft-deleted deployment. The row + all host-owned
    /// child rows are removed permanently. Returns
    /// `PurgeRequiresSoftDeleteFirst` when the row exists but is still
    /// live; `NotFound` when the row does not exist.
    async fn purge(&self, id: &DeploymentId) -> Result<(), DeploymentError>;
}
