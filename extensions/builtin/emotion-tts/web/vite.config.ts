import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  // Vite's SPA-mode auto-substitution of `process.env.NODE_ENV` does NOT run
  // in library mode. Without this define, React 19's dev-vs-prod runtime
  // checks ship as live `process.env.NODE_ENV` references and crash with
  // `process is not defined` when the host loads the bundle via dynamic
  // `import()`. Substitute the literal at build time so the dead-code
  // elimination kicks in and the resulting chunk runs in any browser.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "EmotionTtsExtension",
      fileName: () => "emotion-tts.js",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith(".css")) return "emotion-tts.css";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
