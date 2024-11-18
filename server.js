import path from "path";

// setup env variables
import dotenv from "dotenv";
dotenv.config();

// import weather fetcher
import { WeatherFetcher } from "./server/fetcher.js";
const fetcher = new WeatherFetcher();

// setup express app
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// ensure api key is set
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("No OpenWeatherMap API key defined.");
}

// allow accessing JSON data in POST body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow CORS
app.use((req, res, next) => {

    const allowedOrigins = [
        "http://localhost",
        "http://127.0.0.1:8080"
    ];
    
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    };

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// serve static frontend
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join("__dirname", "../public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// return a list of 3 locations based on the supplied string
app.post("/locations", async (req, res) => {

    try {

        const response = await fetcher.fetchCities(req.body.string);
        res.send(response);

    } catch {

        res.status(500).send({ error: "Error fetching locations" });

    }
});

// return the current weather information
app.post("/weather", async (req, res) => {

    try {

        const { lat, lon } = req.body;
        const response = await fetcher.fetchWeather(lat, lon);
        res.send(response);

    } catch {

        res.status(500).send({ error: "Error fetching weather" });

    }
});

// return the 5-day 3-hour forecast
app.post("/forecast", async (req, res) => {

    try {

        const { lat, lon } = req.body;
        const response = await fetcher.fetchForecast(lat, lon);
        res.send(response);

    } catch {

        res.status(500).send({ error: "Error fetching forecast" });

    }
});

// run the app
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
