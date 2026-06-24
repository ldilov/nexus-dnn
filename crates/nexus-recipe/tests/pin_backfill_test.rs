use std::collections::HashMap;

use nexus_recipe::{PinResult, StemLookup, normalize_stem, resolve_pin};

struct FakeLookup {
    stems: HashMap<String, String>,
    heads: HashMap<String, String>,
}

impl StemLookup for FakeLookup {
    fn workflow_id_for_stem(&self, stem: &str) -> Option<String> {
        self.stems.get(stem).cloned()
    }
    fn current_version_for(&self, workflow_id: &str) -> Option<String> {
        self.heads.get(workflow_id).cloned()
    }
}

#[test]
fn normalize_stem_strips_prefix_and_suffix() {
    assert_eq!(
        normalize_stem("workflows/sample_batch.yaml"),
        "sample_batch"
    );
    assert_eq!(normalize_stem("sample_batch.yml"), "sample_batch");
    assert_eq!(normalize_stem("workflows/sample_batch"), "sample_batch");
    assert_eq!(normalize_stem("plain"), "plain");
}

#[test]
fn resolve_pin_strips_stem_and_resolves_current_version() {
    let mut stems = HashMap::new();
    stems.insert("sample_batch".to_string(), "wf-9".to_string());
    let mut heads = HashMap::new();
    heads.insert("wf-9".to_string(), "v4".to_string());
    let lk = FakeLookup { stems, heads };

    let r = resolve_pin("workflows/sample_batch.yaml", &lk);
    assert_eq!(
        r,
        PinResult::Resolved {
            workflow_id: "wf-9".into(),
            workflow_version: "v4".into()
        }
    );
}

#[test]
fn resolve_pin_unresolvable_stem_returns_unresolvable() {
    let lk = FakeLookup {
        stems: HashMap::new(),
        heads: HashMap::new(),
    };
    assert_eq!(
        resolve_pin("workflows/unknown.yaml", &lk),
        PinResult::Unresolvable
    );
}

#[test]
fn resolve_pin_missing_head_returns_unresolvable() {
    let mut stems = HashMap::new();
    stems.insert("known".to_string(), "wf-1".to_string());
    let lk = FakeLookup {
        stems,
        heads: HashMap::new(),
    };
    assert_eq!(resolve_pin("known", &lk), PinResult::Unresolvable);
}
