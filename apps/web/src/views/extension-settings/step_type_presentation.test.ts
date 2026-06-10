import { describe, it, expect } from "vitest";

import type { DependencyStep } from "../../types/extension_dependencies";
import { buildStepGroups, stepGroupFor } from "./step_type_presentation";

function makeStep(overrides: Partial<DependencyStep> = {}): DependencyStep {
  return {
    id: "s1",
    type: "runtime",
    requires: [],
    status: "pending",
    satisfied: false,
    artifact: null,
    last_error: null,
    progress: null,
    estimated_remaining_bytes: 0,
    ...overrides,
  };
}

describe("stepGroupFor", () => {
  it("maps toolchain types (runtime, system_binary, package_set) to toolchain", () => {
    for (const type of ["runtime", "system_binary", "package_set"]) {
      expect(stepGroupFor(makeStep({ type }))).toBe("toolchain");
    }
  });

  it("maps model_artifact to model_weights and validation to validation", () => {
    expect(stepGroupFor(makeStep({ type: "model_artifact" }))).toBe("model_weights");
    expect(stepGroupFor(makeStep({ type: "validation" }))).toBe("validation");
  });

  it("maps an unknown step type into the toolchain group", () => {
    expect(stepGroupFor(makeStep({ type: "mystery_future_type" }))).toBe("toolchain");
  });
});

describe("buildStepGroups", () => {
  const fullPlan: DependencyStep[] = [
    makeStep({ id: "python", type: "runtime" }),
    makeStep({ id: "ffmpeg", type: "system_binary" }),
    makeStep({ id: "pkgs", type: "package_set" }),
    makeStep({
      id: "model_a",
      type: "model_artifact",
      files_present: 1,
      files_total: 2,
      estimated_remaining_bytes: 2_147_483_648,
    }),
    makeStep({
      id: "model_b",
      type: "model_artifact",
      files_present: 0,
      files_total: 15,
      estimated_remaining_bytes: 3_221_225_472,
    }),
    makeStep({ id: "validate", type: "validation" }),
  ];

  it("splits the plan into ordered, sequentially numbered groups", () => {
    const groups = buildStepGroups(fullPlan);
    expect(groups.map((g) => g.id)).toEqual(["toolchain", "model_weights", "validation"]);
    expect(groups.map((g) => g.index)).toEqual(["01", "02", "03"]);
    expect(groups.map((g) => g.title)).toEqual(["Toolchain", "Model weights", "Validation"]);
  });

  it("preserves host step order within each group", () => {
    const groups = buildStepGroups(fullPlan);
    expect(groups[0]!.steps.map((s) => s.id)).toEqual(["python", "ffmpeg", "pkgs"]);
    expect(groups[1]!.steps.map((s) => s.id)).toEqual(["model_a", "model_b"]);
  });

  it("omits empty groups and renumbers the remaining ones", () => {
    const groups = buildStepGroups([
      makeStep({ id: "python", type: "runtime" }),
      makeStep({ id: "validate", type: "validation" }),
    ]);
    expect(groups.map((g) => g.id)).toEqual(["toolchain", "validation"]);
    expect(groups.map((g) => g.index)).toEqual(["01", "02"]);
  });

  it("toolchain/validation meta is a step count with singular/plural handling", () => {
    const groups = buildStepGroups(fullPlan);
    expect(groups[0]!.meta).toBe("3 steps");
    expect(groups[2]!.meta).toBe("1 step");
  });

  it("model meta aggregates items, file fractions, and remaining download bytes", () => {
    const groups = buildStepGroups(fullPlan);
    expect(groups[1]!.meta).toBe("2 items · 1/17 files · 5.0 GB to download");
  });

  it("model meta switches to on-disk bytes when every model step is satisfied", () => {
    const satisfied: DependencyStep[] = [
      makeStep({
        id: "model_a",
        type: "model_artifact",
        status: "ok",
        satisfied: true,
        files_present: 2,
        files_total: 2,
        estimated_remaining_bytes: 0,
        artifact: { path: "/m/a", bytes_placed: 2_147_483_648, summary: "weights" },
      }),
      makeStep({
        id: "model_b",
        type: "model_artifact",
        status: "ok",
        satisfied: true,
        files_present: 15,
        files_total: 15,
        estimated_remaining_bytes: 0,
        artifact: { path: "/m/b", bytes_placed: 4_294_967_296, summary: "weights" },
      }),
    ];
    const groups = buildStepGroups(satisfied);
    expect(groups[0]!.meta).toBe("2 items · 17/17 files · 6.0 GB on disk");
  });

  it("model meta omits the files fraction when no step reports file counts", () => {
    const groups = buildStepGroups([
      makeStep({ id: "m", type: "model_artifact", estimated_remaining_bytes: 1_073_741_824 }),
    ]);
    expect(groups[0]!.meta).toBe("1 item · 1.0 GB to download");
  });
});
