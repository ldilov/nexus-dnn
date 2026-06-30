export interface PresentedError {
  title: string;
  hint: string;
}

/** Map a worker error code to operator-grade copy. Unknown codes fall back to
 * the raw message so nothing is swallowed. */
const ERROR_COPY: Record<number, PresentedError> = {
  1: {
    title: "Worker failed to start",
    hint: "The Face Avatar worker could not launch. Check that the backend is installed and the GPU is available.",
  },
  2: {
    title: "Input image rejected",
    hint: "The uploaded photo could not be decoded. Use a PNG or JPEG with a clear, front-facing face.",
  },
  73: {
    title: "Out of GPU memory",
    hint: "The Face Avatar worker ran out of VRAM. Lower the identity iters or switch residency to Low VRAM.",
  },
};

export function presentGenerateError(
  code: number | null,
  message: string | null,
): PresentedError {
  if (code !== null && ERROR_COPY[code]) {
    return ERROR_COPY[code] as PresentedError;
  }
  return {
    title: "Generation failed",
    hint: message ?? "The worker reported an unexpected error. Check the logs and try again.",
  };
}
