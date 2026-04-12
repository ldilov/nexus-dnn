import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme/global.css";
import { darkTheme } from "./theme/dark.css";
import { App } from "./App";

const root = document.getElementById("root")!;
root.classList.add(darkTheme);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
