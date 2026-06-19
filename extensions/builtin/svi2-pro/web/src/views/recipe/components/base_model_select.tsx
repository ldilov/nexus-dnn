import { type ReactElement, useCallback, useMemo } from "react";
import useSWR from "swr";
import { SVI_LORA_TIER_OPTIONS } from "../../../domain/settings_defaults";
import { listExpertFiles } from "../../../domain/wan_models";
import { listInstalledModels } from "../../../services/model_store_client";
import { saveSettings } from "../../../services/settings_client";
import type { SviLoraTier } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as fc from "../../../components/form/field_control.css";
import * as styles from "./quick_controls.css";

const BUNDLED_VALUE = "__bundled__";

function Chevron(): ReactElement {
  return (
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
  );
}

function ModelSelect({
  id,
  label,
  value,
  options,
  includeBundled,
  onChange,
}: {
  id: string;
  label: string;
  value: string | undefined;
  options: Array<{ value: string; label: string }>;
  includeBundled: boolean;
  onChange: (path: string | undefined) => void;
}): ReactElement {
  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={styles.select}
          value={value ?? BUNDLED_VALUE}
          onChange={(e) => onChange(e.target.value === BUNDLED_VALUE ? undefined : e.target.value)}
        >
          {includeBundled && <option value={BUNDLED_VALUE}>Bundled Wan2.2 (default)</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
    </div>
  );
}

export function BaseModelSelect(): ReactElement {
  const { params, settings, updateParam, setSettings } = useRenderRequest();
  const installedQuery = useSWR("svi2/installed-models", listInstalledModels);
  const files = useMemo(
    () => listExpertFiles(installedQuery.data?.installed ?? []),
    [installedQuery.data],
  );

  const highPath = params.dit_high_path ?? undefined;
  const lowPath = params.dit_low_path ?? undefined;
  // Derived, not state: a stored `linked` flag goes stale when a preset rewrites
  // the dit paths. "Linked" simply means both experts point at one file.
  const linked = typeof highPath === "string" && highPath.length > 0 && highPath === lowPath;
  const isSingleFile = linked;

  const failed = installedQuery.error !== undefined;
  const sviTier: SviLoraTier = (settings.sviLoraTier ?? params.svi_lora_tier ?? "high") as SviLoraTier;

  const applyPaths = useCallback(
    (high: string | undefined, low: string | undefined) => {
      updateParam("dit_high_path", high);
      updateParam("dit_low_path", low);
      const next = { ...settings, ditHighPath: high ?? "", ditLowPath: low ?? "" };
      setSettings(next);
      void saveSettings(next).catch(() => undefined);
    },
    [settings, updateParam, setSettings],
  );

  const handleLinkToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        const one = highPath ?? lowPath ?? files[0]?.value;
        if (one) applyPaths(one, one);
      } else {
        // Unlink: split the paths (low -> bundled) so the two pickers appear and
        // the user can choose a distinct low-noise expert.
        applyPaths(highPath, undefined);
      }
    },
    [highPath, lowPath, files, applyPaths],
  );

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
      <div className={fc.toggleRow}>
        <button
          type="button"
          role="switch"
          aria-checked={linked}
          aria-label="Use one model file for both experts"
          className={fc.toggle}
          onClick={() => handleLinkToggle(!linked)}
        >
          <span className={fc.toggleThumb} aria-hidden="true" />
        </button>
        <span className={styles.hint}>Same file for both experts (single-file model)</span>
      </div>

      {linked ? (
        <ModelSelect
          id="svi2-base-model"
          label="Base model"
          value={highPath}
          options={files}
          includeBundled={false}
          onChange={(p) => applyPaths(p, p)}
        />
      ) : (
        <>
          <ModelSelect
            id="svi2-model-high"
            label="High-noise expert (runs first)"
            value={highPath}
            options={files}
            includeBundled
            onChange={(p) => applyPaths(p, lowPath)}
          />
          <ModelSelect
            id="svi2-model-low"
            label="Low-noise expert (runs second)"
            value={lowPath}
            options={files}
            includeBundled
            onChange={(p) => applyPaths(highPath, p)}
          />
        </>
      )}

      {failed && (
        <span className={styles.hint}>
          Model Foundry list unavailable — using the bundled base model.
        </span>
      )}
      {!failed && files.length === 0 && (
        <span className={styles.hint}>
          No models installed via Model Foundry yet — using the bundled base model.
        </span>
      )}

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
            <Chevron />
          </div>
          <span className={styles.hint}>
            Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix).
          </span>
        </div>
      )}
    </>
  );
}
