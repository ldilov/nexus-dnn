use sqlx::sqlite::SqlitePool;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::{
    ArchiveRecord, ArtifactRecord, ExtensionRecord, LineageEdgeRecord, MigrationRecord,
    NamespaceRecord, NodeExecutionRecord, ObjectRecord, OperationRecord, OperatorRecord,
    RecipeRecord, RunRecord, UIContributionRecord, WorkflowRecord,
};
use crate::row_mapping::{
    map_artifact_row, map_extension_row, map_lineage_edge_row, map_node_execution_row,
    map_operator_row, map_recipe_row, map_run_row, map_ui_contribution_row, map_workflow_row,
};

pub struct SqliteDatabase {
    pool: SqlitePool,
}

impl SqliteDatabase {
    pub async fn new(database_url: &str) -> Result<Self, StorageError> {
        let pool = SqlitePool::connect(database_url).await?;
        let db = Self { pool };
        db.run_migrations().await?;
        Ok(db)
    }

    pub fn pool(&self) -> &SqlitePool {
        &self.pool
    }
}

impl Database for SqliteDatabase {
    async fn run_migrations(&self) -> Result<(), StorageError> {
        sqlx::query(include_str!("../../../migrations/001_initial.sql"))
            .execute(&self.pool)
            .await?;

        let migration_002 = include_str!("../../../migrations/002_recipes_contributions.sql");
        for statement in migration_002.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            let result = sqlx::query(trimmed).execute(&self.pool).await;
            if let Err(e) = result {
                let msg = e.to_string();
                let is_duplicate_column = msg.contains("duplicate column");
                if !is_duplicate_column {
                    return Err(e.into());
                }
            }
        }

