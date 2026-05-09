//! Live filter state for the unified ambient stream.
//!
//! All four filters compose via AND. Mutations take effect on the next
//! event tick — the consumer reads `is_visible()` per event.

use glob::Pattern;
use regex::Regex;

use crate::stream::event_line::EventLine;
use crate::stream::severity::Severity;

#[derive(Debug, thiserror::Error)]
pub enum FilterError {
    #[error("invalid glob pattern: {0}")]
    InvalidGlob(#[from] glob::PatternError),
    #[error("invalid regex: {0}")]
    InvalidRegex(#[from] regex::Error),
}

#[derive(Debug, Clone)]
pub enum FollowTarget {
    Run(String),
    Deploy(String),
    Extension(String),
}

#[derive(Debug, Default)]
pub struct FilterState {
    level_floor: Severity,
    source_glob: Option<Pattern>,
    source_glob_text: Option<String>,
    grep: Option<Regex>,
    grep_text: Option<String>,
    follow: Option<FollowTarget>,
    paused: bool,
}

impl FilterState {
    pub fn level_floor(&self) -> Severity {
        self.level_floor
    }

    pub fn set_level_floor(&mut self, floor: Severity) {
        self.level_floor = floor;
    }

    pub fn set_source_glob(&mut self, pattern: Option<&str>) -> Result<(), FilterError> {
        match pattern {
            Some(p) if !p.is_empty() => {
                self.source_glob = Some(Pattern::new(p)?);
                self.source_glob_text = Some(p.to_string());
            }
            _ => {
                self.source_glob = None;
                self.source_glob_text = None;
            }
        }
        Ok(())
    }

    pub fn set_grep(&mut self, pattern: Option<&str>) -> Result<(), FilterError> {
        match pattern {
            Some(p) if !p.is_empty() => {
                self.grep = Some(Regex::new(p)?);
                self.grep_text = Some(p.to_string());
            }
            _ => {
                self.grep = None;
                self.grep_text = None;
            }
        }
        Ok(())
    }

    pub fn set_follow(&mut self, follow: Option<FollowTarget>) {
        self.follow = follow;
    }

    pub fn set_paused(&mut self, paused: bool) {
        self.paused = paused;
    }

    pub fn paused(&self) -> bool {
        self.paused
    }

    pub fn clear(&mut self) {
        self.level_floor = Severity::default();
        self.source_glob = None;
        self.source_glob_text = None;
        self.grep = None;
        self.grep_text = None;
        self.follow = None;
        self.paused = false;
    }

    pub fn has_active_filters(&self) -> bool {
        self.active_filter_count() > 0
    }

    /// Count of active filter dimensions for the prompt's `[!N]` badge.
    /// Each composable axis (level / source / grep / follow / pause)
    /// contributes at most 1 — equivalent to `has_active_filters` but
    /// gives the operator at-a-glance scope.
    pub fn active_filter_count(&self) -> u8 {
        let mut n: u8 = 0;
        if self.level_floor != Severity::default() {
            n += 1;
        }
        if self.source_glob.is_some() {
            n += 1;
        }
        if self.grep.is_some() {
            n += 1;
        }
        if self.follow.is_some() {
            n += 1;
        }
        if self.paused {
            n += 1;
        }
        n
    }

    pub fn source_glob_text(&self) -> Option<&str> {
        self.source_glob_text.as_deref()
    }

    pub fn grep_text(&self) -> Option<&str> {
        self.grep_text.as_deref()
    }

    pub fn follow_ref(&self) -> Option<&FollowTarget> {
        self.follow.as_ref()
    }

    pub fn is_visible(&self, line: &EventLine) -> bool {
        if self.paused {
            return false;
        }
        if line.severity < self.level_floor {
            return false;
        }
        if let Some(g) = &self.source_glob
            && !g.matches(&line.source)
        {
            return false;
        }
        if let Some(r) = &self.grep
            && !r.is_match(&line.summary)
        {
            return false;
        }
        if let Some(target) = &self.follow
            && !follow_matches(target, line)
        {
            return false;
        }
        true
    }
}

fn follow_matches(target: &FollowTarget, line: &EventLine) -> bool {
    match target {
        FollowTarget::Run(id) => line.correlation.run_id.as_deref() == Some(id),
        FollowTarget::Deploy(id) => line.correlation.deployment_id.as_deref() == Some(id),
        FollowTarget::Extension(id) => line.correlation.extension_id.as_deref() == Some(id),
    }
}
