import { describe, expect, test } from "vitest";
import { listBaseModelCandidates } from "../../src/domain/wan_models";
import type { InstalledModelArtifact } from "../../src/services/types";

function artifact(overrides: Partial<InstalledModelArtifact>): InstalledModelArtifact {
  return {
    artifact_id: "a",
    family_id: "huggingface:acme/Wan2.2-I2V-A14B-pack",
    variant_id: null,
    format: "safetensors",
    filename: "wan2.2-i2v-high.safetensors",
    size_bytes: 1,
    source_repo: "acme/Wan2.2-I2V-A14B-pack",
    install_path: "/sink/job/wan2.2-i2v-high.safetensors",
    ...overrides,
  };
}

describe("listBaseModelCandidates", () => {
  test("a family with a high/low pair collapses into one two-expert candidate", () => {
    const candidates = listBaseModelCandidates([
      artifact({ artifact_id: "h" }),
      artifact({
        artifact_id: "l",
        filename: "wan2.2-i2v-low.safetensors",
        install_path: "/sink/job/wan2.2-i2v-low.safetensors",
      }),
    ]);
    expect(candidates).toHaveLength(1);
    const [pair] = candidates;
    expect(pair?.singleFile).toBe(false);
    expect(pair?.id).toBe("pair:huggingface:acme/Wan2.2-I2V-A14B-pack");
    expect(pair?.ditHighPath).toBe("/sink/job/wan2.2-i2v-high.safetensors");
    expect(pair?.ditLowPath).toBe("/sink/job/wan2.2-i2v-low.safetensors");
    expect(pair?.label).toBe("acme/Wan2.2-I2V-A14B-pack");
  });

  test("a lone file becomes a single-file candidate with identical high/low paths", () => {
    const candidates = listBaseModelCandidates([
      artifact({
        family_id: "direct_url:smooth-mix-wan2.2-14b.safetensors",
        filename: "smooth-mix-wan2.2-14b.safetensors",
        install_path: "/sink/job/smooth-mix-wan2.2-14b.safetensors",
      }),
    ]);
    expect(candidates).toHaveLength(1);
    const [single] = candidates;
    expect(single?.singleFile).toBe(true);
    expect(single?.id).toBe("/sink/job/smooth-mix-wan2.2-14b.safetensors");
    expect(single?.ditHighPath).toBe("/sink/job/smooth-mix-wan2.2-14b.safetensors");
    expect(single?.ditLowPath).toBe(single?.ditHighPath);
    expect(single?.label).toBe("smooth-mix-wan2.2-14b.safetensors");
  });

  test("any safetensors/gguf is listed regardless of name (operator's choice)", () => {
    const candidates = listBaseModelCandidates([
      artifact({ family_id: "hf:x/SDXL", filename: "sdxl_base.safetensors", install_path: "/m/sdxl.safetensors" }),
      artifact({ family_id: "hf:x/some-merge", filename: "merge.gguf", format: "gguf", install_path: "/m/merge.gguf" }),
    ]);
    expect(candidates.map((c) => c.label).sort()).toEqual(["merge.gguf", "sdxl_base.safetensors"]);
    expect(candidates.every((c) => c.singleFile)).toBe(true);
  });

  test("pathless and unsupported-format artifacts are excluded", () => {
    const candidates = listBaseModelCandidates([
      artifact({ install_path: null }),
      artifact({ format: "pytorch_bin", install_path: "/m/x.bin" }),
    ]);
    expect(candidates).toHaveLength(0);
  });

  test("ids are unique for two single files sharing a family id", () => {
    const candidates = listBaseModelCandidates([
      artifact({ family_id: "hf:x/pack", filename: "a.safetensors", install_path: "/m/a.safetensors" }),
      artifact({ family_id: "hf:x/pack", filename: "b.safetensors", install_path: "/m/b.safetensors" }),
    ]);
    expect(candidates).toHaveLength(2);
    const ids = new Set(candidates.map((c) => c.id));
    expect(ids.size).toBe(2);
  });

  test("a paired family with an extra loose file yields the pair plus a single", () => {
    const candidates = listBaseModelCandidates([
      artifact({ artifact_id: "h", filename: "wan2.2-i2v-high.safetensors", install_path: "/m/high.safetensors" }),
      artifact({ artifact_id: "l", filename: "wan2.2-i2v-low.safetensors", install_path: "/m/low.safetensors" }),
      artifact({ artifact_id: "v", filename: "vae.safetensors", install_path: "/m/vae.safetensors" }),
    ]);
    expect(candidates.filter((c) => !c.singleFile)).toHaveLength(1);
    expect(candidates.filter((c) => c.singleFile).map((c) => c.label)).toEqual(["vae.safetensors"]);
  });
});
