import { describe, expect, test } from "vitest";
import { filterWan22Candidates } from "../../src/domain/wan_models";
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

describe("filterWan22Candidates", () => {
  test("a family with a high/low Wan2.2 i2v pair qualifies", () => {
    const candidates = filterWan22Candidates([
      artifact({ artifact_id: "h" }),
      artifact({
        artifact_id: "l",
        filename: "wan2.2-i2v-low.safetensors",
        install_path: "/sink/job/wan2.2-i2v-low.safetensors",
      }),
    ]);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]?.ditHighPath).toBe("/sink/job/wan2.2-i2v-high.safetensors");
    expect(candidates[0]?.ditLowPath).toBe("/sink/job/wan2.2-i2v-low.safetensors");
    expect(candidates[0]?.label).toBe("acme/Wan2.2-I2V-A14B-pack");
  });

  test("family id naming variants match (Wan 2.2 / wan_2.2 / Wan2_2)", () => {
    for (const family of ["hf:x/Wan 2.2-I2V", "hf:x/wan_2.2-i2v", "hf:x/Wan2_2-I2V"]) {
      const candidates = filterWan22Candidates([
        artifact({ artifact_id: "h", family_id: family, filename: "HIGH.safetensors" }),
        artifact({
          artifact_id: "l",
          family_id: family,
          filename: "LOW.safetensors",
          install_path: "/sink/job/low",
        }),
      ]);
      expect(candidates, family).toHaveLength(1);
    }
  });

  test("a family missing the low half does not qualify", () => {
    const candidates = filterWan22Candidates([artifact({})]);
    expect(candidates).toHaveLength(0);
  });

  test("non-wan, non-i2v and pathless artifacts are excluded", () => {
    const candidates = filterWan22Candidates([
      artifact({ family_id: "hf:x/SDXL", filename: "high.safetensors", source_repo: "x/SDXL" }),
      artifact({ family_id: "hf:x/Wan2.2-T2V", filename: "high-t2v.safetensors" }),
      artifact({ install_path: null }),
      artifact({ format: "pytorch_bin" }),
    ]);
    expect(
      candidates.filter((c) => c.familyId !== "huggingface:acme/Wan2.2-I2V-A14B-pack"),
    ).toHaveLength(0);
  });

  test("gguf pairs qualify", () => {
    const candidates = filterWan22Candidates([
      artifact({ artifact_id: "h", format: "gguf", filename: "wan2.2-i2v-HIGH-Q5.gguf" }),
      artifact({
        artifact_id: "l",
        format: "gguf",
        filename: "wan2.2-i2v-LOW-Q5.gguf",
        install_path: "/sink/job/low.gguf",
      }),
    ]);
    expect(candidates).toHaveLength(1);
  });
});
