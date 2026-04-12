# Example: Chat and llama.cpp Extension with Namespaced Storage

## 1. Why this example matters

This is the clearest motivating case for schema contributions.

A chat-oriented local LLM extension may contribute:

- operators
- recipes
- a chat-history projection in the UI
- runtime adapter integration for llama.cpp or another backend
- relational state for threads, messages, and session metadata

## 2. Extension responsibilities

### Contributed operators

- `llm.chat.generate`
- `chat.thread.create`
- `chat.message.append`
- `chat.message.list`
- `chat.attachment.link`

### Contributed recipe

- `recipe.chat.local.basic`

### Optional UI contribution

- chat history projection
- model selector widget
- thread sidebar widget

### Runtime family

- `native` for llama.cpp adapter, or
- `external_service` for a local server adapter

## 3. Why SQL tables fit this extension

Artifacts alone are not enough for:

- fast thread listing
- ordering messages inside threads
- storing message roles and statuses
- tracking model profiles per thread
- storing lightweight retrieval metadata

A normalized relational model is a good fit.

## 4. Suggested namespace objects

### Tables

- `{{prefix}}threads`
- `{{prefix}}messages`
- `{{prefix}}message_attachments`
- `{{prefix}}thread_model_profiles`

### Indexes

- `{{prefix}}idx_threads_updated_at`
- `{{prefix}}idx_messages_thread_created_at`
- `{{prefix}}idx_attachments_message_id`

## 5. Suggested schema sketch

### `{{prefix}}threads`

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | thread id |
| `title` | TEXT | user-visible title |
| `created_at` | TEXT | iso timestamp |
| `updated_at` | TEXT | iso timestamp |
| `archived` | INTEGER | 0 or 1 |
| `metadata_json` | TEXT | small JSON metadata |

### `{{prefix}}messages`

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | message id |
| `thread_id` | TEXT NOT NULL | FK to threads.id |
| `role` | TEXT NOT NULL | `system`, `user`, `assistant`, `tool` |
| `content_artifact_id` | TEXT | host artifact id for large transcript body |
| `content_text_inline` | TEXT | optional short inline body |
| `status` | TEXT NOT NULL | `pending`, `completed`, `failed` |
| `run_id` | TEXT | logical reference to producing run |
| `created_at` | TEXT | iso timestamp |
| `metadata_json` | TEXT | small JSON metadata |

### `{{prefix}}message_attachments`

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | row id |
| `message_id` | TEXT NOT NULL | FK to messages.id |
| `artifact_id` | TEXT NOT NULL | host artifact id |
| `kind` | TEXT NOT NULL | `image`, `audio`, `document`, `other` |
| `created_at` | TEXT | iso timestamp |

### `{{prefix}}thread_model_profiles`

| column | type | notes |
|---|---|---|
| `thread_id` | TEXT PK | FK to threads.id |
| `backend_kind` | TEXT NOT NULL | `llama_cpp`, `external_service` |
| `model_id` | TEXT NOT NULL | model identifier |
| `temperature` | REAL | generation config |
| `context_window` | INTEGER | generation config |
| `updated_at` | TEXT | iso timestamp |

## 6. Recommended execution shape

For chat, keep the workflow canonical and let chat UI be a projection.

Recommended runtime flow:

1. user sends a chat message
2. UI creates a run using `recipe.chat.local.basic`
3. host resolves workflow inputs
4. host executes `llm.chat.generate`
5. extension logic stores thread/message rows through host-approved access paths later
6. run produces transcript artifacts and typed outputs
7. chat UI renders the thread using thread/message records plus artifacts

## 7. Why this design stays aligned with Nexus

- workflow remains canonical
- chat UI is a projection
- host remains authoritative
- the extension gains relational state without database ownership

## 8. Worked manifest and migrations

See:

- `examples/chat-llama/manifest.yaml`
- `examples/chat-llama/storage/migrations/001_init.sql`
- `examples/chat-llama/storage/migrations/002_indexes.sql`
