use super::*;
use crate::records::IconKind;

async fn setup_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn make_namespace(id: &str, ext_id: &str) -> NamespaceRecord {
    NamespaceRecord {
        id: id.into(),
        extension_id: ext_id.into(),
        extension_version_first_seen: "1.0.0".into(),
        namespace_alias: "test_ns".into(),
        effective_prefix: format!("ext_{id}_"),
        engine: "sqlite".into(),
        storage_spec_version: "0.1".into(),
        sql_profile: "nexus_sqlite_v1".into(),
        status: "reserved".into(),
        uninstall_policy: "retain".into(),
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
    }
}

fn make_migration(id: &str, ns_id: &str, mig_id: &str) -> MigrationRecord {
    MigrationRecord {
        id: id.into(),
        namespace_id: ns_id.into(),
        extension_id: "test.ext".into(),
        extension_version: "1.0.0".into(),
        migration_id: mig_id.into(),
        path: "migrations/001_init.sql".into(),
        raw_checksum_sha256: "abc123".into(),
        expanded_checksum_sha256: "def456".into(),
        status: "planned".into(),
        applied_at: None,
        error_json: None,
    }
}

fn make_object(id: &str, ns_id: &str) -> ObjectRecord {
    ObjectRecord {
        id: id.into(),
        namespace_id: ns_id.into(),
        object_name: format!("ext_{ns_id}_items"),
        object_type: "table".into(),
        created_by_migration_id: "mig-1".into(),
        sql_hash: Some("hash123".into()),
        status: "present".into(),
        recorded_at: "2026-01-01T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn namespace_insert_and_read() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");

    db.insert_namespace(&ns).await.unwrap();

    let fetched = db.get_namespace("ns-1").await.unwrap();
    assert_eq!(fetched.id, "ns-1");
    assert_eq!(fetched.extension_id, "test.ext");
    assert_eq!(fetched.status, "reserved");
}

#[tokio::test]
async fn namespace_list_and_by_extension() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let all = db.list_namespaces().await.unwrap();
    assert_eq!(all.len(), 1);

    let by_ext = db.get_namespace_by_extension("test.ext").await.unwrap();
    assert!(by_ext.is_some());
    assert_eq!(by_ext.unwrap().id, "ns-1");

    let missing = db.get_namespace_by_extension("no.such").await.unwrap();
    assert!(missing.is_none());
}

#[tokio::test]
async fn namespace_update_status() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    db.update_namespace_status("ns-1", "active").await.unwrap();

    let fetched = db.get_namespace("ns-1").await.unwrap();
    assert_eq!(fetched.status, "active");
}

#[tokio::test]
async fn migration_insert_and_list() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let mig = make_migration("m-1", "ns-1", "001_init");
    db.insert_migration_record(&mig).await.unwrap();

    let migrations = db.list_migrations_for_namespace("ns-1").await.unwrap();
    assert_eq!(migrations.len(), 1);
    assert_eq!(migrations[0].migration_id, "001_init");

    let found = db.get_migration_record("ns-1", "001_init").await.unwrap();
    assert!(found.is_some());

    let missing = db.get_migration_record("ns-1", "999_nope").await.unwrap();
    assert!(missing.is_none());
}

#[tokio::test]
async fn object_insert_list_and_update() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let obj = make_object("obj-1", "ns-1");
    db.insert_object_record(&obj).await.unwrap();

    let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
    assert_eq!(objects.len(), 1);
    assert_eq!(objects[0].object_type, "table");

    db.update_object_status("obj-1", "dropped").await.unwrap();

    let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
    assert_eq!(objects[0].status, "dropped");
}

#[tokio::test]
async fn operation_insert_and_update() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let op = OperationRecord {
        id: "op-1".into(),
        namespace_id: "ns-1".into(),
        operation_type: "apply".into(),
        status: "started".into(),
        plan_json: Some(r#"{"action":"new_install"}"#.into()),
        result_json: None,
        started_at: "2026-01-01T00:00:00Z".into(),
        completed_at: None,
    };
    db.insert_operation(&op).await.unwrap();

    db.update_operation(
        "op-1",
        "completed",
        Some(r#"{"ok":true}"#),
        Some("2026-01-01T00:01:00Z"),
    )
    .await
    .unwrap();
}

#[tokio::test]
async fn archive_insert_and_list() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let archive = ArchiveRecord {
        id: "arc-1".into(),
        namespace_id: "ns-1".into(),
        archive_format: "jsonl_zip".into(),
        archive_path: "/tmp/archive.zip".into(),
        content_hash: "sha256abc".into(),
        table_count: 3,
        row_count: 42,
        created_at: "2026-01-01T00:00:00Z".into(),
    };
    db.insert_archive(&archive).await.unwrap();

    let archives = db.list_archives_for_namespace("ns-1").await.unwrap();
    assert_eq!(archives.len(), 1);
    assert_eq!(archives[0].archive_format, "jsonl_zip");
    assert_eq!(archives[0].table_count, 3);
    assert_eq!(archives[0].row_count, 42);
}

