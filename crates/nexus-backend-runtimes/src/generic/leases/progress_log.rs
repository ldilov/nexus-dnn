//! Console mirror for worker progress notifications.
//!
//! The reader loop fans every JSON-RPC notification out to SSE subscribers,
//! but with no UI attached that stream is invisible — a headless or Docker
//! run shows nothing between "render started" and "render complete". This
//! mirrors each notification to `tracing` (target `worker.progress`) so
//! generation progress is observable from the console / log file regardless
//! of whether a browser is connected.
//!
//! Generic by design (host ↔ extension boundary): it reads only conventional
//! field names (`stage`, `fraction`, `step`, `clip_index`, …) and never
//! branches on a specific extension id or method. Any extension that emits
//! notifications with these field names gets readable progress for free.

use std::collections::HashMap;
use std::time::{Duration, Instant};

use super::trait_def::LeaseNotification;
use crate::generic::ids::RuntimeLeaseId;

/// Minimum gap between two `info`-level lines for the same method. High-rate
/// streams (per-step denoise frames) are demoted to `debug` in between so the
/// default-level console shows roughly one line per second per method.
const THROTTLE: Duration = Duration::from_millis(1000);

/// Notifications whose own channel already reaches stderr/telemetry and would
/// only double-log here.
const SKIP_METHODS: &[&str] = &["log"];

/// Maximum length of the compact-JSON fallback summary.
const MAX_SUMMARY_LEN: usize = 200;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum LogVerbosity {
    Info,
    Debug,
}

/// Per-lease throttle state. The reader loop owns one of these and drives it
/// single-threaded, so no interior locking is required.
#[derive(Default)]
pub(crate) struct ProgressThrottle {
    last: HashMap<String, MethodState>,
}

#[derive(Clone)]
struct MethodState {
    at: Instant,
    stage: Option<String>,
}

impl ProgressThrottle {
    /// Decide the level for the next line of `method`. Promotes to `Info`
    /// when the method is seen for the first time, its `stage` changed, or the
    /// throttle window has elapsed; otherwise demotes to `Debug`.
    pub(crate) fn decide(
        &mut self,
        method: &str,
        stage: Option<&str>,
        now: Instant,
    ) -> LogVerbosity {
        match self.last.get_mut(method) {
            None => {
                self.last.insert(
                    method.to_string(),
                    MethodState {
                        at: now,
                        stage: stage.map(str::to_string),
                    },
                );
                LogVerbosity::Info
            }
            Some(state) => {
                let stage_changed = state.stage.as_deref() != stage;
                let window_elapsed = now.duration_since(state.at) >= THROTTLE;
                if stage_changed || window_elapsed {
                    state.at = now;
                    state.stage = stage.map(str::to_string);
                    LogVerbosity::Info
                } else {
                    LogVerbosity::Debug
                }
            }
        }
    }
}

/// Mirror one notification to the `worker.progress` tracing target, throttled.
pub(crate) fn log_notification(
    lease_id: RuntimeLeaseId,
    n: &LeaseNotification,
    throttle: &mut ProgressThrottle,
) {
    if SKIP_METHODS.contains(&n.method.as_str()) {
        return;
    }
    let stage = n.params.get("stage").and_then(|v| v.as_str());
    let summary = summarize_params(&n.params);
    match throttle.decide(&n.method, stage, Instant::now()) {
        LogVerbosity::Info => tracing::info!(
            target: "worker.progress",
            lease_id = %lease_id,
            method = %n.method,
            "{summary}"
        ),
        LogVerbosity::Debug => tracing::debug!(
            target: "worker.progress",
            lease_id = %lease_id,
            method = %n.method,
            "{summary}"
        ),
    }
}

/// Render a compact, human-readable one-line summary from conventional
/// progress fields. Falls back to truncated compact JSON when none are
/// present so unknown notification shapes still carry their payload.
pub(crate) fn summarize_params(params: &serde_json::Value) -> String {
    let obj = match params.as_object() {
        Some(o) if !o.is_empty() => o,
        _ => return String::new(),
    };

    let mut parts: Vec<String> = Vec::new();

    if let Some(stage) = obj.get("stage").and_then(|v| v.as_str()) {
        parts.push(stage.to_string());
    }
    if let Some(frac) = obj.get("fraction").and_then(|v| v.as_f64()) {
        parts.push(format!("{:.0}%", (frac * 100.0).clamp(0.0, 100.0)));
    }
    match (
        obj.get("step").and_then(|v| v.as_i64()),
        obj.get("total_steps").and_then(|v| v.as_i64()),
    ) {
        (Some(s), Some(t)) => parts.push(format!("step {s}/{t}")),
        (Some(s), None) => parts.push(format!("step {s}")),
        _ => {}
    }
    if let Some(ci) = obj.get("clip_index").and_then(|v| v.as_i64()) {
        match obj.get("num_clips").and_then(|v| v.as_i64()) {
            Some(n) => parts.push(format!("clip {ci}/{n}")),
            None => parts.push(format!("clip {ci}")),
        }
    }
    if let Some(spr) = obj.get("seconds_per_step").and_then(|v| v.as_f64()) {
        parts.push(format!("{spr:.2}s/it"));
    }
    if let Some(eta) = obj.get("eta_seconds").and_then(|v| v.as_f64()) {
        parts.push(format!("eta {}", fmt_duration(eta)));
    }
    if let Some(gi) = obj.get("globalIndex").and_then(|v| v.as_i64()) {
        parts.push(format!("seg {gi}"));
    }
    if let Some(dur) = obj.get("durationMs").and_then(|v| v.as_i64()) {
        parts.push(format!("{dur}ms"));
    }

    if parts.is_empty() {
        let compact = serde_json::to_string(params).unwrap_or_default();
        return truncate(&compact, MAX_SUMMARY_LEN);
    }
    parts.join(" ")
}

