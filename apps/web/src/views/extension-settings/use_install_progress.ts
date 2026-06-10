/**
 * Spec 035 — useInstallProgress hook.
 *
 * Subscribes to the orchestration event bus and (a) triggers a coalesced SWR
 * `mutate()` so the authoritative `dependencies` snapshot stays fresh, and
 * (b) tracks per-step live download progress straight off the
 * `extension_install_step_progress` payload — current/total bytes, a smoothed
 * transfer speed, and an ETA — so model-download rows update in real time
 * without waiting on a REST round-trip. A steady ticker extrapolates bytes
 * between events so the bar glides and the ETA counts down.
 */
import { useEffect, useReducer, useRef } from "react";
import { useSWRConfig } from "swr";

import { subscribeEvents } from "../../services/event_streams";

const INSTALL_EVENT_TYPES = new Set([
  "extension_install_step_started",
  "extension_install_step_progress",
  "extension_install_step_completed",
  "extension_install_step_failed",
  "extension_install_completed",
]);

const SPEED_SMOOTHING = 0.4;
const TICK_MS = 300;

interface InstallEventLike {
  type?: string;
  extension_id?: string;
  outcome?: string;
  install_run_id?: string;
}

interface StepFailedEventLike extends InstallEventLike {
  step_id?: string;
  category?: string;
  message?: string;
}

interface StepProgressEventLike extends InstallEventLike {
  step_id?: string;
  phase?: string;
  message?: string;
  current_bytes?: number;
  total_bytes?: number;
  /** Newer aliases for the byte counts; tolerated for forward compat. */
  bytes_done?: number;
  bytes_total?: number;
  /** Backend-derived percentage (0..100); present even without byte counts. */
  pct?: number | null;
}

interface StepEventLike extends InstallEventLike {
  step_id?: string;
}

export type InstallOutcome = "success" | "failed" | "cancelled";

export interface InstallCompletedDetail {
  outcome: InstallOutcome;
  install_run_id?: string;
  /** Last `extension_install_step_failed` observed during this run, if any. */
  failedStep?: { stepId: string; category: string; message: string };
}

export interface LiveStepProgress {
  currentBytes: number;
  totalBytes: number;
  /** 0..100, extrapolated between events from byte counts. */
  pct: number;
  /** Backend-derived percentage (0..100) or null when not reported. */
  reportedPct: number | null;
  /** Smoothed bytes/second, 0 when not yet known. */
  speedBps: number;
  /** Seconds to completion, or null when it cannot be estimated. */
  etaSeconds: number | null;
  phase: string;
  /** Latest human-readable line from the runner (e.g. a uv install line). */
  message: string;
}

export interface InstallProgress {
  /** True iff the runner has emitted a step or progress event recently. */
  active: boolean;
  /** Per-step live download metrics, keyed by step id. */
  liveByStep: Record<string, LiveStepProgress>;
}

export interface UseInstallProgressOptions {
  onCompleted?: (detail: InstallCompletedDetail) => void;
}

interface StepTracker {
  reportedBytes: number;
  reportedAt: number;
  totalBytes: number;
  speedBps: number;
  phase: string;
  message: string;
  reportedPct: number | null;
}

function clampPct(value: number | null | undefined): number | null {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return null;
  }
  return Math.min(100, Math.max(0, value));
}

function snapshot(
  trackers: Map<string, StepTracker>,
  now: number,
): Record<string, LiveStepProgress> {
  const out: Record<string, LiveStepProgress> = {};
  for (const [stepId, t] of trackers) {
    const elapsed = Math.max(0, (now - t.reportedAt) / 1000);
    const extrapolated = t.reportedBytes + t.speedBps * elapsed;
    const current =
      t.totalBytes > 0
        ? Math.min(t.totalBytes, extrapolated)
        : Math.max(t.reportedBytes, extrapolated);
    const pct =
      t.totalBytes > 0 ? Math.min(100, (current / t.totalBytes) * 100) : 0;
    const remaining = t.totalBytes - current;
    const etaSeconds =
      t.speedBps > 0 && remaining > 0 ? remaining / t.speedBps : null;
    out[stepId] = {
      currentBytes: current,
      totalBytes: t.totalBytes,
      pct,
      reportedPct: t.reportedPct,
      speedBps: t.speedBps,
      etaSeconds,
      phase: t.phase,
      message: t.message,
    };
  }
  return out;
}

