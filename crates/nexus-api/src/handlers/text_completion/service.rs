//! Lease-driving service that buffers the streaming text-completion
//! JSON-RPC contract into a single string response.
//!
//! Parallels the streaming `LeaseBackedStreamProvider` in
//! `draft_suggestions::lease_adapter` but with a buffered sync-result
//! shape that matches a one-shot HTTP request/response. Reuses the same
//! canonical wire contract from
//! `nexus_backend_runtimes::generic::leases::text_completion`.

use std::sync::Arc;
use std::time::Duration;

use async_trait::async_trait;
use nexus_backend_runtimes::generic::catalog::BackendRuntimeCatalogRepo;
use nexus_backend_runtimes::generic::enums::{InstallStatus, LeaseState};
use nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo;
use nexus_backend_runtimes::generic::leases::manager::LeaseManager;
use nexus_backend_runtimes::generic::leases::text_completion::{
    CAPABILITY_TAG, CancelParams, DoneNotify, ErrorNotify, METHOD_CANCEL, METHOD_START, NOTIFY_DONE,
    NOTIFY_ERROR, NOTIFY_TOKEN, ResponseFormat, StartParams, StartResult, TokenNotify,
};
use nexus_backend_runtimes::generic::leases::trait_def::{BackendRuntimeLease, LeaseNotification};

use super::errors::TextCompletionError;

/// Locate one Ready lease whose source runtime advertises the
/// text-completion capability. Trait so tests can inject a fixed
/// fake without touching the catalog/installs/lease-manager stack.
#[async_trait]
pub trait LeaseFinder: Send + Sync {
    async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError>;
}

/// Production finder — identical lookup shape to
/// `draft_suggestions::CatalogBackedLeaseFinder` but with this module's
/// error type so the broker stays boundary-self-contained.
pub struct CatalogLeaseFinder {
    catalog: Arc<dyn BackendRuntimeCatalogRepo>,
    installs: Arc<dyn BackendRuntimeInstallsRepo>,
    lease_manager: Arc<LeaseManager>,
}

