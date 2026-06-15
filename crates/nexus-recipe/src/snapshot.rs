use nexus_storage::records::WorkflowVersionRecord;
use nexus_workflow::{NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort};

/// Reconstruct a runnable `Workflow` from an immutable version snapshot row.
/// `title` comes from the identity `workflows` row (the version row has none).
pub fn snapshot_to_workflow(
    title: &str,
    rec: &WorkflowVersionRecord,
) -> Result<Workflow, serde_json::Error> {
    let inputs: Vec<WorkflowPort> = match &rec.inputs {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    let outputs: Vec<OutputBinding> = match &rec.outputs {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    let nodes: Vec<NodeInstance> = serde_json::from_str(&rec.nodes)?;
    let stages: Vec<Stage> = match &rec.stages {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    Ok(Workflow {
        id: rec.workflow_id.clone(),
        title: title.to_string(),
        version: rec.version.clone(),
        inputs,
        outputs,
        nodes,
        stages,
        created_at: rec.created_at.clone(),
        updated_at: rec.created_at.clone(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn rec() -> WorkflowVersionRecord {
        WorkflowVersionRecord {
            workflow_id: "wf".into(),
            version: "1".into(),
            canonical_hash: "h".into(),
            operator_schema_hash: None,
            inputs: Some(r#"[{"name":"script","type":"string"}]"#.into()),
            outputs: Some("[]".into()),
            nodes: "[]".into(),
            edges: "[]".into(),
            stages: Some("[]".into()),
            author_kind: "extension".into(),
            extension_id: None,
            extension_version: None,
            created_at: "t".into(),
        }
    }

    #[test]
    fn rebuilds_workflow_from_snapshot() {
        let wf = snapshot_to_workflow("My Flow", &rec()).unwrap();
        assert_eq!(wf.id, "wf");
        assert_eq!(wf.version, "1");
        assert_eq!(wf.title, "My Flow");
        assert_eq!(wf.inputs.len(), 1);
        assert_eq!(wf.inputs[0].name, "script");
    }
}
