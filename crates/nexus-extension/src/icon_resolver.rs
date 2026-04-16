//! Deterministic module-icon resolution for spec 019 (FR-I01..FR-I05).
//!
//! Given a [`ManifestIcon`] declared in an extension manifest (or its absence),
//! this module produces a [`ResolvedIcon`] the aggregator can serialize as
//! `ModuleIcon::Symbol | Svg | Fallback` without further logic. User modules
//! always resolve to the `account_tree` symbol and the blank module to
//! `add_box` (FR-I05); extension modules missing a manifest icon fall back
//! to a glyph picked deterministically from a 16-entry set via FNV-1a 64-bit
//! hashing on the `extension_id` bytes (FR-I04).

include!(concat!(env!("OUT_DIR"), "/material_symbols_allowlist.rs"));

use std::hash::Hasher;

use crate::manifest::ManifestIcon;

/// 16-entry fallback glyph pool (FR-I04). Frozen; changing order renumbers
/// every existing fallback icon.
pub const FALLBACK_GLYPHS: [&str; 16] = [
    "hub",
    "memory",
    "dataset",
    "settings_input_component",
    "polyline",
    "api",
    "network_node",
    "device_hub",
    "schema",
    "flowsheet",
    "lan",
    "widgets",
    "layers",
    "tune",
    "insights",
    "view_agenda",
];

/// Glyph rendered for the synthetic user-kind module (FR-I05).
pub const USER_MODULE_GLYPH: &str = "account_tree";

/// Glyph rendered for the synthetic blank-module card (FR-I05, FR-BM07).
pub const BLANK_MODULE_GLYPH: &str = "add_box";

