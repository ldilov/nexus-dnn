import { describe, expect, test } from "vitest";
import { mediaUrlForRef } from "../../src/services/media_url";

describe("mediaUrlForRef", () => {
  test("builds a path-segment media URL under the extension mount", () => {
    expect(mediaUrlForRef("glb-abc")).toBe(
      "/api/v1/extensions/nexus.3d.trellis2/media/glb-abc",
    );
  });

  test("encodes refs with reserved characters", () => {
    expect(mediaUrlForRef("a/b c")).toBe(
      "/api/v1/extensions/nexus.3d.trellis2/media/a%2Fb%20c",
    );
  });

  test("returns null for a null ref", () => {
    expect(mediaUrlForRef(null)).toBeNull();
  });
});
