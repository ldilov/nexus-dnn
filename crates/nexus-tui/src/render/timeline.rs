//! Cluster-A — `/scrub` time histogram renderer.
//!
//! Bins every event in the ring buffer into a 60-slot histogram across
//! the time window from the oldest to the newest event, then renders
//! a Braille bar chart with per-severity hue. Pure-fn: takes a ring
//! buffer view + bin count, returns a coloured String + the bucket
//! that holds the most recent events so the caller can list samples.

use crate::stream::event_line::EventLine;
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_BOLD: &str = "\x1b[1m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_RED: &str = "\x1b[38;5;203m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";
const GUTTER: &str = "┃";

pub const DEFAULT_BUCKET_COUNT: usize = 60;
pub const DEFAULT_SAMPLE_TAIL: usize = 5;

#[derive(Debug, Clone, Default)]
pub struct TimelineBucket {
    pub start_ms: i64,
    pub end_ms: i64,
    pub total: u32,
    pub max_severity: Option<Severity>,
}

#[derive(Debug, Clone)]
pub struct TimelineHistogram {
    pub buckets: Vec<TimelineBucket>,
    pub oldest_ms: i64,
    pub newest_ms: i64,
    pub total_events: u32,
}

impl TimelineHistogram {
    /// Bucket the ring buffer's `[oldest_ms, newest_ms]` window into
    /// `bucket_count` equal-width slots. Returns an empty histogram
    /// when the buffer holds zero events.
    pub fn build(ring: &RingBuffer, bucket_count: usize) -> Self {
        let oldest = ring.iter().map(|e| e.timestamp_ms).min();
        let newest = ring.iter().map(|e| e.timestamp_ms).max();
        let (oldest_ms, newest_ms) = match (oldest, newest) {
            (Some(o), Some(n)) => (o, n),
            _ => {
                return Self {
                    buckets: Vec::new(),
                    oldest_ms: 0,
                    newest_ms: 0,
                    total_events: 0,
                };
            }
        };
        let span_ms = (newest_ms - oldest_ms).max(1);
        let bucket_ms = (span_ms as f64 / bucket_count as f64).max(1.0);
        let mut buckets = vec![TimelineBucket::default(); bucket_count];
        for (i, bucket) in buckets.iter_mut().enumerate() {
            let start = oldest_ms + (i as f64 * bucket_ms) as i64;
            let end = oldest_ms + ((i + 1) as f64 * bucket_ms) as i64;
            bucket.start_ms = start;
            bucket.end_ms = end;
        }
        let mut total = 0u32;
        for evt in ring.iter() {
            let offset = (evt.timestamp_ms - oldest_ms) as f64 / bucket_ms;
            let idx = (offset as usize).min(bucket_count - 1);
            buckets[idx].total = buckets[idx].total.saturating_add(1);
            buckets[idx].max_severity = max_severity(buckets[idx].max_severity, evt.severity);
            total = total.saturating_add(1);
        }
        Self {
            buckets,
            oldest_ms,
            newest_ms,
            total_events: total,
        }
    }

    pub fn peak_count(&self) -> u32 {
        self.buckets.iter().map(|b| b.total).max().unwrap_or(0)
    }

    /// Index of the bucket with the highest count (the *peak*). Ties
    /// resolve to the most recent peak so operators see the latest
    /// burst.
    pub fn peak_bucket_index(&self) -> Option<usize> {
        if self.total_events == 0 {
            return None;
        }
        let mut best = 0usize;
        let mut best_count = 0u32;
        for (i, b) in self.buckets.iter().enumerate() {
            if b.total >= best_count {
                best_count = b.total;
                best = i;
            }
        }
        Some(best)
    }
}

fn max_severity(a: Option<Severity>, b: Severity) -> Option<Severity> {
    match a {
        Some(prev) if prev >= b => Some(prev),
        _ => Some(b),
    }
}

pub fn render_timeline_block(ring: &RingBuffer, bucket_count: usize) -> String {
    let hist = TimelineHistogram::build(ring, bucket_count);
    let mut out = String::new();

    // Header.
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push(' ');
    push(
        &mut out,
        "▾ scrub",
        &format!("{ANSI_BOLD}{ANSI_GRAPHITE_BLUE}"),
    );
    out.push(' ');
    push(&mut out, "·", ANSI_GRAPHITE_DIM);
    out.push(' ');
    push(
        &mut out,
        &format!("{} events", hist.total_events),
        ANSI_VIOLET,
    );
    if hist.total_events > 0 {
        push(&mut out, "  ·  ", ANSI_GRAPHITE_DIM);
        push(
            &mut out,
            &format_span(hist.oldest_ms, hist.newest_ms),
            ANSI_SLATE,
        );
    }
    out.push('\n');

    if hist.total_events == 0 {
        push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
        out.push_str("   ");
        push(&mut out, "(ring buffer is empty)", ANSI_GRAPHITE_DIM);
        out.push('\n');
        return out;
    }

    // Histogram bar.
    let peak = hist.peak_count().max(1);
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push_str("   ");
    for bucket in &hist.buckets {
        let glyph = bar_glyph(bucket.total, peak);
        let color = severity_color(bucket.max_severity);
        push(&mut out, glyph, color);
    }
    out.push('\n');

    // Axis labels — show the time of the leftmost + middle + rightmost bucket.
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push_str("   ");
    let n = hist.buckets.len();
    if n > 0 {
        let left = format_time_hms(hist.buckets[0].start_ms);
        let mid = format_time_hms(hist.buckets[n / 2].start_ms);
        let right = format_time_hms(hist.buckets[n - 1].end_ms);
        let total = n;
        let mid_pos = total / 2;
        let right_pos = total.saturating_sub(right.chars().count());
        push(&mut out, &left, ANSI_GRAPHITE_DIM);
        let padding = mid_pos.saturating_sub(left.chars().count());
        for _ in 0..padding {
            out.push(' ');
        }
        push(&mut out, &mid, ANSI_GRAPHITE_DIM);
        let padding = right_pos.saturating_sub(mid_pos + mid.chars().count());
        for _ in 0..padding {
            out.push(' ');
        }
        push(&mut out, &right, ANSI_GRAPHITE_DIM);
    }
    out.push('\n');

    // Peak summary.
    if let Some(peak_idx) = hist.peak_bucket_index() {
        let bucket = &hist.buckets[peak_idx];
        push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
        out.push_str("   ");
        push(&mut out, "peak ", ANSI_SLATE);
        push(
            &mut out,
            &format!("{ANSI_BOLD}{}{ANSI_RESET}", bucket.total),
            ANSI_AMBER,
        );
        push(&mut out, " events at ", ANSI_SLATE);
        push(
            &mut out,
            &format_time_hms(bucket.start_ms),
            ANSI_GRAPHITE_BLUE,
        );
        if let Some(sev) = bucket.max_severity {
            push(&mut out, "  ·  top severity ", ANSI_SLATE);
            push(&mut out, severity_label(sev), severity_color(Some(sev)));
        }
        out.push('\n');
    }

    out
}

fn bar_glyph(count: u32, peak: u32) -> &'static str {
    let ratio = (count as f64 / peak as f64).clamp(0.0, 1.0);
    let level = (ratio * 8.0).round() as usize;
    match level {
        0 => "·",
        1 => "▁",
        2 => "▂",
        3 => "▃",
        4 => "▄",
        5 => "▅",
        6 => "▆",
        7 => "▇",
        _ => "█",
    }
}

