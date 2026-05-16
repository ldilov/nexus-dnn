//! VRAM threshold supervisor — watches `runtime.memory_stats`
//! notifications and trips a clean cancel when usage crosses
//! configured thresholds.
//!
//! Background: the LTX-2.3 pipeline can fragment its CUDA pool across
//! multi-segment runs even when each individual segment fits in VRAM.
//! By segment 6–8 of a long chain, ``num_alloc_retries`` climbs +
//! ``frag_ratio`` rises until the next allocation OOMs. The worker's
//! per-segment ``gc.collect()`` / ``empty_cache()`` mitigates this but
//! doesn't fully recover the pool — and a crash mid-segment is
//! markedly worse than a clean halt-before-next-segment.
//!
//! The supervisor's job: read each `MEMORY_STATS` payload, decide
//! whether the worker is still in a safe operating range, and emit a
//! Breach verdict when it's not. The runner translates Breach into a
//! cancel signal, which uses the existing graceful-shutdown path —
//! the current segment finishes (or fails normally), and the chain
//! halts. The run row's `error_code` is set to `vram_supervisor` so
//! the UI can distinguish supervisor-halt from user-cancel.
//!
//! Future rung (P3): on Breach, instead of cancelling, release the
//! lease + re-acquire + send `render.start` with a trimmed plan of
//! `segments[next..]`. That's a clean restart-mid-chain; today's
//! rung is just the safety net.

use std::env;
use std::sync::Arc;

use serde_json::Value;

/// Tunable thresholds for the supervisor.
///
/// Defaults reflect what the spec-046 P0-T001 spike measured on an
/// RTX 5070 Ti running dg845 BF16 weights with sequential CPU
/// offload: peak ~5 GB at end of segment 4, `num_alloc_retries` < 3,
/// `frag_ratio` rarely above 0.15. The defaults are loose enough that
/// healthy runs never trip but tight enough to catch a leaking
/// pipeline before it OOMs.
// PartialEq only — f64 has no Eq impl; clippy's `derive_partial_eq_without_eq`
// lint understands this case and the suppression below is the canonical fix.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Debug, Clone, PartialEq)]
pub struct VramSupervisorConfig {
    pub max_alloc_retries: u64,
    pub max_frag_ratio: f64,
    pub min_free_mb: u64,
    pub max_num_ooms: u64,
    /// True when `max_frag_ratio` came from an explicit
    /// `NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO` env override. An
    /// explicit operator choice must win over the per-profile default
    /// resolved by `resolve_max_frag_ratio` — without this flag the
    /// profile default would silently clobber a deliberately strict
    /// override. Defaults to `false`, so `from_reader(|_| None)` still
    /// equals `default()`.
    pub frag_ratio_from_env: bool,
}

impl Default for VramSupervisorConfig {
    fn default() -> Self {
        Self {
            max_alloc_retries: 6,
            max_frag_ratio: 0.30,
            min_free_mb: 2_560,
            max_num_ooms: 1,
            frag_ratio_from_env: false,
        }
    }
}

impl VramSupervisorConfig {
    /// Read overrides from the canonical env vars. Missing or
    /// unparseable values fall back to the field's default so a
    /// typo doesn't disable the supervisor entirely.
    #[must_use]
    pub fn from_env() -> Self {
        Self::from_reader(|key| env::var(key).ok())
    }

    /// Same as `from_env` but with a pluggable reader — used by
    /// tests to feed deterministic values without mutating the
    /// process environment (workspace forbids `unsafe_code` which
    /// is what `env::set_var` requires under the 2024 edition).
    pub fn from_reader<F>(read: F) -> Self
    where
        F: Fn(&str) -> Option<String>,
    {
        let mut cfg = Self::default();
        if let Some(v) = parse_u64(read("NEXUS_VIDEO_LTX23_VRAM_MAX_ALLOC_RETRIES")) {
            cfg.max_alloc_retries = v;
        }
        if let Some(v) = parse_f64(read("NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO")) {
            cfg.max_frag_ratio = v;
            cfg.frag_ratio_from_env = true;
        }
        if let Some(v) = parse_u64(read("NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB")) {
            cfg.min_free_mb = v;
        }
        if let Some(v) = parse_u64(read("NEXUS_VIDEO_LTX23_VRAM_MAX_NUM_OOMS")) {
            cfg.max_num_ooms = v;
        }
        cfg
    }
}

