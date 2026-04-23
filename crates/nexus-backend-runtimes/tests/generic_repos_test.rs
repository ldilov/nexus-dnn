//! Integration tests for the generic backend-runtime SQLite repos (T017).
//!
//! Each repo (`catalog`, `installs`, `settings`, `leases`) is covered for:
//! upsert/insert idempotency, unique-constraint behaviour, state transitions,
//! and NotFound semantics.

mod common;

use common::make_runtime_pool;

use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::generic::catalog::{
    BackendRuntimeCatalogRepo, CatalogEntry, SqliteCatalogRepo,
};
use nexus_backend_runtimes::generic::enums::{
    ImplementationStatus, InstallStatus, LeaseState, OwnerKind, PipelineFailureCategory, Transport,
};
use nexus_backend_runtimes::generic::errors::GenericRepoError;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, ContributionChecksum, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
    RuntimeLeaseId, SourceExtensionId,
};
use nexus_backend_runtimes::generic::installs::{
    BackendRuntimeInstallsRepo, InstallRecord, SqliteInstallsRepo,
};
use nexus_backend_runtimes::generic::leases::{
    BackendRuntimeLeasesRepo, LeaseRecord, SqliteLeasesRepo,
};
use nexus_backend_runtimes::generic::settings::{BackendRuntimeSettingsRepo, SqliteSettingsRepo};

fn rid(s: &str) -> RuntimeId {
    RuntimeId::try_from(s).unwrap()
}

fn checksum(byte: char) -> ContributionChecksum {
    ContributionChecksum::new(std::iter::repeat(byte).take(64).collect::<String>()).unwrap()
}

fn sample_entry(runtime_id: &str, source_ext: &str, csum: char) -> CatalogEntry {
    CatalogEntry {
        runtime_id: rid(runtime_id),
        display_name: "Test Runtime".into(),
        source_extension_id: SourceExtensionId::from(source_ext),
        source_extension_version: "0.1.0".into(),
        contribution_checksum: checksum(csum),
        runtime_family: RuntimeFamily::Python,
        transport: Transport::Stdio,
        implementation_status: ImplementationStatus::Available,
        version_manifest_path: "runtimes/v.yaml".into(),
        worker_entrypoint: "worker/main.py".into(),
        capability_tags: vec!["tts".into(), "dialogue".into()],
        supported_roles: vec!["primary".into()],
        created_at: 1_700_000_000,
        updated_at: 1_700_000_000,
    }
}

fn sample_install(runtime_id: &str, release: &str, platform: &str, profile: &str) -> InstallRecord {
    InstallRecord {
        runtime_install_id: RuntimeInstallId::new(),
        runtime_id: rid(runtime_id),
        release_id: ReleaseId::try_from(release).unwrap(),
        platform: PlatformId::try_from(platform).unwrap(),
        accelerator_profile: AcceleratorProfile::try_from(profile).unwrap(),
        install_path: format!("/install/{runtime_id}"),
        entrypoint_path: None,
        artifact_hash: None,
        status: InstallStatus::Pending,
        current_phase: None,
        validated_at: None,
        last_failure_category: None,
        last_failure_detail: None,
        created_at: 1_700_000_000,
        updated_at: 1_700_000_000,
    }
}

// -----------------------------------------------------------------------------
// Catalog
// -----------------------------------------------------------------------------

#[tokio::test]
async fn catalog_upsert_is_idempotent_on_same_checksum() {
    let pool = make_runtime_pool().await;
    let repo = SqliteCatalogRepo::new(pool);

    let entry = sample_entry("test.echo", "ext.a", 'a');
    repo.upsert(&entry).await.unwrap();
    repo.upsert(&entry).await.unwrap();
    repo.upsert(&entry).await.unwrap();

    let all = repo.list_all().await.unwrap();
    assert_eq!(all.len(), 1);
    assert_eq!(all[0], entry);
}

