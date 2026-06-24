//! P1-scoped boundary guard for the recipe-status host helpers. P3 stands up
//! the full `handlers/recipes` boundary test (CONTRACTS C7); this guards the one
//! host file P1 added until then.

#[test]
fn recipe_status_handler_has_no_extension_id_literals() {
    let path = concat!(env!("CARGO_MANIFEST_DIR"), "/src/handlers/recipe_status.rs");
    let body = std::fs::read_to_string(path).expect("read recipe_status.rs");
    const FORBIDDEN: &[&str] = &[
        "local-llm",
        "local_llm",
        "nexus.local-llm",
        "emotiontts",
        "emotion-tts",
        "emotion_tts",
        "svi2-pro",
        "svi2",
        "nexus.rag",
        "ltx23",
    ];
    let hits: Vec<&str> = FORBIDDEN
        .iter()
        .copied()
        .filter(|needle| body.contains(needle))
        .collect();
    assert!(
        hits.is_empty(),
        "extension-id literals leaked into recipe_status.rs: {hits:?}"
    );
}
