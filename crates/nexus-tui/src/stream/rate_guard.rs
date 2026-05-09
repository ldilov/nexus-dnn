//! Per-source rate limiting + repeat collapse.
//!
//! - Per-source token bucket: at sustained rates above
//!   `DEFAULT_RATE_GUARD_THRESHOLD` events / second, excess events are
//!   condensed (renderer prints `≫ N events condensed`).
//! - Repeat collapse: identical (source, summary) pairs within
//!   `REPEAT_COLLAPSE_WINDOW` collapse to a count.

use std::collections::HashMap;
use std::time::{Duration, Instant};

pub const DEFAULT_RATE_GUARD_THRESHOLD: u32 = 200;
pub const REPEAT_COLLAPSE_WINDOW: Duration = Duration::from_secs(2);

#[derive(Debug)]
pub struct RateGuard {
    threshold_per_second: u32,
    repeat_window: Duration,
    counters: HashMap<String, SecondWindow>,
    repeats: HashMap<RepeatKey, RepeatEntry>,
}

#[derive(Debug, Hash, PartialEq, Eq)]
struct RepeatKey {
    source: String,
    summary: String,
}

#[derive(Debug)]
struct RepeatEntry {
    count: u32,
    first_seen: Instant,
}

#[derive(Debug)]
struct SecondWindow {
    started_at: Instant,
    count: u32,
}

#[derive(Debug, Clone)]
pub enum RateGuardDecision {
    Render,
    Repeat { count: u32, summary: String },
    Condensed { source: String, dropped: u32 },
}

impl Default for RateGuard {
    fn default() -> Self {
        Self::new(DEFAULT_RATE_GUARD_THRESHOLD, REPEAT_COLLAPSE_WINDOW)
    }
}

impl RateGuard {
    pub fn new(threshold_per_second: u32, repeat_window: Duration) -> Self {
        Self {
            threshold_per_second,
            repeat_window,
            counters: HashMap::new(),
            repeats: HashMap::new(),
        }
    }

    pub fn observe(&mut self, source: &str, summary: &str, now: Instant) -> RateGuardDecision {
        let rate_decision = self.check_rate(source, now);
        if matches!(rate_decision, RateGuardDecision::Condensed { .. }) {
            return rate_decision;
        }
        if let Some(decision) = self.check_repeat(source, summary, now) {
            return decision;
        }
        rate_decision
    }

    fn check_repeat(
        &mut self,
        source: &str,
        summary: &str,
        now: Instant,
    ) -> Option<RateGuardDecision> {
        let key = RepeatKey {
            source: source.to_string(),
            summary: summary.to_string(),
        };
        match self.repeats.get_mut(&key) {
            Some(entry) if now.duration_since(entry.first_seen) <= self.repeat_window => {
                entry.count = entry.count.saturating_add(1);
                let decision = RateGuardDecision::Repeat {
                    count: entry.count,
                    summary: summary.to_string(),
                };
                Some(decision)
            }
            _ => {
                self.repeats.insert(
                    key,
                    RepeatEntry {
                        count: 1,
                        first_seen: now,
                    },
                );
                None
            }
        }
    }

    fn check_rate(&mut self, source: &str, now: Instant) -> RateGuardDecision {
        let entry = self
            .counters
            .entry(source.to_string())
            .or_insert_with(|| SecondWindow {
                started_at: now,
                count: 0,
            });
        if now.duration_since(entry.started_at) >= Duration::from_secs(1) {
            entry.started_at = now;
            entry.count = 0;
        }
        entry.count = entry.count.saturating_add(1);
        if entry.count > self.threshold_per_second {
            RateGuardDecision::Condensed {
                source: source.to_string(),
                dropped: entry.count - self.threshold_per_second,
            }
        } else {
            RateGuardDecision::Render
        }
    }

    pub fn is_condensing(&self) -> bool {
        self.counters
            .values()
            .any(|w| w.count > self.threshold_per_second)
    }
}
