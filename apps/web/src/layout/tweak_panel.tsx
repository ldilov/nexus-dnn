import { useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import {
  TWEAK_DEFAULTS,
  applyTweaksToBody,
  loadTweakSettings,
  saveTweakSettings,
  type Accent,
  type Card,
  type Density,
  type TweakSettings,
} from "./tweak_storage";
import * as styles from "./tweak_panel.css";

// Discoverability hotkey — macOS preferences convention. Cross-platform
// `event.metaKey || event.ctrlKey` so Windows / Linux operators get the
// same affordance via Ctrl+,.
const HOTKEY_LABEL = "⌘,";

function isHotkey(e: KeyboardEvent): boolean {
  if (e.key !== ",") return false;
  if (!(e.metaKey || e.ctrlKey)) return false;
  if (e.shiftKey || e.altKey) return false;
  return true;
}

const ACCENT_OPTIONS: ReadonlyArray<{ id: Accent; label: string }> = [
  { id: "primary", label: "Violet" },
  { id: "secondary", label: "Indigo" },
  { id: "tertiary", label: "Magma" },
];

const DENSITY_OPTIONS: ReadonlyArray<{ id: Density; label: string }> = [
  { id: "compact", label: "Compact" },
  { id: "cozy", label: "Cozy" },
  { id: "spacious", label: "Spacious" },
];

const CARD_OPTIONS: ReadonlyArray<{ id: Card; label: string }> = [
  { id: "flat", label: "Flat" },
  { id: "glass", label: "Glass" },
  { id: "elevated", label: "Elevated" },
];

const STORAGE_WARNING_KEY = "tweak-panel:storage-warning";

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

function joinClasses(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function TweakPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<TweakSettings>(() => loadTweakSettings());
  const [announcement, setAnnouncement] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const storageWarningEmitted = useRef(false);
  const reducedMotion = useReducedMotion();

  // Functional-updater pattern: avoids stale-closure bugs when multiple
  // setters fire in the same React batch. Stable identity (no deps).
  const persist = useCallback(
    (producer: (prev: TweakSettings) => TweakSettings, announce?: string) => {
      setSettings((prev) => {
        const next = producer(prev);
        applyTweaksToBody(next);
        const ok = saveTweakSettings(next);
        if (!ok && !storageWarningEmitted.current) {
          storageWarningEmitted.current = true;
          toast.warning(
            "Tweak settings won't persist — local storage is unavailable.",
            {
              id: STORAGE_WARNING_KEY,
              description:
                "The change applies for this session only. Check your browser's privacy / quota settings to keep tweaks across reloads.",
            },
          );
        }
        return next;
      });
      if (announce) setAnnouncement(announce);
    },
    [],
  );

  const setAccent = useCallback(
    (accent: Accent, label: string) =>
      persist((p) => ({ ...p, accent }), `Accent set to ${label}`),
    [persist],
  );
  const setDensity = useCallback(
    (density: Density, label: string) =>
      persist((p) => ({ ...p, density }), `Density set to ${label}`),
    [persist],
  );
  const setCard = useCallback(
    (card: Card, label: string) =>
      persist((p) => ({ ...p, card }), `Card style set to ${label}`),
    [persist],
  );

  const reset = useCallback(
    () => persist(() => ({ ...TWEAK_DEFAULTS }), "Tweaks reset to defaults"),
    [persist],
  );

  // Global hotkey — open or focus the panel from anywhere via ⌘, / Ctrl+,.
  // Skipped when the user is typing in a text input so it doesn't fight
  // a real comma keystroke.
  useEffect(() => {
    const onHotkey = (e: KeyboardEvent) => {
      if (!isHotkey(e)) return;
      const active = document.activeElement;
      const inEditableField =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable);
      if (inEditableField) return;
      e.preventDefault();
      setOpen((v) => !v);
      // Defer focus until after the popover renders.
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    };
    window.addEventListener("keydown", onHotkey);
    return () => window.removeEventListener("keydown", onHotkey);
  }, []);

  // Outside-click + Escape close (only active while open).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node | null;
      // Skip detached targets (a transient toast / portal that already
      // unmounted by the time the handler runs).
      if (target && !document.contains(target)) return;
      if (!wrapperRef.current) return;
      if (target && wrapperRef.current.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Respect other components that already handled Escape (chat
      // composer, modal, autocomplete) — do not steal focus from them.
      if (e.defaultPrevented) return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className={joinClasses(styles.triggerButton, open && styles.triggerActive)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Tweak panel (${HOTKEY_LABEL})`}
        aria-keyshortcuts="Meta+, Control+,"
        title={`Tweak panel · ${HOTKEY_LABEL}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          tune
        </span>
      </button>
      {open && (
        <LazyMotion features={domAnimation} strict>
          <m.div
            className={styles.popover}
            aria-label="Tweak panel"
            data-testid="tweak-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.16,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
          <div className={styles.popoverHeader}>
            <div className={styles.popoverHeaderRow}>
              <span className={styles.popoverTitle}>Tweaks</span>
              <kbd className={styles.triggerHotkey} aria-hidden="true">
                {HOTKEY_LABEL}
              </kbd>
            </div>
            <span className={styles.popoverHint}>Live preview · saves on change</span>
          </div>
          <SegmentedField
            name="Accent"
            value={settings.accent}
            options={ACCENT_OPTIONS}
            onChange={setAccent}
            testIdPrefix="tweak-accent"
          />
          <SegmentedField
            name="Density"
            value={settings.density}
            options={DENSITY_OPTIONS}
            onChange={setDensity}
            testIdPrefix="tweak-density"
          />
          <SegmentedField
            name="Card style"
            value={settings.card}
            options={CARD_OPTIONS}
            onChange={setCard}
            testIdPrefix="tweak-card"
          />
          <div className={styles.resetRow}>
            <button
              type="button"
              className={styles.resetButton}
              onClick={reset}
              data-testid="tweak-reset"
            >
              Reset to defaults
            </button>
          </div>
          {/* Polite live region — announces the latest change so screen
              reader users know the page actually responded. */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={visuallyHidden}
            data-testid="tweak-announcer"
          >
            {announcement}
          </div>
          </m.div>
        </LazyMotion>
      )}
    </div>
  );
}

interface SegmentedFieldProps<T extends string> {
  name: string;
  value: T;
  options: ReadonlyArray<{ id: T; label: string }>;
  onChange: (next: T, label: string) => void;
  testIdPrefix: string;
}

function SegmentedField<T extends string>({
  name,
  value,
  options,
  onChange,
  testIdPrefix,
}: SegmentedFieldProps<T>) {
  const activeLabel = options.find((o) => o.id === value)?.label ?? value;
  return (
    <div className={styles.fieldLabel} role="group" aria-label={name}>
      <span className={styles.fieldHeader}>
        <span className={styles.fieldName}>{name}</span>
        <span className={styles.fieldValue}>{activeLabel}</span>
      </span>
      <span className={styles.segmentedRoot}>
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={active}
              data-testid={`${testIdPrefix}-${opt.id}`}
              className={joinClasses(
                styles.segmentedOption,
                active && styles.segmentedOptionActive,
              )}
              onClick={() => onChange(opt.id, opt.label)}
            >
              {opt.label}
            </button>
          );
        })}
      </span>
    </div>
  );
}
