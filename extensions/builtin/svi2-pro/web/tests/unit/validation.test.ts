import { describe, expect, test } from "vitest";
import {
  hasBlockingErrors,
  presetRequiresLastImage,
  validateRenderParams,
} from "../../src/domain/validation";
import type { RenderParams } from "../../src/services/types";

function baseParams(overrides: Partial<RenderParams> = {}): RenderParams {
  return {
    ref_image_path: "anchor.png",
    prompts: ["a slow pan across the scene"],
    width: 832,
    height: 480,
    frames_per_clip: 69,
    num_inference_steps: 50,
    cfg_scale: 4.0,
    num_clips: 5,
    ...overrides,
  };
}

describe("validateRenderParams", () => {
  test("returns no errors for canonical params", () => {
    const issues = validateRenderParams(baseParams(), {
      presetId: "svi-canonical",
      hasRefImage: true,
      hasLastImage: false,
    });
    expect(hasBlockingErrors(issues)).toBe(false);
  });

  test("flags missing reference image", () => {
    const issues = validateRenderParams(baseParams({ ref_image_path: "" }), {
      presetId: "svi-canonical",
      hasRefImage: false,
      hasLastImage: false,
    });
    expect(issues.some((i) => i.field === "ref_image_path" && i.severity === "error")).toBe(true);
  });

  test("flags non 4n+1 frames per clip", () => {
    const issues = validateRenderParams(baseParams({ frames_per_clip: 70 }), {
      presetId: "svi-canonical",
      hasRefImage: true,
      hasLastImage: false,
    });
    const frameIssue = issues.find((i) => i.field === "frames_per_clip");
    expect(frameIssue?.severity).toBe("error");
  });

  test("accepts 4n+1 frame counts", () => {
    for (const frames of [49, 65, 69, 81]) {
      const issues = validateRenderParams(baseParams({ frames_per_clip: frames }), {
        presetId: "svi-canonical",
        hasRefImage: true,
        hasLastImage: false,
      });
      expect(issues.some((i) => i.field === "frames_per_clip")).toBe(false);
    }
  });

  test("flags dimensions not divisible by 16", () => {
    const issues = validateRenderParams(baseParams({ width: 833, height: 481 }), {
      presetId: "svi-canonical",
      hasRefImage: true,
      hasLastImage: false,
    });
    expect(issues.some((i) => i.field === "width" && i.severity === "error")).toBe(true);
    expect(issues.some((i) => i.field === "height" && i.severity === "error")).toBe(true);
  });

  test("warns on sub-480p budget without blocking", () => {
    const issues = validateRenderParams(baseParams({ width: 640, height: 368 }), {
      presetId: "svi-canonical-640",
      hasRefImage: true,
      hasLastImage: false,
    });
    expect(issues.some((i) => i.field === "width" && i.severity === "warning")).toBe(true);
    expect(hasBlockingErrors(issues)).toBe(false);
  });

  test("requires last image for flf2v-morph preset", () => {
    expect(presetRequiresLastImage("flf2v-morph-lowvram")).toBe(true);
    const issues = validateRenderParams(baseParams(), {
      presetId: "flf2v-morph-lowvram",
      hasRefImage: true,
      hasLastImage: false,
    });
    expect(issues.some((i) => i.field === "last_image_path" && i.severity === "error")).toBe(true);
  });

  test("flf2v-morph passes when last image present", () => {
    const issues = validateRenderParams(baseParams(), {
      presetId: "flf2v-morph-lowvram",
      hasRefImage: true,
      hasLastImage: true,
    });
    expect(issues.some((i) => i.field === "last_image_path")).toBe(false);
  });

  test("flags out-of-range cfg and steps", () => {
    const issues = validateRenderParams(baseParams({ cfg_scale: 20, num_inference_steps: 200 }), {
      presetId: "svi-canonical",
      hasRefImage: true,
      hasLastImage: false,
    });
    expect(issues.some((i) => i.field === "cfg_scale" && i.severity === "error")).toBe(true);
    expect(issues.some((i) => i.field === "num_inference_steps" && i.severity === "error")).toBe(
      true,
    );
  });
});
