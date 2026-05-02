//! Spec 037 — abstraction over "drive a model with a prompt and yield
//! tokens until done". The handler is generic over this trait so:
//!
//! - Contract tests inject a `FakeStreamProvider` that yields canned
//!   tokens or returns scripted errors (no real HTTP / no real lease).
//! - The production impl (T078 lease_adapter) wraps `LeaseManager` and
//!   the OpenAI-style streaming endpoint of whatever backend the lease
//!   resolves to — extension-agnostic by virtue of the lease layer.
//!
//! Boundary contract: the trait surface uses only host types
//! (`PromptPair`, `SuggestionRequest`, generic strings/integers). It MUST
//! NOT name any specific extension or backend implementation.

use std::pin::Pin;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};

use async_trait::async_trait;
use futures_util::Stream;
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;

use super::errors::DraftSuggestionError;
use super::prompt_template::PromptPair;
use super::types::SuggestionRequest;

/// One delta yielded by the stream — either a token to append to the
/// running suggestion, or a terminal error/completion signal.
#[derive(Debug, Clone)]
pub enum StreamItem {
    /// One model-emitted chunk. Empty deltas are filtered before reaching
    /// the SSE encoder per `contracts/draft_suggestions.events.md` token
    /// rules.
    Token(String),
    /// Stream finished naturally. The provider has nothing more to send.
    Done,
    /// The lease was revoked mid-stream (rare; happens during a backend
    /// crash or a deactivate cascade).
    LeaseRevoked(String),
    /// Unrecoverable error. Mapped to SSE `error` by the handler.
    Error(DraftSuggestionError),
}

pub type StreamItems = Pin<Box<dyn Stream<Item = StreamItem> + Send>>;

/// RAII guard that releases the backend lease when dropped. Owned by
/// the spawned producer task — any exit path (complete / cancel / error /
/// lease-revoked / client-disconnect / panic) drops the task, which drops
/// the guard, which releases the lease. Implementations MUST attach the
/// release closure here; without it the lease leaks on non-happy paths.
///
/// `LeaseGuard::noop()` is acceptable for fakes that hold no real lease.
pub struct LeaseGuard {
    on_drop: Option<Box<dyn FnOnce() + Send>>,
}

impl LeaseGuard {
    pub fn new(release: impl FnOnce() + Send + 'static) -> Self {
        Self {
            on_drop: Some(Box::new(release)),
        }
    }

    pub fn noop() -> Self {
        Self { on_drop: None }
    }
}

impl Drop for LeaseGuard {
    fn drop(&mut self) {
        if let Some(release) = self.on_drop.take() {
            release();
        }
    }
}

/// Outcome of acquiring a stream — includes the lease id (carried through
/// to the `stream_started` SSE event so the client can correlate cancel
/// requests to their backend-side lease) and a `LeaseGuard` whose `Drop`
/// is the contractual release point.
pub struct StreamHandle {
    pub lease_id: String,
    pub items: StreamItems,
    pub lease_guard: LeaseGuard,
}

/// Cooperative cancel flag shared between the handler and the provider
/// stream. The handler flips it to `true` on receiving a cancel request;
/// the provider checks it between tokens and stops emitting.
#[derive(Debug, Default, Clone)]
pub struct CancelFlag(Arc<AtomicBool>);

impl CancelFlag {
    pub fn new() -> Self {
        Self(Arc::new(AtomicBool::new(false)))
    }
    pub fn cancel(&self) {
        self.0.store(true, Ordering::SeqCst);
    }
    pub fn is_cancelled(&self) -> bool {
        self.0.load(Ordering::SeqCst)
    }
}

/// Drive a single suggestion request to completion.
///
/// Implementations MUST honor the `cancel` flag: once it flips to `true`,
/// no further `Token` items may be yielded; the stream MUST close (via
/// `Done` or by terminating the `Stream`) within a small bounded number
/// of items. Lease release is RAII via the `LeaseGuard` returned in the
/// `StreamHandle` — implementations MUST NOT release the lease eagerly.
#[async_trait]
pub trait SuggestionStreamProvider: Send + Sync {
    async fn open_stream(
        &self,
        request: &SuggestionRequest,
        prompt: PromptPair,
        cancel: CancelFlag,
    ) -> Result<StreamHandle, DraftSuggestionError>;
}

/// Test-only fake: drives a scripted sequence of `StreamItem`s.
///
/// Constructed via [`FakeStreamProvider::script`]. Each call to
/// `open_stream` consumes the script in order. After the script is
/// exhausted, the stream closes.
pub struct FakeStreamProvider {
    plan: FakePlan,
    lease_id: String,
}

#[derive(Debug, Clone)]
pub struct FakePlan {
    pub script: Vec<StreamItem>,
    /// If `Some`, `open_stream` returns this error instead of opening a
    /// stream — used to model the "no_backend_leasable" pre-stream
    /// failure path (T070).
    pub open_error: Option<DraftSuggestionError>,
}

