import { test, expect } from "@playwright/test";

test("loads", async ({ page }) => {

    await page.goto("./");
    await expect(page).toHaveTitle("SkyCast");

});