use sqlx::sqlite::SqlitePool;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::{
    ArtifactRecord, ExtensionRecord, LineageEdgeRecord, NodeExecutionRecord, OperatorRecord,
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
        Ok(())
    }

    async fn insert_extension(&self, r: &ExtensionRecord) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO extensions (id, name, version, description, publisher, host_api_compat, \
             protocol_compat, runtime_family, entrypoint, capabilities, status, directory, \
             installed_at, recipe_count, ui_contribution_count, validation_errors) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        sqlx::query("SELECT * FROM extensions WHERE id = ?")
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
        Ok(sqlx::query("SELECT * FROM extensions")
            .map(map_extension_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn update_extension_status(&self, id: &str, status: &str) -> Result<(), StorageError> {
        let result = sqlx::query("UPDATE extensions SET status = ? WHERE id = ?")
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
        sqlx::query(
            "INSERT INTO operators (id, version, extension_id, display_name, description, category, \
             inputs, outputs, config_schema, execution_mode, cacheable, resumable, resource_hints) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        Ok(sqlx::query("SELECT * FROM operators")
            .map(map_operator_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn list_operators_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<OperatorRecord>, StorageError> {
        Ok(
            sqlx::query("SELECT * FROM operators WHERE extension_id = ?")
                .bind(extension_id)
                .map(map_operator_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn get_operator(&self, id: &str, version: &str) -> Result<OperatorRecord, StorageError> {
        sqlx::query("SELECT * FROM operators WHERE id = ? AND version = ?")
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
        sqlx::query(
            "INSERT INTO workflows (id, title, version, inputs, outputs, nodes, edges, stages, \
             created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get_workflow(&self, id: &str) -> Result<WorkflowRecord, StorageError> {
        sqlx::query("SELECT * FROM workflows WHERE id = ?")
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
        Ok(sqlx::query("SELECT * FROM workflows")
            .map(map_workflow_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn update_workflow(&self, r: &WorkflowRecord) -> Result<(), StorageError> {
        let result = sqlx::query(
            "UPDATE workflows SET title = ?, version = ?, inputs = ?, outputs = ?, nodes = ?, \
             edges = ?, stages = ?, updated_at = ? WHERE id = ?",
        )
        .bind(&r.title)
        .bind(&r.version)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.stages)
        .bind(&r.updated_at)
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
        let result = sqlx::query("DELETE FROM workflows WHERE id = ?")
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

    async fn insert_run(&self, r: &RunRecord) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO runs (id, workflow_id, workflow_version, status, started_at, \
             completed_at, error, created_at, run_label, execution_profile, \
             predecessor_run_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        sqlx::query("SELECT * FROM runs WHERE id = ?")
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
        Ok(sqlx::query("SELECT * FROM runs")
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
        let result = sqlx::query("UPDATE runs SET status = ?, error = ? WHERE id = ?")
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
        sqlx::query(
            "INSERT INTO node_executions (run_id, node_id, status, worker_id, started_at, \
             completed_at, duration_ms, error) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
            sqlx::query("SELECT * FROM node_executions WHERE run_id = ?")
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
        let result = sqlx::query(
            "UPDATE node_executions SET status = ?, worker_id = ?, duration_ms = ?, error = ? \
             WHERE run_id = ? AND node_id = ?",
        )
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
        sqlx::query(
            "INSERT INTO artifacts (id, artifact_type, run_id, node_id, port_name, content_hash, \
             size_bytes, blob_path, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        sqlx::query("SELECT * FROM artifacts WHERE id = ?")
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
        Ok(sqlx::query("SELECT * FROM artifacts WHERE run_id = ?")
            .bind(run_id)
            .map(map_artifact_row)
            .fetch_all(&self.pool)
            .await?)
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

        Ok(query
            .map(map_artifact_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn insert_lineage_edge(&self, r: &LineageEdgeRecord) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO lineage_edges (output_artifact_id, input_artifact_id, run_id, node_id) \
             VALUES (?, ?, ?, ?)",
        )
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
        Ok(sqlx::query(
            "SELECT * FROM lineage_edges WHERE output_artifact_id = ? OR input_artifact_id = ?",
        )
        .bind(artifact_id)
        .bind(artifact_id)
        .map(map_lineage_edge_row)
        .fetch_all(&self.pool)
        .await?)
    }

    async fn insert_recipe(&self, r: &RecipeRecord) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO recipes (id, version, display_name, summary, category, extension_id, \
             extension_version, workflow_template_ref, thumbnail, input_summary, bindings, \
             created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        sqlx::query("SELECT * FROM recipes WHERE id = ?")
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
        Ok(sqlx::query("SELECT * FROM recipes")
            .map(map_recipe_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn list_recipes_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<Vec<RecipeRecord>, StorageError> {
        Ok(
            sqlx::query("SELECT * FROM recipes WHERE extension_id = ?")
                .bind(extension_id)
                .map(map_recipe_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn delete_recipes_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<(), StorageError> {
        sqlx::query("DELETE FROM recipes WHERE extension_id = ?")
            .bind(extension_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn insert_ui_contribution(
        &self,
        r: &UIContributionRecord,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO ui_contributions (id, kind, extension_id, display_name, description, \
             target, supported_types, priority, metadata, availability) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
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
        Ok(sqlx::query("SELECT * FROM ui_contributions")
            .map(map_ui_contribution_row)
            .fetch_all(&self.pool)
            .await?)
    }

    async fn list_ui_contributions_by_kind(
        &self,
        kind: &str,
    ) -> Result<Vec<UIContributionRecord>, StorageError> {
        Ok(
            sqlx::query("SELECT * FROM ui_contributions WHERE kind = ?")
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
        Ok(
            sqlx::query("SELECT * FROM ui_contributions WHERE extension_id = ?")
                .bind(extension_id)
                .map(map_ui_contribution_row)
                .fetch_all(&self.pool)
                .await?,
        )
    }

    async fn delete_ui_contributions_by_extension(
        &self,
        extension_id: &str,
    ) -> Result<(), StorageError> {
        sqlx::query("DELETE FROM ui_contributions WHERE extension_id = ?")
            .bind(extension_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
