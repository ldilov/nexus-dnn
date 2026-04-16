use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::save::{
    DeploymentSaveService, ModelBindingInput, RuntimeBindingInput, SaveRequest, SourceRef,
};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

fn base_request(slug: &str) -> SaveRequest {
    SaveRequest {
        display_name: slug.into(),
        slug: slug.into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf1".into()),
            workflow_version: Some("1".into()),
            recipe_id: Some("rcp1".into()),
            recipe_version: Some("1".into()),
            extension_id: Some("ext.same".into()),
            source_kind: "extension_recipe".into(),
        },
        workflow_payload: json!({"nodes": [], "edges": []}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}

#[tokio::test]
async fn two_deployments_same_extension_have_distinct_hashes_when_workflow_differs() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let repo: Arc<dyn DeploymentRepository> = Arc::new(SqliteDeploymentRepository::new(
        DeploymentMappers::new(db.pool().clone()),
    ));
    let svc = DeploymentSaveService::new(repo.clone());

    let mut r1 = base_request("a");
    r1.runtime_binding = Some(RuntimeBindingInput {
        profile_id: None,
        runtime_adapter_id: None,
        runtime_install_id: None,
        runtime_settings_id: None,
        backend_family: Some("llama.cpp".into()),
        backend_display_name: None,
        compatibility_state: "exact".into(),
        capability_snapshot: None,
        selection_reason: None,
    });
    r1.model_binding = Some(ModelBindingInput {
        model_record_id: None,
        model_source_kind: "local_file".into(),
        model_locator: Some("models/a.gguf".into()),
        model_format: Some("gguf".into()),
        model_hash: None,
        model_size_bytes: None,
        quantization: Some("Q4".into()),
        capability_class: Some("chat".into()),
        load_parameters: None,
    });
    r1.workflow_payload = json!({"nodes": [{"id": "n1"}], "edges": []});

    let mut r2 = base_request("b");
    r2.runtime_binding = Some(RuntimeBindingInput {
        profile_id: None,
        runtime_adapter_id: None,
        runtime_install_id: None,
        runtime_settings_id: None,
        backend_family: Some("tensorrt-llm".into()),
        backend_display_name: None,
        compatibility_state: "exact".into(),
        capability_snapshot: None,
        selection_reason: None,
    });
    r2.workflow_payload = json!({"nodes": [{"id": "n2"}], "edges": []});

    let (s1, _) = svc.save(r1).await.unwrap();
    let (s2, _) = svc.save(r2).await.unwrap();

    assert_ne!(s1.deployment_id, s2.deployment_id);
    assert_ne!(s1.effective_workflow_hash, s2.effective_workflow_hash);

    let d1 = repo.fetch_deployment(&s1.deployment_id).await.unwrap();
    assert_eq!(d1.slug, "a");
    let d2 = repo.fetch_deployment(&s2.deployment_id).await.unwrap();
    assert_eq!(d2.slug, "b");
}
