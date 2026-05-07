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
    const registration = await navigator.serviceWorker.register(url, { scope });
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
