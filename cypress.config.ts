import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite"
    }
  },
  e2e: {
    baseUrl: "http://localhost:3000"
  }
});