#[tokio::test]
async fn catalog_upsert_replaces_on_checksum_change() {
    let pool = make_runtime_pool().await;
    let repo = SqliteCatalogRepo::new(pool);

    let mut entry = sample_entry("test.echo", "ext.a", 'a');
    repo.upsert(&entry).await.unwrap();

    // Simulate a re-contribution with a changed checksum.
    entry.contribution_checksum = checksum('b');
    entry.display_name = "Updated Runtime".into();
    entry.updated_at = 1_700_000_100;
    repo.upsert(&entry).await.unwrap();

    let fetched = repo.find_by_id(&rid("test.echo")).await.unwrap().unwrap();
    assert_eq!(fetched.contribution_checksum, checksum('b'));
    assert_eq!(fetched.display_name, "Updated Runtime");
}

#[tokio::test]
async fn catalog_list_by_source_extension_filters_correctly() {
    let pool = make_runtime_pool().await;
    let repo = SqliteCatalogRepo::new(pool);

    repo.upsert(&sample_entry("a.one", "ext.a", 'a'))
        .await
        .unwrap();
    repo.upsert(&sample_entry("a.two", "ext.a", 'b'))
        .await
        .unwrap();
    repo.upsert(&sample_entry("b.one", "ext.b", 'c'))
        .await
        .unwrap();

    let ext_a = repo
        .list_by_source_extension(&SourceExtensionId::from("ext.a"))
        .await
        .unwrap();
    assert_eq!(ext_a.len(), 2);
    assert!(
        ext_a
            .iter()
            .all(|e| e.source_extension_id.as_str() == "ext.a")
    );
}

#[tokio::test]
async fn catalog_set_status_transitions_lifecycle() {
    let pool = make_runtime_pool().await;
    let repo = SqliteCatalogRepo::new(pool);

    repo.upsert(&sample_entry("test.echo", "ext.a", 'a'))
        .await
        .unwrap();
    repo.set_status(&rid("test.echo"), ImplementationStatus::Unavailable)
        .await
        .unwrap();

    let fetched = repo.find_by_id(&rid("test.echo")).await.unwrap().unwrap();
    assert_eq!(
        fetched.implementation_status,
        ImplementationStatus::Unavailable
    );
}

#[tokio::test]
async fn catalog_set_status_on_missing_returns_not_found() {
    let pool = make_runtime_pool().await;
    let repo = SqliteCatalogRepo::new(pool);

    let err = repo
        .set_status(&rid("missing.runtime"), ImplementationStatus::Abandoned)
        .await
        .unwrap_err();
    assert!(matches!(err, GenericRepoError::NotFound));
}

// -----------------------------------------------------------------------------
// Installs
// -----------------------------------------------------------------------------

#[tokio::test]
async fn installs_insert_unique_tuple_rejects_duplicates() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    let first = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    repo.insert(&first).await.unwrap();

    let duplicate = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    let err = repo.insert(&duplicate).await.unwrap_err();
    assert!(
        matches!(err, GenericRepoError::UniqueViolation(_)),
        "expected UniqueViolation, got {err:?}"
    );
}

#[tokio::test]
async fn installs_different_profile_or_platform_coexists() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    repo.insert(&sample_install("test.echo", "v0_1_0", "windows-x64", "cpu"))
        .await
        .unwrap();
    repo.insert(&sample_install(
        "test.echo",
        "v0_1_0",
        "windows-x64",
        "cuda13_1",
    ))
    .await
    .unwrap();
    repo.insert(&sample_install("test.echo", "v0_1_0", "linux-x64", "cpu"))
        .await
        .unwrap();

    let all = repo.list_by_runtime(&rid("test.echo")).await.unwrap();
    assert_eq!(all.len(), 3);
}

#[tokio::test]
async fn installs_record_success_then_find_validated() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    let install = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    let install_id = install.runtime_install_id;
    repo.insert(&install).await.unwrap();
    repo.record_success(
        &install_id,
        Some("python.exe"),
        Some("abc123"),
        1_700_000_500,
    )
    .await
    .unwrap();

    let found = repo
        .find_validated(
            &rid("test.echo"),
            &ReleaseId::try_from("v0_1_0").unwrap(),
            &PlatformId::try_from("windows-x64").unwrap(),
            &AcceleratorProfile::try_from("cpu").unwrap(),
        )
        .await
        .unwrap()
        .unwrap();
    assert_eq!(found.status, InstallStatus::Validated);
    assert_eq!(found.entrypoint_path.as_deref(), Some("python.exe"));
    assert_eq!(found.validated_at, Some(1_700_000_500));
}

