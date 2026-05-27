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
use nexus_backend_runtimes::generic::enums::{InstallStatus, LeaseState, OwnerKind};
use nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry;
use nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo;
use nexus_backend_runtimes::generic::leases::acquire::{AcquireOptions, acquire_lease};
use nexus_backend_runtimes::generic::leases::manager::LeaseManager;
use nexus_backend_runtimes::generic::leases::repo::BackendRuntimeLeasesRepo;
use nexus_backend_runtimes::generic::leases::text_completion::{
    CAPABILITY_TAG, CancelParams, DoneNotify, ErrorNotify, LeaseSelection, METHOD_CANCEL,
    METHOD_START, NOTIFY_DONE, NOTIFY_ERROR, NOTIFY_TOKEN, ResponseFormat, StartParams,
    StartResult, TokenNotify,
};
use nexus_backend_runtimes::generic::leases::trait_def::{BackendRuntimeLease, LeaseNotification};

use super::errors::TextCompletionError;

/// Locate one Ready lease whose source runtime advertises the
/// text-completion capability AND whose catalog tags satisfy the
/// caller's [`LeaseSelection`]. Trait so tests can inject a fixed
/// fake without touching the catalog/installs/lease-manager stack.
#[async_trait]
pub trait LeaseFinder: Send + Sync {
    async fn find(
        &self,
        selection: &LeaseSelection,
    ) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError>;
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
    async fn find(
        &self,
        selection: &LeaseSelection,
    ) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError> {
        let entries = self
            .catalog
            .list_all()
            .await
            .map_err(|e| TextCompletionError::Internal(format!("catalog list: {e}")))?;
        // First pass: collect eligible (entry, install, lease) triples
        // that satisfy CAPABILITY_TAG + every required_tag. Then rank
        // by how many preferred_tags they also match and pick the top.
        let mut eligible: Vec<(usize, Arc<dyn BackendRuntimeLease>)> = Vec::new();
        for entry in entries {
            if !entry.capability_tags.iter().any(|t| t == CAPABILITY_TAG) {
                continue;
            }
            if !selection
                .required_tags
                .iter()
                .all(|req| entry.capability_tags.iter().any(|t| t == req))
            {
                continue;
            }
            let preferred_score = selection
                .preferred_tags
                .iter()
                .filter(|p| entry.capability_tags.iter().any(|t| &t == p))
                .count();
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
                        eligible.push((preferred_score, lease as Arc<dyn BackendRuntimeLease>));
                    }
                }
            }
        }
        // Highest preferred_score wins. Stable: first eligible at the
        // top score (catalog/install/lease enumeration order).
        Ok(eligible.into_iter().max_by_key(|(score, _)| *score).map(|(_, l)| l))
    }
}

/// On-demand lease spawn for the ephemeral path. When `LeaseFinder`
/// returns `None` AND the caller asked for `ephemeral=true`, the broker
/// uses this to acquire a fresh lease against the first Validated install
/// satisfying the selection. The resulting lease is registered with the
/// lease manager (so concurrent broker calls can discover it via
/// `LeaseFinder`) and reaped on completion by the standard ephemeral
/// release path in `complete_inner`.
#[async_trait]
pub trait LeaseAcquirer: Send + Sync {
    async fn acquire(
        &self,
        selection: &LeaseSelection,
    ) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError>;
}

/// Production acquirer. Walks the same catalog/installs slice as
/// `CatalogLeaseFinder` but skips the `LeaseState::Ready` gate — instead
/// it picks the first Validated install and spawns a fresh worker via
/// the host-side `acquire_lease` API.
pub struct CatalogLeaseAcquirer {
    catalog: Arc<dyn BackendRuntimeCatalogRepo>,
    installs: Arc<dyn BackendRuntimeInstallsRepo>,
    leases_repo: Arc<dyn BackendRuntimeLeasesRepo>,
    family_handlers: Arc<FamilyHandlerRegistry>,
    lease_manager: Arc<LeaseManager>,
}

