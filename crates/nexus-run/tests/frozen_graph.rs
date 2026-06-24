use std::path::Path;
use std::sync::Arc;

use nexus_events::bus::BroadcastEventBus;
use nexus_protocol::RuntimeFamily;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::records::OperatorRecord;
use nexus_storage::{Database, SqliteDatabase, WorkflowRecord};
use nexus_worker::manager::{WorkerInfo, WorkerManager};
use nexus_worker::process::WorkerStatus;

/// Worker manager test double: reports one Ready worker that handles every
/// operator. Lets `execute_run` complete its placeholder plan without spawning
/// a real process, so tests can assert on the planned node set.
struct FakeWorkerManager {
    operator_ids: Vec<String>,
}

impl WorkerManager for FakeWorkerManager {
    fn start_worker(
        &self,
        _extension_id: &str,
        _runtime_family: RuntimeFamily,
        _extension_dir: &Path,
        _entrypoint: &str,
    ) -> impl std::future::Future<Output = Result<String, nexus_worker::error::WorkerError>> + Send
    {
        async { Ok("worker-fake".to_string()) }
    }

    fn stop_worker(
        &self,
        _worker_id: &str,
    ) -> impl std::future::Future<Output = Result<(), nexus_worker::error::WorkerError>> + Send
    {
        async { Ok(()) }
    }

    fn list_workers(&self) -> impl std::future::Future<Output = Vec<WorkerInfo>> + Send {
        let ops = self.operator_ids.clone();
        async move {
            vec![WorkerInfo {
                worker_id: "worker-fake".to_string(),
                extension_id: "ext".to_string(),
                status: WorkerStatus::Ready,
                operator_ids: ops,
                session_id: None,
                supported_methods: Vec::new(),
            }]
        }
    }

    fn get_worker_for_operator(
        &self,
        operator_id: &str,
        _runtime_family: &RuntimeFamily,
    ) -> impl std::future::Future<Output = Option<String>> + Send {
        let known = self.operator_ids.iter().any(|id| id == operator_id);
        async move { known.then(|| "worker-fake".to_string()) }
    }

    fn health_check_all(
        &self,
    ) -> impl std::future::Future<
        Output = Vec<(String, Result<(), nexus_worker::error::WorkerError>)>,
    > + Send {
        async { Vec::new() }
    }
}

