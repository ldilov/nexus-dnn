//! Spec 044 follow-up — "Curtain Up" boot-phase folding.
//!
//! The host emits dozens of banner/extension-discovery/startup-diagnostic
//! events in the first ~1–3 seconds, which under the original streaming
//! model drowns out the steady-state events that immediately follow.
//! This module quarantines that boot noise:
//!
//! 1. While in [`BootState::Booting`], non-significant `Info`/`Hum`/
//!    `Normal` events are *captured* into the ring buffer but NOT
//!    rendered to the ambient stream.
//! 2. The phase settles on either:
//!    - the first significant event (warn+, loud, critical, failed,
//!      quarantined, drift, etc.) — that event renders normally,
//!    - or 2 s of silence (`SETTLE_QUIET_THRESHOLD`).
//! 3. At settle time the renderer prints one summary curtain line so
//!    the operator knows exactly how many events were folded:
//!    `╾─── ✦ boot complete · 34 events folded · 1.3s ───╼`
//!
//! The decision is a pure function over `(EventLine, BootState)`, which
//! keeps it easy to unit-test and easy to reason about during reviews.

use std::time::{Duration, Instant};

use crate::stream::event_line::EventLine;
use crate::stream::severity::Severity;
use crate::stream::significance::Significance;

/// Boot is considered finished after this much wall-clock silence with
/// no events arriving — captures the "host has nothing more to say
/// about its own startup" moment.
pub const SETTLE_QUIET_THRESHOLD: Duration = Duration::from_secs(2);

#[derive(Debug, Clone)]
pub enum BootState {
    /// Initial state — captured events do not render unless they
    /// trip a break-through rule.
    Booting {
        started_at: Instant,
        last_event_at: Instant,
        folded: u32,
    },
    /// Steady-state — every event renders normally; never re-enters
    /// Booting within a single TUI session.
    Settled,
}

impl BootState {
    pub fn new(now: Instant) -> Self {
        Self::Booting {
            started_at: now,
            last_event_at: now,
            folded: 0,
        }
    }

    pub fn is_booting(&self) -> bool {
        matches!(self, BootState::Booting { .. })
    }

    pub fn folded_count(&self) -> u32 {
        match self {
            BootState::Booting { folded, .. } => *folded,
            BootState::Settled => 0,
        }
    }

    /// Wall-clock duration spent in the Booting phase, frozen at
    /// settle time. Returns `Duration::ZERO` if still Booting (caller
    /// should compute live duration from `started_at` for prompt
    /// indicators).
    pub fn started_at(&self) -> Option<Instant> {
        match self {
            BootState::Booting { started_at, .. } => Some(*started_at),
            BootState::Settled => None,
        }
    }
}

/// The renderer-facing instruction returned by [`decide`].
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BootDisplayDecision {
    /// Ambient render is suppressed; the event still lands in the
    /// ring buffer so `/last`, `/inspect`, `/snapshot` see it.
    Suppress,
    /// Render the event normally; the boot phase keeps going.
    Render,
    /// First significant event — render the event AND emit the
    /// curtain settle line just before it.
    SettleAndRender,
    /// Quiet timeout reached — emit the curtain settle line, no event
    /// to render here.
    SettleOnly,
}

/// Pure decision: given an incoming event and the current phase, what
/// should the renderer do? Caller is responsible for mutating the phase
/// based on the returned decision (so we can keep `decide` referentially
/// transparent and unit-test exhaustively).
pub fn decide(line: &EventLine, state: &BootState) -> BootDisplayDecision {
    match state {
        BootState::Settled => BootDisplayDecision::Render,
        BootState::Booting { .. } => {
            if is_break_through(line) {
                BootDisplayDecision::SettleAndRender
            } else {
                BootDisplayDecision::Suppress
            }
        }
    }
}

/// Quiet-timeout settle. Called from the consumer's idle tick, NOT on
/// event arrival. Returns `Some(SettleOnly)` only if the threshold has
/// elapsed AND the state is currently Booting.
pub fn maybe_settle_on_quiet(state: &BootState, now: Instant) -> Option<BootDisplayDecision> {
    match state {
        BootState::Booting { last_event_at, .. }
            if now.duration_since(*last_event_at) >= SETTLE_QUIET_THRESHOLD =>
        {
            Some(BootDisplayDecision::SettleOnly)
        }
        _ => None,
    }
}

