use std::path::Path;

use crate::repl::sentinels::{has_seen_hints, mark_hints_seen};

const HINT_LINES: &[&str] = &[
    "?            command palette",
    "/filter      filter events",
    "Tab          complete slash command",
    "Ctrl+G       pause / resume stream",
];

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CheatsheetRender {
    pub lines: Vec<String>,
}

pub fn render_first_run_cheatsheet(config_dir: &Path) -> Option<CheatsheetRender> {
    if has_seen_hints(config_dir) {
        return None;
    }
    let lines = HINT_LINES.iter().map(|line| (*line).to_string()).collect();
    Some(CheatsheetRender { lines })
}

pub fn render_decorated_lines(cheatsheet: &CheatsheetRender, dim: bool) -> Vec<String> {
    cheatsheet
        .lines
        .iter()
        .map(|line| {
            if dim {
                format!("\x1b[2m{line}\x1b[0m")
            } else {
                line.clone()
            }
        })
        .collect()
}

pub fn dismiss(config_dir: &Path) -> std::io::Result<()> {
    mark_hints_seen(config_dir)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_run_returns_four_hint_lines() {
        let tmp = tempfile::tempdir().unwrap();
        let rendered = render_first_run_cheatsheet(tmp.path()).expect("first run");
        assert_eq!(rendered.lines.len(), 4);
        assert!(rendered.lines[0].contains("?"));
        assert!(rendered.lines.iter().any(|l| l.contains("/filter")));
    }

    #[test]
    fn second_run_returns_none_after_dismiss() {
        let tmp = tempfile::tempdir().unwrap();
        let first = render_first_run_cheatsheet(tmp.path());
        assert!(first.is_some());
        dismiss(tmp.path()).unwrap();
        let second = render_first_run_cheatsheet(tmp.path());
        assert!(second.is_none());
    }

    #[test]
    fn decorated_lines_wrap_in_dim_ansi_when_requested() {
        let tmp = tempfile::tempdir().unwrap();
        let rendered = render_first_run_cheatsheet(tmp.path()).unwrap();
        let dim = render_decorated_lines(&rendered, true);
        for line in &dim {
            assert!(line.starts_with("\x1b[2m"));
            assert!(line.ends_with("\x1b[0m"));
        }
    }

    #[test]
    fn decorated_lines_skip_ansi_when_plain() {
        let tmp = tempfile::tempdir().unwrap();
        let rendered = render_first_run_cheatsheet(tmp.path()).unwrap();
        let plain = render_decorated_lines(&rendered, false);
        for line in &plain {
            assert!(!line.contains('\x1b'));
        }
    }

    #[test]
    fn dismiss_is_idempotent() {
        let tmp = tempfile::tempdir().unwrap();
        dismiss(tmp.path()).unwrap();
        dismiss(tmp.path()).unwrap();
        assert!(render_first_run_cheatsheet(tmp.path()).is_none());
    }
}