export function useInstallProgress(
  extensionId: string,
  swrKey: string,
  options?: UseInstallProgressOptions,
): InstallProgress {
  const { mutate } = useSWRConfig();
  const activeRef = useRef(false);
  const trackersRef = useRef<Map<string, StepTracker>>(new Map());
  const liveRef = useRef<Record<string, LiveStepProgress>>({});
  const [, forceTick] = useReducer((n: number) => n + 1, 0);
  const onCompletedRef = useRef(options?.onCompleted);
  onCompletedRef.current = options?.onCompleted;

  useEffect(() => {
    if (!extensionId) return;
    let cancelled = false;
    let revalidateTimer: ReturnType<typeof setTimeout> | null = null;
    let lastFailedStep: InstallCompletedDetail["failedStep"] | undefined;

    const scheduleRevalidate = () => {
      if (cancelled || revalidateTimer) return;
      revalidateTimer = setTimeout(() => {
        revalidateTimer = null;
        if (!cancelled) void mutate(swrKey);
      }, 250);
    };

    const refreshLive = () => {
      liveRef.current = snapshot(trackersRef.current, Date.now());
      forceTick();
    };

    const recordProgress = (event: StepProgressEventLike) => {
      const stepId = event.step_id;
      if (!stepId) return;
      const now = Date.now();
      const current = event.current_bytes ?? event.bytes_done ?? 0;
      const total = event.total_bytes ?? event.bytes_total ?? 0;
      const reportedPct = clampPct(event.pct);
      const prev = trackersRef.current.get(stepId);
      let speedBps = prev?.speedBps ?? 0;
      if (prev && current > prev.reportedBytes && now > prev.reportedAt) {
        const instant =
          (current - prev.reportedBytes) / ((now - prev.reportedAt) / 1000);
        speedBps =
          prev.speedBps > 0
            ? SPEED_SMOOTHING * instant + (1 - SPEED_SMOOTHING) * prev.speedBps
            : instant;
      }
      trackersRef.current.set(stepId, {
        reportedBytes: current,
        reportedAt: now,
        totalBytes: total,
        speedBps,
        phase: event.phase ?? "",
        message: event.message ?? prev?.message ?? "",
        reportedPct: reportedPct ?? prev?.reportedPct ?? null,
      });
    };

    const clearStep = (event: StepEventLike) => {
      if (event.step_id) trackersRef.current.delete(event.step_id);
    };

    const ticker = setInterval(() => {
      if (cancelled) return;
      if (trackersRef.current.size > 0) {
        refreshLive();
      } else if (Object.keys(liveRef.current).length > 0) {
        liveRef.current = {};
        forceTick();
      }
    }, TICK_MS);

    const sub = subscribeEvents((evt) => {
      const event = evt as unknown as InstallEventLike;
      if (!event?.type || !INSTALL_EVENT_TYPES.has(event.type)) return;
      if (event.extension_id !== extensionId) return;
      activeRef.current = event.type !== "extension_install_completed";

      switch (event.type) {
        case "extension_install_step_progress":
          recordProgress(event as StepProgressEventLike);
          refreshLive();
          scheduleRevalidate();
          break;
        case "extension_install_step_completed":
        case "extension_install_step_failed":
          if (event.type === "extension_install_step_failed") {
            const failed = event as StepFailedEventLike;
            if (failed.step_id && failed.category && failed.message) {
              lastFailedStep = {
                stepId: failed.step_id,
                category: failed.category,
                message: failed.message,
              };
            }
          }
          clearStep(event as StepEventLike);
          refreshLive();
          scheduleRevalidate();
          break;
        case "extension_install_completed": {
          if (revalidateTimer) {
            clearTimeout(revalidateTimer);
            revalidateTimer = null;
          }
          trackersRef.current.clear();
          liveRef.current = {};
          forceTick();
          void mutate(swrKey);
          const cb = onCompletedRef.current;
          if (cb) {
            const outcome = (event.outcome ?? "failed") as InstallOutcome;
            cb({
              outcome,
              install_run_id: event.install_run_id,
              failedStep: outcome !== "success" ? lastFailedStep : undefined,
            });
          }
          lastFailedStep = undefined;
          break;
        }
        default:
          scheduleRevalidate();
      }
    });

    return () => {
      cancelled = true;
      if (revalidateTimer) clearTimeout(revalidateTimer);
      clearInterval(ticker);
      sub.close();
    };
  }, [extensionId, swrKey, mutate]);

  return { active: activeRef.current, liveByStep: liveRef.current };
}
