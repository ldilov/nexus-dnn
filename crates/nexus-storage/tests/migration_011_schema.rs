use nexus_storage::SqliteDatabase;
use sqlx::Row;

const NEW_TABLES: &[&str] = &[
    "deployments",
    "deployment_revisions",
    "deployment_snapshots",
    "deployment_source_links",
    "deployment_parameters",
    "deployment_runtime_bindings",
    "deployment_model_bindings",
    "deployment_artifact_bindings",
    "deployment_validations",
    "deployment_restore_diagnostics",
    "deployment_run_links",
    "deployment_tags",
];

const NEW_INDEXES: &[&str] = &[
    "idx_deployments_slug",
    "idx_deployments_updated",
    "idx_deployments_state",
    "idx_deployment_revisions_number",
    "idx_deployment_snapshots_rev_kind",
    "idx_deployment_source_links_rev",
    "idx_deployment_parameters_unique",
    "idx_deployment_runtime_bindings_rev",
    "idx_deployment_model_bindings_rev",
    "idx_deployment_artifact_bindings_rev",
    "idx_deployment_validations_rev",
    "idx_deployment_restore_diagnostics_v",
    "idx_deployment_run_links_dep",
    "idx_deployment_run_links_run",
    "idx_runs_deployment",
    "idx_runs_deployment_revision",
];

#[tokio::test]
async fn migration_011_creates_all_deployment_tables() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    for name in NEW_TABLES {
        let row = sqlx::query("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
            .bind(*name)
            .fetch_optional(db.pool())
            .await
            .unwrap();
        assert!(row.is_some(), "table `{name}` missing after migration 011");
    }
}

#[tokio::test]
async fn migration_011_creates_all_indexes() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    for name in NEW_INDEXES {
        let row = sqlx::query("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
            .bind(*name)
            .fetch_optional(db.pool())
            .await
            .unwrap();
        assert!(row.is_some(), "index `{name}` missing after migration 011");
    }
}

#[tokio::test]
async fn migration_011_adds_columns_to_existing_tables() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let cases: &[(&str, &[&str])] = &[
        (
            "workflows",
            &[
                "source_kind",
                "source_extension_id",
                "source_template_ref",
                "availability_state",
                "canonical_hash",
                "parent_workflow_id",
            ],
        ),
        (
            "recipes",
            &[
                "source_kind",
                "source_extension_id",
                "source_template_ref",
                "availability_state",
                "mapping_contract_json",
            ],
        ),
        (
            "runs",
            &[
                "deployment_id",
                "deployment_revision_id",
                "execution_context_hash",
            ],
        ),
    ];
    for (table, expected_cols) in cases {
        let cols = sqlx::query(&format!("PRAGMA table_info({table})"))
            .fetch_all(db.pool())
            .await
            .unwrap();
        let names: Vec<String> = cols
            .iter()
            .map(|r| r.try_get::<String, _>("name").unwrap())
            .collect();
        for col in *expected_cols {
            assert!(
                names.iter().any(|n| n == col),
                "{table}.{col} missing after migration 011 (have: {names:?})"
            );
        }
    }
}
