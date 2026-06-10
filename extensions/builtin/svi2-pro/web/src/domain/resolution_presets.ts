import type { PresetSummary, RenderParams } from "../services/types";

export const CUSTOM_RESOLUTION = "custom" as const;

export interface ResolutionOption {
  id: string;
  width: number;
  height: number;
  label: string;
  sub: string;
  stepsDown: number;
  offDistribution: boolean;
}

const STEP_SOURCES: Array<{
  presetId: string;
  label: string;
  sub: string;
  stepsDown: number;
  offDistribution: boolean;
}> = [
  {
    presetId: "svi-canonical",
    label: "Native",
    sub: "SVI 2.0 Pro 480p training budget",
    stepsDown: 0,
    offDistribution: false,
  },
  {
    presetId: "svi-canonical-704",
    label: "One step down",
    sub: "Mild downscale from native",
    stepsDown: 1,
    offDistribution: true,
  },
  {
    presetId: "svi-canonical-640",
    label: "Two steps down",
    sub: "Below 480p training budget",
    stepsDown: 2,
    offDistribution: true,
  },
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
      sub: source.sub,
      stepsDown: source.stepsDown,
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