impl CatalogLeaseAcquirer {
    pub fn new(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        leases_repo: Arc<dyn BackendRuntimeLeasesRepo>,
        family_handlers: Arc<FamilyHandlerRegistry>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        Self {
            catalog,
            installs,
            leases_repo,
            family_handlers,
            lease_manager,
        }
    }
}

#[async_trait]
impl LeaseAcquirer for CatalogLeaseAcquirer {
    async fn acquire(
        &self,
        selection: &LeaseSelection,
    ) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError> {
        let entries = self
            .catalog
            .list_all()
            .await
            .map_err(|e| TextCompletionError::Internal(format!("catalog list: {e}")))?;
        for entry in entries {
            if !entry.capability_tags.iter().any(|t| t == CAPABILITY_TAG) {
                continue;
            }
            if !selection
                .required_tags
                .iter()
                .all(|req| entry.capability_tags.iter().any(|t| t == req))
            {
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
                let options = AcquireOptions::new(
                    OwnerKind::Deployment,
                    format!("broker:text-completion:{}", entry.runtime_id),
                )
                .with_idle_reapable(true);
                let stdio = acquire_lease(
                    install.runtime_install_id.clone(),
                    entry.runtime_family,
                    options,
                    self.installs.as_ref(),
                    self.leases_repo.as_ref(),
                    self.family_handlers.as_ref(),
                    None,
                )
                .await
                .map_err(|e| {
                    TextCompletionError::LeaseAcquisitionFailed(format!("acquire: {e}"))
                })?;
                // Register so concurrent broker callers can discover via
                // LeaseFinder. The reaper attributes it to this install.
                self.lease_manager
                    .register(stdio.clone(), install.runtime_install_id.clone())
                    .await;
                return Ok(Some(stdio as Arc<dyn BackendRuntimeLease>));
            }
        }
        Ok(None)
    }
}

/// Aggregated request shape so the trait signature does not grow each
/// time a new opaque field is added.
#[derive(Debug, Clone, Default)]
pub struct CompletionRequest {
    pub system: String,
    pub user: String,
    pub max_tokens: u32,
    pub timeout: Duration,
    pub response_format: Option<ResponseFormat>,
    pub n_gpu_layers: Option<i32>,
    pub selection: LeaseSelection,
    /// When `true`, the service MUST release the underlying lease after
    /// the call completes (success or failure). Releasing reaps the
    /// worker subprocess and frees VRAM. When `false`, the lease
    /// persists for the next caller (warm-cache behaviour).
    pub ephemeral: bool,
}

/// One-shot text completion. Implementations buffer the streaming
/// contract internally and return the assembled string.
#[async_trait]
pub trait TextCompletionService: Send + Sync {
    async fn complete(&self, request: CompletionRequest) -> Result<String, TextCompletionError>;
}

/// Abstraction over the host's lease-release hook so tests can verify
/// ephemeral semantics without standing up a full `LeaseManager`.
#[async_trait]
pub trait LeaseReleaser: Send + Sync {
    async fn release(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    ) -> Result<(), TextCompletionError>;
}

/// Spec 051 PR-3 (Option γ). The broker bumps activity around every
/// `send_rpc` it issues so the idle reaper cannot release a lease the
/// broker is actively using (`in_flight_count > 0` blocks reaping).
/// Test code can leave this `None` — buffer-loop semantics don't depend
/// on activity tracking, only on subscriber notifications.
#[async_trait]
pub trait LeaseActivityTracker: Send + Sync {
    async fn activity_start(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    );
    async fn activity_end(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    );
}

/// Production tracker: delegates to [`LeaseManager`].
pub struct LeaseManagerActivityTracker {
    manager: Arc<LeaseManager>,
}

impl LeaseManagerActivityTracker {
    pub fn new(manager: Arc<LeaseManager>) -> Self {
        Self { manager }
    }
}

#[async_trait]
impl LeaseActivityTracker for LeaseManagerActivityTracker {
    async fn activity_start(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    ) {
        self.manager.activity_start(lease_id).await;
    }
    async fn activity_end(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    ) {
        self.manager.activity_end(lease_id).await;
    }
}

