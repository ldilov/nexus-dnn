export type Accent = "primary" | "secondary" | "tertiary";
export type Density = "compact" | "cozy" | "spacious";
export type Card = "flat" | "glass" | "elevated";

export interface TweakSettings {
  accent: Accent;
  density: Density;
  card: Card;
}

export const TWEAK_DEFAULTS: TweakSettings = Object.freeze({
  accent: "primary",
  density: "cozy",
  card: "flat",
});

const KEY_ACCENT = "nexus.tweaks.accent";
const KEY_DENSITY = "nexus.tweaks.density";
const KEY_CARD = "nexus.tweaks.card";

const ACCENTS: ReadonlyArray<Accent> = ["primary", "secondary", "tertiary"];
const DENSITIES: ReadonlyArray<Density> = ["compact", "cozy", "spacious"];
const CARDS: ReadonlyArray<Card> = ["flat", "glass", "elevated"];

function readKey<T extends string>(key: string, allowed: ReadonlyArray<T>, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return (allowed as ReadonlyArray<string>).includes(raw) ? (raw as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadTweakSettings(): TweakSettings {
  if (typeof window === "undefined") return { ...TWEAK_DEFAULTS };
  return {
    accent: readKey(KEY_ACCENT, ACCENTS, TWEAK_DEFAULTS.accent),
    density: readKey(KEY_DENSITY, DENSITIES, TWEAK_DEFAULTS.density),
    card: readKey(KEY_CARD, CARDS, TWEAK_DEFAULTS.card),
  };
}

/**
 * Persist tweak settings to localStorage. Returns `true` on success,
 * `false` if any write threw (private mode, quota exceeded, storage
 * disabled). Callers SHOULD surface a one-time warning when this
 * returns false — the in-memory state still applies for the session,
 * but the change won't survive a reload.
 */
export function saveTweakSettings(next: Readonly<TweakSettings>): boolean {
  if (typeof window === "undefined") return true;
  try {
    window.localStorage.setItem(KEY_ACCENT, next.accent);
    window.localStorage.setItem(KEY_DENSITY, next.density);
    window.localStorage.setItem(KEY_CARD, next.card);
    return true;
  } catch {
    return false;
  }
}

export function applyTweaksToBody(settings: Readonly<TweakSettings>): void {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;
  body.dataset.accent = settings.accent;
  body.dataset.density = settings.density;
  body.dataset.card = settings.card;
}

export function rehydrateTweaks(): TweakSettings {
  const settings = loadTweakSettings();
  applyTweaksToBody(settings);
  return settings;
}
