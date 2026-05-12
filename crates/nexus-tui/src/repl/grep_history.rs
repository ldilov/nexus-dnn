//! On-disk MRU log of `/grep` patterns.
//!
//! Writer is called from the controller every time a `/grep <pattern>` is
//! accepted. Reader is called from the slash completer to surface the most
//! recent patterns under `/grep <Tab>`.
//!
//! Storage shape: plain text, one pattern per line, ordered oldest -> newest.
//! - dedupe rule: if `pattern` is already the last line, skip; if it appears
//!   earlier, drop the earlier occurrence and re-append.
//! - cap: 50 entries. On overflow, the oldest entries are dropped during the
//!   rewrite pass.
//!
//! The struct intentionally owns just the file path. The on-disk file is the
//! single source of truth; we re-read on every operation. The file is small
//! (max 50 short regex strings) so the I/O cost is negligible compared to
//! the human-keypress timescale the completer runs on.

use std::fs;
use std::io::{self, Write};
use std::path::{Path, PathBuf};

pub const GREP_HISTORY_CAP: usize = 50;
pub const GREP_HISTORY_SUGGESTIONS: usize = 10;
pub const GREP_HISTORY_FILE_NAME: &str = "grep_history.txt";

#[derive(Debug, Clone)]
pub struct GrepHistory {
    path: PathBuf,
}

impl GrepHistory {
    pub fn new(path: PathBuf) -> Self {
        Self { path }
    }

    pub fn path(&self) -> &Path {
        &self.path
    }

    /// Append `pattern` to the history, applying the dedupe + cap rules.
    /// Empty / all-whitespace patterns are ignored. Returns Ok(()) on
    /// success (including no-op skips); errors are filesystem failures.
    pub fn record(&self, pattern: &str) -> io::Result<()> {
        let trimmed = pattern.trim();
        if trimmed.is_empty() {
            return Ok(());
        }
        if let Some(parent) = self.path.parent() {
            fs::create_dir_all(parent)?;
        }
        let existing = self.read_all_inner().unwrap_or_default();
        let updated = compose_updated(existing, trimmed);
        write_lines_atomic(&self.path, &updated)
    }

    /// Read the patterns from the file, oldest -> newest. Missing file or
    /// any I/O error returns an empty list.
    pub fn read_all(&self) -> Vec<String> {
        self.read_all_inner().unwrap_or_default()
    }

    /// Most-recent patterns, capped at [`GREP_HISTORY_SUGGESTIONS`], in
    /// newest-first order. Optionally filtered by a typed prefix.
    pub fn recent(&self, prefix: &str) -> Vec<String> {
        let all = self.read_all();
        all.into_iter()
            .rev()
            .filter(|p| prefix.is_empty() || p.starts_with(prefix))
            .take(GREP_HISTORY_SUGGESTIONS)
            .collect()
    }

    fn read_all_inner(&self) -> io::Result<Vec<String>> {
        match fs::read_to_string(&self.path) {
            Ok(contents) => Ok(contents
                .lines()
                .map(str::trim)
                .filter(|line| !line.is_empty())
                .map(String::from)
                .collect()),
            Err(err) if err.kind() == io::ErrorKind::NotFound => Ok(Vec::new()),
            Err(err) => Err(err),
        }
    }
}

fn compose_updated(mut existing: Vec<String>, new_pattern: &str) -> Vec<String> {
    if existing.last().map(String::as_str) == Some(new_pattern) {
        return existing;
    }
    existing.retain(|p| p != new_pattern);
    existing.push(new_pattern.to_string());
    let len = existing.len();
    if len > GREP_HISTORY_CAP {
        existing.drain(..len - GREP_HISTORY_CAP);
    }
    existing
}

