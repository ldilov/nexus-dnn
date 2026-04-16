//! Allow-list SVG sanitizer for manifest icons (spec 019 FR-I03).
//!
//! **Reject on unknown** — any element or attribute outside the allow-list
//! fails the whole icon. Strip-on-unknown is explicitly rejected because a
//! silently-stripped attribute would be an install-time footgun.
//!
//! Allowed elements (FR-I03):
//!   svg, g, path, circle, rect, polygon, polyline, line, ellipse, defs,
//!   linearGradient, radialGradient, stop, title, desc
//!
//! Allowed attributes (common set, applied to every allowed element):
//!   viewBox, width, height, fill, stroke, stroke-width, d, cx, cy, r,
//!   x, y, points, opacity, transform, id, offset, stop-color, stop-opacity,
//!   xmlns
//!
//! Explicitly forbidden: `<script>`, any `on*` handler, `<foreignObject>`,
//! `xlink:href`, `href`, any `<style>` element, @import anywhere.

use quick_xml::Reader;
use quick_xml::events::{BytesStart, Event};

/// Maximum raw byte length accepted before parsing (FR-I03).
pub const MAX_SVG_BYTES: usize = 2 * 1024;

#[derive(Debug, thiserror::Error, PartialEq, Eq)]
#[non_exhaustive]
pub enum SvgSanitizeError {
    #[error("svg exceeds size cap of {cap} bytes ({actual})")]
    TooLarge { actual: usize, cap: usize },
    #[error("svg failed to parse: {0}")]
    Parse(String),
    #[error("svg element `{0}` is not in the allow-list")]
    ForbiddenElement(String),
    #[error("svg attribute `{0}` is not in the allow-list")]
    ForbiddenAttribute(String),
    #[error("svg on-event handler `{0}` is forbidden")]
    ForbiddenOnHandler(String),
    #[error("svg external reference via `{0}` is forbidden")]
    ForbiddenReference(String),
    #[error("svg @import is forbidden")]
    ForbiddenImport,
    #[error("svg must have a single <svg> root element")]
    InvalidRoot,
}

const ALLOWED_ELEMENTS: &[&str] = &[
    "svg",
    "g",
    "path",
    "circle",
    "rect",
    "polygon",
    "polyline",
    "line",
    "ellipse",
    "defs",
    "linearGradient",
    "radialGradient",
    "stop",
    "title",
    "desc",
];

const ALLOWED_ATTRIBUTES: &[&str] = &[
    "viewBox",
    "width",
    "height",
    "fill",
    "stroke",
    "stroke-width",
    "d",
    "cx",
    "cy",
    "r",
    "x",
    "y",
    "points",
    "opacity",
    "transform",
    "id",
    "offset",
    "stop-color",
    "stop-opacity",
    "xmlns",
];

/// Sanitize an SVG string. Returns `Ok(svg)` unchanged if every element and
/// attribute is allow-listed; returns the first violation otherwise. This is
/// a pure validator — the input is never rewritten; callers either accept the
/// original bytes or fall back per FR-I04.
pub fn sanitize_svg(input: &str) -> Result<&str, SvgSanitizeError> {
    if input.len() > MAX_SVG_BYTES {
        return Err(SvgSanitizeError::TooLarge {
            actual: input.len(),
            cap: MAX_SVG_BYTES,
        });
    }
    if input.contains("@import") {
        return Err(SvgSanitizeError::ForbiddenImport);
    }

    let mut reader = Reader::from_str(input);
    reader.config_mut().trim_text(true);

    let mut saw_root = false;
    let mut depth: usize = 0;

    loop {
        match reader.read_event() {
            Err(e) => return Err(SvgSanitizeError::Parse(e.to_string())),
            Ok(Event::Eof) => break,
            Ok(Event::Start(e)) => {
                validate_start(&e, depth, &mut saw_root)?;
                depth += 1;
            }
            Ok(Event::Empty(e)) => {
                validate_start(&e, depth, &mut saw_root)?;
            }
            Ok(Event::End(_)) => {
                depth = depth.saturating_sub(1);
            }
            _ => {}
        }
    }

    if !saw_root {
        return Err(SvgSanitizeError::InvalidRoot);
    }
    Ok(input)
}

