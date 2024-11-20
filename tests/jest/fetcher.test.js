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

    it("fetches the air quality for a city", async () => {
        const fetcher = new WeatherFetcher();
        const coords = await fetcher._fetchCoords("london");

        const lat = coords[0].lat;
        const lon = coords[0].lon;

        const weather = await fetcher.fetchAirQuality(lat, lon);
        
        expect(weather.coord.lat.toFixed(1)).toBe(lat.toFixed(1));
        expect(weather.coord.lon.toFixed(1)).toBe(lon.toFixed(1));
    });

    it("fetches the 5-day 3-hour forecast for a city", async () => {
        const fetcher = new WeatherFetcher();
        const coords = await fetcher._fetchCoords("london");

        const lat = coords[0].lat;
        const lon = coords[0].lon;

        const forecast = await fetcher.fetchForecast(lat, lon);

        expect(forecast.city.name).toBe("London");
        expect(forecast.list.length).toBe(40);
    });

    it("fetches the air quality forecast for a city", async () => {
        const fetcher = new WeatherFetcher();
        const coords = await fetcher._fetchCoords("london");

        const lat = coords[0].lat;
        const lon = coords[0].lon;

        const airQualityForecast = await fetcher.fetchAirQualityForecast(lat, lon);

        expect(airQualityForecast.list.length).toBe(96);
    });
});
