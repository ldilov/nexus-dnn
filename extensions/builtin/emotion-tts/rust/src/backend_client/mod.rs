//! Typed client on top of a host-issued [`BackendRuntimeLease`].
//!
//! The extension never frames bytes or owns a subprocess directly —
//! the host's lease abstracts that. This module provides:
//!
//! * [`BackendClient`] — wraps a shared lease, offers typed request builders.
//! * [`LeaseProvider`] — lazy acquisition/release shim around a pluggable
//!   factory so the extension can drive the Q1 stay-warm-until-Stop lifecycle.
//! * [`rpc`] — JSON-RPC method/params shapes + error mapping.
//! * [`notifications`] — broadcast fan-out over the lease notification stream.

pub mod notifications;
pub mod params;
pub mod rpc;

use std::sync::Arc;

use async_trait::async_trait;
use serde::Deserialize;
use tokio::sync::Mutex;

use crate::host_contract::{LeaseState, SharedLease};
use crate::domain::{EmotionTtsError, Result};

/// Parsed worker `handshake` response. Kept on `LeaseProvider` so the
/// dispatcher can populate cache-key fields (`runtime_version`,
/// `model_version`, `model_family`) without acquiring a fresh lease.
///
/// The handshake-side fields not used for cache keys are still captured
/// so the same struct can back the `/runtime/handshake` HTTP route once
/// it switches from `serde_json::Value` to a typed shape.
#[derive(Clone, Debug, Default, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct HandshakeInfo {
    pub protocol_version: Option<String>,
    pub worker_version: Option<String>,
    pub runtime_id: Option<String>,
    pub python_version: Option<String>,
    pub torch_version: Option<String>,
    pub cuda_available: Option<bool>,
    pub device: Option<String>,
    pub model_family_id: Option<String>,
    pub model_present: Option<bool>,
}

impl HandshakeInfo {
    /// Cache-key string for `runtime_version`. Falls back to a deterministic
    /// "unknown-runtime" sentinel that deliberately differs from any real
    /// `worker_version`, so a cache row written before the first handshake
    /// will not collide with a row written after.
    #[must_use]
    pub fn runtime_version_for_cache(&self) -> &str {
        self.worker_version
            .as_deref()
            .unwrap_or(FALLBACK_RUNTIME_VERSION)
    }

    /// Cache-key string for `model_version`. Today the worker contract has
    /// no dedicated `model_version` field — the family id (e.g.
    /// `"indextts-2"`) encodes model identity. When/if a true revision
    /// field is added, migrate this accessor (and `cache_key.rs` callers)
    /// to it.
    #[must_use]
    pub fn model_version_for_cache(&self) -> &str {
        self.model_family_id
            .as_deref()
            .unwrap_or(FALLBACK_MODEL_VERSION)
    }

    /// Cache-key string for `model_family`. Same source as `model_version`
    /// today — distinct accessor so call sites read intentionally.
    #[must_use]
    pub fn model_family_for_cache(&self) -> &str {
        self.model_family_id
            .as_deref()
            .unwrap_or(FALLBACK_MODEL_FAMILY)
    }
}

/// Sentinels used when no handshake has been observed yet. They MUST NOT
/// collide with any real `worker_version` / `model_family_id` strings.
pub const FALLBACK_RUNTIME_VERSION: &str = "unknown-runtime";
pub const FALLBACK_MODEL_VERSION: &str = "unknown-model-version";
pub const FALLBACK_MODEL_FAMILY: &str = "unknown-model-family";

#[derive(Clone)]
pub struct BackendClient {
    lease: SharedLease,
    fanout: Arc<notifications::NotificationFanout>,
}

impl BackendClient {
    #[must_use]
    pub fn new(lease: SharedLease) -> Self {
        let fanout = Arc::new(notifications::NotificationFanout::new());
        Self { lease, fanout }
    }

    #[must_use]
    pub fn lease(&self) -> &SharedLease {
        &self.lease
    }

