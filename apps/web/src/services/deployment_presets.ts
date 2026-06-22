import { apiFetch } from "./api_client";
import type { ExportEnvelope, ImportResult } from "./deployment_transfer";

/**
 * Host-owned, recipe-scoped deployment presets. Generic: keyed by the
 * deployment id; the host derives the recipe family server-side. Carries no
 * extension-specific knowledge.
 */
export interface PresetSummary {
  id: string;
  name: string;
  description: string | null;
  recipe_key: string;
  source_extension_id: string | null;
  created_at: string;
  updated_at: string;
}

export async function listPresets(deploymentId: string): Promise<PresetSummary[]> {
  const res = await apiFetch<{ presets: PresetSummary[] }>(
    `/deployments/${encodeURIComponent(deploymentId)}/presets`,
  );
  return res.presets;
}

export async function createPresetFromCurrent(
  deploymentId: string,
  name: string,
  description?: string,
): Promise<PresetSummary> {
  return apiFetch<PresetSummary>(`/deployments/${encodeURIComponent(deploymentId)}/presets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "current", name, description }),
  });
}

export async function createPresetFromEnvelope(
  deploymentId: string,
  name: string,
  envelope: ExportEnvelope,
  description?: string,
): Promise<PresetSummary> {
  return apiFetch<PresetSummary>(`/deployments/${encodeURIComponent(deploymentId)}/presets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "envelope", name, description, envelope }),
  });
}

export async function applyPreset(
  deploymentId: string,
  presetId: string,
): Promise<ImportResult> {
  return apiFetch<ImportResult>(
    `/deployments/${encodeURIComponent(deploymentId)}/presets/${encodeURIComponent(presetId)}/apply`,
    { method: "POST" },
  );
}

export async function renamePreset(
  deploymentId: string,
  presetId: string,
  name: string,
  description?: string,
): Promise<PresetSummary> {
  return apiFetch<PresetSummary>(
    `/deployments/${encodeURIComponent(deploymentId)}/presets/${encodeURIComponent(presetId)}`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, description }),
    },
  );
}

export async function deletePreset(deploymentId: string, presetId: string): Promise<void> {
  await apiFetch<void>(
    `/deployments/${encodeURIComponent(deploymentId)}/presets/${encodeURIComponent(presetId)}`,
    { method: "DELETE" },
  );
}
