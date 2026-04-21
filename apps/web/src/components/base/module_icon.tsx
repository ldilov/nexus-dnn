import { useMemo } from "react";
import type { CSSProperties } from "react";
import type { ModuleIcon as ModuleIconDto } from "../../api/client";
import { sanitizeSvgForClient } from "./svg_sanitize_client";
import * as s from "./module_icon.css";

interface ModuleIconProps {
  icon: ModuleIconDto;
  size?: number;
  filled?: boolean;
  ariaHidden?: boolean;
  title?: string;
}

export function ModuleIcon({
  icon,
  size = 40,
  filled = false,
  ariaHidden = true,
  title,
}: ModuleIconProps) {
  const wrapperStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const glyphSize = Math.round(size * 0.6);

  const sanitizedSvg = useMemo(() => {
    if (icon.kind !== "svg") return null;
    const result = sanitizeSvgForClient(icon.value);
    return result.ok ? result.svg : null;
  }, [icon]);

  if (icon.kind === "svg" && sanitizedSvg) {
    return (
      <span
        className={s.wrapper}
        style={wrapperStyle}
        title={title}
        aria-hidden={ariaHidden}
      >
        <span
          className={s.svgFrame}
          dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
        />
      </span>
    );
  }

  const glyph =
    icon.kind === "symbol"
      ? icon.value
      : icon.kind === "fallback"
        ? icon.value
        : // sanitization failed on an svg → show a visible fallback
          "help";

  const symbolClass = `material-symbols-outlined ${s.symbol}${
    filled ? ` ${s.symbolFilled}` : ""
  }`;

  return (
    <span
      className={s.wrapper}
      style={wrapperStyle}
      title={title}
      aria-hidden={ariaHidden}
    >
      <span
        className={symbolClass}
        style={{ fontSize: `${glyphSize}px` }}
      >
        {glyph}
      </span>
    </span>
  );
}
