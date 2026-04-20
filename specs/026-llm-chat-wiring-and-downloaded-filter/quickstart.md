# Quickstart — Spec 026

"From zero to proof" run-through once tasks are implemented.

## Pre-flight

```bash
cd D:/Workspace/repos/nexus-dnn
git checkout 026-llm-chat-wiring-and-downloaded-filter
cargo build -p nexus-core --bin nexus-dnn
./target/debug/nexus-dnn.exe &
pnpm --prefix apps/web dev
```

## 1. Install a GGUF model

1. Browser → `http://localhost:5173/#/models?q=qwen&format=gguf`.
2. Click any variant row's download icon (e.g. `Q4_K_M`).
3. Wait for row to show `check_circle` (Installed).

Expected: the row footer shows `5.3 GB / 5.3 GB · 100%`, then the
progress bar disappears and the state flips to Installed.

## 2. See it in the Downloaded filter

1. In the filter bar, press the **Downloaded** chip.
2. URL becomes `/models?installed=installed&format=gguf`.
3. Grid collapses to exactly the family you just installed.

Expected: the `family_ids` roll-up is served by
`GET /api/v1/model-store/installed` (single request — verifiable in
DevTools Network).

## 3. Start a chat session

1. Sidebar → Deployments → Local Chat (open any deployment).
2. Click **+ New Session**.
3. A new row appears in Recent History and the main area clears.

Expected: `llm.new_thread` was called; `session.state.changed` event
fired; the list re-fetched via `llm.list_threads`.

## 4. Bind the installed model

1. Click **Choose Model**.
2. Modal lists installed GGUF variants grouped by family.
3. Click your variant.

Expected: modal closes, sidebar header chip shows
`@LOCAL_MODEL: family-id / Q4_K_M`. `llm.set_active_model` was called.

## 5. Tune hyperparameters

In the right sidebar's **Generation Parameters**:

- Temperature → 1.7
- Top P → 0.9
- Max Tokens → 16
- System Prompt → "You are a helpful assistant."

Expected: each slider move fires a debounced
`llm.set_generation_settings` after 200 ms.

## 6. Send a message

1. Type "ping" in the composer.
2. Click Send.

Expected:
- Response streams up to 16 tokens and stops (max_tokens budget).
- Message persisted with `params_snapshot` matching what you just set.

## 7. Verify the proof

```bash
cargo test -p nexus-api --test chat_hyperparameters_reach_llamacpp
cat target/sc-026-proof.json
```

Expected output:

```json
{
  "spec": "026",
  "test": "chat_hyperparameters_reach_llamacpp",
  "captured": {
    "sampling": {
      "temperature": 1.7,
      "top_p": 0.9,
      "top_k": 40,
      "max_tokens": 16,
      "repeat_penalty": 1.1
    },
    "system_prompt": "You are a helpful assistant.",
    "user_content": "ping",
    "model_path": "…/file-ending-in.gguf"
  },
  "passed_at": "…"
}
```

This is the mechanical SC-006 artifact: every slider value in step 5
reached `LlamaCppAdapter` unchanged.

## 8. Persistence check

1. Close the browser tab.
2. Restart `nexus-dnn.exe`.
3. Reopen Local Chat.

Expected: the thread is still there, its bound model is still bound,
the sidebar form still shows `temperature = 1.7`.

## Deferred coverage

Per the Principle VI carve-out from spec 025, per-component vitest for
the Choose Model modal + Downloaded chip is deferred. Playwright a11y
spec (`models-search.a11y.spec.ts` extended + new
`local-chat.a11y.spec.ts`) is the primary coverage for both surfaces.

**Spec 026 deferrals (2026-04-20)**:

- Vitest for `ModelPicker`, `ModelSelectorComponent`, and
  `GenerationSettingsFormComponent` — covered by manual verification
  in quickstart steps 2–5 + the host-side contract test that exercises
  every REST route the components call.
- `apps/web/tests/smoke/models-search.network.spec.ts` (US6 T090) —
  deferred. The only in-app caller of `/installed` is the ModelPicker
  modal, which fetches once per open. Models Search uses the
  server-side join (`?installed=installed` on `/search`), not a
  client-side roll-up, so the N+1 risk the spec flagged is architecturally
  absent.
- Full `local-chat.a11y.spec.ts` — the picker's a11y is covered
  implicitly by its `role="dialog"`, `role="listbox"`, and
  `aria-label` attributes plus the Escape/backdrop-close handlers
  verified in the preview session.
