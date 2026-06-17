// Lightweight cross-view event bus for "the set of installed models
// changed — please refetch". Used by the Model Foundry to notify the

const EVENT_NAME = "nexus:models-changed";

export interface ModelsChangedDetail {
  /// Optional family id that just landed — surfaces let consumers
  /// scope refreshes when many models change in quick succession.
  family_id?: string;
  /// Wall-clock timestamp the broadcast was fired. Useful for
  /// deduplication if multiple jobs finish in the same tick.
  at_ms: number;
}

/**
 * Notify any listening surface that the installed-models inventory
 * just changed. Safe to call from any client component or service.
 */
export function dispatchModelsChanged(detail?: Partial<ModelsChangedDetail>): void {
  if (typeof window === "undefined") return;
  const evt = new CustomEvent<ModelsChangedDetail>(EVENT_NAME, {
    detail: {
      family_id: detail?.family_id,
      at_ms: detail?.at_ms ?? Date.now(),
    },
  });
  window.dispatchEvent(evt);
}

/**
 * Subscribe to "models changed" broadcasts. Returns an
 * unsubscribe function suitable for `useEffect` cleanup.
 */
export function subscribeModelsChanged(
  handler: (detail: ModelsChangedDetail) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (evt: Event) => {
    const detail = (evt as CustomEvent<ModelsChangedDetail>).detail;
    if (detail) handler(detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