fn write_lines_atomic(path: &Path, lines: &[String]) -> io::Result<()> {
    let tmp = path.with_extension("tmp");
    {
        let mut f = fs::File::create(&tmp)?;
        for line in lines {
            f.write_all(line.as_bytes())?;
            f.write_all(b"\n")?;
        }
        f.flush()?;
    }
    match fs::rename(&tmp, path) {
        Ok(()) => Ok(()),
        Err(_) => {
            let copy_result = fs::copy(&tmp, path).map(|_| ());
            let _ = fs::remove_file(&tmp);
            copy_result
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    fn fresh_history() -> (tempfile::TempDir, GrepHistory) {
        let dir = tempdir().unwrap();
        let path = dir.path().join(GREP_HISTORY_FILE_NAME);
        (dir, GrepHistory::new(path))
    }

    #[test]
    fn missing_file_reads_as_empty_list() {
        let (_dir, history) = fresh_history();
        assert!(history.read_all().is_empty());
        assert!(history.recent("").is_empty());
    }

    #[test]
    fn record_appends_in_chronological_order() {
        let (_dir, history) = fresh_history();
        history.record("alpha").unwrap();
        history.record("beta").unwrap();
        history.record("gamma").unwrap();
        assert_eq!(history.read_all(), vec!["alpha", "beta", "gamma"]);
    }

    #[test]
    fn record_skips_when_pattern_equals_last_line() {
        let (_dir, history) = fresh_history();
        history.record("alpha").unwrap();
        history.record("alpha").unwrap();
        history.record("alpha").unwrap();
        assert_eq!(history.read_all(), vec!["alpha"]);
    }

    #[test]
    fn record_moves_earlier_duplicate_to_end() {
        let (_dir, history) = fresh_history();
        history.record("alpha").unwrap();
        history.record("beta").unwrap();
        history.record("gamma").unwrap();
        history.record("alpha").unwrap();
        assert_eq!(history.read_all(), vec!["beta", "gamma", "alpha"]);
    }

    #[test]
    fn record_caps_file_at_fifty_entries() {
        let (_dir, history) = fresh_history();
        for i in 0..(GREP_HISTORY_CAP + 5) {
            history.record(&format!("p{i}")).unwrap();
        }
        let all = history.read_all();
        assert_eq!(all.len(), GREP_HISTORY_CAP);
        assert_eq!(all.first().unwrap(), "p5");
        assert_eq!(
            all.last().unwrap(),
            &format!("p{}", GREP_HISTORY_CAP + 5 - 1)
        );
    }

    #[test]
    fn record_ignores_empty_and_whitespace_patterns() {
        let (_dir, history) = fresh_history();
        history.record("").unwrap();
        history.record("   ").unwrap();
        history.record("\t\n").unwrap();
        assert!(history.read_all().is_empty());
    }

    #[test]
    fn record_trims_whitespace_around_pattern() {
        let (_dir, history) = fresh_history();
        history.record("  alpha  ").unwrap();
        assert_eq!(history.read_all(), vec!["alpha"]);
    }

    #[test]
    fn recent_returns_newest_first_capped_at_ten() {
        let (_dir, history) = fresh_history();
        for i in 0..15 {
            history.record(&format!("p{i}")).unwrap();
        }
        let recent = history.recent("");
        assert_eq!(recent.len(), GREP_HISTORY_SUGGESTIONS);
        assert_eq!(recent.first().unwrap(), "p14");
        assert_eq!(recent.last().unwrap(), "p5");
    }

    #[test]
    fn recent_filters_by_prefix() {
        let (_dir, history) = fresh_history();
        history.record("cuda|oom").unwrap();
        history.record("panic").unwrap();
        history.record("cuda_init").unwrap();
        let recent = history.recent("cuda");
        assert_eq!(recent, vec!["cuda_init", "cuda|oom"]);
    }

    #[test]
    fn record_creates_parent_directory_if_missing() {
        let dir = tempdir().unwrap();
        let nested = dir.path().join("nested").join("deeper");
        let history = GrepHistory::new(nested.join(GREP_HISTORY_FILE_NAME));
        history.record("alpha").unwrap();
        assert!(nested.exists());
        assert_eq!(history.read_all(), vec!["alpha"]);
    }
}
