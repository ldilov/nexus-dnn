//! Hugging Face auth token resolution.
//!
//! Tokens are resolved exclusively from the `HF_TOKEN` environment variable
//! at construction time. There is intentionally no public string constructor
//! so tokens cannot be collected through the UI and round-tripped through
//! the capability.

#[derive(Clone)]
pub struct HfToken(Option<String>);

impl HfToken {
    pub fn from_env() -> Self {
        Self(std::env::var("HF_TOKEN").ok().filter(|v| !v.is_empty()))
    }

    pub fn empty() -> Self {
        Self(None)
    }

    pub fn as_bearer(&self) -> Option<String> {
        self.0.as_ref().map(|t| format!("Bearer {t}"))
    }

    pub fn is_present(&self) -> bool {
        self.0.is_some()
    }
}

impl std::fmt::Debug for HfToken {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("HfToken")
            .field("present", &self.is_present())
            .finish()
    }
}
