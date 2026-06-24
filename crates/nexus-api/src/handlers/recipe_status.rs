//! Host-side recipe pin backfill + cached-status refresh (P1, CONTRACTS C6).
//!
//! These helpers bridge the host storage layer to `nexus_recipe`'s generic
//! `resolve_pin` / `assess_status`. Generic by stem + path string; no extension
//! id literals (the extension is identified only by the rows it persisted).

use std::collections::HashMap;

use nexus_extension::{ActivatedExtension, OperatorDefinition};
use nexus_recipe::{
    PinResult, REASON_NEEDS_RE_PIN, RecipeProjection, RecipeStatus, StemLookup, assess_status,
    compute_status, normalize_stem, resolve_pin,
};
use nexus_storage::Database;
use nexus_workflow::WorkflowVersionSnapshot;

use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

struct MapStemLookup<'a> {
    stems: &'a HashMap<String, String>,
    heads: &'a HashMap<String, String>,
}

impl StemLookup for MapStemLookup<'_> {
    fn workflow_id_for_stem(&self, stem: &str) -> Option<String> {
        self.stems.get(stem).cloned()
    }
    fn current_version_for(&self, workflow_id: &str) -> Option<String> {
        self.heads.get(workflow_id).cloned()
    }
}

/// Parse each of the extension's workflow templates to map its normalized stem
/// to the workflow's declared id (the recipe template ref is a filename; the id
/// lives inside the YAML).
fn stem_to_workflow_id_map(ext: &ActivatedExtension) -> HashMap<String, String> {
    let mut map = HashMap::new();
    for recipe in &ext.recipes {
        let Some(template_ref) = recipe.workflow_template.as_ref() else {
            continue;
        };
        let path = ext.directory.join(template_ref);
        let Ok(content) = std::fs::read_to_string(&path) else {
            continue;
        };
        let Ok(workflow) = nexus_workflow::parse_workflow(&content) else {
            continue;
        };
        map.insert(normalize_stem(template_ref), workflow.id);
    }
    map
}

/// Resolve and persist the pin + initial status for every just-persisted
/// extension recipe. Resolvable stems pin to `current_version` (healthy);
/// unresolvable ones are marked `broken` + `needs_re_pin` (legacy display
/// path stays intact via `workflow_template_ref`/`bindings`).
pub async fn backfill_recipe_pins(
    db: &impl Database,
    ext: &ActivatedExtension,
) -> Result<(), ApiError> {
    let stems = stem_to_workflow_id_map(ext);
    let mut heads: HashMap<String, String> = HashMap::new();
    for workflow_id in stems.values() {
        if heads.contains_key(workflow_id) {
            continue;
        }
        if let Some(version) = db
            .get_current_version(workflow_id)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?
        {
            heads.insert(workflow_id.clone(), version);
        }
    }

    let lookup = MapStemLookup {
        stems: &stems,
        heads: &heads,
    };
    for recipe in &ext.recipes {
        let Some(template_ref) = recipe.workflow_template.as_ref() else {
            continue;
        };
        let id = &recipe.recipe.id;
        match resolve_pin(template_ref, &lookup) {
            PinResult::Resolved {
                workflow_id,
                workflow_version,
            } => {
                let (status, reason) = compute_status(true, true, true, false, false);
                db.update_recipe_pin(
                    id,
                    Some(&workflow_id),
                    Some(&workflow_version),
                    status.as_str(),
                    reason.as_deref(),
                )
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;
            }
            PinResult::Unresolvable => {
                db.update_recipe_pin(
                    id,
                    None,
                    None,
                    RecipeStatus::Broken.as_str(),
                    Some(REASON_NEEDS_RE_PIN),
                )
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;
            }
        }
    }
    Ok(())
}

async fn load_snapshot(
    db: &impl Database,
    workflow_id: &str,
    version: &str,
    operators: &[OperatorDefinition],
) -> Option<WorkflowVersionSnapshot> {
    let record = db.get_workflow_version(workflow_id, version).await.ok()?;
    record_to_snapshot(&record, operators).ok()
}

