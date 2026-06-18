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
  install_path: string | null;
  artifact_id: string;
  family_id: string;
  filename: string;
}

interface Envelope<T> {
  success?: boolean;
  data?: T;
}

export function filterLoras(rows: InstalledRow[]): InstalledLora[] {
  return rows
    .filter((r) => r.role === "lora" && r.install_path !== null && r.install_path.length > 0)
    .map((r) => ({
      artifactId: r.artifact_id,
      familyId: r.family_id,
      filename: r.filename,
      installPath: r.install_path as string,
    }));
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