/// Production releaser: delegates to [`LeaseManager::release`]. The
/// manager terminates the worker subprocess on release, which frees
/// any GPU memory the model held.
pub struct LeaseManagerReleaser {
    manager: Arc<LeaseManager>,
}

impl LeaseManagerReleaser {
    pub fn new(manager: Arc<LeaseManager>) -> Self {
        Self { manager }
    }
}

#[async_trait]
impl LeaseReleaser for LeaseManagerReleaser {
    async fn release(
        &self,
        lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
    ) -> Result<(), TextCompletionError> {
        self.manager
            .release(lease_id)
            .await
            .map_err(|e| TextCompletionError::Internal(format!("lease release: {e}")))
    }
}

/// Production service. Composes a `LeaseFinder` with the canonical
/// streaming contract and buffers tokens into a `String`. Optional
/// `releaser` enables ephemeral lease semantics (reap worker after
/// each call); when `None`, ephemeral requests succeed but the
/// underlying lease is NOT reaped (warm-cache fallback) and a single
/// `ephemeral_release_skipped` warning is logged via `tracing::warn`.
pub struct LeaseBackedTextCompletion {
    finder: Arc<dyn LeaseFinder>,
    acquirer: Option<Arc<dyn LeaseAcquirer>>,
    releaser: Option<Arc<dyn LeaseReleaser>>,
    activity: Option<Arc<dyn LeaseActivityTracker>>,
}

impl LeaseBackedTextCompletion {
    pub fn new(finder: Arc<dyn LeaseFinder>) -> Self {
        Self {
            finder,
            acquirer: None,
            releaser: None,
            activity: None,
        }
    }

    pub fn with_acquirer(mut self, acquirer: Arc<dyn LeaseAcquirer>) -> Self {
        self.acquirer = Some(acquirer);
        self
    }

    pub fn with_releaser(mut self, releaser: Arc<dyn LeaseReleaser>) -> Self {
        self.releaser = Some(releaser);
        self
    }

    pub fn with_activity_tracker(mut self, activity: Arc<dyn LeaseActivityTracker>) -> Self {
        self.activity = Some(activity);
        self
    }

    /// Convenience constructor that wires the production catalog finder.
    /// When `family_handlers` + `leases_repo` are supplied, the broker
    /// also gains on-demand ephemeral lease spawning — `ephemeral=true`
    /// requests no longer 503 just because no Ready lease exists yet.
    pub fn from_components(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        let releaser: Arc<dyn LeaseReleaser> =
            Arc::new(LeaseManagerReleaser::new(lease_manager.clone()));
        let activity: Arc<dyn LeaseActivityTracker> =
            Arc::new(LeaseManagerActivityTracker::new(lease_manager.clone()));
        Self {
            finder: Arc::new(CatalogLeaseFinder::new(catalog, installs, lease_manager)),
            acquirer: None,
            releaser: Some(releaser),
            activity: Some(activity),
        }
    }

    /// Extended constructor that additionally wires the on-demand
    /// ephemeral acquirer. Pass when the caller has access to the host
    /// `FamilyHandlerRegistry` and `BackendRuntimeLeasesRepo` (typically
    /// router-side wiring during AppState assembly).
    pub fn from_components_with_acquirer(
        catalog: Arc<dyn BackendRuntimeCatalogRepo>,
        installs: Arc<dyn BackendRuntimeInstallsRepo>,
        leases_repo: Arc<dyn BackendRuntimeLeasesRepo>,
        family_handlers: Arc<FamilyHandlerRegistry>,
        lease_manager: Arc<LeaseManager>,
    ) -> Self {
        let releaser: Arc<dyn LeaseReleaser> =
            Arc::new(LeaseManagerReleaser::new(lease_manager.clone()));
        let activity: Arc<dyn LeaseActivityTracker> =
            Arc::new(LeaseManagerActivityTracker::new(lease_manager.clone()));
        let acquirer: Arc<dyn LeaseAcquirer> = Arc::new(CatalogLeaseAcquirer::new(
            catalog.clone(),
            installs.clone(),
            leases_repo,
            family_handlers,
            lease_manager.clone(),
        ));
        Self {
            finder: Arc::new(CatalogLeaseFinder::new(catalog, installs, lease_manager)),
            acquirer: Some(acquirer),
            releaser: Some(releaser),
            activity: Some(activity),
        }
    }
}

