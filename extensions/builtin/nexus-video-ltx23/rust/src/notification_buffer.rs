//! Segment-status write coalescing for high-segment-count renders.
//!
//! Background: the worker fires `ltx.video.segment.started` +
//! `ltx.video.segment.completed` for every segment in a chain.
//!
//! The notification handler in `runner.rs` translates each into a
//! `Repos::update_segment_status` call, which awaits a `SQLite` UPDATE.
//! For a 60-segment render that's ~120 serialised round-trips — each
//! cheap (~1 ms locally) but back-to-back on the notification task's
//! critical path.
//!
//! This module batches the writes through an mpsc channel + a 50 ms
//! flusher task. The flusher drains every pending update into a single
//! sqlx transaction, cutting wall-clock-per-flush from N×roundtrip to
//! 1×roundtrip + N statements inside one transaction.
//!
//! Design choice: **no coalescing**. A naive latest-wins map keyed on
//! `(run_id, segment_index)` would drop the `started_at` timestamp
//! when `started` and `completed` for the same segment land in the
//! same 50 ms window (which the fake-runtime test fixture absolutely
//! does). Preserving every update in order is cheap (the segment is
//! 4-byte status + 4-byte index + small strings) and keeps the row's
//! `started_at` / `completed_at` columns correct under any pacing.
//!
//! Lifecycle:
//! - `NotificationBuffer::new(repos, flush_interval)` spawns the
//!   flusher task and returns a handle. The caller holds the handle.
//! - Dropping the buffer closes the channel; the flusher drains the
//!   final batch + exits cleanly. The returned `JoinHandle` lets the
//!   caller await termination if it needs DB-consistency at shutdown.
//! - `flush_now()` blocks until the buffer is empty (used by the
//!   runner at terminal-state transitions so tests can read the row
//!   without racing the flusher).

use std::time::Duration;

use tokio::sync::{mpsc, oneshot};
use tokio::task::JoinHandle;
use tokio::time::interval;

use crate::errors::Result;
use crate::storage::Repos;

/// One segment status mutation queued for batched apply. Matches the
/// argument shape of `Repos::update_segment_status` so the flusher
/// can apply each entry without re-deriving anything.
#[derive(Debug, Clone)]
pub struct SegmentStatusWrite {
    pub run_id: String,
    pub segment_index: i64,
    pub status: String,
    pub preview_artifact_id: Option<String>,
}

/// Message carried over the buffer's mpsc channel. The Flush variant
/// carries a oneshot the sender awaits to confirm a manual drain.
enum Msg {
    Write(SegmentStatusWrite),
    Flush(oneshot::Sender<()>),
}

/// Default flush cadence.
///
/// 50 ms balances UI freshness (the SWR poll runs at 1 Hz) against
/// round-trip amortisation. At 60-segment pacing with 75 s per
/// segment, this still produces well under 1 flush per minute of
/// real-time, so the flusher is idle most of the wall-clock budget.
pub const DEFAULT_FLUSH_INTERVAL: Duration = Duration::from_millis(50);

/// Bounded channel capacity. A burst of 240 status updates (60-segment
/// render with started+completed×4 retries each) still fits with room
/// to spare; senders only ever block if the flusher is wedged, which
/// is exactly when backpressure helps.
const CHANNEL_CAPACITY: usize = 512;

#[derive(Clone)]
pub struct NotificationBuffer {
    tx: mpsc::Sender<Msg>,
}

impl NotificationBuffer {
    /// Spawn the flusher task and return a handle pair: the buffer
    /// itself (cheap to clone, send-only) and the `JoinHandle` for
    /// the flusher task (awaited at runtime shutdown for clean DB
    /// drain).
    #[must_use]
    pub fn new(repos: Repos, flush_interval: Duration) -> (Self, JoinHandle<()>) {
        let (tx, rx) = mpsc::channel::<Msg>(CHANNEL_CAPACITY);
        let handle = tokio::spawn(flush_loop(repos, rx, flush_interval));
        (Self { tx }, handle)
    }

    /// Enqueue one segment-status write. Returns Err only if the
    /// flusher task has terminated (channel closed) — the caller
    /// can fall back to a direct DB write if that matters.
    pub async fn enqueue(&self, write: SegmentStatusWrite) -> Result<()> {
        self.tx.send(Msg::Write(write)).await.map_err(|_| {
            crate::errors::ExtensionError::Internal("notification buffer flusher dropped".into())
        })?;
        Ok(())
    }

