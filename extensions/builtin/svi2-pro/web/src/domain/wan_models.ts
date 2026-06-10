import type { InstalledModelArtifact } from "../services/types";

export interface Wan22Candidate {
  familyId: string;
  label: string;
  ditHighPath: string;
  ditLowPath: string;
}

const WAN22_RE = /wan[\s._-]?2[._]2/i;
const I2V_RE = /i2v/i;
const HIGH_RE = /high/i;
const LOW_RE = /low/i;
const ALLOWED_FORMATS = new Set(["safetensors", "gguf"]);

function isWan22I2vFile(artifact: InstalledModelArtifact): boolean {
  const haystack = `${artifact.family_id} ${artifact.filename}`;
  return (
    ALLOWED_FORMATS.has(artifact.format) &&
    artifact.install_path !== null &&
    WAN22_RE.test(haystack) &&
    I2V_RE.test(haystack)
  );
}

export function filterWan22Candidates(installed: InstalledModelArtifact[]): Wan22Candidate[] {
  const byFamily = new Map<string, InstalledModelArtifact[]>();
  for (const artifact of installed) {
    if (!isWan22I2vFile(artifact)) continue;
    const group = byFamily.get(artifact.family_id) ?? [];
    byFamily.set(artifact.family_id, [...group, artifact]);
  }

  const candidates: Wan22Candidate[] = [];
  for (const [familyId, artifacts] of byFamily) {
    const high = artifacts.find((a) => HIGH_RE.test(a.filename));
    const low = artifacts.find((a) => LOW_RE.test(a.filename) && a !== high);
    if (!high?.install_path || !low?.install_path) continue;
    candidates.push({
      familyId,
      label: familyId.replace(/^huggingface:/, ""),
      ditHighPath: high.install_path,
      ditLowPath: low.install_path,
    });
  }
  return candidates.sort((a, b) => a.label.localeCompare(b.label));
}
