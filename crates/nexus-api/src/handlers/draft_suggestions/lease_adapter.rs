//! Production `SuggestionStreamProvider` implementations.
//!
//! Exposes:
//!
//! - [`NullStreamProvider`] — always returns `NoEligibleBackend` so the
//!   endpoint family answers with the documented 503 + CTA payload when
//!   no backend is configured (or when the lease-backed provider has
//!   nothing to dispatch to). Useful as a default and as a unit-test
//!   stand-in.
//! - [`LeaseBackedStreamProvider`] — drives the streaming text-completion
//!   JSON-RPC contract documented at
//!   [`nexus_backend_runtimes::generic::leases::text_completion`] over
//!   any lease whose source runtime advertises the canonical capability
//!   tag. Extension-agnostic by virtue of the lease layer: the host
//!   never names a specific backend; runtimes opt in by tagging their
//!   catalog entry.

use std::pin::Pin;
use std::sync::Arc;

use async_trait::async_trait;
use futures_util::Stream;
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;

use nexus_backend_runtimes::generic::catalog::BackendRuntimeCatalogRepo;
use nexus_backend_runtimes::generic::enums::{InstallStatus, LeaseState};
use nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo;
use nexus_backend_runtimes::generic::leases::manager::LeaseManager;
use nexus_backend_runtimes::generic::leases::text_completion::{
    CAPABILITY_TAG, CancelParams, DoneNotify, ErrorNotify, METHOD_CANCEL, METHOD_START,
    NOTIFY_DONE, NOTIFY_ERROR, NOTIFY_TOKEN, StartParams, StartResult, TokenNotify,
};
use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;

use super::errors::DraftSuggestionError;
use super::prompt_template::PromptPair;
use super::provider::{CancelFlag, LeaseGuard, StreamHandle, StreamItem, SuggestionStreamProvider};
use super::types::SuggestionRequest;

/// Placeholder provider that always reports `NoEligibleBackend` so the
/// endpoint returns 503 with the generic CTA payload defined in the
/// OpenAPI fragment. Used when the host hasn't been configured with a
/// real lease-backed provider.
pub struct NullStreamProvider;

impl NullStreamProvider {
    pub fn new() -> Self {
        Self
    }
}

impl Default for NullStreamProvider {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl SuggestionStreamProvider for NullStreamProvider {
    async fn open_stream(
        &self,
        _request: &SuggestionRequest,
        _prompt: PromptPair,
        _cancel: CancelFlag,
    ) -> Result<StreamHandle, DraftSuggestionError> {
        Err(DraftSuggestionError::NoEligibleBackend)
    }
}

/// Picks a live, ready lease whose source runtime advertises the
/// text-completion capability. Abstracted as a trait so tests can inject
/// a fake without touching the catalog / installs / lease-manager
/// triplet that the production impl needs.
#[async_trait]
pub trait EligibleLeaseFinder: Send + Sync {
    async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, DraftSuggestionError>;
}

/// Production `EligibleLeaseFinder` — composes catalog query (which
/// runtimes implement the contract?) + installs query (which installs
/// of those runtimes are validated?) + the in-process lease registry
/// (which of those installs has a ready lease right now?).
pub struct CatalogBackedLeaseFinder {
    catalog: Arc<dyn BackendRuntimeCatalogRepo>,
    installs: Arc<dyn BackendRuntimeInstallsRepo>,
    lease_manager: Arc<LeaseManager>,
}

impl CatalogBackedLeaseFinder {
    pub fn new(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        Self {
            catalog,
            installs,
            lease_manager,
        }
    }
}

#[async_trait]
impl EligibleLeaseFinder for CatalogBackedLeaseFinder {
    async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, DraftSuggestionError> {
        let entries = self
            .catalog
            .list_all()
            .await
            .map_err(|e| DraftSuggestionError::Internal(format!("catalog list: {e}")))?;
        for entry in entries {
            if !entry.capability_tags.iter().any(|t| t == CAPABILITY_TAG) {
                continue;
            }
            let installs = self
                .installs
                .list_by_runtime(&entry.runtime_id)
                .await
                .map_err(|e| DraftSuggestionError::Internal(format!("installs list: {e}")))?;
            for install in installs {
                if install.status != InstallStatus::Validated {
                    continue;
                }
                for lease in self
                    .lease_manager
                    .handles_for_install(&install.runtime_install_id)
                    .await
                {
                    if lease.state() == LeaseState::Ready {
                        return Ok(Some(lease as Arc<dyn BackendRuntimeLease>));
                    }
                }
            }
        }
        Ok(None)
    }
}

/// Channel buffer for forwarding stream items from the broadcast
/// subscriber task to the consuming SSE encoder. Sized generously to
/// absorb token bursts without back-pressuring the worker.
const STREAM_CHANNEL_CAPACITY: usize = 256;

/// `SuggestionStreamProvider` that drives the text-completion JSON-RPC
/// contract over any participating lease.
pub struct LeaseBackedStreamProvider {
    finder: Arc<dyn EligibleLeaseFinder>,
}

impl LeaseBackedStreamProvider {
    pub fn new(finder: Arc<dyn EligibleLeaseFinder>) -> Self {
        Self { finder }
    }

