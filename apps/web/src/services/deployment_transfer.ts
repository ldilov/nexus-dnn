import { apiFetch } from "./api_client";

/**
 * Deployment export/import file transfer. Host-generic: these operate on a
 * deployment by id and carry no extension-specific knowledge. The envelope
 * already bundles each extension's opaque settings (Phase 1).
 */
export interface ExtensionSettingsBundle {
  extension_id: string;
  settings_json: unknown;
  schema_fingerprint: string | null;
}

export interface ExportEnvelope {
  package_version: number;
  deployment: unknown;
  revisions: unknown[];
  extension_settings?: ExtensionSettingsBundle[];
  integrity: { hash_algo: string; digest: string };
}

export interface ImportResult {
  deployment_id: string;
  state: string;
  diagnostics_count: number;
}

export async function exportDeployment(deploymentId: string): Promise<ExportEnvelope> {
  return apiFetch<ExportEnvelope>(`/deployments/${encodeURIComponent(deploymentId)}/export`, {
    method: "POST",
  });
}

/**
 * Import a deployment from an export envelope. `missing_dependencies` is
 * derived host-side from the registry — the client never supplies it.
 */
export async function importDeployment(envelope: ExportEnvelope): Promise<ImportResult> {
  return apiFetch<ImportResult>(`/deployments/import`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ envelope }),
  });
}

export function isExportEnvelope(value: unknown): value is ExportEnvelope {
  if (value === null || typeof value !== "object") return false;
  const v = value as Partial<ExportEnvelope>;
  return (
    typeof v.package_version === "number" &&
    Array.isArray(v.revisions) &&
    v.integrity !== undefined &&
    typeof (v.integrity as { digest?: unknown }).digest === "string"
  );
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Defer revocation — some browsers read the blob asynchronously after
  // click(); revoking synchronously can truncate or empty the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
