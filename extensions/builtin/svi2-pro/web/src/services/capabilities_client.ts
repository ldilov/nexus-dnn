import { apiFetch } from "./http";

export interface AttentionBackendCap {
  id: string;
  installed: boolean;
  supported: boolean;
  reason: string | null;
  min_arch: [number, number];
  needs_triton: boolean;
  bf16_only: boolean;
}

export interface AttentionCapabilities {
  sm: [number, number];
  cuda_available: boolean;
  default: string;
  auto_chain: string[];
  backends: AttentionBackendCap[];
}

export async function getAttentionCapabilities(): Promise<AttentionCapabilities> {
  return apiFetch("/capabilities/attention");
}
