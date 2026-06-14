use crate::database::Database;
use crate::error::StorageError;
use crate::records::WorkflowVersionRecord;

/// Author of a new version. `Extension` rows never displace a user-pinned head.
pub enum VersionAuthor {
    User,
    Extension { id: String, version: String },
}

/// The graph payload + hashes for a candidate new version (precomputed by the
/// caller, which owns the `nexus-workflow` model).
pub struct NewWorkflowVersion {
    pub canonical_hash: String,
    pub operator_schema_hash: Option<String>,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub author: VersionAuthor,
}

fn next_version(existing: &[WorkflowVersionRecord]) -> String {
    (existing.len() + 1).to_string()
}

fn build_record(
    workflow_id: &str,
    version: &str,
    v: &NewWorkflowVersion,
    now: &str,
) -> WorkflowVersionRecord {
    let (author_kind, extension_id, extension_version) = match &v.author {
        VersionAuthor::User => ("user".to_string(), None, None),
        VersionAuthor::Extension { id, version } => (
            "extension".to_string(),
            Some(id.clone()),
            Some(version.clone()),
        ),
    };
    WorkflowVersionRecord {
        workflow_id: workflow_id.to_string(),
        version: version.to_string(),
        canonical_hash: v.canonical_hash.clone(),
        operator_schema_hash: v.operator_schema_hash.clone(),
        inputs: v.inputs.clone(),
        outputs: v.outputs.clone(),
        nodes: v.nodes.clone(),
        edges: v.edges.clone(),
        stages: v.stages.clone(),
        author_kind,
        extension_id,
        extension_version,
        created_at: now.to_string(),
    }
}

/// Append an immutable version if the graph changed vs the current head, and
/// advance `current_version` unless an extension is re-persisting over a
/// user-pinned head. Returns the version string that is current afterward.
pub async fn record_version_if_changed<D: Database + ?Sized>(
    db: &D,
    workflow_id: &str,
    v: NewWorkflowVersion,
    now: &str,
) -> Result<String, StorageError> {
    let existing = db.list_workflow_versions(workflow_id).await?;
    let current = db.get_workflow_current_version(workflow_id).await?;

    if let Some(cur) = current.as_deref()
        && let Ok(head) = db.get_workflow_version(workflow_id, cur).await
    {
        if head.canonical_hash == v.canonical_hash {
            return Ok(cur.to_string());
        }
        let extension_over_user =
            matches!(v.author, VersionAuthor::Extension { .. }) && head.author_kind == "user";
        if extension_over_user {
            let ver = next_version(&existing);
            db.insert_workflow_version(&build_record(workflow_id, &ver, &v, now))
                .await?;
            return Ok(cur.to_string());
        }
    }

    let ver = next_version(&existing);
    db.insert_workflow_version(&build_record(workflow_id, &ver, &v, now))
        .await?;
    db.set_workflow_current_version(workflow_id, &ver, now)
        .await?;
    Ok(ver)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::records::WorkflowRecord;
    use crate::sqlite::SqliteDatabase;

    async fn db() -> SqliteDatabase {
        SqliteDatabase::new("sqlite::memory:").await.unwrap()
    }

    fn seed_workflow(id: &str) -> WorkflowRecord {
        WorkflowRecord {
            id: id.into(),
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

    fn candidate(hash: &str, author: VersionAuthor) -> NewWorkflowVersion {
        NewWorkflowVersion {
            canonical_hash: hash.into(),
            operator_schema_hash: None,
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            nodes: "[]".into(),
            edges: "[]".into(),
            stages: Some("[]".into()),
            author,
        }
    }

    #[tokio::test]
    async fn first_record_creates_version_1_and_sets_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        let v = record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t")
            .await
            .unwrap();
        assert_eq!(v, "1");
        assert_eq!(
            db.get_workflow_current_version("wf")
                .await
                .unwrap()
                .as_deref(),
            Some("1")
        );
    }

    #[tokio::test]
    async fn identical_hash_is_noop() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t")
            .await
            .unwrap();
        let again = record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t")
            .await
            .unwrap();
        assert_eq!(again, "1");
        assert_eq!(db.list_workflow_versions("wf").await.unwrap().len(), 1);
    }

    #[tokio::test]
    async fn user_edit_advances_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t")
            .await
            .unwrap();
        let v = record_version_if_changed(&db, "wf", candidate("h2", VersionAuthor::User), "t")
            .await
            .unwrap();
        assert_eq!(v, "2");
        assert_eq!(
            db.get_workflow_current_version("wf")
                .await
                .unwrap()
                .as_deref(),
            Some("2")
        );
    }

    #[tokio::test]
    async fn extension_does_not_move_user_pinned_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t")
            .await
            .unwrap();
        let ext = VersionAuthor::Extension {
            id: "e".into(),
            version: "1.0.0".into(),
        };
        let head = record_version_if_changed(&db, "wf", candidate("h2", ext), "t")
            .await
            .unwrap();
        assert_eq!(head, "1");
        assert_eq!(db.list_workflow_versions("wf").await.unwrap().len(), 2);
        assert_eq!(
            db.get_workflow_current_version("wf")
                .await
                .unwrap()
                .as_deref(),
            Some("1")
        );
    }
}
