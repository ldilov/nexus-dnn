/**
 * Bridge between the EmotionTTS custom element and the host shell's
 * generic per-extension action contract (declared in
 * `apps/web/src/types/extension_actions.ts`).
 *
 * On `ext-actions-request`, replies with the current action set:
 *   - primary  →  Run / Stop / Install runtime (lifecycle entry-point)
 *   - secondary → Mappings (navigates inner router to /<id>/mappings)
 *
 * Polls runtime health and re-emits `ext-action-state` when the primary
 * label/state should change. Handles `ext-action-invoke` by calling the
 * runtime client + dispatching an in-bundle navigation event for the
 * mappings route.
 *
 * The contract type strings are duplicated here (string literals) on
 * purpose — extensions are not allowed to import from host source.
 */

import {
  badgeLabel,
  getRuntimeHealth,
  startRuntime,
  stopRuntime,
  type RuntimeBadge,
  type RuntimeHealth,
} from "./services/runtime_client";
import { getDesiredWorkers } from "./services/worker_pref";

interface ActionDecl {
  id: string;
  label: string;
  icon?: string;
  tone?: "primary" | "secondary" | "danger";
  state?: "idle" | "loading" | "disabled";
  tooltip?: string;
}

interface ActionSet {
  primary: ActionDecl;
  secondary?: ActionDecl;
}

const EXT_ACTIONS_REQUEST = "ext-actions-request";
const EXT_ACTIONS_DECLARE = "ext-actions-declare";
const EXT_ACTION_STATE = "ext-action-state";
const EXT_ACTION_INVOKE = "ext-action-invoke";

/** Internal — fired by the action bridge to ask the inner React Router
 * to navigate. The recipe view registers a listener and calls
 * `useNavigate` on receipt. */
export const INTERNAL_NAVIGATE = "emotion-tts:navigate";

const ACTION_RUN = "emotion-tts.run";
const ACTION_MAPPINGS = "emotion-tts.mappings";

const HEALTH_POLL_MS = 4000;

interface BridgeHandle {
  dispose: () => void;
}

/**
 * Wires the action contract on a custom-element instance for the given
 * deployment id. Returns a handle whose `dispose()` cleans up listeners
 * + polling.
 */
export function attachActionBridge(host: HTMLElement, deploymentId: string): BridgeHandle {
  let lastHealth: RuntimeHealth | null = null;
  // Tracks an in-flight runtime start/stop so we publish `loading` state
  // even while the next health poll hasn't returned yet.
  let inFlightLifecycle = false;

  const buildPrimary = (): ActionDecl => {
    const badge = lastHealth?.badge ?? "not_installed";
    return primaryFromBadge(badge, inFlightLifecycle);
  };

  const buildSet = (): ActionSet => ({
    primary: buildPrimary(),
    secondary: {
      id: ACTION_MAPPINGS,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings",
    },
  });

  const dispatchDeclare = () => {
    host.dispatchEvent(
      new CustomEvent(EXT_ACTIONS_DECLARE, {
        detail: { actions: buildSet() },
        bubbles: false,
      }),
    );
  };

  const dispatchPrimaryState = () => {
    host.dispatchEvent(
      new CustomEvent(EXT_ACTION_STATE, {
        detail: { action: buildPrimary() },
        bubbles: false,
      }),
    );
  };

  const handleRequest = () => dispatchDeclare();

  const handleInvoke = (event: Event) => {
    const id = (event as CustomEvent<{ id?: string }>).detail?.id;
    if (id === ACTION_RUN) {
      void runLifecycleAction();
    } else if (id === ACTION_MAPPINGS) {
      host.dispatchEvent(
        new CustomEvent(INTERNAL_NAVIGATE, {
          detail: { path: `/${deploymentId}/mappings` },
          bubbles: false,
        }),
      );
    }
  };

  const runLifecycleAction = async () => {
    const badge = lastHealth?.badge ?? "not_installed";
    const isRunning = badge === "ready" || badge === "running" || badge === "starting";
    inFlightLifecycle = true;
    dispatchPrimaryState();
    try {
      if (isRunning) {
        await stopRuntime();
      } else {
        await startRuntime(getDesiredWorkers());
      }
      // Refresh health immediately so the label flips quickly.
      try {
        lastHealth = await getRuntimeHealth();
      } catch {
        // Ignore — the regular poll will catch up.
      }
    } catch {
      // Surface nothing here; the recipe view's banner still shows
      // detailed errors when the user is on that tab. The host shell
      // simply un-spins the button.
    } finally {
      inFlightLifecycle = false;
      dispatchPrimaryState();
    }
  };

  host.addEventListener(EXT_ACTIONS_REQUEST, handleRequest);
  host.addEventListener(EXT_ACTION_INVOKE, handleInvoke);

  // Kick off the poll loop. Always emit a fresh `ext-action-state` even
  // if the badge hasn't changed — it's cheap and keeps the host in
  // sync if it mounted late.
  let cancelled = false;
  const poll = async () => {
    try {
      const next = await getRuntimeHealth();
      if (cancelled) return;
      lastHealth = next;
      dispatchPrimaryState();
    } catch {
      // Network or 404 (deployment paused). Leave lastHealth as-is.
    }
  };
  void poll();
  const intervalId = window.setInterval(() => void poll(), HEALTH_POLL_MS);

  // Declare immediately so the host doesn't have to dispatch a request
  // race-free (it still does, but this covers the case where the host
  // ref attaches after the bridge mounts).
  dispatchDeclare();

  return {
    dispose: () => {
      cancelled = true;
      window.clearInterval(intervalId);
      host.removeEventListener(EXT_ACTIONS_REQUEST, handleRequest);
      host.removeEventListener(EXT_ACTION_INVOKE, handleInvoke);
    },
  };
}

function primaryFromBadge(badge: RuntimeBadge, inFlight: boolean): ActionDecl {
  const isRunning = badge === "ready" || badge === "running" || badge === "starting";
  const isStopped = badge === "stopped" || badge === "not_installed" || badge === "failed";

  if (inFlight) {
    return {
      id: ACTION_RUN,
      label: isRunning ? "Stopping…" : "Starting…",
      icon: isRunning ? "stop" : "play_arrow",
      tone: "primary",
      state: "loading",
    };
  }
  if (badge === "starting" || badge === "installing" || badge === "stopping") {
    return {
      id: ACTION_RUN,
      label: badgeLabel(badge),
      icon: "hourglass_top",
      tone: "primary",
      state: "loading",
    };
  }
  if (isRunning) {
    return {
      id: ACTION_RUN,
      label: "Stop runtime",
      icon: "stop",
      tone: "primary",
      state: "idle",
      tooltip: "Stop the EmotionTTS worker",
    };
  }
  if (isStopped) {
    return {
      id: ACTION_RUN,
      label: badge === "not_installed" ? "Install / Start runtime" : "Start runtime",
      icon: "play_arrow",
      tone: "primary",
      state: "idle",
      tooltip: "Start the EmotionTTS worker for this deployment",
    };
  }
  return {
    id: ACTION_RUN,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
  };
}
