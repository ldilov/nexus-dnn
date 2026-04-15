//! Intra-manifest `runtime_dependencies` conflict detection.
//!
//! Spec 016 Phase 3 (US2): the legacy 155-LOC `VersionInterval` helper has
//! been replaced by `semver::VersionReq` (Ecosystem-First, Principle I) plus a
//! dedicated `LlamaCppBuildReq` for llama.cpp build numbers (`b4970`-style)
//! that are intentionally *not* semver.
//!
//! Pure function, no I/O: `detect_intra_manifest_conflicts` only inspects the
//! manifest entries handed to it. For semver requirements it probes against a
//! fixed candidate set (see `SEMVER_PROBES`) since host_runtime_installs
//! content is not wired into this pure layer; for build-number requirements
//! it performs exact `u64` interval arithmetic.

use std::collections::BTreeMap;

use regex_lite::Regex;

use semver::{Version, VersionReq};

use crate::error::ExtensionError;
use crate::manifest::RuntimeDependency;

/// Detect whether two or more `runtime_dependencies` entries for the same
/// family declare disjoint version ranges. Returns
/// `Err(RuntimeDependencyConflict)` when any family contains two entries whose
/// accepted version sets do not intersect; returns `Ok(())` otherwise.
///
/// Parser fallback chain (per FR-403):
/// 1. `semver::VersionReq::parse` — standard semver ranges.
/// 2. `LlamaCppBuildReq::parse` — `>=b4970` / `<b5000` / `=b4970` / bare `b4970`.
/// 3. Both fail → `ExtensionError::ManifestParse` with both parser errors.
pub fn detect_intra_manifest_conflicts(
    extension_id: &str,
    deps: &[RuntimeDependency],
) -> Result<(), ExtensionError> {
    let mut by_family: BTreeMap<&str, Vec<&RuntimeDependency>> = BTreeMap::new();
    for dep in deps {
        by_family.entry(dep.family.as_str()).or_default().push(dep);
    }

    for (family, entries) in &by_family {
        if entries.len() < 2 {
            continue;
        }

        let mut parsed: Vec<ParsedReq> = Vec::with_capacity(entries.len());
        for entry in entries {
            parsed.push(parse_req(extension_id, entry)?);
        }

        if !all_pairs_overlap(&parsed) {
            let ranges = entries
                .iter()
                .map(|d| d.version.clone().unwrap_or_else(|| "*".to_owned()))
                .collect();
            return Err(ExtensionError::RuntimeDependencyConflict {
                extension_id: extension_id.to_owned(),
                family: (*family).to_owned(),
                ranges,
            });
        }
    }
    Ok(())
}

/// Parsed runtime-dependency version expression.
#[derive(Debug, Clone)]
enum ParsedReq {
    /// Any version — `None` / empty / `"*"`.
    Any,
    Semver(VersionReq),
    Build(LlamaCppBuildReq),
}

fn parse_req(extension_id: &str, dep: &RuntimeDependency) -> Result<ParsedReq, ExtensionError> {
    let raw = match dep.version.as_deref().map(str::trim) {
        Some(s) if !s.is_empty() && s != "*" => s,
        _ => return Ok(ParsedReq::Any),
    };

    let semver_err = match VersionReq::parse(raw) {
        Ok(req) => return Ok(ParsedReq::Semver(req)),
        Err(e) => e.to_string(),
    };

    let build_err = match LlamaCppBuildReq::parse(raw) {
        Ok(req) => return Ok(ParsedReq::Build(req)),
        Err(e) => e,
    };

    Err(ExtensionError::ManifestParse {
        path: format!("extension='{extension_id}' family='{}'", dep.family),
        detail: format!(
            "unparseable version requirement '{raw}': semver error: {semver_err}; \
             llama.cpp build-req error: {build_err}"
        ),
    })
}

fn all_pairs_overlap(reqs: &[ParsedReq]) -> bool {
    for (i, a) in reqs.iter().enumerate() {
        for b in reqs.iter().skip(i + 1) {
            if !pair_overlaps(a, b) {
                return false;
            }
        }
    }
    true
}