/// Source of the icon being resolved.
#[non_exhaustive]
pub enum IconSource<'a> {
    ManifestSymbol(&'a str),
    ManifestSvg(&'a str),
    NoneForExtension(&'a str),
    UserModule,
    BlankModule,
}

/// Resolved icon ready for the `ModuleIcon` serialized envelope.
#[derive(Clone, Debug, PartialEq, Eq)]
#[non_exhaustive]
pub enum ResolvedIcon {
    Symbol(String),
    Svg(String),
    Fallback {
        glyph: &'static str,
        fallback_hash: u32,
    },
}

/// Strategy trait for icon resolution. `FnvFallbackResolver` is the only
/// impl shipped in v1; future remote-catalog resolvers can implement this
/// and slot in without touching the aggregator (Principle V).
pub trait ModuleIconResolver: Send + Sync {
    fn resolve(&self, source: IconSource<'_>) -> ResolvedIcon;
}

/// Deterministic FNV-1a 64-bit fallback resolver (FR-I04).
#[derive(Default)]
pub struct FnvFallbackResolver;

impl ModuleIconResolver for FnvFallbackResolver {
    fn resolve(&self, source: IconSource<'_>) -> ResolvedIcon {
        match source {
            IconSource::ManifestSymbol(s) => ResolvedIcon::Symbol(s.to_string()),
            IconSource::ManifestSvg(s) => ResolvedIcon::Svg(s.to_string()),
            IconSource::NoneForExtension(id) => fnv_fallback(id),
            IconSource::UserModule => ResolvedIcon::Symbol(USER_MODULE_GLYPH.to_string()),
            IconSource::BlankModule => ResolvedIcon::Symbol(BLANK_MODULE_GLYPH.to_string()),
        }
    }
}

/// Run the FNV-1a 64-bit hash over the extension id bytes; use the low 32 bits
/// both to index into [`FALLBACK_GLYPHS`] and to surface as `fallback_hash`.
pub fn fnv_fallback(extension_id: &str) -> ResolvedIcon {
    let mut h = fnv::FnvHasher::default();
    h.write(extension_id.as_bytes());
    let digest = h.finish();
    let low = digest as u32;
    let idx = (low % 16) as usize;
    ResolvedIcon::Fallback {
        glyph: FALLBACK_GLYPHS[idx],
        fallback_hash: low,
    }
}

/// Resolve a [`ManifestIcon`] from an extension into a [`ResolvedIcon`]. If
/// neither `symbol` nor `svg` is declared, falls back via FNV on the supplied
/// `extension_id`. If both are declared, `svg` wins (FR-I01) — callers should
/// separately emit the `manifest.icon.both_set` warning at ingest time.
pub fn resolve_from_manifest(
    resolver: &dyn ModuleIconResolver,
    manifest_icon: Option<&ManifestIcon>,
    extension_id: &str,
) -> ResolvedIcon {
    match manifest_icon {
        Some(m) if m.svg.is_some() => {
            resolver.resolve(IconSource::ManifestSvg(m.svg.as_deref().unwrap()))
        }
        Some(m) if m.symbol.is_some() => {
            resolver.resolve(IconSource::ManifestSymbol(m.symbol.as_deref().unwrap()))
        }
        _ => resolver.resolve(IconSource::NoneForExtension(extension_id)),
    }
}

/// Look up whether a glyph name is a valid Material Symbols Outlined entry
/// (spec 019 FR-I02). Binary-search over the compile-time allowlist generated
/// in `build.rs`.
pub fn is_valid_material_symbol(glyph: &str) -> bool {
    MATERIAL_SYMBOLS.binary_search(&glyph).is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fnv_stable_across_runs() {
        let id = "com.example.cinema";
        let first = fnv_fallback(id);
        for _ in 0..1000 {
            assert_eq!(fnv_fallback(id), first);
        }
    }

    #[test]
    fn fnv_distinct_for_different_ids() {
        let a = fnv_fallback("ext.a");
        let b = fnv_fallback("ext.b");
        assert_ne!(a, b);
    }

    #[test]
    fn user_module_is_account_tree() {
        let r = FnvFallbackResolver;
        let ResolvedIcon::Symbol(g) = r.resolve(IconSource::UserModule) else {
            panic!("user module should resolve to a symbol");
        };
        assert_eq!(g, USER_MODULE_GLYPH);
    }

    #[test]
    fn blank_module_is_add_box() {
        let r = FnvFallbackResolver;
        let ResolvedIcon::Symbol(g) = r.resolve(IconSource::BlankModule) else {
            panic!("blank module should resolve to a symbol");
        };
        assert_eq!(g, BLANK_MODULE_GLYPH);
    }

    #[test]
    fn manifest_svg_wins_over_symbol() {
        let r = FnvFallbackResolver;
        let m = ManifestIcon {
            symbol: Some("hub".into()),
            svg: Some("<svg/>".into()),
        };
        let resolved = resolve_from_manifest(&r, Some(&m), "ext.dual");
        assert!(matches!(resolved, ResolvedIcon::Svg(_)));
    }

    #[test]
    fn no_manifest_icon_uses_fnv() {
        let r = FnvFallbackResolver;
        let resolved = resolve_from_manifest(&r, None, "ext.missing");
        assert!(matches!(resolved, ResolvedIcon::Fallback { .. }));
    }

    #[test]
    fn fallback_glyph_is_from_allowlist() {
        for id in ["ext.a", "ext.b", "ext.x9z", "com.example.deep.path"] {
            let ResolvedIcon::Fallback { glyph, .. } = fnv_fallback(id) else {
                panic!("expected fallback");
            };
            assert!(
                FALLBACK_GLYPHS.contains(&glyph),
                "glyph {glyph} not in fallback set"
            );
        }
    }

    #[test]
    fn material_symbol_allowlist_contains_common_glyphs() {
        assert!(is_valid_material_symbol("home"));
        assert!(is_valid_material_symbol("hub"));
        assert!(is_valid_material_symbol("memory"));
        assert!(is_valid_material_symbol("rocket_launch"));
    }

    #[test]
    fn material_symbol_allowlist_rejects_invalid_names() {
        assert!(!is_valid_material_symbol("NotARealGlyph"));
        assert!(!is_valid_material_symbol(""));
        assert!(!is_valid_material_symbol("movie filter"));
    }
}
