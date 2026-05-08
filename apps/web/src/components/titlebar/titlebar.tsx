/**
 * Spec 042 — Titlebar (T027).
 *
 * Custom-chrome titlebar for the Tauri desktop window. Renders a prompt-style
 * breadcrumb on the left and minimize / maximize / close window controls on
 * the right. The breadcrumb defaults to `~/nexus-dnn` and is overridden by the
 * host via `cmd_window_set_titlebar_breadcrumb` (T030); for now it accepts a
 * `cwd` prop so it can mount in isolation before the breadcrumb event wiring
 * lands in a follow-up.
 *
 * Drag region: the strip itself plus every passive child carry
 * `data-tauri-drag-region`. Window-control buttons must NOT carry the
 * attribute (Tauri swallows the click otherwise). On macOS the OS Overlay
 * style draws traffic lights above the strip; we leave a left padding spacer
 * via `data-platform="darwin"` and skip the custom button cluster on that
 * platform.
 *
 * Safe in browser-dev mode: when `window.isTauri !== true` the button handlers
 * become no-ops and the component renders for visual review only.
 */

import { useEffect, useRef, useState } from "react";
import {
  breadcrumb,
  breadcrumbCwd,
  breadcrumbSuffix,
  controlButton,
  controlButtonClose,
  controls,
  glyph,
  titlebar,
} from "./titlebar.css";

const DEFAULT_CWD = "~/nexus-dnn";
const DEFAULT_SUFFIX = "$";

export interface TitlebarProps {
  cwd?: string;
  suffix?: string;
}

interface DesktopWindowApi {
  minimize(): Promise<void>;
  toggleMaximize(): Promise<void>;
  close(): Promise<void>;
}

function isTauriRuntime(): boolean {
  if (typeof window === "undefined") return false;
  return (window as Window & { isTauri?: boolean }).isTauri === true;
}

function detectMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad/.test(navigator.userAgent);
}

async function loadDesktopWindow(): Promise<DesktopWindowApi | null> {
  if (!isTauriRuntime()) return null;
  try {
    const mod = await import("@tauri-apps/api/window");
    const handle = mod.getCurrentWindow();
    return {
      minimize: () => handle.minimize(),
      toggleMaximize: () => handle.toggleMaximize(),
      close: () => handle.close(),
    };
  } catch {
    return null;
  }
}

export function Titlebar({ cwd = DEFAULT_CWD, suffix = DEFAULT_SUFFIX }: TitlebarProps) {
  const apiRef = useRef<DesktopWindowApi | null>(null);
  const [isMac] = useState<boolean>(() => detectMac());

  useEffect(() => {
    let active = true;
    void loadDesktopWindow().then((api) => {
      if (active) {
        apiRef.current = api;
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const minimize = (): void => {
    void apiRef.current?.minimize();
  };
  const toggleMax = (): void => {
    void apiRef.current?.toggleMaximize();
  };
  const close = (): void => {
    void apiRef.current?.close();
  };

  return (
    <div
      className={titlebar}
      data-tauri-drag-region
      data-platform={isMac ? "darwin" : "other"}
    >
      <div className={breadcrumb} data-tauri-drag-region>
        <span className={breadcrumbCwd} data-tauri-drag-region>
          {cwd}
        </span>
        <span className={breadcrumbSuffix} data-tauri-drag-region>
          {suffix}
        </span>
      </div>
      {!isMac && (
        <div className={controls}>
          <button
            type="button"
            className={controlButton}
            onClick={minimize}
            aria-label="Minimize window"
          >
            <span className={glyph} aria-hidden="true">
              {"—"}
            </span>
          </button>
          <button
            type="button"
            className={controlButton}
            onClick={toggleMax}
            aria-label="Toggle maximize window"
          >
            <span className={glyph} aria-hidden="true">
              {"□"}
            </span>
          </button>
          <button
            type="button"
            className={`${controlButton} ${controlButtonClose}`}
            onClick={close}
            aria-label="Close window"
          >
            <span className={glyph} aria-hidden="true">
              {"×"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
