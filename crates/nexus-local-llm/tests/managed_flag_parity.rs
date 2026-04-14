use nexus_local_llm::settings::MANAGED_FLAGS;
use std::collections::HashSet;

#[test]
fn ts_managed_flags_match_rust() {
    let ts_path = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .join("apps")
        .join("web")
        .join("src")
        .join("backends")
        .join("managed_flags.ts");
    let source = std::fs::read_to_string(&ts_path)
        .unwrap_or_else(|e| panic!("read {}: {e}", ts_path.display()));
    let mut ts_flags: HashSet<String> = HashSet::new();
    for line in source.lines() {
        let trimmed = line.trim();
        if let Some(rest) = trimmed.strip_prefix('"') {
            if let Some(end) = rest.find('"') {
                let flag = &rest[..end];
                if flag.starts_with('-') {
                    ts_flags.insert(flag.to_string());
                }
            }
        }
    }
    let rust_flags: HashSet<String> = MANAGED_FLAGS.iter().map(|s| (*s).to_string()).collect();
    assert_eq!(ts_flags, rust_flags, "managed-flag set drifted between Rust and TS");
}
