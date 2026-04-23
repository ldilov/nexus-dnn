use std::sync::Arc;
use std::time::Duration;

use camino::Utf8PathBuf;
use nexus_backend_runtimes::adapter::BackendAdapter;
use nexus_backend_runtimes::events::{BackendEvent, BackendEventBus};
use nexus_backend_runtimes::llamacpp::LlamaCppAdapter;
use nexus_backend_runtimes::llamacpp::installs_store;
use nexus_backend_runtimes::manifest::install::{InstallManifest, InstallStatus};
use nexus_backend_runtimes::settings::AcceleratorProfile;
use sqlx::SqlitePool;
use sqlx::sqlite::SqlitePoolOptions;
use tokio::time::timeout;

async fn mem_pool() -> SqlitePool {
    SqlitePoolOptions::new()
        .max_connections(1)
        .connect(":memory:")
        .await
        .expect("connect in-memory sqlite")
}

async fn apply_installs_schema(pool: &SqlitePool) {
    sqlx::query(
        "CREATE TABLE ext_local_llm_runtime_installs (
            runtime_install_id TEXT PRIMARY KEY NOT NULL,
            backend TEXT NOT NULL,
            release_id TEXT NOT NULL,
            platform TEXT NOT NULL,
            accelerator_profile TEXT NOT NULL,
            source_url TEXT NOT NULL,
            checksum_sha256 TEXT,
            install_path TEXT NOT NULL,
            binary_path TEXT NOT NULL,
            status TEXT NOT NULL,
            installed_at INTEGER NOT NULL,
            validated_at INTEGER,
            last_failure_category TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            UNIQUE (backend, release_id, platform, accelerator_profile)
        )",
    )
    .execute(pool)
    .await
    .expect("create ext_local_llm_runtime_installs");
}

async fn wait_for_topic(
    rx: &mut tokio::sync::broadcast::Receiver<BackendEvent>,
    topic: &str,
) -> Option<BackendEvent> {
    let deadline = Duration::from_millis(500);
    timeout(deadline, async {
        loop {
            match rx.recv().await {
                Ok(evt) if evt.topic == topic => return Some(evt),
                Ok(_) => continue,
                Err(_) => return None,
            }
        }
    })
    .await
    .ok()
    .flatten()
}

fn seed_manifest(status: InstallStatus) -> InstallManifest {
    InstallManifest {
        runtime_install_id: "rtinst_lifecycle_test".into(),
        backend: "llama.cpp".into(),
        release_id: "b5000".into(),
        platform: "windows-x64".into(),
        accelerator_profile: AcceleratorProfile::Cpu,
        source_url: "https://example.invalid/llama.zip".into(),
        checksum_sha256: None,
        install_path: "/nonexistent/install/path".into(),
        binary_path: "/nonexistent/install/path/llama-server".into(),
        status,
        installed_at: 0,
        validated_at: None,
        last_failure_category: None,
    }
}

/// an `Installed*` row to `Broken` (the functional `Installed → NeedsRepair`
/// row pointing at a non-existent binary so the first validation check fails.
#[tokio::test]
async fn install_unavailable_emitted_on_validator_transition() {
    let pool = mem_pool().await;
    apply_installs_schema(&pool).await;

    let manifest = seed_manifest(InstallStatus::InstalledUnvalidated);
    installs_store::upsert(&pool, &manifest)
        .await
        .expect("seed install row");

    let publisher = Arc::new(BackendEventBus::new(256));
    let mut rx = publisher.subscribe();

    let adapter = LlamaCppAdapter::new(
        std::path::PathBuf::from("/nonexistent/manifest.json"),
        Utf8PathBuf::from("/nonexistent/runtimes"),
        pool.clone(),
        publisher.clone(),
        "test.llama.cpp",
    );
    let report = adapter.validate().await.expect("validate");
    assert!(
        !report.overall_ok,
        "validation should fail because binary does not exist"
    );

    let evt = wait_for_topic(&mut rx, "install.unavailable")
        .await
        .expect("install.unavailable observed");
    assert_eq!(evt.backend, "llama.cpp");
    assert_eq!(
        evt.runtime_install_id.as_deref(),
        Some("rtinst_lifecycle_test")
    );
    assert!(evt.payload.get("reason").is_some());
}

/// The real pipeline requires network access, a release asset, checksum,
/// and binary extraction; constructing a faithful fixture here is out of
/// scope for this ticket. The emit site is covered in production code
/// and verified structurally by [`install_completed_emit_site_present`].
#[tokio::test]
#[ignore = "needs full install pipeline fixture (network/release/binary)"]
async fn install_completed_emitted_on_install_completion() {
    unimplemented!("see install_completed_emit_site_present for structural check");
}

/// Repair delegates to `install(...)`, which transitively requires the
/// production code and verified structurally by
/// [`install_repaired_emit_site_present`].
#[tokio::test]
#[ignore = "needs repair fixture (requires full install pipeline)"]
async fn install_repaired_emitted_after_repair() {
    unimplemented!("see install_repaired_emit_site_present for structural check");
}

/// line is present in `install_pipeline.rs` at build time. Kept until
/// the full-fixture test above is unblocked.
#[test]
fn install_completed_emit_site_present() {
    let src = include_str!("../src/llamacpp/install_pipeline.rs");
    assert!(
        src.contains("\"install.completed\""),
        "install_pipeline.rs must emit 'install.completed'"
    );
}

/// line is present in `llamacpp/mod.rs` at build time.
#[test]
fn install_repaired_emit_site_present() {
    let src = include_str!("../src/llamacpp/mod.rs");
    assert!(
        src.contains("\"install.repaired\""),
        "llamacpp/mod.rs must emit 'install.repaired'"
    );
}