fn extension_record() -> nexus_storage::ExtensionRecord {
    nexus_storage::ExtensionRecord {
        id: "ext".into(),
        name: Some("Ext".into()),
        version: "0.1".into(),
        description: None,
        publisher: None,
        host_api_compat: "0.1".into(),
        protocol_compat: "0.1".into(),
        runtime_family: "python".into(),
        entrypoint: "main.py".into(),
        capabilities: None,
        status: "active".into(),
        directory: "/ext".into(),
        installed_at: "2026-06-24T00:00:00Z".into(),
        recipe_count: None,
        ui_contribution_count: None,
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

fn operator_record(id: &str) -> OperatorRecord {
    OperatorRecord {
        id: id.into(),
        version: "0.1".into(),
        extension_id: "ext".into(),
        display_name: Some(id.into()),
        description: None,
        category: None,
        inputs: "[]".into(),
        outputs: "[]".into(),
        config_schema: None,
        execution_mode: Some("inference".into()),
        cacheable: Some(0),
        resumable: Some(0),
        resource_hints: None,
    }
}

fn single_node_workflow(id: &str, node_id: &str, operator: &str) -> nexus_workflow::Workflow {
    nexus_workflow::Workflow {
        id: id.into(),
        title: "wf".into(),
        version: "v1".into(),
        inputs: Vec::new(),
        outputs: Vec::new(),
        nodes: vec![nexus_workflow::NodeInstance {
            id: node_id.into(),
            operator: operator.into(),
            stage: None,
            inputs: std::collections::HashMap::new(),
            config: None,
        }],
        stages: Vec::new(),
        created_at: "2026-06-24T00:00:00Z".into(),
        updated_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn workflow_to_record(wf: &nexus_workflow::Workflow) -> WorkflowRecord {
    WorkflowRecord {
        id: wf.id.clone(),
        title: wf.title.clone(),
        version: wf.version.clone(),
        inputs: Some(serde_json::to_string(&wf.inputs).unwrap()),
        outputs: Some(serde_json::to_string(&wf.outputs).unwrap()),
        nodes: serde_json::to_string(&wf.nodes).unwrap(),
        edges: "[]".into(),
        stages: Some(serde_json::to_string(&wf.stages).unwrap()),
        created_at: wf.created_at.clone(),
        updated_at: wf.updated_at.clone(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn resolved_run(wf: nexus_workflow::Workflow) -> nexus_recipe::ResolvedRun {
    let mut inputs = serde_json::Map::new();
    inputs.insert("seed".into(), serde_json::json!(42));
    nexus_recipe::ResolvedRun {
        workflow_id: wf.id.clone(),
        workflow_version: wf.version.clone(),
        resolved_workflow: wf,
        resolved_inputs: inputs,
        applied_controls: Vec::new(),
    }
}

async fn build_engine(
    db: Arc<SqliteDatabase>,
    operator_ids: Vec<String>,
) -> DefaultRunEngine<FakeWorkerManager> {
    let workers = Arc::new(FakeWorkerManager { operator_ids });
    let artifacts = Arc::new(nexus_artifact::FilesystemArtifactStore::new(
        tempfile::tempdir().unwrap().keep(),
    ));
    let event_bus = Arc::new(BroadcastEventBus::new(64));
    let scheduler = Arc::new(RoundRobinScheduler);
    DefaultRunEngine::new(db, workers, artifacts, event_bus, scheduler)
}

#[tokio::test]
async fn create_run_from_resolved_persists_frozen_graph() {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let wf = single_node_workflow("wf1", "frozen_node", "op.b@0.1");
    db.insert_workflow(&workflow_to_record(&wf)).await.unwrap();

    let engine = build_engine(db.clone(), vec!["op.b".into()]).await;
    let run_id = engine
        .create_run_from_resolved(&resolved_run(wf))
        .await
        .unwrap();

    // RunRecord exists.
    let run = db.get_run(&run_id).await.unwrap();
    assert_eq!(run.workflow_id, "wf1");
    assert_eq!(run.workflow_version, "v1");

    // Frozen graph carries the resolved node set + resolved inputs.
    let frozen = db.get_run_resolved_graph(&run_id).await.unwrap();
    assert!(
        frozen.nodes.contains("frozen_node"),
        "frozen graph must carry the resolved node: {}",
        frozen.nodes
    );
    assert_eq!(frozen.resolved_inputs, r#"{"seed":42}"#);
}

#[tokio::test]
async fn execute_run_plans_from_frozen_graph_not_head() {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());

    // Head workflow has graph A (node head_only / op.a).
    let head = single_node_workflow("wf1", "head_only", "op.a@0.1");
    db.insert_workflow(&workflow_to_record(&head))
        .await
        .unwrap();
    db.insert_extension(&extension_record()).await.unwrap();
    db.insert_operator(&operator_record("op.a")).await.unwrap();
    db.insert_operator(&operator_record("op.b")).await.unwrap();

    // Frozen graph B has a DIFFERENT node set (frozen_only / op.b).
    let frozen = single_node_workflow("wf1", "frozen_only", "op.b@0.1");

    let engine = build_engine(db.clone(), vec!["op.a".into(), "op.b".into()]).await;
    let run_id = engine
        .create_run_from_resolved(&resolved_run(frozen))
        .await
        .unwrap();

    engine.execute_run(&run_id).await.unwrap();

    let executed = db.get_node_executions_for_run(&run_id).await.unwrap();
    let node_ids: Vec<&str> = executed.iter().map(|n| n.node_id.as_str()).collect();
    assert!(
        node_ids.contains(&"frozen_only"),
        "execute_run must plan from frozen graph B: {node_ids:?}"
    );
    assert!(
        !node_ids.contains(&"head_only"),
        "execute_run must NOT plan from mutable head graph A: {node_ids:?}"
    );
}

#[tokio::test]
async fn execute_run_falls_back_to_head_for_legacy_create_run() {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());

    let head = single_node_workflow("wf1", "head_node", "op.a@0.1");
    db.insert_workflow(&workflow_to_record(&head))
        .await
        .unwrap();
    db.insert_extension(&extension_record()).await.unwrap();
    db.insert_operator(&operator_record("op.a")).await.unwrap();

    let engine = build_engine(db.clone(), vec!["op.a".into()]).await;
    let run_id = engine.create_run("wf1").await.unwrap();

    // No frozen graph exists for a legacy create_run.
    assert!(db.get_run_resolved_graph(&run_id).await.is_err());

    engine.execute_run(&run_id).await.unwrap();

    let executed = db.get_node_executions_for_run(&run_id).await.unwrap();
    let node_ids: Vec<&str> = executed.iter().map(|n| n.node_id.as_str()).collect();
    assert!(
        node_ids.contains(&"head_node"),
        "legacy run must plan from head workflow: {node_ids:?}"
    );
}
