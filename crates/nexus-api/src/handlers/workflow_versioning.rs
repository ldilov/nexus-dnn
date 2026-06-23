use nexus_extension::OperatorDefinition;
use nexus_storage::{Database, WorkflowVersionRecord};
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
    let count = db
        .count_workflow_versions(&workflow.id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let new_version = format!("v{}", count + 1);

    let record = build_version_record(
        workflow,
        &new_version,
        &canonical,
        &operator_schema_hash,
        author_kind,
        extension_id,
        extension_version,
        label,
        now,
    )?;
    db.insert_workflow_version(&record)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    db.set_current_version(&workflow.id, &new_version, now)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(new_version)
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

fn build_version_record(
    workflow: &Workflow,
    version: &str,
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
        version: version.to_owned(),
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
}
