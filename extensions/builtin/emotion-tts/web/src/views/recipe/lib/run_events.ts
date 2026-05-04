export const TRIGGER_GENERATE = "emotion-tts:trigger-generate" as const;
export const RUN_STATE = "emotion-tts:run-state" as const;

export interface RunStateDetail {
  busy: boolean;
}

export function dispatchTriggerGenerate(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TRIGGER_GENERATE));
}

export function dispatchRunState(detail: RunStateDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<RunStateDetail>(RUN_STATE, { detail }));
}

export function subscribeTriggerGenerate(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(TRIGGER_GENERATE, listener);
  return () => window.removeEventListener(TRIGGER_GENERATE, listener);
}

export function subscribeRunState(
  listener: (detail: RunStateDetail) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (event: Event): void => {
    const detail = (event as CustomEvent<RunStateDetail>).detail;
    if (detail) listener(detail);
  };
  window.addEventListener(RUN_STATE, handler);
  return () => window.removeEventListener(RUN_STATE, handler);
}
