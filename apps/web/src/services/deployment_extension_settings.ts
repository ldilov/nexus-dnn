import { apiFetch } from "./api_client";

/**
 * Generic host contract for per-deployment, per-extension settings. The host
 * persists `settings` as an opaque JSON blob keyed by `(deploymentId,
 * extensionId)` and never interprets its shape, so this client is reusable by
 * ANY extension UI — it carries no extension-specific knowledge.
 */
export interface DeploymentExtensionSettings<T = Record<string, unknown>> {
  deployment_id: string;
  extension_id: string;
  settings: T;
  schema_fingerprint: string | null;
  /** `null` when no settings row exists yet for this pair (vs. an empty blob). */
  updated_at: string | null;
}

function settingsPath(deploymentId: string, extensionId: string): string {
  return `/deployments/${encodeURIComponent(deploymentId)}/extension-settings/${encodeURIComponent(extensionId)}`;
}

export async function fetchDeploymentExtensionSettings<T = Record<string, unknown>>(
  deploymentId: string,
  extensionId: string,
): Promise<DeploymentExtensionSettings<T>> {
  return apiFetch<DeploymentExtensionSettings<T>>(settingsPath(deploymentId, extensionId));
}

export async function putDeploymentExtensionSettings<T = Record<string, unknown>>(
  deploymentId: string,
  extensionId: string,
  settings: T,
  schemaFingerprint?: string | null,
): Promise<DeploymentExtensionSettings<T>> {
  return apiFetch<DeploymentExtensionSettings<T>>(settingsPath(deploymentId, extensionId), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ settings, schema_fingerprint: schemaFingerprint ?? null }),
  });
}

export async function deleteDeploymentExtensionSettings(
  deploymentId: string,
  extensionId: string,
): Promise<void> {
  await apiFetch<void>(settingsPath(deploymentId, extensionId), { method: "DELETE" });
}
