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

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import "./index.css";

/**
 * Loader function that checks if the user is logged in or not
 * @returns redirect to signin page if user is not logged in
 */
const loader = async () => {
    const user = auth.currentUser;
    if (!user) {
        return redirect("/signin");
    }
    return null;
};

/**
 * Form action that handles the sign up process using firebase auth for the new user
 * @returns redirect to / if user is created successfully
 */
const signupAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Sign up Action: ", { email, password });
    let signUpSuccess = false;

    try {
        createUserWithEmailAndPassword(auth, email, password);
        signUpSuccess = true;
    } catch (error: any) {
        alert("An error occured, cannot sign up. Please try again later");
        console.error(error.code, error.message);
    }

    if (signUpSuccess) {
        return redirect("/");
    }
    return null;
};

/**
 * Form action that handles the login process using firebase auth for the user
 * @returns redirect to / if user is logged in successfully
 */
const loginAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Login Action: ", { email, password });
    let loginSuccess = false;

    try {
        signInWithEmailAndPassword(auth, email, password);
        loginSuccess = true;
    } catch (error: any) {
        alert("An error occured, cannot login. Please try again later");
        console.error(error.code, error.message);
    }

    if (loginSuccess) {
        console.log("Login Success");
        return redirect("/");
    }
    return null;
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            loader: loader,
        },
        {
            path: "/signin",
            element: <Login />,
            action: loginAction,
        },
        {
            path: "/signup",
            element: <Signup />,
            action: signupAction,
        },
    ],
    { basename: "/todo-app" }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
