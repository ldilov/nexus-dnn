import { useMemo, useState } from "react";
import type { RuntimeSettings } from "./types";
import { isManagedFlag } from "./managed_flags";
import * as css from "./settings_panel.css";

interface Props {
  initial: RuntimeSettings;
  onSave: (next: RuntimeSettings) => Promise<void>;
}

function generateArgsPreview(settings: RuntimeSettings): string[] {
  const port =
    settings.port_mode === "fixed" && settings.fixed_port !== null
      ? String(settings.fixed_port)
      : "<auto>";
  const base = [
    "--host",
    settings.bind_address,
    "--port",
    port,
    "--threads",
    String(settings.threads),
    "--threads-batch",
    String(settings.threads_batch),
    "--ctx-size",
    String(settings.default_context),
    "--parallel",
    String(settings.parallel_requests),
  ];
  return [...base, ...settings.extra_args];
}

export function SettingsPanel({ initial, onSave }: Props) {
  const [settings, setSettings] = useState<RuntimeSettings>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [extraArgsRaw, setExtraArgsRaw] = useState(initial.extra_args.join(" "));

  const preview = useMemo(() => generateArgsPreview(settings).join(" "), [settings]);

  function patch<K extends keyof RuntimeSettings>(key: K, value: RuntimeSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function onExtraArgsChange(raw: string) {
    setExtraArgsRaw(raw);
    const tokens = raw.split(/\s+/).filter(Boolean);
    const offender = tokens.find((t) => isManagedFlag(t));
    if (offender) {
      setError(`extra argument conflicts with managed flag: ${offender}`);
    } else {
      setError(null);
      patch("extra_args", tokens);
    }
  }

  async function save() {
    setError(null);
    setSaving(true);
    try {
      await onSave(settings);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={css.panel} data-testid="backend-settings-panel">
      <section className={css.section} aria-label="General">
        <h3>General</h3>
        <div className={css.row}>
          <label>Threads</label>
          <input
            type="number"
            min={1}
            max={1024}
            value={settings.threads}
            onChange={(e) => patch("threads", Number(e.target.value))}
          />
        </div>
        <div className={css.row}>
          <label>Batch threads</label>
          <input
            type="number"
            min={1}
            max={1024}
            value={settings.threads_batch}
            onChange={(e) => patch("threads_batch", Number(e.target.value))}
          />
        </div>
        <div className={css.row}>
          <label>Default context window</label>
          <input
            type="number"
            min={128}
            max={1048576}
            value={settings.default_context}
            onChange={(e) => patch("default_context", Number(e.target.value))}
          />
        </div>
        <div className={css.row}>
          <label>Parallel request limit</label>
          <input
            type="number"
            min={1}
            max={64}
            value={settings.parallel_requests}
            onChange={(e) => patch("parallel_requests", Number(e.target.value))}
          />
        </div>
      </section>
      <section className={css.section} aria-label="Network">
        <h3>Network</h3>
        <div className={css.row}>
          <label>Bind address</label>
          <input
            type="text"
            value={settings.bind_address}
            onChange={(e) => patch("bind_address", e.target.value)}
          />
        </div>
        <div className={css.row}>
          <label>Port mode</label>
          <select
            value={settings.port_mode}
            onChange={(e) => {
              const mode = e.target.value as "auto" | "fixed";
              setSettings((prev) => ({
                ...prev,
                port_mode: mode,
                fixed_port: mode === "fixed" ? prev.fixed_port ?? 43127 : null,
              }));
            }}
          >
            <option value="auto">Auto</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
        {settings.port_mode === "fixed" && (
          <div className={css.row}>
            <label>Fixed port</label>
            <input
              type="number"
              min={1}
              max={65535}
              value={settings.fixed_port ?? 0}
              onChange={(e) => patch("fixed_port", Number(e.target.value))}
            />
          </div>
        )}
      </section>
      <section className={css.section} aria-label="Advanced">
        <h3>Advanced</h3>
        <div className={css.row}>
          <label>Extra arguments</label>
          <textarea
            rows={3}
            value={extraArgsRaw}
            onChange={(e) => onExtraArgsChange(e.target.value)}
            data-testid="extra-args-input"
          />
        </div>
        <div>
          <label>Argument preview</label>
          <div className={css.preview} data-testid="args-preview">{preview}</div>
        </div>
      </section>
      {error && <div className={css.errorText}>{error}</div>}
      <div>
        <button type="button" disabled={saving || error !== null} onClick={save}>
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
