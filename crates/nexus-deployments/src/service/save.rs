use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::hash::{EffectiveWorkflowHash, PayloadHash, hex, sha256_jcs};
use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::repository::{
    DeploymentRepository, NewArtifactBinding, NewDeployment, NewModelBinding, NewParameter,
    NewRevision, NewRuntimeBinding, NewSnapshot, NewSourceLink,
};
use crate::state::MappingState;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::sync::Arc;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SaveRequest {
    pub display_name: String,
    pub slug: String,
    pub workspace_id: Option<String>,
    pub description: Option<String>,
    pub tags: Vec<String>,
    pub created_from_surface: String,
    pub save_mode: String,
    pub source: SourceRef,
    pub workflow_payload: Value,
    pub runtime_binding: Option<RuntimeBindingInput>,
    pub model_binding: Option<ModelBindingInput>,
    pub parameters: Vec<ParameterInput>,
    pub artifacts: Vec<ArtifactBindingInput>,
    pub mapping_state: MappingState,
    pub ui_restore_json: Option<Value>,
    pub execution_policy_json: Option<Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SourceRef {
    pub workflow_id: Option<String>,
    pub workflow_version: Option<String>,
    pub recipe_id: Option<String>,
    pub recipe_version: Option<String>,
    pub extension_id: Option<String>,
    pub source_kind: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeBindingInput {
    pub profile_id: Option<String>,
    pub runtime_adapter_id: Option<String>,
    pub runtime_install_id: Option<String>,
    pub runtime_settings_id: Option<String>,
    pub backend_family: Option<String>,
    pub backend_display_name: Option<String>,
    pub compatibility_state: String,
    pub capability_snapshot: Option<Value>,
    pub selection_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelBindingInput {
    pub model_record_id: Option<String>,
    pub model_source_kind: String,
    pub model_locator: Option<String>,
    pub model_format: Option<String>,
    pub model_hash: Option<String>,
    pub model_size_bytes: Option<i64>,
    pub quantization: Option<String>,
    pub capability_class: Option<String>,
    pub load_parameters: Option<Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParameterInput {
    pub scope: String,
    pub binding_target: String,
    pub logical_key: String,
    pub data_type: String,
    pub value: Value,
    pub default_value: Option<Value>,
    pub is_user_modified: bool,
    pub is_recipe_exposed: bool,
    pub is_runtime_exposed: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ArtifactBindingInput {
    pub usage_kind: String,
    pub binding_target: Option<String>,
    pub artifact_id: Option<String>,
    pub artifact_ref: Option<String>,
    pub is_pinned: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SavedDeployment {
    pub deployment_id: DeploymentId,
    pub revision_id: DeploymentRevisionId,
    pub revision_number: i64,
    pub effective_workflow_hash: String,
    pub mapping_state: MappingState,
}

pub struct DeploymentSaveService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentSaveService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn save(
        &self,
        request: SaveRequest,
    ) -> Result<(SavedDeployment, Vec<DeploymentEvent>), DeploymentError> {
        let now = Utc::now().to_rfc3339();
        let deployment_id = DeploymentId::new_v7();
        let revision_id = DeploymentRevisionId::new_v7();

        let new_deployment = NewDeployment {
            id: deployment_id.clone(),
            workspace_id: request.workspace_id.clone(),
            slug: request.slug.clone(),
            display_name: request.display_name.clone(),
            description: request.description.clone(),
            state: "saved".into(),
            restore_state: "fully_restorable".into(),
            created_at: now.clone(),
            updated_at: now.clone(),
            created_from_surface: request.created_from_surface.clone(),
            notes_markdown: None,
        };
        self.repo.insert_deployment(new_deployment).await?;

        let workflow_hash_bytes = sha256_jcs(&request.workflow_payload)?;
        let workflow_hash = hex(&workflow_hash_bytes);
        let snapshot_id = format!("snap_{}", Uuid::now_v7());
        let snapshot_payload = serde_json::to_string(&request.workflow_payload)?;
        let snapshot_hash = hex(&PayloadHash::from_bytes(workflow_hash_bytes).as_bytes());

        let revision = NewRevision {
            id: revision_id.clone(),
            deployment_id: deployment_id.clone(),
            revision_number: 1,
            save_mode: request.save_mode.clone(),
            created_at: now.clone(),
            created_by_action: format!("save_from:{}", request.created_from_surface),
            base_workflow_ref: request.source.workflow_id.clone(),
            base_workflow_version_ref: request.source.workflow_version.clone(),
            base_recipe_ref: request.source.recipe_id.clone(),
            base_recipe_version_ref: request.source.recipe_version.clone(),
            base_extension_ref: request.source.extension_id.clone(),
            mapping_state: mapping_state_str(request.mapping_state).into(),
            workflow_snapshot_id: Some(snapshot_id.clone()),
            workflow_patch_json: None,
            effective_workflow_hash: workflow_hash.clone(),
            ui_restore_json: request.ui_restore_json.as_ref().map(|v| v.to_string()),
            execution_policy_json: request
                .execution_policy_json
                .as_ref()
                .map(|v| v.to_string()),
            compatibility_summary_json: None,
            change_summary_json: None,
        };
        self.repo.insert_revision(revision).await?;

        debug_assert_eq!(revision_id.as_str().is_empty(), false);

        self.repo
            .insert_snapshot(NewSnapshot {
                id: snapshot_id.clone(),
                deployment_revision_id: revision_id.clone(),
                snapshot_kind: "workflow_resolved".into(),
                payload_format: "json".into(),
                payload_json: snapshot_payload,
                payload_hash: snapshot_hash,
                created_at: now.clone(),
            })
            .await?;

        self.repo
            .insert_source_link(NewSourceLink {
                id: format!("src_{}", Uuid::now_v7()),
                deployment_revision_id: revision_id.clone(),
                source_kind: request.source.source_kind.clone(),
                source_id: request
                    .source
                    .recipe_id
                    .clone()
                    .or_else(|| request.source.workflow_id.clone()),
                source_version_id: request
                    .source
                    .recipe_version
                    .clone()
                    .or_else(|| request.source.workflow_version.clone()),
                source_extension_id: request.source.extension_id.clone(),
                source_template_ref: None,
                source_availability_state: "available".into(),
                is_primary_source: true,
            })
            .await?;

        if !request.parameters.is_empty() {
            let mut params = Vec::with_capacity(request.parameters.len());
            for p in &request.parameters {
                params.push(NewParameter {
                    id: format!("par_{}", Uuid::now_v7()),
                    deployment_revision_id: revision_id.clone(),
                    scope: p.scope.clone(),
                    binding_target: p.binding_target.clone(),
                    logical_key: p.logical_key.clone(),
                    data_type: p.data_type.clone(),
                    value_json: p.value.to_string(),
                    default_value_json: p.default_value.as_ref().map(|v| v.to_string()),
                    is_user_modified: p.is_user_modified,
                    is_recipe_exposed: p.is_recipe_exposed,
                    is_runtime_exposed: p.is_runtime_exposed,
                    validation_state: "ok".into(),
                    validation_message: None,
                });
            }
            for param in &params {
                debug_assert_eq!(param.deployment_revision_id, revision_id);
            }
            self.repo.insert_parameter_batch(&params).await?;
        }

        if let Some(rb) = request.runtime_binding {
            let row = NewRuntimeBinding {
                id: format!("rtb_{}", Uuid::now_v7()),
                deployment_revision_id: revision_id.clone(),
                profile_id: rb.profile_id,
                runtime_adapter_id: rb.runtime_adapter_id,
                runtime_install_id: rb.runtime_install_id,
                runtime_settings_id: rb.runtime_settings_id,
                backend_family: rb.backend_family,
                backend_display_name: rb.backend_display_name,
                compatibility_state: rb.compatibility_state,
                capability_snapshot_json: rb.capability_snapshot.as_ref().map(|v| v.to_string()),
                selection_reason: rb.selection_reason,
            };
            debug_assert_eq!(row.deployment_revision_id, revision_id);
            self.repo.insert_runtime_binding(row).await?;
        }

        if let Some(mb) = request.model_binding {
            let row = NewModelBinding {
                id: format!("mdb_{}", Uuid::now_v7()),
                deployment_revision_id: revision_id.clone(),
                model_record_id: mb.model_record_id,
                model_source_kind: mb.model_source_kind,
                model_locator: mb.model_locator,
                model_format: mb.model_format,
                model_hash: mb.model_hash,
                model_size_bytes: mb.model_size_bytes,
                quantization: mb.quantization,
                capability_class: mb.capability_class,
                compatibility_snapshot_json: None,
                load_parameters_json: mb.load_parameters.as_ref().map(|v| v.to_string()),
            };
            debug_assert_eq!(row.deployment_revision_id, revision_id);
            self.repo.insert_model_binding(row).await?;
        }

        if !request.artifacts.is_empty() {
            let mut artifacts = Vec::with_capacity(request.artifacts.len());
            for a in &request.artifacts {
                artifacts.push(NewArtifactBinding {
                    id: format!("art_{}", Uuid::now_v7()),
                    deployment_revision_id: revision_id.clone(),
                    usage_kind: a.usage_kind.clone(),
                    binding_target: a.binding_target.clone(),
                    artifact_id: a.artifact_id.clone(),
                    artifact_ref: a.artifact_ref.clone(),
                    is_pinned: a.is_pinned,
                });
            }
            for artifact in &artifacts {
                debug_assert_eq!(artifact.deployment_revision_id, revision_id);
            }
            self.repo.insert_artifact_binding_batch(&artifacts).await?;
        }

        for tag in &request.tags {
            self.repo.insert_tag(&deployment_id, tag).await?;
        }

        self.repo
            .advance_current_revision(&deployment_id, &revision_id, None)
            .await?;

        let saved = SavedDeployment {
            deployment_id: deployment_id.clone(),
            revision_id: revision_id.clone(),
            revision_number: 1,
            effective_workflow_hash: workflow_hash,
            mapping_state: request.mapping_state,
        };

        let _ = EffectiveWorkflowHash::from_bytes(workflow_hash_bytes);

        let events = vec![
            DeploymentEvent::Created {
                deployment_id: deployment_id.clone(),
            },
            DeploymentEvent::RevisionCreated {
                deployment_id,
                revision_id,
            },
        ];
        Ok((saved, events))
    }
}

fn mapping_state_str(m: MappingState) -> &'static str {
    match m {
        MappingState::FullyMapped => "fully_mapped",
        MappingState::PartiallyMapped => "partially_mapped",
        MappingState::Custom => "custom",
    }
}
