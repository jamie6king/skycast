import dotenv from "dotenv";
dotenv.config();

export class WeatherFetcher {

    constructor() {
        this._apiKey = process.env.API_KEY;
    }

    // Fetch latitude and longitude coordinates for the city
    async _fetchCoords(city) {

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${this._apiKey}`;

        try {
            const result = await fetch(url);
            return await result.json();

        } catch (error) {

            console.error("Error fetching coordinates:", error);
            return [];
        }
    }

    // Fetch a list of potential cities
    async fetchCities(string) {

        const coords = await this._fetchCoords(string);

        try {
            return coords.map((city) => ({
                name: city.name,
                countryCode: city.country,
                lat: city.lat,
                lon: city.lon,
            }));

        } catch (error) {

            console.error("Error mapping city coordinates:", error);
            return [];
        }
    }

    // Fetch current weather data
    async fetchWeather(lat, lon) {

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this._apiKey}`;

        try {
            const result = await fetch(url);
            return await result.json();

        } catch (error) {

            console.error("Error fetching weather data:", error);
            return null;
        }
    }

    // Fetch weather forecast data
    async fetchForecast(lat, lon) {

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this._apiKey}`;

        try {
            const result = await fetch(url);
            return await result.json();

        } catch (error) {

            console.error("Error fetching forecast data:", error);
            return null;
        }
    }
}
