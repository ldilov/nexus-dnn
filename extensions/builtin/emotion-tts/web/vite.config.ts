import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "EmotionTtsExtension",
      fileName: () => "emotion-tts.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router", "motion/react"],
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
