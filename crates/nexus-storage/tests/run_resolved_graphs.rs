use nexus_storage::{Database, RunRecord, RunResolvedGraphRecord, SqliteDatabase, WorkflowRecord};

async fn fresh_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn make_workflow(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "Sample".into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-06-24T00:00:00Z".into(),
        updated_at: "2026-06-24T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn make_run(id: &str, workflow_id: &str) -> RunRecord {
    RunRecord {
        id: id.into(),
        workflow_id: workflow_id.into(),
        workflow_version: "v1".into(),
        status: "created".into(),
        started_at: None,
        completed_at: None,
        error: None,
        created_at: "2026-06-24T00:00:00Z".into(),
        run_label: None,
        execution_profile: None,
        predecessor_run_id: None,
    }
}

fn make_graph(run_id: &str) -> RunResolvedGraphRecord {
    RunResolvedGraphRecord {
        run_id: run_id.into(),
        workflow_id: "wf1".into(),
        workflow_version: "v1".into(),
        nodes: r#"[{"id":"frozen_node","operator":"op.a","stage":null,"inputs":{},"config":null}]"#
            .into(),
        edges: "[]".into(),
        inputs: "[]".into(),
        outputs: "[]".into(),
        stages: "[]".into(),
        resolved_inputs: r#"{"seed":42}"#.into(),
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn migration_028_creates_run_resolved_graphs_table() {
    let db = fresh_db().await;
    let table = sqlx::query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='run_resolved_graphs'",
    )
    .fetch_optional(db.pool())
    .await
    .unwrap();
    assert!(
        table.is_some(),
        "run_resolved_graphs table missing after migration 028"
    );

    let cols: Vec<String> = sqlx::query_scalar(
        "SELECT name FROM pragma_table_info('run_resolved_graphs') ORDER BY name",
    )
    .fetch_all(db.pool())
    .await
    .unwrap();
    for expected in [
        "created_at",
        "edges",
        "inputs",
        "nodes",
        "outputs",
        "resolved_inputs",
        "run_id",
        "stages",
        "workflow_id",
        "workflow_version",
    ] {
        assert!(
            cols.iter().any(|c| c == expected),
            "missing column {expected} in run_resolved_graphs: {cols:?}"
        );
    }
}

#[tokio::test]
async fn inserts_and_reads_run_resolved_graph() {
    let db = fresh_db().await;
    db.insert_workflow(&make_workflow("wf1")).await.unwrap();
    db.insert_run(&make_run("run1", "wf1")).await.unwrap();

    let record = make_graph("run1");
    db.insert_run_resolved_graph(&record).await.unwrap();

    let read = db.get_run_resolved_graph("run1").await.unwrap();
    assert_eq!(read.run_id, "run1");
    assert_eq!(read.workflow_id, "wf1");
    assert_eq!(read.workflow_version, "v1");
    assert_eq!(read.nodes, record.nodes);
    assert_eq!(read.edges, "[]");
    assert_eq!(read.inputs, "[]");
    assert_eq!(read.resolved_inputs, r#"{"seed":42}"#);
}

#[tokio::test]
async fn get_run_resolved_graph_missing_is_not_found() {
    let db = fresh_db().await;
    assert!(
        db.get_run_resolved_graph("ghost").await.is_err(),
        "reading a missing frozen graph must error, not silently no-op"
    );
}