    /// Block until every update sent BEFORE this call has been applied
    /// to the DB. The runner calls this before reading a terminal-
    /// state row so the polling client sees a consistent snapshot.
    /// Errors mean the flusher is dead — the caller should treat the
    /// DB as best-effort.
    pub async fn flush_now(&self) -> Result<()> {
        let (ack_tx, ack_rx) = oneshot::channel();
        self.tx.send(Msg::Flush(ack_tx)).await.map_err(|_| {
            crate::errors::ExtensionError::Internal("notification buffer flusher dropped".into())
        })?;
        ack_rx.await.map_err(|_| {
            crate::errors::ExtensionError::Internal(
                "notification buffer flusher dropped during flush".into(),
            )
        })
    }
}

async fn flush_loop(repos: Repos, mut rx: mpsc::Receiver<Msg>, flush_interval: Duration) {
    let mut batch: Vec<SegmentStatusWrite> = Vec::new();
    let mut ticker = interval(flush_interval);
    // The first tick fires immediately; skip it so the batch doesn't
    // attempt a flush on an empty queue at startup.
    ticker.tick().await;

    loop {
        tokio::select! {
            msg = rx.recv() => match msg {
                Some(Msg::Write(write)) => {
                    batch.push(write);
                }
                Some(Msg::Flush(ack)) => {
                    if !batch.is_empty() {
                        apply_batch(&repos, &batch).await;
                        batch.clear();
                    }
                    // Best-effort ack — receiver may have dropped.
                    let _ = ack.send(());
                }
                None => {
                    // Channel closed (all senders dropped). Drain
                    // anything pending then exit.
                    if !batch.is_empty() {
                        apply_batch(&repos, &batch).await;
                    }
                    return;
                }
            },
            _ = ticker.tick() => {
                if !batch.is_empty() {
                    apply_batch(&repos, &batch).await;
                    batch.clear();
                }
            }
        }
    }
}

