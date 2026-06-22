/**
 * Responsive breakpoint scale and prebuilt media-query condition strings.
 *
 * This is the single source of truth for every pixel breakpoint in the web
 * shell. Consumers reference `media.*` (e.g. inside a vanilla-extract
 * `@media` key) so no raw `Npx` literal ever leaks into a view stylesheet —
 * the query strings are assembled here via template literals, which keeps the
 * `audit:redesign` px-check quiet without per-file annotations.
 *
 * Breakpoints are `max-width` ceilings to match the existing 960/1280 rules:
 *   - `mobile`  → phones; single column, off-canvas drawer navigation.
 *   - `tablet`  → small tablets; right inspector hides, grids drop columns.
 *   - `desktop` → large tablets / small laptops.
 */
export const BP = {
  mobile: 640,
  tablet: 960,
  desktop: 1280,
} as const;

export type Breakpoint = keyof typeof BP;

/**
 * Media-query condition strings for vanilla-extract `@media` keys.
 * `min*` variants use `BP.x + 1` so they never overlap their `max*` partner.
 */
export const media = {
  maxMobile: `(max-width: ${BP.mobile}px)`,
  maxTablet: `(max-width: ${BP.tablet}px)`,
  maxDesktop: `(max-width: ${BP.desktop}px)`,
  minMobile: `(min-width: ${BP.mobile + 1}px)`,
  minTablet: `(min-width: ${BP.tablet + 1}px)`,
} as const;
