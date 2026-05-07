export interface VramBudgetInputs {
  modelSizeBytes: number;
  nGpuLayers: number;
  totalLayers: number;
  nCpuMoe: number;
  expertLayerCount: number;
  hostVramBytes?: number | null;
}

export interface VramBudgetEstimate {
  gpuBytesUsed: number;
  gpuBytesRemaining: number | null;
}

export const MOE_FRACTION_OF_MODEL = 0.85;

export function computeVramBudget(inputs: VramBudgetInputs): VramBudgetEstimate {
  const totalLayers = Math.max(1, inputs.totalLayers);
  const expertLayerCount = Math.max(1, inputs.expertLayerCount);
  const gpuLayerFraction = clamp(inputs.nGpuLayers / totalLayers, 0, 1);
  const moeOffloadFraction = clamp(
    (inputs.nCpuMoe / expertLayerCount) * MOE_FRACTION_OF_MODEL,
    0,
    MOE_FRACTION_OF_MODEL,
  );
  const gpuBytesUsed = Math.max(
    0,
    inputs.modelSizeBytes * gpuLayerFraction * (1 - moeOffloadFraction),
  );
  const gpuBytesRemaining =
    inputs.hostVramBytes != null && inputs.hostVramBytes > 0
      ? inputs.hostVramBytes - gpuBytesUsed
      : null;
  return { gpuBytesUsed, gpuBytesRemaining };
}

function clamp(value: number, lo: number, hi: number): number {
  if (Number.isNaN(value)) return lo;
  if (value < lo) return lo;
  if (value > hi) return hi;
  return value;
}
