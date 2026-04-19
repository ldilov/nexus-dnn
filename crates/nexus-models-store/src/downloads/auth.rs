//! HF access-token store shared between `/model-store/search`,
//! `/model-store/downloads`, and the download orchestrator.
//!
//! FR-110 — optional user token, never exposed to the frontend after
//! save. FR-111 — attached to outbound requests when present.
//! FR-114 — token-change event invalidates matching `auth_required`
//! download jobs (see [`TokenStore::subscribe`]).

use std::sync::Arc;

use tokio::sync::{RwLock, broadcast};

/// Event emitted when the persisted token value changes.
#[derive(Debug, Clone)]
pub enum TokenEvent {
    /// Token was set (may also be a replacement of an existing value).
    Set,
    /// Token was removed.
    Cleared,
}

/// Shared mutable holder for the HF access token. Every reader clones
/// the [`Arc`]; the token is immutable per-snapshot (via `RwLock`).
#[derive(Clone)]
pub struct TokenStore {
    inner: Arc<RwLock<Option<String>>>,
    events: broadcast::Sender<TokenEvent>,
}

impl TokenStore {
    #[must_use]
    pub fn new(initial: Option<String>) -> Self {
        let (tx, _rx) = broadcast::channel(16);
        Self {
            inner: Arc::new(RwLock::new(initial)),
            events: tx,
        }
    }

    /// Current token value (clone of the stored `String`), or `None`
    /// if the user has not configured one.
    pub async fn current(&self) -> Option<String> {
        self.inner.read().await.clone()
    }

    /// `true` when a token is present. Cheaper than [`Self::current`]
    /// for code paths that only need a yes/no signal.
    pub async fn has_token(&self) -> bool {
        self.inner.read().await.is_some()
    }

    /// Replace (or create) the persisted token and notify subscribers.
    /// Returns the previous value (cleared from the store) so the
    /// caller can redact it from its logs.
    pub async fn set(&self, token: String) -> Option<String> {
        let mut guard = self.inner.write().await;
        let prev = guard.replace(token);
        drop(guard);
        let _ = self.events.send(TokenEvent::Set);
        prev
    }

    /// Clear the persisted token. Returns the previous value.
    pub async fn clear(&self) -> Option<String> {
        let mut guard = self.inner.write().await;
        let prev = guard.take();
        drop(guard);
        if prev.is_some() {
            let _ = self.events.send(TokenEvent::Cleared);
        }
        prev
    }

    /// Subscribe to `TokenEvent` notifications. The orchestrator uses
    /// this to drive FR-114 (re-queue `auth_required` jobs on any
    /// token change).
    pub fn subscribe(&self) -> broadcast::Receiver<TokenEvent> {
        self.events.subscribe()
    }
}

impl std::fmt::Debug for TokenStore {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("TokenStore")
            .field("present", &"<redacted>")
            .finish()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn stores_and_replaces_token() {
        let s = TokenStore::new(None);
        assert!(!s.has_token().await);
        let prev = s.set("hf_abc".into()).await;
        assert!(prev.is_none());
        assert_eq!(s.current().await.as_deref(), Some("hf_abc"));
        let prev = s.set("hf_def".into()).await;
        assert_eq!(prev.as_deref(), Some("hf_abc"));
    }

    #[tokio::test]
    async fn emits_event_on_set_and_clear() {
        let s = TokenStore::new(None);
        let mut rx = s.subscribe();
        s.set("x".into()).await;
        assert!(matches!(rx.recv().await, Ok(TokenEvent::Set)));
        s.clear().await;
        assert!(matches!(rx.recv().await, Ok(TokenEvent::Cleared)));
    }

    #[tokio::test]
    async fn clearing_absent_token_is_silent() {
        let s = TokenStore::new(None);
        let mut rx = s.subscribe();
        s.clear().await;
        assert!(rx.try_recv().is_err());
    }

    #[tokio::test]
    async fn debug_never_prints_token_value() {
        let s = TokenStore::new(Some("hf_secret".into()));
        let dbg = format!("{s:?}");
        assert!(!dbg.contains("hf_secret"));
        assert!(dbg.contains("redacted"));
    }
}
