use nexus_deployments::id::DeploymentId;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::clone::DeploymentCloneService;
use nexus_deployments::service::export::DeploymentExportService;
use nexus_deployments::service::import::DeploymentImportService;
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

fn save_req(slug: &str) -> SaveRequest {
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
    }
}

async fn new_deployment(repo: &Arc<dyn DeploymentRepository>, slug: &str) -> DeploymentId {
    let save = DeploymentSaveService::new(repo.clone());
    let (saved, _) = save.save(save_req(slug)).await.unwrap();
    saved.deployment_id
}

const EXT: &str = "nexus.local-llm";

#[tokio::test]
async fn upsert_then_get_returns_blob_and_fingerprint() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;

    let row = repo
        .upsert_extension_settings(&dep, EXT, r#"{"model":"qwen"}"#, Some("fp-1"))
        .await
        .unwrap();
    assert_eq!(row.extension_id, EXT);
    assert_eq!(row.settings_schema_fingerprint.as_deref(), Some("fp-1"));

    let got = repo
        .get_extension_settings(&dep, EXT)
        .await
        .unwrap()
        .unwrap();
    assert_eq!(got.settings_json, r#"{"model":"qwen"}"#);
    assert_eq!(got.id, row.id);
}

#[tokio::test]
async fn get_missing_row_returns_none() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    assert!(
        repo.get_extension_settings(&dep, EXT)
            .await
            .unwrap()
            .is_none()
    );
}

#[tokio::test]
async fn upsert_is_idempotent_and_preserves_id_and_created_at() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;

    let first = repo
        .upsert_extension_settings(&dep, EXT, r#"{"v":1}"#, None)
        .await
        .unwrap();
    let second = repo
        .upsert_extension_settings(&dep, EXT, r#"{"v":2}"#, Some("fp"))
        .await
        .unwrap();

    assert_eq!(first.id, second.id, "id is stable across upsert-update");
    assert_eq!(first.created_at, second.created_at, "created_at preserved");
    assert_eq!(second.settings_json, r#"{"v":2}"#);
    assert_eq!(second.settings_schema_fingerprint.as_deref(), Some("fp"));

    let rows = repo.list_extension_settings(&dep).await.unwrap();
    assert_eq!(rows.len(), 1, "upsert does not duplicate the pair");
}

#[tokio::test]
async fn delete_removes_row_and_is_idempotent() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, EXT, "{}", None)
        .await
        .unwrap();

    repo.delete_extension_settings(&dep, EXT).await.unwrap();
    assert!(
        repo.get_extension_settings(&dep, EXT)
            .await
            .unwrap()
            .is_none()
    );
    // Second delete on an already-absent row must not error.
    repo.delete_extension_settings(&dep, EXT).await.unwrap();
}

#[tokio::test]
async fn export_bundles_settings_and_import_restores_them() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, EXT, r#"{"model":"qwen","speed":1.5}"#, Some("fp-9"))
        .await
        .unwrap();

    let env = DeploymentExportService::new(repo.clone())
        .export(&dep)
        .await
        .unwrap();
    assert_eq!(env.extension_settings.len(), 1);
    assert_eq!(env.extension_settings[0].extension_id, EXT);
    assert_eq!(env.extension_settings[0].settings["model"], json!("qwen"));
    assert_eq!(
        env.extension_settings[0].schema_fingerprint.as_deref(),
        Some("fp-9")
    );

    let (result, _events) = DeploymentImportService::new(repo.clone())
        .import(env, vec![])
        .await
        .unwrap();
    let restored = repo
        .get_extension_settings(&result.deployment_id, EXT)
        .await
        .unwrap()
        .unwrap();
    let v: serde_json::Value = serde_json::from_str(&restored.settings_json).unwrap();
    assert_eq!(v["model"], json!("qwen"));
    // Import drops the envelope's fingerprint — it is host-authoritative and
    // re-established on the next host PUT, never trusted from the import file.
    assert!(
        restored.settings_schema_fingerprint.is_none(),
        "import must not carry the fingerprint, got {:?}",
        restored.settings_schema_fingerprint
    );
}

#[tokio::test]
async fn import_persists_settings_even_with_missing_dependency() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, EXT, r#"{"k":"v"}"#, None)
        .await
        .unwrap();
    let env = DeploymentExportService::new(repo.clone())
        .export(&dep)
        .await
        .unwrap();

    let (result, _) = DeploymentImportService::new(repo.clone())
        .import(env, vec![EXT.into()])
        .await
        .unwrap();
    assert_eq!(result.state, "stale");
    assert!(
        repo.get_extension_settings(&result.deployment_id, EXT)
            .await
            .unwrap()
            .is_some(),
        "settings persist even when the extension is an unmet dependency"
    );
}

#[tokio::test]
async fn export_refuses_when_settings_blob_contains_secret() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, EXT, r#"{"api_key":"sk-test-1234"}"#, None)
        .await
        .unwrap();
    let err = DeploymentExportService::new(repo)
        .export(&dep)
        .await
        .unwrap_err();
    assert!(matches!(
        err,
        nexus_deployments::error::DeploymentError::ExportBlockedBySecret
    ));
}

#[tokio::test]
async fn clone_copies_extension_settings() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "src").await;
    repo.upsert_extension_settings(&dep, EXT, r#"{"copied":true}"#, Some("fp"))
        .await
        .unwrap();

    let (new_id, _) = DeploymentCloneService::new(repo.clone())
        .clone(&dep, "dst".into(), "dst".into())
        .await
        .unwrap();
    let copied = repo
        .get_extension_settings(&new_id, EXT)
        .await
        .unwrap()
        .unwrap();
    assert_eq!(copied.settings_json, r#"{"copied":true}"#);
    assert_eq!(copied.settings_schema_fingerprint.as_deref(), Some("fp"));
}

#[tokio::test]
async fn purge_removes_extension_settings() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "a").await;
    repo.upsert_extension_settings(&dep, EXT, "{}", None)
        .await
        .unwrap();

    repo.soft_delete(&dep).await.unwrap();
    repo.purge(&dep).await.unwrap();

    assert!(
        repo.get_extension_settings(&dep, EXT)
            .await
            .unwrap()
            .is_none(),
        "purge removes orphaned settings rows"
    );
}
