use nexus_deployments::repository::{DeploymentRepository, NewPreset};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use std::sync::Arc;

async fn repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        db.pool().clone(),
    )))
}

fn new_preset(id: &str, recipe_key: &str, name: &str) -> NewPreset {
    NewPreset {
        id: id.into(),
        recipe_key: recipe_key.into(),
        source_extension_id: Some("test.extension".into()),
        name: name.into(),
        description: Some("desc".into()),
        payload_json: r#"{"package_version":1}"#.into(),
        integrity_digest: "abc".into(),
        created_from_deployment_id: Some("dep_x".into()),
        created_at: "2026-06-22T00:00:00Z".into(),
        updated_at: "2026-06-22T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn insert_get_list_scopes_by_recipe_key() {
    let repo = repo().await;
    repo.insert_preset(new_preset("p1", "rk-A", "alpha")).await.unwrap();
    repo.insert_preset(new_preset("p2", "rk-A", "beta")).await.unwrap();
    repo.insert_preset(new_preset("p3", "rk-B", "gamma")).await.unwrap();

    let a = repo.list_presets_by_recipe_key("rk-A").await.unwrap();
    assert_eq!(a.len(), 2, "rk-A has two presets");
    assert_eq!(a[0].name, "alpha", "ordered by name");
    assert_eq!(a[1].name, "beta");

    let one = repo.get_preset("p1").await.unwrap();
    assert_eq!(one.recipe_key, "rk-A");
    assert_eq!(one.payload_json, r#"{"package_version":1}"#);
}

#[tokio::test]
async fn get_missing_preset_is_not_found() {
    let repo = repo().await;
    let err = repo.get_preset("nope").await.unwrap_err();
    assert!(matches!(
        err,
        nexus_deployments::error::DeploymentError::PresetNotFound(_)
    ));
}

#[tokio::test]
async fn update_and_delete_report_not_found_on_missing() {
    let repo = repo().await;
    repo.insert_preset(new_preset("p1", "rk-A", "alpha")).await.unwrap();

    repo.update_preset_meta("p1", "renamed", None).await.unwrap();
    assert_eq!(repo.get_preset("p1").await.unwrap().name, "renamed");

    repo.delete_preset("p1").await.unwrap();
    assert!(matches!(
        repo.get_preset("p1").await.unwrap_err(),
        nexus_deployments::error::DeploymentError::PresetNotFound(_)
    ));
    assert!(matches!(
        repo.delete_preset("p1").await.unwrap_err(),
        nexus_deployments::error::DeploymentError::PresetNotFound(_)
    ));
}

#[tokio::test]
async fn unique_recipe_key_name_is_enforced() {
    let repo = repo().await;
    repo.insert_preset(new_preset("p1", "rk-A", "dup")).await.unwrap();
    // Same (recipe_key, name), different id — must violate the UNIQUE index.
    let err = repo.insert_preset(new_preset("p2", "rk-A", "dup")).await;
    assert!(err.is_err(), "UNIQUE(recipe_key, name) must reject a duplicate name");
}