    #[must_use]
    pub fn notifications(&self) -> &Arc<notifications::NotificationFanout> {
        &self.fanout
    }

    pub async fn call<P: serde::Serialize, R: serde::de::DeserializeOwned>(
        &self,
        method: &str,
        params: &P,
    ) -> Result<R> {
        let json_params = serde_json::to_value(params)?;
        let response = self
            .lease
            .send_rpc(method, json_params)
            .await
            .map_err(rpc::lease_error_to_domain)?;
        serde_json::from_value::<R>(response)
            .map_err(|err| EmotionTtsError::internal(format!("decode response for {method}: {err}")))
    }

    /// Spec 034 / US5 (T104) — typed wrapper for `family.list`.
    /// Dispatcher (T120 backlog) calls this once per reconciliation tick
    /// to find out which family the worker currently has loaded.
    pub async fn family_list(&self) -> Result<params::FamilyListResult> {
        self.call(
            rpc::methods::FAMILY_LIST,
            &serde_json::Map::<String, serde_json::Value>::new(),
        )
        .await
    }

    /// Spec 034 / US5 (T104) — typed wrapper for `family.switch`. Instructs
    /// the worker to unload the active weights and load ``family_id``.
    /// Errors map per contracts/rpc §family.switch (-32012 not_installed,
    /// -32013 incompatible).
    pub async fn family_switch(
        &self,
        family_id: impl Into<String>,
    ) -> Result<params::FamilySwitchResult> {
        let params = params::FamilySwitchParams {
            family_id: family_id.into(),
        };
        self.call(rpc::methods::FAMILY_SWITCH, &params).await
    }

    /// Spec 034 / US1 (T037) — typed wrapper for `voice.preprocess`.
    ///
    /// Runs the reference-audio preprocessing chain on the file at
    /// `source_artifact_abs`, writing the result to `output_artifact_abs`.
    /// Errors map to domain errors per the `-32010 / -32011` contract.
    pub async fn voice_preprocess(
        &self,
        request_id: impl Into<String>,
        source_artifact_abs: impl Into<String>,
        output_artifact_abs: impl Into<String>,
    ) -> Result<params::VoicePreprocessResult> {
        let params = params::VoicePreprocessParams {
            request_id: request_id.into(),
            source_artifact_abs: source_artifact_abs.into(),
            output_artifact_abs: output_artifact_abs.into(),
            pipeline_version: params::PreprocessingReport::default_pipeline_version().to_string(),
        };
        self.call(rpc::methods::VOICE_PREPROCESS, &params).await
    }

    /// Spec 036 / US1 — typed wrapper for `audio.edit`. Materialises the
    /// declarative `chain` against the source artifact at
    /// `source_artifact_abs`, writing the derived audio to
    /// `output_artifact_abs`. Returns the worker's typed report including
    /// the canonical `chain_digest`, source/derived durations, optional
    /// measured LUFS, and per-op timing.
    pub async fn audio_edit(
        &self,
        request_id: impl Into<String>,
        source_artifact_abs: impl Into<String>,
        output_artifact_abs: impl Into<String>,
        chain: serde_json::Value,
    ) -> Result<params::AudioEditResult> {
        let params = params::AudioEditParams {
            request_id: request_id.into(),
            source_artifact_abs: source_artifact_abs.into(),
            output_artifact_abs: output_artifact_abs.into(),
            chain,
        };
        self.call(rpc::methods::AUDIO_EDIT, &params).await
    }

