use std::path::Path;

#[test]
fn migration_files_are_monotonically_numbered_and_referenced() {
    let manifest = Path::new(env!("CARGO_MANIFEST_DIR"));
    let migrations_dir = manifest
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("migrations");
    let mut numbers: Vec<u32> = std::fs::read_dir(&migrations_dir)
        .unwrap()
        .flatten()
        .filter_map(|e| {
            let name = e.file_name().to_string_lossy().to_string();
            if !name.ends_with(".sql") {
                return None;
            }
            let n: String = name.chars().take_while(|c| c.is_ascii_digit()).collect();
            n.parse().ok()
        })
        .collect();
    numbers.sort();
    assert!(
        !numbers.is_empty(),
        "no migrations found in {migrations_dir:?}"
    );
    for (i, n) in numbers.iter().enumerate() {
        let expected = (i as u32) + 1;
        assert_eq!(
            *n, expected,
            "migrations not monotonic: expected {expected} at index {i}, got {n}"
        );
    }

    let runner_src = std::fs::read_to_string(manifest.join("src/sqlite/migrations.rs")).unwrap();
    for n in &numbers {
        let needle = format!("/{:03}_", n);
        assert!(
            runner_src.contains(&needle),
            "migration {n:03}_*.sql is not referenced in run_migrations"
        );
    }
}
