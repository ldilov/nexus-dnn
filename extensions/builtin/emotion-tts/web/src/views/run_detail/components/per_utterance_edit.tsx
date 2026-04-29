import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  applyUtteranceEdit,
  newOperationId,
  StaleDigestError,
  validateChain,
} from "../../../services/audio_edit_client";
import type {
  ApplyEditResponse,
  EditChain,
  EditOp,
  NormalizeOp,
  TrimOp,
} from "../../../services/audio_edit_client";
import type { UtteranceState } from "../../../services/types";
import { WaveformCanvas } from "../../mapping_editor/components/waveform_canvas";
import * as css from "./per_utterance_edit.css";

export interface PerUtteranceEditProps {
  deploymentId: string;
  runId: string;
  utterance: UtteranceState;
  audioUrl: string;
  onApplied: (response: ApplyEditResponse) => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

const DEFAULT_LUFS = -16.0;
const COMPACT_WAVEFORM_HEIGHT = 80;
const COMPACT_WAVEFORM_WIDTH = 720;

export function PerUtteranceEdit(props: PerUtteranceEditProps): JSX.Element {
  const { deploymentId, runId, utterance, audioUrl, onApplied, onError, onCancel } = props;
  const sourceDurationMs = utterance.durationMs ?? 0;

  const [chain, setChain] = useState<EditChain>(() => initialChainFor(sourceDurationMs));
  const [normalizeOn, setNormalizeOn] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [applyInFlight, setApplyInFlight] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const applyControllerRef = useRef<AbortController | null>(null);
  const persistedDigestRef = useRef<string | null>(null);

  useEffect(() => {
    setChain(initialChainFor(sourceDurationMs));
    setNormalizeOn(false);
    setValidationError(null);
    persistedDigestRef.current = null;
  }, [utterance.utteranceId, sourceDurationMs]);

  useEffect(() => {
    return () => applyControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    const focusable = rootRef.current?.querySelector<HTMLElement>(
      "button:not([disabled]), [tabindex='0']",
    );
    focusable?.focus();
  }, [utterance.utteranceId]);

  const handleRootKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
    },
    [onCancel],
  );

  const trim = useMemo(
    () => chain.ops.find((op): op is TrimOp => op.mode === "trim"),
    [chain.ops],
  );
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

  const onChangeStart = useCallback((ms: number) => updateTrim(ms, endMs), [endMs, updateTrim]);
  const onChangeEnd = useCallback((ms: number) => updateTrim(startMs, ms), [startMs, updateTrim]);

  const toggleNormalize = useCallback((next: boolean) => {
    setNormalizeOn(next);
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
  }, []);

  const handleApply = useCallback(async () => {
    const err = validateChain(chain, sourceDurationMs);
    if (err) {
      setValidationError(err.message);
      return;
    }
    setValidationError(null);
    if (applyInFlight) return;
    applyControllerRef.current?.abort();
    const controller = new AbortController();
    applyControllerRef.current = controller;
    setApplyInFlight(true);
    try {
      const digestBefore = persistedDigestRef.current ?? undefined;
      const response = await applyUtteranceEdit(
        deploymentId,
        runId,
        utterance.utteranceId,
        digestBefore ? { chain, digest_before: digestBefore } : { chain },
        { signal: controller.signal },
      );
      if (controller.signal.aborted) return;
      persistedDigestRef.current = response.chain_digest;
      onApplied(response);
    } catch (caught) {
      if (controller.signal.aborted) return;
      if (caught instanceof StaleDigestError) {
        persistedDigestRef.current = caught.currentDigest || null;
      }
      const message =
        caught instanceof StaleDigestError
          ? "Edit chain has changed in another tab. Reload to continue."
          : caught instanceof Error
            ? caught.message
            : "apply failed";
      setValidationError(message);
      onError(message);
    } finally {
      if (!controller.signal.aborted) setApplyInFlight(false);
    }
  }, [chain, sourceDurationMs, applyInFlight, deploymentId, runId, utterance.utteranceId, onApplied, onError]);

  return (
    <div className={css.root} ref={rootRef} onKeyDown={handleRootKeyDown}>
      <header className={css.header}>
        <h4 className={css.title}>Edit segment</h4>
        <span className={css.sourceMeta}>Source · {formatMs(sourceDurationMs)}</span>
      </header>

      <WaveformCanvas
        audioUrl={audioUrl}
        durationMs={Math.max(1, sourceDurationMs)}
        startMs={startMs}
        endMs={endMs}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        height={COMPACT_WAVEFORM_HEIGHT}
        width={COMPACT_WAVEFORM_WIDTH}
      />

      <div className={css.labelRow}>
        <span>Trim region</span>
        <span className={css.numericLabel}>
          {formatMs(startMs)} → {formatMs(endMs)} · {formatMs(endMs - startMs)}
        </span>
      </div>

      <div className={css.controls}>
        <label className={css.toggleRow}>
          <input
            type="checkbox"
            checked={normalizeOn}
            onChange={(e) => toggleNormalize(e.currentTarget.checked)}
            aria-label="Toggle loudness normalization"
          />
          <span>Normalize to {DEFAULT_LUFS.toFixed(0)} LUFS (broadcast-friendly)</span>
        </label>
      </div>

      <div className={css.buttonRow}>
        <button
          type="button"
          className={css.applyButton}
          onClick={() => void handleApply()}
          disabled={applyInFlight}
        >
          {applyInFlight ? "Applying…" : "Apply"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel}
          disabled={applyInFlight}
        >
          Cancel
        </button>
      </div>

      {validationError && (
        <div className={css.errorBanner} role="alert" aria-live="polite">
          {validationError}
        </div>
      )}
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
