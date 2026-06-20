import type { InstalledModelsIndex } from "./types";

const INSTALLED_URL = "/api/v1/model-store/installed";

export interface InstalledLora {
  artifactId: string;
  familyId: string;
  filename: string;
  installPath: string;
}

interface InstalledRow {
  role: string;
  format: string;
  install_path: string | null;
  artifact_id: string;
  family_id: string;
  filename: string;
}

interface Envelope<T> {
  success?: boolean;
  data?: T;
}

/**
 * Selectable LoRAs from the installed index: any safetensors (LoRAs aren't
 * always role-tagged — installs predating role capture) plus role=lora.
 * Deduped by family+filename — the index has one row per download job, so a
 * file pulled twice (bundled auto-download + manual Foundry) appears twice.
 */
export function filterLoras(rows: InstalledRow[]): InstalledLora[] {
  const seen = new Set<string>();
  const out: InstalledLora[] = [];
  for (const r of rows) {
    const usable = r.role === "lora" || r.format === "safetensors";
    if (!usable || r.install_path === null || r.install_path.length === 0) {
      continue;
    }
    const key = `${r.family_id}/${r.filename}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push({
      artifactId: r.artifact_id,
      familyId: r.family_id,
      filename: r.filename,
      installPath: r.install_path,
    });
  }
  return out;
}

export async function fetchInstalledLoras(): Promise<InstalledLora[]> {
  const resp = await fetch(INSTALLED_URL, {
    headers: { accept: "application/json" },
  });
  if (!resp.ok) {
    throw new Error(`model-store installed: HTTP ${resp.status}`);
  }
  const body = (await resp.json()) as Envelope<InstalledModelsIndex> | InstalledModelsIndex;
  const index: InstalledModelsIndex =
    "installed" in body ? body : ((body.data as InstalledModelsIndex | undefined) ?? { family_ids: [], installed: [], truncated: false });
  return filterLoras(index.installed);
}
