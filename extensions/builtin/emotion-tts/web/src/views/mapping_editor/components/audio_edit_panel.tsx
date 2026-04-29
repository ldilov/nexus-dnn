/**
 * Spec 036 / US1 — voice-asset audio-edit panel.
 *
 * Owns the in-progress edit chain (draft state) and the three actions:
 *   * Preview — renders the chain to a temp file and plays it inline
 *   * Apply   — persists the chain (rebuilding the derived artifact)
 *   * Reset   — discards the draft, reverting to the persisted chain
 *
 * Persisted state arrives via `voiceAsset` (the parent owns SWR / loader
 * revalidation). On Apply success the parent is notified via
 * `onChainPersisted`; on any backend or validation error the parent is
 * notified via `onError`. The inline error block renders the same message
 * locally (FR-025), with `role="alert"` for screen readers.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VoiceAsset } from "../../../services/voice_assets_client";
import {
  applyVoiceAssetEdit,
  fetchAuditLog,
  newOperationId,
  previewVoiceAssetEdit,
  StaleDigestError,
  validateChain,
} from "../../../services/audio_edit_client";
import type {
  ApplyEditResponse,
  AuditEntry,
  EditChain,
  EditOp,
  NormalizeOp,
  TrimOp,
} from "../../../services/audio_edit_client";
import { AuditHistoryPanel } from "./audit_history_panel";
import { EditChainList } from "./edit_chain_list";
import { WaveformCanvas } from "./waveform_canvas";
import * as css from "./audio_edit_panel.css";

interface RemovalStackEntry {
  op: EditOp;
  index: number;
}

export interface AudioEditPanelProps {
  voiceAsset: VoiceAsset;
  deploymentId: string;
  onChainPersisted: (response: ApplyEditResponse) => void;
  onError: (message: string) => void;
}

const DEFAULT_LUFS = -16.0;

export function AudioEditPanel(props: AudioEditPanelProps): JSX.Element {
  const { voiceAsset, deploymentId, onChainPersisted, onError } = props;
  const sourceDurationMs = voiceAsset.durationMs ?? 0;
  const audioUrl = useMemo(
    () => artifactUrl(voiceAsset.audioArtifactRef),
    [voiceAsset.audioArtifactRef],
  );

  const [chain, setChain] = useState<EditChain>(() => initialChainFor(sourceDurationMs));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [applyInFlight, setApplyInFlight] = useState(false);
  const [previewInFlight, setPreviewInFlight] = useState(false);
  const [hasPreviewedAtLeastOnce, setHasPreviewedAtLeastOnce] = useState(false);
  const [measuredLufs, setMeasuredLufs] = useState<number | null>(null);
  const [removalStack, setRemovalStack] = useState<RemovalStackEntry[]>([]);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditRefreshKey, setAuditRefreshKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const normalizeOn = useMemo(
    () => chain.ops.some((op) => op.mode === "normalize"),
    [chain.ops],
  );

  useEffect(() => {
    setChain(initialChainFor(sourceDurationMs));
    setValidationError(null);
    setHasPreviewedAtLeastOnce(false);
    setRemovalStack([]);
  }, [voiceAsset.voiceAssetId, sourceDurationMs]);

  useEffect(() => {
    let cancelled = false;
    setAuditLoading(true);
    setAuditError(null);
    fetchAuditLog(deploymentId, "voice_asset", voiceAsset.voiceAssetId, 50)
      .then((response) => {
        if (cancelled) return;
        setAuditEntries(response.entries);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "audit fetch failed";
        setAuditError(message);
      })
      .finally(() => {
        if (cancelled) return;
        setAuditLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId, voiceAsset.voiceAssetId, auditRefreshKey]);

  useEffect(() => {
    return () => {
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    };
  }, [previewObjectUrl]);

  const trim = chain.ops.find((op): op is TrimOp => op.mode === "trim");
  const normalize = chain.ops.find((op): op is NormalizeOp => op.mode === "normalize");
  const startMs = trim?.start_ms ?? 0;
  const endMs = trim?.end_ms ?? Math.max(1, sourceDurationMs);

  const updateTrim = useCallback((nextStart: number, nextEnd: number) => {
    setChain((prev) => updateOp(prev, "trim", (op) => ({
      ...op,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(nextStart)),
      end_ms: Math.max(Math.floor(nextStart) + 1, Math.floor(nextEnd)),
    } as TrimOp)));
  }, []);

  const onChangeStart = useCallback(
    (ms: number) => updateTrim(ms, endMs),
    [endMs, updateTrim],
  );
  const onChangeEnd = useCallback(
    (ms: number) => updateTrim(startMs, ms),
    [startMs, updateTrim],
  );

  const toggleNormalize = useCallback(
    (next: boolean) => {
      setChain((prev) => {
        const withoutNormalize: EditOp[] = prev.ops.filter((op) => op.mode !== "normalize");
        if (next) {
          const normalizeOp: NormalizeOp = {
            id: newOperationId(),
            mode: "normalize",
            target_lufs: DEFAULT_LUFS,
          };
          return { ...prev, ops: [...withoutNormalize, normalizeOp] };
        }
        return { ...prev, ops: withoutNormalize };
      });
    },
    [],
  );

  const removeOp = useCallback((opId: string) => {
    const idx = chain.ops.findIndex((op) => op.id === opId);
    if (idx === -1) return;
    const removed = chain.ops[idx];
    if (!removed) return;
    const nextOps = [...chain.ops.slice(0, idx), ...chain.ops.slice(idx + 1)];
    setChain({ ...chain, ops: nextOps });
    setRemovalStack((stackPrev) => [...stackPrev, { op: removed, index: idx }]);
  }, [chain]);

  const undoLastRemoval = useCallback(() => {
    const entry = removalStack[removalStack.length - 1];
    if (!entry) return;
    const insertAt = Math.min(entry.index, chain.ops.length);
    const nextOps = [
      ...chain.ops.slice(0, insertAt),
      entry.op,
      ...chain.ops.slice(insertAt),
    ];
    setChain({ ...chain, ops: nextOps });
    setRemovalStack(removalStack.slice(0, -1));
  }, [chain, removalStack]);

  const validateLocal = useCallback((): boolean => {
    const err = validateChain(chain, sourceDurationMs);
    if (err) {
      setValidationError(err.message);
      return false;
    }
    setValidationError(null);
    return true;
  }, [chain, sourceDurationMs]);

  const handlePreview = useCallback(async () => {
    if (!validateLocal()) return;
    setPreviewInFlight(true);
    try {
      const blob = await previewVoiceAssetEdit(voiceAsset.voiceAssetId, deploymentId, chain);
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
      const url = URL.createObjectURL(blob);
      setPreviewObjectUrl(url);
      setHasPreviewedAtLeastOnce(true);
      requestAnimationFrame(() => audioRef.current?.play().catch(() => undefined));
    } catch (err) {
      const message = err instanceof Error ? err.message : "preview failed";
      setValidationError(message);
      onError(message);
    } finally {
      setPreviewInFlight(false);
    }
  }, [validateLocal, voiceAsset.voiceAssetId, deploymentId, chain, previewObjectUrl, onError]);

  const handleApply = useCallback(async () => {
    if (!validateLocal()) return;
    setApplyInFlight(true);
    try {
      const response = await applyVoiceAssetEdit(voiceAsset.voiceAssetId, deploymentId, {
        chain,
      });
      setValidationError(null);
      setMeasuredLufs(response.measured_lufs ?? null);
      setRemovalStack([]);
      onChainPersisted(response);
      setAuditRefreshKey((prev) => prev + 1);
    } catch (err) {
      const message =
        err instanceof StaleDigestError
          ? "Edit chain has changed in another tab. Reload to continue."
          : err instanceof Error
            ? err.message
            : "apply failed";
      setValidationError(message);
      onError(message);
    } finally {
      setApplyInFlight(false);
    }
  }, [validateLocal, voiceAsset.voiceAssetId, deploymentId, chain, onChainPersisted, onError]);

  const handleReset = useCallback(() => {
    setChain(initialChainFor(sourceDurationMs));
    setValidationError(null);
    setMeasuredLufs(null);
    setHasPreviewedAtLeastOnce(false);
    setRemovalStack([]);
    setAuditRefreshKey((prev) => prev + 1);
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      setPreviewObjectUrl(null);
    }
  }, [sourceDurationMs, previewObjectUrl]);

  const onLufsChange = useCallback((value: number) => {
    setChain((prev) => updateOp(prev, "normalize", (op) => ({
      ...op,
      mode: "normalize",
      target_lufs: value,
    } as NormalizeOp)));
  }, []);

  return (
    <div className={css.root}>
      <header className={css.header}>
        <h3 className={css.title}>Edit · {voiceAsset.displayName}</h3>
        <span className={css.sourceMeta}>
          Source · {formatMs(sourceDurationMs)}
        </span>
      </header>

      <WaveformCanvas
        audioUrl={audioUrl}
        durationMs={Math.max(1, sourceDurationMs)}
        startMs={startMs}
        endMs={endMs}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />

      <div className={css.labelRow}>
        <span>Trim region</span>
        <span className={css.numericLabel}>
          {formatMs(startMs)} → {formatMs(endMs)} · {formatMs(endMs - startMs)}
        </span>
      </div>

      <div className={css.controls}>
        <div className={css.controlBlock}>
          <span className={css.labelRow}>
            <span>Normalize loudness</span>
            {normalizeOn && normalize && (
              <span className={css.lufsLabel}>
                target {normalize.target_lufs.toFixed(1)} LUFS
                {measuredLufs !== null && ` · measured ${measuredLufs.toFixed(1)}`}
              </span>
            )}
          </span>
          <label className={css.toggleRow}>
            <input
              type="checkbox"
              checked={normalizeOn}
              onChange={(e) => toggleNormalize(e.currentTarget.checked)}
              aria-label="Toggle loudness normalization"
            />
            <span>Target {DEFAULT_LUFS.toFixed(0)} LUFS (broadcast-friendly)</span>
          </label>
          {normalizeOn && normalize && (
            <input
              type="range"
              className={css.slider}
              min={-30}
              max={-6}
              step={0.5}
              value={normalize.target_lufs}
              onChange={(e) => onLufsChange(Number(e.currentTarget.value))}
              aria-label="Target LUFS"
            />
          )}
        </div>

        <div className={css.controlBlock}>
          <span className={css.labelRow}>Operations · {chain.ops.length}</span>
          <EditChainList chain={chain} onRemoveOp={removeOp} />
        </div>
      </div>

      <div className={css.buttonRow}>
        <button
          type="button"
          className={css.previewButton}
          onClick={() => void handlePreview()}
          disabled={previewInFlight || applyInFlight}
        >
          {previewInFlight ? "Rendering preview…" : "Preview"}
        </button>
        <button
          type="button"
          className={css.applyButton}
          onClick={() => void handleApply()}
          disabled={applyInFlight || previewInFlight}
        >
          {applyInFlight ? "Applying…" : "Apply"}
        </button>
        <button
          type="button"
          className={css.resetButton}
          onClick={handleReset}
          disabled={applyInFlight || previewInFlight}
        >
          Reset
        </button>
        {removalStack.length > 0 && (
          <button
            type="button"
            className={css.undoButton}
            onClick={undoLastRemoval}
            disabled={applyInFlight || previewInFlight}
            data-testid="undo-last-removal"
            aria-label="Undo last removal"
          >
            Undo last removal ({removalStack.length})
          </button>
        )}
        {hasPreviewedAtLeastOnce && (
          <span
            className={css.previewHint}
            data-testid="preview-consumed-hint"
            role="note"
            aria-live="polite"
          >
            Preview again after edits to verify before applying
          </span>
        )}
      </div>

      {previewObjectUrl && (
        <audio
          ref={audioRef}
          src={previewObjectUrl}
          controls
          className={css.audioPlayer}
          aria-label="Edit preview"
        />
      )}

      {validationError && (
        <div className={css.errorBanner} role="alert" aria-live="polite">
          {validationError}
        </div>
      )}

      <details className={css.auditSection}>
        <summary className={css.auditSummary}>
          Edit history{auditEntries.length > 0 ? ` · ${auditEntries.length}` : ""}
        </summary>
        <AuditHistoryPanel
          entries={auditEntries}
          loading={auditLoading}
          error={auditError}
        />
      </details>
    </div>
  );
}

function initialChainFor(sourceDurationMs: number): EditChain {
  if (sourceDurationMs <= 0) {
    return { version: 1, ops: [] };
  }
  const trim: TrimOp = {
    id: newOperationId(),
    mode: "trim",
    start_ms: 0,
    end_ms: sourceDurationMs,
  };
  return { version: 1, ops: [trim] };
}

function updateOp<TMode extends EditOp["mode"]>(
  chain: EditChain,
  mode: TMode,
  updater: (op: Extract<EditOp, { mode: TMode }>) => EditOp,
): EditChain {
  const idx = chain.ops.findIndex((op) => op.mode === mode);
  if (idx === -1) {
    const seed = { id: newOperationId(), mode } as Extract<EditOp, { mode: TMode }>;
    return { ...chain, ops: [...chain.ops, updater(seed)] };
  }
  const next = [...chain.ops];
  next[idx] = updater(next[idx] as Extract<EditOp, { mode: TMode }>);
  return { ...chain, ops: next };
}

function formatMs(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0.0s";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  const seconds = Math.round(ms / 100) / 10;
  return `${seconds.toFixed(1)}s`;
}

function artifactUrl(ref: string): string {
  if (ref.startsWith("http://") || ref.startsWith("https://") || ref.startsWith("/")) {
    return ref;
  }
  return `/api/v1/artifacts/${encodeURIComponent(ref)}`;
}
