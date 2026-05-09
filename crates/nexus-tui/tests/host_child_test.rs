//! Spec 044 `--with-host` orchestration — pure-fn tests for the binary
//! discovery walker. The actual subprocess spawn + readiness probe is
//! covered by the T053 manual smoke (requires a built `nexus-dnn`).

use std::fs::{File, create_dir_all};
use std::path::PathBuf;

use nexus_tui::host_child::find_host_binary_in;
use tempfile::TempDir;

const HOST_BIN_NAME: &str = if cfg!(windows) {
    "nexus-dnn.exe"
} else {
    "nexus-dnn"
};

fn touch(path: &std::path::Path) {
    if let Some(parent) = path.parent() {
        create_dir_all(parent).expect("mkdir");
    }
    File::create(path).expect("touch");
}

#[test]
fn finds_host_binary_in_same_directory() {
    let tmp = TempDir::new().unwrap();
    let bin = tmp.path().join(HOST_BIN_NAME);
    touch(&bin);

    let found = find_host_binary_in(tmp.path()).expect("expected to find host binary");
    assert_eq!(found, bin);
}

#[test]
fn finds_host_binary_one_directory_up() {
    let tmp = TempDir::new().unwrap();
    let deps = tmp.path().join("debug").join("deps");
    create_dir_all(&deps).expect("mkdir");
    let bin = tmp.path().join("debug").join(HOST_BIN_NAME);
    touch(&bin);

    let found = find_host_binary_in(&deps).expect("expected to climb up to debug/");
    assert_eq!(found, bin);
}

#[test]
fn returns_searched_paths_on_miss() {
    let tmp = TempDir::new().unwrap();
    let nested = tmp.path().join("a").join("b").join("c");
    create_dir_all(&nested).expect("mkdir");

    let err: Vec<PathBuf> = find_host_binary_in(&nested).expect_err("no binary");
    assert!(
        !err.is_empty(),
        "must report at least the primary candidate"
    );
    assert!(
        err.iter().all(|p| p.file_name().unwrap() == HOST_BIN_NAME),
        "every candidate path must end with the host binary name: {err:?}"
    );
    assert!(
        err.iter().any(|p| p.starts_with(&nested)),
        "primary candidate must be in the start dir"
    );
}

#[test]
fn does_not_walk_more_than_three_parents() {
    let tmp = TempDir::new().unwrap();
    let deep = tmp
        .path()
        .join("level1")
        .join("level2")
        .join("level3")
        .join("level4")
        .join("level5");
    create_dir_all(&deep).expect("mkdir");
    let bin = tmp.path().join(HOST_BIN_NAME);
    touch(&bin);

    let err = find_host_binary_in(&deep);
    assert!(
        err.is_err(),
        "binary 5 levels above the start dir must not be discovered"
    );
}
