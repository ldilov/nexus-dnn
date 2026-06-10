import type { PresetSummary, RenderParams } from "../services/types";

export const CUSTOM_RESOLUTION = "custom" as const;

export interface ResolutionOption {
  id: string;
  width: number;
  height: number;
  label: string;
  offDistribution: boolean;
}

const STEP_SOURCES: Array<{ presetId: string; label: string; offDistribution: boolean }> = [
  {
    presetId: "svi-canonical",
    label: "Native — SVI 2.0 Pro 480p training budget",
    offDistribution: false,
  },
  { presetId: "svi-canonical-704", label: "One step down", offDistribution: true },
  { presetId: "svi-canonical-640", label: "Two steps down", offDistribution: true },
];

export function buildResolutionOptions(presets: PresetSummary[]): ResolutionOption[] {
  const byId = new Map(presets.map((p) => [p.id, p]));
  const options: ResolutionOption[] = [];
  for (const source of STEP_SOURCES) {
    const preset = byId.get(source.presetId);
    const width = preset?.params.width;
    const height = preset?.params.height;
    if (!width || !height) continue;
    options.push({
      id: source.presetId,
      width,
      height,
      label: source.label,
      offDistribution: source.offDistribution,
    });
  }
  return options;
}

export function matchResolutionOption(
  params: Partial<RenderParams>,
  options: ResolutionOption[],
): string | typeof CUSTOM_RESOLUTION {
  const match = options.find(
    (option) => option.width === params.width && option.height === params.height,
  );
  return match ? match.id : CUSTOM_RESOLUTION;
}
