import { apiFetch } from "./http";
import type { PersistedEmotionMode } from "./types";

export interface CharacterMapping {
  mappingId: string;
  deploymentId: string;
  characterName: string;
  speakerVoiceAssetId: string;
  defaultEmotionMode: PersistedEmotionMode;
  defaultEmotionVoiceAssetId?: string | null;
  defaultVectorPresetId?: string | null;
  defaultQwenTemplate?: string | null;
  defaultSpeedFactor?: number | null;
  voiceAssetChainDigest?: string | null;
  isActive: boolean;
  notes?: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface MappingBundle {
  version: string;
  deploymentId: string;
  mappings: CharacterMapping[];
}

export type ImportConflictStrategy = "error" | "skip" | "replace";

export interface ImportResult {
  created: string[];
  skipped: string[];
  replaced: string[];
}

export async function listMappings(
  deploymentId: string,
): Promise<{ mappings: CharacterMapping[] }> {
  return apiFetch(`/mappings?deploymentId=${encodeURIComponent(deploymentId)}`);
}

export async function createMapping(
  deploymentId: string,
  body: Partial<CharacterMapping> & {
    characterName: string;
    speakerVoiceAssetId: string;
  },
): Promise<CharacterMapping> {
  return apiFetch("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...body, deploymentId }),
  });
}

export async function patchMapping(
  deploymentId: string,
  mappingId: string,
  body: Partial<CharacterMapping>,
): Promise<CharacterMapping> {
  return apiFetch(
    `/mappings/${mappingId}?deploymentId=${encodeURIComponent(deploymentId)}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  );
}

export async function deactivateMapping(
  deploymentId: string,
  mappingId: string,
): Promise<void> {
  await apiFetch(
    `/mappings/${mappingId}?deploymentId=${encodeURIComponent(deploymentId)}`,
    { method: "DELETE" },
  );
}

export async function duplicateMapping(
  sourceDeploymentId: string,
  mappingId: string,
  targetDeploymentId: string,
  overrideCharacterName?: string,
): Promise<CharacterMapping> {
  const query = new URLSearchParams({ deploymentId: sourceDeploymentId });
  return apiFetch(`/mappings/${mappingId}/duplicate?${query.toString()}`, {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId, overrideCharacterName }),
  });
}

export async function exportMappings(deploymentId: string): Promise<MappingBundle> {
  return apiFetch(`/mappings/export?deploymentId=${encodeURIComponent(deploymentId)}`);
}

export async function importMappings(
  targetDeploymentId: string,
  mappings: CharacterMapping[],
  conflictStrategy: ImportConflictStrategy = "error",
): Promise<ImportResult> {
  return apiFetch("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId, mappings, conflictStrategy }),
  });
}