fn parse_u64(raw: Option<String>) -> Option<u64> {
    raw?.trim().parse::<u64>().ok()
}

fn parse_f64(raw: Option<String>) -> Option<f64> {
    raw?.trim().parse::<f64>().ok()
}

/// Result of evaluating a single `MEMORY_STATS` payload.
///
/// The reason string is human-readable and gets persisted to the
/// run row's `error_message` so an operator can diagnose the
/// breach without grepping logs.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum VramVerdict {
    Healthy,
    Breach { reason: String },
}

#[derive(Clone)]
pub struct VramSupervisor {
    cfg: Arc<VramSupervisorConfig>,
}

impl VramSupervisor {
    #[must_use]
    pub fn new(cfg: VramSupervisorConfig) -> Self {
        Self { cfg: Arc::new(cfg) }
    }

    /// Convenience: env-driven defaults in one call.
    #[must_use]
    pub fn from_env() -> Self {
        Self::new(VramSupervisorConfig::from_env())
    }

    #[must_use]
    pub fn config(&self) -> &VramSupervisorConfig {
        &self.cfg
    }

    /// Resolve the effective `max_frag_ratio` for a run.
    ///
    /// Precedence: an explicit `NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO`
    /// env override (the operator's deliberate choice) always wins;
    /// otherwise the caller's per-profile default applies. The
    /// supervisor stays decoupled from `runtime_selection` — the
    /// runner passes `default_max_frag_ratio_for_profile(profile)` in.
    #[must_use]
    pub fn resolve_max_frag_ratio(&self, per_profile_default: f64) -> f64 {
        if self.cfg.frag_ratio_from_env {
            self.cfg.max_frag_ratio
        } else {
            per_profile_default
        }
    }

    /// Evaluate a `runtime.memory_stats` payload using the CONFIG
    /// default `max_frag_ratio` (0.30 unless env-overridden).
    ///
    /// ⚠️ PROFILE-UNAWARE. This uses the raw config ceiling, NOT the
    /// per-profile resolved one. On an offloaded fp8/nvfp4 profile a
    /// healthy render ends at `frag_ratio ≈ 0.995`, so calling this
    /// (rather than the profile-aware path) false-breaches every good
    /// run. Production code MUST go through
    /// `runner::evaluate_memory_stats`, which calls
    /// `resolve_max_frag_ratio(default_max_frag_ratio_for_profile(..))`
    /// then `evaluate_with_max_frag`. This method exists only for the
    /// fake/CI profile (`frag_ratio=0.0`) and for unit tests pinning the
    /// default-ceiling behaviour. Do NOT reach for it as the
    /// "ergonomic" entry point on a real profile.
    ///
    /// Returns the first threshold that breached so the reason message
    /// stays short. A missing field is treated as "well within
    /// bounds" (zero) — the worker emits the schema in
    /// `vram.py::memory_stats` so this only matters for older worker
    /// builds.
    #[must_use]
    pub fn evaluate(&self, stats: &Value) -> VramVerdict {
        self.evaluate_with_max_frag(stats, self.cfg.max_frag_ratio)
    }

    /// Same as [`evaluate`](Self::evaluate) but with the `frag_ratio`
    /// ceiling supplied by the caller (the runner resolves the
    /// per-profile value via [`resolve_max_frag_ratio`]). All other
    /// thresholds come from the config. Splitting this out keeps the
    /// per-profile fix testable in isolation without reconstructing a
    /// whole config.
    #[must_use]
    pub fn evaluate_with_max_frag(&self, stats: &Value, max_frag_ratio: f64) -> VramVerdict {
        let num_ooms = stats.get("num_ooms").and_then(Value::as_u64).unwrap_or(0);
        if num_ooms > self.cfg.max_num_ooms {
            return VramVerdict::Breach {
                reason: format!("num_ooms={num_ooms} exceeded max={}", self.cfg.max_num_ooms),
            };
        }

        let num_alloc_retries = stats
            .get("num_alloc_retries")
            .and_then(Value::as_u64)
            .unwrap_or(0);
        if num_alloc_retries > self.cfg.max_alloc_retries {
            return VramVerdict::Breach {
                reason: format!(
                    "num_alloc_retries={num_alloc_retries} exceeded max={}",
                    self.cfg.max_alloc_retries
                ),
            };
        }

        let frag_ratio = stats
            .get("frag_ratio")
            .and_then(Value::as_f64)
            .unwrap_or(0.0);
        if frag_ratio > max_frag_ratio {
            return VramVerdict::Breach {
                reason: format!("frag_ratio={frag_ratio:.3} exceeded max={max_frag_ratio:.3}"),
            };
        }

        // `free_mb` is the only field where lower-is-worse; treat a
        // missing field as "we don't know, don't trip". This matters
        // because fake-runtime stats emit free_mb=0 by design.
        if let Some(free_mb) = stats.get("free_mb").and_then(Value::as_u64) {
            if free_mb > 0 && free_mb < self.cfg.min_free_mb {
                return VramVerdict::Breach {
                    reason: format!("free_mb={free_mb} below min={}", self.cfg.min_free_mb),
                };
            }
        }

        VramVerdict::Healthy
    }
}

