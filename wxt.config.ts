import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    web_accessible_resources: [
      {
        matches: ["*://*.linkedin.com/*"],
        resources: [
          "Frame.svg",
          "regenerate.svg",
          "generate.svg",
          "insert.svg",
        ],
      },
    ],
    permissions: ["storage", "tabs"],
    host_permissions: ["*://*.google.com/*"],
  },
});
