use nexus_extension::OperatorDefinition;
use nexus_storage::{Database, WorkflowRecord, WorkflowVersionRecord};
use nexus_workflow::{
    NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort, WorkflowVersionSnapshot,
};

use crate::error::ApiError;

/// Append a new immutable `workflow_versions` row only when the workflow's
/// content hash differs from the latest version for `author_kind`, advancing
/// `current_version` to it. No-op (returns the existing version) on identical
/// content. The caller is responsible for not invoking this on a user-pinned
/// head it must not move (the boot re-persist skip-guard handles that).
pub async fn append_workflow_version_if_changed(
    db: &impl Database,
    workflow: &Workflow,
    operators: &[OperatorDefinition],
    author_kind: &str,
    extension_id: Option<&str>,
    extension_version: Option<&str>,
    label: Option<&str>,
    now: &str,
) -> Result<String, ApiError> {
    let canonical = nexus_workflow::canonical_hash(workflow);

    if let Some(latest) = db
        .latest_workflow_version_for_author(&workflow.id, author_kind)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        && latest.canonical_hash == canonical
    {
        return Ok(latest.version);
    }

    let operator_schema_hash = nexus_workflow::operator_schema_hash(workflow, operators);
    let record = build_version_record(
        workflow,
        &canonical,
        &operator_schema_hash,
        author_kind,
        extension_id,
        extension_version,
        label,
        now,
    )?;
    db.append_workflow_version(&record, now)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))
}

/// Forward data migration: seed exactly one immutable version per existing
/// `workflows` row that has no head pointer yet. `author_kind` is derived from
/// `user_edited_at` (`Some` → `user`, else `extension`); `label` carries the
/// row's declared version. Idempotent — rows that already have a
/// `current_version` are skipped, so re-running is a no-op. Returns the number
/// of rows seeded. Must run BEFORE extension re-persist at boot.
pub async fn seed_workflow_versions(
    db: &impl Database,
    operators: &[OperatorDefinition],
    now: &str,
) -> Result<usize, ApiError> {
    let rows = db
        .list_workflows()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let mut seeded = 0usize;
    for row in rows {
        let already_seeded = db
            .get_current_version(&row.id)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?
            .is_some();
        if already_seeded {
            continue;
        }

        // Isolate per-row failures: a single bad row must not abort seeding the
        // rest (idempotent retry on the next boot reaches it again).
        match seed_one_workflow(db, &row, operators, now).await {
            Ok(()) => seeded += 1,
            Err(e) => {
                tracing::warn!(workflow_id = %row.id, error = %e, "seed workflow version failed; skipping");
            }
        }
    }

    Ok(seeded)
}

/// Seed exactly one row: append its v1 (author_kind from `user_edited_at`,
/// `label` from the row's version) and pin the head. The explicit
/// `set_current_version` is the self-heal: it restores the head even when a
/// prior partial seed already wrote the version row (append no-ops then).
async fn seed_one_workflow(
    db: &impl Database,
    row: &WorkflowRecord,
    operators: &[OperatorDefinition],
    now: &str,
) -> Result<(), ApiError> {
    let workflow = workflow_from_record(row)?;
    let author_kind = if row.user_edited_at.is_some() {
        "user"
    } else {
        "extension"
    };
    let label = if row.version.is_empty() {
        "1.0.0"
    } else {
        row.version.as_str()
    };

    let version = append_workflow_version_if_changed(
        db,
        &workflow,
        operators,
        author_kind,
        row.extension_id.as_deref(),
        row.extension_version.as_deref(),
        Some(label),
        now,
    )
    .await?;
    db.set_current_version(&row.id, &version, now)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(())
}