fn severity_color(s: Option<Severity>) -> &'static str {
    match s {
        Some(Severity::Fatal) | Some(Severity::Error) => ANSI_RED,
        Some(Severity::Warn) => ANSI_AMBER,
        Some(Severity::Info) => ANSI_GRAPHITE_BLUE,
        Some(Severity::Debug) => ANSI_GRAPHITE_DIM,
        None => ANSI_GRAPHITE_DIM,
    }
}

fn severity_label(s: Severity) -> &'static str {
    match s {
        Severity::Debug => "debug",
        Severity::Info => "info",
        Severity::Warn => "warn",
        Severity::Error => "error",
        Severity::Fatal => "fatal",
    }
}

fn format_time_hms(ms: i64) -> String {
    let total = (ms / 1_000).rem_euclid(86_400);
    let h = (total / 3_600) as u32;
    let m = ((total % 3_600) / 60) as u32;
    let s = (total % 60) as u32;
    format!("{h:02}:{m:02}:{s:02}")
}

fn format_span(oldest_ms: i64, newest_ms: i64) -> String {
    let span_ms = (newest_ms - oldest_ms).max(0) as u64;
    if span_ms < 1_000 {
        format!("{span_ms}ms")
    } else if span_ms < 60_000 {
        format!("{:.1}s", span_ms as f64 / 1_000.0)
    } else if span_ms < 3_600_000 {
        format!("{}m{:02}s", span_ms / 60_000, (span_ms / 1_000) % 60)
    } else {
        format!("{}h{:02}m", span_ms / 3_600_000, (span_ms / 60_000) % 60)
    }
}