async fn apply_batch(repos: &Repos, batch: &[SegmentStatusWrite]) {
    if batch.is_empty() {
        return;
    }
    // Use the existing per-row method but inside a single sqlx
    // transaction so the N round-trips collapse to one commit. The
    if let Err(e) = repos.update_segment_status_batch(batch).await {
        tracing::warn!(
            extension_id = "nexus.video.ltx23",
            batch_size = batch.len(),
            error = %e,
            "notification buffer: batch flush failed; UI segment status will lag"
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::storage::{RenderRunRow, RenderSegmentRow};
    use chrono::Utc;
    use sqlx::sqlite::SqlitePoolOptions;
    use tokio::time::sleep;

    async fn setup_repos() -> Repos {
        let pool = SqlitePoolOptions::new()
            .max_connections(4)
            .connect("sqlite::memory:")
            .await
            .expect("open sqlite");

        sqlx::query(
            "CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__schema_versions (\
                 version INTEGER PRIMARY KEY,\
                 name TEXT NOT NULL,\
                 applied_at TEXT NOT NULL\
             )",
        )
        .execute(&pool)
        .await
        .unwrap();

        for migration in crate::migrations::MIGRATIONS {
            let mut tx = pool.begin().await.unwrap();
            sqlx::raw_sql(migration.sql)
                .execute(&mut *tx)
                .await
                .unwrap();
            sqlx::query(
                "INSERT INTO ext_nexus_video_ltx23__schema_versions (version, name, applied_at) VALUES (?, ?, ?)",
            )
            .bind(i64::from(migration.version))
            .bind(migration.name)
            .bind(Utc::now().to_rfc3339())
            .execute(&mut *tx)
            .await
            .unwrap();
            tx.commit().await.unwrap();
        }

        Repos::from_pool(pool)
    }

    async fn seed_run_and_segments(repos: &Repos, run_id: &str, segment_count: u32) {
        let now = Utc::now();
        repos
            .insert_run(&RenderRunRow {
                id: run_id.into(),
                project_id: "test".into(),
                status: "queued".into(),
                runtime_profile: Some("fake".into()),
                requested_duration_seconds: 4.0,
                planned_duration_seconds: Some(4.0),
                width: 832,
                height: 480,
                base_fps: 24,
                output_fps: 48,
                segment_count: i64::from(segment_count),
                seed: None,
                quality_preset: "balanced".into(),
                render_mode: "external_segments".into(),
                request_json: "{}".into(),
                plan_json: Some("{}".into()),
                error_code: None,
                error_message: None,
                final_artifact_id: None,
                created_at: now,
                started_at: None,
                completed_at: None,
                cancelled_at: None,
                restart_count: 0,
                max_restart_count: 3,
                last_breach_reason: None,
            })
            .await
            .unwrap();

        let segments: Vec<RenderSegmentRow> = (0..segment_count)
            .map(|i| RenderSegmentRow {
                id: format!("{run_id}-seg{i}"),
                run_id: run_id.into(),
                segment_index: i64::from(i),
                status: "queued".into(),
                start_time_seconds: f64::from(i * 4),
                duration_seconds: 4.0,
                overlap_seconds: 0.0,
                frame_count: 97,
                seed: Some(i64::from(i)),
                prompt: None,
                negative_prompt: None,
                preview_artifact_id: None,
                raw_video_artifact_id: None,
                error_code: None,
                error_message: None,
                started_at: None,
                completed_at: None,
            })
            .collect();
        repos.insert_segments(&segments).await.unwrap();
    }

    fn write(run_id: &str, idx: i64, status: &str) -> SegmentStatusWrite {
        SegmentStatusWrite {
            run_id: run_id.into(),
            segment_index: idx,
            status: status.into(),
            preview_artifact_id: None,
        }
    }

    #[tokio::test]
    async fn flush_now_drains_pending_writes() {
        let repos = setup_repos().await;
        seed_run_and_segments(&repos, "run-flush", 3).await;
        let (buf, handle) = NotificationBuffer::new(repos.clone(), Duration::from_secs(60));

        // Three writes for distinct segments — all should land in one batch.
        buf.enqueue(write("run-flush", 0, "rendering"))
            .await
            .unwrap();
        buf.enqueue(write("run-flush", 1, "rendering"))
            .await
            .unwrap();
        buf.enqueue(write("run-flush", 2, "completed"))
            .await
            .unwrap();

        // flush_now must be observable BEFORE the 60s tick fires.
        buf.flush_now().await.unwrap();

        let segs = repos.list_segments("run-flush").await.unwrap();
        assert_eq!(segs.len(), 3);
        assert_eq!(segs[0].status, "rendering");
        assert_eq!(segs[1].status, "rendering");
        assert_eq!(segs[2].status, "completed");
        assert!(
            segs[0].started_at.is_some(),
            "rendering must populate started_at"
        );
        assert!(
            segs[2].completed_at.is_some(),
            "completed must populate completed_at"
        );

        // Drop the buffer; flusher exits cleanly.
        drop(buf);
        handle.await.unwrap();
    }

    #[tokio::test]
    async fn periodic_tick_flushes_without_explicit_call() {
        let repos = setup_repos().await;
        seed_run_and_segments(&repos, "run-tick", 1).await;
        // Short interval — flusher should fire within a few ticks.
        let (buf, handle) = NotificationBuffer::new(repos.clone(), Duration::from_millis(20));

        buf.enqueue(write("run-tick", 0, "completed"))
            .await
            .unwrap();

        // Poll the DB until the tick lands. 1s timeout — plenty.
        let deadline = std::time::Instant::now() + Duration::from_secs(1);
        let final_status = loop {
            sleep(Duration::from_millis(15)).await;
            let segs = repos.list_segments("run-tick").await.unwrap();
            if segs[0].status == "completed" {
                break segs[0].status.clone();
            }
            assert!(
                std::time::Instant::now() <= deadline,
                "periodic tick never fired"
            );
        };
        assert_eq!(final_status, "completed");

        drop(buf);
        handle.await.unwrap();
    }

    #[tokio::test]
    async fn ordered_started_then_completed_preserves_started_at() {
        // The whole reason we DON'T do latest-wins coalescing: with
        // sub-tick transitions, the started_at column would be NULL
        let repos = setup_repos().await;
        seed_run_and_segments(&repos, "run-order", 1).await;
        let (buf, handle) = NotificationBuffer::new(repos.clone(), Duration::from_secs(60));

        // Both writes for segment 0 within the same flush window.
        buf.enqueue(write("run-order", 0, "rendering"))
            .await
            .unwrap();
        buf.enqueue(write("run-order", 0, "completed"))
            .await
            .unwrap();
        buf.flush_now().await.unwrap();

        let segs = repos.list_segments("run-order").await.unwrap();
        assert_eq!(segs[0].status, "completed");
        assert!(
            segs[0].started_at.is_some(),
            "started_at must survive the batch (would be NULL under latest-wins coalescing)"
        );
        assert!(segs[0].completed_at.is_some());

        drop(buf);
        handle.await.unwrap();
    }

    #[tokio::test]
    async fn dropping_buffer_drains_final_batch() {
        let repos = setup_repos().await;
        seed_run_and_segments(&repos, "run-drop", 2).await;
        let (buf, handle) = NotificationBuffer::new(repos.clone(), Duration::from_secs(60));

        buf.enqueue(write("run-drop", 0, "completed"))
            .await
            .unwrap();
        buf.enqueue(write("run-drop", 1, "completed"))
            .await
            .unwrap();
        drop(buf);
        // Joining the flusher proves the channel closed AND the final
        // drain landed before exit.
        handle.await.unwrap();

        let segs = repos.list_segments("run-drop").await.unwrap();
        assert_eq!(segs[0].status, "completed");
        assert_eq!(segs[1].status, "completed");
    }
}
