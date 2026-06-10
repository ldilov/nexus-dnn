import type { RenderParams } from "../services/types";

export interface ValidationIssue {
  field: keyof RenderParams | "general";
  message: string;
  severity: "error" | "warning";
}

const REQUIRES_LAST_IMAGE = new Set(["flf2v-morph-lowvram"]);
const RESOLUTION_BUDGET = 832 * 480;
const SUB_BUDGET_RATIO = 0.85;

export function presetRequiresLastImage(
  presetId: string | null,
  presetParams?: Partial<RenderParams>,
): boolean {
  if (presetParams && typeof presetParams.requires_last_image === "boolean") {
    return presetParams.requires_last_image;
  }
  return presetId !== null && REQUIRES_LAST_IMAGE.has(presetId);
}

export function isFlf2vMode(presetId: string | null, params: Partial<RenderParams>): boolean {
  if (presetRequiresLastImage(presetId, params)) return true;
  return typeof params.last_image_path === "string" && params.last_image_path.length > 0;
}

function isMultipleOf(value: number, base: number): boolean {
  return Number.isFinite(value) && value % base === 0;
}

export function validateRenderParams(
  params: RenderParams,
  options: {
    presetId: string | null;
    hasRefImage: boolean;
    hasLastImage: boolean;
    presetParams?: Partial<RenderParams>;
  },
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const refRequired = (params.mode ?? "image_to_video") !== "text_to_video";
  if (refRequired && (!options.hasRefImage || !params.ref_image_path)) {
    issues.push({
      field: "ref_image_path",
      message: "A reference (anchor) image is required.",
      severity: "error",
    });
  }

  const prompts = params.prompts ?? [];
  const hasPrompt = prompts.some((p) => p.trim().length > 0);
  if (!hasPrompt) {
    issues.push({
      field: "prompts",
      message: "At least one prompt is required.",
      severity: "error",
    });
  }

  const frames = params.frames_per_clip ?? 81;
  if ((frames - 1) % 4 !== 0) {
    issues.push({
      field: "frames_per_clip",
      message: `Frames per clip must be 4n+1 (got ${frames}). Try ${frames - ((frames - 1) % 4)}.`,
      severity: "error",
    });
  }

  const width = params.width ?? 480;
  const height = params.height ?? 832;
  if (!isMultipleOf(width, 16)) {
    issues.push({
      field: "width",
      message: `Width must be divisible by 16 (got ${width}).`,
      severity: "error",
    });
  }
  if (!isMultipleOf(height, 16)) {
    issues.push({
      field: "height",
      message: `Height must be divisible by 16 (got ${height}).`,
      severity: "error",
    });
  }

  const steps = params.num_inference_steps ?? 50;
  if (steps < 1 || steps > 100) {
    issues.push({
      field: "num_inference_steps",
      message: "Steps must be between 1 and 100.",
      severity: "error",
    });
  }

  const cfg = params.cfg_scale ?? 5.0;
  if (cfg < 1 || cfg > 12) {
    issues.push({
      field: "cfg_scale",
      message: "Guidance (CFG) must be between 1 and 12.",
      severity: "error",
    });
  }

  const clips = params.num_clips;
  if (clips !== undefined && clips < 1) {
    issues.push({
      field: "num_clips",
      message: "Clips must be at least 1.",
      severity: "error",
    });
  }

  if (presetRequiresLastImage(options.presetId, options.presetParams) && !options.hasLastImage) {
    issues.push({
      field: "last_image_path",
      message: "This preset (FLF2V morph) requires a last-image keyframe.",
      severity: "error",
    });
  }

  if (isFlf2vMode(options.presetId, params) && clips !== undefined && clips > 1) {
    issues.push({
      field: "num_clips",
      message: `FLF2V (last-image morph) requires exactly 1 clip (got ${clips}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
      severity: "error",
    });
  }

  if (Number.isFinite(width) && Number.isFinite(height)) {
    const budget = width * height;
    if (budget < RESOLUTION_BUDGET * SUB_BUDGET_RATIO) {
      issues.push({
        field: "width",
        message: `${width}×${height} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
        severity: "warning",
      });
    }
  }

  return issues;
}

export function hasBlockingErrors(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}
