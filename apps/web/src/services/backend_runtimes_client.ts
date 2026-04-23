/**
 * Spec 032 — typed client for the generic backend-runtime catalog.
 *
 * Wraps the host's `/api/v1/backend-runtimes*` surface in a SWR-friendly
 * fetch helper. Schema mirrors
 * `specs/032-backend-runtime-catalog/contracts/http/backend_runtimes.yaml`.
 *
 * Pure facts — no UI assumptions; no hardcoded extension ids.
 */

export type RuntimeFamily = "llama.cpp" | "python";
export type Transport = "stdio";
export type ImplementationStatus =
  | "available"
  | "unavailable"
  | "deprecated"
  | "abandoned";

export interface CatalogEntry {
  runtime_id: string;
  display_name: string;
  source_extension_id: string;
  source_extension_version: string;
  runtime_family: RuntimeFamily;
  transport: Transport;
  implementation_status: ImplementationStatus;
  version_manifest_path: string;
  worker_entrypoint: string;
  capability_tags: string[];
  supported_roles: string[];
  created_at: number;
  updated_at: number;
}

export interface ListParams {
  runtime_family?: RuntimeFamily;
  source_extension_id?: string;
  implementation_status?: ImplementationStatus;
}

interface Envelope<T> {
  data?: T;
  error?: { code?: string; message?: string };
}

function buildQuery(params: ListParams): string {
  const usp = new URLSearchParams();
  if (params.runtime_family) usp.set("runtime_family", params.runtime_family);
  if (params.source_extension_id)
    usp.set("source_extension_id", params.source_extension_id);
  if (params.implementation_status)
    usp.set("implementation_status", params.implementation_status);
  const s = usp.toString();
  return s ? `?${s}` : "";
}

async function unwrap<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => null)) as Envelope<T> | null;
  if (!res.ok) {
    const msg = body?.error?.message ?? `HTTP ${res.status} ${res.statusText}`;
    const code = body?.error?.code ? ` (${body.error.code})` : "";
    throw new Error(`${msg}${code}`);
  }
  if (!body?.data) {
    throw new Error("backend-runtimes: malformed response — missing data envelope");
  }
  return body.data;
}

export async function listBackendRuntimes(
  params: ListParams = {},
  init?: RequestInit,
): Promise<CatalogEntry[]> {
  const res = await fetch(`/api/v1/backend-runtimes${buildQuery(params)}`, init);
  const data = await unwrap<{ runtimes: CatalogEntry[] }>(res);
  return data.runtimes;
}

export async function getBackendRuntime(
  runtimeId: string,
  init?: RequestInit,
): Promise<CatalogEntry> {
  const res = await fetch(
    `/api/v1/backend-runtimes/${encodeURIComponent(runtimeId)}`,
    init,
  );
  return unwrap<CatalogEntry>(res);
}

/**
 * SWR fetcher — accepts `[key, params]` and returns the catalog list.
 */
export const backendRuntimesFetcher = ([, params]: [
  "backend-runtimes",
  ListParams,
]) => listBackendRuntimes(params);

/* -----------------------------------------------------------------------
 * Install lifecycle — T087a (delete), T081 (start), T082 (stop),
 * T083 (restart) client helpers. SSE progress uses the native
 * `EventSource` rather than this module's fetch helper since the
 * response isn't a JSON envelope.
 * ------------------------------------------------------------------- */

export interface InstallRequest {
  release_id: string;
  platform: string;
  accelerator_profile: string;
}

export interface InstallResponse {
  runtime_install_id: string;
  pipeline_status: "running" | "unwired" | string;
}

export async function startInstall(
  runtimeId: string,
  body: InstallRequest,
): Promise<InstallResponse> {
  const res = await fetch(
    `/api/v1/backend-runtimes/${encodeURIComponent(runtimeId)}/install`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  return unwrap<InstallResponse>(res);
}

export interface InstallRow {
  runtime_install_id: string;
  runtime_id: string;
  release_id: string;
  platform: string;
  accelerator_profile: string;
  install_path: string;
  entrypoint_path: string | null;
  artifact_hash: string | null;
  status:
    | "pending"
    | "downloading"
    | "validating"
    | "validated"
    | "failed"
    | "abandoned";
  current_phase: string | null;
  validated_at: number | null;
  last_failure_category: string | null;
  last_failure_detail: string | null;
  created_at: number;
  updated_at: number;
}

export async function getInstall(installId: string): Promise<InstallRow> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}`,
  );
  return unwrap<InstallRow>(res);
}

export async function retryInstall(
  installId: string,
): Promise<{ runtime_install_id: string; resumed_from_phase: string }> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}/retry`,
    { method: "POST" },
  );
  return unwrap(res);
}

