import { apiFetch } from "./http";

export type RuntimeBadge =
  | "not_installed"
  | "installing"
  | "starting"
  | "ready"
  | "running"
  | "stopping"
  | "failed"
  | "stopped";

export interface RuntimeHealth {
  badge: RuntimeBadge;
  modelLoaded: boolean;
  uptimeSeconds: number;
  vramUsedMb: number;
  vramTotalMb: number;
  lastErrorCategory: string | null;
}

export interface HandshakeInfo {
  protocol_version: string;
  worker_version: string;
  runtime_id: string;
  python_version: string;
  torch_version: string;
  cuda_available: boolean;
  device: string;
  model_family_id: string;
  model_present: boolean;
  capabilities: string[];
}

export async function getRuntimeHealth(): Promise<RuntimeHealth> {
  return apiFetch("/runtime/health");
}

export async function getRuntimeHandshake(): Promise<HandshakeInfo> {
  return apiFetch("/runtime/handshake");
}

export async function startRuntime(): Promise<void> {
  await apiFetch("/runtime/start", { method: "POST" });
}

export async function stopRuntime(): Promise<{ cancelledRunIds: string[] }> {
  return apiFetch("/runtime/stop", { method: "POST" });
}

export async function restartRuntime(): Promise<void> {
  await apiFetch("/runtime/restart", { method: "POST" });
}

export function badgeLabel(badge: RuntimeBadge): string {
  switch (badge) {
    case "not_installed":
      return "Not installed";
    case "installing":
      return "Installing";
    case "starting":
      return "Starting";
    case "ready":
      return "Ready";
    case "running":
      return "Running";
    case "stopping":
      return "Stopping";
    case "failed":
      return "Failed";
    case "stopped":
      return "Stopped";
  }
}
