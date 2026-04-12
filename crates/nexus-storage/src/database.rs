use crate::error::StorageError;
use crate::records::{
    ArchiveRecord, ArtifactRecord, ExtensionRecord, LineageEdgeRecord, MigrationRecord,
    NamespaceRecord, NodeExecutionRecord, ObjectRecord, OperationRecord, OperatorRecord,
    RecipeRecord, RunRecord, UIContributionRecord, WorkflowRecord,
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

    async fn insert_run(&self, record: &RunRecord) -> Result<(), StorageError>;
    async fn get_run(&self, id: &str) -> Result<RunRecord, StorageError>;
    async fn list_runs(&self) -> Result<Vec<RunRecord>, StorageError>;
    async fn update_run_status(
        &self,
        id: &str,
        status: &str,
        error: Option<&str>,
    ) -> Result<(), StorageError>;

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
    async fn delete_recipes_by_extension(
        &self,
        extension_id: &str,
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
