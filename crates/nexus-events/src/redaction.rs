use std::collections::BTreeMap;

pub const REDACTION_MARKER: &str = "<redacted>";

const DEFAULT_SENSITIVE_PATTERNS: &[&str] = &[
    "password",
    "*_password",
    "secret",
    "*_secret",
    "token",
    "*_token",
    "api_key",
    "*_api_key",
    "authorization",
    "prompt",
    "*_prompt",
    "private_key",
    "*_private_key",
];

#[derive(Debug, Clone)]
pub struct SensitiveNameAllowlist {
    patterns: Vec<String>,
}

impl SensitiveNameAllowlist {
    pub fn new<I, S>(extra_sensitive_patterns: I) -> Self
    where
        I: IntoIterator<Item = S>,
        S: Into<String>,
    {
        let mut patterns = DEFAULT_SENSITIVE_PATTERNS
            .iter()
            .map(|pattern| normalize_pattern(pattern))
            .collect::<Vec<_>>();

        patterns.extend(
            extra_sensitive_patterns
                .into_iter()
                .map(Into::into)
                .map(|pattern| normalize_pattern(&pattern)),
        );

        Self { patterns }
    }

    pub fn default_patterns() -> &'static [&'static str] {
        DEFAULT_SENSITIVE_PATTERNS
    }

    pub fn is_sensitive(&self, field_name: &str) -> bool {
        let candidate = field_name.to_ascii_lowercase();
        self.patterns
            .iter()
            .any(|pattern| wildcard_matches(pattern, &candidate))
    }

    pub fn redact_field_value(&self, field_name: &str, value: &mut String) -> bool {
        if self.is_sensitive(field_name) {
            value.clear();
            value.push_str(REDACTION_MARKER);
            return true;
        }

        false
    }

    pub fn redact_in_place(&self, fields: &mut BTreeMap<String, String>) {
        for (field_name, value) in fields.iter_mut() {
            let _ = self.redact_field_value(field_name, value);
        }
    }
}

impl Default for SensitiveNameAllowlist {
    fn default() -> Self {
        Self::new(std::iter::empty::<String>())
    }
}

fn normalize_pattern(pattern: &str) -> String {
    let mut normalized = String::with_capacity(pattern.len());
    let mut previous_was_wildcard = false;

    for ch in pattern.chars() {
        if ch == '*' {
            if !previous_was_wildcard {
                normalized.push('*');
            }
            previous_was_wildcard = true;
            continue;
        }

        normalized.push(ch.to_ascii_lowercase());
        previous_was_wildcard = false;
    }

    normalized
}

fn wildcard_matches(pattern: &str, candidate: &str) -> bool {
    if !pattern.contains('*') {
        return pattern == candidate;
    }

    if pattern == "*" {
        return !candidate.is_empty();
    }

    let starts_with_wildcard = pattern.starts_with('*');
    let ends_with_wildcard = pattern.ends_with('*');
    let segments = pattern
        .split('*')
        .filter(|segment| !segment.is_empty())
        .collect::<Vec<_>>();

    if segments.is_empty() {
        return !candidate.is_empty();
    }

    let mut search_from = 0usize;
    let mut segment_index = 0usize;

    if !starts_with_wildcard {
        let first = segments[0];
        if !candidate.starts_with(first) {
            return false;
        }
        search_from = first.len();
        segment_index = 1;
    }

    while segment_index < segments.len() {
        let segment = segments[segment_index];
        let min_start = if segment_index == 0 && starts_with_wildcard {
            1
        } else {
            search_from.saturating_add(1)
        };

        if min_start > candidate.len() {
            return false;
        }

        let Some(relative_index) = candidate[min_start..].find(segment) else {
            return false;
        };

        let absolute_index = min_start + relative_index;
        search_from = absolute_index + segment.len();
        segment_index += 1;
    }

    if ends_with_wildcard {
        return search_from < candidate.len();
    }

    search_from == candidate.len()
}
