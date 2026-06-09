//! Host-generic file selection for `model_artifact` snapshot downloads.
//!
//! A [`FileSelection`] narrows a HuggingFace repo's file listing to the subset
//! an extension actually needs, so installs stop snapshotting hundreds of GB of
//! unused variants from shared mega-repos.

use serde::Deserialize;

use crate::error::DepError;

/// Selection of files to download from a model repo.
///
/// Precedence (highest first):
/// 1. `files` — exact-path allowlist. When non-empty, ONLY these paths match
///    and globs are ignored entirely.
/// 2. `include` / `exclude` — glob filters. A path is selected when it matches
///    at least one `include` glob (an empty `include` means include-all) AND
///    matches no `exclude` glob.
/// 3. none set — every file in the repo is selected (whole-repo snapshot,
///    the historical behavior; backward compatible for extensions that omit
///    selection).
///
/// Glob syntax is the standard [`globset`] dialect: `*` matches within a path
/// segment, `**` matches across segments, `?` matches a single character,
/// `{a,b}` alternation. Matching is literal-prefix-anchored against the full
/// repo-relative path (e.g. `transformer/diffusion_pytorch_model.safetensors`).
#[derive(Debug, Clone, Default, Deserialize, PartialEq, Eq)]
pub struct FileSelection {
    #[serde(default)]
    pub files: Vec<String>,
    #[serde(default)]
    pub include: Vec<String>,
    #[serde(default)]
    pub exclude: Vec<String>,
}

impl FileSelection {
    /// True when no selection is configured — the whole repo is downloaded.
    pub fn is_unrestricted(&self) -> bool {
        self.files.is_empty() && self.include.is_empty() && self.exclude.is_empty()
    }

    /// Filter `paths` to the selected subset, preserving input order.
    ///
    /// Returns [`DepError::InvalidSpec`] if a glob fails to compile, or
    /// [`DepError::Backend`] if a configured selection matches nothing (an
    /// empty install is always an error, never a silent zero-file success).
    pub fn filter<'a, I>(&self, paths: I) -> Result<Vec<&'a str>, DepError>
    where
        I: IntoIterator<Item = &'a str>,
    {
        let matcher = SelectionMatcher::compile(self)?;
        let selected: Vec<&'a str> = paths
            .into_iter()
            .filter(|path| matcher.matches(path))
            .collect();
        if !self.is_unrestricted() && selected.is_empty() {
            return Err(DepError::Backend(
                "file selection matched no files in the repo listing — \
                 check the spec's files/include/exclude entries"
                    .to_owned(),
            ));
        }
        Ok(selected)
    }
}

enum SelectionMatcher {
    All,
    Exact(std::collections::HashSet<String>),
    Glob {
        include: Option<globset::GlobSet>,
        exclude: Option<globset::GlobSet>,
    },
}

impl SelectionMatcher {
    fn compile(selection: &FileSelection) -> Result<Self, DepError> {
        if !selection.files.is_empty() {
            return Ok(Self::Exact(selection.files.iter().cloned().collect()));
        }
        if selection.is_unrestricted() {
            return Ok(Self::All);
        }
        let include = build_globset(&selection.include, "include")?;
        let exclude = build_globset(&selection.exclude, "exclude")?;
        Ok(Self::Glob { include, exclude })
    }

    fn matches(&self, path: &str) -> bool {
        match self {
            Self::All => true,
            Self::Exact(set) => set.contains(path),
            Self::Glob { include, exclude } => {
                let included = include.as_ref().is_none_or(|set| set.is_match(path));
                let excluded = exclude.as_ref().is_some_and(|set| set.is_match(path));
                included && !excluded
            }
        }
    }
}

fn build_globset(patterns: &[String], field: &str) -> Result<Option<globset::GlobSet>, DepError> {
    if patterns.is_empty() {
        return Ok(None);
    }
    let mut builder = globset::GlobSetBuilder::new();
    for pattern in patterns {
        let glob = globset::GlobBuilder::new(pattern)
            .literal_separator(true)
            .build()
            .map_err(|e| {
                DepError::invalid_spec("", field, format!("invalid glob '{pattern}': {e}"))
            })?;
        builder.add(glob);
    }
    let set = builder
        .build()
        .map_err(|e| DepError::invalid_spec("", field, format!("glob set build failed: {e}")))?;
    Ok(Some(set))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sel(files: &[&str], include: &[&str], exclude: &[&str]) -> FileSelection {
        FileSelection {
            files: files.iter().map(|s| s.to_string()).collect(),
            include: include.iter().map(|s| s.to_string()).collect(),
            exclude: exclude.iter().map(|s| s.to_string()).collect(),
        }
    }

    const LISTING: &[&str] = &[
        "config.json",
        "model.safetensors",
        "transformer/diffusion_pytorch_model.safetensors",
        "text_encoder/model.safetensors",
        "vae/diffusion_pytorch_model.safetensors",
        "tokenizer/vocab.json",
    ];

    #[test]
    fn unrestricted_selects_all() {
        let s = FileSelection::default();
        assert!(s.is_unrestricted());
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(got, LISTING);
    }

    #[test]
    fn files_exact_allowlist_wins() {
        let s = sel(
            &["config.json", "transformer/diffusion_pytorch_model.safetensors"],
            &["**/*.json"],
            &["config.json"],
        );
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(
            got,
            vec!["config.json", "transformer/diffusion_pytorch_model.safetensors"]
        );
    }

    #[test]
    fn include_globs_select_matching() {
        let s = sel(&[], &["**/*.safetensors"], &[]);
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(
            got,
            vec![
                "model.safetensors",
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
                "vae/diffusion_pytorch_model.safetensors",
            ]
        );
    }

    #[test]
    fn exclude_globs_drop_matching() {
        let s = sel(&[], &[], &["vae/**", "tokenizer/**"]);
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(
            got,
            vec![
                "config.json",
                "model.safetensors",
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
            ]
        );
    }

    #[test]
    fn include_then_exclude_combined() {
        let s = sel(&[], &["**/*.safetensors"], &["vae/**"]);
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(
            got,
            vec![
                "model.safetensors",
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
            ]
        );
    }

    #[test]
    fn empty_match_is_error() {
        let s = sel(&["does/not/exist.bin"], &[], &[]);
        let err = s.filter(LISTING.iter().copied()).unwrap_err();
        assert!(matches!(err, DepError::Backend(_)), "got {err:?}");
    }

    #[test]
    fn invalid_glob_is_invalid_spec() {
        let s = sel(&[], &["transformer/["], &[]);
        let err = s.filter(LISTING.iter().copied()).unwrap_err();
        assert!(matches!(err, DepError::InvalidSpec { .. }), "got {err:?}");
    }

    #[test]
    fn single_segment_star_does_not_cross_slash() {
        let s = sel(&[], &["*.safetensors"], &[]);
        let got = s.filter(LISTING.iter().copied()).unwrap();
        assert_eq!(got, vec!["model.safetensors"]);
    }
}
