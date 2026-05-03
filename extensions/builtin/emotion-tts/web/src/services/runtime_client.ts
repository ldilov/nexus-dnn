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
  protocolVersion: string;
  workerVersion: string;
  runtimeId: string;
  pythonVersion: string;
  torchVersion: string;
  cudaAvailable: boolean;
  device: string;
  modelFamilyId: string;
  modelPresent: boolean;
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

export const PER_UTTERANCE_SPEED_CAPABILITY = "per_utterance_speed";

export function supportsPerUtteranceSpeed(handshake: HandshakeInfo | null | undefined): boolean {
  if (!handshake) return false;
  return Array.isArray(handshake.capabilities)
    ? handshake.capabilities.includes(PER_UTTERANCE_SPEED_CAPABILITY)
    : false;
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
