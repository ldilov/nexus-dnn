use nexus_storage::records::WorkflowRecord;
use nexus_storage::versioning::{NewWorkflowVersion, VersionAuthor};
use nexus_workflow::{Workflow, compute_canonical_hash};

/// Build a `NewWorkflowVersion` from a parsed workflow + its storage record
/// (the record already holds canonical JSON strings for the graph columns).
pub fn new_version_from(
    workflow: &Workflow,
    record: &WorkflowRecord,
    author: VersionAuthor,
) -> Result<NewWorkflowVersion, serde_json::Error> {
    Ok(NewWorkflowVersion {
        canonical_hash: compute_canonical_hash(workflow)?,
        operator_schema_hash: None,
        inputs: record.inputs.clone(),
        outputs: record.outputs.clone(),
        nodes: record.nodes.clone(),
        edges: record.edges.clone(),
        stages: record.stages.clone(),
        author,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_workflow::parse_workflow;

    const YAML: &str = r#"
spec_version: "0.1"
workflow:
  id: "wf"
  version: "0.1.0"
  title: "T"
  inputs: []
  outputs: []
  stages: []
  nodes: []
"#;

    fn record() -> WorkflowRecord {
        WorkflowRecord {
            id: "wf".into(),
            title: "T".into(),
            version: "0.1.0".into(),
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
        }
    }

    #[test]
    fn builds_a_versioned_candidate_with_a_hash() {
        let wf = parse_workflow(YAML).unwrap();
        let nv = new_version_from(&wf, &record(), VersionAuthor::User).unwrap();
        assert_eq!(nv.canonical_hash.len(), 64);
        assert!(matches!(nv.author, VersionAuthor::User));
    }
}
