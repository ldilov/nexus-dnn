export type SwRegistrationStatus =
  | { kind: "unsupported" }
  | { kind: "disabled" }
  | { kind: "registered"; scope: string }
  | { kind: "error"; message: string };

export interface RegisterOptions {
  readonly url?: string;
  readonly scope?: string;
  readonly enabled?: boolean;
}

const DEFAULT_URL = "/sw.js";
const KILL_SWITCH_URL = "/sw-kill.js";

// Re-check for a newer worker this often while a tab stays open across a
// redeploy — a SPA never navigates, so the browser's navigation-time update
// check never fires on its own.
const UPDATE_POLL_MS = 60 * 60 * 1000;

let reloadHookInstalled = false;
let updateChecksInstalled = false;

function isProductionBuild(): boolean {
  return import.meta.env.PROD === true;
}

export async function registerServiceWorker(
  options: RegisterOptions = {},
): Promise<SwRegistrationStatus> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return { kind: "unsupported" };
  }
  const enabled = options.enabled ?? isProductionBuild();
  if (!enabled) {
    return { kind: "disabled" };
  }

  const url = options.url ?? DEFAULT_URL;
  const scope = options.scope ?? "/";

  try {
    // `updateViaCache: "none"` stops the browser from serving sw.js (or its
    // imports) out of the HTTP cache, so a redeployed worker is always seen.
    const registration = await navigator.serviceWorker.register(url, {
      scope,
      updateViaCache: "none",
    });

    installControllerReload();
    void registration.update?.().catch(() => undefined);
    installUpdateChecks(registration);

    registration.addEventListener("updatefound", () => {
      const installing = registration.installing;
      if (!installing) return;
      installing.addEventListener("statechange", () => {
        if (installing.state === "activated") {
          window.dispatchEvent(
            new CustomEvent("nexus.sw.activated", { detail: { url } }),
          );
        }
      });
    });
    return { kind: "registered", scope: registration.scope };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "service-worker register failed";
    return { kind: "error", message };
  }
}

/// Reload the page once a NEW worker takes control so an already-open tab
/// picks up the freshly deployed build instead of running the cached bundle.
/// The very first install (no prior controller) is skipped — only genuine
/// upgrades trigger the reload.
function installControllerReload(): void {
  if (reloadHookInstalled) return;
  const sw = navigator.serviceWorker;
  if (typeof sw?.addEventListener !== "function") return;
  if (!sw.controller) return;
  reloadHookInstalled = true;
  let reloading = false;
  sw.addEventListener("controllerchange", () => {
    if (reloading) return;
    reloading = true;
    if (typeof window !== "undefined") window.location.reload();
  });
}

/// Poll for a newer worker on a cadence and whenever the tab regains focus,
/// so a build shipped while the tab was open is still picked up promptly.
function installUpdateChecks(registration: ServiceWorkerRegistration): void {
  if (updateChecksInstalled) return;
  if (typeof window === "undefined") return;
  updateChecksInstalled = true;
  const check = (): void => {
    void registration.update?.().catch(() => undefined);
  };
  window.setInterval(check, UPDATE_POLL_MS);
  window.addEventListener("focus", check);
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") check();
    });
  }
}

export async function unregisterAllServiceWorkers(): Promise<number> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return 0;
  }
  const registrations = await navigator.serviceWorker.getRegistrations();
  let removed = 0;
  for (const registration of registrations) {
    const ok = await registration.unregister();
    if (ok) removed += 1;
  }
  return removed;
}

export async function activateKillSwitch(): Promise<SwRegistrationStatus> {
  return registerServiceWorker({ url: KILL_SWITCH_URL, enabled: true });
}

export const SW_DEFAULT_URL = DEFAULT_URL;
export const SW_KILL_SWITCH_URL = KILL_SWITCH_URL;
