//! T056 — `CommandQueue` + Ctrl+C draining.

use nexus_tui::repl::queue::{CommandQueue, CtrlCOutcome};
use nexus_tui::repl::slash::ParsedCommand;

#[test]
fn dispatch_into_empty_queue_starts_in_flight() {
    let mut queue = CommandQueue::default();
    let dispatched = queue.dispatch(ParsedCommand::Pause);
    assert!(dispatched.started);
    assert!(queue.in_flight().is_some());
    assert!(queue.pending().is_empty());
}

#[test]
fn dispatch_into_busy_queue_pushes_to_pending() {
    let mut queue = CommandQueue::default();
    let _ = queue.dispatch(ParsedCommand::Pause);
    let dispatched = queue.dispatch(ParsedCommand::Resume);
    assert!(!dispatched.started);
    assert_eq!(queue.pending().len(), 1);
}

#[test]
fn finish_in_flight_pops_next_pending() {
    let mut queue = CommandQueue::default();
    let _ = queue.dispatch(ParsedCommand::Pause);
    let _ = queue.dispatch(ParsedCommand::Resume);
    let next = queue.finish_in_flight();
    assert!(matches!(next, Some(ParsedCommand::Resume)));
    assert!(queue.pending().is_empty());
}

#[test]
fn ctrl_c_with_in_flight_cancels_only_that() {
    let mut queue = CommandQueue::default();
    let _ = queue.dispatch(ParsedCommand::Pause);
    let _ = queue.dispatch(ParsedCommand::Resume);
    let outcome = queue.handle_ctrl_c();
    assert!(matches!(outcome, CtrlCOutcome::CancelledInFlight));
    assert_eq!(queue.pending().len(), 1);
}

#[test]
fn ctrl_c_with_no_in_flight_drops_pending_head() {
    let mut queue = CommandQueue::default();
    let _ = queue.dispatch(ParsedCommand::Pause);
    queue.finish_in_flight();
    let _ = queue.dispatch(ParsedCommand::Resume);
    queue.finish_in_flight();
    let _ = queue.dispatch(ParsedCommand::Help);
    queue.finish_in_flight();
    assert!(queue.in_flight().is_none());
    let outcome = queue.handle_ctrl_c();
    assert!(matches!(outcome, CtrlCOutcome::Idle));
}

#[test]
fn ctrl_c_drops_pending_head_when_idle_and_pending_present() {
    let mut queue = CommandQueue::default();
    let _ = queue.dispatch(ParsedCommand::Pause);
    let _ = queue.dispatch(ParsedCommand::Resume);
    let _ = queue.dispatch(ParsedCommand::Help);
    let _ = queue.handle_ctrl_c(); // cancels in-flight Pause
    queue.finish_in_flight(); // promotes Resume from pending head to in-flight
    let outcome = queue.handle_ctrl_c();
    assert!(matches!(outcome, CtrlCOutcome::CancelledInFlight));
}
