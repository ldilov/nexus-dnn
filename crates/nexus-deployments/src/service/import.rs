use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{DeploymentRepository, NewDeployment, NewRevision};
use crate::service::export::ExportEnvelope;
use chrono::Utc;
use std::sync::Arc;

#[cfg(test)]
mod missing_extensions_tests {
    use super::*;
    use crate::service::export::{ExtensionSettingsBundle, Integrity};
    use serde_json::json;

    fn envelope(ext_ids: &[&str]) -> ExportEnvelope {
        envelope_with(ext_ids, json!({}))
    }

    fn envelope_with(ext_ids: &[&str], deployment: serde_json::Value) -> ExportEnvelope {
        ExportEnvelope {
            package_version: 1,
            deployment,
            revisions: vec![json!({})],
            extension_settings: ext_ids
                .iter()
                .map(|id| ExtensionSettingsBundle {
                    extension_id: (*id).to_string(),
                    settings: json!({}),
                    schema_fingerprint: None,
                })
                .collect(),
            integrity: Integrity {
                hash_algo: "x".into(),
                digest: "0".repeat(64),
            },
        }
    }

    #[test]
    fn returns_only_uninstalled_deduped_and_sorted() {
        let env = envelope(&["b", "a", "a", "c"]);
        let missing = missing_extensions(&env, |id| id == "a");
        assert_eq!(missing, vec!["b".to_string(), "c".to_string()]);
    }

    #[test]
    fn empty_when_all_installed() {
        let env = envelope(&["a", "b"]);
        assert!(missing_extensions(&env, |_| true).is_empty());
    }

    #[test]
    fn includes_source_extension_id_even_without_settings_rows() {
        let env = envelope_with(&[], json!({ "source_extension_id": "nexus.backing" }));
        let missing = missing_extensions(&env, |id| id == "something.else");
        assert_eq!(missing, vec!["nexus.backing".to_string()]);
    }

    #[test]
    fn source_extension_id_installed_is_not_missing() {
        let env = envelope_with(&["a"], json!({ "source_extension_id": "nexus.backing" }));
        let missing = missing_extensions(&env, |id| id == "nexus.backing");
        assert_eq!(missing, vec!["a".to_string()]);
    }
}

/// Derive which extensions referenced by an envelope's settings bundles are
/// NOT installed, per the host-provided `is_installed` predicate. The import
/// handler uses this so missing-dependency state is host-derived, never trusted
/// from the client payload (which drives persisted restore_state).
pub fn missing_extensions(
    envelope: &ExportEnvelope,
    is_installed: impl Fn(&str) -> bool,
) -> Vec<String> {
    let mut candidates: Vec<String> = envelope
        .extension_settings
        .iter()
        .map(|b| b.extension_id.clone())
        .collect();
    // A deployment binds its backing extension via source_extension_id, not
    // only settings rows — include it so a settings-less deployment counts.
    if let Some(src) = envelope
        .deployment
        .get("source_extension_id")
        .and_then(|v| v.as_str())
    {
        candidates.push(src.to_owned());
    }
    let mut missing: Vec<String> = candidates
        .into_iter()
        .filter(|id| !is_installed(id))
        .collect();
    missing.sort();
    missing.dedup();
    missing
}

pub struct DeploymentImportService {
    repo: Arc<dyn DeploymentRepository>,
}

#[derive(Debug, Clone)]
pub struct ImportResult {
    pub deployment_id: DeploymentId,
    pub state: String,
    pub diagnostics_count: usize,
}

impl DeploymentImportService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn import(
        &self,
        envelope: ExportEnvelope,
        missing_dependencies: Vec<String>,
    ) -> Result<(ImportResult, Vec<DeploymentEvent>), DeploymentError> {
        if envelope.package_version != 1 {
            return Err(DeploymentError::ImportMissingDependency(format!(
                "unsupported package_version {}",
                envelope.package_version
            )));
        }
        if envelope.revisions.is_empty() {
            return Err(DeploymentError::ImportMissingDependency(
                "envelope contains no revisions".into(),
            ));
        }

        let new_id = DeploymentId::new_v7();
        let new_revision_id = DeploymentRevisionId::new_v7();
        let now = Utc::now().to_rfc3339();

        let state = if missing_dependencies.is_empty() {
            "saved"
        } else {
            "stale"
        };
        let restore_state = if missing_dependencies.is_empty() {
            "fully_restorable"
        } else {
            "restorable_with_degraded_features"
        };

        let display_name = envelope
            .deployment
            .get("display_name")
            .and_then(|v| v.as_str())
            .unwrap_or("imported")
            .to_owned();
        let slug = format!("imported-{}", &new_id.as_str()[..8]);

        self.repo
            .insert_deployment(NewDeployment {
                id: new_id.clone(),
                workspace_id: None,
                slug,
                display_name,
                description: None,
                state: state.into(),
                restore_state: restore_state.into(),
                created_at: now.clone(),
                updated_at: now.clone(),
                created_from_surface: "api".into(),
                notes_markdown: None,
            })
            .await?;

        let effective_workflow_hash = envelope.revisions[0]
            .get("effective_workflow_hash")
            .and_then(|v| v.as_str())
            .unwrap_or("0".repeat(64).as_str())
            .to_owned();
        let mapping_state = envelope.revisions[0]
            .get("mapping_state")
            .and_then(|v| v.as_str())
            .unwrap_or("custom")
            .to_owned();

        self.repo
            .insert_revision(NewRevision {
                id: new_revision_id.clone(),
                deployment_id: new_id.clone(),
                revision_number: 1,
                save_mode: "create".into(),
                created_at: now.clone(),
                created_by_action: "import".into(),
                base_workflow_ref: None,
                base_workflow_version_ref: None,
                base_recipe_ref: None,
                base_recipe_version_ref: None,
                base_extension_ref: None,
                mapping_state,
                workflow_snapshot_id: None,
                workflow_patch_json: None,
                effective_workflow_hash,
                ui_restore_json: None,
                execution_policy_json: None,
                compatibility_summary_json: None,
                change_summary_json: None,
            })
            .await?;
        self.repo
            .advance_current_revision(&new_id, &new_revision_id, None)
            .await?;

        // Persist settings as-is even when the extension is absent — they ride
        // with the host-owned deployment so a later install restores features.
        for bundle in &envelope.extension_settings {
            let settings_json = serde_json::to_string(&bundle.settings)?;
            // Drop the envelope's fingerprint — it is host-authoritative and a
            // forged export must not implant it; the next host PUT recomputes it.
            self.repo
                .upsert_extension_settings(&new_id, &bundle.extension_id, &settings_json, None)
                .await?;
        }

        let result = ImportResult {
            deployment_id: new_id.clone(),
            state: state.into(),
            diagnostics_count: missing_dependencies.len(),
        };

        Ok((
            result,
            vec![DeploymentEvent::Created {
                deployment_id: new_id,
            }],
        ))
    }
}
