import { useCallback, useState } from "react";
import { DEFAULT_GRAFT_PARAMS } from "../../domain/defaults";
import type { AlignMode, GraftParams, SeamMode } from "../../services/types";

export interface GraftFormState {
  seam: SeamMode;
  keepHair: boolean;
  blendRing: number;
  align: AlignMode;
  textureBlend: boolean;
}

export const INITIAL_GRAFT_FORM: GraftFormState = {
  seam: DEFAULT_GRAFT_PARAMS.seam ?? "neck",
  keepHair: DEFAULT_GRAFT_PARAMS.keep_hair ?? true,
  blendRing: DEFAULT_GRAFT_PARAMS.blend_ring ?? 0.35,
  align: DEFAULT_GRAFT_PARAMS.align ?? "landmark",
  textureBlend: DEFAULT_GRAFT_PARAMS.texture_blend ?? true,
};

/** Map the UI form state to the wire `GraftParams`. Pure + exported so the
 * param assembly is unit-testable without rendering. Carries the operator
 * defaults for the fields the form does not expose (seed, arc_iters,
 * residency). */
export function assembleGraftParams(form: GraftFormState): GraftParams {
  return {
    ...DEFAULT_GRAFT_PARAMS,
    seam: form.seam,
    keep_hair: form.keepHair,
    blend_ring: clamp01(form.blendRing),
    align: form.align,
    texture_blend: form.textureBlend,
  };
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

export interface GraftFormHandle {
  form: GraftFormState;
  setSeam: (seam: SeamMode) => void;
  setKeepHair: (keep: boolean) => void;
  setBlendRing: (ring: number) => void;
  setAlign: (align: AlignMode) => void;
  setTextureBlend: (blend: boolean) => void;
}

export function useGraftForm(): GraftFormHandle {
  const [form, setForm] = useState<GraftFormState>(INITIAL_GRAFT_FORM);
  const setSeam = useCallback((seam: SeamMode) => setForm((f) => ({ ...f, seam })), []);
  const setKeepHair = useCallback((keepHair: boolean) => setForm((f) => ({ ...f, keepHair })), []);
  const setBlendRing = useCallback((blendRing: number) => setForm((f) => ({ ...f, blendRing })), []);
  const setAlign = useCallback((align: AlignMode) => setForm((f) => ({ ...f, align })), []);
  const setTextureBlend = useCallback(
    (textureBlend: boolean) => setForm((f) => ({ ...f, textureBlend })),
    [],
  );
  return { form, setSeam, setKeepHair, setBlendRing, setAlign, setTextureBlend };
}
