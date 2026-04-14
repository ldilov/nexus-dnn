use nexus_local_llm::diagnostics::FailureCategory;
use nexus_local_llm::state::{RuntimeCardEvent, RuntimeCardState, transition};

#[test]
fn install_happy_path() {
    let s = RuntimeCardState::NotInstalled;
    let s = transition(s, &RuntimeCardEvent::InstallStarted);
    assert_eq!(s, RuntimeCardState::Installing);
    let s = transition(s, &RuntimeCardEvent::InstallCompleted);
    assert_eq!(s, RuntimeCardState::InstalledUnvalidated);
    let s = transition(s, &RuntimeCardEvent::ValidatePassed);
    assert_eq!(s, RuntimeCardState::Ready);
}

#[test]
fn install_cancel_returns_to_not_installed() {
    let s = RuntimeCardState::Installing;
    assert_eq!(
        transition(s, &RuntimeCardEvent::InstallCancelled),
        RuntimeCardState::NotInstalled
    );
}

#[test]
fn install_failure_returns_to_not_installed() {
    let s = RuntimeCardState::Installing;
    let evt = RuntimeCardEvent::InstallFailed(FailureCategory::DownloadFailed);
    assert_eq!(transition(s, &evt), RuntimeCardState::NotInstalled);
}

#[test]
fn broken_repair_updates_and_returns_ready() {
    let s = RuntimeCardState::Broken;
    let s = transition(s, &RuntimeCardEvent::RepairStarted);
    assert_eq!(s, RuntimeCardState::Updating);
    let s = transition(s, &RuntimeCardEvent::InstallCompleted);
    assert_eq!(s, RuntimeCardState::InstalledUnvalidated);
    let s = transition(s, &RuntimeCardEvent::ValidatePassed);
    assert_eq!(s, RuntimeCardState::Ready);
}

#[test]
fn ready_validation_failure_moves_to_broken() {
    let s = RuntimeCardState::Ready;
    let evt = RuntimeCardEvent::ValidateFailed(FailureCategory::RequiredBinaryMissing);
    assert_eq!(transition(s, &evt), RuntimeCardState::Broken);
}

#[test]
fn adapter_unavailable_forces_unsupported() {
    for s in [
        RuntimeCardState::Ready,
        RuntimeCardState::Broken,
        RuntimeCardState::Installing,
    ] {
        assert_eq!(
            transition(s, &RuntimeCardEvent::AdapterUnavailable),
            RuntimeCardState::Unsupported
        );
    }
}

#[test]
fn updating_failure_moves_to_broken() {
    let s = RuntimeCardState::Updating;
    assert_eq!(
        transition(
            s,
            &RuntimeCardEvent::InstallFailed(FailureCategory::ChecksumMismatch),
        ),
        RuntimeCardState::Broken
    );
}
