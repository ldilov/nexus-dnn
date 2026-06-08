export const TRIGGER_RENDER = "svi2-pro:trigger-render" as const;
export const RENDER_STATE = "svi2-pro:render-state" as const;

export interface RenderStateDetail {
  busy: boolean;
  blocked: boolean;
}

export function dispatchTriggerRender(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TRIGGER_RENDER));
}

export function dispatchRenderState(detail: RenderStateDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<RenderStateDetail>(RENDER_STATE, { detail }));
}

export function subscribeTriggerRender(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(TRIGGER_RENDER, listener);
  return () => window.removeEventListener(TRIGGER_RENDER, listener);
}

export function subscribeRenderState(listener: (detail: RenderStateDetail) => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (event: Event): void => {
    const detail = (event as CustomEvent<RenderStateDetail>).detail;
    if (detail) listener(detail);
  };
  window.addEventListener(RENDER_STATE, handler);
  return () => window.removeEventListener(RENDER_STATE, handler);
}
