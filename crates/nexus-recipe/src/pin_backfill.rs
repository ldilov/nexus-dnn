//! Pin resolution: map a recipe's `workflow_template_ref` stem onto an immutable
//! workflow version via the host-implemented `StemLookup`. Host-generic — the
//! host owns the stem -> workflow_id and workflow_id -> current_version lookups.

/// Host-side lookups resolved against the parsed templates + the P0
/// `workflows.current_version` head pointer.
pub trait StemLookup {
    /// Normalized stem -> the declared `workflow_id` of its template, if known.
    fn workflow_id_for_stem(&self, stem: &str) -> Option<String>;
    /// `workflow_id` -> its current head version, if a head exists.
    fn current_version_for(&self, workflow_id: &str) -> Option<String>;
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum PinResult {
    Resolved {
        workflow_id: String,
        workflow_version: String,
    },
    Unresolvable,
}

/// Strip a leading `workflows/` segment and a trailing `.yaml`/`.yml` so a
/// template ref and a stored stem compare equal.
pub fn normalize_stem(template_ref: &str) -> String {
    let s = template_ref
        .strip_prefix("workflows/")
        .unwrap_or(template_ref);
    let s = s
        .strip_suffix(".yaml")
        .or_else(|| s.strip_suffix(".yml"))
        .unwrap_or(s);
    s.to_string()
}

/// Resolve a template ref to a `(workflow_id, current_version)` pin, or
/// `Unresolvable` if either lookup misses.
pub fn resolve_pin(template_ref: &str, lookup: &dyn StemLookup) -> PinResult {
    let stem = normalize_stem(template_ref);
    let Some(workflow_id) = lookup.workflow_id_for_stem(&stem) else {
        return PinResult::Unresolvable;
    };
    let Some(workflow_version) = lookup.current_version_for(&workflow_id) else {
        return PinResult::Unresolvable;
    };
    PinResult::Resolved {
        workflow_id,
        workflow_version,
    }
}