    /// Spec 036 / US1 — typed wrapper for `audio.edit.preview`. Worker
    /// writes the materialised audio to a temp file under its scratch
    /// directory and returns the absolute path; the calling Rust route is
    /// responsible for streaming the bytes back and deleting the temp file
    /// once the response body has been drained (or the connection closes).
    pub async fn audio_edit_preview(
        &self,
        request_id: impl Into<String>,
        source_artifact_abs: impl Into<String>,
        chain: serde_json::Value,
        format_hint: Option<String>,
    ) -> Result<params::AudioEditPreviewResult> {
        let params = params::AudioEditPreviewParams {
            request_id: request_id.into(),
            source_artifact_abs: source_artifact_abs.into(),
            chain,
            format_hint,
        };
        self.call(rpc::methods::AUDIO_EDIT_PREVIEW, &params).await
    }
}

/// Factory contract the host implements to mint new leases on demand.
///
/// Kept as a trait so the extension can test against a mock (see
/// `rust/tests/fixtures/mock_backend.rs`) without importing the host's
/// concrete `backend-runtime-installs` crate (Principle XIII).
#[async_trait]
pub trait LeaseFactory: Send + Sync {
    async fn acquire(&self) -> Result<SharedLease>;
}

/// Lazy lease holder implementing the Q1 lifecycle: acquire once on first
/// task, stay warm until explicit stop, never auto-release.
pub struct LeaseProvider {
    factory: Arc<dyn LeaseFactory>,
    state: Mutex<LeaseSlot>,
    /// Most recent successful `handshake` response. Populated lazily as a
    /// best-effort side effect of `spawn_if_needed` and the
    /// `/runtime/handshake` HTTP route, so the dispatcher can fetch the
    /// real `worker_version` + `model_family_id` for the cache key
    /// without paying for a cold-start handshake on every cache check.
    cached_handshake: Arc<Mutex<Option<HandshakeInfo>>>,
}

struct LeaseSlot {
    client: Option<BackendClient>,
    last_activity: Option<std::time::Instant>,
}

impl Default for LeaseSlot {
    fn default() -> Self {
        Self {
            client: None,
            last_activity: None,
        }
    }
}

