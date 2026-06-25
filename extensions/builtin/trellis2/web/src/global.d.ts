declare module "*.css";

import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

/** JSX typing for the `<model-viewer>` custom element registered by
 * `@google/model-viewer`. The package ships `ModelViewerElement` but the JSX
 * tag itself still needs declaring; React 19 reads intrinsics from
 * `React.JSX.IntrinsicElements`. Only the attributes we use are listed. */
type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  ref?: Ref<HTMLElement>;
  src?: string;
  alt?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "shadow-intensity"?: string;
  exposure?: string;
};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": ModelViewerAttributes;
      }
    }
  }
}
