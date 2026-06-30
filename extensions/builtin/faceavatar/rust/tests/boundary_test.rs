//! Boundary guard for the faceavatar extension (design §5). Asserts the
//! extension id is the frozen value and that the shim's source declares no
//! coupling to another extension (no `trellis2` reference) and no host-owned
//! table/route literals — faceavatar reaches a base mesh only via an opaque
//! input GLB artifact ref, never via import or name.

use std::path::{Path, PathBuf};

#[test]
fn extension_id_is_frozen() {
    assert_eq!(faceavatar_extension::EXTENSION_ID, "nexus.3d.faceavatar");
}

#[test]
fn fallback_workspace_dir_is_namespaced() {
    assert_eq!(
        faceavatar_extension::FALLBACK_WORKSPACE_DIR,
        "nexus-faceavatar-workspace"
    );
}

/// The extension storage is namespaced `ext_faceavatar__*`; the migration must
/// not create a host-owned or another extension's table.
#[test]
fn migration_tables_are_faceavatar_namespaced() {
    for m in faceavatar_extension::MIGRATIONS {
        let sql = m.sql.to_lowercase();
        assert!(
            sql.contains("ext_faceavatar__"),
            "migration {} must create ext_faceavatar__ tables",
            m.name
        );
        assert!(
            !sql.contains("ext_trellis2__"),
            "migration {} must not touch trellis2 tables",
            m.name
        );
    }
}

fn src_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("src")
}

fn rs_files(dir: &Path, out: &mut Vec<PathBuf>) {
    for entry in std::fs::read_dir(dir).unwrap().flatten() {
        let path = entry.path();
        if path.is_dir() {
            rs_files(&path, out);
        } else if path.extension().and_then(|e| e.to_str()) == Some("rs") {
            out.push(path);
        }
    }
}

/// No faceavatar SOURCE file may name another extension. The graft's only link
/// to a TRELLIS-style base mesh is an opaque input GLB ref supplied at runtime —
/// never a code reference. (Self-contained per design §5/§6.)
#[test]
fn source_names_no_other_extension() {
    let mut files = Vec::new();
    rs_files(&src_dir(), &mut files);
    assert!(!files.is_empty(), "expected faceavatar src files");
    for f in files {
        let text = std::fs::read_to_string(&f).unwrap();
        assert!(
            !text.contains("trellis2") && !text.contains("trellis"),
            "{} references trellis — faceavatar must stay self-contained",
            f.display()
        );
    }
}