fn validate_start(
    e: &BytesStart<'_>,
    depth: usize,
    saw_root: &mut bool,
) -> Result<(), SvgSanitizeError> {
    let name_bytes = e.name();
    let name = std::str::from_utf8(name_bytes.as_ref())
        .map_err(|err| SvgSanitizeError::Parse(err.to_string()))?
        .to_string();

    if depth == 0 {
        if name != "svg" {
            return Err(SvgSanitizeError::InvalidRoot);
        }
        *saw_root = true;
    }
    if !ALLOWED_ELEMENTS.contains(&name.as_str()) {
        return Err(SvgSanitizeError::ForbiddenElement(name));
    }

    for attr in e.attributes() {
        let attr = attr.map_err(|err| SvgSanitizeError::Parse(err.to_string()))?;
        let key = std::str::from_utf8(attr.key.as_ref())
            .map_err(|err| SvgSanitizeError::Parse(err.to_string()))?;

        if key.to_ascii_lowercase().starts_with("on") {
            return Err(SvgSanitizeError::ForbiddenOnHandler(key.to_string()));
        }
        if key == "href" || key == "xlink:href" {
            return Err(SvgSanitizeError::ForbiddenReference(key.to_string()));
        }
        if !ALLOWED_ATTRIBUTES.contains(&key) {
            return Err(SvgSanitizeError::ForbiddenAttribute(key.to_string()));
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn happy_svg_accepted() {
        let svg = r#"<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="red"/></svg>"#;
        assert_eq!(sanitize_svg(svg), Ok(svg));
    }

    #[test]
    fn svg_with_script_rejected() {
        let svg = r#"<svg><script>alert(1)</script></svg>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenElement(_))
        ));
    }

    #[test]
    fn svg_with_on_handler_rejected() {
        let svg = r#"<svg onload="alert(1)"><circle cx="1" cy="1" r="1"/></svg>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenOnHandler(_))
        ));
    }

    #[test]
    fn svg_with_xlink_href_rejected() {
        let svg = r#"<svg><use xlink:href="http://evil/a.svg"/></svg>"#;
        let err = sanitize_svg(svg).unwrap_err();
        assert!(matches!(
            err,
            SvgSanitizeError::ForbiddenReference(_) | SvgSanitizeError::ForbiddenElement(_)
        ));
    }

    #[test]
    fn svg_with_foreign_object_rejected() {
        let svg = r#"<svg><foreignObject><p/></foreignObject></svg>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenElement(_))
        ));
    }

    #[test]
    fn svg_too_large_rejected() {
        let big = format!("<svg>{}</svg>", "x".repeat(MAX_SVG_BYTES));
        assert!(matches!(
            sanitize_svg(&big),
            Err(SvgSanitizeError::TooLarge { .. })
        ));
    }

    #[test]
    fn non_svg_root_rejected() {
        let not_svg = r#"<div/>"#;
        let err = sanitize_svg(not_svg).unwrap_err();
        assert!(matches!(
            err,
            SvgSanitizeError::ForbiddenElement(_) | SvgSanitizeError::InvalidRoot
        ));
    }

    #[test]
    fn forbidden_attribute_rejected() {
        let svg = r#"<svg data-evil="yes"/>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenAttribute(_))
        ));
    }

    #[test]
    fn style_import_rejected() {
        let svg = r#"<svg><defs><style>@import "evil.css";</style></defs></svg>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenImport)
        ));
    }

    #[test]
    fn style_tag_itself_rejected() {
        let svg = r#"<svg><defs><style>.a{fill:red}</style></defs></svg>"#;
        assert!(matches!(
            sanitize_svg(svg),
            Err(SvgSanitizeError::ForbiddenElement(_))
        ));
    }

    #[test]
    fn nested_groups_accepted() {
        let svg = r#"<svg viewBox="0 0 24 24"><g><g><path d="M0 0h10v10z"/></g></g></svg>"#;
        assert_eq!(sanitize_svg(svg), Ok(svg));
    }
}
