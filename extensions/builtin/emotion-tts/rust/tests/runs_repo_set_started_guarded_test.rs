//! Backlog Task 6 — verify `RunsRepo::set_started_guarded` only transitions
//! a row when its current status is `queued`. This closes the cancel-vs-
//! `set_started` race in `dispatcher::run_loop::dispatch_inner`.

use chrono::Utc;
use emotion_tts_extension::domain::{DeploymentId, RunId};
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, RunRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {}", m.name, e));
    }
    pool
}

async fn setup() -> (Repos, DeploymentId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let dep = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: "Guard Test".into(),
            backend_runtime_preference: Some("indextts.python".into()),
            default_output_format: "mp3".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: true,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    (repos, dep)
}

async fn insert_run(repos: &Repos, dep: &DeploymentId, status: &str) -> RunId {
    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: status.into(),
            script_snapshot: "[Bob] Hello".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "mp3".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "increment_per_line".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.1.0".into(),
            queued_at: now,
            started_at: None,
            finished_at: if status == "queued" { None } else { Some(now) },
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
            prebuilt_segments_json: None,
        })
        .await
        .unwrap();
    run_id
}

#[tokio::test]
async fn set_started_guarded_promotes_queued_run_to_running() {
    let (repos, dep) = setup().await;
    let run = insert_run(&repos, &dep, "queued").await;
    let now = Utc::now().timestamp();

    let promoted = repos.runs.set_started_guarded(&run, now).await.unwrap();
    assert!(promoted, "queued → running transition must report success");

    let row = repos.runs.get(&run).await.unwrap().unwrap();
    assert_eq!(row.status, "running");
    assert_eq!(row.started_at, Some(now));
}

#[tokio::test]
async fn set_started_guarded_does_not_overwrite_cancelled_run() {
    let (repos, dep) = setup().await;
    // Simulate the race: a cancel arrived between `insert_many` and the
    // dispatcher's start call, so the row is already `cancelled`.
    let run = insert_run(&repos, &dep, "cancelled").await;

    let promoted = repos
        .runs
        .set_started_guarded(&run, Utc::now().timestamp())
        .await
        .unwrap();
    assert!(
        !promoted,
        "guarded set must report no-op when the row is no longer queued"
    );

    let row = repos.runs.get(&run).await.unwrap().unwrap();
    assert_eq!(
        row.status, "cancelled",
        "cancelled status must NOT be overwritten back to running"
    );
    assert_eq!(
        row.started_at, None,
        "started_at must remain unset when the guard short-circuits"
    );
}

#[tokio::test]
async fn set_started_guarded_returns_false_for_unknown_run() {
    let (repos, _dep) = setup().await;
    let phantom = RunId::new();

    let promoted = repos
        .runs
        .set_started_guarded(&phantom, Utc::now().timestamp())
        .await
        .unwrap();
    assert!(!promoted, "missing row must report no-op");
}
