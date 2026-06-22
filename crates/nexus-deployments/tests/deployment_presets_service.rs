use nexus_deployments::id::DeploymentId;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::preset::DeploymentPresetService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

async fn repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        db.pool().clone(),
    )))
}

async fn new_deployment(repo: &Arc<dyn DeploymentRepository>, slug: &str) -> DeploymentId {
    let req = SaveRequest {
        display_name: slug.into(),
        slug: slug.into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf1".into()),
            workflow_version: None,
            recipe_id: None,
            recipe_version: None,
            extension_id: None,
            source_kind: "workflow".into(),
        },
        workflow_payload: json!({"x": 1}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let (saved, _) = DeploymentSaveService::new(repo.clone()).save(req).await.unwrap();
    saved.deployment_id
}

const RK: &str = "nexus.test.recipe";

#[tokio::test]
async fn create_from_deployment_snapshots_settings_under_recipe_key() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, "test.ext", r#"{"speed":1.5}"#, None)
        .await
        .unwrap();

    let svc = DeploymentPresetService::new(repo.clone());
    let row = svc
        .create_from_deployment(&dep, RK, Some("test.ext"), "Cinematic", Some("nice"))
        .await
        .unwrap();

    assert_eq!(row.recipe_key, RK);
    assert_eq!(row.name, "Cinematic");
    // payload is the export envelope; it must contain the snapshot settings.
    assert!(row.payload_json.contains("\"speed\""), "payload carries settings");

    let listed = svc.list(RK).await.unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].id, row.id);
}

#[tokio::test]
async fn duplicate_name_in_same_recipe_is_conflict() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    let svc = DeploymentPresetService::new(repo.clone());
    svc.create_from_deployment(&dep, RK, None, "dup", None).await.unwrap();
    let err = svc
        .create_from_deployment(&dep, RK, None, "dup", None)
        .await
        .unwrap_err();
    assert!(matches!(
        err,
        nexus_deployments::error::DeploymentError::PresetNameConflict(_)
    ));
}

#[tokio::test]
async fn create_from_envelope_rejects_secret_payload() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    // Build a real envelope by snapshotting, then inject a secret into settings.
    repo.upsert_extension_settings(&dep, "test.ext", r#"{"api_key":"sk-leak"}"#, None)
        .await
        .unwrap();
    let envelope = nexus_deployments::service::export::DeploymentExportService::new(repo.clone())
        .export(&dep)
        .await;
    // Export itself blocks secrets, so synthesize an envelope to feed the API path.
    let env = nexus_deployments::service::export::ExportEnvelope {
        package_version: 1,
        deployment: json!({ "display_name": "x" }),
        revisions: vec![json!({})],
        extension_settings: vec![nexus_deployments::service::export::ExtensionSettingsBundle {
            extension_id: "test.ext".into(),
            settings: json!({ "password": "hunter2" }),
            schema_fingerprint: None,
        }],
        integrity: nexus_deployments::service::export::Integrity {
            hash_algo: "x".into(),
            digest: "0".repeat(64),
        },
    };
    let _ = envelope; // export(secret) already errors; this test targets the envelope path.
    let svc = DeploymentPresetService::new(repo.clone());
    let err = svc
        .create_from_envelope(&dep, RK, None, env, "FromFile", None)
        .await
        .unwrap_err();
    assert!(matches!(
        err,
        nexus_deployments::error::DeploymentError::ExportBlockedBySecret
    ));
}

#[tokio::test]
async fn rename_then_delete() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    let svc = DeploymentPresetService::new(repo.clone());
    let row = svc.create_from_deployment(&dep, RK, None, "one", None).await.unwrap();

    let renamed = svc.rename(&row.id, "two", Some("d2")).await.unwrap();
    assert_eq!(renamed.name, "two");
    assert_eq!(renamed.description.as_deref(), Some("d2"));

    svc.delete(&row.id).await.unwrap();
    assert!(svc.list(RK).await.unwrap().is_empty());
}