impl Default for VramSupervisor {
    fn default() -> Self {
        Self::new(VramSupervisorConfig::default())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn supervisor_with_defaults() -> VramSupervisor {
        VramSupervisor::new(VramSupervisorConfig::default())
    }

    #[test]
    fn healthy_stats_pass_through() {
        let stats = json!({
            "num_ooms": 0,
            "num_alloc_retries": 2,
            "frag_ratio": 0.15,
            "free_mb": 8000,
        });
        assert_eq!(
            supervisor_with_defaults().evaluate(&stats),
            VramVerdict::Healthy
        );
    }

    #[test]
    fn missing_fields_default_to_healthy() {
        // Older worker builds may not emit every field. Absence
        // should not trip the supervisor — we'd rather miss a real
        // breach than mass-cancel healthy runs.
        let stats = json!({});
        assert_eq!(
            supervisor_with_defaults().evaluate(&stats),
            VramVerdict::Healthy
        );
    }

    #[test]
    fn num_ooms_above_max_breaches() {
        let stats = json!({"num_ooms": 2});
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => {
                assert!(reason.contains("num_ooms=2"));
                assert!(reason.contains("max=1"));
            }
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn num_alloc_retries_above_max_breaches() {
        let stats = json!({"num_alloc_retries": 10});
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => {
                assert!(reason.contains("num_alloc_retries=10"));
            }
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn frag_ratio_above_max_breaches() {
        let stats = json!({"frag_ratio": 0.50});
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => assert!(reason.contains("frag_ratio")),
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn free_mb_below_min_breaches() {
        let stats = json!({"free_mb": 500});
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => {
                assert!(reason.contains("free_mb=500"));
                assert!(reason.contains("min=2560"));
            }
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn zero_free_mb_does_not_breach_fake_runtime() {
        // The fake runtime emits free_mb=0. Without this carve-out,
        // every CI test that uses the fake pipeline would trip the
        // supervisor immediately.
        let stats = json!({"free_mb": 0, "num_alloc_retries": 0, "frag_ratio": 0.0});
        assert_eq!(
            supervisor_with_defaults().evaluate(&stats),
            VramVerdict::Healthy
        );
    }

    #[test]
    fn breach_reports_first_threshold_only() {
        // When multiple thresholds are breached, the reason should
        // report only the first checked (num_ooms) — keeps the
        // message short + signals "this is the dominant issue".
        let stats = json!({
            "num_ooms": 5,
            "num_alloc_retries": 100,
            "frag_ratio": 0.99,
            "free_mb": 100,
        });
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => {
                assert!(reason.contains("num_ooms"));
                assert!(!reason.contains("num_alloc_retries"));
                assert!(!reason.contains("frag_ratio"));
            }
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn config_default_values_match_spec() {
        let cfg = VramSupervisorConfig::default();
        assert_eq!(cfg.max_alloc_retries, 6);
        assert!((cfg.max_frag_ratio - 0.30).abs() < f64::EPSILON);
        assert_eq!(cfg.min_free_mb, 2_560);
        assert_eq!(cfg.max_num_ooms, 1);
    }

    #[test]
    fn config_from_reader_honours_overrides() {
        let cfg = VramSupervisorConfig::from_reader(|key| match key {
            "NEXUS_VIDEO_LTX23_VRAM_MAX_ALLOC_RETRIES" => Some("12".into()),
            "NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO" => Some("0.5".into()),
            "NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB" => Some("1024".into()),
            "NEXUS_VIDEO_LTX23_VRAM_MAX_NUM_OOMS" => Some("3".into()),
            _ => None,
        });
        assert_eq!(cfg.max_alloc_retries, 12);
        assert!((cfg.max_frag_ratio - 0.5).abs() < f64::EPSILON);
        assert_eq!(cfg.min_free_mb, 1024);
        assert_eq!(cfg.max_num_ooms, 3);
    }

    #[test]
    fn config_from_reader_falls_back_on_unparseable_value() {
        let cfg = VramSupervisorConfig::from_reader(|key| match key {
            "NEXUS_VIDEO_LTX23_VRAM_MAX_ALLOC_RETRIES" => Some("not-a-number".into()),
            "NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB" => Some(String::new()),
            _ => None,
        });
        assert_eq!(cfg.max_alloc_retries, 6, "typo must not disable supervisor");
        assert_eq!(
            cfg.min_free_mb, 2_560,
            "empty value must fall back to default"
        );
    }

    #[test]
    fn config_from_reader_with_no_overrides_matches_default() {
        let cfg = VramSupervisorConfig::from_reader(|_| None);
        assert_eq!(cfg, VramSupervisorConfig::default());
    }

    // ── per-profile frag ceiling (Guard A: nvfp4/fp8 false-positive) ──

    #[test]
    fn high_frag_ceiling_admits_benign_offload_fragmentation() {
        // fp8/nvfp4 end a HEALTHY render with frag_ratio ≈ 0.995 by
        // design. With the per-profile ceiling of 1.0 the strict
        // `frag_ratio > max` test never trips → no false breach.
        let stats = json!({
            "num_ooms": 0,
            "num_alloc_retries": 1,
            "frag_ratio": 0.995,
            "free_mb": 8000,
        });
        assert_eq!(
            supervisor_with_defaults().evaluate_with_max_frag(&stats, 1.0),
            VramVerdict::Healthy
        );
    }

    #[test]
    fn tight_frag_ceiling_still_breaches_on_high_frag() {
        // fake/dev keeps the 0.30 ceiling — a genuine mid-render frag
        // spike must still trip.
        let stats = json!({"frag_ratio": 0.995});
        match supervisor_with_defaults().evaluate_with_max_frag(&stats, 0.30) {
            VramVerdict::Breach { reason } => {
                assert!(reason.contains("frag_ratio=0.995"));
                assert!(reason.contains("max=0.300"));
            }
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn high_frag_ceiling_still_catches_real_oom_signals() {
        // Disabling the frag check for offloaded profiles must NOT
        // disable the real OOM predictors (num_ooms / retries /
        // free_mb) — those still guard the run.
        let stats = json!({"frag_ratio": 0.999, "num_ooms": 10});
        match supervisor_with_defaults().evaluate_with_max_frag(&stats, 1.0) {
            VramVerdict::Breach { reason } => assert!(reason.contains("num_ooms=10")),
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn evaluate_delegates_to_config_frag_ratio() {
        // `evaluate` must stay equivalent to the old inline behaviour
        // (cfg.max_frag_ratio = 0.30 by default).
        let stats = json!({"frag_ratio": 0.50});
        match supervisor_with_defaults().evaluate(&stats) {
            VramVerdict::Breach { reason } => assert!(reason.contains("frag_ratio")),
            VramVerdict::Healthy => panic!("expected Breach but got Healthy"),
        }
    }

    #[test]
    fn resolve_max_frag_ratio_uses_profile_default_without_env() {
        let sup = supervisor_with_defaults();
        // No env override → caller's per-profile default wins.
        assert!((sup.resolve_max_frag_ratio(1.0) - 1.0).abs() < f64::EPSILON);
        assert!((sup.resolve_max_frag_ratio(0.30) - 0.30).abs() < f64::EPSILON);
    }

    #[test]
    fn resolve_max_frag_ratio_explicit_env_override_wins() {
        let cfg = VramSupervisorConfig::from_reader(|key| match key {
            "NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO" => Some("0.5".into()),
            _ => None,
        });
        assert!(cfg.frag_ratio_from_env);
        let sup = VramSupervisor::new(cfg);
        // Operator's deliberate 0.5 must beat even the fp8 1.0 default.
        assert!((sup.resolve_max_frag_ratio(1.0) - 0.5).abs() < f64::EPSILON);
    }

    #[test]
    fn frag_ratio_from_env_false_unless_env_set() {
        assert!(!VramSupervisorConfig::default().frag_ratio_from_env);
        assert!(!VramSupervisorConfig::from_reader(|_| None).frag_ratio_from_env);
    }
}
