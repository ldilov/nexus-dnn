use std::time::{Duration, Instant};

use nexus_tui::render::motion::{
    MotionClock, MotionController, MotionDecision, MotionRejection, MotionRequest,
};
use nexus_tui::{Severity, Significance};

fn request(
    name: &str,
    ttl_ms: u64,
    severity: Severity,
    significance: Significance,
) -> MotionRequest {
    MotionRequest::new(name, Duration::from_millis(ttl_ms), severity, significance)
}

#[test]
fn rejects_non_urgent_motion_by_default() {
    let now = Instant::now();
    let clock = MotionClock::new(now);
    let mut controller = MotionController::new();

    let decision = controller.try_start(
        &clock,
        request("ambient-pulse", 250, Severity::Info, Significance::Normal),
    );

    assert_eq!(
        decision,
        MotionDecision::Rejected(MotionRejection::Disarmed)
    );
    assert!(controller.active(&clock).is_none());
}

#[test]
fn accepts_one_non_urgent_motion_after_single_permit() {
    let now = Instant::now();
    let clock = MotionClock::new(now);
    let mut controller = MotionController::new();
    controller.allow_one();

    let accepted = controller.try_start(
        &clock,
        request("ambient-pulse", 250, Severity::Info, Significance::Normal),
    );

    assert!(matches!(accepted, MotionDecision::Started(_)));
    assert_eq!(
        controller.try_start(
            &clock,
            request("second-pulse", 250, Severity::Info, Significance::Normal),
        ),
        MotionDecision::Rejected(MotionRejection::Busy)
    );

    controller.clear();
    assert_eq!(
        controller.try_start(
            &clock,
            request("third-pulse", 250, Severity::Info, Significance::Normal),
        ),
        MotionDecision::Rejected(MotionRejection::Disarmed)
    );
}

#[test]
fn expires_active_motion_when_clock_advances_past_deadline() {
    let start = Instant::now();
    let mut clock = MotionClock::new(start);
    let mut controller = MotionController::new();
    controller.allow_one();

    let _ = controller.try_start(
        &clock,
        request("ambient-pulse", 50, Severity::Info, Significance::Normal),
    );
    assert!(controller.active(&clock).is_some());

    clock.advance_to(start + Duration::from_millis(51));
    assert!(controller.active(&clock).is_none());
}

#[test]
fn fatal_motion_preempts_active_non_urgent_motion() {
    let now = Instant::now();
    let clock = MotionClock::new(now);
    let mut controller = MotionController::new();
    controller.allow_one();
    let _ = controller.try_start(
        &clock,
        request("ambient-pulse", 250, Severity::Info, Significance::Normal),
    );

    let decision = controller.try_start(
        &clock,
        request("fatal-banner", 500, Severity::Fatal, Significance::Loud),
    );

    assert!(matches!(decision, MotionDecision::Preempted { .. }));
    let active = controller
        .active(&clock)
        .expect("fatal motion should be active");
    assert_eq!(active.name(), "fatal-banner");
    assert_eq!(active.severity(), Severity::Fatal);
}

#[test]
fn critical_motion_preempts_active_non_urgent_motion() {
    let now = Instant::now();
    let clock = MotionClock::new(now);
    let mut controller = MotionController::new();
    controller.allow_one();
    let _ = controller.try_start(
        &clock,
        request("ambient-pulse", 250, Severity::Warn, Significance::Loud),
    );

    let decision = controller.try_start(
        &clock,
        request(
            "critical-border",
            500,
            Severity::Error,
            Significance::Critical,
        ),
    );

    assert!(matches!(decision, MotionDecision::Preempted { .. }));
    let active = controller
        .active(&clock)
        .expect("critical motion should be active");
    assert_eq!(active.name(), "critical-border");
    assert_eq!(active.significance(), Significance::Critical);
}

#[test]
fn urgent_motion_bypasses_disarmed_default() {
    let now = Instant::now();
    let clock = MotionClock::new(now);
    let mut controller = MotionController::new();

    let decision = controller.try_start(
        &clock,
        request("fatal-banner", 500, Severity::Fatal, Significance::Loud),
    );

    assert!(matches!(decision, MotionDecision::Started(_)));
    let active = controller
        .active(&clock)
        .expect("fatal motion should start");
    assert_eq!(active.name(), "fatal-banner");
}
