use nexus_extension::manifest::{ModelDependencyManifest, validate_model_dependency};

fn parse(yaml: &str) -> Result<ModelDependencyManifest, serde_saphyr::Error> {
    serde_saphyr::from_str(yaml)
}

#[test]
fn valid_dep_with_revision_parses() {
    let y = r#"
family: llama
version: 3-8b-instruct
revision: abc123
min_params: 7B
quantization: Q4_K_M
"#;
    let dep = parse(y).unwrap();
    assert_eq!(dep.family, "llama");
    assert_eq!(dep.revision.as_deref(), Some("abc123"));
    assert_eq!(dep.min_params, Some(7_000_000_000));
    assert!(dep.required);
    validate_model_dependency(&dep).unwrap();
}

#[test]
fn missing_revision_without_opt_in_rejected() {
    let y = r#"
family: llama
version: 3-8b
"#;
    let dep = parse(y).unwrap();
    let err = validate_model_dependency(&dep).unwrap_err();
    assert!(err.contains("revision required"));
}

#[test]
fn allow_unpinned_without_revision_ok() {
    let y = r#"
family: llama
version: 3-8b
allow_unpinned: true
"#;
    let dep = parse(y).unwrap();
    validate_model_dependency(&dep).unwrap();
}

#[test]
fn min_params_supports_numeric_and_b_suffix() {
    let y = r#"
family: f
version: v
allow_unpinned: true
min_params: 13B
"#;
    let dep = parse(y).unwrap();
    assert_eq!(dep.min_params, Some(13_000_000_000));

    let y2 = r#"
family: f
version: v
allow_unpinned: true
min_params: 500000000
"#;
    let dep2 = parse(y2).unwrap();
    assert_eq!(dep2.min_params, Some(500_000_000));
}
