# Contract: Backend-Neutral Adapter

**Spec**: 005
**Version**: 0.1.0

---

## 1. Overview

The backend adapter is the abstraction boundary between the host/extension supervisor and any specific inference runtime. Every backend family (llama.cpp, TensorRT-LLM, future backends) implements this contract. The UI and recipe system never address a specific backend directly.

---

## 2. Rust Trait Definition

```rust
#[async_trait]
pub trait BackendAdapter: Send + Sync {
    /// Detect platform capabilities and return available runtime options.
    async fn probe_environment(&self) -> Result<EnvironmentProbe, BackendError>;

    /// Install the backend runtime for the given profile.
    async fn install_runtime(
        &self,
        profile: &BackendProfile,
        progress: &dyn ProgressSink,
    ) -> Result<RuntimeInstall, BackendError>;

    /// Validate an existing runtime installation.
    async fn validate_runtime(&self, install: &RuntimeInstall) -> Result<ValidationResult, BackendError>;

    /// Start the backend service for the given profile.
    async fn start_service(&self, profile: &BackendProfile) -> Result<(), BackendError>;

    /// Stop the backend service gracefully, then force if timeout expires.
    async fn stop_service(&self, profile_id: &str, timeout: Duration) -> Result<(), BackendError>;

    /// Restart the backend service.
    async fn restart_service(&self, profile: &BackendProfile) -> Result<(), BackendError>;

    /// Query backend health.
    async fn health(&self, profile_id: &str) -> Result<BackendHealth, BackendError>;

    /// Collect normalized metrics.
    async fn metrics(&self, profile_id: &str) -> Result<NormalizedMetrics, BackendError>;

    /// Report backend capabilities.
    fn capabilities(&self) -> BackendCapabilities;

    /// Execute a single chat turn (non-streaming).
    async fn chat(&self, request: ChatRequest) -> Result<ChatResponse, BackendError>;

    /// Execute a streaming chat turn.
    async fn chat_stream(
        &self,
        request: ChatRequest,
        sink: &dyn StreamSink,
    ) -> Result<ChatStreamSummary, BackendError>;

    /// Generate embeddings for text input.
    async fn embeddings(&self, request: EmbeddingRequest) -> Result<EmbeddingResponse, BackendError>;

    /// List locally available models for this backend.
    async fn list_local_models(&self) -> Result<Vec<ModelInstallSummary>, BackendError>;

    /// Validate a model file/directory before loading.
    async fn validate_model(&self, model: &ModelInstall) -> Result<ModelValidation, BackendError>;
}
```

---

## 3. Core Types

### EnvironmentProbe

```rust
pub struct EnvironmentProbe {
    pub os_family: OsFamily,           // windows, linux, macos
    pub arch: CpuArch,                 // x64, arm64
    pub nvidia_gpu_detected: bool,
    pub cuda_available: Option<CudaInfo>,
    pub cuda_version: Option<String>,  // detected CUDA toolkit version
    pub python_available: Option<PythonInfo>,
    pub recommended_profiles: Vec<RecommendedProfile>,
    pub expert_overrides_available: Vec<String>,
}

pub struct RecommendedProfile {
    pub name: String,           // "Balanced (CPU)", "NVIDIA Optimized (CUDA 12)"
    pub backend_family: String,
    pub acceleration: String,
    pub is_default: bool,
}
```

### BackendCapabilities

```rust
pub struct BackendCapabilities {
    pub backend_id: String,
    pub backend_display_name: String,
    pub backend_version: Option<String>,
    pub operating_modes: Vec<String>,     // "native", "http_server", "direct_api" (no "wsl_sidecar")
    pub platform_support: PlatformSupport,
    pub accelerator_types: Vec<String>,   // "cpu", "cuda", "vulkan"
    pub model_formats: Vec<String>,       // "gguf", "hf_checkpoint", "engine"
    pub chat_support: bool,
    pub streaming_support: bool,
    pub embeddings_support: bool,
    pub reranking_support: bool,
    pub structured_output_support: bool,
    pub metrics_available: bool,
}
```

### NormalizedMetrics

```rust
pub struct NormalizedMetrics {
    pub backend: String,
    pub status: String,
    pub model: Option<String>,
    pub request_count: u64,
    pub active_requests: u32,
    pub prompt_tokens_total: u64,
    pub generated_tokens_total: u64,
    pub prompt_tokens_per_second: f64,
    pub generated_tokens_per_second: f64,
    pub kv_cache_usage_ratio: Option<f64>,
    pub gpu_memory_used_mb: Option<u64>,
    pub last_updated_at: String,  // ISO 8601
}
```

