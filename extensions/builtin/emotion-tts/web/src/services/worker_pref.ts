//! Desired concurrent-worker count for the next runtime start.
//!
//! Shared between the recipe header's worker selector and the host-action
//! bridge, which performs the actual `startRuntime`. The host re-clamps to
//! `[1, EMOTIONTTS_MAX_WORKERS]` regardless of what the UI sends, so this is
//! only a preference, never a trust boundary.

let desired = 1;

export function getDesiredWorkers(): number {
  return desired;
}

export function setDesiredWorkers(n: number): void {
  desired = Number.isFinite(n) ? Math.max(1, Math.floor(n)) : 1;
}

//! Whether the next runtime start should warm (preload models on) all active
//! workers. Default on; the header's "Preload models on start" toggle and the
//! host-action bridge share this. The host treats it as a preference only.

let desiredWarmup = true;

export function getDesiredWarmup(): boolean {
  return desiredWarmup;
}

export function setDesiredWarmup(on: boolean): void {
  desiredWarmup = on;
}
