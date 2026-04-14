# Contract: Python SDK v2

**Spec**: 005
**Version**: 0.2.0 (backward-compatible with 0.1.x `BaseWorker`)

---

## 1. Overview

The Python SDK v2 extends the existing `nexus_sdk` package with higher-level abstractions for long-lived service-style workers. It introduces `ServiceWorker`, `ManagedProcess`, `StreamingExecution`, `HealthReporter`, and `ArtifactIO` without breaking existing `BaseWorker` extensions.

---

## 2. Module Structure

```
nexus_sdk/
  __init__.py              # Existing: BaseWorker, ExecutionContext
  protocol.py              # Existing: RPC types
  worker.py                # Existing: BaseWorker (unchanged)
  service_worker.py        # NEW: ServiceWorker
  process.py               # NEW: ManagedProcess
  streaming.py             # NEW: StreamingExecution, StreamSink
  health.py                # NEW: HealthReporter, HealthPayload
  artifacts.py             # NEW: ArtifactIO helpers
  types/
    __init__.py
    llm.py                 # NEW: ChatRequest, ChatResponse, ChatDelta, etc.
```

---

## 3. ServiceWorker

Extends `BaseWorker` with lifecycle hooks and service-oriented patterns.

```python
from nexus_sdk.service_worker import ServiceWorker

class LocalLlmWorker(ServiceWorker):
    def __init__(self):
        super().__init__(
            extension_id="nexus.local-llm",
            extension_version="0.1.0",
            worker_name="local-llm-worker",
        )
        self.backend = None

    async def on_startup(self):
        """Called once after handshake, before accepting execute requests."""
        self.backend = LlamaCppAdapter(config=self.startup_config)

    async def on_shutdown(self):
        """Called when the host closes stdin or sends shutdown signal."""
        if self.backend:
            await self.backend.stop()

    async def on_health_check(self) -> dict:
        """Called periodically by the host. Return structured health payload."""
        if self.backend and self.backend.is_running():
            return {"status": "ready", "backend": self.backend.info()}
        return {"status": "degraded", "reason": "backend not running"}

    async def on_cancel(self, request_id: str):
        """Called when the host cancels an in-flight execution."""
        if self.backend:
            await self.backend.cancel_request(request_id)
```

### Key differences from BaseWorker

| Feature | BaseWorker | ServiceWorker |
|---------|-----------|---------------|
| Lifecycle | Stateless per-request | Long-lived with startup/shutdown |
| Health | Boolean liveness | Structured health payload |
| Process management | None | `ManagedProcess` integration |
| Streaming | Via progress only | Typed `StreamingExecution` |
| Cancellation | `is_cancelled` polling | `on_cancel()` hook |
| Event loop | Synchronous | `asyncio`-based |

---

## 4. ManagedProcess

Cross-platform subprocess helper for wrapping backend executables.

```python
from nexus_sdk.process import ManagedProcess, ProcessConfig

config = ProcessConfig(
    command=["llama-server", "--model", model_path, "--port", str(port)],
    env={"CUDA_VISIBLE_DEVICES": "0"},
    cwd="/path/to/workdir",
    log_capture=True,
    health_check_url=f"http://127.0.0.1:{port}/health",
    health_check_interval_seconds=5,
    shutdown_timeout_seconds=10,
)

proc = ManagedProcess(config)
await proc.start()

# Process properties
proc.pid           # int | None
proc.is_running    # bool
proc.exit_code     # int | None
proc.last_stdout   # last N lines of stdout
proc.last_stderr   # last N lines of stderr
proc.uptime        # timedelta

# Lifecycle
await proc.stop()           # graceful, then force after timeout
await proc.restart()        # stop + start
await proc.wait_for_ready() # poll health_check_url until 200

# Events
proc.on_unexpected_exit(callback)  # called if process dies unexpectedly
proc.on_health_change(callback)    # called when health status changes
```

### Windows behavior

- Uses `subprocess.CREATE_NEW_PROCESS_GROUP` for clean shutdown
- Paths are normalized with forward slashes internally, escaped for Windows APIs
- `proc.stop()` sends `CTRL_BREAK_EVENT` before `TerminateProcess`
- PID file management avoids stale PID false positives

---

## 5. StreamingExecution

Typed abstraction for token/chunk streaming, distinct from progress reporting.

