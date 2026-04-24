import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function mount(element: HTMLElement): void {
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

if (typeof document !== "undefined") {
  const el = document.getElementById("emotion-tts-root");
  if (el) {
    mount(el);
  }
}
