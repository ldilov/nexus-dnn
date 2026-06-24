use crate::error::StorageError;
use crate::records::{
    ArchiveRecord, ArtifactRecord, ExtensionRecord, LineageEdgeRecord, MigrationRecord,
    NamespaceRecord, NodeExecutionRecord, ObjectRecord, OperationRecord, OperatorRecord,
    RecipeRecord, RunRecord, RunResolvedGraphRecord, UIContributionRecord, WorkflowRecord,
    WorkflowVersionRecord,
};

#[allow(async_fn_in_trait)]
pub trait Database: Send + Sync {
    async fn insert_extension(&self, record: &ExtensionRecord) -> Result<(), StorageError>;
    async fn get_extension(&self, id: &str) -> Result<ExtensionRecord, StorageError>;
    async fn list_extensions(&self) -> Result<Vec<ExtensionRecord>, StorageError>;
    async fn update_extension_status(&self, id: &str, status: &str) -> Result<(), StorageError>;

    async fn insert_operator(&self, record: &OperatorRecord) -> Result<(), StorageError>;
    async fn list_operators(&self) -> Result<Vec<OperatorRecord>, StorageError>;
    async fn list_operators_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<OperatorRecord>, StorageError>;
    async fn get_operator(&self, id: &str, version: &str) -> Result<OperatorRecord, StorageError>;

    async fn insert_workflow(&self, record: &WorkflowRecord) -> Result<(), StorageError>;
    async fn get_workflow(&self, id: &str) -> Result<WorkflowRecord, StorageError>;
    async fn list_workflows(&self) -> Result<Vec<WorkflowRecord>, StorageError>;
    async fn update_workflow(&self, record: &WorkflowRecord) -> Result<(), StorageError>;
    async fn delete_workflow(&self, id: &str) -> Result<(), StorageError>;
    /// Clear the `user_edited_at` stamp so the next boot re-applies the
    /// shipped extension YAML for this workflow.
    async fn clear_workflow_user_edit(&self, id: &str) -> Result<(), StorageError>;
    /// Stamp extension attribution on an existing workflow row without
    /// rewriting its graph. Used by the boot-time one-shot backfill for rows
    /// that pre-date migration 006.
    async fn stamp_workflow_extension(
        &self,
        id: &str,
        extension_id: &str,
        extension_version: &str,
        first_seen_at: &str,
    ) -> Result<(), StorageError>;
    /// Return the opaque JSON blob persisted for this workflow's canvas
    /// (notes, reroutes, pinned positions). `None` means the workflow has
    /// never been edited on the canvas.
    async fn get_canvas_state(&self, workflow_id: &str) -> Result<Option<String>, StorageError>;
    /// Replace the canvas state JSON for the workflow. Creates the row if it
    /// does not yet exist.
    async fn set_canvas_state(
        &self,
        workflow_id: &str,
        payload: &str,
        updated_at: &str,
    ) -> Result<(), StorageError>;

    /// Append-only `workflow_versions` history (immutable rows) + the
    /// `workflows.current_version` head pointer (managed out-of-band so adding
    /// the column does not touch the `WorkflowRecord` shape).
    async fn insert_workflow_version(
        &self,
        record: &WorkflowVersionRecord,
    ) -> Result<(), StorageError>;
    async fn list_workflow_versions(
        &self,
        workflow_id: &str,
    ) -> Result<Vec<WorkflowVersionRecord>, StorageError>;
    async fn get_workflow_version(
        &self,
        workflow_id: &str,
        version: &str,
    ) -> Result<WorkflowVersionRecord, StorageError>;
    async fn latest_workflow_version_for_author(
        &self,
        workflow_id: &str,
        author_kind: &str,
    ) -> Result<Option<WorkflowVersionRecord>, StorageError>;
    async fn count_workflow_versions(&self, workflow_id: &str) -> Result<i64, StorageError>;
    async fn set_current_version(
        &self,
        workflow_id: &str,
        version: &str,
        updated_at: &str,
    ) -> Result<(), StorageError>;
    async fn get_current_version(&self, workflow_id: &str) -> Result<Option<String>, StorageError>;
    /// Atomically allocate the next `vN`, append the immutable version row, and
    /// advance the head — collision-safe under concurrency. Returns the new id.
    async fn append_workflow_version(
        &self,
        record: &WorkflowVersionRecord,
        head_updated_at: &str,
    ) -> Result<String, StorageError>;
    /// Atomically rewrite a workflow head from an immutable version (content +
    /// `current_version` + cleared user edit) in a single UPDATE.
    async fn revert_head_to_version(
        &self,
        record: &WorkflowVersionRecord,
        head_version: &str,
        now: &str,
    ) -> Result<(), StorageError>;

    async fn insert_run(&self, record: &RunRecord) -> Result<(), StorageError>;
    async fn get_run(&self, id: &str) -> Result<RunRecord, StorageError>;
    async fn list_runs(&self) -> Result<Vec<RunRecord>, StorageError>;
    async fn update_run_status(
        &self,
        id: &str,
        status: &str,
        error: Option<&str>,
    ) -> Result<(), StorageError>;