/// Re-point the workflow head to the latest extension-authored version: mirror
/// that immutable version's stored content onto the head row, clear
/// `user_edited_at`, and advance `current_version` — all without a reboot. The
/// user-authored version stays in history (append-only). No-op returning
/// `false` when the workflow has no extension-authored version to revert to.
pub async fn revert_head_to_latest_extension(
    db: &impl Database,
    workflow_id: &str,
    now: &str,
) -> Result<bool, ApiError> {
    let Some(ext_version) = db
        .latest_workflow_version_for_author(workflow_id, "extension")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
    else {
        return Ok(false);
    };

    let existing = db
        .get_workflow(workflow_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let head_version = ext_version
        .label
        .clone()
        .unwrap_or_else(|| existing.version.clone());

    db.revert_head_to_version(&ext_version, &head_version, now)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(true)
}

/// Build a host `Workflow` from a persisted head row, parsing its JSON content
/// columns. Edges are derived from node inputs, so the stored `edges` column is
/// not needed here.
fn workflow_from_record(record: &WorkflowRecord) -> Result<Workflow, ApiError> {
    let nodes: Vec<NodeInstance> = serde_json::from_str(&record.nodes)
        .map_err(|e| ApiError::Internal(format!("workflow nodes: {e}")))?;
    let inputs: Vec<WorkflowPort> = parse_json_array(record.inputs.as_deref())?;
    let outputs: Vec<OutputBinding> = parse_json_array(record.outputs.as_deref())?;
    let stages: Vec<Stage> = parse_json_array(record.stages.as_deref())?;

    Ok(Workflow {
        id: record.id.clone(),
        title: record.title.clone(),
        version: record.version.clone(),
        inputs,
        outputs,
        nodes,
        stages,
        created_at: record.created_at.clone(),
        updated_at: record.updated_at.clone(),
    })
}

/// Parse an immutable version record's JSON columns into a host `Workflow`
/// and assemble the C2 `WorkflowVersionSnapshot` (caller passes the registry
/// slice, keeping `nexus-workflow` registry-free).
pub fn record_to_snapshot(
    record: &WorkflowVersionRecord,
    operators: &[OperatorDefinition],
) -> Result<WorkflowVersionSnapshot, ApiError> {
    let nodes: Vec<NodeInstance> = serde_json::from_str(&record.nodes)
        .map_err(|e| ApiError::Internal(format!("workflow version nodes: {e}")))?;
    let inputs: Vec<WorkflowPort> = parse_json_array(record.inputs.as_deref())?;
    let outputs: Vec<OutputBinding> = parse_json_array(record.outputs.as_deref())?;
    let stages: Vec<Stage> = parse_json_array(record.stages.as_deref())?;

    let workflow = Workflow {
        id: record.workflow_id.clone(),
        title: String::new(),
        version: record.label.clone().unwrap_or_default(),
        inputs,
        outputs,
        nodes,
        stages,
        created_at: record.created_at.clone(),
        updated_at: record.created_at.clone(),
    };

    Ok(WorkflowVersionSnapshot::from_workflow(
        record.workflow_id.clone(),
        record.version.clone(),
        record.canonical_hash.clone(),
        workflow,
        operators,
    ))
}

fn parse_json_array<T: serde::de::DeserializeOwned>(raw: Option<&str>) -> Result<Vec<T>, ApiError> {
    match raw {
        Some(s) => serde_json::from_str(s).map_err(|e| ApiError::Internal(e.to_string())),
        None => Ok(Vec::new()),
    }
}

/// Build the immutable version record. `version` is left empty — the server
/// allocates the monotonic id atomically inside `Database::append_workflow_version`.
fn build_version_record(
    workflow: &Workflow,
    canonical_hash: &str,
    operator_schema_hash: &str,
    author_kind: &str,
    extension_id: Option<&str>,
    extension_version: Option<&str>,
    label: Option<&str>,
    now: &str,
) -> Result<WorkflowVersionRecord, ApiError> {
    let edge_values: Vec<serde_json::Value> = workflow
        .extract_edges()
        .iter()
        .map(|e| {
            serde_json::json!({
                "source_node": e.source_node,
                "source_port": e.source_port,
                "target_node": e.target_node,
                "target_port": e.target_port,
            })
        })
        .collect();

    Ok(WorkflowVersionRecord {
        workflow_id: workflow.id.clone(),
        version: String::new(),
        label: label.map(str::to_owned),
        canonical_hash: canonical_hash.to_owned(),
        operator_schema_hash: operator_schema_hash.to_owned(),
        nodes: serde_json::to_string(&workflow.nodes)
            .map_err(|e| ApiError::Internal(e.to_string()))?,
        edges: serde_json::to_string(&edge_values)
            .map_err(|e| ApiError::Internal(e.to_string()))?,
        inputs: Some(
            serde_json::to_string(&workflow.inputs)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        outputs: Some(
            serde_json::to_string(&workflow.outputs)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        stages: Some(
            serde_json::to_string(&workflow.stages)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        author_kind: author_kind.to_owned(),
        extension_id: extension_id.map(str::to_owned),
        extension_version: extension_version.map(str::to_owned),
        created_at: now.to_owned(),
    })
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use nexus_storage::{SqliteDatabase, WorkflowRecord};
    use nexus_workflow::{NodeInstance, Workflow};

    use super::*;

    #[test]
    fn record_to_snapshot_parses_columns_and_assembles() {
        let nodes = serde_json::to_string(&serde_json::json!([
            {"id":"gen","operator":"synth@1.0.0","stage":null,"inputs":{},"config":{"steps":16}},
            {"id":"post","operator":"postproc@1.0.0","stage":null,"inputs":{},"config":null}
        ]))
        .unwrap();
        let record = WorkflowVersionRecord {
            workflow_id: "wf1".into(),
            version: "v2".into(),
            label: Some("1.2.0".into()),
            canonical_hash: "abc".into(),
            operator_schema_hash: "oph".into(),
            nodes,
            edges: "[]".into(),
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            stages: Some("[]".into()),
            author_kind: "user".into(),
            extension_id: None,
            extension_version: None,
            created_at: "t0".into(),
        };

        let snapshot = record_to_snapshot(&record, &[]).unwrap();
        assert_eq!(snapshot.version, "v2");
        assert_eq!(snapshot.canonical_hash, "abc");
        assert_eq!(snapshot.workflow.id, "wf1");
        assert_eq!(snapshot.workflow.version, "1.2.0");
        assert_eq!(snapshot.workflow.nodes.len(), 2);
        assert_eq!(snapshot.operator_schema_hashes.len(), 2);
    }

    async fn db_with_workflow(id: &str) -> SqliteDatabase {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        db.insert_workflow(&WorkflowRecord {
            id: id.into(),
            title: "T".into(),
            version: "1.0.0".into(),
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            nodes: "[]".into(),
            edges: "[]".into(),
            stages: Some("[]".into()),
            created_at: "t0".into(),
            updated_at: "t0".into(),
            user_edited_at: None,
            extension_id: None,
            extension_version: None,
            extension_version_first_seen: None,
        })
        .await
        .unwrap();
        db
    }

    fn workflow(id: &str, steps: i64) -> Workflow {
        Workflow {
            id: id.into(),
            title: "T".into(),
            version: "1.0.0".into(),
            inputs: vec![],
            outputs: vec![],
            nodes: vec![NodeInstance {
                id: "gen".into(),
                operator: "synth@1.0.0".into(),
                stage: None,
                inputs: HashMap::new(),
                config: Some(serde_json::json!({ "steps": steps })),
            }],
            stages: vec![],
            created_at: "t0".into(),
            updated_at: "t0".into(),
        }
    }

    #[tokio::test]
    async fn append_creates_first_version_v1_and_sets_head() {
        let db = db_with_workflow("wf1").await;
        let v = append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 16),
            &[],
            "user",
            None,
            None,
            Some("1.0.0"),
            "t1",
        )
        .await
        .unwrap();

        assert_eq!(v, "v1");
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 1);
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v1".into())
        );
    }

    #[tokio::test]
    async fn append_is_noop_when_content_unchanged() {
        let db = db_with_workflow("wf1").await;
        let wf = workflow("wf1", 16);
        let v1 = append_workflow_version_if_changed(&db, &wf, &[], "user", None, None, None, "t1")
            .await
            .unwrap();
        let v2 = append_workflow_version_if_changed(&db, &wf, &[], "user", None, None, None, "t2")
            .await
            .unwrap();

        assert_eq!(v1, "v1");
        assert_eq!(v2, "v1");
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 1);
    }

    #[tokio::test]
    async fn append_creates_v2_when_content_changes() {
        let db = db_with_workflow("wf1").await;
        append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 16),
            &[],
            "user",
            None,
            None,
            None,
            "t1",
        )
        .await
        .unwrap();
        let v = append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 32),
            &[],
            "user",
            None,
            None,
            None,
            "t2",
        )
        .await
        .unwrap();

        assert_eq!(v, "v2");
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 2);
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v2".into())
        );
    }

    #[tokio::test]
    async fn append_uses_global_count_so_ids_are_unique_across_authors() {
        let db = db_with_workflow("wf1").await;
        append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 16),
            &[],
            "user",
            None,
            None,
            None,
            "t1",
        )
        .await
        .unwrap();
        let v = append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 99),
            &[],
            "extension",
            Some("ext.a"),
            Some("1.0.0"),
            None,
            "t2",
        )
        .await
        .unwrap();

        assert_eq!(v, "v2");
        let rec = db.get_workflow_version("wf1", "v2").await.unwrap();
        assert_eq!(rec.author_kind, "extension");
        assert_eq!(rec.extension_id.as_deref(), Some("ext.a"));
    }

    async fn insert_row(
        db: &SqliteDatabase,
        id: &str,
        version: &str,
        user_edited_at: Option<&str>,
    ) {
        db.insert_workflow(&WorkflowRecord {
            id: id.into(),
            title: "T".into(),
            version: version.into(),
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            nodes: "[]".into(),
            edges: "[]".into(),
            stages: Some("[]".into()),
            created_at: "t0".into(),
            updated_at: "t0".into(),
            user_edited_at: user_edited_at.map(str::to_owned),
            extension_id: None,
            extension_version: None,
            extension_version_first_seen: None,
        })
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn seed_creates_one_extension_version_for_unedited_row() {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        insert_row(&db, "wf1", "2.1.0", None).await;

        let seeded = seed_workflow_versions(&db, &[], "t1").await.unwrap();

        assert_eq!(seeded, 1);
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 1);
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v1".into())
        );
        let rec = db.get_workflow_version("wf1", "v1").await.unwrap();
        assert_eq!(rec.author_kind, "extension");
        assert_eq!(rec.label.as_deref(), Some("2.1.0"));
    }

    #[tokio::test]
    async fn seed_creates_user_version_for_user_edited_row() {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        insert_row(&db, "wf1", "1.0.0", Some("t0")).await;

        seed_workflow_versions(&db, &[], "t1").await.unwrap();

        let rec = db.get_workflow_version("wf1", "v1").await.unwrap();
        assert_eq!(rec.author_kind, "user");
    }

    #[tokio::test]
    async fn seed_defaults_label_when_row_version_empty() {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        insert_row(&db, "wf1", "", None).await;

        seed_workflow_versions(&db, &[], "t1").await.unwrap();

        let rec = db.get_workflow_version("wf1", "v1").await.unwrap();
        assert_eq!(rec.label.as_deref(), Some("1.0.0"));
    }

    #[tokio::test]
    async fn seed_is_idempotent() {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        insert_row(&db, "wf1", "1.0.0", None).await;
        insert_row(&db, "wf2", "1.0.0", Some("t0")).await;

        let first = seed_workflow_versions(&db, &[], "t1").await.unwrap();
        let second = seed_workflow_versions(&db, &[], "t2").await.unwrap();

        assert_eq!(first, 2);
        assert_eq!(second, 0);
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 1);
        assert_eq!(db.count_workflow_versions("wf2").await.unwrap(), 1);
    }

    async fn put_head(db: &SqliteDatabase, wf: &Workflow, user_edited_at: Option<&str>) {
        db.update_workflow(&WorkflowRecord {
            id: wf.id.clone(),
            title: wf.title.clone(),
            version: wf.version.clone(),
            inputs: Some(serde_json::to_string(&wf.inputs).unwrap()),
            outputs: Some(serde_json::to_string(&wf.outputs).unwrap()),
            nodes: serde_json::to_string(&wf.nodes).unwrap(),
            edges: "[]".into(),
            stages: Some(serde_json::to_string(&wf.stages).unwrap()),
            created_at: "t0".into(),
            updated_at: "t0".into(),
            user_edited_at: user_edited_at.map(str::to_owned),
            extension_id: None,
            extension_version: None,
            extension_version_first_seen: None,
        })
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn revert_repoints_head_to_latest_extension_version() {
        let db = db_with_workflow("wf1").await;
        append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 16),
            &[],
            "extension",
            None,
            None,
            Some("1.0.0"),
            "t1",
        )
        .await
        .unwrap();

        let edited = workflow("wf1", 32);
        put_head(&db, &edited, Some("t2")).await;
        append_workflow_version_if_changed(
            &db,
            &edited,
            &[],
            "user",
            None,
            None,
            Some("1.0.0"),
            "t2",
        )
        .await
        .unwrap();
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v2".into())
        );

        let reverted = revert_head_to_latest_extension(&db, "wf1", "t3")
            .await
            .unwrap();

        assert!(reverted);
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v1".into())
        );
        let head = db.get_workflow("wf1").await.unwrap();
        assert!(
            head.nodes.contains("16"),
            "head should hold extension content, got {}",
            head.nodes
        );
        assert!(head.user_edited_at.is_none());
        assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 2);
        assert!(db.get_workflow_version("wf1", "v2").await.is_ok());
    }

    #[tokio::test]
    async fn revert_is_noop_without_extension_version() {
        let db = db_with_workflow("wf1").await;
        append_workflow_version_if_changed(
            &db,
            &workflow("wf1", 16),
            &[],
            "user",
            None,
            None,
            Some("1.0.0"),
            "t1",
        )
        .await
        .unwrap();

        let reverted = revert_head_to_latest_extension(&db, "wf1", "t2")
            .await
            .unwrap();

        assert!(!reverted);
        assert_eq!(
            db.get_current_version("wf1").await.unwrap(),
            Some("v1".into())
        );
    }
}
