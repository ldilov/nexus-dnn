//! In-deployment import-replace (`DeploymentImportService::import_into`).
//!
//! Covers the spec test plan: config replaced as a new active revision while
//! identity is kept, stale ext-settings rows deleted, 404 on unknown target,
//! 409 on module mismatch, opaque settings store, and the service-level
//! rollback guarantee (a rejected replace leaves the deployment untouched).

use nexus_deployments::error::DeploymentError;
use nexus_deployments::id::DeploymentId;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::export::{ExportEnvelope, ExtensionSettingsBundle, Integrity};
use nexus_deployments::service::import::DeploymentImportService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

// Generic sentinel — these tests exercise host-generic repository behaviour and
// must not couple to a real extension id (host-extension boundary).
const EXT: &str = "test.extension";

async fn repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        db.pool().clone(),
    )))
}

fn save_req(slug: &str) -> SaveRequest {
    SaveRequest {
        display_name: format!("display-{slug}"),
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

/// Build an export-style envelope. `binding` is the value placed in the
/// deployment JSON's `source_extension_id` (None = no module binding).
fn envelope(
    binding: Option<&str>,
    hash: &str,
    bundles: Vec<ExtensionSettingsBundle>,
) -> ExportEnvelope {
    let deployment = match binding {
        Some(b) => json!({ "display_name": "from-file", "source_extension_id": b }),
        None => json!({ "display_name": "from-file" }),
    };
    ExportEnvelope {
        package_version: 1,
        deployment,
        revisions: vec![json!({
            "effective_workflow_hash": hash,
            "mapping_state": "custom"
        })],
        extension_settings: bundles,
        integrity: Integrity {
            hash_algo: "sha256-jcs-rfc8785".into(),
            digest: "0".repeat(64),
        },
    }
}

fn bundle(ext: &str, settings: serde_json::Value) -> ExtensionSettingsBundle {
    ExtensionSettingsBundle {
        extension_id: ext.into(),
        settings,
        schema_fingerprint: None,
    }
}

#[tokio::test]
async fn replace_overwrites_config_and_settings_keeping_identity() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "target").await;

    let before = repo.fetch_deployment(&dep).await.unwrap();
    let original_rev = before.current_revision_id.clone().unwrap();

    repo.upsert_extension_settings(&dep, EXT, r#"{"old":true}"#, Some("fp-old"))
        .await
        .unwrap();

    let env = envelope(
        None,
        &"a".repeat(64),
        vec![bundle(EXT, json!({"new": true, "speed": 2}))],
    );
    let (result, _events) = DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec![])
        .await
        .unwrap();

    assert_eq!(result.deployment_id, dep, "identity (id) preserved");
    assert_eq!(result.state, "saved");
    assert_eq!(result.diagnostics_count, 0);

    let after = repo.fetch_deployment(&dep).await.unwrap();
    // Identity fields untouched.
    assert_eq!(after.slug, before.slug);
    assert_eq!(after.display_name, before.display_name);
    assert_eq!(after.created_at, before.created_at);
    // Recomputed state is persisted to the row, not just returned in-memory.
    assert_eq!(
        after.state, "saved",
        "state persisted to the deployments row"
    );
    assert_eq!(after.restore_state, "fully_restorable");
    // A NEW active revision replaced the old one.
    let new_rev = after.current_revision_id.clone().unwrap();
    assert_ne!(new_rev, original_rev, "active revision advanced");
    let rev = repo.fetch_revision(&new_rev).await.unwrap();
    assert_eq!(rev.effective_workflow_hash, "a".repeat(64));
    assert_eq!(rev.revision_number, 2, "old revision retained, new is #2");

    // Old revision still on disk (audit trail / reversibility).
    assert!(repo.fetch_revision(&original_rev).await.is_ok());

    // Settings replaced by the file's bundle.
    let got = repo
        .get_extension_settings(&dep, EXT)
        .await
        .unwrap()
        .unwrap();
    let v: serde_json::Value = serde_json::from_str(&got.settings_json).unwrap();
    assert_eq!(v["new"], json!(true));
    assert_eq!(v.get("old"), None, "old settings keys gone");
}

#[tokio::test]
async fn stale_settings_rows_are_deleted() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "target").await;

    repo.upsert_extension_settings(&dep, "ext.gone", r#"{"x":1}"#, None)
        .await
        .unwrap();
    repo.upsert_extension_settings(&dep, "ext.keep", r#"{"x":2}"#, None)
        .await
        .unwrap();

    // File only carries ext.keep — ext.gone is a stale row and must vanish.
    let env = envelope(
        None,
        &"b".repeat(64),
        vec![bundle("ext.keep", json!({"x": 99}))],
    );
    DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec![])
        .await
        .unwrap();

    let rows = repo.list_extension_settings(&dep).await.unwrap();
    assert_eq!(rows.len(), 1, "only the file's bundle remains");
    assert_eq!(rows[0].extension_id, "ext.keep");
    assert!(
        repo.get_extension_settings(&dep, "ext.gone")
            .await
            .unwrap()
            .is_none(),
        "stale row deleted"
    );
}

