use crate::error::DeploymentError;
use crate::id::DeploymentId;
use crate::repository::{DeploymentRepository, DeploymentRow, NewPreset, PresetRow};
use crate::service::export::{DeploymentExportService, ExportEnvelope, envelope_contains_secret};
use chrono::Utc;
use std::sync::Arc;
use uuid::Uuid;

/// Derive the recipe-family key for a deployment — the normalized module
/// binding the import module-mismatch guard keys on. Recipe-wide presets are
/// scoped by this key, so any preset listed for a deployment is guaranteed to
/// pass the import binding check on apply.
///
/// Extension-backed deployments key by `source_extension_id`; user-workflow
/// deployments key by `workflow:<id>`; an unbound deployment has no recipe
/// family and does not support presets.
pub fn recipe_key_of(deployment: &DeploymentRow) -> Result<String, DeploymentError> {
    if let Some(ext) = deployment
        .source_extension_id
        .as_deref()
        .filter(|s| !s.is_empty())
    {
        return Ok(ext.to_owned());
    }
    if let Some(wf) = deployment
        .source_workflow_id
        .as_deref()
        .filter(|s| !s.is_empty())
    {
        return Ok(format!("workflow:{wf}"));
    }
    Err(DeploymentError::PresetUnsupported(
        "deployment has no module binding to scope presets by".into(),
    ))
}

pub struct DeploymentPresetService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentPresetService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    async fn ensure_name_free(
        &self,
        recipe_key: &str,
        name: &str,
        exclude_id: Option<&str>,
    ) -> Result<(), DeploymentError> {
        let existing = self.repo.list_presets_by_recipe_key(recipe_key).await?;
        if existing
            .iter()
            .any(|p| p.name == name && Some(p.id.as_str()) != exclude_id)
        {
            return Err(DeploymentError::PresetNameConflict(name.to_owned()));
        }
        Ok(())
    }

    /// Snapshot the deployment's current Export envelope as a named preset.
    pub async fn create_from_deployment(
        &self,
        deployment_id: &DeploymentId,
        recipe_key: &str,
        source_extension_id: Option<&str>,
        name: &str,
        description: Option<&str>,
    ) -> Result<PresetRow, DeploymentError> {
        self.ensure_name_free(recipe_key, name, None).await?;
        let envelope = DeploymentExportService::new(self.repo.clone())
            .export(deployment_id)
            .await?;
        self.persist(
            recipe_key,
            source_extension_id,
            name,
            description,
            envelope,
            Some(deployment_id.as_str()),
        )
        .await
    }

    /// Store a client-supplied envelope (from an import file) as a named preset.
    pub async fn create_from_envelope(
        &self,
        deployment_id: &DeploymentId,
        recipe_key: &str,
        source_extension_id: Option<&str>,
        envelope: ExportEnvelope,
        name: &str,
        description: Option<&str>,
    ) -> Result<PresetRow, DeploymentError> {
        if envelope.package_version != 1 {
            return Err(DeploymentError::InvalidEnvelope(format!(
                "unsupported package_version {}",
                envelope.package_version
            )));
        }
        if envelope.revisions.is_empty() {
            return Err(DeploymentError::InvalidEnvelope(
                "envelope contains no revisions".into(),
            ));
        }
        if envelope.integrity.digest.is_empty() {
            return Err(DeploymentError::InvalidEnvelope(
                "envelope integrity digest missing".into(),
            ));
        }
        if envelope_contains_secret(&envelope) {
            return Err(DeploymentError::ExportBlockedBySecret);
        }
        self.ensure_name_free(recipe_key, name, None).await?;
        self.persist(
            recipe_key,
            source_extension_id,
            name,
            description,
            envelope,
            Some(deployment_id.as_str()),
        )
        .await
    }

    async fn persist(
        &self,
        recipe_key: &str,
        source_extension_id: Option<&str>,
        name: &str,
        description: Option<&str>,
        envelope: ExportEnvelope,
        created_from_deployment_id: Option<&str>,
    ) -> Result<PresetRow, DeploymentError> {
        let now = Utc::now().to_rfc3339();
        let id = format!("depreset_{}", Uuid::now_v7());
        let integrity_digest = envelope.integrity.digest.clone();
        let payload_json = serde_json::to_string(&envelope)?;
        let row = NewPreset {
            id: id.clone(),
            recipe_key: recipe_key.to_owned(),
            source_extension_id: source_extension_id.map(str::to_owned),
            name: name.to_owned(),
            description: description.map(str::to_owned),
            payload_json,
            integrity_digest,
            created_from_deployment_id: created_from_deployment_id.map(str::to_owned),
            created_at: now.clone(),
            updated_at: now,
        };
        self.repo.insert_preset(row).await?;
        self.repo.get_preset(&id).await
    }

    pub async fn list(&self, recipe_key: &str) -> Result<Vec<PresetRow>, DeploymentError> {
        self.repo.list_presets_by_recipe_key(recipe_key).await
    }

    pub async fn get(&self, preset_id: &str) -> Result<PresetRow, DeploymentError> {
        self.repo.get_preset(preset_id).await
    }

    /// Rename / re-describe a preset, enforcing recipe-family membership with a
    /// single fetch. A preset id from another recipe family is reported as
    /// `PresetNotFound` so ids cannot be used to reach across families.
    pub async fn rename(
        &self,
        preset_id: &str,
        recipe_key: &str,
        name: &str,
        description: Option<&str>,
    ) -> Result<PresetRow, DeploymentError> {
        let current = self.repo.get_preset(preset_id).await?;
        if current.recipe_key != recipe_key {
            return Err(DeploymentError::PresetNotFound(preset_id.to_owned()));
        }
        self.ensure_name_free(recipe_key, name, Some(preset_id))
            .await?;
        self.repo
            .update_preset_meta(preset_id, name, description)
            .await?;
        self.repo.get_preset(preset_id).await
    }

    /// Delete a preset, enforcing recipe-family membership with a single fetch.
    /// A preset id from another recipe family is reported as `PresetNotFound`.
    pub async fn delete(&self, preset_id: &str, recipe_key: &str) -> Result<(), DeploymentError> {
        let current = self.repo.get_preset(preset_id).await?;
        if current.recipe_key != recipe_key {
            return Err(DeploymentError::PresetNotFound(preset_id.to_owned()));
        }
        self.repo.delete_preset(preset_id).await
    }
}