    /// Persist a compiled recipe run's frozen resolved graph + inputs (P3c). The
    /// run engine reads this at execute time so planning is pinned to the
    /// snapshot, decoupled from later edits to the head `workflows` row.
    async fn insert_run_resolved_graph(
        &self,
        record: &RunResolvedGraphRecord,
    ) -> Result<(), StorageError>;
    /// Fetch a run's frozen resolved graph. `NotFound` for legacy runs created
    /// via `create_run` (no frozen snapshot) — callers fall back to the head.
    async fn get_run_resolved_graph(
        &self,
        run_id: &str,
    ) -> Result<RunResolvedGraphRecord, StorageError>;

    async fn insert_node_execution(&self, record: &NodeExecutionRecord)
    -> Result<(), StorageError>;
    async fn get_node_executions_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<NodeExecutionRecord>, StorageError>;
    async fn update_node_execution(
        &self,
        run_id: &str,
        node_id: &str,
        status: &str,
        worker_id: Option<&str>,
        duration_ms: Option<i64>,
        error: Option<&str>,
    ) -> Result<(), StorageError>;

    async fn insert_artifact(&self, record: &ArtifactRecord) -> Result<(), StorageError>;
    async fn get_artifact(&self, id: &str) -> Result<ArtifactRecord, StorageError>;
    async fn list_artifacts_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<ArtifactRecord>, StorageError>;
    async fn list_artifacts_filtered(
        &self,
        run_id: Option<&str>,
        artifact_type: Option<&str>,
        node_id: Option<&str>,
    ) -> Result<Vec<ArtifactRecord>, StorageError>;

    async fn insert_lineage_edge(&self, record: &LineageEdgeRecord) -> Result<(), StorageError>;
    async fn get_lineage_for_artifact(
        &self,
        artifact_id: &str,
    ) -> Result<Vec<LineageEdgeRecord>, StorageError>;

    async fn insert_recipe(&self, record: &RecipeRecord) -> Result<(), StorageError>;
    async fn get_recipe(&self, id: &str) -> Result<RecipeRecord, StorageError>;
    async fn list_recipes(&self) -> Result<Vec<RecipeRecord>, StorageError>;
    async fn list_recipes_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<RecipeRecord>, StorageError>;
    async fn delete_recipes_by_extension(&self, extension_id: &str) -> Result<(), StorageError>;
    /// Update a recipe's pin + cached status in one statement. `None` pins clear
    /// the columns (used by the unresolvable-backfill path).
    async fn update_recipe_pin(
        &self,
        id: &str,
        workflow_id: Option<&str>,
        workflow_version: Option<&str>,
        status: &str,
        status_reason: Option<&str>,
    ) -> Result<(), StorageError>;
    /// Overwrite a USER-authored recipe's projection JSON (host-owned write path
    /// for user presets / the recipe builder). No-op rows -> NotFound. Never
    /// touches extension-authored recipes (scoped to author_kind='user').
    async fn update_recipe_projection(
        &self,
        id: &str,
        projection_json: &str,
    ) -> Result<(), StorageError>;

    async fn insert_ui_contribution(
        &self,
        record: &UIContributionRecord,
    ) -> Result<(), StorageError>;
    async fn list_ui_contributions(&self) -> Result<Vec<UIContributionRecord>, StorageError>;
    async fn list_ui_contributions_by_kind(
        &self,
        kind: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError>;
    async fn list_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError>;
    async fn delete_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<(), StorageError>;

    async fn insert_namespace(&self, record: &NamespaceRecord) -> Result<(), StorageError>;
    async fn get_namespace(&self, id: &str) -> Result<NamespaceRecord, StorageError>;
    async fn get_namespace_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Option<NamespaceRecord>, StorageError>;
    async fn list_namespaces(&self) -> Result<Vec<NamespaceRecord>, StorageError>;
    async fn update_namespace_status(&self, id: &str, status: &str) -> Result<(), StorageError>;
    async fn update_namespace_policy(&self, id: &str, policy: &str) -> Result<(), StorageError>;

    async fn insert_migration_record(&self, record: &MigrationRecord) -> Result<(), StorageError>;
    async fn list_migrations_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<MigrationRecord>, StorageError>;
    async fn get_migration_record(
        &self,
        namespace_id: &str,
        migration_id: &str,
    ) -> Result<Option<MigrationRecord>, StorageError>;

    async fn insert_object_record(&self, record: &ObjectRecord) -> Result<(), StorageError>;
    async fn list_objects_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ObjectRecord>, StorageError>;
    async fn update_object_status(&self, id: &str, status: &str) -> Result<(), StorageError>;

    async fn insert_operation(&self, record: &OperationRecord) -> Result<(), StorageError>;
    async fn update_operation(
        &self,
        id: &str,
        status: &str,
        result_json: Option<&str>,
        completed_at: Option<&str>,
    ) -> Result<(), StorageError>;
    async fn insert_archive(&self, record: &ArchiveRecord) -> Result<(), StorageError>;
    async fn list_archives_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ArchiveRecord>, StorageError>;

    async fn run_migrations(&self) -> Result<(), StorageError>;
}
