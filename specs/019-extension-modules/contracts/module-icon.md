# Contract: Module Icon (ManifestIcon + ModuleIcon + FNV-1a fallback)

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**Spec ref**: FR-I01..FR-I06, FR-005, FR-027

## 1. Manifest-side type (persisted inside extensions on install)

```rust
#[derive(Deserialize, Debug, Clone, PartialEq, Eq)]
#[serde(deny_unknown_fields)]
#[non_exhaustive]
pub struct ManifestIcon {
    #[serde(default)]
    pub symbol: Option<String>,
    #[serde(default)]
    pub svg: Option<String>,
}
```

**Validation** (runs at `crates/nexus-extension/src/manifest.rs` ingest time, inside `ZipInstallPipeline` step 8 OR on legacy directory load):

| Case | Behavior |
|---|---|
| both `symbol` and `svg` set | `warning: manifest.icon.both_set`; `svg` wins |
| neither set | no diagnostic; aggregator will compute `Fallback` at read time |
| `symbol` set, valid glyph name | stored as `icon_kind='symbol'`, `icon_symbol=<name>` |
| `symbol` set, unknown glyph name | `error: manifest.icon.invalid_symbol`; extension loads with `icon_kind=NULL` (falls back) |
| `svg` set, parses + allow-list passes + ≤ 2 KiB | stored as `icon_kind='svg'`, `icon_svg=<sanitized>` |
| `svg` set, parse fails OR contains forbidden element/attr OR > 2 KiB | `error: manifest.icon.invalid_svg`; `icon_kind=NULL` (falls back) |

Allowlist tables (FR-I03):

**Elements**: `svg`, `g`, `path`, `circle`, `rect`, `polygon`, `polyline`, `line`, `ellipse`, `defs`, `linearGradient`, `radialGradient`, `stop`, `title`, `desc`.

**Attributes** (per element, no `xlink:*`, no `on*`): `viewBox`, `width`, `height`, `fill`, `stroke`, `stroke-width`, `d`, `cx`, `cy`, `r`, `x`, `y`, `points`, `opacity`, `transform`, `id`, `offset`, `stop-color`, `stop-opacity`.

**Forbidden** (explicit reject, not strip): `<script>`, any `on*` handler attribute, `<foreignObject>`, `xlink:href`, `href`, `@import` inside a `<style>` element. Presence of any forbidden content causes the whole icon to fail validation — no partial acceptance.

## 2. Runtime DTO (returned by `GET /api/v1/modules`)

```json
// kind="symbol"
{ "kind": "symbol", "value": "movie_filter" }

// kind="svg"
{ "kind": "svg", "value": "<svg viewBox=\"0 0 24 24\">...</svg>" }

// kind="fallback"
{ "kind": "fallback", "value": "hub", "fallback_hash": 12847362 }
```

Rust side matches the `ModuleIcon` enum in data-model.md §2.4.

## 3. FNV-1a fallback (FR-I04)

```rust
const FALLBACK_GLYPHS: &[&str; 16] = &[
    "hub", "memory", "dataset", "settings_input_component",
    "polyline", "api", "network_node", "device_hub",
    "schema", "flowsheet", "lan", "widgets",
    "layers", "tune", "insights", "view_agenda",
];

pub fn fallback_for(extension_id: &ExtensionId) -> (&'static str, u32) {
    let h = fnv1a_64(extension_id.as_bytes());
    let idx = (h as u32 % 16) as usize;
    (FALLBACK_GLYPHS[idx], h as u32)
}
```

**Determinism guarantees**:
- Stable across Linux and Windows (both use the same FNV-1a 64-bit function; no platform-specific paths).
- Stable across process restarts (no time- or PID-dependent seeding).
- Stable across Rust toolchain upgrades (FNV-1a is spec-defined; no stdlib-hasher volatility).

**User module override** (FR-I05): `source_kind=User` modules always return `Symbol("account_tree")`; they never take the FNV-1a path.

**Blank module override** (FR-I05): the synthetic `user:blank` module returns `Symbol("add_box")`.

## 4. Resolver trait (Rust, extendability)

```rust
pub trait ModuleIconResolver: Send + Sync {
    fn resolve(&self, source: IconSource<'_>) -> ModuleIcon;
}

pub enum IconSource<'a> {
    ManifestSymbol(&'a str),
    ManifestSvg(&'a str),
    NoneForExtension(&'a ExtensionId),
    UserModule,
    BlankModule,
}

pub struct FnvFallbackResolver;

impl ModuleIconResolver for FnvFallbackResolver { ... }
```

The aggregator holds a `Arc<dyn ModuleIconResolver>` in `AppState`. This allows future icon sources (remote catalog, signed-manifest icon) to slot in without touching the aggregator.

## 5. Frontend consumer (FR-I06)

Single component `apps/web/src/components/module_icon.tsx`:

```tsx
type Props = {
  icon: ModuleIcon;
  size?: 16 | 20 | 24 | 32 | 40 | 48;
  filled?: boolean;
  ariaLabel?: string;
};

export function ModuleIcon({ icon, size = 24, filled = false, ariaLabel }: Props) { ... }
```

**Rendering rules**:
- `kind="symbol"` or `kind="fallback"` → `<span class="material-symbols-outlined" style={{ fontSize: size, fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}>{value}</span>`
- `kind="svg"` → inline SVG string, rendered with `dangerouslySetInnerHTML` AFTER a **client-side re-sanitization** using the same allowlist (defense-in-depth). The re-sanitizer is in `apps/web/src/components/svg_sanitize_client.ts`. If re-sanitization strips any element, a `console.error` is emitted (FR-TP04 observability) and the component falls back to the FNV glyph of the owning `extension_id`.

**Accessibility**: every rendered icon gets an `aria-label` from props or, if omitted, from the resolver's hint (`"{module_display_name} icon"`).

**Active-state fill** (FR-I06, FR-040): when the sidebar item is active or the module card is the selected-for-interaction one, the `filled=true` prop flips `font-variation-settings` to `'FILL' 1`. Reduced-motion does not affect this (it's not an animation).

## 6. Cache invalidation

The manifest icon is stable per extension install. Uninstall + reinstall re-runs sanitization. No runtime icon mutation exists.

## 7. Test matrix

| Test | File | Asserts |
|---|---|---|
| Happy symbol | `crates/nexus-extension/tests/manifest_icon_validation.rs::symbol_happy` | `icon_kind='symbol'`, glyph in allowlist |
| Unknown symbol | `...::unknown_symbol_rejected` | diagnostic `manifest.icon.invalid_symbol`, `icon_kind=NULL` |
| Happy SVG | `...::svg_happy` | sanitized bytes match, stored |
| SVG with `<script>` | `...::svg_script_rejected` | diagnostic `manifest.icon.invalid_svg` |
| SVG > 2 KiB | `...::svg_size_cap` | rejected |
| SVG with `xlink:href` | `...::svg_xlink_rejected` | rejected |
| Both symbol + svg | `...::both_svg_wins_with_warning` | `icon_kind='svg'`, warning fires |
| FNV-1a determinism | `...::fnv_stable_across_runs` | `resolve(ext_id)` returns same glyph and hash on 1000 invocations |
| User module override | `...::user_always_account_tree` | hardcoded |
| Blank module override | `...::blank_always_add_box` | hardcoded |