fn make_extension(id: &str) -> ExtensionRecord {
    ExtensionRecord {
        id: id.into(),
        name: Some(format!("Test extension {id}")),
        version: "1.0.0".into(),
        description: None,
        publisher: None,
        host_api_compat: "1.0".into(),
        protocol_compat: "1.0".into(),
        runtime_family: "python".into(),
        entrypoint: "worker.py".into(),
        capabilities: None,
        status: "active".into(),
        directory: "/tmp/ext".into(),
        installed_at: "2026-04-16T00:00:00Z".into(),
        recipe_count: Some(1),
        ui_contribution_count: None,
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

#[tokio::test]
async fn migration_012_applies() {
    let db = setup_db().await;
    let columns: Vec<(String,)> =
        sqlx::query_as("SELECT name FROM pragma_table_info('extensions') ORDER BY cid")
            .fetch_all(db.pool())
            .await
            .unwrap();
    let names: Vec<String> = columns.into_iter().map(|(n,)| n).collect();
    for required in [
        "primary_recipe_id",
        "default_workflow_id",
        "icon_kind",
        "icon_symbol",
        "icon_svg",
    ] {
        assert!(
            names.iter().any(|n| n == required),
            "extensions table missing column {required}"
        );
    }
}

#[tokio::test]
async fn migration_012_idempotent_rerun() {
    let db = setup_db().await;
    migrations::run_migrations(db.pool()).await.unwrap();
    migrations::run_migrations(db.pool()).await.unwrap();
    db.insert_extension(&make_extension("ext.idem"))
        .await
        .unwrap();
}

#[tokio::test]
async fn migration_012_null_on_legacy() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("ext.legacy"))
        .await
        .unwrap();
    let fetched = db.get_extension("ext.legacy").await.unwrap();
    assert_eq!(fetched.primary_recipe_id, None);
    assert_eq!(fetched.default_workflow_id, None);
    assert_eq!(fetched.icon_kind, None);
    assert_eq!(fetched.icon_symbol, None);
    assert_eq!(fetched.icon_svg, None);
}

#[tokio::test]
async fn extensions_icon_symbol_roundtrip() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("ext.sym"))
        .await
        .unwrap();
    extensions::upsert_icon(
        db.pool(),
        "ext.sym",
        Some(IconKind::Symbol),
        Some("movie_filter"),
        None,
    )
    .await
    .unwrap();
    let fetched = db.get_extension("ext.sym").await.unwrap();
    assert_eq!(fetched.icon_kind, Some(IconKind::Symbol));
    assert_eq!(fetched.icon_symbol.as_deref(), Some("movie_filter"));
    assert!(fetched.icon_svg.is_none());
}

#[tokio::test]
async fn extensions_icon_svg_roundtrip() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("ext.svg"))
        .await
        .unwrap();
    let svg = r#"<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>"#;
    extensions::upsert_icon(db.pool(), "ext.svg", Some(IconKind::Svg), None, Some(svg))
        .await
        .unwrap();
    let fetched = db.get_extension("ext.svg").await.unwrap();
    assert_eq!(fetched.icon_kind, Some(IconKind::Svg));
    assert!(fetched.icon_symbol.is_none());
    assert_eq!(fetched.icon_svg.as_deref(), Some(svg));
}

#[tokio::test]
async fn extensions_upsert_primary_refs_roundtrip() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("ext.refs"))
        .await
        .unwrap();
    extensions::upsert_primary_refs(
        db.pool(),
        "ext.refs",
        Some("rcp.default"),
        Some("wfl.default"),
    )
    .await
    .unwrap();
    let fetched = db.get_extension("ext.refs").await.unwrap();
    assert_eq!(fetched.primary_recipe_id.as_deref(), Some("rcp.default"));
    assert_eq!(fetched.default_workflow_id.as_deref(), Some("wfl.default"));
}