    /// Convenience constructor that wires the production catalog-backed
    /// finder. Prefer [`new`] in tests.
    pub fn from_components(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        Self::new(Arc::new(CatalogBackedLeaseFinder::new(
            catalog,
            installs,
            lease_manager,
        )))
    }
}

#[async_trait]
impl SuggestionStreamProvider for LeaseBackedStreamProvider {
    async fn open_stream(
        &self,
        request: &SuggestionRequest,
        prompt: PromptPair,
        cancel: CancelFlag,
    ) -> Result<StreamHandle, DraftSuggestionError> {
        let lease = self
            .finder
            .find()
            .await?
            .ok_or(DraftSuggestionError::NoEligibleBackend)?;
        let lease_id = lease.id();
        let mut subscriber = lease.subscribe_notifications();

        let start_params = StartParams {
            system: prompt.system,
            user: prompt.user,
            max_tokens: request.max_tokens,
            // Spec 050 D2: draft_suggestions never requests constrained
            // generation. Wire output stays byte-identical to pre-D2.
            response_format: None,
        };
        let start_value = serde_json::to_value(&start_params)
            .map_err(|e| DraftSuggestionError::Internal(format!("encode start params: {e}")))?;
        let start_resp = lease
            .send_rpc(METHOD_START, start_value)
            .await
            .map_err(|e| DraftSuggestionError::LeaseAcquisitionFailed(format!("start: {e}")))?;
        let start_result: StartResult = serde_json::from_value(start_resp)
            .map_err(|e| DraftSuggestionError::Internal(format!("decode start result: {e}")))?;
        let stream_id = start_result.stream_id;

        let (tx, rx) = mpsc::channel::<StreamItem>(STREAM_CHANNEL_CAPACITY);
        let cancel_for_task = cancel.clone();
        let lease_for_cancel = lease.clone();
        let stream_id_for_task = stream_id.clone();
        let stream_id_for_guard = stream_id.clone();

        tokio::spawn(async move {
            forward_loop(
                &mut subscriber,
                tx,
                stream_id_for_task,
                cancel_for_task,
                lease_for_cancel,
            )
            .await
        });

        let lease_for_guard = lease.clone();
        let lease_guard = LeaseGuard::new(move || {
            // Best-effort cooperative cancel on drop. The stream may
            // have already terminated naturally — `send_rpc` for an
            // unknown stream_id MUST be a no-op on the worker side per
            // the contract.
            let lease = lease_for_guard;
            let stream_id = stream_id_for_guard;
            tokio::spawn(async move {
                let params = CancelParams { stream_id };
                if let Ok(value) = serde_json::to_value(&params) {
                    let _ = lease.send_rpc(METHOD_CANCEL, value).await;
                }
            });
        });

        Ok(StreamHandle {
            lease_id: lease_id.to_string(),
            items: Box::pin(ReceiverStream::new(rx))
                as Pin<Box<dyn Stream<Item = StreamItem> + Send>>,
            lease_guard,
        })
    }
}

/// Forward broadcast notifications matching `stream_id` into the mpsc
/// `tx`. Honors the `cancel` flag and emits the appropriate
/// `StreamItem` terminal frame on done / error / lease-revoked /
/// cancel.
async fn forward_loop(
    subscriber: &mut tokio::sync::broadcast::Receiver<
        nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification,
    >,
    tx: mpsc::Sender<StreamItem>,
    stream_id: String,
    cancel: CancelFlag,
    lease: Arc<dyn BackendRuntimeLease>,
) {
    use tokio::sync::broadcast::error::RecvError;
    loop {
        if cancel.is_cancelled() {
            // Fire cancel RPC in the background; downstream drops on
            // tx send-failure if the consumer already dropped.
            let lease_for_cancel = lease.clone();
            let sid = stream_id.clone();
            tokio::spawn(async move {
                let params = CancelParams { stream_id: sid };
                if let Ok(value) = serde_json::to_value(&params) {
                    let _ = lease_for_cancel.send_rpc(METHOD_CANCEL, value).await;
                }
            });
            let _ = tx.send(StreamItem::Done).await;
            return;
        }
        let recv = subscriber.recv().await;
        match recv {
            Ok(n) => {
                if let Some(item) = classify_notification(&n, &stream_id) {
                    let is_terminal = matches!(
                        item,
                        StreamItem::Done | StreamItem::Error(_) | StreamItem::LeaseRevoked(_)
                    );
                    if tx.send(item).await.is_err() {
                        return;
                    }
                    if is_terminal {
                        return;
                    }
                }
            }
            Err(RecvError::Closed) => {
                let _ = tx
                    .send(StreamItem::LeaseRevoked(
                        "lease notification channel closed".into(),
                    ))
                    .await;
                return;
            }
            Err(RecvError::Lagged(n)) => {
                tracing::warn!(
                    stream_id = %stream_id,
                    lagged = n,
                    "draft suggestion stream subscriber lagged",
                );
            }
        }
    }
}

/// Decode one `LeaseNotification` against the text-completion contract.
/// Returns `None` for notifications that don't belong to this stream
/// (different `stream_id`, different `method`, or malformed payload —
/// the consumer already accepts noise per FR-046 lag tolerance).
fn classify_notification(
    n: &nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification,
    expected_stream_id: &str,
) -> Option<StreamItem> {
    match n.method.as_str() {
        NOTIFY_TOKEN => {
            let payload: TokenNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id {
                return None;
            }
            if payload.delta.is_empty() {
                return None;
            }
            Some(StreamItem::Token(payload.delta))
        }
        NOTIFY_DONE => {
            let payload: DoneNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id {
                return None;
            }
            Some(StreamItem::Done)
        }
        NOTIFY_ERROR => {
            let payload: ErrorNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id {
                return None;
            }
            let err = match payload.code.as_str() {
                "model_unavailable" => DraftSuggestionError::ModelUnavailable(payload.message),
                "prompt_too_long" => DraftSuggestionError::PromptTooLong(payload.message),
                "lease_revoked" => DraftSuggestionError::LeaseRevoked(payload.message),
                _ => DraftSuggestionError::Internal(payload.message),
            };
            Some(StreamItem::Error(err))
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::super::types::{SuggestionContext, SuggestionIntent};
    use super::*;
    use futures_util::StreamExt;
    use nexus_backend_runtimes::generic::enums::LeaseState;
    use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
    use nexus_backend_runtimes::generic::leases::error::LeaseError;
    use nexus_backend_runtimes::generic::leases::notifications::NotificationFanout;
    use nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification;
    use std::sync::Mutex;
    use tokio::sync::broadcast;

    fn req() -> SuggestionRequest {
        SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "x\n".into(),
                active_line_text: "x".into(),
                preceding_lines: 0,
            },
            max_tokens: 64,
        }
    }

    fn prompt() -> PromptPair {
        PromptPair {
            system: "be terse".into(),
            user: "complete this".into(),
        }
    }

    /// Test lease that records every `send_rpc` call and lets the test
    /// push notifications via the embedded fanout.
    struct ScriptedLease {
        id: RuntimeLeaseId,
        fanout: NotificationFanout,
        rpc_log: Mutex<Vec<(String, serde_json::Value)>>,
        start_response: Mutex<Option<Result<serde_json::Value, LeaseError>>>,
    }

    impl ScriptedLease {
        fn new(start_response: Result<serde_json::Value, LeaseError>) -> Arc<Self> {
            let id = RuntimeLeaseId::new();
            Arc::new(Self {
                id,
                fanout: NotificationFanout::new(id),
                rpc_log: Mutex::new(Vec::new()),
                start_response: Mutex::new(Some(start_response)),
            })
        }

        fn rpc_calls(&self) -> Vec<(String, serde_json::Value)> {
            self.rpc_log.lock().unwrap().clone()
        }

        fn publish(&self, n: LeaseNotification) -> usize {
            self.fanout.publish(n)
        }
    }

    #[async_trait]
    impl BackendRuntimeLease for ScriptedLease {
        fn id(&self) -> RuntimeLeaseId {
            self.id
        }
        fn state(&self) -> LeaseState {
            LeaseState::Ready
        }
        async fn send_rpc(
            &self,
            method: &str,
            params: serde_json::Value,
        ) -> Result<serde_json::Value, LeaseError> {
            self.rpc_log
                .lock()
                .unwrap()
                .push((method.to_string(), params.clone()));
            if method == METHOD_START {
                if let Some(r) = self.start_response.lock().unwrap().take() {
                    return r;
                }
                return Err(LeaseError::Internal(
                    "start_response already consumed".into(),
                ));
            }
            Ok(serde_json::Value::Null)
        }
        fn subscribe_notifications(&self) -> broadcast::Receiver<LeaseNotification> {
            self.fanout.subscribe()
        }
        async fn release(&self) -> Result<(), LeaseError> {
            Ok(())
        }
    }

    /// Test finder that returns whatever it was constructed with.
    struct StaticFinder(Option<Arc<dyn BackendRuntimeLease>>);

    #[async_trait]
    impl EligibleLeaseFinder for StaticFinder {
        async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, DraftSuggestionError> {
            Ok(self.0.clone())
        }
    }

    #[tokio::test]
    async fn no_eligible_lease_returns_no_eligible_backend() {
        let provider = LeaseBackedStreamProvider::new(Arc::new(StaticFinder(None)));
        let result = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await;
        assert!(matches!(
            result,
            Err(DraftSuggestionError::NoEligibleBackend)
        ));
    }

    #[tokio::test]
    async fn happy_path_forwards_tokens_then_done() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let provider = LeaseBackedStreamProvider::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));
        let handle = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await
            .expect("open");

        // Verify start RPC was issued with the right shape.
        let calls = lease.rpc_calls();
        assert_eq!(calls.len(), 1);
        assert_eq!(calls[0].0, METHOD_START);
        let p: StartParams = serde_json::from_value(calls[0].1.clone()).unwrap();
        assert_eq!(p.user, "complete this");
        assert_eq!(p.system, "be terse");
        assert_eq!(p.max_tokens, 64);

        // Push two tokens + done.
        for delta in ["hello ", "world"] {
            let payload = serde_json::to_value(TokenNotify {
                stream_id: "s-1".into(),
                delta: delta.into(),
            })
            .unwrap();
            // Wait for the subscriber to be wired before publishing.
            for _ in 0..50 {
                if lease.fanout.subscriber_count() > 0 {
                    break;
                }
                tokio::time::sleep(std::time::Duration::from_millis(2)).await;
            }
            lease.publish(LeaseNotification {
                method: NOTIFY_TOKEN.into(),
                params: payload,
            });
        }
        let done = serde_json::to_value(DoneNotify {
            stream_id: "s-1".into(),
            cancelled: false,
        })
        .unwrap();
        lease.publish(LeaseNotification {
            method: NOTIFY_DONE.into(),
            params: done,
        });

        // Consume the stream.
        let collected: Vec<_> = handle.items.collect().await;
        assert_eq!(collected.len(), 3, "got: {collected:?}");
        match &collected[0] {
            StreamItem::Token(s) => assert_eq!(s, "hello "),
            other => panic!("expected token, got {other:?}"),
        }
        match &collected[1] {
            StreamItem::Token(s) => assert_eq!(s, "world"),
            other => panic!("expected token, got {other:?}"),
        }
        match &collected[2] {
            StreamItem::Done => {}
            other => panic!("expected done, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn ignores_notifications_for_other_streams() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let provider = LeaseBackedStreamProvider::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));
        let handle = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await
            .expect("open");

        for _ in 0..50 {
            if lease.fanout.subscriber_count() > 0 {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(2)).await;
        }
        // Foreign stream — must be ignored.
        lease.publish(LeaseNotification {
            method: NOTIFY_TOKEN.into(),
            params: serde_json::to_value(TokenNotify {
                stream_id: "s-OTHER".into(),
                delta: "noise".into(),
            })
            .unwrap(),
        });
        // Our stream's done.
        lease.publish(LeaseNotification {
            method: NOTIFY_DONE.into(),
            params: serde_json::to_value(DoneNotify {
                stream_id: "s-1".into(),
                cancelled: false,
            })
            .unwrap(),
        });
        let collected: Vec<_> = handle.items.collect().await;
        assert_eq!(collected.len(), 1);
        assert!(matches!(&collected[0], StreamItem::Done));
    }

    #[tokio::test]
    async fn error_notification_maps_to_typed_error() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let provider = LeaseBackedStreamProvider::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));
        let handle = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await
            .expect("open");
        for _ in 0..50 {
            if lease.fanout.subscriber_count() > 0 {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(2)).await;
        }
        lease.publish(LeaseNotification {
            method: NOTIFY_ERROR.into(),
            params: serde_json::to_value(ErrorNotify {
                stream_id: "s-1".into(),
                code: "model_unavailable".into(),
                message: "model not loaded".into(),
            })
            .unwrap(),
        });
        let collected: Vec<_> = handle.items.collect().await;
        assert_eq!(collected.len(), 1);
        match &collected[0] {
            StreamItem::Error(DraftSuggestionError::ModelUnavailable(msg)) => {
                assert_eq!(msg, "model not loaded");
            }
            other => panic!("expected model-unavailable error, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn empty_token_delta_is_filtered() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let provider = LeaseBackedStreamProvider::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));
        let handle = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await
            .expect("open");
        for _ in 0..50 {
            if lease.fanout.subscriber_count() > 0 {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(2)).await;
        }
        lease.publish(LeaseNotification {
            method: NOTIFY_TOKEN.into(),
            params: serde_json::to_value(TokenNotify {
                stream_id: "s-1".into(),
                delta: "".into(),
            })
            .unwrap(),
        });
        lease.publish(LeaseNotification {
            method: NOTIFY_DONE.into(),
            params: serde_json::to_value(DoneNotify {
                stream_id: "s-1".into(),
                cancelled: false,
            })
            .unwrap(),
        });
        let collected: Vec<_> = handle.items.collect().await;
        assert_eq!(
            collected.len(),
            1,
            "empty delta should be filtered; got {collected:?}"
        );
        assert!(matches!(&collected[0], StreamItem::Done));
    }

    #[tokio::test]
    async fn null_provider_always_returns_no_eligible_backend() {
        let provider = NullStreamProvider::new();
        let result = provider
            .open_stream(&req(), prompt(), CancelFlag::new())
            .await;
        assert!(matches!(
            result,
            Err(DraftSuggestionError::NoEligibleBackend)
        ));
    }
}
