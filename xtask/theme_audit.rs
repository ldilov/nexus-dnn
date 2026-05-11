use anyhow::{Context, Result};
use regex::Regex;
use std::fs;
use std::path::{Path, PathBuf};

const BASELINE_FILE: &str = "xtask/theme_audit.baseline";
const SCAN_ROOTS: &[&str] = &["crates/nexus-tui/src/render", "crates/nexus-tui/src/repl"];
const ALLOWLIST_PATHS: &[&str] = &["crates/nexus-tui/src/repl/ansi.rs"];
const NEUTRAL_ANSI_NAMES: &[&str] = &["RESET", "BOLD", "DIM", "ITALIC", "UNDERLINE", "NORMAL"];

pub fn run() -> Result<()> {
    let repo_root = repo_root_from_manifest_dir();
    let baseline = load_baseline(&repo_root)?;
    let findings = find_theme_debt(&repo_root)?;
    let current = findings.len();

    if current > baseline {
        eprintln!(
            "theme-audit FAIL: {current} files carry hard-coded color literals (baseline {baseline})."
        );
        eprintln!();
        for finding in &findings {
            eprintln!("  {} ({})", finding.relative_path, finding.kind.label());
            for sample in &finding.samples {
                eprintln!("    {sample}");
            }
        }
        eprintln!();
        eprintln!("Migrate these literals to SpectralTheme tokens before adding new debt.");
        eprintln!("If a regression is intentional and unavoidable, update {BASELINE_FILE}.");
        anyhow::bail!("theme-audit detected baseline growth");
    }

    println!(
        "theme-audit OK: {current} files carry hard-coded color literals (baseline {baseline})."
    );
    if current < baseline {
        println!(
            "  IMPROVED: deficit fell {} (baseline {baseline}). Update {BASELINE_FILE} to {current}.",
            baseline - current,
        );
    }
    for finding in findings {
        println!(
            "  {} ({}) [{}]",
            finding.relative_path,
            finding.kind.label(),
            finding.samples.join(" | "),
        );
    }
    Ok(())
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DebtKind {
    AnsiPaletteConstant,
    NuColorFixed,
}

impl DebtKind {
    fn label(self) -> &'static str {
        match self {
            DebtKind::AnsiPaletteConstant => "ansi palette constant",
            DebtKind::NuColorFixed => "NuColor::Fixed literal",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Finding {
    pub relative_path: String,
    pub kind: DebtKind,
    pub samples: Vec<String>,
}

fn find_theme_debt(repo_root: &Path) -> Result<Vec<Finding>> {
    let detectors = build_detectors();
    let mut findings: Vec<Finding> = Vec::new();
    for scan_root in SCAN_ROOTS {
        let root = repo_root.join(scan_root);
        visit_rust_files(&root, &mut |path| {
            if is_allowlisted(repo_root, path) {
                return Ok(());
            }
            let source = fs::read_to_string(path)?;
            for (kind, detector) in &detectors {
                let samples = collect_samples(&source, detector, *kind);
                if !samples.is_empty() {
                    findings.push(Finding {
                        relative_path: normalize_relative(repo_root, path),
                        kind: *kind,
                        samples,
                    });
                }
            }
            Ok::<(), anyhow::Error>(())
        })?;
    }
    findings.sort_by(|left, right| {
        left.relative_path
            .cmp(&right.relative_path)
            .then(left.kind.label().cmp(right.kind.label()))
    });
    Ok(findings)
}

fn collect_samples(source: &str, detector: &Regex, kind: DebtKind) -> Vec<String> {
    let mut samples = Vec::new();
    for line in source.lines() {
        if !detector.is_match(line) {
            continue;
        }
        if kind == DebtKind::AnsiPaletteConstant && line_is_neutral_ansi(line) {
            continue;
        }
        let trimmed = line.trim().to_string();
        if !samples.contains(&trimmed) {
            samples.push(trimmed);
        }
    }
    samples
}

fn line_is_neutral_ansi(line: &str) -> bool {
    let trimmed = line.trim_start();
    let after_const = trimmed.strip_prefix("const ANSI_").unwrap_or("");
    NEUTRAL_ANSI_NAMES
        .iter()
        .any(|name| after_const.starts_with(name))
}

fn build_detectors() -> Vec<(DebtKind, Regex)> {
    let ansi_palette =
        Regex::new(r#"^\s*const\s+ANSI_[A-Z0-9_]+\s*:\s*&str\s*=\s*"\\x1b\[(?:38|48);5;\d+m""#)
            .expect("ansi palette regex must compile");
    let nu_color_fixed =
        Regex::new(r"NuColor::Fixed\(\s*\d+\s*\)").expect("nu color regex must compile");
    vec![
        (DebtKind::AnsiPaletteConstant, ansi_palette),
        (DebtKind::NuColorFixed, nu_color_fixed),
    ]
}

fn load_baseline(repo_root: &Path) -> Result<usize> {
    let path = repo_root.join(BASELINE_FILE);
    let raw = fs::read_to_string(&path)
        .with_context(|| format!("missing baseline file: {}", path.display()))?;
    raw.trim().parse::<usize>().with_context(|| {
        format!(
            "baseline file {} must contain a single integer",
            path.display()
        )
    })
}

fn repo_root_from_manifest_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .expect("xtask lives under the repo root")
        .to_path_buf()
}

fn is_allowlisted(repo_root: &Path, path: &Path) -> bool {
    let rel = match path.strip_prefix(repo_root) {
        Ok(p) => p,
        Err(_) => return false,
    };
    let rel_str = rel.to_string_lossy().replace('\\', "/");
    ALLOWLIST_PATHS.iter().any(|allowed| rel_str == *allowed)
}

fn visit_rust_files(dir: &Path, visitor: &mut dyn FnMut(&Path) -> Result<()>) -> Result<()> {
    if !dir.exists() {
        return Ok(());
    }
    let mut entries: Vec<_> = fs::read_dir(dir)?.collect::<std::result::Result<Vec<_>, _>>()?;
    entries.sort_by_key(|entry| entry.path());
    for entry in entries {
        let path = entry.path();
        if path.is_dir() {
            visit_rust_files(&path, visitor)?;
            continue;
        }
        if path.extension().and_then(|ext| ext.to_str()) == Some("rs") {
            visitor(&path)?;
        }
    }
    Ok(())
}

fn normalize_relative(repo_root: &Path, path: &Path) -> String {
    path.strip_prefix(repo_root)
        .expect("scanned files must live under repo root")
        .to_string_lossy()
        .replace('\\', "/")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ansi_palette_detector_flags_color_constants() {
        let (_, detector) = build_detectors()
            .into_iter()
            .find(|(kind, _)| *kind == DebtKind::AnsiPaletteConstant)
            .expect("ansi palette detector present");
        assert!(detector.is_match(r#"const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m""#));
        assert!(detector.is_match(r#"const ANSI_VIOLET: &str = "\x1b[38;5;141m""#));
    }

    #[test]
    fn ansi_palette_detector_does_not_flag_neutral_styles() {
        let samples = collect_samples(
            "const ANSI_RESET: &str = \"\\x1b[0m\";\nconst ANSI_BOLD: &str = \"\\x1b[1m\";\n",
            &build_detectors()[0].1,
            DebtKind::AnsiPaletteConstant,
        );
        assert!(
            samples.is_empty(),
            "neutral style constants must not register"
        );
    }

    #[test]
    fn nu_color_fixed_detector_flags_literals() {
        let (_, detector) = build_detectors()
            .into_iter()
            .find(|(kind, _)| *kind == DebtKind::NuColorFixed)
            .expect("nu color detector present");
        assert!(
            detector
                .is_match("        .with_text_style(NuStyle::new().fg(NuColor::Fixed(75)).bold())")
        );
        assert!(detector.is_match("    NuColor::Fixed(33),"));
    }

    #[test]
    fn nu_color_fixed_detector_ignores_unfilled_variants() {
        let (_, detector) = build_detectors()
            .into_iter()
            .find(|(kind, _)| *kind == DebtKind::NuColorFixed)
            .expect("nu color detector present");
        assert!(!detector.is_match("    NuColor::Red,"));
        assert!(!detector.is_match("    NuColor::Default,"));
    }

    #[test]
    fn baseline_file_is_parsed_as_unsigned() {
        let temp = tempfile::tempdir().expect("tempdir");
        fs::create_dir_all(temp.path().join("xtask")).expect("xtask dir");
        fs::write(temp.path().join(BASELINE_FILE), "8\n").expect("write baseline");
        let value = load_baseline(temp.path()).expect("baseline loads");
        assert_eq!(value, 8);
    }

    #[test]
    fn allowlist_skips_ansi_module() {
        let temp = tempfile::tempdir().expect("tempdir");
        let ansi_path = temp.path().join("crates/nexus-tui/src/repl/ansi.rs");
        fs::create_dir_all(ansi_path.parent().expect("repl dir")).expect("create dirs");
        assert!(is_allowlisted(temp.path(), &ansi_path));
        let editor_path = temp.path().join("crates/nexus-tui/src/repl/editor.rs");
        assert!(!is_allowlisted(temp.path(), &editor_path));
    }
}
