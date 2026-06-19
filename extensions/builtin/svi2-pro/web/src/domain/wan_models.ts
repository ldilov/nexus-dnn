import type { InstalledModelArtifact } from "../services/types";

export interface BaseModelCandidate {
  id: string;
  label: string;
  ditHighPath: string;
  ditLowPath: string;
  singleFile: boolean;
}

const HIGH_RE = /high/i;
const LOW_RE = /low/i;
const ALLOWED_FORMATS = new Set(["safetensors", "gguf"]);

function stripScheme(familyId: string): string {
  return familyId.replace(/^[a-z0-9_]+:/i, "");
}

function basename(path: string): string {
  const parts = path.split(/[\\/]/);
  return parts[parts.length - 1] || path;
}

function isUsable(artifact: InstalledModelArtifact): boolean {
  return ALLOWED_FORMATS.has(artifact.format) && artifact.install_path !== null;
}

/**
 * List every installed safetensors/gguf as a selectable base model.
 *
 * A Wan2.2 high/low pair within one family collapses into a single two-expert
 * candidate. Every other usable file (including a lone Wan file or any other
 * safetensors/gguf) becomes a single-file candidate whose high and low DiT paths
 * are identical — the worker loads it once and reuses it for both denoise tiers.
 * The list is intentionally unfiltered by name: it is the operator's choice what
 * to drive the pipeline with.
 */
export interface ExpertFileOption {
  value: string;
  label: string;
}

/** Flat list of every installed usable file, for the independent High/Low
 * expert pickers. Each option's value is its install path; the bundled default
 * is offered separately by the picker (it resolves per-tier, not as a file). */
export function listExpertFiles(installed: InstalledModelArtifact[]): ExpertFileOption[] {
  return installed
    .filter((a) => isUsable(a) && a.install_path)
    .map((a) => ({
      value: a.install_path as string,
      label: `${basename(a.filename)}${a.family_id ? ` (${stripScheme(a.family_id)})` : ""}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function listBaseModelCandidates(
  installed: InstalledModelArtifact[],
): BaseModelCandidate[] {
  const byFamily = new Map<string, InstalledModelArtifact[]>();
  for (const artifact of installed) {
    if (!isUsable(artifact)) continue;
    const group = byFamily.get(artifact.family_id) ?? [];
    byFamily.set(artifact.family_id, [...group, artifact]);
  }

  const candidates: BaseModelCandidate[] = [];
  for (const [familyId, artifacts] of byFamily) {
    const consumed = new Set<InstalledModelArtifact>();
    const high = artifacts.find((a) => HIGH_RE.test(a.filename));
    const low = artifacts.find((a) => LOW_RE.test(a.filename) && a !== high);
    if (high?.install_path && low?.install_path) {
      candidates.push({
        id: `pair:${familyId}`,
        label: stripScheme(familyId),
        ditHighPath: high.install_path,
        ditLowPath: low.install_path,
        singleFile: false,
      });
      consumed.add(high);
      consumed.add(low);
    }
    for (const artifact of artifacts) {
      if (consumed.has(artifact) || artifact.install_path === null) continue;
      candidates.push({
        id: artifact.install_path,
        label: basename(artifact.filename),
        ditHighPath: artifact.install_path,
        ditLowPath: artifact.install_path,
        singleFile: true,
      });
    }
  }
  return candidates.sort((a, b) => a.label.localeCompare(b.label));
}