export async function uninstallInstall(installId: string): Promise<void> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}`,
    { method: "DELETE" },
  );
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as Envelope<never> | null;
    const msg = body?.error?.message ?? `HTTP ${res.status} ${res.statusText}`;
    const code = body?.error?.code ? ` (${body.error.code})` : "";
    throw new Error(`${msg}${code}`);
  }
}

export async function startLease(
  installId: string,
): Promise<{ lease_id: string; state: string; pid: number | null }> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}/start`,
    { method: "POST" },
  );
  return unwrap(res);
}

export async function stopLeases(
  installId: string,
): Promise<{ draining_leases: number }> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}/stop`,
    { method: "POST" },
  );
  return unwrap(res);
}

export async function restartInstall(
  installId: string,
): Promise<{ new_lease_id: string; state: string; pid: number | null; stopped_leases: number }> {
  const res = await fetch(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}/restart`,
    { method: "POST" },
  );
  return unwrap(res);
}

/**
 * Phase-event payload matching the spec-032 PhaseEvent schema.
 * Consumed by the SSE progress stepper.
 */
export interface PhaseEvent {
  install_id: string;
  phase:
    | "resolve"
    | "download"
    | "verify"
    | "extract"
    | "bootstrap_runtime"
    | "install_deps"
    | "validate_env"
    | "detect_models"
    | "persist"
    | "complete";
  state: "started" | "completed" | "failed";
  elapsed_ms: number;
  failure_category: string | null;
  failure_detail: string | null;
}

export const PHASE_ORDER: Array<PhaseEvent["phase"]> = [
  "resolve",
  "download",
  "verify",
  "extract",
  "bootstrap_runtime",
  "install_deps",
  "validate_env",
  "detect_models",
  "persist",
  "complete",
];

/**
 * Open an SSE stream for an install's phase progress. Returns a
 * cleanup fn that closes the stream. Callers receive `phase`
 * messages followed by one `done` message before the stream ends.
 */
export function subscribeInstallProgress(
  installId: string,
  handlers: {
    onPhase: (event: PhaseEvent) => void;
    onDone: (payload: { install_id: string; terminal: string }) => void;
    onError?: (err: Event) => void;
  },
): () => void {
  const es = new EventSource(
    `/api/v1/backend-runtime-installs/${encodeURIComponent(installId)}/progress`,
  );
  es.addEventListener("phase", (ev) => {
    try {
      handlers.onPhase(JSON.parse((ev as MessageEvent).data) as PhaseEvent);
    } catch {
      // Ignore malformed frames; server guarantees `event: phase` is JSON.
    }
  });
  es.addEventListener("done", (ev) => {
    try {
      handlers.onDone(JSON.parse((ev as MessageEvent).data));
    } catch {
      handlers.onDone({ install_id: installId, terminal: "unknown" });
    } finally {
      es.close();
    }
  });
  if (handlers.onError) {
    es.addEventListener("error", handlers.onError);
  }
  return () => es.close();
}

/**
 * Group runtimes by `source_extension_id` preserving the original order
 * within each group. Returns a stable ordering of groups by first
 * encounter.
 */
export function groupByExtension(
  runtimes: CatalogEntry[],
): Array<{ extension_id: string; runtimes: CatalogEntry[] }> {
  const order: string[] = [];
  const buckets = new Map<string, CatalogEntry[]>();
  for (const r of runtimes) {
    if (!buckets.has(r.source_extension_id)) {
      order.push(r.source_extension_id);
      buckets.set(r.source_extension_id, []);
    }
    buckets.get(r.source_extension_id)!.push(r);
  }
  return order.map((extension_id) => ({
    extension_id,
    runtimes: buckets.get(extension_id)!,
  }));
}
