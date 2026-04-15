//! SqliteDatabase + thin trait delegation per spec 014.
//!
//! Per-domain SQL implementations live in submodules:
//! `migrations`, `extensions`, `operators`, `workflows`, `runs`,
//! `artifacts`, `content`, `namespaces`. The trait impl below
//! delegates each method to the matching submodule.

mod artifacts;
mod content;
mod extensions;
mod migrations;
mod namespaces;
mod operators;
mod runs;
mod workflows;

use sqlx::sqlite::SqlitePool;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::{
    ArchiveRecord, ArtifactRecord, ExtensionRecord, LineageEdgeRecord, MigrationRecord,
    NamespaceRecord, NodeExecutionRecord, ObjectRecord, OperationRecord, OperatorRecord,
    RecipeRecord, RunRecord, UIContributionRecord, WorkflowRecord,
};
pub struct SqliteDatabase {
    pool: SqlitePool,
}

impl SqliteDatabase {
    pub async fn new(database_url: &str) -> Result<Self, StorageError> {
        let pool = SqlitePool::connect(database_url).await?;
        let db = Self { pool };
        migrations::run_migrations(&db.pool).await?;
        Ok(db)
    }

    pub fn pool(&self) -> &SqlitePool {
        &self.pool
    }
}

impl Database for SqliteDatabase {
    async fn run_migrations(&self) -> Result<(), StorageError> {
        migrations::run_migrations(&self.pool).await
    }

    async fn insert_extension(&self, r: &ExtensionRecord) -> Result<(), StorageError> {
        extensions::insert_extension(&self.pool, r).await
    }

    async fn get_extension(&self, id: &str) -> Result<ExtensionRecord, StorageError> {
        extensions::get_extension(&self.pool, id).await
    }

    async fn list_extensions(&self) -> Result<Vec<ExtensionRecord>, StorageError> {
        extensions::list_extensions(&self.pool).await
    }