#[cfg(test)]
mod recipe_key_tests {
    use super::*;

    fn row(ext: Option<&str>, wf: Option<&str>) -> DeploymentRow {
        DeploymentRow {
            id: DeploymentId::new_v7(),
            workspace_id: None,
            slug: "s".into(),
            display_name: "d".into(),
            description: None,
            state: "saved".into(),
            restore_state: "fully_restorable".into(),
            is_archived: false,
            is_favorite: false,
            created_at: "t".into(),
            updated_at: "t".into(),
            created_from_surface: "api".into(),
            current_revision_id: None,
            last_run_id: None,
            last_successful_run_id: None,
            last_failed_run_id: None,
            run_count: 0,
            notes_markdown: None,
            source_extension_id: ext.map(str::to_owned),
            source_workflow_id: wf.map(str::to_owned),
            source_recipe_id: None,
            deleted_at: None,
        }
    }

    #[test]
    fn prefers_extension_binding() {
        assert_eq!(
            recipe_key_of(&row(Some("test.extension"), Some("wf"))).unwrap(),
            "test.extension"
        );
    }

    #[test]
    fn falls_back_to_workflow() {
        assert_eq!(
            recipe_key_of(&row(None, Some("wf-7"))).unwrap(),
            "workflow:wf-7"
        );
    }

    #[test]
    fn empty_strings_are_unbound() {
        assert!(matches!(
            recipe_key_of(&row(Some(""), Some(""))).unwrap_err(),
            DeploymentError::PresetUnsupported(_)
        ));
    }
}
