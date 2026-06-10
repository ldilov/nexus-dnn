import { cleanup, render } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, test } from "vitest";
import {
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";
import type { PresetSummary } from "../../src/services/types";

const canonical: PresetSummary = {
  id: "svi-canonical",
  label: "Canonical",
  description: "reference-faithful",
  params: {
    width: 832,
    height: 480,
    fps: 16,
    interpolate_fps: 48,
    interpolate_method: "rife",
    num_clips: 6,
    frames_per_clip: 85,
    num_inference_steps: 50,
    cfg_scale: 4.0,
    num_overlap_frame: 5,
    pixel_re_encode: false,
    stitch_mode: "trim",
    blocks_to_swap: 40,
  },
};

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

afterEach(() => {
  captured = null;
  cleanup();
});

describe("RenderRequestProvider default preset application", () => {
  test("catalog-supplied canonical preset params are the store params on first load", () => {
    render(
      <RenderRequestProvider initialPreset={canonical}>
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.presetId).toBe("svi-canonical");
    expect(captured?.presetApplied).toBe(true);
    for (const [key, value] of Object.entries(canonical.params)) {
      expect(captured?.params[key as keyof typeof captured.params], key).toEqual(value);
    }
  });

  test("without a catalog the preset is pending until applyPresetById runs", () => {
    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.presetId).toBe("svi-canonical");
    expect(captured?.presetApplied).toBe(false);

    act(() => captured?.applyPresetById(canonical));
    expect(captured?.presetApplied).toBe(true);
    expect(captured?.params.frames_per_clip).toBe(85);
    expect(captured?.params.num_clips).toBe(6);
    expect(captured?.params.pixel_re_encode).toBe(false);
  });
});

const morph: PresetSummary = {
  id: "flf2v-morph-lowvram",
  label: "FLF2V morph",
  description: "start to end morph",
  params: {
    width: 960,
    height: 544,
    num_clips: 1,
    frames_per_clip: 65,
    cfg_scale: 5.0,
    pixel_re_encode: true,
    adain_factor: 0.1,
    requires_last_image: true,
  },
};

describe("preset switching never leaks the previous preset's keys", () => {
  test("morph → canonical clears requires_last_image, last image and morph-only params", () => {
    render(
      <RenderRequestProvider initialPreset={morph}>
        <Probe />
      </RenderRequestProvider>,
    );
    act(() => captured?.setRefImage("ref.png", "/up/ref.png"));
    act(() => captured?.setLastImage("end.png", "/up/end.png"));
    expect(captured?.params.requires_last_image).toBe(true);

    act(() => captured?.applyPresetById(canonical));
    expect(captured?.params.requires_last_image).toBeFalsy();
    expect(captured?.params.last_image_path).toBeNull();
    expect(captured?.lastImageName).toBeNull();
    expect(captured?.params.width).toBe(832);
    expect(captured?.params.height).toBe(480);
    expect(captured?.params.num_clips).toBe(6);
    expect(captured?.params.pixel_re_encode).toBe(false);
    expect(captured?.params.adain_factor).toBe(0);
    expect(captured?.params.ref_image_path).toBe("/up/ref.png");
  });

  test("canonical → morph keeps an already-uploaded last image", () => {
    render(
      <RenderRequestProvider initialPreset={canonical}>
        <Probe />
      </RenderRequestProvider>,
    );
    act(() => captured?.setLastImage("end.png", "/up/end.png"));
    act(() => captured?.applyPresetById(morph));
    expect(captured?.params.requires_last_image).toBe(true);
    expect(captured?.params.last_image_path).toBe("/up/end.png");
    expect(captured?.params.num_clips).toBe(1);
  });
});
