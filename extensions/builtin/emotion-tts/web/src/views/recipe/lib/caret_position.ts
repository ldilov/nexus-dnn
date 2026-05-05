const MIRROR_PROPS = [
  "boxSizing",
  "width",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "letterSpacing",
  "textTransform",
  "lineHeight",
  "tabSize",
  "wordSpacing",
  "textIndent",
  "whiteSpace",
  "wordBreak",
  "overflowWrap",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
] as const;

export interface CaretCoords {
  top: number;
  left: number;
  height: number;
}

export function caretCoordsInTextarea(
  textarea: HTMLTextAreaElement,
  position: number,
): CaretCoords {
  const doc = textarea.ownerDocument;
  if (!doc) return { top: 0, left: 0, height: 0 };
  const mirror = doc.createElement("div");
  const computed = doc.defaultView?.getComputedStyle(textarea);
  if (!computed) return { top: 0, left: 0, height: 0 };
  const mirrorStyle = mirror.style as unknown as Record<string, string>;
  const computedRecord = computed as unknown as Record<string, string>;
  for (const prop of MIRROR_PROPS) {
    const value = computedRecord[prop];
    if (typeof value === "string") {
      mirrorStyle[prop] = value;
    }
  }
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.overflow = "hidden";
  mirror.style.top = "0";
  mirror.style.left = "-9999px";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordWrap = "break-word";

  const value = textarea.value.slice(0, position);
  const before = doc.createTextNode(value.replace(/ /g, " "));
  const marker = doc.createElement("span");
  marker.textContent = textarea.value.slice(position, position + 1) || ".";

  mirror.appendChild(before);
  mirror.appendChild(marker);
  doc.body.appendChild(mirror);

  const rect = marker.getBoundingClientRect();
  const mirrorRect = mirror.getBoundingClientRect();
  const top = rect.top - mirrorRect.top - textarea.scrollTop;
  const left = rect.left - mirrorRect.left - textarea.scrollLeft;
  const height = rect.height || parseFloat(computed.lineHeight) || 16;

  doc.body.removeChild(mirror);
  return { top, left, height };
}
