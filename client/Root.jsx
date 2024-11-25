// import react
import React, { useState } from "react";
import { useNavigate as N } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";

// import styles
import * as Styles from "./styles/root.module.scss";


export default function Root() {

    const[l,L]=useState(false);let T;const[c,C]=useState([]);const[s,S]=useState([]);const n=N();

    // load list of locations
    const onType = (search) => {

        L(true)

        const url = (process.env.REACT_APP_LOCAL == "yes") ? "http://localhost:3000/locations" : "/locations"

        (T)&&clearTimeout(T);
        T = setTimeout(async () => {

                const r=await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ string: search }),
                });

                    const results = await r.json();
                    S(results)


                    console.error("Failed to fetch suggestions");


                L(false);
            },250);
    };
    
    const findLocation = (e) => {
        e.preventDefault()

        if (c.length !== 0) {
            n(`/location?lat=${c[0].lat}&lon=${c[0].lon}`);
        }
    }

    return (
        <div className={Styles.wrapper}>
            <form onSubmit={findLocation} className={Styles.form}>
                <p data-testid="heading">SkyCast</p>
                <div className={Styles.formBox}>
                    <AsyncTypeahead
                                    id="city"
                                    className={Styles.input}
                                    autoFocus
                                    isLoading={l}
                                    minLength={2}
                                    onSearch={onType}
                                    options={s}
                                    labelKey={c => `${c.name}`}
                                    selected={c}
                                    searchText={"Searching..."}
                                    onChange={C}
                                    renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                                        <input
                                            {...inputProps}
                                            ref={(input) => {
                                                inputRef(input);
                                                referenceElementRef(input);
                                            }}
                                            placeholder="Location name"
                                            data-testid="inputbox"
                                        />
                                    )}
                                    renderMenu={(results, menuProps) => (
                                            <Menu {...menuProps} className={Styles.inputMenu}>
                                                { results.map((c, index) => (
                                                    <MenuItem option={c} position={index} key={index}>
                                                        <ReactCountryFlag countryCode={c.countryCode} />
                                                        <span style={{ paddingLeft: 8 }}>{c.name}</span>                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        )
                                    }
                        />
                    <input className={`${Styles.submit} ${(c.length === 0) ? `${Styles.inactive}` : `${Styles.active}`}`} type="submit" value="Search" />
                </div>
            </form>
        </div>
    )
}