import { describe, expect, it } from "vitest";
import { filterLoras } from "../../src/services/installed_loras";

describe("filterLoras", () => {
  it("keeps any safetensors or role=lora with an install_path", () => {
    const out = filterLoras([
      // safetensors but role=other (predates role tagging) → kept (relaxed)
      { role: "other", format: "safetensors", install_path: "/m/x.safetensors", artifact_id: "a", family_id: "f", filename: "x.safetensors" },
      // gguf, not a lora → dropped
      { role: "primary", format: "gguf", install_path: "/m/y.gguf", artifact_id: "b", family_id: "g", filename: "y.gguf" },
      // role=lora even though gguf → kept
      { role: "lora", format: "gguf", install_path: "/m/g.gguf", artifact_id: "c", family_id: "h", filename: "g.gguf" },
      // safetensors but no path → dropped
      { role: "lora", format: "safetensors", install_path: null, artifact_id: "d", family_id: "i", filename: "z.safetensors" },
    ]);
    expect(out.map((o) => o.artifactId)).toEqual(["a", "c"]);
  });

  it("maps fields to camelCase InstalledLora", () => {
    const out = filterLoras([
      { role: "lora", format: "safetensors", install_path: "/p/q.safetensors", artifact_id: "art1", family_id: "fam1", filename: "q.safetensors" },
    ]);
    expect(out[0]).toEqual({
      artifactId: "art1",
      familyId: "fam1",
      filename: "q.safetensors",
      installPath: "/p/q.safetensors",
    });
  });

  it("drops non-safetensors that are not role=lora", () => {
    const out = filterLoras([
      { role: "vae", format: "gguf", install_path: "/v/v.gguf", artifact_id: "v1", family_id: "f", filename: "v.gguf" },
    ]);
    expect(out).toHaveLength(0);
  });

  it("returns empty array for empty input", () => {
    expect(filterLoras([])).toHaveLength(0);
  });

  it("dedups same family+filename pulled by two download jobs (keeps first)", () => {
    const out = filterLoras([
      { role: "lora", format: "safetensors", install_path: "/jobA/l.safetensors", artifact_id: "a", family_id: "fam", filename: "l.safetensors" },
      { role: "lora", format: "safetensors", install_path: "/jobB/l.safetensors", artifact_id: "b", family_id: "fam", filename: "l.safetensors" },
    ]);
    expect(out.map((o) => o.artifactId)).toEqual(["a"]);
  });

  it("keeps same filename from different families (distinct files)", () => {
    const out = filterLoras([
      { role: "lora", format: "safetensors", install_path: "/r1/model.safetensors", artifact_id: "a", family_id: "repo1", filename: "model.safetensors" },
      { role: "lora", format: "safetensors", install_path: "/r2/model.safetensors", artifact_id: "b", family_id: "repo2", filename: "model.safetensors" },
    ]);
    expect(out.map((o) => o.artifactId)).toEqual(["a", "b"]);
  });
});
