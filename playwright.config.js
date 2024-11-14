import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/playwright",

    webServer: {
        command: "npm run dev",
        url: "http://127.0.0.1:8080"
    },

    use: {
        baseURL: "http://127.0.0.1:8080"
    }
});