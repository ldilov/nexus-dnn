import type { ComponentMetadata } from "../../services/ui_catalog";

export function deriveSnippets(
  selected: ComponentMetadata | null,
  propValues: Record<string, unknown>,
): { yaml: string; tag: string | null } {
  if (!selected) return { yaml: "", tag: null };
  const lines: string[] = [`type: ${selected.name}`];
  const entries = Object.entries(propValues).filter(([, v]) => v !== undefined);
  if (entries.length > 0) {
    lines.push("props:");
    for (const [k, v] of entries) {
      lines.push(`  ${k}: ${formatYamlValue(v)}`);
    }
  }
  const yaml = lines.join("\n") + "\n";
  const tag = selected.examples.find((e) => e.tag !== null)?.tag ?? null;
  return { yaml, tag };
}

function formatYamlValue(v: unknown): string {
  if (v === null) return "null";
  if (typeof v === "string") {
    if (/[:#\[\]{},&*!|>'"%@`\n]/.test(v) || v.trim() !== v || v === "") {
      return JSON.stringify(v);
    }
    return v;
  }
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "null";
  }
}
