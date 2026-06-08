import type { ErrorEnvelope } from "./types";

export class ExtensionApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly category: string,
    message: string,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = "ExtensionApiError";
  }
}

export const EXTENSION_PREFIX = "/api/v1/extensions/nexus.video.svi2-pro";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${EXTENSION_PREFIX}${path}`;
  const resp = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!resp.ok) {
    let envelope: ErrorEnvelope | null = null;
    try {
      envelope = (await resp.json()) as ErrorEnvelope;
    } catch {
      envelope = null;
    }
    throw new ExtensionApiError(
      resp.status,
      envelope?.category ?? "unknown",
      envelope?.message ?? resp.statusText,
      envelope?.requestId,
    );
  }

  if (resp.status === 204) {
    return undefined as T;
  }
  return (await resp.json()) as T;
}

export function subscribeSse<T>(
  path: string,
  onEvent: (event: T) => void,
  onError?: (err: Event) => void,
): () => void {
  const url = path.startsWith("http") ? path : `${EXTENSION_PREFIX}${path}`;
  const es = new EventSource(url);
  es.onmessage = (ev) => {
    if (!ev.data) return;
    try {
      onEvent(JSON.parse(ev.data) as T);
    } catch {
      /* drop malformed frame */
    }
  };
  es.onerror = (err) => {
    onError?.(err);
  };
  return () => es.close();
}
