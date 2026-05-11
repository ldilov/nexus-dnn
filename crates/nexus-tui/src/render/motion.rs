use std::time::{Duration, Instant};

use crate::stream::severity::Severity;
use crate::stream::significance::Significance;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MotionClock {
    now: Instant,
}

impl MotionClock {
    pub fn new(now: Instant) -> Self {
        Self { now }
    }

    pub fn now(&self) -> Instant {
        self.now
    }

    pub fn advance_to(&mut self, now: Instant) {
        if now > self.now {
            self.now = now;
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MotionRequest {
    name: String,
    ttl: Duration,
    severity: Severity,
    significance: Significance,
}

impl MotionRequest {
    pub fn new(
        name: impl Into<String>,
        ttl: Duration,
        severity: Severity,
        significance: Significance,
    ) -> Self {
        Self {
            name: name.into(),
            ttl,
            severity,
            significance,
        }
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn ttl(&self) -> Duration {
        self.ttl
    }

    pub fn severity(&self) -> Severity {
        self.severity
    }

    pub fn significance(&self) -> Significance {
        self.significance
    }

    pub fn is_urgent(&self) -> bool {
        self.severity == Severity::Fatal || self.significance == Significance::Critical
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MotionLease {
    name: String,
    started_at: Instant,
    deadline: Instant,
    severity: Severity,
    significance: Significance,
}

impl MotionLease {
    fn from_request(request: MotionRequest, now: Instant) -> Self {
        let deadline = now + request.ttl;
        Self {
            name: request.name,
            started_at: now,
            deadline,
            severity: request.severity,
            significance: request.significance,
        }
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn started_at(&self) -> Instant {
        self.started_at
    }

    pub fn deadline(&self) -> Instant {
        self.deadline
    }

    pub fn severity(&self) -> Severity {
        self.severity
    }

    pub fn significance(&self) -> Significance {
        self.significance
    }

    pub fn is_expired(&self, clock: &MotionClock) -> bool {
        clock.now() >= self.deadline
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MotionRejection {
    Disarmed,
    Busy,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum MotionDecision {
    Started(MotionLease),
    Preempted {
        previous: MotionLease,
        current: MotionLease,
    },
    Rejected(MotionRejection),
}

#[derive(Debug, Default)]
pub struct MotionController {
    active: Option<MotionLease>,
    permits: usize,
}

impl MotionController {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn allow_one(&mut self) {
        self.permits = self.permits.saturating_add(1);
    }

    pub fn clear(&mut self) {
        self.active = None;
    }

    pub fn active(&self, clock: &MotionClock) -> Option<&MotionLease> {
        self.active
            .as_ref()
            .filter(|lease| !lease.is_expired(clock))
    }

    pub fn try_start(&mut self, clock: &MotionClock, request: MotionRequest) -> MotionDecision {
        self.prune_expired(clock);

        if request.is_urgent() {
            let lease = MotionLease::from_request(request, clock.now());
            return match self.active.replace(lease.clone()) {
                Some(previous) => MotionDecision::Preempted {
                    previous,
                    current: lease,
                },
                None => MotionDecision::Started(lease),
            };
        }

        if self.active.is_some() {
            return MotionDecision::Rejected(MotionRejection::Busy);
        }

        if self.permits == 0 {
            return MotionDecision::Rejected(MotionRejection::Disarmed);
        }

        self.permits -= 1;
        let lease = MotionLease::from_request(request, clock.now());
        self.active = Some(lease.clone());
        MotionDecision::Started(lease)
    }

    fn prune_expired(&mut self, clock: &MotionClock) {
        if self
            .active
            .as_ref()
            .is_some_and(|lease| lease.is_expired(clock))
        {
            self.active = None;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn clock_does_not_move_backwards() {
        let now = Instant::now();
        let mut clock = MotionClock::new(now);
        clock.advance_to(now - Duration::from_millis(1));
        assert_eq!(clock.now(), now);
    }

    #[test]
    fn urgent_request_detects_both_trigger_paths() {
        let fatal = MotionRequest::new(
            "fatal",
            Duration::from_millis(1),
            Severity::Fatal,
            Significance::Loud,
        );
        let critical = MotionRequest::new(
            "critical",
            Duration::from_millis(1),
            Severity::Error,
            Significance::Critical,
        );
        let normal = MotionRequest::new(
            "normal",
            Duration::from_millis(1),
            Severity::Error,
            Significance::Loud,
        );

        assert!(fatal.is_urgent());
        assert!(critical.is_urgent());
        assert!(!normal.is_urgent());
    }
}
