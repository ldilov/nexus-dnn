import { describe, expect, test } from "vitest";
import { mediaUrlForRef } from "../../src/services/media_url";

describe("mediaUrlForRef", () => {
  test("builds a path-segment media URL under the extension mount", () => {
    expect(mediaUrlForRef("glb-abc")).toBe(
      "/api/v1/extensions/nexus.3d.trellis2/media/glb-abc",
    );
  });

  test("preserves slashes, encodes reserved chars within segments", () => {
    expect(mediaUrlForRef("meshes/a b/out.glb")).toBe(
      "/api/v1/extensions/nexus.3d.trellis2/media/meshes/a%20b/out.glb",
    );
  });

  test("returns null for a null ref", () => {
    expect(mediaUrlForRef(null)).toBeNull();
  });
});
