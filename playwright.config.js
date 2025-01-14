import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/playwright",

    webServer: {
        command: "npm run dev",
        url: "http://127.0.0.1:8080",
        reuseExistingServer: !process.env.CI,
    },

    use: {
        baseURL: "http://127.0.0.1:8080",
        headless: true,
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

    timeout: 30000,
    retries: process.env.CI ? 2 : 0,
});