/// Recompute the cached `status` for every recipe pinned to `workflow_id` when
/// that workflow's head version advances. The pin itself is unchanged; only the
/// compatibility verdict is refreshed via `assess_status`.
pub async fn refresh_status_for_workflow(
    db: &impl Database,
    workflow_id: &str,
    operators: &[OperatorDefinition],
) -> Result<(), ApiError> {
    let current_version = db
        .get_current_version(workflow_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let current_snapshot = match current_version.as_deref() {
        Some(version) => match load_snapshot(db, workflow_id, version, operators).await {
            Some(snapshot) => Some(snapshot),
            None => {
                // Head exists but its snapshot won't assemble; skip rather than
                // mask an outdated/broken recipe as healthy via a None current.
                tracing::warn!(
                    workflow_id,
                    version,
                    "current snapshot unavailable; skip refresh"
                );
                return Ok(());
            }
        },
        None => None,
    };

    let recipes = db
        .list_recipes()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    for recipe in recipes
        .iter()
        .filter(|r| r.workflow_id.as_deref() == Some(workflow_id))
    {
        let pinned_snapshot = match recipe.workflow_version.as_deref() {
            Some(version) => load_snapshot(db, workflow_id, version, operators).await,
            None => None,
        };
        let projection = recipe
            .projection
            .as_deref()
            .and_then(|p| serde_json::from_str::<RecipeProjection>(p).ok())
            .unwrap_or_else(RecipeProjection::empty);
        let (status, reason) = assess_status(
            &projection,
            pinned_snapshot.as_ref(),
            current_snapshot.as_ref(),
            operators,
        );
        db.update_recipe_pin(
            &recipe.id,
            recipe.workflow_id.as_deref(),
            recipe.workflow_version.as_deref(),
            status.as_str(),
            reason.as_deref(),
        )
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use nexus_storage::{RecipeRecord, SqliteDatabase, WorkflowRecord, WorkflowVersionRecord};

    use super::*;

    fn version_record(workflow_id: &str, version: &str) -> WorkflowVersionRecord {
        WorkflowVersionRecord {
            workflow_id: workflow_id.into(),
            version: version.into(),
            label: Some("1.0.0".into()),
            canonical_hash: format!("hash-{version}"),
            operator_schema_hash: "ophash".into(),
            nodes: "[]".into(),
            edges: "[]".into(),
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            stages: Some("[]".into()),
            author_kind: "extension".into(),
            extension_id: None,
            extension_version: None,
            created_at: "2026-06-24T00:00:00Z".into(),
        }
    }

    fn pinned_recipe(id: &str, workflow_id: &str, version: &str) -> RecipeRecord {
        RecipeRecord {
            id: id.into(),
            version: "1.0.0".into(),
            display_name: "Demo".into(),
            summary: "S".into(),
            category: "audio".into(),
            extension_id: Some("ext.demo".into()),
            extension_version: Some("1.0.0".into()),
            workflow_template_ref: "workflows/main.yaml".into(),
            thumbnail: None,
            input_summary: None,
            bindings: "{}".into(),
            created_at: "2026-06-24T00:00:00Z".into(),
            workflow_id: Some(workflow_id.into()),
            workflow_version: Some(version.into()),
            projection: None,
            projection_schema_version: 1,
            status: "healthy".into(),
            status_reason: None,
            author_kind: "user".into(),
        }
    }

    fn workflow(id: &str) -> WorkflowRecord {
        WorkflowRecord {
            id: id.into(),
            title: "T".into(),
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

    #[tokio::test]
    async fn cached_status_refreshes_on_version_change() {
        let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
        db.insert_workflow(&workflow("wf-1")).await.unwrap();
        db.insert_workflow_version(&version_record("wf-1", "v1"))
            .await
            .unwrap();
        db.set_current_version("wf-1", "v1", "t").await.unwrap();
        db.insert_recipe(&pinned_recipe("r1", "wf-1", "v1"))
            .await
            .unwrap();

        refresh_status_for_workflow(&db, "wf-1", &[]).await.unwrap();
        assert_eq!(db.get_recipe("r1").await.unwrap().status, "healthy");

        db.insert_workflow_version(&version_record("wf-1", "v2"))
            .await
            .unwrap();
        db.set_current_version("wf-1", "v2", "t").await.unwrap();

        refresh_status_for_workflow(&db, "wf-1", &[]).await.unwrap();
        let refreshed = db.get_recipe("r1").await.unwrap();
        assert_eq!(refreshed.status, "outdated", "pin v1 now trails current v2");
        assert_eq!(
            refreshed.workflow_version.as_deref(),
            Some("v1"),
            "pin unchanged"
        );
    }
}
