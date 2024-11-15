// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

// import styles
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-typeahead/css/Typeahead.css';


export default function Root() {

    // setup react states
    const [ isLoading, setLoading ] = useState(false);
    let searchTimeout;

    const [ city, setCity ] = useState([]);
    const [ suggestions, setSuggestions ] = useState([]);

    const navigate = useNavigate()

    // load list of locations
    const onType = (search) => {

        const url = "http://localhost:3000/locations"

        if (searchTimeout) clearTimeout(searchTimeout);
        setLoading(true)

        searchTimeout = setTimeout(async () => {
            try {

                const response = await fetch("http://localhost:3000/locations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ string: search }),
                });
                
                if (response.ok) {

                    const results = await response.json();
                    setSuggestions(results)

                } else {

                    console.error("Failed to fetch suggestions");

                }

            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setLoading(false);
            };
        }, 500);
    };
    
    const findLocation = (e) => {
        e.preventDefault()

        if (city.length !== 0) {
            navigate(`/location?lat=${city[0].lat}&lon=${city[0].lon}`);
        }
    }

    return (
        <div>
            <form onSubmit={findLocation}>
                <AsyncTypeahead
                    id="city"
                    autoFocus
                    isLoading={isLoading}
                    minLength={2}
                    onSearch={onType}
                    options={suggestions}
                    labelKey={city => `${city.name}`}
                    selected={city}
                    onChange={setCity}
                    renderMenuItemChildren={(city) => (
                        <>
                            <ReactCountryFlag countryCode={city.countryCode} />
                            <span style={{paddingLeft: 8}}>{city.name}</span>
                        </>
                    )}
                />
                
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}