```python
from nexus_sdk.streaming import StreamingExecution, StreamDelta, StreamComplete

class StreamingExecution:
    """Manages a streaming generation, emitting typed events to the host."""

    def __init__(self, context: ExecutionContext, stream_id: str):
        self.context = context
        self.stream_id = stream_id

    async def emit_delta(self, delta: StreamDelta):
        """Emit a partial token/chunk to the host."""
        await self.context.send_stream_event("delta", {
            "stream_id": self.stream_id,
            "delta_text": delta.text,
        })

    async def emit_complete(self, summary: StreamComplete):
        """Emit stream completion with final metrics."""
        await self.context.send_stream_event("complete", {
            "stream_id": self.stream_id,
            "finish_reason": summary.finish_reason,
            "usage": summary.usage.to_dict(),
            "generation_time_ms": summary.generation_time_ms,
        })

    async def emit_error(self, error: str):
        """Emit stream error."""
        await self.context.send_stream_event("error", {
            "stream_id": self.stream_id,
            "error": error,
        })
```

### Important distinction

| Concept | Purpose | Channel |
|---------|---------|---------|
| **Progress** | How far a job is (0-100%) | `progress` notification |
| **Streaming** | What content is arriving | `stream_event` notification |

They are separate channels. A streaming chat turn might report 0% progress but stream 500 tokens.

---

## 6. HealthReporter

Structured health reporting with typed payloads.

```python
from nexus_sdk.health import HealthReporter, HealthStatus

reporter = HealthReporter(worker_name="local-llm-worker")

# Set health state
reporter.set_ready(backend_info={"kind": "llamacpp", "version": "b8766", "model": "qwen2.5-7b"})
reporter.set_degraded(reason="health check timeout", backend_info={...})
reporter.set_failed(error="process exited with code 1")

# Query current health
payload = reporter.to_payload()
# {
#   "status": "ready",
#   "worker_name": "local-llm-worker",
#   "backend": {"kind": "llamacpp", "version": "b8766", "model": "qwen2.5-7b"},
#   "runtime": {"python_version": "3.12.0", "pid": 12345},
#   "last_error": null
# }
```

---

## 7. ArtifactIO

Convenience helpers for artifact read/write operations.

```python
from nexus_sdk.artifacts import ArtifactIO

aio = ArtifactIO(context)

# Read an input artifact
text = await aio.read_text("input_port_name")
data = await aio.read_json("config_port_name")
path = aio.resolve_read_path("model_port_name")

# Write an output artifact
await aio.write_text("output_port", content="Hello, world!", artifact_type="text/chat-message")
await aio.write_json("metrics_port", data={"tokens": 150}, artifact_type="json/metrics")
ref = await aio.write_bytes("blob_port", data=bytes_data, artifact_type="embedding/vector-list")
```

---

## 8. LLM Types

Shared types for LLM-related operations, used by both the extension and SDK.

```python
# nexus_sdk/types/llm.py

@dataclass
class ChatRequest:
    messages: list[ChatMessage]
    generation_params: GenerationParams
    stream: bool = True

@dataclass
class ChatMessage:
    role: str           # "system", "user", "assistant", "tool"
    content: str

@dataclass
class GenerationParams:
    temperature: float = 0.8
    top_p: float = 0.95
    top_k: int = 40
    max_tokens: int = 4096
    repeat_penalty: float = 1.1
    stop_sequences: list[str] | None = None

@dataclass
class ChatDelta:
    text: str
    finish_reason: str | None = None

@dataclass
class TokenUsage:
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int

@dataclass
class ChatComplete:
    message: ChatMessage
    finish_reason: str
    usage: TokenUsage
    generation_time_ms: int
```

---

## 9. Backward Compatibility

### Guarantee

Existing `BaseWorker` extensions continue to work without any changes. The SDK v2 additions are purely additive:

- `BaseWorker` class is unchanged
- `ExecutionContext` is unchanged (new methods are added, none removed)
- `protocol.py` types are unchanged
- New modules (`service_worker`, `process`, `streaming`, `health`, `artifacts`) are optional imports

### Migration path for existing workers

Extensions that want to adopt v2 features can:
1. Change `BaseWorker` -> `ServiceWorker` in their import
2. Add lifecycle hooks as needed
3. Use `ManagedProcess` for subprocess management
4. Use `StreamingExecution` for token streaming
5. All changes are incremental — no big-bang migration required

---

## 10. Protocol Extensions

New notification methods added to the worker protocol:

| Method | Direction | Purpose |
|--------|-----------|---------|
| `stream_event` | Worker -> Host | Token delta, stream complete, stream error |
| `health_report` | Worker -> Host | Structured health payload (replaces boolean) |
| `backend_state` | Worker -> Host | Backend process state change notification |

These are notifications (no `id` field, no response expected). The host accepts them alongside existing `progress` and `log` notifications.
