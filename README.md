# SkyCast

## Tech

- Front-end written in [React](https://react.dev/).
    - Uses [React Router](https://reactrouter.com/en/main) for routing.
    - Uses [Luxon](https://www.npmjs.com/package/luxon) for advanced DateTime classes.
    - Uses [TZLookup](https://www.npmjs.com/package/@photostructure/tz-lookup) for timezone correction.
    - Uses [i18 ISO Countries](https://www.npmjs.com/package/i18n-iso-countries) to lookup country names via ISO 3166 codes.
    - Uses [React Country Flags](https://www.npmjs.com/package/react-country-flag) to lookup country flag emoji based on ISO 3166 codes.
    - Uses [React Bootstrap Typeahead](https://ericgio.github.io/react-bootstrap-typeahead/) for input typeahead dropdown.
    - Uses [React Gauge Component](https://www.npmjs.com/package/react-gauge-component) for gauges.
    - Uses [React Spinners](https://www.davidhu.io/react-spinners/) for loading animations.
    - Styling written (mostly) in [SCSS](https://sass-lang.com/).
    - Uses [OWFont](https://websygen.github.io/owfont/) for OpenWeatherMap icon font.
    - Uses [React Icons](https://react-icons.github.io/react-icons/) for icons.
    - Uses [Roboto](https://fonts.google.com/specimen/Roboto) for sans-serif font.
    - Uses [Fira Code](https://github.com/tonsky/FiraCode) for monospace font.
    - Tested using [Playwright](https://playwright.dev/).
- Back-end written in [ExpressJS](https://expressjs.com/).
    - Fetches information from [OpenWeatherMap](https://openweathermap.org/).
    - Ran in development environment using [Nodemon](https://nodemon.io/).
    - Uses [Dotenv](https://github.com/motdotla/dotenv#readme) for `.env` file support.
    - Tested using [Jest](https://jestjs.io/).
- Glued together using [Webpack](https://webpack.js.org/).
    - Compiled using [Babel](https://babel.dev/).
- Styled using [ESLint](https://eslint.org/).
    - Includes [Babel](https://www.npmjs.com/package/eslint-plugin-babel), [React](https://www.npmjs.com/package/eslint-plugin-react), [React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) & [Jest](https://www.npmjs.com/package/eslint-plugin-jest) plugins.
    - Tested using Github Actions.
- Compiled into a [Docker](https://www.docker.com/) container via Github Actions.
    - Hosted on [GitHub](https://ghcr.io).
- Using Dependabot for dependancy checking.
