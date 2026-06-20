//! Guards the shipped local-llm config_schema against the real StickyModel
//! payload. If a future schema edit would 422 a valid sticky-model write (and
//! silently break Phase-1 model stickiness, since the frontend swallows the
//! PUT error), this test fails loudly.

use nexus_extension::manifest::ExtensionManifest;
use nexus_extension::{validate_config_schema_compiles, validate_settings_against_schema};
use serde_json::json;

const LOCAL_LLM_MANIFEST: &str =
    include_str!("../../../extensions/builtin/local-llm/manifest.yaml");

fn local_llm_config_schema() -> serde_json::Value {
    let manifest: ExtensionManifest =
        serde_yaml::from_str(LOCAL_LLM_MANIFEST).expect("local-llm manifest parses");
    assert!(
        validate_config_schema_compiles(&manifest).is_ok(),
        "local-llm config_schema must compile",
    );
    manifest
        .config_schema
        .expect("local-llm declares a config_schema")
}

#[test]
fn accepts_a_representative_sticky_model() {
    let schema = local_llm_config_schema();
    let sticky = json!({
        "family_id": "meta/llama",
        "variant_id": "Q4",
        "tuning": { "ctx_size": 8192, "n_gpu_layers": 0 },
        "saved_at": "2026-06-20T00:00:00Z",
    });
    assert!(validate_settings_against_schema(&schema, &sticky).is_ok());
}

#[test]
fn accepts_a_partial_sticky_model() {
    let schema = local_llm_config_schema();
    let partial = json!({ "family_id": "meta/llama", "variant_id": "Q4" });
    assert!(validate_settings_against_schema(&schema, &partial).is_ok());
}

#[test]
fn rejects_a_wrong_typed_field() {
    let schema = local_llm_config_schema();
    let bad = json!({ "family_id": 123, "variant_id": "Q4" });
    assert!(validate_settings_against_schema(&schema, &bad).is_err());
}
