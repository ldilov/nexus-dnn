import { type ReactElement, useCallback, useMemo } from "react";
import useSWR from "swr";
import {
  BUNDLED_BASE_MODEL_LABEL,
  SVI_LORA_TIER_OPTIONS,
} from "../../../domain/settings_defaults";
import { listBaseModelCandidates } from "../../../domain/wan_models";
import { listInstalledModels } from "../../../services/model_store_client";
import { saveSettings } from "../../../services/settings_client";
import type { SviLoraTier } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

const BUNDLED_VALUE = "__bundled__";

export function BaseModelSelect(): ReactElement {
  const { params, settings, updateParam, setSettings } = useRenderRequest();
  const installedQuery = useSWR("svi2/installed-models", listInstalledModels);

  const candidates = useMemo(
    () => listBaseModelCandidates(installedQuery.data?.installed ?? []),
    [installedQuery.data],
  );

  const selected =
    candidates.find(
      (c) => c.ditHighPath === params.dit_high_path && c.ditLowPath === params.dit_low_path,
    )?.id ?? BUNDLED_VALUE;

  const handleChange = useCallback(
    (value: string) => {
      const candidate = candidates.find((c) => c.id === value);
      const next = candidate
        ? {
            ...settings,
            baseModelFamilyId: candidate.id,
            ditHighPath: candidate.ditHighPath,
            ditLowPath: candidate.ditLowPath,
          }
        : { ...settings, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      updateParam("dit_high_path", candidate ? candidate.ditHighPath : undefined);
      updateParam("dit_low_path", candidate ? candidate.ditLowPath : undefined);
      setSettings(next);
      void saveSettings(next).catch(() => undefined);
    },
    [candidates, settings, updateParam, setSettings],
  );

  const failed = installedQuery.error !== undefined;

  const isSingleFile =
    typeof params.dit_high_path === "string" &&
    params.dit_high_path.length > 0 &&
    params.dit_high_path === params.dit_low_path;
  const sviTier: SviLoraTier = (settings.sviLoraTier ?? params.svi_lora_tier ?? "high") as SviLoraTier;

  const handleTierChange = useCallback(
    (value: string) => {
      const tier = value as SviLoraTier;
      updateParam("svi_lora_tier", tier);
      const next = { ...settings, sviLoraTier: tier };
      setSettings(next);
      void saveSettings(next).catch(() => undefined);
    },
    [settings, updateParam, setSettings],
  );

  return (
    <>
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor="svi2-base-model">
        Base model
      </label>
      <div className={styles.selectWrap}>
        <select
          id="svi2-base-model"
          className={styles.select}
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value={BUNDLED_VALUE}>{BUNDLED_BASE_MODEL_LABEL}</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.singleFile ? `${candidate.label} (single file)` : candidate.label}
            </option>
          ))}
        </select>
        <span className={styles.selectChevron} aria-hidden="true">
          <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
            <title>open</title>
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {failed && (
        <span className={styles.hint}>
          Model Foundry list unavailable — using the bundled base model.
        </span>
      )}
      {!failed && candidates.length === 0 && (
        <span className={styles.hint}>
          No models installed via Model Foundry yet — using the bundled base model.
        </span>
      )}
    </div>

    {isSingleFile && (
      <div className={styles.group}>
        <label className={styles.groupLabel} htmlFor="svi2-svi-lora-tier">
          SVI LoRA
        </label>
        <div className={styles.selectWrap}>
          <select
            id="svi2-svi-lora-tier"
            className={styles.select}
            value={sviTier}
            onChange={(e) => handleTierChange(e.target.value)}
          >
            {SVI_LORA_TIER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className={styles.selectChevron} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
              <title>open</title>
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <span className={styles.hint}>
          Which SVI2 LoRA wraps this single-file model. Pick Low for a low-noise checkpoint;
          the bundled high/low pair routes per tier automatically.
        </span>
      </div>
    )}
    </>
  );
}
