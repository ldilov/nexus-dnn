/**
 * use_transfer_rate — client-side transfer speed + ETA sampler.
 *
 * Reuses the proven sampling math from
 * `views/extension-settings/use_install_progress.ts`: an EWMA-smoothed
 * bytes/second derived from successive `progressBytes` observations plus a
 * steady ticker that extrapolates bytes between observations so the speed and
 * ETA glide instead of stepping. Works whether or not `totalBytes` is known —
 * ETA is only emitted when a positive total is available. Generic and
 * host-owned: no extension-specific knowledge.
 */
import { useEffect, useReducer, useRef } from "react";

const SPEED_SMOOTHING = 0.4;
const TICK_MS = 300;

export interface TransferSample {
  /** Most recent observed cumulative bytes. */
  reportedBytes: number;
  /** `Date.now()` at which `reportedBytes` was observed. */
  reportedAt: number;
  /** Smoothed bytes/second, 0 when not yet known. */
  speedBps: number;
}

export interface TransferRate {
  /** Smoothed bytes/second, 0 when not yet known. */
  speedBps: number;
  /** Seconds to completion, or null when it cannot be estimated. */
  etaSeconds: number | null;
  /** Bytes extrapolated to `now` between samples (clamped to total). */
  extrapolatedBytes: number;
}

/**
 * Fold a new cumulative-bytes observation into the previous sample, returning
 * the next sample with an EWMA-smoothed speed. Pure — easy to unit test.
 */
export function nextSample(
  prev: TransferSample | null,
  bytes: number,
  now: number,
): TransferSample {
  let speedBps = prev?.speedBps ?? 0;
  if (prev && bytes > prev.reportedBytes && now > prev.reportedAt) {
    const instant =
      (bytes - prev.reportedBytes) / ((now - prev.reportedAt) / 1000);
    speedBps =
      prev.speedBps > 0
        ? SPEED_SMOOTHING * instant + (1 - SPEED_SMOOTHING) * prev.speedBps
        : instant;
  }
  return { reportedBytes: bytes, reportedAt: now, speedBps };
}

/**
 * Derive the live transfer rate (speed, ETA, extrapolated bytes) from a sample
 * at wall-clock `now`. Pure — easy to unit test. `totalBytes` null/<=0 yields a
 * null ETA but still reports speed and extrapolated bytes.
 */
export function computeTransferRate(
  sample: TransferSample | null,
  totalBytes: number | null,
  now: number,
): TransferRate {
  if (!sample) {
    return { speedBps: 0, etaSeconds: null, extrapolatedBytes: 0 };
  }
  const elapsed = Math.max(0, (now - sample.reportedAt) / 1000);
  const extrapolated = sample.reportedBytes + sample.speedBps * elapsed;
  const hasTotal = totalBytes !== null && totalBytes > 0;
  const extrapolatedBytes = hasTotal
    ? Math.min(totalBytes, extrapolated)
    : Math.max(sample.reportedBytes, extrapolated);
  const remaining = hasTotal ? totalBytes - extrapolatedBytes : 0;
  const etaSeconds =
    hasTotal && sample.speedBps > 0 && remaining > 0
      ? remaining / sample.speedBps
      : null;
  return { speedBps: sample.speedBps, etaSeconds, extrapolatedBytes };
}

/**
 * React hook that samples a changing `progressBytes` over time and returns a
 * live, extrapolated transfer rate. Sampling runs inside an effect so only
 * committed renders feed the EWMA (mirrors the event-driven reference hook and
 * stays correct under React 19 concurrent/discarded renders). A steady ticker
 * keeps speed/ETA gliding between observations. `resetKey` (e.g. a job id)
 * discards prior samples when the underlying transfer changes so a fresh job
 * never inherits a stale speed.
 */
export function useTransferRate(
  progressBytes: number,
  totalBytes: number | null,
  resetKey?: string,
): TransferRate {
  const sampleRef = useRef<TransferSample | null>(null);
  const keyRef = useRef<string | undefined>(resetKey);
  const [, forceTick] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    if (keyRef.current !== resetKey) {
      keyRef.current = resetKey;
      sampleRef.current = null;
    }
    const prev = sampleRef.current;
    if (!prev || progressBytes !== prev.reportedBytes) {
      sampleRef.current = nextSample(prev, progressBytes, Date.now());
      forceTick();
    }
  }, [progressBytes, resetKey]);

  useEffect(() => {
    const ticker = setInterval(() => forceTick(), TICK_MS);
    return () => clearInterval(ticker);
  }, []);

  return computeTransferRate(sampleRef.current, totalBytes, Date.now());
}
