//! Walks the ring buffer to surface events related to a target by any
//! of run_id / deployment_id / extension_id / install_run_id.
//!
//! Bound the result to `depth` items per data-model §2 to avoid runaway
//! correlation trees on noisy runs.

use crate::stream::event_line::EventLine;
use crate::stream::ring_buffer::RingBuffer;

#[derive(Debug, Clone, Default)]
pub struct CorrelationContext {
    pub related: Vec<EventLine>,
}

pub fn walk_correlation(buf: &RingBuffer, target: &EventLine, depth: usize) -> CorrelationContext {
    let mut related: Vec<EventLine> = Vec::new();
    for candidate in buf.iter() {
        if candidate.id == target.id {
            continue;
        }
        if shares_correlation(candidate, target) {
            related.push(candidate.clone());
            if related.len() >= depth {
                break;
            }
        }
    }
    CorrelationContext { related }
}

fn shares_correlation(a: &EventLine, b: &EventLine) -> bool {
    keys_match(&a.correlation.run_id, &b.correlation.run_id)
        || keys_match(&a.correlation.deployment_id, &b.correlation.deployment_id)
        || keys_match(&a.correlation.extension_id, &b.correlation.extension_id)
        || keys_match(&a.correlation.install_run_id, &b.correlation.install_run_id)
}

fn keys_match(a: &Option<String>, b: &Option<String>) -> bool {
    matches!((a, b), (Some(x), Some(y)) if x == y)
}
