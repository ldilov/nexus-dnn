export const RENDER_ERROR_CODES = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108,
} as const;

interface ErrorPresentation {
  title: string;
  hint: string;
}

const PRESENTATIONS: Record<number, ErrorPresentation> = {
  [RENDER_ERROR_CODES.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry.",
  },
  [RENDER_ERROR_CODES.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies.",
  },
  [RENDER_ERROR_CODES.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks.",
  },
  [RENDER_ERROR_CODES.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them.",
  },
  [RENDER_ERROR_CODES.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings.",
  },
  [RENDER_ERROR_CODES.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset.",
  },
  [RENDER_ERROR_CODES.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details.",
  },
  [RENDER_ERROR_CODES.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion.",
  },
  [RENDER_ERROR_CODES.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result.",
  },
};

export function presentRenderError(
  code: number | null,
  fallbackMessage: string | null,
): ErrorPresentation {
  if (code !== null && PRESENTATIONS[code]) {
    return PRESENTATIONS[code];
  }
  return {
    title: "Render error",
    hint: fallbackMessage ?? "An unknown error occurred during the render.",
  };
}
