//! Integration test for the host-startup crash-recovery sweep (T028).

mod common;

use common::make_runtime_pool;

use nexus_backend_runtimes::generic::enums::{LeaseState, OwnerKind, Transport};
use nexus_backend_runtimes::generic::ids::{RuntimeInstallId, RuntimeLeaseId};
use nexus_backend_runtimes::generic::leases::crash_recovery::run_crash_recovery_sweep;
use nexus_backend_runtimes::generic::leases::{
    BackendRuntimeLeasesRepo, LeaseRecord, SqliteLeasesRepo,
};

fn lease_in_state(state: LeaseState, pid: Option<i32>) -> LeaseRecord {
    LeaseRecord {
        lease_id: RuntimeLeaseId::new(),
        runtime_install_id: RuntimeInstallId::new(),
        owner_kind: OwnerKind::Deployment,
        owner_ref: "crash-recovery-test".into(),
        transport: Transport::Stdio,
        endpoint_json: None,
        pid,
        state,
        crash_recovered: false,
        last_failure_category: None,
        acquired_at: 1_700_000_000,
        released_at: if matches!(state, LeaseState::Released | LeaseState::Failed) {
            Some(1_700_000_050)
        } else {
            None
        },
    }
}

#[tokio::test]
async fn sweep_flips_non_terminal_rows_and_spares_terminal_ones() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool.clone());

    // Seed: 3 non-terminal (one missing PID) + 1 released + 1 failed.
    let live_a = lease_in_state(LeaseState::Ready, Some(99998));
    let live_a_id = live_a.lease_id;
    let live_b = lease_in_state(LeaseState::Busy, Some(99999));
    let live_b_id = live_b.lease_id;
    let live_no_pid = lease_in_state(LeaseState::Starting, None);
    let live_no_pid_id = live_no_pid.lease_id;

    let mut already_released = lease_in_state(LeaseState::Released, Some(1234));
    already_released.released_at = Some(1_700_000_050);
    let already_released_id = already_released.lease_id;

    let mut already_failed = lease_in_state(LeaseState::Failed, Some(1235));
    already_failed.released_at = Some(1_700_000_050);
    let already_failed_id = already_failed.lease_id;

    for lease in [
        &live_a,
        &live_b,
        &live_no_pid,
        &already_released,
        &already_failed,
    ] {
        repo.insert(lease).await.unwrap();
    }

    let report = run_crash_recovery_sweep(&pool, &repo, 1_700_001_000)
        .await
        .unwrap();

    assert_eq!(report.flipped_count, 3);
    // Only the two non-terminal rows with non-null PIDs get snapshotted.
    assert_eq!(report.snapshotted_pids.len(), 2);
    assert!(report.snapshotted_pids.contains(&99998));
    assert!(report.snapshotted_pids.contains(&99999));
    // The PIDs we picked are almost certainly dead → terminated list is empty.
    assert!(report.terminated_pids.is_empty());

    // Non-terminal rows now released + crash_recovered.
    for id in [live_a_id, live_b_id, live_no_pid_id] {
        let row = repo.get(&id).await.unwrap().unwrap();
        assert_eq!(row.state, LeaseState::Released);
        assert!(row.crash_recovered);
        assert_eq!(row.released_at, Some(1_700_001_000));
    }

    // Pre-existing terminal rows are untouched — released_at preserved,
    // crash_recovered stays false.
    for id in [already_released_id, already_failed_id] {
        let row = repo.get(&id).await.unwrap().unwrap();
        assert!(
            !row.crash_recovered,
            "terminal row must not be re-flagged as crash-recovered"
        );
        assert_eq!(row.released_at, Some(1_700_000_050));
    }
}

#[tokio::test]
async fn sweep_on_empty_db_reports_zero_flips() {
    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool.clone());

    let report = run_crash_recovery_sweep(&pool, &repo, 1_700_002_000)
        .await
        .unwrap();
    assert_eq!(report.flipped_count, 0);
    assert!(report.snapshotted_pids.is_empty());
    assert!(report.terminated_pids.is_empty());
}

#[tokio::test]
async fn sweep_probes_live_pid_and_records_it_in_report() {
    use std::process::{Command, Stdio};

    let pool = make_runtime_pool().await;
    let repo = SqliteLeasesRepo::new(pool.clone());

    // Spawn a process we own — the sweep will find it alive and try to kill it.
    // Cross-platform sleep that tolerates being terminated mid-flight.
    let mut child = if cfg!(windows) {
        Command::new("cmd")
            .args(["/C", "ping -n 30 127.0.0.1 >NUL"])
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .expect("spawn live test process")
    } else {
        Command::new("sh")
            .args(["-c", "sleep 30"])
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .expect("spawn live test process")
    };
    let live_pid = child.id() as i32;

    let live = lease_in_state(LeaseState::Ready, Some(live_pid));
    repo.insert(&live).await.unwrap();

    let report = run_crash_recovery_sweep(&pool, &repo, 1_700_003_000)
        .await
        .unwrap();

    assert_eq!(report.flipped_count, 1);
    assert_eq!(report.snapshotted_pids, vec![live_pid]);
    // On both unix and windows, sysinfo::Process::kill returns true for an
    // owned live process we can signal.
    assert!(
        report.terminated_pids.contains(&live_pid),
        "expected to terminate live pid {live_pid}; got {:?}",
        report.terminated_pids
    );

    // Best-effort cleanup — child is either dead or will be on next wait.
    let _ = child.wait();
}
