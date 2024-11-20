import { test, expect } from "@playwright/test";

test("webpage loads", async ({ page }) => {

    await page.goto("/");

    const title = page.getByTestId("heading");
    await expect(title).toHaveText("SkyCast");
});

test("can load weather page", async ({ page }) => {

    await page.goto("/");

    const inputBox = page.getByTestId("inputbox");
    await inputBox.fill("London");

    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(3000);

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    const searchButton = page.locator("input").getByText("Search");
    await searchButton.click();

    const locationBar = page.getByTestId("locationbar");
    const locationBarText = locationBar.locator("p").getByText(",");
    
    await expect(locationBarText).toHaveText("London, United Kingdom");
});