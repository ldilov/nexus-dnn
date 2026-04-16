use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::save::{
    DeploymentSaveService, ModelBindingInput, ParameterInput, RuntimeBindingInput, SaveRequest,
    SourceRef,
};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

async fn fresh_repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let mappers = DeploymentMappers::new(db.pool().clone());
    Arc::new(SqliteDeploymentRepository::new(mappers))
}

fn sample_request() -> SaveRequest {
    SaveRequest {
        display_name: "Qwen tuned chat".into(),
        slug: "qwen-chat-001".into(),
        workspace_id: None,
        description: Some("Long-context chat".into()),
        tags: vec!["chat".into(), "qwen".into()],
        created_from_surface: "recipe_view".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("workflow.chat.basic".into()),
            workflow_version: Some("wf_v12".into()),
            recipe_id: Some("recipe.chat.basic".into()),
            recipe_version: Some("rcp_v3".into()),
            extension_id: Some("builtin.chatllm".into()),
            source_kind: "extension_recipe".into(),
        },
        workflow_payload: json!({"nodes": [{"id":"n1"},{"id":"n2"}], "edges": []}),
        runtime_binding: Some(RuntimeBindingInput {
            profile_id: Some("profile.local.cuda0".into()),
            runtime_adapter_id: Some("builtin.chatllm.llama_cpp".into()),
            runtime_install_id: Some("rtinstall_llama_cpp_cuda12_win64_01".into()),
            runtime_settings_id: None,
            backend_family: Some("llama.cpp".into()),
            backend_display_name: None,
            compatibility_state: "exact".into(),
            capability_snapshot: None,
            selection_reason: None,
        }),
        model_binding: Some(ModelBindingInput {
            model_record_id: None,
            model_source_kind: "local_file".into(),
            model_locator: Some("models/Qwen3-14B-Q4_K_M.gguf".into()),
            model_format: Some("gguf".into()),
            model_hash: None,
            model_size_bytes: None,
            quantization: Some("Q4_K_M".into()),
            capability_class: Some("chat".into()),
            load_parameters: Some(json!({"gpu_layers": 40})),
        }),
        parameters: vec![
            ParameterInput {
                scope: "runtime".into(),
                binding_target: "runtime:llama_server".into(),
                logical_key: "threads".into(),
                data_type: "integer".into(),
                value: json!(12),
                default_value: None,
                is_user_modified: true,
                is_recipe_exposed: false,
                is_runtime_exposed: true,
            },
            ParameterInput {
                scope: "request".into(),
                binding_target: "node:chat_generate_1.config".into(),
                logical_key: "temperature".into(),
                data_type: "number".into(),
                value: json!(0.7),
                default_value: Some(json!(1.0)),
                is_user_modified: true,
                is_recipe_exposed: true,
                is_runtime_exposed: false,
            },
        ],
        artifacts: vec![],
        mapping_state: MappingState::PartiallyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}

#[tokio::test]
async fn save_persists_deployment_revision_and_bindings() {
    let repo = fresh_repo().await;
    let service = DeploymentSaveService::new(repo.clone());
    let (saved, events) = service.save(sample_request()).await.unwrap();
    assert_eq!(saved.revision_number, 1);
    assert_eq!(saved.effective_workflow_hash.len(), 64);
    assert_eq!(events.len(), 2);

    let deployment = repo.fetch_deployment(&saved.deployment_id).await.unwrap();
    assert_eq!(deployment.slug, "qwen-chat-001");
    assert_eq!(deployment.state, "saved");
    assert_eq!(deployment.current_revision_id.unwrap(), saved.revision_id);

    let revision = repo.fetch_revision(&saved.revision_id).await.unwrap();
    assert_eq!(revision.revision_number, 1);
    assert_eq!(
        revision.effective_workflow_hash,
        saved.effective_workflow_hash
    );
    assert_eq!(revision.mapping_state, "partially_mapped");
}

#[tokio::test]
async fn effective_workflow_hash_is_deterministic_across_saves() {
    let repo = fresh_repo().await;
    let service = DeploymentSaveService::new(repo.clone());

    let mut req1 = sample_request();
    req1.slug = "qwen-001".into();
    let mut req2 = sample_request();
    req2.slug = "qwen-002".into();

    let (s1, _) = service.save(req1).await.unwrap();
    let (s2, _) = service.save(req2).await.unwrap();
    assert_eq!(s1.effective_workflow_hash, s2.effective_workflow_hash);
}
