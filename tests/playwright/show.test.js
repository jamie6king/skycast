import { test, expect } from "@playwright/test";

test("shows test location", async ({ page }) => {
    
    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const locationBar = page.getByTestId("locationbar");
    const locationBarText = locationBar.locator("p").getByText(",");
    
    await expect(locationBarText).toHaveText("London, United Kingdom");
});

test("shows test location forecast", async ({ page }) => {

    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const forecastList = page.getByTestId("forecasts").locator("div");
    await expect(forecastList).toHaveCount(40);
});

test("shows test location air quality", async ({ page }) => {

    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const airQuality = page.getByTestId("airquality").locator("p");
    await expect(airQuality).toHaveText("Air Quality");
});

test("shows test location wind speed", async ({ page }) => {

    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const airQuality = page.getByTestId("windspeed").locator("p");
    await expect(airQuality).toHaveText("Wind Speed");
});

test("shows test location visibility", async ({ page }) => {

    await page.goto("/location?lat=51.5073219&lon=-0.1276474");

    const airQuality = page.getByTestId("visibility").locator("p");
    await expect(airQuality).toHaveText("Visibility");
});