#[tokio::test]
async fn installs_record_failure_stamps_category() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    let install = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    let install_id = install.runtime_install_id;
    repo.insert(&install).await.unwrap();
    repo.record_failure(
        &install_id,
        PipelineFailureCategory::HandshakeFailed,
        "handshake timed out after 30s",
    )
    .await
    .unwrap();

    let fetched = repo.get(&install_id).await.unwrap().unwrap();
    assert_eq!(fetched.status, InstallStatus::Failed);
    assert_eq!(
        fetched.last_failure_category,
        Some(PipelineFailureCategory::HandshakeFailed)
    );
    assert_eq!(
        fetched.last_failure_detail.as_deref(),
        Some("handshake timed out after 30s")
    );
}

#[tokio::test]
async fn installs_roundtrips_custom_failure_category() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    let install = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    let install_id = install.runtime_install_id;
    repo.insert(&install).await.unwrap();
    repo.record_failure(
        &install_id,
        PipelineFailureCategory::Custom("ffmpeg_missing".into()),
        "ffmpeg is not installed",
    )
    .await
    .unwrap();

    let fetched = repo.get(&install_id).await.unwrap().unwrap();
    assert_eq!(
        fetched.last_failure_category,
        Some(PipelineFailureCategory::Custom("ffmpeg_missing".into()))
    );
}

#[tokio::test]
async fn installs_mark_abandoned_spares_terminal_rows() {
    let pool = make_runtime_pool().await;
    let repo = SqliteInstallsRepo::new(pool);

    let pending = sample_install("test.echo", "v0_1_0", "windows-x64", "cpu");
    let pending_id = pending.runtime_install_id;
    repo.insert(&pending).await.unwrap();

    let validated = sample_install("test.echo", "v0_2_0", "windows-x64", "cpu");
    let validated_id = validated.runtime_install_id;
    repo.insert(&validated).await.unwrap();
    repo.record_success(&validated_id, None, None, 1_700_000_500)
        .await
        .unwrap();

    repo.mark_abandoned_for_runtime(&rid("test.echo"))
        .await
        .unwrap();

    assert_eq!(
        repo.get(&pending_id).await.unwrap().unwrap().status,
        InstallStatus::Abandoned
    );
    // Validated survives — terminal status is spared.
    assert_eq!(
        repo.get(&validated_id).await.unwrap().unwrap().status,
        InstallStatus::Validated
    );
}

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

#[tokio::test]
async fn settings_upsert_is_idempotent_by_runtime_id() {
    let pool = make_runtime_pool().await;
    let repo = SqliteSettingsRepo::new(pool);

    let first = repo
        .upsert(&rid("test.echo"), Some("cpu"), None, serde_json::json!({}))
        .await
        .unwrap();
    let second = repo
        .upsert(
            &rid("test.echo"),
            Some("cuda:0"),
            Some("gguf.llama"),
            serde_json::json!({"FOO": "bar"}),
        )
        .await
        .unwrap();

    // Same runtime, so the same PK is preserved.
    assert_eq!(first.runtime_settings_id, second.runtime_settings_id);
    assert_eq!(second.default_device.as_deref(), Some("cuda:0"));
    assert_eq!(
        second.default_model_family_id.as_deref(),
        Some("gguf.llama")
    );
    assert_eq!(second.env_overrides["FOO"], "bar");
}

#[tokio::test]
async fn settings_forward_compat_columns_default_correctly() {
    let pool = make_runtime_pool().await;
    let repo = SqliteSettingsRepo::new(pool);

    let s = repo
        .upsert(&rid("test.echo"), None, None, serde_json::json!({}))
        .await
        .unwrap();
    assert_eq!(s.keep_warm_default, 1);
    assert_eq!(s.idle_timeout_seconds, 0);
}

#[tokio::test]
async fn settings_get_on_missing_returns_none() {
    let pool = make_runtime_pool().await;
    let repo = SqliteSettingsRepo::new(pool);
    assert!(repo.get(&rid("nope.none")).await.unwrap().is_none());
}

// -----------------------------------------------------------------------------
// Leases
// -----------------------------------------------------------------------------

