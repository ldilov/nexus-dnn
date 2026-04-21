// Client-side SVG re-sanitizer (defense-in-depth mirror of the server's
// allow-list validator, spec 019 FR-I03 + contracts/module-icon.md §1).
//
// The server has already sanitized the SVG at install time; this pass defends
// against any mid-flight tampering and also against legacy extensions that
// were installed before the server validator landed.
//
// Strategy: parse via DOMParser into a detached document, walk every element,
// reject the whole SVG on ANY forbidden element/attribute (reject-on-unknown,
// never strip — a silently-stripped attribute is a footgun).

const ALLOWED_ELEMENTS = new Set([
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
]);

const ALLOWED_ATTRIBUTES = new Set([
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
]);

const MAX_BYTES = 2 * 1024;

export type SvgSanitizeOutcome =
  | { ok: true; svg: string }
  | { ok: false; reason: string };

export function sanitizeSvgForClient(input: string): SvgSanitizeOutcome {
  if (input.length > MAX_BYTES) {
    return { ok: false, reason: `svg exceeds ${MAX_BYTES}-byte cap` };
  }

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(input, "image/svg+xml");
  } catch {
    return { ok: false, reason: "svg parse failed" };
  }

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    return { ok: false, reason: "svg parse error" };
  }

  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== "svg") {
    return { ok: false, reason: "root element must be <svg>" };
  }

  const reason = walk(root);
  if (reason) {
    return { ok: false, reason };
  }

  return { ok: true, svg: input };
}

function walk(element: Element): string | null {
  const tag = element.nodeName;
  if (!ALLOWED_ELEMENTS.has(tag)) {
    return `forbidden element <${tag}>`;
  }

  for (const attr of Array.from(element.attributes)) {
    const name = attr.name;
    if (name.startsWith("on")) {
      return `forbidden event handler ${name}`;
    }
    if (name.startsWith("xlink:")) {
      return `forbidden xlink attribute ${name}`;
    }
    if (name === "href") {
      return `forbidden href attribute`;
    }
    if (!ALLOWED_ATTRIBUTES.has(name)) {
      return `forbidden attribute ${name}`;
    }
  }

  for (const child of Array.from(element.children)) {
    const r = walk(child);
    if (r) return r;
  }
  return null;
}
