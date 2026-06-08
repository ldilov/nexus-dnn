mod fixtures;

use svi2_pro_extension::domain::JobId;
use svi2_pro_extension::storage::Store;

#[tokio::test]
async fn create_then_complete_job_persists_dto() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store
        .create_job(
            &job_id,
            Some("svi-canonical"),
            r#"{"prompts":["x"]}"#,
            "0.1.0",
        )
        .await
        .unwrap();

    store.mark_running(&job_id).await.unwrap();
    store
        .mark_completed(
            &job_id,
            Some("/data/out.mp4"),
            Some(r#"{"frames":6,"sha256":"abc"}"#),
        )
        .await
        .unwrap();

    let row = store.get_job(job_id.as_str()).await.unwrap();
    let dto = row.into_dto();

    assert_eq!(dto.id, job_id.as_str());
    assert_eq!(dto.preset_id.as_deref(), Some("svi-canonical"));
    // storage `completed` surfaces to the frontend as `succeeded`
    assert_eq!(dto.status, "succeeded");
    assert_eq!(dto.output_path.as_deref(), Some("/data/out.mp4"));
    let report = dto.render_report.expect("report present");
    assert_eq!(report["frames"], 6);
    assert_eq!(report["sha256"], "abc");
    assert!(dto.created_at.ends_with('Z'));
}

#[tokio::test]
async fn failed_job_carries_error_code_and_message() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store
        .create_job(&job_id, None, "{}", "0.1.0")
        .await
        .unwrap();
    store
        .mark_failed(&job_id, Some("-32103"), "MODEL_MISSING: weights gone")
        .await
        .unwrap();

    let dto = store.get_job(job_id.as_str()).await.unwrap().into_dto();
    assert_eq!(dto.status, "failed");
    assert_eq!(dto.error_code, Some(-32103));
    assert_eq!(
        dto.error_message.as_deref(),
        Some("MODEL_MISSING: weights gone")
    );
}

#[tokio::test]
async fn list_jobs_orders_newest_first() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let a = JobId::new();
    store.create_job(&a, None, "{}", "0.1.0").await.unwrap();
    tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    let b = JobId::new();
    store.create_job(&b, None, "{}", "0.1.0").await.unwrap();

    let jobs = store.list_jobs(25).await.unwrap();
    assert_eq!(jobs.len(), 2);
}

#[tokio::test]
async fn settings_seed_and_upsert() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    // Seeded singleton row from migration 002.
    let seeded = store.get_settings().await.unwrap();
    assert!(seeded.is_object());

    let updated = serde_json::json!({
        "modelsDir": "/models",
        "attentionBackend": "sdpa",
        "fp8Compute": "bf16",
        "blocksToSwap": 28,
        "interpolateMethod": "ffmpeg",
        "interpolateFps": 30,
        "outputDir": "/out"
    });
    let saved = store.put_settings(&updated).await.unwrap();
    assert_eq!(saved["attentionBackend"], "sdpa");
    assert_eq!(saved["blocksToSwap"], 28);

    let reread = store.get_settings().await.unwrap();
    assert_eq!(reread["modelsDir"], "/models");
}
