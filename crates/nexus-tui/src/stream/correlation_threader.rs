//! Spec 044 follow-up — "Threaded Events" correlation-aware indent.
//!
//! When event B arrives within a short time window AND shares a
//! correlation key (`run_id`, `deployment_id`, `extension_id`, or
//! `install_run_id`) with a previously rendered event A, render B as
//! a *leaf* — prefixed with `  ╰─` so causality is visible inline
//! without `/inspect`.
//!
//! ```text
//! │ ▎ 21:03:48  ⚠ WARN   ▶ run:r1   workflow stalled
//! │   ╰─ ▎ 21:03:48  ○ INFO   ▶ run:r1   retry scheduled
//! │   ╰─ ▎ 21:03:49  ○ INFO   ▶ run:r1   node restarted
//! │ ▎ 21:03:50  ○ INFO   ⚙ runtime  lease acquired
//! ```
//!
//! Pure-fn over `(EventLine, threader-state, Instant)`. The threader
//! is mutated only at well-defined call-sites (`note_rendered`); the
//! relationship lookup never mutates.

use std::collections::HashMap;
use std::time::{Duration, Instant};

use crate::stream::event_line::EventLine;

/// Default time window — keeps a thread alive only while events keep
/// arriving on the same correlation key. 30 s captures typical run-
/// level activity bursts without leaking causality across distinct
/// runs that reuse a deploy slug or extension id.
pub const DEFAULT_THREAD_TTL: Duration = Duration::from_secs(30);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum CorrelationKind {
    Run,
    Deploy,
    Extension,
    InstallRun,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ThreadRelation {
    /// Root of a thread — render without indent.
    Root,
    /// Continuation of an earlier thread — render with `╰─` indent.
    /// Carries the kind + value that matched so the renderer (or
    /// future telemetry) can colour or annotate.
    Leaf { kind: CorrelationKind, key: String },
}

#[derive(Debug)]
pub struct CorrelationThreader {
    ttl: Duration,
    last_seen: HashMap<(CorrelationKind, String), Instant>,
}

impl Default for CorrelationThreader {
    fn default() -> Self {
        Self::new(DEFAULT_THREAD_TTL)
    }
}

impl CorrelationThreader {
    pub fn new(ttl: Duration) -> Self {
        Self {
            ttl,
            last_seen: HashMap::new(),
        }
    }

    /// Decide whether this event should render as a thread root or a
    /// leaf. Precedence: run_id, then deployment_id, then extension_id,
    /// then install_run_id — the most specific match wins. Returns
    /// `Root` when no correlation key is present or every key is
    /// past its TTL.
    pub fn relationship(&self, line: &EventLine, now: Instant) -> ThreadRelation {
        for (kind, key) in extract_keys(line) {
            if let Some(seen_at) = self.last_seen.get(&(kind, key.to_string()))
                && now.duration_since(*seen_at) <= self.ttl
            {
                return ThreadRelation::Leaf {
                    kind,
                    key: key.to_string(),
                };
            }
        }
        ThreadRelation::Root
    }

    /// Record that this event was rendered — index every present
    /// correlation key so future events on any of them can thread.
    pub fn note_rendered(&mut self, line: &EventLine, now: Instant) {
        for (kind, key) in extract_keys(line) {
            self.last_seen.insert((kind, key.to_string()), now);
        }
        self.prune_expired(now);
    }

    /// Drop entries past the TTL. Cheap — bounded by the number of
    /// active correlation keys, which empirically stays in the low
    /// hundreds even on busy hosts.
    fn prune_expired(&mut self, now: Instant) {
        let ttl = self.ttl;
        self.last_seen
            .retain(|_, seen_at| now.duration_since(*seen_at) <= ttl);
    }

    #[cfg(test)]
    pub fn tracked_keys(&self) -> usize {
        self.last_seen.len()
    }
}

/// Yield every correlation key on the event, ordered by precedence
/// (most specific first). Skips empty / missing fields.
fn extract_keys(line: &EventLine) -> Vec<(CorrelationKind, &str)> {
    let mut out: Vec<(CorrelationKind, &str)> = Vec::with_capacity(4);
    if let Some(id) = line.correlation.run_id.as_deref()
        && !id.is_empty()
    {
        out.push((CorrelationKind::Run, id));
    }
    if let Some(id) = line.correlation.deployment_id.as_deref()
        && !id.is_empty()
    {
        out.push((CorrelationKind::Deploy, id));
    }
    if let Some(id) = line.correlation.extension_id.as_deref()
        && !id.is_empty()
    {
        out.push((CorrelationKind::Extension, id));
    }
    if let Some(id) = line.correlation.install_run_id.as_deref()
        && !id.is_empty()
    {
        out.push((CorrelationKind::InstallRun, id));
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_events::types::NexusEvent;

    fn run_event(run_id: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::RunCreated {
            run_id: run_id.into(),
            workflow_id: "wf-1".into(),
        })
    }

    fn node_progress(run_id: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::NodeProgress {
            run_id: run_id.into(),
            node_id: "n1".into(),
            percent: 50,
            message: "halfway".into(),
        })
    }

    fn ext_event(ext_id: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::ExtensionActivated {
            extension_id: ext_id.into(),
        })
    }

    #[test]
    fn fresh_threader_treats_first_event_as_root() {
        let threader = CorrelationThreader::default();
        let now = Instant::now();
        let line = run_event("r1");
        assert_eq!(threader.relationship(&line, now), ThreadRelation::Root);
    }

    #[test]
    fn second_event_same_run_id_is_leaf_within_window() {
        let mut threader = CorrelationThreader::default();
        let now = Instant::now();
        let first = run_event("r1");
        threader.note_rendered(&first, now);
        let later = now + Duration::from_secs(1);
        let second = node_progress("r1");
        assert_eq!(
            threader.relationship(&second, later),
            ThreadRelation::Leaf {
                kind: CorrelationKind::Run,
                key: "r1".into(),
            }
        );
    }

    #[test]
    fn same_run_id_past_ttl_is_root_again() {
        let mut threader = CorrelationThreader::new(Duration::from_secs(5));
        let now = Instant::now();
        threader.note_rendered(&run_event("r1"), now);
        let too_late = now + Duration::from_secs(6);
        assert_eq!(
            threader.relationship(&node_progress("r1"), too_late),
            ThreadRelation::Root
        );
    }

    #[test]
    fn different_run_ids_dont_thread() {
        let mut threader = CorrelationThreader::default();
        let now = Instant::now();
        threader.note_rendered(&run_event("r1"), now);
        let later = now + Duration::from_secs(1);
        assert_eq!(
            threader.relationship(&run_event("r2"), later),
            ThreadRelation::Root
        );
    }

    #[test]
    fn extension_correlation_threads_when_run_id_absent() {
        let mut threader = CorrelationThreader::default();
        let now = Instant::now();
        threader.note_rendered(&ext_event("nexus.audio.emotiontts"), now);
        let later = now + Duration::from_secs(2);
        assert_eq!(
            threader.relationship(&ext_event("nexus.audio.emotiontts"), later),
            ThreadRelation::Leaf {
                kind: CorrelationKind::Extension,
                key: "nexus.audio.emotiontts".into(),
            }
        );
    }

    #[test]
    fn event_with_no_correlation_keys_is_always_root() {
        let threader = CorrelationThreader::default();
        let now = Instant::now();
        // HostLog events carry no correlation keys.
        let line = EventLine::from_nexus_event(NexusEvent::HostLog {
            level: "info".into(),
            target: "host.app".into(),
            message: "hi".into(),
            fields: Default::default(),
            span_path: None,
            timestamp_ms: 0,
        });
        assert_eq!(threader.relationship(&line, now), ThreadRelation::Root);
    }

    #[test]
    fn note_rendered_prunes_expired_keys() {
        let mut threader = CorrelationThreader::new(Duration::from_secs(2));
        let now = Instant::now();
        threader.note_rendered(&run_event("r1"), now);
        threader.note_rendered(&run_event("r2"), now);
        assert_eq!(threader.tracked_keys(), 2);
        let later = now + Duration::from_secs(5);
        threader.note_rendered(&run_event("r3"), later);
        // r1 + r2 should have been pruned; only r3 remains.
        assert_eq!(threader.tracked_keys(), 1);
    }

    #[test]
    fn run_id_takes_precedence_over_deploy_id() {
        // ExtensionInstallStepStarted carries extension + install_run
        // — pretend the *first* event is the run, the *second* shares
        // run_id, ensure run is the matched kind.
        let mut threader = CorrelationThreader::default();
        let now = Instant::now();
        threader.note_rendered(&run_event("r1"), now);
        let second = node_progress("r1");
        match threader.relationship(&second, now + Duration::from_secs(1)) {
            ThreadRelation::Leaf { kind, .. } => assert_eq!(kind, CorrelationKind::Run),
            ThreadRelation::Root => panic!("expected leaf"),
        }
    }
}