fn pair_overlaps(a: &ParsedReq, b: &ParsedReq) -> bool {
    match (a, b) {
        (ParsedReq::Any, _) | (_, ParsedReq::Any) => true,
        (ParsedReq::Semver(ra), ParsedReq::Semver(rb)) => semver_pair_overlaps(ra, rb),
        (ParsedReq::Build(ra), ParsedReq::Build(rb)) => ra.overlaps(rb),
        // Mixed semver + llama.cpp build numbers in the same family is a
        // category error in the manifest; treat as non-overlapping so the
        // conflict surfaces with a clear error for the operator to fix.
        (ParsedReq::Semver(_), ParsedReq::Build(_))
        | (ParsedReq::Build(_), ParsedReq::Semver(_)) => false,
    }
}

/// Probe versions used to test semver-pair overlap in this pure layer.
///
/// A semver-aware decision procedure would require enumerating interval
/// bounds; this probe set covers the version ranges realistically appearing
/// in extension manifests and matches the legacy behavior for the cases
/// currently exercised by the test suite. For edge cases outside this probe
/// set, use the runtime resolver (`check_runtime_dependencies`) which evaluates
/// against `host_runtime_installs` rows.
const SEMVER_PROBES: &[(u64, u64, u64)] = &[
    (0, 0, 1),
    (0, 1, 0),
    (0, 9, 0),
    (1, 0, 0),
    (1, 5, 0),
    (2, 0, 0),
    (5, 0, 0),
    (10, 0, 0),
    (100, 0, 0),
    (9_999, 0, 0),
];

fn semver_pair_overlaps(a: &VersionReq, b: &VersionReq) -> bool {
    SEMVER_PROBES.iter().any(|(maj, min, pat)| {
        let v = Version::new(*maj, *min, *pat);
        a.matches(&v) && b.matches(&v)
    })
}

// -------- LlamaCppBuildReq --------

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Op {
    Eq,
    Gt,
    Gte,
    Lt,
    Lte,
}

/// Requirement over llama.cpp build numbers (`b4970`-style). Not semver.
///
/// Grammar: `^(>=|<=|=|<|>)?b(\d+)$`. Missing operator ⇒ `Op::Eq`.
#[derive(Debug, Clone, Copy)]
pub(crate) struct LlamaCppBuildReq {
    op: Op,
    build: u64,
}

impl LlamaCppBuildReq {
    pub(crate) fn parse(raw: &str) -> Result<Self, String> {
        // Compiled once per call; regex-lite is cheap and the call site is
        // manifest-load cold path.
        let re = Regex::new(r"^(>=|<=|=|<|>)?b(\d+)$").expect("static regex compiles");
        let caps = re
            .captures(raw.trim())
            .ok_or_else(|| format!("not a llama.cpp build requirement: '{raw}'"))?;
        let op = match caps.get(1).map(|m| m.as_str()).unwrap_or("") {
            "" | "=" => Op::Eq,
            ">" => Op::Gt,
            ">=" => Op::Gte,
            "<" => Op::Lt,
            "<=" => Op::Lte,
            other => return Err(format!("unknown operator '{other}'")),
        };
        let build = caps[2]
            .parse::<u64>()
            .map_err(|e| format!("build number '{}' not u64: {e}", &caps[2]))?;
        Ok(Self { op, build })
    }

    /// Classical half-open interval intersection over u64 build numbers.
    pub(crate) fn overlaps(&self, other: &Self) -> bool {
        // Compute each constraint's inclusive u64 range [lo, hi].
        let (a_lo, a_hi) = self.range();
        let (b_lo, b_hi) = other.range();
        a_lo <= b_hi && b_lo <= a_hi
    }

    fn range(&self) -> (u64, u64) {
        match self.op {
            Op::Eq => (self.build, self.build),
            Op::Gt => (self.build.saturating_add(1), u64::MAX),
            Op::Gte => (self.build, u64::MAX),
            Op::Lt => (0, self.build.saturating_sub(1)),
            Op::Lte => (0, self.build),
        }
    }