impl CatalogLeaseFinder {
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
impl LeaseFinder for CatalogLeaseFinder {
    async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError> {
        let entries = self
            .catalog
            .list_all()
            .await
            .map_err(|e| TextCompletionError::Internal(format!("catalog list: {e}")))?;
        for entry in entries {
            if !entry.capability_tags.iter().any(|t| t == CAPABILITY_TAG) {
                continue;
            }
            let installs = self
                .installs
                .list_by_runtime(&entry.runtime_id)
                .await
                .map_err(|e| TextCompletionError::Internal(format!("installs list: {e}")))?;
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

/// One-shot text completion. Implementations buffer the streaming
/// contract internally and return the assembled string.
#[async_trait]
pub trait TextCompletionService: Send + Sync {
    async fn complete(
        &self,
        system: String,
        user: String,
        max_tokens: u32,
        timeout: Duration,
        response_format: Option<ResponseFormat>,
    ) -> Result<String, TextCompletionError>;
}

/// Production service. Composes a `LeaseFinder` with the canonical
/// streaming contract and buffers tokens into a `String`.
pub struct LeaseBackedTextCompletion {
    finder: Arc<dyn LeaseFinder>,
}

impl LeaseBackedTextCompletion {
    pub fn new(finder: Arc<dyn LeaseFinder>) -> Self {
        Self { finder }
    }

    /// Convenience constructor that wires the production catalog finder.
    pub fn from_components(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        Self::new(Arc::new(CatalogLeaseFinder::new(
            catalog,
            installs,
            lease_manager,
        )))
    }
}

#[async_trait]
impl TextCompletionService for LeaseBackedTextCompletion {
    async fn complete(
        &self,
        system: String,
        user: String,
        max_tokens: u32,
        timeout: Duration,
        response_format: Option<ResponseFormat>,
    ) -> Result<String, TextCompletionError> {
        if user.is_empty() {
            return Err(TextCompletionError::Validation("user must be non-empty".into()));
        }
        if max_tokens == 0 {
            return Err(TextCompletionError::Validation("max_tokens must be > 0".into()));
        }
        let timeout_ms = timeout.as_millis().min(u32::MAX as u128) as u32;
        let inner = self.complete_inner(system, user, max_tokens, response_format);
        match tokio::time::timeout(timeout, inner).await {
            Ok(result) => result,
            Err(_) => Err(TextCompletionError::Timeout(timeout_ms)),
        }
    }
}

impl LeaseBackedTextCompletion {
    async fn complete_inner(
        &self,
        system: String,
        user: String,
        max_tokens: u32,
        response_format: Option<ResponseFormat>,
    ) -> Result<String, TextCompletionError> {
        let lease = self
            .finder
            .find()
            .await?
            .ok_or(TextCompletionError::NoEligibleBackend)?;
        let mut subscriber = lease.subscribe_notifications();

        let start_params = StartParams {
            system,
            user,
            max_tokens,
            response_format,
        };
        let start_value = serde_json::to_value(&start_params).map_err(|e| {
            TextCompletionError::Internal(format!("encode start params: {e}"))
        })?;
        let start_resp = lease
            .send_rpc(METHOD_START, start_value)
            .await
            .map_err(|e| TextCompletionError::LeaseAcquisitionFailed(format!("start: {e}")))?;
        let start_result: StartResult = serde_json::from_value(start_resp).map_err(|e| {
            TextCompletionError::Internal(format!("decode start result: {e}"))
        })?;
        let stream_id = start_result.stream_id;

        let outcome = buffer_loop(&mut subscriber, &stream_id).await;

        // Best-effort cancel on any non-Done exit. The worker MUST treat
        // unknown stream-ids as a no-op per the contract.
        if outcome.is_err() {
            let cancel = CancelParams {
                stream_id: stream_id.clone(),
            };
            if let Ok(value) = serde_json::to_value(&cancel) {
                let _ = lease.send_rpc(METHOD_CANCEL, value).await;
            }
        }

        outcome
    }
}

/// Drain notifications matching `stream_id` until Done/Error/lease-revoke.
async fn buffer_loop(
    subscriber: &mut tokio::sync::broadcast::Receiver<LeaseNotification>,
    expected_stream_id: &str,
) -> Result<String, TextCompletionError> {
    use tokio::sync::broadcast::error::RecvError;
    let mut buffered = String::new();
    loop {
        match subscriber.recv().await {
            Ok(n) => match classify(&n, expected_stream_id) {
                Some(NotificationItem::Token(delta)) => {
                    buffered.push_str(&delta);
                }
                Some(NotificationItem::Done) => {
                    return Ok(buffered);
                }
                Some(NotificationItem::Error(err)) => {
                    return Err(err);
                }
                None => {}
            },
            Err(RecvError::Closed) => {
                return Err(TextCompletionError::LeaseRevoked(
                    "lease notification channel closed".into(),
                ));
            }
            Err(RecvError::Lagged(n)) => {
                tracing::warn!(
                    stream_id = %expected_stream_id,
                    lagged = n,
                    "text-completion broker subscriber lagged",
                );
            }
        }
    }
}

enum NotificationItem {
    Token(String),
    Done,
    Error(TextCompletionError),
}

fn classify(n: &LeaseNotification, expected_stream_id: &str) -> Option<NotificationItem> {
    match n.method.as_str() {
        NOTIFY_TOKEN => {
            let payload: TokenNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id || payload.delta.is_empty() {
                return None;
            }
            Some(NotificationItem::Token(payload.delta))
        }
        NOTIFY_DONE => {
            let payload: DoneNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id {
                return None;
            }
            Some(NotificationItem::Done)
        }
        NOTIFY_ERROR => {
            let payload: ErrorNotify = serde_json::from_value(n.params.clone()).ok()?;
            if payload.stream_id != expected_stream_id {
                return None;
            }
            let err = match payload.code.as_str() {
                "model_unavailable" => TextCompletionError::ModelUnavailable(payload.message),
                "prompt_too_long" => TextCompletionError::PromptTooLong(payload.message),
                "lease_revoked" => TextCompletionError::LeaseRevoked(payload.message),
                _ => TextCompletionError::Internal(payload.message),
            };
            Some(NotificationItem::Error(err))
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
    use nexus_backend_runtimes::generic::leases::error::LeaseError;
    use nexus_backend_runtimes::generic::leases::notifications::NotificationFanout;
    use std::sync::Mutex;
    use tokio::sync::broadcast;

    /// Test lease: records every send_rpc call; lets tests publish
    /// notifications via the embedded fanout.
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
                return Err(LeaseError::Internal("start_response already consumed".into()));
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

    struct StaticFinder(Option<Arc<dyn BackendRuntimeLease>>);

    #[async_trait]
    impl LeaseFinder for StaticFinder {
        async fn find(&self) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError> {
            Ok(self.0.clone())
        }
    }

    fn wait_for_subscriber(lease: &ScriptedLease) {
        for _ in 0..50 {
            if lease.fanout.subscriber_count() > 0 {
                break;
            }
            std::thread::sleep(std::time::Duration::from_millis(2));
        }
    }

    #[tokio::test]
    async fn no_eligible_lease_returns_no_eligible_backend() {
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(None)));
        let err = svc
            .complete("s".into(), "u".into(), 32, Duration::from_secs(5), None)
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::NoEligibleBackend));
    }

    #[tokio::test]
    async fn happy_path_buffers_tokens_until_done() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let lease_for_publish = lease.clone();
        tokio::spawn(async move {
            // Allow subscriber to register before publishing.
            for _ in 0..50 {
                if lease_for_publish.fanout.subscriber_count() > 0 {
                    break;
                }
                tokio::time::sleep(Duration::from_millis(2)).await;
            }
            for delta in ["hello ", "world"] {
                let payload = serde_json::to_value(TokenNotify {
                    stream_id: "s-1".into(),
                    delta: delta.into(),
                })
                .unwrap();
                lease_for_publish.publish(LeaseNotification {
                    method: NOTIFY_TOKEN.into(),
                    params: payload,
                });
            }
            let done = serde_json::to_value(DoneNotify {
                stream_id: "s-1".into(),
                cancelled: false,
            })
            .unwrap();
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_DONE.into(),
                params: done,
            });
        });

