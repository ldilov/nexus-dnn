import { apiFetch } from "./http";

export type EmotionVector = [number, number, number, number, number, number, number, number];

export interface VectorPreset {
  presetId: string;
  deploymentId: string;
  presetName: string;
  vector: EmotionVector;
  createdAt: number;
  updatedAt: number;
}

export interface PresetBundle {
  version: string;
  deploymentId: string;
  presets: VectorPreset[];
}

export async function listPresets(deploymentId: string): Promise<{ presets: VectorPreset[] }> {
  return apiFetch(`/presets?deploymentId=${encodeURIComponent(deploymentId)}`);
}

export async function createPreset(
  deploymentId: string,
  presetName: string,
  vector: EmotionVector,
): Promise<VectorPreset> {
  return apiFetch("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId, presetName, vector }),
  });
}

export async function patchPreset(
  presetId: string,
  body: { presetName?: string; vector?: EmotionVector },
): Promise<VectorPreset> {
  return apiFetch(`/presets/${presetId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deletePreset(presetId: string): Promise<void> {
  await apiFetch(`/presets/${presetId}`, { method: "DELETE" });
}

export function toPresetBundle(
  deploymentId: string,
  presets: VectorPreset[],
): PresetBundle {
  return { version: "1.0", deploymentId, presets };
}