/// Convenience for `/scrub` — last N events in the peak bucket so the
/// operator sees what was happening at the busiest moment.
pub fn peak_bucket_samples<'a>(
    ring: &'a RingBuffer,
    hist: &TimelineHistogram,
    n: usize,
) -> Vec<&'a EventLine> {
    let Some(idx) = hist.peak_bucket_index() else {
        return Vec::new();
    };
    let bucket = &hist.buckets[idx];
    let mut hits: Vec<&EventLine> = ring
        .iter()
        .filter(|e| e.timestamp_ms >= bucket.start_ms && e.timestamp_ms < bucket.end_ms)
        .collect();
    if hits.len() > n {
        let drop = hits.len() - n;
        hits.drain(0..drop);
    }
    hits
}

fn push(out: &mut String, text: &str, color: &str) {
    out.push_str(color);
    out.push_str(text);
    out.push_str(ANSI_RESET);
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::event_id::RingBufferCapacity;
    use crate::stream::event_line::EventLine;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;

    fn synthetic(ts_ms: i64, level: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::HostLog {
            level: level.into(),
            target: "host.t".into(),
            message: "m".into(),
            fields: BTreeMap::new(),
            span_path: None,
            timestamp_ms: ts_ms,
        })
    }

    fn fill_buffer(count: usize) -> RingBuffer {
        let cap = RingBufferCapacity::new(1_000).unwrap();
        let mut ring = RingBuffer::new(cap);
        for i in 0..count {
            ring.push(synthetic(1_700_000_000_000 + (i as i64) * 100, "info"));
        }
        ring
    }

    #[test]
    fn builds_empty_histogram_on_empty_ring() {
        let cap = RingBufferCapacity::new(1_000).unwrap();
        let ring = RingBuffer::new(cap);
        let hist = TimelineHistogram::build(&ring, 60);
        assert_eq!(hist.total_events, 0);
        assert!(hist.buckets.is_empty());
        assert_eq!(hist.peak_bucket_index(), None);
    }

    #[test]
    fn distributes_events_across_buckets() {
        let ring = fill_buffer(120);
        let hist = TimelineHistogram::build(&ring, 60);
        assert_eq!(hist.total_events, 120);
        assert_eq!(hist.buckets.len(), 60);
        let nonzero = hist.buckets.iter().filter(|b| b.total > 0).count();
        assert!(
            nonzero >= 30,
            "events should spread across multiple buckets, got {nonzero}"
        );
    }

    #[test]
    fn peak_bucket_index_resolves_to_last_max_on_ties() {
        let cap = RingBufferCapacity::new(1_000).unwrap();
        let mut ring = RingBuffer::new(cap);
        // 10 events in first half, 10 events in second half.
        for i in 0..10 {
            ring.push(synthetic(1_700_000_000_000 + i, "info"));
        }
        for i in 0..10 {
            ring.push(synthetic(1_700_000_500_000 + i, "info"));
        }
        let hist = TimelineHistogram::build(&ring, 4);
        let idx = hist.peak_bucket_index().unwrap();
        let last_nonzero = hist
            .buckets
            .iter()
            .enumerate()
            .rev()
            .find(|(_, b)| b.total > 0)
            .map(|(i, _)| i)
            .unwrap();
        assert_eq!(
            idx, last_nonzero,
            "peak should resolve to the most recent peak"
        );
    }

    #[test]
    fn render_includes_header_count_and_axis() {
        let ring = fill_buffer(20);
        let out = render_timeline_block(&ring, 60);
        assert!(out.contains("▾ scrub"));
        assert!(out.contains("20 events"));
        assert!(out.contains("peak "));
    }

    #[test]
    fn render_handles_empty_ring_gracefully() {
        let cap = RingBufferCapacity::new(1_000).unwrap();
        let ring = RingBuffer::new(cap);
        let out = render_timeline_block(&ring, 60);
        assert!(out.contains("(ring buffer is empty)"));
    }

    #[test]
    fn bar_glyph_scales_with_ratio() {
        assert_eq!(bar_glyph(0, 100), "·");
        assert!(bar_glyph(100, 100) == "█" || bar_glyph(100, 100) == "▇");
        let mid = bar_glyph(50, 100);
        assert!(["▃", "▄", "▅"].contains(&mid));
    }

    #[test]
    fn format_span_compact_units() {
        assert_eq!(format_span(0, 250), "250ms");
        assert_eq!(format_span(0, 3_500), "3.5s");
        assert_eq!(format_span(0, 125_000), "2m05s");
        assert_eq!(format_span(0, 3_725_000), "1h02m");
    }

    #[test]
    fn peak_bucket_samples_returns_tail_n() {
        let ring = fill_buffer(20);
        let hist = TimelineHistogram::build(&ring, 4);
        let samples = peak_bucket_samples(&ring, &hist, 3);
        assert!(samples.len() <= 3);
    }
}
