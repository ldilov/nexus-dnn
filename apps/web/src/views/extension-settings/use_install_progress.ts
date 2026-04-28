/**
 * Spec 035 — useInstallProgress hook.
 *
 * Subscribes to the orchestration WebSocket bus at /api/v1/events and triggers a
 * SWR `mutate()` whenever an `extension_install_*` event for the given extension
 * arrives. Components receive fresh `dependencies` snapshots without polling.
 *
 * Optionally invokes a caller-supplied `onCompleted` callback when an
 * `extension_install_completed` event arrives so the page can surface a
 * terminal toast (success / failure) — without it, a backgrounded install
 * that fails after the initial "started" toast leaves the user with no
 * explicit feedback unless they're staring at the per-row state.
 */
import { useEffect, useRef } from "react";
import { useSWRConfig } from "swr";

import { subscribeEvents } from "../../services/event_streams";

const INSTALL_EVENT_TYPES = new Set([
  "extension_install_step_started",
  "extension_install_step_progress",
  "extension_install_step_completed",
  "extension_install_step_failed",
  "extension_install_completed",
]);

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

export type InstallOutcome = "success" | "failed" | "cancelled";

export interface InstallCompletedDetail {
  outcome: InstallOutcome;
  install_run_id?: string;
  /** Last `extension_install_step_failed` observed during this run, if any. */
  failedStep?: { stepId: string; category: string; message: string };
}

export interface InstallProgress {
  /** True iff the runner has emitted a step or progress event recently. */
  active: boolean;
}

export interface UseInstallProgressOptions {
  onCompleted?: (detail: InstallCompletedDetail) => void;
}

export function useInstallProgress(
  extensionId: string,
  swrKey: string,
  options?: UseInstallProgressOptions,
): InstallProgress {
  const { mutate } = useSWRConfig();
  const activeRef = useRef(false);
  // Capture the callback in a ref so the effect doesn't resubscribe on every
  // render when the caller passes an inline arrow.
  const onCompletedRef = useRef(options?.onCompleted);
  onCompletedRef.current = options?.onCompleted;

  useEffect(() => {
    if (!extensionId) return;
    let cancelled = false;
    let revalidateTimer: ReturnType<typeof setTimeout> | null = null;
    let lastFailedStep: InstallCompletedDetail["failedStep"] | undefined;
    const scheduleRevalidate = () => {
      if (cancelled) return;
      if (revalidateTimer) return;
      // Coalesce bursts of progress events into one revalidate per ~250ms.
      revalidateTimer = setTimeout(() => {
        revalidateTimer = null;
        if (!cancelled) void mutate(swrKey);
      }, 250);
    };

    const sub = subscribeEvents((evt) => {
      const event = evt as unknown as InstallEventLike;
      if (!event?.type || !INSTALL_EVENT_TYPES.has(event.type)) return;
      if (event.extension_id !== extensionId) return;
      activeRef.current = event.type !== "extension_install_completed";

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

      if (event.type === "extension_install_completed") {
        // Final revalidate happens immediately so the gallery card flips fast.
        if (revalidateTimer) {
          clearTimeout(revalidateTimer);
          revalidateTimer = null;
        }
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
      } else {
        scheduleRevalidate();
      }
    });
    return () => {
      cancelled = true;
      if (revalidateTimer) clearTimeout(revalidateTimer);
      sub.close();
    };
  }, [extensionId, swrKey, mutate]);

  return { active: activeRef.current };
}