### BackendHealth

```rust
pub struct BackendHealth {
    pub status: HealthStatus,       // ready, degraded, failed, starting, stopped
    pub backend_id: String,
    pub backend_version: Option<String>,
    pub model_identity: Option<String>,
    pub runtime_pid: Option<u32>,
    pub uptime_seconds: Option<u64>,
    pub last_error: Option<StructuredError>,
}
```

### ChatRequest / ChatResponse

```rust
pub struct ChatRequest {
    pub profile_id: String,
    pub messages: Vec<ChatMessage>,
    pub generation_params: GenerationParams,
    pub stream: bool,
}

pub struct ChatMessage {
    pub role: String,       // "system", "user", "assistant"
    pub content: String,
}

pub struct GenerationParams {
    pub temperature: Option<f64>,
    pub top_p: Option<f64>,
    pub top_k: Option<u32>,
    pub max_tokens: Option<u32>,
    pub repeat_penalty: Option<f64>,
    pub stop_sequences: Option<Vec<String>>,
}

pub struct ChatResponse {
    pub message: ChatMessage,
    pub finish_reason: String,      // "stop", "length", "cancelled"
    pub usage: TokenUsage,
    pub generation_time_ms: u64,
}

pub struct TokenUsage {
    pub prompt_tokens: u32,
    pub completion_tokens: u32,
    pub total_tokens: u32,
}
```

### ChatStreamDelta

```rust
pub struct ChatStreamDelta {
    pub delta_text: String,
    pub finish_reason: Option<String>,
    pub usage: Option<TokenUsage>,
}

pub struct ChatStreamSummary {
    pub full_message: ChatMessage,
    pub finish_reason: String,
    pub usage: TokenUsage,
    pub generation_time_ms: u64,
}
```

### StructuredError

```rust
pub struct StructuredError {
    pub category: ErrorCategory,
    pub code: String,
    pub message: String,
    pub diagnostic_excerpt: Option<String>,
    pub backend_version: Option<String>,
    pub effective_command: Option<String>,
    pub model_reference: Option<String>,
    pub remediation_hint: Option<String>,
}

pub enum ErrorCategory {
    BinaryMissing,
    InstallCorrupt,
    ModelFileMissing,
    PortBindFailure,
    CudaMismatch,
    ModelLoadFailure,
    OutOfMemory,
    RequestTimeout,
    BackendUnavailable,
    UnexpectedProcessExit,
    EnvironmentSetupFailed,
    UnsupportedPlatform,
}
```

---

## 4. Event Types

Events emitted through the host event bus during backend lifecycle:

| Event Type | Payload | When |
|------------|---------|------|
| `backend.install.progress` | `{ profile_id, percent, message }` | During runtime installation |
| `backend.install.complete` | `{ profile_id, install_id, version }` | Installation finished |
| `backend.install.failed` | `{ profile_id, error: StructuredError }` | Installation failed |
| `backend.state.changed` | `{ profile_id, old_state, new_state }` | Profile state transition |
| `backend.health.changed` | `{ profile_id, health: BackendHealth }` | Health status change |
| `backend.metrics.updated` | `{ profile_id, metrics: NormalizedMetrics }` | Metrics snapshot |

---

## 5. Implementation Notes

### llama.cpp specifics
- `start_service` generates a `llama-server` command line and spawns a managed process
- `health` polls `GET /health` on the `llama-server` HTTP endpoint
- `metrics` polls `GET /metrics` and parses Prometheus text format
- `chat_stream` uses `POST /v1/chat/completions` with `stream: true` and parses SSE

### TensorRT-LLM specifics
- `start_service` delegates to the Python `ServiceWorker` which manages `trtllm-serve`
- `health` and `metrics` poll the serve-mode HTTP endpoints
- `probe_environment` detects CUDA version, Python availability, and GPU compatibility (no WSL2 checks)
- The Python bridge handles managed embedded venv creation, pinned package install, CUDA validation, and import verification
- Each backend profile gets its own isolated Python environment to avoid CUDA version conflicts

### Adding future backends
- Implement the `BackendAdapter` trait
- Register the adapter in the extension supervisor
- Add a version manifest for the new backend
- No changes to the host core, UI, or recipe system required
