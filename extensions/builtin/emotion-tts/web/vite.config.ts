import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
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