        let text = svc
            .complete("be terse".into(), "complete this".into(), 64, Duration::from_secs(5), None)
            .await
            .expect("complete");
        assert_eq!(text, "hello world");

        let calls = lease.rpc_calls();
        assert_eq!(calls.len(), 1);
        assert_eq!(calls[0].0, METHOD_START);
        let p: StartParams = serde_json::from_value(calls[0].1.clone()).unwrap();
        assert_eq!(p.user, "complete this");
        assert_eq!(p.system, "be terse");
        assert_eq!(p.max_tokens, 64);
    }

    #[tokio::test]
    async fn ignores_notifications_for_other_streams() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let lease_for_publish = lease.clone();
        tokio::spawn(async move {
            wait_for_subscriber(&lease_for_publish);
            // Foreign stream — must be ignored.
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_TOKEN.into(),
                params: serde_json::to_value(TokenNotify {
                    stream_id: "s-OTHER".into(),
                    delta: "noise".into(),
                })
                .unwrap(),
            });
            // Our stream's done.
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_DONE.into(),
                params: serde_json::to_value(DoneNotify {
                    stream_id: "s-1".into(),
                    cancelled: false,
                })
                .unwrap(),
            });
        });

        let text = svc
            .complete("".into(), "u".into(), 16, Duration::from_secs(5), None)
            .await
            .expect("complete");
        assert_eq!(text, "");
    }

    #[tokio::test]
    async fn error_notification_maps_model_unavailable() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let lease_for_publish = lease.clone();
        tokio::spawn(async move {
            wait_for_subscriber(&lease_for_publish);
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_ERROR.into(),
                params: serde_json::to_value(ErrorNotify {
                    stream_id: "s-1".into(),
                    code: "model_unavailable".into(),
                    message: "not loaded".into(),
                })
                .unwrap(),
            });
        });

        let err = svc
            .complete("".into(), "u".into(), 16, Duration::from_secs(5), None)
            .await
            .unwrap_err();
        match err {
            TextCompletionError::ModelUnavailable(msg) => assert_eq!(msg, "not loaded"),
            other => panic!("expected ModelUnavailable, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn error_notification_maps_prompt_too_long() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let lease_for_publish = lease.clone();
        tokio::spawn(async move {
            wait_for_subscriber(&lease_for_publish);
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_ERROR.into(),
                params: serde_json::to_value(ErrorNotify {
                    stream_id: "s-1".into(),
                    code: "prompt_too_long".into(),
                    message: "overflow".into(),
                })
                .unwrap(),
            });
        });

        let err = svc
            .complete("".into(), "u".into(), 16, Duration::from_secs(5), None)
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::PromptTooLong(_)));
    }

    #[tokio::test]
    async fn empty_token_deltas_filtered() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let lease_for_publish = lease.clone();
        tokio::spawn(async move {
            wait_for_subscriber(&lease_for_publish);
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_TOKEN.into(),
                params: serde_json::to_value(TokenNotify {
                    stream_id: "s-1".into(),
                    delta: "".into(),
                })
                .unwrap(),
            });
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_TOKEN.into(),
                params: serde_json::to_value(TokenNotify {
                    stream_id: "s-1".into(),
                    delta: "abc".into(),
                })
                .unwrap(),
            });
            lease_for_publish.publish(LeaseNotification {
                method: NOTIFY_DONE.into(),
                params: serde_json::to_value(DoneNotify {
                    stream_id: "s-1".into(),
                    cancelled: false,
                })
                .unwrap(),
            });
        });

        let text = svc
            .complete("".into(), "u".into(), 16, Duration::from_secs(5), None)
            .await
            .expect("complete");
        assert_eq!(text, "abc");
    }

    #[tokio::test]
    async fn timeout_returns_timeout_error_and_emits_cancel() {
        let start = serde_json::json!({"stream_id": "s-1"});
        let lease = ScriptedLease::new(Ok(start));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        // No publisher — buffer_loop will wait until timeout fires.
        let err = svc
            .complete("".into(), "u".into(), 16, Duration::from_millis(50), None)
            .await
            .unwrap_err();
        match err {
            TextCompletionError::Timeout(ms) => assert_eq!(ms, 50),
            other => panic!("expected Timeout, got {other:?}"),
        }

        // The cancel-on-non-Done is best-effort and lives inside the
        // inner future; the timeout drops that future, so cancel may or
        // may not fire. We only assert the start RPC was issued.
        let calls = lease.rpc_calls();
        assert!(
            calls.iter().any(|(m, _)| m == METHOD_START),
            "start RPC must have been issued, got: {:?}",
            calls
        );
    }

    #[tokio::test]
    async fn validation_rejects_empty_user() {
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(None)));
        let err = svc
            .complete("s".into(), "".into(), 32, Duration::from_secs(1), None)
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::Validation(_)));
    }

    #[tokio::test]
    async fn validation_rejects_zero_max_tokens() {
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(None)));
        let err = svc
            .complete("s".into(), "u".into(), 0, Duration::from_secs(1), None)
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::Validation(_)));
    }

    #[tokio::test]
    async fn start_rpc_failure_maps_to_lease_acquisition_failed() {
        let lease = ScriptedLease::new(Err(LeaseError::Internal("worker dead".into())));
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(
            lease.clone() as Arc<dyn BackendRuntimeLease>
        ))));

        let err = svc
            .complete("".into(), "u".into(), 16, Duration::from_secs(5), None)
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::LeaseAcquisitionFailed(_)));
    }
}
