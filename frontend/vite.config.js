import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path"; // Import resolve function for path aliasing

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['smkaroui.onrender.com'],
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  esbuild: { // Fixed typo from `esbuilzd` to `esbuild`
    loader: "jsx",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Example alias for src folder
    },
  },
});
