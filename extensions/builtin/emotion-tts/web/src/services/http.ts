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

export const EXTENSION_PREFIX = "/api/v1/extensions/nexus.audio.emotiontts";

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

/** Named SSE events the run-progress stream emits — these MUST stay in sync
 * with the producer's wire names (Rust `dispatcher/events.rs` `SSE_*` consts,
 * emitted from both `sse_event_name()` and the replay/poll paths in
 * `router/runs.rs`). The browser's `EventSource.onmessage` fires ONLY for
 * default/`message` frames, so every named frame needs its own
 * `addEventListener`, else the UI never advances.
 *
 * Adding a producer event requires updating BOTH this list and the Rust
 * producer — EventSource has no wildcard listener, so this explicit TS↔Rust
 * list is intentional and structurally unlinked (no compile-time enforcement). */
export const RUN_PROGRESS_EVENT_NAMES = [
  "segment_started",
  "segment_completed",
  "segment_failed",
  "run_terminal",
] as const;

/** Translate a raw parsed SSE frame into the consumer's event type. Return
 * null to drop the frame (unknown shape / type). Defaults to an identity cast
 * so generic callers without a wire mismatch need not supply one. */
export type SseParse<T> = (raw: unknown) => T | null;

export function subscribeSse<T>(
  path: string,
  onEvent: (event: T) => void,
  onError?: (err: Event) => void,
  eventNames: readonly string[] = RUN_PROGRESS_EVENT_NAMES,
  parse: SseParse<T> = (raw) => raw as T,
): () => void {
  const url = path.startsWith("http") ? path : `${EXTENSION_PREFIX}${path}`;
  const es = new EventSource(url);
  const handle = (ev: MessageEvent): void => {
    if (!ev.data) return;
    try {
      const parsed = parse(JSON.parse(ev.data));
      if (parsed !== null) onEvent(parsed);
    } catch {
      /* drop malformed frame */
    }
  };
  es.onmessage = handle;
  for (const name of eventNames) {
    es.addEventListener(name, handle as EventListener);
  }
  es.onerror = (err) => {
    onError?.(err);
  };
  return () => es.close();
}
