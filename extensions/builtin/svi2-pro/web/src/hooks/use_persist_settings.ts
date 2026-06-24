import { useCallback, useEffect, useRef, useState } from "react";
import { saveSettings } from "../services/settings_client";
import type { ExtensionSettings } from "../services/types";

interface PersistSettings {
  /** True while a `saveSettings` POST is in flight — drive a control's
   * disabled/pending state from this so an "apply" reflects pending. */
  saving: boolean;
  /** Fire-and-forget persist that flips `saving` for the request's lifetime.
   * The caller still updates store state synchronously before calling this. */
  persist: (next: ExtensionSettings) => void;
}

/** Shared pending-state wrapper for the fire-and-forget `saveSettings` persist
 * used by the inline "apply" selects (model file, attention). The store value
 * updates synchronously in the caller; this only tracks the network round-trip
 * so the control can show pending and not race a second save. */
export function usePersistSettings(): PersistSettings {
  const [saving, setSaving] = useState(false);
  const inflight = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const persist = useCallback((next: ExtensionSettings) => {
    inflight.current += 1;
    setSaving(true);
    void saveSettings(next)
      .catch(() => undefined)
      .finally(() => {
        inflight.current -= 1;
        if (mounted.current && inflight.current === 0) setSaving(false);
      });
  }, []);

  return { saving, persist };
}
