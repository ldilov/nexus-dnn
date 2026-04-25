/**
 * Spec 035 — useInstallProgress hook.
 *
 * Subscribes to the orchestration WebSocket bus at /api/v1/events and triggers a
 * SWR `mutate()` whenever an `extension_install_*` event for the given extension
 * arrives. Components receive fresh `dependencies` snapshots without polling.
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
}

export interface InstallProgress {
  /** True iff the runner has emitted a step or progress event recently. */
  active: boolean;
}

export function useInstallProgress(
  extensionId: string,
  swrKey: string,
): InstallProgress {
  const { mutate } = useSWRConfig();
  const activeRef = useRef(false);

  useEffect(() => {
    if (!extensionId) return;
    let cancelled = false;
    let revalidateTimer: ReturnType<typeof setTimeout> | null = null;
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
      if (event.type === "extension_install_completed") {
        // Final revalidate happens immediately so the gallery card flips fast.
        if (revalidateTimer) {
          clearTimeout(revalidateTimer);
          revalidateTimer = null;
        }
        void mutate(swrKey);
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
