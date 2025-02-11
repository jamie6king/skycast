// import react
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { BarLoader, BeatLoader } from "react-spinners";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

// import datetime
import { DateTime } from "luxon";
import tz_lookup from "@photostructure/tz-lookup";
import { getName, registerLocale } from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// import styles
import * as Styles from "./styles/show.module.scss";
import GaugeComponent from "react-gauge-component";


export default function Weather() {

    // setup locale
    useEffect(() => {
        registerLocale(enLocale);
    });

    // setup react states
    const [ searchParams ] = useSearchParams();

    const [ mainLoading, setMainLoading ] = useState(true);
    const [ forecastLoading, setForecastLoading ] = useState(true);
    const [ airQualityLoading, setAirQualityLoading ] = useState(true);
    const [ airQualityForecastLoading, setAirQualityForecastLoading ] = useState(true);

    const [ data, setData ] = useState();
    const [ localTime, setLocalTime ] = useState();
    const [ localDayOrNight, setLocalDayOrNight ] = useState();
    const [ forecastData, setForecastData ] = useState();
    const [ airQualityData, setAirQualityData ] = useState();
    const [ airQualityForecastData, setAirQualityForecastData ] = useState();


    useEffect(() => {

        // async fetching of weather data
        const fetchWeatherData = async () => {

            // urls
            const weatherUrl =(process.env.REACT_APP_LOCAL == "yes") ? "http://localhost:3000/weather" :  "/weather";
            const forecastUrl = (process.env.REACT_APP_LOCAL == "yes") ? "http://localhost:3000/forecast" : "/forecast";
            const airQualityUrl = (process.env.REACT_APP_LOCAL == "yes") ? "http://localhost:3000/airquality" : "/airquality";
            const airQualityForecastUrl = (process.env.REACT_APP_LOCAL == "yes") ? "http://localhost:3000/forecast/airquality" : "/forecast/airquality";
            const lat = searchParams.get("lat");
            const lon = searchParams.get("lon");
            const tz = tz_lookup(lat, lon)

            setLocalTime(DateTime.now().setZone(tz))

            try {

                // get weather data
                const weatherResponse = await fetch(weatherUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lat, lon }),
                });
                const weatherData = await weatherResponse.json();

                setData(weatherData);
                setMainLoading(false);

                // get forecast data
                const forecastResponse = await fetch(forecastUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lat, lon }),
                });
                const forecastData = await forecastResponse.json();

                setForecastData(forecastData);
                setForecastLoading(false);

                // get air quality data
                const airQualityResponse = await fetch(airQualityUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lat, lon })
                });
                const airQualityData = await airQualityResponse.json();

                setAirQualityData(airQualityData)
                setAirQualityLoading(false);

                // get air quality forecast
                const airQualityForecastResponse = await fetch(airQualityForecastUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lat, lon })
                });
                const airQualityForecastData = await airQualityForecastResponse.json();

                setAirQualityForecastData(airQualityForecastData);
                console.log(airQualityForecastData)
                setAirQualityForecastLoading(false);

            } catch (error) {

                // log error
                console.error("Error fetching weather data: ", error);
                
            };
        };

        fetchWeatherData();
    }, [ searchParams ])

    // find if local time day or night
    useEffect(() => {

        if (localTime) setLocalDayOrNight(localTime.hour > 6 && localTime.hour < 20 ? "d" : "n");

    }, [localTime]);

    // render page
    return (
            <div className={Styles.main}>

                <div className={Styles.weather}>

                    { (mainLoading) ? (

                        <BarLoader color="#ffffff" cssOverride={{ width: "100%" }} />

                    ) : (
                        <>
                            <div className={Styles.locationBar} data-testid="locationbar">

                                <Link to="/"><IoIosArrowBack className={Styles.backIcon} /></Link>

                                <FaLocationDot className={Styles.locationIcon} />
                                <p>{data.name}, {getName(data.sys.country, "en")}</p>

                                <p className={Styles.localTime}>
                                    {localTime.toFormat("HH:mm")}
                                </p>

                            </div>
                            <div className={Styles.mainTemp}>
                                
                                <div className={Styles.mainTempPanel}>
                                    <div>
                                        <i className={`owf owf-${data.weather[0].id}-${localDayOrNight} owf-3x`} />

                                        <p><span>{parseInt(data.main.temp).toString().padStart(2, "0")}</span>°C</p>

                                        <p className={Styles.feelsLike}>Feels like <span>{parseInt(data.main.feels_like).toString().padStart(2, "0")}</span>°C</p>
                                    </div>
                                </div>

                                <div className={Styles.mainTempBoxes}>
                                    <div className={Styles.mainTempBox} data-testid="airquality">
                                        { (airQualityLoading) ? (
                                            <BeatLoader color="#ffffff" />
                                        ) : (
                                            <>
                                                <p>Air Quality</p>
                                                <GaugeComponent
                                                                type="semicircle"
                                                                value={airQualityData.list[0].main.aqi}
                                                                minValue={0}
                                                                maxValue={5}
                                                                arc={{
                                                                        subArcs: [
                                                                            {
                                                                                limit: 1,
                                                                                color: "#00ff00"
                                                                            },
                                                                            {
                                                                                limit: 2,
                                                                                color: "#7fff00"
                                                                            },
                                                                            {
                                                                                limit: 3,
                                                                                color: "#ffff00"
                                                                            },
                                                                            {
                                                                                limit: 4,
                                                                                color: "#ff7f00"
                                                                            },
                                                                            {
                                                                                limit: 5,
                                                                                color: "#ff0000"
                                                                            }
                                                                        ]
                                                                }}
                                                                pointer={{ type: "blob", animationDelay: 0 }}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className={Styles.mainTempBox} data-testid="windspeed">
                                        <p>Wind Speed</p>
                                        <GaugeComponent
                                                        type="semicircle"
                                                        value={data.wind.speed}
                                                        minValue={0}
                                                        maxValue={25}
                                                        arc={{
                                                                subArcs: [
                                                                    {
                                                                        limit: 5,
                                                                        color: "#00ff00"
                                                                    },
                                                                    {
                                                                        limit: 10,
                                                                        color: "#7fff00"
                                                                    },
                                                                    {
                                                                        limit: 15,
                                                                        color: "#ffff00"
                                                                    },
                                                                    {
                                                                        limit: 20,
                                                                        color: "#ff7f00"
                                                                    },
                                                                    {
                                                                        color: "#ff0000"
                                                                    }
                                                                ]
                                                        }}
                                                        pointer={{ type: "blob", animationDelay: 0 }}
                                                        labels={{
                                                            valueLabel: {
                                                                formatTextValue: (string) => { return `${parseFloat(string).toFixed(1)} MPH` }
                                                            }
                                                        }}
                                        />
                                    </div>
                                    <div className={Styles.mainTempBox} data-testid="visibility">
                                        <p>Visibility</p>
                                        <GaugeComponent
                                                        type="semicircle"
                                                        value={data.visibility / 1000}
                                                        minValue={0}
                                                        maxValue={5}
                                                        arc={{
                                                                subArcs: [
                                                                    {
                                                                        limit: 0.5,
                                                                        color: "#ff0000"
                                                                    },
                                                                    {
                                                                        limit: 1,
                                                                        color: "#ff7f00"
                                                                    },
                                                                    {
                                                                        limit: 2,
                                                                        color: "#ffff00"
                                                                    },
                                                                    {
                                                                        limit: 4,
                                                                        color: "#7fff00"
                                                                    },
                                                                    {
                                                                        color: "#00ff00"
                                                                    }
                                                                ]
                                                        }}
                                                        pointer={{ type: "blob", animationDelay: 0 }}
                                                        labels={{
                                                            valueLabel: {
                                                                formatTextValue: (string) => { return `${parseFloat(string).toFixed(1)} KM` }
                                                            }
                                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={Styles.info}>

                    { (forecastLoading || airQualityForecastLoading) ? (

                        <BarLoader color="#ffffff" cssOverride={{ width: "100%" }} />

                    ) : (
                        <>
                            <div className={Styles.forecast}>

                                <h1>5-Day Forecast</h1>

                                <div className={Styles.forecastBox} data-testid="forecasts">

                                    { forecastData.list.map((day) => {

                                        const localDate = DateTime.fromSeconds(day.dt)
                                        const date = localDate.setZone(localTime.zone);
                                        const dateDayOrNight = (date.hour > 6 && date.hour < 20) ? "d" : "n";
                                        const now = DateTime.now();
                                        const dateString = (now.month < localDate.month || now.day < localDate.day) ? localDate.toFormat("dd/MM") : "";

                                        return (
                                            <div key={day.dt}>
                                                <p className={Styles.forecastDate}>
                                                    <span>{dateString}</span><br />
                                                    {date.toFormat("HH:mm")}
                                                </p>

                                                <i className={`owf owf-${day.weather[0].id}-${dateDayOrNight} owf-5x`} />

                                                <p className={Styles.forecastTemp}>
                                                    {parseInt(day.main.temp).toString().padStart(2, "0")}°C
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <h1>Air Quality Forecast</h1>

                                <div className={Styles.forecastBox} data-testid="airqualityforecast">

                                    { airQualityForecastData.list.map((aq) => {

                                        const localDate = DateTime.fromSeconds(aq.dt)
                                        const date = localDate.setZone(localTime.zone);
                                        const now = DateTime.now();
                                        const dateString = (now.month < localDate.month || now.day < localDate.day) ? localDate.toFormat("dd/MM") : "";
                                        let aqiColor;

                                        switch (aq.main.aqi) {
                                            case 1:
                                                aqiColor = "#00ff00";
                                                break;

                                            case 2:
                                                aqiColor = "#7fff00";
                                                break;

                                            case 3:
                                                aqiColor = "#ffff00";
                                                break;
                                            
                                            case 4:
                                                aqiColor = "#ff7f00";
                                                break;

                                            case 5:
                                                aqiColor = "#ff0000";
                                                break;
                                        }

                                        return (
                                            <div key={aq.dt}>
                                                <p className={Styles.forecastDate}>
                                                    <span>{dateString}</span><br />
                                                    {date.toFormat("HH:mm")}
                                                </p>
                                                <p className={Styles.forecastAQI} style={{ color: aqiColor }}>{aq.main.aqi}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
    );
};