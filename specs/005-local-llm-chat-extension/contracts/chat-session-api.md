# Contract: Chat Session & Thread API

**Spec**: 005
**Version**: 0.1.0

---

## 1. Overview

The Chat Session API provides REST endpoints for managing interactive chat sessions, threads, and messages. All state is persisted through spec-004 storage contributions. The UI communicates only with these host APIs — never directly with backend runtimes.

---

## 2. Thread Endpoints

### Create Thread

```
POST /local-llm/threads
Content-Type: application/json

{
  "title": "My conversation",        // optional, auto-generated if omitted
  "system_prompt": "You are a helpful assistant."  // optional
}

Response 201:
{
  "data": {
    "id": "thr_abc123",
    "title": "My conversation",
    "system_prompt": "You are a helpful assistant.",
    "message_count": 0,
    "created_at": "2026-04-13T12:00:00Z",
    "updated_at": "2026-04-13T12:00:00Z",
    "archived_at": null
  }
}
```

### List Threads

```
GET /local-llm/threads?archived=false&limit=50&offset=0

Response 200:
{
  "data": [ ... ],
  "pagination": { "total": 12, "limit": 50, "offset": 0 }
}
```

### Get Thread with Messages

```
GET /local-llm/threads/:id?include_messages=true&message_limit=100

Response 200:
{
  "data": {
    "id": "thr_abc123",
    "title": "My conversation",
    "system_prompt": "...",
    "message_count": 5,
    "messages": [
      {
        "id": "msg_001",
        "ordinal": 1,
        "role": "user",
        "content_text": "Hello",
        "metadata_json": null,
        "retry_of_message_id": null,
        "is_partial": false,
        "created_at": "2026-04-13T12:01:00Z"
      },
      {
        "id": "msg_002",
        "ordinal": 2,
        "role": "assistant",
        "content_text": "Hi! How can I help?",
        "metadata_json": "{\"model\":\"qwen2.5-7b\",\"tokens\":{\"prompt\":12,\"completion\":8}}",
        "retry_of_message_id": null,
        "is_partial": false,
        "created_at": "2026-04-13T12:01:05Z"
      }
    ],
    "created_at": "...",
    "updated_at": "..."
  }
}
```

### Archive Thread

```
PUT /local-llm/threads/:id/archive

Response 200:
{
  "data": { "id": "thr_abc123", "archived_at": "2026-04-13T13:00:00Z" }
}
```

---

## 3. Session Endpoints

### Create Session

```
POST /local-llm/sessions
Content-Type: application/json

{
  "thread_id": "thr_abc123",           // required: existing thread
  "backend_profile_id": "prof_xyz",    // required: existing profile
  "generation_overrides": {            // optional
    "temperature": 0.7,
    "max_tokens": 2048
  },
  "corpus_ids": ["corpus_001"]         // optional: for RAG
}

Response 201:
{
  "data": {
    "id": "ses_def456",
    "thread_id": "thr_abc123",
    "backend_profile_id": "prof_xyz",
    "model_install_id": "mod_ghi789",
    "state": "created",
    "generation_overrides": { "temperature": 0.7, "max_tokens": 2048 },
    "attached_corpus_ids": ["corpus_001"],
    "created_at": "...",
    "updated_at": "..."
  }
}
```

### List Sessions

```
GET /local-llm/sessions?state=ready&limit=20

Response 200:
{
  "data": [ ... ],
  "pagination": { ... }
}
```

### Get Session

```
GET /local-llm/sessions/:id

Response 200:
{
  "data": {
    "id": "ses_def456",
    "thread_id": "thr_abc123",
    "backend_profile_id": "prof_xyz",
    "model_install_id": "mod_ghi789",
    "state": "ready",
    "last_metrics_snapshot": {
      "prompt_tokens_per_second": 1450.2,
      "generated_tokens_per_second": 72.1,
      "kv_cache_usage_ratio": 0.42
    },
    "last_error": null,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

---

## 4. Chat Turn Endpoints

### Send Message (with streaming)

```
POST /local-llm/sessions/:id/messages
Content-Type: application/json

{
  "role": "user",
  "content_text": "Explain quantum computing in simple terms."
}

Response 202:
{
  "data": {
    "user_message_id": "msg_003",
    "assistant_message_id": "msg_004",
    "stream_id": "stream_xyz"
  }
}
```

The response is immediate. The assistant message is created with `is_partial: true`. Token deltas arrive via WebSocket events:

```json
{"type": "chat.stream.delta", "data": {"session_id": "ses_def456", "message_id": "msg_004", "delta_text": "Quantum", "stream_id": "stream_xyz"}}
{"type": "chat.stream.delta", "data": {"session_id": "ses_def456", "message_id": "msg_004", "delta_text": " computing", "stream_id": "stream_xyz"}}
...
{"type": "chat.stream.complete", "data": {"session_id": "ses_def456", "message_id": "msg_004", "finish_reason": "stop", "usage": {"prompt_tokens": 24, "completion_tokens": 156, "total_tokens": 180}, "generation_time_ms": 2150}}
```

### Stop Generation

```
POST /local-llm/sessions/:id/stop