    async fn update_extension_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        extensions::update_extension_status(&self.pool, id, status).await
    }

    async fn insert_operator(&self, r: &OperatorRecord) -> Result<(), StorageError> {
        operators::insert_operator(&self.pool, r).await
    }

    async fn list_operators(&self) -> Result<Vec<OperatorRecord>, StorageError> {
        operators::list_operators(&self.pool).await
    }

    async fn list_operators_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<OperatorRecord>, StorageError> {
        operators::list_operators_by_extension(&self.pool, extension_id).await
    }

    async fn get_operator(&self, id: &str, version: &str) -> Result<OperatorRecord, StorageError> {
        operators::get_operator(&self.pool, id, version).await
    }

    async fn insert_workflow(&self, r: &WorkflowRecord) -> Result<(), StorageError> {
        workflows::insert_workflow(&self.pool, r).await
    }

    async fn get_workflow(&self, id: &str) -> Result<WorkflowRecord, StorageError> {
        workflows::get_workflow(&self.pool, id).await
    }

    async fn list_workflows(&self) -> Result<Vec<WorkflowRecord>, StorageError> {
        workflows::list_workflows(&self.pool).await
    }

    async fn update_workflow(&self, r: &WorkflowRecord) -> Result<(), StorageError> {
        workflows::update_workflow(&self.pool, r).await
    }

    async fn delete_workflow(&self, id: &str) -> Result<(), StorageError> {
        workflows::delete_workflow(&self.pool, id).await
    }

    async fn clear_workflow_user_edit(&self, id: &str) -> Result<(), StorageError> {
        workflows::clear_workflow_user_edit(&self.pool, id).await
    }

    async fn stamp_workflow_extension(
        &self,
        id: &str,
        extension_id: &str,
        extension_version: &str,
        first_seen_at: &str,
    ) -> Result<(), StorageError> {
        workflows::stamp_workflow_extension(
            &self.pool,
            id,
            extension_id,
            extension_version,
            first_seen_at,
        )
        .await
    }

    async fn get_canvas_state(&self, workflow_id: &str) -> Result<Option<String>, StorageError> {
        workflows::get_canvas_state(&self.pool, workflow_id).await
    }

    async fn set_canvas_state(
        &self,
        workflow_id: &str,
        payload: &str,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        workflows::set_canvas_state(&self.pool, workflow_id, payload, updated_at).await
    }

    async fn insert_run(&self, r: &RunRecord) -> Result<(), StorageError> {
        runs::insert_run(&self.pool, r).await
    }

    async fn get_run(&self, id: &str) -> Result<RunRecord, StorageError> {
        runs::get_run(&self.pool, id).await
    }

    async fn list_runs(&self) -> Result<Vec<RunRecord>, StorageError> {
        runs::list_runs(&self.pool).await
    }

    async fn update_run_status(
        &self,
        id: &str,
        status: &str,
        error: Option<&str>,
    ) -> Result<(), StorageError> {
        runs::update_run_status(&self.pool, id, status, error).await
    }

    async fn insert_node_execution(&self, r: &NodeExecutionRecord) -> Result<(), StorageError> {
        runs::insert_node_execution(&self.pool, r).await
    }

    async fn get_node_executions_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<NodeExecutionRecord>, StorageError> {
        runs::get_node_executions_for_run(&self.pool, run_id).await
    }

    async fn update_node_execution(
        &self,
        run_id: &str,
        node_id: &str,
        status: &str,
        worker_id: Option<&str>,
        duration_ms: Option<i64>,
        error: Option<&str>,
    ) -> Result<(), StorageError> {
        runs::update_node_execution(
            &self.pool,
            run_id,
            node_id,
            status,
            worker_id,
            duration_ms,
            error,
        )
        .await
    }

    async fn insert_artifact(&self, r: &ArtifactRecord) -> Result<(), StorageError> {
        artifacts::insert_artifact(&self.pool, r).await
    }

    async fn get_artifact(&self, id: &str) -> Result<ArtifactRecord, StorageError> {
        artifacts::get_artifact(&self.pool, id).await
    }

    async fn list_artifacts_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<ArtifactRecord>, StorageError> {
        artifacts::list_artifacts_for_run(&self.pool, run_id).await
    }

    async fn list_artifacts_filtered(
        &self,
        run_id: Option<&str>,
        artifact_type: Option<&str>,
        node_id: Option<&str>,
    ) -> Result<Vec<ArtifactRecord>, StorageError> {
        artifacts::list_artifacts_filtered(&self.pool, run_id, artifact_type, node_id).await
    }

    async fn insert_lineage_edge(&self, r: &LineageEdgeRecord) -> Result<(), StorageError> {
        artifacts::insert_lineage_edge(&self.pool, r).await
    }

    async fn get_lineage_for_artifact(
        &self,
        artifact_id: &str,
    ) -> Result<Vec<LineageEdgeRecord>, StorageError> {
        artifacts::get_lineage_for_artifact(&self.pool, artifact_id).await
    }

    async fn insert_recipe(&self, r: &RecipeRecord) -> Result<(), StorageError> {
        content::insert_recipe(&self.pool, r).await
    }

    async fn get_recipe(&self, id: &str) -> Result<RecipeRecord, StorageError> {
        content::get_recipe(&self.pool, id).await
    }

    async fn list_recipes(&self) -> Result<Vec<RecipeRecord>, StorageError> {
        content::list_recipes(&self.pool).await
    }

    async fn list_recipes_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<RecipeRecord>, StorageError> {
        content::list_recipes_by_extension(&self.pool, extension_id).await
    }

    async fn delete_recipes_by_extension(&self, extension_id: &str) -> Result<(), StorageError> {
        content::delete_recipes_by_extension(&self.pool, extension_id).await
    }

    async fn insert_ui_contribution(&self, r: &UIContributionRecord) -> Result<(), StorageError> {
        content::insert_ui_contribution(&self.pool, r).await
    }

    async fn list_ui_contributions(&self) -> Result<Vec<UIContributionRecord>, StorageError> {
        content::list_ui_contributions(&self.pool).await
    }

    async fn list_ui_contributions_by_kind(
        &self,
        kind: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError> {
        content::list_ui_contributions_by_kind(&self.pool, kind).await
    }

    async fn list_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError> {
        content::list_ui_contributions_by_extension(&self.pool, extension_id).await
    }

    async fn delete_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<(), StorageError> {
        content::delete_ui_contributions_by_extension(&self.pool, extension_id).await
    }

    async fn insert_namespace(&self, r: &NamespaceRecord) -> Result<(), StorageError> {
        namespaces::insert_namespace(&self.pool, r).await
    }

    async fn get_namespace(&self, id: &str) -> Result<NamespaceRecord, StorageError> {
        namespaces::get_namespace(&self.pool, id).await
    }

    async fn get_namespace_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Option<NamespaceRecord>, StorageError> {
        namespaces::get_namespace_by_extension(&self.pool, extension_id).await
    }

    async fn list_namespaces(&self) -> Result<Vec<NamespaceRecord>, StorageError> {
        namespaces::list_namespaces(&self.pool).await
    }

    async fn update_namespace_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        namespaces::update_namespace_status(&self.pool, id, status).await
    }

    async fn update_namespace_policy(&self, id: &str, policy: &str) -> Result<(), StorageError> {
        namespaces::update_namespace_policy(&self.pool, id, policy).await
    }

    async fn insert_migration_record(&self, r: &MigrationRecord) -> Result<(), StorageError> {
        namespaces::insert_migration_record(&self.pool, r).await
    }

    async fn list_migrations_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<MigrationRecord>, StorageError> {
        namespaces::list_migrations_for_namespace(&self.pool, namespace_id).await
    }

    async fn get_migration_record(
        &self,
        namespace_id: &str,
        migration_id: &str,
    ) -> Result<Option<MigrationRecord>, StorageError> {
        namespaces::get_migration_record(&self.pool, namespace_id, migration_id).await
    }

    async fn insert_object_record(&self, r: &ObjectRecord) -> Result<(), StorageError> {
        namespaces::insert_object_record(&self.pool, r).await
    }

    async fn list_objects_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ObjectRecord>, StorageError> {
        namespaces::list_objects_for_namespace(&self.pool, namespace_id).await
    }

    async fn update_object_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        namespaces::update_object_status(&self.pool, id, status).await
    }

    async fn insert_operation(&self, r: &OperationRecord) -> Result<(), StorageError> {
        namespaces::insert_operation(&self.pool, r).await
    }

    async fn update_operation(
        &self,
        id: &str,
        status: &str,
        result_json: Option<&str>,
        completed_at: Option<&str>,
    ) -> Result<(), StorageError> {
        namespaces::update_operation(&self.pool, id, status, result_json, completed_at).await
    }

    async fn insert_archive(&self, r: &ArchiveRecord) -> Result<(), StorageError> {
        namespaces::insert_archive(&self.pool, r).await
    }

    async fn list_archives_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ArchiveRecord>, StorageError> {
        namespaces::list_archives_for_namespace(&self.pool, namespace_id).await
    }
}

#[cfg(test)]
mod tests;
