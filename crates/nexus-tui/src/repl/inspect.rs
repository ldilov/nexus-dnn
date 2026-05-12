//! Helpers used by `/inspect` and `/last`.
//!
//! Lookup accepts either a full ULID or a short prefix (≥ 4 chars) and
//! returns the unique match if any.

use crate::stream::event_line::EventLine;
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;

const MIN_PREFIX_LEN: usize = 4;

pub fn find_event_by_id_str<'a>(buf: &'a RingBuffer, query: &str) -> Option<&'a EventLine> {
    let trimmed = query.trim();
    if trimmed.is_empty() {
        return None;
    }
    let normalized = trimmed.to_ascii_uppercase();
    let mut candidates = buf.iter().filter(|line| {
        let id = format!("{}", line.id).to_ascii_uppercase();
        id == normalized || (normalized.len() >= MIN_PREFIX_LEN && id.starts_with(&normalized))
    });
    let first = candidates.next()?;
    if candidates.next().is_some() {
        // ambiguous prefix → caller treats as "not found" so the
        // operator re-runs with a longer prefix.
        return None;
    }
    Some(first)
}

pub fn collect_recent_same_source<'a>(
    buf: &'a RingBuffer,
    target: &EventLine,
    count: usize,
) -> Vec<&'a EventLine> {
    let mut out: Vec<&EventLine> = Vec::with_capacity(count);
    for line in buf.iter() {
        if line.id == target.id {
            continue;
        }
        if line.source == target.source {
            out.push(line);
        }
    }
    let len = out.len();
    if len > count {
        out.drain(0..len - count);
    }
    out
}

pub fn last_n_at_or_above(buf: &RingBuffer, n: usize, floor: Severity) -> Vec<&EventLine> {
    let mut matches: Vec<&EventLine> = Vec::with_capacity(n);
    for line in buf.iter() {
        if line.severity >= floor {
            matches.push(line);
        }
    }
    let len = matches.len();
    if len > n {
        matches.drain(0..len - n);
    }
    matches
}
