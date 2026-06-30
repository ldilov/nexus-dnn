import { describe, expect, test } from "vitest";
import { DEFAULT_GRAFT_PARAMS } from "../../src/domain/defaults";
import {
  assembleGraftParams,
  INITIAL_GRAFT_FORM,
} from "../../src/views/head-refine/use_graft_form";

describe("assembleGraftParams", () => {
  test("maps the initial form to the operator defaults", () => {
    // Arrange / Act
    const params = assembleGraftParams(INITIAL_GRAFT_FORM);
    // Assert
    expect(params.seam).toBe(DEFAULT_GRAFT_PARAMS.seam);
    expect(params.keep_hair).toBe(DEFAULT_GRAFT_PARAMS.keep_hair);
    expect(params.align).toBe(DEFAULT_GRAFT_PARAMS.align);
    expect(params.texture_blend).toBe(DEFAULT_GRAFT_PARAMS.texture_blend);
    expect(params.blend_ring).toBe(DEFAULT_GRAFT_PARAMS.blend_ring);
    expect(params.arc_iters).toBe(DEFAULT_GRAFT_PARAMS.arc_iters);
    expect(params.residency).toBe(DEFAULT_GRAFT_PARAMS.residency);
  });

  test("carries user edits into the wire shape", () => {
    const params = assembleGraftParams({
      seam: "hairline",
      keepHair: false,
      blendRing: 0.7,
      align: "manual",
      textureBlend: false,
    });
    expect(params.seam).toBe("hairline");
    expect(params.keep_hair).toBe(false);
    expect(params.blend_ring).toBe(0.7);
    expect(params.align).toBe("manual");
    expect(params.texture_blend).toBe(false);
  });

  test("clamps blend_ring into 0..1", () => {
    expect(assembleGraftParams({ ...INITIAL_GRAFT_FORM, blendRing: 1.8 }).blend_ring).toBe(1);
    expect(assembleGraftParams({ ...INITIAL_GRAFT_FORM, blendRing: -0.4 }).blend_ring).toBe(0);
    expect(assembleGraftParams({ ...INITIAL_GRAFT_FORM, blendRing: Number.NaN }).blend_ring).toBe(0);
  });
});