#[tokio::test]
async fn migration_023_creates_workflow_versions_and_current_version() {
    let db = setup_db().await;
    sqlx::query("SELECT workflow_id, version, canonical_hash, author_kind FROM workflow_versions")
        .fetch_all(db.pool())
        .await
        .expect("workflow_versions table should exist");
    sqlx::query("SELECT current_version FROM workflows")
        .fetch_all(db.pool())
        .await
        .expect("workflows.current_version column should exist");
}

fn make_workflow(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "T".into(),
        version: "0.1.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn make_version(
    workflow_id: &str,
    version: &str,
    hash: &str,
    author: &str,
) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        canonical_hash: hash.into(),
        operator_schema_hash: None,
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        author_kind: author.into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-01-01T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn workflow_version_insert_list_and_current_pointer() {
    let db = setup_db().await;
    db.insert_workflow(&make_workflow("wf-1")).await.unwrap();

    db.insert_workflow_version(&make_version("wf-1", "1", "hashA", "extension"))
        .await
        .unwrap();
    db.insert_workflow_version(&make_version("wf-1", "2", "hashB", "user"))
        .await
        .unwrap();

    let versions = db.list_workflow_versions("wf-1").await.unwrap();
    assert_eq!(versions.len(), 2);
    assert_eq!(versions[0].version, "1");
    assert_eq!(versions[1].version, "2");
    assert_eq!(versions[1].author_kind, "user");

    assert!(
        db.get_workflow_current_version("wf-1")
            .await
            .unwrap()
            .is_none()
    );
    db.set_workflow_current_version("wf-1", "2", "2026-01-02T00:00:00Z")
        .await
        .unwrap();
    assert_eq!(
        db.get_workflow_current_version("wf-1")
            .await
            .unwrap()
            .as_deref(),
        Some("2")
    );

    let v = db.get_workflow_version("wf-1", "1").await.unwrap();
    assert_eq!(v.canonical_hash, "hashA");
}

#[tokio::test]
async fn migration_024_adds_recipe_projection_columns() {
    let db = setup_db().await;
    sqlx::query(
        "SELECT workflow_id, workflow_version, projection_schema_version, projection, status, author_kind FROM recipes",
    )
    .fetch_all(db.pool())
    .await
    .expect("recipe projection columns should exist");
}

fn make_recipe(id: &str, author: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1".into(),
        display_name: "R".into(),
        summary: "s".into(),
        category: "c".into(),
        extension_id: "test.ext".into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: "workflows/x.yaml".into(),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".into(),
        workflow_id: Some("wf".into()),
        workflow_version: Some("1".into()),
        projection_schema_version: Some(1),
        projection: Some("{}".into()),
        status: Some("healthy".into()),
        author_kind: author.into(),
        created_at: "t".into(),
    }
}

#[tokio::test]
async fn recipe_roundtrip_carries_projection_fields() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("test.ext"))
        .await
        .unwrap();

    db.insert_recipe(&make_recipe("r1", "extension"))
        .await
        .unwrap();
    let got = db.get_recipe("r1").await.unwrap();
    assert_eq!(got.workflow_version.as_deref(), Some("1"));
    assert_eq!(got.author_kind, "extension");
    assert_eq!(got.status.as_deref(), Some("healthy"));
    assert_eq!(got.projection_schema_version, Some(1));
    assert_eq!(got.projection.as_deref(), Some("{}"));
}

#[tokio::test]
async fn extension_delete_spares_user_recipes() {
    let db = setup_db().await;
    db.insert_extension(&make_extension("test.ext"))
        .await
        .unwrap();
    db.insert_recipe(&make_recipe("ext-r", "extension"))
        .await
        .unwrap();
    let mut user = make_recipe("user-r", "user");
    user.extension_id = "test.ext".into();
    db.insert_recipe(&user).await.unwrap();

    db.delete_recipes_by_extension("test.ext").await.unwrap();

    assert!(db.get_recipe("ext-r").await.is_err());
    assert!(db.get_recipe("user-r").await.is_ok());
}

#[tokio::test]
async fn resolved_run_graph_roundtrip() {
    let db = setup_db().await;
    db.insert_run_resolved_graph(&crate::records::ResolvedRunGraphRecord {
        run_id: "r1".into(),
        workflow_id: "wf".into(),
        workflow_version: "1".into(),
        workflow_json: r#"{"id":"wf"}"#.into(),
        inputs_values_json: r#"{"script":"hi"}"#.into(),
        created_at: "t".into(),
    })
    .await
    .unwrap();

    let got = db.get_run_resolved_graph("r1").await.unwrap().unwrap();
    assert_eq!(got.workflow_version, "1");
    assert!(
        db.get_run_resolved_graph("missing")
            .await
            .unwrap()
            .is_none()
    );
}
