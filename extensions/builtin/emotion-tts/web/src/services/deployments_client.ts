import { apiFetch } from "./http";

export interface Deployment {
  deploymentId: string;
  hostExtensionInstanceRef: string;
  displayName: string;
  backendRuntimePreference?: string | null;
  defaultOutputFormat: string;
  defaultSpeedFactor: number;
  defaultGenerationOverridesJson: string;
  defaultVoiceAssetId?: string | null;
  mostRecentRunId?: string | null;
  partialRunId?: string | null;
  createdAt: number;
  updatedAt: number;
}

export async function listDeployments(): Promise<{ deployments: Deployment[] }> {
  return apiFetch("/deployments");
}

export async function getDeployment(id: string): Promise<Deployment> {
  return apiFetch(`/deployments/${id}`);
}

export async function setDefaultVoice(
  deploymentId: string,
  voiceAssetId: string | null,
): Promise<void> {
  return apiFetch(`/deployments/${deploymentId}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId }),
  });
}