/// True when the event is "significant enough" to break through the
/// curtain. Operationally: anything `Warn+` severity OR any event whose
/// intrinsic significance is `Loud`/`Critical`. Lifecycle `Normal`
/// events (run created, extension activated, deploy stage transitions)
/// are folded too — they're recoverable from the curtain summary, and
/// folding them is what fixes the boot-spam screenshot.
fn is_break_through(line: &EventLine) -> bool {
    matches!(
        line.severity,
        Severity::Warn | Severity::Error | Severity::Fatal
    ) || matches!(
        line.significance,
        Significance::Loud | Significance::Critical
    )
}

/// Mutator helpers — kept private to localise state transitions.
impl BootState {
    pub fn record_event(&mut self, now: Instant) {
        if let BootState::Booting {
            last_event_at,
            folded,
            ..
        } = self
        {
            *last_event_at = now;
            *folded = folded.saturating_add(1);
        }
    }

    pub fn settle(&mut self, now: Instant) -> Option<SettleReport> {
        if let BootState::Booting {
            started_at, folded, ..
        } = *self
        {
            *self = BootState::Settled;
            Some(SettleReport {
                folded,
                duration: now.duration_since(started_at),
            })
        } else {
            None
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct SettleReport {
    pub folded: u32,
    pub duration: Duration,
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::event_line::EventLine;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;

    fn host_log_at(level: &str, target: &str, message: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::HostLog {
            level: level.into(),
            target: target.into(),
            message: message.into(),
            fields: BTreeMap::new(),
            span_path: None,
            timestamp_ms: 0,
        })
    }

    fn run_failed() -> EventLine {
        EventLine::from_nexus_event(NexusEvent::NodeFailed {
            run_id: "r1".into(),
            node_id: "n1".into(),
            error: "boom".into(),
        })
    }

    #[test]
    fn booting_suppresses_info_lifecycle_events() {
        let now = Instant::now();
        let state = BootState::new(now);
        let line = host_log_at("info", "host.nexus_dnn::banner", "ext loaded");
        assert_eq!(decide(&line, &state), BootDisplayDecision::Suppress);
    }

    #[test]
    fn booting_breaks_through_on_warn() {
        let now = Instant::now();
        let state = BootState::new(now);
        let line = host_log_at("warn", "host.nexus_dnn::config", "slow disk detected");
        assert_eq!(decide(&line, &state), BootDisplayDecision::SettleAndRender);
    }

    #[test]
    fn booting_breaks_through_on_loud_significance() {
        let now = Instant::now();
        let state = BootState::new(now);
        // NodeFailed → Loud significance, Error severity
        let line = run_failed();
        assert_eq!(decide(&line, &state), BootDisplayDecision::SettleAndRender);
    }

    #[test]
    fn settled_state_always_renders() {
        let line = host_log_at("info", "host.x", "anything");
        assert_eq!(
            decide(&line, &BootState::Settled),
            BootDisplayDecision::Render
        );
    }

    #[test]
    fn maybe_settle_on_quiet_fires_after_threshold() {
        let started = Instant::now();
        let state = BootState::Booting {
            started_at: started,
            last_event_at: started,
            folded: 5,
        };
        let later = started + SETTLE_QUIET_THRESHOLD + Duration::from_millis(50);
        assert_eq!(
            maybe_settle_on_quiet(&state, later),
            Some(BootDisplayDecision::SettleOnly)
        );
    }

    #[test]
    fn maybe_settle_on_quiet_does_not_fire_within_window() {
        let started = Instant::now();
        let state = BootState::Booting {
            started_at: started,
            last_event_at: started,
            folded: 5,
        };
        let too_soon = started + Duration::from_millis(500);
        assert_eq!(maybe_settle_on_quiet(&state, too_soon), None);
    }

    #[test]
    fn maybe_settle_on_quiet_is_inert_after_settle() {
        let now = Instant::now();
        assert_eq!(maybe_settle_on_quiet(&BootState::Settled, now), None);
    }

    #[test]
    fn record_event_advances_last_event_and_folded_count() {
        let started = Instant::now();
        let mut state = BootState::new(started);
        let later = started + Duration::from_millis(200);
        state.record_event(later);
        state.record_event(later + Duration::from_millis(50));
        assert_eq!(state.folded_count(), 2);
    }

    #[test]
    fn settle_returns_report_and_transitions_state() {
        let started = Instant::now();
        let mut state = BootState::Booting {
            started_at: started,
            last_event_at: started,
            folded: 12,
        };
        let later = started + Duration::from_millis(1_300);
        let report = state.settle(later).expect("should return report");
        assert_eq!(report.folded, 12);
        assert!(report.duration >= Duration::from_millis(1_300));
        assert!(matches!(state, BootState::Settled));
        // Second settle is inert.
        assert!(state.settle(later).is_none());
    }
}
