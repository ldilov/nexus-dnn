// audit-allow: boundary — boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
const RPC_ENDPOINT = "/api/v1/extensions/nexus.local-llm/rpc";

export interface InstallRuntimeParams {
  backendId: string;
  acceleration: string;
}

export interface InstallRuntimeResult {
  ok: boolean;
  taskId: string | null;
}

async function rpc(
  method: string,
  params: Record<string, unknown>,
): Promise<{ ok: boolean; data: unknown }> {
  const res = await fetch(RPC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, params }),
  });
  const body = await res.json().catch(() => null);
  return { ok: res.ok, data: body };
}

export async function installRuntime({
  backendId,
  acceleration,
}: InstallRuntimeParams): Promise<InstallRuntimeResult> {
  const { ok, data } = await rpc("llm.install_runtime", {
    candidate_id: `${backendId}-${acceleration}`,
    backend_family: backendId,
    acceleration,
  });
  const taskId = (data as { data?: { task_id?: string } } | null)?.data?.task_id ?? null;
  return { ok, taskId };
}

export interface InstallStatus {
  status: string | null;
  progressPercent: number;
  error: string | null;
}

export async function getInstallStatus(taskId: string): Promise<InstallStatus> {
  const { data } = await rpc("llm.get_install_status", { task_id: taskId });
  const envelope = (data as { data?: { status?: string; progress_percent?: number; error?: string } } | null)?.data;
  return {
    status: envelope?.status ?? null,
    progressPercent: envelope?.progress_percent ?? 0,
    error: envelope?.error ?? null,
  };
}
