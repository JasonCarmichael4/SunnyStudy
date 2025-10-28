import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],

  build: {
    outDir: "dist",
    sourcemap: true,
  },

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: { usePolling: true },
    origin: "http://localhost:5173",
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
