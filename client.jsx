import React from "react"
import { createRoot } from "react-dom/client";
import Root from "./client/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)