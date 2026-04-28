/**
 * Spec 036 / US1 — purely presentational waveform editor surface.
 *
 * Decodes `audioUrl` into peaks via `useWaveformPeaks`, paints them on a
 * `<canvas>`, and overlays two draggable region handles (start/end) plus an
 * optional playhead cursor. Region outside `[startMs, endMs]` is dimmed to
 * satisfy FR-036.
 *
 * Keyboard fine-adjust per FR-035: when a handle has focus, arrow keys nudge
 * by 10 ms (Shift = 100 ms, Ctrl = 1 ms).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { vars } from "../../../theme/tokens.css";
import { useWaveformPeaks } from "../../../hooks/use_waveform_peaks";
import * as css from "./waveform_canvas.css";

export interface WaveformCanvasProps {
  audioUrl: string;
  durationMs: number;
  startMs: number;
  endMs: number;
  onChangeStart: (ms: number) => void;
  onChangeEnd: (ms: number) => void;
  isPlaying?: boolean;
  playbackPositionMs?: number;
  onSeek?: (ms: number) => void;
  width?: number;
  height?: number;
}

const DEFAULT_HEIGHT = 120;
const DEFAULT_WIDTH = 720;

type ActiveDrag = "start" | "end" | null;

export function WaveformCanvas(props: WaveformCanvasProps): JSX.Element {
  const {
    audioUrl,
    durationMs,
    startMs,
    endMs,
    onChangeStart,
    onChangeEnd,
    isPlaying = false,
    playbackPositionMs = 0,
    onSeek,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<ActiveDrag>(null);
  const peaksState = useWaveformPeaks(audioUrl, width);

  useEffect(() => {
    paintWaveform(canvasRef.current, peaksState.peaks, width, height);
  }, [peaksState.peaks, width, height]);

  const handleSize = useCallback(
    (clientX: number): number => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect || rect.width <= 0) return 0;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * durationMs);
    },
    [durationMs],
  );

  useEffect(() => {
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current) return;
      const ms = handleSize(ev.clientX);
      if (dragRef.current === "start") onChangeStart(clamp(ms, 0, endMs - 1));
      else onChangeEnd(clamp(ms, startMs + 1, durationMs));
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [handleSize, durationMs, endMs, startMs, onChangeStart, onChangeEnd]);

  const beginDrag = (which: "start" | "end") => (ev: React.PointerEvent) => {
    ev.preventDefault();
    dragRef.current = which;
  };

  const handleCanvasClick = (ev: React.PointerEvent) => {
    if (!onSeek) return;
    const target = ev.target as HTMLElement;
    if (target.dataset.handle) return;
    onSeek(handleSize(ev.clientX));
  };

  const handleKey = (which: "start" | "end") => (ev: React.KeyboardEvent) => {
    const step = ev.shiftKey ? 100 : ev.ctrlKey ? 1 : 10;
    let delta = 0;
    if (ev.key === "ArrowLeft") delta = -step;
    else if (ev.key === "ArrowRight") delta = step;
    else return;
    ev.preventDefault();
    if (which === "start") onChangeStart(clamp(startMs + delta, 0, endMs - 1));
    else onChangeEnd(clamp(endMs + delta, startMs + 1, durationMs));
  };

  const startPct = pct(startMs, durationMs);
  const endPct = pct(endMs, durationMs);
  const playheadPct = pct(playbackPositionMs, durationMs);

  return (
    <div
      ref={wrapperRef}
      className={css.wrapper}
      style={{ height }}
      onPointerDown={handleCanvasClick}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={css.canvas}
        aria-label="Audio waveform"
      />
      {peaksState.isLoading && <div className={css.loading}>Decoding waveform…</div>}
      {peaksState.error && (
        <div className={css.loading} role="alert">
          {peaksState.error}
        </div>
      )}

      <div className={css.dimRegion} style={{ left: 0, width: `${startPct}%` }} />
      <div
        className={css.dimRegion}
        style={{ left: `${endPct}%`, right: 0, width: `${100 - endPct}%` }}
      />

      <div
        className={css.handle}
        style={{ left: `${startPct}%` }}
        role="slider"
        aria-label="Region start"
        aria-valuemin={0}
        aria-valuemax={durationMs}
        aria-valuenow={startMs}
        tabIndex={0}
        onPointerDown={beginDrag("start")}
        onKeyDown={handleKey("start")}
        data-handle="start"
      >
        <span className={css.handleLine} aria-hidden="true" />
        <span className={css.handleGrip} aria-hidden="true" />
      </div>

      <div
        className={css.handle}
        style={{ left: `${endPct}%` }}
        role="slider"
        aria-label="Region end"
        aria-valuemin={0}
        aria-valuemax={durationMs}
        aria-valuenow={endMs}
        tabIndex={0}
        onPointerDown={beginDrag("end")}
        onKeyDown={handleKey("end")}
        data-handle="end"
      >
        <span className={css.handleLine} aria-hidden="true" />
        <span className={css.handleGrip} aria-hidden="true" />
      </div>

      {isPlaying && (
        <div className={css.playhead} style={{ left: `${playheadPct}%` }} aria-hidden="true" />
      )}
    </div>
  );
}

function pct(ms: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, (ms / total) * 100));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function paintWaveform(
  canvas: HTMLCanvasElement | null,
  peaks: Float32Array | null,
  width: number,
  height: number,
): void {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  if (!peaks || peaks.length === 0) return;

  const mid = height / 2;
  ctx.fillStyle = readCssVar(canvas, "--color-primary", "#ba9eff");

  const barCount = Math.min(peaks.length, width);
  for (let i = 0; i < barCount; i += 1) {
    const peak = peaks[i] ?? 0;
    const barHeight = Math.max(1, peak * (height - 4));
    ctx.fillRect(i, mid - barHeight / 2, 1, barHeight);
  }
}

/**
 * Resolve a CSS custom property to a concrete colour string usable as a
 * Canvas2D `fillStyle`. The fallback is the literal default baked into
 * `theme/tokens.css.ts` so canvas painting stays in sync with the token's
 * documented default when the variable is not set on this subtree.
 */
function readCssVar(el: HTMLElement, varName: string, fallback: string): string {
  const value = getComputedStyle(el).getPropertyValue(varName).trim();
  return value || fallback;
}