        let migration_003 = include_str!("../../../migrations/003_extension_storage.sql");
        for statement in migration_003.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&self.pool).await?;
        }

        let migration_004 = include_str!("../../../migrations/004_workflow_user_edits.sql");
        for statement in migration_004.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            if let Err(e) = sqlx::query(trimmed).execute(&self.pool).await {
                let msg = e.to_string();
                if !msg.contains("duplicate column") {
                    return Err(e.into());
                }
            }
        }

        let migration_005 = include_str!("../../../migrations/005_workflow_canvas_state.sql");
        for statement in migration_005.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&self.pool).await?;
        }

        let migration_006 =
            include_str!("../../../migrations/006_workflow_extension_attribution.sql");
        for statement in migration_006.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            if let Err(e) = sqlx::query(trimmed).execute(&self.pool).await {
                let msg = e.to_string();
                if !msg.contains("duplicate column") {
                    return Err(e.into());
                }
            }
        }

        let migration_007 = include_str!("../../../migrations/007_host_hf_catalog.sql");
        for statement in migration_007.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&self.pool).await?;
        }

        let migration_008 = include_str!("../../../migrations/008_host_runtime_pool.sql");
        for statement in migration_008.split(';') {
            let trimmed = statement.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&self.pool).await?;
        }

        Ok(())
    }

    async fn insert_extension(&self, r: &ExtensionRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/extensions/insert.sql"))
            .bind(&r.id)
            .bind(&r.name)
            .bind(&r.version)
            .bind(&r.description)
            .bind(&r.publisher)
            .bind(&r.host_api_compat)
            .bind(&r.protocol_compat)
            .bind(&r.runtime_family)
            .bind(&r.entrypoint)
            .bind(&r.capabilities)
            .bind(&r.status)
            .bind(&r.directory)
            .bind(&r.installed_at)
            .bind(r.recipe_count)
            .bind(r.ui_contribution_count)
            .bind(&r.validation_errors)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_extension(&self, id: &str) -> Result<ExtensionRecord, StorageError> {
        sqlx::query(include_str!("../queries/extensions/get_by_id.sql"))
            .bind(id)
            .map(map_extension_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "extension".into(),
                id: id.into(),
            })
    }

    async fn list_extensions(&self) -> Result<Vec<ExtensionRecord>, StorageError> {
        Ok(sqlx::query(include_str!("../queries/extensions/list.sql"))
            .map(map_extension_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn update_extension_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/extensions/update_status.sql"))
            .bind(status)
            .bind(id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "extension".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn insert_operator(&self, r: &OperatorRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/operators/insert.sql"))
            .bind(&r.id)
            .bind(&r.version)
            .bind(&r.extension_id)
            .bind(&r.display_name)
            .bind(&r.description)
            .bind(&r.category)
            .bind(&r.inputs)
            .bind(&r.outputs)
            .bind(&r.config_schema)
            .bind(&r.execution_mode)
            .bind(r.cacheable)
            .bind(r.resumable)
            .bind(&r.resource_hints)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_operators(&self) -> Result<Vec<OperatorRecord>, StorageError> {
        Ok(sqlx::query(include_str!("../queries/operators/list.sql"))
            .map(map_operator_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn list_operators_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<OperatorRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/operators/list_by_extension.sql"))
                .bind(extension_id)
                .map(map_operator_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn get_operator(&self, id: &str, version: &str) -> Result<OperatorRecord, StorageError> {
        sqlx::query(include_str!("../queries/operators/get_by_id.sql"))
            .bind(id)
            .bind(version)
            .map(map_operator_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "operator".into(),
                id: format!("{id}@{version}"),
            })
    }

    async fn insert_workflow(&self, r: &WorkflowRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/workflows/insert.sql"))
            .bind(&r.id)
            .bind(&r.title)
            .bind(&r.version)
            .bind(&r.inputs)
            .bind(&r.outputs)
            .bind(&r.nodes)
            .bind(&r.edges)
            .bind(&r.stages)
            .bind(&r.created_at)
            .bind(&r.updated_at)
            .bind(&r.user_edited_at)
            .bind(&r.extension_id)
            .bind(&r.extension_version)
            .bind(&r.extension_version_first_seen)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_workflow(&self, id: &str) -> Result<WorkflowRecord, StorageError> {
        sqlx::query(include_str!("../queries/workflows/get_by_id.sql"))
            .bind(id)
            .map(map_workflow_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "workflow".into(),
                id: id.into(),
            })
    }

    async fn list_workflows(&self) -> Result<Vec<WorkflowRecord>, StorageError> {
        Ok(sqlx::query(include_str!("../queries/workflows/list.sql"))
            .map(map_workflow_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn update_workflow(&self, r: &WorkflowRecord) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/workflows/update.sql"))
            .bind(&r.title)
            .bind(&r.version)
            .bind(&r.inputs)
            .bind(&r.outputs)
            .bind(&r.nodes)
            .bind(&r.edges)
            .bind(&r.stages)
            .bind(&r.updated_at)
            .bind(&r.user_edited_at)
            .bind(&r.id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "workflow".into(),
                id: r.id.clone(),
            });
        }
        Ok(())
    }

    async fn delete_workflow(&self, id: &str) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/workflows/delete.sql"))
            .bind(id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "workflow".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn clear_workflow_user_edit(&self, id: &str) -> Result<(), StorageError> {
        sqlx::query("UPDATE workflows SET user_edited_at = NULL WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn stamp_workflow_extension(
        &self,
        id: &str,
        extension_id: &str,
        extension_version: &str,
        first_seen_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "UPDATE workflows SET extension_id = ?, extension_version = ?, \
             extension_version_first_seen = COALESCE(extension_version_first_seen, ?) \
             WHERE id = ?",
        )
        .bind(extension_id)
        .bind(extension_version)
        .bind(first_seen_at)
        .bind(id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get_canvas_state(&self, workflow_id: &str) -> Result<Option<String>, StorageError> {
        let row = sqlx::query("SELECT payload FROM workflow_canvas_state WHERE workflow_id = ?")
            .bind(workflow_id)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.map(|r| {
            use sqlx::Row;
            r.get::<String, _>("payload")
        }))
    }

    async fn set_canvas_state(
        &self,
        workflow_id: &str,
        payload: &str,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO workflow_canvas_state (workflow_id, payload, updated_at) \
             VALUES (?, ?, ?) \
             ON CONFLICT(workflow_id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
        )
        .bind(workflow_id)
        .bind(payload)
        .bind(updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn insert_run(&self, r: &RunRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/runs/insert.sql"))
            .bind(&r.id)
            .bind(&r.workflow_id)
            .bind(&r.workflow_version)
            .bind(&r.status)
            .bind(&r.started_at)
            .bind(&r.completed_at)
            .bind(&r.error)
            .bind(&r.created_at)
            .bind(&r.run_label)
            .bind(&r.execution_profile)
            .bind(&r.predecessor_run_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_run(&self, id: &str) -> Result<RunRecord, StorageError> {
        sqlx::query(include_str!("../queries/runs/get_by_id.sql"))
            .bind(id)
            .map(map_run_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "run".into(),
                id: id.into(),
            })
    }

    async fn list_runs(&self) -> Result<Vec<RunRecord>, StorageError> {
        Ok(sqlx::query(include_str!("../queries/runs/list.sql"))
            .map(map_run_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn update_run_status(
        &self,
        id: &str,
        status: &str,
        error: Option<&str>,
    ) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/runs/update_status.sql"))
            .bind(status)
            .bind(error)
            .bind(id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "run".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn insert_node_execution(&self, r: &NodeExecutionRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/node_executions/insert.sql"))
            .bind(&r.run_id)
            .bind(&r.node_id)
            .bind(&r.status)
            .bind(&r.worker_id)
            .bind(&r.started_at)
            .bind(&r.completed_at)
            .bind(r.duration_ms)
            .bind(&r.error)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_node_executions_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<NodeExecutionRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/node_executions/get_for_run.sql"))
                .bind(run_id)
                .map(map_node_execution_row)
                .fetch_all(&self.pool)
                .await?,
        )
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
        let result = sqlx::query(include_str!("../queries/node_executions/update.sql"))
            .bind(status)
            .bind(worker_id)
            .bind(duration_ms)
            .bind(error)
            .bind(run_id)
            .bind(node_id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "node_execution".into(),
                id: format!("{run_id}/{node_id}"),
            });
        }
        Ok(())
    }

    async fn insert_artifact(&self, r: &ArtifactRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/artifacts/insert.sql"))
            .bind(&r.id)
            .bind(&r.artifact_type)
            .bind(&r.run_id)
            .bind(&r.node_id)
            .bind(&r.port_name)
            .bind(&r.content_hash)
            .bind(r.size_bytes)
            .bind(&r.blob_path)
            .bind(&r.metadata)
            .bind(&r.created_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_artifact(&self, id: &str) -> Result<ArtifactRecord, StorageError> {
        sqlx::query(include_str!("../queries/artifacts/get_by_id.sql"))
            .bind(id)
            .map(map_artifact_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "artifact".into(),
                id: id.into(),
            })
    }

    async fn list_artifacts_for_run(
        &self,
        run_id: &str,
    ) -> Result<Vec<ArtifactRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/artifacts/list_for_run.sql"))
                .bind(run_id)
                .map(map_artifact_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn list_artifacts_filtered(
        &self,
        run_id: Option<&str>,
        artifact_type: Option<&str>,
        node_id: Option<&str>,
    ) -> Result<Vec<ArtifactRecord>, StorageError> {
        let mut sql = String::from("SELECT * FROM artifacts WHERE 1=1");
        if run_id.is_some() {
            sql.push_str(" AND run_id = ?");
        }
        if artifact_type.is_some() {
            sql.push_str(" AND artifact_type = ?");
        }
        if node_id.is_some() {
            sql.push_str(" AND node_id = ?");
        }

        let mut query = sqlx::query(&sql);
        if let Some(v) = run_id {
            query = query.bind(v);
        }
        if let Some(v) = artifact_type {
            query = query.bind(v);
        }
        if let Some(v) = node_id {
            query = query.bind(v);
        }

        Ok(query.map(map_artifact_row).fetch_all(&self.pool).await?)
    }

    async fn insert_lineage_edge(&self, r: &LineageEdgeRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/lineage/insert.sql"))
            .bind(&r.output_artifact_id)
            .bind(&r.input_artifact_id)
            .bind(&r.run_id)
            .bind(&r.node_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_lineage_for_artifact(
        &self,
        artifact_id: &str,
    ) -> Result<Vec<LineageEdgeRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/lineage/get_for_artifact.sql"))
                .bind(artifact_id)
                .bind(artifact_id)
                .map(map_lineage_edge_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn insert_recipe(&self, r: &RecipeRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/recipes/insert.sql"))
            .bind(&r.id)
            .bind(&r.version)
            .bind(&r.display_name)
            .bind(&r.summary)
            .bind(&r.category)
            .bind(&r.extension_id)
            .bind(&r.extension_version)
            .bind(&r.workflow_template_ref)
            .bind(&r.thumbnail)
            .bind(&r.input_summary)
            .bind(&r.bindings)
            .bind(&r.created_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_recipe(&self, id: &str) -> Result<RecipeRecord, StorageError> {
        sqlx::query(include_str!("../queries/recipes/get_by_id.sql"))
            .bind(id)
            .map(map_recipe_row)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "recipe".into(),
                id: id.into(),
            })
    }

    async fn list_recipes(&self) -> Result<Vec<RecipeRecord>, StorageError> {
        Ok(sqlx::query(include_str!("../queries/recipes/list.sql"))
            .map(map_recipe_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn list_recipes_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<RecipeRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/recipes/list_by_extension.sql"))
                .bind(extension_id)
                .map(map_recipe_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn delete_recipes_by_extension(&self, extension_id: &str) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/recipes/delete_by_extension.sql"))
            .bind(extension_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn insert_ui_contribution(&self, r: &UIContributionRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/ui_contributions/insert.sql"))
            .bind(&r.id)
            .bind(&r.kind)
            .bind(&r.extension_id)
            .bind(&r.display_name)
            .bind(&r.description)
            .bind(&r.target)
            .bind(&r.supported_types)
            .bind(r.priority)
            .bind(&r.metadata)
            .bind(&r.availability)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_ui_contributions(&self) -> Result<Vec<UIContributionRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/ui_contributions/list.sql"))
                .map(map_ui_contribution_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn list_ui_contributions_by_kind(
        &self,
        kind: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError> {
        Ok(
            sqlx::query(include_str!("../queries/ui_contributions/list_by_kind.sql"))
                .bind(kind)
                .map(map_ui_contribution_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn list_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError> {
        Ok(sqlx::query(include_str!(
            "../queries/ui_contributions/list_by_extension.sql"
        ))
        .bind(extension_id)
        .map(map_ui_contribution_row)
        .fetch_all(&self.pool)
        .await?)
    }

    async fn delete_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(include_str!(
            "../queries/ui_contributions/delete_by_extension.sql"
        ))
        .bind(extension_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn insert_namespace(&self, r: &NamespaceRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/storage/insert_namespace.sql"))
            .bind(&r.id)
            .bind(&r.extension_id)
            .bind(&r.extension_version_first_seen)
            .bind(&r.namespace_alias)
            .bind(&r.effective_prefix)
            .bind(&r.engine)
            .bind(&r.storage_spec_version)
            .bind(&r.sql_profile)
            .bind(&r.status)
            .bind(&r.uninstall_policy)
            .bind(&r.created_at)
            .bind(&r.updated_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn get_namespace(&self, id: &str) -> Result<NamespaceRecord, StorageError> {
        sqlx::query_as::<_, NamespaceRecord>(include_str!("../queries/storage/get_namespace.sql"))
            .bind(id)
            .fetch_optional(&self.pool)
            .await?
            .ok_or_else(|| StorageError::NotFound {
                entity: "namespace".into(),
                id: id.into(),
            })
    }

    async fn get_namespace_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Option<NamespaceRecord>, StorageError> {
        Ok(sqlx::query_as::<_, NamespaceRecord>(include_str!(
            "../queries/storage/get_namespace_by_extension.sql"
        ))
        .bind(extension_id)
        .fetch_optional(&self.pool)
        .await?)
    }

    async fn list_namespaces(&self) -> Result<Vec<NamespaceRecord>, StorageError> {
        Ok(sqlx::query_as::<_, NamespaceRecord>(include_str!(
            "../queries/storage/list_namespaces.sql"
        ))
        .fetch_all(&self.pool)
        .await?)
    }

    async fn update_namespace_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!(
            "../queries/storage/update_namespace_status.sql"
        ))
        .bind(status)
        .bind(id)
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "namespace".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn update_namespace_policy(&self, id: &str, policy: &str) -> Result<(), StorageError> {
        let now = chrono::Utc::now().to_rfc3339();
        let result = sqlx::query(include_str!(
            "../queries/storage/update_namespace_policy.sql"
        ))
        .bind(policy)
        .bind(&now)
        .bind(id)
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "namespace".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn insert_migration_record(&self, r: &MigrationRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/storage/insert_migration.sql"))
            .bind(&r.id)
            .bind(&r.namespace_id)
            .bind(&r.extension_id)
            .bind(&r.extension_version)
            .bind(&r.migration_id)
            .bind(&r.path)
            .bind(&r.raw_checksum_sha256)
            .bind(&r.expanded_checksum_sha256)
            .bind(&r.status)
            .bind(&r.applied_at)
            .bind(&r.error_json)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_migrations_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<MigrationRecord>, StorageError> {
        Ok(sqlx::query_as::<_, MigrationRecord>(include_str!(
            "../queries/storage/get_migrations.sql"
        ))
        .bind(namespace_id)
        .fetch_all(&self.pool)
        .await?)
    }

    async fn get_migration_record(
        &self,
        namespace_id: &str,
        migration_id: &str,
    ) -> Result<Option<MigrationRecord>, StorageError> {
        Ok(sqlx::query_as::<_, MigrationRecord>(include_str!(
            "../queries/storage/get_migration_record.sql"
        ))
        .bind(namespace_id)
        .bind(migration_id)
        .fetch_optional(&self.pool)
        .await?)
    }

    async fn insert_object_record(&self, r: &ObjectRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/storage/insert_object.sql"))
            .bind(&r.id)
            .bind(&r.namespace_id)
            .bind(&r.object_name)
            .bind(&r.object_type)
            .bind(&r.created_by_migration_id)
            .bind(&r.sql_hash)
            .bind(&r.status)
            .bind(&r.recorded_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_objects_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ObjectRecord>, StorageError> {
        Ok(
            sqlx::query_as::<_, ObjectRecord>(include_str!("../queries/storage/get_objects.sql"))
                .bind(namespace_id)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn update_object_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/storage/update_object_status.sql"))
            .bind(status)
            .bind(id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "object".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn insert_operation(&self, r: &OperationRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/storage/insert_operation.sql"))
            .bind(&r.id)
            .bind(&r.namespace_id)
            .bind(&r.operation_type)
            .bind(&r.status)
            .bind(&r.plan_json)
            .bind(&r.result_json)
            .bind(&r.started_at)
            .bind(&r.completed_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn update_operation(
        &self,
        id: &str,
        status: &str,
        result_json: Option<&str>,
        completed_at: Option<&str>,
    ) -> Result<(), StorageError> {
        let result = sqlx::query(include_str!("../queries/storage/update_operation.sql"))
            .bind(status)
            .bind(result_json)
            .bind(completed_at)
            .bind(id)
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(StorageError::NotFound {
                entity: "operation".into(),
                id: id.into(),
            });
        }
        Ok(())
    }

    async fn insert_archive(&self, r: &ArchiveRecord) -> Result<(), StorageError> {
        sqlx::query(include_str!("../queries/storage/insert_archive.sql"))
            .bind(&r.id)
            .bind(&r.namespace_id)
            .bind(&r.archive_format)
            .bind(&r.archive_path)
            .bind(&r.content_hash)
            .bind(r.table_count)
            .bind(r.row_count)
            .bind(&r.created_at)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_archives_for_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<Vec<ArchiveRecord>, StorageError> {
        Ok(
            sqlx::query_as::<_, ArchiveRecord>(include_str!("../queries/storage/get_archives.sql"))
                .bind(namespace_id)
                .fetch_all(&self.pool)
                .await?,
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    async fn setup_db() -> SqliteDatabase {
        SqliteDatabase::new("sqlite::memory:").await.unwrap()
    }

    fn make_namespace(id: &str, ext_id: &str) -> NamespaceRecord {
        NamespaceRecord {
            id: id.into(),
            extension_id: ext_id.into(),
            extension_version_first_seen: "1.0.0".into(),
            namespace_alias: "test_ns".into(),
            effective_prefix: format!("ext_{id}_"),
            engine: "sqlite".into(),
            storage_spec_version: "0.1".into(),
            sql_profile: "nexus_sqlite_v1".into(),
            status: "reserved".into(),
            uninstall_policy: "retain".into(),
            created_at: "2026-01-01T00:00:00Z".into(),
            updated_at: "2026-01-01T00:00:00Z".into(),
        }
    }

    fn make_migration(id: &str, ns_id: &str, mig_id: &str) -> MigrationRecord {
        MigrationRecord {
            id: id.into(),
            namespace_id: ns_id.into(),
            extension_id: "test.ext".into(),
            extension_version: "1.0.0".into(),
            migration_id: mig_id.into(),
            path: "migrations/001_init.sql".into(),
            raw_checksum_sha256: "abc123".into(),
            expanded_checksum_sha256: "def456".into(),
            status: "planned".into(),
            applied_at: None,
            error_json: None,
        }
    }

    fn make_object(id: &str, ns_id: &str) -> ObjectRecord {
        ObjectRecord {
            id: id.into(),
            namespace_id: ns_id.into(),
            object_name: format!("ext_{ns_id}_items"),
            object_type: "table".into(),
            created_by_migration_id: "mig-1".into(),
            sql_hash: Some("hash123".into()),
            status: "present".into(),
            recorded_at: "2026-01-01T00:00:00Z".into(),
        }
    }

    #[tokio::test]
    async fn namespace_insert_and_read() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");

        db.insert_namespace(&ns).await.unwrap();

        let fetched = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(fetched.id, "ns-1");
        assert_eq!(fetched.extension_id, "test.ext");
        assert_eq!(fetched.status, "reserved");
    }

    #[tokio::test]
    async fn namespace_list_and_by_extension() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        let all = db.list_namespaces().await.unwrap();
        assert_eq!(all.len(), 1);

        let by_ext = db.get_namespace_by_extension("test.ext").await.unwrap();
        assert!(by_ext.is_some());
        assert_eq!(by_ext.unwrap().id, "ns-1");

        let missing = db.get_namespace_by_extension("no.such").await.unwrap();
        assert!(missing.is_none());
    }

    #[tokio::test]
    async fn namespace_update_status() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        db.update_namespace_status("ns-1", "active").await.unwrap();

        let fetched = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(fetched.status, "active");
    }

    #[tokio::test]
    async fn migration_insert_and_list() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        let mig = make_migration("m-1", "ns-1", "001_init");
        db.insert_migration_record(&mig).await.unwrap();

        let migrations = db.list_migrations_for_namespace("ns-1").await.unwrap();
        assert_eq!(migrations.len(), 1);
        assert_eq!(migrations[0].migration_id, "001_init");

        let found = db.get_migration_record("ns-1", "001_init").await.unwrap();
        assert!(found.is_some());

        let missing = db.get_migration_record("ns-1", "999_nope").await.unwrap();
        assert!(missing.is_none());
    }

    #[tokio::test]
    async fn object_insert_list_and_update() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        let obj = make_object("obj-1", "ns-1");
        db.insert_object_record(&obj).await.unwrap();

        let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
        assert_eq!(objects.len(), 1);
        assert_eq!(objects[0].object_type, "table");

        db.update_object_status("obj-1", "dropped").await.unwrap();

        let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
        assert_eq!(objects[0].status, "dropped");
    }

    #[tokio::test]
    async fn operation_insert_and_update() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        let op = OperationRecord {
            id: "op-1".into(),
            namespace_id: "ns-1".into(),
            operation_type: "apply".into(),
            status: "started".into(),
            plan_json: Some(r#"{"action":"new_install"}"#.into()),
            result_json: None,
            started_at: "2026-01-01T00:00:00Z".into(),
            completed_at: None,
        };
        db.insert_operation(&op).await.unwrap();

        db.update_operation(
            "op-1",
            "completed",
            Some(r#"{"ok":true}"#),
            Some("2026-01-01T00:01:00Z"),
        )
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn archive_insert_and_list() {
        let db = setup_db().await;
        let ns = make_namespace("ns-1", "test.ext");
        db.insert_namespace(&ns).await.unwrap();

        let archive = ArchiveRecord {
            id: "arc-1".into(),
            namespace_id: "ns-1".into(),
            archive_format: "jsonl_zip".into(),
            archive_path: "/tmp/archive.zip".into(),
            content_hash: "sha256abc".into(),
            table_count: 3,
            row_count: 42,
            created_at: "2026-01-01T00:00:00Z".into(),
        };
        db.insert_archive(&archive).await.unwrap();

        let archives = db.list_archives_for_namespace("ns-1").await.unwrap();
        assert_eq!(archives.len(), 1);
        assert_eq!(archives[0].archive_format, "jsonl_zip");
        assert_eq!(archives[0].table_count, 3);
        assert_eq!(archives[0].row_count, 42);
    }
}
