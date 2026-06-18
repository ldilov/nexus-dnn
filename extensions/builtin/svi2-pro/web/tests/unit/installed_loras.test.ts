import { describe, expect, it } from "vitest";
import { filterLoras } from "../../src/services/installed_loras";

describe("filterLoras", () => {
  it("keeps only role=lora with an install_path", () => {
    const out = filterLoras([
      { role: "lora", install_path: "/m/x.safetensors", artifact_id: "a", family_id: "f", filename: "x.safetensors" },
      { role: "primary", install_path: "/m/y.gguf", artifact_id: "b", family_id: "g", filename: "y.gguf" },
      { role: "lora", install_path: null, artifact_id: "c", family_id: "h", filename: "z.safetensors" },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]?.installPath).toBe("/m/x.safetensors");
  });

  it("maps fields to camelCase InstalledLora", () => {
    const out = filterLoras([
      { role: "lora", install_path: "/p/q.safetensors", artifact_id: "art1", family_id: "fam1", filename: "q.safetensors" },
    ]);
    expect(out[0]).toEqual({
      artifactId: "art1",
      familyId: "fam1",
      filename: "q.safetensors",
      installPath: "/p/q.safetensors",
    });
  });

  it("returns empty array when no loras are present", () => {
    const out = filterLoras([
      { role: "vae", install_path: "/v/v.safetensors", artifact_id: "v1", family_id: "f", filename: "v.safetensors" },
    ]);
    expect(out).toHaveLength(0);
  });

  it("returns empty array for empty input", () => {
    expect(filterLoras([])).toHaveLength(0);
  });
});
