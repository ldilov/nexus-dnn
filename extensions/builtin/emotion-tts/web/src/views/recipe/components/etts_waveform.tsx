import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../../hooks/use_reduced_motion";
import { useWaveformAudio } from "../hooks/use_waveform_audio";
import * as css from "./etts_waveform.css";

export interface EttsWaveformProps {
  audioSrc: string | null;
  fallbackSeed?: number;
  fallbackIntensity?: number;
  loopRegion?: { start: number; end: number };
  onLoopRegionChange?: (next: { start: number; end: number }) => void;
  sampleRateHz?: number;
  bitDepth?: number;
  displayId?: string;
  reduceMotion?: boolean;
}

const DEFAULT_PEAK_COUNT = 512;
const REDUCED_MOTION_REDRAW_MS = 250;

export function EttsWaveform(props: EttsWaveformProps): JSX.Element {
  const {
    audioSrc,
    fallbackSeed = 1,
    fallbackIntensity = 0.6,
    loopRegion,
    sampleRateHz,
    bitDepth,
    displayId,
    reduceMotion,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const systemReducedMotion = useReducedMotion();
  const reduced = reduceMotion ?? systemReducedMotion;

  const waveform = useWaveformAudio({
    audioSrc,
    fallbackSeed,
    fallbackIntensity,
    peakCount: DEFAULT_PEAK_COUNT,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [pixelWidth, setPixelWidth] = useState(720);

  useEffect(() => {
    if (!frameRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(64, Math.floor(entry.contentRect.width));
      setPixelWidth(w);
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    paintWaveform(canvasRef.current, waveform.peaks, pixelWidth, 120);
  }, [waveform.peaks, pixelWidth]);

  useEffect(() => {
    if (!audioSrc) {
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentTime(0);
      return undefined;
    }
    const audio = new Audio(audioSrc);
    audio.preload = "metadata";
    audioRef.current = audio;
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return undefined;
    }
    if (reduced) {
      const interval = window.setInterval(() => {
        const a = audioRef.current;
        if (a) setCurrentTime(a.currentTime);
      }, REDUCED_MOTION_REDRAW_MS);
      return () => window.clearInterval(interval);
    }
    const tick = () => {
      const a = audioRef.current;
      if (a) setCurrentTime(a.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, reduced]);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play().catch(() => undefined);
    } else {
      a.pause();
    }
  }, []);

  const skipToStart = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setCurrentTime(0);
  }, []);

  const handleSeek = useCallback(
    (clientX: number) => {
      const a = audioRef.current;
      const frame = frameRef.current;
      if (!a || !frame) return;
      const total = waveform.duration > 0 ? waveform.duration : a.duration;
      if (!Number.isFinite(total) || total <= 0) return;
      const rect = frame.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      a.currentTime = ratio * total;
      setCurrentTime(a.currentTime);
    },
    [waveform.duration],
  );

  const totalDuration = waveform.duration > 0 ? waveform.duration : audioRef.current?.duration ?? 0;
  const playheadPct = totalDuration > 0 ? Math.max(0, Math.min(100, (currentTime / totalDuration) * 100)) : 0;

  return (
    <div className={css.root}>
      <div
        ref={frameRef}
        className={css.canvasFrame}
        onPointerDown={(ev) => handleSeek(ev.clientX)}
      >
        <canvas
          ref={canvasRef}
          width={pixelWidth}
          height={120}
          className={css.canvas}
          aria-label="Audio waveform"
        />
        {loopRegion ? (
          <div
            className={css.loopRegion}
            style={{
              left: `${loopRegion.start * 100}%`,
              width: `${(loopRegion.end - loopRegion.start) * 100}%`,
            }}
            aria-hidden="true"
          />
        ) : null}
        {!waveform.ready ? (
          <div className={css.loadingOverlay}>Decoding waveform…</div>
        ) : null}
        {audioSrc && totalDuration > 0 ? (
          <div className={css.playhead} style={{ left: `${playheadPct}%` }} aria-hidden="true" />
        ) : null}
      </div>

      {waveform.isFallback && audioSrc ? (
        <span className={css.fallbackNote}>
          Decoded preview unavailable — download to play.
        </span>
      ) : null}

      <div className={css.transportRow}>
        <button
          type="button"
          className={css.transportButton}
          onClick={skipToStart}
          aria-label="Skip to start"
          disabled={!audioSrc}
        >
          ⏮
        </button>
        <button
          type="button"
          className={css.transportButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={!audioSrc}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <span className={css.timeReadout}>
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </span>
        {(displayId || sampleRateHz || bitDepth) ? (
          <span className={css.metaChips}>
            {displayId ? <span className={css.metaChip}>{displayId}</span> : null}
            {sampleRateHz ? (
              <span className={css.metaChip}>{Math.round(sampleRateHz / 100) / 10} kHz</span>
            ) : null}
            {bitDepth ? <span className={css.metaChip}>{bitDepth} bit</span> : null}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00.00";
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${pad2(m)}:${s.toFixed(2).padStart(5, "0")}`;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
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
  // audit-allow: hex — neon decorative palette per design lang
  ctx.fillStyle = readCssVar(canvas, "--accent", "#ba9eff");
  const barCount = Math.min(peaks.length, width);
  const xStep = width / barCount;
  for (let i = 0; i < barCount; i += 1) {
    const peak = peaks[i] ?? 0;
    const barHeight = Math.max(1, peak * (height - 8));
    const x = Math.floor(i * xStep);
    ctx.fillRect(x, mid - barHeight / 2, Math.max(1, Math.floor(xStep)), barHeight);
  }
}

function readCssVar(el: HTMLElement, varName: string, fallback: string): string {
  const value = getComputedStyle(el).getPropertyValue(varName).trim();
  return value || fallback;
}
