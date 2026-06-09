import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

import type { DependenciesResponse, DependencyStep } from "../../types/extension_dependencies";

type SwrState = {
  data: DependenciesResponse | undefined;
  error: unknown;
  isLoading: boolean;
};

const swrState: SwrState = { data: undefined, error: undefined, isLoading: false };
const swrSpy = vi.fn();

vi.mock("swr", () => ({
  default: (key: string) => {
    swrSpy(key);
    return swrState;
  },
}));

vi.mock("../../services/extension_dependencies_client", () => ({
  fetchDependencies: vi.fn(),
}));

import {
  useDependencyReadiness,
  dependenciesSwrKey,
} from "./use_dependency_readiness";

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

function setResponse(partial: Partial<DependenciesResponse>): void {
  swrState.data = {
    steps: [],
    all_satisfied: false,
    total_remaining_bytes: 0,
    ...partial,
  };
  swrState.error = undefined;
  swrState.isLoading = false;
}

describe("useDependencyReadiness", () => {
  beforeEach(() => {
    swrState.data = undefined;
    swrState.error = undefined;
    swrState.isLoading = false;
    swrSpy.mockClear();
  });

  it("AC-8.3: uses the same SWR key as the gate", () => {
    setResponse({ steps: [makeStep({ satisfied: true })], all_satisfied: true });
    renderHook(() => useDependencyReadiness("ext.demo"));

    expect(swrSpy).toHaveBeenCalledWith("/extensions/ext.demo/dependencies");
    expect(dependenciesSwrKey("ext.demo")).toBe("/extensions/ext.demo/dependencies");
  });

  it("ready=true and missingCount=0 when all satisfied", () => {
    setResponse({
      steps: [makeStep({ id: "a", satisfied: true }), makeStep({ id: "b", satisfied: true })],
      all_satisfied: true,
    });
    const { result } = renderHook(() => useDependencyReadiness("ext.demo"));

    expect(result.current.ready).toBe(true);
    expect(result.current.missingCount).toBe(0);
    expect(result.current.total).toBe(2);
    expect(result.current.hasManagedDeps).toBe(true);
  });

  it("counts unsatisfied steps as missing", () => {
    setResponse({
      steps: [makeStep({ id: "a", satisfied: true }), makeStep({ id: "b", satisfied: false })],
      all_satisfied: false,
    });
    const { result } = renderHook(() => useDependencyReadiness("ext.demo"));

    expect(result.current.ready).toBe(false);
    expect(result.current.missingCount).toBe(1);
    expect(result.current.total).toBe(2);
  });

  it("ready=true and hasManagedDeps=false when no steps declared", () => {
    setResponse({ steps: [], all_satisfied: false });
    const { result } = renderHook(() => useDependencyReadiness("ext.demo"));

    expect(result.current.ready).toBe(true);
    expect(result.current.hasManagedDeps).toBe(false);
    expect(result.current.total).toBe(0);
  });

  it("loading state surfaces isLoading without throwing", () => {
    swrState.data = undefined;
    swrState.isLoading = true;
    const { result } = renderHook(() => useDependencyReadiness("ext.demo"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.total).toBe(0);
  });
});
