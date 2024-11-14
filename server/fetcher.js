import dotenv from "dotenv";
dotenv.config();

export class WeatherFetcher {

    consturctor() {
        this._apiKey = process.env.API_KEY;
    };

    // fetch lang+long co-ords for API
    async _fetchCoords(city) {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.API_KEY}`; // specifying this._apiKey doesn't work???

        const result = await fetch(url);
        return await result.json();
    };

    // fetch list of potential cities
    async fetchCities(string) {
        const coords = await this._fetchCoords(string);
        return coords.map((city) => { return {
            name: city.name,
            countryCode: city.country,
            lat: city.lat,
            lon: city.lon
        };});
    };

    async fetchWeather(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;

        const result = await fetch(url);
        return await result.json();
    };
};
