use crate::error::StorageError;
use sqlx::Row;
use sqlx::sqlite::SqlitePool;

#[derive(Clone)]
pub struct DeploymentMappers {
    pool: SqlitePool,
}

impl DeploymentMappers {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub fn pool(&self) -> &SqlitePool {
        &self.pool
    }
}

impl DeploymentMappers {
    pub async fn insert_deployment(
        &self,
        id: &str,
        workspace_id: Option<&str>,
        slug: &str,
        display_name: &str,
        description: Option<&str>,
        state: &str,
        restore_state: &str,
        created_at: &str,
        updated_at: &str,
        created_from_surface: &str,
        notes_markdown: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployments (id, workspace_id, slug, display_name, description, state, restore_state, is_archived, is_favorite, created_at, updated_at, created_from_surface, run_count, notes_markdown) \
             VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, 0, ?)",
        )
        .bind(id)
        .bind(workspace_id)
        .bind(slug)
        .bind(display_name)
        .bind(description)
        .bind(state)
        .bind(restore_state)
        .bind(created_at)
        .bind(updated_at)
        .bind(created_from_surface)
        .bind(notes_markdown)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_revision(
        &self,
        id: &str,
        deployment_id: &str,
        revision_number: i64,
        save_mode: &str,
        created_at: &str,
        created_by_action: &str,
        base_workflow_ref: Option<&str>,
        base_workflow_version_ref: Option<&str>,
        base_recipe_ref: Option<&str>,
        base_recipe_version_ref: Option<&str>,
        base_extension_ref: Option<&str>,
        mapping_state: &str,
        workflow_snapshot_id: Option<&str>,
        workflow_patch_json: Option<&str>,
        effective_workflow_hash: &str,
        ui_restore_json: Option<&str>,
        execution_policy_json: Option<&str>,
        compatibility_summary_json: Option<&str>,
        change_summary_json: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_revisions (id, deployment_id, revision_number, save_mode, created_at, created_by_action, base_workflow_ref, base_workflow_version_ref, base_recipe_ref, base_recipe_version_ref, base_extension_ref, mapping_state, workflow_snapshot_id, workflow_patch_json, effective_workflow_hash, ui_restore_json, execution_policy_json, compatibility_summary_json, change_summary_json) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_id)
        .bind(revision_number)
        .bind(save_mode)
        .bind(created_at)
        .bind(created_by_action)
        .bind(base_workflow_ref)
        .bind(base_workflow_version_ref)
        .bind(base_recipe_ref)
        .bind(base_recipe_version_ref)
        .bind(base_extension_ref)
        .bind(mapping_state)
        .bind(workflow_snapshot_id)
        .bind(workflow_patch_json)
        .bind(effective_workflow_hash)
        .bind(ui_restore_json)
        .bind(execution_policy_json)
        .bind(compatibility_summary_json)
        .bind(change_summary_json)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn insert_snapshot(
        &self,
        id: &str,
        deployment_revision_id: &str,
        snapshot_kind: &str,
        payload_format: &str,
        payload_json: &str,
        payload_hash: &str,
        created_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_snapshots (id, deployment_revision_id, snapshot_kind, payload_format, payload_json, payload_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(snapshot_kind)
        .bind(payload_format)
        .bind(payload_json)
        .bind(payload_hash)
        .bind(created_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_source_link(
        &self,
        id: &str,
        deployment_revision_id: &str,
        source_kind: &str,
        source_id: Option<&str>,
        source_version_id: Option<&str>,
        source_extension_id: Option<&str>,
        source_template_ref: Option<&str>,
        source_availability_state: &str,
        is_primary_source: bool,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_source_links (id, deployment_revision_id, source_kind, source_id, source_version_id, source_extension_id, source_template_ref, source_availability_state, is_primary_source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(source_kind)
        .bind(source_id)
        .bind(source_version_id)
        .bind(source_extension_id)
        .bind(source_template_ref)
        .bind(source_availability_state)
        .bind(if is_primary_source { 1_i64 } else { 0 })
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_parameter(
        &self,
        id: &str,
        deployment_revision_id: &str,
        scope: &str,
        binding_target: &str,
        logical_key: &str,
        data_type: &str,
        value_json: &str,
        default_value_json: Option<&str>,
        is_user_modified: bool,
        is_recipe_exposed: bool,
        is_runtime_exposed: bool,
        validation_state: &str,
        validation_message: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_parameters (id, deployment_revision_id, scope, binding_target, logical_key, data_type, value_json, default_value_json, is_user_modified, is_recipe_exposed, is_runtime_exposed, validation_state, validation_message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(scope)
        .bind(binding_target)
        .bind(logical_key)
        .bind(data_type)
        .bind(value_json)
        .bind(default_value_json)
        .bind(if is_user_modified { 1_i64 } else { 0 })
        .bind(if is_recipe_exposed { 1_i64 } else { 0 })
        .bind(if is_runtime_exposed { 1_i64 } else { 0 })
        .bind(validation_state)
        .bind(validation_message)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_runtime_binding(
        &self,
        id: &str,
        deployment_revision_id: &str,
        profile_id: Option<&str>,
        runtime_adapter_id: Option<&str>,
        runtime_install_id: Option<&str>,
        runtime_settings_id: Option<&str>,
        backend_family: Option<&str>,
        backend_display_name: Option<&str>,
        compatibility_state: &str,
        capability_snapshot_json: Option<&str>,
        selection_reason: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_runtime_bindings (id, deployment_revision_id, profile_id, runtime_adapter_id, runtime_install_id, runtime_settings_id, backend_family, backend_display_name, compatibility_state, capability_snapshot_json, selection_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(profile_id)
        .bind(runtime_adapter_id)
        .bind(runtime_install_id)
        .bind(runtime_settings_id)
        .bind(backend_family)
        .bind(backend_display_name)
        .bind(compatibility_state)
        .bind(capability_snapshot_json)
        .bind(selection_reason)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_model_binding(
        &self,
        id: &str,
        deployment_revision_id: &str,
        model_record_id: Option<&str>,
        model_source_kind: &str,
        model_locator: Option<&str>,
        model_format: Option<&str>,
        model_hash: Option<&str>,
        model_size_bytes: Option<i64>,
        quantization: Option<&str>,
        capability_class: Option<&str>,
        compatibility_snapshot_json: Option<&str>,
        load_parameters_json: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_model_bindings (id, deployment_revision_id, model_record_id, model_source_kind, model_locator, model_format, model_hash, model_size_bytes, quantization, capability_class, compatibility_snapshot_json, load_parameters_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(model_record_id)
        .bind(model_source_kind)
        .bind(model_locator)
        .bind(model_format)
        .bind(model_hash)
        .bind(model_size_bytes)
        .bind(quantization)
        .bind(capability_class)
        .bind(compatibility_snapshot_json)
        .bind(load_parameters_json)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn insert_artifact_binding(
        &self,
        id: &str,
        deployment_revision_id: &str,
        usage_kind: &str,
        binding_target: Option<&str>,
        artifact_id: Option<&str>,
        artifact_ref: Option<&str>,
        is_pinned: bool,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_artifact_bindings (id, deployment_revision_id, usage_kind, binding_target, artifact_id, artifact_ref, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(usage_kind)
        .bind(binding_target)
        .bind(artifact_id)
        .bind(artifact_ref)
        .bind(if is_pinned { 1_i64 } else { 0 })
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn insert_validation(
        &self,
        id: &str,
        deployment_revision_id: &str,
        validated_at: &str,
        overall_state: &str,
        restore_state: &str,
        diagnostics_json: &str,
        missing_dependencies_count: i64,
        warnings_count: i64,
        errors_count: i64,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_validations (id, deployment_revision_id, validated_at, overall_state, restore_state, diagnostics_json, missing_dependencies_count, warnings_count, errors_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_revision_id)
        .bind(validated_at)
        .bind(overall_state)
        .bind(restore_state)
        .bind(diagnostics_json)
        .bind(missing_dependencies_count)
        .bind(warnings_count)
        .bind(errors_count)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn insert_restore_diagnostic(
        &self,
        id: &str,
        deployment_validation_id: &str,
        severity: &str,
        category: &str,
        code: &str,
        message: &str,
        subject_ref: Option<&str>,
        resolution_hint: Option<&str>,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_restore_diagnostics (id, deployment_validation_id, severity, category, code, message, subject_ref, resolution_hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_validation_id)
        .bind(severity)
        .bind(category)
        .bind(code)
        .bind(message)
        .bind(subject_ref)
        .bind(resolution_hint)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn insert_run_link(
        &self,
        id: &str,
        deployment_id: &str,
        deployment_revision_id: &str,
        run_id: &str,
        link_kind: &str,
        created_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_run_links (id, deployment_id, deployment_revision_id, run_id, link_kind, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(id)
        .bind(deployment_id)
        .bind(deployment_revision_id)
        .bind(run_id)
        .bind(link_kind)
        .bind(created_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn insert_tag(&self, deployment_id: &str, tag: &str) -> Result<(), StorageError> {
        sqlx::query("INSERT OR IGNORE INTO deployment_tags (deployment_id, tag) VALUES (?, ?)")
            .bind(deployment_id)
            .bind(tag)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn advance_current_revision(
        &self,
        deployment_id: &str,
        revision_id: &str,
        last_validation_id: Option<&str>,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "UPDATE deployments SET current_revision_id = ?, last_validation_id = COALESCE(?, last_validation_id), updated_at = ? WHERE id = ?",
        )
        .bind(revision_id)
        .bind(last_validation_id)
        .bind(updated_at)
        .bind(deployment_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn count_runs_referencing_revision(
        &self,
        revision_id: &str,
    ) -> Result<i64, StorageError> {
        let row = sqlx::query(
            "SELECT COUNT(*) AS c FROM deployment_run_links WHERE deployment_revision_id = ?",
        )
        .bind(revision_id)
        .fetch_one(&self.pool)
        .await?;
        Ok(row.try_get::<i64, _>("c")?)
    }

    pub async fn fetch_deployment_row(
        &self,
        id: &str,
    ) -> Result<Option<DeploymentRowRaw>, StorageError> {
        let row = sqlx::query(
            "SELECT d.id, d.workspace_id, d.slug, d.display_name, d.description, \
             d.state, d.restore_state, d.is_archived, d.is_favorite, \
             d.created_at, d.updated_at, d.created_from_surface, \
             d.current_revision_id, d.last_run_id, d.last_successful_run_id, \
             d.last_failed_run_id, d.run_count, d.notes_markdown, d.deleted_at, \
             sl.source_extension_id AS source_extension_id, \
             CASE WHEN sl.source_kind = 'user' THEN sl.source_id ELSE NULL END AS source_workflow_id \
             FROM deployments d \
             LEFT JOIN deployment_source_links sl \
               ON sl.deployment_revision_id = d.current_revision_id \
              AND sl.is_primary_source = 1 \
             WHERE d.id = ?",
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.map(row_to_deployment))
    }

    pub async fn fetch_revision_row(
        &self,
        id: &str,
    ) -> Result<Option<RevisionRowRaw>, StorageError> {
        let row = sqlx::query(
            "SELECT id, deployment_id, revision_number, mapping_state, effective_workflow_hash, workflow_snapshot_id, compatibility_summary_json FROM deployment_revisions WHERE id = ?",
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.map(|r| RevisionRowRaw {
            id: r.try_get("id").unwrap_or_default(),
            deployment_id: r.try_get("deployment_id").unwrap_or_default(),
            revision_number: r.try_get("revision_number").unwrap_or_default(),
            mapping_state: r.try_get("mapping_state").unwrap_or_default(),
            effective_workflow_hash: r.try_get("effective_workflow_hash").unwrap_or_default(),
            workflow_snapshot_id: r.try_get("workflow_snapshot_id").ok(),
            compatibility_summary_json: r.try_get("compatibility_summary_json").ok(),
        }))
    }

    pub async fn list_deployments(
        &self,
        workspace_id: Option<&str>,
        state: Option<&str>,
        limit: i64,
        include_deleted: bool,
    ) -> Result<Vec<DeploymentRowRaw>, StorageError> {
        // Spec 019 FR-050 follow-up (T400) — project the primary source link's
        // `source_extension_id` + `source_id` (for user-workflow sources)
        let rows = sqlx::query(
            "SELECT d.id, d.workspace_id, d.slug, d.display_name, d.description, \
             d.state, d.restore_state, d.is_archived, d.is_favorite, \
             d.created_at, d.updated_at, d.created_from_surface, \
             d.current_revision_id, d.last_run_id, d.last_successful_run_id, \
             d.last_failed_run_id, d.run_count, d.notes_markdown, d.deleted_at, \
             sl.source_extension_id AS source_extension_id, \
             CASE WHEN sl.source_kind = 'user' THEN sl.source_id ELSE NULL END AS source_workflow_id \
             FROM deployments d \
             LEFT JOIN deployment_source_links sl \
               ON sl.deployment_revision_id = d.current_revision_id \
              AND sl.is_primary_source = 1 \
             WHERE (?1 IS NULL OR d.workspace_id IS ?1) \
               AND (?2 IS NULL OR d.state = ?2) \
               AND (?3 = 1 OR d.deleted_at IS NULL) \
             ORDER BY d.updated_at DESC LIMIT ?4",
        )
        .bind(workspace_id)
        .bind(state)
        .bind(if include_deleted { 1_i64 } else { 0 })
        .bind(limit)
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.into_iter().map(row_to_deployment).collect())
    }

    /// Soft-delete: stamp `deleted_at` so the row drops out of the default
    /// list without losing data. Hard-purge requires a follow-up call to
    /// [`Self::purge_deployment`].
    pub async fn soft_delete_deployment(
        &self,
        id: &str,
        deleted_at: &str,
    ) -> Result<u64, StorageError> {
        let res = sqlx::query(
            "UPDATE deployments SET deleted_at = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL",
        )
        .bind(deleted_at)
        .bind(deleted_at)
        .bind(id)
        .execute(&self.pool)
        .await?;
        Ok(res.rows_affected())
    }

    /// Returns the row's `deleted_at` (if any) without filtering. Used by
    /// the purge handler to enforce the soft-delete-first invariant.
    pub async fn fetch_deleted_at(&self, id: &str) -> Result<Option<Option<String>>, StorageError> {
        let row = sqlx::query("SELECT deleted_at FROM deployments WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.map(|r| r.try_get::<Option<String>, _>("deleted_at").unwrap_or(None)))
    }

    /// Hard-purge: removes the deployment row plus every dependent row in
    /// host-owned deployment tables. Extension-owned rows that reference
    /// the deployment id stay untouched — extensions react to the
    /// `DeploymentPurged` event to clean up their own per-extension data.
    pub async fn purge_deployment(&self, id: &str) -> Result<u64, StorageError> {
        // Collect revision IDs first so we can clean per-revision tables
        // without relying on cascade constraints (the schema does not
        let rev_rows = sqlx::query("SELECT id FROM deployment_revisions WHERE deployment_id = ?")
            .bind(id)
            .fetch_all(&self.pool)
            .await?;
        let revision_ids: Vec<String> = rev_rows
            .iter()
            .map(|r| r.try_get::<String, _>("id").unwrap_or_default())
            .collect();

        // Per-revision child tables.
        for rev_id in &revision_ids {
            sqlx::query(
                "DELETE FROM deployment_artifact_bindings WHERE deployment_revision_id = ?",
            )
            .bind(rev_id)
            .execute(&self.pool)
            .await?;
            sqlx::query("DELETE FROM deployment_model_bindings WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
            sqlx::query("DELETE FROM deployment_runtime_bindings WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
            sqlx::query("DELETE FROM deployment_parameters WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
            sqlx::query("DELETE FROM deployment_source_links WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
            sqlx::query("DELETE FROM deployment_snapshots WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
            // Validations + their diagnostics.
            let val_rows = sqlx::query(
                "SELECT id FROM deployment_validations WHERE deployment_revision_id = ?",
            )
            .bind(rev_id)
            .fetch_all(&self.pool)
            .await?;
            for v in val_rows {
                let vid: String = v.try_get("id").unwrap_or_default();
                sqlx::query(
                    "DELETE FROM deployment_restore_diagnostics WHERE deployment_validation_id = ?",
                )
                .bind(&vid)
                .execute(&self.pool)
                .await?;
            }
            sqlx::query("DELETE FROM deployment_validations WHERE deployment_revision_id = ?")
                .bind(rev_id)
                .execute(&self.pool)
                .await?;
        }

        sqlx::query("DELETE FROM deployment_run_links WHERE deployment_id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;
        self.delete_all_extension_settings(id).await?;
        sqlx::query("DELETE FROM deployment_tags WHERE deployment_id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;
        sqlx::query("DELETE FROM deployment_revisions WHERE deployment_id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;
        let res = sqlx::query("DELETE FROM deployments WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;
        Ok(res.rows_affected())
    }

    /// Upsert the opaque settings blob for `(deployment_id, extension_id)`.
    /// Idempotent on the unique pair: a second call with the same pair
    /// replaces `settings_json`/`settings_schema_fingerprint`/`updated_at`
    /// while preserving the original `id` and `created_at`.
    #[allow(clippy::too_many_arguments)]
    pub async fn upsert_extension_settings(
        &self,
        id: &str,
        deployment_id: &str,
        extension_id: &str,
        settings_json: &str,
        settings_schema_fingerprint: Option<&str>,
        created_at: &str,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO deployment_extension_settings (id, deployment_id, extension_id, settings_json, settings_schema_fingerprint, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?) \
             ON CONFLICT(deployment_id, extension_id) DO UPDATE SET \
               settings_json = excluded.settings_json, \
               settings_schema_fingerprint = excluded.settings_schema_fingerprint, \
               updated_at = excluded.updated_at",
        )
        .bind(id)
        .bind(deployment_id)
        .bind(extension_id)
        .bind(settings_json)
        .bind(settings_schema_fingerprint)
        .bind(created_at)
        .bind(updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn get_extension_settings(
        &self,
        deployment_id: &str,
        extension_id: &str,
    ) -> Result<Option<RawExtensionSettings>, StorageError> {
        let row = sqlx::query(
            "SELECT id, deployment_id, extension_id, settings_json, settings_schema_fingerprint, created_at, updated_at \
             FROM deployment_extension_settings WHERE deployment_id = ? AND extension_id = ?",
        )
        .bind(deployment_id)
        .bind(extension_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.map(|r| map_extension_settings_row(&r)))
    }

    pub async fn list_extension_settings(
        &self,
        deployment_id: &str,
    ) -> Result<Vec<RawExtensionSettings>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, deployment_id, extension_id, settings_json, settings_schema_fingerprint, created_at, updated_at \
             FROM deployment_extension_settings WHERE deployment_id = ? ORDER BY extension_id",
        )
        .bind(deployment_id)
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(map_extension_settings_row).collect())
    }

    pub async fn delete_extension_settings(
        &self,
        deployment_id: &str,
        extension_id: &str,
    ) -> Result<u64, StorageError> {
        let res =
            sqlx::query("DELETE FROM deployment_extension_settings WHERE deployment_id = ? AND extension_id = ?")
                .bind(deployment_id)
                .bind(extension_id)
                .execute(&self.pool)
                .await?;
        Ok(res.rows_affected())
    }

    /// Remove every extension-settings row for a deployment. Used by the
    /// import-replace flow (drop stale rows before re-inserting the file's
    /// bundles) and by [`Self::purge_deployment`].
    pub async fn delete_all_extension_settings(
        &self,
        deployment_id: &str,
    ) -> Result<u64, StorageError> {
        let res = sqlx::query("DELETE FROM deployment_extension_settings WHERE deployment_id = ?")
            .bind(deployment_id)
            .execute(&self.pool)
            .await?;
        Ok(res.rows_affected())
    }

    /// Atomically replace a deployment's active config and all extension
    /// settings in a single SQLite transaction. Inserts a new revision (numbered
    /// `MAX(revision_number)+1` computed in-tx, so concurrent replaces cannot
    /// collide on the unique `(deployment_id, revision_number)` index), points
    /// the deployment at it, updates `state`/`restore_state`/`updated_at`, then
    /// drops every settings row and re-inserts the supplied bundles. Returns the
    /// new revision number. On any error the whole transaction rolls back,
    /// leaving the deployment exactly as it was before the call.
    #[allow(clippy::too_many_arguments)]
    pub async fn replace_in_place(
        &self,
        deployment_id: &str,
        new_revision_id: &str,
        save_mode: &str,
        created_at: &str,
        created_by_action: &str,
        mapping_state: &str,
        effective_workflow_hash: &str,
        state: &str,
        restore_state: &str,
        updated_at: &str,
        settings: &[ReplaceInPlaceSettings<'_>],
    ) -> Result<i64, StorageError> {
        let mut tx = self.pool.begin().await?;

        let next_num: i64 = sqlx::query_scalar(
            "SELECT COALESCE(MAX(revision_number), 0) + 1 FROM deployment_revisions WHERE deployment_id = ?",
        )
        .bind(deployment_id)
        .fetch_one(&mut *tx)
        .await?;

        let none: Option<&str> = None;
        sqlx::query(
            "INSERT INTO deployment_revisions (id, deployment_id, revision_number, save_mode, created_at, created_by_action, base_workflow_ref, base_workflow_version_ref, base_recipe_ref, base_recipe_version_ref, base_extension_ref, mapping_state, workflow_snapshot_id, workflow_patch_json, effective_workflow_hash, ui_restore_json, execution_policy_json, compatibility_summary_json, change_summary_json) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(new_revision_id)
        .bind(deployment_id)
        .bind(next_num)
        .bind(save_mode)
        .bind(created_at)
        .bind(created_by_action)
        .bind(none)
        .bind(none)
        .bind(none)
        .bind(none)
        .bind(none)
        .bind(mapping_state)
        .bind(none)
        .bind(none)
        .bind(effective_workflow_hash)
        .bind(none)
        .bind(none)
        .bind(none)
        .bind(none)
        .execute(&mut *tx)
        .await?;

        sqlx::query(
            "UPDATE deployments SET current_revision_id = ?, state = ?, restore_state = ?, updated_at = ? WHERE id = ?",
        )
        .bind(new_revision_id)
        .bind(state)
        .bind(restore_state)
        .bind(updated_at)
        .bind(deployment_id)
        .execute(&mut *tx)
        .await?;

        sqlx::query("DELETE FROM deployment_extension_settings WHERE deployment_id = ?")
            .bind(deployment_id)
            .execute(&mut *tx)
            .await?;

        for s in settings {
            sqlx::query(
                "INSERT INTO deployment_extension_settings (id, deployment_id, extension_id, settings_json, settings_schema_fingerprint, created_at, updated_at) \
                 VALUES (?, ?, ?, ?, ?, ?, ?)",
            )
            .bind(s.id)
            .bind(deployment_id)
            .bind(s.extension_id)
            .bind(s.settings_json)
            .bind(s.schema_fingerprint)
            .bind(updated_at)
            .bind(updated_at)
            .execute(&mut *tx)
            .await?;
        }

        tx.commit().await?;
        Ok(next_num)
    }

    pub async fn update_metadata(
        &self,
        id: &str,
        display_name: Option<&str>,
        description: Option<&str>,
        notes_markdown: Option<&str>,
        is_archived: Option<bool>,
        is_favorite: Option<bool>,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        sqlx::query(
            "UPDATE deployments SET display_name = COALESCE(?, display_name), description = COALESCE(?, description), notes_markdown = COALESCE(?, notes_markdown), is_archived = COALESCE(?, is_archived), is_favorite = COALESCE(?, is_favorite), updated_at = ? WHERE id = ?",
        )
        .bind(display_name)
        .bind(description)
        .bind(notes_markdown)
        .bind(is_archived.map(|b| if b { 1_i64 } else { 0 }))
        .bind(is_favorite.map(|b| if b { 1_i64 } else { 0 }))
        .bind(updated_at)
        .bind(id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn record_run_attribution(
        &self,
        run_id: &str,
        deployment_id: &str,
        revision_id: &str,
        execution_context_hash: &str,
    ) -> Result<(), StorageError> {
        sqlx::query("UPDATE runs SET deployment_id = ?, deployment_revision_id = ?, execution_context_hash = ? WHERE id = ?")
            .bind(deployment_id)
            .bind(revision_id)
            .bind(execution_context_hash)
            .bind(run_id)
            .execute(&self.pool)
            .await?;
        sqlx::query("UPDATE deployments SET last_run_id = ?, run_count = run_count + 1, updated_at = datetime('now') WHERE id = ?")
            .bind(run_id)
            .bind(deployment_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn record_run_outcome(
        &self,
        run_id: &str,
        deployment_id: &str,
        succeeded: bool,
    ) -> Result<(), StorageError> {
        let column = if succeeded {
            "last_successful_run_id"
        } else {
            "last_failed_run_id"
        };
        let sql = format!("UPDATE deployments SET {column} = ? WHERE id = ?");
        sqlx::query(&sql)
            .bind(run_id)
            .bind(deployment_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}

pub struct DeploymentRowRaw {
    pub id: String,
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
    pub current_revision_id: Option<String>,
    pub last_run_id: Option<String>,
    pub last_successful_run_id: Option<String>,
    pub last_failed_run_id: Option<String>,
    pub run_count: i64,
    pub notes_markdown: Option<String>,
    /// Spec 019 T400 — primary source link's `source_extension_id`.
    /// Populated only for rows whose current revision's primary source
    /// has `source_kind='recipe'` (i.e., extension-backed deployments).
    pub source_extension_id: Option<String>,
    /// Spec 019 T400 — primary source link's `source_id` when the link's
    /// `source_kind='user'`. Lets the frontend resolve a user-workflow
    /// module badge without a second round-trip.
    pub source_workflow_id: Option<String>,
    /// Soft-delete tombstone (`NULL` for live rows).
    pub deleted_at: Option<String>,
}

pub struct RevisionRowRaw {
    pub id: String,
    pub deployment_id: String,
    pub revision_number: i64,
    pub mapping_state: String,
    pub effective_workflow_hash: String,
    pub workflow_snapshot_id: Option<String>,
    pub compatibility_summary_json: Option<String>,
}

pub struct RawExtensionSettings {
    pub id: String,
    pub deployment_id: String,
    pub extension_id: String,
    pub settings_json: String,
    pub settings_schema_fingerprint: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Borrowed inputs for one extension-settings row passed to
/// [`DeploymentMappers::replace_in_place`].
pub struct ReplaceInPlaceSettings<'a> {
    pub id: &'a str,
    pub extension_id: &'a str,
    pub settings_json: &'a str,
    pub schema_fingerprint: Option<&'a str>,
}

fn map_extension_settings_row(r: &sqlx::sqlite::SqliteRow) -> RawExtensionSettings {
    RawExtensionSettings {
        id: r.try_get("id").unwrap_or_default(),
        deployment_id: r.try_get("deployment_id").unwrap_or_default(),
        extension_id: r.try_get("extension_id").unwrap_or_default(),
        settings_json: r.try_get("settings_json").unwrap_or_default(),
        settings_schema_fingerprint: r
            .try_get::<Option<String>, _>("settings_schema_fingerprint")
            .ok()
            .flatten(),
        created_at: r.try_get("created_at").unwrap_or_default(),
        updated_at: r.try_get("updated_at").unwrap_or_default(),
    }
}

fn row_to_deployment(r: sqlx::sqlite::SqliteRow) -> DeploymentRowRaw {
    DeploymentRowRaw {
        id: r.try_get("id").unwrap_or_default(),
        workspace_id: r.try_get("workspace_id").ok(),
        slug: r.try_get("slug").unwrap_or_default(),
        display_name: r.try_get("display_name").unwrap_or_default(),
        description: r.try_get("description").ok(),
        state: r.try_get("state").unwrap_or_default(),
        restore_state: r.try_get("restore_state").unwrap_or_default(),
        is_archived: r.try_get::<i64, _>("is_archived").unwrap_or_default() != 0,
        is_favorite: r.try_get::<i64, _>("is_favorite").unwrap_or_default() != 0,
        created_at: r.try_get("created_at").unwrap_or_default(),
        updated_at: r.try_get("updated_at").unwrap_or_default(),
        created_from_surface: r.try_get("created_from_surface").unwrap_or_default(),
        current_revision_id: r.try_get("current_revision_id").ok(),
        last_run_id: r.try_get("last_run_id").ok(),
        last_successful_run_id: r.try_get("last_successful_run_id").ok(),
        last_failed_run_id: r.try_get("last_failed_run_id").ok(),
        run_count: r.try_get("run_count").unwrap_or_default(),
        notes_markdown: r.try_get("notes_markdown").ok(),
        source_extension_id: r.try_get("source_extension_id").ok(),
        source_workflow_id: r.try_get("source_workflow_id").ok(),
        deleted_at: r.try_get("deleted_at").ok(),
    }
}
