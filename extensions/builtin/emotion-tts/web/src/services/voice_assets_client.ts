import { apiFetch, EXTENSION_PREFIX } from "./http";

export interface VoiceAsset {
  voiceAssetId: string;
  deploymentId: string;
  displayName: string;
  kind: "speaker" | "emotion" | "mixed";
  audioArtifactRef: string;
  contentSha256: string;
  referenceText?: string | null;
  sampleRate?: number | null;
  durationMs?: number | null;
  sourceType: "upload" | "import" | "recording" | "artifact_ref";
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ProbeResult {
  durationMs: number;
  sampleRate?: number | null;
  channels?: number | null;
  warnings: Array<"too_short" | "too_long" | "long" | "very_long">;
}

export async function listVoiceAssets(deploymentId: string): Promise<{ voiceAssets: VoiceAsset[] }> {
  return apiFetch(`/voice-assets?deploymentId=${encodeURIComponent(deploymentId)}`);
}

export async function uploadVoiceAsset(
  deploymentId: string,
  file: File,
  displayName: string,
  kind: VoiceAsset["kind"],
  referenceText?: string,
): Promise<VoiceAsset> {
  const form = new FormData();
  form.append("deploymentId", deploymentId);
  form.append("displayName", displayName);
  form.append("kind", kind);
  if (referenceText) form.append("referenceText", referenceText);
  form.append("audio", file);
  const resp = await fetch(`${EXTENSION_PREFIX}/voice-assets`, {
    method: "POST",
    body: form,
  });
  if (!resp.ok) {
    throw new Error(`upload failed: ${resp.status}`);
  }
  return (await resp.json()) as VoiceAsset;
}

export async function deactivateVoiceAsset(
  deploymentId: string,
  voiceAssetId: string,
): Promise<void> {
  await apiFetch(
    `/voice-assets/${voiceAssetId}?deploymentId=${encodeURIComponent(deploymentId)}`,
    { method: "DELETE" },
  );
}

export async function renameVoiceAsset(
  deploymentId: string,
  voiceAssetId: string,
  displayName: string,
): Promise<VoiceAsset> {
  return apiFetch<VoiceAsset>(
    `/voice-assets/${voiceAssetId}?deploymentId=${encodeURIComponent(deploymentId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName }),
    },
  );
}

/**
 * Build a stream URL the browser can hand to a `<audio>` element. The
 * extension's GET `/voice-assets/{id}/audio` endpoint streams the underlying
 * audio regardless of the host's chosen storage scheme (file://, artifact://,
 * cloud blob, etc.) — so the browser never needs to know how it's stored.
 *
 * Returns `null` only when the asset has no `audioArtifactRef` (genuinely
 * unavailable) so callers can render a "preview unavailable" affordance.
 */
export function getVoiceAssetStreamUrl(asset: VoiceAsset): string | null {
  if (!asset.audioArtifactRef) return null;
  const params = new URLSearchParams({ deploymentId: asset.deploymentId });
  return `${EXTENSION_PREFIX}/voice-assets/${encodeURIComponent(asset.voiceAssetId)}/audio?${params.toString()}`;
}

export async function probeVoiceAsset(artifactRef: string): Promise<ProbeResult> {
  return apiFetch("/voice-assets/probe", {
    method: "POST",
    body: JSON.stringify({ artifactRef }),
  });
}
