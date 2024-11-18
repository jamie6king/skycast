import { test, expect } from "@playwright/test";

test("shows test location", async ({ page }) => {

    page.on('console', (msg) => {
        console.log(`Browser console: [${msg.type()}] ${msg.text()}`);
    });
    
    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const locationBar = page.getByTestId("locationbar");
    const locationBarText = locationBar.locator("p").getByText(",");
    
    await expect(locationBarText).toHaveText("London, United Kingdom");
});

test("shows test location forecast", async ({ page }) => {

    page.on('console', (msg) => {
        console.log(`Browser console: [${msg.type()}] ${msg.text()}`);
    });

    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const forecastList = page.getByTestId("forecasts").locator("div");
    await expect(forecastList).toHaveCount(40);
});
