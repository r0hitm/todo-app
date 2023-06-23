import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Login from "./routes/login";
import Signup from "./routes/signup";
import { auth } from "./firebase";

import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import "./index.css";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            loader: async () => {
                let userLoggedIn = false;
                onAuthStateChanged(auth, user => {
                    if (user) {
                        userLoggedIn = true;
                    }
                });
                if (!userLoggedIn) {
                    return redirect("/signin");
                }
                return null;
            },
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
