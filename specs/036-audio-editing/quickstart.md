# Quickstart — EmotionTTS Audio Editing

End-to-end walkthrough for verifying the feature is wired correctly. Run after
`/speckit.implement` lands the tasks.

## Prerequisites

- EmotionTTS extension activated and a deployment created.
- Worker venv installed (Spec 035 dep installer green).
- A voice asset uploaded to the deployment (use the Recipe page).
- Run from a clean `main` checkout merged with branch `036-audio-editing`.

## 1. Backend smoke (Rust)

```powershell
cargo test -p emotion-tts-extension --tests audio_edit
cargo test -p emotion-tts-extension --test http_contract_audio_edit_test
cargo test -p emotion-tts-extension --test boundary_test
```

Expected: all green. Boundary test asserts zero host-tree references to the
new literals.

## 2. Worker smoke (Python)

```powershell
cd extensions/builtin/emotion-tts/worker
uv run pytest tests/test_audio_edit_trim_accuracy.py tests/test_audio_edit_speed_pitch.py tests/test_audio_edit_normalize_lufs.py
```

Expected: trim within 1 ms, pitch within ±5 cents, LUFS within ±0.5 LU of target.

## 3. End-to-end UI flow

1. Open the host UI → Deployments → select the deployment → Mappings tab.
2. Click an existing voice asset in the sidebar.
3. The new **Edit** panel appears. Drag the start handle to ~4.0 s and the end
   handle to ~52.0 s on the waveform.
4. Toggle **Normalize loudness** (target -16 LUFS, the default).
5. Click **Preview** — audio plays in-browser. Adjust handles, click Preview
   again — confirm the previous preview is discarded (no temp file accumulation).
6. Click **Apply**. The chain panel lists two ops: `trim`, then `normalize`.
   The waveform redraws with dimmed regions outside the trim window.
7. Open the **History** panel — one audit entry: `digest_before = EMPTY`,
   `digest_after = <hash>`, `operation_count = 2`.
8. Click **Remove** on the `normalize` op — the waveform redraws (loudness
   indicator updates), and a second audit entry appears.

## 4. Cache invalidation verification (SC-003)

1. Run a synthesis using the edited voice asset.
2. Note the cache row count for the new `chain_digest`:

   ```sql
   SELECT COUNT(*) FROM ext_emotion_tts__synthesis_cache WHERE chain_digest = '<hash>';
   ```

3. Apply a new edit (e.g. add `fade_in 200ms`). Re-run the synthesis.
4. Confirm a fresh row was added; the old `chain_digest` row is unchanged.

## 5. Cache restoration on chain clear (SC-004)

1. With the asset in its edited state, run synthesis once → cache row created.
2. Click **Clear edits** in the editor. The audit log records the clear with
   `digest_after = EMPTY`, `operation_count = 0`.
3. Re-run synthesis → it now hits the original (`EMPTY`-digest) cache row.

## 6. Per-utterance edit flow (US2)

1. Open Run Detail for a recent run with ≥ 3 segments.
2. Hover one segment → click **Edit**. Inline editor appears for that segment.
3. Apply a head-trim of 200 ms. Click **Apply**.
4. Confirm the export ZIP rebuild button is now active. Click it. Download.
5. Open the ZIP — the edited segment matches the expected trimmed output.

## 7. Boundary audit (Constitution XIII)

```powershell
cd extensions/builtin/emotion-tts
./scripts/audit-boundary.sh
```

Expected output: `PASS — no host-tree references to extension literals`.

## 8. Cleanup

Edits persist across host restarts. To reset the example asset:

```powershell
curl -X DELETE "http://localhost:PORT/api/v1/extensions/nexus.audio.emotiontts/voice-assets/<id>/edit?deploymentId=<dep-id>"
```

Or click **Clear edits** in the UI.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Apply hangs > 30 s | Worker queue contention with active synth | Wait — UI shows "queued — N seconds" |
| Preview plays the original audio | Browser cached the response | Hard reload the editor; preview endpoint sets `Cache-Control: no-store` |
| Boundary audit fails | New code accidentally landed in `crates/` | `git diff main..HEAD -- crates/` and move offending changes under `extensions/builtin/emotion-tts/` |
| `400 stale_digest` on Apply | Concurrent edit in another tab | Reload the editor; the chain panel refreshes from the persisted state |
