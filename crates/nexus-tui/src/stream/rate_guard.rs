//! Per-source rate limiting + repeat collapse.
//!
//! - Per-source token bucket: at sustained rates above
//!   `DEFAULT_RATE_GUARD_THRESHOLD` events / second, excess events are
//!   condensed (renderer prints `≫ N events condensed`).
//! - Repeat collapse: identical (source, summary) pairs within
//!   `REPEAT_COLLAPSE_WINDOW` collapse to a count.
//! - Cumulative accounting: every observation is tallied per-source
//!   (`total_observed`) and every condensed drop is tallied per-source
//!   (`total_dropped`) so the prompt-right pressure badge and the
//!   `/pressure` drawer can surface what we're hiding.

use std::collections::{BTreeMap, HashMap};
use std::time::{Duration, Instant};

pub const DEFAULT_RATE_GUARD_THRESHOLD: u32 = 200;
pub const REPEAT_COLLAPSE_WINDOW: Duration = Duration::from_secs(2);

#[derive(Debug)]
pub struct RateGuard {
    threshold_per_second: u32,
    repeat_window: Duration,
    counters: HashMap<String, SecondWindow>,
    repeats: HashMap<RepeatKey, RepeatEntry>,
    cumulative_dropped: u64,
    cumulative_observed: u64,
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
    total_observed: u64,
    total_dropped: u64,
    last_seen: Instant,
}

/// Read-only snapshot consumed by the pressure meter + `/pressure`
/// drawer. Cheap to build; copies primitive counters per active source.
#[derive(Debug, Clone, Default)]
pub struct RateGuardSnapshot {
    pub cumulative_observed: u64,
    pub cumulative_dropped: u64,
    pub per_source: BTreeMap<String, SourceSnapshot>,
}

#[derive(Debug, Clone)]
pub struct SourceSnapshot {
    pub total_observed: u64,
    pub total_dropped: u64,
    pub current_second_count: u32,
    pub last_seen: Instant,
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
            cumulative_dropped: 0,
            cumulative_observed: 0,
        }
    }

    pub fn cumulative_dropped(&self) -> u64 {
        self.cumulative_dropped
    }

    pub fn cumulative_observed(&self) -> u64 {
        self.cumulative_observed
    }

    /// Per-source view sorted lexicographically. O(n) over the live
    /// source set — typically <100 sources even on busy hosts.
    pub fn snapshot(&self) -> RateGuardSnapshot {
        let per_source: BTreeMap<String, SourceSnapshot> = self
            .counters
            .iter()
            .map(|(source, window)| {
                (
                    source.clone(),
                    SourceSnapshot {
                        total_observed: window.total_observed,
                        total_dropped: window.total_dropped,
                        current_second_count: window.count,
                        last_seen: window.last_seen,
                    },
                )
            })
            .collect();
        RateGuardSnapshot {
            cumulative_observed: self.cumulative_observed,
            cumulative_dropped: self.cumulative_dropped,
            per_source,
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
        let threshold = self.threshold_per_second;
        let entry = self
            .counters
            .entry(source.to_string())
            .or_insert_with(|| SecondWindow {
                started_at: now,
                count: 0,
                total_observed: 0,
                total_dropped: 0,
                last_seen: now,
            });
        if now.duration_since(entry.started_at) >= Duration::from_secs(1) {
            entry.started_at = now;
            entry.count = 0;
        }
        entry.count = entry.count.saturating_add(1);
        entry.total_observed = entry.total_observed.saturating_add(1);
        entry.last_seen = now;
        self.cumulative_observed = self.cumulative_observed.saturating_add(1);
        if entry.count > threshold {
            let dropped = entry.count - threshold;
            entry.total_dropped = entry.total_dropped.saturating_add(u64::from(dropped));
            self.cumulative_dropped = self.cumulative_dropped.saturating_add(u64::from(dropped));
            RateGuardDecision::Condensed {
                source: source.to_string(),
                dropped,
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