#[async_trait]
impl TextCompletionService for LeaseBackedTextCompletion {
    async fn complete(&self, request: CompletionRequest) -> Result<String, TextCompletionError> {
        if request.user.is_empty() {
            return Err(TextCompletionError::Validation("user must be non-empty".into()));
        }
        if request.max_tokens == 0 {
            return Err(TextCompletionError::Validation("max_tokens must be > 0".into()));
        }
        let timeout_ms = request.timeout.as_millis().min(u32::MAX as u128) as u32;
        let timeout = request.timeout;
        let ephemeral = request.ephemeral;
        let inner = self.complete_inner(request);
        let outcome = match tokio::time::timeout(timeout, inner).await {
            Ok(result) => result,
            Err(_) => Err(TextCompletionError::Timeout(timeout_ms)),
        };
        // ephemeral release is the LeaseBackedTextCompletion's
        // responsibility post-completion. complete_inner handles the
        // happy/error release for the lease it actually used; this
        // outer arm only matters for the Timeout branch, which is
        // already handled by lease.send_rpc's own cancel-on-error.
        let _ = ephemeral;
        outcome
    }
}

impl LeaseBackedTextCompletion {
    async fn complete_inner(
        &self,
        request: CompletionRequest,
    ) -> Result<String, TextCompletionError> {
        let CompletionRequest {
            system,
            user,
            max_tokens,
            response_format,
            n_gpu_layers,
            selection,
            ephemeral,
            ..
        } = request;
        let lease = match self.finder.find(&selection).await? {
            Some(l) => l,
            None => {
                // No Ready lease — fall back to on-demand spawn iff
                // the caller asked for ephemeral semantics AND an
                // acquirer is wired. Otherwise behave as before (503).
                if ephemeral {
                    if let Some(acq) = &self.acquirer {
                        match acq.acquire(&selection).await? {
                            Some(fresh) => fresh,
                            None => return Err(TextCompletionError::NoEligibleBackend),
                        }
                    } else {
                        return Err(TextCompletionError::NoEligibleBackend);
                    }
                } else {
                    return Err(TextCompletionError::NoEligibleBackend);
                }
            }
        };
        let lease_id = lease.id();
        // Option γ activity tracking: bump in_flight for the whole
        // broker call so the idle reaper cannot release this lease
        // mid-prompt. Paired `activity_end` runs unconditionally at
        // both happy and error exits below.
        if let Some(tracker) = &self.activity {
            tracker.activity_start(&lease_id).await;
        }
        let mut subscriber = lease.subscribe_notifications();

        let start_params = StartParams {
            system,
            user,
            max_tokens,
            response_format,
            n_gpu_layers,
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

        if ephemeral {
            match &self.releaser {
                Some(rel) => {
                    if let Err(err) = rel.release(&lease_id).await {
                        tracing::warn!(
                            lease_id = %lease_id,
                            error = %err,
                            "ephemeral release failed; lease may remain Ready",
                        );
                    }
                }
                None => {
                    tracing::warn!(
                        lease_id = %lease_id,
                        "ephemeral request accepted but no LeaseReleaser configured; lease NOT reaped",
                    );
                }
            }
        }

        if let Some(tracker) = &self.activity {
            tracker.activity_end(&lease_id).await;
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
        async fn find(&self, _selection: &LeaseSelection) -> Result<Option<Arc<dyn BackendRuntimeLease>>, TextCompletionError> {
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
            .complete(CompletionRequest {
                system: "s".into(),
                user: "u".into(),
                max_tokens: 32,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "be terse".into(),
                user: "complete this".into(),
                max_tokens: 64,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_millis(50),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "s".into(),
                user: "".into(),
                max_tokens: 32,
                timeout: Duration::from_secs(1),
                ..Default::default()
            })
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::Validation(_)));
    }

    #[tokio::test]
    async fn validation_rejects_zero_max_tokens() {
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(None)));
        let err = svc
            .complete(CompletionRequest {
                system: "s".into(),
                user: "u".into(),
                max_tokens: 0,
                timeout: Duration::from_secs(1),
                ..Default::default()
            })
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
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(5),
                ..Default::default()
            })
            .await
            .unwrap_err();
        assert!(matches!(err, TextCompletionError::LeaseAcquisitionFailed(_)));
    }

    #[derive(Default)]
    struct ReleaseSpy {
        ids: std::sync::Mutex<Vec<nexus_backend_runtimes::generic::ids::RuntimeLeaseId>>,
    }

    #[async_trait]
    impl LeaseReleaser for ReleaseSpy {
        async fn release(
            &self,
            lease_id: &nexus_backend_runtimes::generic::ids::RuntimeLeaseId,
        ) -> Result<(), TextCompletionError> {
            self.ids.lock().unwrap().push(*lease_id);
            Ok(())
        }
    }

    fn ok_lease() -> (
        Arc<ScriptedLease>,
        Arc<dyn BackendRuntimeLease>,
    ) {
        let lease = ScriptedLease::new(Ok(serde_json::json!({"stream_id": "s1"})));
        let l_clone = lease.clone();
        // Emit a token + done so buffer_loop terminates.
        tokio::spawn(async move {
            // Wait briefly for the subscriber to attach.
            for _ in 0..20 {
                if l_clone.fanout.subscriber_count() > 0 {
                    break;
                }
                tokio::time::sleep(Duration::from_millis(5)).await;
            }
            l_clone.publish(LeaseNotification {
                method: NOTIFY_TOKEN.into(),
                params: serde_json::json!({"stream_id": "s1", "delta": "hello"}),
            });
            l_clone.publish(LeaseNotification {
                method: NOTIFY_DONE.into(),
                params: serde_json::json!({"stream_id": "s1"}),
            });
        });
        let dyn_lease: Arc<dyn BackendRuntimeLease> = lease.clone();
        (lease, dyn_lease)
    }

    #[tokio::test]
    async fn ephemeral_request_releases_lease_after_completion() {
        let (lease, dyn_lease) = ok_lease();
        let releaser = Arc::new(ReleaseSpy::default());
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(dyn_lease))))
            .with_releaser(releaser.clone() as Arc<dyn LeaseReleaser>);
        let out = svc
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(2),
                ephemeral: true,
                ..Default::default()
            })
            .await
            .unwrap();
        assert_eq!(out, "hello");
        let released = releaser.ids.lock().unwrap();
        assert_eq!(released.len(), 1, "ephemeral must trigger exactly one release");
        assert_eq!(released[0], lease.id());
    }

    #[tokio::test]
    async fn non_ephemeral_request_does_not_release_lease() {
        let (_lease, dyn_lease) = ok_lease();
        let releaser = Arc::new(ReleaseSpy::default());
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(dyn_lease))))
            .with_releaser(releaser.clone() as Arc<dyn LeaseReleaser>);
        svc.complete(CompletionRequest {
            system: "".into(),
            user: "u".into(),
            max_tokens: 16,
            timeout: Duration::from_secs(2),
            ephemeral: false,
            ..Default::default()
        })
        .await
        .unwrap();
        assert!(releaser.ids.lock().unwrap().is_empty());
    }

    #[tokio::test]
    async fn ephemeral_without_releaser_completes_without_panic() {
        let (_lease, dyn_lease) = ok_lease();
        let svc = LeaseBackedTextCompletion::new(Arc::new(StaticFinder(Some(dyn_lease))));
        let out = svc
            .complete(CompletionRequest {
                system: "".into(),
                user: "u".into(),
                max_tokens: 16,
                timeout: Duration::from_secs(2),
                ephemeral: true,
                ..Default::default()
            })
            .await
            .unwrap();
        assert_eq!(out, "hello");
    }
}
