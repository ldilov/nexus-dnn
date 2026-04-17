export {
  fetchRuntimes,
  fetchBackendVariants,
  fetchParameterCatalog,
  fetchLoadState,
  startBackendInstall,
} from "./api_client";

export interface BackendLogLine {
  timestamp?: string;
  level?: string;
  message?: string;
}

export async function validateBackend(
  backendId: string,
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const res = await fetch(
    `/api/v1/llm/backends/${encodeURIComponent(backendId)}/validate`,
    { method: "POST" },
  );
  const body = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, body };
}

export async function fetchBackendLogs(
  backendId: string,
  signal?: AbortSignal,
): Promise<BackendLogLine[]> {
  const res = await fetch(
    `/api/v1/llm/backends/${encodeURIComponent(backendId)}/logs`,
    { signal },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = (await res.json()) as { data?: { lines?: unknown } };
  const raw = body?.data?.lines;
  return Array.isArray(raw) ? (raw as BackendLogLine[]) : [];
}

export async function uninstallBackend(
  runtimeInstallId: string,
): Promise<void> {
  const res = await fetch(
    `/api/v1/backends/${encodeURIComponent(runtimeInstallId)}`,
    { method: "DELETE" },
  );
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as
      | { error?: { message: string } }
      | null;
    throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  }
}

export async function listHostBackends(baseUrl?: string): Promise<unknown> {
  const prefix = baseUrl ?? "";
  const res = await fetch(`${prefix}/api/v1/llm/backends`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = (await res.json()) as { data?: unknown };
  return body?.data;
}
