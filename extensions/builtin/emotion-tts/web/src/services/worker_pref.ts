//! Desired concurrent-worker count for the next runtime start.
//!

let desired = 1;

export function getDesiredWorkers(): number {
  return desired;
}

export function setDesiredWorkers(n: number): void {
  desired = Number.isFinite(n) ? Math.max(1, Math.floor(n)) : 1;
}

//! Whether the next runtime start should warm (preload models on) all active
//! workers. Default on; the header's "Preload models on start" toggle and the

let desiredWarmup = true;

export function getDesiredWarmup(): boolean {
  return desiredWarmup;
}

export function setDesiredWarmup(on: boolean): void {
  desiredWarmup = on;
}
