import { type ReactElement, useCallback, useMemo } from "react";
import useSWR from "swr";
import { BUNDLED_BASE_MODEL_LABEL } from "../../../domain/settings_defaults";
import { filterWan22Candidates } from "../../../domain/wan_models";
import { listInstalledModels } from "../../../services/model_store_client";
import { saveSettings } from "../../../services/settings_client";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

const BUNDLED_VALUE = "__bundled__";

export function BaseModelSelect(): ReactElement {
  const { params, settings, updateParam, setSettings } = useRenderRequest();
  const installedQuery = useSWR("svi2/installed-models", listInstalledModels);

  const candidates = useMemo(
    () => filterWan22Candidates(installedQuery.data?.installed ?? []),
    [installedQuery.data],
  );

  const selected =
    candidates.find((c) => c.ditHighPath === params.dit_high_path)?.familyId ?? BUNDLED_VALUE;

  const handleChange = useCallback(
    (value: string) => {
      const candidate = candidates.find((c) => c.familyId === value);
      const next = candidate
        ? {
            ...settings,
            baseModelFamilyId: candidate.familyId,
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

  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor="svi2-base-model">
        Base model (Wan2.2-I2V)
      </label>
      <select
        id="svi2-base-model"
        className={styles.select}
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value={BUNDLED_VALUE}>{BUNDLED_BASE_MODEL_LABEL}</option>
        {candidates.map((candidate) => (
          <option key={candidate.familyId} value={candidate.familyId}>
            {candidate.label}
          </option>
        ))}
      </select>
      {failed && (
        <span className={styles.hint}>
          Model Foundry list unavailable — using the bundled base model.
        </span>
      )}
      {!failed && candidates.length === 0 && (
        <span className={styles.hint}>
          No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet.
        </span>
      )}
    </div>
  );
}
