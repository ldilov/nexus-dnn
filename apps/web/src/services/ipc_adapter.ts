/**
 * Spec 042 — IPC adapter (T013).
 *
 * Single I/O boundary per Constitution XII.4. Branches at runtime on
 * `window.isTauri` and lazily imports either the Tauri-mode or the browser-dev
 * HTTP/SSE transport. Consumers see one typed `IpcAdapter` surface; the
 * conditional never escapes this module.
 */

import type { IpcAdapter } from "./ipc_adapter_types";

export type {
  IpcAdapter,
  IpcBlockApi,
  IpcPulseFloorApi,
  IpcRunEventsApi,
  IpcRuntimeTuningApi,
  IpcTrayApi,
  IpcWindowApi,
} from "./ipc_adapter_types";

export {
  HOST_CMD_SCHEMA_V1,
  IpcRpcError,
  RUN_EVENT_SCHEMA_V1,
} from "./run_events_types";

function detectTauri(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as Window & { isTauri?: boolean };
  return w.isTauri === true;
}

let cached: Promise<IpcAdapter> | null = null;

async function loadAdapter(): Promise<IpcAdapter> {
  if (detectTauri()) {
    const mod = await import("./tauri_transport");
    return mod.tauriRpc;
  }
  const mod = await import("./http_transport");
  return mod.httpRpc;
}

export function getRpc(): Promise<IpcAdapter> {
  if (cached === null) {
    cached = loadAdapter();
  }
  return cached;
}

function makeProxyApi<TKey extends keyof IpcAdapter>(
  key: TKey,
): IpcAdapter[TKey] {
  const handler: ProxyHandler<object> = {
    get(_target, methodName: string | symbol): unknown {
      return async (...args: unknown[]): Promise<unknown> => {
        const adapter = await getRpc();
        const api = adapter[key] as unknown as Record<string, unknown>;
        const fn = api[methodName as string];
        if (typeof fn !== "function") {
          throw new Error(
            `IpcAdapter.${String(key)}.${String(methodName)} is not a function`,
          );
        }
        return (fn as (...a: unknown[]) => Promise<unknown>).apply(api, args);
      };
    },
  };
  return new Proxy({}, handler) as IpcAdapter[TKey];
}

export const rpc: IpcAdapter = {
  window: makeProxyApi("window"),
  tray: makeProxyApi("tray"),
  runEvents: makeProxyApi("runEvents"),
  runtimeTuning: makeProxyApi("runtimeTuning"),
  block: makeProxyApi("block"),
  pulseFloor: makeProxyApi("pulseFloor"),
};
