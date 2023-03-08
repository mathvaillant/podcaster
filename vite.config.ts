/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "common",
        replacement: resolve(__dirname, "src/common")
      },
      { find: "/@", replacement: resolve(__dirname, "src") },
      {
        find: "/@fixtures",
        replacement: resolve(__dirname, "cypress/fixtures")
      }
    ]
  },
  server: {
    port: 3000
  },
  preview: {
    port: 8080
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom"
  }
});
