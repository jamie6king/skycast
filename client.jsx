// import react
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import Root from "./client/Root";
import Weather from "./client/Show";

// setup root
const container = document.getElementById("root");
const root = createRoot(container);

// setup route
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/location",
        element: <Weather />,
    },
]);

// render react
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
