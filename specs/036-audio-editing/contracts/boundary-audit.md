# Boundary Audit Contract — Spec 036

Spec 036 lands entirely under `extensions/builtin/emotion-tts/`. The existing
boundary audit script
`extensions/builtin/emotion-tts/scripts/audit-boundary.sh` (and the equivalent
PowerShell variant on Windows) MUST PASS unchanged after this spec lands.

## Required additions to the audit

The audit script's literal-search list MUST include each of the new identifiers,
guarded so a host-tree match is a hard failure:

```text
ext_emotion_tts__audio_edit_log
audio.edit
audio.edit.preview
```

The script greps `crates/`, `apps/web/src/` (excluding the generic
`apps/web/src/views/extensions/` rendering surface), and the host's root
`migrations/` folder for these literals. A match in any of those locations is a
merge blocker per Constitution XIII.

## Rust-side boundary test

`extensions/builtin/emotion-tts/rust/tests/boundary_test.rs` MUST gain three
assertions:

1. The string `ext_emotion_tts__audio_edit_log` does NOT appear in any file under
   `crates/` (uses the existing `assert_no_host_references` helper).
2. The new RPC method names (`audio.edit`, `audio.edit.preview`) do NOT appear in
   any host file.
3. The new HTTP route segments (`/voice-assets/.../edit`, `/audit/...`) are
   declared only in the extension's `router::voice_assets`, `router::runs`, and
   `router::audit` modules — NOT in any host crate.

The test continues to use the established `assert_no_host_references` shape;
adding new strings to its constants list is a one-line change.

## CI gate

The boundary audit script runs in CI as the merge gate per Principle XIII.7.
Spec 036's PR description MUST link to a green run before merge.

## Out-of-scope items (not boundary concerns)

- Frontend bundle changes are extension-internal (the Vite build emits to
  `apps/web/public/extensions/nexus.audio.emotiontts/`). Host shell does not
  reference the new component files.
- Worker-side Python files are extension-internal by definition.
- New SQL migrations live in `extensions/builtin/emotion-tts/storage/migrations/`,
  not in the host's `migrations/` folder.
