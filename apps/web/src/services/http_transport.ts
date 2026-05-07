/**
 * Spec 042 — Browser-dev HTTP/SSE transport.
 *
 * Each command maps to a `fetch()` call against `http://${getHostBase()}/api/host/...`.
 * Streaming methods open an `EventSource` and parse each `message` event as one
 * batch JSON. Used in `pnpm dev` browser mode where Tauri is absent.
 */

import {
  HOST_CMD_SCHEMA_V1,
  IpcRpcError,
  isIpcErrorPayload,
  type BreadcrumbInput,
  type BucketedInput,
  type BucketedResult,
  type EventBatch,
  type IpcAdapter,
  type MetricSample,
  type MetricsSubInput,
  type MnemonicInput,
  type MnemonicResult,
  type Ok,
  type QueryWindowInput,
  type QueryWindowResult,
  type SubscribeInput,
  type Subscription,
  type TraySetStateInput,
  type TuningPatchInput,
  type TuningPatchResult,
} from "./ipc_adapter_types";

const DEFAULT_HOST_BASE = "localhost:3000";

interface ImportMetaEnv {
  readonly VITE_HOST_BASE?: string;
}

function getHostBase(): string {
  const env = (import.meta as unknown as { env?: ImportMetaEnv }).env;
  const override = env?.VITE_HOST_BASE;
  if (typeof override === "string" && override.length > 0) {
    return override;
  }
  return DEFAULT_HOST_BASE;
}

function hostUrl(path: string): string {
  return `http://${getHostBase()}${path}`;
}

async function postJson<TIn, TOut>(path: string, body: TIn): Promise<TOut> {
  let response: Response;
  try {
    response = await fetch(hostUrl(path), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new IpcRpcError({
      code: "transport",
      message: err instanceof Error ? err.message : "network error",
      retriable: true,
    });
  }
  if (!response.ok) {
    const payload = await safeJson(response);
    if (isIpcErrorPayload(payload)) {
      throw new IpcRpcError(payload);
    }
    throw new IpcRpcError({
      code: "transport",
      message: `HTTP ${response.status}`,
      retriable: response.status >= 500,
    });
  }
  return (await response.json()) as TOut;
}

async function getJson<TOut>(path: string): Promise<TOut> {
  let response: Response;
  try {
    response = await fetch(hostUrl(path), { method: "GET" });
  } catch (err) {
    throw new IpcRpcError({
      code: "transport",
      message: err instanceof Error ? err.message : "network error",
      retriable: true,
    });
  }
  if (!response.ok) {
    const payload = await safeJson(response);
    if (isIpcErrorPayload(payload)) {
      throw new IpcRpcError(payload);
    }
    throw new IpcRpcError({
      code: "transport",
      message: `HTTP ${response.status}`,
      retriable: response.status >= 500,
    });
  }
  return (await response.json()) as TOut;
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function buildQueryString(
  params: Record<string, string | number | string[] | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, v);
    } else {
      search.append(key, String(value));
    }
  }
  const qs = search.toString();
  return qs.length > 0 ? `?${qs}` : "";
}

let nextSubscriptionSeq = 1;

function makeSseSubscription(
  source: EventSource,
  subscriptionId: string,
): Subscription {
  let closed = false;
  return {
    subscriptionId,
    async unsubscribe(): Promise<void> {
      if (closed) return;
      closed = true;
      source.close();
    },
  };
}

export const httpRpc: IpcAdapter = {
  window: {
    async show(): Promise<Ok> {
      return { schema: HOST_CMD_SCHEMA_V1, ok: true };
    },
    async hide(): Promise<Ok> {
      return { schema: HOST_CMD_SCHEMA_V1, ok: true };
    },
    async focus(): Promise<Ok> {
      return { schema: HOST_CMD_SCHEMA_V1, ok: true };
    },
    setTitlebarBreadcrumb(input: BreadcrumbInput): Promise<Ok> {
      return postJson<BreadcrumbInput, Ok>(
        "/api/host/window/titlebar/breadcrumb",
        input,
      );
    },
  },

  tray: {
    async setState(_input: TraySetStateInput): Promise<Ok> {
      return { schema: HOST_CMD_SCHEMA_V1, ok: true };
    },
  },

  runEvents: {
    async subscribe(
      input: SubscribeInput,
      onBatch: (batch: EventBatch) => void,
    ): Promise<Subscription> {
      const qs = buildQueryString({
        run_ids: input.run_ids,
        starting_from: input.starting_from,
        source: input.source_filter,
      });
      const url = hostUrl(`/api/host/runs/events${qs}`);
      const source = new EventSource(url);
      source.onmessage = (event: MessageEvent<string>): void => {
        try {
          const batch = JSON.parse(event.data) as EventBatch;
          onBatch(batch);
        } catch {
          return;
        }
      };
      const subscriptionId = `sse-${nextSubscriptionSeq}`;
      nextSubscriptionSeq += 1;
      return makeSseSubscription(source, subscriptionId);
    },

    queryWindow(input: QueryWindowInput): Promise<QueryWindowResult> {
      const qs = buildQueryString({
        from_seq: input.from_seq,
        to_seq: input.to_seq,
        source: input.source_filter,
      });
      return getJson<QueryWindowResult>(
        `/api/host/runs/${encodeURIComponent(input.run_id)}/events${qs}`,
      );
    },

    bucketed(input: BucketedInput): Promise<BucketedResult> {
      const qs = buildQueryString({
        run_id: input.run_id,
        bucket_ms: input.bucket_ms,
        metric: input.metric_filter,
      });
      return getJson<BucketedResult>(`/api/host/runs/buckets${qs}`);
    },
  },

  runtimeTuning: {
    patch(input: TuningPatchInput): Promise<TuningPatchResult> {
      return postJson<TuningPatchInput, TuningPatchResult>(
        `/api/host/runtime/${encodeURIComponent(input.deployment_id)}/tuning`,
        input,
      );
    },
  },

  block: {
    registerMnemonic(input: MnemonicInput): Promise<MnemonicResult> {
      return postJson<MnemonicInput, MnemonicResult>(
        "/api/host/blocks/mnemonics",
        input,
      );
    },
  },

  pulseFloor: {
    async metricsSubscribe(
      input: MetricsSubInput,
      onSample: (sample: MetricSample) => void,
    ): Promise<Subscription> {
      const qs = buildQueryString({
        names: input.metric_names,
        window_ms: input.window_ms,
      });
      const url = hostUrl(`/api/host/metrics/stream${qs}`);
      const source = new EventSource(url);
      source.onmessage = (event: MessageEvent<string>): void => {
        try {
          const sample = JSON.parse(event.data) as MetricSample;
          onSample(sample);
        } catch {
          return;
        }
      };
      const subscriptionId = `sse-${nextSubscriptionSeq}`;
      nextSubscriptionSeq += 1;
      return makeSseSubscription(source, subscriptionId);
    },
  },
};
