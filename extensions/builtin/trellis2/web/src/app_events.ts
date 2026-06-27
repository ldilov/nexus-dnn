export const TRIGGER_GENERATE = "trellis2:trigger-generate" as const;
export const GENERATE_STATE = "trellis2:generate-state" as const;

export interface GenerateStateDetail {
  busy: boolean;
  blocked: boolean;
}

export function dispatchTriggerGenerate(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TRIGGER_GENERATE));
}

export function dispatchGenerateState(detail: GenerateStateDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<GenerateStateDetail>(GENERATE_STATE, { detail }));
}

export function subscribeTriggerGenerate(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(TRIGGER_GENERATE, listener);
  return () => window.removeEventListener(TRIGGER_GENERATE, listener);
}

export function subscribeGenerateState(
  listener: (detail: GenerateStateDetail) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (event: Event): void => {
    const detail = (event as CustomEvent<GenerateStateDetail>).detail;
    if (detail) listener(detail);
  };
  window.addEventListener(GENERATE_STATE, handler);
  return () => window.removeEventListener(GENERATE_STATE, handler);
}