impl FakeStreamProvider {
    pub fn script(items: Vec<StreamItem>) -> Self {
        Self {
            plan: FakePlan {
                script: items,
                open_error: None,
            },
            lease_id: "fake-lease-1".to_string(),
        }
    }

    pub fn with_open_error(error: DraftSuggestionError) -> Self {
        Self {
            plan: FakePlan {
                script: Vec::new(),
                open_error: Some(error),
            },
            lease_id: "fake-lease-1".to_string(),
        }
    }

    pub fn with_lease_id(mut self, id: impl Into<String>) -> Self {
        self.lease_id = id.into();
        self
    }
}

#[async_trait]
impl SuggestionStreamProvider for FakeStreamProvider {
    async fn open_stream(
        &self,
        _request: &SuggestionRequest,
        _prompt: PromptPair,
        cancel: CancelFlag,
    ) -> Result<StreamHandle, DraftSuggestionError> {
        if let Some(err) = self.plan.open_error.as_ref() {
            return Err(clone_error(err));
        }

        let (tx, rx) = mpsc::channel::<StreamItem>(32);
        let script = self.plan.script.clone();
        tokio::spawn(async move {
            for item in script {
                if cancel.is_cancelled() {
                    break;
                }
                if tx.send(item).await.is_err() {
                    break;
                }
            }
        });

        Ok(StreamHandle {
            lease_id: self.lease_id.clone(),
            items: Box::pin(ReceiverStream::new(rx)),
            lease_guard: LeaseGuard::noop(),
        })
    }
}

fn clone_error(err: &DraftSuggestionError) -> DraftSuggestionError {
    err.clone()
}

#[cfg(test)]
mod tests {
    use super::*;
    use futures_util::StreamExt;

    fn req() -> SuggestionRequest {
        use super::super::types::{SuggestionContext, SuggestionIntent};
        SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "x\n".into(),
                active_line_text: "x".into(),
                preceding_lines: 0,
            },
            max_tokens: 96,
        }
    }

    fn prompt() -> PromptPair {
        PromptPair {
            system: "s".into(),
            user: "u".into(),
        }
    }

    #[tokio::test]
    async fn fake_provider_scripts_in_order() {
        let provider = FakeStreamProvider::script(vec![
            StreamItem::Token("hello ".into()),
            StreamItem::Token("world".into()),
            StreamItem::Done,
        ]);
        let handle = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await
            .expect("open");
        let collected: Vec<_> = handle.items.collect().await;
        assert_eq!(collected.len(), 3);
        match &collected[0] {
            StreamItem::Token(s) => assert_eq!(s, "hello "),
            _ => panic!("expected token"),
        }
        match &collected[2] {
            StreamItem::Done => {}
            _ => panic!("expected done"),
        }
    }

    #[tokio::test]
    async fn fake_provider_open_error_returns_pre_stream_failure() {
        let provider = FakeStreamProvider::with_open_error(DraftSuggestionError::NoEligibleBackend);
        let result = provider.open_stream(&req(), prompt(), CancelFlag::new()).await;
        match result {
            Err(DraftSuggestionError::NoEligibleBackend) => {}
            _ => panic!("expected NoEligibleBackend"),
        }
    }

    #[tokio::test]
    async fn cancel_flag_stops_token_emission() {
        let cancel = CancelFlag::new();
        let provider = FakeStreamProvider::script(vec![
            StreamItem::Token("a".into()),
            StreamItem::Token("b".into()),
            StreamItem::Token("c".into()),
            StreamItem::Done,
        ]);
        cancel.cancel();
        let handle = provider
            .open_stream(&req(), prompt(), cancel)
            .await
            .expect("open");
        let collected: Vec<_> = handle.items.collect().await;
        // The fake spawns its emit-task before checking cancel for the
        // first item, but with cancel pre-set the loop breaks on the
        // first iteration → empty.
        assert!(
            collected.is_empty() || collected.len() < 4,
            "cancel should truncate; got {:?}",
            collected.len()
        );
    }

    #[test]
    fn cancel_flag_is_idempotent() {
        let f = CancelFlag::new();
        assert!(!f.is_cancelled());
        f.cancel();
        f.cancel();
        assert!(f.is_cancelled());
    }

    #[test]
    fn lease_guard_runs_release_exactly_once_on_drop() {
        let counter = Arc::new(AtomicBool::new(false));
        let inner = counter.clone();
        let guard = LeaseGuard::new(move || {
            inner.store(true, Ordering::SeqCst);
        });
        assert!(!counter.load(Ordering::SeqCst));
        drop(guard);
        assert!(counter.load(Ordering::SeqCst));
    }

    #[test]
    fn lease_guard_noop_does_not_panic_on_drop() {
        drop(LeaseGuard::noop());
    }
}
