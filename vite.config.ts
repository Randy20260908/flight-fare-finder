import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain Vite SPA: `vite build` emits a fully static bundle to dist/.
// No SSR, no nitro, no Cloudflare/wrangler target.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Resolves the "@/*" alias straight from tsconfig.json (native since Vite 8,
  // replacing the vite-tsconfig-paths plugin).
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
    port: 8080,
  },
  preview: {
    host: true,
    port: 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
