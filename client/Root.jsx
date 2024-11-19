// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { AsyncTypeahead, Highlighter, Menu, MenuItem } from "react-bootstrap-typeahead";

// import styles
import * as Styles from "./styles/root.module.scss";


export default function Root() {

    // setup react states
    const [ isLoading, setLoading ] = useState(false);
    let searchTimeout;

    const [ city, setCity ] = useState([]);
    const [ suggestions, setSuggestions ] = useState([]);

    const navigate = useNavigate()

    // load list of locations
    const onType = (search) => {

        setLoading(true)

        const url = (process.env.NODE_ENV === "development") ? "http://localhost:3000/locations" : "/locations"
        console.debug(url)

        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            try {

                const response = await fetch(url, {
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
        }, 100);
    };
    
    const findLocation = (e) => {
        e.preventDefault()

        if (city.length !== 0) {
            navigate(`/location?lat=${city[0].lat}&lon=${city[0].lon}`);
        }
    }

    return (
        <div className={Styles.wrapper}>
            <form onSubmit={findLocation} className={Styles.form}>
                <p>SkyCast</p>
                <div className={Styles.formBox}>
                    <AsyncTypeahead
                                    id="city"
                                    className={Styles.input}
                                    autoFocus
                                    isLoading={isLoading}
                                    minLength={2}
                                    onSearch={onType}
                                    options={suggestions}
                                    labelKey={city => `${city.name}`}
                                    selected={city}
                                    searchText={"Searching..."}
                                    onChange={setCity}
                                    renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                                        <input
                                            {...inputProps}
                                            ref={(input) => {
                                                inputRef(input);
                                                referenceElementRef(input);
                                            }}
                                            placeholder="Location name"
                                        />
                                    )}
                                    renderMenu={(results, menuProps) => (
                                            <Menu {...menuProps} className={Styles.inputMenu}>
                                                { results.map((city, index) => (
                                                    <MenuItem option={city} position={index} key={index}>
                                                        <ReactCountryFlag countryCode={city.countryCode} />
                                                        <span style={{ paddingLeft: 8 }}>{city.name}</span>                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        )
                                    }
                        />
                    <input className={`${Styles.submit} ${(city.length === 0) ? `${Styles.inactive}` : `${Styles.active}`}`} type="submit" value="Search" />
                </div>
            </form>
        </div>
    )
}