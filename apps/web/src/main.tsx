import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme/global.css";
import { darkTheme } from "./theme/dark.css";
import { App } from "./App";

function Root() {
  return (
    <StrictMode>
      <div className={darkTheme}>
        <App />
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
