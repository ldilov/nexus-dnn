//! Heuristic-pattern registry — first-match wins on a case-insensitive
//! substring scan of a candidate text.
//!
//! Patterns are coarse on purpose: an operator-friendly nudge, not a
//! deterministic diagnosis. Suggestions point to actionable next steps.

#[derive(Debug, Clone, Copy)]
pub struct Suggestion {
    pub title: &'static str,
    pub action: &'static str,
}

const PATTERNS: &[(&str, Suggestion)] = &[
    (
        "cuda alloc",
        Suggestion {
            title: "CUDA out of memory",
            action: "Reduce batch size or context length; check `nvidia-smi` for stuck processes.",
        },
    ),
    (
        "out of memory",
        Suggestion {
            title: "Out of memory",
            action: "Free RAM/VRAM or lower model context window before retrying.",
        },
    ),
    (
        "econnrefused",
        Suggestion {
            title: "Connection refused",
            action: "Check the target service is running and the bound port matches.",
        },
    ),
    (
        "address already in use",
        Suggestion {
            title: "Port collision",
            action: "Kill the process holding the port (lsof -i :<port>) or change the port.",
        },
    ),
    (
        "lease stalled",
        Suggestion {
            title: "Backend lease stalled",
            action: "Check worker liveness; lease will renew automatically once worker recovers.",
        },
    ),
    (
        "validation failed",
        Suggestion {
            title: "Validation failure",
            action: "Inspect the validator output; usually a manifest or config field shape mismatch.",
        },
    ),
    (
        "missing model",
        Suggestion {
            title: "Model not present",
            action: "Run /open models-search to install the missing model artifact.",
        },
    ),
    (
        "integrity drift",
        Suggestion {
            title: "Storage integrity drift",
            action: "Re-run extension validation; restore from snapshot if drift persists.",
        },
    ),
    (
        "step failed",
        Suggestion {
            title: "Install step failed",
            action: "Inspect the install run's failed step for category and hint fields.",
        },
    ),
    (
        "segfault",
        Suggestion {
            title: "Worker segfault",
            action: "Worker crashed; check process logs and reduce input length / disable optional features.",
        },
    ),
    (
        "panicked",
        Suggestion {
            title: "Host thread panicked",
            action: "Inspect the panic location; report bug if invariant looks broken.",
        },
    ),
];

pub fn suggestion_count() -> usize {
    PATTERNS.len()
}

pub fn match_heuristics(text: &str) -> Option<Suggestion> {
    let lowered = text.to_ascii_lowercase();
    PATTERNS
        .iter()
        .find_map(|(needle, suggestion)| lowered.contains(needle).then_some(*suggestion))
}
