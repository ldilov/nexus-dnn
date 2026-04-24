//! T095 — FamilyRegistry contract tests against the real
//! recipes/families/*.yaml descriptors (spec 034 US5).

use std::path::PathBuf;

use emotion_tts_extension::families::{
    FamilyRegistry, FamilyStatus, FamilyStatusSnapshot, DEFAULT_FAMILY_ID,
};

fn families_dir() -> PathBuf {
    // tests/ → rust/ → emotion-tts/ → recipes/families/
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .join("recipes")
        .join("families")
}

#[test]
fn load_picks_up_both_shipped_descriptors() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load registry");
    let ids: Vec<&str> = reg.descriptors().iter().map(|d| d.family_id.as_str()).collect();
    assert!(
        ids.contains(&"indextts-2"),
        "registry must include the default family; got {ids:?}",
    );
    assert!(
        ids.contains(&"indextts-2-5"),
        "registry must include the 2.5 stub; got {ids:?}",
    );
}

#[test]
fn load_produces_sorted_descriptors() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load");
    let ids: Vec<String> = reg.descriptors().iter().map(|d| d.family_id.clone()).collect();
    let mut sorted = ids.clone();
    sorted.sort();
    assert_eq!(ids, sorted, "load_from_dir must return deterministic order");
}

#[test]
fn default_family_is_loadable() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load");
    let desc = reg.get(DEFAULT_FAMILY_ID).expect("default family present");
    assert_eq!(desc.model_family_ref, "IndexTeam/IndexTTS-2");
    assert!(desc.supported_languages.contains(&"zh".into()));
    assert!(desc.supported_languages.contains(&"en".into()));
    // Reality check — the 16-file manifest shipped under spec 031 must
    // survive into the descriptor so T134 (host resolve test) can use it.
    assert!(
        desc.expected_artifacts.len() >= 14,
        "indextts-2 should declare at least 14 expected artifacts; got {}",
        desc.expected_artifacts.len(),
    );
    assert!(desc.expected_artifacts.iter().any(|a| a == "gpt.pth"));
    assert!(desc
        .expected_artifacts
        .iter()
        .any(|a| a.starts_with("qwen0.6bemo4-merge/")));
}

#[test]
fn indextts_2_5_stub_is_speculative_but_valid() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load");
    let desc = reg.get("indextts-2-5").expect("2.5 stub present");
    assert_eq!(desc.model_family_ref, "IndexTeam/IndexTTS-2.5");
    // 2.5 adds languages beyond zh/en per spec Acceptance Scenario 4.
    assert!(desc.supported_languages.contains(&"ja".into()));
    assert!(desc.supported_languages.contains(&"es".into()));
}

#[test]
fn contains_accepts_known_and_rejects_unknown() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load");
    assert!(reg.contains("indextts-2"));
    assert!(reg.contains("indextts-2-5"));
    assert!(!reg.contains("fictional-v3"));
}

#[tokio::test]
async fn reconcile_maps_each_descriptor_through_probe_callback() {
    let reg = FamilyRegistry::load_from_dir(&families_dir()).expect("load");

    let entries = reg
        .reconcile(|desc| {
            let id = desc.family_id.clone();
            async move {
                let snap = if id == "indextts-2" {
                    FamilyStatusSnapshot::available()
                } else {
                    FamilyStatusSnapshot::not_installed()
                };
                Ok(snap)
            }
        })
        .await
        .expect("reconcile");

    let v2 = entries.iter().find(|e| e.descriptor.family_id == "indextts-2").unwrap();
    assert_eq!(v2.status, FamilyStatus::Available);
    let v25 = entries.iter().find(|e| e.descriptor.family_id == "indextts-2-5").unwrap();
    assert_eq!(v25.status, FamilyStatus::NotInstalled);
}

#[test]
fn non_yaml_files_in_dir_are_ignored() {
    let tmp = tempfile::tempdir().expect("tmp");
    std::fs::write(tmp.path().join("readme.md"), "not yaml").unwrap();
    std::fs::write(
        tmp.path().join("fam.yaml"),
        "family_id: alpha\ndisplay_name: A\nmodel_family_ref: X\nengine_version_constraint: '>=0.1.0'\n",
    )
    .unwrap();
    let reg = FamilyRegistry::load_from_dir(tmp.path()).expect("load");
    assert_eq!(reg.descriptors().len(), 1);
    assert_eq!(reg.descriptors()[0].family_id, "alpha");
}

#[test]
fn malformed_yaml_surfaces_a_structured_error() {
    let tmp = tempfile::tempdir().expect("tmp");
    std::fs::write(tmp.path().join("bad.yaml"), "this: is: not: valid").unwrap();
    let err = FamilyRegistry::load_from_dir(tmp.path()).unwrap_err();
    let msg = err.to_string();
    assert!(msg.contains("parse"), "expected parse error, got: {msg}");
}
