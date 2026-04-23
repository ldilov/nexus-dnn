//! Host-startup crash-recovery sweep (R-05).
//!
//! Any lease row left in a non-terminal state across a host restart is
//! orphaned — the worker subprocess that was serving it is either gone or
//! disowned. This sweep:
//!
//! 1. snapshots the (lease_id, pid) of every non-terminal row with a
//!    non-null PID;
//! 2. flips all non-terminal rows to `released` with `crash_recovered=1`
//!    via the repo's single-statement UPDATE;
//! 3. probes each snapshotted PID for liveness; if a process still exists,
//!    attempts to terminate it and emits a structured warning so the
//!    operator knows an orphan was reaped.

use sqlx::Row;
use sqlx::sqlite::SqlitePool;
use sysinfo::{Pid, ProcessesToUpdate, System};
use tracing::warn;

use super::repo::BackendRuntimeLeasesRepo;
use crate::generic::errors::GenericRepoError;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CrashRecoveryReport {
    /// Total non-terminal rows flipped to `released`.
    pub flipped_count: u64,
    /// PIDs snapshotted before the flip. Some may be dead already.
    pub snapshotted_pids: Vec<i32>,
    /// Subset of [`snapshotted_pids`] that were still alive and got sent
    /// a termination signal. Useful for tests + operator visibility.
    pub terminated_pids: Vec<i32>,
}

/// Run the sweep. Returns a [`CrashRecoveryReport`] so the host bootstrap
/// can log a summary and tests can assert behaviour.
pub async fn run_crash_recovery_sweep(
    pool: &SqlitePool,
    repo: &dyn BackendRuntimeLeasesRepo,
    released_at: i64,
) -> Result<CrashRecoveryReport, GenericRepoError> {
    let snapshotted_pids = snapshot_non_terminal_pids(pool).await?;
    let flipped_count = repo.flip_non_terminal_to_released(released_at).await?;

    let terminated_pids = terminate_orphan_pids(&snapshotted_pids);

    Ok(CrashRecoveryReport {
        flipped_count,
        snapshotted_pids,
        terminated_pids,
    })
}

async fn snapshot_non_terminal_pids(pool: &SqlitePool) -> Result<Vec<i32>, GenericRepoError> {
    let rows = sqlx::query(
        "SELECT pid FROM backend_runtime_leases
         WHERE state NOT IN ('released','failed')
           AND pid IS NOT NULL",
    )
    .fetch_all(pool)
    .await?;

    rows.into_iter()
        .map(|row| row.try_get::<i32, _>("pid").map_err(Into::into))
        .collect()
}

fn terminate_orphan_pids(pids: &[i32]) -> Vec<i32> {
    if pids.is_empty() {
        return Vec::new();
    }

    let mut sys = System::new();
    let pid_objs: Vec<Pid> = pids
        .iter()
        .filter(|p| **p > 0)
        .map(|p| Pid::from_u32(*p as u32))
        .collect();
    sys.refresh_processes(ProcessesToUpdate::Some(&pid_objs), true);

    let mut terminated = Vec::new();
    for pid in pids {
        if *pid <= 0 {
            continue;
        }
        let pid_obj = Pid::from_u32(*pid as u32);
        if let Some(proc) = sys.process(pid_obj) {
            let killed = proc.kill();
            warn!(
                pid = pid,
                killed = killed,
                "orphan worker process detected during crash-recovery sweep"
            );
            if killed {
                terminated.push(*pid);
            }
        }
    }
    terminated
}
