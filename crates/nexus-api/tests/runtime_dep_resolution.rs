use std::sync::Arc;
use std::time::Instant;

use nexus_api::handlers::extensions::check_runtime_dependencies;
use nexus_extension::{
    CompatibilitySpec, ExtensionError, ExtensionInfo, ExtensionManifest, RuntimeDependency,
    RuntimeSpec,
};
use nexus_protocol::RuntimeFamily;
use nexus_storage::SqliteDatabase;

async fn fresh_db() -> Arc<SqliteDatabase> {
    let db = SqliteDatabase::new("sqlite::memory:")
        .await
        .expect("in-memory db");
    let schema = include_str!("../../../migrations/008_host_runtime_pool.sql");
    for stmt in schema.split(';') {
        let trimmed = stmt.trim();
        if trimmed.is_empty() {
            continue;
        }
        sqlx::query(trimmed).execute(db.pool()).await.ok();
    }
    Arc::new(db)
}

async fn seed_install(db: &SqliteDatabase, install_id: &str, family: &str, version: &str) {
    sqlx::query(
        "INSERT INTO host_runtime_installs \
         (install_id, family, version, accelerator, install_root, binary_paths, state, \
          created_at, updated_at) \
         VALUES ($1, $2, $3, 'cpu', '/tmp', '[]', 'installed', 't', 't')",
    )
    .bind(install_id)
    .bind(family)
    .bind(version)
    .execute(db.pool())
    .await
    .expect("seed install");
}

fn make_manifest(id: &str, deps: Vec<RuntimeDependency>) -> ExtensionManifest {
    ExtensionManifest {
        spec_version: "1.0".into(),
        extension: ExtensionInfo {
            id: id.into(),
            version: "1.0.0".into(),
            name: Some(id.into()),
            description: None,
            publisher: None,
        },
        compatibility: CompatibilitySpec {
            host_api: "1.0.0".into(),
            protocol: "1.0.0".into(),
            platforms: None,
        },
        runtime: RuntimeSpec {
            family: RuntimeFamily::Builtin,
            entrypoint: ".".into(),
            environment: None,
        },
        capabilities: None,
        operators: None,
        recipes: None,
        ui: None,
        storage: None,
        runtime_dependencies: deps,
        model_dependencies: Vec::new(),
    }
}

fn dep(family: &str, version: &str) -> RuntimeDependency {
    RuntimeDependency {
        family: family.into(),
        version: Some(version.into()),
        acceleration: Vec::new(),
    }
}

#[tokio::test]
async fn unsatisfiable_dependency_blocks_enable() {
    let db = fresh_db().await;
    seed_install(&db, "ri_1", "llama.cpp", "b4970").await;

    let manifest = make_manifest("ext.unmet", vec![dep("llama.cpp", ">=b9999")]);

    let start = Instant::now();
    let result = check_runtime_dependencies(&db, &manifest).await;
    let elapsed = start.elapsed();

    let err = result.expect_err("must fail on unsatisfiable range");
    match err {
        ExtensionError::RuntimeDependencyUnmet {
            family,
            version_req,
            available_versions,
            ..
        } => {
            assert_eq!(family, "llama.cpp");
            assert_eq!(version_req, ">=b9999");
            assert!(
                available_versions.iter().any(|v| v == "b4970"),
                "available versions should include the installed one: {available_versions:?}",
            );
        }
        other => panic!("expected RuntimeDependencyUnmet, got {other:?}"),
    }
    assert!(
        elapsed.as_millis() < 100,
        "SC-102 budget: enable-time resolver must complete in <100ms, took {elapsed:?}",
    );
}

#[tokio::test]
async fn satisfiable_dependency_enables_cleanly() {
    let db = fresh_db().await;
    seed_install(&db, "ri_1", "llama.cpp", "b4970").await;

    let manifest = make_manifest("ext.ok", vec![dep("llama.cpp", ">=b4000")]);
    check_runtime_dependencies(&db, &manifest)
        .await
        .expect("satisfiable dependency must succeed");
}

#[tokio::test]
async fn conflicting_ranges_rejected_before_resolver() {
    let db = fresh_db().await;

    let manifest = make_manifest(
        "ext.conflict",
        vec![dep("llama.cpp", ">=b5000"), dep("llama.cpp", "<b4500")],
    );

    let err = check_runtime_dependencies(&db, &manifest)
        .await
        .expect_err("disjoint ranges must fail");
    match err {
        ExtensionError::RuntimeDependencyConflict { family, ranges, .. } => {
            assert_eq!(family, "llama.cpp");
            assert!(ranges.iter().any(|r| r == ">=b5000"));
            assert!(ranges.iter().any(|r| r == "<b4500"));
        }
        other => panic!("expected RuntimeDependencyConflict, got {other:?}"),
    }
}

#[tokio::test]
async fn no_runtime_deps_field_skips_resolver() {
    let db = fresh_db().await;
    let manifest = make_manifest("ext.empty", Vec::new());
    check_runtime_dependencies(&db, &manifest)
        .await
        .expect("no runtime_dependencies must be a no-op");
}
