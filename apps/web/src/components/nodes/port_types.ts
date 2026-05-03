// audit-allow: hex — neon decorative palette per design lang
export type PortColor = {
  base: string;
  dim: string;
  glow: string;
  label: string;
};

const PORT_COLORS: Record<string, PortColor> = {
  // audit-allow: hex — hex — neon decorative palette per design lang
  text: { base: "#ba9eff", dim: "#8455ef", glow: "rgba(186, 158, 255, 0.45)", label: "text" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  model: { base: "#ff8439", dim: "#c56227", glow: "rgba(255, 132, 57, 0.45)", label: "model" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  json: { base: "#22D3EE", dim: "#0891B2", glow: "rgba(34, 211, 238, 0.45)", label: "json" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  scalar: { base: "#22D3EE", dim: "#0891B2", glow: "rgba(34, 211, 238, 0.45)", label: "scalar" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  image: { base: "#F472B6", dim: "#DB2777", glow: "rgba(244, 114, 182, 0.45)", label: "image" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  audio: { base: "#34D399", dim: "#059669", glow: "rgba(52, 211, 153, 0.45)", label: "audio" },
  // audit-allow: hex — hex — neon decorative palette per design lang
  video: { base: "#21C7D9", dim: "#0E8A97", glow: "rgba(33, 199, 217, 0.45)", label: "video" },
  artifact: {
    // audit-allow: hex — hex — neon decorative palette per design lang
    base: "#F59E0B",
    // audit-allow: hex — hex — neon decorative palette per design lang
    dim: "#B77500",
    glow: "rgba(245, 158, 11, 0.45)",
    label: "artifact",
  },
  // audit-allow: hex — hex — neon decorative palette per design lang
  control: { base: "#A78BFA", dim: "#7C3AED", glow: "rgba(167, 139, 250, 0.45)", label: "control" },
};

const FALLBACK: PortColor = {
  // audit-allow: hex — hex — neon decorative palette per design lang
  base: "#94A3B8",
  // audit-allow: hex — hex — neon decorative palette per design lang
  dim: "#64748B",
  glow: "rgba(148, 163, 184, 0.35)",
  label: "any",
};

export function colorForPortType(portType: string | null | undefined): PortColor {
  if (!portType) return FALLBACK;
  const prefix = portType.split("/")[0] ?? "";
  return PORT_COLORS[prefix] ?? FALLBACK;
}

export function arePortsCompatible(
  sourceType: string | null | undefined,
  targetType: string | null | undefined,
): boolean {
  if (!sourceType || !targetType) return true;
  if (sourceType === "*" || targetType === "*") return true;
  if (sourceType === "any" || targetType === "any") return true;
  return sourceType === targetType;
}
