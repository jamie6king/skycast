import { WeatherFetcher } from "../../server/fetcher.js";

describe("weather fetching", () => {

    it("fetches city co-ords", async () => {
        const fetcher = new WeatherFetcher();
        const coords = await fetcher._fetchCoords("london");

        expect(coords[0].name).toBe("London");  
    });

    it("fetches list of cities", async () => {
        const fetcher = new WeatherFetcher();
        const list = await fetcher.fetchCities("london");

        expect(list[0].name).toBe("London");
        expect(list[1].name).toBe("City of London");
        expect(list[2].countryCode).toBe("CA");
    });

    it("fetches the weather data for a city", async () => {
        const fetcher = new WeatherFetcher();
        const coords = await fetcher._fetchCoords("london");

        const lat = coords[0].lat;
        const lon = coords[0].lon;

        const weather = await fetcher.fetchWeather(lat, lon);
        
        expect(weather.name).toBe("London");
    });
});