import { type ReactElement, useCallback } from "react";
import useSWR from "swr";
import { ATTENTION_OPTIONS } from "../../../domain/settings_defaults";
import { getAttentionCapabilities } from "../../../services/capabilities_client";
import { saveSettings } from "../../../services/settings_client";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

const LABEL_MAP: Record<string, string> = Object.fromEntries(
  ATTENTION_OPTIONS.map((o) => [o.value, o.label]),
);

export function AttentionSelect(): ReactElement {
  const { params, settings, updateParam, setSettings } = useRenderRequest();
  const capsQuery = useSWR("svi2/attention-capabilities", getAttentionCapabilities, {
    shouldRetryOnError: false,
  });

  const selected = params.attention ?? settings.attentionBackend ?? "flash2";

  const handleChange = useCallback(
    (value: string) => {
      updateParam("attention", value);
      const next = { ...settings, attentionBackend: value };
      setSettings(next);
      void saveSettings(next).catch(() => undefined);
    },
    [settings, updateParam, setSettings],
  );

  const caps = capsQuery.data;
  const capsUnavailable = caps === undefined;
  const capsFailed = capsQuery.error !== undefined;

  const selectedCap = caps?.backends.find((b) => b.id === selected);
  const selectedUnsupported = selectedCap !== undefined && !selectedCap.supported;

  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor="svi2-attention">
        Attention mechanism
      </label>
      <div className={styles.selectWrap}>
        <select
          id="svi2-attention"
          className={styles.select}
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="auto">{LABEL_MAP["auto"]}</option>
          {caps
            ? caps.backends.map((b) => (
                <option
                  key={b.id}
                  value={b.id}
                  disabled={!b.supported}
                  title={b.reason ?? undefined}
                >
                  {LABEL_MAP[b.id] ?? b.id}
                </option>
              ))
            : ATTENTION_OPTIONS.filter((o) => o.value !== "auto").map((o) => (
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
      {capsFailed && (
        <span className={styles.hint}>
          GPU capabilities unavailable — all options shown.
        </span>
      )}
      {selectedUnsupported && (
        <span className={styles.hint}>
          {selectedCap.reason ?? "This backend is not supported on the current GPU"} — will fall
          back to flash2 at render time.
        </span>
      )}
      {!capsUnavailable && selected === "sage3_fp4" && !selectedUnsupported && (
        <span className={styles.hint}>FP4 — may show artifacts on some GPUs.</span>
      )}
    </div>
  );
}