fn fmt_duration(seconds: f64) -> String {
    if !seconds.is_finite() || seconds < 0.0 {
        return "?".to_string();
    }
    let total = seconds.round() as u64;
    if total >= 60 {
        format!("{}m{:02}s", total / 60, total % 60)
    } else {
        format!("{total}s")
    }
}

fn truncate(s: &str, max: usize) -> String {
    if s.len() <= max {
        return s.to_string();
    }
    let mut end = max;
    while end > 0 && !s.is_char_boundary(end) {
        end -= 1;
    }
    format!("{}…", &s[..end])
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn t0() -> Instant {
        Instant::now()
    }

    #[test]
    fn first_sighting_of_a_method_is_info() {
        let mut throttle = ProgressThrottle::default();
        let v = throttle.decide("progress", Some("denoising"), t0());
        assert_eq!(v, LogVerbosity::Info);
    }

    #[test]
    fn rapid_same_stage_repeats_are_demoted_to_debug() {
        let mut throttle = ProgressThrottle::default();
        let now = t0();
        assert_eq!(
            throttle.decide("progress", Some("denoising"), now),
            LogVerbosity::Info
        );
        let soon = now + Duration::from_millis(100);
        assert_eq!(
            throttle.decide("progress", Some("denoising"), soon),
            LogVerbosity::Debug
        );
    }

    #[test]
    fn stage_change_promotes_to_info_even_within_window() {
        let mut throttle = ProgressThrottle::default();
        let now = t0();
        assert_eq!(
            throttle.decide("progress", Some("denoising"), now),
            LogVerbosity::Info
        );
        let soon = now + Duration::from_millis(50);
        assert_eq!(
            throttle.decide("progress", Some("stitching"), soon),
            LogVerbosity::Info
        );
    }

    #[test]
    fn elapsed_window_promotes_to_info() {
        let mut throttle = ProgressThrottle::default();
        let now = t0();
        assert_eq!(
            throttle.decide("progress", Some("denoising"), now),
            LogVerbosity::Info
        );
        let later = now + Duration::from_millis(1001);
        assert_eq!(
            throttle.decide("progress", Some("denoising"), later),
            LogVerbosity::Info
        );
    }

    #[test]
    fn distinct_methods_throttle_independently() {
        let mut throttle = ProgressThrottle::default();
        let now = t0();
        assert_eq!(throttle.decide("clip.step", None, now), LogVerbosity::Info);
        assert_eq!(throttle.decide("progress", None, now), LogVerbosity::Info);
    }

    #[test]
    fn summarizes_video_denoise_step() {
        let s = summarize_params(&json!({
            "clip_index": 2, "num_clips": 5, "step": 12, "total_steps": 30,
            "seconds_per_step": 1.63, "eta_seconds": 29.0
        }));
        assert!(s.contains("clip 2/5"), "got: {s}");
        assert!(s.contains("step 12/30"), "got: {s}");
        assert!(s.contains("1.63s/it"), "got: {s}");
        assert!(s.contains("eta 29s"), "got: {s}");
    }

    #[test]
    fn summarizes_fraction_and_stage() {
        let s = summarize_params(&json!({"fraction": 0.255, "stage": "denoising"}));
        assert_eq!(s, "denoising 26%");
    }

    #[test]
    fn summarizes_tts_segment_event() {
        let s =
            summarize_params(&json!({"globalIndex": 3, "durationMs": 1234, "segmentId": "seg-3"}));
        assert!(s.contains("seg 3"), "got: {s}");
        assert!(s.contains("1234ms"), "got: {s}");
    }

    #[test]
    fn unknown_shape_falls_back_to_compact_json() {
        let s = summarize_params(&json!({"vram_peak_gib": 27.5}));
        assert!(s.contains("vram_peak_gib"), "got: {s}");
    }

    #[test]
    fn null_and_empty_params_summarize_to_empty() {
        assert_eq!(summarize_params(&serde_json::Value::Null), "");
        assert_eq!(summarize_params(&json!({})), "");
    }

    #[test]
    fn long_fallback_is_truncated_with_ellipsis() {
        let big = "x".repeat(500);
        let s = summarize_params(&json!({ "blob": big }));
        assert!(s.len() <= MAX_SUMMARY_LEN + 4, "len {} too long", s.len());
        assert!(
            s.ends_with('…'),
            "got tail: {:?}",
            &s[s.len().saturating_sub(8)..]
        );
    }

    #[test]
    fn fmt_duration_formats_minutes() {
        assert_eq!(fmt_duration(29.0), "29s");
        assert_eq!(fmt_duration(125.0), "2m05s");
        assert_eq!(fmt_duration(-1.0), "?");
    }
}
