import { apiFetch } from "./http";
import type { EmotionMode } from "./types";

export interface CharacterMapping {
  mappingId: string;
  deploymentId: string;
  characterName: string;
  speakerVoiceAssetId: string;
  defaultEmotionMode: EmotionMode;
  defaultEmotionVoiceAssetId?: string | null;
  defaultQwenTemplate?: string | null;
  defaultSpeedFactor?: number | null;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export async function listMappings(deploymentId: string): Promise<{ mappings: CharacterMapping[] }> {
  return apiFetch(`/deployments/${deploymentId}/mappings`);
}

export async function createMapping(
  deploymentId: string,
  body: Partial<CharacterMapping>,
): Promise<CharacterMapping> {
  return apiFetch(`/deployments/${deploymentId}/mappings`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function deactivateMapping(deploymentId: string, mappingId: string): Promise<void> {
  await apiFetch(`/deployments/${deploymentId}/mappings/${mappingId}`, { method: "DELETE" });
}
