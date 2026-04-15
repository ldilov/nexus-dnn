//! Intra-manifest `runtime_dependencies` conflict detection.
//!
//! Phase 2 preserves the existing `VersionInterval` implementation verbatim.
//! Phase 3 (US2) replaces it with `semver::VersionReq` + a dedicated
//! `LlamaCppBuildReq` helper for non-semver build numbers. This module is the
//! designated host for that swap.

use crate::error::ExtensionError;
use crate::manifest::RuntimeDependency;

/// Detect whether two or more `runtime_dependencies` entries for the same
/// family declare disjoint version ranges. Returns `Err(RuntimeDependencyConflict)`
/// when a conflict is detected; `Ok(())` when every family has either a single
/// entry or entries whose ranges overlap (spec 012 US2, FR-106).
///
/// Pure function: no I/O, takes the extension id only for error context.
pub fn detect_intra_manifest_conflicts(
    extension_id: &str,
    deps: &[RuntimeDependency],
) -> Result<(), ExtensionError> {
    let mut by_family: std::collections::BTreeMap<&str, Vec<&RuntimeDependency>> =
        std::collections::BTreeMap::new();
    for dep in deps {
        by_family.entry(dep.family.as_str()).or_default().push(dep);
    }
    for (family, entries) in &by_family {
        if entries.len() < 2 {
            continue;
        }
        let intervals: Vec<VersionInterval> = entries
            .iter()
            .map(|d| VersionInterval::parse(d.version.as_deref()))
            .collect();
        if !intervals_all_overlap(&intervals) {
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

#[derive(Debug, Clone)]
struct VersionInterval {
    lower: Option<(String, bool)>,
    upper: Option<(String, bool)>,
    exact: Option<String>,
}

impl VersionInterval {
    fn parse(req: Option<&str>) -> Self {
        let Some(req) = req.map(str::trim) else {
            return Self {
                lower: None,
                upper: None,
                exact: None,
            };
        };
        if let Some(rest) = req.strip_prefix(">=") {
            return Self {
                lower: Some((rest.trim().to_owned(), true)),
                upper: None,
                exact: None,
            };
        }
        if let Some(rest) = req.strip_prefix(">") {
            return Self {
                lower: Some((rest.trim().to_owned(), false)),
                upper: None,
                exact: None,
            };
        }
        if let Some(rest) = req.strip_prefix("<=") {
            return Self {
                lower: None,
                upper: Some((rest.trim().to_owned(), true)),
                exact: None,
            };
        }
        if let Some(rest) = req.strip_prefix("<") {
            return Self {
                lower: None,
                upper: Some((rest.trim().to_owned(), false)),
                exact: None,
            };
        }
        if let Some(rest) = req.strip_prefix("=") {
            return Self {
                lower: None,
                upper: None,
                exact: Some(rest.trim().to_owned()),
            };
        }
        Self {
            lower: None,
            upper: None,
            exact: Some(req.to_owned()),
        }
    }
}

fn intervals_all_overlap(intervals: &[VersionInterval]) -> bool {
    for (i, a) in intervals.iter().enumerate() {
        for b in intervals.iter().skip(i + 1) {
            if !pair_overlaps(a, b) {
                return false;
            }
        }
    }
    true
}

fn pair_overlaps(a: &VersionInterval, b: &VersionInterval) -> bool {
    if let (Some(ea), Some(eb)) = (&a.exact, &b.exact) {
        return ea == eb;
    }
    if let Some(exact) = &a.exact {
        return value_in_interval(exact, b);
    }
    if let Some(exact) = &b.exact {
        return value_in_interval(exact, a);
    }
    let lower = choose_tighter_lower(a.lower.as_ref(), b.lower.as_ref());
    let upper = choose_tighter_upper(a.upper.as_ref(), b.upper.as_ref());
    match (lower, upper) {
        (Some((lo, lo_incl)), Some((hi, hi_incl))) => {
            if lo < hi {
                return true;
            }
            if lo == hi {
                return lo_incl && hi_incl;
            }
            false
        }
        _ => true,
    }
}

fn value_in_interval(value: &str, interval: &VersionInterval) -> bool {
    if let Some(exact) = &interval.exact {
        return value == exact.as_str();
    }
    if let Some((lo, incl)) = &interval.lower {
        let ok = if *incl {
            value >= lo.as_str()
        } else {
            value > lo.as_str()
        };
        if !ok {
            return false;
        }
    }
    if let Some((hi, incl)) = &interval.upper {
        let ok = if *incl {
            value <= hi.as_str()
        } else {
            value < hi.as_str()
        };
        if !ok {
            return false;
        }
    }
    true
}

fn choose_tighter_lower<'a>(
    a: Option<&'a (String, bool)>,
    b: Option<&'a (String, bool)>,
) -> Option<(&'a str, bool)> {
    match (a, b) {
        (Some((va, ia)), Some((vb, ib))) => {
            if va > vb || (va == vb && !ia && *ib) {
                Some((va.as_str(), *ia))
            } else {
                Some((vb.as_str(), *ib))
            }
        }
        (Some((v, i)), None) | (None, Some((v, i))) => Some((v.as_str(), *i)),
        (None, None) => None,
    }
}

fn choose_tighter_upper<'a>(
    a: Option<&'a (String, bool)>,
    b: Option<&'a (String, bool)>,
) -> Option<(&'a str, bool)> {
    match (a, b) {
        (Some((va, ia)), Some((vb, ib))) => {
            if va < vb || (va == vb && !ia && *ib) {
                Some((va.as_str(), *ia))
            } else {
                Some((vb.as_str(), *ib))
            }
        }
        (Some((v, i)), None) | (None, Some((v, i))) => Some((v.as_str(), *i)),
        (None, None) => None,
    }
}
