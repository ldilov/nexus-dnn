/**
 * Host navigation contract — generic, extension-agnostic.
 *
 * Extensions running embedded in the host shell (host's hash router shares
 * the same `window`) sometimes need to surface a host route — e.g. a
 * deployments-index inside an extension wants to send the user to the host's
 * tabbed deployment-detail view (Recipe / Workflow Graph / Artifacts / …).
 *
 * The host provides this navigation primitive so extensions never hard-code
 * host URL shapes (hash routing, route segments, query params). The host is
 * free to evolve its routing without breaking extensions.
 *
 * Wire protocol:
 *   1. Extension dispatches `nexus-host-navigate` on `window` with a typed
 *      `NexusHostNavigateDetail` payload.
 *   2. Host installs a single global listener at app boot (apps/web/main.tsx)
 *      and translates the event into a router navigation.
 *
 * The host MUST validate `kind` and silently ignore unknown values — the
 * contract is forward-compatible: an older host can drop new navigation
 * intents without breaking the extension that sent them.
 */

export const NEXUS_HOST_NAVIGATE = "nexus-host-navigate";

/** Navigate to the host-managed deployment-detail page (tabbed shell). */
export interface DeploymentDetailNavigate {
  readonly kind: "deployment-detail";
  readonly deploymentId: string;
}

export type NexusHostNavigateDetail = DeploymentDetailNavigate;

/**
 * Convenience helper for in-host code that wants to fire the same event a
 * remote extension would (e.g. tests, dev tools, the gallery).
 *
 * Returns `true` if dispatched (browser context), `false` only when there
 * is no `window` (SSR / non-browser test runner). The event is intentionally
 * NOT `cancelable`, so the return value is NOT a "did-anyone-handle-this"
 * signal. Callers must not use it as a fallback gate.
 */
export function dispatchHostNavigate(detail: NexusHostNavigateDetail): boolean {
  if (typeof window === "undefined") return false;
  return window.dispatchEvent(
    new CustomEvent<NexusHostNavigateDetail>(NEXUS_HOST_NAVIGATE, { detail }),
  );
}
