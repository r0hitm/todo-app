import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./routes/login";
import Signup from "./routes/signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/signin",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
    ],
    { basename: "/todo-app" }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