#[tokio::test]
async fn unknown_target_is_not_found() {
    let repo = repo().await;
    let phantom = DeploymentId::new_v7();
    let env = envelope(None, &"c".repeat(64), vec![]);

    let err = DeploymentImportService::new(repo)
        .import_into(&phantom, env, vec![])
        .await
        .unwrap_err();
    assert!(
        matches!(err, DeploymentError::NotFound(id) if id == phantom),
        "unknown target → NotFound (404)"
    );
}

#[tokio::test]
async fn module_mismatch_is_conflict_and_leaves_target_untouched() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "target").await;
    // Bind the target to module A via its primary source link.
    repo.upsert_extension_settings(&dep, EXT, r#"{"keep":"me"}"#, None)
        .await
        .unwrap();
    let before = repo.fetch_deployment(&dep).await.unwrap();
    let original_rev = before.current_revision_id.clone().unwrap();

    // The stored deployment has no source_extension_id binding; the envelope
    // claims a binding → mismatch (None vs Some).
    let env = envelope(Some("nexus.other-module"), &"d".repeat(64), vec![]);
    let err = DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec![])
        .await
        .unwrap_err();
    match err {
        DeploymentError::ModuleMismatch { expected, found } => {
            assert_eq!(expected, "");
            assert_eq!(found, "nexus.other-module");
        }
        other => panic!("expected ModuleMismatch, got {other:?}"),
    }

    // Rollback guarantee: the destructive replace ran AFTER the guard, so the
    // deployment is byte-for-byte what it was before the failed call.
    let after = repo.fetch_deployment(&dep).await.unwrap();
    assert_eq!(after.current_revision_id, Some(original_rev));
    let got = repo
        .get_extension_settings(&dep, EXT)
        .await
        .unwrap()
        .unwrap();
    assert_eq!(got.settings_json, r#"{"keep":"me"}"#);
}

#[tokio::test]
async fn matching_binding_is_accepted() {
    let repo = repo().await;
    // Create a deployment bound to a module via the save source.extension_id.
    let save = DeploymentSaveService::new(repo.clone());
    let mut req = save_req("bound");
    req.source.extension_id = Some("nexus.bound".into());
    req.source.source_kind = "recipe".into();
    let (saved, _) = save.save(req).await.unwrap();
    let dep = saved.deployment_id;

    let bound = repo.fetch_deployment(&dep).await.unwrap();
    let binding = bound.source_extension_id.clone();
    assert_eq!(binding.as_deref(), Some("nexus.bound"));

    // Envelope carries the same binding → accepted.
    let env = envelope(binding.as_deref(), &"e".repeat(64), vec![]);
    let (result, _) = DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec![])
        .await
        .unwrap();
    assert_eq!(result.deployment_id, dep);
}

#[tokio::test]
async fn settings_are_stored_opaquely_with_host_fingerprint() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "target").await;

    // Mirror the handler: bundles arrive with a host-recomputed fingerprint
    // (None when absent / no schema). The service persists it verbatim.
    let mut b = bundle("ext.absent", json!({"arbitrary": [1, 2, 3]}));
    b.schema_fingerprint = Some("host-fp".into());
    let env = envelope(None, &"f".repeat(64), vec![b]);

    DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec![])
        .await
        .unwrap();

    let got = repo
        .get_extension_settings(&dep, "ext.absent")
        .await
        .unwrap()
        .unwrap();
    let v: serde_json::Value = serde_json::from_str(&got.settings_json).unwrap();
    assert_eq!(v["arbitrary"], json!([1, 2, 3]), "blob stored opaquely");
    assert_eq!(
        got.settings_schema_fingerprint.as_deref(),
        Some("host-fp"),
        "host-recomputed fingerprint persisted as-is"
    );
}

#[tokio::test]
async fn missing_dependency_lands_stale_with_diagnostics() {
    let repo = repo().await;
    let dep = new_deployment(&repo, "target").await;

    let env = envelope(
        None,
        &"a".repeat(64),
        vec![bundle("ext.absent", json!({"k": "v"}))],
    );
    let (result, _) = DeploymentImportService::new(repo.clone())
        .import_into(&dep, env, vec!["ext.absent".into()])
        .await
        .unwrap();

    assert_eq!(result.state, "stale", "missing dep → stale");
    assert_eq!(result.diagnostics_count, 1);
    // The stale state must be persisted to the row, not only returned.
    let after = repo.fetch_deployment(&dep).await.unwrap();
    assert_eq!(
        after.state, "stale",
        "stale persisted to the deployments row"
    );
    assert_eq!(after.restore_state, "restorable_with_degraded_features");
    assert!(
        repo.get_extension_settings(&dep, "ext.absent")
            .await
            .unwrap()
            .is_some(),
        "settings ride along even for an absent extension"
    );
}