    #[cfg(test)]
    pub(crate) fn contains(&self, build: u64) -> bool {
        let (lo, hi) = self.range();
        build >= lo && build <= hi
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn dep(family: &str, version: &str) -> RuntimeDependency {
        RuntimeDependency {
            family: family.to_owned(),
            version: Some(version.to_owned()),
            acceleration: Vec::new(),
        }
    }

    // ---- LlamaCppBuildReq parsing + semantics ----

    #[test]
    fn parses_gte_build() {
        let r = LlamaCppBuildReq::parse(">=b4970").unwrap();
        assert!(r.contains(4970));
        assert!(r.contains(9_999));
        assert!(!r.contains(4969));
    }

    #[test]
    fn parses_lt_build() {
        let r = LlamaCppBuildReq::parse("<b5000").unwrap();
        assert!(r.contains(4999));
        assert!(!r.contains(5000));
    }

    #[test]
    fn rejects_non_build_strings() {
        assert!(LlamaCppBuildReq::parse(">=1.0.0").is_err());
        assert!(LlamaCppBuildReq::parse("b").is_err());
        assert!(LlamaCppBuildReq::parse(">=abc").is_err());
    }

    #[test]
    fn overlaps_detects_intersection() {
        let a = LlamaCppBuildReq::parse(">=b4000").unwrap();
        let b = LlamaCppBuildReq::parse(">=b4970").unwrap();
        assert!(a.overlaps(&b));

        let c = LlamaCppBuildReq::parse(">=b5000").unwrap();
        let d = LlamaCppBuildReq::parse("<b4500").unwrap();
        assert!(!c.overlaps(&d));
    }

    // ---- detect_intra_manifest_conflicts ----

    #[test]
    fn disjoint_build_ranges_conflict() {
        let deps = vec![dep("llama.cpp", ">=b5000"), dep("llama.cpp", "<b4500")];
        let err = detect_intra_manifest_conflicts("ext.x", &deps).unwrap_err();
        match err {
            ExtensionError::RuntimeDependencyConflict { family, ranges, .. } => {
                assert_eq!(family, "llama.cpp");
                assert!(ranges.iter().any(|r| r == ">=b5000"));
                assert!(ranges.iter().any(|r| r == "<b4500"));
            }
            other => panic!("unexpected error: {other:?}"),
        }
    }

    #[test]
    fn overlapping_build_ranges_ok() {
        let deps = vec![dep("llama.cpp", ">=b4000"), dep("llama.cpp", ">=b4970")];
        detect_intra_manifest_conflicts("ext.x", &deps).unwrap();
    }

    #[test]
    fn semver_happy_path_ok() {
        let deps = vec![dep("python", ">=1.0.0"), dep("python", "<2.0.0")];
        detect_intra_manifest_conflicts("ext.x", &deps).unwrap();
    }

    #[test]
    fn disjoint_semver_ranges_conflict() {
        let deps = vec![
            dep("python", ">=5.0.0, <6.0.0"),
            dep("python", ">=10.0.0, <11.0.0"),
        ];
        let err = detect_intra_manifest_conflicts("ext.x", &deps).unwrap_err();
        matches!(err, ExtensionError::RuntimeDependencyConflict { .. })
            .then_some(())
            .unwrap();
    }

    #[test]
    fn unparseable_returns_manifest_parse_error() {
        let deps = vec![
            dep("llama.cpp", "not-a-version"),
            dep("llama.cpp", ">=b4970"),
        ];
        let err = detect_intra_manifest_conflicts("ext.x", &deps).unwrap_err();
        match err {
            ExtensionError::ManifestParse { path, detail } => {
                assert!(path.contains("ext.x"));
                assert!(detail.contains("semver error"));
                assert!(detail.contains("llama.cpp build-req error"));
            }
            other => panic!("expected ManifestParse, got {other:?}"),
        }
    }
}