fn sample_lease(install_id: RuntimeInstallId) -> LeaseRecord {
    LeaseRecord {
        lease_id: RuntimeLeaseId::new(),
        runtime_install_id: install_id,
        owner_kind: OwnerKind::Deployment,
        owner_ref: "dep-001".into(),
        transport: Transport::Stdio,
        endpoint_json: None,
        pid: None,
        state: LeaseState::Starting,
        crash_recovered: false,
        last_failure_category: None,
        acquired_at: 1_700_001_000,
        released_at: None,
    }
}

#[tokio::test]
async fn leases_insert_and_state_transition() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool);

    let install_id = RuntimeInstallId::new();
    let lease = sample_lease(install_id);
    let lease_id = lease.lease_id;
    repo.insert(&lease).await.unwrap();

    repo.update_state(&lease_id, LeaseState::Ready)
        .await
        .unwrap();
    repo.set_pid(&lease_id, Some(4321)).await.unwrap();

    let fetched = repo.get(&lease_id).await.unwrap().unwrap();
    assert_eq!(fetched.state, LeaseState::Ready);
    assert_eq!(fetched.pid, Some(4321));
    assert!(!fetched.crash_recovered);
}

#[tokio::test]
async fn leases_record_released_stamps_timestamp() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool);

    let install_id = RuntimeInstallId::new();
    let lease = sample_lease(install_id);
    let lease_id = lease.lease_id;
    repo.insert(&lease).await.unwrap();

    repo.record_released(&lease_id, 1_700_002_000)
        .await
        .unwrap();

    let fetched = repo.get(&lease_id).await.unwrap().unwrap();
    assert_eq!(fetched.state, LeaseState::Released);
    assert_eq!(fetched.released_at, Some(1_700_002_000));
}

#[tokio::test]
async fn leases_record_failed_captures_category() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool);

    let lease = sample_lease(RuntimeInstallId::new());
    let lease_id = lease.lease_id;
    repo.insert(&lease).await.unwrap();

    repo.record_failed(
        &lease_id,
        PipelineFailureCategory::WorkerStartFailed,
        1_700_002_500,
    )
    .await
    .unwrap();

    let fetched = repo.get(&lease_id).await.unwrap().unwrap();
    assert_eq!(fetched.state, LeaseState::Released);
    assert_eq!(
        fetched.last_failure_category,
        Some(PipelineFailureCategory::WorkerStartFailed)
    );
    assert_eq!(fetched.released_at, Some(1_700_002_500));
}

#[tokio::test]
async fn leases_list_live_by_install_filters_terminal_rows() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool);

    let install_id = RuntimeInstallId::new();

    let live = sample_lease(install_id);
    let live_id = live.lease_id;
    repo.insert(&live).await.unwrap();
    repo.update_state(&live_id, LeaseState::Ready)
        .await
        .unwrap();

    let done = sample_lease(install_id);
    let done_id = done.lease_id;
    repo.insert(&done).await.unwrap();
    repo.record_released(&done_id, 1_700_003_000).await.unwrap();

    let live_rows = repo.list_live_by_install(&install_id).await.unwrap();
    assert_eq!(live_rows.len(), 1);
    assert_eq!(live_rows[0].lease_id, live_id);
}

#[tokio::test]
async fn leases_flip_non_terminal_to_released_marks_crash_recovered() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool);

    // Two non-terminal rows + one already released → only the first two flip.
    let install_id = RuntimeInstallId::new();
    let a = sample_lease(install_id);
    let a_id = a.lease_id;
    let b = sample_lease(install_id);
    let c = sample_lease(install_id);
    let c_id = c.lease_id;
    repo.insert(&a).await.unwrap();
    repo.insert(&b).await.unwrap();
    repo.insert(&c).await.unwrap();
    repo.record_released(&c_id, 1_700_003_000).await.unwrap();

    let flipped = repo
        .flip_non_terminal_to_released(1_700_004_000)
        .await
        .unwrap();
    assert_eq!(flipped, 2);

    let recovered = repo.get(&a_id).await.unwrap().unwrap();
    assert_eq!(recovered.state, LeaseState::Released);
    assert!(recovered.crash_recovered);
    assert_eq!(recovered.released_at, Some(1_700_004_000));
}