impl LeaseProvider {
    #[must_use]
    pub fn new(factory: Arc<dyn LeaseFactory>) -> Self {
        Self {
            factory,
            state: Mutex::new(LeaseSlot::default()),
            cached_handshake: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn spawn_if_needed(&self) -> Result<BackendClient> {
        let mut slot = self.state.lock().await;
        let reuse = slot
            .client
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned();
        if let Some(existing) = reuse {
            slot.last_activity = Some(std::time::Instant::now());
            return Ok(existing);
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        slot.client = Some(client.clone());
        slot.last_activity = Some(std::time::Instant::now());

        // Fire a best-effort handshake in the background to populate the
        // cache-key metadata. Failure here MUST NOT block lease creation
        // — the dispatcher will fall back to `unknown-*` sentinel strings,
        // which deliberately don't collide with real handshake-derived
        // keys, so the next successful handshake repopulates the cache
        // and subsequent cache writes use real values.
        let handshake_client = client.clone();
        let cached = self.cached_handshake.clone();
        tokio::spawn(async move {
            let params = serde_json::json!({
                "protocol_version": "1.0",
                "client": "emotion-tts-extension",
                "client_version": env!("CARGO_PKG_VERSION"),
            });
            match handshake_client
                .call::<_, HandshakeInfo>(rpc::methods::HANDSHAKE, &params)
                .await
            {
                Ok(info) => {
                    *cached.lock().await = Some(info);
                }
                Err(err) => {
                    tracing::warn!(
                        target: "emotion_tts::dispatch",
                        error = %err,
                        "handshake failed; cache-key will use fallback sentinel strings"
                    );
                }
            }
        });

        Ok(client)
    }

    /// Returns the most recent successful handshake response, if any.
    /// Non-blocking against the lease slot — safe to call from cache-key
    /// hot paths without risking a cold-start lease acquisition.
    pub async fn cached_handshake(&self) -> Option<HandshakeInfo> {
        self.cached_handshake.lock().await.clone()
    }

    /// Overwrite the cached handshake. Used by the
    /// `/runtime/handshake` HTTP route after a successful explicit
    /// handshake so the freshest values feed the cache key.
    pub async fn set_cached_handshake(&self, info: HandshakeInfo) {
        *self.cached_handshake.lock().await = Some(info);
    }

    pub async fn current(&self) -> Option<BackendClient> {
        self.state.lock().await.client.clone()
    }

    pub async fn stop(&self) -> Result<()> {
        let mut slot = self.state.lock().await;
        if let Some(client) = slot.client.take() {
            client
                .lease()
                .release()
                .await
                .map_err(rpc::lease_error_to_domain)?;
        }
        // Drop the cached handshake so a restart can't accidentally serve
        // stale `worker_version`/`model_family_id` to the cache key.
        *self.cached_handshake.lock().await = None;
        Ok(())
    }

    pub async fn restart(&self) -> Result<BackendClient> {
        self.stop().await?;
        self.spawn_if_needed().await
    }

    /// Returns `Some(elapsed)` when a live lease exists, or `None` when no
    /// lease has been acquired. The idle-release watcher uses this to decide
    /// whether to call `stop()`.
    pub async fn idle_for(&self) -> Option<std::time::Duration> {
        let slot = self.state.lock().await;
        if slot.client.is_none() {
            return None;
        }
        slot.last_activity.map(|t| t.elapsed())
    }
}

/// A lease is serviceable iff a caller can still send RPCs through it
/// without hitting an immediate `InvalidState`. `Stopping`/`Failed`/
/// `Released` are dead ends and force a fresh spawn.
#[must_use]
const fn is_serviceable(state: LeaseState) -> bool {
    matches!(state, LeaseState::Starting | LeaseState::Ready | LeaseState::Busy)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn handshake_info_falls_back_to_unknown_runtime() {
        let info = HandshakeInfo::default();
        assert_eq!(info.runtime_version_for_cache(), FALLBACK_RUNTIME_VERSION);
        assert_eq!(info.model_version_for_cache(), FALLBACK_MODEL_VERSION);
        assert_eq!(info.model_family_for_cache(), FALLBACK_MODEL_FAMILY);
    }

    #[test]
    fn handshake_info_returns_real_worker_version_when_present() {
        let info = HandshakeInfo {
            worker_version: Some("0.2.0".into()),
            model_family_id: Some("indextts-2".into()),
            ..HandshakeInfo::default()
        };
        assert_eq!(info.runtime_version_for_cache(), "0.2.0");
        assert_eq!(info.model_version_for_cache(), "indextts-2");
        assert_eq!(info.model_family_for_cache(), "indextts-2");
    }

    #[test]
    fn handshake_info_deserializes_snake_case_payload() {
        let raw = serde_json::json!({
            "protocol_version": "1.0",
            "worker_version": "0.2.0",
            "runtime_id": "rt-abc",
            "python_version": "3.11.7",
            "torch_version": "2.4.0",
            "cuda_available": true,
            "device": "cuda:0",
            "model_family_id": "indextts-2",
            "model_present": true,
        });
        let parsed: HandshakeInfo = serde_json::from_value(raw).unwrap();
        assert_eq!(parsed.worker_version.as_deref(), Some("0.2.0"));
        assert_eq!(parsed.model_family_id.as_deref(), Some("indextts-2"));
        assert_eq!(parsed.cuda_available, Some(true));
    }

    #[test]
    fn fallback_sentinels_cannot_collide_with_real_values() {
        // Real handshake values are produced by the worker's __version__
        // (PEP 440 form) and model_family_id (slug). Neither shape can
        // legally produce the literal "unknown-runtime"/"unknown-model"
        // strings, so this is mainly a guard against future drift in the
        // fallback constants.
        assert!(FALLBACK_RUNTIME_VERSION.starts_with("unknown-"));
        assert!(FALLBACK_MODEL_VERSION.starts_with("unknown-"));
        assert!(FALLBACK_MODEL_FAMILY.starts_with("unknown-"));
    }
}
