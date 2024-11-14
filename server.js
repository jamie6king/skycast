import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.apiKey;
if (apiKey === undefined) new Error("No OpenWeatherMap API key defined.");

app.get("/", (req, res) => {
    res.send("Test");
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});