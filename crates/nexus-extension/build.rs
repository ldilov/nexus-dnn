use std::env;
use std::fs;
use std::path::PathBuf;

fn main() {
    println!("cargo:rerun-if-changed=vendor/material-symbols-glyphs.txt");

    let src = PathBuf::from(env::var_os("CARGO_MANIFEST_DIR").unwrap())
        .join("vendor/material-symbols-glyphs.txt");
    let out_dir = PathBuf::from(env::var_os("OUT_DIR").unwrap());
    let out_path = out_dir.join("material_symbols_allowlist.rs");

    let raw = fs::read_to_string(&src)
        .unwrap_or_else(|e| panic!("failed to read {}: {e}", src.display()));

    let mut glyphs: Vec<&str> = raw
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty())
        .collect();
    glyphs.sort_unstable();
    glyphs.dedup();

    let mut body = String::with_capacity(glyphs.len() * 24);
    body.push_str("pub static MATERIAL_SYMBOLS: &[&str] = &[\n");
    for g in &glyphs {
        body.push_str("    \"");
        body.push_str(g);
        body.push_str("\",\n");
    }
    body.push_str("];\n");

    fs::write(&out_path, body)
        .unwrap_or_else(|e| panic!("failed to write {}: {e}", out_path.display()));
}
