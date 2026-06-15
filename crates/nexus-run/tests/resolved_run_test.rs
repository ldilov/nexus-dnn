use std::sync::Arc;

use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::BroadcastEventBus;
use nexus_run::{DefaultRunEngine, ResolvedRunInput};
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::Database;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;

async fn build_engine() -> (Arc<SqliteDatabase>, DefaultRunEngine<DefaultWorkerManager>) {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let event_bus = Arc::new(BroadcastEventBus::new(64));
    let workers = Arc::new(DefaultWorkerManager::new(event_bus.clone()));
    let artifacts_dir =
        std::env::temp_dir().join(format!("nexus-run-test-{}", uuid::Uuid::new_v4()));
    let artifacts = Arc::new(FilesystemArtifactStore::new(artifacts_dir));
    let scheduler = Arc::new(RoundRobinScheduler);
    let engine = DefaultRunEngine::new(db.clone(), workers, artifacts, event_bus, scheduler);
    (db, engine)
}

async fn seed_workflow(db: &SqliteDatabase) {
    db.insert_workflow(&nexus_storage::records::WorkflowRecord {
        id: "wf".into(),
        title: "frozen".into(),
        version: "1".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "t".into(),
        updated_at: "t".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    })
    .await
    .unwrap();
}

fn frozen_workflow_json() -> String {
    serde_json::json!({
        "id": "wf",
        "title": "frozen",
        "version": "1",
        "inputs": [],
        "outputs": [],
        "nodes": [],
        "stages": [],
        "created_at": "t",
        "updated_at": "t"
    })
    .to_string()
}

#[tokio::test]
async fn create_run_from_resolved_persists_frozen_graph() {
    let (db, engine) = build_engine().await;
    seed_workflow(&db).await;

    let run_id = engine
        .create_run_from_resolved(&ResolvedRunInput {
            workflow_id: "wf".into(),
            workflow_version: "1".into(),
            workflow_json: frozen_workflow_json(),
            inputs_values_json: r#"{"script":"hello"}"#.into(),
        })
        .await
        .unwrap();

    let run = db.get_run(&run_id).await.unwrap();
    assert_eq!(run.workflow_id, "wf");
    assert_eq!(run.workflow_version, "1");
    assert_eq!(run.status, "created");

    let frozen = db.get_run_resolved_graph(&run_id).await.unwrap().unwrap();
    assert_eq!(frozen.workflow_version, "1");
    assert!(frozen.inputs_values_json.contains("\"script\":\"hello\""));
    serde_json::from_str::<nexus_workflow::Workflow>(&frozen.workflow_json).unwrap();
}

#[tokio::test]
async fn execute_run_plans_from_frozen_graph() {
    let (db, engine) = build_engine().await;
    seed_workflow(&db).await;

    let run_id = engine
        .create_run_from_resolved(&ResolvedRunInput {
            workflow_id: "wf".into(),
            workflow_version: "1".into(),
            workflow_json: frozen_workflow_json(),
            inputs_values_json: "{}".into(),
        })
        .await
        .unwrap();

    engine.execute_run(&run_id).await.unwrap();

    let run = db.get_run(&run_id).await.unwrap();
    assert_eq!(run.status, "completed");
}