Response 200:
{
  "data": {
    "message_id": "msg_004",
    "is_partial": true,
    "tokens_generated": 82
  }
}
```

### Retry Message

```
POST /local-llm/sessions/:id/retry
Content-Type: application/json

{
  "message_id": "msg_004"    // the message to retry (regenerate)
}

Response 202:
{
  "data": {
    "original_message_id": "msg_004",
    "new_message_id": "msg_005",
    "stream_id": "stream_abc"
  }
}
```

The new message (`msg_005`) has `retry_of_message_id` set to `msg_004`. Both messages remain in the thread.

---

## 5. Backend Profile Endpoints

### Create Profile

```
POST /local-llm/profiles
Content-Type: application/json

{
  "name": "My Local Chat",
  "backend_family": "llamacpp",
  "runtime_mode": "native",
  "runtime_install_id": "ri_001",
  "model_install_id": "mod_001",
  "generation_defaults": {
    "temperature": 0.8,
    "max_tokens": 4096
  }
}

Response 201:
{
  "data": { "id": "prof_xyz", "state": "created", ... }
}
```

### List Profiles

```
GET /local-llm/profiles

Response 200:
{
  "data": [ ... ]
}
```

### Start Profile Backend

```
POST /local-llm/profiles/:id/start

Response 202:
{
  "data": { "id": "prof_xyz", "state": "starting" }
}
```

Backend state changes arrive as WebSocket events (`backend.state.changed`).

### Stop Profile Backend

```
POST /local-llm/profiles/:id/stop

Response 200:
{
  "data": { "id": "prof_xyz", "state": "stopped" }
}
```

---

## 6. Model Endpoints

### List Local Models

```
GET /local-llm/models?state=ready

Response 200:
{
  "data": [
    {
      "id": "mod_001",
      "display_name": "Qwen2.5 7B Instruct Q4_K_M",
      "repo_id": "Qwen/Qwen2.5-7B-Instruct-GGUF",
      "backend_tags": ["gguf", "llamacpp", "q4_k_m"],
      "size_bytes": 4368438272,
      "state": "ready",
      "last_used_at": "2026-04-13T12:00:00Z"
    }
  ]
}
```

### Search Hugging Face

```
GET /local-llm/models/search?query=qwen2.5+gguf&backend=llamacpp&limit=20

Response 200:
{
  "data": [
    {
      "repo_id": "Qwen/Qwen2.5-7B-Instruct-GGUF",
      "display_name": "Qwen2.5-7B-Instruct-GGUF",
      "summary": "...",
      "downloads": 125000,
      "compatibility_hints": ["gguf-compatible", "single-file install"],
      "installed": false
    }
  ]
}
```

### Inspect Repo Files

```
GET /local-llm/models/inspect?repo_id=Qwen/Qwen2.5-7B-Instruct-GGUF

Response 200:
{
  "data": {
    "repo_id": "Qwen/Qwen2.5-7B-Instruct-GGUF",
    "files": [
      {
        "filename": "qwen2.5-7b-instruct-q4_k_m.gguf",
        "size_bytes": 4368438272,
        "is_gguf": true,
        "quantization_hint": "Q4_K_M"
      },
      {
        "filename": "qwen2.5-7b-instruct-q8_0.gguf",
        "size_bytes": 8012345678,
        "is_gguf": true,
        "quantization_hint": "Q8_0"
      }
    ]
  }
}
```

### Download Model

```
POST /local-llm/models/download
Content-Type: application/json

{
  "repo_id": "Qwen/Qwen2.5-7B-Instruct-GGUF",
  "files": ["qwen2.5-7b-instruct-q4_k_m.gguf"],
  "backend_target": "llamacpp"
}

Response 202:
{
  "data": {
    "task_id": "dl_001",
    "status": "queued"
  }
}
```

Download progress arrives as WebSocket events (`model.download.progress`).

---

## 7. WebSocket Event Types

All events are emitted on the existing host WebSocket event stream.

| Event Type | Description |
|------------|-------------|
| `chat.stream.delta` | Token delta during streaming generation |
| `chat.stream.complete` | Generation finished (includes usage, timing) |
| `chat.stream.error` | Generation failed mid-stream |
| `session.state.changed` | Chat session state transition |
| `backend.state.changed` | Backend profile state transition |
| `backend.health.changed` | Backend health status change |
| `backend.metrics.updated` | New metrics snapshot available |
| `backend.install.progress` | Runtime installation progress |
| `model.download.progress` | Model download progress update |
| `model.download.complete` | Model download finished |
| `model.download.failed` | Model download failed |
